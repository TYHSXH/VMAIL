# 例7-1 曲柄滑块速度验证

## 真实问题

曲柄 OA 以恒角速度 ω 逆时针转动，通过连杆 AB 带动滑块 B 水平运动。本任务只根据题目给出的模型、尺寸和运动要求建模，不把图片中解答部分的结果写入任务。

## 给定条件

- 曲柄长度 OA = r = 0.5 m。
- 连杆长度 AB = √3r = 0.8660254 m。
- 曲柄逆时针恒速转动。
- 目标位置为 θ = 60° = 1.047198 rad。

## 简化假设

- 机构在水平 x-y 平面内运动，忽略重力和摩擦。
- 曲柄和连杆只保留维持 MuJoCo 数值稳定所需的小质量。
- 高增益速度执行器使曲柄角速度接近设定值；验证时以实际记录的曲柄角速度为准。

## 网页操作

1. 在“控制”页把 constant_speed_drive 设为便于观察的正值，例如 1 rad/s。
2. 点击“开始”，在曲柄转角接近 1.047198 rad 时暂停。
3. 记录 joint.crank_hinge.velocity、joint.slider_x.velocity 和 body.connecting_rod.velocity.wz。
4. 滑块速度大小取 joint.slider_x.velocity 的绝对值。连杆绕 +z 的角速度为正，表示逆时针；负值表示顺时针。
5. 用实测 ω 计算 |v_B|/(ωr) 和 ω_AB/ω，再与待验证的教材结果比较。

## 观察量

- joint.crank_hinge.position：曲柄转角 θ，单位 rad。
- joint.crank_hinge.velocity：曲柄实际角速度，单位 rad/s。
- joint.slider_x.velocity：滑块 B 的水平有向速度，单位 m/s。
- body.connecting_rod.velocity.wz：连杆 AB 绕 z 轴的有向角速度，单位 rad/s。

## 结果解读

任务不预置题目答案。应先从 θ≈1.047198 rad 附近的网页数据计算两个无量纲比值，再独立判断数据是否支持教材解答。
