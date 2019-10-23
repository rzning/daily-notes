DCloud > uni-app > 介绍 > 框架简介

# 框架简介

> <https://uniapp.dcloud.io/frame>

- [开发规范](#specification)
- [目录结构](#structure)
- [生命周期](#lifecycle)
  - 应用生命周期
  - 页面生命周期
- [路由](#route)
  - 路由跳转
  - 页面栈
- 运行环境判断
- 页面样式布局
- 模板标签
- ES6 支持
- NPM 支持
- TypeScript 支持
- [小程序组件支持](#mp-components)
- WXS

<hr id="specification"/>

## 1. 开发规范

- 页面文件遵循 [Vue 单文件组件 ( SFC ) 规范](https://vue-loader.vuejs.org/zh/spec.html)
- 组件标签参考小程序规范，详见 [uni-app 组件规范](./component.md)
- 接口 API 参考微信小程序规范，需将 `wx` 替换为 `uni` ，详见 [uni-app 接口规范](./api.md)
- 数据绑定及事件处理依赖 [Vue.js 规范](https://cn.vuejs.org/v2/guide/instance.html)，同时增加应用及页面 [生命周期](#lifecycle)
- 为兼容多端运行，建议使用 [flex 弹性盒子布局](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout)


<hr id="structure"/>

## 2. 目录结构

目录/文件 | 说明 | 参考
-|-|-
`components/` | uni-app 组件目录
`hybrid/` | 本地网页目录 | [web-view](./component.md#web-view)
`platforms/` | 各平台专用页面目录
`pages/` | 业务页面文件目录
`static/` | 静态资源目录
`wxcomponents/` | 小程序组件目录 | [小程序组件](#mp-components)
`main.js` | Vue 初始化入口文件
`App.vue` | Vue 主组件，配置 App 全局样式及监听 | [应用生命周期](#lifecycle)
`manifest.json` | 应用配置文件 | [应用配置项列表](./collocation.md#manifest)
`pages.json` | 页面配置文件 | [页面配置项列表](./collocation.md#pages)

- `static/` 目录的 JS 文件不会被编译。
- CSS, LESS, SCSS 等资源不要放在 `static/` 目录，建议将这些公用资源放在 `common/` 目录。


<hr id="lifecycle">

## 3. 生命周期

### 3.1 应用生命周期

函数 | 说明
-|-
`onLaunch()` | 框架初始化完成时触发
`onShow()` | 框架启动，或从后台进入前台显示时触发
`onHide()` | 框架从前台进入后台时触发
`onError()` | 框架报错时触发
`onUniViewMessage()` | 监听 `nvue` 页面发送的数据，参考 [nvue 向 vue 通讯](https://uniapp.dcloud.io/use-weex?id=nvue-%e5%90%91-vue-%e9%80%9a%e8%ae%af)

### 3.2 页面生命周期

- `onLoad()`
- `onShow()`
- `onReady()`
- `onHide()`
- `onUnload()`
- `onResize()`
- `onPullDownRefresh()`
- `onReachBottom()`
- `onTabItemTap()`
- `onShareAppMessage()`
- `onPageScroll()`
- `onNavigationBarButtonTap()`
- `onBackPress()`
- `onNavigationBarSearchInputChanged()`
- `onNavigationBarSearchInputConfirmed()`
- `onNavigationBarSearchInputClicked()`

<hr id="route"/>

## 4. 路由

应用页面路由全部交由框架统一管理。

开发者须在 [`pages.json`](./collocation.md#pages) 文件里配置所有路由页面信息。

uni-app 框架不支持 vue-router 。

### 4.1 路由跳转

### 4.2 页面栈

[top](#)
