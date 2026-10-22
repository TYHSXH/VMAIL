"""Validate and restore the recorded starting conditions of a browser run."""
import hashlib
import json
import math
import numpy as np


def model_revision(task, values, xml, assets):
    digest = hashlib.sha256(json.dumps({"xml": xml, "parameters": values,
        "observe": task.get("observe", {}), "loads": task.get("loads", {}),
        "controls": task.get("ui", {}).get("controls", {})}, sort_keys=True, ensure_ascii=False).encode("utf-8"))
    for name, blob in sorted(assets.items()):
        digest.update(name.encode("utf-8")); digest.update(hashlib.sha256(blob).digest())
    return digest.hexdigest()


def restore_experiment(replay, revision, model, data, duration, timestep, mujoco):
    from .simulator import SimulationError
    if replay.get("version") != 1 or replay.get("model_revision") != revision:
        raise SimulationError("任务模型或载荷已改变，无法重算旧实验。请重新加载任务并完成网页仿真。")
    spec = int(mujoco.mjtState.mjSTATE_INTEGRATION)
    state = np.asarray(replay.get("initial_state", []), dtype=float)
    if state.ndim != 1 or state.size != mujoco.mj_stateSize(model, spec) or not np.all(np.isfinite(state)):
        raise SimulationError("实验起始状态的长度或数值无效，请重新完成网页仿真。")
    mujoco.mj_setState(model, data, state, spec)
    if abs(data.time) > 1e-12:
        raise SimulationError("后台重算必须从本次实验的 t=0 起始状态开始。")
    for joint in range(model.njnt):
        kind = model.jnt_type[joint]
        if kind not in (mujoco.mjtJoint.mjJNT_BALL, mujoco.mjtJoint.mjJNT_FREE):
            continue
        address = model.jnt_qposadr[joint] + (3 if kind == mujoco.mjtJoint.mjJNT_FREE else 0)
        if abs(np.linalg.norm(data.qpos[address:address+4]) - 1) > 1e-5:
            raise SimulationError("实验姿态含无效四元数。")
    steps = math.ceil(duration / timestep)
    samples = replay.get("sample_steps", [])
    if not samples or samples[0] != 0 or samples[-1] != steps or any(type(s) is not int or not 0 <= s <= steps for s in samples) or any(a >= b for a, b in zip(samples, samples[1:])):
        raise SimulationError("实验采样记录不完整或顺序无效，请先完成一次网页仿真。")
    events = replay.get("control_events", [])
    previous = -1
    if len(events) * max(1, model.nu) > 2_000_000:
        raise SimulationError("控制记录过大，请减少中途调节次数。")
    for event in events:
        step, controls = event.get("step"), np.asarray(event.get("controls", []), dtype=float)
        if type(step) is not int or not previous < step < steps or controls.shape != (model.nu,) or not np.all(np.isfinite(controls)):
            raise SimulationError("实验控制记录的步数、长度或数值无效。")
        previous = step
    mujoco.mj_forward(model, data)
    return set(samples), {event["step"]: event["controls"] for event in events}
