# @vuepress/plugin-palette

- <https://v2.vuepress.vuejs.org/zh/reference/plugin/palette.html>

为你的主题提供调色板功能。

对于主题作者，该插件可以帮助你提供用户自定义样式的能力。

该插件提供下列两个文件，用于在你的主题样式中引入：

- `@vuepress/plugin-palette/palette`

  - 调色板文件用于定义样式变量，
  - 因此它一般会在你的主题样式的开头引入。
  - 用户可以在调色板中定义 CSS 变量、 SASS 变量、 LESS 变量、或 Stylus 变量，
  - 然后你可以在你的主题样式中使用这些变量。

- `@vuepress/plugin-palette/style`

  - 样式文件用于覆盖默认样式或添加额外样式，
  - 因此它一般会在你主题样式的末尾引入。

## 插件使用方法

```bash
npm i -D @vuepress/plugin-palette@next
```

```ts
import { defineUserConfig } from 'vuepress'
import { palettePlugin } from '@vuepress/plugin-palette'

export default defineUserConfig({
  plugins: [
    palettePlugin({
      // 配置项

      // 假设你使用 SASS 作为 CSS 预处理器
      preset: 'sass'
    })
  ]
})
```

## 配置项

```ts
interface PalettePluginOptions {
  /**
   * 调色板预设
   *
   * @default 'css'
   */
  preset?: 'css' | 'sass' | 'less' | 'stylus'

  /**
   * 用户调色板文件路径 - User Palette File
   *
   * - 相对于源文件目录
   * - 该文件用于用户自定义样式变量
   *
   * @default '.vuepress/styles/palette.css' - css
   * @default '.vuepress/styles/palette.scss' - sass
   * @default '.vuepress/styles/palette.less' - less
   * @default '.vuepress/styles/palette.styl' - stylus
   */
  userPaletteFile?: string

  /**
   * 生成的调色板临时文件的路径 - Generated Palette Temp File
   *
   * - 相对于临时文件目录
   * - 你应该使用 '@vuepress/plugin-palette/palette' 别名来引入调色板文件
   *
   * @default 'styles/palette.css' - css
   * @default 'styles/palette.scss' - sass
   * @default 'styles/palette.less' - less
   * @default 'styles/palette.styl' - stylus
   */
  tempPaletteFile?: string

  /**
   * 用户样式文件路径 - User Style File
   *
   * - 相对于源文件目录
   * - 该文件用于用户覆盖默认样式和添加额外样式
   *
   * @default '.vuepress/styles/index.css' - css
   * @default '.vuepress/styles/index.scss' - sass
   * @default '.vuepress/styles/index.less' - less
   * @default '.vuepress/styles/index.styl' - stylus
   */
  userStyleFile?: string

  /**
   * 生成的样式临时文件的路径 - Generated Style Temp File
   *
   * - 相对于临时文件目录
   * - 你应该使用 '@vuepress/plugin-palette/style' 别名来引入样式文件
   *
   * @default 'styles/index.css' - css
   * @default 'styles/index.scss' - sass
   * @default 'styles/index.less' - less
   * @default 'styles/index.styl' - stylus
   */
  tempStyleFile?: string

  /**
   * 用于生成引入代码的函数 - Function to Generate Import Code
   *
   * - 该配置项用于生成 tempPaletteFile 和 tempStyleFile
   *
   * @default (filePath) => `@import '${filePath}';\n` - css
   * @default (filePath) => `@forward 'file:///${filePath}';\n` - sass
   * @default (filePath) => `@import '${filePath}';\n` - less
   * @default (filePath) => `@require '${filePath}';\n` - stylus
   */
  importCode?: (filePath: string) => string
}
```

## 实现逻辑

```ts
import type { Plugin } from '@vuepress/core'

const palettePlugin = (options: PalettePluginOptions): Plugin => {
  return {
    /**
     * 插件名
     */
    name: '@vuepress/plugin-palette',
    /**
     * 定义路径别名
     */
    alias: (app) => ({
      '@vuepress/plugin-palette/palette': app.dir.temp(options.tempPaletteFile),
      '@vuepress/plugin-palette/style': app.dir.temp(options.tempStyleFile)
    }),

    /**
     * 在 VuePress App 完成文件准备后被立即调用
     */
    onPrepared: async (app) => {
      await Promise.all([
        // 读取 options.userPaletteFile 对应文件内容，
        // 并将其写入 options.tempPaletteFile 对应临时文件中
        preparePaletteFile(app, options),

        // 读取 options.userStyleFile 对应文件内容，
        // 并将其写入 options.tempStyleFile 对应临时文件中
        prepareStyleFile(app, options)
      ])
    },

    /**
     * 在 VuePress App 启动开发服务器并开始监听文件修改后被调用
     */
    onWatched: (app, watchers) => {
      // 监听 options.tempPaletteFile 对应文件变化时，执行 preparePaletteFile() 方法
      // ...
      // 监听 options.tempStyleFile 对应文件变化时，执行 prepareStyleFile() 方法
      // ...
    }
  }
}
```

## 使用调色板 Palette

在你主题需要使用对应变量的地方引入该插件的调色板文件，比如在 `Layout.vue` 中：

```vue
<template>
  <h1 class="palette-title">你好，调色板！</h1>
</template>

<style lang="scss">
/* 从该插件的调色板中引入变量 */
@import '@vuepress/plugin-palette/palette';

/* 设置变量的默认值 */
$color: red !default;

/* 在你的样式中使用变量 */
.palette-title {
  color: $color;
}
</style>
```

然后，用户就可以在 `.vuepress/styles/palette.scss` 中自定义变量：

```scss
$color: green;
```

## 使用样式 Styles

在你主题的样式之后引入该插件的样式文件，比如在 `clientConfigFile` 中：

```ts
// 引入你主题本身的样式文件
import 'path/to/your/theme/style'
// 引入该插件的样式文件
import '@vuepress/plugin-palette/style'
```

然后，用户就可以在 `.vuepress/styles/index.scss` 中添加额外样式，并可以覆盖你主题本身的样式：

```scss
h1 {
  font-size: 2.5rem;
}
```
