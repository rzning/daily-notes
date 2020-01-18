# node-sass

Node-sass 是一个库，它提供了 Node.js 到 [LibSass] 的绑定。

> [LibSass] 是流行的样式表预处理器 Sass 的 C 版本。

[LibSass]: <https://github.com/sass/libsass>

它允许你以令人难以置信的速度将 .scss 文件编译成 css，并通过一个连接中间件自动编译。

### Install

```sh
npm install node-sass
```

使用中国镜像

```sh
npm install -g mirror-config-china --registry=http://registry.npm.taobao.org
npm install node-sass
```

### Usage

```js
var sass = require('node-sass')

sass.render({
  file: scss_filename,
  ...other_options
}, function (err, result) {
  // ...
})

// 同步方式

var result = sass.readerSync({
  data: scss_content,
  ...other_options
})
```

### Options

- `file`

  - 传递给 LibSass 进行编译的文件名。

- `data`

  - 传递给 LibSass 进行编译的字符串。

若想执行转换，必须指定 `file` 或 `data` 中的一项。



### `render()` callback

```js
/**
 * 异步回调
 * 
 * @param {Object} error - 错误对象
 * @param {string} error.message - 错误消息
 * @param {number} error.line - 错误的行号
 * @param {number} error.column - 错误的列号
 * @param {number} error.status - 状态代码
 * @param {string} error.file - 错误的文件名
 * @param {Object} result - 成功结果对象
 * @param {Buffer} result.css - 编译后的 CSS
 * @param {Buffer} result.map - 源程序映射
 * @param {Object} result.stats - 包含有关编译的信息的对象
 * @param {string} result.stats.entry - 指向 scss 文件的路径，如果源不是文件，则为 `data`
 * @param {number} result.stats.start - 编译前的 `Date.now()`
 * @param {number} result.stats.end - 编译后的 `Date.now()`
 * @param {number} result.stats.duration - 持续时间 `end - start`
 * @param {string[]} result.stats.includedFiles - 所有相关 scss 文件的绝对路径，没有特定的顺序
 */
function callback (error, result) {
  if (error) {
    console.error(error)
  } else {
    console.log(result.css.toString())
  }
}

sass.render(options, callback)
```

### Command Line Interface

```sh
node-sass [options] <input> [output]

# OR

cat <input> | node-sass > output
```
