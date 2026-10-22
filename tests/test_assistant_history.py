from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch

from fastapi import HTTPException
from backend import assistant
from backend.assistant_history import ConversationStore


class HistoryTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.addCleanup(self.temporary.cleanup)
        self.path = Path(self.temporary.name) / "private/history.sqlite3"
        self.store = ConversationStore(self.path)

    def state(self, content="单摆实验"):
        return assistant.ConversationState(messages=[{"role": "user", "content": content}], input="下一问").model_dump()

    def test_restart_restores_text_images_draft_revision_and_failed_turn(self):
        state = self.state()
        state["messages"][0].update(images=[{"name": "题图", "data_url": "data:image/png;base64,iVBORw=="}], incomplete=True)
        state["draft"] = {"task_id": "test", "files": {name: "text" for name in ["task.yaml", "model.xml", "parameters.yaml", "observe.yaml", "ui.yaml", "notes.md"]}, "operation": "update", "base_revision": "a" * 64}
        state["validation"] = {"valid": False, "errors": ["还需修复"]}
        with patch.object(assistant, "HISTORY", self.store):
            assistant.save_conversation("chat-one", assistant.ConversationState.model_validate(state))
        restored = ConversationStore(self.path).read("chat-one")
        self.assertEqual(restored, assistant.ConversationState.model_validate(state).model_dump())
        self.assertEqual(self.store.list()[0]["title"], "单摆实验")

    def test_deleting_one_conversation_preserves_other_and_task_files(self):
        task = Path(self.temporary.name) / "model.xml"
        task.write_text("preserve")
        self.store.save("one", self.state("第一问"))
        self.store.save("two", self.state("第二问"))
        self.store.delete("one")
        self.assertEqual([item["id"] for item in self.store.list()], ["two"])
        self.assertEqual(self.store.read("two")["messages"][0]["content"], "第二问")
        self.assertEqual(task.read_text(), "preserve")
        with self.assertRaises(HTTPException) as raised:
            self.store.read("one")
        self.assertEqual(raised.exception.status_code, 404)

    def test_save_overwrites_atomically_and_parallel_sessions_remain_readable(self):
        self.store.save("one", self.state())
        with ThreadPoolExecutor(max_workers=4) as pool:
            list(pool.map(lambda index: self.store.save(str(index), self.state(str(index))), range(12)))
        self.assertEqual(len(self.store.list()), 13)
        self.store.save("one", self.state("已更新"))
        self.assertEqual(self.store.read("one")["messages"][0]["content"], "已更新")

    def test_connection_settings_are_not_serialized(self):
        state = assistant.ConversationState.model_validate({**self.state(), "api_key": "secret", "connection": {"key": "secret"}})
        with patch.object(assistant, "HISTORY", self.store):
            assistant.save_conversation("one", state)
        self.assertNotIn(b"secret", self.path.read_bytes())

    def test_invalid_ids_and_unwritable_directory_have_actionable_errors(self):
        for identifier in ("../outside", "x/y", "x' OR 1=1"):
            with self.assertRaises(HTTPException):
                self.store.save(identifier, self.state())
        blocked = Path(self.temporary.name) / "blocked"
        blocked.write_text("file")
        with self.assertRaises(HTTPException) as raised:
            ConversationStore(blocked / "history.sqlite3").list()
        self.assertEqual(raised.exception.status_code, 500)
        self.assertIn("权限", raised.exception.detail)
