# gray-matter

更迅捷的 YAML Front matter 解析器。

简单易用，经过实战检验。

默认情况下解析 YAML 也可以解析 JSON, Coffee, TOML 格式的 Front Matter
并且支持自定义解析器

从字符串或文件中解析 front-matter 快速、可靠、易用。

具有设置自定义分隔符的选项。

## Install

```sh
yarn add gray-matter
```

## Example

```js
const fs = require('fs')
const matter = require('gray-matter')

const str = fs.readFileSync('example.html', 'utf8')

const res = matter(str)
```

源文件 `example.html`

```html
---
title : Hello
name: home
---

<h1>Hello world!</h1>
```

将得到结果为：

```js
{
  content: '<h1>Hello world!</h1>',
  data: {
    title: 'Hello',
    name: 'home'
  },
  excerpt: ''
}
```

## Usage

```js
const matter = require('gray-matter')
```

在 TypeScript 中：

```ts
import matter = require('gray-matter')
// OR
import * as matter from 'gray-matter'
```

传入字符串或配置对象：

```js
const result = matter('---\ntitle: Front Matter\n---\ncontent')
```

返回：

```js
{
  content: 'content'
  data: {
    title: 'Front Matter'
  }
}
```

## API

- `matter(str, options)`
  - 解析指定内容的 Front Matter 信息

- `stringify(str, obj, options)`
  - 将对象字符串化为 YAML 或指定的语言，并将其附加到给定字符串

- `read(filepath, options)`
  - 同步方式读取文件内容，并解析其中的 Front Matter 信息

- `test(str, options)`
  - 若给定字符串中含有 Front Matter 则返回 `true`

## Options

```js
const options = {
  // 提取摘要内容
  excerpt: {
    type: [Boolean, Function],
    default: undefined
  },

  // 摘要分隔符
  excerpt_separator: {
    type: String,
    default: '---'
  },

  // 自定义解析引擎
  engines: {
    type: Object,
    // 默认已支持 JSON, JavaScript, YAML
    default: {
      yaml,
      json,
      javascript
    }
    format: {
      engineName () {}
      // OR
      engineName: {
        // 解析方法
        parse () {},
        // 字符串化方法（可选）
        stringify () {}
      }
    }
  },

  // 指定用于解析 front-matter 的引擎
  language: {
    type: String,
    default: 'yaml'
  },

  // 指定开始结束分隔符
  delimiters: {
    type: [String, [String, String]],
    default: '---'
  }
}
```

## Engines

```js
const toml = require('toml')
const matter = require('gray-matter')

const result = matter(str, {
  engines: {
    toml: toml.parse.bind(toml)
  }
})

// OR

const result = matter(str, {
  engines: {
    toml: {
      parse: toml.parse.bind(toml),
      stringify () {
        throw new Error('cannot stringify to TOML')
      }
    }
  }
})
```
