import asyncio
import copy
import io
import json
from pathlib import Path
import tempfile
import threading
import unittest
from unittest.mock import patch

from fastapi import HTTPException

from backend import assistant, assistant_agent, assistant_tasks
from backend.assistant_agent import TaskAgent, decide, steer, file_path, recover_workspaces
from backend.assistant_compute import run_script
from backend.assistant_history import ConversationStore
from backend.assistant_process import run_worker
from backend.assistant_tasks import publish_bundle
from backend.task_io import TaskValidationError
from tests.test_assistant import example_bundle, final_stream, tool_stream


class AgentTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.tasks = self.root / "tasks"
        self.tasks.mkdir()
        self.patchers = [patch.object(assistant_agent, "ROOT", self.root), patch.object(assistant_tasks, "ROOT", self.root)]
        for patcher in self.patchers:
            patcher.start()
            self.addCleanup(patcher.stop)
        self.agent = TaskAgent(self.tasks, threading.Event())
        self.addCleanup(self.agent.close)

    def collect(self, operation, decision="once"):
        events = []
        while True:
            try:
                item = next(operation)
                events.append(item)
                if item["type"] == "approval_required":
                    decide(item["run_id"], item["approval_id"], decision)
            except StopIteration as end:
                return events, end.value

    def test_correction_cancels_pending_approval_and_final_gate_rejects_late_messages(self):
        operation = self.agent.write("model", {"notes.md": "old proposal"})
        proposal = next(operation)
        steer(self.agent.id, "correction", "先别创建，改为讨论")
        steer(self.agent.id, "correction", "重复提交")
        events, result = self.collect(operation)
        self.assertTrue(result["denied"])
        self.assertEqual(events[0]["decision"], "revised")
        self.assertEqual(self.agent.take_messages(), [{"id": "correction", "content": "先别创建，改为讨论"}])
        self.assertEqual(self.agent.take_messages(final=True), [])
        with self.assertRaises(HTTPException):
            steer(self.agent.id, "late", "太晚的消息")

    def test_deep_thinking_can_be_disabled_without_max_effort(self):
        with patch.object(assistant.STORE, "snapshot", return_value=("test", "deepseek-flash")):
            _, payload = assistant.payload_for(assistant.ConversationRequest(messages=[{"role": "user", "content": "你好"}], deep_thinking=False))
        self.assertEqual(payload["thinking"], {"type": "disabled"})
        self.assertNotIn("reasoning_effort", payload)

    def test_stream_applies_correction_before_old_tools_or_after_a_plain_answer(self):
        for with_tool in (True, False):
            with self.subTest(with_tool=with_tool):
                requests = []
                def upstream(path, key, payload):
                    requests.append(copy.deepcopy(payload))
                    if len(requests) == 1:
                        run = next(run for run in assistant_agent.RUNS.values() if run is not self.agent)
                        assistant.send_steering_message(run.id, assistant.SteeringMessage(id="student-update", content="改为只解释，不要写文件"))
                        return tool_stream("write_task_files", {"task_id":"never_created", "files":{"notes.md":"old plan"}}) if with_tool else final_stream("旧回答")
                    return final_stream("已按补充修正。")
                async def run():
                    response = assistant.chat(assistant.ConversationRequest(messages=[{"role":"user","content":"讨论任务"}]))
                    return [json.loads(item) async for item in response.body_iterator]
                with patch.object(assistant, "TASKS_DIR", self.tasks), patch.object(assistant.STORE, "snapshot", return_value=("test", "deepseek-flash")), patch.object(assistant, "open_upstream", side_effect=upstream):
                    events = asyncio.run(run())
                self.assertEqual(events[-1]["type"], "done")
                self.assertEqual(requests[1]["messages"][-1], {"role":"user", "content":"改为只解释，不要写文件"})
                if with_tool:
                    self.assertTrue(json.loads(requests[1]["messages"][-2]["content"])["skipped"])
                self.assertEqual(len([e for e in events if e["type"] == "steering_applied"]), 1)
                self.assertFalse(any(e["type"] == "approval_required" for e in events))
                self.assertFalse((self.tasks / "never_created").exists())

    def test_file_write_waits_for_real_student_choice_and_denial_never_writes(self):
        op = self.agent.write("new_model", {"notes.md": "proposal"})
        item = next(op)
        path = self.agent.root / "new_model/notes.md"
        self.assertFalse(path.exists())
        self.assertFalse((self.tasks / "new_model").exists())
        decide(self.agent.id, item["approval_id"], "deny")
        _, result = self.collect(op)
        self.assertTrue(result["denied"])
        self.assertFalse(path.exists())
        with self.assertRaises(HTTPException):
            decide(self.agent.id, item["approval_id"], "once")

    def test_approved_files_save_then_commands_can_verify_and_temporary_files_are_removed(self):
        _, result = self.collect(self.agent.write("new_model", {**example_bundle("new_model"), ".tmp/check.py": "import numpy as np\nr = simulate(duration=.01)\nprint(np.max(np.abs(r['series']['time'])))\nwrite_text('.tmp/result.json', '{}')\n"}))
        self.assertTrue(result["staged"])
        events, command = self.collect(self.agent.command("new_model", "python .tmp/check.py"))
        self.assertEqual(command.get("exit_code"), 0, command)
        self.assertIn("0.01", command["stdout"])
        self.assertTrue(any(e["type"] == "command_result" for e in events))
        _, saved = self.collect(self.agent.save("new_model"))
        self.assertEqual(saved["type"], "task_saved", saved)
        self.assertTrue((self.tasks / "new_model/model.xml").is_file())
        self.assertFalse((self.tasks / "new_model/.tmp").exists())
        workspace = self.agent.root
        removed = self.agent.close()
        self.assertFalse(workspace.exists())
        self.assertTrue(any(r["path"] == ".tmp/check.py" and r["status"] == "cleaned" for r in removed))

    def test_turn_grants_are_task_scoped_and_expire_at_end_of_run(self):
        first, _ = self.collect(self.agent.write("one", {"notes.md": "a"}), "turn")
        second, _ = self.collect(self.agent.write("one", {"notes.md": "b"}))
        third, _ = self.collect(self.agent.write("two", {"notes.md": "c"}), "deny")
        self.assertTrue(any(e["type"] == "approval_required" for e in first))
        self.assertFalse(any(e["type"] == "approval_required" for e in second))
        self.assertTrue(any(e["type"] == "approval_required" for e in third))
        self.agent.close()
        another = TaskAgent(self.tasks, threading.Event())
        self.addCleanup(another.close)
        self.assertFalse(another.grants)

    def test_command_approval_is_bound_to_script_content(self):
        self.collect(self.agent.write("model", {".tmp/check.py": "print(1)"}), "turn")
        first, _ = self.collect(self.agent.command("model", "python .tmp/check.py"), "turn")
        self.collect(self.agent.write("model", {".tmp/check.py": "print(2)"}))
        second, result = self.collect(self.agent.command("model", "python .tmp/check.py"), "deny")
        self.assertTrue(any(e["type"] == "approval_required" for e in first))
        self.assertTrue(any(e["type"] == "approval_required" for e in second))
        self.assertTrue(result["denied"])

    def test_scoped_paths_and_host_commands_cannot_be_approved(self):
        folder = self.agent.stage("model")["folder"]
        for path in ("../outside.py", "C:/secret.txt", "backend/app.py", ".tmp/../../secret.txt", "assets/NUL.xml", "assets/a.xml:stream", "scripts/../x.py"):
            with self.subTest(path=path), self.assertRaises(TaskValidationError):
                file_path(folder, path)
        for command in ("powershell Get-Content C:/secret", "cmd /c dir", "python -c 'import os'", "python -m pip install requests", "python ../../outside.py", "python scripts/missing.py; whoami"):
            with self.subTest(command=command), self.assertRaises((TaskValidationError, OSError)):
                self.agent.command_spec("model", command)

    def test_numerical_python_supports_functions_arrays_and_scoped_reports(self):
        folder = self.agent.stage("model")["folder"]
        result = run_script(folder, "import numpy as np\nimport json\ndef energy(v):\n    return .5 * np.sum(np.array(v)**2)\nassert abs(energy([3,4])-12.5)<1e-9\nwrite_csv('results/check.csv', [{'energy':energy([3,4])}])\nprint(json.dumps(read_csv('results/check.csv')))\n")
        self.assertIn("12.5", result["stdout"])
        self.assertTrue((folder / "results/check.csv").exists())
        self.assertEqual(len((folder / "results/check.csv").read_text().splitlines()), 2)
        self.assertFalse((self.tasks / "model").exists())
        for source in ("import os", "import subprocess", "import ctypes", "print((1).__class__)", "import numpy as np\nnp.load('outside.npy')", "open('outside.txt','w')", "write_text('../outside.txt','x')", "read_text('C:/secret.txt')", "write_text('task.yaml','overwrite')", "write_text('.tmp/COM1','x')"):
            with self.subTest(source=source), self.assertRaises(Exception):
                run_script(folder, source)

    def test_approved_script_is_immutable_during_the_approval_wait(self):
        self.collect(self.agent.write("model", {".tmp/check.py": "print('approved')"}))
        op = self.agent.command("model", "python .tmp/check.py")
        approval = next(op)
        (self.agent.stage("model")["folder"] / ".tmp/check.py").write_text("print('changed after review')")
        decide(self.agent.id, approval["approval_id"], "once")
        _, result = self.collect(op)
        self.assertIn("approved", result["stdout"])
        self.assertNotIn("changed after review", result["stdout"])

    def test_startup_recovers_exited_server_workspace_but_keeps_live_workspaces(self):
        orphan = self.agent.root.parent / ("f" * 32)
        orphan.mkdir()
        (orphan / ".owner.json").write_text(json.dumps({"pid": 2_000_000_003}))
        (orphan / "discard.txt").write_text("temporary")
        recover_workspaces()
        self.assertFalse(orphan.exists())
        self.assertTrue(self.agent.root.exists())

    def test_cancelled_worker_is_killed_and_workspace_cleanup_is_confirmed_after_removal(self):
        self.collect(self.agent.write("model", {".tmp/loop.py": "while True:\n    pass\n"}))
        timer = threading.Timer(.5, self.agent.stopped.set)
        timer.start()
        self.addCleanup(timer.cancel)
        result = run_worker(self.agent.stage("model")["folder"], "python", {"source": "while True:\n    pass\n"}, self.agent.stopped)
        self.assertTrue(result.get("cancelled"), result)
        self.agent.close()
        self.assertFalse(self.agent.root.exists())
        self.assertFalse(assistant.run_status(self.agent.id)["active"])

    def test_version_conflict_does_not_overwrite_other_edits(self):
        publish_bundle(self.tasks, "model", example_bundle("model"))
        self.collect(self.agent.write("model", {"notes.md": "mine"}))
        (self.tasks / "model/notes.md").write_text("other", encoding="utf-8")
        with self.assertRaisesRegex(TaskValidationError, "其他操作修改"):
            self.collect(self.agent.save("model"))
        self.assertEqual((self.tasks / "model/notes.md").read_text(), "other")

    def test_persistent_task_script_can_be_read_and_run_in_the_next_workspace(self):
        files = {**example_bundle("model"), "scripts/check.py": "print('retained script')\n"}
        publish_bundle(self.tasks, "model", files)
        _, result = self.collect(self.agent.command("model", "python scripts/check.py"))
        self.assertEqual(result["exit_code"], 0, result)
        self.assertIn("retained script", result["stdout"])
        self.assertEqual((self.tasks / "model/scripts/check.py").read_text(), files["scripts/check.py"])

    def test_shared_input_scan_prunes_temporary_files_results_and_caches(self):
        stage = self.agent.stage("model")["folder"]
        for name in ("notes.md", "scripts/check.py", "results/report.csv", ".tmp/check.py", "__pycache__/cached.py"):
            path = stage / name
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text("test", encoding="utf-8")
        self.assertEqual(set(self.agent.files("model")), {"notes.md", "scripts/check.py", "results/report.csv"})
        self.assertEqual(set(assistant_tasks.read_task_files(stage)), {"notes.md", "scripts/check.py"})

    def test_multi_tool_reasoning_is_returned_and_save_does_not_end_agent(self):
        calls = [
            {"index": 0, "id": "a", "function": {"name": "list_tasks", "arguments": "{}"}},
            {"index": 1, "id": "b", "function": {"name": "read_task_docs", "arguments": '{"document":"rules","line_count":2}'}}]
        raw = "data: " + json.dumps({"choices": [{"delta": {"reasoning_content": "reasoning-test", "tool_calls": calls}, "finish_reason": "tool_calls"}]}) + "\n\ndata: [DONE]\n"
        requests = []
        responses = iter([io.BytesIO(raw.encode()), final_stream("done", "final-thinking")])
        def upstream(path, key, payload):
            requests.append(copy.deepcopy(payload))
            return next(responses)
        store = ConversationStore(self.root / "history.sqlite3")
        # read_task_docs uses the real repository, while task writes stay in the test workspace.
        async def run():
            response = assistant.chat(assistant.ConversationRequest(conversation_id="test", messages=[{"role": "user", "content": "read docs"}]))
            return [json.loads(item) async for item in response.body_iterator]
        with patch.object(assistant, "HISTORY", store), patch.object(assistant, "TASKS_DIR", self.tasks), patch.object(assistant.STORE, "snapshot", return_value=("test-key", "deepseek-flash")), patch.object(assistant, "open_upstream", side_effect=upstream):
            events = asyncio.run(run())
            self.assertEqual(events[-1]["type"], "done")
            self.assertEqual([(e["round"], e["content"]) for e in events if e["type"] == "reasoning_delta"], [(1, "reasoning-test"), (2, "final-thinking")])
            self.assertEqual("".join(e["content"] for e in events if e["type"] == "delta").strip(), "done")
            self.assertEqual(requests[0]["thinking"], {"type": "enabled"})
            self.assertEqual(requests[0]["reasoning_effort"], "max")
            self.assertEqual(requests[1]["messages"][-3]["reasoning_content"], "reasoning-test")
            self.assertEqual([m["tool_call_id"] for m in requests[1]["messages"][-2:]], ["a", "b"])
            _, next_payload = assistant.payload_for(assistant.ConversationRequest(conversation_id="test", messages=[{"role": "user", "content": "next"}]))
            self.assertTrue(any(m.get("reasoning_content") == "reasoning-test" for m in next_payload["messages"]))
            self.assertEqual(next_payload["messages"][-1]["content"], "next")
        store.delete("test")
        self.assertFalse(store.agent_read("test"))


if __name__ == "__main__":
    unittest.main()
