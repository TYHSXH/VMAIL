@echo off
setlocal
cd /d "%~dp0"

if not exist ".venv\Scripts\python.exe" (
  echo Creating the project Python environment in .venv...
  where py >nul 2>nul
  if not errorlevel 1 py -3 -m venv .venv
  if not exist ".venv\Scripts\python.exe" (
    where python >nul 2>nul
    if not errorlevel 1 python -m venv .venv
  )
)

if not exist ".venv\Scripts\python.exe" (
  echo.
  echo Python 3 was not found. Install Python 3.11 or newer, then run setup.bat again.
  pause
  exit /b 1
)

echo Installing VMAIL Python dependencies and MuJoCo...
".venv\Scripts\python.exe" -m pip install --upgrade pip
if errorlevel 1 goto install_failed
".venv\Scripts\python.exe" -m pip install -r requirements.txt
if errorlevel 1 goto install_failed

echo.
echo Setup completed. Run start.bat to open VMAIL.
exit /b 0

:install_failed
echo.
echo Installation failed. Check the network connection and run setup.bat again.
pause
exit /b 1
