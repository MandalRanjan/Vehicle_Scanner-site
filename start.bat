@echo off
title DEMO START-UP - Vehicle Shield Local Server
cls
echo ======================================================================
echo    DEMO START-UP - Smart QR Vehicle Contact Stickers (India)
echo ======================================================================
echo.
echo  Starting local environment...
echo.

cd /d "%~dp0"

:: Check if Python is available
where python >nul 2>nul
if %errorlevel% equ 0 (
    echo  Python detected. Launching local web server on port 8000...
    echo  Local URL: http://localhost:8000/index.html
    echo.
    python server.py
    goto :end
)

where py >nul 2>nul
if %errorlevel% equ 0 (
    echo  Python launcher detected. Launching local web server on port 8000...
    echo  Local URL: http://localhost:8000/index.html
    echo.
    py server.py
    goto :end
)

:: If Python is not installed, open index.html directly
echo  Python not found in PATH. Opening index.html directly in your default browser...
start "" "%~dp0index.html"
echo.
echo  Website opened directly in browser.
echo  Tip: Install Python or use VS Code Live Server for the full web-server experience.
echo.
pause

:end
