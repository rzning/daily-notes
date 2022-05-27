---
title: ESLint Rules Indent
recorddate: 2022-05-27
original: https://eslint.org/docs/rules/indent
---

> This rule enforces a consistent indentation style.
> The default style is 4 spaces.

该规则强制使用一致的缩进样式。默认样式是 4 个空格。

## Options 选项

```ts
type ESLintIndentRule = []
```

### Tab

### ignoredNodes

### SwitchCase

### VariableDeclarator

```js
/*eslint indent: ["error", 2, { "VariableDeclarator": 1 }]*/
/*eslint-env es6*/

var a, b, c
let a, b, c
const a = 1,
  b = 2,
  c = 3
```

### outerIIFEBody

### MemberExpression

### FunctionDeclaration

### FunctionExpression

### StaticBlock

### CallExpression

### ArrayExpression

### ObjectExpression

### ImportDeclaration

### flatTernaryExpressions

### offsetTernaryExpressions

### ignoreComments

## Resources 相关资源

- [Rule source](https://github.com/eslint/eslint/tree/HEAD/lib/rules/indent.js)
