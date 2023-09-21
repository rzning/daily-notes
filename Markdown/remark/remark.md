# remark

![remark](https://raw.githubusercontent.com/remarkjs/remark/1f338e72/logo.svg?sanitize=true)

- <https://remark.js.org/>

- <https://github.com/remarkjs/remark>

Remark 是一个用插件转换 markdown 的工具。

这些插件可以检查和更改您的标记。

你可以在服务器、客户端、CLIs、deno 等上使用 remark 。

## unified

unified 是使用 ASTs 转换内容的核心项目。

remark 为 unified 增加了对 markdown 的支持。

mdast 是 remark 使用的 markdown AST。

remark 中使用的语法树是 mdast ，它将 markdown 结构表示为 JSON 对象。

- unified - <https://github.com/unifiedjs/unified>
- mdast - <https://github.com/syntax-tree/mdast>

## remark-parse

- [remark-parse](https://github.com/remarkjs/remark/tree/main/packages/remark-parse)

This package is a unified (remark) plugin that defines how to take markdown as input and turn it into a syntax tree.

这个包是一个 unified (remark) 插件，它定义了如何将 markdown 作为输入并将其转换为一个语法树。
