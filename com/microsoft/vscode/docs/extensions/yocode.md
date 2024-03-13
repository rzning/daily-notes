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

### 1. New Extension (TypeScript)

创建一个实现 `hello world` 命令的扩展骨架，你可以在此基础上实现自己的扩展。

- 提示输入扩展名称（identifier），并将在当前目录中创建该名称的文件夹。
- 创建一个含有源、测试和输出文件夹的基本目录结构（folder structure）。
- 模板输出一个 `package.json` 文件和一个扩展主文件。
- 建立 `launch.json` 和 `tasks.json` 因此 F5 将编译并运行你的扩展，并附加调试器。
- 可选的的配置一个 Git 存储库。

一旦创建完成，使用 VS Code 打开创建的文件夹。
此目录中包含一个 `vsc-extension-quickstart.md` 文件可作为下一步操作的指南。

此扩展是安装的，这样你可以得到 extension API 的智能提示（IntelliSense）。

### 2. New Extension (JavaScript)

与 `New Extension (TypeScript)` 相同，但是针对 JavaScript 的。

### 3. New Color Theme

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

### 4. New Language Support

创建一个扩展，来贡献一个用于着色器的语言。

- 提示输入一个现有的 TextMate 语言文件（`.tmLanguage`、`.plist` 或 `.json`）的位置（URL 或文件路径）。
  这个文件将被导入到新扩展。要开始一个新的语法，您可以通过传递一个空名称来跳过它。
- 提示输入扩展名称（identifier），并将在当前目录中创建该名称的文件夹。

一旦创建，使用 VS Code 打开创建的文件夹，并运行扩展以测试新主题。

打开 `vsc-extension-quickstart.md` 文件，查看下一步骤。

查看已创建并定义配置选项的语言配置文件，比如语言使用的注释和括号样式。

### 5. New Code Snippets

创建一个扩展，来贡献一个新的代码片段。

- 提示输入一个包含 TextMate 片段（`.tmSnippet`）或 Sublime 片段（`.sublime-snippet`）的目录位置。
  这些文件将被转换成一个 VS Code 代码片段文件。
- 提示输入这些代码片段将被激活的语言名称。
- 提示输入扩展名称（identifier），并将在当前目录中创建该名称的文件夹。

一旦创建，使用 VS Code 打开创建的文件夹，并运行扩展以测试代码片段。

打开 `vsc-extension-quickstart.md` 文件，查看下一步操作。

### 6. New Extension Pack

创建一个扩展，来为你喜欢的扩展贡献一个新的扩展包。

- 提示在扩展包中添加已安装的扩展。
- 提示输入扩展名称（identifier），并将在当前目录中创建该名称的文件夹。

在发布代码包之前，检查 `package.json` 文件中的 `extensionDependencies` 列表。

创建后，在创建的文件夹上使用 VS Code 打开，并运行扩展以测试扩展包。

查看 `vsc-extension-quickstart.md` 文件，获取下一步操作信息。

## Your extensions folder

加载一个扩展，你需要复制文件到你的 VS Code 扩展目录 `.vscode/extensions`。

根据您的平台，它位于以下文件夹：

| Platform | Folder                             |
| -------- | ---------------------------------- |
| Windows  | `%USERPROFILE%\.vscode\extensions` |
| macOS    | `~/.vscode/extensions`             |
| Linux    | `~/.vscode/extensions`             |

如果你希望在每次运行代码时加载你的扩展，请将你的项目复制到 `.vscode/extensions` 下的新文件夹中，
例如 `~/.vscode/extensions/myextension`。

## Next Steps

- [Publishing Tool][next1] - 了解如何将扩展发布到 VS Code 市场。
- [Hello World][next2] - 尝试此演练来构建您的第一个扩展。
- [Additional Extension Examples][next3] - 看看我们的示例扩展项目列表。

[next1]: https://code.visualstudio.com/docs/extensions/publish-extension
[next2]: https://code.visualstudio.com/docs/extensions/example-hello-world
[next3]: https://code.visualstudio.com/docs/extensions/samples
