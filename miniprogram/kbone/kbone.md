---
title: kbone
recorddate: 2020-02-18
repository: https://github.com/Tencent/kbone
website: https://wechat-miniprogram.github.io/kbone/docs/
---

kbone 是一个致力于微信小程序和 Web 端同构的解决方案。

## 🔮 简介

kbone 实现了一个适配器，在适配层里模拟出了浏览器环境，让 Web 端的代码可以不做什么改动便可运行在小程序里。

> bone 通过提供适配器的方式来实现同构

- 支持大多流行前端框架，如 Vue, React, Preact 等
- 支持更为完整的前端框架特性
- 提供常用的 DOM / BOM 接口
- 在小程序端运行时，可以使用小程序特有的特性

## 🍨 使用

### 1️⃣ 使用 `kbone-cli`

```sh
yarn global add kbone-cli
```

创建项目：

```sh
kbone init my-app
```

启动项目：

```sh
# 小程序端开发
yarn run mp

# Web 端开发
yarn run web

# Web 端构建
yarn run build
```

### 2️⃣ 使用模板

- [Vue 项目模板](https://github.com/wechat-miniprogram/kbone-template-vue)
- [React 项目模板](https://github.com/wechat-miniprogram/kbone-template-react)
- [kbone-ui 项目模板](https://github.com/wechat-miniprogram/kbone-template-kboneui)
- [Preact 项目模板](https://github.com/wechat-miniprogram/kbone-template-preact)
- [Omi 项目模板](https://github.com/omijs/template-kbone)

### 3️⃣ 手动配置

项目基于 webpack 构建，用户可以自行相关配置。

一般需要补充两个配置：

- 构建小程序代码的 Webpack 配置
- Webpack 插件 [`mp-webpack-plugin` 配置](https://wechat-miniprogram.github.io/kbone/docs/config/)

具体配置方式可参考 [kbone 项目搭建流程](https://wechat-miniprogram.github.io/kbone/docs/guide/tutorial.html)

## 🎨 kbone-ui

[kbone-ui] 是一套同时支持小程序 ( kbone ) 和 Vue 框架开发的多端 UI 库。对齐微信 [weui](https://weui.io/) 样式组件

[kbone-ui]: https://github.com/wechat-miniprogram/kbone-ui

## 🔗 参考文章

- [kbone，十分钟让 Vue 项目同时支持小程序 | 微信开放社区](https://developers.weixin.qq.com/community/develop/article/doc/000e48820100100f2269be0975b813)
- [使用 vue-cli 3.x 快速搭建「vue + ts + kbone + kbone-ui + 云开发」项目](https://mp.weixin.qq.com/s/2sr7EUjgxm__JMmo0sP4HA)
