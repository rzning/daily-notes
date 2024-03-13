# Eleventy Navigation Plugin

- <https://www.11ty.dev/docs/plugins/navigation/>
- <https://github.com/11ty/eleventy-navigation>

一个在 Eleventy 项目中创建无限深度的分层导航，也支持面包屑导航。

## 安装 Installation

```sh
npm install @11ty/eleventy-navigation --save-dev
```

```js
// .eleventy.js

const eleventyNavigationPlugin = require('@11ty/eleventy-navigation')

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin)
}
```
