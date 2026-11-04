"""Folder-discovered course resources; workspace copies never mutate originals."""
from pathlib import Path
from uuid import uuid4
import hashlib
import shutil
import yaml

from .task_io import REQUIRED_FILES, TITLE_LOCK, TaskValidationError, _read_yaml, load_task, list_tasks

ROOT = Path(__file__).resolve().parents[1]
COURSE_ROOT = ROOT / "course_resources"


def resource_key(kind, path):
    return hashlib.sha256(f"{kind}/{path}".encode()).hexdigest()[:24]


def provider_label(group, author, student_id):
    label = "课程组" if group == "course_team" else f"{group}届" if group.isdigit() else group
    if group == "course_team":
        return author if author == label else f"{label}-{author}"
    return "-".join(part for part in (label, student_id, author) if part)


def course_resources():
    resources = []
    for kind, marker in (("models", "resource.yaml"), ("tasks", "task.yaml")):
        base = COURSE_ROOT / kind
        for file in sorted(base.rglob(marker)):
            folder = file.parent
            if not folder.resolve().is_relative_to(base.resolve()):
                continue
            relative = folder.relative_to(base)
            if len(relative.parts) < 2:
                continue
            try:
                meta = _read_yaml(file)
                if kind == "tasks" and any(not (folder / name).is_file() for name in REQUIRED_FILES):
                    continue
                group = relative.parts[0]
                author = str(meta.get("author", "课程组" if group == "course_team" else "课程贡献者")).strip()
                student_id = str(meta.get("student_id", "")).strip()
                key = resource_key(kind, relative.as_posix())
                entries = meta.get("entries", ["model.xml"]) if kind == "models" else []
                if kind == "models" and (not isinstance(entries, list) or not entries or any(not isinstance(entry, str) or not entry.lower().endswith('.xml') for entry in entries)):
                    continue
                preview = next((name for name in ("preview.png", "preview.jpg", "preview.webp") if (folder / name).is_file()), None)
                resources.append({"id": key, "kind": kind, "title": str(meta.get("title", folder.name)),
                    "description": str(meta.get("description", meta.get("question", ""))),
                    "group": group, "group_label": "课程组" if group == "course_team" else f"{group}届" if group.isdigit() else group,
                    "category": str(meta.get("category", " / ".join(relative.parts[1:-1]) or ("课程任务" if kind == "tasks" else "未分类"))),
                    "author": author, "student_id": student_id,
                    "provider": provider_label(group, author, student_id),
                    "entries": entries, "model_id": meta.get("model_id", f"course_{key}"),
                    "preview": f"/api/course-resources/{key}/image" if preview else None,
                    "_folder": folder, "_preview": preview, "_meta": meta})
            except (TaskValidationError, OSError, ValueError):
                continue
    return resources


def find_resource(key):
    item = next((item for item in course_resources() if item["id"] == key), None)
    if item is None:
        raise TaskValidationError("课程资源不存在，请刷新课程空间。")
    return item


def public_resource(item):
    return {key: value for key, value in item.items() if not key.startswith("_")}


def reproduce_task(key, tasks_dir):
    item = find_resource(key)
    if item["kind"] != "tasks":
        raise TaskValidationError("请选择课程任务。")
    with TITLE_LOCK:
        entries = list_tasks(tasks_dir)
        existing = next((entry for entry in entries if entry.get("course_resource") == key and (tasks_dir / entry["id"]).is_dir()), None)
        if existing:
            return {**existing, "existing": True}
        task_id = f"course_{key}"
        if (tasks_dir / task_id).exists():
            task_id += "_" + uuid4().hex[:8]
        staging = tasks_dir / f".course-{uuid4().hex}"
        destination = tasks_dir / task_id
        published = False
        # Reject links before copying; never copy personal experiment results.
        for path in item["_folder"].rglob("*"):
            if path.is_symlink() or not path.resolve().is_relative_to(item["_folder"].resolve()):
                raise TaskValidationError("课程任务包含外部链接，无法复现。")
        try:
            shutil.copytree(item["_folder"], staging, ignore=shutil.ignore_patterns("results", "__pycache__", ".git"))
            config = _read_yaml(staging / "task.yaml")
            config["id"] = task_id
            (staging / "task.yaml").write_text(yaml.safe_dump(config, allow_unicode=True, sort_keys=False), encoding="utf-8")
            staging.rename(destination)
            published = True
            load_task(tasks_dir, task_id)
            entry = {"id": task_id, "title": item["title"], "path": task_id, "status": "ready", "description": item["description"], "course_resource": key}
            manifest = _read_yaml(tasks_dir / "manifest.yaml")
            manifest.setdefault("tasks", []).append(entry)
            temporary = tasks_dir / f".manifest-{uuid4().hex}.tmp"
            try:
                temporary.write_text(yaml.safe_dump(manifest, allow_unicode=True, sort_keys=False), encoding="utf-8")
                temporary.replace(tasks_dir / "manifest.yaml")
            finally:
                temporary.unlink(missing_ok=True)
            return {**entry, "existing": False}
        except Exception:
            for folder in ([staging, destination] if published else [staging]):
                if folder.is_dir() and folder.resolve().parent == tasks_dir.resolve():
                    shutil.rmtree(folder)
            raise


def contributed_models():
    models = []
    for item in course_resources():
        if item["kind"] != "models" or item["_meta"].get("model_id"):
            continue
        folder = item["_folder"]
        entries = item["entries"]
        if not isinstance(entries, list) or not entries or any(not isinstance(entry, str) or not (folder / entry).resolve().is_relative_to(folder.resolve()) or not (folder / entry).is_file() for entry in entries):
            continue
        models.append({"id": item["model_id"], "title": item["title"], "folder": str(folder), "entrypoints": entries, "xml_files": [{"path": entry} for entry in entries]})
    return models
