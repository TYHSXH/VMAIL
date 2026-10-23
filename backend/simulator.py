from __future__ import annotations

from typing import Any
import math
import xml.etree.ElementTree as ET
import base64
from pathlib import Path
import time

import numpy as np
from .loads import LoadError, compile_loads, apply_loads
from .load_math import signal_math
from .experiment import model_revision, restore_experiment


class SimulationError(Exception):
    pass


def _compile_loads(task, values, model, mujoco):
    try:
        program = compile_loads(task.get("loads", {}), values, model, mujoco)
        labels = {name: spec.get("label", name) for name, spec in _parameter_entries(task).items()}
        for entry in program["entries"]:
            raw = entry["source"]
            entry["math"] = ({field: [signal_math(value, labels) for value in raw.get(field, [0,0,0])] for field in ("force", "torque")}
                             if entry["type"] == "wrench" else {"value": signal_math(raw["value"], labels)})
        return program
    except LoadError as exc:
        raise SimulationError(str(exc)) from exc


def _apply_loads(program, model, data):
    try:
        return apply_loads(program, model, data)
    except LoadError as exc:
        raise SimulationError(str(exc)) from exc


MAX_STEPS = 200_000
MAX_VALUES = 2_000_000
MAX_MODEL_RESOURCE_BYTES = 128 * 1024 * 1024


def _positive_number(value: Any, label: str) -> float:
    try:
        number = float(value)
    except (TypeError, ValueError) as exc:
        raise SimulationError(f"{label}必须是有效数字。") from exc
    if not math.isfinite(number) or number <= 0:
        raise SimulationError(f"{label}必须是大于 0 的有限数字。")
    return number


def simulation_settings(task: dict[str, Any], duration: Any = None, timestep: Any = None) -> tuple[float, float]:
    config = task.get("task", {}).get("simulation", {})
    duration = _positive_number(config.get("duration", 5) if duration is None else duration, "仿真时长")
    timestep = _positive_number(config.get("timestep", 0.01) if timestep is None else timestep, "时间步长")
    if timestep < 0.00001 or duration > 3600 or math.ceil(duration / timestep) > MAX_STEPS:
        raise SimulationError("单次实验最多 200000 步，时长最多 3600 秒，步长至少 0.00001 秒；请缩短时长或增大步长。")
    return duration, timestep


def _model_source(task: dict[str, Any]) -> tuple[str, dict[str, bytes]]:
    """Resolve includes and referenced binary assets strictly inside the task."""
    root_dir = Path(task["path"]).resolve()
    assets: dict[str, bytes] = {}
    total = 0

    def resolve(raw: str) -> Path:
        path = (root_dir / raw).resolve()
        if not path.is_relative_to(root_dir) or "results" in path.relative_to(root_dir).parts:
            raise SimulationError("模型资源必须位于本任务目录内，且不能引用 results。")
        if not path.is_file():
            raise SimulationError(f"模型资源不存在：{raw}")
        return path

    def expand(xml: str, seen: set[Path]) -> ET.Element:
        try:
            root = ET.fromstring(xml)
        except ET.ParseError as exc:
            raise SimulationError(f"model.xml 格式错误：{exc}") from exc
        for parent in list(root.iter()):
            for child in list(parent):
                if child.tag == "include":
                    path = resolve(child.get("file", ""))
                    if path in seen or len(seen) > 32:
                        raise SimulationError("模型 include 存在循环或层级过深。")
                    included = expand(path.read_text(encoding="utf-8"), seen | {path})
                    index = list(parent).index(child)
                    parent.remove(child)
                    for node in list(included):
                        parent.insert(index, node)
                        index += 1
        return root

    root = expand(task["model_xml"], {root_dir / "model.xml"})
    compiler = root.find("compiler")
    directories = {"mesh": "", "texture": ""}
    if compiler is not None:
        for kind in directories:
            directories[kind] = compiler.get(f"{kind}dir", compiler.get("assetdir", ""))
        directories["flexcomp"] = directories["mesh"]
        directories["skin"] = compiler.get("assetdir", "")
        directories["hfield"] = compiler.get("assetdir", "")
        for attr in ("meshdir", "texturedir", "assetdir"):
            compiler.attrib.pop(attr, None)
    for node in root.iter():
        if "file" not in node.attrib:
            continue
        path = resolve(str(Path(directories.get(node.tag, "")) / node.get("file")))
        # MuJoCo derives asset names from file stems when name is omitted.
        # Preserve that name before replacing the filename for the VFS.
        if node.tag in {"mesh", "texture", "hfield", "skin", "model"} and not node.get("name"):
            node.set("name", Path(node.get("file")).stem)
        key = f"asset_{len(assets)}{path.suffix}"
        blob = path.read_bytes()
        total += len(blob)
        if total > MAX_MODEL_RESOURCE_BYTES:
            raise SimulationError("模型引用资源总量不能超过 128 MiB（134217728 字节）。")
        assets[key] = blob
        node.set("file", key)
    return ET.tostring(root, encoding="unicode"), assets


def prepare_browser_model(
    task: dict[str, Any],
    parameter_overrides: dict[str, Any],
    timestep_override: float | None = None,
    duration_override: float | None = None,
) -> dict[str, Any]:
    """Prepare an MJCF payload for the official browser-side MuJoCo WASM runtime."""
    values = _merged_parameter_values(task, parameter_overrides)
    source, assets = _model_source(task)
    xml = _apply_mjcf_overrides(source, task, values)
    root = ET.fromstring(xml)
    _, timestep = simulation_settings(task, duration_override, timestep_override)
    option = root.find("option")
    if option is None:
        option = ET.SubElement(root, "option")
    option.set("timestep", str(timestep))
    try:
        import mujoco
        model = mujoco.MjModel.from_xml_string(ET.tostring(root, encoding="unicode"), assets)
        data = mujoco.MjData(model)
        _set_initial_state(model, data, task, values, mujoco)
        _validate_observations(model, task.get("observe", {}).get("observe", {}), mujoco)
        program = _compile_loads(task, values, model, mujoco)
        mujoco.mj_forward(model, data)
        _apply_loads(program, model, data)
    except SimulationError:
        raise
    except Exception as exc:
        raise SimulationError(f"模型无法编译：{exc}") from exc

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
        "model_revision": model_revision(task, values, xml, assets),
        "initial_state": initial_state,
        "joint_limits": model.jnt_limited.astype(bool).tolist(),
        "observe": task.get("observe", {}).get("observe", {}),
        "load_program": program,
        "assets": {name: base64.b64encode(blob).decode("ascii") for name, blob in assets.items()},
    }


def _parameter_entries(task: dict[str, Any]) -> dict[str, Any]:
    params = task.get("parameters", {}).get("parameters", {})
    if not isinstance(params, dict):
        raise SimulationError("parameters.yaml must contain a 'parameters' object.")
    return params


def _merged_parameter_values(task: dict[str, Any], overrides: dict[str, Any]) -> dict[str, float]:
    values: dict[str, float] = {}
    entries = _parameter_entries(task)
    unknown = set(overrides) - set(entries)
    if unknown:
        raise SimulationError(f"未知参数：{', '.join(sorted(unknown))}")
    for name, spec in entries.items():
        if not isinstance(spec, dict):
            raise SimulationError(f"参数 {name} 必须是配置对象。")
        try:
            value = float(overrides.get(name, spec.get("value", 0)))
        except (TypeError, ValueError) as exc:
            raise SimulationError(f"参数 {spec.get('label', name)} 必须是数字。") from exc
        if not math.isfinite(value):
            raise SimulationError(f"参数 {name} 必须是有限数字。")
        if (spec.get("min") is not None and value < float(spec["min"])) or (spec.get("max") is not None and value > float(spec["max"])):
            raise SimulationError(f"参数 {spec.get('label', name)} 超出允许范围 [{spec.get('min', '不限')}, {spec.get('max', '不限')}]。")
        values[name] = value
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
        if int(model.jnt_type[joint_id]) not in {int(mujoco.mjtJoint.mjJNT_HINGE), int(mujoco.mjtJoint.mjJNT_SLIDE)}:
            raise SimulationError(f"初始状态参数 {param_name} 只支持一维转动或滑动关节。")
        if field == "qpos":
            data.qpos[model.jnt_qposadr[joint_id]] = values[param_name]
        elif field == "qvel":
            data.qvel[model.jnt_dofadr[joint_id]] = values[param_name]
        else:
            raise SimulationError(f"Unsupported initial state field: {field}")


def _validate_observations(model: Any, observe: dict[str, Any], mujoco: Any) -> None:
    groups = {
        "joints": (mujoco.mjtObj.mjOBJ_JOINT, {"position", "velocity", "acceleration", "force"}),
        "bodies": (mujoco.mjtObj.mjOBJ_BODY, {"position", "velocity"}),
        "sites": (mujoco.mjtObj.mjOBJ_SITE, {"position", "velocity", "acceleration"}),
        "equalities": (mujoco.mjtObj.mjOBJ_EQUALITY, {"force"}),
    }
    for group, (object_type, allowed) in groups.items():
        for item in observe.get(group, []):
            name = item.get("name")
            if not name or mujoco.mj_name2id(model, object_type, name) < 0:
                raise SimulationError(f"观测对象不存在：{name or group}")
            if not item.get("fields") or set(item["fields"]) - allowed:
                raise SimulationError(f"观测对象 {name} 的 fields 无效。")
            if group == "sites" and (item.get("frame", "world") != "world" or not isinstance(item.get("components", list("xyz")), list) or any(axis not in {"x", "y", "z"} for axis in item.get("components", list("xyz")))):
                raise SimulationError(f"点 {name} 只支持 world 坐标系及 x/y/z 分量。")


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
        if "force" in fields:
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
    cancel_event: Any = None,
    progress: Any = None,
    replay: dict | None = None,
) -> dict[str, Any]:
    try:
        import mujoco
    except Exception as exc:
        raise SimulationError("MuJoCo is not installed. Run start.bat to install project dependencies.") from exc

    duration, timestep = simulation_settings(task, duration_override, timestep_override)

    values = _merged_parameter_values(task, parameter_overrides)
    source, assets = _model_source(task)
    xml = _apply_mjcf_overrides(source, task, values)

    try:
        model = mujoco.MjModel.from_xml_string(xml, assets)
    except Exception as exc:
        raise SimulationError(f"MuJoCo could not load model.xml: {exc}") from exc

    model.opt.timestep = timestep
    data = mujoco.MjData(model)
    _set_initial_state(model, data, task, values, mujoco)
    defaults = {name: spec.get("value", 0) for name, spec in task.get("ui", {}).get("controls", {}).get("actuators", {}).items()}
    controls = _set_actuator_controls(model, data, {**defaults, **(control_overrides or {})}, mujoco)
    mujoco.mj_forward(model, data)
    program = _compile_loads(task, values, model, mujoco)
    sample_steps, control_events = None, {}
    if replay is not None:
        sample_steps, control_events = restore_experiment(replay, model_revision(task, values, xml, assets), model, data, duration, timestep, mujoco)
        controls = {mujoco.mj_id2name(model, mujoco.mjtObj.mjOBJ_ACTUATOR, i): float(value) for i, value in enumerate(data.ctrl)}

    observe = task.get("observe", {}).get("observe", {})
    _validate_observations(model, observe, mujoco)
    units = _observation_units(model, observe, mujoco)
    units.update(program["units"])
    series: dict[str, list[float]] = {"time": []}
    steps = max(1, math.ceil(duration / timestep))
    if (len(sample_steps) if sample_steps is not None else steps + 1) * (len(units) + 1) > MAX_VALUES:
        raise SimulationError("观测数据过多，请减少观测量、缩短时长或增大步长。")
    started = time.monotonic()

    for step in range(steps + 1):
        if step % 100 == 0:
            if cancel_event is not None and cancel_event.is_set():
                raise SimulationError("计算已取消，未保存结果。")
            if time.monotonic() - started > 60:
                raise SimulationError("计算超过 60 秒，请缩小实验规模。")
            if progress is not None:
                progress(step / steps)
        if step in control_events:
            data.ctrl[:] = control_events[step]
        mujoco.mj_forward(model, data)
        load_values = _apply_loads(program, model, data)
        if program["entries"]:
            mujoco.mj_forward(model, data)
        row = {**_record_observations(model, data, observe, mujoco), **load_values}
        if not all(math.isfinite(value) for value in row.values()) or not np.all(np.isfinite(data.qpos)) or not np.all(np.isfinite(data.qvel)):
            raise SimulationError("仿真出现非有限数值，请检查模型或减小步长。")
        if step and data.time + 1e-9 < series["time"][-1]:
            raise SimulationError("MuJoCo 自动重置了不稳定的仿真，请检查模型或减小步长。")
        if sample_steps is None or step in sample_steps:
            series["time"].append(float(data.time))
            for key, value in row.items():
                series.setdefault(key, []).append(value)
            for key in list(series.keys()):
                if key != "time" and key not in row:
                    series[key].append(float("nan"))

        if step < steps:
            model.opt.timestep = min(timestep, max(0, duration - data.time))
            mujoco.mj_step(model, data)
            # mj_step advances qpos/qvel after computing derived Cartesian state.
            # Refresh sites/bodies so the next recorded row matches the new time.
            mujoco.mj_forward(model, data)
    if progress is not None:
        progress(1.0)

    summary = (
        f"# Simulation Summary\n\n"
        f"- Task: {task['id']}\n"
        f"- Duration: {duration:g} s\n"
        f"- Timestep: {timestep:g} s\n"
        f"- Samples: {len(series['time'])}\n"
        f"- Parameters: {values}\n"
        f"- Actuator controls: {controls}\n"
        f"- Browser experiment replay: {'yes' if replay is not None else 'no'}\n"
        f"- Load definitions: {task.get('loads', {})}\n"
        f"- Units: {units}\n"
    )

    return {
        "task_id": task["id"],
        "parameters": values,
        "controls": controls,
        "loads": task.get("loads", {}),
        "duration": duration,
        "timestep": timestep,
        "series": series,
        "units": units,
        "summary": summary,
        "experiment": {"parameters": values, "duration": duration, "timestep": timestep, "replay": replay} if replay is not None else None,
    }
