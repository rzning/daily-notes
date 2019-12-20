# glob

适用于 node.js 的 glob 实现。

- <https://github.com/isaacs/node-glob>

使用（在 shell 使用的）星号 [ `*` ] 等通配符来解析路径，模式匹配文件。

![glob-logo](https://raw.githubusercontent.com/isaacs/node-glob/master/logo/glob.png)


## Usage 使用

```sh
yarn add glob
```

```js
var glob = require('glob')

glob('**/*.js', options, function (err, files) {
  // files -- 为文件名数组
})
```

## Glob Primer 入门

标识 | 解释
-|-
`{A,...}` | 模式分组，如 `a{/b/c,bcd}` 将扩展为 `a/b/c` 和 `abcd`
`*` | 匹配 0 个或多个字符
`?` | 匹配 1 个字符
`[...]` | 匹配一个字符范围，与 RegExp 正则类似，若范围的首字符是 `!` 或 `^` 则匹配不在范围内的任意字符
`!(A|B|...)` | 匹配与提供的任何模式都不匹配的任何内容
`?(A|B|...)` | 匹配 0 个或 1 个提供的模式
`+(A|B|...)` | 匹配 1 个或多个提供的模式
`*(A|B|...)` | 匹配 0 个或多个提供的模式
`@(A|B|...)` | 完全匹配提供的一种模式
`**` | 若路径部分中只有一个 `globstar` 则匹配 0 个或多个搜索匹配项的目录和子目录。它不会对符号链接目录进行查找。

### 1. Dots 点

若文件或目录路径部分以一个 `.` 作为第一个字符，则它将不匹配任何 glob 模式，除非该模式的对应路径也以一个 `.` 作为其第一个字符。

例如，模式 `a/.*/c` 将匹配 `a/.b/c` 下的文件。而模式 `a/*/c` 不会匹配到，因为 `*` 不是以点字符开头。

在选项中配置 `dot:true` 可以使 glob 将 `.` 视为普通字符。

### 2. Basename Matching 基本名称匹配

若在选项总配置了 `matchBase:true` 并且该模式中没有 `/` 斜杠，则它将在树中任何位置寻找具有匹配 basename 的任何文件。

例如 `*.js` 将匹配 `test/simple/basic.js` 文件。

### 3. Empty Sets 空集

若未找到匹配的文件，则返回一个空数组。这与在 Shell 中返回模式本身不同。

```sh
$ echo a*s*d*f

a*s*d*f
```

可以在选项中设置 `nonull:true` 以获得同 bash-style 一样的行为。

### 4. See Also 另见

- `man sh`
- `man bash` ( 搜索 `Pattern Matching` )
- `man 3 fnmatch`
- `man 5 gitignore`
- [minimatch](https://github.com/isaacs/minimatch) -- JavaScript 中的 glob 最小匹配实用程序


## Function 函数

### `glob.hasMagic(pattern, [options])`

### `glob(pattern, [options], callback)`

### `glob.sync(pattern, [options])`


## Class: glob.Glob 类

可通实例化 `glob.Glob` 类创建 Glob 对象：

```js
var Glob = require('glob').Glob

var mg = new Glob(pattern, options, callback)
```

这是一个 EventEmitter 并开始遍历文件系统，以立即查找匹配项。

### `new glob.Glob(pattern, [options], [callback])`

```js
/**
 * 创建 Glob 对象
 * @param {String} pattern 搜索模式
 * @param {Object} options 选项
 * @param {GlobCallback} callback 发生错误或找到匹配项时的回调
 */
function Glob (pattern, options, callback) {}

/**
 * @callback GlobCallback
 * @param {Error|null} err 错误消息
 * @param {Array<String>} matches 找到的与模式匹配的文件名
 */
```


