# 任务包规范与载荷参考

从零创建或重写模型时，使用本文“默认 XML 模板”中的代码；经课程组许可的课程任务将 `assets/logos/logo-black.png` 复制为任务内的 `assets/logo-black.png`，再替换示例物体并保留居中 Logo 地面。不要跨任务目录引用资源。

**模板 XML 代码采用 [Apache-2.0](../LICENSE)，Logo 图像不在该许可内：保留全部权利，不予公开授权，禁止商用。** 未取得 Logo 的单独书面许可时，应改用自有素材或移除 Logo 纹理／材质引用，保留普通地面；本规范中的保留 Logo 要求只适用于已获许可的课程任务。分发可授权的独立模板时保留 `LICENSE`、`NOTICE` 和 `COPYRIGHT.md`；网页下载同时附带 `assets/LOGO_RIGHTS.txt`，可下载不构成 Logo 使用授权。学生作品不适用平台 Apache-2.0，第三方模型保持原许可，完整范围见 [COPYRIGHT.md](../COPYRIGHT.md)。

VMAIL 的核心不是预置很多模型，而是定义一种稳定的“学习任务包”。只要 AI coding 工具生成的任务包符合这个规范，网页实验台就能读取、展示参数、运行 MuJoCo 仿真并保存结果。

- [目录结构](#目录结构)
- [默认 XML 模板](#默认-xml-模板)
- [.local/tasks/manifest.yaml](#localtasksmanifestyaml)
- [task.yaml](#taskyaml)
- [model.xml](#modelxml)
- [parameters.yaml](#parametersyaml)
- [observe.yaml](#observeyaml)
- [ui.yaml](#uiyaml)
- [实时仿真与批量实验](#实时仿真与批量实验)
- [可选 Python 脚本](#可选-python-脚本)
- [notes.md](#notesmd)
- [闭环约束力与关节控件](#闭环约束力与关节控件)
- [任务载荷与控制规律](#任务载荷与控制规律)

## 目录结构

```text
.local/tasks/
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

AI coding 工具还必须读取 `docs/task-rules.md`。该文件是任务目录的工作约定，规定了命名、验证、脚本安全和结果保存方式。

## 默认 XML 模板

从零创建或重写 XML 时，将下面代码保存为 `.local/tasks/<task_id>/model.xml`，把项目根目录的 `assets/logos/logo-black.png` 复制为该任务的 `assets/logo-black.png`。示例球体只是占位对象，可替换为实际机构；保留 floor、logo 纹理及材质，随模型尺度调整地面尺寸，使黑色标志居中，保持 `texrepeat="1 1"`，不平铺为小图标。网页统一以低透明度贴花呈现 Logo，使其隐约可见并融入地面；不通过降低地面本身的透明度实现。原生 MuJoCo 查看器按 XML 材质渲染，外观可能不同。

该模板与本规范整合维护，不另设模板文件夹。它只是模型起点，还需按 `docs/task-rules.md` 补齐任务配置、参数、观测、界面和学习说明，再登记任务索引并验证。帮助中的下载入口使用本段代码和现有 logo 自动打包。

网页中的任务仿真和模型预览共用 `FloorBranding`：黑色 Logo、透明度 `0.1`、单个居中贴花，地面保持不透明。新建任务、AI 创建任务和模板下载均使用黑色 Logo；已有灰色 Logo 任务仍可加载，网页显示也统一使用黑色水印。

AI 创建时会检查 `floor` 是 `worldbody` 下的静态 `plane`，地面及 `buaa_floor` 材质的 alpha 为 `1`，Logo 不平铺。`0.1` 仅用于网页水印材质，不能写成地面或 XML 材质的 alpha；不要额外建立贴花或重复地板。校验失败会将具体原因返回助手自动修复。

<!-- VMAIL_BUAA_DEFAULT_XML_BEGIN -->
```xml
<mujoco model="vmail_buaa_default">
  <!-- VMAIL-BUAA | BUAA 5系 理论力学课程组 | https://github.com/TYHSXH/VMAIL -->
  <compiler angle="radian"/>
  <option timestep="0.002" gravity="0 0 -9.81"/>
  <asset>
    <!-- Keep this relative asset path when copying the template into a task. -->
    <texture name="buaa_logo" type="2d" file="assets/logo-black.png"/>
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

## .local/tasks/manifest.yaml

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

`manifest.yaml` 是所有任务共用的全局索引，所以位于 `.local/tasks/` 根目录。它不属于 `example_mass_spring` 或其他单个任务，也不应复制到任务子目录中。

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

**一个参数可以联动多个 MJCF 属性。** 将 `mjcf` 写成列表即可；原来的单对象写法继续有效。每个目标可选 `value`：省略时直接使用该参数值；填写时支持数字、引用任意已声明参数的数学表达式，以及由数字／表达式组成的向量列表。向量必须使用 YAML 列表，不能写成包含多项的空格字符串。

例如，改变杆长时，同时调整杆件尺寸、质心位置和末端连接点：

```yaml
parameters:
  length:
    label: 杆长
    value: 1.0
    unit: m
    min: 0.2
    max: 3.0
    step: 0.1
    mjcf:
      - tag: geom
        name: rod_geom
        attribute: size
        value: ["length / 2", 0.03, 0.03]  # box 的半长、半宽、半高
      - tag: geom
        name: rod_geom
        attribute: pos
        value: ["length / 2", 0, 0]
      - tag: body
        name: rod_tip
        attribute: pos
        value: [length, 0, 0]
```

表达式在“应用参数并重载模型”时统一计算，网页与后台使用相同结果；可以引用其他参数的新值，计算不依赖参数的书写顺序。支持 `+ - * / **`、括号、`pi`、`e` 及载荷表达式的数学白名单函数（如 `sqrt`、`sin`、`cos`），不执行 Python 代码，不支持时间 `t`、关节状态 `q/v` 或表格信号。每个参数最多 128 个映射目标，每个向量最多 16 项；目标不存在、表达式非法或结果非有限数字会明确报错。

目标属性的单位、向量长度和物理意义仍须符合 MJCF。改变几何尺寸不会自动保证所有约束、惯量和载荷正确：使用 MJCF 根据几何体自动推算惯量时可保留其推算；显式给定惯量、连接位置或碰撞参数时，按实际模型补齐相关映射。不要把同一个属性交给多个参数重复覆盖。

```yaml
initial_state:
  joint: slide_x
  field: qpos
```

这会设置关节初始广义坐标。`field` 也可以是 `qvel`，表示初始广义速度。

`initial_state` 也支持 1–128 个目标组成的非空列表。每个目标可填写标量 `value` 数字或静态数学表达式，引用任一参数的新值；省略 `value` 时使用所属参数值。表达式采用与 MJCF 参数映射相同的数学白名单，不支持时间、状态或脚本。网页和后台先统一求值，再设置初态；同一关节同一字段不可重复设置。例如单个转速参数同时初始化多个相容关节：

```yaml
initial_state:
  - {joint: crank_hinge, field: qvel, value: crank_speed}
  - {joint: rod_hinge, field: qvel, value: "-crank_speed"}
  - {joint: orbit_hinge, field: qvel, value: "-2 * crank_speed"}
  - {joint: roll_hinge, field: qvel, value: "4 * crank_speed"}
```

以上系数仅适用于对应拓扑和图示初态，须由实际机构运动学推导；改变初始姿态后不能直接沿用这些系数。

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

浏览器载入任务后默认暂停。学生应用参数，再调整关节或拖动准备实际起点，从 t=0 运行至 `simulation.duration` 自动暂停后，可选择导出本次网页 CSV 或后台原生 MuJoCo 重算。同次实验使用相同 `simulation.timestep`；原“批量计算”按钮现称“后台重算”。

网页记录实际起始积分状态和运行中执行器控制变化。重算请求携带该记录、当次实际参数／时长／步长及采样步；后台检查模型、资源、观测和载荷的校验标识，恢复起点并按原采样步输出。鼠标拖动用于准备姿态，路径不进入实验时间。后台不从结束姿态开始，不使用导出时刚改的新参数替换本次条件。结果及 `experiment.json` 一起保存；网页曲线保留。两端不存在后台天然更准确的关系，见[计算与导出说明](user-guide.md#网页计算后台重算与实验导出)。

## 可选 Python 脚本

网页中需要时变外力／力矩、分段输入、表格插值或关节反馈时，优先使用可选的 **loads.yaml**，详见 [载荷与控制规范](#任务载荷与控制规律)。网页实时、单步和后台批量计算使用相同定义；载荷输出自动记录并生成曲线。参考完整任务 `course_resources/tasks/course_team/rotating_load_demo/`。

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

## 任务载荷与控制规律

在任务文件夹中新建可选文件 `loads.yaml`。网页实时仿真、单步与后台批量计算均读取它。只需修改任务文件，不需要为每个任务编写网页或后端。

可直接复制 `course_resources/tasks/course_team/rotating_load_demo/` 作为起点，并更新任务 id、标题和 manifest 索引。

### 给 AI 的创建提示

> 请按 docs/task-rules.md 和 docs/task-package-spec.md 创建 VMAIL 学习任务。将模型结构写入 model.xml，将载荷规律写入 loads.yaml，将可调幅值、频率等写入 parameters.yaml（含中文名称、单位和范围）。明确力的作用点、方向参考坐标系、力与力矩的单位。不要修改公共前后端，不要依赖网页执行 Python。配置运动观测与曲线，说明简化假设，并运行 backend.validate_task 及完整时长的计算，检查公式与仿真是否稳定。

### 配置结构

```yaml
version: 1
loads:
  - id: drive
    label: 驱动力矩
    type: joint
    joint: crank_hinge
    unit: N·m
    value: "amplitude*sin(2*pi*frequency*t)"
```

`amplitude`、`frequency` 须在 `parameters.yaml` 中定义。网页修改参数并应用后，两端重新编译相同控制定义。`id` 唯一，只能用小写字母开头的小写字母、数字和下划线，最多 48 字符；每任务最多 32 条载荷。未知字段会报错。

#### 关节载荷

`type: joint` 直接施加广义力，不设置关节位置或目标速度。

- `joint`：已命名的 slide 或 hinge 关节。
- `unit`：slide 必须为 `N`，hinge 必须为 `N·m`。
- `value`：数字、表达式或表格。
- 正负号遵循 XML 的关节正方向；同一关节的多条载荷相加。

#### 执行器输入

```yaml
version: 1
loads:
  - id: speed_command
    label: 变速输入
    type: actuator
    actuator: crank_speed
    unit: rad/s
    value: "where(t < 2, 0.5*t, 1)"
```

输入单位取决于 XML：速度执行器设置目标速度，位置执行器设置目标位置，motor/general 的 gear 与增益也影响输入含义。不能把所有 `ctrl` 都当成实际力矩。

自动输入每步覆盖该执行器的手动值，网页对应滑块禁用；其余执行器仍可手动调节。同一执行器只允许一条自动规律。配置了 `ctrllimited` 时自动输入被限制在 `ctrlrange`，曲线记录限制后的输入；实际关节驱动力需另行观测。

任务中仅用于规定转速／位置的内部运动驱动，可在 `ui.yaml.controls.actuators.<执行器名>` 设置 `show_load: false`。它保留完整控制与物理计算，但不显示该执行器的外载荷箭头。例7-1的 `constant_speed_drive` 和例7-10的 `crank_speed` 均采用此设置。其他显式外载荷、鼠标拖拽仍可显示；默认不隐藏未分类执行器。

#### 指定作用点的外力与力矩

```yaml
version: 1
loads:
  - id: tip
    label: 杆端外力
    type: wrench
    site: point_b
    frame: world
    force: ["amplitude*cos(omega*t)", "amplitude*sin(omega*t)", 0]
    torque: [0, 0, "moment*sin(2*pi*t)"]
```

- 必须且只能填写 `site` 或 `body`，目标必须存在且不属于 world。
- `force: [Fx, Fy, Fz]`，单位 N；`torque: [Mx, My, Mz]` 是额外力偶，单位 N·m。至少设置其中一项，省略项为零。
- `frame: world`（默认）：分量以世界坐标系表达。
- `frame: body`：分量以所属刚体坐标系表达，随物体旋转；不是 site 的局部坐标系。
- `site`：力作用于该点。不能另设 point。
- `body`：不设 point 时作用于质心；可设置 `point: [0.5, 0, 0]`，表示相对刚体原点的物体局部坐标，单位 m，随物体运动。point 为三个固定数值。
- 系统将力转为世界坐标，并自动添加 `(作用点−质心) × F`。多条空间载荷叠加，不会互相覆盖。

改变方向可直接令三个分量随时间变化。例如 `F(t)=20+10*sin(2*pi*t)`、`theta(t)=pi*t/2` 可展开为 `Fx=(20+10*sin(2*pi*t))*cos(pi*t/2)`、`Fy=(20+10*sin(2*pi*t))*sin(pi*t/2)`。

### 信号表达式

表达式用字符串表示，建议始终加引号。角度全部使用 rad，时间使用仿真时间 s，不使用电脑时钟。

| 内容 | 语法 |
| --- | --- |
| 时间与常数 | `t`、`pi`、`e` |
| 任务参数 | 参数键，如 `amplitude`、`frequency` |
| 运算 | `+ - * / **`、括号；幂为 `**`，不是 `^` |
| 比较与逻辑 | `< <= > >= == !=`、`and`、`or`；比较请拆成 `t >= 1 and t < 2` |
| 三角函数 | `sin cos tan asin acos atan`（一个参数），`atan2(y,x)` |
| 其他函数 | `sqrt log exp abs floor ceil`（一个参数） |
| 范围函数 | `min(a,b)`、`max(a,b)`、`clamp(x,lo,hi)` |
| 条件函数 | `where(condition, yes, no)`，只计算被选中的分支 |
| 阶跃与斜坡 | `step(x)` 在 x≥0 时为1，否则0；`ramp(x)=max(0,x)` |
| 关节反馈 | `q('joint_name')` 位置、`v('joint_name')` 速度，仅 hinge/slide |

转动反馈为 rad、rad/s，滑动反馈为 m、m/s。`t/pi/e` 和函数名为保留标识符，不要作为需要在公式中引用的参数名。

示例：

```yaml
value: "where(t < 1, 0, where(t < 3, 5, 0))"
# 限幅 PD：kp、kd、target 在 parameters.yaml 中定义
value: "clamp(kp*(target-q('hinge'))-kd*v('hinge'), -10, 10)"
```

每个表达式最多 512 字符、256 个语法节点。不支持赋值、循环、数组访问、属性访问、导入、任意代码或其他变量。服务端生成受限指令树供两端计算，不使用 eval。公式量纲由任务作者负责；框架检查直接关节载荷单位，不自动推导整条公式的量纲。

#### 表格插值

```yaml
value:
  table: [[0, 0], [1, 3], [2, 3], [3, 0]]
```

时间必须严格递增，包含 2–256 个点，数值必须有限。相邻点线性插值，时间范围外保持首尾值。需要突变时使用 where 或 step，不用重复时间点。

### 更新、暂停与数据

“参数与控制”页下方以数学公式显示载荷，并按设定时长预计算完整加载曲线。预计算使用独立 MuJoCo 数据，不改变当前实验或录制状态；改变时长、应用参数或调整起始姿态后会更新。包含关节反馈、物体坐标系或偏心力矩时，曲线由预测运动求得，手动操作和后续输入变化可能让实际曲线不同。“数据”页显示实际仿真时间下的加载记录。复杂模型预计算可能耗时，计算期间仍可操作页面。

任务和模型预览工具栏均提供“外载荷、惯量、质心、关节轴”：

- 仅显示脚本配置、控制量及手动拖动施加的外载荷，不显示重力、接触／约束反力或合力。绿色箭头表示脚本／控制施加的力，从真实作用点出发；紫色弧形箭头按右手方向表示额外力偶。偏心力已经在作用点画出，不重复将其质心力矩画成一份额外力偶。
- 手动拖动使用半透明灰色连接箭头：起点每帧由物体当前姿态计算，末端在鼠标的三维目标位置（鼠标射线与拖拽平面的交点）。长度就是这两点之间的距离，表示拖拽意图，不按 N 缩放；实际拖拽力仍由弹簧、阻尼与限幅计算。松开鼠标后消失。
- 关节驱动显示等效广义力／力矩，包含执行器实际产生的广义力，不把位置或速度指令误认为力。绿色箭头长度按当前场景自适应，紫色弧线大小为示意；分析数值请看曲线与单位。
- “惯量”显示由主惯量和质量换算的等效均匀惯量盒，按实际惯性坐标系放置；黄色点标记每个刚体质心，蓝色箭头标记转动／滑动关节正方向。柔性内部节点不生成这些刚体辅助图形。

显示方式参考 [Attic Viewer](https://github.com/Atticlmr/attic_viewer) 的独立物理辅助图层组织；本项目辅助几何直接由 MuJoCo 编译模型与当前状态生成。

- 在每个物理步开始时，按当前 t、q、v 计算载荷。当前实现采用步间零阶保持，包括 RK4：控制规律不在 RK4 内部子阶段重新求值。高频或刚性反馈请减小步长、限制增益，并检查步长收敛。
- 记录数据前，在该样本的 t、q、v 处重新计算载荷并刷新派生量，确保曲线上的载荷值与该时间戳相符。
- 暂停不会推进控制时间；拖动／关节姿态准备阶段清除外载荷且不记录。点击开始后从 t=0 加载。重置恢复初始状态和 t=0；批量计算始终从任务初始状态开始。
- 每条载荷自动记录数据并生成图表，不需要重复写入 observe.yaml。也可以在 ui.yaml 的 charts 中明确引用下表字段。

| 类型 | 输出字段 | 单位／含义 |
| --- | --- | --- |
| joint | `load.<id>.value` | N 或 N·m，本条广义力 |
| actuator | `load.<id>.value` | 声明的输入单位，限幅后的指令 |
| wrench | `load.<id>.fx/fy/fz` | N，世界坐标分量 |
| wrench | `load.<id>.tx/ty/tz` | N·m，关于目标刚体质心，包含偏心力矩 |

输出为各条载荷的贡献，不包含重力、接触、阻尼或其他载荷。多个 load 的贡献在物理计算时相加。CSV 保留这些字段与单位；后台实验摘要同时保存载荷定义、参数和步长。

除零、超出函数定义域或非有限数值会停止计算，提示出错载荷与时间。请检查完整时长，不能仅验证 t=0。暂停后更正配置／参数并重载，或重置实验。

### 验证

```powershell
.\.venv\Scripts\python.exe -m backend.validate_task rotating_load_demo
```

校验会检查引用、字段、公式、限位单位，并短时运行。还应在网页运行完整时长，比较实时与批量结果。Python 离线脚本仍适用于超出此配置能力的算法，但网页不会自动执行脚本。
