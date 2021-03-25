# 控制器
在`kever`中，控制器与路由是相辅相成的，控制器拥有承载路由的能力，路由通过控制器进行注册，并且一个控制器可以提供多个路由。

其实在[创建一个web服务](./first.md)中，已经将控制器讲完了，是不是很简单？😁

我们下面来看一下同样简单的路由。

### 路由
在[创建一个web服务](./first.md)中，我们已经见过了`Get`路由装饰器，此外它还有7个兄弟姐们，分别是：
- Post
- Put
- Delete
- Head
- Options
- Patch
- All

这些装饰器分别对应相应`http method`，每个装饰器参数表示请求路径（匹配规则遵循koa-router路由path规则），`All`装饰器则表示被装饰的方法会承接来自7种`http method`的请求。

控制器方法经过路由装饰器修饰后，交由`koa-router`注册成路由。

下面再来看一个`Post`装饰器的🌰吧
```ts
import { Controller, Context } from '@kever/core'
import { Post } from '@kever/router'

@Controller('/')
export class IndexController {

  @Post('/index/:id')
  ready(ctx: Context) {
    const params = ctx.params
    ctx.body = params
  }
}
```

