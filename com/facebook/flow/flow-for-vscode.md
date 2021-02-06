# Flow for Visual Studio Code

- <https://github.com/flowtype/flow-for-vscode>

此扩展增加 VS Code 对 [Flow] 的支持。

[Flow] 是一个静态类型检查器，用于在 JavaScript 程序中发现类型错误。

[Flow]: <https://github.com/facebook/flow>

## Setup

- 确保你的项目有一个 `.flowconfig` 文件。
- 确保你能够通过命令行运行 `flow` 命令。
- 将 `javascript.validate.enable` 选项设置为 `false` 或在项目中完全禁用内置的 TypeScript 扩展。


## Configuration

你可以通过修改 VS Code 的 `settings.json` 文件来指定一个配置。

- `flow.useNPMPackagedFlow` - 使用项目 NPM 包中的 Flow `true`
- `flow.pathToFlow` - Flow 二进制文件的绝对路径 `flow`
- `flow.useBundledFlow` - 若其他的都不能工作，则使用此插件捆绑的 Flow `true`
- `flow.showUncovered` - 显示未发现的代码 `false`
- `flow.coverageSeverity` - 类型覆盖诊断严重性 `info`
- `flow.lazyMode`- 支持 Flow [lazyMode](https://flow.org/en/docs/lang/lazy-modes/) `null`
- `flow.stopFlowOnExit` - 从项目退出时停止 Flow 服务 `true`
- `flow.useCodeSnippetOnFunctionSuggest` - 完整的函数及其参数签名 `true`
- `flow.runOnEdit` - 在每次编辑时运行 Flow 否则只在保存更改时运行 `true`
- `flow.showStatus` - 在执行类型检查时，在状态栏显示 Flow 状态图标 ( Spinner ) `true`
- `flow.runOnAllFiles` - 在所有文件上执行 Flow `false`
- `flow.useLSP` - 使用 LSP `true`
- `flow.enabled` - 启用 Flow `true`

## Features

- 支持多个 flowconfig 和 VS Code 多根工作空间 ( required `useLSP: true` )
- 智能感知 ( IntelliSense )
- 跳转到或查看定义
- 诊断错误和警告
- 悬停类型信息
- 重命名 ( required `useLSP: true` )
- 可切换的代码覆盖率报告
