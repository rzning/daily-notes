---
title       : Vuejs Global API Change
recorddate  : 2020-03-23
---

# Vuejs RFCs 全局 API 更改

[Vuejs-RFC-0009-global-api-change][rfc-0009]

[rfc-0009]: <https://github.com/vuejs/rfcs/blob/master/active-rfcs/0009-global-api-change.md>

适用版本： 3.x

## 摘要

重新设计应用程序引导和全局 API ：

- 对 Vue 的行为进行全局修改的全局 APIs 现在被移动到新的 `createApp()` 方法创建的应用实例 ( App Instance ) 中，它们的效果现在只局限于该应用程序实例。

## 基本示例

之前语法：

```js
import Vue from 'vue'
import App from './App.vue'

Vue.config.ignoredElements = [/^app-/]
Vue.use(/* ... */)
Vue.mixin(/* ... */)
Vue.component(/* ... */)
Vue.directive(/* ... */)

new Vue({
  render: h => h(App)
}).$mount('#app')
```

新的语法：

```js
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.config.isCustomElement = tag => tag.startsWith('app-')
app.use(/* ... */)
app.mixin(/* ... */)
app.component(/* ... */)
app.directive(/* ... */)

app.mount('#app')
```

## 详细设计

从技术上讲 Vue 2.x 没有应用 ( Application ) 的概念。
我们定义的应用程序只是一个通过 `new Vue()` 创建的根 Vue 实例。
从相同的 `Vue()` 构造函数创建的每个根实例共享相同的全局配置。

在这个提议中，我们引入了一个新的全局 API `createApp()` ：

```js
import { createApp } from 'vue'

const app = createApp({ /* 根组件定义 */ })
```

调用 `createApp()` 方法将返回一个应用实例。每个应用实例提供自己的应用上下文。

应用程序实例公开了当前全局 API 的子集。

Old APIs | New APIs
-|-
`Vue.config` | `app.config`
`Vue.config.productionTip` | 移除
`Vue.config.ignoredElements` | `app.config.isCustomElement`
`Vue.component` | `app.component`
`Vue.directive` | `app.directive`
`Vue.mixin` | `app.mixin`
`Vue.use` | `app.use`
`Vue.extend` | 不再适用，可使用新的 `defineComponent` 全局 API

### 挂载应用实例

应用实例可以通过 `mount()` 方法挂载根组件，并返回已挂载的根组件实例：

```js
const rootInstance = app.mount(App, '#app')
```

- `mount()` 方法接受第三个参数作为传递给根组件的 Props ：

  ```js
  app.mount(App, '#app', {
    // 要传递给根组件的 Props
  })
  ```

### Provide / Inject

应用实例可通过 `app.provide` 提供全局依赖数据，可以注入应用内的任何一个组件：

```js
// 一个应用实例
app.provide({
  [ThemeSymbol]: theme
})

// 应用中的一个子组件
export default {
  inject: {
    theme: {
      from: ThemeSymbol
    }
  },
  template: `<div :style="{ color: theme.textColor }">`
}
```

## 缺点

### 插件自动安装

许多 Vue 2.x 库和插件在他们的 UMD 版本中提供自动安装，例如 `vue-router` ：

```html
<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/vue-router"></script>
```

自动安装依赖于不在可用的 `Vue.use()` 调用。

这应该是一个相对容易的迁移，我们可以为 `Vue.use` 公开一个存根，使用时将发出警告。
