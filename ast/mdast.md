# mdast

![mdast](https://raw.githubusercontent.com/syntax-tree/mdast/e6b43aa/logo.svg?sanitize=true)

Markdown Abstract Syntax Tree.

- <https://github.com/syntax-tree/mdast>

mdast 是在语法树中表示 markdown 的规范，它实现了 [unist] 。

它可以代表几种特色的 markdown 如 [CommonMark] 和 [GFM] ( GitHub Flavored Markdown ) 。

---

本文档定义了一种将 markdown 表示为抽象语法树 ( AST ) 的格式。

[mdast] 始于 2014 年 7 月（ [unist] 存在之前）在 [remark] 中的开发。

该规范使用类似 [Web IDL](https://webidl.spec.whatwg.org/) 的语法编写。

mdast 扩展了 [unist] （一种语法树格式），以便从它的实用程序生态系统中获益。

mdast 使用 JavaScript 编写了一个丰富的实用程序生态系统，用于在 JavaScript 中使用兼容的语法树。

然而 mdast 并不局限于 JavaScript ，也可以用于其他编程语言。

mdast 与 [unified] 和 [remark] 项目相关，因为在他们整个生态系统中使用到了 mdast 语法树。

[mdast]: https://github.com/syntax-tree/mdast
[unist]: https://github.com/syntax-tree/unist
[CommonMark]: https://commonmark.org/
[GFM]: https://github.github.com/gfm/
[remark]: https://github.com/remarkjs/remark
[unified]: https://github.com/unifiedjs/unified
