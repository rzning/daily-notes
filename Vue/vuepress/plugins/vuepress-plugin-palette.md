# @vuepress/plugin-palette

- <https://v2.vuepress.vuejs.org/zh/reference/plugin/palette.html>

为你的主题提供调色板功能。

对于主题作者，该插件可以帮助你提供用户自定义样式的能力。

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
    name: '@vuepress/plugin-palette',
    alias: (app) => ({
      // ...
    })
  }
}
```
