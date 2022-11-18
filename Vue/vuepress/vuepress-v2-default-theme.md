# Vuepress 默认主题参考

## 配置

```ts
import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'

export default defineUserConfig({
  // ...
  theme: defaultTheme({
    // 默认主题配置
  })
})
```

类型定义：

```ts
export type DefaultThemeConfig = BaseDefaultThemeConfig & {
  themePlugins?: DefaultThemePluginsOptions
}
```

### 基础配置

````ts
type DefaultThemeOptions = {
  /**
   * 默认颜色模式
   * @default 'auto'
   */
  colorMode?: 'auto' | 'dark' | 'light'

  /**
   * 是否启用切换颜色主题按钮
   * @default true
   */
  colorModeSwitch?: boolean

  /**
   * ( a11y ) 切换颜色主题模式按钮的显示文本
   */
  toggleColorMode?: string

  /**
   * 首页路径，它被用于导航栏 Logo 和 404 页面返回首页的链接
   * @default '/'
   */
  home?: string

  /**
   * 导航栏，设为 `false` 可禁用导航栏
   * @default `[]`
   */
  navbar?: false | NavbarConfig

  /**
   * 导航栏 Logo 图片的 URL ，设为  `null` 可以禁用 Logo
   */
  logo?: null | string

  /**
   * 在夜间模式下，导航栏 Logo 图片的 URL
   * - 设为 `null` 则在夜间模式下禁用 logo
   * - 忽略该属性则在夜间模式使用 `logo` 配置
   */
  logoDark?: null | string

  /**
   * 导航栏：项目仓库的 URL ，仓库链接将显示在导航栏的最后一个元素
   */
  repo?: null | string

  /**
   * 导航栏：仓库链接的显示文本，若省略则根据 `repo` 配置自动推断
   */
  repoLabel?: string

  /**
   * 导航栏：多语言选择器的显示文本
   */
  selectLanguageText?: string

  /**
   * ( a11y ) 导航栏：多语言选择器的 `aria-label` 属性
   */
  selectLanguageAriaLabel?: string

  /**
   * Locale 的语言名称
   * - 该配置项只能在主题配置的 `locales` 内部生效
   * - 它将展示在多语言选择器的菜单内
   */
  selectLanguageName?: string

  /**
   * 侧边栏配置
   * @default 'auto'
   */
  sidebar?: 'auto' | false | SidebarConfig

  /**
   * 设置根据页面标题自动生成的侧边栏的最大深度
   * - `0` - 禁用所有级别页面标题
   * - `1` - 包含 `<h2>` 标题
   * - `2` - 包含 `<h2>` 和 `<h3>`
   * - ...
   * @default 2
   */
  sidebarDepth?: number

  /**
   * ( A11y ) 切换侧边栏按钮的显示文本
   */
  toggleSidebar?: string

  /**
   * 是否启用编辑此页链接
   * @default true
   */
  editLink?: boolean

  /**
   * 编辑此页链接的显示文本
   * @default 'Edit this page'
   */
  editLinkText?: string

  /**
   * 编辑此页链接的 Pattern ，它将用于生成编辑此页的链接
   * - 若未配置此项，则会根据 `docsRepo` 配置项来推断 Pattern
   * - 若你的文档仓库没有托管在常用平台上，如 Github, Gitlab, Bitbucket, Gitee 等，
   *   那么你必须设置此选项才能使编辑此页链接正常工作
   *
   * 用法：
   * - `:repo` - 文档仓库 URL ，即 `docsRepo`
   * - `:branch` - 文档仓库分支，即 `docsBranch`
   * - `:path` - 页面源文件路径，即 `docsDir` 拼接上页面文件的相对路径
   *
   * @example
   * ```
   * export default defineUserConfig({
   *   docsRepo: 'https://gitlab.com/owner/name',
   *   docsBranch: 'master',
   *   docsDir: 'docs',
   *   editLinkPattern: ':repo/edit/:branch/:path'
   * })
   * ```
   * 将生成类似于 `'https://gitlab.com/owner/name/edit/master/docs/path/to/file.md'` 的链接
   */
  editLinkPattern?: string

  /**
   * 文档源文件所在仓库的 URL
   * - 未设置此项，则默认使用 `repo` 配置项
   */
  docsRepo?: string

  /**
   * 文档源文件所在仓库的分支
   * @default 'main'
   */
  docsBranch?: string

  /**
   * 文档源文件在仓库中的目录名
   * @default ''
   */
  docsDir?: string

  /**
   * 是否启用最近更新时间戳
   * @default true
   */
  lastUpdated?: boolean

  /**
   * 最近更新时间戳的标签文本
   * @default 'Last Updated'
   */
  lastUpdatedText?: string

  /**
   * 是否启用贡献者列表
   * @default true
   */
  contributors?: boolean

  /**
   * 贡献者列表的标签文本
   * @default 'Contributors'
   */
  contributorsText?: string

  /**
   * 自定义容器 : Tip 的默认标题
   * @default 'TIP'
   */
  tip?: string

  /**
   * 自定义容器 : Warning 的默认标题
   * @default 'WARNING'
   */
  warning?: string

  /**
   * 自定义容器 : Danger 的默认标题
   * @default 'DANGER'
   */
  danger?: string

  /**
   * 404 页面的提示信息
   * - 当用户进入 404 页面时，会从数组中随机选取一条信息进行展示
   * @default ['Not Found']
   */
  notFound?: string[]

  /**
   * 404 页面中返回首页链接的文字
   * @default 'Back to home'
   */
  backToHome?: string

  /**
   * ( A11y ) 外部链接图标的显示文本
   * @default 'open in new window'
   */
  openInNewWindow?: string
}

type ThemeConfig<T> = T & {
  locales?: Record<string, Partial<T>>
}

/**
 * 默认主题基础配置
 */
type BaseDefaultThemeConfig = ThemeConfig<DefaultThemeOptions>
````

### 导航栏配置 Navbar

```ts
interface NavbarItem {
  text: string
  ariaLabel?: string
  link: string
  rel?: string
  target?: string
  activeMatch?: string
}

interface NavGroup<T> {
  text: string
  ariaLabel?: string
  children: T[]
}

type NavbarGroup = NavGroup<NavbarGroup | NavbarItem | string>

type NavbarConfig = (NavbarItem | NavbarGroup | string)[]
```

### 侧边栏配置 Sidebar

```ts
type SidebarItem = {
  text: string
  ariaLabel?: string
  link?: string
  rel?: string
  target?: string
  activeMatch?: string
}

type SidebarGroup = SidebarItem & {
  children: SidebarItem | SidebarGroup | string
  collapsible?: boolean
}

type SidebarConfigArray = (SidebarItem | SidebarGroup | string)[]

type SidebarConfig = SidebarConfigArray | Record<string, SidebarConfigArray>
```

### 插件配置 ThemePlugins

```ts
type DefaultThemePluginsOptions = {
  // ...
}
```

## Frontmatter

- 所有页面
- 首页
- 普通页面

## 内置组件

- Badge
- CodeGroup
- CodeGroupItem

## Markdown

### 自定义容器

```md
::: <type> [title]
[content]
:::
```

`type` 支持的类型有：

- tip
- warning
- danger
- details
- code-group
- code-group-item

## 样式

- 默认主题使用 [SASS](https://sass-lang.com/) 作为 CSS 预处理器。
- 用户可以通过 palette 文件来自定义样式变量。
- 还可以通过 style 文件来添加额外的样式。

### Palette 文件

```
.vuepress/styles/palette.scss
```

### Style 文件

```
.vuepress/styles/index.scss
```

## 继承

### 布局插槽

- `navbar`
- `navbar-before`
- `navbar-after`
- `sidebar`
- `sidebar-top`
- `sidebar-bottom`
- `page`
- `page-top`
- `page-bottom`
- `page-content-top`
- `page-content-bottom`

### 组件替换

### 开发一个子主题
