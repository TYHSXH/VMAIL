# VMAIL Theoretical Mechanics Workbench

[简体中文](README.md) | [English](README_EN.md)

VMAIL is a local MuJoCo workbench for interactive mechanics experiments, parameter and joint adjustments, load controls, charts, and Python batch simulations.

## Quick start

1. Install 64-bit Python 3.11 or newer and add it to PATH.
2. Double-click `start.bat` with an internet connection for the first setup.
3. Select a learning task and click the simulation start button.

The server runs at <http://127.0.0.1:8000>. Students do not need Node.js. Click **帮助** (Help) in the top bar to open the Markdown user manual in a separate tab.

## Documentation

The detailed documentation is maintained in Chinese:

- [User guide](docs/user-guide.md): setup, Conda, controls, model preview, data export, troubleshooting.
- [Documentation index](docs/README.md): reading paths for users, AI assistants, and developers.
- [Task workflow](docs/workflow.md) and [AI task prompt](prompts/student-task-builder.md).
- [Task authoring rules](tasks/AGENTS.md), [task package specification](docs/task-package-spec.md), and [load controls](docs/load-controls.md).
- [Development and maintenance](docs/development.md): structure, builds, validation, and regression tests.
- [Model library](model_library/README.md): source models, assets, and license information.
