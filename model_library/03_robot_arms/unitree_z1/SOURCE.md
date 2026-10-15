# Unitree Z1 轻型机械臂

- 类型：真实设备。真实设备模型表示模型对象来自真实设备，不表示已经过实测校准或工程认证。
- 建议入口：`scene.xml`
- 适合研究：轻型机械臂惯性耦合；伸展和折叠姿态的驱动力矩。
- 上游目录：[固定版本](https://github.com/google-deepmind/mujoco_menagerie/tree/62ab00f2bc44f6f20c1c9b7a13f3fb1dd41a4e35/unitree_z1)
- 上游版本：`62ab00f2bc44f6f20c1c9b7a13f3fb1dd41a4e35`
- 收录日期：2026-10-15
- 原许可证：BSD-3-Clause，已原样保存为 [LICENSE](LICENSE)。[上游许可证](https://github.com/google-deepmind/mujoco_menagerie/blob/62ab00f2bc44f6f20c1c9b7a13f3fb1dd41a4e35/unitree_z1/LICENSE)
- 原始说明：[上游 README](https://github.com/google-deepmind/mujoco_menagerie/blob/62ab00f2bc44f6f20c1c9b7a13f3fb1dd41a4e35/unitree_z1/README.md)
- 文件状态：**XML 与配套文件资源已齐全，可整组复制**。
- 运行状态：已核对文件引用与资源哈希；未验证物理仿真或 VMAIL 浏览器兼容性。

## 已下载 XML

| 本地文件 | 原始文件 |
| --- | --- |
| [scene.xml](scene.xml) | [原文件](https://github.com/google-deepmind/mujoco_menagerie/blob/62ab00f2bc44f6f20c1c9b7a13f3fb1dd41a4e35/unitree_z1/scene.xml) · [直接下载](https://raw.githubusercontent.com/google-deepmind/mujoco_menagerie/62ab00f2bc44f6f20c1c9b7a13f3fb1dd41a4e35/unitree_z1/scene.xml) |
| [z1.xml](z1.xml) | [原文件](https://github.com/google-deepmind/mujoco_menagerie/blob/62ab00f2bc44f6f20c1c9b7a13f3fb1dd41a4e35/unitree_z1/z1.xml) · [直接下载](https://raw.githubusercontent.com/google-deepmind/mujoco_menagerie/62ab00f2bc44f6f20c1c9b7a13f3fb1dd41a4e35/unitree_z1/z1.xml) |
| [z1_gripper.xml](z1_gripper.xml) | [原文件](https://github.com/google-deepmind/mujoco_menagerie/blob/62ab00f2bc44f6f20c1c9b7a13f3fb1dd41a4e35/unitree_z1/z1_gripper.xml) · [直接下载](https://raw.githubusercontent.com/google-deepmind/mujoco_menagerie/62ab00f2bc44f6f20c1c9b7a13f3fb1dd41a4e35/unitree_z1/z1_gripper.xml) |

## 外部依赖

配套资源已下载到原始相对路径，新增 20 个文件，合计 11.69 MiB。复制本目录的全部内容（包括 assets 和 LICENSE），不要只复制入口 XML。

文件引用已核对；原始 XML 未作修改。`dependencies.json` 列出引用，`resource_manifest.json` 记录下载来源、文件大小与 SHA-256。

## 转为学习任务

从本目录复制模型到 `tasks/<新任务ID>/`，补齐任务配置，并保留整个 assets 等资源目录。保留来源、版权与许可证。不要直接改动这份原始收录文件。参考资料库根目录的 AI_TASK_PROMPT.md。
