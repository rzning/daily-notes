---
title       : "能力扩展 - Touch WX 入门"
author      : Rzning
date        : 2018-06-19 20:18:00 +0800
modified    : 2018-08-05 17:12:00 +0800
---
# Touch WX

### 能力扩展

- <http://www.wetouch.net/touchwx_doc/quickstart/extend>
  - 矢量图标库 - [extend/icon]
  - 框架常量 - [extend/constant]
  - 常用样式库 - [extend/styleLib]
  - API 补充 - [extend/api]
  - Less 语法 - [extend/less]
  - NPM 支持 - [extend/npm]
  - 引入资源 - [extend/import]

---
## 矢量图标库
- [extend/icon]

在 Touch WX 中可使用 iconfont 海量图标库。

- <http://iconfont.cn/>

访问网址，登录后创建一个项目，在该项目下管理所有图标。

1. 搜索需要的图标，点击购物车图标。
2. 在购物车中将图标添加到项目。
3. 在项目中对图标进行简单编辑。
4. 图标大小建议以 16 网格时，四周留出 1 个网格的边距为准。
5. 修改名称，名称决定了在使用 icon 组件是的 type 值。
6. 编辑好后，点击 `下载至本地` 按钮。
7. 将下载的 `iconfont.ttf` 文件转为 `base64` 格式，推荐 [转换工具](https://www.giftofspeed.com/base64-encoder/)。
8. 打开 `static/styles/icon.less` 文件，将转换好的 `base64` 替换 `src:url()` 中 `base64,` 之后内容。
9. 将下载的 `iconfont.css` 文件内容，替换 `icon.less` 文件 `.icon-*` 对应内容区域。
10. 替换完成后，在 `app.wxa` 中点击保存，将新添加字体编译值 `dist` 目录。

在 `font.less` 文件中 `@font-face {}` 和 `.ui-icon {}` 内容必须保留，
只需替换后面 `.icon-*` 部分和 `base64` 数据即可。

## 框架常量
- [extend/constant]

为了让 Touch WX 框架与 Touch UI 框架在 API 层面保持统一，这里补充了获取常量的 API，可以在 Touch WX 中直接使用。

常量 | 说明
-|-
IS_APP | 是否为 App 环境
IS_ANDROID | 是否为 Android 环境
IS_IOS | 是否为 iOS 环境
WIN_HEIGHT | 窗体高度
STATUS_BAR_HEIGHT | 状态栏的高度
DEFAULT_HEADER_HEIGHT | 当前导航栏高度
DEFAULT_CONTENT_HEIGHT | 当前内容高度
WIN_WIDTH | 当前屏幕宽度

```js
// Android环境
console.log(wx.IS_APP)      // true
console.log(wx.IS_ANDROID)  // true
console.log(wx.IS_IOS)      // false
```

## 常用样式库
- [extend/styleLib]

框架提供了一套公用的 Less 函数库 `utils/mixins.less` 实现了很多常见样式，无需引入直接使用。

函数 | 说明
-|-
`.mix-1px (@top, @right, @bottom, @left, @color)` | 一像素细线
`.mix-flex-x-center()` | 水平居中
`.mix-flex-y-center()` | 垂直居中
`.mix-flex-center()` | 水平垂直水平居中
`.mix-text-overflow()` | 文字超出部分出省略号

## API 补充
- [extend/api]

为了让 Touch WX 框架与 Touch UI 框架在 API 层面保持统一，这里补充了两个反馈类的 API，可以在 Touch WX 中直接使用。

### wx.showAlert(Object)

```js
/**
 * 显示警告框
 * @param {String}   [opt.title] - 标题
 * @param {String}   opt.content - 内容
 * @param {String}   [opt.confirmText = "确定"] - 按钮文字
 * @param {Function} [opt.success] - 按钮回调函数
 */
 wx.showAlert(opt)
```

### wx.showConfirm(Object)

```js
/**
 * 显示确认框
 * @param {String}   [opt.title] - 标题
 * @param {String}   opt.content - 内容
 * @param {String}   [opt.cancelText = "取消"] - 取消按钮文字
 * @param {String}   [opt.cancelColor] - 取消按钮颜色
 * @param {String}   [opt.confirmText = "确定"] - 确定按钮文字
 * @param {String}   [opt.confirmColor] - 确定按钮颜色
 * @param {Function} [opt.success] - 回调函数，点击确认返回 `true`，点击取消返回 `false`
 */
wx.showConfirm(opt)
```

## Less 语法
- [extend/less]

Touch WX 支持 LESS 语法。

- <http://lesscss.org/>

### 使用

LESS 可以直接在客户端使用，也可以在服务器端使用。

在实际项目开发中，推荐将 LESS 文件编译生成静态 CSS 文件。

1. 客户端

在客户端直接使用 Less 原文件。

```html
<link rel="stylesheet/less" type="text/css" href="styles.less" />
<script src="//cdnjs.cloudflare.com/ajax/libs/less.js/3.0.2/less.min.js" ></script>
```

Less 原文件一定要在 `less.js` 引入之前引入。

2. 服务器端

```bash
# install
> yarn add less

# use
> lessc styles.less styles.css
```

### 语法

1. 变量

```less
@width: 20px;
.home {
  @width: 30px;
  .center {
    wdith: @width; // 30px;
  }
}
.left {
  width: @width; // 20px;
}
```

2. Mixins 混入

Mixins（混入）特性，它是多重继承的一种实现，

在 LESS 中，混入是指在一个 CLASS 中引入另外一个已经定义的 CLASS，

就像在当前 CLASS 中增加一个属性一样。
 
```less
.borderRadius(@radius:5px) {
  border-radius: @radius;
}
.boxShadow(@x:0, @y:0, @blur:1px, @color:#000) {
  box-shadow: @arguments;
}
.header {
  .borderRadius;
  .boxShadow(1px, 1px, 6px, #333);
}
.footer {
  .borderRadius(10px);
}
```

输出 CSS：

```css
.header {
  border-radius: 5px;
  box-shadow: 1px 1px 6px #333;
}
.footer {
  border-radius: 10px;
}
```

3. 嵌套

有 `&` 时解析的是同一个元素或此元素的伪类，没有 `&` 解析是后代元素。

```less
.top {
  color: blue;
  .center {
    text-align: center;
  }
  a {
    color: red;
    text-decoration: none;
    &:hover {
      color: black;
    }
  }
}
```

4. 运算

```
@init: #111;
@switchColor: @init*3;
.switch {
  color: @switchColor; // #333
}
```

## NPM 支持
- [extend/npm]

Touch WX 中支持通过 npm 引入模块，通过修改 `package.json` 即可。

## 引入资源
- [extend/import]

1. 引入 js

在 `pages/test.wx` 中引入 `static/data/city.js` 文件：

```js
import city from '../static/data/city.js'
```

2. 引入 less/wxss

在 `pages/test.wx` 中引入 `/static/styles/test.less` 和 `/static/styles/test.wxss` 文件：

```css
@import '../static/styles/test.less';
@import '../static/styles/test.wxss';
```

3. 引入 Template

定义 `item.wxml` 模板：

```vue
<template name="item">
  <text>{{text}}</text>
</template>
```

在 `index.wx` 中引入：

```vue
<import src="item.wxml"/>
<template is="item" data="{{text: 'forbar'}}"/>
```

模版不支持引入 wx 文件，只支持引入 wxml 文件。

此外，模板名字如果带 `-` 可能导致引入出错。


[extend/icon]: <http://www.wetouch.net/touchwx_doc/quickstart/extend/icon>
[extend/constant]: <http://www.wetouch.net/touchwx_doc/quickstart/extend/constant>
[extend/styleLib]: <http://www.wetouch.net/touchwx_doc/quickstart/extend/styleLib>
[extend/api]: <http://www.wetouch.net/touchwx_doc/quickstart/extend/api>
[extend/less]: <http://www.wetouch.net/touchwx_doc/quickstart/extend/less>
[extend/npm]: <http://www.wetouch.net/touchwx_doc/quickstart/extend/npm>
[extend/import]: <http://www.wetouch.net/touchwx_doc/quickstart/extend/import>
