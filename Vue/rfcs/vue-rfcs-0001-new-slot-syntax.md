---
title       : Vuejs New Slot Syntax
recorddate  : 2020-03-19
---

# Vuejs RFCs 新的插槽语法

- <https://github.com/vuejs/rfcs/blob/master/active-rfcs/0001-new-slot-syntax.md>

适用版本： 2.x & 3.x

## 摘要

引入一个新的作用域插槽语法：

- 新指令 `v-slot` 将 `slot` 和 `slot-scope` 整合为单一指令语法。

- `v-solt` 简写可以潜在的统一作用域插槽和普通插槽的使用。

## 详细设计

引入新指令 `v-slot`

- 使用有 `v-slot` 指令修饰的 `<template>` 标签表示插槽容器

- 插槽名称通过指令参数 ( Directive Argument ) 标识

```xml
<foo>
  <template v-slot:header>
    <div class="header"></div>
  </template>

  <template v-slot:body>
    <div class="body"></div>
  </template>

  <template v-slot:footer>
    <div class="footer"></div>
  </template>
</foo>
```

- 使用指令的属性值声明接收到的作用域插槽属性

```xml
<foo>
  <template v-slot:header="{ msg }">
    <div class="header">
      来自 header 插槽的消息： {{ msg }}
    </div>
  </template>
</foo>
```

- `v-slot` 指令可以不带参数直接用于组件上，以指示该组件的默认插槽是作用域插槽

```xml
<foo v-slot="{ msg }">
  {{ msg }}
</foo>
```

## 用法比较

```xml
<!-- old -->
<foo>
  <template slot-scope="{ msg }">
    {{ msg }}
  </template>
</foo>

<!-- new -->
<foo v-slot="{ msg }">
  {{ msg }}
</foo>
```

嵌套的默认插槽：

```xml
<!-- old -->
<foo>
  <bar slot-scope="foo">
    <baz slot-scope="bar">
      <template slot-scope="baz">
        {{ foo }} {{ bar }} {{ baz }}
      </template>
    </baz>
  </bar>
</foo>

<!-- new -->
<foo v-slot="foo">
  <bar v-slot="bar">
    <baz v-slot="baz">
      {{ foo }} {{ bar }} {{ baz }}
    </baz>
  </bar>
</foo>
```

具名插槽：

```xml
<!-- old -->
<foo>
  <template slot="one" slot-scope="{ msg }">
    text slot: {{ msg }}
  </template>

  <div slot="two" slot-scope="{ msg }">
    element slot: {{ msg }}
  </div>
</foo>

<!-- new -->
<foo>
  <template v-slot:one="{ msg }">
    text slot: {{ msg }}
  </template>

  <template v-slot:two="{ msg }">
    <div>
      element slot: {{ msg }}
    </div>
  </template>
</foo>
```

```xml
<!-- old -->
<Foo>
  <Bar slot="one" slot-scope="one">
    <div slot-scope="bar">
      <span>组件 Foo 插槽 one 数据 {{ one }}</span>
      <span>组件 Bar 默认插槽数据 {{ bar }}</span>
    </div>
  </Bar>

  <Bar slot="two" slot-scope="two">
    <div slot-scope="bar">
      <span>组件 Foo 插槽 two 数据 {{ two }}</span>
      <span>组件 Bar 默认插槽数据 {{ bar }}</span>
    </div>
  </Bar>
</Foo>

<!-- new -->
<Foo>
  <template v-slot:one="one">
    <Bar v-slot="bar">
      <div>{{ one }} {{ bar }}</div>
    </Bar>
  </template>

  <template v-slot:two="two">
    <Bar v-slot="bar">
      <div>{{ two }} {{ bar }}</div>
    </Bar>
  </template>
</Foo>
```
