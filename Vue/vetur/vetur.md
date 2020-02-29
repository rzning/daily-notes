---
title       : Vetur
recorddate  : 2020-02-21
repository  : https://github.com/vuejs/vetur
website     : https://vuejs.github.io/vetur/
---

Vetur is a Vue tooling for VS Code, powered by [vue-language-server]

[vue-language-server]: <https://github.com/vuejs/vetur/tree/master/server>

## Features

- 语法高亮
- 片段
- Emmet
- 整理/错误检查
- 格式化
- 智能感知
- 调试
- 框架支持
- 插值支持
- VTI / CLI

### 语法高亮

syntax | lang
-|-
`<template>` | `html`
`<template lang="pug">` | `pug`
`<template lang="jade">` | `pug`
`<template lang="haml">` | `haml`
`<template lang="slm">` | `slm`
`<style>` | `css`
`<style lang="postcss">` | `postcss`
`<style lang="scss">` | `scss`
`<style lang="sass">` | `sass	Sass`
`<style lang="less">` | `less`
`<style lang="stylus">` | `stylus`
`<script>` | `js`
`<script lang="ts">` | `ts`
`<script lang="coffee">` | `coffee`

Vetur 不支持显式添加默认语言：

```xml
<template lang="html"></template>
<style lang="css"></style>
<script lang="js"></script>
<script lang="javascript"></script>
```

预处理器不是语言，所以 `<script lang="babel">` 也是无效的。

#### 自定义块

Vetur 提供了自定义块设置，默认为：

```json
  "vetur.grammar.customBlocks": {
    "docs": "md",
    "i18n": "json"
  }
```

自定义块的有效语言有：

- 支持上面表格中列出的所有 `lang` 值
- `md` , `yaml` , `json` , `php` , `graphql`

### 代码片段

Vetur 允许你为每一种支持的嵌入语言使用代码片段。

例如，为 TypeScript 定义的代码片段将在 TypeScript 区域中可用：

```html
<script lang="ts">
  // 在此处使用 TS 代码片段
</script>
```

有两个列外：

- 在 `<template>` 标签中使用 `vue-html` 代码片段
- 在所有区域之外使用 `vue` 代码片段

```html
<template>
  <!-- 在此处使用 `vue-html` 代码片段 -->
</template>
<!-- 在此处使用 `vue` 代码片段 -->
<script>
  // 在此处使用 JS 代码片段
</script>
```

#### 可定制脚手架片段

> Customizable Scaffold Snippets

Vetur 提供了快速定义区域的脚手架片段，
这些片段在 `vue` 代码片段中定义，可在语言区域之外使用。

在 `*.vue` 文件中键入以下字符来使用它们：

- `<vue`
- `<template`
- `<style`
- `<script`
