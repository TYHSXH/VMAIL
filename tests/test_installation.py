import json
import sys
from pathlib import Path
import shutil
import tempfile
import unittest
from unittest.mock import patch

from backend.bootstrap import prepare_environment, reusable_environment
from backend.check_environment import ROOT, check_project, check_runtime
from backend.main import help_documents


class InstallationTests(unittest.TestCase):
    def test_student_help_contains_consolidated_manual_and_task_guide(self):
        documents = help_documents()["documents"]
        self.assertEqual([item["path"] for item in documents], ["docs/user-guide.md", "docs/task-guide.md", "docs/course-resources.md"])
        self.assertTrue(all(item["source"].strip() for item in documents))
        self.assertIn("## 课程教学路径", documents[0]["source"])
        self.assertIn("## 网页计算、后台重算与实验导出", documents[0]["source"])
        self.assertIn("#### 详细版提示词", documents[1]["source"])
        self.assertIn("## 复杂几何体与 STL／MJCF 建模", documents[1]["source"])

    def test_missing_built_asset_is_reported_before_startup(self):
        with tempfile.TemporaryDirectory() as folder:
            root = Path(folder)
            for name in ["requirements.txt", "tasks/manifest.yaml", "docs/user-guide.md", "docs/task-guide.md", "docs/course-resources.md", "model_library/catalog.json", "docs/task-package-spec.md", "assets/logos/logo-black.png", "assets/logos/logo-gray.png", "assets/logos/LICENSE.txt", "constraints.txt", "THIRD_PARTY_NOTICES.md", "COPYRIGHT.md", "LICENSE", "NOTICE"]:
                path = root / name
                path.parent.mkdir(parents=True, exist_ok=True)
                shutil.copyfile(ROOT / name, path)
            shutil.copytree(ROOT / "licenses", root / "licenses")
            (root / "app/.vite").mkdir(parents=True)
            (root / "app/.vite/manifest.json").write_text("{}")
            (root / "app/assets").mkdir(parents=True)
            (root / "app/index.html").write_text('<script src="/static/assets/missing.js"></script>')
            (root / "app/help.html").write_text('<html></html>')
            (root / "app/assets/model.wasm").write_bytes(b'wasm')
            with self.assertRaisesRegex(RuntimeError, 'missing.js'):
                check_project(root)

    def test_transitive_built_resource_is_checked(self):
        with tempfile.TemporaryDirectory() as folder:
            root = Path(folder)
            for name in ["app", "docs", "assets", "licenses"]:
                shutil.copytree(ROOT / name, root / name)
            for name in ["requirements.txt", "constraints.txt", "COPYRIGHT.md", "THIRD_PARTY_NOTICES.md", "LICENSE", "NOTICE", "model_library/catalog.json", "tasks/manifest.yaml"]:
                target = root / name
                target.parent.mkdir(parents=True, exist_ok=True)
                shutil.copyfile(ROOT / name, target)
            manifest = json.loads((root / "app/.vite/manifest.json").read_text(encoding="utf-8"))
            # Fonts are referenced through built CSS, rather than the HTML entry.
            resource = next(entry["file"] for entry in manifest.values() if entry["file"].endswith('.woff2'))
            (root / "app" / resource).unlink()
            with self.assertRaisesRegex(RuntimeError, "Missing built asset"):
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

    def test_python_probe_requires_working_pip_bootstrap(self):
        from backend import bootstrap
        with patch.object(sys, "argv", ["bootstrap", "--check-python"]), patch.object(bootstrap, "check_python"), patch.object(bootstrap.venv, "EnvBuilder") as builder:
            self.assertEqual(bootstrap.main(), 0)
            builder.assert_called_once_with(with_pip=True)
            builder.return_value.create.assert_called_once()

    def test_native_runtime_and_project_release_are_usable(self):
        check_project()
        check_runtime()


if __name__ == '__main__':
    unittest.main()
