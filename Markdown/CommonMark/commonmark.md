# CommonMark

- <https://commonmark.org/>
- <https://github.com/commonmark/commonmark-spec>
- <https://github.com/commonmark/commonmark.js>

CommonMark 是 Markdown 语法的一个合理化 ( rationalized ) 版本，
它使用 C 和 JavaScript 实现了规范 ( [spec] ) 和 BSD-licensed 的参考实现。

[spec]: <http://spec.commonmark.org/>

commonmark.js 库提供了将 CommonMark 文档解析为抽象语法树 ( AST ) 、操作 AST 以及将文档呈现为 HTML 或 AST 的 XML 表示形式的函数。

在线示例可访问：

- <http://try.commonmark.org/>


## Installing

```sh
yarn add commonmark
```

## Usage

commonmark.js 的处理流程为：

```
Markdown --> AST --> HTML or XML
          ↑       ↑
       parse()  reader()
```

```js
var reader = new commonmark.Parser();
var writer = new commonmark.HtmlRenderer();

var parsed = reader.parse("Hello *world*"); // => AST

var result = writer.render(parsed); // => HTML
```
