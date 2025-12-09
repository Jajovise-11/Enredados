@echo off
color 0A
title Setup Inicial del Proyecto

echo ========================================
echo   CONFIGURACION INICIAL DEL PROYECTO
echo ========================================
echo.
echo Este script solo se ejecuta UNA VEZ
echo.
pause

:: Verificar Python
echo [1/4] Verificando Python...
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python no esta instalado!
    echo Descargalo desde: https://www.python.org/downloads/
    pause
    exit /b 1
)
echo Python encontrado OK

:: Crear entorno virtual si no existe
echo.
echo [2/4] Creando entorno virtual...
if not exist venv (
    python -m venv venv
    echo Entorno virtual creado
) else (
    echo Entorno virtual ya existe
)

:: Instalar dependencias Django
echo.
echo [3/4] Instalando dependencias de Django...
call venv\Scripts\activate
cd backend
if exist requirements.txt (
    pip install -r requirements.txt
) else (
    echo Instalando Django basico...
    pip install django djangorestframework django-cors-headers
    pip freeze > requirements.txt
)

:: Migrar base de datos
echo.
echo Creando base de datos SQLite...
python manage.py makemigrations
python manage.py migrate

:: Crear superusuario (opcional)
echo.
echo Quieres crear un superusuario para Django admin? (s/n)
set /p crear_super=
if /i "%crear_super%"=="s" (
    python manage.py createsuperuser
)

cd ..

:: Verificar Node.js
echo.
echo [4/4] Verificando Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js no esta instalado!
    echo Descargalo desde: https://nodejs.org/
    pause
    exit /b 1
)
echo Node.js encontrado OK

:: Instalar dependencias Angular
echo.
echo Instalando dependencias de Angular...
echo Esto puede tardar varios minutos...
cd Enredados
call npm install
cd ..

echo.
echo ========================================
echo   CONFIGURACION COMPLETADA!
echo ========================================
echo.
echo Ahora usa: INICIAR-PROYECTO.bat
echo.
pause