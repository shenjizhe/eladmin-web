@echo off
setlocal

:: 定义程序路径，脚本的所在路径，启动时双击，关闭即可
set "PROGRAM_PATH=F:\code\eladmin-web"

:: 检查程序路径是否存在
if not exist "%PROGRAM_PATH%" (
echo 错误：程序路径不存在。
exit /b 1
)

:: 进入程序路径
cd /d "%PROGRAM_PATH%"

:: 启动程序
echo 启动程序...
call npm run start

endlocal
