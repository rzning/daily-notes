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

