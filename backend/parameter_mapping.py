"""MJCF parameter targets shared by loading, validation, and simulation."""
from __future__ import annotations

import math

from .loads import LoadError, compile_signal, evaluate


class ParameterMappingError(ValueError):
    pass


def mjcf_targets(spec: dict, parameter: str) -> list[dict]:
    raw = spec.get("mjcf")
    if raw is None or raw == {}:
        return []
    targets = raw if isinstance(raw, list) else [raw]
    if not 1 <= len(targets) <= 128:
        raise ParameterMappingError(f"参数 {parameter} 的 mjcf 必须包含 1–128 个目标。")
    for index, target in enumerate(targets, 1):
        label = f"参数 {parameter} 的 mjcf 第 {index} 项"
        if not isinstance(target, dict):
            raise ParameterMappingError(f"{label}必须是对象。")
        if set(target) - {"tag", "name", "attribute", "value"}:
            raise ParameterMappingError(f"{label}仅支持 tag、name、attribute、value。")
        for key in ("tag", "attribute"):
            if not isinstance(target.get(key), str) or not target[key].strip():
                raise ParameterMappingError(f"{label}缺少非空 {key}。")
        if "name" in target and (not isinstance(target["name"], str) or not target["name"].strip()):
            raise ParameterMappingError(f"{label}的 name 必须是非空名称；省略则匹配所有同类元素。")
        if "value" in target:
            parts = target["value"] if isinstance(target["value"], list) else [target["value"]]
            if not 1 <= len(parts) <= 16 or any(isinstance(part, bool) or not isinstance(part, (str, int, float)) for part in parts):
                raise ParameterMappingError(f"{label}的 value 必须是数字、数学表达式或含 1–16 项的向量列表。")
    return targets


def target_value(target: dict, parameter: str, values: dict[str, float]) -> str:
    raw = target.get("value", values[parameter])
    parts = raw if isinstance(raw, list) else [raw]
    result = []
    try:
        for part in parts:
            number = evaluate(compile_signal(part, values, None, None, static=True), None)
            if not math.isfinite(number):
                raise ValueError("结果必须是有限数字")
            result.append(str(float(number)))
    except (LoadError, ArithmeticError, ValueError, TypeError) as exc:
        raise ParameterMappingError(f"参数 {parameter} 的 MJCF 属性 {target['attribute']} 表达式无效：{exc}") from exc
    return " ".join(result)
