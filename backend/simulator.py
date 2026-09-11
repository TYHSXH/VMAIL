from __future__ import annotations

from copy import deepcopy
from typing import Any
import base64
import io
import math
import xml.etree.ElementTree as ET

import numpy as np


class SimulationError(Exception):
    pass


def prepare_browser_model(
    task: dict[str, Any],
    parameter_overrides: dict[str, Any],
    timestep_override: float | None = None,
) -> dict[str, Any]:
    """Prepare an MJCF payload for the official browser-side MuJoCo WASM runtime."""
    values = _merged_parameter_values(task, parameter_overrides)
    xml = _apply_mjcf_overrides(task["model_xml"], task, values)
    root = ET.fromstring(xml)
    simulation = task.get("task", {}).get("simulation", {})
    timestep = float(timestep_override or simulation.get("timestep", 0.01))
    option = root.find("option")
    if option is None:
        option = ET.SubElement(root, "option")
    option.set("timestep", str(timestep))

    initial_state: list[dict[str, Any]] = []
    for name, spec in _parameter_entries(task).items():
        initial = spec.get("initial_state") if isinstance(spec, dict) else None
        if initial and initial.get("joint"):
            initial_state.append(
                {
                    "joint": initial["joint"],
                    "field": initial.get("field", "qpos"),
                    "value": values[name],
                }
            )

    return {
        "xml": ET.tostring(root, encoding="unicode"),
        "initial_state": initial_state,
        "observe": task.get("observe", {}).get("observe", {}),
    }


class MujocoInteractiveSession:
    def __init__(
        self,
        task: dict[str, Any],
        parameter_overrides: dict[str, Any],
        timestep_override: float | None = None,
        width: int = 640,
        height: int = 360,
    ) -> None:
        try:
            import mujoco
        except Exception as exc:
            raise SimulationError("MuJoCo is not installed. Run start.bat or activate a Conda environment with MuJoCo.") from exc

        self.mujoco = mujoco
        self.task = task
        self.values = _merged_parameter_values(task, parameter_overrides)
        xml = _apply_mjcf_overrides(task["model_xml"], task, self.values)
        try:
            self.model = mujoco.MjModel.from_xml_string(xml)
        except Exception as exc:
            raise SimulationError(f"MuJoCo could not load model.xml: {exc}") from exc

        config = deepcopy(task.get("task", {}).get("simulation", {}))
        self.model.opt.timestep = float(timestep_override or config.get("timestep", self.model.opt.timestep))
        self.data = mujoco.MjData(self.model)
        self.width = width
        self.height = height
        self.renderer = None
        self.reset()

    def close(self) -> None:
        if self.renderer is not None:
            self.renderer.close()
            self.renderer = None

    def reset(self) -> dict[str, Any]:
        self.mujoco.mj_resetData(self.model, self.data)
        _set_initial_state(self.model, self.data, self.task, self.values, self.mujoco)
        self.mujoco.mj_forward(self.model, self.data)
        return self.snapshot()

    def step(self, steps: int = 1) -> dict[str, Any]:
        for _ in range(max(1, steps)):
            self.mujoco.mj_step(self.model, self.data)
        return self.snapshot()

    def set_joint_position(self, joint_name: str, value: float) -> dict[str, Any]:
        joint_id = self.mujoco.mj_name2id(self.model, self.mujoco.mjtObj.mjOBJ_JOINT, joint_name)
        if joint_id < 0:
            raise SimulationError(f"Joint not found: {joint_name}")
        self.data.qpos[self.model.jnt_qposadr[joint_id]] = float(value)
        self.data.qvel[self.model.jnt_dofadr[joint_id]] = 0.0
        self.mujoco.mj_forward(self.model, self.data)
        return self.snapshot()

    def snapshot(self) -> dict[str, Any]:
        observe = self.task.get("observe", {}).get("observe", {})
        return {
            "time": float(self.data.time),
            "image": _render_png_data_url(self.model, self.data, self.mujoco, self.width, self.height, self),
            "observations": _record_observations(self.model, self.data, observe, self.mujoco),
            "qpos": [float(value) for value in self.data.qpos],
            "qvel": [float(value) for value in self.data.qvel],
        }


def _parameter_entries(task: dict[str, Any]) -> dict[str, Any]:
    params = task.get("parameters", {}).get("parameters", {})
    if not isinstance(params, dict):
        raise SimulationError("parameters.yaml must contain a 'parameters' object.")
    return params


def _merged_parameter_values(task: dict[str, Any], overrides: dict[str, Any]) -> dict[str, float]:
    values: dict[str, float] = {}
    for name, spec in _parameter_entries(task).items():
        if isinstance(spec, dict):
            values[name] = float(spec.get("value", 0.0))
    for name, value in overrides.items():
        if name in values:
            values[name] = float(value)
    return values


def _apply_mjcf_overrides(model_xml: str, task: dict[str, Any], values: dict[str, float]) -> str:
    root = ET.fromstring(model_xml)
    params = _parameter_entries(task)
    for param_name, spec in params.items():
        target = spec.get("mjcf") if isinstance(spec, dict) else None
        if not target:
            continue
        tag = target.get("tag")
        name = target.get("name")
        attribute = target.get("attribute")
        if not tag or not attribute:
            continue
        for node in root.iter(tag):
            if name is None or node.attrib.get("name") == name:
                node.set(attribute, str(values[param_name]))
    return ET.tostring(root, encoding="unicode")


def _set_initial_state(model: Any, data: Any, task: dict[str, Any], values: dict[str, float], mujoco: Any) -> None:
    params = _parameter_entries(task)
    for param_name, spec in params.items():
        initial = spec.get("initial_state") if isinstance(spec, dict) else None
        if not initial:
            continue
        joint_name = initial.get("joint")
        field = initial.get("field", "qpos")
        if not joint_name:
            continue
        joint_id = mujoco.mj_name2id(model, mujoco.mjtObj.mjOBJ_JOINT, joint_name)
        if joint_id < 0:
            raise SimulationError(f"Initial-state joint not found: {joint_name}")
        if field == "qpos":
            data.qpos[model.jnt_qposadr[joint_id]] = values[param_name]
        elif field == "qvel":
            data.qvel[model.jnt_dofadr[joint_id]] = values[param_name]
        else:
            raise SimulationError(f"Unsupported initial state field: {field}")


def _record_observations(model: Any, data: Any, observe: dict[str, Any], mujoco: Any) -> dict[str, float]:
    row: dict[str, float] = {}

    for item in observe.get("joints", []):
        name = item.get("name")
        fields = item.get("fields", [])
        joint_id = mujoco.mj_name2id(model, mujoco.mjtObj.mjOBJ_JOINT, name)
        if joint_id < 0:
            continue
        qpos_adr = model.jnt_qposadr[joint_id]
        dof_adr = model.jnt_dofadr[joint_id]
        for field in fields:
            key = f"joint.{name}.{field}"
            if field == "position":
                row[key] = float(data.qpos[qpos_adr])
            elif field == "velocity":
                row[key] = float(data.qvel[dof_adr])
            elif field == "acceleration":
                row[key] = float(data.qacc[dof_adr])
            elif field == "force":
                row[key] = float(data.qfrc_passive[dof_adr] + data.qfrc_actuator[dof_adr] + data.qfrc_applied[dof_adr])

    for item in observe.get("bodies", []):
        name = item.get("name")
        fields = item.get("fields", [])
        body_id = mujoco.mj_name2id(model, mujoco.mjtObj.mjOBJ_BODY, name)
        if body_id < 0:
            continue
        for field in fields:
            prefix = f"body.{name}.{field}"
            if field == "position":
                for axis, value in zip("xyz", data.xpos[body_id]):
                    row[f"{prefix}.{axis}"] = float(value)
            elif field == "velocity":
                velocity = np.zeros(6)
                mujoco.mj_objectVelocity(model, data, mujoco.mjtObj.mjOBJ_BODY, body_id, velocity, 0)
                for axis, value in zip(["wx", "wy", "wz", "vx", "vy", "vz"], velocity):
                    row[f"{prefix}.{axis}"] = float(value)

    return row


def _render_png_data_url(
    model: Any,
    data: Any,
    mujoco: Any,
    width: int,
    height: int,
    session: MujocoInteractiveSession | None = None,
) -> str:
    try:
        from PIL import Image
    except Exception as exc:
        raise SimulationError("Pillow is required for MuJoCo frame rendering. Install requirements.txt again.") from exc

    try:
        renderer = session.renderer if session is not None else None
        if renderer is None:
            renderer = mujoco.Renderer(model, height=height, width=width)
            if session is not None:
                session.renderer = renderer
        renderer.update_scene(data)
        pixels = renderer.render()
    except Exception as exc:
        raise SimulationError(f"MuJoCo rendering failed: {exc}") from exc
    finally:
        if session is None and "renderer" in locals():
            renderer.close()

    buffer = io.BytesIO()
    Image.fromarray(pixels).save(buffer, format="PNG")
    encoded = base64.b64encode(buffer.getvalue()).decode("ascii")
    return f"data:image/png;base64,{encoded}"


def run_mujoco_task(
    task: dict[str, Any],
    parameter_overrides: dict[str, Any],
    duration_override: float | None,
    timestep_override: float | None,
) -> dict[str, Any]:
    try:
        import mujoco
    except Exception as exc:
        raise SimulationError("MuJoCo is not installed. Run start.bat to install project dependencies.") from exc

    config = deepcopy(task.get("task", {}).get("simulation", {}))
    duration = float(duration_override or config.get("duration", 5.0))
    timestep = float(timestep_override or config.get("timestep", 0.01))
    if duration <= 0 or timestep <= 0:
        raise SimulationError("Simulation duration and timestep must be positive.")

    values = _merged_parameter_values(task, parameter_overrides)
    xml = _apply_mjcf_overrides(task["model_xml"], task, values)

    try:
        model = mujoco.MjModel.from_xml_string(xml)
    except Exception as exc:
        raise SimulationError(f"MuJoCo could not load model.xml: {exc}") from exc

    model.opt.timestep = timestep
    data = mujoco.MjData(model)
    _set_initial_state(model, data, task, values, mujoco)
    mujoco.mj_forward(model, data)

    observe = task.get("observe", {}).get("observe", {})
    series: dict[str, list[float]] = {"time": []}
    frames: list[dict[str, Any]] = []
    steps = max(1, math.ceil(duration / timestep))
    sample_stride = max(1, steps // 180)

    for step in range(steps + 1):
        row = _record_observations(model, data, observe, mujoco)
        series["time"].append(float(data.time))
        for key, value in row.items():
            series.setdefault(key, []).append(value)
        for key in list(series.keys()):
            if key != "time" and key not in row:
                series[key].append(float("nan"))

        if step % sample_stride == 0:
            body_positions = {}
            for body_id in range(1, model.nbody):
                name = mujoco.mj_id2name(model, mujoco.mjtObj.mjOBJ_BODY, body_id) or f"body_{body_id}"
                body_positions[name] = [float(v) for v in data.xpos[body_id]]
            frames.append(
                {
                    "time": float(data.time),
                    "bodies": body_positions,
                    "image": _render_png_data_url(model, data, mujoco, 640, 360),
                }
            )

        if step < steps:
            mujoco.mj_step(model, data)

    summary = (
        f"# Simulation Summary\n\n"
        f"- Task: {task['id']}\n"
        f"- Duration: {duration:g} s\n"
        f"- Timestep: {timestep:g} s\n"
        f"- Samples: {len(series['time'])}\n"
        f"- Parameters: {values}\n"
    )

    return {
        "task_id": task["id"],
        "parameters": values,
        "duration": duration,
        "timestep": timestep,
        "series": series,
        "frames": frames,
        "summary": summary,
    }
