# 柔性夹持器

- 类型：工程原理。真实设备模型表示模型对象来自真实设备，不表示已经过实测校准或工程认证。
- 建议入口：`gripper.xml`
- 适合研究：柔性结构变形；接触抓取；刚度与夹持稳定性。
- 上游目录：[固定版本](https://github.com/google-deepmind/mujoco/tree/91cc9e753d7e0747dff477c221b7566768bcbb4b/model/flex)
- 上游版本：`91cc9e753d7e0747dff477c221b7566768bcbb4b`
- 收录日期：2026-10-15
- 原许可证：Apache-2.0，已原样保存为 [LICENSE](LICENSE)。[上游许可证](https://github.com/google-deepmind/mujoco/blob/91cc9e753d7e0747dff477c221b7566768bcbb4b/LICENSE)
- 原始说明：[上游 README](https://github.com/google-deepmind/mujoco/tree/91cc9e753d7e0747dff477c221b7566768bcbb4b/model/flex)
- 文件状态：**XML 与配套文件资源已齐全，可整组复制**。
- 运行状态：已核对文件引用与资源哈希；未验证物理仿真或 VMAIL 浏览器兼容性。

## 已下载 XML

| 本地文件 | 原始文件 |
| --- | --- |
| [gripper.xml](gripper.xml) | [原文件](https://github.com/google-deepmind/mujoco/blob/91cc9e753d7e0747dff477c221b7566768bcbb4b/model/flex/gripper.xml) · [直接下载](https://raw.githubusercontent.com/google-deepmind/mujoco/91cc9e753d7e0747dff477c221b7566768bcbb4b/model/flex/gripper.xml) |
| [scene.xml](scene.xml) | [原文件](https://github.com/google-deepmind/mujoco/blob/91cc9e753d7e0747dff477c221b7566768bcbb4b/model/flex/scene.xml) · [直接下载](https://raw.githubusercontent.com/google-deepmind/mujoco/91cc9e753d7e0747dff477c221b7566768bcbb4b/model/flex/scene.xml) |

## 外部依赖

**VMAIL 接入提示（2026-10-16）：**原始 `gripper.xml` 包含 `scene.xml`，且 `flexcomp file="cap.obj"` 依赖 compiler 的网格目录。VMAIL 现已处理这类路径，可从模型预览的模型库下拉框直接加载。已通过 Python 与网页版同版 WASM 引擎的编译及短时仿真检查；原始 XML 保持不变。

配套资源已下载到原始相对路径，新增 1 个文件，合计 0.01 MiB。复制本目录的全部内容（包括 assets 和 LICENSE），不要只复制入口 XML。

文件引用已核对；原始 XML 未作修改。`dependencies.json` 列出引用，`resource_manifest.json` 记录下载来源、文件大小与 SHA-256。

## 转为学习任务

从本目录复制模型到 `tasks/<新任务ID>/`，补齐任务配置，并保留整个 assets 等资源目录。保留来源、版权与许可证。不要直接改动这份原始收录文件。参考资料库根目录的 AI_TASK_PROMPT.md。
