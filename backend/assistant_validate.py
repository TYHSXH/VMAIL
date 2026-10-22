"""Short-lived worker: no model-generated scripts are ever executed."""
from pathlib import Path
import json
import sys

from .task_io import load_task
from .validate_task import validate_task
from .simulator import run_mujoco_task


def main():
    errors = []
    report = {}
    try:
        tasks_dir, task_id = Path(sys.argv[1]), sys.argv[2]
        errors = validate_task(task_id, tasks_dir)
        if not errors:
            task = load_task(tasks_dir, task_id)
            result = run_mujoco_task(task, {}, None, None)
            report = {"duration": result["duration"], "samples": len(result["series"]["time"])}
    except Exception as exc:
        errors = [str(exc)[:2000]]
    print(json.dumps({"valid": not errors, "errors": errors, **report}, ensure_ascii=True))


if __name__ == "__main__":
    main()
