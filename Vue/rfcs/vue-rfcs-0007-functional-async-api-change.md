---
title: Vuejs Functional Async API Change
recorddate: 2020-03-22
---

# Vuejs RFCs 函数式异步 API 更改

[Vuejs-RFC-0007-functional-async-api-change][rfc-0007]

[rfc-0007]: https://github.com/vuejs/rfcs/blob/master/active-rfcs/0007-functional-async-api-change.md

适用版本： 3.x

## 摘要

- 函数式组件必须以普通函数的形式编写:

  - 移除 `{ function: true }` 选项
  - 不再支持 `<template functional>` 模板语法

- 异步组件必须通过 `createAsyncComponent` API 方法创建。

## 2.x 中的函数式组件

> [函数式组件 — Vue.js 2.x](https://cn.vuejs.org/v2/guide/render-function.html#函数式组件)

我们可以将组件标记为 `functional` 表示它是无状态的，也就是没有响应式数据，也没有 Vue 组件实例。

一个函数式组件示例：

```js
Vue.component('my-component', {
  functional: true,
  // 可选的 Props
  props: {}
  // 提供第二个参数作为上下文
  render (createElement, context) {
    //...
  }
})
```

当使用函数式组件时，引用的将会是 HTMLElement ，因为它们是无状态的也是无实例的。

在 2.5.0 以上版本，可以使用基于模板的函数式组件：

```xml
<template functional>
</template>
```

## 基本示例

```js
import { h } from 'vue'

const FunctionalComp = (props) => {
  return h('div', `Hello! ${props.name}`)
}
```

```js
import { createAsyncComponent } from 'vue'

const AsyncComp = createAsyncComponent(() => import('./Foo.vue'))
```

## 详细设计

运行时 Props 验证：

```js
const FunctionalComp = (props) => {
  return h('div', `Hello! ${props.name}`)
}

FunctionalComp.props = {
  name: String
}
```

创建异步组件方法支持的高级选项：

```js
import { createAsyncComponent } from 'vue'

const AsyncComp = createAsyncComponent({
  factory: () => import('./Foo.vue'),
  delay: 200,
  timeout: 3000,
  error: ErrorComponent,
  loading: LoadingComponent
})
```
