# 第三方软件与模型声明

VMAIL 使用下列第三方组件，原创版权声明不覆盖这些组件。运行包中保留其许可文本，构建或重新分发时请一并保留本文件与 `licenses/`。

| 组件 | 当前版本 | 许可证及文本 | 官方来源 |
| --- | --- | --- | --- |
| MuJoCo / MuJoCo WASM | 3.13.0 | [Apache-2.0](licenses/mujoco-LICENSE.txt)，[第三方通知](licenses/mujoco-THIRD_PARTY.md) | [google-deepmind/mujoco](https://github.com/google-deepmind/mujoco) |
| Three.js | 0.180.0 | [MIT](licenses/three-LICENSE.txt) | [mrdoob/three.js](https://github.com/mrdoob/three.js) |
| KaTeX（含随包字体） | 0.19.0 | [MIT](licenses/katex-LICENSE.txt) | [KaTeX/KaTeX](https://github.com/KaTeX/KaTeX) |
| Marked | 18.1.1 | [MIT](licenses/marked-LICENSE.txt) | [markedjs/marked](https://github.com/markedjs/marked) |
| DOMPurify | 3.4.17 | 本发行版选择 [Apache-2.0](licenses/dompurify-LICENSE.txt) 许可路径 | [cure53/DOMPurify](https://github.com/cure53/DOMPurify) |

MuJoCo 第三方通知来自所安装的官方 Python 3.13.0 分发包；其中包含原生二进制所用组件的许可说明。WASM 同样使用 MuJoCo，另附 [Emscripten 许可](licenses/emscripten-LICENSE.txt)与 [musl](licenses/emscripten-musl-COPYRIGHT.txt)、[libc++](licenses/emscripten-libcxx-LICENSE.txt)、[compiler-rt](licenses/emscripten-compiler-rt-LICENSE.txt)通知；这些补充文本取自 Emscripten 官方仓库。本项目未修改上述库源码；前端构建会打包、压缩 JavaScript 并复制 WASM、字体和图片。

Python 依赖通过安装脚本从用户配置的软件包源安装，具体版本由 `requirements.txt` 与 `constraints.txt` 记录，各包自带许可证保留于环境内。本项目不将开发者的 `.venv` 分发给学生。Vite 及开发依赖由 `package-lock.json` 记录，仅供构建；如分发完整依赖目录，应同时保留对应包的许可证。

`model_library/` 中的模型按目录保留 `SOURCE.md`、`LICENSE`、资源清单和固定上游版本。不同模型许可可能不同，不以本项目或 MuJoCo 的许可证统一覆盖。复制、修改或向他人分发模型时，应保留对应目录的作者、来源和完整许可，并核对具体模型的使用条件。

DeepSeek 是使用者自行连接的外部 API 服务，不属于本项目分发的软件；账号、数据处理与计费按该服务的条款执行。VS Code 插件、CAD 工具和其他外部软件由使用者自行安装并遵守其授权。
