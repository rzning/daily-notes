微信小程序 > 开发 > 指南 > 小程序框架 > 逻辑层

# 逻辑层 App Service

> [dev/framework/app-service](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/)

小程序开发框架的 `逻辑层` 为开发者提供 JavaScript 代码处理能力。

`逻辑层` 用于处理数据，并将处理结果发送给 `视图层` ，同时接收 `视图层` 的事件反馈。

- 增加 `App()` 方法，进行 [小程序注册](#app)
- 增加 `Page()` 方法，用于 [页面注册](#page)
- 增加 `getApp()` 方法，获取 App 实例
- 增加 `getCurrentPages()` 方法，获取当前页面栈
- 提供丰富的 [API](#api) 调用微信特有能力
- 提供 [模块化](#module) 能力，每个页面有独立作用域

<hr id=""/>

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

<hr id="route"/>

## 页面路由

> [dev/framework/app-service/route](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/route.html)

<hr id="module"/>

## 模块化

> [dev/framework/app-service/module](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/module.html)

<hr id="api"/>

## API

> [dev/framework/app-service/api](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/api.html)

小程序开发框架提供丰富的微信原生 API，可以方便的调起微信提供的能力，
如获取用户信息，本地存储，支付功能等。

- 参考 @ [小程序 API 文档](../api)
