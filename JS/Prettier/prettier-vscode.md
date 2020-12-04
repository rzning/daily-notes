# Prettier Formatter for Visual Studio Code

- <https://github.com/prettier/prettier-vscode>

适用于 VS Code 的 [Prettier](https://prettier.io/) 格式化扩展程序。

## 1. Default Formatter （默认格式化程序）

为确保此扩展能正常使用，请确保在 VS Code 设置中将此扩展设置为默认格式化程序。

可以为所有语言或者针对特定语言进行设置。

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

- 此扩展默认使用项目本地依赖中的 Prettier 。
- 若将 `prettier.resolveGlobalModules` 设置为 `true` 时，扩展也将尝试解析全局模块。
- 若项目本地和全局都没有找到 Prettier ，则使用与扩展捆绑在一起的 Prettier 版本。

在你项目中安装 Prettier 并按照建议固定其版本：

```sh
# npm
npm install --save-dev --save-exact prettier

# yarn
yarn add --dev --exact prettier
```

确保有 Prettier 配置文件，以便让编辑器和其他工具知道你正在使用 Prettier
，比如新建空对象到 `.prettierrc.json` ：

```json
{}
```

创建 `.prettierignore` 文件，记录哪些文件不需要被格式化。

```igonre
build
coverage

# 忽略所有样式文件
*.css
```

## 2. 配置优先级

1. Prettier 配置文件
2. `.editorconfig`
3. VS Code 设置

若存在任何本地配置文件，比如 `.prettierrc` ，则 VS Code 设置将不会被使用。

## 3. 使用

### 3.1 Format On Save

遵循 `editor.formatOnSave` 设置，也可以在每个语言基础上进行设置：

```json
{
  "editor.formatOnSave": false,
  "[javascript]": {
    "editor.formatOnSave": true
  }
}
```

### 3.2 Format Selection

格式选择可以在多种语言上工作，这取决于 Prettier 本身支持什么。目前支持下列语言：

```
javascript
javascriptreact
typescript
typescriptreact
json
graphql
```

## 4. Linter Integration （与 Linter 整合）

有两种方法可以同时使用 Prettier 和 Linters ：

- 第一种方法是简单地让每个工具做它应该做的事情。
  - 可以通过禁用 Linter 检查格式中的任何规则，并让 Prettier 自动处理所有格式来实现。

- 第二种方法是通过插件让 Linter 来运行 Prettier 。

> Refer: Integrating with Linters · Prettier
> - <https://prettier.io/docs/en/integrating-with-linters.html>

### 4.1 禁用 Linter 中的格式化规则

与 Linters 集成的最简单和推荐的方法是：
让 Prettier 进行格式化，并将 Linter 配置为不处理格式化规则。

也就是说，将 Prettier 用于代码格式问题，将 Linter 用于代码质量问题。

可以通过下列预设的配置，快速关闭与 Prettier 冲突或不必要的规则：

- [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)
- [tslint-config-prettier](https://github.com/alexjoverm/tslint-config-prettier)
- [stylelint-config-prettier](https://github.com/prettier/stylelint-config-prettier)

以 ESLint 为例，首先安装 `eslint-config-prettier` ，
然后添加到 `.eslintrc` 文件的 `extends` 数组中：

```sh
yarn add --dev eslint-config-prettier
```

`.eslintrc.json` :

```json
{
  "extends": [
    "some-other-config-you-use",
    "prettier"
  ]
}
```

一些 ESLint 插件也能很好支持：

- @typescript-eslint/eslint-plugin
- eslint-plugin-babel
- eslint-plugin-flowtype
- eslint-plugin-react
- eslint-plugin-standard
- eslint-plugin-unicorn
- eslint-plugin-vue

为你使用的插件添加额外的除外条款：

```json
{
  "extends": [
    "some-other-config-you-use",
    "prettier",
    "prettier/@typescript-eslint",
    "prettier/babel",
    "prettier/flowtype",
    "prettier/react",
    "prettier/standard",
    "prettier/unicorn",
    "prettier/vue"
  ]
}
```

你可以为 Linter 启用保存时自动修复，并且仍然具有格式化和快速修复功能：

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.fixAll.tslint": true,
    "source.fixAll.stylelint": true
  }
}
```

### 4.2 通过 Linter 运行 Prettier

若将编辑器配置为通过 Linter 运行 Prettier ，则不需要使用此扩展。

通常不建议通过这种方式运行 Prettier ，因为这会在编辑器中出现很多烦人的红色波浪线，
而且他们比直接运行 Prettier 要慢。

想要在 Linter 上运行 Prettier 可以安装相应的 Linter 扩展：

- [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier)
- [tslint-plugin-prettier](https://github.com/ikatyang/tslint-plugin-prettier)
- [stylelint-prettier](https://github.com/prettier/stylelint-prettier)

在保存时禁用格式化，以便不运行此扩展，然后启用在保存时执行代码的 Linters 操作：

```json
{
  "editor.formatOnSave": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.fixAll.tslint": true,
    "source.fixAll.stylelint": true
  }
}
```


## 5. 设置

### 5.1 Prettier Settings

可以在此扩展中配置所有 Prettier 的选项，当项目中没有配置文件时，这些配置将用作备用。

有关这些选项的参考，可参见 Prettier 文档：

- <https://prettier.io/docs/en/options.html>

```yaml
prettier.arrowParens # 在单独的箭头函数参数两边添加括号 `always` | `avoid`
prettier.bracketSpacing # 对象的内容与花括号之间是否打印空格 `true`
prettier.endOfLine # 行结束符 `lf` | `crlf` | `cr` | `auto`
prettier.htmlWhitespaceSensitivity # 指定 HTML 文件的全局空格敏感度 `css` | `strict` | `ignore`
prettier.insertPragma # 是否在格式化后的文件顶部插入 `@format` 注释标记 `false`
prettier.jsxBracketSameLine # 将标签的 `>` 放到属性最后一行末尾，而不单独放在下一行 `false`
prettier.jsxSingleQuote # 在 jsx 中使用单引号而不是双引号 `false`
prettier.printWidth # 每行宽度 `80`
prettier.proseWrap # 是否根据 `printWidth` 强制换行 `preserve` | `always` | `never`
prettier.quoteProps # 对象属性是否添加引号 `as-needed` | `consistent` | `preserve`
prettier.requirePragma # 只格式化文件顶部有 `@prettier` 或  `@format` 注释的文件 `false`
prettier.semi # 在语句末尾打印分号 `true`
prettier.singleQuote # 使用单引号而不是双引号 `false`
prettier.tabWidth # 每个缩进基本的空格数 `2`
prettier.trailingComma # 对象或数组等多行时是否打印尾随逗号 `es5` | `none` | `all`
prettier.useTabs # 使用制表符而不是空格进行缩进 `false`
prettier.vueIndentScriptAndStyle # 是否缩进 Vue 文件中的 `<script>` 和 `style` 标签 `false`
prettier.embeddedLanguageFormatting # 是否格式化文件中嵌入的代码 `auto` | `off`
```

### 5.2 Extension Settings

这些设置特定于 VS Code ，需要在 VS Code 设置文件中进行进行设置。

```yaml
prettier.enable # 是否启用 Prettier `true`
prettier.requireConfig # 是否需要一个 Prettier 配置文件来格式化文件 `false`

prettier.ignorePath # 提供忽略文件的路径 `.prettierignore` | `.gitignore` | `null`
                    # 若设置了该值，则始终使用此值，并忽略本地忽略文件。

prettier.configPath # 提供 Prettier 配置文件的自定义路径
                    # 若设置了该值，则始终使用此值，并忽略本地配置文件。

prettier.prettierPath # 提供一个到 Prettier 库的自定义路径
                      # 此路径应指向模块文件夹，而不是 bin / script 路径
                      # 即 `./node_modules/prettier` 而不是 `./bin/prettier`

prettier.packageManager # 指定用于解析模板使用的包管理器 `npm` | `yarn` | `pnpm`
                        # 仅当全局解析模块时，才有影响。

prettier.resolveGlobalModules # 启用后，若无法解析本地模块时，此扩展将尝试使用
                              # `prettier.packageManager` 指定的包管理器下的全局模块
                              # 默认值 `false` ，建议尽可能使用本地模块。

prettier.disableLanguages # 禁用此扩展的语言 ID 列表
prettier.documentSelectors # 用于此扩展格式化程序的 glob 模式列表，比如 `**/*.abc`
prettier.useEditorConfig # 解析配置时是否考虑 `.editorconfig` 配置 `true`
prettier.withNodeModules # 是否处理 `node_modules` 文件夹中中文件 `false`
```

若你注册了扩展名为 `.abc` 的 glob 到 `prettier.documentSelectors` 文档选择器配置，
可 Prettier 仍然不知道该如何处理此文件。

```json
{
  "prettier.documentSelectors": ["**/*.abc"]
}
```

为了告诉 Prettier 改如何格式化 `.abc` 文件类型，我们可以在 Prettier 配置中设置覆盖，
使该文件类型使用 `babel` 解析器。

```json
{
  "overrides": [
    {
      "files": "*.abc",
      "options": {
        "parser": "babel"
      }
    }
  ]
}
```
