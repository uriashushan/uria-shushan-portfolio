@echo off
chcp 65001 > nul
echo =======================================
echo מעלה שינויים ל-GitHub (Push)
echo =======================================

git add .
git commit -m "Auto push update from shortcut"
git push origin main

echo.
echo =======================================
echo סיום! לחיצה על מקש כלשהו תסגור את החלון.
echo =======================================
pause
