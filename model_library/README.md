# MuJoCo 工程与机器人模型资料库

本目录收录 **25 组案例、60 个原始 XML 文件**，配套资源已补齐（359 个文件，约 182.7 MiB），供理论力学课程选题、阅读模型和借助 AI 制作学习任务使用。收录日期：2026-10-15。

模型来自 [MuJoCo 官方仓库](https://github.com/google-deepmind/mujoco) 与 [Google DeepMind MuJoCo Menagerie](https://github.com/google-deepmind/mujoco_menagerie)。每个文件使用固定提交版本下载，保持原始字节内容；每组保存对应原始 LICENSE、来源链接和文件依赖清单。这里没有修改模型，也没有把它们自动加入网页任务列表。

## 开始选题

1. 想从工程机构入手：先看曲柄滑块、牛顿摆、冰箱门与差速车；再看柔性悬臂梁、斗杆和绳轮。
2. 想研究真实机器人：从 UR5e / KUKA 的负载力矩、四旋翼推力分配、移动机械臂倾覆条件、夹爪夹持稳定性入手。
3. 想做进阶课题：柔性滑轮传动、四足接触力分配、双臂协同搬运。
4. 将某一组模型目录和 [给 AI 的任务提示词](AI_TASK_PROMPT.md) 一起交给 AI，再创建 `tasks/<task_id>/` 学习任务。

## 如何理解收录状态

### 整组复制示例：UR5e

将 `03_robot_arms/universal_robots_ur5e/` 目录中的内容复制到新的 `tasks/ur5e_payload/`。把入口 `scene.xml` 另存为任务必需的 `model.xml`，保留被引用的 `ur5e.xml`、整个 `assets/` 和 `LICENSE`。然后让 AI 按任务规范补齐配置与说明，并登记到任务索引。

```text
tasks/ur5e_payload/
  model.xml       ← scene.xml 的副本
  scene.xml
  ur5e.xml
  assets/         ← 保留全部相对路径
  LICENSE
  task.yaml
  parameters.yaml
  observe.yaml
  ui.yaml
  notes.md
```

只复制入口 XML 或把 assets 中的文件随意改名、移到其他层级，都会破坏引用。资料库每组的 SOURCE.md 会列出应选哪个入口。

### 资源与兼容性

- **整组复制**：XML 引用的网格、纹理等资源已补齐，并保留上游相对目录结构。创建任务时，复制选中模型目录的全部内容，包括 assets、XML 和 LICENSE；不要只复制 scene.xml。
- 每组的 `SOURCE.md` 中给出入口 XML、上游目录、许可证、适合研究的问题及资源状态。`dependencies.json` 给出每一条文件引用的来源链接；`catalog.json` 与各目录的 `resource_manifest.json` 另记录 XML / 资源的 SHA-256、大小和固定版本下载地址。
- XML 已逐个做语法解析，文件引用已核对，新增资源已与上游 Git 文件哈希核对；**没有运行仿真或验证网页兼容性**。柔性体和部分几何体尤其需要确认 VMAIL 的运行及渲染支持，必要时先用原生 MuJoCo。
- “真实设备”表示模型对应真实机器人；不代表经过实测标定、工业验证或安全认证。“工程原理”是机制与力学现象的演示模型，不应包装成已验证的真实工况。
- 各目录许可证不同，不要套用统一许可证。使用、改编和分发时保留原作者、版权、许可文本及来源说明。
- 已按课程需求移除五组需原生插件的案例，以及 Panda、Stretch、Spot 三组原先超限的案例。当前资源上限已提高到 128 MiB，未恢复已移除案例。柔性夹持器的 flexcomp 资源路径现已修复。2026-10-16：现有 28 个推荐入口均通过 VMAIL 资源准备流程后的 Python MuJoCo 编译；KUKA、Z1 和柔性夹持器通过同版 WASM 编译与短时仿真，其他案例尚未逐一验证浏览器交互。
- 不包含训练策略、控制脚本和插件二进制；当前收录案例没有声明必需的原生插件。
- 为课程中的常规 MuJoCo 使用，收录了所选模型目录中的非 MJX XML；省略 MJX 专用变体。

## 资源上限的含义

当前 VMAIL 后台限制的是**单次加载模型时，展开 include 后各 file 属性引用资源的字节总量**，上限为 128 MiB（134,217,728 字节）。网格、纹理等文件计入；XML 文本、说明、许可证及未引用文件不计入。同一文件被重复引用时，当前后台会重复计数。这是本项目的限制，不是 MuJoCo 对模型大小的统一限制。

`audit_resources.py` 可静态复核计数，结果见 `resource_limit_audit.json`。独立 XML 可能只是组合场景的组成部分，应优先使用 SOURCE.md 指定入口；本次未运行仿真。

## 模型目录

### 工程传动与接触机构

| 案例 | 类型 | 可研究的问题 | 文件状态 |
| --- | --- | --- | --- |
| [带接触与吸附的冰箱门机构](01_engineering_mechanisms/fridge_door/SOURCE.md) | 工程原理 | 门铰链力矩；吸附与接触；开门过程的约束和外力 | XML 与配套文件资源已齐全，可整组复制 |
| [多摆碰撞与牛顿摆](01_engineering_mechanisms/newton_cradle/SOURCE.md) | 物理原理 | 碰撞冲量、动量与能量传递；接触参数的影响 | XML 与配套文件资源已齐全，可整组复制 |
| [曲柄滑块传动](01_engineering_mechanisms/slider_crank/SOURCE.md) | 工程原理 | 位移、速度、加速度分析；机构传动和执行器负载 | XML 与配套文件资源已齐全，可整组复制 |

### 柔性结构、缆索与仿生传动

| 案例 | 类型 | 可研究的问题 | 文件状态 |
| --- | --- | --- | --- |
| [柔性工程机构：悬臂梁、斗杆与曲柄滑块](02_flexible_structures/flex_mechanisms/SOURCE.md) | 工程原理 | 悬臂梁振动；斗杆柔性变形；刚柔耦合曲柄滑块 | XML 与配套文件资源已齐全，可整组复制 |
| [柔性绳与滑轮系统](02_flexible_structures/flex_pulley/SOURCE.md) | 工程原理 | 绳轮接触；张力传递；柔性绳的几何约束与运动关系 | XML 与配套文件资源已齐全，可整组复制 |
| [柔性夹持器](02_flexible_structures/soft_gripper/SOURCE.md) | 工程原理 | 柔性结构变形；接触抓取；刚度与夹持稳定性 | XML 与配套文件资源已齐全，可整组复制 |
| [肌腱驱动双关节手臂](02_flexible_structures/tendon_arm/SOURCE.md) | 仿生原理 | 肌腱力臂与关节力矩；冗余驱动和力分配 | XML 与配套文件资源已齐全，可整组复制 |

### 工业机械臂与双臂系统

| 案例 | 类型 | 可研究的问题 | 文件状态 |
| --- | --- | --- | --- |
| [ALOHA 双臂操作系统](03_robot_arms/aloha/SOURCE.md) | 真实设备 | 双臂协同搬运；载荷分配与闭链约束 | XML 与配套文件资源已齐全，可整组复制 |
| [KUKA iiwa 14 冗余机械臂](03_robot_arms/kuka_iiwa_14/SOURCE.md) | 真实设备 | 七自由度冗余；同一末端位置的不同关节姿态与能量 | XML 与配套文件资源已齐全，可整组复制 |
| [xArm7 机械臂及夹爪](03_robot_arms/ufactory_xarm7/SOURCE.md) | 真实设备 | 抓取运动与接触力；末端质量对动态响应的影响 | XML 与配套文件资源已齐全，可整组复制 |
| [Unitree Z1 轻型机械臂](03_robot_arms/unitree_z1/SOURCE.md) | 真实设备 | 轻型机械臂惯性耦合；伸展和折叠姿态的驱动力矩 | XML 与配套文件资源已齐全，可整组复制 |
| [UR5e 工业机械臂](03_robot_arms/universal_robots_ur5e/SOURCE.md) | 真实设备 | 串联机构运动学；不同姿态下的重力力矩与负载能力 | XML 与配套文件资源已齐全，可整组复制 |

### 无人车与移动操作平台

| 案例 | 类型 | 可研究的问题 | 文件状态 |
| --- | --- | --- | --- |
| [差速驱动小车](04_mobile_robots/car/SOURCE.md) | 工程原理 | 差速转向、轮速合成；轮地摩擦与运动约束 | XML 与配套文件资源已齐全，可整组复制 |
| [Robot Soccer Kit 全向移动平台](04_mobile_robots/robot_soccer_kit/SOURCE.md) | 真实设备 | 全向轮速度合成；接触摩擦与转向；机器人碰撞 | XML 与配套文件资源已齐全，可整组复制 |
| [Stanford TidyBot 移动机械臂](04_mobile_robots/stanford_tidybot/SOURCE.md) | 真实设备 | 移动底盘与机械臂耦合；搬运时的稳定性与载荷 | XML 与配套文件资源已齐全，可整组复制 |

### 四旋翼无人机

| 案例 | 类型 | 可研究的问题 | 文件状态 |
| --- | --- | --- | --- |
| [Bitcraze Crazyflie 2 微型四旋翼](05_drones/bitcraze_crazyflie_2/SOURCE.md) | 真实设备 | 四旋翼升力和力矩合成；悬停平衡；姿态惯性响应 | XML 与配套文件资源已齐全，可整组复制 |
| [Skydio X2 四旋翼无人机](05_drones/skydio_x2/SOURCE.md) | 真实设备 | 旋翼推力分配；负载与惯量对俯仰、横滚响应的影响 | XML 与配套文件资源已齐全，可整组复制 |

### 四足、双足与人形机器人

| 案例 | 类型 | 可研究的问题 | 文件状态 |
| --- | --- | --- | --- |
| [Agility Cassie 双足机器人](06_legged_robots/agility_cassie/SOURCE.md) | 真实设备 | 腿部闭环连杆与弹性结构；步行能量与触地冲击 | XML 与配套文件资源已齐全，可整组复制 |
| [ANYmal C 四足巡检机器人](06_legged_robots/anybotics_anymal_c/SOURCE.md) | 真实设备 | 巡检机器人的越障与重心控制；多点接触力分配 | XML 与配套文件资源已齐全，可整组复制 |
| [官方简化人形机构](06_legged_robots/humanoid/SOURCE.md) | 工程原理 | 多刚体质心；关节力矩；平衡和落地冲击 | XML 与配套文件资源已齐全，可整组复制 |
| [Unitree G1 人形机器人](06_legged_robots/unitree_g1/SOURCE.md) | 真实设备 | 多刚体平衡；下蹲与起身的质心轨迹和地面反力 | XML 与配套文件资源已齐全，可整组复制 |
| [Unitree Go2 四足机器人](06_legged_robots/unitree_go2/SOURCE.md) | 真实设备 | 站立支撑多边形；腿部关节力矩与落地冲击 | XML 与配套文件资源已齐全，可整组复制 |
| [Unitree H1 人形机器人](06_legged_robots/unitree_h1/SOURCE.md) | 真实设备 | 人形机器人支撑平衡；腿部动力学与外力扰动 | XML 与配套文件资源已齐全，可整组复制 |

### 夹爪与灵巧手

| 案例 | 类型 | 可研究的问题 | 文件状态 |
| --- | --- | --- | --- |
| [Robotiq 2F-85 自适应夹爪](07_grippers/robotiq_2f85/SOURCE.md) | 真实设备 | 欠驱动夹持机构；接触顺序、夹紧力与物体稳定性 | XML 与配套文件资源已齐全，可整组复制 |
| [Shadow 灵巧手](07_grippers/shadow_hand/SOURCE.md) | 真实设备 | 多指关节与肌腱传动；抓取接触力和摩擦锥 | XML 与配套文件资源已齐全，可整组复制 |

