# JSX extensions to Mozilla AST Format

- <https://github.com/facebook/jsx/blob/master/AST.md>

JSX 扩展了 ECMAScript [ESTree] AST 格式，具有以下节点类型：

## JSX Names

- JSXIdentifier
- JSXMemberExpression
- JSXNamespacedName

## JSX Expression Container

- JSXEmptyExpression
- JSXExpressionContainer
- JSXSpreadChild

## JSX Boundary Tags

- JSXBoundaryElement
- JSXOpeningElement
- JSXClosingElement

## JSX Attributes

- JSXAttribute
- JSXSpreadAttribute

## JSX Text

- JSXText

## JSX Elemnet

- JSXElement

## JSX Fragment

- JSXFragment
- JSXOpeningFragment
- JSXClosingFragment

## 使用 JSX AST 的工具

- babylon
- flow-parser
- typescript
- esprima
- acorn-jsx
- ast-types
