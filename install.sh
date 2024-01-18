#!/bin/sh

# fetch changes from origin
git fetch
# get the number of changes between local and remote (current branch)
CHANGES=$(git rev-list HEAD...@{u} --count)

# reset any local changes so git pull does not fail (looking at you, package-lock.json)
git reset --hard HEAD
echo "git repo is not current. updating..."
git pull
echo "running npm install"
npm i
if [ $? -eq 0 ]; then
  echo "running npm run build..."
  npm run build
  if [ $? -eq 0 ]; then
    echo "npm build successful"
    echo "removing old web files"
    rm -rf /var/www/html/*
    echo "copying new web files"
    cp -rf dist/* /var/www/html/
    echo "install successful"
  else
    echo "npm failed to run build script"
  fi
else
  echo "failed npm install"
fi
