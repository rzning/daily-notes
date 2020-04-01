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
   * 以 UTC 毫秒为单位的时间戳，重新创建包可用性状态。
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
interface NotebookEmbed {}
```
