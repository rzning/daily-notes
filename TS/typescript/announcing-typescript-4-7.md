---
author: Daniel Rosenwasser
date: 2022-05-24
website: https://devblogs.microsoft.com/typescript/announcing-typescript-4-7/
---

# Announcing TypeScript 4.7

## 1. Node.js 中的 ECMAScript 模块支持

> ECMAScript Module Support in Node.js

在过去几年里， Node.js 一直致力于支持 ECMAScript 模块 ( ESM ) 。
推进这一特性是非常困难的，因为 Node.js 生态是建立在另一个叫作 CommonJS ( CJS ) 的模块系统上的。

- 两者之间的相互操作带来了巨大的挑战，需要兼顾许多新功能。
- 而且，在 Node.js 中对 ESM 的支持主要是在 Node.js 12 及以后版本中实现的。
- 在 TypeScript 4.5 前后，我们推出了在 Node.js 中支持 ESM 的 Nightly 版本，
  以便从用户那里获得一些反馈，而且让库开发者为更广泛的支持做好准备。

TypeScript 4.7 通过两个新的 `module` 设置添加了这一功能 : `node16` 和 `nodenext` 。

```json
{
  "compilerOptions": {
    "module": "node16"
  }
}
```

这些新模式带来了一些高级功能，我们将在下面依次讨论。

### 1.1 `package.json` 和新扩展中的 `type` 属性

Node.js 在 `package.json` 中添加了一个叫作 `type` 的新字段，定义了 Node.js 应该如何解析 `.js` 文件。

- [Modules: Packages | Node.js v19.1.0 Documentation](https://nodejs.org/api/packages.html#packages_package_json_and_file_extensions)

```json
{
  "name": "my-package",
  "type": "module",
  "dependencies": {}
}
```

`type` 字段可以设置为 `"module"` 或 `"commonjs"` 。

- `type = "module"` 时包中 JS 文件被解析为 ES 模块。
- `type = "commonjs"` 时包中 JS 文件被解析为 CommonJS 模块。
- 若未指定，默认解析为 CommonJS 模块。

当一个文件被认为是 ES 模块时，与 CommonJS 相比，有下列不同的规则起作用：

- 可以使用 `import` / `export` 语句。
- 可以使用顶层 `await`
- 相对导入路径需要完整的扩展名（例如，我们需要使用 `import "./foo.js"` 来替换 `import "./foo"`）。
- 导入的解析可能与 `node_modules` 中的依赖不同。
- 某些类全局值（如 `require` 和 `module` ）将不能直接使用。
- CommonJS 模块可在特定规则下被导入。

为了让 TypeScript 在此系统中覆盖这种工作方式， `.ts` 和 `.tsx` 文件现在以相同的方式工作。

当 TypeScript 找到一个 `.ts`, `.tsx`, `.js` 或 `.jsx` 文件，它将通过查看 `package.json` 来判断该文件是否为 ES 模块，并以此确定：

- 如何查找该文件导入的其他模块。
- 以及，若生产输出时，该如何转换该文件。

当一个 `.ts` 文件被编译为一个 ES 模块时， ECMAScript `import` / `export` 语句在 `.js` 输出中保持独立。
当它被编译为一个 CommonJS 模块时，则与当前使用 `--module commonjs` 的产出相同。

这也意味着， ES 模块和 CJS 模块的 `.ts` 文件之间的路径解析是不同的。

例如，下面代码：

```ts
// ./foo.ts
export function helper() {
  // ...
}

// ./bar.ts
import { helper } from './foo' // only works in CJS

helper()
```

这段代码可以在 CommonJS 模块中工作，但是在 ES 模块中会失败，因为相对导入需要使用扩展名。
因此，必须使用 _**`foo.ts` 输出文件**_ 的扩展名来扩展它，也就是 `bar.ts` 必须使用从 `./foo.js` 导入来替换。

```ts
// ./bar.ts
import { helper } from './foo.js' // works in ESM & CJS

helper()
```

### 1.2 新的文件扩展名

在 `package.json` 中找到 `type` 字段很好，因为它允许我们继续使用 `.ts` 和 `.js` 扩展名，这很方便。
但是，你有时需要编写一个与 `type` 字段指定类型不同的文件。你也可能只是喜欢总是明确的。

Node.js 支持两个扩展名来帮助实现这一点：

- `.mjs` 文件总是被解析为 ES 模块。
- `.cjs` 文件总是被解析为 CommonJS 模块。
- 而且没有办法去修改这一规则。

相应的， TypeScript 支持两种新的源文件扩展名：

- `.mts` 文件将输出为 `.mjs` 文件。
- `.cts` 文件将输出为 `.cjs` 文件。

此外， TypeScript 还支持两种新的声明文件扩展名：

- `.d.mts` 为 `.mts` 生成的声明文件。
- `.d.cts` 为 `.cts` 生成的声明文件。

### 1.3 CommonJS 互用性

Node.js 允许 ES 模块导入 CommonJS 模块，就像它们是带有默认导出的 ES 模块一样。

```ts
// ./foo.cts
export function helper() {
  console.log('hello world!')
}

// ./bar.mts
import foo from './foo.cjs'

// 打印 "hello world!"
foo.helper()
```

在某些情况下， Node.js 还从 CommonJS 模块中合成命名导出，这可能更方便。

在这些情况下， ES 模块可以使用命名空间格式 ( namespace-style ) 导入，或命名导入：

- 命名空间导入 : `import * as foo from "..."`
- 命名导入 : `import { helper } from "..."`

```ts
// ./foo.cts
export function helper() {
  console.log('hello world!')
}

// ./bar.mts
import { helper } from './foo.cjs'

// 打印 "hello world!"
helper()
```

TypeScript 并不总是有办法知道这些命名导入是否会被合成，但是 TypeScript 会放任这种错误，
并在从一个确定是 CommonJS 模块文件中导入时使用一些启发式方法。

关于互操作 ( Interop ) TypeScript 有一个特定的语法：

```ts
import foo = require('foo')
```

- 在 CommonJS 模块中，这可以归结为 `require()` 调用。
- 在 ES 模块中，它将导入 [createRequire] 来实现相同的功能。

[createrequire]: https://nodejs.org/api/module.html#module_module_createrequire_filename

这将降低代码在浏览器（不支持 `require()` 方法）等运行时上的可移植性，但是在互操作性 ( Interoperability ) 上比较有用。

回到上面的例子，你可以使用下面的语法来实现：

```ts
// ./foo.cts
export function helper() {
  console.log('hello world!')
}

// ./bar.mts
import foo = require('./foo.cjs')

foo.helper()
```

最后，值得注意的是，从 CJS 模块导入 ESM 文件的唯一方法是使用动态 `import()` 调用。
这可能会带来挑战，但这正是 Node.js 目前的行为。

- [ESModules: Interoperability with CommonJS - Node.js](https://nodejs.org/api/esm.html#esm_interoperability_with_commonjs)

### 1.4 `package.json` 的导入、导出、和自引用

Node.js 支持一个新的字段 `exports` 来定义 `package.json` 中的入口点。

这个字段是比在 `package.json` 中定义 `main` 更强大的替代选项，
它可以控制包的哪些部分可以暴露给使用者。

- [Modules: Packages Exports - Node.js](https://nodejs.org/api/packages.html#packages_exports)

下面是一个支持 CommonJS 和 ESM 独立入口点的 `package.json` 文件：

```json
// package.json
{
  "name": "my-package",
  "type": "module",
  "exports": {
    ".": {
      // ESM 中 `import "my-package"`  的入口点
      "import": "./esm/index.js",

      // CJS 中 `require("my-package")` 的入口点
      "require": "./commonjs/index.cjs"
    }
  },

  // 用于旧版本 Node.js 的 CJS 回退
  "main": "./commonjs/index.cjs"
}
```

在 TypeScript 最初的 Node 支持中，它会查找一个 `"main"` 字段，然后查找与该条目相对应的声明文件。

- 例如，若 `"main"` 指向的是 `./lib/index.js` ，则 TypeScript 将会查找一个名为 `./lib/index.d.ts` 的文件。

包编辑者可以通过指定一个名为 `"types"` 的单独字段来覆盖它，例如 `"type": "./types/index.d.ts"` 。

新的支持与导入条件 ( Import Conditions ) 类似，默认情况下， TypeScript 用导入条件覆盖相同的规则：

- 如果你从 ES 模块写入导入，它会查找 `import` 字段。
- 若从 CommonJS 模块写入导入，则会查找 `require` 字段。

如果找到了它们，它将查找相应的声明文件。

如果需要为类型声明指向不同的位置，你可以添加 `types` 导入条件。

```json
// package.json
{
  "name": "my-package",
  "type": "module",
  "exports": {
    ".": {
      // ESM 中 `import "my-package"`  的入口点
      "import": {
        // TypeScript 将在这里查找
        "types": "./types/esm/index.d.ts",

        // Node.js 将在这里查找
        "default": "./esm/index.js"
      },
      // CJS 中 `require("my-package")` 的入口点
      "require": {
        // TypeScript 将在这里查找
        "types": "./types/commonjs/index.d.cts",

        // Node.js 将在这里查找
        "default": "./commonjs/index.cjs"
      }
    }
  },

  // 对于老版本 TypeScript 的回退
  "types": "./types/index.d.ts",

  // 用于旧版本 Node.js 的 CJS 回退
  "main": "./commonjs/index.cjs"
}
```

需要注意的是，在 `"exports"` 中， `"types"` 条件应该总是排在第一位的。

TypeScript 也以类似的方式支持 `package.json` 中的 `"imports"` 字段，通过在相应的文件旁查找声明文件，并且还支持包的自我引用。

- [Modules: Packages Imports - Node.js](https://nodejs.org/api/packages.html#imports)
- [Modules: Packages Self-Referencing - Node.js](https://nodejs.org/api/packages.html#self-referencing-a-package-using-its-name)

## 2. 模块检测的控制

> Control over Module Detection

将模块 ( Modules ) 引入 JavaScript 的一个问题是，现有的 "script" 代码和新的 module 代码之间存在模糊性。

模块中的 JavaScript 代码运行略有不同，而且存在不同的作用域规则，因此工具必须决定每个文件如何运行。

- 例如， Node.js 要求模块的入口点要写作 `.mjs` ，或者附近要有一个带有 `"type": "module"` 标识的 `package.json` 文件。

当 TypeScript 在文件中发现任何 `import` 或 `export` 语句时，会将文件视为一个模块，
但在其他情况下，会假定 `.ts` 或 `.js` 文件是作用于全局作用域的脚本文件。

- 这与在 Node.js 中 `package.json` 可以改变文件格式的行为不太匹配。
- 或者当 `--jsx` 设置为 `react-jsx` 时，其中所有的 JSX 文件都包含一个对 JSX 工厂的隐式导入。
- 它也不符合现代的期望，大多数新的 TypeScript 代码在编写时都考虑到了模块。

这就是为什么在 TypeScript 4.7 引入了一个名为 `moduleDetection` 的新选项。

模块检测选项 `moduleDetection` 可以取下面三个值：

- `"auto"` - 默认值
- `"legacy"` - 遗产，与 4.6 及以前版本保持相同的行为
- `"force"` - 强制的

在 `"auto"` 模式下， TypeScript 不仅会查找 `import` 和 `export` 语句，还会：

- 在 `--module nodenext` 或 `--module node16` 下运行时，检查 `package.json` 文件中 `"type"` 字段是否被设置为 `"module"` 。
- 在 `--jsx react-jsx` 下运行时，检查当前文件是否是 JSX 文件。

如果你希望每个文件都作为模块处理，则 `"force"` 设置将确保每个非声明文件都作为模块处理。
无论 `module` 和 `jsx` 如何配置，它都照此执行。

与此同时， `"legacy"` 选项只是回到了只查找 `import` 和 `export` 语句来确定文件是否是模块的旧行为上。

## 3. 括号内元素访问的控制流分析

> Control-Flow Analysis for Bracketed Element Access

当索引键是文字类型和唯一符号时， TypeScript 缩小了元素访问的类型。

例如下面代码：

```ts
const key = Symbol()

const numberOrString = Math.random() < 0.5 ? 42 : 'hello'

const obj = {
  [key]: numberOrString
}

if (typeof obj[key] === 'string') {
  let str = obj[key].toUpperCase()
}
```

之前， TypeScript 不会考虑 `obj[key]` 上的任何类型保护，也不知道 `obj[key]` 实际上是个字符串。
相反，它会认为 `obj[key]` 仍然是 `string | number` 类型，并且访问 `toUpperCase()` 将触发一个错误。

TypeScript 4.7 现在知道 `obj[key]` 是一个字符串类型。

这也意味着在 `--strictPropertyInitialization` 下， TypeScript 可以正确地检查计算属性是否在构造函数体的末尾被初始化。

```ts
// 'key' 的类型为 'unique symbol'
const key = Symbol()

class C {
  [key]: string

  constructor(str: string) {
    // 这里忘记给 'this[key]' 设置值
  }

  screamString() {
    return this[key].toUpperCase()
  }
}
```

在 TypeScript 4.7 中， `--strictPropertyInitialization` 报告了一个错误，
告诉我们 `[key]` 属性没有在构造函数结束时明确赋值。

## 4. 对象和方法中函数推断的改进

> Improved Function Inference in Objects and Methods

## 5. 实例化表达式

> Instantiation Expressions

## 6. `infer` 类型变量的 `extends` 约束

> `extends` Constraints on `infer` Type Variables

## 7. 类型参数的可选方差注解

> Optional Variance Annotations for Type Parameters

## 8. 使用 `moduleSuffixes` 进行模块解析定制

> Resolution Customization with `moduleSuffixes`

TypeScript 4.7 现在支持一个模块后缀 `moduleSuffixes` 选项来自定义如何查找模块描述符 ( Specifiers ) 。

```json
{
  "compilerOptions": {
    "moduleSuffixes": [".ios", ".native", ""]
  }
}
```

给定上面配置，和下面这样的导入：

```ts
import * as foo from './foo'
```

将会尝试查找 `./foo.ios.ts`, `./foo.native.ts` 相应文件，最终查找 `./foo.ts` 文件。

注意，对于 `moduleSuffixes` 选项中的空字符串 `""` 用于查找 `./foo.ts` 文件也是必要的。

某种意义上说，配置项 `moduleSuffixes` 的默认值就是 `[""]` 。

## 9. 使用 `resolution-mode` 指定引用模块类型

> resolution-mode

```ts
/// <reference types="pkg" resolution-mode="require" />

// or

/// <reference types="pkg" resolution-mode="import" />
```

## 10. 转到源代码定义

> Go to Source Definition

## 11. 以组感知的方式对导入进行排序

> Groups-Aware Organize Imports

## 12. 以对象字面量方式为方法提供代码片段补全

> Object Method Snippet Completions

## 13. 突发的变化

> Breaking Changes

- `lib.d.ts` Updates
- Stricter Spread Checks in JSX
- Stricter Checks with Template String Expressions
- `readFile` Method is No Longer Optional on `LanguageServiceHost`
- `readonly` Tuples Have a `readonly length` Property
