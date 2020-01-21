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


### 挂载选项 Mounting Options

