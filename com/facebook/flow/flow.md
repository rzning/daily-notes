# Flow

- <https://github.com/facebook/flow>
- <https://flow.org/>

Flow 向 JavaScript 添加静态类型，以提高开发人员的生产率和代码质量。

## Installation

### 1. Setup Compiler

首先你需要安装一个编辑器来剥离 Flow 类型，你可以从下面两个编译器进行选择：

- [`Babel`](http://babeljs.io/)
- [`flow-remove-types`](https://github.com/facebook/flow/tree/master/packages/flow-remove-types)

-1- 使用 Babel

安装依赖：

```sh
yarn add --dev @babel/core @babel/cli @babel/preset-flow
```

向 `.babelrc` 文件添加 `preset-flow` 配置：

```json
{
  "presets": ["@babel/preset-flow"]
}
```

将 `src/` 目录中的源文件编译到 `lib/` 目录：

```sh
yarn run babel src/ -d lib/
```

-2- 使用 flow-remove-types

安装依赖：

```sh
yarn add --dev flow-remove-types
```

将 `src/` 目录中的源文件编译到 `lib/` 目录：

```sh
yarn run flow-remove-types src/ -d lib/
```

### 2. Setup Flow

将 `flow-bin` 添加到开发依赖：

```sh
yarn add --dev flow-bin
```

生成配置文件：

```sh
yarn run flow init
```

运行 Flow ：

```sh
yarn run flow
```

## Usage

对于大多数新 Flow 项目，你将遵循以下一般模式:

- 使用 `flow init` 命令初始化项目，将生成一个新的 `.flowconfig` 配置文件，此时 Flow 就在你项目中启用了。

- 使用 `flow status` 命令运行 Flow 后台进程，该进程将检查所有 Flow 文件是否有错误。
  - 后台进程持续运行，监视对代码的更改，并逐步检查这些更改是否有错误。
  - 在任何时间只有一个后台进程在运行，因此如果多次运行 `flow status` 它将使用相同的进程。
  - 使用 `flow stop` 命令停止后台进程

- 在你的源文件开头添加 `// @flow` 以让 Flow 在此文件中启用类型检查。

- 运行 `flow` 命令来检查你的代码。

