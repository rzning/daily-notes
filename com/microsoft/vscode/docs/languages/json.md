# Editing JSON with Visual Studio Code

- <https://code.visualstudio.com/docs/languages/json>

JSON 是配置文件中常见的一种数据格式，如 `package.json` 或 `project.json` 。

打开以 `.json` 结尾的文件时， VS Code 提供的功能使编写或修改 JSON 文件内容变得更简单。

## 1. 智能感知和验证 IntelliSense and Validation

对于具有或不具有模式 ( Schema ) 的 JSON 数据的属性和值，
当你使用智能感知键入时， VS Code 为我们提供实时建议。

你还可以使用：

- 触发建议 ( Trigger Suggestions ) 命令 ( `Ctrl+Space` )

手动查看建议。

VS Code 还根据相关的 JSON Schema 执行结构和值的验证，并给出红色的波浪线提示。

## 2. 快速导航 Quick Navigation

JSON 文件可能会很大， VS Code 支持使用：

- 转到符号 ( Go to Symbol ) 命令 ( `Ctrl+Shift+O` )

快速导航到属性。

## 3. 悬浮 Hovers

当你将鼠标悬停在带有或不带有 Schema 的 JSON 数据的属性和值上时，
VS Code 将提供额外的上下文。

## 4. 格式化 Formatting

你可以使用：

- `Shift+Alt+F` 或上下文菜单中的格式化文档 ( Format Document )

来格式化 JSON 文档。

## 5. 折叠 Folding

你可以使用行号和行开始之间的沟槽 ( Gutter ) 上的【折叠图标】来折叠源代码的区域。

折叠区域可用于所有对象和数组元素。

## 6. JSON with Comments

除了遵循 JSON 规范的默认 JSON 模式外，
VS Code 还有一个 JSON with Comments ( jsonc ) 模式。

该模式用于 VS Code 配置文件，如：

- `settings.json`
- `tasks.json`
- `launch.json`

在带注释的 JSON 模式下，可以使用 JavaScript 中的单行 ( `//` ) 以及块 ( `/* */` ) 注释。

## 7. JSON Schemas and Settings

