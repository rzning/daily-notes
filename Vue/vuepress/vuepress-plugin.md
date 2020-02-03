# VuePress Plugin

- <https://vuepress.vuejs.org/zh/plugin/>

插件通常会为 VuePress 添加全局功能，插件的范围没有限制。

## 🧩 使用插件

可以在 VuePress 配置文件中指定用到的插件：

```js
// .vuepress/config.js
module.exports = {
  plugins: [
    require('./my-plugin.js'), // 使用本地文件
    'vuepress-plugin-xxx', // 使用 NPM 包
    'xxx', // 同上
    '@org/xxx', // 同 '@org/vuepress-plugin-xxx'
    '@vuepress/xxx' // 同 '@vuepress/plugin-xxx',
    [
      'vuepress-plugin-xxx', { /* options */ }
    ],
    [ 'yyy', false ] // 禁用插件
  ],
  // 对象形式
  plugins: {
    'xxx': { /* options */ },
    'yyy': false // 禁用插件
  }
}
```

## 🏭 开发插件

一个插件可以导出一个普通 JavaScript 对象:

```js
// plugin_obj.js
module.exports = {
  // ...
}
```

此对象将作为插件的配置选项 pluginOptions 被注入到 VuePress 逻辑。

插件也可以导出一个函数，其第一个参数为插件的自定义配置选项，第二个参数为编译期上下文对象：

```js
// plugin_func.js
module.exports = (options, context) {
  const pluginOptions = {}
  // ...
  return pluginOptions
}
```

此函数可返回一个普通 JavaScript 对象，该对象也会被作为配置选项注入到 VuePress 逻辑。

VuePress 插件应该是一个 `CommonJS` 模板，因为它将运行在 Node 端。

## ⏱ 生命周期

```js
module.exports = {
  /**
   * 在应用初始化后，以下选项指定的函数式 API 执行之前执行：
   * - clientDynamicModules
   * - enhanceAppFiles
   * @env dev | build
   */
  async ready () {
    // ...
  },

  /**
   * 开发模式下有文件更新时被调用
   * @env dev
   */
  updated () {
    // ...
  },

  /**
   * 在生产环境的构建结束后被调用
   * @param {string[]} pagePaths 生成的页面的路径数组
   * @env build
   */
  async generated (pagePaths) {
    // ...
  }
}
```

## 🍨 Plugin Options

。。。

## 🔮 Plugin Context

。。。
