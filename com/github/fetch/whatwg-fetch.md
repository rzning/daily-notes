# window.fetch polyfill

- <https://github.com/github/fetch>
- <https://github.github.io/fetch/>

`fetch()` 函数是一种基于约定的机制，用于在浏览器中以编程方式发出 Web 请求。

此项目是一个 polyfill，它实现了标准 [Fetch 规范](https://fetch.spec.whatwg.org/) 的一个子集，
足以使 Fetch 成为传统 Web 应用程序中 XMLHttpRequest 的一个可行的替代品。

## 1️⃣ 说明

- 这个项目是一个polyfill，对于所有现代浏览器都自行实现了 `fetch()` 方法，因此该项目的代码此时将被忽略。

- 该项目在 Node.js 环境下无法运行，它仅适用于 Web 浏览器。

## 2️⃣ 安装

```sh
yarn add whatwg-fetch
```

也可以直接通过 `<script>` 标签将 `fetch.umd.js` 加载到页面。

你还需要一个承诺 ( Promise ) 来填充 ( polyfill ) 旧的浏览器。我们推荐使用
[taylorhakes/promise-polyfill](https://github.com/taylorhakes/promise-polyfill)
库，它尺寸小且与 Promises/A+ 相兼容。

## 3️⃣ 使用

```js
import 'whatwg-fetch'

window.fetch(...)
```

与浏览器实现分开访问：

```js
import {fetch as fetchPolyfill} from 'whatwg-fetch'

// 使用浏览器内置版本
window.fetch(...)

// 使用 polyfill 实现
fetchPolyfill(...)
```

## 4️⃣ 语法

```js
fetch(url, options).then(
  function (response) {
    // 处理 HTTP 响应
  },
  function (error) {
    // 处理网络错误
  }
)
```

```js
fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
  credentials: 'omit', // 身份验证凭据模式
  body: JSON.stringify(data)
}).then(function (response) {
  response.status //=> number 100-599
  response.statusText
  response.headers
  response.headers.get('Content-Type')
  response.url

  if (response.ok) {
    return response.text()
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}, function (error) {
  error.message
})
```

## 5️⃣ 示例

HTML

```js
fetch('/users.html')
  .then(function (response) {
    return response.text()
  })
  .then(function (body) {
    document.body.innerHTML = body
  })
```

JSON

```js
fetch('/users.json')
  .then(function (response) {
    return response.json()
  })
  .then(function (json)) {
    console.log(json)
  })
  .catch(function (exception)) {
    console.error('parsing failed', exception)
  }
```

POST Form

```js
var form = document.querySelector('form')

feth('/users', {
  method: 'POST',
  body: new FormData(form)
})
```

File Upload

```js
var input = document.querySelector('input[type="file"]')

var data = new FormData()
data.append('file', input.files[0])

fetch('/avatars', {
  method: 'POST',
  body: data
})
```

Handling HTTP error statuses

```js
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parseJSON(response) {
  return response.json()
}

fetch('/users')
  .then(checkStatus)
  .then(parseJSON)
  .then(function (data) {
    console.log(data)
  })
  .catch(function (error) {
    console.log('request failed', error)
  })
```
