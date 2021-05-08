---
title: createApp
date: 2021-05-08 19:15:11
permalink: /pages/14e93f/
---

`createApp`方法用于创建一个服务，使用方式如下：
```ts
import { createApp } from '@kever/core'
createApp()
```
使用`createApp`方法创建服务仅仅两行代码，但是别忘记`keverjs`是一个面向MVC的框架，因此一个简单的服务至少像[创建一个 Web Server](./first.md)一样写`controller`并且配置路由。

createApp方法接受一个options参数，用于启动服务的基础配置，options选项如下：
```ts
interface AppOption {
  hostname?: string
  port?: number
  plugins?: (string | Middleware)[]
  env?: string
  tsconfig?: string
}
```
- hostname: 网络地址，默认为127.0.0.1
- port：启动服务的端口号，默认为8080
- env：环境变量，默认为`development`，有`development`和`production`两种值选择
- tsconfig：tsconfig路径，默认为工作目录下的tsconfig.json文件，路径相对于工作目录
- plugins: 加载keverjs插件以及koa middleware，详情请看[Plugin](./plugin.md)

