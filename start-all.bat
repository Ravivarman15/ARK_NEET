@echo off
title ARK NEET Launchpad — Launcher
color 0A

echo ============================================
echo   ARK NEET Launchpad — Starting All Servers
echo ============================================
echo.

:: Start Backend Server (Express on port 4000)
echo [1/2] Starting Backend Server (port 4000)...
start "ARK Backend — Port 4000" cmd /k "cd /d %~dp0server && npm run dev"

:: Small delay to let backend initialize first
timeout /t 3 /nobreak >nul

:: Start Frontend Dev Server (Vite on port 5173)
echo [2/2] Starting Frontend Dev Server (port 5173)...
start "ARK Frontend — Port 5173" cmd /k "cd /d %~dp0 && npm run dev"

echo.
echo ============================================
echo   Both servers are starting!
echo.
echo   Backend  → http://localhost:4000
echo   Frontend → http://localhost:5173
echo ============================================
echo.
echo You can close this window. The servers
echo are running in their own windows.
echo.
pause
