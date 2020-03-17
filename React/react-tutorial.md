---
title       : React 入门教程
recorddate  : 2020-03-17
---

# Tutorial: Intro to React

- en : <https://reactjs.org/tutorial/tutorial.html>
- zh : <https://zh-hans.reactjs.org/tutorial/tutorial.html>


目标：使用 React 开发一个井字棋 ( tic-tac-toe ) 游戏。

[最终效果](https://codepen.io/gaearon/pen/gWWZgR?editors=0010)

## 搭建本地开发环境

> [Create React App 安装指南](https://zh-hans.reactjs.org/docs/create-a-new-react-app.html#create-react-app)

```
npx create-react-app my-app
```

## React 是什么？

React 是一个声明式，高效且灵活的用于构建用户界面的 JavaScript 库。

使用 React 可以将一些简短、独立的代码片段组合成复杂的 UI 界面，这些代码片段被称作组件 ( Component ) 。

下面定义的 `ShoppingList` 为 `React.Component` 的子类，它代表了一个 React 组件类：

```jsx
class ShoppingList extends React.Component {
  render() {
    return (
      <div className="shopping-list">
        <h1>Shopping List for {this.props.name}</h1>
        <ul>
          <li>Instagram</li>
          <li>WhatsApp</li>
          <li>Oculus</li>
        </ul>
      </div>
    );
  }
}

// 用法示例: <ShoppingList name="Mark" />
```

`render()` 函数返回了一个 React 元素 ( React Element ) ，这是一种对渲染内容的轻量级描述。

JSX 语法 `<div/>` 将被编译成 `React.createElement('div')` 。

> [createElement() API](https://zh-hans.reactjs.org/docs/react-api.html#createelement)

