@echo off
setlocal
set PYTHONUTF8=1
pushd "%~dp0"
if errorlevel 1 goto folder_failed

rem Prefer interpreters with broadly available binary wheels; skip old/32-bit ones.
for %%V in (3.12 3.11 3.13 3) do (
  py -%%V -m backend.bootstrap --check-python >nul 2>nul
  if not errorlevel 1 (
    py -%%V -m backend.bootstrap
    goto setup_done
  )
)
python -m backend.bootstrap --check-python >nul 2>nul
if errorlevel 1 goto python_failed
python -m backend.bootstrap

:setup_done
if errorlevel 1 goto setup_failed
echo.
echo Setup completed. Run start.bat to open VMAIL.
popd
exit /b 0

:python_failed
echo No suitable Python found. Install 64-bit x86 Python 3.12 and add it to PATH.
goto setup_failed

:folder_failed
echo Cannot open the VMAIL project folder.
if not defined VMAIL_NO_PAUSE pause
exit /b 1

:setup_failed
echo Setup did not complete. Read the error above, then run setup.bat again.
if not defined VMAIL_NO_PAUSE pause
popd
exit /b 1
