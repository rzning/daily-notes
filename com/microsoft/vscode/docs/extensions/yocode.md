# Yo Code - Extension Generator

- <https://code.visualstudio.com/docs/extensions/yocode>
- <https://github.com/Microsoft/vscode-generator-code>

### Install

```bash
> npm install -g yo generator-code
```

### Run

```bash
> yo code
```

options:

- New Extension (TypeScript)
- New Extenston (JavaScript)
- New Color Theme
- New Language Support
- New Code Snippets
- New Extension Pack

![yocode](https://code.visualstudio.com/assets/docs/extensions/yocode/yocode.png)

## Generator Options

此生成器可以为新创建的扩展生成一个扩展骨架，
也可以基于现有的 TextMate 定义文件为语言、主题或代码片段创建一个立即可用的扩展。

### New Extension (TypeScript)

创建一个实现 `hello world` 命令的扩展骨架，你可以在此基础上实现自己的扩展。

- 提示输入扩展名称（identifier），并将在当前目录中创建该名称的文件夹。
- 创建一个含有源、测试和输出文件夹的基本目录结构（folder structure）。
- 模板输出一个 `package.json` 文件和一个扩展主文件。
- 建立 `launch.json` 和 `tasks.json` 因此 F5 将编译并运行你的扩展，并附加调试器。
- 可选的的配置一个 Git 存储库。

一旦创建完成，使用 VS Code 打开创建的文件夹。
此目录中包含一个 `vsc-extension-quickstart.md` 文件可作为下一步操作的指南。

此扩展是安装的，这样你可以得到 extension API 的智能提示（IntelliSense）。

### New Extension (JavaScript)

与 `New Extension (TypeScript)` 相同，但是针对 JavaScript 的。

### New Color Theme

创建一个扩展，来贡献一个颜色主题。
您可以基于已有的 TextMate 颜色主题创建，或者从头创建一个新的主题。

- 如果你打算使用 `Developer: Generate Color Theme From Current Settings`
（开发人员：从当前设置生成颜色主题）命令创建一个主题，也就是从你的设置中获取定制颜色，
你需要从一个新的扩展开始（推荐你这样做）。
- 从一个 TextMate 颜色主题开始，将从一个现有的主题开始，可用于 `.tmTheme`。

生成器将：

- 提示输入颜色主题名称和颜色基本主题（light or dark）。
- 提示输入扩展名称（identifier），并将在当前目录中创建该名称的文件夹。

一旦创建，使用 VS Code 打开创建的文件夹，并运行扩展以测试新主题。

查看 `vsc-extension-quickstart.md` 这是下一步操作的快速指南。

### New Language Support

创建一个扩展，来贡献一个用于着色器的语言。



