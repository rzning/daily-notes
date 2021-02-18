# Type React With Flow

- <https://flow.org/en/docs/react/>

## 1. Setup Flow with React

Flow 和 Babel 可以很好地结合在一起，因此对于已经使用 Babel 的 React 用户来说，采用 Flow 并不费事。

> 如果你需要在 Babel 中配置 Flow 可以参考：
> - <https://flow.org/en/docs/tools/babel/>

Flow 在 Create React App 中可以开箱即用，只需安装 Flow 并创建一个 `.flowconfig` 配置文件即可：

- <https://flow.org/en/docs/tools/create-react-app/>

```sh
yarn add --dev flow-bin
yarn run flow init
```

## 2. React Runtimes

Flow 支持 `@babel/plugin-transform-react-jsx` 运行时选项，以便在不显式导入 React 命名空间的情况下使用 JSX 。

如果你正在使用新的自动运行时 ( Automatic Runtime ) ，
你需要在 `.flowconfig` 文件中配置此选项，以便 Flow 知道自动导入 `jsx` 。

```ini
[options]
react.runtime=automatic
```

## 3. Components

### 3.1 Class Components

使用 `propType` 类型检查的组件：

```js
import { Component } from 'react'
import PropTypes from 'prop-types'

class MyComponent extends Component {

  static propTypes = {
    foo: PropTypes.number.isRequired,
    bar: PropTypes.string
  }

  render() {
    return <div>{this.props.bar}</div>
  }
}
```

改用 Flow 实现：

```js
// @flow

import { Component } from 'react'

type Props = {
  foo: number,
  bar?: string
}

class MyComponent extends Component<Props> {

  render() {
    return <div>{this.props.bar}</div>
  }
}

<MyComponent foo={28} />
```

> 如果你不需要再次使用 `Props` 类型，你也可以使用内联方式定义：
>
> ```js
> class MyComponent extends Component<{foo: number, bar?: string}> { ... }
> ```

`React.Component<Props, State>` 是一个带有两个参数的泛型类型 ( Generic Type ) ，第二个类型参数 `State` 是可选的。

添加 `State` 类型参数：

```js
// @flow

import * as React from 'react'

type Props = { /* ... */ }

type State = {
  count: number
}

class MyComponent extends React.Component<Props, State> {
  state = {
    count: 0
  }

  componentDidMount() {
    setInterval(() => {
      this.setState((prevState) => ({
        count: prevState.count + 1
      }))
    }, 1000)
  }

  render() {
    return <div>Count: {this.state.count}</div>
  }
}

<MyComponent />
```
添加静态 `defaultProps` 属性：

```js
// @flow

import * as React from 'react'

type Props = {
  foo: number,
  bar: string
}

class MyComponent extends React.Component<Props> {
  static defaultProps = {
    foo: 42
  }

  render() {
    return <div>{this.props.foo}</div>
  }
}

<MyComponent bar={'abc'} />
```

### 3.2 Stateless Functional Components

给无状态函数组件添加静态类型检查：

```js
// @flow

import * as React from 'react'

type Props = {
  foo: number,
  bar?: string
}

function MyComponent(props: Props) {
  return <div>{props.foo}</div>
}

MyComponent.defaultProps = {
  foo: 42
}

<MyComponent />
```

## 4. Event Handling

如果你正在使用 Flow ，我们建议你使用属性初始化器 ( [property initializer] ) 语法，因为它是最简单的静态类型。

[property initializer]: <https://babeljs.io/docs/plugins/transform-class-properties>

属性初始化器语法如下所示：

```js
class MyComponent extends React.Component<{}> {
  handleClick = evnet => { /* ... */ }
}
```

定义事件处理方法类型，你可以使用 `SyntheticEvent<T>` 合成事件类型，例如：

```js
// @flow

import * as React from 'react'

class MyComponent extends React.Component<{}, { count: number }> {
  handleClick = (event: SyntheticEvent<HTMLButtonElement>) => {
    // 使用 `event.currentTarget` 访问按钮实例
    ;(event.currentTarget: HTMLButtonElement)

    this.setState((prevState) => ({
      count: prevState.count + 1
    }))
  }

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.handleClick}>Increment</button>
      </div>
    )
  }
}
```

`SyntheticEvent<T>` 的类型参数表示事件处理程序所在的 HTML 元素的类型。

> React 使用自己的事件系统，因此使用 `SyntheticEvent` 类型来代替 DOM 事件类型是很重要的。

React 提供的 `SyntheticEvent<T>` 类型如下：

合成事件类型 | DOM 事件
-|-
`SyntheticEvent<T>` | Event
`SyntheticAnimationEvent<T>` | AnimationEvent
`SyntheticCompositionEvent<T>` | CompositionEvent
`SyntheticInputEvent<T>` | InputEvent
`SyntheticUIEvent<T>` | UIEvent
`SyntheticFocusEvent<T>` | FocusEvent
`SyntheticKeyboardEvent<T>` | KeyboardEvent
`SyntheticMouseEvent<T>` | MouseEvent
`SyntheticDragEvent<T>` | DragEvent
`SyntheticWheelEvent<T>` | WheelEvent
`SyntheticTouchEvent<T>` | TouchEvent
`SyntheticTransitionEvent<T>` | TransitionEvent


## 5. ref functions

## 6. Children

## 7. Higher-order Components

## 8. Context

## 9. Redux

## 10.Type Reference
