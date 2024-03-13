---
name: remarkable
recorddate: 2020-05-17
repository: https://github.com/jonschlinkert/remarkable
website: https://jonschlinkert.github.io/remarkable/demo/
---

# remarkable

Remarkable 是一款不错的 Markdown 解析器，快速且易于扩展。

[在线演示](http://jonschlinkert.github.io/remarkable/demo/)

- 支持 [CommonMark](https://commonmark.org/) 规范 + 扩展语法 + Sugar ( URL autolinking, typographer )
- 语法可配置
- 高速
- [社区插件](https://www.npmjs.org/browse/keyword/remarkable)

## Install

node.js

```sh
npm install remarkable --save
```

browser

- jsDeliver CDN
  - <https://www.jsdelivr.com/package/npm/remarkable>
- cdnjs
  - <https://cdnjs.com/libraries/remarkable>

## Usage

ES Modules

```js
import { Remarkable } from 'remarkable'
var md = new Remarkable()

console.log(md.render('# Remarkable rulezz!'))
// => <h1>Remarkable rulezz!</h1>
```

CommonJS

```js
const { Remarkable } = require('remarkable')
var md = new Remarkable()

console.log(md.render('# Remarkable rulezz!'))
// => <h1>Remarkable rulezz!</h1>
```

通过 NPM 全局安装

```sh
cat myfile.md | remarkable

remarkable --file myfile.md

# get options
remarkable -h
```

## Documentation

[文档](https://github.com/jonschlinkert/remarkable/blob/master/docs)

- parser
- parsing_block
- parsing_core
- parsing_inline
- plugins
- renderer

## Options

默认情况下 remarkable 被配置为类似于 GFM 但禁用了 HTML

可通过一下两种方式定义选项：

### Constructor

```js
var md = new Remarkable({
  html: false,
  xhtmlOut: false,
  breaks: false,
  langPrefix: 'language-',
  typographer: false,
  quotes: '“”‘’',
  highlight: function (/* str, lang */) {
    return ''
  }
})

console.log(md.render('# Remarkable rulezz!'))
// => <h1>Remarkable rulezz!</h1>
```

### `.set()`

```js
import { Remarkable } from 'remarkable'

const md = new Remarkable()

md.set({
  html: true,
  breaks: true
})
```

## Presets

```js
import { Remarkable } from 'remarkable'

// commonmark
var md = new Remarkable('commonmark')

// full
var md = new Remarkable('full')

// full with options
var md = new Remarkable('full', {
  html: true,
  typographer: true
})
```

## Syntax highlighting

```js
import { Remarkable } from 'remarkable'
import hljs from 'highlight.js'

var md = new Remarkable({
  highlight(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value
      } catch (err) {}
      try {
        return hljs.highlightAuto(str).value
      } catch (err) {}
      return ''
    }
  }
})
```

## Syntax extensions

默认启用：

- [Footnotes](https://pandoc.org/MANUAL.html#footnotes)
- [Tables](https://github.github.com/gfm/#tables-extension-) (GFM)
- [`<del>`](https://github.github.com/gfm/#strikethrough-extension-) (GFM strikethrough) - `~~deleted text~~`

默认禁用：

- [`<sup>`][sup_sub] - `19^th^`
- [`<sub>`][sup_sub] - `H~2~O`
- [`<abbr>`](https://michelf.ca/projects/php-markdown/extra/#abbr) - abbreviations 缩写、缩略语
- `<ins>` - `++inserted text++` （实验性）
- `<mark>` - `==marked text==` （实验性）

[sup_sub]: https://pandoc.org/MANUAL.html#superscripts-and-subscripts

## Manage rules

```js
var md = new Remarkable()
md.inline.ruler.enable([
  'footnote_inline'
  'ins',
  'mark',
  'sub',
  'sup'
])
md.block.ruler.disable([
  'table',
  'footnote',
  'deflist'
])
md.core.ruler.enable([
  'abbr'
])
```

## Typographer

```js
import { Remarkable } from 'remarkable'

const md = new Remarkable({
  typographer: true,
  quotes: '“”‘’'
})

// Disable rules at all:
md.core.ruler.disable(['replacements', 'smartquotes'])
```

## Plugins

```js
var md = new Remarkable()

md.use(plugin1).use(plugin2, opts)
```

> [插件文档](https://github.com/jonschlinkert/remarkable/blob/master/docs/plugins.md)

## Linkify plugin

自动将类似 url 的文本转换为链接。

```js
import { Remarkable } from 'remarkable'
import { linkify } from 'remarkable/linkify'

var md = new Remarkable().use(linkify)
```

## UMD

UMD 包提供了开箱即用的 linkify

```js
const { Remarkable, linkify, utils } = window.remarkable
```

## Related Links

- <https://github.com/jgm/CommonMark>
- <http://talk.commonmark.org/>

## Development

- [Parser](https://github.com/jonschlinkert/remarkable/blob/master/docs/parser.md)
- [Renderer](https://github.com/jonschlinkert/remarkable/blob/master/docs/renderer.md)

```js
Remarkable.core
Remarkable.core.ruler
Remarkable.block
Remarkable.block.ruler
Remarkable.inline
Remarkable.inline.ruler
Remarkable.renderer
Remarkable.renderer.rules
```
