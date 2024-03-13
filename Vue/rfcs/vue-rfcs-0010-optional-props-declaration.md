---
title: Vuejs Optional Props Declaration
recorddate: 2020-03-23
---

# Vuejs RFCs 可选的 Props 声明

[Vuejs-RFC-0010-optional-props-declaration][rfc-0010]

[rfc-0010]: https://github.com/vuejs/rfcs/blob/master/active-rfcs/0010-optional-props-declaration.md

适用版本： 2.x & 3.x

## 摘要

使组件的 Props 可选。

## 动机

在不需要运行时 Props 检查的简单用例（特别是函数式组件）中，使 Props 成为可选的选项可以使代码更精简。

## 详细设计

### 有状态组件

当一个组件没有任何 `props` 声明时，父组件传递的所有属性都会暴露在 `this.$props` 中。

与声明了 Props 的不同，它们不会直接暴露在 `this` 上。

另外在这种情况下 `this.$attrs` 和 `this.$props` 将指向同一对象。

```vue
<template>
  <div>{{ $props.foo }}</div>
</template>

<script>
export default {}
</script>
```

### 函数式组件

```js
const FunctionalComp = (props) => {
  return h('div', props.foo)
}
```

若要声明普通函数式组件的 Props 可直接将其附加到函数本身：

```js
FunctionalComp.props = {
  foo: Number
}
```

与有状态组件一样，当声明 Props 时， `props` 参数只包含声明的 Props ，对于未声明为 Props 的属性将位于第三个参数 `attrs` 中：

```js
const FunctionalComp = (props, slots, attrs) => {
  // `attrs` 包含所有接收到的属性，除了已声明的 `foo`
}

FunctionalComp.props = {
  foo: Number
}
```
