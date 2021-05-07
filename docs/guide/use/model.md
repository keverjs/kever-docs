---
title: Model
date: 2021-05-07 16:24:31
permalink: /pages/34f3c0/
---

在`MVC`架构中，`Model`层用作于数据模型的定义及处理。`keverjs`也支持`Model`层的`IOC`能力。


### Model

`Model`装饰器用于将一个数据模型类标记为`Model`，使用方式如下：

```ts
// model/user.ts
import { Model } from '@kever/ioc'

@Model('user')
export class User {
  id: number
  name: string = 'keverjs' // default
  age: number
}
```
`Model` 装饰器接口一个`string`或`symbol`类型的`Tag`变量，用于标记数据模型类。


### Model.use

当一个数据模型类被标记为`Model`后，就可以在其他地方使用了。采用`Model.use()`方法从`keverjs IOC`容器中获取到数据模型，以在`service`中使用为例：

```ts
import { Injectable, Model } from '@kever/ioc'
import { User } from '../model/user.ts'  //引入类型

@Injectable('user')
export class UserService {

  async getUser(id: number) {
    const userModel = Model.use<User>('user')
  }
}
```
使用`Model.use`方法，传入`Tag`，获取被标记的数据模型类，这里建议传入泛型为类的类型，以便于更好的类型推断。

返回值是类实例的代理对象，当一个数据模型类作为`Model`的时候，`keverjs`内部会为这个类的所有`public`修饰的属性设置`get/set`访问器。例如上面`User`类有`id`、`name`、`age`属性，因此在`userModel`上就可以使用对应的`get/set`方法。
```ts
const userModel = Model.use<User>('user')
// id
userModel.setId(1)
userModel.getId()
// name
userModel.setName('keverjs')
userModel.getName()
// age
userModel.setAge(18)
userModel.getAge()
```

> 数据模型类的属性名称需要以小驼峰命名

同时，`Model`代理对象还有以下内置方法：

- init
- toJson
- unproxy

#### init
`model.init`方法用于初始化数据模型类实例的数据，方法类型如下：
```ts
init<V extends T>(value: Partial<T> | JSON): void
```
`init`方法接受一个对象或者是`JSON`。以上述`User Model`为例，使用方式如下：
```ts
const userModel = Model.use<User>('user')
// 对象方式
userModel.init({
  id: 1,
  name: 'keverjs',
  age: 18
})
// json方式
userModel.init('{"id": 1, "name": "keverjs", "age": 18}')

```

#### toJSON
`model.toJSON`方法用于将类实例转为json。方法类型如下：
```ts
toJSON():JSON
```
以上述`User Model`为例，使用方式如下：
```ts
const userModel = Model.use<User>('user')
userModel.toJSON()
```
#### unproxy
`model.unproxy`方法用于返回代理类的元对象。在开发过程中，model数据需要通过接口返回给前端，当model为代理对象时，在接口中数据则呈现为`null`，因此需要返回原始对象才可以在接口中显示正确的数据。方法类型如下：
```ts
unproxy():T & {__proxy__: ModelInstance<T>}
```
以上述`User Model`为例，使用方式如下：
```ts
const userModel = Model.use<User>('user')
const user = userModel.unproxy()  //user
```
并且proxy与target之间有双向绑定，即可以通过`unproxy`方法获取原对象，也可以通过`__proxy__`获取到代理对象。
```ts
const proxy = user.__proxy__
```
