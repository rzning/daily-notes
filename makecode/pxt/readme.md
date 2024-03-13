# Microsoft MakeCode

- <https://github.com/Microsoft/pxt>
- <https://makecode.com/>

Microsoft MakeCode 基于开源项目 [Microsoft 编程体验工具包（Programming Experience Toolkit）][PXT] 简称 [PXT]。

`Microsoft MakeCode` 是面向用户的编辑器中的名称，而 `PXT` 用在所有 GitHub 源码中。

---

[PXT] 是一个为初学者创建特定用途的编程体验的框架，尤其专注于计算机科学教育。
PXT 的底层编程语言是 [TypeScript] 的一个子集（省略了 JavaScript 动态特性）。

PXT 的主要特点有：

- 一个基于块（[Blockly]）的代码编辑器，并可使用转换器（converter）与文本格式相互转换。
- 一个为 [VS Code] 提供编辑能力的 [Monaco Code Editor]，此处列出了编辑器的[功能][Code Navigation]。
- 可扩展性支持，可使用 [TypeScript] 定义新块。
- 一个 [ARM Thumb] 机器代码发射器（emitter）。
- 一个命令行包管理器。

更多信息：

- [About](https://makecode.com/about)
- [Documentation](https://makecode.com/docs)

使用 [PXT] 构建的编辑器示例：

- <https://makecode.microbit.org>
- <https://makecode.adafruit.com>
- <https://makecode.chibitronics.com>
- <https://minecraft.makecode.com>
- <https://makecode.com/labs>

## 分支 Branches

- `master` 是活跃的开发分支，当前是 `v3.*` 版本构建的。
- `v0` 是为 `v0.*` 版本构建的服务分支。

## 从本地服务器运行一个目标 Target

- <https://makecode.com/cli>

## 将一个 Target 链接到 PXT

如果你正在修改自己的 PXT 实例，并希望获得一个目标（比如 pxt-microbit）来使用你的本地版本。

若此时目标（pxt-microbit）与 pxt 在同一目录下，切换到目标（pxt-microbit）目录并执行：

```sh
$ npm link ../pxt
```

如果你有多个 pxt 的签出（checkouts），您可以执行以下操作：

- 在目标和 pxt 中执行 `npm i` 命令
- 在目标目录中执行 `pxt link ../some-other-pxt`。（你可能需要先执行 `npm install -g pxt` 来更新你的 CLI）

## 构建 Build

将项目克隆到本地并执行：

```sh
$ npm install
$ npm build
```

然后安装 pxt 命令行工具（只需执行一次）：

```sh
$ npm install -g pxt
# or
$ yarn global add pxt
```

在此之后，你可以从构建树的任何地方运行 `pxt` 命令。

要启动本地服务器，在应用目标（如：pxt-microbit）的根目录执行：

```sh
$ pxt serve
```

## 图标 Icons

在 `svgicons/` 目录中有许多自定义图标。

- <http://semantic-ui.com/elements/icon.html>

这些需要 `1000x1000px` 大小。最好从一个现有的开始。
访问 <http://localhost:3232/icons.html> 查看现有图标。

如果你在展示你创建的图标时遇到了麻烦，尝试执行：

```sh
$ npm install -g svgo
$ svgo svgicons/myicon.svg
```

## 测试 Tests

测试位于 `tests/` 子目录中，包含 node 和 broswer 测试。
要执行它们，只需在根目录中执行:

```sh
$ npm run test:all
```

[PXT]: https://github.com/Microsoft/pxt
[TypeScript]: https://github.com/Microsoft/TypeScript
[Blockly]: https://github.com/google/blockly
[VS Code]: https://github.com/Microsoft/vscode
[Monaco Code Editor]: https://github.com/Microsoft/monaco-editor
[Code Navigation]: https://code.visualstudio.com/docs/editor/editingevolved
[ARM Thumb]: https://en.wikipedia.org/wiki/ARM_architecture#Thumb
