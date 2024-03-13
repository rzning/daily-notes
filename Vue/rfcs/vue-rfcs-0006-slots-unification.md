---
title: Vuejs Slots Unification
recorddate: 2020-03-21
---

# Vuejs RFCs 统一插槽

[Vuejs-RFC-0006-slots-unification][rfc-0006]

[rfc-0006]: https://github.com/vuejs/rfcs/blob/master/active-rfcs/0006-slots-unification.md

适用版本： 3.x

## 摘要

统一普通插槽 (Normal Slots) 和作用域插槽 ( Scoped Slots ) 的概念。

## 动机

- 普通插槽和作用域插槽的分离是由于作用域插槽作为新概念后来添加的结果，并且它们在 2.x 中有不同的内部实现。

  - 这种分离在技术上是不必要的，将两者统一可以简化插槽的整体概念。

- 开发者不在担心同时处理 `$slots` 和 `$scoopedSlots`

- 将所有插槽编译为函数，可以在大型组件树渲染中提高性能。

## 详细设计

统一插槽涉及两个部分：

1. 语法的统一

   - 包括在 2.6 的 `v-slot`

2. 实现的统一

   - 统一使用 `this.$slots`
   - 移除 `this.$scopedSlots`
   - 在 2.6 中所有使用 `v-slot` 语法的插槽已在其内部编译为函数。
   - 2.x 中 `this.$scopedSlots` 还作为普通插槽的代理，可公开使用

## 在渲染函数中的使用

```js
h(Comp, [h('div', this.msg)])

// 相当于
h(Comp, () => [h('div', this.msg)])
```

具名插槽：新语法中内容节点上不在需要特殊的插槽数据属性。

```js
// 2.x
h(Comp, [
  h('div', { slot: 'foo' }, this.foo),
  h('div', { slot: 'bar' }, this.bar)
])

// 3.0
// Note the `null` is required to avoid the slots object being mistaken
// for props.
h(Comp, null, {
  foo: () => h('div', this.foo),
  bar: () => h('div', this.bar)
})
```

插槽可以手动标注，这样 Vue 就不会在父槽更新时强制子槽更新：

```js
h(Comp, null, {
  $stable: true,
  foo: () => h('div', this.foo),
  bar: () => h('div', this.bar)
})
```

## 采纳策略

大部分更改已在 2.6 中发布，剩下的唯一事情就是将 `this.$scopedSlots` 从 API 中删除。

在 3.0 中使用统一的 `this.$slots` 标识。
