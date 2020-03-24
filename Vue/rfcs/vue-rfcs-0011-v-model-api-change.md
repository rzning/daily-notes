---
title       : Vuejs v-model API Change
recorddate  : 2020-03-24
---

# Vuejs RFCs v-model API 更改

[Vuejs-RFC-0011-v-model-api-change][rfc-0011]

[rfc-0011]: <https://github.com/vuejs/rfcs/blob/master/active-rfcs/0011-v-model-api-change.md>

适用版本： 3.x

## 🧭 摘要

在自定义组件上使用时调整 `v-model` API

这是建立在 [rfc-0005] （使用 `v-model` 参数替换 `v-bind` 的 `.sync` 修饰符）之上的。

[rfc-0005]: <https://github.com/vuejs/rfcs/blob/master/active-rfcs/0005-replace-v-bind-sync-with-v-model-argument.md>

## 📜 详细设计

在 3.0 中 `model` 选项将被移除。

一个组件上的不带参数的 `v-model="foo"` 将编译为一下代码：

```js
h(Comp, {
  modelValue: foo,
  'onUpdate:modelValue': value => (foo = value)
})
```

为了将其值同步回父组件，子进程应该发出一个名为 `update:modelValue` 的事件。

`v-model` 可以接收参数，参数用来表示应该绑定到 `v-model` 的 Prop 名。

例如 `v-model:value="foo"` 将编译为：

```js
h(Comp, {
  value: foo,
  'onUpdate:value': value => (foo = value)
})
```

在这种情况下，子组件需要一个名为 `value` 的 Prop 并发出 `update:value` 事件来同步。

在一个组件上可以启用多个 `v-model` 绑定，并且无需在组件内部添加额外的配置：

```xml
<InviteeForm
  v-model:name="inviteeName"
  v-model:email="inviteeEmail"
/>
```

### 处理修饰符

在 v3 版本中，添加到组件 `v-model` 上的修饰符将通过 `modelModifiers` Prop 提供给组件：

```xml
<Comp v-model.foo.bar="text" />
```

将编译为：

```js
h(Comp, {
  modelValue: text,
  'onUpdate:modelValue': value => (text = value),
  modelModifiers: {
    foo: true,
    bar: true
  }
})
```

给带参数的 `v-model` 添加修饰符：

```xml
<Comp
  v-model:foo.trim="text"
  v-model:bar.number="number"
/>
```

将编译为：

```js
h(Comp, {
  foo: text,
  'onUpdate:foo': value => (text = value),
  fooModifiers: { trim: true },
  bar: number,
  'onUpdate:bar': value => (bar = value),
  barModifiers: { number: true },
})
```

### 在原生元素上使用

在 2.x 版本中，编译器会根据使用的元素类型 `v-model` 生成不同的代码。

这种策略并不能很好地处理动态元素或输入类型：

```html
<input :type="dynamicType" v-model="foo">
```

编译器无法在编译时猜测正确的 prop/event 组合，因此必须生成
[非常详细的代码](https://template-explorer.vuejs.org/#<input%20%3Atype%3D"foo"%20v-model%3D"bar">)
来涵盖可能的情况。

在 3.0 中，在原生元素上的 `v-model` 生成的输出与在组件上使用的输出完全相同。

例如 `<input v-model="foo">` 将编译为：

```js
h('input', {
  modelValue: foo,
  'onUpdate:modelValue': value => {
    foo = value
  }
})
```

负责为 web 平台修补元素 Props 的模块将动态地确定如何实际应用它们。
这使得编译器可以输出更少的代码。
