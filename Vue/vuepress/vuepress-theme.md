# VuePress Theme

- <https://vuepress.vuejs.org/zh/theme/>

## 🎨 使用主题

可以在 `.vuepress/config.js` 配置文件中指定你需要使用的主题：

```js
module.exports = {
  theme: 'vuepress-theme-xxx'
}
```

若使用的主题以 `vuepress-theme-` 开头，则可以省略此前缀：

```js
module.exports = {
  theme: 'xxx', // vuepress-theme-xxx
  theme: '@org/xxx' // @org/vuepress-theme-xxx
}
```

Markdown 文件渲染的内容，在主题布局组件中使用 `<Content/>` 全局组件来呈现。

```xml
<!-- .vuepress/theme/Layout.vue -->
<template>
  <div class="theme-container">
    <Content/>
  </div>
</template>
```

内容摘抄：

- 可以在 Markdown 文件内容中添加 `<!-- more -->` 注释行，
  在此注释之前的内容将作为文章的摘要被抽取。
- 在布局组件中可通过 `$page.excerpt` 属性获取文档摘要内容。

若想进一步定制化主题，只有一个 `.vuepress/theme/Layout.vue` 布局文件显得过于单薄，
你可能想让不同的页面有不同的布局，
或自定义调色板 `.vuepress/styles/palette.styl` 文件，甚至应用一些插件。

此时你就可以考虑使用社区已经开发好的主题包，或者自己丰衣足食开发自己的主题。

## 🏭开发主题

主题可以放在当前项目的 `./vuepress/theme/` 目录下，也可以作为单独的 NPM 包进行开发。

无论在哪个位置组织你的主题，首先需要熟悉以下约定的主题目录结构：

### 📚 目录结构

- `theme/`
  - `global-compnents/` - 此目录的 Vue 组件将自动注册为全局组件
  - `components/` - Vue 组件目录
  - `layouts/`- 布局组件目录
    - `Layout.vue` - 必须，主布局组件
    - `404.vue`
  - `styles/` - 样式目录
    - `index.styl` - 全局样式
    - `palette.styl` - 调色板，定义变量
  - `templates/` - 覆盖默认的模板文件
    - `dev.html`
    - `ssr.html`
  - `index.js` - 主题入口文件
  - `enhanceApp.js` - 主题层面的应用增强文件
  - `package.json`

若主题以 NPM 包发布，且没有入口 `themePath/index.js` 主题配置文件，
只需指定包的主文件为 `layouts/Layout.vue` 即可。

```json
// package.json
{
  "main": "layouts/Layout.vue"
}
```

### 💠 布局组件

若你的主题包含以下布局组件：

- `theme/layouts/`
  - `Layout.vue`
  - `Home.vue`
  - `About.vue`
  - `404.vue`

则所有页面将默认使用 `Layout.vue` 布局组件，没匹配的路由将使用 `404.vue` 布局页面。

若想使用其他布局组件，只需在当前页面源文件中添加 `layout` 配置信息指定即可。

下例中将使用 `Home.vue` 作为其布局组件：

```yaml
---
layout: Home
---
```

### 🧩 使用插件

可以在主题配置文件 `themePath/index.js` 中给主题添加一些插件：

```js
module.exports = {
  plugins: [
    [
      '@vuepress/pwa',
      { 
        serviceWorker: true,
        updatePopup: true
      }
    ]
  ]
}
```

### 🔮 使用元数据

布局组件将会对每个页面内容的源文件执行一次，
并会将网站及当前页面的元数据以 `$site` 和 `$page` 属性注入到布局组件中。

- `$site.tile`, `$site.description` 和 `$site.base`
  - 数据来自于 `.vuepress/config.js` 配置文件中的对应字段。
- `$site.pages`
  - 以数组形式列出了所有页面的元数据
  - 每个页面包括其路径、页面标题，及 Front Matter 数据
- `$page`
  - 为当前页面的元数据，同样在 `$site.pages` 里也有一个备份
- `$page.lastUpdaed`
  - 为当前页面源文件最后 Git 提交的 UNIX 时间戳
- `$site.themeConfig`
  - 为配置文件 `.vuepress/config.js` 中 `themeConfig` 字段的值
  - 可以通过读取此属性的值来获取此主题对用户开放的自定义配置

### 🎭 应用级配置

可以创建 `themePath/enhanceApp.js` 文件来对 VuePress 应用进行扩展配置。

可以通过此钩子来给应用安装一些附加的 Vue 插件、注册全局组件、增加额外的路由钩子等。

```js
/**
 * @param {Object} data - 钩子函数的传参
 * @param {Vue} data.Vue - 当前 VuePress 正在使用的 Vue 构造函数
 * @param {Object} data.options - 附加到根实例的一些选项
 * @param {Router} data.router - 当前应用的路由实例
 * @param {Object} data.siteData - 站点元数据
 */
export default (data) =>{
  const { Vue, options, router, siteData } = data
  // ...
}
```
