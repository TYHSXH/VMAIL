"""Task-only numerical Python runner, not a host shell or general Python sandbox.

Only audited syntax and explicitly exported numeric APIs are available to scripts.
No raw modules, Python introspection, native loading, networking or process APIs are
exposed. Files and simulator access go through task-scoped functions below.
"""
from __future__ import annotations

import ast
import csv
import io
import json
import math
from pathlib import Path
import statistics
from types import SimpleNamespace

import numpy as np

from .task_io import load_task, TaskValidationError
from .simulator import run_mujoco_task
from .assistant_tasks import MAX_BUNDLE_BYTES, checked_task_path, preflight_task, task_file_name

NUMPY_EXPORTS = "array asarray zeros ones empty arange linspace full concatenate stack vstack hstack column_stack diff gradient interp trapz trapezoid cumsum cumprod sum mean std var min max amin amax abs sqrt sin cos tan arcsin arccos arctan arctan2 sinh cosh exp log log10 sign floor ceil round clip where isfinite isnan all any allclose isclose dot cross outer eye diag reshape transpose ravel unique sort argsort argmin argmax percentile median polyfit polyval meshgrid pi e nan inf".split()
METHODS = set("append extend insert pop remove clear copy count index get keys values items update setdefault add discard union intersection difference join split splitlines strip lstrip rstrip replace startswith endswith lower upper sum mean std var min max all any reshape flatten ravel transpose tolist item astype round clip cumsum argmin argmax sort conjugate real imag shape size ndim T".split())
MATH_EXPORTS = {n for n in dir(math) if not n.startswith("_")}
STAT_EXPORTS = {"mean", "fmean", "median", "stdev", "pstdev", "variance", "pvariance", "harmonic_mean", "geometric_mean", "quantiles"}
EXPORT_NAMES = set(NUMPY_EXPORTS) | MATH_EXPORTS | STAT_EXPORTS | {"dumps", "loads", "norm", "solve", "eigvalsh", "det", "lstsq", "linalg"}
ALLOWED_ATTRIBUTES = METHODS | EXPORT_NAMES
DENIED_SYNTAX = (ast.ClassDef, ast.AsyncFunctionDef, ast.Await, ast.AsyncFor, ast.AsyncWith,
                 ast.With, ast.Global, ast.Nonlocal, ast.Delete, ast.Match)


def check_script(source: str):
    if len(source.encode()) > 512_000:
        raise TaskValidationError("分析脚本最多 512 KB。")
    tree = ast.parse(source)
    for node in ast.walk(tree):
        if isinstance(node, DENIED_SYNTAX):
            raise TaskValidationError("任务分析 Python 不支持类、异步、上下文管理或全局环境修改。")
        if isinstance(node, ast.Name) and node.id.startswith("__"):
            raise TaskValidationError("任务脚本不能访问 Python 内部对象。")
        if isinstance(node, ast.Attribute) and (node.attr not in ALLOWED_ATTRIBUTES or not isinstance(node.ctx, ast.Load)):
            raise TaskValidationError(f"任务分析环境未开放属性 {node.attr}；请使用数值 API 或任务读写函数。")
        if isinstance(node, (ast.FunctionDef, ast.Lambda)) and (getattr(node, "decorator_list", []) or getattr(node, "returns", None)):
            raise TaskValidationError("任务函数不支持装饰器和返回类型注解。")
        if isinstance(node, ast.Import):
            if any(n.name not in {"math", "numpy", "statistics", "json"} for n in node.names):
                raise TaskValidationError("可导入 math、numpy、statistics、json；仿真用 simulate()，文件用任务读写函数。")
        if isinstance(node, ast.ImportFrom):
            if node.level or node.module not in {"math", "numpy", "statistics", "json"} or any(n.name not in EXPORT_NAMES for n in node.names):
                raise TaskValidationError("只能导入数值模块公开的计算函数。")
    return tree


def run_script(folder: Path, source: str):
    root = folder.resolve(strict=True)
    output, generated = [], []
    written_bytes = 0

    def path_for(name, writing=False):
        path = checked_task_path(root, name)
        if writing and not name.startswith(".tmp/"):
            # Computations produce reports/assets, never rewrite task configs implicitly.
            task_file_name(name)
            if path.relative_to(root).parts[0] not in {"results", "assets", "models"}:
                raise ValueError("分析脚本只写 results、assets、models 或 .tmp；模型配置请用文件编辑工具。")
        return path

    def read_text(name):
        path = path_for(name)
        if path.stat().st_size > MAX_BUNDLE_BYTES:
            raise ValueError("单次读取最多 4 MiB。")
        return path.read_text(encoding="utf-8-sig")

    def write_text(name, text):
        nonlocal written_bytes
        if not isinstance(text, str) or len(text.encode()) > MAX_BUNDLE_BYTES:
            raise ValueError("单个生成文件最多 4 MiB。")
        written_bytes += len(text.encode())
        if written_bytes > 16 * MAX_BUNDLE_BYTES or len(generated) >= 512:
            raise ValueError("本次分析生成文件超过 64 MiB 或 512 个文件，请拆分计算。")
        path = path_for(name, True)
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(text, encoding="utf-8", newline="")
        if name not in generated:
            generated.append(name)
        return len(text)

    def read_csv(name):
        return list(csv.DictReader(io.StringIO(read_text(name))))

    def write_csv(name, rows, fieldnames=None):
        stream = io.StringIO()
        iterator = iter(rows)
        first = next(iterator, None)
        if isinstance(first, dict):
            writer = csv.DictWriter(stream, fieldnames=fieldnames or list(first))
            writer.writeheader()
        else:
            writer = csv.writer(stream)
            if fieldnames:
                writer.writerow(fieldnames)
        if first is not None:
            writer.writerow(first)
        for row in iterator:
            writer.writerow(row)
            if stream.tell() > MAX_BUNDLE_BYTES:
                raise ValueError("CSV 超过 4 MiB，请降采样。")
        return write_text(name, stream.getvalue())

    def simulate(parameters=None, duration=None, timestep=None):
        preflight_task(root)
        task = load_task(root.parent, root.name)
        result = run_mujoco_task(task, parameters or {}, duration, timestep)
        return {k: result[k] for k in ("parameters", "duration", "timestep", "series", "units")}

    def emit(*values, sep=" ", end="\n"):
        if sum(map(len, output)) < 64_000:
            output.append((sep.join(map(str, values)) + end)[:64_000])

    modules = {
        "math": SimpleNamespace(**{n: getattr(math, n) for n in MATH_EXPORTS}),
        "numpy": SimpleNamespace(**{n: getattr(np, n) for n in NUMPY_EXPORTS if hasattr(np, n)},
            linalg=SimpleNamespace(**{n: getattr(np.linalg, n) for n in ("norm", "solve", "eigvalsh", "det", "lstsq")})),
        "statistics": SimpleNamespace(**{n: getattr(statistics, n) for n in STAT_EXPORTS}),
        "json": SimpleNamespace(dumps=json.dumps, loads=json.loads),
    }

    def importer(name, globals=None, locals=None, fromlist=(), level=0):
        if level or name not in modules:
            raise ImportError("任务分析模块未开放。")
        return modules[name]

    safe_builtins = {n: getattr(__import__("builtins"), n) for n in (
        "abs", "all", "any", "bool", "dict", "divmod", "enumerate", "filter", "float", "int", "isinstance",
        "len", "list", "map", "max", "min", "next", "pow", "range", "reversed", "round", "set", "slice",
        "sorted", "str", "sum", "tuple", "zip", "Exception", "ValueError", "RuntimeError", "AssertionError")}
    safe_builtins.update(__import__=importer, print=emit)
    environment = {"__builtins__": safe_builtins, "read_text": read_text, "write_text": write_text,
                   "read_csv": read_csv, "write_csv": write_csv, "simulate": simulate}
    exec(compile(check_script(source), "<task-analysis>", "exec"), environment, environment)
    return {"stdout": "".join(output)[:64_000], "generated": generated, "exit_code": 0}

