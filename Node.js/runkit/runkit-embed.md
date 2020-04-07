# RunKit Embed

Embed node.js on any website

- <https://runkit.com/docs/embed>

在任何网站上嵌入 RunKit 都很容易。

RunKit notebook 的嵌入式版本只有一个可执行的代码单元。

它将垂直地增长和收缩以适应其内容，并水平地填充其容器。

在给定的页面上可以有任意多个实例。

- 常见用例
  1. 将 RunKit 附加到现有元素
  2. 以编程方式创建嵌入
- Embed API
- 例子
- 绑定 ( React, Angular, Ember )
- OEmbed
- 作品展示

## 常见用例

有两种方法可以在你的页面上获得 RunKit 如下所述。

在这两种情况下，你都要通过 `<script>` 标签引入 RunKit Embed 脚本:

```html
<script src="https://embed.runkit.com"></script>
```

### 1️⃣ 将 RunKit 附加到现有元素

这是嵌入 RunKit 的最简单的方法。

只需包含一个 script 标签，然后通过 `data-element-id` 属性让它知道哪个元素包含你想要附加的源代码。

```html
<script src="https://embed.runkit.com" data-element-id="my-code"></script>

<div id="my-code">console.log('Hello.')</div>
```

### 2️⃣ 以编程方式创建

你也可以通过编程方式创建 Embedded Notebook
只需包含相同的 script 标签，然后调用 `RunKit.createNotebook()` 方法。

```html
<script src="https://embed.runkit.com"></script>
<div id="my-code"></div>
<script>
var notebook = RunKit.createNotebook({
  element: document.getElementById("my-code"),
  source: `console.log('Hello.')`
  })
</script>
```

## Embed API

RunKit `<script>` 标签将一个 `RunKit` 对象添加到了全局命名空间。

```ts
interface GlobalRunKit {
  createNotebook: (options: EmbedOptions) => NotebookEmbed
}
```

`RunKit.createNotebook()` 方法使用提供的选项创建一个 `NotebookEmbed` 对象并返回。

其选项 `EmbedOptions` 类型声明如下：

```ts
/**
 * 字符串形式的语义化版本范围
 * @example "10.1.x" or "12.x.x"
 * @see https://docs.npmjs.com/about-semantic-versioning
 */
type semverRange = string

/**
 * 表示 CSS 像素长度值的字符串，包含数字并以 `px` 结尾
 * @example "10px"
 * @see https://developer.mozilla.org/en-US/docs/Glossary/CSS_pixel
 */
type cssPxString = string

interface EmbedOptions {
  /**
   * 新 Notebook 的父元素
   */
  element: HTMLElement
  /**
   * 执行环境的环境变量。
   * 可用通过 `process.env` 访问，默认为 `[]`
   */
  environment?: Array<{name: string, value: string}>
  /**
   * 加载完成后执行 Embed
   */
  evaluateOnLoad?: boolean
  /**
   * 行号显式的位置，默认为 `outside`
   */
  gutterStyle?: 'inside' | 'none' | 'outside'
  /**
   * 隐藏 `▶ Run` 按钮。
   * 在 Endpoint 模式中，隐藏端点的 URL
   */
  hidesActionButton?: boolean
  /**
   * 在 Endpoint 模式下，隐藏点击端点时出现的日志。
   * @see https://runkit.com/docs/endpoint
   */
  hidesEndpointLogs?: boolean
  /**
   * Embed 的最小高度 ( px ) 默认为 `73px`
   */
  minHeight?: cssPxString
  /**
   * RunKit Embed 的模式，默认为 `default`
   * - `default` 模式：类似普通 Notebook ，在每次执行 ( evaluate ) 后显示输出
   * - `endpoint` 模式：输出将被端点日志替换，并提供一个 URL 来运行嵌入代码
   */
  mode?: 'endpoint' | 'default'
  /**
   * Node 引擎应该满足的语义化版本，默认为 `10.x.x`
   * @example "4.0.x" or ">6.9.2"
   */
  nodeVersion?: semverRange
  /**
   * Embed 中显示的源代码
   */
  source?: string
  /**
   * 以 UTC 毫秒为单位的时间戳，表示重新创建包可用性状态。
   * 此时间后没有发布到 NPM 的包在此 Embed 中可用。
   * 对于重现错误或保证依赖版本很有用。
   * 默认将时间戳设置为创建 Embed 时的时间。
   */
  packageTimestamp?: number | null
  /**
   * 前置代码，在 Embed 中不显示，但会在运行代码之前执行
   */
  preamble?: string
  /**
   * 只读模式
   */
  readOnly?: boolean
  /**
   * Tab 缩进大小，默认为 4
   */
  tabSize?: number
  /**
   * 保存到 RunKit 时的标题
   */
  title?: string
}
```

`RunKit.createNotebook()` 方法返回的 `NotebookEmbed` 对象满足下面接口：

> 注意 `getter` 和 `setter` 都是异步的并返回 `Promise` 。
> 因为它们通过 iframe 传值。

```ts
interface NotebookEmbed {
  /// 方法 Methods
	destroy: () => void
	evaluate: () => void

  /// 事件 Events
  /**
   * 在计算一个单元格 ( Cell ) 后调用
   */
	onEvaluate: () => void
  /**
   * 完全加载后调用
   */
	onLoad: (arg: NotebookEmbed) => void
	
  // Called when the embed cell is resized.
  /**
   * 在调整一个嵌入式单元格 ( Embed Cell ) 大小后调用
   */
  onResize: (arg: {height: number}) => void
  /**
   * 当嵌入式实例被保存时调用
   */
	onSave: () => void
	/**
   * 当可共享 URL 或端点 URL 更改时调用
   */
	onURLChanged: (arg: {shareableURL: string, endpointURL: string}) => void

	/// 属性 Properties
  /**
   * endpointURL
   * 端点模式运行时可访问 URL
   * @see https://runkit.com/docs/endpoint
   */
	getEndpointURL: () => Promise<string>	
  /**
   * environment
   * 执行环境中的环境变量，可通过 `process.env` 访问，默认为 []
   */
	getEnvironment: () => Promise<Array<{name: string, value: string}>>
	setEnvironment: (environment: Array<{name: string, value: string}>) => Promise<undefined>
  /**
   * evaluateOnLoad
   * 是否在加载完成后立即执行
   */
	getEvaluateOnLoad: () => Promise<boolean>
  /**
   * gutterStyle
   * 行号的显示位置，默认为 `outside`
   */
	getGutterStyle: () => Promise<"inside" | "none" | "outside">
	setGutterStyle: (gutterStyle: "inside" | "none" | "outside") => Promise<undefined>
	
	// 
  // Hides the "▶ Run" button. In Endpoint mode, Hides the endpoint URL.
  /**
   * hidesActionButton
   * 是否隐藏 `▶ Run` 按钮。在 Endpoint 模式中，隐藏端点的访问 URL
   */
	getHidesActionButton: () => Promise<boolean>
	setHidesActionButton: (hidesActionButton: boolean) => Promise<undefined>
  /**
   * hidesEndpointLogs
   * 是否隐藏端点模式的日志
   */
	getHidesEndpointLogs: () => Promise<boolean>
	setHidesEndpointLogs: (hidesEndpointLogs: boolean) => Promise<undefined>
  /**
   * minHeight
   * 显示的最小高度，默认为 `73px`
   */
	getMinHeight: () => Promise<cssPxString>
	setMinHeight: (minHeight: cssPxString) => Promise<undefined>
  /**
   * mode
   * 当前为端点模式 ( Endpoint ) 还是默认模式 ( Default )
   */
	getMode: () => Promise<"endpoint" | "default">
	setMode: (mode: "endpoint" | "default") => Promise<undefined>
  /**
   * nodeVersion
   * Node 引擎应该满足的语义化版本，默认为 `10.x.x`
   */
	getNodeVersion: () => Promise<semverRange>
	setNodeVersion: (nodeVersion: semverRange) => Promise<undefined>
  /**
   * source
   * 当前嵌入的源代码
   */
	getSource: () => Promise<string> // The source code of the Embed.
	setSource: (source: string) => Promise<undefined>
	/**
   * packageTimestamp
   * 包的可用性状态时间戳
   */
	getPackageTimestamp: () => Promise<number | null>
	setPackageTimestamp: (packageTimestamp: number | null) => Promise<undefined>
  /**
   * preamble
   * 前置代码
   */
	getPreamble: () => Promise<string>
	setPreamble: (preamble: string) => Promise<undefined>
  /**
   * readOnly
   * 是否为只读模式
   */
	getReadOnly: () => Promise<boolean> 
	setReadOnly: (readOnly: boolean) => Promise<undefined>
  /**
   * shareableURL
   * 可用于共享给其他用户访问的 URL
   */
	getShareableURL: () => Promise<string>
  /**
   * requirePath
   * 可以在另一个 Embeds 或 Runkit Notebook 中作为一个模块引用的路径
   */
	getRequirePath: () => Promise<string>
  /**
   * tabSize
   * 缩进大小，默认为 4 个字符
   */
	getTabSize: () => Promise<number>
	setTabSize: (tabSize: number) => Promise<undefined>
  /**
   * title
   * 保存时使用的标题
   */
	getTitle: () => Promise<string>
	setTitle: (title: string) => Promise<undefined>
}
```


> 你可以下载我们提供的 [RunKit.d](https://runkit.com/assets/typedefs/RunKit.d.ts)
> 文件，将这些类型集成到你的编辑器中，以达到智能感知。


## 示例 Examples

### 1️⃣ 改变行号 ( Gutter ) 的显示风格

```html
<script src="https://embed.runkit.com"></script>
<style>.embed { overflow: visible; }</style>
<pre class="embed" data-gutter="inside">console.log("hello inside");</pre>
<pre class="embed" data-gutter="outside">console.log("hello outside");</pre>
<pre class="embed" data-gutter="none">console.log("hello none");</pre>
<script>
const elements = [...document.getElementsByClassName('embed')]
const notebooks = elements.reduce((notebooks, element) => {
  const innerText = element.firstChild
  const currentCell = window.RunKit.createNotebook({
    element,
    gutterStyle: element.getAttribute("data-gutter"),
    source: innerText.textContent,
    // 实例加载后删除 <pre> 标签的文本内容
    onLoad: () => innerText.remove()
  })
  return notebooks
}, [])
</script>
```
