---
title: Vuejs Dynamic Directive Arguments
recorddate: 2020-03-19
---

# Vuejs RFCs 动态指令参数

- [Vuejs-RFC-0003-dynamic-directive-arguments][rfc-0003]

[rfc-0003]: https://github.com/vuejs/rfcs/blob/master/active-rfcs/0003-dynamic-directive-arguments.md

适用版本： 2.x / 3.x

## 摘要

在指令参数中支持动态值。

## 基本示例

```xml
<div v-bind:[key]="value"></div>
<div v-on:[event]="handler"></div>
```

## 动机

由于指令参数是静态的，目前用户不得不利用无参数的对象绑定来取得动态键：

```xml
<div v-bind="{ [key]: value }"></div>
<div v-on="{ [event]: handler }"></div>
```

## 详细设计

```xml
<div v-bind:[key]="value"></div>

<div :[key]="value"></div>

<div v-on:[event]="handler"></div>

<div @[event]="handler"></div>

<foo>
  <template v-slot:[name]>
    Hello
  </template>
</foo>

<foo>
  <template #[name]>
    Default slot
  </template>
</foo>
```

- 动态参数值应该是字符串

- 使用 `null` 显式地表示应该删除绑定

- 任何其他非字符串值都可能出错，并将触发警告

- `null` 作为一个特殊值只适用于 `v-bind` 和 `v-on` 而不适用于 `v-slot`

  - 因为 `v-slot` 不是绑定，不能删除。

- 自定义指令有决定如何处理非字符串参数的自由

## 缺点和注意事项

表达式约束

- `html` 属性名不能包含空格和引号，比如一下情景：

  ```xml
  <div :[key + 'foo']="value"></div>
  ```

- 一个变通的方法是：

  ```xml
  <div :[`${key}foo`]="value"></div>
  ```

- 也就是说，复杂的动态键绑定应该通过计算属性在 JavaScript 中进行预转换
