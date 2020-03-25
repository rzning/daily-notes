---
title       : Vuejs Composition API
recorddate  : 2020-03-25
---

# Vuejs RFCs Composition API

[Vuejs-RFC-0013-composition-api][rfc-0013]

[rfc-0013]: <https://github.com/vuejs/rfcs/blob/master/active-rfcs/0013-composition-api.md>

适用版本： 2.x / 3.x

> 由于此 RFC 很长，所以另在独立页面部署：
>
> - Vue Composition API [RFC](https://vue-composition-api-rfc.netlify.com/)
> - [API Reference](https://vue-composition-api-rfc.netlify.com/api/)

## 🧭 摘要

介绍 Composition API ：包含一组可添加的、基于函数的 API，允许灵活地组合组件逻辑。

## 🌱 基本示例

```vue
<template>
  <button @click="increment">
    Count is: {{ state.count }}, double is: {{ state.double }}
  </button>
</template>

<script>
import { reactive, computed } from 'vue'

export default {
  setup() {
    const state = reactive({
      count: 0,
      double: computed(() => state.count * 2)
    })

    function increment() {
      state.count++
    }

    return {
      state,
      increment
    }
  }
}
</script>
```

## 🍃 动机

### 🔸 逻辑复用和代码组织

现在将代码组织为每个函数都执行特定的功能，而不必总是通过选项来组织代码。

新的 API 还是的在组件之间提取和重用逻辑变得更加简单。

### 🔸 更好的类型推断

新 API 大多使用的是普通的变量和函数，它们自然是类型友好的。

使用新 API 编写的代码可以享受完整的类型推断，几乎不需要手动类型提示。

使用新 API 编写的 TypeScript 代码与通过 JavaScript 编写的看起来几乎相同。

因此，即使是使用 JavaScript 的用户也可以获得更好的 IDE 支持。

## 📜 详细设计

> - API 介绍
> - 代码组织
> - 逻辑提取和重用
> - 与现有 API 一起使用
> - 插件开发

