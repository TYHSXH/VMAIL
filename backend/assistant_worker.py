"""Disposable worker for task validation, parameter experiments and numerical scripts."""
from pathlib import Path
import json
import sys

import numpy as np

from .task_io import load_task
from .validate_task import validate_task
from .simulator import run_mujoco_task
from .assistant_compute import run_script
from .assistant_tasks import preflight_task


def experiment(folder, options):
    preflight_task(folder)
    task = load_task(folder.parent, folder.name)
    result = run_mujoco_task(task, options.get("parameters", {}), options.get("duration"), options.get("timestep"))
    summary = {}
    for key, values in result["series"].items():
        a = np.asarray(values, dtype=float)
        finite = a[np.isfinite(a)]
        summary[key] = {"initial": float(a[0]), "final": float(a[-1]),
                        "min": float(np.min(finite)) if finite.size else None,
                        "max": float(np.max(finite)) if finite.size else None,
                        "nonfinite": int(a.size - finite.size)}
    indices = np.unique(np.linspace(0, len(result["series"]["time"]) - 1, min(101, len(result["series"]["time"])), dtype=int))
    return {"parameters": result["parameters"], "duration": result["duration"], "timestep": result["timestep"],
            "samples": len(result["series"]["time"]), "units": result["units"], "statistics": summary,
            "sampled_series": {k: [v[i] for i in indices] for k, v in result["series"].items()}}


def main():
    try:
        folder, operation = Path(sys.argv[1]), sys.argv[2]
        options = json.loads(sys.stdin.read(1_000_000) or "{}")
        if operation == "validate":
            errors = validate_task(folder.name, folder.parent)
            result = {"valid": not errors, "errors": errors}
            if not errors:
                result["experiment"] = experiment(folder, {})
        elif operation == "simulate":
            cases = options.get("cases") or [options]
            if not isinstance(cases, list) or not 1 <= len(cases) <= 40:
                raise ValueError("一次可测试 1–40 组参数。")
            result = {"experiments": [experiment(folder, case) for case in cases]}
        elif operation == "python":
            result = run_script(folder, options["source"])
        else:
            raise ValueError("未知任务命令。")
        print(json.dumps(result, ensure_ascii=True, allow_nan=False))
    except Exception as exc:
        print(json.dumps({"error": str(exc)[:4000], "exit_code": 1}, ensure_ascii=True))


if __name__ == "__main__":
    main()
