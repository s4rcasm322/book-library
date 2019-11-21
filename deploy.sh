#!/usr/bin/env sh
set -e
npm run build
cd dist

git add -A
git commit -m 'deploy'

# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master
git push -f git@github.com:<s4rcasm322>/<book-library>.git master:gh-pages
cd -