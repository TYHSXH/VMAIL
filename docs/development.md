# VMAIL 开发与维护

面向维护公共前后端的开发者。学生操作见[系统使用手册](user-guide.md)，AI 创建任务先阅读[任务创建规则](task-rules.md)。

- [项目结构](#项目结构)
- [教师与开发者命令](#教师与开发者命令)
- [回归检查](#回归检查)
- [本地 DeepSeek 助手](#本地-deepseek-助手)
- [文档与运行文件](#文档与运行文件)
- [安装环境实现](#安装环境实现)
- [依赖与发布](#依赖与发布)
- [网页实验记录与原生重算](#网页实验记录与原生重算)
- [地面 Logo 外观](#地面-logo-外观)
- [迁移与换机检查](#迁移与换机检查)
- [发布验收](#发布验收)

## 项目结构

```text
app/                    已构建的网页和 MuJoCo WASM
frontend/               网页源代码
assets/logos/           黑、白、灰三版原始标志（默认地面与新模板用黑色）
licenses/               随运行包保留的第三方许可文本
backend/                本地 API 与 Python 批量仿真
docs/                   使用手册、任务指南、配置规范与开发维护
docs/task-rules.md          个人任务和课程任务的创建规范
course_resources/       公开分发的课程模型与完整任务
.local/tasks/            不参与 Git 的个人任务工作区
  manifest.yaml          全部学习任务的全局索引
  <task_id>/             每个学习任务的独立文件夹
.local/models/           不参与 Git 的独立个人模型及其资源
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

详细任务格式见 [docs/task-package-spec.md](task-package-spec.md)，学生与 AI 的推荐对话起点见 [docs/task-guide.md](task-guide.md#ai-提问与提示词)。

## 回归检查

模型加载、任务切换及后台重算期间，参数与执行器输入锁定；失败后恢复可用控件。任务的多文件读取与重命名／AI 更新共用 `TITLE_LOCK`，避免读取混合版本。AI 对话即使只含输入草稿，清空后也必须将空状态保存到已有记录。

在项目根目录运行：

```powershell
.\.venv\Scripts\python.exe -m unittest discover -s tests
node --test tests/*.test.mjs
npm run build
```

`tests/test_*.py` 检查任务、载荷、资源与批量计算；`tests/*.test.mjs` 检查浏览器状态、物理与渲染适配。`tests/export_load_cases.py` 由 renderer 测试调用，生成 Python / WASM 一致性参考数据，必须保留。

`app/` 是供启动脚本直接使用的构建产物，修改前端后需要重新构建。帮助阅读页由 `frontend/help.html` 与 `frontend/help.js` 构建，后端 `/help` 打开阅读页，`/api/help-documents` 提供学生使用手册、任务创建指南、课程空间共建指南三篇文档。任务创建指南已包含 AI 提示词与 STL 建模；配置参考、开发资料和模型来源不加入学生帮助。前端统一渲染，并按每篇文件的目录解析相对 Markdown 链接，在页内跳转；外部链接保留。`/docs/` 继续提供原始文件。正文每次打开时读取，无需重新构建。

## 本地 DeepSeek 助手

助手通过 `/api/assistant/chat` 连续执行任务操作，默认开启 DeepSeek `thinking.enabled`、`reasoning_effort=high`，单次输出预算 64000 tokens。模型响应中的 `reasoning_content` 与完整工具调用/结果对保留在本机 SQLite 的 `agent_context` 表中，在后续请求中原样回传。上游实际返回的思考片段通过 `reasoning_delta` 实时展示；生成时展开，正式回复、审批及完成时自动折叠，学生可重新展开。单条消息思考预览上限为一百万字符，不影响后台完整推理上下文。`read_task_docs` 按需读取规范，避免每次注入整份格式文档。每轮最多 64 次模型请求，单次响应最多 16 个工具调用，按序执行；保存成功后继续把结果交给模型验证和总结。

`assistant-turn.js` 管理单轮思考和文件摘要，`assistant-workspace.js` 保留整段对话的文件内容、差异及审批记录。每条助手消息保存 `thinking_text`、`thinking_truncated` 和仅含元数据的 `turn_files`，刷新后思考默认折叠；这些展示字段不会拼入普通提示词，也不会重复复制文件正文。停止及断线后，等待工作区清理状态再记录本轮最终文件状态。

`deep_thinking` 默认 true，`reasoning_effort` 支持 low/high/max、默认 high，均随对话保存；关闭时上游使用 `thinking.type=disabled` 且不发送 reasoning_effort。`POST /api/assistant/runs/{run_id}/messages` 接收带幂等 id 的文字修正，每次最多 12000 字符、每轮最多 32 条。RUNS_LOCK 保护队列及结束时关闭接收的边界；审批中收到修正会以 revised 结束旧审批并清除本轮同类授权。旧工具调用仍补齐 skipped 工具结果以保持上下文成对，下一次模型请求前再追加真正的 user 消息并发送 steering_applied。客户端按原回复、修正消息、新回复保存历史；未应用消息保留 incomplete，不能在下一轮伪装成已处理上下文。正在执行的工具不强制中断。

思考渲染按 100ms 合并更新，只保留一个最多 12000 字符的 DOM 文本节点。长记录通过上一段/下一段/最新内容查看；折叠历史在展开前不写入正文。禁止在 token 回调中读取滚动高度等布局数据，以免每个片段都强制重新排版。流读取对已缓冲的大量事件按时间预算让出主线程，避免阻塞动画和停止按钮。回归测试覆盖四万个片段、DOM 大小上限、历史分段、折叠及结束取消待刷新任务。

用量后附“估算费用 ×× 元”。`assistant_pricing.py` 按每次模型请求的创建时间（北京时间）、缓存命中/未命中输入和包含思考的输出分别计价，再累计整个工具循环，以 Decimal 计算并在显示时保留六位小数。价表与 2026 年节假日日历于 2026-11-06 核对；价格或年度变化时需更新。缺少用量明细、未知模型或未知年度显示“估算费用暂不可用”，不将缺失费用记为零。该数值不是账户实际扣费，不额外查询余额。

`assistant_agent.py` 为每轮创建 `.local/ai-workspaces/<run_id>/<task_id>/` 工作区。工具支持列出任务/文件、分段读取、批量写入、精确文本补丁、参数实验、任务数值 Python、校验、保存和临时文件清理。`create_task`、`read_task`、`update_task` 保留兼容。既有任务保留编号、资源和实验结果；使用内容版本号检查并发修改，保存前备份到 `.local/task-history/<task_id>/`，写入失败回滚。只能写任务配置、模型资源、任务脚本与实验报告，不能写平台代码或由 AI 直接维护全局索引。

写文件、运行命令前，服务端自动检查任务范围，再发送 `approval_required`。学生通过本机审批接口选择 `once`、`turn` 或 `deny`；未明确同意不会执行。文件授权限定该任务；命令授权限定任务及操作种类，Python 脚本另外绑定源代码 SHA-256，改代码后重新审批。授权仅在当前模型执行轮有效。审批展示实际文件内容/差异、命令及脚本源代码；审查通过不代表物理正确或绝对安全。参数实验支持多工况，返回单位、初末值、极值、非有限值计数及最多 101 点曲线；完整数据可在任务分析脚本中用 `simulate()` 分析。数值脚本生成的正式报告仍需文件授权后才能保存。

任务终端支持 `python -m backend.validate_task TASK_ID` 和 `python scripts/analysis.py` / `python .tmp/check.py`。它是任务数值执行环境，**不是任意主机 Shell，也不等同于 VS Code 的完整 Python 环境**。`assistant_compute.py` 在执行前检查 AST，仅开放 math、NumPy 的显式数值函数、statistics、JSON，以及任务范围的 `simulate`、`read_text`、`write_text`、`read_csv`、`write_csv`；不暴露原始模块、反射、系统 I/O、联网、子进程或安装工具。不能依靠 cwd 限定任意 Python/PowerShell 的权限，后续若开放完整终端，应接入真正的操作系统隔离容器，不可直接移除此执行边界。`assistant_worker.py` 在独立子进程运行计算，使用无 Shell 参数、精简环境变量、超时、Windows Job Object 内存上限与终止清理；它的资源限制不应被称为完整 OS 安全沙箱。

任务文件遍历、文本读取、路径边界检查和预检统一由 `assistant_tasks.py` 提供，快照、工作区和计算进程复用同一实现。遍历前排除临时目录、缓存和实验历史；正式 `scripts/` 随任务输入复制，使保存的研究脚本能在后续对话中继续使用。数值脚本只通过 `assistant_worker.py` 执行，审批后传入已核准的源码快照，避免重复命令行入口和计算模块对工作进程的反向导入。

`assistant_tasks.py` 接受六个必需文件，可添加 loads.yaml、任务内 XML/OBJ/STL、scripts/*.py、docs 和 results 中的报告。任务输入最多 1000 个文本文件、4 MiB；仿真与网页保持一致，最多 3600 秒、1000000 步、最小步长 1e-5 秒。允许内建 MJCF 功能和任务内 include；保留原生插件、越界资源、YAML 别名及过量展开的检查。当前写文件工具接收 UTF-8 文本，新建二进制 STL/纹理仍需外部资源准备；既有二进制资源保留。平台自动补齐官方 Logo。校验与默认工况由统一 `assistant_worker.py` 执行，通常超时 40 秒；任务命令/参数实验上限 90 秒、Windows 单进程内存 1 GiB。

一次性脚本和中间结果放 `.tmp/`，助手结束前调用清理工具，服务端在正常结束、停止或断线后的 finally 中兜底移除整个本轮工作区。只有已通过校验并成功保存的任务文件留下；临时文件永不发布。网页的“本次对话文件”累计显示创建/修改文件、内容、差异及保存/清理状态，“操作记录”保留审批决定与命令结果。恢复历史不会重放操作。审批默认等待最多 15 分钟，超时视为未同意。停止不能取消已进入的原子保存，也不保证取消已发出的上游费用。

连接密钥默认只存进程内存；选择记住时使用 Windows DPAPI 当前用户加密到 `.local/deepseek.key`，不在状态接口、任务、对话或工作区中返回原始密钥。对话、文件变更、操作记录和推理工具上下文存入本机 `.local/assistant-history.sqlite3`，属于明文个人数据，不随项目发布。对话上限 64 MiB，工具上下文上限 32 MiB。端点限定 loopback 来源与专用请求头，适用于单用户本机服务，不可直接部署为公网多人服务。

任务删除由学生在名称旁点击垃圾桶并在原生 dialog 中二次确认，DELETE 请求必须携带相同任务编号和本机请求头。后端与批量计算共用运行锁，计算未结束时拒绝删除；验证真实路径和目录树，拒绝符号链接及目录联接。先暂存目录、原子替换索引，再移除全部文件；索引更新失败会还原目录，文件占用导致清理不完整会明确返回残留路径。

`file-drop.js` 统一负责全页文件拖放：单个 XML 交给模型预览，图片交给 AI 助手，混合文件不导入。模型预览不再自行注册全局 drop。`assistant-images.js` 负责图片选择、头部格式检查、解码与尺寸限制；图片内联于 user 消息，后端复核 MIME、base64、实际格式及每次对话的数量和体积，再转换为官方 image_url 内容块。仅 Flash 可接收图片，图片写入本机对话数据库，不上传至 DeepSeek Files API。图像历史在对话、生成和错误修复时保持一致。

## 文档与运行文件

文档入口统一见[项目首页的文档导航](../README.md#文档导航)。新增功能时同步更新用户手册或对应技术规范，避免在多个 README 中重复维护操作步骤。任务正文和操作步骤统一写入所属目录的 notes.md；外部模型的 SOURCE.md 与许可证保留原位置。

`MUJOCO_LOG.TXT`、`*.log`、`__pycache__/`、`.pytest_cache/` 是运行日志或缓存，不作为交付内容。`.local/tasks/*/results/` 是实验结果，不按日志清理。`model_library/resource_limit_audit.json` 是模型资源审计数据，应保留。

## 安装环境实现

`uninstall.bat` 调用 Windows 自带的 PowerShell 执行 `backend/uninstall.ps1`，无需依赖将要删除的项目 Python。它仅删除校验过的项目根目录 `.venv`，拒绝符号链接、目录联接和非虚拟环境目录；发现锁定的原生模块时先报错，避免在程序运行时开始清理。旧环境备份与用户数据保留；不向系统 Python 或 Conda 运行 pip uninstall。

检查步骤见[迁移测试说明](#迁移与换机检查)。`setup.bat` 优先探测 64 位 Python 3.12 / 3.13，然后尝试默认 Python；版本、架构不匹配或无法创建含 pip 的虚拟环境的解释器会跳过。`backend.bootstrap` 使用标准库创建 `.venv`，通过该解释器的 `python -m pip` 安装二进制依赖，不依赖原电脑的 pip.exe 路径，不要求本机编译工具。

迁移或失效的环境会先改名为 `.venv.backup-*`，再创建本机环境；不删除旧环境。安装完成记录项目位置。`backend.check_environment` 检查 Python 架构、构建页面与资源、必要文档、写入权限、依赖和一次原生 MuJoCo 计算。只有检查通过才报告安装成功。

自动测试可设置 `VMAIL_NO_PAUSE=1` 避免失败时等待按键；`VMAIL_SKIP_BROWSER=1` 只禁用自动打开浏览器，不影响服务。测试时还可用 `VMAIL_PORT` 指定空闲端口，默认仍为 8000。学生正常使用不需要设置这些变量。

## 依赖与发布

学生安装读取 `requirements.txt` 与 `constraints.txt`，版本来自 Windows x64／Python 3.12 的验证环境。升级依赖后应更新约束并完整回归。启动前读取 `app/.vite/manifest.json` 检查 Vite 登记的静态资源，不再只检查 HTML 和任意一个 WASM。默认只允许本机、同源请求，所有 API 禁止缓存；自定义端口无需修改跨域白名单。

[发布验收说明](#发布验收)记录检查范围与尚需人工验证的项目。

## 网页实验记录与原生重算

`frontend/experiment.js` 在第一次开始／单步前以 `mjSTATE_INTEGRATION` 抓取完整 t=0 积分状态，按物理步记录手动 ctrl 变化；实验结束时冻结当次参数、时长、步长、采样步和网页数据。完成前不可导出。网页 CSV 使用冻结记录；后台请求也来自该快照，不再临时读取表单或最终姿态。关节调节、拖动和模型参数修改使旧记录失效。

`backend/experiment.py` 校验模型／资源／观测／载荷标识、状态向量长度与有限值、四元数、采样和控制步顺序，通过 `mj_setState` 恢复起点，按步重放手动 ctrl，载荷规律仍正常计算。结果按网页采样步输出，连同 `experiment.json` 保存；无 replay 的原 API 保留，供脚本和独立任务验证使用。前端保持网页曲线，逐点比较容差后下载后台 CSV。两端同为 MuJoCo 3.13.0，不以运行平台宣称精度高低。

`tests/replay_native.py` 由 renderer 回归调用，使用真实 WASM 和原生 MuJoCo 覆盖拖动后姿态、质量参数、闭环关节转角、中途控制、反馈载荷与非整数末步。`tests/test_experiment.py` 检查版本不符、损坏记录与保存条件重放。

## 地面 Logo 外观

`frontend/floor-branding.js` 供实验台和模型预览共用，加载原始 `logo-gray.png`，以 `opacity: 0.035` 的视觉贴花叠加到深色地面，使 Logo 若隐若现并融入地面。调整显眼程度时优先修改此材质透明度；保留原始图片以及地面的不透明度、碰撞和摩擦设置。此参数只控制网页渲染，不改写任务 XML 或原生 MuJoCo 的材质。修改后运行前端测试并重建 `app/`。

## 迁移与换机检查

这是教师/维护者的迁移说明，不放入学生帮助目录。

### 拷贝内容

复制项目文件，排除 `.venv`、`.venv.backup-*`、`node_modules`、`.npm-cache`、`.local`、`.git` 和 Python 缓存。保留 `app`（含 WASM、JS、CSS、字体）、`backend`、`docs`、`model_library`、`assets`、`licenses`、版权文件、`requirements.txt`、`constraints.txt` 和安装、启动、卸载 BAT 脚本。源码和开发文件可一起保留；已有 `.local/tasks/*/results/` 按需保留。

新电脑需要自行安装 64 位 x86 Python，建议 3.12。安装脚本不会安装 Python 本身，也不会自动配置浏览器、显卡驱动或网络代理。首次安装需要能访问 pip 使用的软件包源；安装完成后运行已打包的程序不需要 Node.js。

品牌资源随 `app/` 构建产物分发；默认 XML 已整合在 `docs/task-package-spec.md` 中；保留项目 `assets/logos/logo-gray.png`，用于任务创建和模板下载。

### 在另一台电脑上的检查

1. 解压到普通用户有读写权限的路径，建议包含中文和空格，以验证路径兼容性。
2. 双击 `start.bat`：首次应创建本机 `.venv`、安装依赖，并显示原生 MuJoCo 自检成功；浏览器应打开实验台。
3. 选择一个任务运行实时仿真，检查模型、按钮和数据曲线；停止并调整参数再运行。
4. 调整参数、关节和拖动姿态，完整运行网页实验，再用“导出本次实验”分别验证网页 CSV 与后台重算 CSV。核对实际起始状态和中途控制变化均被继承，结果在 `.local/tasks/<id>/results/run_*/`，包含 `experiment.json`。
5. 打开帮助：包含“学生使用手册”“AI 使用与提示词”和“复杂几何体与 STL 建模”；三篇内容都能直接阅读，页内链接正常。
6. 打开模型库预览，确认模型和配套资源可加载。
7. 关闭服务，再次双击 `start.bat`，不应重新下载已安装的依赖。
8. 安装完成后断开外网，再启动、运行和批量计算，检查本地功能。

如果测试复制旧 `.venv` 的容错行为，将整个项目复制到另一个路径；脚本应检测位置变化，将旧环境改名备份并重建。迁移交付仍建议直接排除 `.venv`。

### 失败时保留什么

若安装日志显示软件包镜像 `ReadTimeoutError`，可在当前 PowerShell 终端先执行 `$env:PIP_INDEX_URL="https://pypi.org/simple"`，再运行 `.\setup.bat`，改用官方 PyPI。此设置仅作用于当前终端及其子进程，关闭终端后失效，不修改用户全局 pip 配置；使用的源仍需能从本机访问。

保留窗口中的原始报错、Python 版本与架构、解压路径，以及失败发生在安装、环境自检、启动、实时仿真还是批量计算。若提示没有匹配的二进制依赖，优先使用 64 位 Python 3.12；若提示端口占用，先确认是否已有 VMAIL 服务。

本机临时目录中的全新环境测试可以验证安装流程、路径和后台计算；其他电脑的网络、权限、系统运行库和浏览器/WebGL 仍需要按以上步骤实测。

## 发布验收

最近一次代码整理和检查结果见[2026-11-08 发布记录](release-20261108.md)。

### 当前交付范围

本版本面向学生在 Windows x64 的个人电脑本机运行，验证基线为 64 位 x86 Python 3.12 与 MuJoCo 3.13.0。服务只监听 loopback，并核对客户端、Host 与同源 Origin；支持使用 VMAIL_PORT 修改端口。不是面向公网的多人托管服务。

学生不安装 Node.js；源码中随附 `app/` 构建产物、WASM、字体和品牌图片。安装和启动先检查 Vite 构建清单中的资源、版权文件、目录写入权限、固定 Python 依赖和原生引擎单步计算，发现缺失会报错。修改前端后必须重新构建再交付。

### 维护者每次发布前执行

在项目根目录：

```powershell
npm ci
npm test
npm run build
.\.venv\Scripts\python.exe -m unittest discover -s tests
.\.venv\Scripts\python.exe -m backend.validate_task
.\.venv\Scripts\python.exe -m backend.check_environment
.\.venv\Scripts\python.exe -m pip check
npm audit --omit=dev
npm audit
```

构建时 MuJoCo 包的 Node `module` 分支 externalized 提示以及大 JS chunk 提示属于构建提醒；以构建退出码、实际浏览器加载和仿真结果判断是否可用。不要通过关闭测试或移除资源自检来掩盖失败。

`tests/test_release_http.py` 会用独立临时任务和对话数据库启动真实服务，检查每个构建资源可下载、WASM MIME、帮助文档、黑色 Logo 模板、全部任务的模型准备／短时计算／CSV 下载、对话保存与单独删除、跨站和 DNS rebinding 拒绝。测试不修改学生的任务和聊天记录。

### 干净副本安装验收

按[迁移说明](#迁移与换机检查)复制完整项目到包含中文和空格的新目录，排除原 `.venv`、开发依赖与私人数据。运行 `setup.bat` 或 `start.bat`，实际下载依赖、建立本机环境并自检。确认第一次安装成功、随后启动不重复安装、已有任务离线运行、自定义空闲端口启动和批量 CSV 下载。

推荐 Edge／Chrome 实测：加载任务、运行／暂停／重置、参数应用、关节调整、灰色地面、曲线和 CSV；打开模型库预览；在帮助中定位 STL 指南。AI 面板应能保存对话与图片，刷新／重启后恢复，新对话保留旧记录，删除单条不影响其他记录与任务；请求中断不应自动重放任务写入。

### 分发文件与个人数据

GitHub 发布时提交本次新增源文件、品牌资源、文档、测试和最新 `app/`（包括 `app/.vite/manifest.json`）。仅复制已有被跟踪文件会漏掉尚未提交的新功能，请发布前检查 `git status`。

分发至少保留：`app/`、`backend/`、`assets/`、`docs/`、`course_resources/`、`model_library/`、`licenses/`、两个 README、`LICENSE`、`NOTICE`、`COPYRIGHT.md`、`THIRD_PARTY_NOTICES.md`、`requirements.txt`、`constraints.txt` 与全部安装／启动／卸载 BAT。个人索引由程序首次启动时在 `.local/tasks/manifest.yaml` 自动创建；公共课程任务由 `course_resources/` 提供。模型 `SOURCE.md`、`LICENSE` 随资源一起分发；源码仓库另保留前端源码、测试与 npm 锁文件。学生作品公开范围按贡献说明确认。

不要分发 `.local/`、`.venv`、`.venv.backup-*`、`node_modules`、缓存、个人 API Key 或个人实验结果。`.local/` 含加密密钥、明文对话／图片及任务修改备份，Git 忽略规则不能代替人工压缩包排除。学生原有任务与结果在更新前自行备份；不要用教师的任务目录无条件覆盖学生的自建任务。

### 验证边界

自动测试使用模拟的 AI 上游回答，不消耗真实 API。真实 DS 的账户权限、余额、外网连接和建模回答质量，需要使用者在“测试连接”及实际对话中验证。编译与仿真使用真实 MuJoCo；校验成功不证明力学模型正确。

当前电脑的干净环境测试不能替代另一台学生电脑的系统运行库、显卡驱动、浏览器 WebGL、网络与目录权限实测。发布时应记录检查日期、版本和结果，不作“所有电脑绝无故障”的保证。
