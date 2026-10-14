@echo off
setlocal
cd /d "%~dp0"

if not exist ".venv\Scripts\python.exe" call setup.bat
if errorlevel 1 exit /b 1

".venv\Scripts\python.exe" -c "import fastapi, yaml, numpy, mujoco, uvicorn; assert mujoco.__version__ == '3.13.0'" >nul 2>nul
if errorlevel 1 call setup.bat
if errorlevel 1 exit /b 1

echo.
echo Starting VMAIL at http://127.0.0.1:8000
echo Press Ctrl+C to stop.
".venv\Scripts\python.exe" -m backend.launch
if errorlevel 1 pause
