# 课程空间与资源共建

课程空间收录课程组及学生通过 GitHub PR 分享、经课程组审核合并的模型和完整任务。

## 浏览与复现

从任务主页或模型预览进入「课程空间」，切换模型库 / 任务库，按来源、分类或关键词查找。点击卡片可放大查看图片和介绍。

- 模型：选择 XML 入口后「添加并打开模型预览」。列表保存在当前浏览器，配套资源从本机课程原件读取；× 仅移除列表记录。
- 任务：「复现到学习任务」创建独立副本，保留模型、参数、观测和说明，不复制原作者的实验结果。重复添加打开已有副本；删除副本后可以重新复现。
- 合并 PR 并更新本机项目后，点击「刷新资源」即可读取新内容。

## 通过 GitHub 提交 PR

### PR 是什么？

PR 是 **Pull Request**，可以理解为“请课程组检查并收录我的作品”的申请。你先把作品放进自己账号下的项目副本，再向课程项目发起 PR；课程组能看到你新增了哪些文件、模型如何运行，并在同一页面与你讨论。审核通过并合并（Merge）后，这些文件才进入课程项目。

例如，张同学做好了一个双摆模型。创建 PR 后，课程组发现介绍中缺少单位，在 PR 下留言；张同学补上说明，再提交到同一分支，原 PR 就会更新。通过审核后，模型被合并，其他同学更新项目即可在课程空间看到它。

| 页面上的词 | 在本课程中的意思 |
| --- | --- |
| Repository / 仓库 | 保存整个 VMAIL 项目及其修改记录的地方 |
| Fork | 在自己 GitHub 账号下建立项目副本，你可以修改这个副本 |
| Branch / 分支 | 本次作品使用的一条独立修改记录，建议一个作品使用一个分支 |
| Commit / 提交 | 保存一次修改，并写一句说明 |
| Pull Request / PR | 把自己的修改交给课程组审核的申请 |
| Review / 审核 | 课程组检查作品，并提出修改意见 |
| Merge / 合并 | 课程组将通过审核的文件正式收进课程项目 |

Fork 只是建立副本，上传文件只是保存到自己的仓库；完成这两步后，还需要创建 PR，课程组才能处理收录申请。网页里的“复现”则是把已经收录的课程资源放进你的学习工作区，与提交 PR 是两个操作。

### 第一次提交：使用 GitHub 网页

这条路线适合文件较少的作品，不需要输入 Git 命令。先在本机完成模型或任务，并确认可以运行。

1. **登录并 Fork。** 注册、登录 GitHub，打开 [VMAIL 项目仓库](https://github.com/TYHSXH/VMAIL)，点击右上角 **Fork → Create fork**。完成后确认地址变成你自己的账号，例如 `你的账号/VMAIL`。
2. **为作品建分支。** 在自己的仓库点文件列表上方的分支选择器，以项目默认分支为起点，新建 `contribute/double-pendulum` 这样的分支。后续上传都选这个分支。已有 Fork 较旧时，先使用 **Sync fork** 同步课程项目的更新。
3. **按下面的目录准备文件。** 假设是 2026 届的双摆模型，目录可为 `course_resources/models/2026/mechanisms/double_pendulum/`，其中放 `resource.yaml`、XML、预览图、配套资源和许可证。完整任务放在 `course_resources/tasks/2026/` 下。年届目录决定网页来源，配置中的 `student_id` 和 `author` 决定提供者信息。
4. **上传并保存。** 在自己的分支进入 `course_resources/models/`，使用 **Add file → Upload files**，将本机准备好的 `2026` 目录拖入上传区，保留内部层级。任务同理上传到 `course_resources/tasks/`。检查上传路径是否重复了一层目录，再填写提交说明，例如“新增双摆模型与预览图”，保存提交。只上传本次作品，不上传整个项目或 ZIP 压缩包。上传操作参见 [GitHub 官方文件上传说明](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository)。
5. **创建 PR。** 点击 **Compare & pull request**；若没有这个提示，从课程仓库的 **Pull requests → New pull request → compare across forks** 进入。目标仓库（base）选 `TYHSXH/VMAIL` 及其默认分支；来源仓库（head）选 `你的账号/VMAIL`，比较分支选刚才的 `contribute/double-pendulum`。核对 **Files changed** 只有你打算分享的作品，填写标题、说明，再点 **Create pull request**。对应操作可参考 [GitHub 官方 Fork PR 指南](https://docs.github.com/en/pull-requests/how-tos/create-pull-requests/creating-a-pull-request-from-a-fork)。
6. **等待审核并修改。** PR 页面会保留讨论和审核意见。需要补充内容时，在自己的同一分支修改、提交即可，原 PR 会自动更新，通常不必重新建 PR。修改后在讨论区说明改了什么；最终由课程组审核合并。
7. **查看收录结果。** 状态变成 **Merged** 表示已经合并。其他同学仍需更新本机项目，再点课程空间的“刷新资源”，才会读取新文件。只刷新网页不会自动下载 GitHub 新内容。PR 的 **Closed** 若没有 Merged 标记，表示申请被关闭但没有收录。

GitHub 网页上传单个文件上限为 25 MiB，一次最多上传 100 个文件；资源较多时，使用 GitHub Desktop 或 Git 保留目录结构并上传，之后仍按第 5–7 步创建、跟进 PR。限制见上面的官方上传说明。若大网格无法上传，先与课程组讨论资源裁剪和存放方式。

### 文件较多时：使用 GitHub Desktop

先在 GitHub Fork，再用 GitHub Desktop 的 **Clone repository** 下载自己的 Fork。在 **Current branch → New branch** 新建作品分支，将本机验证好的作品文件夹复制到对应课程资源目录。检查 Changes 列表，只保留本次作品，填写 Summary 并 Commit，然后 Publish branch / Push origin 上传。最后回到 GitHub，按前面的第 5 步发起 PR。

不要将 `.venv/`、`node_modules/`、`.local/`、个人实验结果或 API Key 放进提交。第三方模型要保留原作者、来源和许可证，并在作品说明中写明你做了哪些改编。

### PR 说明怎么写？

提交时可按以下示例填写；项目也提供了可直接填写的 PR 模板。

```text
标题：[课程模型][2026届] 双摆初始角度对运动的影响

提供者：2026届-26001234-张同学
资源目录：course_resources/models/2026/mechanisms/double_pendulum/
学习问题：比较不同初始角度下双摆的运动。
资源内容：模型 XML、配套文件、预览图、参数与使用说明。
复现方法：在课程空间添加模型，选择 model.xml，点击运行。
验证结果：说明实际测试过的入口、条件和结果，并附截图。
来源与许可：说明是否原创；改编作品附原始来源和许可证。
```

### 资源目录与页面归类

```text
course_resources/
  models/
    course_team/<分类>/<模型>/resource.yaml
    2026/<分类>/<模型>/resource.yaml
  tasks/
    course_team/<任务>/task.yaml
    2026/<分类>/<任务>/task.yaml
```

第一层目录自动决定来源：`course_team` 显示「课程组」，`2026` 显示「2026届」。可继续添加子分类，无需维护课程索引。不完整任务包不会显示。

## 分享模型

每个目录包含 `resource.yaml`、XML、配套文件及许可证；推荐提供 `preview.png`、`preview.jpg` 或 `preview.webp`。

```yaml
title: 双摆的耦合运动
description: 比较初始角度对双摆运动的影响。
author: 张同学
student_id: "26001234"
category: 机构与振动
entries:
  - model.xml
```

XML 入口须在当前模型目录内，可配置多个入口。不写 category 则按中间文件夹层级分类；缺少图片时显示「暂无预览图」。网页不会执行模型内的 Python 脚本。

学生提供者按“来源-学号-姓名”显示，例如 `2026届-26001234-张同学`。`author` 只填写姓名，`student_id` 用引号包住以保留开头的 0；不要把年届和学号重复写进姓名。课程组资源显示“课程组”；历史资源缺少学号时保留已有姓名，不生成虚构学号。

课程组原有第三方模型以 `model_id` 引用 `model_library/catalog.json` 中的完整资源，避免重复存储网格和纹理；来源与许可证仍保留在 `model_library/`。学生新增模型直接放在自己的课程模型目录，无需修改全局 catalog。

## 分享完整任务

按 [任务创建指南](task-guide.md) 与 [任务包规范](task-package-spec.md) 提供 task.yaml、model.xml、parameters.yaml、observe.yaml、ui.yaml、notes.md 及附件。task.yaml 可添加 description、author、student_id、category；预览图命名与模型相同。资源必须自包含，不引用目录外的文件。

先通过课程空间复现任务，再运行 `.venv/Scripts/python.exe -m backend.validate_task <副本ID>`。不要提交个人结果、凭据或缓存。
