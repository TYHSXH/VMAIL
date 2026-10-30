from __future__ import annotations

import asyncio
import base64
import io
import json
import os
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch
from urllib.error import HTTPError, URLError
import xml.etree.ElementTree as ET

from fastapi import HTTPException
from starlette.requests import Request
import yaml

from backend import assistant
from backend.assistant_credentials import CredentialStore
from backend.assistant_tasks import publish_bundle, validate_bundle, check_bundle
from backend.task_io import REQUIRED_FILES, TaskValidationError, list_tasks, load_task

ROOT = Path(__file__).resolve().parents[1]


def example_bundle(task_id="ai_test_spring"):
    files = {name: (ROOT / "tasks" / "example_mass_spring" / name).read_text(encoding="utf-8") for name in REQUIRED_FILES}
    metadata = yaml.safe_load(files["task.yaml"]); metadata["id"] = task_id
    metadata["simulation"]["duration"] = .1
    files["task.yaml"] = yaml.safe_dump(metadata, allow_unicode=True)
    root = ET.fromstring(files["model.xml"])
    asset = ET.SubElement(root, "asset")
    ET.SubElement(asset, "texture", name="buaa_logo", type="2d", file="assets/logo-gray.png")
    ET.SubElement(asset, "material", name="buaa_floor", texture="buaa_logo", texrepeat="1 1", texuniform="false")
    ET.SubElement(root.find("worldbody"), "geom", name="floor", type="plane", size="4 4 .1", pos="0 0 -.5", material="buaa_floor")
    files["model.xml"] = ET.tostring(root, encoding="unicode")
    return files


class AssistantTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.folder = Path(self.temporary.name)
        self.store = CredentialStore(self.folder / "private" / "key")
        self.key = "sk-unit-test-placeholder"

    def tearDown(self):
        self.temporary.cleanup()

    def test_credentials_memory_only_and_never_in_status(self):
        status = self.store.save(self.key, "deepseek-flash", False)
        self.assertTrue(status["configured"])
        self.assertNotIn(self.key, json.dumps(status))
        self.assertFalse(self.store.path.exists())
        self.assertFalse(CredentialStore(self.store.path).status()["configured"])
        self.store.save("", "deepseek-v4-pro", False)
        self.assertEqual(self.store.snapshot(), (self.key, "deepseek-v4-pro"))

    @unittest.skipUnless(os.name == "nt", "Windows DPAPI")
    def test_remember_is_encrypted_and_forget_removes_it(self):
        self.store.save(self.key, "deepseek-flash", True)
        self.assertNotIn(self.key.encode(), self.store.path.read_bytes())
        restored = CredentialStore(self.store.path)
        self.assertEqual(restored.snapshot()[0], self.key)
        restored.clear()
        self.assertFalse(self.store.path.exists())
        self.assertFalse(restored.status()["configured"])

    def test_local_origin_and_custom_header_are_required(self):
        def request(host="127.0.0.1:8018", origin="http://127.0.0.1:8018", client="127.0.0.1", marker=True):
            headers = [(b"host", host.encode()), (b"origin", origin.encode())]
            if marker: headers.append((b"x-vmail-assistant", b"1"))
            return Request({"type": "http", "scheme": "http", "method": "POST", "path": "/api/assistant/chat", "headers": headers, "client": (client, 1), "server": ("127.0.0.1", 8018), "query_string": b""})
        asyncio.run(assistant.local_request(request()))
        for item in (request(origin="https://foreign.example"), request(host="foreign.example"), request(client="192.168.1.5"), request(marker=False)):
            with self.assertRaises(HTTPException): asyncio.run(assistant.local_request(item))

    def test_upstream_auth_error_is_redacted(self):
        failure = HTTPError("url", 401, self.key, {}, io.BytesIO(self.key.encode()))
        with patch.object(assistant, "urlopen", side_effect=failure), self.assertRaises(HTTPException) as raised:
            assistant.open_upstream("/models", self.key)
        self.assertNotIn(self.key, str(raised.exception.detail))

    def test_network_failure_is_actionable(self):
        with patch.object(assistant, "urlopen", side_effect=URLError("offline")), self.assertRaises(HTTPException) as raised:
            assistant.open_upstream("/models", self.key)
        self.assertIn("网络", raised.exception.detail)

    def test_images_are_converted_for_chat_tools(self):
        self.store.save(self.key, "deepseek-flash", False)
        image = {"name": "diagram.png", "data_url": "data:image/png;base64," + base64.b64encode((ROOT / "assets/logos/logo-gray.png").read_bytes()).decode()}
        request = assistant.ConversationRequest(messages=[{"role": "user", "content": "根据图建立模型", "images": [image]}, {"role": "assistant", "content": "请确认约束"}, {"role": "user", "content": "使用铰接"}])
        with patch.object(assistant, "STORE", self.store):
            _, payload = assistant.payload_for(request)
            content = payload["messages"][1]["content"]
            self.assertEqual(content[0], {"type": "text", "text": "根据图建立模型"})
            self.assertEqual(content[1]["image_url"]["url"], image["data_url"])
            self.assertEqual(content[1]["type"], "image_url")
            self.assertNotIn("images", payload["messages"][1])

    def test_pro_rejects_images_before_contacting_upstream(self):
        self.store.save(self.key, "deepseek-v4-pro", False)
        request = assistant.ConversationRequest(messages=[{"role": "user", "content": "读图", "images": [{"name": "x.png", "data_url": "data:image/png;base64,iVBORw0KGgo="}]}])
        with patch.object(assistant, "STORE", self.store), patch.object(assistant, "open_upstream") as upstream, self.assertRaises(HTTPException) as raised:
            assistant.payload_for(request)
        upstream.assert_not_called()
        self.assertIn("Flash", raised.exception.detail)

    def test_image_validation_rejects_remote_urls_bad_signatures_and_excessive_sizes(self):
        for data_url in ("https://example.com/diagram.png", "data:image/svg+xml;base64,PHN2Zy8+", "data:image/png;base64,aGVsbG8=", "data:image/png;base64,%%%%"):
            with self.subTest(url=data_url), self.assertRaises(HTTPException):
                assistant.image_bytes(assistant.ImageInput(data_url=data_url))
        image = "data:image/png;base64," + base64.b64encode(b"\x89PNG\r\n\x1a\n" + b"0" * (5 * 1024 * 1024)).decode()
        with self.assertRaises(HTTPException):
            assistant.image_bytes(assistant.ImageInput(data_url=image))

    def test_images_cannot_be_attached_to_assistant_messages(self):
        request = assistant.ConversationRequest(messages=[{"role": "assistant", "content": "test", "images": [{"data_url": "data:image/png;base64,iVBORw0KGgo="}]}, {"role": "user", "content": "test"}])
        with self.assertRaises(HTTPException) as raised:
            assistant.multimodal_messages(request, "deepseek-flash")
        self.assertIn("学生消息", raised.exception.detail)

    def test_streaming_chat_uses_server_instructions_and_reports_usage(self):
        self.store.save(self.key, "deepseek-flash", False)
        stream = 'data: {"choices":[{"delta":{"content":"你好"},"finish_reason":null}]}\n\ndata: {"choices":[{"delta":{},"finish_reason":"stop"}],"usage":{"total_tokens":10}}\n\ndata: [DONE]\n'
        async def collect(response):
            return [json.loads(item) async for item in response.body_iterator]
        with patch.object(assistant, "STORE", self.store), patch.object(assistant, "open_upstream", return_value=io.BytesIO(stream.encode())) as upstream:
            response = assistant.chat(assistant.ConversationRequest(messages=[{"role": "user", "content": "创建单摆"}]))
            output = asyncio.run(collect(response))
        self.assertEqual(output[0]["content"], "你好")
        self.assertEqual(output[-1]["usage"]["total_tokens"], 10)
        payload = upstream.call_args.args[2]
        self.assertIn("默认 XML", payload["messages"][0]["content"])
        self.assertEqual(payload["messages"][0]["role"], "system")

    def test_free_chat_tool_stream_produces_valid_files_without_writing_until_complete(self):
        self.store.save(self.key, "deepseek-flash", False)
        (self.folder / "manifest.yaml").write_text("tasks: []\n", encoding="utf-8")
        arguments = json.dumps({"task_id": "ai_test_spring", "files": example_bundle()})
        chunks = [
            {"choices": [{"delta": {"tool_calls": [{"index": 0, "function": {"name": "create_task", "arguments": arguments[:80]}}]}, "finish_reason": None}]},
            {"choices": [{"delta": {"tool_calls": [{"index": 0, "function": {"arguments": arguments[80:]}}]}, "finish_reason": None}]},
            {"choices": [{"delta": {}, "finish_reason": "tool_calls"}], "usage": {"total_tokens": 80}},
        ]
        raw = "\n\n".join("data: " + json.dumps(chunk) for chunk in chunks) + "\n\ndata: [DONE]\n"
        async def collect(response):
            return [json.loads(item) async for item in response.body_iterator]
        with patch.object(assistant, "STORE", self.store), patch.object(assistant, "TASKS_DIR", self.folder), patch.object(assistant, "open_upstream", return_value=io.BytesIO(raw.encode())):
            events = asyncio.run(collect(assistant.chat(assistant.ConversationRequest(messages=[{"role": "user", "content": "直接创建弹簧任务"}]))))
            self.assertFalse((self.folder / "ai_test_spring").exists())
            task = next(event for event in events if event["type"] == "draft")
            self.assertTrue(task["validation"]["valid"], task)
            self.assertEqual(events[-1]["type"], "done")
            result = assistant.create_task(assistant.BundleRequest.model_validate(task["draft"]))
            self.assertEqual(result["task"]["id"], "ai_test_spring")
        self.assertTrue((self.folder / "ai_test_spring/model.xml").is_file())

    def test_failed_tools_return_files_and_errors_for_followup_repair(self):
        files = example_bundle(); files["model.xml"] = "<mujoco/>"
        result = assistant.task_tool_result("create_task", json.dumps({"task_id": "ai_test_spring", "files": files}))
        self.assertFalse(result["validation"]["valid"])
        self.assertEqual(result["draft"]["files"], files)
        self.assertEqual(assistant.task_tool_result("create_task", "{broken")["type"], "task_error")
        self.assertEqual(assistant.task_tool_result("delete_task", "{}")["type"], "task_error")

    def test_truncated_tool_stream_never_returns_installable_files(self):
        self.store.save(self.key, "deepseek-flash", False)
        chunks = [{"choices": [{"delta": {"tool_calls": [{"index": 0, "function": {"name": "create_task", "arguments": "{broken"}}]}, "finish_reason": "length"}]}]
        raw = "data: " + json.dumps(chunks[0]) + "\n\ndata: [DONE]\n"
        async def collect(response):
            return [json.loads(item) async for item in response.body_iterator]
        with patch.object(assistant, "STORE", self.store), patch.object(assistant, "open_upstream", return_value=io.BytesIO(raw.encode())):
            events = asyncio.run(collect(assistant.chat(assistant.ConversationRequest(messages=[{"role": "user", "content": "创建任务"}]))))
        self.assertEqual(events[-1]["type"], "error")
        self.assertFalse(any(event["type"] == "draft" for event in events))

    def test_complete_duration_is_checked_before_publication(self):
        files = example_bundle()
        result = validate_bundle("ai_test_spring", files)
        self.assertTrue(result["valid"], result)
        self.assertAlmostEqual(result["duration"], .1)
        (self.folder / "manifest.yaml").write_text("tasks: []\n", encoding="utf-8")
        publish_bundle(self.folder, "ai_test_spring", files)
        self.assertEqual(list_tasks(self.folder)[0]["id"], "ai_test_spring")
        self.assertEqual(load_task(self.folder, "ai_test_spring")["id"], "ai_test_spring")
        self.assertTrue((self.folder / "ai_test_spring/assets/logo-gray.png").is_file())
        before = (self.folder / "manifest.yaml").read_bytes()
        with self.assertRaises(TaskValidationError): publish_bundle(self.folder, "ai_test_spring", files)
        self.assertEqual(before, (self.folder / "manifest.yaml").read_bytes())

    def test_create_tool_duplicate_id_is_returned_for_repair(self):
        (self.folder / "ai_test_spring").mkdir()
        arguments = json.dumps({"task_id": "ai_test_spring", "files": example_bundle()})
        with patch.object(assistant, "TASKS_DIR", self.folder):
            result = assistant.task_tool_result("create_task", arguments)
        self.assertFalse(result["validation"]["valid"])
        self.assertIn("任务已存在", result["validation"]["errors"][0])
        self.assertEqual(result["draft"]["files"], example_bundle())
        self.assertEqual(list((self.folder / "ai_test_spring").iterdir()), [])

    def test_manifest_write_failure_rolls_back_new_directory(self):
        (self.folder / "manifest.yaml").write_text("tasks: []\n")
        before = (self.folder / "manifest.yaml").read_bytes()
        replace = Path.replace
        def fail_manifest(path, destination):
            if Path(destination).name == "manifest.yaml": raise OSError("read-only")
            return replace(path, destination)
        with patch.object(Path, "replace", fail_manifest), self.assertRaises(OSError):
            publish_bundle(self.folder, "ai_test_spring", example_bundle())
        self.assertFalse((self.folder / "ai_test_spring").exists())
        self.assertEqual(before, (self.folder / "manifest.yaml").read_bytes())
        self.assertFalse(list(self.folder.glob(".ai-*")))

    def test_path_traversal_scripts_and_external_resources_are_rejected(self):
        for name in ("../outside.py", "scripts/control.py", "manifest.yaml"):
            files = example_bundle(); files[name] = "bad"
            self.assertFalse(validate_bundle("ai_test_spring", files)["valid"])
        for task_id in ("../outside", "A", "x/y"):
            self.assertFalse(validate_bundle(task_id, example_bundle())["valid"])
        for source in ('<include file="../secret.xml"/>', '<extension><plugin plugin="test"/></extension>', '<asset><texture name="x" fileleft="C:/secret.png"/></asset>', '<replicate count="1000000000"/>', '<asset><texture name="huge" builtin="flat" width="1000000" height="1000000"/></asset>'):
            files = example_bundle(); files["model.xml"] = files["model.xml"].replace("</mujoco>", source + "</mujoco>")
            self.assertFalse(validate_bundle("ai_test_spring", files)["valid"])

    def test_bad_observations_and_recursive_yaml_cannot_be_installed(self):
        files = example_bundle(); files["observe.yaml"] = "observe:\n  joints:\n  - name: missing_joint\n    fields: [position]\n"
        result = validate_bundle("ai_test_spring", files)
        self.assertFalse(result["valid"])
        files = example_bundle(); files["ui.yaml"] = "layout: &x {charts: [*x]}"
        self.assertFalse(validate_bundle("ai_test_spring", files)["valid"])

    def test_create_endpoint_refuses_invalid_drafts_without_writes(self):
        files = example_bundle(); files["model.xml"] = "<mujoco/>"
        with patch.object(assistant, "TASKS_DIR", self.folder), self.assertRaises(HTTPException) as raised:
            assistant.create_task(assistant.BundleRequest(task_id="ai_test_spring", files=files))
        self.assertEqual(raised.exception.status_code, 422)
        self.assertEqual(list(self.folder.iterdir()), [])

    def test_ai_task_accepts_one_million_steps_and_rejects_the_next_step(self):
        files = example_bundle()
        metadata = yaml.safe_load(files["task.yaml"])
        metadata["simulation"].update(duration=10, timestep=.00001)
        files["task.yaml"] = yaml.safe_dump(metadata, allow_unicode=True)
        check_bundle("ai_test_spring", files)
        metadata["simulation"]["duration"] = 10.00001
        files["task.yaml"] = yaml.safe_dump(metadata, allow_unicode=True)
        with self.assertRaisesRegex(TaskValidationError, "1000000"):
            check_bundle("ai_test_spring", files)


if __name__ == "__main__":
    unittest.main()
