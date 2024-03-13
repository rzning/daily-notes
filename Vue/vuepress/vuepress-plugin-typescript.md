# vuepress-plugin-typescript

- <https://github.com/vuepress/vuepress-community/tree/master/packages/vuepress-plugin-typescript>
- <https://vuepress.github.io/zh/plugins/typescript/>

## 安装

```sh
yarn add --dev vuepress-plugin-typescript typescript
```

## 使用

```js
// .vuepress/config.js
module.exports = {
  plugins: [
    [
      'typescript',
      {
        tsLoaderOptions: {
          // ts-loader 配置项
        }
      }
    ]
  ]
}
```

## 配置项

- `tsLoaderOptions`
  - 参考 [ts-loader] 文档

[ts-loader]: https://github.com/TypeStrong/ts-loader#loader-options

## 特性

在 Markdown 中使用 TypeScript

```md
{{ msg }}

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data: () => ({
    msg: 'Hello, TypeScript in Markdown!',
  }),
})
</script>
```

在 Vue SFC 中使用 TypeScript

- 自动注册的全局组件
  - `.vuepress/components/*.vue`
- 主题布局组件
  - `theme/layout/*.vue`
- 其他 Vue 组件

## 类型定义

- [vuepress-types](https://vuepress.github.io/zh/tools/types/)
