@echo off
title TT-tovoai Deployer
cd /d "%~dp0"
echo ========================================================
echo 🚀 TT-tovoai (tovoai.com & cdn.tovoai.com) Deploying...
echo ========================================================

git add .
git commit -m "feat: Initial commit for TOVOAI Standalone AI Image & SEO Studio Engine"
git push -u origin main

echo ========================================================
echo ✅ Push Complete to https://github.com/tovoai/tovo.git!
echo ========================================================
pause
