# Process

- <https://nodejs.org/docs/latest/api/process.html>
- <https://github.com/nodejs/node/blob/main/lib/process.js>

`process` 对象提供有关当前 Node.js 进程的信息和控制。

```js
import process from 'node:process'
```

源码：

- `node/src/`
  - [node_process.h](https://github.com/nodejs/node/blob/main/src/node_process.h)
  - [node_process-inl.h](https://github.com/nodejs/node/blob/main/src/node_process-inl.h)
  - [node_process_events.cc](https://github.com/nodejs/node/blob/main/src/node_process_events.cc)
  - [node_process_methods.cc](https://github.com/nodejs/node/blob/main/src/node_process_methods.cc)
  - [node_process_object.cc](https://github.com/nodejs/node/blob/main/src/node_process_object.cc)

中文参考：

- <https://www.nodejs.com.cn/api/process.html>
- [Node.js 全局对象 | 菜鸟教程](https://www.runoob.com/nodejs/nodejs-global-object.html)

## `process.argv`

- 定义 : [node_process_object.cc#L198][src_argv]
- 类型 : `<string[]>`

`process.argv` 属性返回一个数组，其中包含启动 Node.js 进程时传入的命令行参数。

- 第一个元素是 `process.execPath` 。
- 第二个元素是要执行的 JavaScript 文件的路径。
- 其他元素是任何附加的命令行参数。

例如，假设 `process-args.js` 的脚本如下：

```js
import { argv } from 'node:process'

// 打印 process.argv
argv.forEach((val, index) => {
  console.log(`${index}: ${val}`)
})
```

以如下方式启动 Node.js 进程：

```sh
node process-args.js one two=three four
```

将有如下输出：

```sh
0: /usr/local/bin/node
1: /Users/mjr/work/node/process-args.js
2: one
3: two=three
4: four
```

## `process.env`

- 类型 : `<Object>`

`process.env` 属性返回一个包含用户环境变量的对象。

```js
import { env } from 'node:process'

env.TEST = 1

// 在 Windows 系统中，环境变量不区分大小写
console.log(env.test)
// => 1

// 使用 delete 从 process.env 中删除指定属性
delete env.TEST
console.log(env.TEST)
// => undefined
```

- 除非在创建 Worker 实例时显式指定，否则每个 Worker 线程都有自己的 `process.env` 副本。
- 对 `process.env` 的更改在 Worker 线程中是不可见的，只有主线程可以对操作系统或原生插件进行可见的更改。
- 在 Windows 上，与主线程不同， Worker 实例上的 `process.env` 副本以区分大小写的方式操作。

## `process.execArgv`

- 定义 : [node_process_object.cc#L203][src_execArgv]
- 类型 ：`<string[]>`

`process.execArgv` 属性返回在启动 Node.js 进程时传递的一组特定于 Node.js 的命令行选项。

- 这些选项不会出现在 `process.argv` 属性返回的数组中。
- 并且不包含 Node.js 可执行文件、脚本名称或脚本名称后面的任何选项。

为了生成与父进程具有相同执行环境的子进程时，这些选项非常有用。

例如，执行下面命令：

```sh
node --harmony script.js --version
```

`process.execArgv` 结果为：

```sh
['--harmony']
```

`process.argv` 结果为：

```sh
['/usr/local/bin/node', 'script.js', '--version']
```

## `process.execPath`

- 定义 : [node_process_object.cc#L226][src_execPath]
- 类型 : `<string>`

`processs.execPath` 属性返回启动 Node.js 进程的可执行文件的绝对路径名。

```sh
'/usr/local/bin/node'
```

[src_argv]: https://github.com/nodejs/node/blob/main/src/node_process_object.cc#L198
[src_execArgv]: https://github.com/nodejs/node/blob/main/src/node_process_object.cc#L203
[src_execPath]: https://github.com/nodejs/node/blob/main/src/node_process_object.cc#L226
