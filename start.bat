@echo off
setlocal
set PYTHONUTF8=1
pushd "%~dp0"
if errorlevel 1 goto folder_failed

if not exist ".venv\Scripts\python.exe" goto configure
".venv\Scripts\python.exe" -m backend.check_environment --quiet
if not errorlevel 1 goto launch

:configure
call setup.bat
if errorlevel 1 goto failed
".venv\Scripts\python.exe" -m backend.check_environment
if errorlevel 1 goto failed

:launch
echo.
echo Starting VMAIL...
echo Keep this window open. Press Ctrl+C to stop.
".venv\Scripts\python.exe" -m backend.launch
if errorlevel 1 goto failed
popd
exit /b 0

:folder_failed
echo Cannot open the VMAIL project folder.
if not defined VMAIL_NO_PAUSE pause
exit /b 1

:failed
if not defined VMAIL_NO_PAUSE pause
popd
exit /b 1
