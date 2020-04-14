---
name        : markdown-it
recorddate  : 2020-04-14
repository  : https://github.com/markdown-it/markdown-it
website     : https://markdown-it.github.io/
---

# markdown-it

> Markdown parser, done right.
> 100% CommonMark support, extensions, syntax plugins & high speed

[Live demo](https://markdown-it.github.io/)

## Install

```sh
npm install --save markdown-it
bower install --save markdown-it
```

CDN:

- [jsDeliver CDN](https://www.jsdelivr.com/package/npm/markdown-it)
- [cdnjs.com CDN](https://cdnjs.com/libraries/markdown-it)

## Usage examples

另请参考：

- [API documentation](https://markdown-it.github.io/markdown-it/)

### 简单示例

```js
// node.js
var MarkdownIt = require('markdown-it')
var md = new MarkdownIt();
var result = md.render('# markdown-it rulezz!')

// node.js
var md = require('markdown-it')();
var result = md.render('# markdown-it rulezz!');

// browser
var md = window.markdownit();
var result = md.render('# markdown-it rulezz!');
```

单行渲染，无段落换行：

```js
var md = require('markdown-it')();
var result = md.renderInline('__markdown-it__ rulezz!');
```

### 使用预置和选项初始化

提供了三种预置模式：

- `commonmark` - 将解析器配置为严格的 CommonMark 模式
- `default` - 类似于GFM，在没有预设名称时使用。
  启用所有可用的规则，但仍然没有 html, typographer & autolinker
- `zero` - 禁用所有规则。通过 `.enable()` 快速设置配置

```js
// commonmark mode
var md = require('markdown-it')('commonmark')

// default mode
var md = require('markdown-it')()

// enable everything
var md = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true
})

// full options list (defaults)
var md = require('markdown-it')({
  html: false,             // 在源码中启用 HTML 标签
  xhtmlOut: false,         // 使用 '/' 关闭单标签，如 `<br />`
  breaks: false,           // 将段落中的 '\n' 转换为 `<br>`
  langPrefix: 'language-', // 用于 fenced 块的 CSS 语言前缀
  linkify: false,          // 自动将 URL 类文本转换为链接
  typograpter: false,      // 启用一些与语言无关的替换和引号美化
  quotes: '“”‘’',          // 引号替换对
  highlight: (str, lang) => '' // 处理语法高亮
})
```

### 加载插件

```js
var md = require('markdown-it')()
  .use(plugin1)
  .use(plugin2, opts)
  .use(plugin3)
```

### 语法高亮显示

使用 `highlight` 选项将语法高亮显示应用于受保护的代码块:

> [highlight.js](https://highlightjs.org/)

```js
var hljs = require('highlight.js')

var md = require('markdown-it')({
  highlight (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value
      } catch (__) {}
    }
    return '' // 使用外部默认转义
  }
})
```

若你需要给 `<pre>` 分配类，可以使用完整的包装器覆盖：

```js
var hljs = require('highlight.js')

var md = require('markdown-it')({
  highlight (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        var code = hljs.highlight(lang, str).value
        return `<pre class="hljs"><code>${code}</code></pre>`
      } catch (__) {}
    }
    return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`
  }
})
```

### 链接识别 linkify

通过配置 `linkify: true` 来使用 [linkify-it] 库。

[linkify-it]: <https://github.com/markdown-it/linkify-it>

可通过访问 linkify 实例 `md.linkify` 来配置 [linkify-it] ：

```js
// 禁用 `.py` 作为顶级域名
md.linkify.tlds('.py', false)
```

## API

[API  Documentation](https://markdown-it.github.io/markdown-it/)

若你要编写插件，可查看 [Development info](https://github.com/markdown-it/markdown-it/tree/master/docs)

## 语法扩展

内置默认启用的：

- [Tables](https://help.github.com/articles/organizing-information-with-tables/) - GFM
- [Strikethrough](https://help.github.com/articles/basic-writing-and-formatting-syntax/#styling-text) - GFM

通过插件扩展：

- [subscript](https://github.com/markdown-it/markdown-it-sub)
- [superscript](https://github.com/markdown-it/markdown-it-sup)
- [footnote](https://github.com/markdown-it/markdown-it-footnote)
- [definition list](https://github.com/markdown-it/markdown-it-deflist)
- [abbreviation](https://github.com/markdown-it/markdown-it-abbr)
- [emoji](https://github.com/markdown-it/markdown-it-emoji)
- [custom container](https://github.com/markdown-it/markdown-it-container)
- [insert](https://github.com/markdown-it/markdown-it-ins)
- [mark](https://github.com/markdown-it/markdown-it-mark)
- [...others](https://www.npmjs.org/browse/keyword/markdown-it-plugin)

### 管理规则

默认情况下，所有规则都是启用的，但可以通过选项进行限制。
在插件加载时，它的所有规则都是自动启用的。

```js
// 通过 curring 方式 启用/禁用 规则
var md = require('markdown-it')()
  .disable([ 'link', 'image' ])
  .enable([ 'link' ])
  .enable('image')
```

你可以在源码中找到所有规则：

- [parser_core.js](https://github.com/markdown-it/markdown-it/blob/master/lib/parser_core.js)
- [parser_block.js](https://github.com/markdown-it/markdown-it/blob/master/lib/parser_block.js)
- [parser_inline.js](https://github.com/markdown-it/markdown-it/blob/master/lib/parser_inline.js)
