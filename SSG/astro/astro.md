# astro

- <https://astro.build/>
- <https://github.com/withastro/astro>

内容驱动型网站的 Web 框架。

## 起步

```sh
# 创建新项目
npm create astro@latest
yarn create astro

# 启动本地开发服务器 http://localhost:4321/
npm run astro dev

```

## 项目结构

```sh
📁public/                 # 静态文件
    robots.txt
    favicon.svg
    social-image.png
📁src/
    📁components/         # 组件
        Header.astro
        Button.jsx

    📁content/            # 内容集合
        📁authors/
            author-1.json
            author-2.json
        📁blog/
            post-1.md
            post-2.md
        📁newsletter/
            week-1.md
            week-2.md
        config.ts
    📁layouts/            # 布局组件
        PostLayout.astro
    📁pages/              # 页面（必须）
        📁posts/
            post1.md
            post2.md
            post3.md
        index.astro
    📁styles/             # 样式文件
        global.css
astro.config.mjs
package.json
tsconfig.json
```

Astro 处理、压缩和打包你的 `src/` 文件以创建最终传递到浏览器的网站。

## Astro 组件

Astro 组件是纯 HTML、无需客户端运行时的模板组件，其文件扩展名为 `.astro` 。

Astro 组件最主要的一点是不会在客户端渲染，组件在构建时使用服务器端渲染（SSR）按需呈现 HTML。

你可以在组件的 Frontmatter 中编写 JavaScript 代码，所有这些代码也都在服务器端执行，
并在发送到客户端的页面中删除。

当你需要在 Astro 组件中实现交互时，可以添加标准 HTML 的 `<script>` 标签或 UI 框架组件。

Astro 组件有两个主要部分组成：组件 Script 和组件 Template ：

```astro
---
// 组件脚本（JavaScript）
---
<!-- 组件模板（HTML + JS 表达式）-->
```

## Astro 组件 - 模板语法

Astro 组件语法是 HTML 的超集，并增加了对组件和 JavaScript 表达式的支持。

```astro
---

const name = 'Astro'

function handleClick () {
  console.log('button clicked!')
}

const items = ['Cat', 'Dog', 'Tiger']
const visible = ture

import MyComponent from "./MyComponent.astro"
const Element = 'div'
const Component = MyComponent

const htmlString = '<p>Raw HTML content</p>'
---
<div>
  <!-- 使用 {} 添加局部变量 -->
  <h1> Hello {name}!<h1>
  <h1 class={name}>支持属性表达式</h1>
</div>

<div>
  <!-- ❌ HTML 属性将转换为字符串，因此不能将函数和对象传递给 HTML 元素。 -->
  <button onClick={handleClick}>点击无任何反应</button>
</div>

<ul>
  <!-- 动态生成列表 -->
  {items.map((item) => {
    <li>{item}</li>
  })}
</ul>

<div>
  <!-- 条件生成 HTML -->
  {visible && <p>Show me!</p>}
  {visible ? <p>Show me!</p> : <p>Else show me!</p>}
</div>

<div>
  <!-- 动态标签：变量名首字母必须大写，不支持 Hydration 指令 -->
  <Element>Hello!</Element> <!-- 渲染成 <div>Hello!</div> -->
  <Component /> <!-- 渲染成 <MyComponent /> -->
</div>

<div>
  <!-- 支持 <Fragment> 片段或简写成 <></> 包装多个元素 -->
  <Fragment set:html={htmlString} />
</div>
```

## Astro 组件 - 模板指令

模板指令是特殊的 HTML 属性，它可以在任一 Astro 组件模板（`.astro` 文件）中使用，也可以在 `.mdx` 文件中使用。

模板指令永远不会直接包含在组件的最终 HTML 输出中。

### 1️⃣ 通用指令

- `class:list`

  - `class:list={...}`
  - 接收 class 数组，并将其转换为 class 字符串

    ```astro
    <span class:list={[ 'hello goodbye', { world: true }, [ 'friend' ] ]} />
    <!-- 输出 -->
    <span class="hello goodbye world friend"></span>
    ```

- `set:html`

  - `set:html={string}`
  - 将 HTML 字符串注入元素中，类似于设置 `el.innerHTML`

    ```astro
    ---
    const cmsContent = await fetchHTMLFromMyCMS()
    import api from '../db/api.js'
    ---
    <!-- 从 CMS 获取 HTML -->
    <Fragment set:html={cmsContent}>

    <!-- 获取数据库中的数据 -->
    <article set:html={api.getArticle(Astro.props.id)}></article>

    <!-- 获取旧站点文章 -->
    <article set:html={fetch('http://example/old-post.html')}></article>
    ```

  - `set:html` 可以用在任何标签上，不必包含 HTML。
  - 例如，在 `<script>` 标签上使用 `JSON.stringify()` 将 [JSON-LD] Schema 添加到你的页面。

    ```astro
    <script type="application/ld+json" set:html={JSON.stringify({
      "@context": "https://schema.org/",
      "@type": "Person",
      name: "Houston",
      hasOccupation: {
        "@type": "Occupation",
        name: "Astronaut"
      }
    })}/>
    ```

- `set:text`

  - `set:text={string}`
  - 将文本字符串注入元素中，类似于设置 `el.innerText` 。
  - 与 `set:html` 不同的是，传递的 string 值会被 Astro 自动转义。
  - 相当于直接将变量传入模板表达式，如 `<<div>{someText}</div>>` ，因此此命令不常用。

[JSON-LD]: https://json-ld.org/

### 2️⃣ 客户端指令

这些指令描述了如何激活 UI 框架组件。

默认情况下，UI 框架组件不会在客户端激活。

### 3️⃣ 自定义客户端指令

### 4️⃣ 脚本和样式指令

### 5️⃣ 高级指令
