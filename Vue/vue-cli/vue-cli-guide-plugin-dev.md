# Vue CLI 插件开发指南

- <https://cli.vuejs.org/dev-guide/plugin-dev.html>
- <https://cli.vuejs.org/zh/dev-guide/plugin-dev.html>

Vue CLI 系统主要有两部分组成：

- `@vue/cli` - 全局安装的 `vue create <app>` 命令
- `@vue/cli-service` - 局部安装的 `vue-cli-servive` 命令

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
- 一个提示文件 (Prompt File ) 、
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
