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
    '@vuepress/xxx'[ // 同 '@vuepress/plugin-xxx',
      ('vuepress-plugin-xxx',
      {
        /* options */
      })
    ],
    ['yyy', false] // 禁用插件
  ],
  // 对象形式
  plugins: {
    xxx: {
      /* options */
    },
    yyy: false // 禁用插件
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
  async ready() {
    // ...
  },

  /**
   * 开发模式下有文件更新时被调用
   * @env dev
   */
  updated() {
    // ...
  },

  /**
   * 在生产环境的构建结束后被调用
   * @param {string[]} pagePaths 生成的页面的路径数组
   * @env build
   */
  async generated(pagePaths) {
    // ...
  }
}
```

## 🍨 Plugin Options

````js
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
  chainWebpack(config, isServer) {
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
  beforeDevServer(app, server, compiler) {
    app.get('/path/to/your/custom', (req, res) => {
      res.json({ custom: 'response' })
    })
  },
  /**
   * 提供在服务器内部所有其他中间件之后执行自定义中间件的能力
   * - 等同于 webpack-dev-server 中的 `after` 选项
   * @see {@link https://webpack.js.org/configuration/dev-server/#devserver-after}
   */
  afterDevServer(app, server, compiler) {
    // ...
  },
  /**
   * 修改内部用于渲染 Markdown 文件的
   * [markdown-it]{@link https://github.com/markdown-it/markdown-it}
   * 实例的配置、或应用一些额外的插件
   */
  extendMarkdown(md) {
    md.set({ breaks: true })
    md.use(require('markdown-it-xxx'))
  },
  /**
   * 使用 [markdown-it-chain](https://github.com/ulivz/markdown-it-chain)
   * 来修改内部的 markdown-it 配置
   * @param config 交互配置对象
   */
  chainMarkdown(config) {
    // ...
  },
  /**
   * 指定应用增强文件的绝对路径
   * @type {(string|Array|AsyncFunction)}
   */
  enhanceAppFiles: resolve(__dirname, 'client.js'),
  /**
   * 在编译期生成指定的客户端使用的模块
   *
   * 本例中，使用此插件的用户可以使用以下方式使用动态生成的模块：
   *
   * ```js
   * import { SOURCE_DIR } from '@dynamic/constants'
   * ```
   */
  clientDynamicModules() {
    return {
      // 模块文件名
      name: 'constants.js',
      // 文件内容
      content: `export const SOURCE_DIR = '${context.sourceDir}'`
    }
  },
  /**
   * 扩展或修改页面信息 `$page` 对象
   * - 此函数会在编译每个页面时各执行一次。
   * - 以下划线开头的字段 `$page._*` 只能在编译期访问
   * @param {Object} $page - 页面信息对象
   * @param {string} $page._filePath - 源文件绝对路径
   * @param {Object} $page._computed - 页面组件的[全局计算属性]{@link https://vuepress.vuejs.org/zh/guide/global-computed.html}
   * @param {string} $page._content - 源文件原始内容字符串
   * @param {string} $page._strippedContent - 源文件除去 Frontmattr 的内容字符串
   * @param {string} $page.key - 当前页面唯一的 Hash Key
   * @param {Object} $page.frontmatter - 当前页面级配置对象
   * @param {string} $page.regularPath - 当前页面遵循目录层次结构的默认链接
   * @param {string} $page.path - 当前页面实际链接
   * @see {@link https://vuepress.vuejs.org/zh/guide/global-computed.html#page|$page}
   */
  extendPageData($page) {
    const { _content, frontmatter } = $page
    // 1. 添加额外字段
    $page.size = (_content.length / 1024).toFixed(2) + 'kb'
    // 2. 修改 Frontmatter
    frontmtter.sidebar = 'auto'
  },
  /**
   * 指定根组件 `mixin` 文件路径，可以在混入文件控制根组件生命周期
   * @type {string}
   */
  clientRootMixin: require('path').resolve(__dirname, 'mixin.js'),
  /**
   * 额外页面源文件
   * @typedef {Object} AdditionalPage
   * @property {string} path - 页面访问路径
   * @property {string} [filePath] - 源文件路径
   * @property {string} [content] - 源文件内容
   * @property {Object} [frontmatter] - 源文件配置对象
   */
  /**
   * 增加额外的 Markdown 文件页面
   * @type {AdditionalPage[]|AsyncFunction}
   */
  additionalPages: [
    // 1. 指定文件路径
    {
      path: '/readme/',
      filePath: require('path').resolve(__dirname, '../../README.md')
    },
    // 2. 直接给出文件内容
    {
      path: '/changelog/',
      content: 'xxx'
    },
    // 3. 添加纯粹的路由
    {
      path: '/alpha',
      frontmatter: {
        layout: 'MyLayout'
      }
    }
  ],
  /**
   * 指定全局 Vue 组件名称
   *
   * VuePress 会自动将这些组件注入到布局组件之后：
   *
   * ```html
   *  <div id="app">
   *    <div class="theme-container">
   *      <!-- Layout Component Content -->
   *    </div>
   *    <div>
   *      <OnePluginComp/>
   *      <OtherPluginComp/>
   *    </div>
   *  </div>
   * ```
   *
   * @type {(string|string[])}
   */
  globalUIComponents: ['OnePluginComp', 'OtherPluginComp'],
  /**
   * 注册核外的命令行指令
   * @param {Object} 一个 [CAC]{@link https://github.com/cacjs/cac} 实例
   */
  extendCli(cli) {
    cli
      .command('ask [person]', 'Ask someone how they feel')
      .options('--war', 'outbreak of war')
      .action((person = 'girl', options) => {
        const { war } = options
        if (war) {
          console.log(`The ${person} is sadness.`)
        } else {
          console.log(`The ${person} is happy.`)
        }
      })
  }
})

/**
 * 异步函数
 * @typedef {function} AsyncFunction
 * @async
 */
````

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
module.exports = function plugin(options, ctx) {
  // ...
}
```
