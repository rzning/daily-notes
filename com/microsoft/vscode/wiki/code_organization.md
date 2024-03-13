# Code Organization

- <https://github.com/Microsoft/vscode/wiki/Code-Organization>

#### 代码组织

代码由分层的和模块化的核心（core）组成，它可以使用扩展（extensions）模块来进行扩展。

扩展（extensions）可以在一个单独的进程中运行，并作为扩展主机（extension host）进行引用。

扩展（extensions）功能通过使用 [extension API] 实现。

---

## Layers 层

核心（core）分为以下几层：

|   Layer   | Description                                                                                                                                                   |
| :-------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|   base    | 提供通用工具类（utilities）和用户界面构件块（building blocks）                                                                                                |
| platform  | 定义服务注入（injection）支持，和代码的基本服务                                                                                                               |
|  editor   | 摩纳哥编辑器（Monaco editor）可作为一个独立的可下载组件                                                                                                       |
| languages | 实现多种语言作为扩展使用，并且我们将会把更多的语言迁移到扩展                                                                                                  |
| workbench | 作为 Monaco editor 的宿主，并为 viewlets 提供框架，例如资源管理器（Explorer）、状态栏（Status Bar）或菜单栏（Menu Bar），利用 [Electron] 实现代码桌面应用程序 |

## Target Environments 目标环境

核心（core）代码完全由 [TypeScript] 实现。

在每个层中，代码由目标运行时环境（target runtime environment）组织。
这保证了只有运行时特定的 APIs 可被调用。

在代码中，我们区分了以下目标环境:

| Target Enviroment | Description                                                                | May use code from     |
| :---------------: | -------------------------------------------------------------------------- | --------------------- |
|      common       | 源代码只需要基本的 JavaScript APIs 并在所有其他 target environments 中运行 | \                     |
|      browser      | 源代码需要浏览器 APIs 例如操作 DOM                                         | common                |
|       node        | 源代码需要 [nodejs] APIs                                                   | common                |
| electron-browser  | 源码需要 [Electron renderer-process] APIs                                  | common, browser, node |
|   electron-main   | 源码需要 [Electron main-process] APIs                                      | common, node          |

## Dependency Injection 依赖注入

代码是围绕大多数在 platform 层定义的服务进行组织的。

服务通过构造器注入（constructor injection）到达客户端。

服务定义分为两个部分：

1. 服务接口（service interface）
2. 服务标识（service identifier）

后者是必需的，因为 TypeScript 不使用名义上的但结构化的类型。
服务标识符（service identifier）是修饰（如 ES7 所建议的）并且应该具有与服务接口（service interface）相同的名称。

通过向构造函数参数添加相应的修饰（decoration）来声明服务依赖项（service dependency）。

下面代码片段中 `@IModelService` 是服务标识修饰符，而 `IModelService` 是这个参数的(可选)类型注释。

如果一个依赖项（dependency）是可选的，需使用 `@optional` 装饰符，否则实例化服务会抛出一个错误。

```ts
class Client {
  constructor(
    @IModelServive modelService: IModelService,
    @optional(IEditorService) editorService: IEditorService
  ) {
    //todo: use services
  }
}
```

使用实例化服务（instantiation service）为服务使用者创建实例，像这样：

```ts
instantiationService.createInstance(Client)
```

通常，这是作为一个贡献被注册时为你做的，比如 Viewlet 或 Language。

## Code Editor source organization 代码编辑器源码组织

```yaml
vs/editor               # 目录不应有任何 node 或 electron-browser 依赖项
vs/editor/common        # 编辑器核心代码
vs/editor/browser       # 编辑器核心代码
vs/editor/contrib       # 编辑器在 VS Code 和标准编辑器中的贡献
vs/ediotr/standalone    # 只附带独立编辑器的代码，没有东西是依赖于它的
vs/workbench/parts/codeEditor # 编辑器在 VS Code 中的贡献
```

## Workbench Parts 工作台部件

VS Code 工作台 `vs/workbench` 是由很多东西组成的，提供了丰富的开发经验。

例如包括全文搜索，集成 Git 和调试。在它的核心，工作台不直接依赖于所有这些部件。
相反，我们使用内部（与真正的扩展 API 相反）机制将这些部件贡献给工作台。

贡献给工作台的部件都位于 `vs/workbench/parts` 目录中。
在此目录中遵循下面一些规则：

- 在此目录中不能有任何外部依赖。
- 每一个部件都应该从一个文件中公开它的内部 API。
- 一个部件允许依赖另一个部件的内部 API。
- 一个部件永远不能触及另一个部件的内部（内部是指一个部件内的任何东西，不是在单一的普通 API 文件）。
- 在让一部件依赖于另一部件之前，请三思：这真的需要吗？是否可以通过使用工作台的可扩展性来避免依赖关系？

[extension API]: https://code.visualstudio.com/docs/extensions/overview
[Electron]: http://electron.atom.io/
[TypeScript]: https://github.com/microsoft/typescript
[nodejs]: https://nodejs.org/
[Electron renderer-process]: https://github.com/atom/electron/tree/master/docs#modules-for-the-renderer-process-web-page
[Electron main-process]: https://github.com/atom/electron/tree/master/docs#modules-for-the-main-process
