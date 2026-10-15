from __future__ import annotations

from pathlib import Path
from typing import Any
import threading
import time
import re

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, Response
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field

from .task_io import TaskValidationError, load_task, list_tasks, save_run_result, rename_task
from .simulator import SimulationError, prepare_browser_model, run_mujoco_task
from .preview import preview_choices, prepare_preview, pack_preview


ROOT = Path(__file__).resolve().parents[1]
APP_DIR = ROOT / "app"
TASKS_DIR = ROOT / "tasks"


class SimulationRequest(BaseModel):
    parameters: dict[str, Any] = Field(default_factory=dict)
    controls: dict[str, float] = Field(default_factory=dict)
    duration: float | None = None
    timestep: float | None = None
    run_token: str | None = Field(default=None, pattern=r"^[a-zA-Z0-9_-]{1,80}$")


class TitleRequest(BaseModel):
    title: str = Field(min_length=1, max_length=80)


class PreviewRequest(BaseModel):
    xml: str | None = Field(default=None, max_length=16 * 1024 * 1024)
    filename: str = Field(default="", max_length=255)
    model_id: str | None = Field(default=None, max_length=128)
    entry: str | None = Field(default=None, max_length=255)


RUNS: dict[str, dict[str, Any]] = {}
CANCELLED_TOKENS: dict[str, float] = {}
RUN_LOCK = threading.Lock()
COMPUTE_SLOTS = threading.BoundedSemaphore(2)


app = FastAPI(title="VMAIL Local Workbench")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:8000", "http://localhost:8000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/api/tasks")
def api_list_tasks() -> dict[str, Any]:
    try:
        return {"tasks": list_tasks(TASKS_DIR)}
    except TaskValidationError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc


@app.get("/api/preview-models")
def api_preview_models():
    return {"models": preview_choices()}


@app.post("/api/preview-model")
def api_preview_model(request: PreviewRequest, binary: bool = False):
    try:
        payload = prepare_preview(request.xml, request.filename, request.model_id, request.entry, binary_assets=binary)
        if binary:
            return Response(pack_preview(payload), media_type="application/octet-stream", headers={"Cache-Control": "no-store"})
        return payload
    except (SimulationError, OSError, ValueError) as exc:
        raise HTTPException(status_code=422, detail=str(exc)) from exc


@app.patch("/api/tasks/{task_id}/title")
def api_rename_task(task_id: str, request: TitleRequest) -> dict[str, str]:
    try:
        return rename_task(TASKS_DIR, task_id, request.title)
    except TaskValidationError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc


@app.get("/api/runs/{token}")
def api_run_progress(token: str) -> dict[str, Any]:
    with RUN_LOCK:
        run = RUNS.get(token)
        if not run:
            raise HTTPException(status_code=404, detail="计算尚未开始或已过期。")
        return {"progress": run["progress"], "done": run["done"]}


@app.post("/api/runs/{token}/cancel")
def api_cancel_run(token: str) -> dict[str, bool]:
    if not re.fullmatch(r"[a-zA-Z0-9_-]{1,80}", token):
        raise HTTPException(status_code=400, detail="无效计算编号。")
    with RUN_LOCK:
        run = RUNS.get(token)
        if run:
            run["cancel"].set()
        else:
            for old in list(CANCELLED_TOKENS):
                if time.monotonic() - CANCELLED_TOKENS[old] > 300:
                    del CANCELLED_TOKENS[old]
            if len(CANCELLED_TOKENS) >= 100:
                raise HTTPException(status_code=429, detail="取消请求过多。")
            CANCELLED_TOKENS[token] = time.monotonic()
    return {"cancelled": True}


@app.get("/api/tasks/{task_id}/results")
def api_results(task_id: str) -> dict[str, Any]:
    try:
        task = load_task(TASKS_DIR, task_id)
    except TaskValidationError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    folder = Path(task["path"]) / "results"
    return {"runs": [{"run_id": p.name, "download": f"/api/tasks/{task_id}/results/{p.name}/data.csv"}
                     for p in sorted(folder.glob("run_*"), reverse=True)[:30] if (p / "data.csv").is_file()]}


@app.get("/api/tasks/{task_id}/results/{run_id}/data.csv")
def api_download_result(task_id: str, run_id: str) -> FileResponse:
    if not re.fullmatch(r"run_[0-9a-f_]+", run_id):
        raise HTTPException(status_code=400, detail="无效的结果目录。")
    try:
        task = load_task(TASKS_DIR, task_id)
    except TaskValidationError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    path = Path(task["path"]) / "results" / run_id / "data.csv"
    if not path.is_file():
        raise HTTPException(status_code=404, detail="结果不存在。")
    return FileResponse(path, filename=f"{task_id}_{run_id}.csv", media_type="text/csv")


@app.get("/api/tasks/{task_id}")
def api_get_task(task_id: str) -> dict[str, Any]:
    try:
        return load_task(TASKS_DIR, task_id)
    except TaskValidationError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc


@app.post("/api/tasks/{task_id}/simulate")
def api_simulate(task_id: str, request: SimulationRequest) -> dict[str, Any]:
    if not COMPUTE_SLOTS.acquire(blocking=False):
        raise HTTPException(status_code=429, detail="正在进行其他计算，请稍后重试。")
    run = {"cancel": threading.Event(), "progress": 0.0, "done": False, "created": time.monotonic()}
    token = request.run_token
    try:
        if token:
            with RUN_LOCK:
                for old in list(RUNS):
                    if RUNS[old]["done"] and time.monotonic() - RUNS[old]["created"] > 300:
                        del RUNS[old]
                if token in RUNS:
                    raise HTTPException(status_code=409, detail="计算编号已使用。")
                RUNS[token] = run
                if token in CANCELLED_TOKENS:
                    del CANCELLED_TOKENS[token]
                    run["cancel"].set()
        task = load_task(TASKS_DIR, task_id)
        result = run_mujoco_task(
            task,
            request.parameters,
            request.duration,
            request.timestep,
            request.controls,
            run["cancel"],
            lambda value: run.update(progress=value),
        )
        if run["cancel"].is_set():
            raise SimulationError("计算已取消，未保存结果。")
        run_info = save_run_result(TASKS_DIR, task_id, result)
        result["saved"] = run_info
        return result
    except TaskValidationError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except SimulationError as exc:
        raise HTTPException(status_code=422, detail=str(exc)) from exc
    except OSError as exc:
        raise HTTPException(status_code=500, detail=f"结果保存失败，请检查目录写入权限：{exc}") from exc
    finally:
        run["done"] = True
        COMPUTE_SLOTS.release()


@app.post("/api/tasks/{task_id}/browser-model")
def api_browser_model(task_id: str, request: SimulationRequest) -> dict[str, Any]:
    try:
        task = load_task(TASKS_DIR, task_id)
        return prepare_browser_model(task, request.parameters, request.timestep, request.duration)
    except TaskValidationError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except SimulationError as exc:
        raise HTTPException(status_code=422, detail=str(exc)) from exc


app.mount("/static", StaticFiles(directory=APP_DIR), name="static")


@app.get("/")
def index() -> FileResponse:
    return FileResponse(APP_DIR / "index.html", headers={"Cache-Control": "no-store"})
