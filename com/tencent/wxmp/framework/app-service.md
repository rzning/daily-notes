微信小程序 > 开发 > 指南 > 小程序框架 > 逻辑层

# 逻辑层 App Service

> [dev/framework/app-service](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/)

  - [场景值](#scene)
  - [注册小程序](#app)
  - [注册页面](#page)
  - [页面生命周期](#lifecycle)
  - [页面路由](#route)
  - [模块化](#module)
  - [API](#api)

小程序开发框架的 `逻辑层` 为开发者提供 JavaScript 代码处理能力。

`逻辑层` 用于处理数据，并将处理结果发送给 `视图层` ，同时接收 `视图层` 的事件反馈。

- 增加 `App()` 方法，进行 [小程序注册](#app)
- 增加 `Page()` 方法，用于 [页面注册](#page)
- 增加 `getApp()` 方法，获取 App 实例
- 增加 `getCurrentPages()` 方法，获取当前页面栈
- 提供丰富的 [API](#api) 调用微信特有能力
- 提供 [模块化](#module) 能力，每个页面有独立作用域

<hr id="scene"/>

## 场景值

> [dev/framework/app-service/scene](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/scene.html)

场景值用来描述用户进入小程序的途径。

> 参考 @ [场景值列表](../reference/scene-list.md)

在小程序中，可以在 `App()` 的 `onLaunch()` 和 `onShow()` 方法，或在 `wx.getLaunchOptionsSync()` 方法中获取场景值信息。 

<hr id="app"/>

## 注册小程序

> [dev/framework/app-service/app](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/app.html)

在 `app.js` 中调用 `App()` 进行小程序的注册和实例化。

> 参考 @ [App 参考文档](../reference/api.md#App)

```js
// app.js

App({
  onLaunch (options) {},
  onShow (options) {},
  onHide () {},
  onError () {},
  someGlobalData: 'abc'
})
```

每个小程序有全局唯一 `App` 实例，在任意页面可调用 `getApp()` 方法获取此 `App` 实例。

```js
// somepage.js

const appInstance = getApp()
console.log(appInstance.someGlobalData) // abc
```

<hr id="page"/>

## 注册页面

> [dev/framework/app-service/page](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/page.html)

每个页面都需在对应 JS 文件中调用 `Page()` 方法进行注册。

> 参考 @ [Page 参考文档](../reference/api.md#Page)

```js
// somepage.js

Page({
  // 页面初始数据
  data: {
    // 页面加载时 `data` 数据将
    // 以 JSON 字符串形式由逻辑层传至渲染层
  },

  // 生命周期回调函数
  onLoad () {},
  onShow () {},
  onReady () {},
  onHide () {},
  onUnload () {},

  // 页面事件处理函数
  onPullDownRefresh () {},
  onReachBottom () {},
  onShareAppMessage () {},
  onPageScroll () {},
  onResize () {},
  onTabItemTap (item) {},

  // 组件事件响应函数
  viewTap () {},
  // 自由数据
  customData: {}
})
```

### 使用 Component 构造器构造页面

页面可以使用 `Component()` 构造器来创建，并可以使用 `behaviors` 等高级特性，但必须在对应 `json` 文件中添加 `usingComponents` 字段。

> 参考 @ [自定义组件 Component 构造器](./custom-component.md#component)

```jsonc
{
  "usingComponents": {}
}
```

```js
// somepage.js

Component({
  data: {},
  methods: {
    onLoad () {},
    onPullDownRefresh () {},
    wiewTap () {}
  }
})
```

<hr id="lifecycle"/>

## 页面生命周期

> [dev/framework/app-service/page-life-cycle](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/page-life-cycle.html)

![page-lifecycle](https://res.wx.qq.com/wxdoc/dist/assets/img/page-lifecycle.2e646c86.png)

<hr id="route"/>

## 页面路由

> [dev/framework/app-service/route](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/route.html)

小程序页面路由都有框架进行管理。

### 页面栈

框架以栈的形式维护当前所有页面。

- 可使用 `getCurrentPages()` 方法获取当前 `页面栈` 。

当路由改变时 `页面栈` 有以下表现：

路由操作 | 页面栈
-|-
初始化 | 新页面入栈
打开新页面 | 新页面入栈
页面重定向 | 当前页面出栈，新页面入栈
页面返回 | 页面出栈，直到目标返回页
Tab 切换 | 页面全部出栈，只留下新的 Tab 页面
重加载 | 页面全部出栈，只留下新的页面

路由触发方式与页面生命周期关系如下表所示：

路由操作 | 触发时机 | 路由原页面 | 路由目标页面
-|-|-|-
初始化 | 小程序打开第一个页面 | - | `onLoad()` , `onShow()`
打开新页面 | `wx.navigateTo()` <hr/> `<navigator open-type="navigateTo"/>` | `onHide()` | `onLoad()` , `onShow()`
页面重定向 | `wx.redirectTo()` <hr/> `<navigator open-type="redirectTo"/>` | `onUnload()` | `onLoad()` , `onShow()`
页面返回 | `wx.navigateBack()` <hr/> `<navigator open-type="navigateBack">` <hr/> 用户点击左上角返回 | `onUnload()` | `onShow()`
Tab 切换 | `wx.switchTab()` <hr/> `<navigator open-type="switchTab"/>` <hr/> 用户切换 Tab | （参考 | 子表）
重启动 | `wx.reLaunch()` <hr/> `<navigator open-type="reLaunch"/>` | `onLoad()` | `onLoad()` , `onShow()`

> （子表）Tab 切换对应生命周期：参考官方 [页面路由](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/route.html)

Tips:

- `navigateTo()` , `redirectTo()` 只能打开非 tabBar 页面
- `switchTab()` 只能打开 tabBar 页面
- `reLaunch()` 可以打开任意页面
- 页面底部的 tabBar 由页面决定，定义为 tabBar 的页面底部都有 tabBar
- 页面路由传参，可在目标页面 `onLoad()` 中获取

<hr id="module"/>

## 模块化

> [dev/framework/app-service/module](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/module.html)

 JS 模块通过 `module.exports` 或者 `exports` 暴露接口。

 小程序目前不支持直接引入 `node_modules` 目录文件，开发者需将相关代码拷贝到小程序目录中，或使用小程序中支持的 npm 功能。

- 参考 @ [小程序 npm 包](../devtools/npm.md)

```js
// 定义 common.js

function sayHello(name) {
  console.log(`hello ${name} !`)
}

module.exports.sayHello = sayHello
```

```js
// 在页面中使用 common.js 模块

const common = require('common.js')
Page({
  helloAnna () {
    common.sayHello('Anna')
  }
})
```

<hr id="api"/>

## API

> [dev/framework/app-service/api](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/api.html)

小程序开发框架提供丰富的微信原生 API，可以方便的调起微信提供的能力，
如获取用户信息，本地存储，支付功能等。

- 参考 @ [小程序 API 文档](../api/api-list.md)

小程序 API 有以下几种类型：

- 以 `on` 开头的事件监听 API
- 以 `Sync` 结尾的同步 API
- 异步 API
