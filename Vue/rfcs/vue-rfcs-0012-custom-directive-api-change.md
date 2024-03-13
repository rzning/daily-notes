---
title: Vuejs Custom Directive API Change
recorddate: 2020-03-25
---

# Vuejs RFCs 自定义指令 API 更改

[Vuejs-RFC-0012-custom-directive-api-change][rfc-0012]

[rfc-0012]: https://github.com/vuejs/rfcs/blob/master/active-rfcs/0012-custom-directive-api-change.md

适用版本： 3.x

## 🧭 摘要

重新设计自定义指令 API 使其更好地符合组件的生命周期。

## 🌱 基本示例

之前语法：

```js
const MyDirective = {
  bind(el, binding, vnode, prevVnode) {},
  inserted() {},
  update() {},
  componentUpdated() {},
  unbind() {}
}
```

新语法：

```js
const MyDirective = {
  beforeMount(el, binding, vnode, prevVnode) {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeUnmount() {}, // new
  unmounted() {}
}
```

## 📜 详细设计

| Before               | After             |
| -------------------- | ----------------- |
| `bind()`             | `beforeMount()`   |
| `inserted()`         | `mounted()`       |
| --                   | `beforeUpdate()`  |
| `update()`           | --                |
| `componentUpdated()` | `updated()`       |
| --                   | `beforeUnmount()` |
| `unbind`             | `unmounted()`     |

### 在组件上使用

在 3.0 版本中由于对片段的支持，组件可能有多个根节点。
当在具有多个根节点的组件上使用自定义指令时，将会产生问题。

为解释自定义指令在 3.0 版本的组件上如何工作的细节，
我们首先需要理解自定义指令是如何在 v3.0 中编译的。

对于下面命令：

```html
<div v-foo="bar"></div>
```

将大致编译为：

```js
const vFoo = resolveDirective('foo')

return withDirectives(h('div'), [[vFoo, bar]])
```

其中 `vFoo` 代表用户编写的指令对象，它包含了 `mounted()` 和 `updated()` 等钩子。

`withDirectives()` 方法返回一个克隆的 VNode，其中包含用户 Hooks，并将其作为 VNode 生命周期 Hooks 进行包装和注入：

```js
{
  onVnodeMounted(vnode) {
    // 调用 vFoo.mounted(...)
  }
}
```

因此，自定义指令已完全包含在 VNode 数据中。
当一个自定义指令被用在一个组件上时，
这些 `onVnodeXXX` 钩子将作为额外的 Props 传递给组件，
并最终到了 `this.$attrs` 属性中。

这也意味着在模板中可以像这样直接 Hook 到元素的生命周期中，这在自定义指令太复杂时非常方便:

```xml
<div @vnodeMounted="myHook" />
```

组件上的自定义指令规则与其他额外属性相同：由子组件决定在何处以及是否应用它。

当子组件对内部元素使用 `v-bind="$attrs"` 时，它还将应用它所使用的所有自定义指令。
