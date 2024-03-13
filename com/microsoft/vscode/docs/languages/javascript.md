# JavaScript in Visual Studio Code

- <https://code.visualstudio.com/docs/languages/javascript>

Visual Studio Code 包括内置的 JavaScript

- 智能感知 ( IntelliSense )
- 调试 ( Debugging )
- 格式化 ( Formatting )
- 代码导航 ( Code Navigation )
- 重构 ( Refactorings )

和许多其他高级语言特性。

这些特性中的大多数都是开箱即用的，而有些可能需要基本配置才能获得最佳体验。

有关这些特性如何工作和如何配置的更深入的指南，可参阅：

> [Working with JavaScript](https://code.visualstudio.com/docs/nodejs/working-with-javascript)

## IntelliSense

智能感知向用户展示了：

- 智能代码完成 ( intelligent code completion )
- 悬停信息 ( hover info )
- 签名信息 ( signature information )

这样用户就可以更快、更正确地编写代码。

## JavaScript Projects & `jsconfig.json`

一个 `jsconfig.json` 文件在 VS Code 中定义了一个 JavaScript 项目。

虽然 `jsconfig.json` 文件不是必须的，但在下面情况还是需要创建此配置文件的：

- Exclude

  - 工作区中并不是所有文件都被视为当前项目的一部分。
  - `jsconfig.json` 允许在 IntelliSense 中排除一些文件。

- Include

  - 确保工作区中的某些 JavaScript 文件子集被视为单个项目。

- Multi-Project

  - 工作空间包含多个项目上下文，例如前端和后端 JavaScript 代码。
  - 可在每个项目的根目录下创建 `jsconfig.json` 文件。

- Compiler Options
  - 使用 TypeScript 编译器向下 ( down-level ) 编译 JavaScript 源代码。

要定义一个基本的 JavaScript 项目，请在工作区的根目录添加一个 `jsconfig.json` 文件：

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es6"
  },
  "exclude": ["node_modules"]
}
```

要检查一个 JavaScript 文件是否是 JavaScript 项目的一部分，只需在 VS Code 中运行以下命令：

```yaml
JavaScript: Go to Project Configuration
```

## Snippets

VS Code 包含了基本的 JavaScript 代码片段，以在用户键入时提供建议。

当然用户也可定义自己的代码片段：

> [define your own snippets](https://code.visualstudio.com/docs/editor/userdefinedsnippets)

也可修改 VS Code 设置来禁用代码片段建议：

```json
{
  "editor.snippetSuggestions": "none"
}
```

- `editor.snippetSuggestions`
  - `top` - 在其他建议上方显示。
  - `bottom` - 在其他建议下方显示。
  - `inline` - 在其他建议中按字母顺序穿插显示代码片段建议。
  - `none` - 不显示代码片段建议。

## JSDoc Support

VS Code 理解 [JSDoc](https://jsdoc.app/) 标准注释中的一部分标记，
并使用这些注释来提供丰富的 IntelliSense 功能。

要禁用 JSDoc 注释建议，请设置：

```json
{
  "javascript.suggest.completeJSDocs": false
}
```

## Hover Information

将鼠标悬停在 JavaScript 符号 ( Symbol ) 上，可快速查看其类型信息和相关文档。

## Signature Help

在键入 JavaScript 函数调用时，VS Code 会显示关于函数签名 ( Signature ) 的信息，
并突出显示当前正在完成的参数。
