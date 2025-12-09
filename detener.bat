@echo off
color 0C
title Deteniendo Proyecto

echo ========================================
echo   DETENIENDO PROYECTO
echo ========================================
echo.

:: Matar procesos de Python (Django)
echo Deteniendo Django...
taskkill /F /FI "WINDOWTITLE eq Django Backend*" >nul 2>&1
if errorlevel 1 (
    echo No se encontraron procesos de Django ejecutandose
) else (
    echo Django detenido correctamente
)

:: Matar procesos de Node (Angular)
echo Deteniendo Angular...
taskkill /F /FI "WINDOWTITLE eq Angular Frontend*" >nul 2>&1
if errorlevel 1 (
    echo No se encontraron procesos de Angular ejecutandose
) else (
    echo Angular detenido correctamente
)

:: Matar procesos de node adicionales (por si acaso)
taskkill /F /IM node.exe >nul 2>&1

echo.
echo ========================================
echo   Proyecto detenido!
echo ========================================
echo.
pause