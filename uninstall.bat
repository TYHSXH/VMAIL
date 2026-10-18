@echo off
setlocal
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0backend\uninstall.ps1"
if errorlevel 1 goto failed
if not defined VMAIL_NO_PAUSE pause
exit /b 0

:failed
echo Uninstall did not complete. Read the error above and try again.
if not defined VMAIL_NO_PAUSE pause
exit /b 1
