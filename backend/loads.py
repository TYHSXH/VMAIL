"""Portable, bounded expression trees for task-defined loads. No task code is executed."""
from __future__ import annotations

import ast
import bisect
import math
import re
from typing import Any

import numpy as np


class LoadError(ValueError):
    pass


FUNCTIONS = {
    "sin": (math.sin, 1), "cos": (math.cos, 1), "tan": (math.tan, 1),
    "asin": (math.asin, 1), "acos": (math.acos, 1), "atan": (math.atan, 1),
    "atan2": (math.atan2, 2), "exp": (math.exp, 1), "log": (math.log, 1),
    "sqrt": (math.sqrt, 1), "abs": (abs, 1), "floor": (math.floor, 1), "ceil": (math.ceil, 1),
    "min": (min, 2), "max": (max, 2), "clamp": (lambda x, lo, hi: max(lo, min(hi, x)), 3),
    "step": (lambda x: float(x >= 0), 1), "ramp": (lambda x: max(0, x), 1),
}
OPS = {ast.Add: "+", ast.Sub: "-", ast.Mult: "*", ast.Div: "/", ast.Pow: "**"}
CMP = {ast.Lt: "<", ast.LtE: "<=", ast.Gt: ">", ast.GtE: ">=", ast.Eq: "==", ast.NotEq: "!="}


def _finite(value: Any) -> float:
    if isinstance(value, bool) or not isinstance(value, (int, float)) or not math.isfinite(value):
        raise LoadError("载荷数值必须是有限数字。")
    return float(value)


def compile_signal(source: Any, parameters: dict, model: Any, mujoco: Any) -> Any:
    if isinstance(source, (int, float)):
        return _finite(source)
    if isinstance(source, dict):
        if set(source) != {"table"} or not isinstance(source["table"], list) or not 2 <= len(source["table"]) <= 256:
            raise LoadError("表格信号应为 table: [[时间, 数值], ...]，包含 2–256 个点。")
        points = source["table"]
        if any(not isinstance(point, list) or len(point) != 2 for point in points):
            raise LoadError("表格的每行必须包含时间和数值。")
        times, values = zip(*[[_finite(x) for x in point] for point in points])
        if any(b <= a for a, b in zip(times, times[1:])):
            raise LoadError("表格时间必须严格递增。")
        return ["table", list(times), list(values)]
    if not isinstance(source, str) or not source.strip() or len(source) > 512:
        raise LoadError("信号必须是数字、长度不超过 512 的表达式，或 table 对象。")
    try:
        tree = ast.parse(source, mode="eval")
    except (SyntaxError, RecursionError) as exc:
        raise LoadError(f"表达式语法错误：{source}") from exc
    if sum(1 for _ in ast.walk(tree)) > 256:
        raise LoadError("表达式过于复杂，请拆分或使用表格。")

    def visit(node):
        if isinstance(node, ast.Constant):
            return _finite(node.value)
        if isinstance(node, ast.Name):
            if node.id == "t": return ["t"]
            if node.id in {"pi", "e"}: return getattr(math, node.id)
            if node.id in parameters: return _finite(parameters[node.id])
            raise LoadError(f"未知表达式变量：{node.id}")
        if isinstance(node, ast.BinOp) and type(node.op) in OPS:
            return [OPS[type(node.op)], visit(node.left), visit(node.right)]
        if isinstance(node, ast.UnaryOp) and isinstance(node.op, (ast.UAdd, ast.USub)):
            return ["*", -1 if isinstance(node.op, ast.USub) else 1, visit(node.operand)]
        if isinstance(node, ast.Compare) and len(node.ops) == 1 and type(node.ops[0]) in CMP:
            return [CMP[type(node.ops[0])], visit(node.left), visit(node.comparators[0])]
        if isinstance(node, ast.BoolOp) and isinstance(node.op, (ast.And, ast.Or)):
            return ["and" if isinstance(node.op, ast.And) else "or", *map(visit, node.values)]
        if isinstance(node, ast.Call) and isinstance(node.func, ast.Name) and not node.keywords:
            name = node.func.id
            if name in {"q", "v"} and len(node.args) == 1 and isinstance(node.args[0], ast.Constant) and isinstance(node.args[0].value, str):
                joint = mujoco.mj_name2id(model, mujoco.mjtObj.mjOBJ_JOINT, node.args[0].value)
                if joint < 0 or model.jnt_type[joint] not in (mujoco.mjtJoint.mjJNT_HINGE, mujoco.mjtJoint.mjJNT_SLIDE):
                    raise LoadError(f"q/v 只能引用存在的转动或滑动关节：{node.args[0].value}")
                return [name, int(model.jnt_qposadr[joint] if name == "q" else model.jnt_dofadr[joint])]
            arity = 3 if name == "where" else FUNCTIONS.get(name, (None, -1))[1]
            if len(node.args) == arity:
                return [name, *map(visit, node.args)]
        raise LoadError("表达式仅支持数学运算、比较、and/or、白名单函数及 q('关节')、v('关节')。")
    return visit(tree.body)


def evaluate(node: Any, data: Any) -> float:
    if isinstance(node, (float, int)): return node
    op, *args = node
    if op == "t": return float(data.time)
    if op == "q": return float(data.qpos[args[0]])
    if op == "v": return float(data.qvel[args[0]])
    if op == "where": return evaluate(args[1] if evaluate(args[0], data) else args[2], data)
    if op == "and": return float(all(evaluate(arg, data) for arg in args))
    if op == "or": return float(any(evaluate(arg, data) for arg in args))
    if op == "table":
        times, values = args
        i = bisect.bisect_right(times, data.time)
        if i == 0: return values[0]
        if i == len(times): return values[-1]
        ratio = (data.time - times[i - 1]) / (times[i] - times[i - 1])
        return values[i - 1] + ratio * (values[i] - values[i - 1])
    x = [evaluate(arg, data) for arg in args]
    if op == "+": return x[0] + x[1]
    if op == "-": return x[0] - x[1]
    if op == "*": return x[0] * x[1]
    if op == "/": return x[0] / x[1]
    if op == "**": return math.pow(x[0], x[1])
    if op == "<": return float(x[0] < x[1])
    if op == "<=": return float(x[0] <= x[1])
    if op == ">": return float(x[0] > x[1])
    if op == ">=": return float(x[0] >= x[1])
    if op == "==": return float(x[0] == x[1])
    if op == "!=": return float(x[0] != x[1])
    return FUNCTIONS[op][0](*x)


def compile_loads(config: dict, parameters: dict, model: Any, mujoco: Any) -> dict:
    if not isinstance(config, dict) or set(config) - {"version", "loads"} or config.get("version", 1) != 1:
        raise LoadError("loads.yaml 仅支持 version: 1 和 loads 列表。")
    entries = config.get("loads", [])
    if not isinstance(entries, list) or len(entries) > 32:
        raise LoadError("loads 必须是列表，最多 32 项。")
    program = {"version": 1, "entries": [], "units": {}}
    seen, driven = set(), set()
    for raw in entries:
        if not isinstance(raw, dict): raise LoadError("每条载荷必须是对象。")
        name, kind = raw.get("id"), raw.get("type")
        if not isinstance(name, str) or not re.fullmatch(r"[a-z][a-z0-9_]{0,47}", name) or name in seen:
            raise LoadError("载荷 id 必须唯一，使用小写字母开头的小写字母、数字、下划线（最多48字）。")
        seen.add(name)
        entry = {"id": name, "type": kind, "label": str(raw.get("label", name))[:80], "source": raw}
        allowed = {"id", "label", "type"}
        signal = lambda value: compile_signal(value, parameters, model, mujoco)
        def lookup(field, obj):
            value = raw.get(field)
            if not isinstance(value, str): raise LoadError(f"载荷 {name} 缺少 {field} 名称。")
            index = mujoco.mj_name2id(model, obj, value)
            if index < 0: raise LoadError(f"载荷 {name} 引用不存在的 {field}：{value}")
            return index
        if kind in {"joint", "actuator"}:
            allowed |= {kind, "value", "unit"}
            index = lookup(kind, mujoco.mjtObj.mjOBJ_JOINT if kind == "joint" else mujoco.mjtObj.mjOBJ_ACTUATOR)
            unit = raw.get("unit")
            if not isinstance(unit, str) or not unit.strip(): raise LoadError(f"载荷 {name} 必须声明 unit。")
            if kind == "joint":
                if model.jnt_type[index] not in (mujoco.mjtJoint.mjJNT_HINGE, mujoco.mjtJoint.mjJNT_SLIDE):
                    raise LoadError("关节载荷仅支持转动或滑动关节。")
                expected = "N" if model.jnt_type[index] == mujoco.mjtJoint.mjJNT_SLIDE else "N·m"
                if unit != expected: raise LoadError(f"载荷 {name} 的单位应为 {expected}。")
                entry["index"] = int(model.jnt_dofadr[index])
            else:
                if index in driven: raise LoadError("同一执行器不能配置多条自动控制规律。")
                driven.add(index); entry["index"] = index
                if model.actuator_ctrllimited[index]: entry["range"] = model.actuator_ctrlrange[index].tolist()
            entry["value"] = signal(raw.get("value"))
            program["units"][f"load.{name}.value"] = unit
        elif kind == "wrench":
            allowed |= {"body", "site", "force", "torque", "frame", "point"}
            if ("body" in raw) == ("site" in raw): raise LoadError("wrench 必须且只能指定 body 或 site。")
            if "site" in raw:
                entry["site"] = lookup("site", mujoco.mjtObj.mjOBJ_SITE)
                entry["body"] = int(model.site_bodyid[entry["site"]])
                if "point" in raw: raise LoadError("site 已确定作用点，不能再设置 point。")
            else:
                entry["body"] = lookup("body", mujoco.mjtObj.mjOBJ_BODY)
            if entry["body"] == 0: raise LoadError("不能向 world 施加载荷。")
            entry["frame"] = raw.get("frame", "world")
            if entry["frame"] not in {"world", "body"}: raise LoadError("frame 仅支持 world 或 body。")
            if not {"force", "torque"} & raw.keys(): raise LoadError("wrench 至少需要 force 或 torque。")
            for field in ("force", "torque"):
                vector = raw.get(field, [0, 0, 0])
                if not isinstance(vector, list) or len(vector) != 3: raise LoadError(f"{field} 必须有三个分量。")
                entry[field] = list(map(signal, vector))
            if "point" in raw:
                point = raw["point"]
                if not isinstance(point, list) or len(point) != 3: raise LoadError("point 必须有三个物体局部坐标。")
                entry["point"] = list(map(_finite, point))
            for component in ("fx", "fy", "fz", "tx", "ty", "tz"):
                program["units"][f"load.{name}.{component}"] = "N" if component[0] == "f" else "N·m"
        else: raise LoadError(f"未知载荷类型：{kind}")
        if set(raw) - allowed: raise LoadError(f"载荷 {name} 包含未知字段：{', '.join(sorted(set(raw) - allowed))}")
        program["entries"].append(entry)
    return program


def apply_loads(program: dict, model: Any, data: Any) -> dict[str, float]:
    if not program["entries"]: return {}
    data.qfrc_applied[:] = 0
    data.xfrc_applied[:] = 0
    outputs = {}
    for entry in program["entries"]:
        prefix = f"load.{entry['id']}"
        try:
            def value(node):
                number = evaluate(node, data)
                if not isinstance(number, (int, float)) or not math.isfinite(number): raise ValueError("非有限数值")
                return float(number)
            if entry["type"] in {"joint", "actuator"}:
                number = value(entry["value"])
                if "range" in entry: number = max(entry["range"][0], min(entry["range"][1], number))
                if entry["type"] == "joint":
                    data.qfrc_applied[entry["index"]] += number
                    if not math.isfinite(data.qfrc_applied[entry["index"]]): raise ValueError("叠加载荷超出数值范围")
                else: data.ctrl[entry["index"]] = number
                outputs[f"{prefix}.value"] = number
            else:
                body = entry["body"]
                rotation = data.xmat[body].reshape(3, 3)
                force, torque = (np.array([value(node) for node in entry[field]]) for field in ("force", "torque"))
                if entry["frame"] == "body": force, torque = rotation @ force, rotation @ torque
                point = data.site_xpos[entry["site"]] if "site" in entry else data.xpos[body] + rotation @ entry["point"] if "point" in entry else data.xipos[body]
                torque = torque + np.cross(point - data.xipos[body], force)
                wrench = np.concatenate((force, torque))
                if not np.all(np.isfinite(wrench)): raise ValueError("非有限空间载荷")
                data.xfrc_applied[body] += wrench
                if not np.all(np.isfinite(data.xfrc_applied[body])): raise ValueError("叠加载荷超出数值范围")
                outputs.update({f"{prefix}.{axis}": float(number) for axis, number in zip(("fx", "fy", "fz", "tx", "ty", "tz"), wrench)})
        except (ArithmeticError, ValueError, TypeError) as exc:
            data.qfrc_applied[:] = 0; data.xfrc_applied[:] = 0
            raise LoadError(f"载荷 {entry['label']} 在 t={data.time:g} s 计算失败：{exc}") from exc
    return outputs
