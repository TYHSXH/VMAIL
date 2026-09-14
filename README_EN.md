# VMAIL Theoretical Mechanics Workbench

[简体中文](README.md) | [English](README_EN.md)

VMAIL is an interactive local MuJoCo workbench for students studying theoretical mechanics. Students can use an AI coding assistant to create learning tasks under `tasks/`, then load a model in the browser, change parameters, drag bodies, control joints and actuators, inspect motion data, and run saved batch simulations.

The browser runs physics through the official `@mujoco/mujoco` WebAssembly package and renders the 3D scene with Three.js/WebGL. The Python backend loads and validates task packages and runs batch experiments that save complete datasets.

## First-Time Setup

### Option 1: One-click setup and launch (recommended)

1. Install 64-bit Python 3.11 or newer. Select "Add Python to PATH" during installation.
2. Extract the complete VMAIL folder without changing its internal structure.
3. Stay connected to the internet and double-click `start.bat`.
4. On the first run, the script creates a project-specific `.venv` and installs FastAPI, Python MuJoCo, and the other packages in `requirements.txt`.
5. After setup, VMAIL starts at `http://127.0.0.1:8000`. Later launches reuse the existing environment unless a dependency is missing.

You may also double-click `setup.bat` to configure the environment first, and then use `start.bat` to launch VMAIL.

The compiled frontend and MuJoCo WASM runtime are included in `app/`. Students do not need Node.js or a separate browser-version MuJoCo installation.

### Option 2: Use an existing Conda environment

Open Anaconda Prompt, enter the project directory, activate the desired environment, and run:

```powershell
python -m pip install -r requirements.txt
.\start-current-python.bat
```

This option does not use the project's `.venv`. The active Conda environment must be able to import `fastapi`, `uvicorn`, `yaml`, `numpy`, and `mujoco`.

## Troubleshooting

- First-time installation fails: check the network connection, close the script window, and run `setup.bat` again.
- Python cannot be found: reinstall Python with "Add Python to PATH" enabled, or use a configured Conda environment.
- The page does not open: check the startup window for errors and visit `http://127.0.0.1:8000`.
- A new task is missing: make sure it is registered in `tasks/manifest.yaml`, then click "Refresh learning tasks" in the left sidebar.
- Frontend source was changed: teachers or developers must run `npm install` and `npm run build`; regular students do not need to do this.

## Learning Task Workflow

1. The student describes the real object, variables to investigate, and desired observations to an AI coding assistant.
2. The AI reads `tasks/AGENTS.md` and `docs/task-package-spec.md`.
3. The AI creates or updates `tasks/<task_id>/` and registers it in `tasks/manifest.yaml`.
4. The AI runs the task validator.
5. The student refreshes the task list in the browser, changes parameters, and performs the experiment.
6. When requirements change, the student asks the AI to update the same task folder and reloads it in the workbench.

`tasks/manifest.yaml` is the shared index for all tasks, so it belongs at the root of `tasks/`, not inside an individual task folder. The example task itself is stored in `tasks/example_mass_spring/`.

## Workbench Controls

- 3D viewport: orbit, pan, zoom, select bodies, and apply drag forces.
- Simulation: a loaded task remains still until Start is pressed; pause, resume, step, reset, contact display, and camera reset are supported.
- Parameters: edit mass, stiffness, damping, initial state, and other MJCF values exposed by the task; applying changes recompiles the model.
- Controls: directly position one-dimensional slide/hinge joints and write runtime inputs to MuJoCo actuator `ctrl` values.
- Data: inspect live curves; **Export current data** downloads the current browser curve buffer as CSV; **Compute and save** reruns a Python batch experiment from the initial state using the current actuator control values.
- Point observations: a task can use a named MuJoCo `site` to record the position, velocity, and acceleration of a body-fixed point with matching browser/Python fields and SI units.
- Layout: on desktop, drag either sidebar edge to resize it; widths are saved in the current browser.

"Simulation duration" controls both the browser simulation and the Python batch experiment. The browser pauses automatically when it reaches that duration. "Timestep" applies to both calculations after the model is reloaded. Live values, chart legends, and exported CSV headers include units.

## Project Structure

```text
app/                    Built web interface and MuJoCo WASM
frontend/               Web interface source
backend/                Local API and Python batch simulation
docs/                   Workflow and task package documentation
prompts/                Prompts for AI coding assistants
tasks/
  AGENTS.md              Rules AI must follow when creating tasks
  manifest.yaml          Shared index of all learning tasks
  <task_id>/             One independent folder per task
setup.bat                First-time environment setup
start.bat                Automatic environment check and launch
start-current-python.bat Launch with the active Python/Conda environment
```

## Teacher and Developer Commands

Validate all tasks:

```powershell
.\.venv\Scripts\python.exe -m backend.validate_task
```

Validate one task:

```powershell
.\.venv\Scripts\python.exe -m backend.validate_task example_mass_spring
```

Rebuild the frontend after changing `frontend/`:

```powershell
npm install
npm run build
```

See [docs/task-package-spec.md](docs/task-package-spec.md) for the complete task format and [prompts/student-task-builder.md](prompts/student-task-builder.md) for a recommended starting prompt.
