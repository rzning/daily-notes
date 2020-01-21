# Vue Test Utils

 Vue.js 官方单元测试实用工具库

- <https://github.com/vuejs/vue-test-utils>
- <https://vue-test-utils.vuejs.org/>
  - [Guides](https://vue-test-utils.vuejs.org/zh/guides/)
  - [API](https://vue-test-utils.vuejs.org/zh/api/)
  - [Wrapper](https://vue-test-utils.vuejs.org/zh/api/wrapper/)
  - [mount() Options](https://vue-test-utils.vuejs.org/zh/api/options.html)

## API

方法 | 描述
-|-
`mount()` | 创建一个被挂载和渲染的 Vue 组件的 Wrapper 对象并返回
`shallowMount()` | 与 `mount()` 方法类似只不过是浅渲染，即只挂载当前一个组件，而不渲染子组件，同样返回其 Wrapper 对象。
`render()` | 将一个对象渲染为一个字符串并返回一个 [cheerio 包裹器][cheerio]
`renderToString()` | 将一个组件渲染为 HTML
`createLocalVue()` | 返回一个局部 Vue 的类，可添加组件、混入和安装插件而不会污染全局的 Vue 类
`createWrapper()` | 为一个被挂载的 Vue 实例或一个 HTML 元素创建一个 Wrapper

[cheerio]: <https://github.com/cheeriojs/cheerio>

### 配置对象 Config

```js
import { config } from '@vue/test-utils'
```

配置项 | 描述
-|-
`config.stubs` | 为组件添加默认的子组件存根
`config.mocks` | 为组件添加额外的全局属性
`config.methods` | 为组件添加默认的方法
`config.provide` | 为组件传递用于注入的属性，参考 [provide/inject]
`config.silent` | 静默日志和警告，同 [Vue.config.silent]


### 挂载选项 Mounting Options

```js
import { mount } from '@vue/test-utils'
import Foo from './Foo.vue'

describe('')

const wrapper = mount(Foo, {

})
```

除了下方列出的选项， `options` 对象还可以包含任何 `new Vue ({ /*options here*/ })` 调用时的有效选项。

当通过 `mount()` 或 `shallowMount()` 挂载时，这些选项将会合并入组件现有的选项中。

选项 | 描述
-|-
`context` | 将上下文传递给函数式组件。该选项只能用于 [函数式组件]
`slots` | 为组件提供一个 slot 内容的对象，该对象中的键名就是相应的 slot 名
`scopedSlots` | 提供一个该组件所有作用域插槽的对象。每个键对应到插槽的名字
`stubs` | 将子组件存根。可以是一个要存根的组件名的数组或对象。
`mocks` | 为实例添加额外的属性。
`localVue` | 通过 `createLocalVue()` 创建的一个 Vue 的本地拷贝
`attachToDocument` | 当设为 `true` 时，组件在渲染时将会挂载到 DOM 上
`attrs` | 设置组件实例的 [`$attrs`] 对象
`propsData` | 在组件被挂载时设置组件实例的 [`$props`]
`listeners` | 设置组件实例的 [`$listeners`] 对象
`parentComponent` | 用来设置被挂载组件的父级组件 [`$parent`]
`provide` | 设置项向组件注入的属性 [provide/inject]

[provide/inject]: <https://cn.vuejs.org/v2/api/#provide-inject>
[Vue.config.silent]: <https://cn.vuejs.org/v2/api/#silent>
[函数式组件]: <https://cn.vuejs.org/v2/guide/render-function.html#函数式组件>
[`$attrs`]: <https://cn.vuejs.org/v2/api/#vm-attrs>
[`$props`]: <https://cn.vuejs.org/v2/api/#vm-props>
[`$listeners`]: <https://cn.vuejs.org/v2/api/#vm-listeners>
[`$parent`]: <https://cn.vuejs.org/v2/api/#vm-parent>

