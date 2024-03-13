# Vue Test Utils

Vue.js 官方单元测试实用工具库

- <https://github.com/vuejs/vue-test-utils>
- <https://vue-test-utils.vuejs.org/>
  - [Guides](https://vue-test-utils.vuejs.org/zh/guides/)
  - [API](https://vue-test-utils.vuejs.org/zh/api/)
  - [Wrapper](https://vue-test-utils.vuejs.org/zh/api/wrapper/)
  - [mount() Options](https://vue-test-utils.vuejs.org/zh/api/options.html)

## API

| 方法               | 描述                                                                                                 |
| ------------------ | ---------------------------------------------------------------------------------------------------- |
| `mount()`          | 创建一个被挂载和渲染的 Vue 组件的 Wrapper 对象并返回                                                 |
| `shallowMount()`   | 与 `mount()` 方法类似只不过是浅渲染，即只挂载当前一个组件，而不渲染子组件，同样返回其 Wrapper 对象。 |
| `render()`         | 将一个对象渲染为一个字符串并返回一个 [cheerio 包裹器][cheerio]                                       |
| `renderToString()` | 将一个组件渲染为 HTML                                                                                |
| `createLocalVue()` | 返回一个局部 Vue 的类，可添加组件、混入和安装插件而不会污染全局的 Vue 类                             |
| `createWrapper()`  | 为一个被挂载的 Vue 实例或一个 HTML 元素创建一个 Wrapper                                              |

[cheerio]: https://github.com/cheeriojs/cheerio

### 配置对象 Config

```js
import { config } from '@vue/test-utils'
```

| 配置项           | 描述                                            |
| ---------------- | ----------------------------------------------- |
| `config.stubs`   | 为组件添加默认的子组件存根                      |
| `config.mocks`   | 为组件添加额外的全局属性                        |
| `config.methods` | 为组件添加默认的方法                            |
| `config.provide` | 为组件传递用于注入的属性，参考 [provide/inject] |
| `config.silent`  | 静默日志和警告，同 [Vue.config.silent]          |

### 挂载选项 Mounting Options

```js
import { mount } from '@vue/test-utils'
import Foo from './Foo.vue'

describe('Foo.vue', () => {
  const wrapper = mount(Foo, {
    slots: {
      // 插槽
    },
    scopedSlots: {
      // 作用域插槽
    },
    stubs: {
      // 子组件存根
    },
    mocks: {
      // 伪造全局注入
    },
    provide: {
      // 依赖注入
    },
    // 局部 Vue 对象
    localVue: createLocalVue(),
    // 挂载到 DOM
    attachToDocument: false,
    attrs: {
      // vm.$attrs
    },
    propsData: {
      // vm.$props
    },
    listeners: {
      // vm.$listeners
    }
  })

  test('...', () => {
    // expcet(wrapper...).toBe(...)
  })
})
```

除了下方列出的选项， `options` 对象还可以包含任何 `new Vue ({ /* options */ })` 调用时的有效选项。

当通过 `mount()` 或 `shallowMount()` 挂载时，这些选项将会合并入组件现有的选项中。

| 选项               | 描述                                                             |
| ------------------ | ---------------------------------------------------------------- |
| `context`          | 将上下文传递给函数式组件。该选项只能用于 [函数式组件]            |
| `slots`            | 为组件提供一个 slot 内容的对象，该对象中的键名就是相应的 slot 名 |
| `scopedSlots`      | 提供一个该组件所有作用域插槽的对象。每个键对应到插槽的名字       |
| `stubs`            | 将子组件存根。可以是一个要存根的组件名的数组或对象。             |
| `mocks`            | 为实例添加额外的属性。                                           |
| `localVue`         | 通过 `createLocalVue()` 创建的一个 Vue 的本地拷贝                |
| `attachToDocument` | 当设为 `true` 时，组件在渲染时将会挂载到 DOM 上                  |
| `attrs`            | 设置组件实例的 [`$attrs`] 对象                                   |
| `propsData`        | 在组件被挂载时设置组件实例的 [`$props`]                          |
| `listeners`        | 设置组件实例的 [`$listeners`] 对象                               |
| `parentComponent`  | 用来设置被挂载组件的父级组件 [`$parent`]                         |
| `provide`          | 设置项向组件注入的属性 [provide/inject]                          |

[provide/inject]: https://cn.vuejs.org/v2/api/#provide-inject
[Vue.config.silent]: https://cn.vuejs.org/v2/api/#silent
[函数式组件]: https://cn.vuejs.org/v2/guide/render-function.html#函数式组件
[`$attrs`]: https://cn.vuejs.org/v2/api/#vm-attrs
[`$props`]: https://cn.vuejs.org/v2/api/#vm-props
[`$listeners`]: https://cn.vuejs.org/v2/api/#vm-listeners
[`$parent`]: https://cn.vuejs.org/v2/api/#vm-parent

## Wrapper

Vue Test Utils 是一个基于包裹器的 API。

| `Wrapper` 属性               | 描述                           |
| ---------------------------- | ------------------------------ |
| `vm`                         | 当前 Vue 组件实例对象          |
| `element`                    | 当前包裹器的根 DOM 节点        |
| `options`                    | 选项                           |
| `options.attachedToDocument` | 若组件渲染后被添加到文档则为真 |

| `Wrapper` 方法       | 描述                                               |
| -------------------- | -------------------------------------------------- |
| `attributes()`       | 获取当前根 DOM 节点指定属性的值                    |
| `classes()`          | 获取根 DOM 的 class 属性                           |
| `contains(selector)` | 判断是否包含指定选择器的元素或组件                 |
| `destroy()`          | 销毁当前组件实例                                   |
| `emitted()`          | 返回包含由 `wrapper.vm.$emit()` 触发的事件对象集合 |
| `emittedByOrder()`   | 返回由 `wrapper.vm.$emit()` 触发的事件对象数组     |
| `exists()`           | 断言 `Wrapper` 或 `WrapperArray` 是否存在          |
| `find(selector)`     | 返回匹配选择器的第一个元素或组件的 `Wrapper`       |
| `findAll(selector)`  | 返回匹配选择器的元素或组件的 `WrapperArray`        |
| `html()`             | 返回当前根 DOM 节点的 HTML 字符串                  |
| `is(selector)`       | 断言当前元素或组件匹配指定选择器                   |
| `isEmpty()`          | 断言当前 `Wrapper` 不包含子节点                    |
| `isVisible()`        | 断言当前 `Wrapper` 是否可见                        |
| `isVueInstance()`    | 断言当前 `Wrapper` 为 Vue 实例                     |
| `name()`             | 获取当前组件名，或元素标签名                       |
| `props()`            | 获取当前组件指定 props                             |
| `setData()`          | 设置 `wrapper.vm` 的属性                           |
| `setMethods()`       | 设置 `wrapper.vm` 的方法并强制更新                 |
| `setProps()`         | 设置 `wrapper.vm` 的 prop 并强制更新               |
| `text()`             | 获取当前 `Wrapper` 文本内容                        |

| `Wrapper` 表单操作   | 描述                                                                                   |
| -------------------- | -------------------------------------------------------------------------------------- |
| `setChecked()`       | 设置 checkbox 或 radio 类型 `<input>` 元素的 `checked` 值并更新 `v-model` 绑定的数据   |
| `setSelected()`      | 设置下拉列表选项 `<option>` 元素的 `selected` 值并更新 `v-model` 绑定的数据            |
| `setValue()`         | 设置文本框 `<input type="text">` 或下拉框 `<select>` 元素的值并更新 `v-model` 绑定数据 |
| `trigger(eventType)` | 在该 `wrapper` DOM 节点上触发一个事件                                                  |

## WrapperArray

调用 `wrapper.findAll()` 方法将返回一个包裹器数组 `WrapperArray` 对象。

| `WrapperArray` | 属性                                        |
| -------------- | ------------------------------------------- |
| `wrappers`     | 包含在 `WrapperArray` 内的 `Wrappers`       |
| `length`       | 该 `WrapperArray` 中包含的 `Wrapper` 的数量 |

| `WrapperArray`       | 方法                                            |
| -------------------- | ----------------------------------------------- |
| `at(index)`          | 返回指定索引的 `wrapper`                        |
| `filter(callback)`   | 过滤指定条件的 `wrapper`                        |
| `destroy()`          | 销毁每个 `Wrapper`                              |
| `contains(selector)` | 断言每个 `Wrapper` 都包含指定选择器             |
| `is(selector)`       | 断言每个 `Wrapper` 都匹配指定选择器             |
| `isEmpty()`          | 断言每个 `Wrapper` 都不包含子节点               |
| `isVueInstance()`    | 断言每个 `Wrapper` 都是 Vue 实例                |
| `setChecked()`       | 为每个 `Wrapper` 都执行 `setChecked()`          |
| `setData()`          | 为每个 `Wrapper` 的 `vm` 都设置数据             |
| `setMethods()`       | 为每个 `Wrapper` 的 `vm` 都设置方法并强制更新   |
| `setProps()`         | 为每个 `Wrapper` 的 `vm` 都设置 prop 并强制更新 |
| `setValue()`         | 为每个 `Wrapper` 都执行 `setValue()`            |
| `trigger()`          | 为每个 `Wrapper` DOM 节点都触发一个事件         |
