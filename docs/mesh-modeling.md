# 复杂几何体与 STL／MJCF 建模指南

[项目首页](../README.md) · [任务包规范](task-package-spec.md) · [MuJoCo 官方建模教程](https://mujoco.readthedocs.io/en/stable/modeling.html)

## 什么时候需要自己建立模型

AI 可以辅助分析、写 MJCF 和检查错误，但无法仅凭一张题图可靠恢复尺寸、装配关系和接触形状。MuJoCo 的 box、sphere、capsule、cylinder 等基础几何体适合理想化模型；若孔洞、楔面、槽道、非规则轮廓或真实接触面影响研究结论，学生可能需要自行建立 CAD／STL 模型，再由 AI 辅助编写 MJCF。不要为凑出动画而改变实际自由度或约束。

先判断研究是否真的依赖外形。如果只研究铰接刚体的运动学，简单显示几何体配合正确关节、质心和惯量常常足够；若涉及接触、滚动或碰撞，实际碰撞几何体必须表达相关轮廓。

网页 AI 新建任务只接收基础 MJCF 与标准载荷，不能上传／生成 STL 或执行 CAD 工具。网格模型请在本地编辑器中整理为完整任务；已有任务的网页修改可以保留其已有资源引用，但不能补充缺失的二进制文件。

## 学生与 AI 的分工

1. 学生列出尺寸、单位、零件、关节位置、自由度、接触面、材料或质量数据和简化假设。缺少决定结果的条件时先补全，不让 AI 猜测。
2. 学生用自己熟悉的 CAD 工具建模，每个独立运动的刚体分别导出三角网格，保留原始 CAD 文件以便修改。
3. 导出**二进制 STL**；MuJoCo 也支持 OBJ。STL 不记录单位，必须说明导出坐标是米还是毫米。毫米模型通过 `scale="0.001 0.001 0.001"` 转为米。`body`、`joint`、`site` 的位置仍应使用米，不会跟着 mesh scale 自动换算。
4. 将资源放到 `tasks/<task_id>/assets/`，路径使用任务内相对路径，保持大小写一致，不引用其他任务、桌面或绝对路径。尽量减少无关细节和面数。
5. 学生与 AI 共同编写 `model.xml`：定义刚体层级、关节轴、质量／惯量、接触、驱动和观测点，补齐六个任务文件并更新 `tasks/manifest.yaml`。新建时复用[默认灰色 logo 模板](task-package-spec.md#默认-xml-模板)。
6. 编译、预览、短时仿真，再比较理论、实验或极限工况。每次只改一类内容，保留能运行的版本。

STL 只提供表面三角形，不包含关节、载荷、密度、质量、惯量或控制器。装配 CAD 直接导出一个 STL，通常也不会保留可运动的装配关系。

## 视觉外形与碰撞形状

MuJoCo 普通 mesh 的碰撞检测使用网格的**凸包**。一个带孔或凹槽的 STL 可以正确显示，但其凸包可能把孔封住、把槽填满。提高三角形精度无法解决这个问题。参见 [MuJoCo mesh 官方说明](https://mujoco.readthedocs.io/en/stable/XMLreference.html#asset-mesh)。

通常将完整外形作为只显示的 geom（关闭接触），再用多个基础形状或经 CAD／离线工具分解得到的凸网格构成碰撞体。每个凸块单独注册为 mesh 和 geom，保留实际需要的孔隙。不要通过随意增加焊接约束、阻尼或穿透来掩盖接触建模错误。

下面片段应合并进已有默认模板，不是完整任务。示例假设 `part_mm.stl` 以毫米导出，零件沿 body 局部 X 轴长 0.20 m、宽 0.04 m、厚 0.02 m；碰撞盒尺寸和均匀矩形体惯量仅作写法示范，实际零件必须重新计算：

```xml
<asset>
  <!-- 保留模板中已有的 logo texture 与 material -->
  <mesh name="part_visual" file="assets/part_mm.stl"
        scale="0.001 0.001 0.001"/>
</asset>
<worldbody>
  <!-- 保留模板中已有的 floor -->
  <body name="part" pos="0 0 0.3">
    <joint name="part_hinge" type="hinge" pos="0 0 0" axis="0 1 0"/>
    <!-- 示例质心位于铰点右侧 0.1 m，惯量以质心主轴计算 -->
    <inertial pos="0.1 0 0" mass="1"
              diaginertia="0.0001666667 0.0033666667 0.0034666667"/>
    <geom name="part_appearance" type="mesh" mesh="part_visual"
          contype="0" conaffinity="0" mass="0" group="2"
          rgba="0.45 0.55 0.65 1"/>
    <!-- box size 是半尺寸；该碰撞盒不适用于真实有孔／槽的零件 -->
    <geom name="part_collision" type="box" pos="0.1 0 0"
          size="0.1 0.02 0.01" mass="0" rgba="0.4 0.5 0.6 0.15"/>
    <site name="tip" pos="0.2 0 0" size="0.005"/>
  </body>
</worldbody>
```

不要在同一 XML 重复粘贴两个顶层 asset／worldbody 块；将子元素分别合并。STL 的原点和朝向须与示例 body 坐标一致，实际情况可通过 geom 的 `pos`／`quat` 调整。这里显式设置了整个 body 的质量和惯量，视觉体／碰撞体不重复贡献质量。若使用自动推断，请检查每个 geom 的质量／密度，避免视觉与碰撞几何体重复计入；质量与惯量应来自测量、CAD 或明确的理论近似。

## 任务结构与验证

```text
tasks/my_mesh_task/
  task.yaml
  model.xml
  parameters.yaml
  observe.yaml
  ui.yaml
  notes.md
  assets/
    logo-gray.png
    part_mm.stl
    collision_01.stl      # 按需添加，多个凸块分别引用
  SOURCE.md              # 外部资源的作者、来源、许可与修改情况
  LICENSE                # 按需保留上游许可证
```

```powershell
.\.venv\Scripts\python.exe -m backend.validate_task my_mesh_task
```

校验通过后回到网页刷新任务列表。先在暂停状态核对朝向、尺寸、关节轴和质心；再小步长短时间试跑，检查穿透、接触、速度和加速度数量级，最后才做完整实验和参数比较。所有模型引用资源总量受本系统 128 MiB 限制；简单减小面数常能降低加载和运行负担。

可直接交给本地 AI 的提示词：

```text
请阅读 tasks/AGENTS.md 和 docs/mesh-modeling.md。
我已将零件 STL 放入 tasks/my_mesh_task/assets/，尺寸单位为毫米。
零件原点、朝向、关节位置、质量与惯量分别为……。
研究重点是……，必须保留的接触面／孔槽是……。
请先检查条件是否足够，区分视觉 mesh 与凸碰撞体，协助编写 MJCF
和六个任务文件，保留默认灰色 logo 地面，登记索引并运行任务校验。
不要凭空编造二进制 STL、惯量或闭环约束；需要重新建 CAD 时请明确说明。
```

## 常见错误

| 问题 | 优先检查 |
| --- | --- |
| 零件大／小了 1000 倍 | STL 导出单位、mesh scale，以及关节／site 位置是否分别使用米 |
| 看得见孔却不能穿过 | 凸包碰撞；将相关凹形分解为多个凸碰撞体 |
| 出现 invalid header 或 STL 格式错误 | 是否误用了 ASCII STL；重新导出二进制 STL 或 OBJ |
| XML 能编译但运动明显不对 | 自由度、关节轴、质心惯量、驱动、接触和单位；编译成功不证明模型正确 |
| 任务缺少资源 | 复制整组 XML 与 assets，核对相对路径和大小写，禁止引用任务外文件 |
| 加载很慢或超限 | 减少面数、去掉无关资源、简化碰撞体，并核对 128 MiB 资源上限 |

学习入口：[官方建模教程](https://mujoco.readthedocs.io/en/stable/modeling.html)、[MJCF XML 参考](https://mujoco.readthedocs.io/en/stable/XMLreference.html)、[Python 接口](https://mujoco.readthedocs.io/en/stable/python.html)。本系统使用 MuJoCo 3.13.0，新特性请核对版本兼容性。外部 CAD、STL 和题图应保留来源及授权信息；AI 辅助生成的文件也需要学生检查并承担模型选择的责任。
