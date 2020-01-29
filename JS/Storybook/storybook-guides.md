# Storybook Guides

- <https://storybook.js.org/docs/guides/quick-start-guide/>

## 快速入门指南

Storybook 支持许多不同的前端视图层 ( frontend view layers ) 将来还会支持更多！

- 目前支持： React, Vue, Angular, Mithril, Marko, HTML, Svelte, Meteor, Ember, Riot and Preact

请按照下面步骤开始 Storybook 的使用：

1️⃣ 初始化项目

使用自动化命令 `sb init` 初始化项目。

- 此命令将在你项目中为 Storybook 添加一组样板 ( boilerplate ) 文件

```sh
cd my-project-directory
npx -p @storybook/cli sb init
```

该工具会检查你的 `package.json` 内容，来确定您使用的是哪个视图层。

- HTML
  - 如果想在 Storybook 中开发 HTML 片段，则无法自动确定。
  - 此时需要使用 `--type` 标志来强制 HTML 项目类型。

  ```sh
  npx -p @storybook/cli sb init --type html
  ```

2️⃣ 启动 Storybook

```sh
npm run storybook
```

启动后就可以在浏览器中（使用控制台提供的链接）访问了。

## 慢速入门指南

要了解有关 Storybook CLI `sb init` 命令的功能的更多信息，可查看慢速入门指南：


- Storybook for React
- Storybook for React Native
- Storybook for Vue
- Storybook for Angular
- Storybook for Mithril
- Storybook for Marko
- Storybook for HTML
- Storybook for Svelte
- Storybook for Ember
- Storybook for Riot
- Storybook for Preact