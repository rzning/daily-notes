---
title       : Vuejs Slot Syntax shorthand
recorddate  : 2020-03-19
---

# Vuejs RFCs 插槽语法简写

- <https://github.com/vuejs/rfcs/blob/master/active-rfcs/0002-slot-syntax-shorthand.md>

适用版本： 2.x & 3.x

## 摘要

为 [rfc-0001] 中提出的 `v-slot` 语法添加简写语法。

[rfc-0001]: <https://github.com/vuejs/rfcs/blob/master/active-rfcs/0001-new-slot-syntax.md>

## 详细设计

简写遵循类似于 `v-bind` 和 `v-on` 的简写规则：

- 使用符号 `#` 替换指令名和冒号 `v-slot:`

```xml
<!-- full syntax -->
<template v-slot:header="{ msg }">

<!-- shorthand -->
<template #header="{ msg }">
```

- 对于默认插槽，不能简写为 `#=`

```xml
<Foo v-slot="{ msg }">
  {{ msg }}
</Foo>

<Foo #default="{ msg }">
  {{ msg }}
</Foo>
```

## 备选方案

使用 `&` 标记：

```xml
<template &header="{ msg }">
```
