# 指南 > 起步

1. [小程序简介](#intro)
2. [开始](#getstart)
3. [小程序代码构成](#code)

<hr id="intro"/>

## 1. 小程序简介

> [dev/framework/quickstart/](https://developers.weixin.qq.com/miniprogram/dev/framework/quickstart/)

- 小程序技术发展史
- 小程序与普通网页开发的区别
- 体验小程序

<hr id="getstart"/>

## 2. 开始

> [dev/framework/quickstart/getstart](https://developers.weixin.qq.com/miniprogram/dev/framework/quickstart/getstart.html)

- 申请账号

  - 进入 [小程序注册页](https://mp.weixin.qq.com/wxopen/waregister?action=step1) 填写信息，注册账号。
  - 登录 [小程序公众平台](https://mp.weixin.qq.com/) 进入 `开发` > `开发设置` 菜单查看小程序 `AppID` 信息。

- 安装开发者工具

  - 在 [下载页面](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html) 下载开发者工具。
  - 在 [文档页面](https://developers.weixin.qq.com/miniprogram/dev/devtools/devtools.html) 查看开发者工具介绍。

- 你的第一个小程序

  1. 打开微信开发者工具，使用绑定微信登录
  2. 选择 `小程序` 标签页，点击 `新建项目` 图标
  3. 填写 `项目名称` ，选择项目存放 `目录`
  4. 填写你的小程序 `AppID`
  5. 点击 `新建` 按钮

- 编译预览

  - 点击开发者工具上方 `工具栏` 中的 `预览` 按钮进行预览。

<hr id="code"/>

## 3. 小程序代码构成 

> [dev/framework/quickstart/code](https://developers.weixin.qq.com/miniprogram/dev/framework/quickstart/code.html)

后缀 | 说明
-|-
`.json` | `JSON` 配置文件
`.wxml` | `WXML` 模板文件
`.wxss` | `WXSS` 样式文件
`.js`   | `JS` 脚本逻辑文件

### 3.1 JSON 配置

```
|- pages/
|   |- page/
|       |- page.json
|- app.json
|- project.config.json
```

- `app.json` [小程序配置](./config.md#app)
- `project.config.json` [开发者工具配置](../devtools/projectconfig.md)
- `page.json` [页面配置](./config.md#page)

### 3.2 WXML 模板

- [WXML](./view.md#wxml)

  1. `{{ data }}`
  2. `wx:for="{{ list }}"`
  3. `wx:if="{{ conditional }}"`
  4. `<template name="">` -> `<template is="" data="">`
  5. `<import src="template.wxml">`
  6. `<include src="snippet.wxml">`

### 3.3 WXSS 样式

- [WXSS](./view.md#wxss)

  1. 新增尺寸单位 `rpx`
  2. 提供全局样式 `app.wxss` 和局部样式 `page.wxss`
  3. `WXSS` 仅支持部分 `CSS` 选择器

### 3.3 JS 逻辑交互

-
