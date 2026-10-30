"""Validate generated task bundles in isolation, then publish without overwriting."""
from __future__ import annotations

import json
import hashlib
import math
from pathlib import Path
import re
import shutil
import subprocess
import sys
import stat
import tempfile
import xml.etree.ElementTree as ET
from uuid import uuid4

import yaml

from .task_io import REQUIRED_FILES, TITLE_LOCK, TASK_STATE_LOCK, ACTIVE_SIMULATIONS, TaskValidationError, _read_yaml, list_tasks
from .simulator import MAX_STEPS

ROOT = Path(__file__).resolve().parents[1]
ALLOWED_FILES = set(REQUIRED_FILES) | {"loads.yaml", "README.md"}


def check_bundle(task_id: str, files: dict[str, str], existing_dir: Path | None = None) -> None:
    if not re.fullmatch(r"[a-z0-9_]{1,64}" if existing_dir is not None else r"[a-z][a-z0-9_]{0,63}", task_id):
        raise TaskValidationError("任务编号需以小写字母开头，只含小写字母、数字和下划线，最长 64 个字符。")
    if set(files) - ALLOWED_FILES or not set(REQUIRED_FILES) <= set(files):
        raise TaskValidationError("任务需包含六个必需文件，可选 loads.yaml、README.md；不接受其他文件或路径。")
    if any(not isinstance(v, str) for v in files.values()) or sum(len(v.encode("utf-8")) for v in files.values()) > 256_000:
        raise TaskValidationError("任务草稿过大，请简化模型（总大小不超过 256 KB）。")
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
    if not (math.isfinite(duration) and math.isfinite(timestep) and 0 < duration <= 60 and timestep >= .00001 and math.ceil(duration / timestep) <= MAX_STEPS):
        raise TaskValidationError(f"AI 任务试运行限 60 秒仿真时长、{MAX_STEPS} 步，步长至少 0.00001 秒；请缩短时长或增大步长。")
    xml = files["model.xml"]
    if "<!" in xml:
        # Comments are harmless; declarations and entities are not accepted.
        xml_without_comments = re.sub(r"<!--[\s\S]*?-->", "", xml)
        if "<!" in xml_without_comments:
            raise TaskValidationError("模型不支持 XML 声明实体或 DTD。")
    root = ET.fromstring(xml)
    if root.tag != "mujoco" or len(list(root.iter())) > 800:
        raise TaskValidationError("请生成不超过 800 个元素的 MJCF 模型。")
    for node in root.iter():
        if node.tag in {"extension", "plugin"} or (node.tag == "include" and existing_dir is None):
            raise TaskValidationError("网页 AI 创建暂不支持 include、插件或外部模型，使用基础几何体建模。")
        if node.tag in {"replicate", "composite", "flexcomp", "deformable", "hfield", "skin", "size"}:
            raise TaskValidationError("网页 AI 创建暂不支持批量展开、柔性体或自定义内存分配，请使用基础刚体建模。")
        if existing_dir is None and node.tag == "texture" and (node.get("name") != "buaa_logo" or node.get("file") != "assets/logo-gray.png"):
            raise TaskValidationError("网页 AI 创建仅支持内置 logo 纹理，其他物体请使用 rgba 颜色。")
        if existing_dir is None and any(key in node.attrib for key in ("assetdir", "meshdir", "texturedir")):
            raise TaskValidationError("模型不可设置外部资源目录。")
        for attribute, value in node.attrib.items():
            if existing_dir is None and attribute.startswith("file") and not (attribute == "file" and node.tag == "texture" and value == "assets/logo-gray.png"):
                raise TaskValidationError("网页 AI 创建仅允许内置 logo 资源，不读取其他文件。")
            if existing_dir is not None and attribute.startswith("file") and value:
                # The simulator also resolves compiler directories and includes strictly inside the snapshot.
                if attribute != "file" or Path(value).is_absolute() or ".." in Path(value.replace("\\", "/")).parts:
                    raise TaskValidationError("修改后的模型不能引用任务目录外的文件。")
    if existing_dir is not None:
        return
    floor = root.find(".//geom[@name='floor']")
    logo = root.find(".//texture[@name='buaa_logo']")
    material = root.find(".//material[@name='buaa_floor']")
    if floor is None or logo is None or material is None or logo.get("file") != "assets/logo-gray.png" or material.get("texture") != "buaa_logo" or floor.get("material") != "buaa_floor":
        raise TaskValidationError("请保留默认模板的 floor、buaa_logo 纹理与 buaa_floor 材质。")


def write_bundle(folder: Path, files: dict[str, str]):
    folder.mkdir()
    for name, content in files.items():
        (folder / name).write_text(content, encoding="utf-8")
    (folder / "assets").mkdir()
    shutil.copyfile(ROOT / "assets/logos/logo-gray.png", folder / "assets" / "logo-gray.png")


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
                    (folder / name).write_text(content, encoding="utf-8")
                if 'assets/logo-gray.png' in files["model.xml"] and not (folder / "assets/logo-gray.png").exists():
                    (folder / "assets").mkdir(exist_ok=True)
                    shutil.copyfile(ROOT / "assets/logos/logo-gray.png", folder / "assets/logo-gray.png")
            process = subprocess.run(
                [sys.executable, "-m", "backend.assistant_validate", temporary, task_id],
                cwd=ROOT, capture_output=True, timeout=40, encoding="utf-8", errors="replace",
                creationflags=subprocess.CREATE_NO_WINDOW if sys.platform == "win32" else 0,
            )
            # MuJoCo warnings can precede the JSON result on stdout.
            if process.returncode or not process.stdout.strip():
                return {"valid": False, "errors": ["模型校验进程未正常完成，请简化模型后重新生成。"]}
            return json.loads(process.stdout.strip().splitlines()[-1])
    except subprocess.TimeoutExpired:
        return {"valid": False, "errors": ["模型校验超时，请简化机构或减少仿真步数。"]}
    except (TaskValidationError, ValueError, TypeError, AttributeError, RecursionError, yaml.YAMLError, ET.ParseError) as exc:
        return {"valid": False, "errors": [str(exc)[:2000]]}


def publish_bundle(tasks_dir: Path, task_id: str, files: dict[str, str]) -> dict:
    check_bundle(task_id, files)
    with TITLE_LOCK:
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


def read_task_snapshot(tasks_dir: Path, task_id: str) -> dict:
    with TITLE_LOCK:
        folder = task_folder(tasks_dir, task_id)
        entry = next((item for item in list_tasks(tasks_dir) if item["id"] == task_id), None)
        if entry is None:
            raise TaskValidationError("任务未登记或已经删除，请重新选择任务。")
        files = {}
        digest = hashlib.sha256(json.dumps(entry, sort_keys=True, ensure_ascii=False).encode("utf-8"))
        for name in sorted(ALLOWED_FILES):
            path = folder / name
            digest.update(name.encode())
            if path.exists() or path.is_symlink():
                if is_link(path) or not path.is_file() or path.stat().st_size > 256_000:
                    raise TaskValidationError(f"{name} 是链接、不是普通文件或体积过大，无法通过 AI 读取。")
                raw = path.read_bytes()
                digest.update(raw)
                files[name] = raw.decode("utf-8-sig")
            else:
                digest.update(b"<missing>")
        if sum(len(content.encode("utf-8")) for content in files.values()) > 256_000:
            raise TaskValidationError("任务配置超过 256 KB，请缩小配置后再通过网页修改。")
        return {"task_id": task_id, "title": entry.get("title", task_id), "base_revision": digest.hexdigest(),
                "files": files, "missing_files": [name for name in REQUIRED_FILES if name not in files]}


def copy_task_inputs(source: Path, destination: Path):
    destination.mkdir()
    for path in source.iterdir():
        if path.name in {"results", "scripts", ".git", "__pycache__"} or path.name.startswith("."):
            continue
        if is_link(path):
            raise TaskValidationError("任务输入含链接或目录联接，无法安全校验修改。")
        target = destination / path.name
        if path.is_dir():
            copy_task_inputs(path, target)
        elif path.is_file():
            shutil.copyfile(path, target)


def prepare_update(tasks_dir: Path, task_id: str, changes: dict[str, str], base_revision: str):
    if not changes or set(changes) - ALLOWED_FILES:
        raise TaskValidationError("只能修改任务配置、模型、说明文件，不能修改其他路径或脚本。")
    if sum(len(content.encode("utf-8")) for content in changes.values()) > 256_000:
        raise TaskValidationError("本次修改内容超过 256 KB，请分次修改。")
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
        logo = folder / "assets/logo-gray.png"
        if 'assets/logo-gray.png' in files["model.xml"] and not logo.exists():
            if logo.parent.exists() and is_link(logo.parent):
                raise TaskValidationError("资源目录不能是链接。")
            targets[logo] = (ROOT / "assets/logos/logo-gray.png").read_bytes()
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
