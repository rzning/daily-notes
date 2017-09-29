# React.Component

## The Component Lifecycle

组件的生命周期存在三个处理阶段：

- [`Mounting`](#mounting) : 装载阶段
- [`Updating`](#updating) : 更新阶段
- [`Unmounting`](#unmounting) : 卸载阶段

组件生命周期的每个处理阶段都提供了相应的事件回调，方便对组件的控制。

- #### Mounting
  > 当组件实例被创建并将其插入 DOM 时，这些方法将被调用：
  - `constructor()`
  - `componentWillMount()`
  - `render()`
  - `componentDidMount()`

- #### Updating
  > 改变 props 或 state 可以触发更新事件。 在重新渲染组件时，这些方法将被调用：
  - `componentWillReceiveProps(nextProps)`
  - `shouldComponentUpdate(nextProps, nextState)`
  - `componentWillUpdate(nextProps, nextState)`
  - `render()`
  - `componentDidUpdate(prevProps, prevState)`

- #### Unmounting
  > 当一个组件从 DOM 中删除时，这个方法将被调用：
  - `componentWillUnmount()`

### Example

```jsx
class myComponent extends React.Component {

    constructor(props) {
        super(props);
        // 构造方法，组件被装载（mounted）前被调用。
        // 通常在此方法内初始化 state 如果有必要，可以根据 props 来初始化 state
        this.state = {
            color: props.initialColor
        };
    }
    
    componentWillMount() {
        // 在组件装载（mounting）发生之前被立即调用。
        // 此方法在 render() 之前调用，因此在此方法中 setState() 不会触发重新渲染。
    }
    
    componentDidMount() {
        // 在组件装载（mounting）后被立即调用。
        // 通常在此处初始化 DOM 节点。
        // 若需要从远程端加载数据，此处是实例化网络请求的好地方。
        // 此方法中 setState() 将触发重新渲染。
    }
    
    componentWillReceiveProps(nextProps) {
        // 在已装载组件接收新 props 之前被调用。
        // 若需要更新 state 以响应 props 的更改，
        // 可以在此处比较 this.props 和 nextProps 并使用 this.setState() 执行状态转换。
    }
    
    shouldComponentUpdate(nextProps, nextState) {
        // 在组件接收到新的 props 或 state 更新之前被调用。
        // 默认返回 true 触发重新渲染，若返回 false 则会阻止组件更新。
        // 对于初始渲染或使用 forceUpdate() 更新时，不会触发此方法的调用。
        // 此处可以比较 this.props 与 nextProps 以及 this.state 与 nextSate 并返回 false 以跳过此次更新。
    }
    
    componentWillUpdate(nextProps, nextState) {
        // 在组件接收到新的 props 或 state 渲染之前被立即调用。
        // 此方法在第一次渲染时不会被调用。
        // 若 shouldComponentUpdate() 返回 false 则此方法不会被调用。
        // 在此处不能调用 setStete() 方法，
        // 若需要更新 state 以响应 props 更改，请在 componentWillReceiveProps() 方法内进行。
    }

    componentDidUpdate(prevProps, prevState) {
        // 在组件更新后被立即调用。
        // 此方法在第一次渲染时不会被调用。
        // 在此处也可做一些网络请求等操作。
    }
    
    componentWillUnmount() {
        // 在组件被卸载（unmounted）和销毁（destroyed）之前被立即调用。
        // 通常在此处执行一些必要清理，如取消计时器、取消网络请求，
        // 或清理在 componentDidMount() 方法中创建的 DOM 元素。
    }
    
    render() {
        // 此方法是必须的。当被调用时，将检查 `this.props` 和 `this.state` 并返回一个单独的 React 元素。
        // 此方法可以返回一个原生 DOM 元素组件，或另一个复合组件。
        // 此方法可以返回 null 或 false 来表示不需要渲染任何东西。
        // 此方法应该是一个纯函数，即在此不能修改组件的状态，每次调用时都返回相同的结果。
        return <div/>;
    }
}
```

### Reference

- [React.Component - React](https://facebook.github.io/react/docs/react-component.html)
- [React.Component - React 中文文档](http://www.css88.com/react/docs/react-component.html)
