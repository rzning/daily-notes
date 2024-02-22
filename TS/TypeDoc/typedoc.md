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
