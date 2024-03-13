DCloud > uni-app > 框架

- [配置](#config)
- [框架接口](#frame-api)

<hr id="config"/>

# 配置

- [`pages.json`](#pages)
- [`manifest.json`](#manifest)
- [`package.json`](#package)
- [`vue-config.js`](#vue-config)
- [`uni.scss`](#uni-scss)
- [`App.vue`](#app)
- [`main.js`](#main)

<hr id="pages">

## pages.json

> <https://uniapp.dcloud.io/collocation/pages>

<hr id="manifest">

## manifest.json

> <https://uniapp.dcloud.io/collocation/manifest>

<hr id="package">

## package.json

> <https://uniapp.dcloud.io/collocation/package>

<hr id="vue-config">

## vue-config.js

> <https://uniapp.dcloud.io/collocation/vue-config>

<hr id="uni-scss">

## uni.scss

> <https://uniapp.dcloud.io/collocation/uni-scss>

<hr id="app">

## App.vue

> <https://uniapp.dcloud.io/collocation/App>

<hr id="main">

## main.js

> <https://uniapp.dcloud.io/collocation/main>

<hr id="frame-api">

# 框架接口

- 日志打印
  - `console.debug()`
  - `console.log()`
  - `console.info()`
  - `console.warn()`
  - `console.error()`
- 定时器
  - `setTimeout(callback, delay, rest)`
  - `clearTimeout(timeoutId)`
  - `setInterval(callback, delay, rest)`
  - `clearInterval(intervalId)`
- 生命周期
  - 应用生命周期
  - 页面生命周期
  - 组件生命周期
- 页面
  - `getApp()`
    - 获取当前应用实例，通常用于获取 `globalData`
  - `getCurrentPages()`
    - 获取当前页面栈实例（数组），最后一个为当前页面。
  - `page.$getAppWebview()`
    - 获取当前页面的 webview 对象实例。
- 页面通信
  - `uni.$emit(eventName, obj)`
  - `uni.$on(eventName, callback)`
  - `uni.$once(eventName, callback)`
  - `uni.$off([eventName, callback])`
