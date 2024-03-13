# Commander.js

- <https://github.com/tj/commander.js>

用于 Node.js 命令行的完整解决方案，灵感来自 Ruby 的 [commander](https://github.com/commander-rb/commander)

## 安装

```sh
npm install commander
```

## 使用

Commander 导出一个全局 `program` 对象，方便快速使用：

```js
const { program } = require('commander')
program.version('0.0.1')
```

也可以自己创建一个本地命令对象来使用：

```js
const { Command } = require('commander')
const program = new Command()
program.version('0.0.1')
```

## 选项

Commander 使用 `.option()` 方法来定义选项：

```js
program
  .option('-d, --debug', 'output extra debugging')
  .option('-s, --small', 'small pizza size')
  .option('-p, --pizza-type <type>', 'flavour of pizza')

program.parse(process.argv)

if (program.debug) {
  console.log(program.opts())
}

if (program.small) {
  console.log('- small pizza size')
}

if (program.pizzaType) {
  console.log(`- ${program.pizzaType}`)
}
```

> 通过 `program.parse(arguments)` 方法处理参数，
> 没有被使用的参数存放在 `program.args` 数组中。

## 命令

Commander 通过 `.command()` 或 `.addCommand()` 方法配置命令：

```js
program
  .command('clone <source> [destination]')
  .description('clone a repository into a newly created directory')
  .action((source, destination) => {
    console.log('clone command called')
  })
```

## 帮助信息

Commander 会基于你的程序自动生成帮助信息，默认帮助选项是 `-h, --help` 。

可以通过监听 `--help` 来自定义帮助信息：

```js
program.on('--help', () => {
  console.log('')
  console.log('Example call:')
  console.log('  $ custom-help --help')
})
```
