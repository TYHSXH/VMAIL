# VMAIL 理论力学实验台

[简体中文](README.md) | [English](README_EN.md)

VMAIL 是本地运行的 MuJoCo 理论力学实验台，支持三维交互、参数与关节调整、载荷控制、运动曲线和批量实验。浏览器负责实时仿真，Python 后端负责读取任务和保存批量结果。

## 启动

项目仓库：[TYHSXH/VMAIL](https://github.com/TYHSXH/VMAIL)。已安装 Git 时，在准备存放项目的目录打开终端，执行：

```powershell
git clone https://github.com/TYHSXH/VMAIL.git
cd VMAIL
```

未安装 Git 时，可从仓库下载 ZIP 压缩包并完整解压。后续操作在克隆或解压得到的项目文件夹中进行。

1. 安装 64 位 Python（建议 3.12），并加入 PATH。
2. 首次保持联网，双击 `start.bat`（或在终端执行 `.\start.bat`），自动配置项目环境并打开浏览器。
3. 在左侧选择学习任务，设置参数后点击“开始仿真”。

服务地址：<http://127.0.0.1:8000>。学生无需安装 Node.js。完整安装、Conda 启动与操作步骤见[系统使用手册](docs/user-guide.md)，运行后也可点击顶部“帮助”。

## 文档入口

| 读者 / 目的 | 文档 |
| --- | --- |
| 学生：安装、界面操作、数据导出、常见问题 | [系统使用手册](docs/user-guide.md) |
| 教师 / AI：从真实问题创建任务 | [任务工作流](docs/workflow.md) · [AI 提示词](prompts/student-task-builder.md) |
| AI：修改任务前必须阅读 | [任务目录规则](tasks/AGENTS.md) |
| 任务配置字段与载荷语法 | [任务包规范](docs/task-package-spec.md) · [载荷与控制](docs/load-controls.md) |
| 开发者：目录、构建、校验、测试与维护 | [开发维护](docs/development.md) |
| 查找模型素材与来源 | [模型资料库](model_library/README.md) |

全部文档的组织方式见[文档索引](docs/README.md)。每个任务的 `notes.md` 是网页中的学习说明，资源的 `SOURCE.md` 保留来源与许可证信息。

换电脑前请阅读[迁移测试说明](docs/migration-check.md)，不要复制原电脑的 `.venv`。
