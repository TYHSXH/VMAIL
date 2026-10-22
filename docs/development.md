# VMAIL 开发与维护

面向维护公共前后端的开发者。学生操作见[系统使用手册](user-guide.md)，AI 创建任务先阅读 [tasks/AGENTS.md](../tasks/AGENTS.md)。

## 项目结构

```text
app/                    已构建的网页和 MuJoCo WASM
frontend/               网页源代码
assets/logos/           黑、白、灰三版原始标志（默认地面与模板用灰色）
licenses/               随运行包保留的第三方许可文本
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
npm ci
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

`app/` 是供启动脚本直接使用的构建产物，修改前端后需要重新构建。帮助阅读页由 `frontend/help.html` 与 `frontend/help.js` 构建，后端 `/help` 打开阅读页，`/api/help-documents` 提供学生使用手册、AI 使用与提示词和复杂几何体建模三篇文档。任务说明、规范、开发资料和模型来源不加入学生帮助。前端统一渲染，并按每篇文件的目录解析相对 Markdown 链接，在页内跳转；外部链接保留。`/docs/` 继续提供原始文件。正文每次打开时读取，无需重新构建。

## 本地 DeepSeek 助手

`frontend/assistant.js` 在现有右栏提供连接、流式自由对话和任务文件查看；普通聊天无需创建任务。模型可调用 `create_task` 新建、`read_task` 读取、`update_task` 修改原任务。每轮请求携带网页选中任务编号，后端提供最新文件与内容版本号；读取工具结果会继续交给模型，允许在同一次请求内读取后修改。后端在临时目录中校验并流式回传结果；浏览器收到完整成功消息后分别请求 POST 新建或 PATCH 修改，再刷新列表。工具输出不完整或校验失败时将错误和当前文件保留给下一轮修正，不强制新开对话。修改只提交变动文件，合并当前配置后校验；保留原任务编号、资源及 results。提交时再次核对版本号，使用共享任务状态锁阻止在批量计算期间修改；修改前在 `.local/task-history/<task_id>/` 备份原文件，写入失败时回滚已替换文件。模型没有删除工具。`assistant-client.js` 处理流式协议与近期上下文选择，不以 40 条消息终止聊天；每次最多发送 200 条和受控体积，超过时提示省略早期上下文，页面历史不删。`backend/assistant.py` 仅代理固定 DeepSeek 官方地址，端点要求本机来源与专用请求头。此模块面向单用户 loopback 运行，不能直接作为公网多人服务使用。

密钥默认只存 Python 进程内存；选用记住功能时由 `assistant_credentials.py` 使用 Windows DPAPI 当前用户加密到 `.local/deepseek.key`。接口不会返回原始密钥。`.local/` 不进入版本控制，也不要随项目分发。

`assistant_tasks.py` 只接受六个必需任务文件及可选 loads.yaml、README.md，拒绝路径、脚本、插件、外部资源与 YAML 别名，自动复制官方 logo。草稿在临时目录中由 `assistant_validate.py` 独立子进程完成标准校验和完整默认时长计算，超时 40 秒。学生点击加入后重新校验，使用共享任务写锁、目录重命名及原子索引替换发布，失败回滚新任务，不覆盖已有任务。`validate_task` 的可选 `tasks_dir` 允许使用相同规则验证临时草稿。

对话、图片、输入草稿、任务草稿与校验结果经本机专用 API 存入 `.local/assistant-history.sqlite3`（SQLite 事务，单条对话上限 64 MiB），不保存连接密钥。历史列表可恢复、切换与单独删除对话；删除对话不删除任务。请求中断的轮次保留但标记 incomplete，不进入后续模型上下文；恢复不会重放任务写入。前端串行保存，切换前等待落盘；错误明确提示，不自动丢弃旧记录。该数据库是明文个人数据，不能随发布包分发。流式响应不完整或学生停止等待时，浏览器不调用保存端点；保存阶段不再提供取消等待。停止等待不能保证上游取消或免除 API 费用。真实模型质量与账户可用性需要持有 API Key 的使用者验证；离线自动测试使用模拟上游响应，但任务编译与计算使用真实 MuJoCo。

任务删除由学生在名称旁点击垃圾桶并在原生 dialog 中二次确认，DELETE 请求必须携带相同任务编号和本机请求头。后端与批量计算共用运行锁，计算未结束时拒绝删除；验证真实路径和目录树，拒绝符号链接及目录联接。先暂存目录、原子替换索引，再移除全部文件；索引更新失败会还原目录，文件占用导致清理不完整会明确返回残留路径。

`file-drop.js` 统一负责全页文件拖放：单个 XML 交给模型预览，图片交给 AI 助手，混合文件不导入。模型预览不再自行注册全局 drop。`assistant-images.js` 负责图片选择、头部格式检查、解码与尺寸限制；图片内联于 user 消息，后端复核 MIME、base64、实际格式及每次对话的数量和体积，再转换为官方 image_url 内容块。仅 Flash 可接收图片，图片写入本机对话数据库，不上传至 DeepSeek Files API。图像历史在对话、生成和错误修复时保持一致。

## 文档与运行文件

文档入口见 [docs/README.md](README.md)。新增功能时同步更新用户手册或对应技术规范，避免在多个 README 中重复维护操作步骤。任务的 notes.md、README.md 和资源库的 SOURCE.md 属于任务说明与来源记录，保留在所属目录。

`MUJOCO_LOG.TXT`、`*.log`、`__pycache__/`、`.pytest_cache/` 是运行日志或缓存，不作为交付内容。`tasks/*/results/` 是实验结果，不按日志清理。`model_library/resource_limit_audit.json` 是模型资源审计数据，应保留。

## 迁移安装

`uninstall.bat` 调用 Windows 自带的 PowerShell 执行 `backend/uninstall.ps1`，无需依赖将要删除的项目 Python。它仅删除校验过的项目根目录 `.venv`，拒绝符号链接、目录联接和非虚拟环境目录；发现锁定的原生模块时先报错，避免在程序运行时开始清理。旧环境备份与用户数据保留；不向系统 Python 或 Conda 运行 pip uninstall。

检查步骤见[迁移测试说明](migration-check.md)。`setup.bat` 优先探测 64 位 Python 3.12 / 3.13，然后尝试默认 Python；版本、架构不匹配或无法创建含 pip 的虚拟环境的解释器会跳过。`backend.bootstrap` 使用标准库创建 `.venv`，通过该解释器的 `python -m pip` 安装二进制依赖，不依赖原电脑的 pip.exe 路径，不要求本机编译工具。

迁移或失效的环境会先改名为 `.venv.backup-*`，再创建本机环境；不删除旧环境。安装完成记录项目位置。`backend.check_environment` 检查 Python 架构、构建页面与资源、必要文档、写入权限、依赖和一次原生 MuJoCo 计算。只有检查通过才报告安装成功。

自动测试可设置 `VMAIL_NO_PAUSE=1` 避免失败时等待按键；`VMAIL_SKIP_BROWSER=1` 只禁用自动打开浏览器，不影响服务。测试时还可用 `VMAIL_PORT` 指定空闲端口，默认仍为 8000。学生正常使用不需要设置这些变量。

## 依赖与发布

学生安装读取 `requirements.txt` 与 `constraints.txt`，版本来自 Windows x64／Python 3.12 的验证环境。升级依赖后应更新约束并完整回归。启动前读取 `app/.vite/manifest.json` 检查 Vite 登记的静态资源，不再只检查 HTML 和任意一个 WASM。默认只允许本机、同源请求，所有 API 禁止缓存；自定义端口无需修改跨域白名单。

[发布验收说明](release-check.md)记录检查范围与尚需人工验证的项目。
