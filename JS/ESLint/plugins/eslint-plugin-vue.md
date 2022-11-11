# eslint-plugin-vue

- <https://eslint.vuejs.org/>
- <https://github.com/vuejs/eslint-plugin-vue>

> Official ESLint plugin for Vue.js.

此插件允许我们使用 ESLint 检查 `.Vue` 文件中的 `<template>` 和 `<script>` 标签内容，以及 `.js` 文件中的 Vue 代码。

- 发现语法错误。
- 查找 [Vue.js 指令](https://vuejs.org/api/built-in-directives.html) 的错误使用。
- 找到 [Vue.js 风格指南](https://vuejs.org/style-guide/) 的违例。

ESLint 编辑器集成对于实时检查你的代码很有用。

## 💿 Installation

```sh
# Via vue-cli
vue add @vue/cli-plugin-eslint

# Via npm
npm install --save-dev eslint eslint-plugin-vue

# Via yarn
yarn add --dev eslint eslint-plugin-vue
```

> 版本要求 Requirements
>
> - ESLint v6.2.0 and above
> - Node.js v14.17.x, v16.x and above

## 📖 Usage

### 1️⃣ 配置 Configuration

使用 `.eslintrc.*` 文件来配置规则，例如 `.eslintrc.js` ：

```js
module.exports = {
  extends: [
    // 在这里添加更多通用规则集，例如：
    // 'eslint:recommended'
    'plugin:vue/vue3-recommended'
    // 'plugin:vue/recommended' // 如果你使用 Vue.js 2.x 请使用这个。
  ],
  rules: {
    // 在这里覆盖/添加规则设置，例如：
    // 'vue/no-unused-vars': 'error'
  }
}
```

> 配置参考： <https://eslint.org/docs/user-guide/configuring>

查看 [规则列表](https://eslint.vuejs.org/rules/) 获取插件提供的 `extends` & `rules` 。

此插件提供了一些预定义的配置。您可以通过将以下配置添加到 `extends` 来使用它们。

- `"plugin:vue/base"` -- 设置和规则来启用正确的 ESLint 解析。
- 使用 Vue.js 3.x 的配置：
  - `"plugin:vue/vue3-essential"`
  - `"plugin:vue/vue3-strongly-recommended"`
  - `"plugin:vue/vue3-recommended"`
- 使用 Vue.js 2.x 的配置：
  - `"plugin:vue/essential"`
  - `"plugin:vue/strongly-recommended"`
  - `"plugin:vue/recommended"`

| Priority | Name                 | Description                                    |
| -------- | -------------------- | ---------------------------------------------- |
| Base     | Base Rules           | 这个类别的规则对于插件提供的所有预设都是启用的 |
| A        | Essential            | 在 `base` 基础添加防止错误或意外行为的规则     |
| B        | Strongly Recommended | 附加规则以大大提高代码可读性和/或开发经验      |
| C        | Recommended          | 加上执行主观社区默认值的规则，以确保一致性     |

### 2️⃣ 从命令行运行 ESLint

```sh
eslint --ext .js,.vue src
eslint "src/**/*.{js,vue}"
```

### 3️⃣ 如何使用自定义解析器？

如果你想使用自定义解析器，比如 [@babel/eslint-parser][babel-parser] 或 [@typescript-eslint/parser][ts-parser]
，你必须使用 `parserOptions.parser` 选项而不是 `parser` 选项。
因为这个插件需要 [vue-eslint-parser] 来解析 `.vue` 文件，如果你覆盖了 `parser` 选项，这个插件就将无法工作。

```diff
- "parser": "@typescript-eslint/parser",
+ "parser": "vue-eslint-parser",
  "parserOptions": {
+     "parser": "@typescript-eslint/parser",
      "sourceType": "module"
  }
```

`parserOptions.parser` 选项还可以指定一个对象来指定多个解析器，可参考 [vue-eslint-parser] 了解更多细节。

[babel-parser]: https://www.npmjs.com/package/@babel/eslint-parser
[ts-parser]: https://www.npmjs.com/package/@typescript-eslint/parser
[vue-eslint-parser]: https://github.com/vuejs/vue-eslint-parser

### 4️⃣ ESLint 如何检测组件？

所有组件相关的规则都应用于，通过以下任何一项检测的代码：

- `Vue.component()` expression
- `Vue.extend()` expression
- `Vue.mixin()` expression
- `app.component()` expression
- `app.mixin()` expression
- `createApp()` expression
- `defineComponent()` expression
- `export default {}` in `.vue` or `.jsx` file

但是，如果你想在任何你自定义的 Vue 组件对象上使用规则，则可能需要使用特殊的 `// @vue/component` 注释，将下一行中的对象标记为 Vue 组件，例如：

```js
// @vue/component
const CustomComponent = {
  name: 'custom-component',
  template: '<div></div>'
}
```

```js
Vue.component('AsyncComponent', (resolve, reject) => {
  setTimeout(() => {
    // @vue/component
    resolve({
      name: 'async-component',
      template: '<div></div>'
    })
  }, 500)
})
```

### 5️⃣ 如何禁用规则？

你可以使用 `<!-- eslint-disable -->` 类 HTML 注释在 `<template>` 和 `.vue` 文件的块级别中临时禁用某条规则。

```vue
<template>
  <!-- eslint-disable-next-line vue/max-attributes-per-line -->
  <div a="1" b="2" c="3" d="4"> </div>
</template>
```

如果你想在 `<template>` 中禁用 `eslint-disable` 功能，可以禁用
[`vue/comment-directive`](https://eslint.vuejs.org/rules/comment-directive.html) 规则。

### 6️⃣ 解析器选项

此插件使用 [vue-eslint-parser] 解析器。

对于 `parserOptions` 选项，你可以使用 `vue-eslint-parser` 中的 `vueFeatures` 选项。

```json
{
  "parser": "vue-eslint-parser",
  "parserOptions": {
    "vueFeatures": {
      "filter": true,
      "interpolationAsNonHTML": false
    }
  }
}
```

查看 `vue-eslint-parser` 的 `parserOptions.vueFeatures`
[文档](https://github.com/vuejs/vue-eslint-parser#parseroptionsvuefeatures) 了解更多细节。

## 💻 Editor integrations

### Visual Studio Code

使用 Microsoft 官方提供的 [dbaeumer.vscode-eslint] 扩展。

[dbaeumer.vscode-eslint]: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint

你必须配置扩展的 `eslint.validate` 选项来检查 `.vue` 文件，因为 ESLint 扩展默认情况下只是针对 `*.js` 或 `*.jsx` 文件的。

```json
{
  "eslint.validate": ["javascript", "javascriptreact", "vue"]
}
```

如果你使用的是 `Vetur` 插件，需设置 `"vetur.validation.template": false` 以避免默认的 Vetur 模板验证。
查看 [Vetur 文档](https://vuejs.github.io/vetur/guide/linting-error.html#linting) 获取更多信息。
