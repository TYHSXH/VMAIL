"""Installation/startup checks; imports only the standard library until requested."""
from __future__ import annotations

import argparse
import importlib
from importlib.metadata import version, PackageNotFoundError
import json
from pathlib import Path
import re
import sys
import sysconfig
import tempfile

ROOT = Path(__file__).resolve().parents[1]


def check_python() -> None:
    if sys.version_info < (3, 12) or sysconfig.get_platform() != "win-amd64":
        raise RuntimeError("Use 64-bit x86 Windows Python 3.12 or newer; Python 3.12 is recommended.")


def check_project(root: Path = ROOT) -> None:
    required = ["app/index.html", "app/help.html", "requirements.txt", "tasks/manifest.yaml",
                "docs/user-guide.md", "prompts/student-task-builder.md", "model_library/catalog.json",
                "docs/task-package-spec.md", "docs/mesh-modeling.md", "assets/logos/logo-gray.png", "constraints.txt",
                "app/.vite/manifest.json", "THIRD_PARTY_NOTICES.md", "COPYRIGHT.md", "LICENSE", "NOTICE", "assets/logos/LICENSE.txt"]
    required.extend("licenses/" + name for name in ["mujoco-LICENSE.txt", "mujoco-THIRD_PARTY.md", "three-LICENSE.txt",
                    "katex-LICENSE.txt", "marked-LICENSE.txt", "dompurify-LICENSE.txt", "emscripten-LICENSE.txt"])
    for name in required:
        if not (root / name).is_file():
            raise RuntimeError(f"Missing project file: {name}. Copy the complete VMAIL release, including app/.")
    for name in ["app/index.html", "app/help.html"]:
        source = (root / name).read_text(encoding="utf-8")
        for asset in re.findall(r'(?:src|href)=["\'](/static/[^"\']+)["\']', source):
            path = root / "app" / asset.removeprefix("/static/")
            if not path.is_file():
                raise RuntimeError(f"Missing built asset: {path.name}. Copy the complete app/ folder.")
    if not any((root / "app" / "assets").glob("*.wasm")):
        raise RuntimeError("Missing browser MuJoCo WASM. Copy the complete app/ folder.")
    manifest = json.loads((root / "app/.vite/manifest.json").read_text(encoding="utf-8"))
    for entry in manifest.values():
        for asset in [entry["file"], *entry.get("css", []), *entry.get("assets", [])]:
            path = (root / "app" / asset).resolve()
            if not path.is_relative_to((root / "app").resolve()) or not path.is_file():
                raise RuntimeError(f"Missing built asset: {asset}. Copy the complete app/ folder.")
    # Batch results are written here. Verify permissions before starting the server.
    with tempfile.TemporaryFile(dir=root / "tasks"):
        pass
    (root / ".local").mkdir(exist_ok=True)
    with tempfile.TemporaryFile(dir=root / ".local"):
        pass


def check_runtime() -> None:
    for name, expected in re.findall(r"^([\w.-]+)==([^\s]+)$", (ROOT / "constraints.txt").read_text(encoding="utf-8"), re.MULTILINE):
        try:
            installed = version(name)
        except PackageNotFoundError:
            raise RuntimeError(f"Missing dependency {name}. Run setup.bat to install the verified environment.") from None
        if installed != expected:
            raise RuntimeError(f"Dependency {name}: expected {expected}, found {installed}. Run setup.bat.")
    for name in ["fastapi", "uvicorn", "yaml", "numpy"]:
        importlib.import_module(name)
    import mujoco
    if mujoco.__version__ != "3.13.0":
        raise RuntimeError(f"MuJoCo 3.13.0 is required, found {mujoco.__version__}.")
    model = mujoco.MjModel.from_xml_string('<mujoco><worldbody><body><joint type="slide"/><geom size=".1" mass="1"/></body></worldbody></mujoco>')
    data = mujoco.MjData(model)
    mujoco.mj_step(model, data)
    if not data.time > 0:
        raise RuntimeError("Native MuJoCo did not advance the simulation.")


def check_environment(root: Path = ROOT) -> None:
    check_python()
    marker = root / ".venv" / "vmail-environment.json"
    # Only apply the project-venv marker to that interpreter, never to Conda.
    if Path(sys.prefix).resolve() == (root / ".venv").resolve() and marker.is_file():
        owner = json.loads(marker.read_text(encoding="utf-8"))["project"]
        if Path(owner).resolve() != root.resolve():
            raise RuntimeError("This .venv was copied/moved. Run setup.bat to create a local environment.")
    check_project(root)
    check_runtime()


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--quiet", action="store_true")
    args = parser.parse_args()
    try:
        check_environment()
    except Exception as exc:
        print(f"Environment check failed: {exc}")
        print("Run setup.bat, or install requirements.txt in your active Conda/Python environment.")
        return 1
    if not args.quiet:
        print("Environment OK: project assets, write permissions and native MuJoCo simulation verified.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
