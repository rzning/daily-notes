# 框架 > WXML 语法参考

> [dev/reference/wxml](https://developers.weixin.qq.com/miniprogram/dev/reference/wxml/)

## 数据绑定

```xml
<!-- 内容 -->
<view>{{ message }}</view>

<!-- 组件属性 -->
<view id="item-{{id}}"> </view>

<!-- 控制属性 -->
<view wx:if="{{condition}}"> </view>
```

## 列表渲染

```xml
<view wx:for="{{ array }}">{{ item }}</view>
```

```xml
<view wx:for="{{ array }}" wx:for-index="index" wx:for-item="item">
  {{ index }}: {{ item.name }}
</view>
```

## 条件渲染

```xml
<view wx:if="{{view == 'WEBVIEW'}}"> WEBVIEW </view>
<view wx:elif="{{view == 'APP'}}"> APP </view>
<view wx:else="{{view == 'MINA'}}"> MINA </view>
```

## 模板

WXML提供模板 ( template ) ，可以在模板中定义代码片段，然后在不同的地方调用。

```xml
<!-- 使用 `name` 属性定义模板 -->
<!--
  index: int
  msg: string
  time: string
-->
<template name="msgItem">
  <view>
    <text> {{index}}: {{msg}} </text>
  </view>
</template>

<!-- 使用 `is` 属性使用指定模板，使用 `data` 属性传入数据 -->
<template is="msgItem" data="{{ index: 0, msg: 'msg' }}"/>
```

## 引用

### import

`import` 用于引用目标文件内定义的 `template` 模板。

```xml
<!-- item.wxml -->
<template name="item">
  <text>{{text}}</text>
</template>
```

```xml
<!-- index.wxml -->

<!-- 引用 item.xml -->
<import src="item.wxml"/>
<!-- 使用 `item` 模板 -->
<template is="item" data="{{text: 'forbar'}}"/>
```

### include

`include` 用于将指定文件内除 `<template/>` 和 `<wxs>` 之外的所有内容拷贝到当前位置。

```xml
<!-- header.wxml -->
<view> header </view>
```

```xml
<!-- footer.wxml -->
<view> footer </view>
```

```xml
<!-- index.wxml -->
<include src="header.wxml"/>
<view> body </view>
<include src="footer.wxml"/>
```
