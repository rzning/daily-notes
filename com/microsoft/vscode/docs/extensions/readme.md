# Extending Visual Studio Code

- <https://code.visualstudio.com/docs/extensions/overview>

这里我们将介绍 VS Code 可扩展性文档的概要，以及如何快速构建你的第一个 VS Code 扩展（extension）。

如果您对 VS Code 的可扩展性的设计方案（design approach）感兴趣，可点击下面链接了解：

> [Extensibility Principles and Patterns] - 扩展性原则和模式

如果你只想使用现有的扩展，请参阅扩展市场（[Extension Marketplace]）主题，
我们将向你展示如何从 VS Code 市场（[Marketplace]）查找和安装扩展。

所有 VS Code 扩展（extensions）共享一个通用模型，包括贡献(注册)、激活(加载)和访问 VS Code 可扩展性 API。



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

Support | Description
:-:|-
Activation | 当检测到特定的文件类型、存在特定的文件、或者通过命令面板或组合键选择命令时，加载扩展
Editor | 和编辑器内容一起工作，读取和操作文本等
Workspace | 访问打开的编辑器、状态栏、信息消息等
Eventing | 连接到编辑器生命周期事件，例如打开、关闭、改变等
Evolved editing | 为丰富的语言支持创建供应者（providers），包括智能感知（IntelliSense）、窥探（Peek）、悬浮（Hover）、诊断（Diagnostics）等

我们有两个端到端教程，让你了解扩展基础：

1. [Hello World][example-hello-world] - 生成一个基本的扩展，理解扩展的文件夹结构，
  扩展清单，了解怎样激活使其工作，运行和调试扩展并在本地安装它。
2. [Word Count][example-word-count] - 根据特定的文件类型激活，更新状态栏
  响应文本编辑器中的更改，并在删除文件时处理您的扩展。

扩展性原则和模式（[Extensibility Principles and Patterns]）也很有用，它们描述了整个 extensibility API 中使用的共享编程模式。

## Language Servers

语言服务器（Language Server）是一种特殊的扩展，它为 VS Code 中的多种语言提供了编辑体验。

使用语言服务器，您可以实现转到定义（jump-to-definitions）、自动补全（autocomplete）、错误检查（error-check）
和 VS Code 中支持的许多其他语言特性（[language features]）。

了解更多关于语言服务器（[language servers][example-language-server]）

## Debug Adapter

VS Code 实现了一个通用调试器 UI，并依赖于调试器扩展和所谓的调试适配器（debug adapters）来将调试 UI 连接到一个真正的调试器或运行时环境。



---

[Extensibility Principles and Patterns]: <https://code.visualstudio.com/docs/extensionAPI/patterns-and-principles>
[Extension Marketplace]: <https://code.visualstudio.com/docs/editor/extension-gallery>
[Marketplace]: <https://marketplace.visualstudio.com/VSCode>
[Language Server Protocol]: <https://microsoft.github.io/language-server-protocol/>
[example-hello-world]: <https://code.visualstudio.com/docs/extensions/example-hello-world>
[example-word-count]: <https://code.visualstudio.com/docs/extensions/example-word-count>
[language features]: <https://code.visualstudio.com/docs/extensionAPI/language-support>
[example-language-server]: <https://code.visualstudio.com/docs/extensions/example-language-server>
