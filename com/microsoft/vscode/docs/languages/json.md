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

为了理解 JSON 文件的结构，我们使用 JSON 模式 ( [JSON Schema] ) 。

[JSON Schema]: <https://json-schema.org/>

JSON Schema 描述了 JSON 文件的形状，以及值集、默认值和描述。

VS Code 提供了 JSON 支持，并且支持 JSON Schema Draft 7 。

诸如 [JSON Schema Store] 之类的服务器为大多数常见的基于 JSON 的配置文件提供了 Schema 定义。

[JSON Schema Store]: <https://www.schemastore.org>

然而， Schema 也可以在 VS Code 工作区的文件中定义，也可以在 VS Code 设置文件中定义。


JSON 文件与 Schema 的关联可以在 JSON 文件自身中使用 `$schema` 属性完成。
也可以使用 VS Code 用户或工作区设置（文件 > 首选项 > 设置）下的 `json.schemas` 进行关联。

### 7.1 在 JSON 文件中映射

下面示例中 JSON 文件指定其内容遵循 [CoffeeLint] Schema ：

[CoffeeLint]: <http://www.coffeelint.org/>

```json
{
  "$schema": "https://json.schemastore.org/coffeelint",
  "line_endings": "unix"
}
```

> 注意：此语法是特定于 VS Code 的，而不是 [JSON Schema Specification] 的一部分。

[JSON Schema Specification]: <https://json-schema.org/latest/json-schema-core.html#rfc.section.7>

### 7.2 在用户设置中映射

一下用户设置摘录显示了 `.babelrc` 文件如何映射 [babelrc] Schema ：

[babelrc]: <https://babeljs.io/docs/en/config-files>

```json
"json.schemas": [
  {
    "fileMatch": [
      "/.babelrc"
    ],
    "url": "https://json.schemastore.org/babelrc"
  }
]
```

### 7.3 在工作区映射 Schema

要映射位于工作区的 Schema 请使用相对路径。

下面示例中，工作区根目录中的 `myschema.json` 文件将作为所有以 `.foo.json` 结尾的 Schema ：

```json
"json.schemas": [
  {
    "fileMatch": [
      "/*.foo.json"
    ],
    "url": "./myschema.json"
  }
]
```

### 7.4 在设置中定义 Schema 映射

在用户或工作区 `json.schemas` 设置中使用 `schema` 属性定义 Schema 映射。

下面示例定义的 Schema 将作用于所有名为 `.myconfig` 的文件：

```json
"json.schemas": [
  {
    "fileMatch": [
      "/.myconfig"
    ],
    "schema": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "description": "The name of the entry"
        }
      }
    }
  }
]
```

### 7.5 文件匹配语法

文件匹配语法支持 `*` 通配符。

另外你可以以 `!` 开头定义排除模式。

```json
"json.schemas": [
  {
    "fileMatch": [
      "/receipts/*.json",
      "!/receipts/*.excluded.json"
    ],
    "url": "./receipts.schema.json"
  }
]
```

### 7.6 在 JSON Schemas 中定义片段

使用 `defaultSnippets` 属性可以为给定的 JSON 对象指定任意数量的代码片段：

- `label` 和 `description` 将显示在完成选择对话框中。

- `body` 是一个 JSON 对象，当用户选择完成时，将其字符串化并插入。

> 注意：这里的 `defaultSnippets` 不是 JSON Schema 规范的一部分，
> 而是 VS Code 特定的 Schema 扩展。
