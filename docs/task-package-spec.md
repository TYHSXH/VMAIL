# VMAIL Task Package Specification

VMAIL 的核心不是预置很多模型，而是定义一种稳定的“学习任务包”。只要 AI coding 工具生成的任务包符合这个规范，网页实验台就能读取、展示参数、运行 MuJoCo 仿真并保存结果。

## 目录结构

```text
tasks/
  manifest.yaml
  task_id/
    task.yaml
    model.xml
    parameters.yaml
    observe.yaml
    ui.yaml
    notes.md
    assets/
    results/
```

`task_id` 建议使用小写英文和下划线，例如：

```text
slider_crank_velocity
front_suspension_damping
robot_arm_endpoint_force
```

## tasks/manifest.yaml

网页通过这个文件发现任务。

```yaml
tasks:
  - id: front_suspension_damping
    title: 自行车前叉阻尼研究
    path: front_suspension_damping
    status: ready
    description: 改变刚度和阻尼，观察车轮竖直运动。
```

AI 每创建一个任务，都应当把它加入 `manifest.yaml`。

## task.yaml

描述学习问题和仿真设置。

```yaml
id: front_suspension_damping
title: 自行车前叉阻尼研究
question: 弹簧刚度和阻尼系数如何影响车轮竖直加速度？
simulation:
  engine: mujoco
  duration: 5.0
  timestep: 0.005
theory_topics:
  - 振动
  - 阻尼
  - 速度与加速度
```

好的 `question` 应当包含：研究对象、要改变的变量、要观察的结果。

## model.xml

MuJoCo MJCF 模型文件。其他配置文件会引用其中的 `body`、`joint`、`geom`、`site` 名称，所以命名应当清楚稳定。

推荐命名：

```text
body: slider, wheel, link_1
joint: slide_x, hinge_elbow
geom: slider_geom, wheel_geom
site: endpoint, mass_center
```

## parameters.yaml

定义网页中允许学生修改的参数。

```yaml
parameters:
  stiffness:
    value: 1000
    unit: N/m
    min: 100
    max: 5000
    step: 100
    description: 悬架弹簧刚度。
    mjcf:
      tag: joint
      name: suspension_slide
      attribute: stiffness
```

当前框架支持两类参数：

```yaml
mjcf:
  tag: geom
  name: slider_geom
  attribute: mass
```

这会在运行前修改 `model.xml` 中对应元素的属性。

```yaml
initial_state:
  joint: slide_x
  field: qpos
```

这会设置关节初始广义坐标。`field` 也可以是 `qvel`，表示初始广义速度。

每个参数建议包含：

- `value`
- `unit`
- `min`
- `max`
- `step`
- `description`

## observe.yaml

定义仿真时记录哪些物理量。

```yaml
observe:
  joints:
    - name: slide_x
      label: 滑块水平运动
      fields:
        - position
        - velocity
        - acceleration
        - force
  bodies:
    - name: slider
      label: 滑块刚体
      fields:
        - position
        - velocity
```

当前支持的 joint 字段：

- `position`
- `velocity`
- `acceleration`
- `force`

当前支持的 body 字段：

- `position`
- `velocity`

结果会保存到任务目录下的 `results/run_*/data.csv` 和 `results/run_*/curves.json`。

## ui.yaml

定义网页如何组织参数和曲线。

```yaml
layout:
  parameter_groups:
    - title: 物理参数
      parameters:
        - mass
        - stiffness
        - damping
  charts:
    - title: 位移
      series:
        - joint.slide_x.position
```

`series` 名称必须能对应 `observe.yaml` 产生的数据列。

浏览器使用官方 MuJoCo WebAssembly 运行时执行物理计算，并通过 WebGL 显示 `model.xml`。相机旋转、平移、缩放、动态刚体选择和三维外力拖拽是工作台的通用能力，不需要每个任务额外声明。`ui.yaml` 只负责参数分组和数据曲线；模型能否被拖动取决于刚体是否具有可运动自由度。

## notes.md

说明真实问题、简化假设、模型结构和理论力学联系。

建议包含：

```markdown
# 任务名称

## 真实问题
## 简化假设
## 模型结构
## 可改变参数
## 观察量
## 理论力学联系
## 结果解读建议
```

这份说明帮助学生理解“为什么这样建模”，而不是只看一个会动的图。
