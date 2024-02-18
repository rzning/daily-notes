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

## 布局 Layouts

Eleventy Layouts 是特殊的模板，可以用来包装其他内容。

为表示一段内容应该被包含在模板中，可以在 FrontMatter 中使用 `layout` 属性：

```njk
---
layout: mylayout.njk
title: 我的有关 Nunjucks 的博客文章
---
<h1>{{ title }}</h1>
```

这将在 _includes_ 文件夹中寻找寻找 `_includes/mylayout.njk` 文件。

- 你可以在布局文件中使用任何模板语言，它不需要与内容的模板语言相匹配，

  - 例如你可以在 `ejs` 模板中使用 `njk` 布局。

- 布局可以包含子目录

  - `layouts/base.njk` 将映射到 `_includes/layouts/base.njk` 。

- 若想让 Eleventy 布局和包含文件夹分开，你可以使用独立的文件夹。

  - 在配置文件中设置 `dir.layouts` 属性。

接下来创建 mylayout.njk 布局文件：

```html
---
title: 我的博客
---

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{{ title }}</title>
  </head>
  <body>
    {{ content | safe }}
  </body>
</html>
```

布局模板将用子模版的内容填充 `content` 数据。

### 数据级联合并优先级

当数据在 Eleventy 数据级联中合并时，数据源的优先级顺序由高到低为：

1. 计算数据
2. 模板中的 FrontMatter 数据
3. 模板数据文件
4. 目录数据文件
5. 布局中的 FrontMatter 数据（在 v1.0 中移除）
6. 配置 API 全局数据
7. 全局数据文件

### 布局别名

```js
// .eleventy.js

module.exports = function (eleventyConfig) {
  // 定义 post 布局指向 layouts/post.njk
  eleventyConfig.addLayoutAlias('post', 'layouts/post.njk')
}
```

### 防止布局中的双重转义

| 模板语言   | 未转义内容              | 转义输出                |
| ---------- | ----------------------- | ----------------------- |
| Nunjucks   | `{{ content \| safe }}` | `{{ value }}`           |
| EJS        | `<%- content %>`        | `<%= value %>`          |
| Handlebars | `{{{ content }}}`       | `{{ value }}`           |
| Mustache   | `{{{ content }}}`       | `{{ value }}`           |
| Liquid     | `{{ content }}`         | `{{ value \| escape }}` |
| HAML       | `! #{ content }`        | `= #{ content }`        |
| Pug        | `!{content}`            | `#{value}`              |

### 省略布局文件扩展名

省略布局文件扩展名（如 `layout: mylayout` ），
会导致 Eleventy 循环遍历所有支持的模板格式 ( `mylayout.*` ) 以查找匹配的布局文件。

这种方法有以下缺点：

1. 运行更慢。指定文件扩展名可绕过文件搜索。
2. 如果你有多个具有相同名称和不同扩展名的布局文件，将会出现歧义。

你可以使用下面选项在项目中禁用省略扩展名布局：

```js
// .eleventy.js

module.exports = function (eleventyConfig) {
  eleventyConfig.setLayoutResolution(false)
}
```

## 集合（使用标签）Collections ( Using Tags )

分页 ( pagination ) 允许你遍历数据集以创建多个模板，而集合 ( collection ) 允许你以有趣的方式对内容进行分组。

Eleventy 使用标签 `tags` 构建内容集合。

对于博客站点，可以使用 `tags: post` 标记文章，例如下面 `mypost.md` 文件：

```yaml
---
tags: post
title: 博文标题
---
```

这将会把 `mypost.md` 和所有其他使用 post 标签的内容一起放到 post 集合中。

可以使用 `collections` 对象来引用此集合，并创建所有帖子的列表：

```njk
<ul>
{%- for post in collections.post -%}
  <li>{{ post.data.title }}</li>
{%- endfor -%}
</ul>
```

使用 `eleventyImport` 对象声明你使用的任何集合，以将其关系通知给智能增量生成 ( Smarter Incremental Builds ) 。

```yaml
---
eleventyImport:
  collections: ['post']
---
```

可在当前页面使用 `aria-current` 标记：

```njk
<ul>
{%- for post in collections.post -%}
  <li{% if page.url == post.url %} aria-current="page"{% endif %}>{{ post.data.title }}</li>
{%- endfor -%}
</ul>
```

这将会在 CSS 样式中提供一个钩子，使用它的属性选择器：

```css
[aria-current='page'] {
  /* ... */
}
```

默认情况 Eleventy 将所有内容放入了 `collections.all` 集合中：

```njk
<ul>
{%- for post in collections.all -%}
  <li><a href="{{ post.url }}">{{ post.url }}</a></li>
{%- endfor -%}
</ul>
```

可以使用 `eleventyExcludeFromCollections` 标记，从集合中排除当前内容：

```
---
eleventyExcludeFromCollections: true
tags: post
---
这将在 `collections.all` 和 `collections.post` 集合中不可用。
```

设置单个或多个标签：

```yaml
---
# 单个标签
tags: cat

# 多个单词的单个标签
tags: cat and dog

# 单行的多个标签
tags: ['cat', 'dog']

# 多行的多个标签
tags:
  - cat
  - dog

# 使用 override: 前缀取消级联时的深度数据合并
override:tags: []
---
```

集合项数据结构：

- `page` - 当前页面变量中的所有内容
- `data` - 包括从布局继承来的所有数据
- `rawInput` - 该模板的原始输入
- `content` - 此模板渲染后的内容，不包括布局包装

```js
{
  page: {
    inputPath: './test1.md',
    url: '/test1/',
    date: new Date()
    // ...
  },
  data: {
    title: 'Test Title',
    tags: ['tag1', 'tag2'],
    date: 'Last Modified'
    // ...
  },
  content: '<h1>Test Title</h1>\n\n<p>This is text content…',
  // Pre-release only: v3.0.0-alpha.1
  rawInput: '<h1>{{ title }}</h1>\n\n<p>This is text content…'
}
```

使用 Configuration API 自定义集合：

- `eleventyConfig.addCollection()` - 新建集合

- `collectionApi`

  - `getAll()` - 获取所有未排序项
  - `getAllSorted()` - 获取使用默认排序算法排序后的所有项
  - `getFilteredByTag('tagName')` - 获取与指定标签匹配的内容
  - `getFilteredByTags('tagName', ...)` - 获取与多个标签匹配的内容
  - `getFilteredByGlob( glob )` - 获取文件名与指定 glob 匹配的所有文件

```js
// .eleventy.js

module.exports = function (eleventyConfig) {
  // 获取所有内容
  eleventyConfig.addCollection('allMyContent', function (collectionApi) {
    return collectionApi.getAll()
  })

  // 自定义筛选：找到数据中存在 myCustomDataKey 属性的项
  eleventyConfig.addCollection('keyMustExistInData', function (collectionApi) {
    return collectionApi.getAll().filter(function (item) {
      return 'myCustomDataKey' in item.data
    })
  })

  // 自定义排序
  eleventyConfig.addCollection('myCustomSort', function (collectionApi) {
    return collectionApi.getAll().sort(function (a, b) {
      //return a.date - b.date; // 按日期升序
      return b.date - a.date // 按日期降序
      //return a.inputPath.localeCompare(b.inputPath); // 按路径升序
      //return b.inputPath.localeCompare(a.inputPath); // 按路径降序
    })
  })

  // 使用默认排序的倒序排列
  eleventyConfig.addCollection('myPostsReverse', function (collectionApi) {
    return collectionApi.getAllSorted().reverse()
  })

  // 获取与 post 标签匹配的内容
  eleventyConfig.addCollection('myPosts', function (collectionApi) {
    return collectionApi.getFilteredByTag('post')
  })

  // 获取 _posts/ 目录下所有 Markdown 文件
  eleventyConfig.addCollection('posts', function (collectionApi) {
    return collectionApi.getFilteredByGlob('_posts/*.md')
  })

  // 获取 posts/ 和 notes/ 目录下所有 Markdown 文件
  eleventyConfig.addCollection('posts', function (collectionApi) {
    return collectionApi.getFilteredByGlob(['posts/*.md', 'notes/*.md'])
  })
}
```

## 从数据创建页面 Create Pages From Data

分页 Pagination 特性用于遍历任何数据，以创建多个输出文件。

- 分页可以用于传统样式的分页输出：

  - 例如 `/result/page-0/`, `/result/page-1/`

- 分页也可以遍历对象并输出任何永久链接 `permalink` 值。

下面是一个基于 JSON 文件数据动态构建页面的示例：

定义存储在 `_data/staffs.json` 文件中的数据：

```json
[
  {
    "name": "张三",
    "age": 26
  },
  {
    "name": "李四",
    "age": 33
  },
  {
    "name": "王五",
    "age": 28
  }
]
```

使用下面 `staff-pages.njk` 模板，为每位员工生成页面：

```njk
---
pagination:
    data: staffs
    size: 1
    alias: staff
permalink: "staffs/{{ staff.name | slugify }}/"
---

{{ staff.name }} 的年龄是 {{ staff.age }} 岁。
```

此模板将生成三个文件，每个文件对于一个员工。当员工数据被添加或编辑时，模板页面将自动更新。

> `page` 是保留字，因此不能使用 `alias: page`

## 分页 Pagination

分页允许你遍历数据集，并从单个模板创建多个文件。

输入数据可以是在 FrontMatter 定义的数组或对象，或者使用全局数据。

你也可以对一个集合进行分页，例如为你的贴子生成一个易于理解的列表。

在模板 FrontMatter 中使用 `pagination` 关键字定义分页。

定义分页及其选项：

```yaml
---
pagination:
  # 指向目标数据集
  data: <数据来源>
  # 每页包含数据项数量
  size: 2
  # 定义数据项别名
  alias: item
  # 若目标数据集为空，则以空数组渲染第一页
  generatePageOnEmptyData: true
  # 遍历对象，取属性值
  # 使用 Object.values() 而不是 Object.keys()
  resolve: values
  # 使用筛选从分页数据中删除指定值
  filter: []
  # 倒序
  reverse: true
  # 将所有分页添加到集合，否则只会将第一页添加到集合
  addAllPagesToCollections: true
---
```

### 对 Array 分页

下面模板 `paged.njk` 将创建两个页面，每个页面将显示来自 `testdata` 的两个项。

- `_site/paged/index.html`
- `_site/paged/1/index.html`

输出路径可以使用永久链接 `permalink` 属性进行配置。

```njk
---
pagination:
  data: testdata
  size: 2
testdata:
 - item1
 - item2
 - item3
 - item4
---
<ol>
{%- for item in pagination.items %}
  <li>{{ item }}</li>
{% endfor -%}
</ol>
```

模板中 `pagination` 具有下列属性：

```js
var pagination = {
  // 当前页面数据块的数组
  items: [],
  // 当前页码
  pageNumber: 0

  // 所有页面 URL 构成的数组
  hrefs: [],
  href: {
    next: '<a href="...">下一页</a>',
    previous: '<a href="...">上一页</a>',
    first: '...',
    last: '...',
  },

  // 所有分页数据块的数组
  pages: [],
  page: {
    // 下一页的数据块
    next: {},
    // 上一页的数据块
    previous: {},
    first: {},
    last: {},
  }
}
```

### 对 Object 分页

```njk
---
pagination:
  data: testdata
  size: 2
testdata:
  itemkey1: itemvalue1
  itemkey2: itemvalue2
  itemkey3: itemvalue3
  itemkey4: itemvalue4
permalink: "test/page-{{ pagination.pageNumber + 1 }}/index.html"
---
<ol>
{%- for item in pagination.items %}
  <li>{{ item }} = {{ testdata[item] }}</li>
{% endfor -%}
</ol>
```

上例将生成两个文件：

- `test/page-1/index.html`

  - itemkey1 = itemvalue1
  - itemkey2 = itemvalue2

- `test/page-2/index.html`

  - itemkey3 = itemvalue3
  - itemkey4 = itemvalue4

```njk
---
pagination:
  data: testdata
  size: 1
  resolve: values
  alias: item
  filter:
    - itemkey3
testdata:
  itemkey1: Item Value 1
  itemkey2: Item Value 2
  itemkey3: Item Value 3
  itemkey4: Item Value 4
permalink: "test/page-{{ item | slugify }}/index.html"
---
当前值为 {{ item }}
```

> slugify 过滤器用于将字符串转换为适合 URL 中使用的格式。
>
> - 移除所有特殊字符，将所有字母转为小写，空格使用 `-` 替换。
> - 例如 `"Hello, World!"` 使用 Slugify 转换为 `"hello-world"` 。

上例将生成三个文件：

- `test/page-item-value-1/index.html`

  - 当前值为 Item Value 1

- `test/page-item-value-2/index.html`

  - 当前值为 Item Value 2

- `test/page-item-value-4/index.html`

  - 当前值为 Item Value 4

### 对 Collection 分页

```njk
---
title: 我的贴子
pagination:
  data: collections.post
  size: 6
  alias: posts
---

<ol>
{% for post in posts %}
  <li><a href="{{ post.url }}">{{ post.data.title }}</a></li>
{% endfor %}
</ol>
```

上例可生成一个博客链接列表。

### 使用 Before 回调函数

使用 `before()` 回调，可在分页发生之前对数据进行修改、筛选或其他任何操作，以得到合适的分页数据。

```jsx
---js
{
  pagination: {
    data: "testdata",
    size: 2,
    before: function(paginationData, fullData) {
      // 为每项数据添加一个后缀
      return paginationData.map(entry => `${entry} ...`);
    }
  },
  testdata: [
    "item1",
    "item2",
    "item3",
    "item4"
  ]
}
---
<!-- 模板的其余部分 -->
```

数据修改执行顺序：

1. `before` 回调
2. `reverse` 反转
3. `filter` 过滤
