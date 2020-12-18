# DRAFT: JSX Specification

- <https://github.com/facebook/jsx>

JSX 是 ECMAScript 的一种类 XML 的语法扩展。

- 它不打算由引擎或浏览器来实现。
- 这也不是将 JSX 合并到 ECMAScript 规范本身的建议。
- 它旨在被各种预处理程序（如 transpilers 转译器）用来将这些令牌转换为标准的 ECMASrcipt 。

```jsx
// 使用 JSX 来标识一个 UI 组件：
var dropdown =
  <Dropdown>
    A dropdown list
    <Menu>
      <MenuItem>Do Something</MenuItem>
      <MenuItem>Do Something Fun!</MenuItem>
      <MenuItem>Do Something Else</MenuItem>
    </Menu>
  </Dropdown>
```

## Rationale 基本原理

## Syntax 语法

## Parser Implementations 解析器实现

## Transpilers 转译器
