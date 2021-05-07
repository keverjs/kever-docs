---
title: Plugin
date: 2021-01-26 17:30:04
permalink: /pages/da599b/
---
如果你调研过市面上成熟的框架或库，你会发现大多数框架或库都会有一套成熟的插件系统，用于框架或者库能力的扩展。keverjs基于Koa二次开发，因此也继承了Koa中间件的能力，除此之外，keverjs也做了一套插件系统。

keverjs Plugin能力主要分为三种：

- Global Plugin
- Router Plugin
- Property Plugin

### Global Plugin
`Global Plugin`实际上就是`Koa Middleware`，它的执行实际在`controller`之前，下面来看一下如何写一个`Global Plugin`
```ts
import { Context, Next } from '@kever/core'
import { BasePlugin, PluginType, Plugin } from '@kever/ioc'

@Plugin('globalPlugin', PluginType.Global)
export class GlobalPlugin implements BasePlugin {

  async ready(ctx: Context, next: Next) {
    console.log('Hello world')
    await next()
  }

}
```
使用`Plugin`装饰器装饰类，并标记类为插件，Plugin参数信息如下：

- Tag：`string/symbol`类型的变量，用于标记Plugin
- type: `PluginType`类型，PluginType一共有三种属性：`Global`、`Router`、`Property`，分别对应相应类型的Plugin

所有插件都必须实现`BasePlugin`接口，并且实现接口的`ready`方法。如`Global Plugin`实际上就是在`koa middware`中执行的`ready`方法。

> 需要注意的是：Global Plugin 一定要和koa middlware一样调用next方法

### Router Plugin


### Property Plugin


### 加载第三方Plugin

### Plugin Patch
