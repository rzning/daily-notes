---
title: Vuejs Reader Function API Change
recorddate: 2020-03-22
---

# Vuejs RFCs 渲染函数 API 更改

[Vuejs-RFC-0008-render-function-api-change][rfc-0008]

[rfc-0008]: https://github.com/vuejs/rfcs/blob/master/active-rfcs/0008-render-function-api-change.md

适用版本： 3.x

## 摘要

- 函数 `h` 改为全局引入，如不是通过渲染函数的参数传递。

  - `h()` 函数相当于之前的 `createElement()` 方法

- 渲染函数的参数已经更改，并保持有状态组件和函数式组件的一致性。

- `VNode` 现在具有扁平的 Props 数据结构。

## 基本示例

```js
import { h } from 'vue'

export default {
  render() {
    return h(
      'div',
      {
        id: 'app',
        onClick() {
          console.log('hello')
        }
      },
      [h('span', 'child')]
    )
  }
}
```

## 2.x 中的渲染函数

> [渲染函数 - Vuejs 2.x](https://cn.vuejs.org/v2/guide/render-function.html)

- `reader: (createElement: () => VNode) => VNode`

渲染函数 `reader()` 接收一个 `createElement()` 方法作为第一个参数来创建一个虚拟 DOM 节点 `VNode` 并返回。

```ts
interface VNodeData {
  /**  HTML 标签 class 属性 */
  class?: any
  /** HTML 标签 style 属性 */
  style?: string | object[] | object
  /** 组件传参 */
  props?: { [key: string]: any }
  /** 普通 HTML 属性 */
  attrs?: { [key: string]: any }
  /** DOM 属性 */
  domProps?: { [key: string]: any }
  /** 监听的事件 */
  on?: { [key: string]: Function | Function[] }
  /** 仅适用于组件，用于监听原生 DOM 事件 */
  nativeOn?: { [key: string]: Function | Function[] }
  /** 组件过渡属性 */
  transition?: object
  /** 是否显示 */
  show?: boolean
  /** 自定义指令 */
  directives?: VNodeDirective[]
  /** 是否缓存 */
  keepAlive?: boolean
  /** 基于 key 排列元素顺序 */
  key?: string | number
  /** 用于标记往哪个具名插槽中插入子组件内容 */
  slot?: string
  /** 作用域插槽 */
  scopedSlots?: { [key: string]: ScopedSlot | undefined }
  /** 注册引用信息，可通过父组件的 $refs 属性访问 */
  ref?: string
  /** 是否有相同的 ref 名 */
  refInFor?: boolean
}

type Tag = string | Component | AsyncComponent | (() => Component)

interface CreateElement {
  (tag: Tag, children?: VNodeChildren): VNode
  (tag: Tag, data?: VNodeData, children?: VNodeChildren): VNode
}
```

`createElement()` 使用示例：

```js
createElement(
  // 标签名或组件配置对象
  'div',
  // 属性数据对象
  {
    class: {
      enable: false,
      center: true
    },
    style: {
      color: 'blue',
      fontSize: '14px'
    },
    attrs: {
      id: 'foo'
    },
    props: {
      title: 'Title'
    },
    domProps: {
      innerHTML: 'text'
    },
    on: {
      click: this.clickHandler
    },
    directives: [
      {
        name: 'my-custom-directive',
        value: '2',
        expression: '1 + 1',
        arg: 'foo',
        modifiers: {
          bar: true
        }
      }
    ],
    slot: 'name-of-slot',
    key: 'myKey',
    ref: 'myRef'
  },
  // 子虚拟节点
  [
    'Some Text',
    createElement('h1', 'A headline'),
    createElement(MyComponent, {
      props: {
        name: 'mycomp'
      }
    })
  ]
)
```

## 详细设计

通过全局引入 `h` 函数：

```js
import { h } from 'vue'

export default {
  render() {
    return h('div')
  }
}
```

`render()` 函数将不在接收任何参数，对于手动渲染函数，建议从 `setup()` 函数中返回：

```js
import { h, reactive } from 'vue'

export default {
  setup(props, { slots, attrs, emit }) {
    const state = reactive({
      count: 0
    })

    function increment() {
      state.count++
    }

    // return the render function
    return () => {
      return h(
        'div',
        {
          onClick: increment
        },
        state.count
      )
    }
  }
}
```

> 有关 `setup()` 工作原理的详细信息，可参阅 [Composition API RFC](https://vue-composition-api-rfc.netlify.com/api.html#setup)

函数组件的渲染函数与有状态组件具有相同签名：

```js
const FunctionComp = (props, { slots, attrs, emit }) => {
  //...
}
```

- 新的参数列表应该能够完全替换当前的函数式渲染上下文：
  - `props` 和 `slots` 具有等效值
  - 不在需要 `data` 和 `children` ，只需使用 `props` 和 `slots`
  - `listeners` 将包含在 `attrs` 中
  - 使用新的 `inject` API 替换 `injections`
    - 参考 [Composition API](https://vue-composition-api-rfc.netlify.com/api.html#provide-inject) 相关部分
  - `parent` 访问将被删除，应该首选 props 和 inject

扁平的 VNode Props 格式：

```js
// before
{
  class: ['foo', 'bar'],
  style: { color: 'red' },
  attrs: {
    id: 'foo'
  },
  domProps: {
    innerHTML: ''
  },
  on: {
    click: foo
  },
  key: 'foo'
}

// after
{
  class: ['foo', 'bar'],
  style: { color: 'red' },
  id: 'foo',
  innerHTML: '',
  onClick: foo,
  key: 'foo'
}
```

- 在扁平化的结构中 VNode 的 Props 使用以下规则进行处理:
  - 保留 `key` 和 `ref`
  - `class` 和 `style` 与 2.x 中的 API 相同
  - 以 `on` 开头的 Props 被处理为 `v-on` 绑定
    - `on` 之后的所有内容将转换为全小写的事件名
  - 如果该键名作为属性存在于 DOM 节点上，则将其设置为 DOM 属性，否则将其设置为属性
  - 特殊的 `key` 和 `ref` 保留

由于扁平化结构，组件内的 `$attrs` 将包含所有没有显式声明的原始 Props ，
包括 `class` , `style` , `onXXX` 监听器 , `vnodeXXX` 钩子

这使得编写包装器组件 ( Wrapper Components ) 变得更加容易，只需简单的通过
`v-bind="$attrs"` 传递即可。
