# ESLint 入门指南

- EN : <https://eslint.org/docs/user-guide/getting-started>
- ZH : <https://cn.eslint.org/docs/user-guide/getting-started>

ESLint 是一个好用的工具，用于识别和报告 ECMAScript / JavaScript 代码中的模式匹配。

ESLint 以 “使代码更加一致和避免错误” 为目标。

在许多方面，它类似于 JSLint, JSHint 但有以下不同：

- ESLint 使用 [Espree] 进行 Javascript 解析
- ESLint 使用 AST 评估代码中的模式
- ESLint 完全可插拔，每个规则都是独立插件，可以在运行时随时添加。

[Espree]: https://github.com/eslint/espree

## 安装和使用 Installation and Usage

使用 yarn 安装 ESLint 包：

```sh
yarn add eslint --dev
```

使用以下命令生成配置文件：

```sh
yarn run eslint --init
```

之后，就可以在指定文件或目录上运行 ESLint 例如：

```sh
yarn run eslint yourfile.js
```

## 配置 Configuration

运行 `eslint --init` 命令，将在你项目目录中生成一个 `.eslintrc` 配置文件，内容类似于：

```json
{
  "env": {
    "browser": true,
    "es6": true
  },
  "rules": {
    "semi": ["error", "never"],
    "quotes": ["error", "single"],
    "no-eval": 1,
    "no-debugger": 2
  }
}
```

其中 `semi` , `no-eval` 等，是 ESLint 中的 Rules 规则，每个规则都可配置三种不同错误级别：

- `"off"` 或 `0` 代表关闭规则
- `"warn"` 或 `1` 代表开启规则，并以警告抛出，不影响程序运行
- `"error"` 或 `2` 代表开启规则，并以错误抛出，将终止程序运行
