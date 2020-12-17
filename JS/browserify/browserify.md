# browserify

- <https://github.com/browserify/browserify>
- <http://browserify.org/>

browser-side require() the node.js way

在浏览器中使用 `require('modules')`

## getting started

- browserify handbook : <https://github.com/browserify/browserify-handbook>

## example

编写一个 `main.js` 其中使用 `require()` 来引入文件或 npm 模块：

```js
var foo = require('./foo.js')
var bar = require('../lib/bar.js')
var gamma = require('gamma')

var elem = documnet.getElementById('result')
var x = foo(100) + bar('baz')
elem.textContent = gama(x)
```

通过给 `module.exports` 或者 `exports` 赋值实现导出功能：

```js
module.exports = function (n) { return n + 123 }
```

现在只需使用 `browserify` 命令从 `main.js` 文件构建包 ( bundle ) ：

```sh
$ browserify main.js > bundle.js
```

`main.js` 需要的所有模块都包含在 `bundle.js` 中，使用 [required] 对 `require()` 树 ( graph ) 进行递归遍历。

[required]: <https://github.com/defunctzombie/node-required>

最后只需将构建好的 `bundle.js` 引入你的 HTML 即可：

```html
<script src="bundle.js"></script>
```

## install

```sh
npm install -g browserify
```
