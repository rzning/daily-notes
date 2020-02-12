# 对 JavaScript 文件进行类型检查

- EN 🔗 <https://www.typescriptlang.org/docs/handbook/type-checking-javascript-files.html>
- ZH 🔗 <https://www.tslang.cn/docs/handbook/type-checking-javascript-files.html>

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

## 泛型约束

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
    value: T;
}
```

## 参考帖子

- [JSDoc支持_TypeScript笔记19 | 黯羽轻扬](http://www.ayqy.net/blog/jsdoc支持_typescript笔记19)