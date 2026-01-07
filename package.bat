@echo off
REM 一键打包脚本 (批处理版本)
REM 用于将 dist 目录下的各平台构建打包成 zip 文件

echo 📦 开始打包浏览器扩展...
echo.

REM 检查 dist 目录是否存在
if not exist "dist" (
    echo ❌ 错误: dist 目录不存在，请先运行构建命令
    echo    运行: npm run build:all
    exit /b 1
)

REM 执行打包脚本
echo 🔨 正在执行打包...
call tsx scripts/package.ts

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ 打包完成！
    echo 📁 压缩包已生成在项目根目录
) else (
    echo.
    echo ❌ 打包失败
    exit /b 1
)
