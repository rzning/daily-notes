---
title: Vetur
recorddate: 2020-02-21
repository: https://github.com/vuejs/vetur
website: https://vuejs.github.io/vetur/
---

Vetur is a Vue tooling for VS Code, powered by [vue-language-server]

[vue-language-server]: https://github.com/vuejs/vetur/tree/master/server

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

| syntax                   | lang        |
| ------------------------ | ----------- |
| `<template>`             | `html`      |
| `<template lang="pug">`  | `pug`       |
| `<template lang="jade">` | `pug`       |
| `<template lang="haml">` | `haml`      |
| `<template lang="slm">`  | `slm`       |
| `<style>`                | `css`       |
| `<style lang="postcss">` | `postcss`   |
| `<style lang="scss">`    | `scss`      |
| `<style lang="sass">`    | `sass Sass` |
| `<style lang="less">`    | `less`      |
| `<style lang="stylus">`  | `stylus`    |
| `<script>`               | `js`        |
| `<script lang="ts">`     | `ts`        |
| `<script lang="coffee">` | `coffee`    |

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

### 错误检测

Vuter 支持以下语言的错误检查：

- `<template>` : `html`
- `<style>` : `css` , `scss` , `less`
- `<script>` : `js` , `ts`

可以通过以下方式选择性地关闭错误检查：

```js
vetur.validation.[template/style/script]
```

Vetur 捆绑了 `eslint-plugin-vue` 用于模板错误检查。

| 项目    | Vetur 默认加载的规则集      |
| ------- | --------------------------- |
| Vue 2.x | `plugin:vue/essential`      |
| Vue 3.x | `plugin:vue/vue3-essential` |

如果你想配置 ESLint 规则，请执行以下操作：

- 关闭 Vetur 的模板验证 `vetur.validation.template: false`
- 确保安装了 ESLint 插件。错误将来自 ESLint 插件，而非 Vetur 。
- 在项目根目录安装 `yarn add --dev eslint eslint-plugin-vue`
- 在 `.eslintrc` 中配置 ESLint 规则，例如：

  ```json
  {
    "extends": ["eslint:recommended", "plugin:vue/recommended"],
    "rules": {
      "vue/html-self-closing": "off"
    }
  }
  ```

你可以查看 [Veturpack](https://github.com/octref/veturpack) 来了解如何配置 `eslint-plugin-vue`

TSLint 目前还不可用。同时，会显示 TS 编译器的错误。

### 格式化

Vetur 支持以下嵌入语言的格式化： `html/pug/css/scss/less/postcss/stylus/js/ts`

| 格式化器                            | 语言                                   |
| ----------------------------------- | -------------------------------------- |
| [prettier]                          | css/scss/less/js/ts                    |
| [prettier] + [@prettier/plugin-pug] | pug                                    |
| [prettier-eslint]                   | js - 运行 `prettier` 和 `eslint --fix` |
| [stylus-supremacy]                  | stylus                                 |
| [vscode-typescript]                 | js/ts                                  |
| [sass-formatter]                    | 文件中的 `sass` 部分                   |

[prettier]: https://github.com/prettier/prettier
[@prettier/plugin-pug]: https://github.com/prettier/plugin-pug
[prettier-eslint]: https://github.com/prettier/prettier-eslint
[stylus-supremacy]: https://github.com/ThisIsManta/stylus-supremacy
[vscode-typescript]: https://github.com/Microsoft/TypeScript
[sass-formatter]: https://github.com/TheRealSyler/sass-formatter

Vetur 捆绑了上述所有格式化器， 若配置了 `vetur.useWorkspaceDependencies: true` 则会优先使用你项目中的本地版本。

你可以在 VS Code 配置中选择每种语言的默认格式化器： `vetur.format.defaultFormatter`

- 将一种语言的格式化程序设置为 `none` 将禁用该语言的格式化程序。

```json
{
  "vetur.format.defaultFormatter.html": "prettier",
  "vetur.format.defaultFormatter.pug": "prettier",
  "vetur.format.defaultFormatter.css": "prettier",
  "vetur.format.defaultFormatter.postcss": "prettier",
  "vetur.format.defaultFormatter.scss": "prettier",
  "vetur.format.defaultFormatter.less": "prettier",
  "vetur.format.defaultFormatter.stylus": "stylus-supremacy",
  "vetur.format.defaultFormatter.js": "prettier",
  "vetur.format.defaultFormatter.ts": "prettier",
  "vetur.format.defaultFormatter.sass": "sass-formatter"
}
```
