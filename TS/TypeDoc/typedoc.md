# TypeDoc

- <https://typedoc.org/>
- <https://github.com/TypeStrong/typedoc>
- <https://www.typedoc.cn/>

TypeDoc 是 TypeScript 的文档生成器，它可以读取你的 TypeScript 源文件，解析其中包含的注释，并为你的代码生成一个包含文档的静态站点。

## 安装 Installation

```sh
npm install typedoc --save-dev

npx typedoc --version

npx typedoc --out docs src/index.ts

npx typedoc --help
```

除了通过命令行传递所有参数外， CLI 还支持从 JSON 文件中读取 TypeDoc 配置：

`typedoc.json` :

```json
{
  // 入口点
  "entryPoints": ["src/index.ts"],
  // 输出目录
  "out": "docs"
}
```

`tsconfig.json` :

```json
{
  "compilerOptions": {
    "normalTypeScriptOptions": "here"
  },
  // TypeDoc 配置
  "typedocOptions": {
    "entryPoints": ["src/index.ts"],
    "out": "docs"
  }
}
```

自定义构建：

```js
const TypeDoc = require('typedoc')

async function main() {
  const app = await TypeDoc.Application.bootstrapWithPlugins({
    entryPoints: ['src/index.ts']
  })

  // 执行转换
  const project = await app.convert()

  if (project) {
    const outputDir = 'docs'

    // 渲染文档
    await app.generateDocs(project, outputDir)

    // 或者生成 JSON 输出
    await app.generateJson(project, outputDir + '/documentation.json')
  }
}

main().catch(console.error)
```

## 选项 Options

- Configuration
- Input
- Output
- Comments
- Organization
- Validation
- Other

## 文档注释 Doc Comments

TypeDoc 为源文件中的注释实现了一个最小的解析器，它提取 TSDoc / JSDoc 标签，并识别代码块而忽略修饰符 ( Decorators ) 。

解析标记后产生的标签将传递给 [Marked] Markdown 解析器，最终转换为 HTML 页面。

[Marked]: https://github.com/markedjs/marked

```ts
/**
 * 此注释 _支持_ [Markdown](https://marked.js.org/)
 */
export class MyDocument {}
```

## 主题 Themes

主题允许你更改生成文档的外观和感觉。

你可以使用一个主题，并修改它以满足你的需求，或者创建一个完全自定义的主题。

使用 `--theme` 参数，允许你在创建文档时选择一个主题。

TypeDoc 附带了一个内置的默认主题，其他主题可以通过插件添加。

若你只是稍微改变生成的输出，可以使用 `--customCss` 选项在定制外观。

有关创建自定义主题的文档，可以参阅：

- [typedoc/internal-docs/custom-themes.md](https://github.com/TypeStrong/typedoc/blob/master/internal-docs/custom-themes.md)

### 自定义主题 Custom Themes

在 TypeDoc 0.22+ 中，插件在调用 `Application.renderer` 上的 `defineTheme()` 方法来定义主题。

例如最简单的主题，完全复制默认主题可以通过以下方式创建：

```ts
import { Application, DefaultTheme } from 'typedoc'

export function load(app: Application) {
  app.renderer.defineTheme('mydefault', DefaultTheme)
}
```

当渲染主题时， TypeDoc 的默认主题将调用几个函数，以允许插件在不完全覆盖主题的情况下将 HTML 注入页面。

钩子 ( Hooks ) 驻留在父 `Renderer` 上，可以被子主题调用，这些子主题使用自定义实现将其覆盖。

```tsx
import { Application, JSX } from 'typedoc'

export function load(app: Application) {
  app.renderer.hooks.on('head.end', () => (
    <script>
      <JSX.Raw html="alert('hi!');" />
    </script>
  ))
}
```

## 插件 Plugins

TypeDoc 支持使用 `--plugin` 标识来加载插件。

```sh
typedoc --plugin typedoc-plugin-markdown
typedoc --plugin ./custom-plugin.js
```

明确指定要加载的插件，默认情况下不加载插件。

插件应导出一个 `load()` 函数，当使用 PluginHost 实例加载插件时， TypeDoc 将调用该函数。

在插件 `load()` 函数中，可以添加插件支持的任何选项，也可以添加影响 TypeDoc 行为所需的任何监听器。

```ts
import { Application, ParameterType, Converter, Context } from 'typedoc'

export function load(app: Application) {
  // 添加选项声明
  app.options.addDeclaration({
    name: 'plugin-option',
    help: 'Displayed when --help is passed',
    type: ParameterType.String, // The default
    defaultValue: '' // The default
  })

  app.converter.on(Converter.EVENT_RESOLVE, (context: Context) => {
    // 当识别到插件自定义选项时，执行相应处理逻辑
    if (app.options.getValue('plugin-option') === 'something') {
      // ...
    }
  })
}
```
