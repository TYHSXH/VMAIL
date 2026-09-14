# VMAIL 学习任务创建规则

本文件适用于 `tasks/` 及其全部子目录。任何 AI coding 工具在这里创建或修改学习任务时，都必须遵守以下约定。

## 先明确学习问题

在写模型前，先从学生描述中确定：

1. 真实对象是什么。
2. 哪些量作为控制变量。
3. 哪些运动量、力或力矩作为观察结果。
4. 使用了哪些简化假设。

信息不足但不影响主体结构时，采用保守默认值并写入 `notes.md`；会改变模型拓扑或研究结论时，先向学生确认。

## 一个任务一个文件夹

在 `tasks/<task_id>/` 中创建任务。 `task_id` 只能使用小写英文字母、数字和下划线，并与 `task.yaml` 的 `id` 一致。

必须包含：

```text
task.yaml
model.xml
parameters.yaml
observe.yaml
ui.yaml
notes.md
```

可选包含：

```text
assets/                 mesh、纹理等模型资源
scripts/                Python 控制或批量研究脚本
results/                运行结果，不能作为模型输入
README.md               任务专用操作说明
```

不要在任务文件夹中复制全局 `manifest.yaml`。创建任务后，只在 `tasks/manifest.yaml` 中新增一条索引；更新已有任务时保留其他任务条目。

## 模型与参数

- `model.xml` 必须是可由 MuJoCo 编译的 MJCF。
- 被参数、观测量、执行器或脚本引用的 body、joint、geom、site、sensor 和 actuator 必须显式命名，并保持名称稳定。
- 学生需要比较的变量应写入 `parameters.yaml`，不要把关键变量只硬编码在 Python 脚本中。
- 每个参数必须声明 `unit`；无量纲参数使用 `unit: "1"`。
- `mjcf` 参数必须准确指向标签、名称和属性；初始状态使用 `initial_state`。
- `kp`、`kv`、阻尼、摩擦、质量等需要重新编译模型的参数，修改后由网页“应用参数并重载模型”生效。
- actuator 的运行时输入由网页“控制”页写入 `data.ctrl`；执行器应设置合理的 `ctrlrange`。
- 模型尺寸、质量、惯量、单位和关节范围必须物理合理。不要为了动画效果破坏量纲。

## 观测与界面

- 只在 `observe.yaml` 中声明本学习问题真正需要的量。
- 刚体上的固定研究点应在 `model.xml` 中定义为具名 `site`，再通过 `observe.yaml` 的 `sites` 声明 `position`、`velocity` 或 `acceleration`。可用 `components` 限定 `x/y/z`，当前坐标系必须写 `frame: world` 或省略。
- site 输出列遵循 `site.<name>.position.x`、`site.<name>.velocity.vx`、`site.<name>.acceleration.ax` 的命名方式。
- `ui.yaml` 中每条图线必须对应实际产生的数据列。
- 所有参数和输出数据必须有明确单位；不要在名称相同的列上自行改变框架规定的 SI 单位。
- 参数分组应使用学生能理解的中文标题，参数键保持简短稳定。
- `task.yaml.simulation.duration` 同时作为浏览器实时仿真和 Python 批量实验的默认时长；网页到达该时长后自动暂停。
- `task.yaml.simulation.timestep` 同时作为浏览器模型和批量实验的默认时间步长。

## 复杂控制脚本

需要随时间施加力、力矩、控制器或批量扫参时，可在 `scripts/` 中添加 Python 文件。脚本应：

- 从任务目录定位 `model.xml`，不依赖学生电脑的绝对路径。
- 使用官方 `mujoco` Python 包。
- 把外力/力矩写入 `data.xfrc_applied` 或 `data.qfrc_applied`，把执行器输入写入 `data.ctrl`。
- 将结果写入本任务的 `results/`，至少包含带表头和单位说明的 CSV。
- 在任务 `README.md` 或 `notes.md` 中写明运行命令和控制规律。
- 不修改框架公共代码，不自动安装额外软件，不执行网络请求。

网页不会自动执行任务内任意 Python 脚本。这样可以避免学生加载一个任务时运行未知代码。脚本由学生明确运行，或后续接入受控的实验运行接口。

## 完成前必须验证

运行：

```powershell
.\.venv\Scripts\python.exe -m backend.validate_task <task_id>
```

并确认：

- MuJoCo 能编译 `model.xml`。
- 所有参数引用和观测引用都存在。
- 所有参数均声明单位，site 观测引用的名称、字段和分量均能通过校验。
- 初始状态无穿透、爆炸或明显单位错误。
- 网页刷新后能出现任务，参数可重载，重置可恢复初始状态。
- 有 actuator 时，“控制”页能改变运动；没有 actuator 时不要虚构控制器。

不要通过删减验证规则、改动公共后端或伪造结果来使任务通过。
