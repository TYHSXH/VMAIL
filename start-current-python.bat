@echo off
setlocal
set PYTHONUTF8=1
pushd "%~dp0"
if errorlevel 1 goto folder_failed

python -m backend.check_environment
if errorlevel 1 (
  echo Install dependencies in the active environment: python -m pip install -r requirements.txt
  goto failed
)
echo Starting VMAIL...
python -m backend.launch
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
