#! /bin/sh

set -e

function log() {
  now=`date '+%Y-%m-%d %H:%M:%S'`
  echo "[$now]===========$1============"
}

log "env"
log "node version `node -v`"
log "npm version `npm -v`"

log "npm install"
npm install

log "build vuepress"
npm run build

cd ./docs/.vuepress/dist

rm -rf .git

git init

git add -A

git commit -m'deploy'

log "push repos"
git push -f git@github.com:keverjs/kever-docs.git master:gh-pages
log "job done"