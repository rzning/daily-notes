# 对 JavaScript 文件进行类型检查

- EN 🔗 <https://www.typescriptlang.org/docs/handbook/type-checking-javascript-files.html>
- ZH 🔗 <https://www.tslang.cn/docs/handbook/type-checking-javascript-files.html>

JSDoc Reference

- <https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html>

## 支持的 JSDoc 标记

- `@type`
- `@param` (or `@arg` or `@argument`)
- `@returns` (or `@return`)
- `@typedef`
- `@callback`
- `@template`
- `@class` (or `@constructor`)
- `@this`
- `@extends` (or `@augments`)
- `@enum`

## 强制断言为指定类型 - `@type`

必须使用圆括号，即下列格式：

```js
/** @type {类型} */ ;(variable)
```

示例：

```js
// @ts-check

/**
 * @type {string | number}
 */
var numOrStr = Math.random() < 0.5 ? 'hello' : 100

/**
 * 使用类型断言
 * @type {number}
 */
var typeAssertedNumber = /** @type {number} */ (numOrStr)
```

相当于：

```ts
var numOrStr: string | number = Math.random() < 0.5 ? 'hello' : 100

/**
 * 使用类型断言
 */
var typeAssertedNumber: number = <number>numOrStr
```

## 泛型约束 - `@template`

```js
/**
 * @template T
 * @typedef {Object} Prop
 * @property {T} value
 */
```

相当于：

```ts
type Prop<T> = {
  value: T
}
```

泛型函数示例：

```js
// @ts-check

/**
 * @template T
 * @param {T} value
 * @returns {T}
 */
function id(value) {
  return value
}

/**
 * @type {string}
 */
const a = id('string')
/**
 * @type {number}
 */
const b = id(123)
```

相当于：

```ts
function id<T>(value: T): T {
  return value
}
```

泛型参数添加类型约束：

```js
/**
 * @template {string | number} K
 * @param {K} key
 */
function func(key) {
  // ...
}
```

相当于：

```ts
function func<K extends string | number>(key: K): void
```

## 参考帖子

- [JSDoc支持\_TypeScript笔记19 | 黯羽轻扬](http://www.ayqy.net/blog/jsdoc支持_typescript笔记19)
