---
title       : Vuejs Global API TreeShaking
recorddate  : 2020-03-20
---

# Vuejs RFCs Global API TreeShaking

- [Vuejs-RFC-0004-global-api-treeshaking][rfc-0004]

[rfc-0004]: <https://github.com/vuejs/rfcs/blob/master/active-rfcs/0004-global-api-treeshaking.md>

适用版本： 3.x

## 关于 Tree-Shaking

> [Tree shaking - 术语表 | MDN](https://developer.mozilla.org/zh-CN/docs/Glossary/Tree_shaking)

tree shaking 是 rollup 作者首先提出的。

webpack 2.0 开始引入 tree shaking 技术。

- AST

  - Abstract Syntax Tree
  - 是对 JS 代码进行语法分析后得出的抽象语法树
  - AST 语法树可以把一段 JS 代码的每一个语句都转化为树中的一个节点

- DCE

  - Dead Code Elimination
  - 无用代码删除
  - 表示在保持代码运行结果不变的前提下，去除无用代码
  - 好处：减少程序体积，减少网络请求时间，提高程序执行效率。
  - Dead Code 主要包括：程序中没有执行的代码，写入变量之后不再读取的代码

- Tree Shaking

  - 是 DCE 的一种新的实现方式，它可以在打包时忽略没有用到的代码

Tree-Shaking 的目的就是通过减少 Web 项目中 JS 的无用代码，以减少用户打开页面所需的等待时间，来增强用户体验。

实现 Tree-Shaking 的前提是 JS 要模块化，必须遵从 ES6 Module 规范，而不是 CommonJS 或其他。
因为 ES6 Module 是可以静态分析的，故可以实现在静态编译时进行 tree-shaking 。

基于 ES6 的静态引用 tree shaking 通过扫描所有 ES6 的 `export` 找出被 `import` 的内容并添加到最终代码中。 

Webpack 的实现是把所有 `import` 标记为使用或未使用两种状态，在后续压缩时进行区别处理。

> [Webpack 文档 tree shaking 指南](https://webpack.docschina.org/guides/tree-shaking/)

Rollup 与 Webpack 的差异，以及 tree-shaking 的局限性：

- 对于单个文件和模块化，Rollup 不需要配置插件就可以进行 tree-shaking，而 Webpack 必须依赖 uglifyJS
- 对于未执行到代码，如一个函数 `return` 语句之后的代码，单独使用 Rollup 并不能移除，依然需要依赖 uglifyJS
-  对于依赖运行时才能确定是否会使用代码 tree-shaking 无法删除

Tree Shaking 相关帖子参考：

- [Tree-Shaking性能优化实践 - 原理篇 - 掘金](https://juejin.im/post/5a4dc842518825698e7279a9)
  - Tree-shaking 是 DCE 的一种新的实现。
  - 传统的 DCE 消灭不可能执行的代码，而 Tree-shaking 更关注宇消除没有用到的代码。
  - 传统编译型语言中，都是由编译器将 Dead Code 从 AST 中删除。
  - uglify 是一款优秀的 DCE 工具。
  - tree-shaking更关注于无用模块的消除，消除那些引用了但并没有被使用的模块。
  - tree-shaking 的消除原理依赖于 ES6 的模块特性。
  - ES6 模块依赖关系是确定的，和运行时状态无关，可以进行可靠的静态分析，这就是 tree-shaking 的基础。
  - rollup 只处理函数和顶层的 import/export 变量，不能把没用到的类的方法消除掉


## 摘要

通过命名导出尽可能多地公开 APIs 使 Vue 运行时 tree-shakable 。

## 基本示例

```js
import { nextTick, observable } from 'vue'

nextTick(() => {})

const obj = observable({})
```

## 详细设计

当前在 2.x 中，所有全局 API 都是在单个 Vue 对象上公开的：

```js
import Vue from 'vue'

Vue.nextTick(() => {})

const obj = Vue.observable({})
```

在 3.x 中只能作为命名的导入来访问：

```js
import Vue, { nextTick, observable } from 'vue'

Vue.nextTick // undefined

nextTick(() => {})

const obj = observable({})
```

通过不在 Vue 默认导出上附加所有 API ，可以通过支持 tree-shaking 的打包工具，
将所有未使用的 APIs 在在最后生成的包中移除。

