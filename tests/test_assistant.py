from __future__ import annotations

import asyncio
import base64
import copy
import io
import json
import os
from pathlib import Path
import tempfile
import threading
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
from backend.task_io import REQUIRED_FILES, TaskValidationError, list_tasks, load_task, rename_task

ROOT = Path(__file__).resolve().parents[1]


def example_bundle(task_id="ai_test_spring"):
    files = {name: (ROOT / "course_resources/tasks/course_team" / "example_mass_spring" / name).read_text(encoding="utf-8") for name in REQUIRED_FILES}
    metadata = yaml.safe_load(files["task.yaml"]); metadata["id"] = task_id
    metadata["simulation"]["duration"] = .1
    files["task.yaml"] = yaml.safe_dump(metadata, allow_unicode=True)
    root = ET.fromstring(files["model.xml"])
    asset = ET.SubElement(root, "asset")
    ET.SubElement(asset, "texture", name="buaa_logo", type="2d", file="assets/logo-black.png")
    ET.SubElement(asset, "material", name="buaa_floor", texture="buaa_logo", texrepeat="1 1", texuniform="false")
    ET.SubElement(root.find("worldbody"), "geom", name="floor", type="plane", size="4 4 .1", pos="0 0 -.5", material="buaa_floor")
    files["model.xml"] = ET.tostring(root, encoding="unicode")
    return files


def tool_stream(name, arguments, number=1, finish="tool_calls"):
    call = {"index": 0, "id": f"call_{number}", "function": {"name": name, "arguments": arguments if isinstance(arguments, str) else json.dumps(arguments)}}
    chunk = {"choices": [{"delta": {"tool_calls": [call]}, "finish_reason": finish}], "usage": {"total_tokens": 10}}
    return io.BytesIO(("data: " + json.dumps(chunk) + "\n\ndata: [DONE]\n").encode())


def final_stream(content="验证完毕，任务已保存。", reasoning=""):
    return io.BytesIO(("data: " + json.dumps({"choices": [{"delta": {"content": content, "reasoning_content": reasoning}, "finish_reason": "stop"}]}) + "\n\ndata: [DONE]\n").encode())


async def approved_events(response):
    events = []
    async for raw in response.body_iterator:
        item = json.loads(raw)
        events.append(item)
        if item["type"] == "approval_required":
            assistant.decide(item["run_id"], item["approval_id"], "once")
    return events


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
        image = {"name": "diagram.png", "data_url": "data:image/png;base64," + base64.b64encode((ROOT / "assets/logos/logo-black.png").read_bytes()).decode()}
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
        stream = 'data: {"choices":[{"delta":{"content":"你好"},"finish_reason":null}]}\n\ndata: {"created":1793952000,"choices":[{"delta":{},"finish_reason":"stop"}],"usage":{"total_tokens":10,"prompt_tokens":8,"completion_tokens":2,"prompt_cache_hit_tokens":0,"prompt_cache_miss_tokens":8}}\n\ndata: [DONE]\n'
        async def collect(response):
            return [json.loads(item) async for item in response.body_iterator]
        with patch.object(assistant, "STORE", self.store), patch.object(assistant, "open_upstream", return_value=io.BytesIO(stream.encode())) as upstream:
            response = assistant.chat(assistant.ConversationRequest(messages=[{"role": "user", "content": "创建单摆"}]))
            output = asyncio.run(collect(response))
        self.assertEqual(next(e for e in output if e["type"] == "delta")["content"], "你好")
        self.assertEqual(output[-1]["usage"]["total_tokens"], 10)
        self.assertEqual(output[-1]["usage"]["estimated_cost_cny"], "0.000032")
        payload = upstream.call_args.args[2]
        self.assertIn("默认 XML", payload["messages"][0]["content"])
        self.assertEqual(payload["messages"][0]["role"], "system")

    def test_free_chat_tool_stream_saves_only_after_complete_output(self):
        self.store.save(self.key, "deepseek-flash", False)
        (self.folder / "manifest.yaml").write_text("tasks: []\n", encoding="utf-8")
        arguments = json.dumps({"task_id": "ai_test_spring", "files": example_bundle()})
        chunks = [
            {"choices": [{"delta": {"tool_calls": [{"index": 0, "id": "call_1", "function": {"name": "create_task", "arguments": arguments[:80]}}]}, "finish_reason": None}]},
            {"choices": [{"delta": {"tool_calls": [{"index": 0, "function": {"arguments": arguments[80:]}}]}, "finish_reason": None}]},
            {"choices": [{"delta": {}, "finish_reason": "tool_calls"}], "usage": {"total_tokens": 80}},
        ]
        raw = "\n\n".join("data: " + json.dumps(chunk) for chunk in chunks) + "\n\ndata: [DONE]\n"
        async def collect(response):
            return [json.loads(item) async for item in response.body_iterator]
        with patch.object(assistant, "STORE", self.store), patch.object(assistant, "TASKS_DIR", self.folder), patch.object(assistant, "open_upstream", side_effect=[io.BytesIO(raw.encode()), final_stream()]):
            events = asyncio.run(approved_events(assistant.chat(assistant.ConversationRequest(messages=[{"role": "user", "content": "直接创建弹簧任务"}]))))
            self.assertTrue((self.folder / "ai_test_spring").exists())
            task = next(event for event in events if event["type"] == "task_saved")
            self.assertTrue(task["validation"]["valid"], task)
            self.assertEqual(events[-1]["type"], "done")
            self.assertEqual(task["task"]["id"], "ai_test_spring")
        self.assertTrue((self.folder / "ai_test_spring/model.xml").is_file())

    def run_tool_sequence(self, responses, current_task_id=None):
        self.store.save(self.key, "deepseek-flash", False)
        calls = []
        sequence = iter([*responses, final_stream()])
        def upstream(path, key, payload):
            calls.append(copy.deepcopy(payload))
            response = next(sequence)
            return response() if callable(response) else response
        async def collect():
            response = assistant.chat(assistant.ConversationRequest(messages=[{"role": "user", "content": "创建或修复任务直到成功"}], current_task_id=current_task_id))
            return await approved_events(response)
        with patch.object(assistant, "STORE", self.store), patch.object(assistant, "TASKS_DIR", self.folder), patch.object(assistant, "open_upstream", side_effect=upstream):
            events = asyncio.run(collect())
        return events, calls

    def test_invalid_task_is_automatically_repaired_and_saved_in_one_turn(self):
        good = example_bundle()
        bad = {**good, "model.xml": "<mujoco/>"}
        events, calls = self.run_tool_sequence([
            tool_stream("create_task", {"task_id": "ai_test_spring", "files": bad}),
            tool_stream("create_task", {"task_id": "ai_test_spring", "files": good}, 2),
        ])
        failure = next(item for item in events if item["type"] == "draft")
        self.assertFalse(failure["validation"]["valid"])
        feedback = json.loads(calls[1]["messages"][-1]["content"])
        self.assertEqual(feedback["validation"], failure["validation"])
        self.assertEqual(calls[1]["messages"][-1]["tool_call_id"], "call_1")
        self.assertEqual(calls[1]["messages"][-2]["tool_calls"][0]["id"], "call_1")
        self.assertEqual(len(list_tasks(self.folder)), 1)
        self.assertTrue(load_task(self.folder, "ai_test_spring"))
        self.assertTrue(any(item["type"] == "task_saved" for item in events))
        self.assertEqual(events[-1]["type"], "done")
        self.assertEqual(calls[-1]["messages"][-1]["role"], "tool")
        self.assertEqual(events[-1]["usage"]["total_tokens"], 20)

    def test_bad_tool_arguments_are_returned_to_model_for_automatic_repair(self):
        events, calls = self.run_tool_sequence([
            tool_stream("create_task", "{broken"),
            tool_stream("create_task", {"task_id": "ai_test_spring", "files": example_bundle()}, 2),
        ])
        self.assertEqual(json.loads(calls[1]["messages"][-1]["content"])["type"], "task_error")
        self.assertTrue(any(item["type"] == "task_saved" for item in events))

    def test_length_limited_tool_output_is_not_executed_and_can_be_repaired(self):
        events, calls = self.run_tool_sequence([
            tool_stream("create_task", '{"task_id":"ai_test_spring","files":', finish="length"),
            tool_stream("create_task", {"task_id": "ai_test_spring", "files": example_bundle()}, 2),
        ])
        self.assertIn("长度上限", calls[1]["messages"][-1]["content"])
        self.assertFalse(any(item["type"] == "draft" for item in events))
        self.assertTrue(any(item["type"] == "task_saved" for item in events))

    def test_save_failure_is_reported_to_model_before_retrying_same_task(self):
        real_publish = assistant.publish_bundle
        count = 0
        def flaky_publish(*args):
            nonlocal count
            count += 1
            if count == 1:
                raise OSError("temporary file lock")
            return real_publish(*args)
        args = {"task_id": "ai_test_spring", "files": example_bundle()}
        with patch.object(assistant, "publish_bundle", side_effect=flaky_publish):
            events, calls = self.run_tool_sequence([tool_stream("create_task", args), tool_stream("create_task", args, 2)])
        self.assertIn("保存失败", calls[1]["messages"][-1]["content"])
        self.assertEqual(len(list_tasks(self.folder)), 1)
        self.assertTrue(any(item["type"] == "task_saved" for item in events))

    def test_conflicting_update_rereads_and_saves_without_recreating_task(self):
        publish_bundle(self.folder, "ai_test_spring", example_bundle())
        folder = self.folder / "ai_test_spring"
        (folder / "results").mkdir(exist_ok=True)
        (folder / "results/keep.csv").write_text("retained")
        revision = assistant.read_task_snapshot(self.folder, "ai_test_spring")["base_revision"]
        real_update = assistant.update_bundle
        count = 0
        def conflicting_update(*args):
            nonlocal count
            count += 1
            if count == 1:
                rename_task(self.folder, "ai_test_spring", "Changed elsewhere")
            with patch("backend.assistant_tasks.ROOT", self.folder):
                return real_update(*args)
        def edit(number, base_revision):
            return tool_stream("update_task", {"task_id": "ai_test_spring", "base_revision": base_revision, "files": {"notes.md": "# Repaired explanation\n"}}, number)
        with patch.object(assistant, "update_bundle", side_effect=conflicting_update):
            events, calls = self.run_tool_sequence([
                edit(1, revision),
                tool_stream("read_task", {"task_id": "ai_test_spring"}, 2),
                lambda: edit(3, assistant.read_task_snapshot(self.folder, "ai_test_spring")["base_revision"]),
            ], current_task_id="ai_test_spring")
        self.assertIn("其他操作修改", calls[1]["messages"][-1]["content"])
        self.assertNotEqual(json.loads(calls[2]["messages"][-1]["content"])["snapshot"]["base_revision"], revision)
        self.assertTrue(any(item["type"] == "task_saved" for item in events))
        self.assertTrue(next(item for item in events if item["type"] == "task_saved")["task"]["updated"])
        self.assertEqual(len(list_tasks(self.folder)), 1)
        self.assertEqual((folder / "notes.md").read_text(), "# Repaired explanation\n")
        self.assertEqual((folder / "results/keep.csv").read_text(), "retained")

    def test_repeated_failure_stops_at_limit_and_preserves_last_draft(self):
        bad = {name: "bad" for name in REQUIRED_FILES}
        args = {"task_id": "ai_test_spring", "files": bad}
        with patch.object(assistant, "MAX_TOOL_ROUNDS", 3):
            events, calls = self.run_tool_sequence([tool_stream("create_task", args, number) for number in range(3)])
        self.assertEqual(len(calls), 3)
        self.assertIn("3 次", events[-2]["message"])
        self.assertEqual(events[-1]["type"], "done")
        self.assertFalse((self.folder / "ai_test_spring").exists())
        self.assertEqual([item for item in events if item["type"] == "draft"][-1]["draft"]["files"], bad)
        # Reasoning mode requires keeping every tool/result pair.
        self.assertEqual(len(calls[2]["messages"]), len(calls[1]["messages"]) + 2)

    def test_stopping_after_validation_does_not_start_saving(self):
        self.store.save(self.key, "deepseek-flash", False)
        async def stop_before_save():
            response = assistant.chat(assistant.ConversationRequest(messages=[{"role": "user", "content": "创建任务"}]))
            async for raw in response.body_iterator:
                item = json.loads(raw)
                if item["type"] == "approval_required":
                    assistant.decide(item["run_id"], item["approval_id"], "once")
                if item.get("message") == "校验通过，正在保存任务…":
                    await response.body_iterator.aclose()
                    return
            self.fail("Did not reach validation")
        with patch.object(assistant, "STORE", self.store), patch.object(assistant, "TASKS_DIR", self.folder), patch.object(assistant, "open_upstream", return_value=tool_stream("create_task", {"task_id": "ai_test_spring", "files": example_bundle()})), patch.object(assistant, "publish_bundle") as publish:
            asyncio.run(stop_before_save())
        publish.assert_not_called()
        self.assertTrue(assistant.AI_SLOT.acquire(blocking=False))
        assistant.AI_SLOT.release()

    def test_disconnect_signals_a_blocked_worker_before_it_can_write(self):
        started, release, stopped, finished = (threading.Event() for _ in range(4))
        writes = []
        def worker():
            try:
                started.set()
                release.wait(3)
                if stopped.is_set():
                    return
                writes.append("unexpected write")
                yield "saved"
            finally:
                finished.set()
        async def disconnect():
            stream = assistant.cancellable_stream(worker(), stopped)
            task = asyncio.create_task(anext(stream))
            while not started.is_set():
                await asyncio.sleep(.01)
            task.cancel()
            try:
                await task
            except asyncio.CancelledError:
                pass
            self.assertTrue(stopped.is_set())
            release.set()
            await asyncio.to_thread(finished.wait, 3)
        asyncio.run(disconnect())
        self.assertTrue(finished.is_set())
        self.assertEqual(writes, [])

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
        self.assertEqual(events[-1]["type"], "done")
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
        self.assertTrue((self.folder / "ai_test_spring/assets/logo-black.png").is_file())
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
        for name in ("../outside.py", "backend/assistant.py", "manifest.yaml"):
            files = example_bundle(); files[name] = "bad"
            self.assertFalse(validate_bundle("ai_test_spring", files)["valid"])
        for task_id in ("../outside", "A", "x/y"):
            self.assertFalse(validate_bundle(task_id, example_bundle())["valid"])
        for source in ('<include file="../secret.xml"/>', '<extension><plugin plugin="test"/></extension>', '<asset><texture name="x" fileleft="C:/secret.png"/></asset>', '<replicate count="1000000000"/>', '<asset><texture name="huge" builtin="flat" width="1000000" height="1000000"/></asset>'):
            files = example_bundle(); files["model.xml"] = files["model.xml"].replace("</mujoco>", source + "</mujoco>")
            self.assertFalse(validate_bundle("ai_test_spring", files)["valid"])

    def test_new_tasks_enforce_opaque_plane_and_single_black_floor_logo(self):
        files = example_bundle()
        check_bundle("ai_test_spring", files)
        changes = [
            (".//texture[@name='buaa_logo']", "file", "assets/logo-gray.png"),
            (".//geom[@name='floor']", "type", "box"),
            (".//geom[@name='floor']", "rgba", "1 1 1 .1"),
            (".//material[@name='buaa_floor']", "rgba", "1 1 1 .1"),
            (".//material[@name='buaa_floor']", "texrepeat", "4 4"),
            (".//material[@name='buaa_floor']", "texuniform", "true"),
        ]
        for selector, attribute, value in changes:
            with self.subTest(attribute=attribute, value=value):
                xml = ET.fromstring(files["model.xml"])
                xml.find(selector).set(attribute, value)
                with self.assertRaises(TaskValidationError):
                    check_bundle("ai_test_spring", {**files, "model.xml": ET.tostring(xml, encoding="unicode")})
        xml = ET.fromstring(files["model.xml"])
        floor = xml.find("worldbody/geom[@name='floor']")
        xml.find("worldbody").remove(floor)
        ET.SubElement(xml.find("worldbody"), "body", name="moving_floor").append(floor)
        with self.assertRaises(TaskValidationError):
            check_bundle("ai_test_spring", {**files, "model.xml": ET.tostring(xml, encoding="unicode")})

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
