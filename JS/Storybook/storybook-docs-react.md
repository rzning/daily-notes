# Storybook for React

- <https://storybook.js.org/docs/react>

Storybook 是用于 UI 开发的工具。它通过隔离组件使开发更快、更容易。这允许您一次只处理一个组件。

你可以开发整个 UI 而不需要启动复杂的开发栈、强制将某些数据放入数据库、或在应用程序中导航。

## 📂 Directory Structure

- 🚀 Get Sterted

  - Introduction
  - Install
  - What's a story?
  - Browse stories - 浏览示例
  - Setup - 设置
  - Conclusion - 总结
  - 📚 Examples

- 🖋 Writing Stories

  - Introduction
  - Args
  - Parameters - 参数
  - Decorators - 装饰器
  - Loaders - 装载器
  - Naming components and hierarchy - 命名组件和层次结构

- 📖 Writing Docs

- 🧩 Essential addons
- ⚙ Configure
- 🔁 Workflows
- 🔧 Addons
- 🔌 API

# 🚀 Get Sterted

## 安装 Storybook

使用 Storybook CLI 在单个命令中安装它。在你现有的项目的根目录下运行:

```sh
# Add Storybook
npx sb init
```

> ### sb init 不是为空项目创建的
>
> Storybook 需要安装到已经使用框架设置的项目中。
> 它不能在空项目上工作。
> 有很多方法可以在一个给定的框架中引导一个应用程序，包括:
>
> - 📦 Create React App
> - 📦 Vue CLI
> - 📦 Ember CLI
> - 或者其他任何可用的工具。

在安装过程中 Storybook 将查看项目的依赖项，并为你提供可用的最佳配置。

上面的命令将对你的本地环境做出以下更改:

- 📦 安装所需的依赖项。
- 🛠 设置必要的脚本来运行和构建 Storybook 。
- 🛠 添加默认的 Storybook 配置。
- 📝 添加一些样板故事作为开始。

根据你的框架，首先构建你的应用程序，然后通过运行下面命令检查一切是否正常:

```sh
# Starts Storybook in development mode
yarn storybook
```

它将在本地启动 Storybook 并输出地址。
根据你的系统配置，它将自动在一个新的浏览器选项卡中打开地址，你将看到一个欢迎屏幕。

# 🖋 Writing Stories

# 📖 Writing Docs

# 🧩 Essential addons

# ⚙ Configure

# 🔁 Workflows

# 🔧 Addons

# 🔌 API
