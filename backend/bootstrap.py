"""Configure a machine-local project venv without deleting an old environment."""
from __future__ import annotations

from datetime import datetime
import json
from pathlib import Path
import subprocess
import sys
import tempfile
import venv

from .check_environment import ROOT, check_project, check_python


def reusable_environment(environment: Path, root: Path) -> bool:
    python = environment / "Scripts" / "python.exe"
    if not python.is_file():
        return False
    marker = environment / "vmail-environment.json"
    if marker.is_file():
        try:
            if Path(json.loads(marker.read_text(encoding="utf-8"))["project"]).resolve() != root.resolve():
                return False
        except (OSError, ValueError, KeyError, TypeError):
            return False
    probe = "import sys,sysconfig,pathlib; assert sys.version_info >= (3,12); assert sysconfig.get_platform() == 'win-amd64'; assert pathlib.Path(sys.base_prefix).is_dir(); import pip"
    try:
        result = subprocess.run([str(python), "-c", probe], cwd=root, capture_output=True, timeout=20)
        return result.returncode == 0
    except (OSError, subprocess.TimeoutExpired):
        return False


def prepare_environment(root: Path = ROOT) -> Path:
    environment = root / ".venv"
    if reusable_environment(environment, root):
        return environment / "Scripts" / "python.exe"
    if environment.exists():
        if environment.is_symlink() or environment.resolve().parent != root.resolve():
            raise RuntimeError("Refusing to replace an environment outside the project folder.")
        if Path(sys.prefix).resolve() == environment.resolve():
            raise RuntimeError("Open a new terminal using base Python, then rerun setup.bat.")
        backup = root / (".venv.backup-" + datetime.now().strftime("%Y%m%d-%H%M%S-%f"))
        environment.rename(backup)
        print(f"Old environment preserved as {backup.name}", flush=True)
    print("Creating a local Python environment...", flush=True)
    subprocess.run([sys.executable, "-m", "venv", str(environment)], cwd=root, check=True)
    return environment / "Scripts" / "python.exe"


def main() -> int:
    try:
        check_python()
        if "--check-python" in sys.argv[1:]:
            # A version number alone does not prove venv templates are usable.
            # Some installed interpreters have inaccessible activation templates.
            import ensurepip
            with tempfile.TemporaryDirectory(prefix="vmail-python-check-") as folder:
                # Verify ensurepip as well: a Python installation can create a
                # bare venv yet fail when setup tries to install pip into it.
                venv.EnvBuilder(with_pip=True).create(folder)
            return 0
        check_project()
        python = prepare_environment()
        print("Installing Python dependencies, including native MuJoCo 3.13.0...", flush=True)
        subprocess.run([str(python), "-m", "pip", "install", "--disable-pip-version-check", "--only-binary=:all:", "-r", str(ROOT / "requirements.txt")], cwd=ROOT, check=True)
        subprocess.run([str(python), "-m", "backend.check_environment"], cwd=ROOT, check=True)
        marker = ROOT / ".venv" / "vmail-environment.json"
        marker.write_text(json.dumps({"project": str(ROOT.resolve())}, ensure_ascii=True), encoding="utf-8")
        return 0
    except (OSError, RuntimeError, subprocess.SubprocessError) as exc:
        print(f"Setup failed: {exc}")
        print("Check network access to your pip package index and folder write permissions.")
        print("If no matching package wheel exists, use 64-bit Python 3.12 and rerun setup.bat.")
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
