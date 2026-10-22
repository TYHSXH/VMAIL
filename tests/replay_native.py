"""Native counterpart used by the real WASM experiment replay tests."""
import json
from pathlib import Path
import sys
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from backend.simulator import prepare_browser_model, run_mujoco_task
from backend.task_io import load_task
request = json.loads(sys.stdin.read())
task = load_task(Path(__file__).resolve().parents[1] / "tasks", request["task_id"])
if request.get("mode") == "prepare":
    result = prepare_browser_model(task, request.get("parameters", {}), request["timestep"], request["duration"])
else:
    result = run_mujoco_task(task, request["parameters"], request["duration"], request["timestep"], replay=request["replay"])
print(json.dumps(result, ensure_ascii=True))

