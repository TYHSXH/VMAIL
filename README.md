# VMAIL-BUAA 理论力学虚拟仿真实验平台

[简体中文](README.md) | [English](README_EN.md)

VMAIL 是面向理论力学课程的本地虚拟仿真实验台。学生可以把课本题目或真实机构整理成 MuJoCo 模型，调整参数与初始姿态，观察运动、受力和数据曲线，并导出实验结果。AI 可辅助分析、创建和修改任务；模型的简化假设与力学结论仍需自己核对。

浏览器使用 MuJoCo WASM 进行实时仿真，本机 Python 后端负责任务文件、AI 连接和批量计算。模型和实验数据保存在自己的电脑上；使用 DeepSeek 时，发送的对话、图片及相关任务文本会交给 DeepSeek 处理。

## 关于本平台

本平台由**北航理论力学教研室、教师和学生共同开发**，旨在帮助学生将理论力学知识用于问题分析、仿真验证与工程设计，通过与 AI 协作、对照理论与实验数据，培养独立思考、力学建模、误差分析和设计优化能力，并逐步从课本问题走向真实机构与自动化样机。

课程按照“知识学习 → 工程应用”展开：

- **知识学习：解题思路 → 仿真验证 → 调参优化。** 与 AI 讨论分析过程，核对作业求解；建立模型、观察运动、导出数据，从定性和定量两方面验证结果并分析误差；检查参数的物理合理性，围绕实际需求优化设计。
- **工程应用：仿真设计 → 实验实践 → 前沿拓展。** 从题目中的局部机构出发，探索并设计完整工程对象；结合工程图学、CAD 与 3D 打印实现机构运动；通过 AI 和线上线下课程补充机械设计、自动控制、电工电子等知识，逐步完成自动化样机设计与制作。

平台提供建模、交互仿真和数据分析环境，实物制作与控制实验在相应的课程和实验条件下完成。完整教学目标与各阶段成果见[课程教学路径](docs/user-guide.md#课程教学路径)。

第一次使用从下方安装步骤开始；查阅专题时直接使用[文档导航](#文档导航)，按“使用、创建任务、配置、维护、版权”选择对应文件。

## 1. 安装与启动（Windows）

推荐 **Windows x64 + 64 位 x86 Python 3.12 + 最新版 Edge 或 Chrome**。

### Python安装

当前启动脚本要求 Python 3.12 或更新版本，发布验证环境为 Python 3.12；不支持 32 位或 Windows ARM Python。请安装 Python 并勾选加入 PATH。首次安装需联网下载 Python 依赖。

Python 从[官网 Windows 下载页](https://www.python.org/downloads/windows/)下载。安装时注意：

- 优先使用本项目已验证的 **Python 3.12、Windows x86-64** 环境；不要只因首页推荐就直接选择最新大版本。选择 **Windows installer (64-bit)**，不要选 32-bit、ARM64、embeddable package（嵌入式包）或源码压缩包。3.12 后期安全维护版本可能只提供源码，不熟悉版本选择时可使用下方 Miniconda 创建 3.12 环境。
- 使用传统安装器时，勾选 **Add python.exe to PATH**，保留 `pip` 和 `venv` 组件。安装完重新打开终端，运行 `python --version` 和 `python -m pip --version` 检查；安装操作可参考 [Python 官方 Windows 说明](https://docs.python.org/3.12/using/windows.html)。
- 若安装了多个 Python，运行 `python -c "import sys; print(sys.executable)"` 确认当前路径；`python` 打开应用商店时，先检查命令别名与 PATH，或使用已激活的 Conda 环境。项目放在自己有写权限的目录，勿在压缩包内运行。

### 项目启动

本机有 Git 时，在可读写的目录执行：

```powershell
git clone https://github.com/TYHSXH/VMAIL.git
cd VMAIL
.\start.bat
```

若本机未装Git，可以直接在 [GitHub 仓库](https://github.com/TYHSXH/VMAIL) 点击 **Code → Download ZIP**。

完整解压后双击 `start.bat`，可以一键配置所有依赖，创建本机 `.venv`、安装固定版本依赖并自检，然后自动打开 [本地实验台](http://127.0.0.1:8000)。使用完毕在终端按 **Ctrl+C** 关闭服务。

注意：不要在压缩包内直接运行，不要只下载单个 HTML 或 XML 文件。

除第一次安装使用外，以后启动前均需运行 `start.bat`，不会重复安装依赖。本实验台默认只监听本机地址，适合学生个人使用。

### 可选：使用 Miniconda 管理环境

**Conda 是包管理和环境管理工具**，能为不同课程／项目分别管理 Python 版本与依赖。**Miniconda** 提供 Conda、Python 及少量基础依赖；完整的 **Anaconda Distribution** 另外预装大量科学计算软件包。本项目已有固定依赖清单，推荐安装更轻量的 **Miniconda**，按需安装即可，无须下载完整 Anaconda。两者区别见[官方介绍](https://www.anaconda.com/docs/getting-started/concepts/anaconda-or-miniconda)。只运行本项目也可以使用上面的普通 Python 配合 `start.bat`，无须再装 Conda。

从 [Miniconda 官方下载入口](https://www.anaconda.com/download/success)选择 Windows x86-64 安装器，安装步骤见[官方安装指南](https://www.anaconda.com/docs/getting-started/installation)。可按默认建议仅为当前用户安装，使用安装后提供的 **Anaconda Prompt**，无须为了运行本项目强行将 Miniconda 加入系统 PATH。先在该终端切换到 VMAIL 项目根目录，再创建专用环境：

```powershell
conda create -n vmail python=3.12 pip
conda activate vmail
python -m pip install -r requirements.txt
.\start-current-python.bat
```

以后打开终端，切换到项目目录并执行 `conda activate vmail` 和 `.\start-current-python.bat` 即可；

已有合适环境时可直接激活自己的环境，不必重建。该方式使用当前 Python，不使用项目 `.venv`；不要把项目依赖装到 Conda 的 `base` 环境。

更完整的安装和迁移说明见[学生使用手册](docs/user-guide.md)与[迁移检查](docs/development.md#迁移与换机检查)。

## 2. 完成第一次实验

1. 在左侧选中“弹簧阻尼滑块示例”，先读“任务”页中的问题、假设与操作步骤。
2. 在“参数与控制”页调整质量、刚度、阻尼或初始条件，点击“应用参数”。
3. 点击“开始仿真”，在“数据”页观察曲线；到达指定时长后会自动暂停。用“重置”回到任务初始状态。
4. 左键旋转、Shift＋左键平移、滚轮缩放；“复位视角”恢复任务视图。“拖动”用于调整起始姿态，拖动期间不计时、不采集数据。
5. 等网页仿真完整结束后，点击“导出本次实验”，选择“导出网页数据 CSV”或“后台重算并下载 CSV”。也可直接点“后台重算”。后台结果保存在 `.local/tasks/<任务编号>/results/run_*/`，可在“已保存的实验”再次下载。

后台继承**这次网页实验开始时**的参数、时长、步长、关节姿态、拖动后的实际起点、速度与内部状态，并按仿真步重放中途执行器调节。它不从结束姿态起跑，也不会用导出时刚改的新参数覆盖本次条件。拖动用于准备起始姿态，鼠标移动过程不属于实验时间；再次拖动或修改模型参数、时长、步长、关节姿态后，需要重新完成网页仿真再导出。

### 网页计算和后台计算有什么区别？

| 比较项 | 网页计算／导出网页数据 | 后台重算（原“批量计算”） |
| --- | --- | --- |
| 引擎 | 浏览器内的 MuJoCo WebAssembly，同时显示动画和曲线 | Python 调用本机原生 MuJoCo，不依赖动画刷新 |
| 用途 | 交互观察；导出直接保存已采集数据，不再计算 | 按同次实验条件复算，保存结果与实验条件 |
| 条件与采样 | 记录实际起点和中途控制变化 | 继承同一份记录，在网页采样时刻输出以便核对 |
| 精度 | 取决于模型、步长和求解设置 | **不因在后台运行就天然更准确**；相同版本和条件下应在数值误差范围内一致 |

两端当前均为 MuJoCo 3.13.0。浏览器帧率影响动画流畅度和运行速度，不影响设定的物理步长。后台会核对模型与载荷版本，并比较两端数据；接触、碰撞或敏感系统可能放大跨平台浮点误差，不能保证逐位相同。想提高数值精度，应先合理减小步长或调整模型／求解设置，重新完成网页实验，再按新条件重算。详见[网页计算、后台重算与导出说明](docs/user-guide.md#网页计算后台重算与实验导出)。

一次重算一组已完成实验，自动扫描多个参数组合仍需单独的实验脚本。任务名称旁的编辑按钮可改名，垃圾桶可删除任务及其结果，删除前请备份。

顶部“课程空间”提供课程组和学生共建的模型库、任务库，支持分类、搜索和图片详情。模型可添加至“模型预览”的侧边库，完整任务可独立复现至学习任务栏。课程资源按 `course_resources/models/` 与 `course_resources/tasks/` 下的课程组、年届及子分类目录自动归档；欢迎通过 GitHub PR 分享资源，详见[课程空间与资源共建](docs/course-resources.md)。模型预览也支持单个 XML；只有完整任务包才提供任务说明、参数与曲线配置。顶部“帮助”提供操作手册和 AI 提示词。

## 3. AI 辅助：直接在系统中使用 DeepSeek API

个人任务存放在 `.local/tasks/`，独立模型存放在 `.local/models/`，不会进入 GitHub 分发。学生首次打开时个人列表为空，可从课程空间复现公共资源。教师已有的任务与课程原件分别保存，互不影响。存储与升级说明见[个人空间与课程空间](docs/user-guide.md#个人空间与课程空间)。

1. 在 [DeepSeek 开放平台](https://platform.deepseek.com/api_keys) 创建自己的 API Key。
2. 打开实验台“我是菜鸟·AI”或“AI 助手”，展开“历史与连接”，填写 Key、选择模型并“保存连接”，再“测试连接”。这里填写 API Key，不是账号密码。
3. 描述机构、已知尺寸、质量、关节、载荷，以及想改变和观察的量。可以上传题目图片或草图；图片理解选择 **DeepSeek Flash**，具体服务能力以 [DeepSeek 官方文档](https://api-docs.deepseek.com/)为准。
4. 明确要求创建任务后，助手生成文件，系统校验并试运行，通过后自动写入任务目录并刷新列表。失败时把报错继续交给助手修正。
5. 修改已有任务前先在左侧选中它，再说“修复这个任务”或“增加一个观测量”；也可以明确提供任务编号。助手会在原任务上修改，并备份原文件。

例如：

```text
请创建一个单摆学习任务。摆长 1 m，质量 1 kg，忽略阻力，
初始角度可调，观察摆角和角速度，并说明如何与小角度周期公式比较。
请先确认有歧义的条件，保留默认黑色 Logo 地面。
```

对话文字、图片和草稿会自动保存在项目的 `.local/assistant-history.sqlite3`；刷新或重启后可恢复，在“历史对话”切换，“新对话”保留旧记录，“删除此对话”只删除对应记录，不删除已建任务。保存失败会提示，请看到“已保存到本机”后再关闭页面。中断的回答会标记为未完成，不会当作已完成指令自动重发或保存任务。恢复旧对话后，当前操作对象仍以左侧选择或你明确指定的任务编号为准。

密钥默认只保留在本次服务进程内；“记住密钥”使用 Windows 当前用户加密。对话记录本身是本地明文文件，共享电脑使用完毕可删除对应对话并解除绑定。`.local/` 已被 Git 忽略，**不要将它打包、上传或发送给他人**。API 按服务商规则计费，停止等待仍可能产生已发出请求的费用。

网页助手默认开启 MAX 深度思考，可连续编辑任务、运行参数实验和任务数值 Python。创建/修改文件与命令由平台审查，再交给学生选择同意或拒绝；文件列表累计显示本次对话的改动，临时文件结束后自动清理。支持任务内 XML/OBJ 与 include，二进制 STL/纹理和 CAD 素材仍需用下方本地编辑器工作流准备。具体权限、终端能力与审批方式见[学生使用手册](docs/user-guide.md#用-deepseek-对话创建任务)。

## 4. AI 辅助：在 VS Code 中使用 DS 插件与自己的 API

本地编辑器适合复杂模型、多文件 MJCF、STL 资源和实验脚本。使用 VS Code 的“打开文件夹”打开整个 **VMAIL** 项目，使 AI 能读取 `tasks/AGENTS.md` 与任务规范。

DeepSeek 官方提供了 [VS Code / Copilot 集成教程](https://api-docs.deepseek.com/quick_start/agent_integrations/github_copilot/)及其链接的 [DeepSeek V4 for Copilot 扩展](https://github.com/Vizards/deepseek-v4-for-copilot)。按该教程安装对应版本 VS Code、配置 Copilot 账号／方案和扩展后：

1. 按 **Ctrl+Shift+P** 打开命令面板，运行 **DeepSeek: Set API Key**，填入自己的 DeepSeek Key。
2. 打开 Copilot Chat，在模型选择器中选择 DeepSeek。需要 AI 修改本地文件时，使用扩展支持的 Agent 模式并检查变更。
3. 将下面的提示词和建模资料交给 AI。完成后在终端运行任务校验，再回到网页刷新任务列表。

若使用其他支持 OpenAI 兼容接口的 DS 编程插件，按该插件文档设置服务商、API Key、Base URL `https://api.deepseek.com`（部分插件要求 `/v1`）与模型名 `deepseek-flash` 或 `deepseek-v4-pro`；以插件及 [DeepSeek API 文档](https://api-docs.deepseek.com/)为准。检查扩展发布者和权限，不把 Key 写入 XML、提示词或 Git 仓库。编辑器绑定与网页绑定各自独立，互不自动同步。

```text
请先阅读 tasks/AGENTS.md、docs/task-package-spec.md，
涉及复杂外形时再读 docs/task-guide.md。
在 .local/tasks/ 下创建独立任务，不修改公共前后端。
我的研究对象是……；已知条件是……；希望改变……，观察……。
请说明简化假设与单位，复用默认黑色 Logo 地面，补齐任务配置，
登记 .local/tasks/manifest.yaml，并运行 backend.validate_task 校验。
```

```powershell
.\.venv\Scripts\python.exe -m backend.validate_task 你的任务编号
```

完整提示词见 [AI 任务创建指南](docs/task-guide.md#ai-提问与提示词)。AI 输出可运行只是第一步，还需对照理论、量纲、初始状态和极限工况验证。

## 5. 复杂几何体：学生建 STL，AI 辅助写 MJCF

箱体、球体、圆柱等基础形状适合许多理想化问题；当孔洞、凹槽、非规则轮廓或接触位置决定力学结果时，基础几何体可能无法准确表达。不要为了得到动画而强行改变题目的约束或接触关系。

建议学生在 CAD 中按尺寸建立零件、导出**二进制 STL**，放到任务自己的 `assets/` 文件夹，再借助 AI 编写 MJCF 中的刚体、关节、惯量、碰撞体和观测点。STL 只描述外形，不自带质量、铰链或控制规律。MuJoCo 的普通 mesh 碰撞使用凸包，凹槽或孔洞通常需要分解成多个凸碰撞体；视觉上有洞不保证可以穿过。

具体步骤、可复制的 MJCF 片段、单位换算与排错见[复杂几何体与 STL／MJCF 建模指南](docs/task-guide.md#复杂几何体与-stlmjcf-建模)。也可从[模型资料库](model_library/README.md)整组复制已授权的模型与资源，保留原许可证后改编。

## 6. MuJoCo 官方学习导航

| 学习目标 | 官方入口 |
| --- | --- |
| 了解 MuJoCo、下载与项目消息 | [MuJoCo 官网](https://mujoco.org/) · [官方 GitHub](https://github.com/google-deepmind/mujoco) |
| 入门概念与模型组成 | [Overview](https://mujoco.readthedocs.io/en/stable/overview.html) |
| 学习如何创建 MJCF、刚体与关节 | [Modeling 建模教程](https://mujoco.readthedocs.io/en/stable/modeling.html) |
| 查询 XML 标签、mesh、惯量与约束字段 | [MJCF XML Reference](https://mujoco.readthedocs.io/en/stable/XMLreference.html) |
| 编写本地实验和批量脚本 | [Python 官方接口](https://mujoco.readthedocs.io/en/stable/python.html) |
| 阅读完整机器人模型 | [MuJoCo Menagerie](https://github.com/google-deepmind/mujoco_menagerie) |

建议先掌握 `body → joint → geom`、坐标系、SI 单位、质量与惯量，再学习执行器、接触和约束。项目当前固定 **MuJoCo 3.13.0**，在线 stable 文档会更新，使用新字段前请核对该版本是否支持。

## 7. 常见问题与数据保留

| 现象 | 处理方法 |
| --- | --- |
| 找不到 Python、没有匹配的安装包 | 安装 Windows x64 Python 3.12 并加入 PATH，重新运行 `setup.bat`，查看安装窗口原始错误 |
| 网页没有自动打开 | 保留服务窗口，手动访问 `http://127.0.0.1:8000`；不要双击 `app/index.html` |
| 8000 端口已占用 | 先确认 VMAIL 是否已经运行；或在 PowerShell 执行 `$env:VMAIL_PORT="8001"` 后运行 `.\start.bat` |
| 模型区空白或物理引擎启动失败 | 查看页面报错；使用新版 Edge / Chrome 并启用硬件加速，检查是否完整解压 `app/`（包含 `.wasm`、字体和图片） |
| API 无法连接 | 检查 Key、账户余额、网络与所选模型权限；用“测试连接”，不要把密钥或 `.local/` 发到问题反馈中 |
| STL 有显示但碰撞不对 | 检查凸包、单位、坐标与惯量，按[网格指南](docs/task-guide.md#复杂几何体与-stlmjcf-建模)拆分碰撞体 |
| 新任务没有出现或校验失败 | 检查六个必需文件和 `.local/tasks/manifest.yaml`，运行任务校验并刷新列表 |
| 更新后仍是旧界面 | 先停止旧服务，再用完整新版本启动并强制刷新浏览器；开发者修改前端后必须重建 `app/` |

首次安装完成后，已有任务的仿真、曲线与导出可离线使用；API 对话需要联网。换电脑时复制完整项目，排除 `.venv`、`.venv.backup-*`、`node_modules`、缓存和 `.local/`，在新电脑重新安装依赖。自行备份 `.local/tasks/` 中的自建任务和实验结果。

卸载时先停止服务，再运行 `uninstall.bat`，清除一键安装创建的 `.venv`。任务、结果和 `.local/` 保留；若要清除个人数据，请先通过历史列表删除对话并解除绑定，再按需自行删除项目目录。Conda 环境由使用者自行管理。

## 文档导航

相近内容已合并到下列文件，每份正文开头提供章节目录；网页顶部“帮助”集中展示前两份指南。

| 想了解什么 | 阅读文件 | 内容与章节入口 |
| --- | --- | --- |
| 课程怎么学、平台怎么用 | [学生使用手册](docs/user-guide.md) | [课程教学路径](docs/user-guide.md#课程教学路径)、安装与卸载、AI 连接、参数与视角、图表操作、[网页计算与实验导出](docs/user-guide.md#网页计算后台重算与实验导出)、常见问题 |
| 如何把题目做成学习任务 | [任务创建指南](docs/task-guide.md) | [任务创建流程](docs/task-guide.md#任务创建流程)、[可复制的 AI 提示词](docs/task-guide.md#ai-提问与提示词)、修复与验证、[CAD／STL 与 MJCF 建模](docs/task-guide.md#复杂几何体与-stlmjcf-建模) |
| 配置文件具体怎么写 | [任务包规范与载荷参考](docs/task-package-spec.md) | 六个任务文件、[默认 XML 模板](docs/task-package-spec.md#默认-xml-模板)、参数与观测、界面配置、[loads.yaml 载荷与控制](docs/task-package-spec.md#任务载荷与控制规律) |
| 如何修改、迁移和发布系统 | [开发与维护](docs/development.md) | 项目结构、构建与测试、前后端实现、[迁移与换机检查](docs/development.md#迁移与换机检查)、[发布验收](docs/development.md#发布验收)及历史检查记录 |
| 能否复用、展示和申请软著 | [版权、贡献与软著说明](COPYRIGHT.md) | 平台／Logo／学生作品的权利范围、[贡献与展示规则](COPYRIGHT.md#贡献与学生作品展示)、[许可证选择](COPYRIGHT.md#许可证选择与使用)、[软著登记与模型库版权边界](COPYRIGHT.md#软件著作权登记) |
| 用到了哪些第三方内容 | [第三方声明](THIRD_PARTY_NOTICES.md) | 组件版本、许可证、模型来源与分发要求；[MuJoCo 上游通知](licenses/mujoco-THIRD_PARTY.md)保留原文 |
| AI 修改任务必须遵守什么 | [任务目录规则](tasks/AGENTS.md) | 任务目录、建模与单位、观测、载荷、校验规则；给 AI 的操作约束 |
| 模型素材和 Logo 怎么使用 | [模型资料库](model_library/README.md) · [模型复用提示词](model_library/AI_TASK_PROMPT.md) · [Logo 说明](assets/logos/README.md) | 模型选题与资源入口、按原许可证复用、Logo 的单独权利说明 |

各题目的背景、假设、理论公式和操作步骤统一放在各自的 `notes.md`，网页“任务”页直接读取，无需再找单独的任务 README：

| 学习任务 | 任务说明 |
| --- | --- |
| 弹簧阻尼滑块 | [notes.md](.local/tasks/example_mass_spring/notes.md) |
| 变方向外力与偏心力矩 | [notes.md](.local/tasks/rotating_load_demo/notes.md) |
| 曲柄滑块速度验证 | [notes.md](.local/tasks/slider_crank_block_force/notes.md) |
| 改型全回转纯滚圆盘 | [notes.md](.local/tasks/rolling_disk_points_bc/notes.md) |
| 铅垂杆推动楔块 | [notes.md](.local/tasks/wedge_rod_acceleration_v4/notes.md) |
| 行星齿轮 M 点加速度 | [notes.md](.local/tasks/planetary_gear_point_acceleration/notes.md) |
| 行星齿轮相对转速修正版 | [notes.md](.local/tasks/planetary_gear_point_acceleration_relative_speed/notes.md) |

仓库包含可直接运行的 `app/` 构建产物。开发者才需要 Node.js，使用 `npm ci`、`npm test`、`npm run build`；Python 依赖由 `requirements.txt` 与 `constraints.txt` 固定。所有学生运行文件、版权说明和模型许可证都应随发行版保留。

## 版权与第三方资源

© 2026 **BUAA 5系 理论力学课程组及相应贡献者**。除 Logo、学生作品和第三方内容外，有权发布的平台原创代码、网页、文档与原创示例／模板采用 [Apache-2.0](LICENSE)，允许商业使用。分发时保留许可证、版权与适用的 [NOTICE](NOTICE)，修改文件时说明修改。完整范围见 [COPYRIGHT.md](COPYRIGHT.md)，许可证区别见[授权说明](COPYRIGHT.md#许可证选择与使用)。

**Logo 和学生作品保留全部权利，不予公开授权，禁止商用，不适用 Apache-2.0。** 此声明包含网页、地面及构建产物中的 Logo 副本，以及入选展示的学生作品；展示或下载不构成复用许可。未经相关权利人另行书面许可不得使用，法律规定的例外除外。复用平台代码时应替换／移除 Logo 和学生作品或先取得许可，见 [Logo 声明](assets/logos/LICENSE.txt)与[贡献说明](COPYRIGHT.md#贡献与学生作品展示)。

MuJoCo、Three.js、KaTeX、Marked、DOMPurify 及其资源属于各自权利人，按各自许可证提供，见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) 和 [licenses/](licenses)。模型资料库按每组 `SOURCE.md`、`LICENSE` 保留原作者、固定来源与许可，不因本项目的版权声明改变。学生添加的 CAD／STL、题图、教材内容及其他素材，须确认使用与再分发权限，并保留来源。教学仿真结果需经力学核对，不作为工程安全认证。
