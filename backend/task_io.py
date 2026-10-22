from __future__ import annotations

from datetime import datetime
from pathlib import Path
from typing import Any
import csv
import json
import math
import re
import shutil
import stat
import threading
from uuid import uuid4

import yaml


class TaskValidationError(Exception):
    pass


REQUIRED_FILES = ["task.yaml", "model.xml", "parameters.yaml", "observe.yaml", "ui.yaml", "notes.md"]
TITLE_LOCK = threading.RLock()
TASK_STATE_LOCK = threading.RLock()
ACTIVE_SIMULATIONS: dict[str, int] = {}


def _read_yaml(path: Path) -> dict[str, Any]:
    if not path.exists():
        raise TaskValidationError(f"Missing required file: {path.name}")
    try:
        with path.open("r", encoding="utf-8") as handle:
            data = yaml.safe_load(handle) or {}
    except (yaml.YAMLError, OSError) as exc:
        raise TaskValidationError(f"无法读取 {path.name}: {exc}") from exc
    if not isinstance(data, dict):
        raise TaskValidationError(f"{path.name} must contain a YAML object.")
    return data


def _safe_task_id(task_id: str) -> str:
    if not re.fullmatch(r"[a-z0-9_]+", task_id):
        raise TaskValidationError("Invalid task id.")
    return task_id


def list_tasks(tasks_dir: Path) -> list[dict[str, Any]]:
    manifest_path = tasks_dir / "manifest.yaml"
    if not manifest_path.exists():
        return []
    manifest = _read_yaml(manifest_path)
    tasks = manifest.get("tasks", [])
    if not isinstance(tasks, list):
        raise TaskValidationError("tasks/manifest.yaml field 'tasks' must be a list.")
    seen = set()
    for entry in tasks:
        if not isinstance(entry, dict) or not isinstance(entry.get("id"), str):
            raise TaskValidationError("任务索引中的每个任务都必须包含 id。")
        _safe_task_id(entry["id"])
        if entry["id"] in seen:
            raise TaskValidationError(f"任务索引存在重复 id：{entry['id']}")
        seen.add(entry["id"])
    return tasks


def rename_task(tasks_dir: Path, task_id: str, title: str) -> dict[str, str]:
    """Update both title sources, using atomic file replacement and rollback."""
    title = title.strip()
    if not title or len(title) > 80 or any(ord(c) < 32 for c in title):
        raise TaskValidationError("任务标题需为 1–80 个字符，不能包含换行。")
    with TITLE_LOCK:
        task = load_task(tasks_dir, task_id)
        manifest_path = tasks_dir / "manifest.yaml"
        manifest = _read_yaml(manifest_path)
        entry = next((t for t in manifest.get("tasks", []) if t.get("id") == task_id), None)
        if entry is None:
            raise TaskValidationError("任务未登记在 manifest.yaml 中。")
        task_path = Path(task["path"]) / "task.yaml"
        originals = {p: p.read_bytes() for p in (task_path, manifest_path)}
        task["task"]["title"] = title
        entry["title"] = title
        payloads = {task_path: task["task"], manifest_path: manifest}
        written = []
        try:
            for path, payload in payloads.items():
                temporary = path.with_name(f".{path.name}.{uuid4().hex}.tmp")
                try:
                    temporary.write_text(yaml.safe_dump(payload, allow_unicode=True, sort_keys=False), encoding="utf-8")
                    temporary.replace(path)
                    written.append(path)
                finally:
                    temporary.unlink(missing_ok=True)
        except OSError as exc:
            for path in written:
                path.write_bytes(originals[path])
            raise TaskValidationError(f"标题保存失败：{exc}") from exc
    return {"id": task_id, "title": title}


def delete_task(tasks_dir: Path, task_id: str) -> dict[str, Any]:
    task_id = _safe_task_id(task_id)
    root = tasks_dir.resolve()
    folder = root / task_id
    with TITLE_LOCK:
        entries = list_tasks(root)
        if not any(entry["id"] == task_id for entry in entries):
            raise TaskValidationError("任务不存在或已经删除，请刷新列表。")
        if folder.resolve().parent != root or folder.is_symlink() or not folder.is_dir():
            raise TaskValidationError("任务目录不存在或指向项目外部，拒绝删除。")

        def check_tree(path):
            metadata = path.lstat()
            if path.is_symlink() or getattr(metadata, "st_file_attributes", 0) & getattr(stat, "FILE_ATTRIBUTE_REPARSE_POINT", 0):
                raise TaskValidationError("任务包含链接或目录联接，请先移除链接后再删除。")
            if path.is_dir():
                for child in path.iterdir():
                    check_tree(child)

        check_tree(folder)
        manifest_path = root / "manifest.yaml"
        manifest = _read_yaml(manifest_path)
        manifest["tasks"] = [entry for entry in manifest["tasks"] if entry["id"] != task_id]
        staging = root / f".delete-{task_id}-{uuid4().hex}"
        temporary = root / f".manifest-{uuid4().hex}.tmp"
        moved = False
        try:
            temporary.write_text(yaml.safe_dump(manifest, allow_unicode=True, sort_keys=False), encoding="utf-8")
            folder.rename(staging)
            moved = True
            temporary.replace(manifest_path)
        except OSError:
            if moved:
                staging.rename(folder)
            raise
        finally:
            temporary.unlink(missing_ok=True)
        # The checked directory has only been renamed within the same root.
        if staging.resolve().parent != root or staging.is_symlink():
            raise TaskValidationError("删除目录校验失败。")
        try:
            shutil.rmtree(staging)
        except OSError:
            return {"id": task_id, "files_deleted": False, "cleanup_path": str(staging)}
    return {"id": task_id, "files_deleted": True}


def load_task(tasks_dir: Path, task_id: str) -> dict[str, Any]:
    task_id = _safe_task_id(task_id)
    task_dir = tasks_dir / task_id
    if not task_dir.exists():
        raise TaskValidationError(f"Task not found: {task_id}")

    missing = [name for name in REQUIRED_FILES if not (task_dir / name).exists()]
    if missing:
        raise TaskValidationError(f"Task {task_id} is incomplete. Missing: {', '.join(missing)}")

    task = {
        "id": task_id,
        "path": str(task_dir),
        "task": _read_yaml(task_dir / "task.yaml"),
        "parameters": _read_yaml(task_dir / "parameters.yaml"),
        "observe": _read_yaml(task_dir / "observe.yaml"),
        "ui": _read_yaml(task_dir / "ui.yaml"),
        "model_xml": (task_dir / "model.xml").read_text(encoding="utf-8"),
        "notes": (task_dir / "notes.md").read_text(encoding="utf-8"),
        "loads": _read_yaml(task_dir / "loads.yaml") if (task_dir / "loads.yaml").exists() else {},
    }
    for document, field in (("task", "simulation"), ("parameters", "parameters"), ("observe", "observe"), ("ui", "layout"), ("ui", "controls")):
        value = task[document].get(field, {})
        if not isinstance(value, dict):
            raise TaskValidationError(f"{document}.yaml 的 {field} 必须是对象。")
    for name, spec in task["parameters"].get("parameters", {}).items():
        if not isinstance(spec, dict):
            raise TaskValidationError(f"参数 {name} 必须是对象。")
        for bound in ("min", "max", "value"):
            if bound in spec:
                try:
                    number = float(spec[bound])
                    if not math.isfinite(number):
                        raise ValueError()
                except (TypeError, ValueError) as exc:
                    raise TaskValidationError(f"参数 {name} 的 {bound} 必须是有限数字。") from exc
        if spec.get("min") is not None and spec.get("max") is not None and float(spec["min"]) > float(spec["max"]):
            raise TaskValidationError(f"参数 {name} 的范围上下限颠倒。")
    for group, entries in task["observe"].get("observe", {}).items():
        if group not in {"joints", "bodies", "sites", "equalities"}:
            raise TaskValidationError(f"未知观测类型：{group}")
        if not isinstance(entries, list) or any(not isinstance(item, dict) or not isinstance(item.get("fields", []), list) for item in entries):
            raise TaskValidationError(f"观测 {group} 格式错误。")
    controls = task["ui"].get("controls", {})
    actuators = controls.get("actuators", {})
    if not isinstance(actuators, dict) or any(not isinstance(spec, dict) for spec in actuators.values()):
        raise TaskValidationError("ui.yaml 的 controls.actuators 必须按执行器名称配置对象。")
    for name, spec in actuators.items():
        if "show_load" in spec and not isinstance(spec["show_load"], bool):
            raise TaskValidationError(f"执行器 {name} 的 show_load 必须是 true 或 false。")
    for field in ("charts", "parameter_groups"):
        entries = task["ui"].get("layout", {}).get(field, [])
        if not isinstance(entries, list) or any(not isinstance(item, dict) for item in entries):
            raise TaskValidationError(f"ui.yaml 的 {field} 必须是对象列表。")
    return task


def save_run_result(tasks_dir: Path, task_id: str, result: dict[str, Any]) -> dict[str, str]:
    task_id = _safe_task_id(task_id)
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S_%f")
    run_dir = tasks_dir / task_id / "results" / f"run_{timestamp}_{uuid4().hex[:8]}"
    run_dir.mkdir(parents=True, exist_ok=False)

    data_path = run_dir / "data.csv"
    series = result.get("series", {})
    time = series.get("time", [])
    columns = [key for key in series.keys() if key != "time"]
    units = result.get("units", {})
    heading = lambda key: f"{key} [{units.get(key, '-')}]"

    with data_path.open("w", encoding="utf-8-sig", newline="") as handle:
        writer = csv.writer(handle)
        writer.writerow([heading("time"), *[heading(column) for column in columns]])
        for index, t in enumerate(time):
            writer.writerow([t, *[series[col][index] if index < len(series[col]) else "" for col in columns]])

    curves_path = run_dir / "curves.json"
    curves_path.write_text(json.dumps(series, ensure_ascii=False, indent=2), encoding="utf-8")

    units_path = run_dir / "units.json"
    units_path.write_text(json.dumps(units, ensure_ascii=False, indent=2), encoding="utf-8")

    summary_path = run_dir / "summary.md"
    summary_path.write_text(result.get("summary", ""), encoding="utf-8")

    return {
        "run_id": run_dir.name,
        "data_csv": str(data_path),
        "curves_json": str(curves_path),
        "units_json": str(units_path),
        "summary_md": str(summary_path),
    }
