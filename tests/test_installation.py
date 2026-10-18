import json
from pathlib import Path
import shutil
import tempfile
import unittest
from unittest.mock import patch

from backend.bootstrap import prepare_environment, reusable_environment
from backend.check_environment import ROOT, check_project, check_runtime
from backend.main import help_documents


class InstallationTests(unittest.TestCase):
    def test_student_help_contains_only_manual_and_prompt_guide(self):
        documents = help_documents()["documents"]
        self.assertEqual([item["path"] for item in documents], ["docs/user-guide.md", "prompts/student-task-builder.md"])
        self.assertTrue(all(item["source"].strip() for item in documents))

    def test_missing_built_asset_is_reported_before_startup(self):
        with tempfile.TemporaryDirectory() as folder:
            root = Path(folder)
            for name in ["requirements.txt", "tasks/manifest.yaml", "docs/user-guide.md", "prompts/student-task-builder.md", "model_library/catalog.json"]:
                path = root / name
                path.parent.mkdir(parents=True, exist_ok=True)
                shutil.copyfile(ROOT / name, path)
            (root / "app/assets").mkdir(parents=True)
            (root / "app/index.html").write_text('<script src="/static/assets/missing.js"></script>')
            (root / "app/help.html").write_text('<html></html>')
            (root / "app/assets/model.wasm").write_bytes(b'wasm')
            with self.assertRaisesRegex(RuntimeError, 'missing.js'):
                check_project(root)

    def test_copied_environment_is_rejected_without_running_it(self):
        with tempfile.TemporaryDirectory() as folder:
            root = Path(folder)
            environment = root / '.venv'
            (environment / 'Scripts').mkdir(parents=True)
            (environment / 'Scripts/python.exe').write_bytes(b'old environment')
            (environment / 'vmail-environment.json').write_text(json.dumps({'project': str(root / 'other-computer')}))
            with patch('backend.bootstrap.subprocess.run') as run:
                self.assertFalse(reusable_environment(environment, root))
                run.assert_not_called()

    def test_rebuild_preserves_old_environment_and_uses_current_python(self):
        with tempfile.TemporaryDirectory() as folder:
            root = Path(folder)
            (root / '.venv').mkdir()
            (root / '.venv/keep.txt').write_text('preserve')
            with patch('backend.bootstrap.reusable_environment', return_value=False), patch('backend.bootstrap.subprocess.run') as run:
                prepare_environment(root)
            backups = list(root.glob('.venv.backup-*'))
            self.assertEqual(len(backups), 1)
            self.assertEqual((backups[0] / 'keep.txt').read_text(), 'preserve')
            self.assertEqual(run.call_args.args[0][1:3], ['-m', 'venv'])

    def test_native_runtime_and_project_release_are_usable(self):
        check_project()
        check_runtime()


if __name__ == '__main__':
    unittest.main()
