# unist

![unist](https://raw.githubusercontent.com/syntax-tree/unist/367da2e/logo.svg?sanitize=true)

[syntax-tree] 是一个包含 100 多个项目的组织，它们处理基于 [unist] 的语法树。

这些树通常处理下列内容：

- markdown - [mdast]
- HTML - [hast]
- natural language - [nlcst]
- XML - [xast]
- JavaScript - [esast]

[syntax-tree]: https://github.com/syntax-tree
[unist]: https://github.com/syntax-tree/unist
[mdast]: https://github.com/syntax-tree/mdast
[hast]: https://github.com/syntax-tree/hast
[nlcst]: https://github.com/syntax-tree/nlcst
[xast]: https://github.com/syntax-tree/xast
[esast]: https://github.com/syntax-tree/esast

## unified

> `syntax-tree` is part of the unified collective, which brings together organisations that work with content as structured data.

[syntax-tree] 是统一集合的一部分，它将处理内容的组织作为结构化数据聚集在一起。

- 有关我们的更多信息，请访问 [unifiedjs.com](https://unifiedjs.com/)
- 关于如何管理集体，请参见 [unifiedjs/collective](https://github.com/unifiedjs/collective)

## unist

Universal Syntax Tree.

- <https://github.com/syntax-tree/unist>

unist 是一个语法树的规范。
它在 JavaScript 中有一个很大的实用程序生态系统，用于处理这些树。
它由其他几个规范实现。

本文档定义了语法树的通用格式。
unist 的开发始于 2015 年 7 月。
该规范是用类似 [Web IDL](https://webidl.spec.whatwg.org/) 的语法编写的。

## Syntax tree

语法树是源代码甚至是自然语言的一种模型表示。

这些树是抽象的，这使得分析、转换和生成代码成为可能。

语法树有两种形式：

> [Abstract vs. Concrete Syntax Trees - Eli Bendersky's website](https://eli.thegreenplace.net/2009/02/16/abstract-vs-concrete-syntax-trees/)

- 具体语法树 ( Concrete Syntax Trees -- CSTs ) 又名解析树 ( Parse Trees )

  - 代表每一个细节的结构。

  - CSTs 是以树状形式表示语法。也就是说， CST 是从语法到树形式的一对一映射。

- 抽象语法树 ( Abstract Syntax Trees -- ASTs ) 又名语法树 ( Syntax Trees )

  - 只表示与代码语法结构有关的细节的结构。

  - ASTs 是源代码的简化语法表示，它们通常由用于实现的语言的数据结构表示。

  - ASTs 不会显示为整个语法的杂乱堆砌，而是以结构化的方式表示已解析的字符串，
    丢弃所有可能对解析 ( parsing ) 字符串很重要但对分析 ( analyzing ) 字符串不需要的信息。

  - ASTs 通常是编译器前端的最后一个产物。它们以一种紧凑而有用的方式表示代码的结构，方便了分析和进一步处理。

该规范既可以表示抽象语法树，也可以表示具体语法树。
