# Vue CLI 插件开发指南

- <https://cli.vuejs.org/dev-guide/plugin-dev.html>
- <https://cli.vuejs.org/zh/dev-guide/plugin-dev.html>

Vue CLI 系统主要有两部分组成：

- `@vue/cli`
  - 全局安装的 `vue create <app>` 命令
  - 调用命令时创建 `Creator` 类
  - 负责偏好对话、调用 Generator 和安装依赖
- `@vue/cli-service`
  - 局部安装的 `vue-cli-servive <command> [...args]` 命令
  - 调用命令时创建 `Service` 类
  - 负责管理内部的 Webpack 配置、暴露服务和构建项目的命令等

两者都使用了基于插件的架构。


## 插件的功能

CLI 插件是一个 NPM 包，它可以使用 Vue CLI 向项目添加额外的特性。

这些特性包括:

- 更改项目 Webpack 配置
- 添加新的 `vue-cli-service` 命令
- 扩展 `package.json`
- 在项目中创建新文件或修改旧文件
- 提示用户选择某些选项

## 插件的组成

CLI Plugin 应该始终包含一个服务插件 ( Service Plugin ) 作为其主要导出，
并且可以选择性的包含:

- 一个生成器 ( Generator ) 、
- 一个提示文件 ( Prompt File ) 、
- 一个 Vue UI 集成 ( Vue UI integration ) 。

作为一个 NPM 包，CLI Plugin 必须有 `package.json` 文件。

还建议有一个插件描述文件 `README.md` 帮助别人在 NPM 中找到你的插件。

因此，典型的 CLI Plugin 目录结构为：

```yaml
├── README.md
├── generator.js  # generator (optional)
├── index.js      # service plugin
├── package.json
├── prompts.js    # prompts file (optional)
└── ui.js         # Vue UI integration (optional)
```

下面将分别对以下内容做进一步说明：

1. Service Plugin
2. Generator
3. Prompt File
4. UI Integration

## Service Plugin

服务插件用于修改 Webpack 配置、创建新的 vue-cli 服务命令或更改现有命令 ( 如 `serve` 和 `build` )

- 创建 Service 实例时，将自动加载 Service Plugins
  - 比如每次在项目中调用 `vue-cli-service` 命令时


一个 Service Plugin 应该导出一个接收两个参数的函数:

- `api` - 一个 [PluginAPI](https://cli.vuejs.org/dev-guide/plugin-api.html) 实例
- `options` - 一个包含项目本地选项的对象

```js
module.exports = (api, options) => {
  // do something...
}
```

修改 Webpack 配置：

```js
const VueAutoRoutingPlugin = require('vue-auto-routing/lib/webpack-plugin')

module.exports = (api, options) => {
  api.chainWebpack(webpackConfig => {
    // 给 Webpack 添加 vue-auto-routing 插件
    webpackConfig.plugin('vue-auto-routing')
      .use(VueAutoRoutingPlugin, [{
        pages: 'src/pages',
        nested: true
      }])
  })
}
```

- 还可以使用 `api.configureWebpack()` 方法来修改 Webpack 配置或返回要与 Webpack 合并的对象。
