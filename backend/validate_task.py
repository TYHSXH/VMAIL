from __future__ import annotations

from pathlib import Path
import sys
import xml.etree.ElementTree as ET

from .task_io import REQUIRED_FILES, TaskValidationError, load_task, list_tasks


ROOT = Path(__file__).resolve().parents[1]
TASKS_DIR = ROOT / "tasks"


def _xml_names(model_xml: str) -> dict[str, set[str]]:
    root = ET.fromstring(model_xml)
    names: dict[str, set[str]] = {}
    for node in root.iter():
        name = node.attrib.get("name")
        if name:
            names.setdefault(node.tag, set()).add(name)
    return names


def validate_task(task_id: str) -> list[str]:
    errors: list[str] = []
    task_dir = TASKS_DIR / task_id

    for filename in REQUIRED_FILES:
        if not (task_dir / filename).exists():
            errors.append(f"missing {filename}")

    if errors:
        return errors

    try:
        task = load_task(TASKS_DIR, task_id)
        names = _xml_names(task["model_xml"])
    except (TaskValidationError, ET.ParseError) as exc:
        return [str(exc)]

    parameters = task.get("parameters", {}).get("parameters", {})
    for param_name, spec in parameters.items():
        mjcf = spec.get("mjcf") if isinstance(spec, dict) else None
        if mjcf:
            tag = mjcf.get("tag")
            name = mjcf.get("name")
            if tag and name and name not in names.get(tag, set()):
                errors.append(f"parameter {param_name} references missing {tag} named {name}")

        initial = spec.get("initial_state") if isinstance(spec, dict) else None
        if initial:
            joint = initial.get("joint")
            if joint and joint not in names.get("joint", set()):
                errors.append(f"parameter {param_name} references missing joint {joint}")

    observe = task.get("observe", {}).get("observe", {})
    for item in observe.get("joints", []):
        name = item.get("name")
        if name and name not in names.get("joint", set()):
            errors.append(f"observe references missing joint {name}")
    for item in observe.get("bodies", []):
        name = item.get("name")
        if name and name not in names.get("body", set()):
            errors.append(f"observe references missing body {name}")

    ui_series = []
    for chart in task.get("ui", {}).get("layout", {}).get("charts", []):
        ui_series.extend(chart.get("series", []))
    if not ui_series:
        errors.append("ui.yaml should define at least one chart series")

    return errors


def main() -> int:
    manifest_tasks = list_tasks(TASKS_DIR)
    selected = sys.argv[1:] or [task["id"] for task in manifest_tasks]
    if not selected:
        print("No tasks found in tasks/manifest.yaml.")
        return 1

    failed = False
    for task_id in selected:
        errors = validate_task(task_id)
        if errors:
            failed = True
            print(f"[FAIL] {task_id}")
            for error in errors:
                print(f"  - {error}")
        else:
            print(f"[OK] {task_id}")
    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())

