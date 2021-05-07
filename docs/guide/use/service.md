---
title: Service
date: 2021-01-26 17:29:49
permalink: /pages/1f8575/
---

随着业务需求的逐渐增多，`controller`模块下业务代码越写越多，代码显得很臃肿，不易管理，很明显，传统的MVC分层架构已经不能满足业务的需求。这个时候就需要抽离出一个`service`层来对`controller`中业务模块进行抽离，而`controller`则负责处理请求的输入、输出以及根据需求要求调用相应的`service`模块处理。


### Injectable
`service`同样是支持`IOC`的，`Injectable`是`keverjs`内置的`IOC`装饰器，它的作用是标记被装饰的模块是可被注入的。使用方式如下：
```ts
import { Injectable } from '@kever/ioc'

@Injectable('user')
export class UserService {
  async getUser(id: number) {
    return {
      id,
      name: 'keverjs'
    }
  }
}
```
`Injectable`装饰器需要传入`Tag`，可以是`string`或者`symbol`类型，用于标记可被注入类。

### Inject
当一个`service`被标记为可被注入后，在`controller`中就可以使用`Inject`装饰器，将可被注入`service`注入到`controller`中.使用方式如下：
```ts
import { Controller, Context } from '@kever/core'
import { Inject } from '@kever/ioc'
import { Get } from '@kever/router'
import { UserService } from '../service/UserService.ts'  //将类型引入过来，保证类型的准确性

@Controller('/')
export class UserController {
  @Inject('user')
  public userService: UserService

  @Get('/user')
  async getUser(ctx: Context) {
    const user = this.userService.getUser(1)
    ctx.body = user
  }
}
```
`Inject`装饰器在使用使也需要传入`Tag`，与`Injectable`类型一致，用来注入被`Injectable`标记的service。

