# 发布验收与交付说明

[项目首页](../README.md) · [开发维护](development.md) · [迁移说明](migration-check.md)

## 当前交付范围

本版本面向学生在 Windows x64 的个人电脑本机运行，验证基线为 64 位 x86 Python 3.12 与 MuJoCo 3.13.0。服务只监听 loopback，并核对客户端、Host 与同源 Origin；支持使用 VMAIL_PORT 修改端口。不是面向公网的多人托管服务。

学生不安装 Node.js；源码中随附 `app/` 构建产物、WASM、字体和品牌图片。安装和启动先检查 Vite 构建清单中的资源、版权文件、目录写入权限、固定 Python 依赖和原生引擎单步计算，发现缺失会报错。修改前端后必须重新构建再交付。

## 维护者每次发布前执行

在项目根目录：

```powershell
npm ci
npm test
npm run build
.\.venv\Scripts\python.exe -m unittest discover -s tests
.\.venv\Scripts\python.exe -m backend.validate_task
.\.venv\Scripts\python.exe -m backend.check_environment
.\.venv\Scripts\python.exe -m pip check
npm audit --omit=dev
```

构建时 MuJoCo 包的 Node `module` 分支 externalized 提示以及大 JS chunk 提示属于构建提醒；以构建退出码、实际浏览器加载和仿真结果判断是否可用。不要通过关闭测试或移除资源自检来掩盖失败。

`tests/test_release_http.py` 会用独立临时任务和对话数据库启动真实服务，检查每个构建资源可下载、WASM MIME、帮助文档、灰色 logo 模板、全部任务的模型准备／短时计算／CSV 下载、对话保存与单独删除、跨站和 DNS rebinding 拒绝。测试不修改学生的任务和聊天记录。

## 干净副本安装验收

按[迁移说明](migration-check.md)复制完整项目到包含中文和空格的新目录，排除原 `.venv`、开发依赖与私人数据。运行 `setup.bat` 或 `start.bat`，实际下载依赖、建立本机环境并自检。确认第一次安装成功、随后启动不重复安装、已有任务离线运行、自定义空闲端口启动和批量 CSV 下载。

推荐 Edge／Chrome 实测：加载任务、运行／暂停／重置、参数应用、关节调整、灰色地面、曲线和 CSV；打开模型库预览；在帮助中定位 STL 指南。AI 面板应能保存对话与图片，刷新／重启后恢复，新对话保留旧记录，删除单条不影响其他记录与任务；请求中断不应自动重放任务写入。

## 分发文件与个人数据

GitHub 发布时提交本次新增源文件、品牌资源、文档、测试和最新 `app/`（包括 `app/.vite/manifest.json`）。仅复制已有被跟踪文件会漏掉尚未提交的新功能，请发布前检查 `git status`。

运行包至少保留：`app/`、`backend/`、`assets/`、`docs/`、`prompts/`、`tasks/`、`model_library/`、`licenses/`、两个 README、`COPYRIGHT.md`、`THIRD_PARTY_NOTICES.md`、`requirements.txt`、`constraints.txt` 与全部安装／启动／卸载 BAT。许可证和模型 `SOURCE.md`、`LICENSE` 随资源一起分发；源码仓库另保留前端源码、测试与 npm 锁文件。

不要分发 `.local/`、`.venv`、`.venv.backup-*`、`node_modules`、缓存、个人 API Key 或个人实验结果。`.local/` 含加密密钥、明文对话／图片及任务修改备份，Git 忽略规则不能代替人工压缩包排除。学生原有任务与结果在更新前自行备份；不要用教师的任务目录无条件覆盖学生的自建任务。

## 本次检查记录

2026-10-22 首轮发布检查包含中文空格路径的无旧环境安装。实验导出更新后：Python 78 项检查中 77 项通过、1 项符号链接权限测试跳过；前端 43 项通过，5 个任务校验、构建和运行资源自检通过。完整过程与边界见[迁移记录](migration-check.md)。

本次导出回归覆盖原生／WASM 的真实积分状态交换、关节转角、拖动后起点、中途控制变化、反馈载荷、非整数末步、采样对齐、损坏记录及模型版本变化。浏览器实测质量 2 kg、关节初始位置 0.31 m、时长 0.2 s、步长 0.002 s 的重算一致；实际拖动后新起点约 0.287378 m，再完成并重算也在容差内一致。导出弹窗仅保留一句说明和两种方式，计算原理放在文档。

## 验证边界

自动测试使用模拟的 AI 上游回答，不消耗真实 API。真实 DS 的账户权限、余额、外网连接和建模回答质量，需要使用者在“测试连接”及实际对话中验证。编译与仿真使用真实 MuJoCo；校验成功不证明力学模型正确。

当前电脑的干净环境测试不能替代另一台学生电脑的系统运行库、显卡驱动、浏览器 WebGL、网络与目录权限实测。发布时应记录检查日期、版本和结果，不作“所有电脑绝无故障”的保证。
