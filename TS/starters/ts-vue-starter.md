---
title: 'TypeScript Vue Starter'
recorddate: 2020-02-20
repository: https://github.com/microsoft/TypeScript-Vue-Starter
---

TypeScript Vue Starter

## [Single File Components][sfc]

[sfc]: https://github.com/Microsoft/TypeScript-Vue-Starter#single-file-components

要在 TypeScript 中使用单文件组件 `.vue` 文件，需要做一些准备。

还好，之前已经完成了一半：

- 安装 [vue-loader] 开发依赖，以允许使用 SFC 格式编写 Vue 组件
- 在 `webpack.config.js` 文件 [ts-loader] 规则中配置了 [appendtssuffixto] 选项
  - 其作用是在与正则匹配的文件名后面附加 `.ts` 后缀
  - `appendTsSuffixTo: [/\.vue$/]`

[vue-loader]: https://github.com/vuejs/vue-loader
[ts-loader]: https://github.com/TypeStrong/ts-loader
[appendtssuffixto]: https://github.com/TypeStrong/ts-loader#appendtssuffixto

接下来还要做一件事是：

- 告诉 TypeScript 编译器，对于 `.vue` 文件导入 ( imported ) 时的样子。

创建一个 `vue-shims.d.ts` 文件

```ts
// src/vue-shims.d.ts

declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}
```

我们不需要在任何地方导入这个文件，它自动包含在 TypeScript 中。

并告诉 TypeScript 任何以 `.vue` 结尾的导入都与 Vue 构造函数本身相同。
