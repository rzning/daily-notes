# Eleventy Templates

- <https://www.11ty.dev/docs/templates/>

## 添加资源 Assets

### 1️⃣ 复制文件

<details>
<summary>复制 CSS 文件</summary>

复制 HTML 中引用的单个 CSS 文件：

1. 在项目根目录创建一个 `bundle.css` 文件，并向该文件添加一些 CSS 代码。
2. 使用 **直通文件复制 ( Passthrough File Copy )** 将文件复制到生成输出文件夹：

   ```js
   // .eleventy.js
   module.exports = function (eleventyConfig) {
     eleventyConfig.addPassthroughCopy('bundle.css')
   }
   ```

3. 在 HTML 文件中引用 CSS 文件：

   ```html
   <link rel="stylesheet" href="/bundle.css" />
   ```

</details>

<details>
<summary>复制 Fonts 文件</summary>

复制 CSS 中引用的单个 Web Font 文件：

1. 使用 Passthrough File Copy 将文件复制到 Build Output 文件夹。

   ```js
   // .eleventy.js
   module.exports = function (eleventyConfig) {
     eleventyConfig.addPassthroughCopy('font.woff2')
   }
   ```

2. 在 CSS 文件中引用 Web Font 文件：

   ```css
   @font-face {
     font-family: My Font Name;
     src: url('/font.woff2') format('woff2');
     font-display: swap;
   }
   ```

</details>

<details>
<summary>复制 JavaScript 文件</summary>

复制 HTML 中引用的单个 JavaScript 文件：

1. 在项目根目录创建一个 `bundle.js` 文件，并向该文件添加一些 JavaScript 代码。
2. 使用 Passthrough File Copy 将文件复制到 Build Output 文件夹：

   ```js
   // .eleventy.js
   module.exports = function (eleventyConfig) {
     eleventyConfig.addPassthroughCopy('bundle.js')
   }
   ```

3. 在 HTML 文件中引用 Javascript 文件：

   ```html
   <script src="/bundle.js"></script>
   ```

</details>

<details>
<summary>复制多个文件</summary>

你可以使用 Nunjucks 和 Liquid 的 `include` 标记来引入多个源文件。

```njk
{# page.njk #}

<style>
{% include "header.css" %}
{% include "footer.css" %}
{% include "./node_modules/my-ficticious-package-name/package.css" %}
</style>

<script>
{% include "header.js" %}
{% include "footer.js" %}
{% include "./node_modules/my-ficticious-package-name/package.js" %}
</script>
```

</details>

### 2️⃣ 使用 Eleventy 模板

你可以使用 Eleventy Template 生成你的 Bundle 文件：

```njk
---
permalink: bundle.css
---
{# css-bundle.njk #}

{% include "header.css" %}
{% include "footer.css" %}
{% include "./node_modules/my-ficticious-package-name/package.css" %}
```

并使用下列代码从模板中引用该文件：

```html
<link rel="stylesheet" href="/bundle.css" />
```

### 3️⃣ 使用 Eleventy 自定义模板

你可以在 Eleventy 中添加 `js` 和 `css` 甚至是 `scss` 作为自定义模板。

这也允许你使用 Sass, PostCSS 或者 LightningCSS 对 CSS 进行后期处理。

或者使用 ESBuild, Rollup, Webpack 等对客户端 JavaScript 进行处理，并将处理后的内容写入输出文件夹。

这也允许你在捆绑代码 ( Bundle Code ) 中使用浏览器不支持的特性，比如 嵌套 CSS TypeScript 或者 JSX 等。

---

示例：在 Eleventy 中对 CSS 和 JavaScript 进行后期处理

- [CSS and JavaScript as first-class citizens in Eleventy — Vadim Makeev](https://pepelsbey.dev/articles/eleventy-css-js/)

在项目中，将 `index.css` 和 `index.js` 文件链接到 HTML 页面，在这两个文件中又导入了其他模块。

```css
/* src/styles/index.css */
@import 'blocks/page.css';
@import 'blocks/header.css';
@import 'blocks/content.css';
```

```js
/* index.js */
import './modules/menu.js'
import './modules/video.js'
import './modules/podcast.js'
```

使用 PostCSS 处理 CSS ：

- 将 `src/styles/index.css` 和它引用的所有文件合并起来，输出到 `dist/styles/index.css` 文件。

```js
// 使用插件来处理文件
const postcss = require('postcss')
// 将所有导入的文件缝合在一起
const postcssImport = require('postcss-import')
// 填充 ( Polyfill ) 现代的媒体查询 ( Media Query ) 语法
const postcssMediaMinmax = require('postcss-media-minmax')
// 自动修复基于 browserslist 配置的前缀属性
const autoprefixer = require('autoprefixer')
// 将结果最小化
const postcssCsso = require('postcss-csso')

// 默认情况下 CSS 文件不会被 Eleventy 处理。
// 为了处理它们，需要使用 addTemplateFormats() 方法将 CSS 添加到模板格式列表中：
config.addTemplateFormats('css')

// 配置 Eleventy 处理 CSS 的过程：
config.addExtension('css', {
  outputFileExtension: 'css',
  compile: async (content, path) => {
    // 过滤掉除 index.css 以外的所有其他 CSS 文件。
    // 这里只需要处理 index.css ，其余的 CSS 文件将被导入到这个文件中。
    if (path !== './src/styles/index.css') {
      return
    }

    // 返回一个异步函数
    return async () => {
      // 对 index.css 进行处理，并将处理结果返回
      // 这里需要将 path 传递给 PostCSS ，以让它能计算出其余文件的相对位置
      let output = await postcss([
        postcssImport,
        postcssMediaMinmax,
        autoprefixer,
        postcssCsso
      ]).process(content, {
        from: path
      })

      return output.css
    }
  }
})
```

使用 ESBuild 处理 JavaScript ：

- 处理 `src/scripts/index.js` 和其引用的所有模块的内容作为一个文件返回，并输出到 `dist` 目录。

```js
const esbuild = require('esbuild')

config.addTemplateFormats('js')

config.addExtension('js', {
  outputFileExtension: 'js',
  compile: async (content, path) => {
    if (path !== './src/scripts/index.js') {
      return
    }

    return async () => {
      let output = await esbuild.build({
        target: 'es2020',
        entryPoints: [path],
        minify: true,
        bundle: true,
        write: false
      })

      return output.outputFiles[0].text
    }
  }
})
```
