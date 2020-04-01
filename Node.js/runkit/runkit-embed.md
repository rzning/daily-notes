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

`RunKit.createNotebook()` 方法使用提供的选项创建一个 Embedded Notebook 并返回一个 `NotebookEmbed` 对象。
