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

所有插件都必须实现`BasePlugin`接口，并且实现接口的`ready`方法。如`Global Plugin`实际上就是在`koa middware`中执行的`ready`方法，并且ready方法的参数也与`koa middleware`相同。



> 需要注意的是：Global Plugin 一定要和koa middlware一样调用next方法

### Router Plugin
如果你了解编程范式，那么一定听说过`AOP`（Aspect Oriented Programming，面向切面编程）。当你在开发后端接口的过程中，必然会有让你在路由或者说方法的之前或者之后去执行一段逻辑这样的场景，比如说在路由之前或者之后打印日志，这种与业务无关的逻辑必然是不想和业务代码耦合在一起。因此，这种场景就可以采用AOP来无侵入式的对已有代码进行逻辑的增加。

`Router Plugin`就是在`AOP`应用场景下诞生的。

注册一个`Router Plugin`与`Global Plugin`大致相同，如下所示：
```ts
import { Context, Next } from '@kever/core'
import { BasePlugin, PluginType, Plugin } from '@kever/ioc'

@Plugin('logPlugin', PluginType.Router)
export class LogPlugin implements BasePlugin {
  async ready(raw: Function | AsyncFunction, ctx: Context, next: Next, params: unknown) {
    console.log('Hello world')
    return true
  }
}
```
与`Global Plugin`不同的地方则是ready方法的不同：
1. 参数不同：`Router Plugin`有四个参数
    - raw：被装饰的原函数
    - ctx: koa middleware context
    - next：koa middleware next
    - params: 在使用Plugin时传递的参数

2. 返回值：`Router Plugin`不强制执行`next`方法，可以按照需要执行，但必须返回一个`boolean`类型的值
    - aop执行顺序：before actions -> raw -> after actions
    - 在执行过程中，会首先执行所有的before Action，然后执行原函数，最后在执行after Action，如果在执行链路过程中返回了false，那么将终止后续执行。

注册完成后使用`Plugin.use`方法来装饰路由或者方法，示例代码如下：

```ts
import { Controller, Context } from '@kever/core'
import { Post } from '@kever/router'
import { Plugin PluginType, Aop } from '@kever/ioc'

@Controller('/')
export class IndexController {

  @Post('/index/:id')
  @Plugin.use(PluginType.Router, {
    tag: 'logPlugin',
    aop: Aop.Duplex,
    params: {} //可选
  })
  ready(ctx: Context) {
    const params = ctx.params
    ctx.body = params
  }
}
```
`Plugin.use`共接收两个参数：第一个参数是插件的类型，同注册插件时一致；第二个参数为插件信息：
- tag: 插件标识，标识使用哪一个插件
- aop：切面切入点
- params：可选值，传给插件的参数

切面切入点一共有三个可选项：
- Before：在原函数之前切入
- After：在原函数之后切入
- Duplex：在原函数前后都切入
### Property Plugin
在接口开发过程中，随着项目的增大，必然会沉淀出一些通用的工具方法，例如：redis、mysql、统一response、定时任务等等，这些统称为`公共组件`。

`Property Plugin`就是提供对`公共组件`的注入能力。

注册一个`Property Plugin`和其他两种插件类似，示例代码如下：
```ts
import { Context, Next } from '@kever/core'
import { BasePlugin, PluginType, Plugin } from '@kever/ioc'

@Plugin('namePlugin', PluginType.Property)
export class LogPlugin implements BasePlugin {
  async ready() {
    return 'keverjs'
  }
}
```
相信聪明的你一眼就能明白`Property Plugin`的注册方式
- `Property Plugin`的ready方法是没有任何参数的，因此在这里访问不到context
- 如果ready函数是一个async函数，则在使用插件时不需要对其进行await，因为keverjs内部会自动await

使用方式依然是使用`Plugin.use`方法，示例代码如下：
```ts
import { Controller, Context } from '@kever/core'
import { Post } from '@kever/router'
import { Plugin PluginType, Aop } from '@kever/ioc'

@Controller('/')
export class IndexController {

  @Plugin.use(PluginType.Property, 'namePlugin')
  private name: string

  @Post('/index/:id')
  ready(ctx: Context) {
    ctx.body = this.name
  }
}
```
当使用一个`Property Plugin`时，`Plugin.use`方法的第二个参数直接传入插件标识即可。

> `Property Plugin` 可以在 controller、service以及其他插件中使用
### 加载第三方Plugin
在开发过程中，当遇到一些比较通用的插件，我们通常会期望将这个插件发布到公域或私域npm，避免代码工作区代码太多不整洁，而且有利于在其他项目中使用。keverjs同时支持发布插件、加载插件以及加载koa middleware的能力

想要单独开发一个keverjs插件，并发布到npm非常简单，只需要将原插件代码移动到一个单独的包里，进行发布即可。例如[这是一个生成traceid的插件](https://github.com/keverjs/traceId)

发布之后，将插件安装到本地
> npm install @kever/traceid --save

在启动服务函数`createApp`中传入`plugins`选项，示例代码如下
```ts
createApp({
  port: 9002,
  env: process.env.NODE_ENV,
  plugins: [
    bodyParse(),  // koa middleware
    '@kever/traceid',  //keverjs plugin
  ]
})

```
`koa middleware`使用方法也在上面示例代码中，内部的注册顺序是`koa middleware` > `keverjs plugin`

keverjs项目需要采用Typescript进行开发，如果加载的第三方插件中需要引入类型，比如`traceid`插件会在`context`上挂载`tractId`属性，需要再tsconfig.json中引入其类型。
```json
{
  "compilerOptions": {
    "types": ["@kever/traceid"]
  }
}
```
### Plugin Patch

插件是对通用能力的封装，在使用插件时必然是需要一些用户所传的参数，keverjs采用patch的方式对Plugin进行传参。

例如，mysql插件，在使用之前需要根据用户名、密码、数据库名称等等，传参如下：
```ts
import { createApp } from '@kever/core'
import { pluginPatch } from '@kever/ioc'
const mysqlConfig = {}
// 方法一
pluginPatch('mysql', mysqlConfig)
// 方法二
pluginPatch('mysql', () => mysqlConfig)

createApp({
  port: 9002,
  env: process.env.NODE_ENV
})

```
使用`pluginPatch`方法对插件进行传参，参数如下：
- Tag：插件标识
- Payload: 可以是值也可以是函数，如果是函数，则会传入函数的返回值

> 需要注意的是：pluginPatch方法必须在createApp之前执行

`pluginPatch`方法传的参数会被插件的构造函数接受到，例如：
```ts
import { BasePlugin, PluginType, Plugin } from '@kever/ioc'
import mysql, { Connection } from 'mysql2/promise'
import bluebird from 'bluebird'

interface MysqlConfig {
  host: string;
  username: string;
  password: string;
  database: string;
}

@Plugin('mysql', PluginType.Property)
export default class MysqlPlugin implements BasePlugin {
  private config: MysqlConfig
  constructor(config: MysqlConfig) {
    this.config = config
  }
  async ready() {
    return await mysql.createConnection({
      host: this.config.host,
      user: this.config.username,
      password: this.config.password,
      database: this.config.database,
      Promise: bluebird
    })
    return connection
  }
}
```
上面代码是mysql插件传参的例子，通过patch传参可以抽离出一些通用的组件，根据参数去执行逻辑。