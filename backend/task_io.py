from __future__ import annotations

from datetime import datetime
from pathlib import Path
from typing import Any
import csv
import json

import yaml


class TaskValidationError(Exception):
    pass


REQUIRED_FILES = ["task.yaml", "model.xml", "parameters.yaml", "observe.yaml", "ui.yaml", "notes.md"]


def _read_yaml(path: Path) -> dict[str, Any]:
    if not path.exists():
        raise TaskValidationError(f"Missing required file: {path.name}")
    with path.open("r", encoding="utf-8") as handle:
        data = yaml.safe_load(handle) or {}
    if not isinstance(data, dict):
        raise TaskValidationError(f"{path.name} must contain a YAML object.")
    return data


def _safe_task_id(task_id: str) -> str:
    if not task_id or any(part in task_id for part in ["..", "/", "\\"]):
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
    return tasks


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
    }
    return task


def save_run_result(tasks_dir: Path, task_id: str, result: dict[str, Any]) -> dict[str, str]:
    task_id = _safe_task_id(task_id)
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    run_dir = tasks_dir / task_id / "results" / f"run_{timestamp}"
    run_dir.mkdir(parents=True, exist_ok=True)

    data_path = run_dir / "data.csv"
    series = result.get("series", {})
    time = series.get("time", [])
    columns = [key for key in series.keys() if key != "time"]

    with data_path.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.writer(handle)
        writer.writerow(["time", *columns])
        for index, t in enumerate(time):
            writer.writerow([t, *[series[col][index] if index < len(series[col]) else "" for col in columns]])

    curves_path = run_dir / "curves.json"
    curves_path.write_text(json.dumps(series, ensure_ascii=False, indent=2), encoding="utf-8")

    summary_path = run_dir / "summary.md"
    summary_path.write_text(result.get("summary", ""), encoding="utf-8")

    return {
        "run_id": run_dir.name,
        "data_csv": str(data_path),
        "curves_json": str(curves_path),
        "summary_md": str(summary_path),
    }

