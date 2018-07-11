# Code Organization

- <https://github.com/Microsoft/vscode/wiki/Code-Organization>

#### 代码组织

代码由分层的和模块化的核心（core）组成，它可以使用扩展（extensions）模块来进行扩展。

扩展（extensions）可以在一个单独的进程中运行，并作为扩展主机（extension host）进行引用。

扩展（extensions）功能通过使用 [extension API] 实现。

---

## Layers 层

核心（core）分为以下几层：

Layer | Description
:-:|-
base | 提供通用工具类（utilities）和用户界面构件块（building blocks）
platform | 定义服务注入（injection）支持，和代码的基本服务
editor | 摩纳哥编辑器（Monaco editor）可作为一个独立的可下载组件
languages | 实现多种语言作为扩展使用，并且我们将会把更多的语言迁移到扩展
workbench | 作为 Monaco editor 的宿主，并为 viewlets 提供框架，例如资源管理器（Explorer）、状态栏（Status Bar）或菜单栏（Menu Bar），利用 [Electron] 实现代码桌面应用程序

## Target Environments 目标环境

核心（core）代码完全由 [TypeScript] 实现。

在每个层中，代码由目标运行时环境（target runtime environment）组织。
这保证了只有运行时特定的 APIs 可被调用。

在代码中，我们区分了以下目标环境:

Target Enviroment | Description | May use code from
:-:|-|-
common | 源代码只需要基本的 JavaScript APIs 并在所有其他 target environments 中运行 | \
browser | 源代码需要浏览器 APIs 例如操作 DOM | common
node | 源代码需要 [nodejs] APIs | common
electron-browser | 源码需要 [Electron renderer-process] APIs | common, browser, node
electron-main | 源码需要 [Electron main-process] APIs | common, node




[extension API]: <https://code.visualstudio.com/docs/extensions/overview>
[Electron]: <http://electron.atom.io/>
[TypeScript]: <https://github.com/microsoft/typescript>
[nodejs]: <https://nodejs.org/>
[Electron renderer-process]: <https://github.com/atom/electron/tree/master/docs#modules-for-the-renderer-process-web-page>
[Electron main-process]: <https://github.com/atom/electron/tree/master/docs#modules-for-the-main-process>



