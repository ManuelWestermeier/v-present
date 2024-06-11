:: publish to github
cls
git add .
git commit -m "update"
git branch -M main
git remote add origin https://github.com/ManuelWestermeier/v-present.git
git push -u origin main
cls