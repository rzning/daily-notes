---
title: Vue Class Component
recorddate: 2020-02-18
repository: https://github.com/vuejs/vue-class-component
website: https://class-component.vuejs.org/
---

## Overview

Vue Class Component 定义了类风格 Vue Component 的 ECMAScript / TypeScript 装饰器 ( Decorator )

- 可以使用 `@Component` 装饰器为 Class 添加注解，使你能用 Class 语法来定义 Vue 组件
- `mixins()` 方法用于 Vue 组件的混入
- `createDecorator()` 方法用于创建自定义装饰器

## Installation

安装 NPM 包：

```sh
yarn add vue vue-class-component
```

环境配置：

> 要使用 Vue 类组件，你需要在项目中配置 TypeScript 或 Babel
>
> 因为它依赖于 **ECMAScript 阶段 1 装饰器** 需要转换才能在浏览器运行。
>
> [ECMAScript stage 1 decorators](https://github.com/wycats/javascript-decorators)
>
> 它不支持阶段 2 的装饰器，因为目前 Typecript Transpiler 仅支持旧的装饰器规范

TypeScript 环境，在 `tsconfig.json` 中启用 `experimentalDecorators` 选项：

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "es2015",
    "moduleResolution": "node",
    "strict": true,
    "experimentalDecorators": true
  }
}
```

Babel 环境需要安装下面两个包开发依赖，并且在 `.babelrc` 文件中配置插件：

- `@babel/plugin-proposal-decorators`
- `@babel/plugin-proposal-class-properties`

```json
{
  "plugins": [
    ["@babel/proposal-decorators", { "legacy": true }],
    ["@babel/proposal-class-properties", { "loose": true }]
  ]
}
```

### CDN

[UNPKG](https://unpkg.com/) 提供基于 NPM 的 CDN 链接：

- <https://unpkg.com/vue-class-component@latest>
  - `/dist/vue-class-component.js` - UMD build
  - `/dist/vue-class-component.min.js` - UMD minified build
  - `/dist/vue-class-component.esm.browser.js` - ES Module build for browsers
  - `/dist/vue-class-component.esm.browser.min.js` - ES Module minified build
  - `/dist/vue-class-component.esm.js` - ES Module for bundlers
  - `/dist/vue-class-component.common.js` - CommonJS

## Guide

### Class Component

`@Component` 装饰器使你的类成为一个 Vue 组件：

| Vue Component | Class                              |
| ------------- | ---------------------------------- |
| `data`        | 对应于类属性                       |
| `methods`     | 直接声明为类原型方法               |
| `computed`    | 类 getter / setter 属性            |
| Hooks         | `data()` , `render()`              |
| Other         | 通过装饰器函数 `@Component()` 传递 |

```js
import Vue from 'vue'
import Component from 'vue-class-component'
import OtherComponent from './OtherComponent.vue'

@Component({
  // 指定组件其他选项
  components: {
    OtherComponent
  }
})
export default class HelloWorld extends Vue {
  // 声明组件数据 data
  firstName = 'Oliver'
  lastName = 'Queen'

  // 若属性值为 `undefined` 则为非相应式的
  message = undefined
  // 为避免这种情况，可以取 `null` 值，或使用 `data()` 钩子
  notes = null

  data() {
    return {
      // 这里是响应式的
      title: undefined
    }
  }

  // 声明计算属性
  get name() {
    return `${this.firstName} ${this.lastName}`
  }
  set name(value) {
    const [first, last] = value.split(' ')
    this.firstName = first
    this.lastName = last || ''
  }

  // 声明组件普通方法 methods
  hello() {
    console.log('hello world!')
  }

  // 声明生命周期钩子 Hooks
  mounted() {
    console.log('mounted.')
  }

  // 声明渲染函数
  render() {
    return <OtherComponent title={this.title} />
  }
}
```

### Built-in Hook Methods

- `data()`
- `beforeCreate()`
- `created()`
- `beforeMount()`
- `mounted()`
- `beforeDestroy()`
- `destroyed()`
- `beforeUpdate()`
- `updated()`
- `activated()`
- `deactivated()`
- `render()`
- `errorCaptured()`
- `serverPrefetch()`

### Additional Hooks

通过 `Component.registerHooks()` 方法注册额外的钩子：

```js
import Vue from 'vue'
import Component from 'vue-class-component'

Component.registerHooks([
  // 注册 vue-router 钩子方法
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate'
])

@Component
export default class HomePage extends Vue {
  // 使用额外注册的钩子方法
  beforeRouteEnter(to, from, next) {
    console.log('before router enter.')
    next()
  }
}
```

### Custom Decorators

使用 `createDecorator()` 方法创建自定义装饰器。

```ts
import Vue, { ComponentOptions } from 'vue'

/**
 * 装饰器函数
 */
interface VueDecorator {
  // Class decorator
  (Ctor: typeof Vue): void
  // Property decorator
  (target: Vue, key: string): void
  // Parameter decorator
  (target: Vue, key: string, index: number): void
}

/**
 * 创建装饰器的工厂方法
 */
interface CreateDecoratorFactory {
  /**
   * @param options Vue 组件配置对象，此对象的更改将影响所提供的组件
   * @param key 此装饰器修饰的属性或方法名
   * @param index 若此装饰器用于参数，则为装饰参数的索引 parameterIndex
   */
  (options: ComponentOptions<Vue>, key: string, index: number): void
}

/**
 * 创建自定义装饰器
 * @param {function} factory 一个工厂函数
 * @returns {function} 一个装饰器函数
 */
function createDecorator(factory: CreateDecoratorFactory): VueDecorator {
  return (target: Vue | typeof Vue, key?: any, index?: any) => {
    // ...
  }
}
```

下面例子创建的 `Log` 装饰器用于打印一些日志消息：

```js
// decorators.js
import { createDecorator } from 'vue-class-component'

export const Log = createDecorator((options, key) => {
  // 所修饰的方法
  const originalMethod = options.methods[key]
  // 覆盖此方法，并添加逻辑
  options.methods[key] = function wrapperMethod(...args) {
    // 打印日志
    console.log(`Invoked: ${key}(`, ...args, `)`)
    // 调用原始方法
    originalMethod.apply(this, args)
  }
})
```

```js
import Vue from 'vue'
import Component from 'vue-class-component'
import { Log } from './decorators'

@Component
class MyComp extends Vue {
  // 使用自定义装饰器 Log
  @Log
  hello(value) {
    // ...
  }

  test() {
    // 控制台将打印 `Invoked: hello( world )`
    this.hello('world')
  }
}
```
