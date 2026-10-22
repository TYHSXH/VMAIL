# VMAIL-BUAA Theoretical Mechanics Virtual Simulation Platform

[简体中文](README.md) | [English](README_EN.md)

VMAIL is a local virtual simulation workbench for theoretical mechanics courses. Students can turn textbook problems or real mechanisms into MuJoCo models, adjust parameters and initial poses, observe motion, forces, and data curves, and export experimental results. AI can help analyze problems and create or modify tasks; students still need to check the modeling assumptions and mechanical conclusions themselves.

The browser runs real-time simulations with MuJoCo WASM. A local Python backend manages task files, AI connections, and batch calculations. Models and experimental data stay on your computer. When you use DeepSeek, the conversation, images, and relevant task text included in a request are sent to DeepSeek for processing.

## 1. Installation and startup (Windows)

Recommended setup: **Windows x64, 64-bit x86 Python 3.12, and an up-to-date Edge or Chrome browser** with JavaScript, WebAssembly, and WebGL enabled. The launch scripts require Python 3.12 or newer; release verification uses Python 3.12. 32-bit Python and Windows ARM Python are not supported. Install Python and select the option to add it to PATH. The first setup requires internet access to download Python dependencies. Students do not need Node.js or a separate MuJoCo installation.

If you have Git, run the following in a directory where you have read and write access:

```powershell
git clone https://github.com/TYHSXH/VMAIL.git
cd VMAIL
.\start.bat
```

Alternatively, choose **Code → Download ZIP** in the [GitHub repository](https://github.com/TYHSXH/VMAIL), extract the entire archive, and double-click `start.bat`. Do not run it inside the archive or download only an individual HTML or XML file.

The launcher creates a local `.venv`, installs pinned dependencies, runs environment checks, and opens the [local workbench](http://127.0.0.1:8000). Keep the server window open; press **Ctrl+C** there when finished. Use `start.bat` for subsequent sessions. A healthy environment does not need to be installed again. The server listens only on the local computer by default and is intended for individual student use.

If you already use Conda, you can use your own Python 3.12 environment:

```powershell
conda activate your_environment_name
python -m pip install -r requirements.txt
.\start-current-python.bat
```

This method uses the active Python environment rather than the project's `.venv`. See the [student user guide](docs/user-guide.md) and [migration checklist](docs/migration-check.md) for more detailed installation and migration instructions.

## 2. Your first experiment

The interface currently uses Chinese labels; the labels below help you locate each control.

1. Select **弹簧阻尼滑块示例** (spring–damper slider example) in the left sidebar. Read the problem, assumptions, and instructions in **任务** (Task).
2. In **参数与控制** (Parameters and controls), adjust the mass, stiffness, damping, or initial conditions, then click **应用参数** (Apply parameters).
3. Click **开始仿真** (Start simulation) and inspect the curves in **数据** (Data). The simulation pauses automatically at the specified duration. Use **重置** (Reset) to restore the task's initial state.
4. Rotate with the left mouse button, pan with Shift + left mouse button, and zoom with the scroll wheel. **复位视角** restores the task's default view. **拖动** (Drag) adjusts the starting pose; time and data recording stop while dragging.
5. After the browser simulation finishes, click **导出本次实验** (Export this experiment) and choose **导出网页数据 CSV** (Export browser data CSV) or **后台重算并下载 CSV** (Recompute locally and download CSV). **后台重算** (Native replay) is also a shortcut. Native results are saved under `tasks/<task_id>/results/run_*/` and can be downloaded again from **已保存的实验** (Saved experiments).

Native replay inherits the parameters, duration, timestep, joint positions, actual pose after dragging, velocities, and internal state **at the start of that browser experiment**, and replays actuator changes at their recorded physics steps. It does not start from the final pose or replace the recorded settings with edits made just before export. Dragging prepares the initial pose; mouse movement during preparation is outside experiment time. Dragging again, or changing model parameters, duration, timestep, or joint pose, requires another complete browser run before export.

### How do browser and native calculations differ?

| Comparison | Browser calculation / export | Native replay (previously “batch calculation”) |
| --- | --- | --- |
| Engine | MuJoCo WebAssembly in the browser, with animation and charts | Native MuJoCo called through Python, without depending on animation refresh |
| Purpose | Interactive observation; export saves the recorded data without recalculation | Recompute under the same experimental conditions and save results and conditions |
| Conditions and samples | Records the actual starting state and control changes | Inherits the same record and outputs at browser sample times for comparison |
| Accuracy | Depends on the model, timestep, and solver settings | **Not inherently more accurate because it runs in the backend**; the same version and conditions should agree within numerical tolerance |

Both engines currently use MuJoCo 3.13.0. Browser frame rate affects visual smoothness and elapsed wall-clock time, not the configured physics timestep. Native replay checks the model and load revision and compares both datasets. Contacts, impacts, and sensitive systems can amplify floating-point differences between platforms; bitwise equality is not guaranteed. To improve numerical accuracy, choose a suitable smaller timestep or revise the model/solver settings, complete a new browser experiment, then replay those new conditions. See the [browser calculation, native replay, and export guide](docs/simulation-export.md).

One replay uses one completed experiment; automated parameter sweeps still require a separate script. The edit button beside a task name renames it; the trash button deletes the task and its results. Back up anything you need before deleting it.

Use **模型预览** (Model preview) in the top bar to browse the included model library or preview a single XML file. A complete task package is needed for task instructions, parameter settings, and chart configuration. **帮助** (Help) opens the user manual and AI prompts.

## 3. AI assistance: use the DeepSeek API inside VMAIL

1. Create your own API key on the [DeepSeek Platform](https://platform.deepseek.com/api_keys).
2. Open **AI 创建任务** (Create task with AI) or **AI 助手** (AI assistant). Expand **连接设置** (Connection settings), enter the key, select a model, click **保存连接** (Save connection), and then **测试连接** (Test connection). Enter an API key here, not your account password.
3. Describe the mechanism, known dimensions, masses, joints, loads, and quantities you want to vary and observe. You can attach problem images or sketches. Select **DeepSeek Flash** for image understanding; consult the [official DeepSeek documentation](https://api-docs.deepseek.com/) for current service capabilities.
4. Once you explicitly request a task, the assistant generates files and the system validates and test-runs them. If validation succeeds, VMAIL saves them to the task directory and refreshes the task list. If it fails, continue the conversation with the reported errors so the assistant can revise the task.
5. To modify an existing task, select it in the left sidebar first, then ask to fix it or add an observation. You can also specify its task ID explicitly. The assistant updates that task and backs up the original files.

For example:

```text
Create a simple pendulum learning task with length 1 m and mass 1 kg.
Ignore drag, make the initial angle adjustable, and observe the angle and
angular velocity. Explain how to compare the results with the small-angle
period formula. Clarify any ambiguous conditions first, and retain the
default floor with the gray logo.
```

Conversation text, images, and drafts are saved automatically in `.local/assistant-history.sqlite3` inside the project. They can be restored after a page refresh or server restart. Switch conversations using **历史对话** (Conversation history). **新对话** (New conversation) preserves previous records. **删除此对话** (Delete this conversation) deletes only that conversation, not tasks already created. Save failures are reported; wait for **已保存到本机** (Saved locally) before closing the page. Interrupted responses are marked incomplete and are not automatically resent or used to save task changes as though they had completed. After restoring an old conversation, the target task is still determined by the current sidebar selection or the task ID you explicitly specify.

By default, the API key stays only in the current server process. The remember-key option encrypts it for the current Windows user. Conversation records themselves are plaintext local files. On shared computers, delete your conversations and disconnect your key when finished. Git ignores `.local/`; **do not include it in archives, upload it, or send it to others**. API usage is billed under the provider's rules. Stopping a request does not necessarily prevent charges for requests already sent.

The browser assistant creates tasks using primitive geometry and standard `loads.yaml` loads. It cannot generate or upload STL files, install plugins, or execute arbitrary Python scripts. Use the editor workflow below for complex parts.

## 4. AI assistance: use a DeepSeek extension and your API key in VS Code

A local editor is suitable for complex models, MJCF spread across multiple files, STL assets, and experiment scripts. Use **Open Folder** in VS Code to open the entire **VMAIL** project so the AI can read `tasks/AGENTS.md` and the task specification.

DeepSeek provides an official [VS Code / Copilot integration guide](https://api-docs.deepseek.com/quick_start/agent_integrations/github_copilot/) linking to the [DeepSeek V4 for Copilot extension](https://github.com/Vizards/deepseek-v4-for-copilot). Follow that guide to install the required VS Code version, configure your Copilot account or plan, and install the extension. Then:

1. Press **Ctrl+Shift+P** to open the Command Palette, run **DeepSeek: Set API Key**, and enter your own DeepSeek key.
2. Open Copilot Chat and select DeepSeek in the model picker. To let the AI edit local files, use the extension's supported Agent mode and review its changes.
3. Provide the prompt below together with your modeling information. After the files are created, validate the task in the terminal, return to VMAIL, and refresh the task list.

For other DeepSeek coding extensions that support an OpenAI-compatible interface, follow the extension's documentation to configure the provider, API key, Base URL `https://api.deepseek.com` (some extensions require `/v1`), and model name `deepseek-flash` or `deepseek-v4-pro`. Consult the extension's instructions and the [DeepSeek API documentation](https://api-docs.deepseek.com/). Check the extension's publisher and permissions. Do not put your key in XML, prompts, or the Git repository. Editor and browser API settings are independent and do not synchronize automatically.

```text
First read tasks/AGENTS.md and docs/task-package-spec.md.
If the task involves complex geometry, also read docs/mesh-modeling.md.
Create an independent task under tasks/ without modifying the shared
frontend or backend.
My research object is ...; the known conditions are ...;
I want to vary ... and observe ... .
Explain the simplifying assumptions and units, reuse the default floor
with the gray logo, complete the task configuration, register the task
in tasks/manifest.yaml, and validate it with backend.validate_task.
```

```powershell
.\.venv\Scripts\python.exe -m backend.validate_task your_task_id
```

See the [AI task creation guide](prompts/student-task-builder.md) for complete prompts. Getting AI-generated files to run is only the first step: verify them against theory, dimensional consistency, initial conditions, and limiting cases.

## 5. Complex geometry: students create STL models, AI helps write MJCF

Primitive shapes such as boxes, spheres, and cylinders suit many idealized problems. When holes, grooves, irregular profiles, or contact locations determine the mechanical result, primitive geometry may not represent the problem accurately. Do not change the problem's constraints or contact relationships merely to produce an animation.

Students can model parts to their specified dimensions in CAD, export **binary STL**, and place the files in the task's own `assets/` folder. AI can then help write the bodies, joints, inertia, collision geometry, and observation sites in MJCF. STL describes shape only; it does not contain mass, hinges, or control laws. Ordinary MuJoCo mesh collisions use the convex hull, so holes and grooves usually require decomposition into multiple convex collision shapes. A visible hole does not guarantee that another object can pass through it.

The [complex geometry and STL/MJCF guide](docs/mesh-modeling.md) provides steps, a reusable MJCF fragment, unit conversions, and troubleshooting. You can also copy a complete model and its assets from the [model library](model_library/README.md), subject to its license, and retain the original license when adapting it.

## 6. Official MuJoCo learning resources

| Learning goal | Official resource |
| --- | --- |
| Learn about MuJoCo, downloads, and project news | [MuJoCo website](https://mujoco.org/) · [Official GitHub repository](https://github.com/google-deepmind/mujoco) |
| Understand basic concepts and model structure | [Overview](https://mujoco.readthedocs.io/en/stable/overview.html) |
| Learn to create MJCF, bodies, and joints | [Modeling guide](https://mujoco.readthedocs.io/en/stable/modeling.html) |
| Look up XML elements, meshes, inertia, and constraints | [MJCF XML Reference](https://mujoco.readthedocs.io/en/stable/XMLreference.html) |
| Write local experiments and batch scripts | [Python interface](https://mujoco.readthedocs.io/en/stable/python.html) |
| Study complete robot models | [MuJoCo Menagerie](https://github.com/google-deepmind/mujoco_menagerie) |

Start with `body → joint → geom`, coordinate frames, SI units, mass, and inertia, then move on to actuators, contacts, and constraints. This project pins **MuJoCo 3.13.0**. The online stable documentation changes over time; check that a new feature is supported by this version before using it.

## 7. Troubleshooting and keeping your data

| Symptom | What to do |
| --- | --- |
| Python is not found, or no matching dependency package is available | Install Windows x64 Python 3.12, add it to PATH, rerun `setup.bat`, and read the original error in the setup window. |
| The browser does not open automatically | Keep the server window open and visit `http://127.0.0.1:8000` manually. Do not open `app/index.html` directly. |
| Port 8000 is occupied | Check whether VMAIL is already running. Alternatively, set `$env:VMAIL_PORT="8001"` in PowerShell, then run `.\start.bat`. |
| The model area is blank or the physics engine fails to start | Read the page error, use an up-to-date Edge or Chrome with hardware acceleration enabled, and check that `app/` was fully extracted, including `.wasm`, fonts, and images. |
| The API cannot connect | Check the key, account balance, network, and access to the selected model. Use **测试连接** (Test connection). Do not include keys or `.local/` in a bug report. |
| An STL is visible but collisions are wrong | Check convex hulls, units, coordinate frames, and inertia. Decompose collision geometry as described in the [mesh guide](docs/mesh-modeling.md). |
| A new task does not appear or fails validation | Check the six required files and `tasks/manifest.yaml`, run task validation, and refresh the list. |
| The interface still looks like an older version after an update | Stop the old server, start the complete updated release, and force-refresh the browser. Developers must rebuild `app/` after changing the frontend. |

After the first installation, existing tasks, simulation, charts, and exports can be used offline. API conversations require internet access. When moving to another computer, copy the complete project but exclude `.venv`, `.venv.backup-*`, `node_modules`, caches, and `.local/`. Install dependencies again on the new computer. Back up your own tasks and experimental results under `tasks/`.

To uninstall, stop the server and run `uninstall.bat` to remove the `.venv` created by the installer. Tasks, results, and `.local/` are preserved. To remove personal data, first delete your conversations through the history list and disconnect your key, then delete the project directory yourself if needed. Manage Conda environments separately.

## 8. Further reading and maintenance

The supporting guides below are currently maintained in Chinese.

- [Student user guide](docs/user-guide.md): detailed operation and troubleshooting.
- [Task workflow](docs/workflow.md) · [Task directory rules](tasks/AGENTS.md): turn a real problem into a learning task.
- [Task package specification](docs/task-package-spec.md) · [Loads and controls](docs/load-controls.md): configuration fields and standard loads.
- [Development and maintenance](docs/development.md) · [Release verification](docs/release-check.md): builds, tests, installation, and distribution checks.

The repository includes the ready-to-run `app/` build. Only developers need Node.js; use `npm ci`, `npm test`, and `npm run build`. Python dependencies are pinned through `requirements.txt` and `constraints.txt`. Keep all student runtime files, copyright notices, and model licenses in the distributed release.

## Copyright and third-party resources

© 2026 **BUAA Department 5, Theoretical Mechanics Course Group (BUAA 5系 理论力学课程组)**. Original VMAIL platform code, original course documentation, and logos retain the course group's copyright notice. Without separate permission, do not use course logos to impersonate the course group or imply official endorsement. Public hosting on GitHub does not grant an open-source license for all original material. See [COPYRIGHT.md](COPYRIGHT.md) for the authorization statement, and contact the course group to confirm permission for further use.

MuJoCo, Three.js, KaTeX, Marked, DOMPurify, and their resources belong to their respective rights holders and are provided under their own licenses. See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) and [licenses/](licenses/). Each model library group retains its original authors, pinned sources, and license in `SOURCE.md` and `LICENSE`; this project's copyright notice does not change those terms. For CAD/STL files, problem images, textbook content, and other materials added by students, confirm permission to use and redistribute them and retain their sources. Educational simulation results require mechanical verification and do not constitute engineering safety certification.
