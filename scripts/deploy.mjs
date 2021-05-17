#!/usr/bin/env node

import { $, cd} from 'zx'
$.verbose = false

errHandlerInit()
function errHandlerInit() {
  process.on('unhandledRejection', (err, promise) => {
    console.log('err: ', err.toString())
  })
  process.on('uncaughtException', (err, origin) => {
    console.log('err: ', err.toString())
  })
}

async function shell(command) {
  const commandRes = await $(command)
  return commandRes.toString().trim()
}

async function log(message) {
  const now = await shell`date '+%Y-%m-%d %H:%M:%S'`
  console.log(`[${now}]===========${message}============`)
}

log('env')
log(`node version ${await shell`node -v`}`)
log(`npm version ${await shell`npm -v`}`)

log('npm install')
await shell`npm install`

log('build vuepress')
await shell`npm run build`

cd('./docs/.vuepress/dist')

await shell`rm -rf .git`

await shell`git init`
await shell`git add -A`
await shell`git commit -m'deploy'`

log('push repos')
await shell`git push -f git@github.com:keverjs/kever-docs.git master:gh-pages`
log('job done')