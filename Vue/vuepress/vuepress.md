# VuePress

- <https://github.com/vuejs/vuepress>
- <https://vuepress.vuejs.org/zh/>

## 🚀 快速上手

安装 vuepress 依赖：

```sh
yarn add vuepress --dev
```

以 `docs/` 为目标目录 ( `targetDir` ) 启动开发服务：

```sh
npx vuepress dev docs
```

## 📂 目录结构

VuePress 遵循约定大于配置原则，推荐目录结构如下：

- `docs/`
  - `.vuepress/` - 用于存放全局配置、组件、静态资源等
    - `components/` - 此目录中的 Vue 组件将被自动注册为全局组件
    - `theme/` - 用于存放本地主题
      - `Layout.vue`
    - `public/`
    - `styles/` - 用于存放样式文件
      - `index.styl` - 全局样式文件
      - `palette.styl` - 用于重写或定义颜色常量
    - `templates/` - 存放 HTML 模板文件
      - `dev.html` - 开发环境模板
      - `ssr.html` - 服务器端渲染模板
    - `config.js` - 主配置文件，也可以是 `yaml` 或 `toml` 格式
    - `enhanceApp.js` - 应用增强文件
  - `README.md` - 主页内容
  - `about.md` - 其他内容
- `package.json`

## 🛠 配置

> <https://vuepress.vuejs.org/zh/config/>

- 基本配置
  - `targetDir/.vuepress/config.js`
    - `base` - 部署站点的基础路径 = `'/'`
    - `title` - 网站的标题
    - `description` - 网站的描述
    - `head` - 页面 `<head>` 中的子标签 = `[]`
      - 子标签配置格式 `[tagName, { attrName: attrValue }, innerHTML?]`
    - `host` - 指定 dev server 的主机名 = `'0.0.0.0'`
    - `port` - 指定 dev server 的端口号 = `8080`
    - `temp` - 指定临时文件目录 = `'.temp'`
    - `dest` - 指定 `vuepress build` 的输出目录 = `'.vuepress/dist'`
    - `locales` - 多语言支持的语言配置 `{ [path: string]: Object }`
    - `shouldPrefetch` - 指定那些文件需要生成预先加载资源提示 = `() => true`
    - `cache` - 指定 [cache-loader] 的缓存路径 = `true`
    - `extraWatchFiles` - 额外需被监听的文件 = `[]`
    - `patterns` - 指定需被解析的文件模式 = `['**/*.md', '**/*.vue']`

- 样式配置
  - `targetDir/.vuepress/palette.styl` - 全局变量
  - `targetDir/.vuepress/index.styl` - 全局样式

- 主题配置
  - `targetDir/.vuepress/config.js`
    - `theme` - 使用的主题名称
    - `themeConfig` - 当前主题配置 = `{}`

- 插件配置
  - `targetDir/.vuepress/config.js`
    - ``

- Markdown 配置
  - `targetDir/.vuepress/config.js`
    - `markdown`
      - `lineNumbers` - 开启行号
      - `slugify` - 一个将标题文本转换为 slug 的函数
      - `anchor` - [markdown-it-anchor] 选项
      - `externalLinks` - 配置外部链接标签 `<a>` 属性
        - `{ target: '_blank', rel: 'noopener noreferrer' }`
      - `toc` - 目录插件 [markdown-it-table-of-contents] 选项
      - `plugins` - 安装其他 [markdown-it] 插件
      - `extendMarkdown` - 用于修改当前 [markdown-it] 实例的默认配置 = `md => {}`
      - `extractHeaders` - 提取到 `$page.headers` 的标题级别 = `['h2', 'h3']`

- 构建流程配置
  - `targetDir/.vuepress/config.js`
    - `postcss` - [postcss-loader] 选项 = `{ plugins: [require('autoprefixer')] }`
    - `stylus` - [stylus-loader] 选项 = `{ preferPathResolver: 'webpack' }`
    - `scss` - [sass-loader] 加载 `*.scss` 文件的选项 = `{}`
    - `sass` - [sass-loader] 加载 `*.sass` 文件的选项 = `{ indentedSyntax: true }`
    - `less` - [less-loader] 选项 = `{}`
    - `configureWebpack` - 使用 [webpack-merge] 修改 [Webpack] 配置 = `{}`
    - `chainWebpack` - 使用 [webpack-chain] 修改 [Webpack] 配置 = `(config, isServer) => {}`
    - `evergreen` - 忽略向下兼容 = `false`

[cache-loader]: <https://github.com/webpack-contrib/cache-loader>
[markdown-it]: <https://github.com/markdown-it/markdown-it>
[markdown-it-anchor]: <https://github.com/valeriangalliat/markdown-it-anchor>
[markdown-it-table-of-contents]: <https://github.com/Oktavilla/markdown-it-table-of-contents>
[postcss-loader]: <https://github.com/postcss/postcss-loader>
[stylus-loader]: <https://github.com/shama/stylus-loader>
[sass-loader]: <https://github.com/webpack-contrib/sass-loader>
[less-loader]: <https://github.com/webpack-contrib/less-loader>
[Webpack]: <https://webpack.docschina.org/configuration/>
[webpack-merge]: <https://github.com/survivejs/webpack-merge>
[webpack-chain]: <https://github.com/neutrinojs/webpack-chain>

## 🪐 全局计算属性

- `$site` - 网站配置信息 `siteConfig`
- `$page` - 当前页面信息
- `$frontmatter` - 即 `$page.frontmatter`
- `$lang` - 当前页面语言 = `'en-US'`
- `$localePath` - 当前页面 locale 路径前缀 = `'/'` , `'/zh/'`
- `$title` - 当前页面标题
- `$description` - 当前页面描述
- `themeConfig` - 即 `siteConfig.themeConfig`

## 🌾 Front Matter

Vuepress 中任何包含 YAML front matter 的 Markdown 文件都将由 [gray-matter] 处理。

[gray-matter]: <https://github.com/jonschlinkert/gray-matter>

一个基本示例：

```yaml
---
title: Blogging Like a Hacker
lang: zh-CN
---
contents of article
```

在文件开头两个三短横虚线可以设置预定义变量或自定义变量。

然后可以使用 `$frontmatter` 或 `$page.frontmatter` 来访问这些变量。

- 预定义变量
  - `title` - 当前页面标题
  - `lang` - 当前页面语言 = `'en-US'`
  - `description` - 当前页面描述
  - `layout` - 当前页面使用的布局组件 = `'Layout'`
  - `permalink` - 当前页面永久链接
  - `metaTile` - 重写默认的 Meta Title = <code>\`${page.title} | ${siteConfig.title}\`</code>
  - `meta` - 指定额外要注入的 Meta 标签 : `[{name, content}, ...]`

- 默认主题预定义变量
  - `navbar` - 开启导航栏 : `Boolean`
  - `sidebar` - 开启侧边栏 : `Boolean | 'auto'`
  - `prev` - 上一篇链接 : `Boolean | String`
  - `next` - 下一篇链接 : `Boolean | String`

## 🔗 永久链接

使用全局配置来定义所有页面永久链接的格式：

```js
// .vuepress/config.js
module.exports = {
  permalink: '/:year/:month/:day/:slug'
}
```

- 格式模板变量：
  - `:year` - 年份，四位数字
  - `:month` - 月份，两位数字
  - `:i_month` - 月份，不带零
  - `:day` - 日份，两位数字
  - `:i_day` - 日份，不带零
  - `:slug` - 蛞蝓化文件路径（不带扩展名）
  - `:regular` - 基于目录结构生成文件路径（默认生成方式）

也可以为单独页面设置永久链接：

```markdown
---
title: Hello World
permalink: /hello-world
---

Hello!
```

## 🧲 Markdown 插槽

Vuepress 实现了 Markdown 内容的分发，
你可以将文档分割成多个片段，以便在布局组件中灵活组合。

在文件中使用 Markdown 具名插槽：

```markdown
::: slot name
插槽 name 中的具体内容
:::
```

然后在布局组件中利用 `<Content/>` 组件来使用该插槽：

```html
<Content slot-key="name" />
```

一个例子：

```pug
//- 布局组件
.container
  header
    Content(slot-key="header")
  main
    Content
  footer
    Content(slot-key="footer")
```

若页面 Markdown 内容为:

```md
::: slot header
# title
:::

- list item

::: slot footer
footer
:::
```

则最终渲染出来的 HTML 结构为：

```pug
.container
  header
    .content.header
      h1 title
  main
    .content.default
      ul
        li list item
  footer
    .content.footer
      p footer
```

## 📜 术语

- `layout`
  - 当前页面布局组件名 `$page.frontmatter.layout`
- `frontmatter`
  - 当前页面级配置 `$page.frontmatter`
- `permalink`
  - 页面永久链接 `$page.frontmatter.permalink`
- `regularPath`
  - 当前页面基于目录结构生成的 URL `$page.regularPath`
- `path`
  - 页面实际 URL `$page.path` 其值为 `permalink` 或 `regularPath`
- `headers`
  - 页面中的标题集合 `$page.headers`
- `siteConfig`
  - 站点配置 `$site` 或 `Context.siteConfig`
  - 即 `.vuepress/confing.js`
- `themeConfig`
  - 当前所使用的主题配置 `$themeConfig` 或 `Context.themeConfig`
  - 即 `.vuepress/config.js` 中 `themeConfig` 的值
- `themePath`
  - 当前使用的主题所在的绝对路径 `Context.themeAPI.theme.path`
- `themeEntry`
  - 主题的配置文件 `Context.themeAPI.theme.entry`
  - 即 `themePath/index.js`
- `parentThemePath`
  - 指父主题的所在绝对路径 `Context.themeAPI.parentTheme.path`
  - 若当前使用的是派生主题时有效
- `parentThemeEntry`
  - 指父主题的主题配置文件 `Context.themeAPI.parentTheme.entry`
  - 即 `parentThemePath/index.js`
