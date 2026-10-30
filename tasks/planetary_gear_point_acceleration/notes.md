# 例7-5 外啮合行星齿轮 M 点加速度

## 真实问题

定齿轮Ⅰ（半径 $r_1$，圆心 $O$ 固定、不转动）与动齿轮Ⅱ（半径 $r_2$，圆心 $A$）外啮合。杆 $OA$ 绕 $O$ 转动，在图示位置（$OA$ 沿 $y$ 轴）角速度为 $\omega_0$、角加速度为 $\alpha_0$。求动齿轮上 $M$ 点（$OA$ 延长线上、$AM=r_2$）的加速度。

## 简化假设

1. 机构为刚性平面机构，只在 $xOy$ 平面内运动，所有转动关节轴平行于 $z$ 轴。
2. 齿轮Ⅰ完全固定（挂 worldbody 内的静止刚体），不转动；齿轮Ⅱ与齿轮Ⅰ之间以“无滑移的纯滚动”约束替代真实齿廓接触。
3. 因为本题所求为纯运动学量，采用速度执行器直接规定 $\omega_{OA}$ 与 $\omega_{II}$，关闭重力、忽略摩擦与碰撞。质量与惯量只影响执行器所需力矩，不影响所求的运动量。
4. 纯滚动由驱动端保证：`crank_speed` 的目标为 $\omega_0+\alpha_0t$，`gear_speed` 的目标为 $k(\omega_0+\alpha_0t)$，其中 $k=(r_1+r_2)/r_2$ 由表达式引用参数，改变半径后自动跟随，不需要手工同步传动比。
5. 关节采用 `armature=0.02`（kg·m²）、速度伺服 `kv` 默认 15、步长 0.001 s。$kv/\text{armature}$ 过大会使显式积分失稳，增大 `kv` 时需注意曲线是否出现高频振荡；本任务把 `kv` 上界限制在 200。
6. `initial_state` 只能指定一个关节的初速度，故只给杆 `crank_hinge` 初速 $\omega_0$；动齿轮初速由 `gear_speed` 伺服在短时间内拉到 $k\omega_0$，起步瞬间啮合点速度短暂非零，之后进入稳态。因此理论对照请取 $t\gtrsim0.05$ s 之后的数据，并用 `site.point_p.velocity.magnitude` 确认约束已满足。

## 模型结构

- `gear1`（body，无关节，固定）：圆柱 `gear1_geom`，半径 $r_1$。
- `crank`（body，关节 `crank_hinge`，轴 $+z$，位于 $O$）：胶囊 `crank_geom` 表示杆 $OA$，长度由 $r_1+r_2$ 联动。
- `gear2`（body，关节 `gear_hinge`，轴 $+z$，位于 $A$；相对杆的位置为 $(0,\,r_1+r_2,\,0)$）：圆柱 `gear2_geom`，半径 $r_2$。
- 研究点用 site 表示（固定在动齿轮上的点必须用 site 追踪，不能用刚体观测代替）：
  - `point_m`：$M$，相对 $A$ 为 $(0,\,r_2,\,0)$
  - `point_a`：$A$，轮心
  - `point_p`：啮合点 $P$，相对 $A$ 为 $(0,\,-r_2,\,0)$，恒为齿轮Ⅱ的速度瞬心

## 运动学推导（关键）

齿轮Ⅰ固定，所以外啮合点 $P$ 是动齿轮Ⅱ的**速度瞬心**。

杆：

$$v_A=\omega_0 (r_1+r_2),\qquad a_A^n=\omega_0^2(r_1+r_2),\qquad a_A^t=\alpha_0(r_1+r_2)$$

齿轮Ⅱ的绝对角速度与角加速度：

$$k=\frac{r_1+r_2}{r_2},\qquad \omega_{II}=k\,\omega_0,\qquad \alpha_{II}=k\,\alpha_0$$

$\omega_{II}$ 与 $\omega_0$ **同号**（这是绝对角速度；相对杆则反向，注意区分）。

基点法求 $M$ 点加速度：

$$\vec a_M=\vec a_A+\vec a_{MA}^n+\vec a_{MA}^t,\qquad a_{MA}^n=\omega_{II}^2 r_2,\quad a_{MA}^t=\alpha_{II} r_2$$

在图示位置（$OA$ 沿 $+y$、$\vec{AM}=r_2\hat y$）取逆时针为正：

$$a_{Mx}=-(\alpha_0(r_1+r_2)+\alpha_{II}r_2),\qquad a_{My}=-(\omega_0^2(r_1+r_2)+\omega_{II}^2 r_2)$$

## 任意转角下的通用公式（按曲柄转角 θ 读数）

记曲柄转角 $\theta=q(\texttt{crank\_hinge})$，即杆 $OA$ 相对初始（$+y$）方向逆时针转过的角度，单位 rad（数据页“曲柄转角 θ”曲线，度的换算为 $\theta_{\deg}=\theta\cdot180/\pi$）。

单位方向向量

$$\hat e_r=(\cos\theta,\,\sin\theta),\qquad \hat e_t=(-\sin\theta,\,\cos\theta)$$

（$\hat e_r$ 由 $O$ 指向 $A$，$\hat e_t$ 为逆时针切向。）则

$$\vec a_A=\alpha_0 L\,\hat e_t-\omega_0^2 L\,\hat e_r,\qquad L=r_1+r_2$$

由于 $\vec{AM}=r_2\hat e_r$ 始终沿杆向外，

$$\vec a_{MA}=\underbrace{-\omega_{II}^2 r_2}_{\text{指向 }A\,\hat e_r\text{ 的反向}}\hat e_r+\underbrace{\alpha_{II} r_2}_{}\hat e_t,\qquad \vec a_M=\vec a_A+\vec a_{MA}$$

化为世界分量：

$$a_{Mx}=-\bigl[\alpha_0 L+\alpha_{II}r_2\bigr]\sin\theta-\bigl[\omega_0^2L+\omega_{II}^2r_2\bigr]\cos\theta$$

$$a_{My}=\bigl[\alpha_0 L+\alpha_{II}r_2\bigr]\cos\theta-\bigl[\omega_0^2L+\omega_{II}^2r_2\bigr]\sin\theta$$

合加速度大小与 $\theta$ 无关：

$$a_M=\sqrt{(\alpha_0L+\alpha_{II}r_2)^2+(\omega_0^2L+\omega_{II}^2r_2)^2}$$

$\theta=0$ 时退化为题目图示位置，即上文 $a_{Mx}=-(\alpha_0L+\alpha_{II}r_2)$、$a_{My}=-(\omega_0^2L+\omega_{II}^2r_2)$。**注意 $\theta=0$ 在仿真中只在一个瞬间出现，是瞬态，因此请用 $t>0.05$ s 后的数据按上式核验。**

## 可改变参数

| 参数 | 含义 | 默认 | 单位 |
| --- | --- | --- | --- |
| `radius_1` | 定齿轮Ⅰ半径 $r_1$ | 0.6 | m |
| `radius_2` | 动齿轮Ⅱ半径 $r_2$ | 0.4 | m |
| `omega_0` | 杆角速度 $\omega_0$ | 2.0 | rad/s |
| `alpha_0` | 杆角加速度 $\alpha_0$ | 1.0 | rad/s² |
| `crank_kv` | 杆速度伺服增益 | 15 | 1 |
| `gear_kv` | 齿轮Ⅱ速度伺服增益 | 15 | 1 |

## 观察量

- `joint.crank_hinge.position`：**曲柄转角 $\theta$（rad）**，随时间变化 $\theta=\omega_0t+\tfrac12\alpha_0t^2$，是数据页“曲柄转角 θ”图的横轴量
- `site.point_m.*`：$M$ 点的位置、速度、加速度（含合速度、合加速度大小）
- `site.point_a.*`：轮心 $A$ 的加速度（用于拆分 $\vec a_M=\vec a_A+\vec a_{MA}$）
- `site.point_p.velocity.*`：啮合点速度，应恒为 0，是“纯滚动约束是否满足”的直接检验
- `joint.crank_hinge.*`、`joint.gear_hinge.*`：$\omega_{OA}$、$\alpha_{OA}$、$\omega_{II}$、$\alpha_{II}$

## 理论力学联系

1. **速度瞬心法**：Ⅰ 固定 ⇒ 啮合点 $P$ 是Ⅱ的瞬心，$\omega_{II}=v_A/r_2$，一步得到 $k$。
2. **基点法**：$\vec a_M=\vec a_A+\vec a_{MA}^n+\vec a_{MA}^t$，其中 $a_{MA}^n=\omega_{II}^2 r_2$ 总指向 $A$、$a_{MA}^t=\alpha_{II} r_2$ 垂直于 $AM$。
3. **刚体上固连点**：$M$ 是齿轮Ⅱ上的固定点，不是轮心。$a_M\neq a_A$，也不能只观察刚体，必须用 site 追踪该固连点，这正是本题最容易被忽略的一步。
4. **传动比**：$k=1+r_1/r_2$ 只取决于半径比，$r_2$ 越小 $k$ 越大，$\omega_{II}$、$\alpha_{II}$ 与 $a_{MA}$ 各被放大。

## 数值对照示例（默认参数，$t=0$ 构形）

$r_1=0.6$，$r_2=0.4$，$\omega_0=2$ rad/s，$\alpha_0=1$ rad/s²：

- $k=(0.6+0.4)/0.4=2.5$
- $\omega_{II}=5$ rad/s，$\alpha_{II}=2.5$ rad/s²
- $a_{Mx}=-(1\times1.0+2.5\times0.4)=-2.0$ m/s²
- $a_{My}=-(4\times1.0+25\times0.4)=-14.0$ m/s²
- $|a_M|=\sqrt{4+196}\approx14.14$ m/s²

若把 $\alpha_0$ 改为 $-1$、或令 $\omega_0=0$，可分别单独检验切向项与法向项。

## 按转角读数的对照方法

1. 在“数据”页找到“曲柄转角 θ”曲线，读取某时刻 $t^*$ 的 $\theta^*$。
2. 用上面通用公式代 $\theta^*$ 得 $a_{Mx},a_{My}$（或直接看 $a_M$ 大小，它与 $\theta$ 无关）。
3. 若只想复现课本图示位置，可取仿真最早几个采样点（$\theta\approx0$）；但 $t$ 极小时伺服仍在建立稳态，推荐先看 $\theta$ 落在 $[0,\,0.2]$ rad 区间的数据，或把 $\omega_0$ 设小使 $\theta$ 增长缓慢。
4. 令 $\omega_0=0$（杆静止起步、只有角加速度）时，$\theta\approx\tfrac12\alpha_0t^2$ 增长很慢，可在较长时间内近似停留在图示位置构形，最接近课本原题条件。

## 验证方法与注意点

1. **约束检验**：`site.point_p.velocity.magnitude` 在稳态应接近 0。若明显非零，说明速度伺服没有跟上外啮合约束，此时应提高 `kv` 或减小步长。
2. **跟踪误差检验**：`joint.crank_hinge.acceleration` 与设定 $\alpha_0$ 的差异反映伺服刚度。`crank_kv`、`gear_kv` 从 5 到 200 各跑一次做对照：增益小时 $\alpha$ 有滞后与纹波，$a_M$ 曲线出现台阶或高频抖动；增益大时曲线更平滑。**与理论对照时应使用仿真实测的 $\dot\omega$，而非设定值 $\alpha_0$**，这样才能把“模型运动学”与“伺服跟踪”两类问题分开。
3. **随时间旋转**：$t>0$ 后杆已转过 $\theta=\omega_0 t+\tfrac12\alpha_0 t^2$，$\vec a_M$ 的方向随之旋转。逐时刻对照用上面的通用公式（含 $\theta$）；而 $a_M$ 的**大小**在 $\omega_0,\alpha_0$ 恒定时应为常值，可作为一条不依赖构形的检验。
4. **符号约定**：逆时针（绕 $+z$）为正。改变 $\omega_0$ 或 $\alpha_0$ 的符号时，分量符号随之改变；$a_{MA}^n$ 永远指向 $A$，不随符号翻转方向。
5. **几何限制**：齿轮为圆柱视觉几何，不模拟真实齿廓；啮合条件由驱动端保证，因此不研究齿面受力、齿根应力等问题。若要研究真实齿形接触与传动误差，需导入 STL 齿廓模型（见 `docs/mesh-modeling.md`），网页不能上传 STL。

## 结果解读建议

- 先看 $P$ 点速度是否为零，确认机构符合题意“Ⅰ 固定、外啮合无滑移”。
- 再把 $a_M$ 分解为 $a_A$（轮心，只由杆决定）与 $a_{MA}$（相对 $A$ 的转动效应），验证“固连点加速度 = 牵连 + 相对”的叠加。
- 改变 $r_2$：$k=1+r_1/r_2$ 下降，而 $a_{MA}^n=k^2\omega_0^2r_2$ 的变化不是单调的，可讨论“$r_2$ 增大时 $k$ 减小但力臂增大”的竞争关系。
- 改变 $r_1$：$k$ 线性增大，$\omega_{II}$、$\alpha_{II}$ 与 $a_{MA}$ 同步增大。
