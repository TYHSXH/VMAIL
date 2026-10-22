# VMAIL-BUAA 理论力学虚拟仿真实验平台

[简体中文](README.md) | [English](README_EN.md)

VMAIL 是面向理论力学课程的本地虚拟仿真实验台。学生可以把课本题目或真实机构整理成 MuJoCo 模型，调整参数与初始姿态，观察运动、受力和数据曲线，并导出实验结果。AI 可辅助分析、创建和修改任务；模型的简化假设与力学结论仍需自己核对。

浏览器使用 MuJoCo WASM 进行实时仿真，本机 Python 后端负责任务文件、AI 连接和批量计算。模型和实验数据保存在自己的电脑上；使用 DeepSeek 时，发送的对话、图片及相关任务文本会交给 DeepSeek 处理。

## 1. 安装与启动（Windows）

推荐 **Windows x64 + 64 位 x86 Python 3.12 + 最新版 Edge 或 Chrome**，浏览器需启用 JavaScript、WebAssembly 和 WebGL。当前启动脚本要求 Python 3.12 或更新版本，发布验证环境为 Python 3.12；不支持 32 位或 Windows ARM Python。请安装 Python 并勾选加入 PATH。首次安装需联网下载 Python 依赖，学生无需安装 Node.js，也无需另行安装 MuJoCo。

有 Git 时，在可读写的目录执行：

```powershell
git clone https://github.com/TYHSXH/VMAIL.git
cd VMAIL
.\start.bat
```

也可以在 [GitHub 仓库](https://github.com/TYHSXH/VMAIL) 点击 **Code → Download ZIP**，完整解压后双击 `start.bat`。不要在压缩包内直接运行，不要只下载单个 HTML 或 XML 文件。

启动脚本会创建本机 `.venv`、安装固定版本依赖并自检，然后自动打开 [本地实验台](http://127.0.0.1:8000)。保留启动窗口；使用完毕按 **Ctrl+C** 关闭服务。以后仍运行 `start.bat`，环境正常时不会重复安装。默认只监听本机地址，适合学生个人使用。

已使用 Conda 的同学，也可以选择自己的 Python 3.12 环境：

```powershell
conda activate 你的环境名
python -m pip install -r requirements.txt
.\start-current-python.bat
```

该方式使用当前 Python，不使用项目 `.venv`。更完整的安装和迁移说明见[学生使用手册](docs/user-guide.md)与[迁移检查](docs/migration-check.md)。

## 2. 完成第一次实验

1. 在左侧选中“弹簧阻尼滑块示例”，先读“任务”页中的问题、假设与操作步骤。
2. 在“参数与控制”页调整质量、刚度、阻尼或初始条件，点击“应用参数”。
3. 点击“开始仿真”，在“数据”页观察曲线；到达指定时长后会自动暂停。用“重置”回到任务初始状态。
4. 左键旋转、Shift＋左键平移、滚轮缩放；“复位视角”恢复任务视图。“拖动”用于调整起始姿态，拖动期间不计时、不采集数据。
5. 等网页仿真完整结束后，点击“导出本次实验”，选择“导出网页数据 CSV”或“后台重算并下载 CSV”。也可直接点“后台重算”。后台结果保存在 `tasks/<任务编号>/results/run_*/`，可在“已保存的实验”再次下载。

后台继承**这次网页实验开始时**的参数、时长、步长、关节姿态、拖动后的实际起点、速度与内部状态，并按仿真步重放中途执行器调节。它不从结束姿态起跑，也不会用导出时刚改的新参数覆盖本次条件。拖动用于准备起始姿态，鼠标移动过程不属于实验时间；再次拖动或修改模型参数、时长、步长、关节姿态后，需要重新完成网页仿真再导出。

### 网页计算和后台计算有什么区别？

| 比较项 | 网页计算／导出网页数据 | 后台重算（原“批量计算”） |
| --- | --- | --- |
| 引擎 | 浏览器内的 MuJoCo WebAssembly，同时显示动画和曲线 | Python 调用本机原生 MuJoCo，不依赖动画刷新 |
| 用途 | 交互观察；导出直接保存已采集数据，不再计算 | 按同次实验条件复算，保存结果与实验条件 |
| 条件与采样 | 记录实际起点和中途控制变化 | 继承同一份记录，在网页采样时刻输出以便核对 |
| 精度 | 取决于模型、步长和求解设置 | **不因在后台运行就天然更准确**；相同版本和条件下应在数值误差范围内一致 |

两端当前均为 MuJoCo 3.13.0。浏览器帧率影响动画流畅度和运行速度，不应改变设定的物理步长。后台会核对模型与载荷版本，并比较两端数据；接触、碰撞或敏感系统可能放大跨平台浮点误差，不能保证逐位相同。想提高数值精度，应先合理减小步长或调整模型／求解设置，重新完成网页实验，再按新条件重算。详见[网页计算、后台重算与导出说明](docs/simulation-export.md)。

一次重算一组已完成实验，自动扫描多个参数组合仍需单独的实验脚本。任务名称旁的编辑按钮可改名，垃圾桶可删除任务及其结果，删除前请备份。

顶部“模型预览”可浏览自带模型资料库或预览单个 XML；只有完整任务包才提供任务说明、参数与曲线配置。顶部“帮助”提供操作手册和 AI 提示词。

## 3. AI 辅助：直接在系统中使用 DeepSeek API

1. 在 [DeepSeek 开放平台](https://platform.deepseek.com/api_keys) 创建自己的 API Key。
2. 打开实验台“AI 创建任务”或“AI 助手”，展开“连接设置”，填写 Key、选择模型并“保存连接”，再“测试连接”。这里填写 API Key，不是账号密码。
3. 描述机构、已知尺寸、质量、关节、载荷，以及想改变和观察的量。可以上传题目图片或草图；图片理解选择 **DeepSeek Flash**，具体服务能力以 [DeepSeek 官方文档](https://api-docs.deepseek.com/)为准。
4. 明确要求创建任务后，助手生成文件，系统校验并试运行，通过后自动写入任务目录并刷新列表。失败时把报错继续交给助手修正。
5. 修改已有任务前先在左侧选中它，再说“修复这个任务”或“增加一个观测量”；也可以明确提供任务编号。助手会在原任务上修改，并备份原文件。

例如：

```text
请创建一个单摆学习任务。摆长 1 m，质量 1 kg，忽略阻力，
初始角度可调，观察摆角和角速度，并说明如何与小角度周期公式比较。
请先确认有歧义的条件，保留默认灰色 logo 地面。
```

对话文字、图片和草稿会自动保存在项目的 `.local/assistant-history.sqlite3`；刷新或重启后可恢复，在“历史对话”切换，“新对话”保留旧记录，“删除此对话”只删除对应记录，不删除已建任务。保存失败会提示，请看到“已保存到本机”后再关闭页面。中断的回答会标记为未完成，不会当作已完成指令自动重发或保存任务。恢复旧对话后，当前操作对象仍以左侧选择或你明确指定的任务编号为准。

密钥默认只保留在本次服务进程内；“记住密钥”使用 Windows 当前用户加密。对话记录本身是本地明文文件，共享电脑使用完毕可删除对应对话并解除绑定。`.local/` 已被 Git 忽略，**不要将它打包、上传或发送给他人**。API 按服务商规则计费，停止等待仍可能产生已发出请求的费用。

网页助手新建任务支持基础几何体和标准 `loads.yaml` 载荷，不能生成或上传 STL、安装插件或执行任意 Python 脚本。需要复杂零件时使用下一种方式。

## 4. AI 辅助：在 VS Code 中使用 DS 插件与自己的 API

本地编辑器适合复杂模型、多文件 MJCF、STL 资源和实验脚本。使用 VS Code 的“打开文件夹”打开整个 **VMAIL** 项目，使 AI 能读取 `tasks/AGENTS.md` 与任务规范。

DeepSeek 官方提供了 [VS Code / Copilot 集成教程](https://api-docs.deepseek.com/quick_start/agent_integrations/github_copilot/)及其链接的 [DeepSeek V4 for Copilot 扩展](https://github.com/Vizards/deepseek-v4-for-copilot)。按该教程安装对应版本 VS Code、配置 Copilot 账号／方案和扩展后：

1. 按 **Ctrl+Shift+P** 打开命令面板，运行 **DeepSeek: Set API Key**，填入自己的 DeepSeek Key。
2. 打开 Copilot Chat，在模型选择器中选择 DeepSeek。需要 AI 修改本地文件时，使用扩展支持的 Agent 模式并检查变更。
3. 将下面的提示词和建模资料交给 AI。完成后在终端运行任务校验，再回到网页刷新任务列表。

若使用其他支持 OpenAI 兼容接口的 DS 编程插件，按该插件文档设置服务商、API Key、Base URL `https://api.deepseek.com`（部分插件要求 `/v1`）与模型名 `deepseek-flash` 或 `deepseek-v4-pro`；以插件及 [DeepSeek API 文档](https://api-docs.deepseek.com/)为准。检查扩展发布者和权限，不把 Key 写入 XML、提示词或 Git 仓库。编辑器绑定与网页绑定各自独立，互不自动同步。

```text
请先阅读 tasks/AGENTS.md、docs/task-package-spec.md，
涉及复杂外形时再读 docs/mesh-modeling.md。
在 tasks/ 下创建独立任务，不修改公共前后端。
我的研究对象是……；已知条件是……；希望改变……，观察……。
请说明简化假设与单位，复用默认灰色 logo 地面，补齐任务配置，
登记 tasks/manifest.yaml，并运行 backend.validate_task 校验。
```

```powershell
.\.venv\Scripts\python.exe -m backend.validate_task 你的任务编号
```

完整提示词见 [AI 任务创建指南](prompts/student-task-builder.md)。AI 输出可运行只是第一步，还需对照理论、量纲、初始状态和极限工况验证。

## 5. 复杂几何体：学生建 STL，AI 辅助写 MJCF

箱体、球体、圆柱等基础形状适合许多理想化问题；当孔洞、凹槽、非规则轮廓或接触位置决定力学结果时，基础几何体可能无法准确表达。不要为了得到动画而强行改变题目的约束或接触关系。

建议学生在 CAD 中按尺寸建立零件、导出**二进制 STL**，放到任务自己的 `assets/` 文件夹，再借助 AI 编写 MJCF 中的刚体、关节、惯量、碰撞体和观测点。STL 只描述外形，不自带质量、铰链或控制规律。MuJoCo 的普通 mesh 碰撞使用凸包，凹槽或孔洞通常需要分解成多个凸碰撞体；视觉上有洞不保证可以穿过。

具体步骤、可复制的 MJCF 片段、单位换算与排错见[复杂几何体与 STL／MJCF 建模指南](docs/mesh-modeling.md)。也可从[模型资料库](model_library/README.md)整组复制已授权的模型与资源，保留原许可证后改编。

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
| STL 有显示但碰撞不对 | 检查凸包、单位、坐标与惯量，按[网格指南](docs/mesh-modeling.md)拆分碰撞体 |
| 新任务没有出现或校验失败 | 检查六个必需文件和 `tasks/manifest.yaml`，运行任务校验并刷新列表 |
| 更新后仍是旧界面 | 先停止旧服务，再用完整新版本启动并强制刷新浏览器；开发者修改前端后必须重建 `app/` |

首次安装完成后，已有任务的仿真、曲线与导出可离线使用；API 对话需要联网。换电脑时复制完整项目，排除 `.venv`、`.venv.backup-*`、`node_modules`、缓存和 `.local/`，在新电脑重新安装依赖。自行备份 `tasks/` 中的自建任务和实验结果。

卸载时先停止服务，再运行 `uninstall.bat`，清除一键安装创建的 `.venv`。任务、结果和 `.local/` 保留；若要清除个人数据，请先通过历史列表删除对话并解除绑定，再按需自行删除项目目录。Conda 环境由使用者自行管理。

## 8. 进一步阅读与维护

- [学生使用手册](docs/user-guide.md)：详细操作与故障排查。
- [任务工作流](docs/workflow.md) · [任务目录规则](tasks/AGENTS.md)：如何把真实问题整理成任务。
- [任务包规范](docs/task-package-spec.md) · [载荷与控制](docs/load-controls.md)：配置字段与标准载荷。
- [开发维护](docs/development.md) · [发布验收](docs/release-check.md)：构建、测试、安装与分发检查。

仓库包含可直接运行的 `app/` 构建产物。开发者才需要 Node.js，使用 `npm ci`、`npm test`、`npm run build`；Python 依赖由 `requirements.txt` 与 `constraints.txt` 固定。所有学生运行文件、版权说明和模型许可证都应随发行版保留。

## 版权与第三方资源

© 2026 **BUAA 5系 理论力学课程组**。VMAIL 平台原创代码、课程原创文档及标志沿用课程组版权标注；未经另行许可，不得将课程标志用于冒名或暗示官方背书。公开托管在 GitHub 不等同于对全部原创内容授予开源许可证，授权范围见 [COPYRIGHT.md](COPYRIGHT.md)，进一步使用请联系课程组确认。

MuJoCo、Three.js、KaTeX、Marked、DOMPurify 及其资源属于各自权利人，按各自许可证提供，见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) 和 [licenses/](licenses/)。模型资料库按每组 `SOURCE.md`、`LICENSE` 保留原作者、固定来源与许可，不因本项目的版权声明改变。学生添加的 CAD／STL、题图、教材内容及其他素材，须确认使用与再分发权限，并保留来源。教学仿真结果需经力学核对，不作为工程安全认证。
