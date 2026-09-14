from __future__ import annotations

from pathlib import Path
from typing import Any

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field

from .task_io import TaskValidationError, load_task, list_tasks, save_run_result
from .simulator import SimulationError, prepare_browser_model, run_mujoco_task


ROOT = Path(__file__).resolve().parents[1]
APP_DIR = ROOT / "app"
TASKS_DIR = ROOT / "tasks"


class SimulationRequest(BaseModel):
    parameters: dict[str, Any] = Field(default_factory=dict)
    controls: dict[str, float] = Field(default_factory=dict)
    duration: float | None = None
    timestep: float | None = None


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
    return {"tasks": list_tasks(TASKS_DIR)}


@app.get("/api/tasks/{task_id}")
def api_get_task(task_id: str) -> dict[str, Any]:
    try:
        return load_task(TASKS_DIR, task_id)
    except TaskValidationError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc


@app.post("/api/tasks/{task_id}/simulate")
def api_simulate(task_id: str, request: SimulationRequest) -> dict[str, Any]:
    try:
        task = load_task(TASKS_DIR, task_id)
        result = run_mujoco_task(
            task,
            request.parameters,
            request.duration,
            request.timestep,
            request.controls,
        )
        run_info = save_run_result(TASKS_DIR, task_id, result)
        result["saved"] = run_info
        return result
    except TaskValidationError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except SimulationError as exc:
        raise HTTPException(status_code=422, detail=str(exc)) from exc


@app.post("/api/tasks/{task_id}/browser-model")
def api_browser_model(task_id: str, request: SimulationRequest) -> dict[str, Any]:
    try:
        task = load_task(TASKS_DIR, task_id)
        return prepare_browser_model(task, request.parameters, request.timestep)
    except TaskValidationError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except SimulationError as exc:
        raise HTTPException(status_code=422, detail=str(exc)) from exc


app.mount("/static", StaticFiles(directory=APP_DIR), name="static")


@app.get("/")
def index() -> FileResponse:
    return FileResponse(APP_DIR / "index.html")
