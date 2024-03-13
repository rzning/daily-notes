# koa

- <https://koajs.com/>
- <https://github.com/koajs/koa>
- <https://www.npmjs.com/package/koa>
- <https://yarnpkg.com/zh-Hans/package/koa>

Koa 是一个基于 node.js 实现的一个 HTTP 中间件框架。

koa 的中间件之间以类似堆栈的方式依次执行，允许你执行操作并向下传递请求（downstream）然后过滤并逆序处理响应（upstream）。

## Installation

```bash
$ npm install koa
```

## Hello Koa

```js
const Koa = require('koa')
const app = new Koa()

app.use((ctx) => {
  ctx.body = 'Hello Koa'
})

app.listen(3000)
```
