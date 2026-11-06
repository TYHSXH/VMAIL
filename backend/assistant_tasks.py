"""Validate generated task bundles in isolation, then publish without overwriting."""
from __future__ import annotations

import json
import hashlib
import math
from pathlib import Path, PurePosixPath
import re
import shutil
import threading
import stat
import tempfile
import xml.etree.ElementTree as ET
from uuid import uuid4

import yaml

from .task_io import REQUIRED_FILES, TITLE_LOCK, TASK_STATE_LOCK, ACTIVE_SIMULATIONS, TaskValidationError, _read_yaml, list_tasks
from .simulator import MAX_STEPS
from .branding import DEFAULT_LOGO, referenced_logos, copy_brand_assets
from .workspace import ensure_tasks
from .assistant_process import run_worker

ROOT = Path(__file__).resolve().parents[1]
ALLOWED_FILES = set(REQUIRED_FILES) | {"loads.yaml", "README.md"}
MAX_BUNDLE_BYTES = 4 * 1024 * 1024
WINDOWS_DEVICE_NAMES = {"CON", "CONIN$", "CONOUT$", "PRN", "AUX", "NUL"} | {
    f"{prefix}{number}" for prefix in ("COM", "LPT") for number in range(1, 10)}


def relative_task_path(name: str, *, temporary=False) -> PurePosixPath:
    """Use one path policy for file tools, numerical scripts and task publication."""
    if not isinstance(name, str) or not name or "\\" in name or ":" in name or "\x00" in name:
        raise TaskValidationError("文件必须使用任务内的相对路径。")
    path = PurePosixPath(name)
    parts = path.parts[1:] if temporary and path.parts and path.parts[0] == ".tmp" else path.parts
    if not parts or path.is_absolute() or str(path) != name or any(p.startswith(".") or p.endswith((".", " ")) for p in parts):
        raise TaskValidationError("文件路径不能越出任务目录，也不能包含隐藏路径。")
    if any(p.split(".")[0].rstrip().upper() in WINDOWS_DEVICE_NAMES for p in parts):
        raise TaskValidationError("不能使用系统设备文件名。")
    return path


def checked_task_path(folder: Path, name: str) -> Path:
    path = folder / relative_task_path(name, temporary=True)
    if not path.resolve().is_relative_to(folder.resolve()) or any(
        is_link(p) for p in (path, *path.parents) if (p.exists() or p.is_symlink()) and p != folder.parent
    ):
        raise TaskValidationError("文件路径不能越出任务目录或经过链接。")
    return path


def task_file_name(name: str) -> str:
    """Only model/task inputs and reports; never platform files or executable launchers."""
    path = relative_task_path(name)
    allowed = name in ALLOWED_FILES or len(path.parts) > 1 and (
        path.parts[0] in {"assets", "models"} and path.suffix.lower() in {".xml", ".obj", ".stl"}
        or path.parts[0] == "scripts" and path.suffix.lower() == ".py"
        or path.parts[0] in {"results", "docs"} and path.suffix.lower() in {".csv", ".json", ".md", ".txt"})
    if not allowed:
        raise TaskValidationError("只能创建任务配置、MJCF/模型资源、任务 Python 脚本或实验报告，不能修改平台代码。")
    return name


def check_bundle(task_id: str, files: dict[str, str], existing_dir: Path | None = None) -> None:
    if not re.fullmatch(r"[a-z0-9_]{1,64}" if existing_dir is not None else r"[a-z][a-z0-9_]{0,63}", task_id):
        raise TaskValidationError("任务编号需以小写字母开头，只含小写字母、数字和下划线，最长 64 个字符。")
    if not set(REQUIRED_FILES) <= set(files):
        raise TaskValidationError("任务需包含六个必需文件。")
    for name in files:
        task_file_name(name)
    if len({name.casefold() for name in files}) != len(files):
        raise TaskValidationError("文件名不能只靠大小写区分。")
    if len(files) > 1000 or any(not isinstance(v, str) for v in files.values()) or sum(len(v.encode("utf-8")) for v in files.values()) > MAX_BUNDLE_BYTES:
        raise TaskValidationError("单次任务输入最多 1000 个文件、4 MiB；大资源请分次添加。")
    for name in files:
        if name.endswith(".yaml"):
            # YAML aliases are unnecessary here and can produce recursive graphs.
            for token in yaml.scan(files[name]):
                if isinstance(token, (yaml.tokens.AliasToken, yaml.tokens.AnchorToken)):
                    raise TaskValidationError("任务配置不支持 YAML 锚点与别名。")
            if not isinstance(yaml.safe_load(files[name]), dict):
                raise TaskValidationError(f"{name} 必须是 YAML 对象。")
    metadata = yaml.safe_load(files["task.yaml"])
    if metadata.get("id") != task_id:
        raise TaskValidationError("task.yaml 中的 id 必须与任务编号一致。")
    title = metadata.get("title")
    if not isinstance(title, str) or not title.strip() or len(title) > 80 or any(ord(c) < 32 for c in title):
        raise TaskValidationError("请提供 1–80 字符的单行任务标题。")
    simulation = metadata.get("simulation", {})
    duration, timestep = float(simulation.get("duration", 6)), float(simulation.get("timestep", .005))
    if not (math.isfinite(duration) and math.isfinite(timestep) and 0 < duration <= 3600 and timestep >= .00001 and math.ceil(duration / timestep) <= MAX_STEPS):
        raise TaskValidationError(f"任务仿真最多 3600 秒、{MAX_STEPS} 步，步长至少 0.00001 秒。")
    xml = files["model.xml"]
    if "<!" in xml:
        # Comments are harmless; declarations and entities are not accepted.
        xml_without_comments = re.sub(r"<!--[\s\S]*?-->", "", xml)
        if "<!" in xml_without_comments:
            raise TaskValidationError("模型不支持 XML 声明实体或 DTD。")
    root = ET.fromstring(xml)
    if root.tag != "mujoco" or len(list(root.iter())) > 10000:
        raise TaskValidationError("MJCF 模型最多 10000 个 XML 元素。")
    model_roots = [root]
    for name, content in files.items():
        if name != "model.xml" and name.endswith(".xml"):
            if "<!" in re.sub(r"<!--[\s\S]*?-->", "", content):
                raise TaskValidationError("模型资源不支持 XML 实体或 DTD。")
            model_roots.append(ET.fromstring(content))
    def expanded_count(node):
        count = 1 + sum(expanded_count(child) for child in node)
        if node.tag == "replicate":
            count *= int(node.get("count", 1))
        if count > 100000:
            raise TaskValidationError("模型批量展开超过 100000 个元素；请减少重复数量。")
        return count
    for model_root in model_roots:
        expanded_count(model_root)
    for node in (n for model_root in model_roots for n in model_root.iter()):
        if node.tag in {"extension", "plugin"}:
            raise TaskValidationError("任务不能加载原生插件；可使用 MuJoCo 内建建模功能。")
        if node.tag in {"texture", "hfield"} and int(node.get("width", node.get("ncol", 1))) * int(node.get("height", node.get("nrow", 1))) > 16_777_216:
            raise TaskValidationError("单个纹理/高度场最多 16777216 个像素/格点。")
        if node.tag == "flexcomp" and math.prod(int(v) for v in node.get("count", "1").split()) > 100000:
            raise TaskValidationError("柔性体网格过大，请减少节点数量。")
        for attribute, value in node.attrib.items():
            if (attribute.startswith("file") or attribute in {"assetdir", "meshdir", "texturedir"}) and value:
                # The simulator also resolves compiler directories and includes strictly inside the snapshot.
                if attribute.startswith("file") and attribute != "file" or ":" in value or Path(value).is_absolute() or ".." in Path(value.replace("\\", "/")).parts:
                    raise TaskValidationError("修改后的模型不能引用任务目录外的文件。")
    if existing_dir is not None:
        return
    floor = root.find("worldbody/geom[@name='floor']")
    logo = root.find(".//texture[@name='buaa_logo']")
    material = root.find(".//material[@name='buaa_floor']")
    if floor is None or logo is None or material is None or logo.get("file") != DEFAULT_LOGO or material.get("texture") != "buaa_logo" or floor.get("material") != "buaa_floor":
        raise TaskValidationError("请使用新模板的黑色 Logo，保留 floor、buaa_logo 纹理与 buaa_floor 材质。")
    if floor.get("type") != "plane":
        raise TaskValidationError("floor 必须是 worldbody 下的静态 plane 地面，请使用默认 XML 模板。")
    for node in (floor, material):
        rgba = [float(value) for value in node.get("rgba", "1 1 1 1").split()]
        if len(rgba) != 4 or rgba[3] != 1:
            raise TaskValidationError("地面和 buaa_floor 材质必须保持不透明（rgba 的 alpha=1）；0.1 仅用于网页 FloorBranding 的 Logo 水印，不是地面透明度。")
    if [float(value) for value in material.get("texrepeat", "1 1").split()] != [1, 1] or material.get("texuniform", "false") != "false":
        raise TaskValidationError('Logo 地面必须使用 texrepeat="1 1"、texuniform="false"，保留单个居中水印，不平铺。')


def write_bundle(folder: Path, files: dict[str, str]):
    folder.mkdir()
    for name, content in files.items():
        (folder / name).parent.mkdir(parents=True, exist_ok=True)
        (folder / name).write_text(content, encoding="utf-8")
    copy_brand_assets(folder, files['model.xml'])


def validate_bundle(task_id: str, files: dict[str, str], existing_dir: Path | None = None) -> dict:
    try:
        check_bundle(task_id, files, existing_dir)
        with tempfile.TemporaryDirectory(prefix="vmail-ai-check-") as temporary:
            folder = Path(temporary) / task_id
            if existing_dir is None:
                write_bundle(folder, files)
            else:
                copy_task_inputs(existing_dir, folder)
                for name, content in files.items():
                    (folder / name).parent.mkdir(parents=True, exist_ok=True)
                    (folder / name).write_text(content, encoding="utf-8")
                copy_brand_assets(folder, files['model.xml'])
            report = run_worker(folder, "validate", {}, threading.Event(), timeout=40)
            if not report.get("valid"):
                return {"valid": False, "errors": report.get("errors") or [report.get("error", "任务试运行失败。修复后可重新提交。")]}
            return {**report, **report.get("experiment", {})}
    except (TaskValidationError, ValueError, TypeError, AttributeError, RecursionError, OSError, yaml.YAMLError, ET.ParseError) as exc:
        return {"valid": False, "errors": [str(exc)[:2000]]}


def publish_bundle(tasks_dir: Path, task_id: str, files: dict[str, str]) -> dict:
    check_bundle(task_id, files)
    with TITLE_LOCK:
        ensure_tasks(tasks_dir)
        if (tasks_dir / task_id).exists() or any(t["id"] == task_id for t in list_tasks(tasks_dir)):
            raise TaskValidationError("任务编号已存在；继续修改请用 read_task / update_task，保留原编号。")
        manifest_path = tasks_dir / "manifest.yaml"
        manifest = _read_yaml(manifest_path)
        metadata = yaml.safe_load(files["task.yaml"])
        manifest.setdefault("tasks", []).append({"id": task_id, "title": metadata["title"], "path": task_id,
                                               "status": "ready", "description": str(metadata.get("question", ""))[:500]})
        # Prepare files on the same filesystem for an atomic directory rename.
        staging = tasks_dir / f".ai-{uuid4().hex}"
        temporary_manifest = manifest_path.with_name(f".manifest-{uuid4().hex}.tmp")
        destination = tasks_dir / task_id
        moved = False
        try:
            write_bundle(staging, files)
            temporary_manifest.write_text(yaml.safe_dump(manifest, allow_unicode=True, sort_keys=False), encoding="utf-8")
            staging.rename(destination)
            moved = True
            temporary_manifest.replace(manifest_path)
        except OSError:
            if moved:
                shutil.rmtree(destination)
            raise
        finally:
            if staging.exists():
                shutil.rmtree(staging)
            temporary_manifest.unlink(missing_ok=True)
    return {"id": task_id, "title": metadata["title"]}


def task_folder(tasks_dir: Path, task_id: str) -> Path:
    if not re.fullmatch(r"[a-z0-9_]{1,64}", task_id):
        raise TaskValidationError("无效的任务编号。")
    root = tasks_dir.resolve()
    folder = root / task_id
    if folder.resolve().parent != root or not folder.is_dir() or is_link(folder):
        raise TaskValidationError("任务不存在，或任务目录是链接，无法修改。")
    return folder


def is_link(path: Path) -> bool:
    metadata = path.lstat()
    return path.is_symlink() or bool(getattr(metadata, "st_file_attributes", 0) & getattr(stat, "FILE_ATTRIBUTE_REPARSE_POINT", 0))


def task_input_paths(folder: Path, *, include_results=False):
    """Prune results and caches before descending; never follow a task input link."""
    for path in sorted(folder.iterdir()):
        if path.name.startswith(".") or path.name == "__pycache__" or path.name == "results" and not include_results:
            continue
        if is_link(path):
            raise TaskValidationError("任务输入不能包含链接或目录联接。")
        if path.is_dir():
            yield from task_input_paths(path, include_results=include_results)
        elif path.is_file():
            yield path


def read_task_files(folder: Path, *, include_results=False) -> dict[str, str]:
    files, total = {}, 0
    for name in ALLOWED_FILES:
        path = folder / name
        if path.exists() and not path.is_file():
            raise TaskValidationError(f"{name} 必须是普通文件。")
    for path in task_input_paths(folder, include_results=include_results):
        name = path.relative_to(folder).as_posix()
        try:
            task_file_name(name)
        except TaskValidationError:
            continue
        if path.stat().st_size > MAX_BUNDLE_BYTES:
            raise TaskValidationError(f"{name} 文本输入超过 4 MiB，请拆分大型模型资源。")
        try:
            content = path.read_bytes().decode("utf-8-sig")
        except UnicodeError:
            if name in ALLOWED_FILES:
                raise TaskValidationError(f"{name} 必须是 UTF-8 文本。")
            continue  # Binary resources are copied intact, not sent as text.
        total += len(content.encode("utf-8"))
        if total > MAX_BUNDLE_BYTES:
            raise TaskValidationError("任务文本输入超过 4 MiB，请分拆大型模型资源。")
        files[name] = content
    return files


def preflight_task(folder: Path):
    check_bundle(folder.name, read_task_files(folder), folder)


def read_task_snapshot(tasks_dir: Path, task_id: str) -> dict:
    with TITLE_LOCK:
        folder = task_folder(tasks_dir, task_id)
        entry = next((item for item in list_tasks(tasks_dir) if item["id"] == task_id), None)
        if entry is None:
            raise TaskValidationError("任务未登记或已经删除，请重新选择任务。")
        files = read_task_files(folder)
        digest = hashlib.sha256(json.dumps(entry, sort_keys=True, ensure_ascii=False).encode("utf-8"))
        present = set()
        for path in task_input_paths(folder):
            name = path.relative_to(folder).as_posix()
            present.add(name)
            digest.update(name.encode())
            with path.open("rb") as handle:
                digest.update(hashlib.file_digest(handle, "sha256").digest())
        for name in sorted(ALLOWED_FILES - present):
            digest.update(name.encode() + b"<missing>")
        return {"task_id": task_id, "title": entry.get("title", task_id), "base_revision": digest.hexdigest(),
                "files": files, "missing_files": [name for name in REQUIRED_FILES if name not in files]}


def copy_task_inputs(source: Path, destination: Path):
    destination.mkdir()
    for path in task_input_paths(source):
        target = destination / path.relative_to(source)
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(path, target)


def prepare_update(tasks_dir: Path, task_id: str, changes: dict[str, str], base_revision: str):
    if not changes:
        raise TaskValidationError("请提供要修改的文件。")
    for name in changes:
        task_file_name(name)
    if sum(len(content.encode("utf-8")) for content in changes.values()) > MAX_BUNDLE_BYTES:
        raise TaskValidationError("本次修改内容超过 4 MiB，请分次修改。")
    snapshot = read_task_snapshot(tasks_dir, task_id)
    if snapshot["base_revision"] != base_revision:
        raise TaskValidationError("任务已被其他操作修改，请用 read_task 重新读取后再修改，避免覆盖新内容。")
    return snapshot, {**snapshot["files"], **changes}


def update_bundle(tasks_dir: Path, task_id: str, changes: dict[str, str], base_revision: str) -> dict:
    with TASK_STATE_LOCK, TITLE_LOCK:
        if ACTIVE_SIMULATIONS.get(task_id, 0):
            raise TaskValidationError("任务正在批量计算，请等待完成或取消后再保存修改。")
        _, files = prepare_update(tasks_dir, task_id, changes, base_revision)
        folder = task_folder(tasks_dir, task_id)
        check_bundle(task_id, files, folder)
        manifest_path = tasks_dir / "manifest.yaml"
        manifest = _read_yaml(manifest_path)
        metadata = yaml.safe_load(files["task.yaml"])
        entry = next(item for item in manifest["tasks"] if item["id"] == task_id)
        entry.update(title=metadata["title"], description=str(metadata.get("question", ""))[:500])
        targets = {folder / name: content.encode("utf-8") for name, content in changes.items()}
        for path in targets:
            if not path.resolve().is_relative_to(folder.resolve()) or any(is_link(parent) for parent in path.parents if parent.exists() and parent != folder.parent):
                raise TaskValidationError("修改路径不能经过链接或越出任务目录。")
        for name, source in referenced_logos(files['model.xml']).items():
            logo = folder / name
            if not logo.exists():
                if logo.parent.exists() and is_link(logo.parent):
                    raise TaskValidationError("资源目录不能是链接。")
                targets[logo] = source.read_bytes()
        targets[manifest_path] = yaml.safe_dump(manifest, allow_unicode=True, sort_keys=False).encode("utf-8")
        originals = {path: path.read_bytes() if path.exists() else None for path in targets}
        backup = ROOT / ".local" / "task-history" / task_id / uuid4().hex
        backup.mkdir(parents=True)
        for path, raw in originals.items():
            if raw is not None:
                relative = Path("manifest.yaml") if path == manifest_path else path.relative_to(folder)
                saved = backup / relative
                saved.parent.mkdir(parents=True, exist_ok=True)
                saved.write_bytes(raw)
        pending, written = {}, []
        try:
            for path, raw in targets.items():
                path.parent.mkdir(parents=True, exist_ok=True)
                temporary = path.with_name(f".{path.name}.{uuid4().hex}.tmp")
                pending[path] = temporary
                temporary.write_bytes(raw)
            for path, temporary in pending.items():
                temporary.replace(path)
                written.append(path)
        except OSError:
            for path in reversed(written):
                original = originals[path]
                if original is None:
                    path.unlink(missing_ok=True)
                else:
                    restore = path.with_name(f".{path.name}.{uuid4().hex}.restore")
                    restore.write_bytes(original)
                    restore.replace(path)
            raise
        finally:
            for temporary in pending.values():
                temporary.unlink(missing_ok=True)
        return {"id": task_id, "title": metadata["title"], "updated": True,
                "base_revision": read_task_snapshot(tasks_dir, task_id)["base_revision"]}
