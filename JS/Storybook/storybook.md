# Storybook

> Build bulletproof UI components faster

- <https://github.com/storybookjs/storybook>
- <https://storybook.js.org/>

Storybook 是一个 UI 组件的开发环境。

它允许你浏览组件库，查看每个组件的不同状态，并交互式地开发和测试组件。

## ✨ 简介 Intro

Storybook 在你的应用之外运行。

允许你独立地开发 UI 组件，可以提高组件重用、可测试性和开发速度。

你可以快速构建，而不必担心特定于应用程序的依赖关系。

- 示例
  - 这里有一些你可以用来参考的典型的示例，以了解 Storybook 的工作方式：
  - <https://storybook.js.org/examples/>

- 插件
  - Storybook 附带了许多用于组件设计、文档编制、测试、交互等的插件：
  - <https://storybook.js.org/docs/addons/introduction/>

- API
  - 使用 Storybook 的 API 使得以各种方式配置和扩展成为可能。

- 移动端
  - 它甚至已扩展为支持针对移动设备的 React Native 开发。

## 🚀 入门

安装 storybook

```sh
cd my-react-app
npx -p @storybook/cli sb init
```

安装之后，您可以运行

```sh
npm run storybook
```

它将在本地环境上运行开发服务器，并为提供一个 URL 来浏览一些示例故事。

## 📚 项目 Projects

🍺 支持的框架

Framework | Storybook | Demo | Guide
-|:-:|:-:|:-:
[React] | [⚡][app-react] | [🎨][demo-react] | [📜][gride-react]
[React Native] | [⚡][app-react-native] | - | [📜][gride-react-native]
[Vue] | [⚡][app-vue] | [🎨][demo-vue] | [📜][gride-vue]
[Angular] | [⚡][app-angular] | [🎨][demo-angular] | [📜][gride-angular]
[Marionette.js] | [⚡][app-marionette] | - | -
[Mithril] | [⚡][app-mithril] | [🎨][demo-mithril] | [📜][gride-mithril]
[Marko] | [⚡][app-marko] | [🎨][demo-marko] | [📜][gride-marko]
[HTML] | [⚡][app-html] | [🎨][demo-html] | [📜][gride-html]
[Svelte] | [⚡][app-svelte] | [🎨][demo-svelte] | [📜][gride-svelte]
[Riot] | [⚡][app-riot] | [🎨][demo-riot] | [📜][gride-riot]
[Ember] | [⚡][app-ember] | [🎨][demo-ember] | [📜][gride-ember]
[Preact] | [⚡][app-preact] | [🎨][demo-preact] | [📜][gride-preact]
[Rax] | [⚡][app-rax] | [🎨][demo-rax] | -

[React]: <https://github.com/facebook/react>
[React Native]: <https://github.com/facebook/react-native>
[Vue]: <https://github.com/vuejs/vue>
[Angular]: <https://github.com/angular/angular>
[Marionette.js]: <https://github.com/marionettejs/backbone.marionette>
[Mithril]: <https://github.com/MithrilJS/mithril.js>
[Marko]: <https://github.com/marko-js/marko>
[HTML]: <https://developer.mozilla.org/en-US/docs/Web/HTML>
[Svelte]: <https://github.com/sveltejs/svelte>
[Riot]: <https://github.com/riot/riot>
[Ember]: <https://github.com/emberjs/ember.js>
[Preact]: <https://github.com/preactjs/preact>
[Rax]: <https://github.com/alibaba/rax>
[app-react]: <https://github.com/storybookjs/storybook/tree/next/app/react>
[app-react-native]: <https://github.com/storybookjs/storybook/blob/next/app/react-native>
[app-vue]: <https://github.com/storybookjs/storybook/blob/next/app/vue>
[app-angular]: <https://github.com/storybookjs/storybook/blob/next/app/angular>
[app-marionette]: <https://github.com/storybookjs/storybook/blob/next/app/marionette>
[app-mithril]: <https://github.com/storybookjs/storybook/blob/next/app/mithril>
[app-marko]: <https://github.com/storybookjs/storybook/blob/next/app/marko>
[app-html]: <https://github.com/storybookjs/storybook/blob/next/app/html>
[app-svelte]: <https://github.com/storybookjs/storybook/blob/next/app/svelte>
[app-riot]: <https://github.com/storybookjs/storybook/blob/next/app/riot>
[app-ember]: <https://github.com/storybookjs/storybook/blob/next/app/ember>
[app-preact]: <https://github.com/storybookjs/storybook/blob/next/app/preact>
[app-rax]: <https://github.com/storybookjs/storybook/blob/next/app/rax>
[demo-react]: <https://storybooks-official.netlify.com/>
[demo-vue]: <https://storybooks-vue.netlify.com/>
[demo-angular]: <https://storybooks-angular.netlify.com/>
[demo-mithril]: <https://storybooks-mithril.netlify.com/>
[demo-marko]: <https://storybooks-marko.netlify.com/>
[demo-html]: <https://storybooks-html.netlify.com/>
[demo-svelte]: <https://storybooks-svelte.netlify.com/>
[demo-riot]: <https://storybooks-riot.netlify.com/>
[demo-ember]: <https://storybooks-ember.netlify.com/>
[demo-preact]: <https://storybooks-preact.netlify.com/>
[demo-rax]: <https://storybooks-rax.netlify.com/>
[gride-react]: <https://storybook.js.org/docs/guides/guide-react/>
[gride-react-native]: <https://storybook.js.org/docs/guides/guide-react-native/>
[gride-vue]: <https://storybook.js.org/docs/guides/guide-vue/>
[gride-angular]: <https://storybook.js.org/docs/guides/guide-angular/>
[gride-mithril]: <https://storybook.js.org/docs/guides/guide-mithril/>
[gride-marko]: <https://storybook.js.org/docs/guides/guide-marko/>
[gride-html]: <https://storybook.js.org/docs/guides/guide-html/>
[gride-svelte]: <https://storybook.js.org/docs/guides/guide-svelte/>
[gride-ember]: <https://storybook.js.org/docs/guides/guide-ember/>
[gride-riot]: <https://storybook.js.org/docs/guides/guide-riot/>
[gride-preact]: <https://storybook.js.org/docs/guides/guide-preact/>

🍕 子项目

- [CLI](https://github.com/storybookjs/storybook/blob/next/lib/cli)
  - 简化了各种应用程序类型的安装

- [examples](https://github.com/storybookjs/storybook/blob/next/examples)
  - 演示不同 Storybook 用例的代码示例

🧵 插件 Addons

