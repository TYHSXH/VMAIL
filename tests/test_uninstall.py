import os
from pathlib import Path
import shutil
import subprocess
import tempfile
import unittest


ROOT = Path(__file__).resolve().parents[1]


@unittest.skipUnless(os.name == "nt", "Windows uninstall script")
class UninstallTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory(prefix="VMAIL 卸载 测试 ")
        self.folder = Path(self.temporary.name)
        self.project = self.folder / "project"
        (self.project / "backend").mkdir(parents=True)
        for name in ["uninstall.bat", "setup.bat", "requirements.txt", "backend/bootstrap.py", "backend/uninstall.ps1"]:
            shutil.copyfile(ROOT / name, self.project / name)
        self.environment = self.project / ".venv"
        self.environment.mkdir()
        (self.environment / "pyvenv.cfg").write_text("include-system-site-packages = false\n")
        (self.environment / "Lib").mkdir()
        (self.environment / "Lib/package.py").write_text("installed package")
        self.result = self.project / "tasks/example/results/run_test/data.csv"
        self.result.parent.mkdir(parents=True)
        self.result.write_text("time,value\n0,1\n")

    def tearDown(self):
        self.temporary.cleanup()

    def run_uninstall(self, wrapper=False):
        if wrapper:
            command = ["cmd.exe", "/d", "/c", "uninstall.bat"]
            cwd = self.project
        else:
            command = ["powershell.exe", "-NoProfile", "-ExecutionPolicy", "Bypass", "-File", str(self.project / "backend/uninstall.ps1")]
            # Prove the helper discovers its own project, not the caller's cwd.
            cwd = self.folder
        return subprocess.run(command, cwd=cwd, env={**os.environ, "VMAIL_NO_PAUSE": "1"}, capture_output=True, timeout=30)

    def test_bat_removes_environment_and_is_idempotent_preserving_data(self):
        backup = self.project / ".venv.backup-old"
        backup.mkdir()
        (backup / "keep.txt").write_text("keep backup")
        completed = self.run_uninstall(wrapper=True)
        self.assertEqual(completed.returncode, 0, completed.stdout + completed.stderr)
        self.assertFalse(self.environment.exists())
        self.assertEqual(self.result.read_text(), "time,value\n0,1\n")
        self.assertEqual((backup / "keep.txt").read_text(), "keep backup")
        self.assertTrue((self.project / "requirements.txt").is_file())
        self.assertEqual(self.run_uninstall(wrapper=True).returncode, 0)

    def test_non_virtual_environment_folder_is_not_removed(self):
        (self.environment / "pyvenv.cfg").unlink()
        completed = self.run_uninstall()
        self.assertNotEqual(completed.returncode, 0)
        self.assertTrue((self.environment / "Lib/package.py").is_file())

    def test_locked_module_prevents_any_package_removal(self):
        module = self.environment / "Lib/native.dll"
        module.write_bytes(b"native-module-fixture")
        with module.open("rb"):
            completed = self.run_uninstall()
        self.assertNotEqual(completed.returncode, 0)
        self.assertTrue((self.environment / "Lib/package.py").is_file())
        self.assertTrue((self.environment / "pyvenv.cfg").is_file())

    def test_junction_inside_environment_does_not_delete_external_files(self):
        outside = self.folder / "outside"
        outside.mkdir()
        (outside / "keep.txt").write_text("external data")
        junction = self.environment / "linked"
        created = subprocess.run(["cmd.exe", "/d", "/c", "mklink", "/J", "linked", str(outside)], cwd=self.environment, capture_output=True)
        self.assertEqual(created.returncode, 0, created.stdout + created.stderr)
        try:
            completed = self.run_uninstall()
            self.assertNotEqual(completed.returncode, 0)
            self.assertEqual((outside / "keep.txt").read_text(), "external data")
            self.assertTrue((self.environment / "Lib/package.py").is_file())
        finally:
            # Remove the junction itself without traversing its target.
            os.rmdir(junction)


if __name__ == "__main__":
    unittest.main()
