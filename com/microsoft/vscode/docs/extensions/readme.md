# Extending Visual Studio Code

- <https://code.visualstudio.com/docs/extensions/overview>

这里我们将介绍 VS Code 可扩展性文档的概要，以及如何快速构建你的第一个 VS Code 扩展（extension）。

如果您对 VS Code 的可扩展性的设计方案（design approach）感兴趣，可点击下面链接了解：

> [Extensibility Principles and Patterns] - 扩展性原则和模式

如果你只想使用现有的扩展，请参阅扩展市场（[Extension Marketplace]）主题，
我们将向你展示如何从 VS Code 市场（[Marketplace]）查找和安装扩展。

所有 VS Code 扩展（extensions）共享一个通用模型，包括贡献（注册）、激活（加载）和访问 VS Code 可扩展性 API。

然而 VS Code extensions 有两种特殊的风格，语言服务器（language servers）和调试器（debuggers），
它们有自己的附加协议（additional protocols），这将在下文分别介绍。

1. [Extensions](#extensions) - 基本构件块
2. [Language Servers](#language-servers) - 通过语言服务器协议（[Language Server Protocol]）增强编辑体验
3. [Debuggers](#debug-adapter) - 通过调试适配器（Debug Adapter）连接外部调试器

![extensibility rchitecture](https://code.visualstudio.com/assets/docs/extensions/overview/extensibility-architecture.png)

---

## Extensions

所有扩展一旦启动，都将在我们的共享扩展主机进程中运行。

这个独立的扩展进程确保了 VS Code 始终响应。

扩展包括支持：

|     Support     | Description                                                                                                               |
| :-------------: | ------------------------------------------------------------------------------------------------------------------------- |
|   Activation    | 当检测到特定的文件类型、存在特定的文件、或者通过命令面板或组合键选择命令时，加载扩展                                      |
|     Editor      | 和编辑器内容一起工作，读取和操作文本等                                                                                    |
|    Workspace    | 访问打开的编辑器、状态栏、信息消息等                                                                                      |
|    Eventing     | 连接到编辑器生命周期事件，例如打开、关闭、改变等                                                                          |
| Evolved editing | 为丰富的语言支持创建供应者（providers），包括智能感知（IntelliSense）、窥探（Peek）、悬浮（Hover）、诊断（Diagnostics）等 |

我们有两个端到端教程，让你了解扩展基础：

1. [Hello World][example-hello-world] - 生成一个基本的扩展，理解扩展的文件夹结构，
   扩展清单，了解怎样激活使其工作，运行和调试扩展并在本地安装它。
2. [Word Count][example-word-count] - 根据特定的文件类型激活，更新状态栏
   响应文本编辑器中的更改，并在删除文件时处理您的扩展。

扩展性原则和模式（[Extensibility Principles and Patterns]）也很有用，它们描述了整个 extensibility API 中使用的共享编程模式。

## Language Servers

语言服务器（Language Server）是一种特殊的扩展，它为 VS Code 中的多种语言提供了编辑体验。

使用语言服务器，您可以实现转到定义（jump-to-definitions）、自动补全（autocomplete）、错误检查（error-check）
和 VS Code 中支持的许多其他语言特性（[language features][language-support]）。

- 了解更多关于语言服务器（[language servers][example-language-server]）

## Debug Adapter

VS Code 实现了一个通用调试器 UI，并依赖于调试器扩展和所谓的调试适配器（debug adapters）来将调试 UI 连接到一个真正的调试器或运行时环境。

调试适配器（debug adapter）是通过 VS Code 调试协议（Debug Protocol）与 VS Code 通信的专用进程，可以用任何语言实现。

- 了解更多关于创建调试器扩展（[debugger extensions][example-debuggers]）

---

---

查看 VS Code extensions 最简单的方式是通过扩展市场（[Extension Marketplace]）。

你可以浏览有用的扩展，安装它们来尝试它们，并了解如何扩展 VS Code 以满足你自己的开发场景。

### Language Extension Guidelines 语言扩展指南

语言扩展指南（[Language Extension Guidelines][language-support]）主题可以帮助你决定想要在你的扩展中支持的语言特性。

它显示了在 VS Code 中可用的各种语言特性（例如，代码建议和操作、格式化、重命名）

以及如何通过语言服务器协议或在你的扩展中直接使用扩展 API 来实现它们。

### Themes, Snippets, and Colorizers 主题、代码片段、语言着色器

你可以通过简单的东西为你的编程语言提供一个很好的编辑体验，包括语法高亮、实用的代码片段、精心设计的颜色主题。

TextMate 定制文件提供了这种支持，VS Code 允许您轻松地打包和重用这些文件，
以便您可以在扩展中直接使用 `.tmTheme`、`.tmSnippets` 和 `.tmLanguage` 文件。

主题、代码片段和着色器（[Themes, Snippets, and Colorizers][themes-snippets-colorizers]）主题向您展示了如何包含 TextMate 文件，
以及如何创建自己的主题、代码片段和语言着色器。

### Writing an Extension 编写一个扩展

约曼扩展生成器（[Yeoman extension generator][yocode]）使创建简单的扩展项目变得非常容易。

这些都是很好的开始，您还可以找到现有的扩展示例（[samples]）。

扩展可以用 TypeScript 或 JavaScript 编写。

VS Code 提供了一流的扩展开发体验，您可以在其中开发、构建、运行、测试和调试所有来自于 VS Code 本身。

- 开发自己的 VS Code 扩展（[Developing Extensions]）

### Testing Extensions 测试扩展

我们也非常支持为你的扩展编写和运行测试（[Testing Your Extension][Testing Extensions]）。

你可以轻松创建调用 VS Code APIs 的集成测试，并在运行 VS Code 实例中测试代码。

### Extension Ideas 扩展理念

对于 VS Code 特性，许多很棒的社区想法都是作为扩展而不是作为核心产品的一部分来实现的。

通过安装正确的扩展集，用户可以很容易地选择他们想要的功能。

VS Code 团队将跟踪可能的扩展作为 GitHub 中标记为 `*extension-candidate` 的问题（[issues][extension-candidate-issues]），在 VS Code 存储库（[vscode repository]）中。

如果你正在寻找一个很好的扩展来构建，可以看一下 `*extension-candidate` 问题（[issues][extension-candidate-issues]）。

### Next Steps

- [Your First Extension][example-hello-world] - 尝试创建一个简单的 Hello World 扩展。
- [Extension API] - 了解 VS Code 可扩展性 APIs。
- [Extension Examples][samples] - 您可以查看和构建的扩展示例列表。

[Extensibility Principles and Patterns]: https://code.visualstudio.com/docs/extensionAPI/patterns-and-principles
[Extension Marketplace]: https://code.visualstudio.com/docs/editor/extension-gallery
[Marketplace]: https://marketplace.visualstudio.com/VSCode
[Language Server Protocol]: https://microsoft.github.io/language-server-protocol/
[example-hello-world]: https://code.visualstudio.com/docs/extensions/example-hello-world
[example-word-count]: https://code.visualstudio.com/docs/extensions/example-word-count
[language-support]: https://code.visualstudio.com/docs/extensionAPI/language-support
[example-language-server]: https://code.visualstudio.com/docs/extensions/example-language-server
[example-debuggers]: https://code.visualstudio.com/docs/extensions/example-debuggers
[themes-snippets-colorizers]: https://code.visualstudio.com/docs/extensions/themes-snippets-colorizers
[yocode]: https://code.visualstudio.com/docs/extensions/yocode
[samples]: https://code.visualstudio.com/docs/extensions/samples
[Developing Extensions]: https://code.visualstudio.com/docs/extensions/developing-extensions
[Testing Extensions]: https://code.visualstudio.com/docs/extensions/testing-extensions
[extension-candidate-issues]: https://github.com/Microsoft/vscode/issues?q=is%3Aopen+is%3Aissue+label%3A*extension-candidate
[vscode repository]: https://github.com/Microsoft/vscode
[Extension API]: https://code.visualstudio.com/docs/extensionAPI/overview
