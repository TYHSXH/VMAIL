@echo off
setlocal
cd /d "%~dp0"

echo Using current Python environment:
python -c "import sys; print(sys.executable)"

echo.
echo Checking required packages...
python -c "import fastapi, yaml, numpy, mujoco, uvicorn; assert mujoco.__version__ == '3.13.0'; print('Dependencies OK')"
if errorlevel 1 (
  echo.
  echo Missing dependency. Install requirements in the current environment with:
  echo python -m pip install -r requirements.txt
  exit /b 1
)

echo.
echo Starting VMAIL at http://127.0.0.1:8000
echo Press Ctrl+C to stop.
python -m backend.launch
if errorlevel 1 pause
