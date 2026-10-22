# VMAIL Task Package Specification

从零创建或重写模型时，使用本文“默认 XML 模板”中的代码，并将项目根目录的 `assets/logos/logo-gray.png` 复制为任务内的 `assets/logo-gray.png`，再替换示例物体。保留地面中央的大号灰色 logo、纹理和材质；不要跨任务目录引用模板资源。平台与标志版权归 BUAA 5系 理论力学课程组，第三方模型保留自身来源与许可证。

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
    loads.yaml          # 可选：时变载荷、执行器输入、关节反馈
    assets/
    results/
```

`task_id` 建议使用小写英文和下划线，例如：

```text
slider_crank_velocity
front_suspension_damping
robot_arm_endpoint_force
```

AI coding 工具还必须读取 `tasks/AGENTS.md`。该文件是任务目录的工作约定，规定了命名、验证、脚本安全和结果保存方式。

## 默认 XML 模板

从零创建或重写 XML 时，将下面代码保存为 `tasks/<task_id>/model.xml`，把项目根目录的 `assets/logos/logo-gray.png` 复制为该任务的 `assets/logo-gray.png`。示例球体只是占位对象，可替换为实际机构；保留 floor、logo 纹理及材质，随模型尺度调整地面尺寸，使灰色标志居中且显眼，保持 `texrepeat="1 1"`，不平铺为小图标。

该模板与本规范整合维护，不另设模板文件夹。它只是模型起点，还需按 `tasks/AGENTS.md` 补齐任务配置、参数、观测、界面和学习说明，再登记任务索引并验证。帮助中的下载入口使用本段代码和现有 logo 自动打包。

<!-- VMAIL_BUAA_DEFAULT_XML_BEGIN -->
```xml
<mujoco model="vmail_buaa_default">
  <!-- VMAIL-BUAA | BUAA 5系 理论力学课程组 | https://github.com/TYHSXH/VMAIL -->
  <compiler angle="radian"/>
  <option timestep="0.002" gravity="0 0 -9.81"/>
  <asset>
    <!-- Keep this relative asset path when copying the template into a task. -->
    <texture name="buaa_logo" type="2d" file="assets/logo-gray.png"/>
    <material name="buaa_floor" texture="buaa_logo" texuniform="false"
              texrepeat="1 1" rgba="1 1 1 1" specular="0" reflectance="0"/>
  </asset>
  <worldbody>
    <light pos="0 -3 5" dir="0 0 -1" diffuse="0.8 0.8 0.8"/>
    <!-- A single large logo centered on the floor; do not tile the logo. -->
    <geom name="floor" type="plane" size="4 4 0.1" material="buaa_floor"/>
    <!-- Replace this demonstration body with the mechanism being studied. -->
    <body name="specimen" pos="0 0 0.8">
      <freejoint name="specimen_free"/>
      <geom name="specimen_geom" type="sphere" size="0.12" mass="1" rgba="0.8 0.3 0.12 1"/>
      <site name="specimen_center" size="0.01"/>
    </body>
  </worldbody>
</mujoco>
```
<!-- VMAIL_BUAA_DEFAULT_XML_END -->

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

`manifest.yaml` 是所有任务共用的全局索引，所以位于 `tasks/` 根目录。它不属于 `example_mass_spring` 或其他单个任务，也不应复制到任务子目录中。

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
    label: 刚度
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

每个参数必须包含 `unit`；无量纲参数写 `unit: "1"`。同时建议包含：

- `value`
- `label`：简短中文显示名称；内部参数键保持稳定。
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
  sites:
    - name: endpoint
      label: 连杆端点 P
      fields:
        - position
        - velocity
        - acceleration
      components:
        - x
        - y
      frame: world
```

当前支持的 joint 字段：

- `position`
- `velocity`
- `acceleration`
- `force`

当前支持的 body 字段：

- `position`
- `velocity`

当前支持的 site 字段：

- `position`
- `velocity`
- `acceleration`

`site` 必须对应 `model.xml` 中显式命名的 `<site>`，用于表示固定在某个刚体上的研究点。`components` 可选 `x`、`y`、`z`；省略时输出三个方向。`magnitude: true` 会额外输出对应位置、速度或加速度的 `magnitude` 列。当前 `frame` 只支持 `world`。

site 数据列命名如下：

```text
site.endpoint.position.x
site.endpoint.velocity.vx
site.endpoint.acceleration.ax
```

网页实时仿真和 Python 批量计算使用同一套名称及单位。平移位置、速度、加速度分别使用 `m`、`m/s`、`m/s²`；转动关节使用 `rad`、`rad/s`、`rad/s²`。数据页图例、实时值和 CSV 表头都会显示单位。

结果会保存到任务目录下的 `results/run_*/data.csv`、`curves.json` 和 `units.json`。`data.csv` 的每一列表头包含单位；`units.json` 提供机器可读的列名到单位映射。

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

实验台的“参数与控制”页上方列出：

- 类型为 `slide` 或 `hinge` 的一维关节，用于暂停后直接调整关节位置。

同一页下方列出模型中的 actuator（运行时输入 `data.ctrl`），以及 loads.yaml 定义的自动加载规律。

actuator 建议显式命名并设置合理的 `ctrlrange`。位置执行器的 `kp`、`kv` 等模型参数可以通过 `parameters.yaml` 指向 actuator 的 MJCF 属性，应用参数后重新编译生效。

可在 `ui.yaml` 中配置中文控制名、单位、默认输入与默认视角：

```yaml
controls:
  actuators:
    crank_speed:
      label: 曲柄角速度
      unit: rad/s
      value: -2
camera:
  position: [1, -0.15, 3.7]
  target: [1, 0.75, 0]
```

`value` 同时用于首次网页载入与没有显式覆盖值的 Python 批量计算。为 motor、general、非单位 gear 等控制声明真实单位，不要仅根据执行器名称猜测。网页会优先使用参数与观测项的中文 `label`；CSV 保留稳定字段名。

曲线按 `layout.charts` 分组；一个组内如果存在不同单位，会自动拆分为独立图。每张图都有时间横轴、物理量纵轴及单位，图下显示勾选开关和当前读数，悬停显示历史时刻的读数。

MJCF 的 include 与外部资源只允许引用本任务目录内文件（不能引用 results）。单次加载引用资源总量最多 128 MiB（134217728 字节），不计 XML 文本及未引用文件；同一文件的多处引用会重复计数。框架会解析 include 并把资源传给 Python 与浏览器 VFS。资源路径按主 model.xml 所在任务目录解析。校验器会实际编译模型并进行短时初始状态检查。

## 实时仿真与批量实验

浏览器载入任务后默认保持暂停。学生设置参数并点击“开始”后，网页从初始状态运行至 `simulation.duration` 并自动暂停；“计算并保存”的 Python 批量实验使用相同的时长。`simulation.timestep` 也同时用于浏览器模型和批量实验。

“导出当前数据”不重新仿真，它直接将浏览器当前曲线缓存下载为 UTF-8 CSV。“计算并保存”会从初始状态重新运行高采样率批量实验，请求会同时传递当前参数、时长、步长和所有按名称匹配的 actuator `ctrl` 值。后端会检查执行器是否存在以及控制值是否位于 `ctrlrange` 内。

## 可选 Python 脚本

网页中需要时变外力／力矩、分段输入、表格插值或关节反馈时，优先使用可选的 **loads.yaml**，详见 [载荷与控制规范](load-controls.md)。网页实时、单步和后台批量计算使用相同定义；载荷输出自动记录并生成曲线。参考完整任务 `tasks/rotating_load_demo/`。

超出标准载荷配置能力的算法、扫参或数据处理可增加 `scripts/`。脚本不是任务加载的必需文件，网页不会自动执行它。推荐：

```text
task_id/
  scripts/
    run_experiment.py
  results/
```

脚本使用相对路径读取 `model.xml`，将 `data.ctrl`、`data.xfrc_applied` 或 `data.qfrc_applied` 作为控制入口，并把结果写回本任务的 `results/`。

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

网页会渲染 `notes.md` 的标题、列表、表格、代码等 Markdown 格式；数学公式支持 `$...$`、`$$...$$`、`\(...\)`、`\[...\]`，以及标记为 `math` / `latex` / `tex` 的公式代码块。请把数学公式与程序代码、数据字段名称区分开。

## 闭环约束力与关节控件

observe.yaml 还可以通过 equalities 列表读取 MJCF 闭环 equality 约束的反力。条目使用 equality 名称，并在 fields 中声明 force。系统会产生 equality.名称.force.x、y、z 和 magnitude 四列；connect 约束的三个分量采用世界坐标系。

“参数与控制”页自动显示编译模型中的全部刚体转动、滑动关节，柔性顶点和节点的内部关节除外。`controls.joints` 旧名单不再用于隐藏关节。有限位关节遵守模型范围，无限位转动关节提供 0–360°（0–2π rad）设置。`controls.joint_note` 可以补充任务说明。

闭环机构调节关节时，网页固定学生选择的关节值，并根据 MuJoCo 的 equality 约束同步调整其他刚体转动、滑动关节，不推进仿真时间、不记录数据；无法满足约束的值会提示并恢复原姿态。旧 `controls.kinematic` 配置不再替换模型关节。恢复姿态返回任务的初始状态。
