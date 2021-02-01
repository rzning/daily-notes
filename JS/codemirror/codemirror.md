# CodeMirror

- <https://github.com/codemirror/codemirror>
- <https://codemirror.net/>

CodeMirror 是使用 JavaScript 为浏览器实现的多功能文本编辑器。
它专门用于编辑代码，并具有 100 多种语言模式和各种插件，可实现更高级的编辑功能。
每种语言都带有功能齐全的代码和语法突出显示，以帮助阅读和编辑复杂代码。

丰富的编程 API 和 CSS 主题系统可用于自定义 CodeMirror
以适合您的应用程序，并使用新功能对其进行扩展。

## Installation

```sh
npm install codemirror
```

## Features

- 开箱即用，支持超过 100 种语言
  - [Language modes](https://codemirror.net/mode/index.html)

- 强大的可组合语言模式系统
  - [HTML mixed mode](https://codemirror.net/mode/htmlmixed/index.html)
  - [Writing CodeMirror Modes](https://codemirror.net/doc/manual.html#modeapi)

- 自动补全
  - [`hint/show-hint.js`](https://codemirror.net/doc/manual.html#addon_show-hint)
  - [XML Autocomplete Demo](https://codemirror.net/demo/xmlcomplete.html)

- 代码折叠
  - [`fold/foldcode.js`](https://codemirror.net/doc/manual.html#addon_foldcode)

- Vim, Emacs 和 Sublime Text 绑定
  - [Vim bindings demo](https://codemirror.net/demo/vim.html)
  - [Emacs bindings demo](https://codemirror.net/demo/emacs.html)
  - [Sublime Text bindings demo](https://codemirror.net/demo/sublime.html)

- 搜索和替换接口
  - [`search/search.js`](https://codemirror.net/doc/manual.html#addon_search)

- 括号和标签匹配
  - [`edit/matchbrackets.js`](https://codemirror.net/doc/manual.html#addon_matchbrackets)
  - [`edit/matchtags.js`](https://codemirror.net/doc/manual.html#addon_matchtags)

- 支持分隔视图
  - [Multiple Buffer & Split View Demo](https://codemirror.net/demo/buffers.html)

- 集成 Linter 静态代码分析
  - [`lint/lint.js`](https://codemirror.net/doc/manual.html#addon_lint)

- 混合字体大小和样式
  - [Variable Height Demo](https://codemirror.net/demo/variableheight.html)

- 支持各种主题
  - [Theme Demo](https://codemirror.net/demo/theme.html)

- 可调整大小以适应内容
  - [Autoresize Demo](https://codemirror.net/demo/resize.html)
  - [demo/resize.html](https://github.com/codemirror/CodeMirror/blob/master/demo/resize.html)

- 内联和块状小部件
  - [markText() replaceWith](https://codemirror.net/doc/manual.html#mark_replacedWith)
  - [addLineWidget()](https://codemirror.net/doc/manual.html#addLineWidget)

- 可编程 Gutters
  - [Breakpoint Demo](https://codemirror.net/demo/marker.html)

- 使文本范围具有样式化、只读或原子性
  - [markText()](https://codemirror.net/doc/manual.html#markText)

- 支持双向文本
  - [Bi-directional Text Demo](https://codemirror.net/demo/bidi.html)
  - [demo/bidi.html](https://github.com/codemirror/CodeMirror/blob/master/demo/bidi.html)

- 还有很多其他方法和插件
  - [methods](https://codemirror.net/doc/manual.html#api)
  - [addons](https://codemirror.net/doc/manual.html#addons)
