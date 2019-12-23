# execa

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 454 66" width="400"><g fill="none"><path fill="#000" d="M155.082 0l-30.928 33.335 30.928 33.332h18.149l-30.928-33.335L173.231 0zM0 66.667V0h80.001v13.334h-66.67v13.334h53.34v13.33H13.334v13.335h66.667v13.334H0zm186.46-13.304V0h79.997v13.334h-66.663v13.334h53.329v13.33h-53.33v15.334c-9.04 0-4.988.03-13.334.03v-1.999zM279.684 0h80.002v13.334H293.02V53.33h66.67v13.334h-80.005V0zm140.637 0l32.594 66.667H438.1l-25.183-51.48-25.187 51.476h-14.816L405.513 0h14.809z"/><path fill="#6C3" d="M186.46 53.307h79.921V66.64h-79.997c0-10.364.075-7.272.075-13.334zM111.378 0l30.924 33.335-30.924 33.332h-18.15l30.925-33.335L93.23 0h18.149z"/></g></svg>

Process execution for humans

## Install

```sh
$ npm install execa
```

## Usage

```js
const execa = require('execa')

(async () => {
  const { stdout } = await execa('echo', ['unicorns'])
  console.log(stdout)
})()

// => 'unicorns'
```

### 将子进程标准输出通过管道 ( Pipe ) 传递给父进程

```js
const execa = require('execa')

execa('echo', ['unicorns']).stdout.pipe(process.stdout)
```

### 处理错误

```js
const execa = require('execa')

()(async () => {
  // 捕获错误
  try {
    await execa('unknown', ['command'])
  } catch (error) {
    console.log(error)
  }
})
```

## 取消一个生成的进程

```js
const execa = require('execa')

(async () => {
  const subprocess = execa('node')

  setTimeout(() => {
    subprocess.cancel()
  }, 1000)

  try {
    await subprocess
  } catch (error) {
    console.log(subprocess.killed)  // true
    console.log(error.isCanceled)   // true
  }
})()
```

### 用同步方法捕获错误

```js
try {
  execa.sync('unknown', ['command'])
} catch (error) {
  console.log(error)
}
```

### 杀死进程

使用 SIGTERM 并在 2 秒钟后用 SIGKILL 杀死它。

```js
const execa = require('execa')

const subprocess = execa('node')

setTimeout(() => {
  subprocess.kill('SIGTERM', {
    forceKillAfterTimeout: 2000
  })
}, 1000)
```

## API

### `execa(file, arguments, options?)`

执行一个文件。

可以看作是 [`child_process.execFile()`] and [`child_process.spawn()`] 的组合。

无需转义或引用 ( escaping/quoting )

返回一个 [`child_process`] 实例。

- 也是一个 Promise 对象，用于 `childProcessResult` 的解决 ( resolving ) 或拒绝 ( rejecting ) 。
- 并公开了以下附加的方法和属性：
  - `kill()`
  - `cancel()`
  - `all`

[`child_process.execFile()`]: <https://nodejs.org/api/child_process.html#child_process_child_process_execfile_file_args_options_callback>
[`child_process.spawn()`]: <https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options>
[`child_process`]: <https://nodejs.org/api/child_process.html#child_process_class_childprocess>

### `execa.sync(file, arguments?, options?)`

同步执行一个文件。

返回或抛出一个 `childProcessResult` 对象。

### `execa.command(command, options?)`

执行一条命令。

下面两条语句作用相同：

- `execa('echo', ['unicorns'])`
- `execa.command('echo unicorns')`

### `execa.commandSync(command, options?)`

同步执行一条命令。

返回或抛出一个 `childProcessResult` 对象。

### `execa.node(scriptPath, arguments?, options?)`

将一个 Node.js 脚本作为一个子进程来执行。

与下面语句作用类似：

- `execa('node', [scriptPath, ...arguments], options)`

## `childProcessResult`

子进程执行的结果。

成功时是一个简单的对象，若失败时也是一个 `Error` 实例。

子进程在下列情况下将失败：

- 退出码不是 `0` -- `exitCode`
- 被一个信号杀死了 -- `signal` , `killed`
- 超时 -- `timedOut`
- 被取消 -- `isCanceled`
- 没有足够的内存或者已经有太多的子进程

## `options`


