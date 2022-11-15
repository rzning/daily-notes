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

### 1.4 `package.json` 的导入、导出、和自引用

## 2. 模块检测的控制

> Control over Module Detection

## 3. 括号内元素访问的控制流分析

> Control-Flow Analysis for Bracketed Element Access

## 4. 对象和方法中函数推断的改进

> Improved Function Inference in Objects and Methods

## 5. 实例化表达式

> Instantiation Expressions

## 6. `infer` 类型变量的 `extends` 约束

> `extends` Constraints on `infer` Type Variables

## 7. 类型参数的可选方差注解

> Optional Variance Annotations for Type Parameters

## 8.

> Resolution Customization with moduleSuffixes

## 9.

> resolution-mode

## 10.

> Go to Source Definition

## 11.

> Groups-Aware Organize Imports

## 12.

> Object Method Snippet Completions

## 13.

> Breaking Changes
