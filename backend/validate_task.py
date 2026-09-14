from __future__ import annotations

from pathlib import Path
import sys
import xml.etree.ElementTree as ET

from .task_io import REQUIRED_FILES, TaskValidationError, load_task, list_tasks


ROOT = Path(__file__).resolve().parents[1]
TASKS_DIR = ROOT / "tasks"
OBSERVE_FIELDS = {
    "joints": {"position", "velocity", "acceleration", "force"},
    "bodies": {"position", "velocity"},
    "sites": {"position", "velocity", "acceleration"},
    "equalities": {"force"},
}


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
        if isinstance(spec, dict) and not str(spec.get("unit", "")).strip():
            errors.append(f"parameter {param_name} must define unit; use '1' for dimensionless values")
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
    observed_series: set[str] = set()
    for group, xml_tag in [("joints", "joint"), ("bodies", "body"), ("sites", "site")]:
        for item in observe.get(group, []):
            name = item.get("name")
            if not name:
                errors.append(f"observe {group} entry is missing name")
                continue
            if name not in names.get(xml_tag, set()):
                errors.append(f"observe references missing {xml_tag} {name}")
            fields = item.get("fields", [])
            if not isinstance(fields, list) or not fields:
                errors.append(f"observe {group} {name} must define at least one field")
                continue
            for field in fields:
                if field not in OBSERVE_FIELDS[group]:
                    errors.append(f"observe {group} {name} has unsupported field {field}")

            if group == "joints":
                observed_series.update(f"joint.{name}.{field}" for field in fields if field in OBSERVE_FIELDS[group])
            elif group == "bodies":
                if "position" in fields:
                    observed_series.update(f"body.{name}.position.{axis}" for axis in "xyz")
                if "velocity" in fields:
                    observed_series.update(f"body.{name}.velocity.{axis}" for axis in ["wx", "wy", "wz", "vx", "vy", "vz"])
            else:
                components = item.get("components") or list("xyz")
                if not isinstance(components, list) or not components:
                    errors.append(f"observe site {name} components must be a non-empty list")
                    components = []
                valid_axes = {"x", "y", "z"}
                invalid_components = [axis for axis in components if axis not in valid_axes]
                if invalid_components:
                    errors.append(f"observe site {name} has invalid components: {', '.join(map(str, invalid_components))}")
                if len(set(components)) != len(components):
                    errors.append(f"observe site {name} components must not contain duplicates")
                if item.get("frame", "world") != "world":
                    errors.append(f"observe site {name} currently supports only frame: world")
                valid_components = [axis for axis in components if axis in valid_axes]
                for field in fields:
                    if field not in OBSERVE_FIELDS[group]:
                        continue
                    prefix = f"site.{name}.{field}"
                    suffixes = valid_components if field == "position" else [
                        ("v" if field == "velocity" else "a") + axis for axis in valid_components
                    ]
                    observed_series.update(f"{prefix}.{suffix}" for suffix in suffixes)
                    if item.get("magnitude"):
                        observed_series.add(f"{prefix}.magnitude")

    for item in observe.get("equalities", []):
        name = item.get("name")
        if not name:
            errors.append("observe equalities entry is missing name")
            continue
        if name not in names.get("connect", set()) and name not in names.get("weld", set()):
            errors.append(f"observe references missing equality {name}")
        fields = item.get("fields", [])
        for field in fields:
            if field not in OBSERVE_FIELDS["equalities"]:
                errors.append(f"observe equalities {name} has unsupported field {field}")
        if "force" in fields:
            observed_series.update(f"equality.{name}.force.{axis}" for axis in "xyz")
            observed_series.add(f"equality.{name}.force.magnitude")

    ui_series = []
    for chart in task.get("ui", {}).get("layout", {}).get("charts", []):
        ui_series.extend(chart.get("series", []))
    if not ui_series:
        errors.append("ui.yaml should define at least one chart series")
    for series in ui_series:
        if series not in observed_series:
            errors.append(f"ui chart references unavailable observation series {series}")

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
