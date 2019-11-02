# Anatomy of an HTTP Transaction

刨析一次 HTTP 事务处理

> <https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/>

- 创建服务器 [Create the Server](#create-server)


<hr id="create-server"/>

## 创建服务器

使用 `createServer()` 方法创建一个 Web 服务器对象。

```js
const http = require('http')

const server = http.createServer((request, response) => {
  // todo...
})
```

每当有 HTTP 请求服务器时 `createServer()` 传入的方法都会被调用。

- 传入的方法通常也称之为 请求处理函数 Request Handler Function

`createServer()` 方法返回一个 [`EventEmitter`] 对象，
上面代码是下面代码的简写形式。

```js
const http = require('http')

const server = http.createServer()

server.on('request', (request, response) => {
  // todo...
})
```

为实现请求服务，还需要调用 [`server.linsten()`] 方法。

## Request 请求对象

`request` 是 [`http.IncomingMessage`] 类的一个实例对象

- `request`
  - `method` - 一个 HTTP 请求方法
  - `url` - 不包含服务器、协议、端口号的完整 URL
  - `headers` - 请求头
    - 所有头信息全部使用小写字母表示
    - 重复的头信息，有些会被覆盖，而有些会通过逗号分隔符拼接在一起
    - `user-agent`

### 请求体 Request Body

传入处理函数的 `request` 实现了 [`ReadableStream`] 接口

- 可以通过监听 `data` 和 `end` 事件，获取到请求 Body 内容
- 每次从 `data` 事件中获取过来的数据块是一个 [`Buffer`]

```js
// 在每次 data 事件回调中将数据 PUSH 到数组
// 在 end 事件中将所有数据拼接起来
let body = []
request.on('data', chunk => {
  body.push(chunk)
}).on('end', () => {
  body = Buffer.concat(body).toString()
})
```

### 请求错误处理

`request` 是一个 [`ReadableStream`] 对象，也是一个 [`EventEmitter`] 对象。

在请求流 Request Stream 中发生错误时，将触发自身的 `error` 事件。

若没有去处理监听该错误事件，则此错误被抛出时会导致你的程序崩溃。

```js
request.on('error', err => {
  console.error(err.stack)
})
```

## Request 请求总结

```js
const http = request('http')

const server = http.createServer((request, response) => {
  const { headers, method, url } = request
  let body = []
  request.on('data', chunk => {
    body.push(chunk)
  })
  request.on('end', () => {
    body = Buffer.concat(body).toString()
  })
  request.on('error', err => {
    console.error(err)
  })
})

server.listen(8080)
```

此时的代码，服务器可以接收到从客户端发来的请求 Request 信息。

但客户端却得不到任何响应 Response 信息，只会提示请求超时。

因为此时服务器没有返回任何内容给客户端。

## Response 响应对象

响应对象 `response` 是 [`http.ServerResponse`] 类的一个实例，也是 [`WritableStream`] 的实例。

响应对象 `response` 包含许多用于将数据发送给客户端的方法。

### HTTP 状态码 Status Code

```js
response.statusCode = 200
```

### 设置响应头

响应头标题大小写不敏感，重复设置将会被覆盖。

```js
response.setHeader('Content-Type', 'application/json')
response.setHeader('X-Powered-By', 'bacon')
```

### 发送头数据




[`EventEmitter`]: <https://nodejs.org/api/events.html#events_class_eventemitter>
[`server.linsten()`]: <https://nodejs.org/api/http.html#http_server_listen>
[`http.IncomingMessage`]: <https://nodejs.org/api/http.html#http_class_http_incomingmessage>
[`http.ServerResponse`]: <https://nodejs.org/api/http.html#http_class_http_serverresponse>
[`ReadableStream`]: <https://nodejs.org/api/stream.html#stream_class_stream_readable>
[`WritableStream`]: <https://nodejs.org/api/stream.html#stream_class_stream_writable>
[`Buffer`]: <https://nodejs.org/api/buffer.html>

