---
title       : 网站托管开发指南 · Node.js - LeanCloud 文档
recorddate  : 2020-05-17
repository  : https://github.com/leancloud/docs/blob/master/views/leanengine_webhosting_guide-node.md
website     : https://leancloud.cn/docs/leanengine_webhosting_guide-node.html
---

# 网站托管开发指南 · Node.js

网站托管是云引擎的一个子模块，允许你用 Node.js 开发一个 Web 程序，提供云函数和 Hook，
还可以提供静态文件的托管和自定义的路由、绑定你自己的域名。

> [云引擎快速入门](https://leancloud.cn/docs/leanengine_quickstart.html)

## 项目骨架

所有 Node.js 的项目必须包含 `package.json` 才会正确地被云引擎识别为 Node.js 项目。

> [npm-package.json | npm Documentation](https://docs.npmjs.com/files/package.json)

```json
{
  "name": "node-js-getting-started",
  "scripts": {
    "start": "node server.js"
  },
  "engines": {
    "node": "8.x"
  },
  "dependencies": {
    "express": "4.12.3",
    "leanengine": "^3.0.2",
    "leancloud-storage": "^3.3.1"
  }
}
```

## 接入 Web 框架

Node.js SDK 为 [Express] 和 [Koa] 提供了集成支持。

[Express]: <http://expressjs.com/>
[Koa]: <http://koajs.com/>

```sh
npm install --save leanengine leancloud-storage
```

### Express

```js
var express = require('express');
var AV = require('leanengine');

AV.init({
  appId: process.env.LEANCLOUD_APP_ID || '{{appid}}',
  appKey: process.env.LEANCLOUD_APP_KEY || '{{appkey}}',
  masterKey: process.env.LEANCLOUD_APP_MASTER_KEY || '{{masterkey}}'
});

var app = express();
app.use(AV.express());
app.listen(process.env.LEANCLOUD_APP_PORT);
```

### Koa

```js
var koa = require('koa');
var AV = require('leanengine');

AV.init({
  appId: process.env.LEANCLOUD_APP_ID || '{{appid}}',
  appKey: process.env.LEANCLOUD_APP_KEY || '{{appkey}}',
  masterKey: process.env.LEANCLOUD_APP_MASTER_KEY || '{{masterkey}}'
});

var app = koa();
app.use(AV.koa());
app.listen(process.env.LEANCLOUD_APP_PORT);
```

### 其他 Web 框架

```js
require('http').createServer(function (req, res) {
  if (req.url == '/') {
    res.statusCode = 200;
    res.end();
  } else {
    res.statusCode = 404;
    res.end();
  }
}).listen(process.env.LEANCLOUD_APP_PORT);
```

> [在云引擎中使用其他 Node 框架 - LeanCloud 文档](https://leancloud.cn/docs/leanengine-web-frameworks.html)
