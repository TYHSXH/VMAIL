import json
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch

from fastapi import HTTPException

from backend import main
from backend.task_io import TaskValidationError, delete_task, list_tasks


class TaskDeletionTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory(prefix="vmail-delete-test-")
        self.root = Path(self.temporary.name)
        (self.root / "manifest.yaml").write_text("tasks:\n  - id: disposable\n    title: Test\n  - id: retained\n    title: Keep\n")
        self.folder = self.root / "disposable"
        (self.folder / "results" / "run_test").mkdir(parents=True)
        (self.folder / "model.xml").write_text("test model")
        (self.folder / "results" / "run_test" / "data.csv").write_text("time,value\n0,1")
        (self.root / "retained").mkdir()
        (self.root / "retained" / "keep.txt").write_text("keep")

    def tearDown(self):
        self.temporary.cleanup()

    def test_deletion_removes_task_files_and_results_only(self):
        result = delete_task(self.root, "disposable")
        self.assertTrue(result["files_deleted"])
        self.assertFalse(self.folder.exists())
        self.assertEqual([entry["id"] for entry in list_tasks(self.root)], ["retained"])
        self.assertEqual((self.root / "retained/keep.txt").read_text(), "keep")
        self.assertFalse(list(self.root.glob(".delete-*")))

    def test_confirmation_and_active_computation_prevent_deletion(self):
        with patch.object(main, "TASKS_DIR", self.root):
            with self.assertRaises(HTTPException):
                main.api_delete_task("disposable", main.DeleteTaskRequest(confirm_task_id="retained"))
            with patch.dict(main.ACTIVE_SIMULATIONS, {"disposable": 1}), self.assertRaises(HTTPException) as raised:
                main.api_delete_task("disposable", main.DeleteTaskRequest(confirm_task_id="disposable"))
            self.assertEqual(raised.exception.status_code, 409)
        self.assertTrue((self.folder / "model.xml").exists())

    def test_failed_manifest_update_restores_directory_and_index(self):
        before = (self.root / "manifest.yaml").read_bytes()
        with patch.object(Path, "replace", side_effect=OSError("read-only")), self.assertRaises(OSError):
            delete_task(self.root, "disposable")
        self.assertTrue((self.folder / "results/run_test/data.csv").exists())
        self.assertEqual((self.root / "manifest.yaml").read_bytes(), before)
        self.assertFalse(list(self.root.glob(".delete-*")))

    def test_locked_files_are_reported_as_incomplete_cleanup(self):
        with patch("backend.task_io.shutil.rmtree", side_effect=OSError("locked")):
            result = delete_task(self.root, "disposable")
        self.assertFalse(result["files_deleted"])
        self.assertEqual(Path(result["cleanup_path"]).resolve().parent, self.root.resolve())
        self.assertTrue(Path(result["cleanup_path"]).exists())
        self.assertEqual([entry["id"] for entry in list_tasks(self.root)], ["retained"])

    def test_unknown_and_traversing_ids_leave_files_untouched(self):
        for task_id in ("../disposable", "manifest.yaml", "unknown"):
            with self.subTest(task_id=task_id), self.assertRaises(TaskValidationError):
                delete_task(self.root, task_id)
        self.assertTrue((self.folder / "model.xml").exists())

    def test_nested_symlink_cannot_delete_its_target(self):
        target = self.root / "retained/keep.txt"
        try:
            (self.folder / "link.txt").symlink_to(target)
        except OSError:
            self.skipTest("Symlink creation is not available")
        with self.assertRaises(TaskValidationError):
            delete_task(self.root, "disposable")
        self.assertEqual(target.read_text(), "keep")


if __name__ == "__main__":
    unittest.main()
