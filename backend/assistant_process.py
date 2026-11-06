"""Bounded task workers. No shell interpolation and no inherited API credentials."""
import json
import os
from pathlib import Path
import subprocess
import sys
import time

ROOT = Path(__file__).resolve().parents[1]


def memory_job(process):
    if sys.platform != "win32":
        return None
    import ctypes
    from ctypes import wintypes as w
    class Basic(ctypes.Structure):
        _fields_ = [("ProcessTime", ctypes.c_longlong), ("JobTime", ctypes.c_longlong), ("Flags", w.DWORD),
                    ("MinWorkingSet", ctypes.c_size_t), ("MaxWorkingSet", ctypes.c_size_t),
                    ("ActiveProcessLimit", w.DWORD), ("Affinity", ctypes.c_size_t), ("Priority", w.DWORD), ("Scheduling", w.DWORD)]
    class IO(ctypes.Structure):
        _fields_ = [(n, ctypes.c_ulonglong) for n in ("ReadOps", "WriteOps", "OtherOps", "ReadBytes", "WriteBytes", "OtherBytes")]
    class Extended(ctypes.Structure):
        _fields_ = [("Basic", Basic), ("IO", IO), ("ProcessMemory", ctypes.c_size_t), ("JobMemory", ctypes.c_size_t),
                    ("PeakProcess", ctypes.c_size_t), ("PeakJob", ctypes.c_size_t)]
    api = ctypes.WinDLL("kernel32", use_last_error=True)
    api.CreateJobObjectW.restype = w.HANDLE
    api.CreateJobObjectW.argtypes = [ctypes.c_void_p, w.LPCWSTR]
    api.SetInformationJobObject.argtypes = [w.HANDLE, ctypes.c_int, ctypes.c_void_p, w.DWORD]
    api.AssignProcessToJobObject.argtypes = [w.HANDLE, w.HANDLE]
    api.CloseHandle.argtypes = [w.HANDLE]
    handle = api.CreateJobObjectW(None, None)
    limits = Extended()
    limits.Basic.Flags = 0x2000 | 0x100  # kill on close + process memory limit
    limits.ProcessMemory = 1024 * 1024 * 1024
    if not handle or not api.SetInformationJobObject(handle, 9, ctypes.byref(limits), ctypes.sizeof(limits)) or not api.AssignProcessToJobObject(handle, w.HANDLE(int(process._handle))):
        if handle:
            api.CloseHandle(handle)
        raise OSError("无法建立任务进程资源限制，未运行分析。")
    return lambda: api.CloseHandle(handle)


def run_worker(folder, operation, options, stopped, timeout=90):
    environment = {k: v for k, v in os.environ.items() if k.upper() in {"SYSTEMROOT", "WINDIR", "PATH", "TEMP", "TMP"}}
    environment.update(PYTHONUTF8="1", PYTHONIOENCODING="utf-8", OPENBLAS_NUM_THREADS="1", OMP_NUM_THREADS="1")
    # Output goes to a disposable file so pipes cannot deadlock on a large result.
    scratch = folder / ".tmp"
    scratch.mkdir(exist_ok=True)
    out = scratch / "worker-output.json"
    deadline = time.monotonic() + timeout
    with out.open("w+b") as output:
        process = subprocess.Popen([sys.executable, "-m", "backend.assistant_worker", str(folder), operation],
            cwd=ROOT, stdin=subprocess.PIPE, stdout=output, stderr=output, env=environment,
            creationflags=subprocess.CREATE_NO_WINDOW if sys.platform == "win32" else 0)
        close_job = None
        try:
            close_job = memory_job(process)
            process.stdin.write(json.dumps(options).encode())
            process.stdin.close()
            while process.poll() is None:
                if stopped.wait(.1):
                    return {"error": "本轮已停止，任务命令已取消。", "cancelled": True}
                if time.monotonic() > deadline:
                    return {"error": "任务命令达到 90 秒运行上限，已终止；请缩短实验或拆分参数组。", "exit_code": 124}
                if output.tell() > 8 * 1024 * 1024 or out.stat().st_size > 8 * 1024 * 1024:
                    return {"error": "命令输出过大，已终止。", "exit_code": 1}
            output.seek(0)
            raw = output.read(8 * 1024 * 1024).decode("utf-8", errors="replace")
            if process.returncode:
                return {"error": "任务命令未正常完成（可能超过内存限制）。", "exit_code": process.returncode}
            try:
                return json.loads(raw.strip().splitlines()[-1])
            except (ValueError, IndexError):
                return {"error": "命令未返回有效结果。", "stderr": raw[-4000:], "exit_code": 1}
        finally:
            if process.poll() is None:
                process.kill()
            process.wait()
            if close_job:
                close_job()
