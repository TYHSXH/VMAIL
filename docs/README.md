# 文档索引

[返回项目首页](../README.md)

| 文档 | 面向读者 | 内容 |
| --- | --- | --- |
| [系统使用手册](user-guide.md) | 学生与教师 | 安装、实验台操作、模型预览、结果导出、故障排查；系统“帮助”的正文 |
| [任务工作流](workflow.md) | 教师、学生与 AI | 真实问题如何转为学习任务，以及迭代流程 |
| [任务包规范](task-package-spec.md) | 任务作者与 AI | 文件职责、字段、单位、资源和校验要求 |
| [载荷与控制规范](load-controls.md) | 任务作者与 AI | loads.yaml 语法、表达式、作用点与数据字段 |
| [迁移测试](migration-check.md) | 教师与维护者 | 换电脑的拷贝内容、安装与验收步骤 |
| [开发维护](development.md) | 系统开发者 | 工程结构、构建命令、回归测试及运行文件维护 |

## AI 推荐阅读顺序

1. 修改学习任务：先读 [tasks/AGENTS.md](../tasks/AGENTS.md)，再读任务包规范及目标任务的 `notes.md`；需要载荷时再读载荷与控制规范。
2. 创建学习任务：结合[任务工作流](workflow.md)与[任务创建提示词](../prompts/student-task-builder.md)，在 `tasks/` 内完成并更新索引。
3. 修改公共系统：阅读开发维护与相关源码；用户可见行为同时更新使用手册。

## 就近保留的说明

- `tasks/<task_id>/notes.md`：任务学习正文，由网页直接读取。
- `tasks/<task_id>/README.md`：任务特有的补充资料。
- `model_library/README.md`、`AI_TASK_PROMPT.md`：素材检索与复用。
- `model_library/**/SOURCE.md`：对应资源来源和许可记录。
- 根目录 `README_EN.md`：英文入口；完整操作统一维护在中文使用手册中。
