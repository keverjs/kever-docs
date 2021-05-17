#!/usr/bin/env node

import { $, cd} from 'zx'
$.verbose = false

initErrHandler()
function initErrHandler() {
  process.on('unhandledRejection', (err, promise) => {
    console.log('err: ', err.toString())
  })
  process.on('uncaughtException', (err, origin) => {
    console.log('err: ', err.toString())
  })
}

async function log(message) {
  const now = await $`date '+%Y-%m-%d %H:%M:%S'`
  console.log(`[${now.toString().trim()}]===========${message.toString().trim()}============`)
}

log('env')
log(`node version ${await $`node -v`}`)
log(`npm version ${await $`npm -v`}`)

log('npm install')
await $`npm install`

log('build vuepress')
await $`npm run build`

cd('./docs/.vuepress/dist')

await $`rm -rf .git`

await $`git init`
await $`git add -A`
await $`git commit -m'deploy'`

log('push repos')
await $`git push -f git@github.com:keverjs/kever-docs.git master:gh-pages`
log('job done')