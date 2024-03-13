# cheerio

- <https://github.com/cheeriojs/cheerio>
- <https://cheerio.js.org/>

专为服务器设计的核心 jQuery 的快速，灵活和精益实现。

Cheerio 是一个类似 jQuery 的库，可以在 Node.js 中游览 DOM 对象。

Cheerio 是一个专为服务器设计的，可以快速、灵活、高效的操作 DOM 对象的库。

- Cheerio 操作 DOM 方法与核心 jQuery API 保持一致。

- Cheerio 实现了核心 jQuery 的子集。

- Cheerio 使用非常简单，与 DOM 模型操作一致。

- Cheerio 解析标记，并提供一个用于遍历 / 操纵结果数据结构的 API。

- Cheerio 并不是 Web 浏览器，它并不将结果作为一个 Web 浏览器文档进行解释。

- Cheerio 不会产生可视化渲染，不会应用 CSS ，不会加载外部资源，也不会执行 JavaScript 。
  - 若你的用例需要此类功能，可以考虑使用 [PhantomJS] 或 [JSDom] 之类的项目。

[PhantomJS]: https://github.com/ariya/phantomjs
[JSDom]: https://github.com/tmpvar/jsdom

### Installation

```sh
npm install cheerio
```

### Usage

```js
const cheerio = require('cheerio')

const $ = cheerio.load('<h2 class="title"></h2>')

$('h2.title').text('Hello world!')
$('h2').addClass('welcome')

$.html()
//=> <h2 class="title welcome">Hello world!!</h2>
```
