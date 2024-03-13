# unplugin-vue-components

- <https://github.com/unplugin/unplugin-vue-components>

适用于 Vue 的按需组件自动导入。

## 特点 Features

- 支持 Vue 2 和 Vue 3 开箱即用。
- 支持组件和指令。
- 支持 Vite, Webpack, Rspack, Vue CLI, Rollup, esbuild 等。
- 可摇树，只注册您使用的组件。
- 文件夹名称作为命名空间。
- 完整的 TypeScript 支持。
- 流行 UI 库的内置解析器。
- 与 unplugin-icons 完美配合。

## 安装 Installation

```sh
yarn add unplugin-vue-components --dev
```

### Vite

```ts
// vite.config.ts
import Components from 'unplugin-vue-components/vite'

export default defineConfig({
  plugins: [
    Components({
      /* options */
    })
  ]
})
```

## 使用 Usage

像往常一样在模板中使用组件，它会按需导入组件，不再需要导入和组件注册。

如果你异步注册父组件（或惰性路由），自动导入的组件将与它们的父组件一起进行代码拆分。

它会自动把：

```vue
<template>
  <div>
    <HelloWorld msg="Hello Vue 3.0 + Vite" />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
```

转换为：

```vue
<template>
  <div>
    <HelloWorld msg="Hello Vue 3.0 + Vite" />
  </div>
</template>

<script>
import HelloWorld from './src/components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>
```

## TypeScript

获得 TypeScript 对自动导入组件的支持。

如果你正在使用 Volar ，可以按照以下方式更改配置以获得支持：

```ts
Components({
  // 如果安装了 typescript 则默认启用
  dts: true
})
```

设置完成后，将生成 `components.d.ts` 文件，并使用类型定义自动更新。

> 还要确保将 `components.d.ts` 加入到 `tsconfig.json` 文件的 `include` 配置下。

## 从 UI 库导入

我们为流行的 UI 库提供了内置解析器，你可以通过以下方式启用它们。

- Ant Design Vue
- Arco Design Vue
- BootstrapVue
- Element Plus
- Element UI
- Headless UI
- IDux
- Inkline
- Ionic
- Naive UI
- Prime Vue
- Quasar
- TDesign
- Vant
- Varlet UI
- VEUI
- View UI
- Vuetify
- VueUse Components
- VueUse Directives
- Dev UI

```js
// vite.config.ts

import { defineConfig } from 'vite'
import Components from 'unplugin-vue-components/vite'
import {
  AntDesignVueResolver,
  ElementPlusResolver,
  VantResolver
} from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    Components({
      // 设置内置解析器
      resolvers: [AntDesignVueResolver(), ElementPlusResolver(), VantResolver()]
    })
  ]
})
```

## 声明全局注册组件的类型

有些库可能会注册一些全局组件供你在任何地方使用。

因为它们是全局可用的，所以这个插件不需要导入它们。

然而，这些通常不是 TypeScript 友好的，你可能需要手动注册它们的类型。

因此 `unplugin-vue-components` 提供了一种只为全局组件注册类型的方法。

```ts
Components({
  dts: true,
  types: [
    {
      from: 'vue-router',
      names: ['RouterLink', 'RouterView']
    }
  ]
})
```

默认情况下， `unplugin-vue-components` 会在工作空间中安装支持的库（例如 `vue-router` ）时自动检测它们。

如果你想完全禁用它，你可以传递一个空数组给它：

```ts
Components({
  types: []
})
```

## 配置 Configuration

```ts
Components({
  // 要搜索组件的目录相对路径
  dirs: ['src/components'],

  // 组件的有效文件扩展名
  extensions: ['vue'],

  // 匹配要作为组件检测的文件名的 Glob 模式
  // 当指定时， `dirs` 和 `extensions` 选项将被忽略
  globs: ['src/components/*.{vue}'],

  // 是否搜索子目录
  deep: true,

  // 自定义组件解析器
  resolvers: [],

  // 生成 `components.d.ts` 全局声明，接受自定义文件名路径
  // 如果安装了 typescript 则默认值为 `true`
  dts: false,

  // 允许子目录作为组件的命名空间前缀
  directoryAsNamespace: false,

  // 剔除文件夹和组件的相同前缀（驼峰敏感），以防止名称空间组件名称内的重复
  // 当 `directoryAsNamespace: true` 时有效
  collapseSamePrefixes: false,

  // 设置忽略命名空间前缀的子目录路径
  // 当 `directoryAsNamespace: true` 时有效
  globalNamespaces: [],

  // 自动导入指令
  // 默认 Vue3 为 `true` 而 Vue 2 为 `false`
  // Babel is needed to do the transformation for Vue 2, it's disabled by default for performance concerns.
  // 在 Vue2 中需要 Babel 来完成转换，出于性能考虑，它在默认情况下是禁用的。
  // 使用 `npm install -D @babel/parser` 命令安装 Babel
  directives: true,

  // 解析前的变换路径钩子函数
  importPathTransform: (v) => v,

  // 允许组件覆盖具有相同名称的其他组件
  allowOverrides: false,

  // 用于转换目标的过滤器
  include: [/\.vue$/, /\.vue\?vue/],
  exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],

  // 项目中 Vue 的版本，若未指定则自动检测
  // 允许值： 2 | 2.7 | 3
  version: 2.7,

  // 仅提供库中的组件类型（全局注册）
  types: []
})
```
