# VMAIL 开发与维护

面向维护公共前后端的开发者。学生操作见[系统使用手册](user-guide.md)，AI 创建任务先阅读 [tasks/AGENTS.md](../tasks/AGENTS.md)。

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

详细任务格式见 [docs/task-package-spec.md](task-package-spec.md)，学生与 AI 的推荐对话起点见 [prompts/student-task-builder.md](../prompts/student-task-builder.md)。

## 回归检查

在项目根目录运行：

```powershell
.\.venv\Scripts\python.exe -m unittest discover -s tests
node --test tests/*.test.mjs
npm run build
```

`tests/test_*.py` 检查任务、载荷、资源与批量计算；`tests/*.test.mjs` 检查浏览器状态、物理与渲染适配。`tests/export_load_cases.py` 由 renderer 测试调用，生成 Python / WASM 一致性参考数据，必须保留。

`app/` 是供启动脚本直接使用的构建产物，修改前端后需要重新构建。帮助阅读页由 `frontend/help.html` 与 `frontend/help.js` 构建，后端 `/help` 打开阅读页，`/api/help-documents` 仅提供学生使用手册及 AI 使用与提示词两篇文档。任务说明、规范、开发资料和模型来源不加入学生帮助。前端统一渲染，并按每篇文件的目录解析相对 Markdown 链接，在页内跳转；外部链接保留。`/docs/` 继续提供原始文件。正文每次打开时读取，无需重新构建。

## 文档与运行文件

文档入口见 [docs/README.md](README.md)。新增功能时同步更新用户手册或对应技术规范，避免在多个 README 中重复维护操作步骤。任务的 notes.md、README.md 和资源库的 SOURCE.md 属于任务说明与来源记录，保留在所属目录。

`MUJOCO_LOG.TXT`、`*.log`、`__pycache__/`、`.pytest_cache/` 是运行日志或缓存，不作为交付内容。`tasks/*/results/` 是实验结果，不按日志清理。`model_library/resource_limit_audit.json` 是模型资源审计数据，应保留。

## 迁移安装

检查步骤见[迁移测试说明](migration-check.md)。`setup.bat` 优先探测 64 位 Python 3.12 / 3.11 / 3.13，然后尝试默认 Python；版本、架构不匹配或无法创建虚拟环境的解释器会跳过。`backend.bootstrap` 使用标准库创建 `.venv`，通过该解释器的 `python -m pip` 安装二进制依赖，不依赖原电脑的 pip.exe 路径，不要求本机编译工具。

迁移或失效的环境会先改名为 `.venv.backup-*`，再创建本机环境；不删除旧环境。安装完成记录项目位置。`backend.check_environment` 检查 Python 架构、构建页面与资源、必要文档、写入权限、依赖和一次原生 MuJoCo 计算。只有检查通过才报告安装成功。

自动测试可设置 `VMAIL_NO_PAUSE=1` 避免失败时等待按键；`VMAIL_SKIP_BROWSER=1` 只禁用自动打开浏览器，不影响服务。测试时还可用 `VMAIL_PORT` 指定空闲端口，默认仍为 8000。学生正常使用不需要设置这些变量。
