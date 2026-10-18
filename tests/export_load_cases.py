"""Produce native-MuJoCo reference results for the WASM regression tests."""
import json
from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import mujoco
from backend.loads import compile_loads, apply_loads
from backend.simulator import prepare_browser_model, run_mujoco_task
from backend.task_io import load_task
from tests.test_loads import XML, ROOT

model = mujoco.MjModel.from_xml_string(XML)
data = mujoco.MjData(model)
config = {"loads": [
    {"id": "tip", "type": "wrench", "site": "tip", "frame": "body", "force": ["gain*cos(t)", "where(t < 1, 10, 1/0)", 0], "torque": [0, 0, 2]},
    {"id": "point", "type": "wrench", "body": "bar", "point": [.4, 0, 0], "force": [3, 0, 0]},
    {"id": "joint", "type": "joint", "joint": "hinge", "unit": "N·m", "value": "clamp(gain*(0.2-q('hinge'))-v('hinge'), -5, 5)"},
    {"id": "motor", "type": "actuator", "actuator": "motor", "unit": "N·m", "value": {"table": [[0, -10], [.3, 0], [.7, 10]]}},
]}
program = compile_loads(config, {"gain": 2}, model, mujoco)
cases = []
for t, q, v in [(0, 0, 0), (.15, -.4, .2), (.7, 1.2, -.6)]:
    data.time, data.qpos[0], data.qvel[0] = t, q, v
    mujoco.mj_forward(model, data)
    values = apply_loads(program, model, data)
    cases.append({"time": t, "qpos": data.qpos.tolist(), "qvel": data.qvel.tolist(), "values": values,
                  "qfrc": data.qfrc_applied.tolist(), "xfrc": data.xfrc_applied.flatten().tolist()})
task = load_task(ROOT / "tasks", "rotating_load_demo")
payload = prepare_browser_model(task, {}, .002, .1)
result = run_mujoco_task(task, {}, .1, .002)
print(json.dumps({"xml": XML, "program": program, "cases": cases, "demo": {"payload": payload, "series": result["series"]}}, ensure_ascii=False))
