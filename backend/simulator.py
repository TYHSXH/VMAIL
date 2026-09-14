from __future__ import annotations

from copy import deepcopy
from typing import Any
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


def _set_actuator_controls(model: Any, data: Any, controls: dict[str, Any], mujoco: Any) -> dict[str, float]:
    applied: dict[str, float] = {}
    for name, raw_value in controls.items():
        actuator_id = mujoco.mj_name2id(model, mujoco.mjtObj.mjOBJ_ACTUATOR, name)
        if actuator_id < 0:
            raise SimulationError(f"Actuator control references missing actuator: {name}")
        try:
            value = float(raw_value)
        except (TypeError, ValueError) as exc:
            raise SimulationError(f"Actuator control must be numeric: {name}") from exc
        if not math.isfinite(value):
            raise SimulationError(f"Actuator control must be finite: {name}")
        if model.actuator_ctrllimited[actuator_id]:
            lower, upper = model.actuator_ctrlrange[actuator_id]
            if value < lower or value > upper:
                raise SimulationError(
                    f"Actuator control {name}={value:g} is outside ctrlrange [{lower:g}, {upper:g}]"
                )
        data.ctrl[actuator_id] = value
        applied[name] = value
    return applied


def _record_observations(model: Any, data: Any, observe: dict[str, Any], mujoco: Any) -> dict[str, float]:
    row: dict[str, float] = {}
    sites = observe.get("sites", [])
    if any("acceleration" in item.get("fields", []) for item in sites):
        mujoco.mj_rnePostConstraint(model, data)

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

    for item in sites:
        name = item.get("name")
        fields = item.get("fields", [])
        components = item.get("components") or list("xyz")
        site_id = mujoco.mj_name2id(model, mujoco.mjtObj.mjOBJ_SITE, name)
        if site_id < 0:
            continue
        for field in fields:
            prefix = f"site.{name}.{field}"
            if field == "position":
                for axis in components:
                    row[f"{prefix}.{axis}"] = float(data.site_xpos[site_id]["xyz".index(axis)])
                if item.get("magnitude"):
                    row[f"{prefix}.magnitude"] = float(np.linalg.norm(data.site_xpos[site_id]))
            elif field in {"velocity", "acceleration"}:
                vector = np.zeros(6)
                method = mujoco.mj_objectVelocity if field == "velocity" else mujoco.mj_objectAcceleration
                method(model, data, mujoco.mjtObj.mjOBJ_SITE, site_id, vector, 0)
                for axis in components:
                    suffix = ("v" if field == "velocity" else "a") + axis
                    row[f"{prefix}.{suffix}"] = float(vector["xyz".index(axis) + 3])
                if item.get("magnitude"):
                    row[f"{prefix}.magnitude"] = float(np.linalg.norm(vector[3:6]))

    equality_constraint_type = int(mujoco.mjtConstraint.mjCNSTR_EQUALITY)
    for item in observe.get("equalities", []):
        name = item.get("name")
        fields = item.get("fields", [])
        equality_id = mujoco.mj_name2id(model, mujoco.mjtObj.mjOBJ_EQUALITY, name)
        if equality_id < 0:
            continue
        force_values = [
            float(data.efc_force[index])
            for index in range(data.nefc)
            if int(data.efc_type[index]) == equality_constraint_type
            and int(data.efc_id[index]) == equality_id
        ]
        if "force" in fields and force_values:
            components = (force_values + [0.0, 0.0, 0.0])[:3]
            prefix = f"equality.{name}.force"
            for axis, value in zip("xyz", components):
                row[f"{prefix}.{axis}"] = value
            row[f"{prefix}.magnitude"] = float(np.linalg.norm(components))

    return row


def _observation_units(model: Any, observe: dict[str, Any], mujoco: Any) -> dict[str, str]:
    units = {"time": "s"}
    for item in observe.get("joints", []):
        name = item.get("name")
        joint_id = mujoco.mj_name2id(model, mujoco.mjtObj.mjOBJ_JOINT, name)
        if joint_id < 0:
            continue
        linear = int(model.jnt_type[joint_id]) == int(mujoco.mjtJoint.mjJNT_SLIDE)
        field_units = (
            {"position": "m", "velocity": "m/s", "acceleration": "m/s²", "force": "N"}
            if linear
            else {"position": "rad", "velocity": "rad/s", "acceleration": "rad/s²", "force": "N·m"}
        )
        for field in item.get("fields", []):
            if field in field_units:
                units[f"joint.{name}.{field}"] = field_units[field]

    for item in observe.get("bodies", []):
        name = item.get("name")
        for field in item.get("fields", []):
            if field == "position":
                for axis in "xyz":
                    units[f"body.{name}.position.{axis}"] = "m"
            elif field == "velocity":
                for axis in ["wx", "wy", "wz"]:
                    units[f"body.{name}.velocity.{axis}"] = "rad/s"
                for axis in ["vx", "vy", "vz"]:
                    units[f"body.{name}.velocity.{axis}"] = "m/s"

    for item in observe.get("sites", []):
        name = item.get("name")
        components = item.get("components") or list("xyz")
        for field in item.get("fields", []):
            suffixes = components if field == "position" else [
                ("v" if field == "velocity" else "a") + axis for axis in components
            ]
            unit = "m" if field == "position" else "m/s" if field == "velocity" else "m/s²"
            for suffix in suffixes:
                units[f"site.{name}.{field}.{suffix}"] = unit
            if item.get("magnitude"):
                units[f"site.{name}.{field}.magnitude"] = unit

    for item in observe.get("equalities", []):
        if "force" not in item.get("fields", []):
            continue
        prefix = f"equality.{item.get('name')}.force"
        for axis in "xyz":
            units[f"{prefix}.{axis}"] = "N"
        units[f"{prefix}.magnitude"] = "N"
    return units


def run_mujoco_task(
    task: dict[str, Any],
    parameter_overrides: dict[str, Any],
    duration_override: float | None,
    timestep_override: float | None,
    control_overrides: dict[str, Any] | None = None,
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
    controls = _set_actuator_controls(model, data, control_overrides or {}, mujoco)
    mujoco.mj_forward(model, data)

    observe = task.get("observe", {}).get("observe", {})
    units = _observation_units(model, observe, mujoco)
    series: dict[str, list[float]] = {"time": []}
    steps = max(1, math.ceil(duration / timestep))

    for step in range(steps + 1):
        row = _record_observations(model, data, observe, mujoco)
        series["time"].append(float(data.time))
        for key, value in row.items():
            series.setdefault(key, []).append(value)
        for key in list(series.keys()):
            if key != "time" and key not in row:
                series[key].append(float("nan"))

        if step < steps:
            mujoco.mj_step(model, data)
            # mj_step advances qpos/qvel after computing derived Cartesian state.
            # Refresh sites/bodies so the next recorded row matches the new time.
            mujoco.mj_forward(model, data)

    summary = (
        f"# Simulation Summary\n\n"
        f"- Task: {task['id']}\n"
        f"- Duration: {duration:g} s\n"
        f"- Timestep: {timestep:g} s\n"
        f"- Samples: {len(series['time'])}\n"
        f"- Parameters: {values}\n"
        f"- Actuator controls: {controls}\n"
        f"- Units: {units}\n"
    )

    return {
        "task_id": task["id"],
        "parameters": values,
        "controls": controls,
        "duration": duration,
        "timestep": timestep,
        "series": series,
        "units": units,
        "summary": summary,
    }
