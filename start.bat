@echo off
setlocal
cd /d "%~dp0"

if not exist ".venv\Scripts\python.exe" (
  echo Creating local Python environment...
  py -3 -m venv .venv
  if errorlevel 1 (
    python -m venv .venv
  )
)

echo Installing or checking dependencies...
".venv\Scripts\python.exe" -m pip install -r requirements.txt

echo.
echo Starting VMAIL at http://127.0.0.1:8000
echo Press Ctrl+C to stop.
".venv\Scripts\python.exe" -m uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload
