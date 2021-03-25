(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{358:function(t,e,s){"use strict";s.r(e);var a=s(42),r=Object(a.a)({},(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"创建一个web服务"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#创建一个web服务"}},[t._v("#")]),t._v(" 创建一个web服务")]),t._v(" "),s("p",[s("code",[t._v("kever")]),t._v("对项目工程目录进行严格的约束，目录约束的目的是"),s("code",[t._v("kever")]),t._v("框架提供自动加载项目文件的能力，内部采用"),s("code",[t._v("Ioc")]),t._v("的方式管理模块依赖，采用"),s("code",[t._v("依赖注入")]),t._v("的方式调用其他模块的方法或属性，不需要手动"),s("code",[t._v("import")]),t._v("某个文件，目录约束如下：")]),t._v(" "),s("div",{staticClass:"language-txt extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("kever-project\n├── package.json\n├── src\n|   ├── index.ts\n│   ├── app\n│   |   ├── controller\n│   |       └── index.ts\n│   |   ├── plugin (可选)\n│   |       └── index.js\n│   |   ├── service (可选)\n│   |       └── index.js\n")])])]),s("p",[t._v("工程目录约束比较简单。")]),t._v(" "),s("ul",[s("li",[s("code",[t._v("src/index.ts")]),t._v(" 项目主入口，没有约束，位置随意")]),t._v(" "),s("li",[s("code",[t._v("src/app/controller/**")]),t._v(" 用于解析用户的输入，处理后返回相应的结果，具体可参考"),s("RouterLink",{attrs:{to:"/guide/use/controller.html"}},[t._v("控制器")])],1),t._v(" "),s("li",[s("code",[t._v("src/app/plugin/**")]),t._v(" 用于编写"),s("code",[t._v("kever")]),t._v("插件，可选，具体可参考"),s("RouterLink",{attrs:{to:"/guide/use/plugin.html"}},[t._v("kever插件")])],1),t._v(" "),s("li",[s("code",[t._v("src/app/service/**")]),t._v(" 用于编写业务逻辑层，可选，具体可参考"),s("RouterLink",{attrs:{to:"/guide/use/service.html"}},[t._v("服务注入")])],1)]),t._v(" "),s("p",[t._v("由于生产环境是经过"),s("code",[t._v("Typescript")]),t._v("编译后的，因此自动加载的目录结构由"),s("code",[t._v("tsconfig")]),t._v("中的"),s("code",[t._v("outDir")]),t._v("配置决定，例如下面配置：")]),t._v(" "),s("div",{staticClass:"language-json extra-class"},[s("pre",{pre:!0,attrs:{class:"language-json"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"compilerOptions"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"outDir"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"lib"')]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("那么生产环境下"),s("code",[t._v("kever")]),t._v("则会加载工程下"),s("code",[t._v("lib/app")]),t._v("下的文件。")]),t._v(" "),s("p",[t._v("下面开始创建一个web服务。")]),t._v(" "),s("h3",{attrs:{id:"项目主入口"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#项目主入口"}},[t._v("#")]),t._v(" 项目主入口")]),t._v(" "),s("p",[t._v("项目主入口非常简单，仅仅2行代码就可以搞定。")]),t._v(" "),s("div",{staticClass:"language-ts extra-class"},[s("pre",{pre:!0,attrs:{class:"language-ts"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" createApp "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'@kever/core'")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("createApp")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("p",[t._v("在"),s("code",[t._v("@kever/core")]),t._v("包中暴露出"),s("code",[t._v("createApp")]),t._v("函数，用来创建一个web服务，默认端口号为"),s("code",[t._v("8080")]),t._v("，需要更改的话通过"),s("code",[t._v("createApp")]),t._v("函数传参进行设置，详细参数参照API。")]),t._v(" "),s("p",[t._v("当然，仅仅两行代码的web服务是不可运行的，由于"),s("code",[t._v("kever")]),t._v("项目是严格遵守MVC模式的，因此还需要有一个Controller来处理请求。")]),t._v(" "),s("h3",{attrs:{id:"controller"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#controller"}},[t._v("#")]),t._v(" Controller")]),t._v(" "),s("p",[t._v("Controller需要严格遵守目录结构，因此代码需要写在"),s("code",[t._v("src/app/controller")]),t._v("下。")]),t._v(" "),s("div",{staticClass:"language-ts extra-class"},[s("pre",{pre:!0,attrs:{class:"language-ts"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// src/app/controller/index.ts")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" Controller"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" Context "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'@kever/core'")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" Get "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'@kever/router'")]),t._v("\n\n@"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Controller")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'/'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("IndexController")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\n  @"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Get")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'/index'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("ready")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ctx"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" Context"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    ctx"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("body "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Hello world'")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("在"),s("code",[t._v("@kever/core")]),t._v("包中暴露出"),s("code",[t._v("Controller")]),t._v("装饰器，被"),s("code",[t._v("Controller")]),t._v("修饰的类会被"),s("code",[t._v("kever")]),t._v("标记为控制器。")]),t._v(" "),s("p",[t._v("我们还可以看到在"),s("code",[t._v("@kever/router")]),t._v("包中暴露出"),s("code",[t._v("Get")]),t._v("装饰器，被"),s("code",[t._v("Get")]),t._v("修饰的类方法会被"),s("code",[t._v("kever")]),t._v("标记成http get请求。")]),t._v(" "),s("p",[t._v("当项目启动的时候，"),s("code",[t._v("kever")]),t._v("扫描项目中所有的"),s("code",[t._v("Controller")]),t._v("，并将所有被标记为路由的方法通过"),s("code",[t._v("koa-router")]),t._v("注册成路由，路由的path由"),s("code",[t._v("Controller")]),t._v("与"),s("code",[t._v("Get")]),t._v("二者参数的组合，如上面代码，路由path为"),s("code",[t._v("/index")]),t._v("。")]),t._v(" "),s("p",[t._v("目前为止，一个简单的web服务就创建完成了。")])])}),[],!1,null,null,null);e.default=r.exports}}]);