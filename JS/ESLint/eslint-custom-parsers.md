# ESLint 使用自定义解析器

Working with Custom Parsers

- <https://eslint.org/docs/developer-guide/working-with-custom-parsers>

如果希望使用自己的解析器并为规则提供附加功能，可以指定自己的自定义解析器。

如果在解析器上公开了 `parseForESLint()` 方法，则将使用该方法解析代码。否则，将使用 `parse()` 方法。

这两个方法都应该以源代码作为第一个参数，和一个可选的配置对象作为第二个参数。

可选配置对象，在配置文件中作为 `parserOptions` 提供。

解析方法 `parse()` 应该简单的返回 AST 。

解析方法 `parseForESLint()` 应该返回一个对象，该对象包含必须属性 `ast` 和可选属性 `services`, `scopeManager`, `visitorKeys` 。

properties | description
-|-
`ast` | 必须返回的 AST
`services` | 可以包含任何与解析器相关的服务，例如节点类型检查器。此属性可用于 `context.parserServices` 规则。默认为空对象
`scopeManager` | 可以是一个 [`ScopeManager`](./scope-manager-interface.md) 对象。自定义解析器可以使用定制的范围分析，来实现实验性或新增的语法。
`visitorKeys` | 可以是一个自定义 AST 遍历对象。对象的键名是 AST 节点的类型。每个值都是一个可遍历的属性名数组。

一个 ESLint 解析器示例 : [TypeScript ESLint](./typescript-eslint.md)

```json
{
  "parser": "./path/to/awesome-custom-parser.js"
}
```

```js
var espree = require('espree')

```
