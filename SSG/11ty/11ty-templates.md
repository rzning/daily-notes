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
