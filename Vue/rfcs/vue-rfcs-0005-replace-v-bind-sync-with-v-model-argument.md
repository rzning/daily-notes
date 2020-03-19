---
title       : Vuejs Replace v-bind's .sync With v-model Argument
recorddate  : 2020-03-20
---

# Vuejs RFCs v-bind 的 .sync 修饰符替换为 v-model 上的参数

[Vuejs-RFC-0005-replace-v-bind-sync-with-v-model-argument][rfc-0005]

[rfc-0005]: <https://github.com/vuejs/rfcs/blob/master/active-rfcs/0005-replace-v-bind-sync-with-v-model-argument.md>

适用版本： 3.x

## 摘要

移除 `v-bind` 的 `.sync` 修饰符，并使用 `v-model` 上的一个参数代替。

## 基本示例

```xml
<!-- 旧语法 -->
<MyComponent v-bind:title.sync="title" />

<!-- 新语法 -->
<MyComponent v-model:title="title" />
```

## 详细设计

在元素上使用：

```xml
<input v-model="xxx">

<!-- 相当于 -->
<input
  :model-value="xxx"
  @update:model-value="newValue => { xxx = newValue }"
>
```

```xml
<input v-model:aaa="xxx">

<!-- INVALID: 无效，应该抛出编译时错误 -->
```

在组件上使用：

```xml
<MyComponent v-model="xxx" />

<!-- 相当于 -->
<MyComponent
  :model-value="xxx"
  @update:model-value="newValue => { xxx = newValue }"
/>
```

```xml
<MyComponent v-model:aaa="xxx"/>

<!-- 相当于 -->
<MyComponent
  :aaa="xxx"
  @update:aaa="newValue => { xxx = newValue }"
/>
```
