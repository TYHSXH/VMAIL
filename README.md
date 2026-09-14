# VMAIL 理论力学实验台

[简体中文](README.md) | [English](README_EN.md)

VMAIL 是一个在学生电脑本地运行的可交互 MuJoCo 实验台。学生可以让 AI coding 工具在 `tasks/` 中创建学习任务，然后在网页里加载模型、修改参数、拖动物体、调整关节与执行器、观察运动数据，并进行批量计算和保存。

浏览器使用官方 `@mujoco/mujoco` WebAssembly 运行物理仿真，Three.js/WebGL 显示三维场景。Python 后端负责读取任务、验证配置，以及执行需要保存完整数据的批量实验。

## 学生首次使用

### 方式一：一键配置和启动（推荐）

1. 安装 64 位 Python 3.11 或更新版本。安装时勾选“Add Python to PATH”。
2. 解压整个 VMAIL 文件夹，保持内部目录结构不变。
3. 保持联网，双击 `start.bat`。
4. 第一次运行时，脚本会自动创建项目专用的 `.venv`，并安装 `requirements.txt` 中的 FastAPI、Python MuJoCo 等依赖。
5. 安装完成后服务会在 `http://127.0.0.1:8000` 启动。以后再次双击 `start.bat` 不会重复安装，除非依赖缺失。

也可以先双击 `setup.bat` 只完成环境配置，再双击 `start.bat` 启动。

网页所需的 MuJoCo WASM 和前端代码已经构建在 `app/` 中，学生不需要安装 Node.js，也不需要单独安装网页版 MuJoCo。

### 方式二：使用已有 Conda 环境

在 Anaconda Prompt 中进入项目目录，激活希望使用的环境，然后执行：

```powershell
python -m pip install -r requirements.txt
.\start-current-python.bat
```

这种方式不会使用项目的 `.venv`。Conda 环境中必须能导入 `fastapi`、`uvicorn`、`yaml`、`numpy` 和 `mujoco`。

## 常见问题

- 首次安装失败：检查网络，关闭脚本窗口后重新运行 `setup.bat`。
- 提示找不到 Python：重新安装 Python，并勾选加入 PATH；也可以使用已配置好的 Conda 环境。
- 网页打不开：确认启动窗口没有报错，并访问 `http://127.0.0.1:8000`。
- 页面没有新任务：确认任务已经加入 `tasks/manifest.yaml`，然后点击网页左侧“刷新学习任务”。
- 修改了前端源码：教师或开发者需运行 `npm install` 和 `npm run build`；普通学生不需要。

## 学习任务工作流

1. 学生向 AI coding 描述真实对象、研究变量和希望观察的结果。
2. AI 阅读 `tasks/AGENTS.md` 和 `docs/task-package-spec.md`。
3. AI 在 `tasks/<task_id>/` 中创建或修改任务，并登记到 `tasks/manifest.yaml`。
4. AI 运行任务校验。
5. 学生在网页中刷新任务，修改参数并开展实验。
6. 任务要求变化时，学生回到 AI coding 更新同一个任务文件夹，再在网页中重新加载。

`tasks/manifest.yaml` 是全部任务共用的“目录索引”，因此必须位于 `tasks/` 根目录，而不是任何一个示例任务中。示例任务自己的内容位于 `tasks/example_mass_spring/`。

## 实验台操作

- 三维视窗：旋转、平移、缩放、选择并施加拖拽力。
- 仿真：任务载入后保持静止，点击开始才运行；支持暂停、继续、单步、重置、显示接触点和复位视角。
- 参数页：修改质量、刚度、阻尼、初始状态或 AI 暴露的其他 MJCF 参数；应用后重新编译模型。
- 控制页：直接设置一维滑动/转动关节位置；对模型中的 actuator 实时写入 MuJoCo `ctrl`。
- 数据页：查看实时观测曲线；“导出当前数据”会下载当前曲线缓存的 CSV；“计算并保存”会从初始状态重新运行 Python 批量实验，并继承当前 actuator 控制值。
- 点观测：任务可通过具名 MuJoCo `site` 记录刚体固定点的位置、速度和加速度，网页与 Python 结果采用同一字段和 SI 单位。
- 布局：桌面端可拖动左右侧栏边缘调整宽度，设置会保存在当前浏览器中。

“仿真时长”同时控制网页实时仿真和 Python 批量实验；网页到达设定时长后会自动暂停。“时间步长”会在应用参数重载模型时作用于两种计算。实时值、曲线图例和导出 CSV 均标明单位。

## 项目结构

```text
app/                    已构建的网页和 MuJoCo WASM
frontend/               网页源代码
backend/                本地 API 与 Python 批量仿真
docs/                   工作流和任务包规范
prompts/                可交给 AI coding 的提示词
tasks/
  AGENTS.md              AI 创建任务时必须遵守的规则
  manifest.yaml          全部学习任务的全局索引
  <task_id>/             每个学习任务的独立文件夹
setup.bat                首次环境配置
start.bat                自动检查环境并启动
start-current-python.bat 使用当前 Python/Conda 环境启动
```

## 教师与开发者命令

验证全部任务：

```powershell
.\.venv\Scripts\python.exe -m backend.validate_task
```

验证单个任务：

```powershell
.\.venv\Scripts\python.exe -m backend.validate_task example_mass_spring
```

修改 `frontend/` 后重新构建：

```powershell
npm install
npm run build
```

详细任务格式见 [docs/task-package-spec.md](docs/task-package-spec.md)，学生与 AI 的推荐对话起点见 [prompts/student-task-builder.md](prompts/student-task-builder.md)。
