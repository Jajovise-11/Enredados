@echo off
color 0B
title Iniciando Proyecto

echo ========================================
echo   INICIANDO PROYECTO
echo ========================================
echo.

:: Verificar que existe venv
if not exist venv (
    echo ERROR: No existe entorno virtual!
    echo Ejecuta primero: SETUP-PRIMERA-VEZ.bat
    pause
    exit /b 1
)

:: Verificar que existe node_modules
if not exist Enredados\node_modules (
    echo ERROR: No existen dependencias de Angular!
    echo Ejecuta primero: SETUP-PRIMERA-VEZ.bat
    pause
    exit /b 1
)

:: Iniciar Django Backend
echo [1/2] Iniciando Backend Django...
start "Django Backend - Puerto 8000" cmd /k "cd /d %~dp0 && venv\Scripts\activate && cd backend && python manage.py runserver"

:: Esperar 5 segundos
echo Esperando que Django inicie...
timeout /t 5 /nobreak >nul

:: Iniciar Angular Frontend
echo [2/2] Iniciando Frontend Angular...
start "Angular Frontend - Puerto 4200" cmd /k "cd /d %~dp0Enredados && npm start"

echo.
echo ========================================
echo   PROYECTO INICIADO!
echo ========================================
echo.
echo   Backend Django:   http://localhost:8000
echo   Frontend Angular: http://localhost:4200
echo.
echo   Para detener: usa DETENER-PROYECTO.bat
echo   o cierra las ventanas manualmente
echo ========================================
echo.
echo Abriendo navegador en 3 segundos...
timeout /t 3 /nobreak >nul
start http://localhost:4200

echo.
echo Presiona cualquier tecla para cerrar esta ventana...
pause >nul