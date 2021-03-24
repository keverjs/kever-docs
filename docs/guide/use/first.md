# 创建一个web服务
`kever`对项目工程目录进行严格的约束，目录约束的目的是`kever`框架提供自动加载项目文件的能力，内部采用`Ioc`的方式管理模块依赖，采用`依赖注入`的方式调用其他模块的方法或属性，不需要手动`import`某个文件，目录约束如下：

```txt
kever-project
├── package.json
├── src
|   ├── index.ts
│   ├── app
│   |   ├── controller
│   |       └── index.ts
│   |   ├── plugin (可选)
│   |       └── index.js
│   |   ├── service (可选)
│   |       └── index.js
```
目前看来，工程目录约束比较简单。
开发环境下，`src/index.ts`为项目入口文件，位置随意，`src/app`为工程约束目录，内部分别有`controller`、`plugin`、`service`三个业务目录，且`controller`目录为必选（kever采用MVC的架构模式设计，因此必须要有Controller存在）。

由于生产环境是经过`Typescript`编译后的，因此自动加载的目录结构由`tsconfig`中的`outDir`配置决定，例如下面配置：
```json
{
  "compilerOptions": {
    "outDir": "lib"
  }
}
```
那么生产环境下`kever`则会加载工程下`lib/app`下的文件。

下面开始创建一个web服务。

### 项目主入口
项目主入口非常简单，仅仅2行代码就可以搞定。
```ts
import { createApp } from '@kever/core'

createApp()
```
在`@kever/core`包中暴露出`createApp`函数，用来创建一个web服务，默认端口号为`8080`，需要更改的话通过`createApp`函数传参进行设置，详细参数参照API。

当然，仅仅两行代码的web服务是不可运行的，由于`kever`项目是严格遵守MVC模式的，因此还需要有一个Controller来处理请求。

### Controller
Controller需要严格遵守目录结构，因此代码需要写在`src/app/controller`下。
```ts
// src/app/controller/index.ts
import { Controller, Context } from '@kever/core'
import { Get } from '@kever/router'

@Controller('/')
export class IndexController {

  @Get('/index')
  ready(ctx: Context) {
    ctx.body = 'Hello world'
  }
}
```
在`@kever/core`包中暴露出`Controller`装饰器，被`Controller`修饰的类会被`kever`标记。
我们还可以看到在`@kever/router`包中暴露出`Get`装饰器，被`Get`修饰的类方法会被`kever`标记成http get请求。
当项目启动的时候，`kever`扫描项目中所有的`Controller`，并将所有被标记为路由的方法通过`koa-router`注册成路由，路由的path由`Controller`与`Get`二者参数的组合，如上面代码，路由path为`/index`。

目前为止，一个简单的web服务就创建完成了。