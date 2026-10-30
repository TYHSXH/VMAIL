"""Exercise the current AI edit path using real task validation and isolated files."""
import json
from pathlib import Path
import shutil
import tempfile
import unittest
from unittest.mock import patch

from backend import assistant, assistant_tasks
from backend.assistant_tasks import read_task_snapshot, validate_bundle, update_bundle
from backend.task_io import ACTIVE_SIMULATIONS, TaskValidationError, load_task, rename_task

ROOT = Path(__file__).resolve().parents[1]


class AssistantUpdateTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory(prefix="vmail-update-")
        self.addCleanup(self.temporary.cleanup)
        self.root = Path(self.temporary.name)
        self.tasks = self.root / "tasks"
        self.tasks.mkdir()
        self.task_id = "example_mass_spring"
        self.folder = self.tasks / self.task_id
        shutil.copytree(ROOT / "tasks" / self.task_id, self.folder, ignore=shutil.ignore_patterns("results", "__pycache__"))
        (self.tasks / "manifest.yaml").write_text(f"tasks:\n- id: {self.task_id}\n  title: Original\n", encoding="utf-8")
        (self.folder / "assets").mkdir(exist_ok=True)
        (self.folder / "assets/retained.bin").write_bytes(b"retain resource")
        (self.folder / "results").mkdir(exist_ok=True)
        (self.folder / "results/retained.csv").write_text("time,x\n0,1\n")
        self.snapshot = read_task_snapshot(self.tasks, self.task_id)

    def test_valid_update_tool_returns_an_edit_without_writing_until_saved(self):
        changes = {"notes.md": "# Revised explanation\n"}
        arguments = {"task_id": self.task_id, "files": changes, "base_revision": self.snapshot["base_revision"]}
        with patch.object(assistant, "TASKS_DIR", self.tasks):
            result = assistant.task_tool_result("update_task", json.dumps(arguments))
        self.assertTrue(result["validation"]["valid"], result)
        self.assertEqual((self.folder / "notes.md").read_text(encoding="utf-8"), self.snapshot["files"]["notes.md"])
        self.assertEqual(result["edit"]["files"], changes)
        with patch.object(assistant_tasks, "ROOT", self.root):
            saved = update_bundle(self.tasks, self.task_id, changes, self.snapshot["base_revision"])
        self.assertTrue(saved["updated"])
        self.assertEqual(load_task(self.tasks, self.task_id)["notes"], changes["notes.md"])
        self.assertNotEqual(saved["base_revision"], self.snapshot["base_revision"])
        self.assertEqual((self.folder / "assets/retained.bin").read_bytes(), b"retain resource")
        self.assertEqual((self.folder / "results/retained.csv").read_text(), "time,x\n0,1\n")
        backups = list((self.root / ".local/task-history" / self.task_id).glob("*/notes.md"))
        self.assertEqual(len(backups), 1)
        self.assertEqual(backups[0].read_text(encoding="utf-8"), self.snapshot["files"]["notes.md"])

    def test_stale_revision_and_active_simulation_prevent_update(self):
        with patch.dict(ACTIVE_SIMULATIONS, {self.task_id: 1}), self.assertRaisesRegex(TaskValidationError, "正在批量计算"):
            update_bundle(self.tasks, self.task_id, {"notes.md": "new"}, self.snapshot["base_revision"])
        rename_task(self.tasks, self.task_id, "Latest title")
        with self.assertRaisesRegex(TaskValidationError, "其他操作修改"):
            update_bundle(self.tasks, self.task_id, {"notes.md": "new"}, self.snapshot["base_revision"])
        self.assertEqual(load_task(self.tasks, self.task_id)["notes"], self.snapshot["files"]["notes.md"])

    def test_failed_manifest_replacement_rolls_back_changed_files(self):
        original = (self.folder / "notes.md").read_bytes()
        manifest = (self.tasks / "manifest.yaml").read_bytes()
        replace = Path.replace
        def fail_manifest(path, destination):
            if Path(destination).name == "manifest.yaml":
                raise OSError("locked manifest")
            return replace(path, destination)
        with patch.object(assistant_tasks, "ROOT", self.root), patch.object(Path, "replace", fail_manifest), self.assertRaises(OSError):
            update_bundle(self.tasks, self.task_id, {"notes.md": "new"}, self.snapshot["base_revision"])
        self.assertEqual((self.folder / "notes.md").read_bytes(), original)
        self.assertEqual((self.tasks / "manifest.yaml").read_bytes(), manifest)
        self.assertFalse(list(self.tasks.rglob("*.tmp")))

    def test_invalid_edit_is_rejected_before_publication(self):
        files = dict(self.snapshot["files"], **{"model.xml": "<mujoco><invalid/></mujoco>"})
        result = validate_bundle(self.task_id, files, self.folder)
        self.assertFalse(result["valid"])
        self.assertEqual(read_task_snapshot(self.tasks, self.task_id)["base_revision"], self.snapshot["base_revision"])
