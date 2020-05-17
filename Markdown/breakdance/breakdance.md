---
name        : breakdance
recorddate  : 2020-05-17
repository  : https://github.com/breakdance/breakdance
website     : https://breakdance.github.io/breakdance/
---

# breakdance

Breakdance 是一个将 HTML 转换为 markdown 的 node.js 库。高度可插拔，灵活，易于使用。

Breakdance 使用 [cheerio] 来解析 HTML ，并使用 [snapdragon] 来渲染。

[cheerio]: <https://github.com/cheeriojs/cheerio>
[snapdragon]: <https://github.com/here-be/snapdragon>

## Quickstart

```sh
$ npm install --save breakdance
# OR
$ yarn add breakdance
```

```js
var breakdance = require('breakdance')

console.log(breakdance('<strong>The freaks come out at night!</strong>'))
// => '**The freaks come out at night!**'
```
