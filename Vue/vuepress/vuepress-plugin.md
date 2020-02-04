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

```js
// one-plugin.js
module.exports = (options, context) => ({
  /**
   * 插件的名称
   */
  name: 'my-xxx-plugin',
  /**
   * 插件预置的其他插件
   */
  plugins: [],
  /**
   * 使用 webpack-chain 来修改内部的 Webpack 配置
   * @param {object} config 一个 ChainableConfig 实例
   * @param {boolean} isServer 是否 SSR
   */
  chainWebpack (config, isServer) {
    config.plugin('injections').tap(([options]) => [
      Object.assign(options, {
        SW_BASE_URL: JSON.stringify('/')
      })
    ])
    config.resolve.alias.set('@pwd', process.cwd())
  },
  /**
   * 以简易对象或函数方式修改 Webpack 配置
   * - 这些值已经自动被 `JSON.stringify()` 处理
   * @type {(Object|Function)}
   */
  define: {
    SW_BASE_URL: '/'
  },
  /**
   * 配置 Webpack 中的别名
   */
  alias: {
    '@theme': context.themeAPI.themePath
  },
  /**
   * 可用于定义 DevServer 自定义处理程序
   * - 提供在服务器内部所有其他中间件之前执行自定义中间件的能力。
   * - 等同于 webpack-dev-server 中的 `before` 选项
   * @see {@link https://webpack.js.org/configuration/dev-server/#devserver-before}
   */
  beforeDevServer (app, server, compiler) {
    app.get('/path/to/your/custom', (req, res) => {
      res.json({ custom: 'response' })
    })
  },
  /**
   * 提供在服务器内部所有其他中间件之后执行自定义中间件的能力
   * - 等同于 webpack-dev-server 中的 `after` 选项
   * @see {@link https://webpack.js.org/configuration/dev-server/#devserver-after}
   */
  afterDevServer (app, server, compiler) {
    // ...
  },
  /**
   * 修改内部用于渲染 Markdown 文件的
   * [markdown-it]{@link https://github.com/markdown-it/markdown-it}
   * 实例的配置、或应用一些额外的插件
   */
  extendMarkdown (md) {
    md.set({ breaks: true })
    md.use(require('markdown-it-xxx'))
  },
  /**
   * 使用 [markdown-it-chain](https://github.com/ulivz/markdown-it-chain)
   * 来修改内部的 markdown-it 配置
   * @param config 交互配置对象
   */
  chainMarkdown (config) {
    // ...
  },
  /**
   * 指定应用增强文件的绝对路径
   * @type {(string|Array|AsyncFunction)}
   */
  enhanceAppFiles: resolve(__dirname, 'client.js')
})
```

## 🔮 Plugin Context

从 VuePress 1.x.x 开始 VuePress 提供了一个 `AppContext` 对象，
它存储了当前应用程序的所有状态，可以通过 Plugin API 访问

每个插件的上下文 `ctx` 都是从同一个应用上下文 `AppContext` 继承而来的独立上下文对象。

```js
/**
 * 函数式插件
 * @param {Object} options 插件自定义
 * @param {Object} ctx 应用上下文
 * @param {boolean} ctx.isProd 应用是否运行在生产环境模式
 * @param {Page[]} ctx.pages 包含所有页面对象的列表
 * @param {string} ctx.sourceDir 文档的根目录路径
 * @param {string} ctx.tempPath 根目录下的临时文件目录
 * @param {string} ctx.outDir 输出目录
 * @param {string} ctx.base 部署应用的基础路径
 * @param {function} ctx.writeTemp 一个用于向 `tempPath` 写入临时文件的方法
 */
module.exports = function plugin (options, ctx) {
  // ...
}
```
