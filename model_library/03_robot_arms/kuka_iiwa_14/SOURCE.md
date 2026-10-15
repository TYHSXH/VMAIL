# KUKA iiwa 14 冗余机械臂

- 类型：真实设备。真实设备模型表示模型对象来自真实设备，不表示已经过实测校准或工程认证。
- 建议入口：`scene.xml`
- 适合研究：七自由度冗余；同一末端位置的不同关节姿态与能量。
- 上游目录：[固定版本](https://github.com/google-deepmind/mujoco_menagerie/tree/62ab00f2bc44f6f20c1c9b7a13f3fb1dd41a4e35/kuka_iiwa_14)
- 上游版本：`62ab00f2bc44f6f20c1c9b7a13f3fb1dd41a4e35`
- 收录日期：2026-10-15
- 原许可证：BSD-3-Clause，已原样保存为 [LICENSE](LICENSE)。[上游许可证](https://github.com/google-deepmind/mujoco_menagerie/blob/62ab00f2bc44f6f20c1c9b7a13f3fb1dd41a4e35/kuka_iiwa_14/LICENSE)
- 原始说明：[上游 README](https://github.com/google-deepmind/mujoco_menagerie/blob/62ab00f2bc44f6f20c1c9b7a13f3fb1dd41a4e35/kuka_iiwa_14/README.md)
- 文件状态：**XML 与配套文件资源已齐全，可整组复制**。
- 运行状态：已核对文件引用与资源哈希；未验证物理仿真或 VMAIL 浏览器兼容性。

## 已下载 XML

| 本地文件 | 原始文件 |
| --- | --- |
| [iiwa14.xml](iiwa14.xml) | [原文件](https://github.com/google-deepmind/mujoco_menagerie/blob/62ab00f2bc44f6f20c1c9b7a13f3fb1dd41a4e35/kuka_iiwa_14/iiwa14.xml) · [直接下载](https://raw.githubusercontent.com/google-deepmind/mujoco_menagerie/62ab00f2bc44f6f20c1c9b7a13f3fb1dd41a4e35/kuka_iiwa_14/iiwa14.xml) |
| [scene.xml](scene.xml) | [原文件](https://github.com/google-deepmind/mujoco_menagerie/blob/62ab00f2bc44f6f20c1c9b7a13f3fb1dd41a4e35/kuka_iiwa_14/scene.xml) · [直接下载](https://raw.githubusercontent.com/google-deepmind/mujoco_menagerie/62ab00f2bc44f6f20c1c9b7a13f3fb1dd41a4e35/kuka_iiwa_14/scene.xml) |

## 外部依赖

配套资源已下载到原始相对路径，新增 13 个文件，合计 4.77 MiB。复制本目录的全部内容（包括 assets 和 LICENSE），不要只复制入口 XML。

文件引用已核对；原始 XML 未作修改。`dependencies.json` 列出引用，`resource_manifest.json` 记录下载来源、文件大小与 SHA-256。

## 转为学习任务

从本目录复制模型到 `tasks/<新任务ID>/`，补齐任务配置，并保留整个 assets 等资源目录。保留来源、版权与许可证。不要直接改动这份原始收录文件。参考资料库根目录的 AI_TASK_PROMPT.md。
