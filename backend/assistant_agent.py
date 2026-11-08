"""Task workspace, exact-operation approvals and auditable task tools."""
from __future__ import annotations

import difflib
import hashlib
import json
import os
from pathlib import Path
import re
import shlex
import shutil
import threading
import time
import xml.etree.ElementTree as ET
from uuid import uuid4

from fastapi import HTTPException

from .assistant_tasks import (MAX_BUNDLE_BYTES, check_bundle, copy_task_inputs, is_link,
    publish_bundle, read_task_snapshot, task_file_name, task_folder, update_bundle, checked_task_path, read_task_files)
from .assistant_compute import check_script
from .assistant_process import run_worker
from .task_io import TaskValidationError, list_tasks
from .branding import copy_brand_assets, referenced_logos

ROOT = Path(__file__).resolve().parents[1]
TASK_DOCUMENTS = {name: ROOT / "docs" / filename for name, filename in {
    "rules": "task-rules.md", "spec": "task-package-spec.md", "guide": "task-guide.md"}.items()}
RUNS = {}
RUNS_LOCK = threading.Lock()


def remove_workspace(folder):
    """Windows can briefly retain file handles after a worker exits."""
    for attempt in range(12):
        try:
            shutil.rmtree(folder)
            return
        except FileNotFoundError:
            return
        except PermissionError:
            if attempt == 11:
                raise
            time.sleep(.1 * min(attempt + 1, 3))


def recover_workspaces():
    """Recover only owned workspaces whose server process has exited."""
    base = ROOT / ".local" / "ai-workspaces"
    if not base.exists():
        return
    for folder in base.iterdir():
        if not re.fullmatch(r"[a-f0-9]{32}", folder.name) or is_link(folder) or not folder.is_dir() or folder.resolve().parent != base.resolve():
            continue
        marker = folder / ".owner.json"
        try:
            owner = json.loads(marker.read_text(encoding="utf-8"))["pid"]
            if not isinstance(owner, int) or owner <= 0:
                continue
            if os.name == "nt":
                import ctypes
                from ctypes import wintypes as w
                api = ctypes.WinDLL("kernel32", use_last_error=True)
                api.OpenProcess.argtypes = [w.DWORD, w.BOOL, w.DWORD]
                api.OpenProcess.restype = w.HANDLE
                api.GetExitCodeProcess.argtypes = [w.HANDLE, ctypes.POINTER(w.DWORD)]
                api.CloseHandle.argtypes = [w.HANDLE]
                handle = api.OpenProcess(0x1000, False, owner)
                if handle:
                    code = w.DWORD()
                    alive = api.GetExitCodeProcess(handle, ctypes.byref(code)) and code.value == 259
                    api.CloseHandle(handle)
                    if alive:
                        continue
                elif ctypes.get_last_error() != 87:  # Access denied is not evidence of an exited process.
                    continue
            else:
                try:
                    os.kill(owner, 0)
                    continue
                except ProcessLookupError:
                    pass
            remove_workspace(folder)
        except (OSError, ValueError, KeyError):
            # Unknown directories are not ours to remove.
            continue


class Approval:
    def __init__(self):
        self.id = uuid4().hex
        self.ready = threading.Event()
        self.decision = None


def decide(run_id, approval_id, decision):
    with RUNS_LOCK:
        run = RUNS.get(run_id)
        approval = run.pending if run else None
        if not approval or approval.id != approval_id or approval.ready.is_set() or run.stopped.is_set():
            raise HTTPException(409, "该审批已结束或本轮已停止，请查看最新请求。")
        approval.decision = decision
        approval.ready.set()
    return {"accepted": True}


def steer(run_id, message_id, content):
    with RUNS_LOCK:
        run = RUNS.get(run_id)
        if not run or run.stopped.is_set() or not run.accepts_messages:
            raise HTTPException(409, "本轮已结束，请将修正作为新消息发送。")
        if message_id in run.steering_ids:
            return {"accepted": True}
        if len(run.steering_ids) >= 32:
            raise HTTPException(429, "本轮补充消息已达上限，请等本轮结束后继续。")
        run.steering_ids.add(message_id)
        run.steering.append({"id": message_id, "content": content})
        run.grants.clear()
        if run.pending and not run.pending.ready.is_set():
            run.pending.decision = "revised"
            run.pending.ready.set()
    return {"accepted": True}


def file_path(folder, name):
    path = checked_task_path(folder, name)
    if name.startswith(".tmp/"):
        task_file_name(("scripts/" if path.suffix == ".py" else "results/") + path.name)
    else:
        task_file_name(name)
    return path


def describe_change(task_id, name, before, after, status="staged"):
    return {"task_id": task_id, "path": name, "action": "modified" if before is not None else "created",
            "temporary": name.startswith(".tmp/"), "status": status,
            "bytes": len(after.encode()), "content": after[:64_000], "truncated": len(after) > 64_000,
            "diff": "".join(difflib.unified_diff((before or "").splitlines(True), after.splitlines(True),
                        fromfile=name + "（原内容）", tofile=name + "（修改后）"))[:32_000]}


class TaskAgent:
    def __init__(self, tasks_dir, stopped):
        self.id = uuid4().hex
        self.tasks_dir, self.stopped = Path(tasks_dir), stopped
        self.root = ROOT / ".local" / "ai-workspaces" / self.id
        self.root.mkdir(parents=True)
        (self.root / ".owner.json").write_text(json.dumps({"pid": os.getpid()}), encoding="utf-8")
        self.tasks = {}
        self.pending = None
        self.grants = set()
        self.approved_files = {}
        self.changes = {}
        self.steering, self.steering_ids = [], set()
        self.accepts_messages = True
        with RUNS_LOCK:
            RUNS[self.id] = self

    def take_messages(self, *, final=False, stop=False):
        with RUNS_LOCK:
            messages, self.steering = self.steering, []
            if stop or final and not messages:
                self.accepts_messages = False
            return messages

    def approve(self, detail, scope):
        """Yield a concrete proposal, then wait for an explicit student decision."""
        if self.steering:
            return False
        if scope in self.grants:
            return True
        approval = Approval()
        with RUNS_LOCK:
            self.pending = approval
        yield {"type": "approval_required", "run_id": self.id, "approval_id": approval.id,
               "review": {"status": "passed", "summary": "任务路径与操作范围检查通过，等待你的授权；模型与脚本的运行结果会另行验证。"}, **detail}
        start, heartbeat = time.monotonic(), time.monotonic()
        try:
            while not approval.ready.wait(.2):
                if self.stopped.is_set():
                    return False
                if time.monotonic() - start > 900:
                    yield {"type": "approval_resolved", "approval_id": approval.id, "decision": "expired"}
                    return False
                if time.monotonic() - heartbeat > 10:
                    heartbeat = time.monotonic()
                    yield {"type": "status", "message": "等待你审查操作；选择同意或拒绝后，助手会继续。"}
            if approval.decision == "turn" and not self.steering:
                self.grants.add(scope)
            yield {"type": "approval_resolved", "approval_id": approval.id, "decision": approval.decision}
            return approval.decision in {"once", "turn"} and not self.stopped.is_set() and not self.steering
        finally:
            with RUNS_LOCK:
                self.pending = None

    def stage(self, task_id):
        if not re.fullmatch(r"[a-z][a-z0-9_]{0,63}", task_id):
            raise TaskValidationError("任务编号使用小写字母开头的英文字母、数字和下划线。")
        if task_id not in self.tasks:
            folder = self.root / task_id
            if (self.tasks_dir / task_id).exists():
                snapshot = read_task_snapshot(self.tasks_dir, task_id)
                copy_task_inputs(task_folder(self.tasks_dir, task_id), folder)
                # Reports are read on demand, never copied or overwritten implicitly.
                self.tasks[task_id] = {"folder": folder, "revision": snapshot["base_revision"], "original": snapshot["files"]}
            else:
                folder.mkdir()
                self.tasks[task_id] = {"folder": folder, "revision": None, "original": {}}
        return self.tasks[task_id]

    def files(self, task_id):
        return read_task_files(self.stage(task_id)["folder"], include_results=True)

    def record(self, task_id, files, status="staged"):
        changes = []
        for name, content in files.items():
            row = describe_change(task_id, name, self.original(task_id, name), content, status)
            self.changes[(task_id, name)] = row
            changes.append(row)
        return {"type": "file_changes", "run_id": self.id, "files": changes}

    def original(self, task_id, name):
        stage = self.stage(task_id)
        if name not in stage["original"] and stage["revision"] and not name.startswith(".tmp/"):
            path = file_path(task_folder(self.tasks_dir, task_id), name)
            if path.is_file():
                if path.stat().st_size > MAX_BUNDLE_BYTES:
                    raise TaskValidationError("该文件过大，不能通过当前文本工具覆盖。")
                stage["original"][name] = path.read_text(encoding="utf-8-sig")
        return stage["original"].get(name)

    def brand_assets(self, task_id, xml, status="staged"):
        stage = self.stage(task_id)
        try:
            names = referenced_logos(xml)
            existing = {name for name in names if (stage["folder"] / name).exists()}
            copy_brand_assets(stage["folder"], xml)
        except ET.ParseError:
            return {"type": "file_changes", "run_id": self.id, "files": []}
        rows = []
        for name in names:
            key = (task_id, name)
            if name in existing and key not in self.changes:
                continue
            raw = (stage["folder"] / name).read_bytes()
            row = {"task_id": task_id, "path": name, "action": "created", "temporary": False,
                   "status": status, "bytes": len(raw), "binary": True,
                   "content": "平台内置模型资源；SHA-256: " + hashlib.sha256(raw).hexdigest(), "diff": ""}
            self.changes[key] = row
            rows.append(row)
        return {"type": "file_changes", "run_id": self.id, "files": rows}

    def write(self, task_id, files):
        stage = self.stage(task_id)
        if not files or len(files) > 1000 or any(not isinstance(v, str) for v in files.values()) or sum(len(v.encode()) for v in files.values()) > MAX_BUNDLE_BYTES:
            raise TaskValidationError("单次最多写入 1000 个文件、4 MiB 文本。")
        paths = {name: file_path(stage["folder"], name) for name in files}
        if len({name.casefold() for name in paths}) != len(paths):
            raise TaskValidationError("同一批文件不能只靠大小写区分文件名。")
        rows = [describe_change(task_id, name, path.read_text(encoding="utf-8-sig") if path.exists() else self.original(task_id, name), files[name]) for name, path in paths.items()]
        accepted = yield from self.approve({"kind": "files", "task_id": task_id, "title": "创建或修改任务文件", "files": rows,
            "description": "这些文件先进入任务工作区；校验后由助手保存。临时文件会在本轮结束时清理。"}, ("files", task_id))
        if not accepted:
            return {"denied": True, "message": "学生未同意这次文件操作；文件未写入，请停止重试同一操作或采用其他方案。"}
        for name, path in paths.items():
            if self.stopped.is_set():
                return {"cancelled": True}
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text(files[name], encoding="utf-8", newline="")
            self.approved_files[(task_id, name)] = hashlib.sha256(files[name].encode()).hexdigest()
        yield self.record(task_id, files)
        if "model.xml" in files:
            yield self.brand_assets(task_id, files["model.xml"])
        return {"staged": True, "task_id": task_id, "files": list(files), "message": "文件已进入本轮工作区；尚未保存到任务列表。继续验证，完成后调用 save_task。"}

    def save(self, task_id):
        stage = self.stage(task_id)
        files = self.files(task_id)
        check_bundle(task_id, files, task_folder(self.tasks_dir, task_id) if stage["revision"] else None)
        changed = {k: v for k, v in files.items() if self.original(task_id, k) != v}
        if not changed:
            return {"message": "没有待保存的任务修改。"}
        unapproved = {k: v for k, v in changed.items() if self.approved_files.get((task_id, k)) != hashlib.sha256(v.encode()).hexdigest()}
        if unapproved:
            accepted = yield from self.approve({"kind": "files", "task_id": task_id, "title": "保存任务文件", "files": [describe_change(task_id, k, stage["original"].get(k), v) for k, v in unapproved.items()],
                "description": "保存下列文件到学习任务。已有文件保留修改前备份。"}, ("files", task_id))
            if not accepted:
                return {"denied": True, "message": "学生拒绝保存；任务文件未改变。"}
        yield {"type": "status", "message": "正在校验任务并运行默认工况…"}
        validation = run_worker(stage["folder"], "validate", {}, self.stopped)
        if not validation.get("valid"):
            result = {"type": "draft", "draft": {"task_id": task_id, "files": files, "operation": "update" if stage["revision"] else "create", "base_revision": stage["revision"]}, "validation": {"valid": False, "errors": validation.get("errors") or [validation.get("error", "试运行未通过")]}}
            yield result
            return result
        if self.stopped.is_set():
            return {"cancelled": True}
        if stage["revision"]:
            task = update_bundle(self.tasks_dir, task_id, changed, stage["revision"])
        else:
            task = publish_bundle(self.tasks_dir, task_id, files)
        snapshot = read_task_snapshot(self.tasks_dir, task_id)
        operation = "update" if stage["revision"] else "create"
        yield self.record(task_id, changed, "saved")
        yield self.brand_assets(task_id, files["model.xml"], "saved")
        stage.update(revision=snapshot["base_revision"], original=snapshot["files"])
        result = {"type": "task_saved", "operation": operation, "task": task,
            "draft": {"task_id": task_id, "files": files, "operation": operation, "base_revision": stage["revision"]},
            "validation": validation}
        yield result
        return {"type": "task_saved", "task": task, "validation": validation,
                "message": "已真实保存。请检查实验数据和参数工况；有问题继续修改，最后向学生说明结果、验证与局限。"}

    def command_spec(self, task_id, command):
        stage = self.stage(task_id)
        args = shlex.split(command)
        if not args or args[0] not in {"python", "python3"}:
            raise TaskValidationError("任务终端支持 python <任务分析脚本.py>、python -m backend.validate_task <任务编号>；参数实验使用 simulate_task。没有主机 Shell 权限。")
        if args[1:] == ["-m", "backend.validate_task", task_id]:
            return "validate", {}, "validate"
        if len(args) == 2 and args[1].endswith(".py"):
            path = file_path(stage["folder"], args[1])
            source = path.read_text(encoding="utf-8-sig")
            check_script(source)
            return "python", {"script": args[1], "source": source}, hashlib.sha256(source.encode()).hexdigest()
        raise TaskValidationError("命令不属于当前任务的校验或分析脚本；不能使用 Shell、安装软件、联网或执行平台代码。")

    def command(self, task_id, command=None, options=None):
        stage = self.stage(task_id)
        if command:
            operation, options, scope = self.command_spec(task_id, command)
        else:
            operation, scope = "simulate", "simulate"
            command = "simulate_task " + json.dumps(options, ensure_ascii=False)
        detail = {"kind": "command", "task_id": task_id, "title": "运行任务命令", "command": command,
                  "description": "工作目录：本任务的临时副本。生成结果先保留在工作区，保存前仍需文件授权。"}
        if operation == "python":
            detail["source"] = options["source"]
            detail["description"] += " Python 使用任务数值环境：math、NumPy、statistics、JSON、simulate() 与任务文件读写函数。"
        accepted = yield from self.approve(detail, ("command", task_id, scope))
        if not accepted:
            return {"denied": True, "message": "学生未同意运行命令；命令未执行，请尊重此决定。"}
        before = self.files(task_id)
        result = run_worker(stage["folder"], operation, options or {}, self.stopped)
        after = self.files(task_id)
        changed = {k: v for k, v in after.items() if before.get(k) != v}
        if changed:
            yield self.record(task_id, changed)
        for name in result.get("generated", []):
            if name.startswith(".tmp/"):
                path = file_path(stage["folder"], name)
                if path.exists():
                    yield self.record(task_id, {name: path.read_text(encoding="utf-8-sig")})
        yield {"type": "command_result", "run_id": self.id, "task_id": task_id, "command": command, "result": result}
        return result

    def call(self, name, data):
        task_id = data.get("task_id")
        if name == "write_task_files":
            return (yield from self.write(task_id, data["files"]))
        if name == "patch_task_file":
            stage = self.stage(task_id)
            path = file_path(stage["folder"], data["path"])
            original = path.read_text(encoding="utf-8-sig")
            if not data["old_text"] or original.count(data["old_text"]) != 1:
                raise TaskValidationError("替换内容必须在当前文件中精确出现一次；请先重新读取。")
            return (yield from self.write(task_id, {data["path"]: original.replace(data["old_text"], data["new_text"], 1)}))
        if name == "save_task":
            return (yield from self.save(task_id))
        if name == "run_command":
            return (yield from self.command(task_id, data["command"]))
        if name == "simulate_task":
            return (yield from self.command(task_id, options={"cases": data.get("cases") or [{}]}))
        if name == "read_task_file":
            path = file_path(self.stage(task_id)["folder"], data["path"])
            if not path.exists() and data["path"].startswith("results/"):
                path = file_path(task_folder(self.tasks_dir, task_id), data["path"])
            if path.stat().st_size > 8 * 1024 * 1024:
                raise TaskValidationError("请使用参数实验的降采样结果，或拆分大型结果文件。")
            lines = path.read_text(encoding="utf-8-sig").splitlines()
            start, count = max(0, int(data.get("start_line", 1)) - 1), min(1000, max(1, int(data.get("line_count", 200))))
            return {"path": data["path"], "total_lines": len(lines), "start_line": start + 1, "content": "\n".join(lines[start:start + count])[:100_000]}
        if name == "list_task_files":
            stage = self.stage(task_id)
            return {"files": [{"path": p.relative_to(stage["folder"]).as_posix(), "bytes": p.stat().st_size} for p in stage["folder"].rglob("*") if p.is_file()][:2000]}
        if name == "read_task_docs":
            source = TASK_DOCUMENTS[data.get("document", "spec")].read_text(encoding="utf-8-sig").splitlines()
            start = max(0, int(data.get("start_line", 1)) - 1)
            return {"document": data.get("document", "spec"), "total_lines": len(source), "content": "\n".join(source[start:start + min(500, int(data.get("line_count", 200)))])}
        if name == "list_tasks":
            return {"tasks": [{"id": t["id"], "title": t.get("title", t["id"])} for t in list_tasks(self.tasks_dir)]}
        if name == "cleanup_temporary_files":
            removed = self.clean_temporary()
            yield {"type": "file_changes", "run_id": self.id, "files": removed}
            return {"removed": [r["task_id"] + "/" + r["path"] for r in removed]}
        raise TaskValidationError("不支持的任务工具。")

    def clean_temporary(self):
        rows = []
        for stage in self.tasks.values():
            folder = stage["folder"] / ".tmp"
            if folder.exists():
                if folder.resolve().parent != stage["folder"].resolve() or is_link(folder):
                    raise TaskValidationError("临时目录边界异常，停止清理。")
                remove_workspace(folder)
        for row in self.changes.values():
            if row["temporary"] and row["status"] != "cleaned":
                row["status"] = "cleaned"
                rows.append(dict(row))
        return rows

    def close(self):
        rows = self.clean_temporary()
        if self.root.exists():
            if self.root.resolve().parent != (ROOT / ".local" / "ai-workspaces").resolve() or is_link(self.root):
                raise TaskValidationError("工作区边界异常，停止清理。")
            remove_workspace(self.root)
        for row in self.changes.values():
            if row["status"] == "staged":
                row["status"] = "discarded"
                rows.append(dict(row))
        with RUNS_LOCK:
            RUNS.pop(self.id, None)
        return rows


def tool_schema(name, description, properties, required):
    return {"type": "function", "function": {"name": name, "description": description,
        "parameters": {"type": "object", "properties": properties, "required": required, "additionalProperties": False}}}


def agent_tools():
    task = {"task_id": {"type": "string"}}
    path = {**task, "path": {"type": "string"}}
    return [
        tool_schema("list_tasks", "列出可操作的学习任务。", {}, []),
        tool_schema("list_task_files", "列出任务工作区文件（含本轮临时文件）。", task, ["task_id"]),
        tool_schema("read_task_file", "分段读取任务文件；start_line 从1开始。", {**path, "start_line": {"type": "integer"}, "line_count": {"type": "integer"}}, ["task_id", "path"]),
        tool_schema("read_task_docs", "按需读取平台任务规范、建模指南或规则。", {"document": {"type": "string", "enum": ["spec", "guide", "rules"]}, "start_line": {"type": "integer"}, "line_count": {"type": "integer"}}, ["document"]),
        tool_schema("write_task_files", "申请创建或修改任务文件（完整文本，可分批）。学生审批后进入工作区；调用save_task才保存。临时文件放.tmp/。", {**task, "files": {"type": "object", "additionalProperties": {"type": "string"}}}, ["task_id", "files"]),
        tool_schema("patch_task_file", "申请局部修改任务文件，old_text必须精确出现一次。", {**path, "old_text": {"type": "string"}, "new_text": {"type": "string"}}, ["task_id", "path", "old_text", "new_text"]),
        tool_schema("run_command", "申请运行任务终端命令。python -m backend.validate_task TASK_ID；python scripts/analysis.py 或 python .tmp/check.py。脚本可import math/numpy/statistics/json，使用simulate(parameters={},duration=None,timestep=None)、read_text/write_text/read_csv/write_csv；无主机Shell/网络/安装权限。", {**task, "command": {"type": "string"}}, ["task_id", "command"]),
        tool_schema("simulate_task", "申请运行一组或多组参数实验，返回初末值、极值、非有限数及降采样曲线；完整数据可在分析脚本中用simulate()计算。", {**task, "cases": {"type": "array", "maxItems": 40, "items": {"type": "object", "properties": {"parameters": {"type": "object", "additionalProperties": {"type": "number"}}, "duration": {"type": "number"}, "timestep": {"type": "number"}}, "additionalProperties": False}}}, ["task_id", "cases"]),
        tool_schema("save_task", "校验并运行默认工况后保存本轮任务文件，保留备份与版本检查。成功后仍可继续验证、修复与报告。", task, ["task_id"]),
        tool_schema("cleanup_temporary_files", "结束任务前清理本轮.tmp分析脚本与中间结果；平台在结束/停止/断线时也会兜底清理。", {}, []),
    ]
