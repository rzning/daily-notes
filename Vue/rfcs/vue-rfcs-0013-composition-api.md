---
title       : Vuejs Composition API
recorddate  : 2020-03-25
---

# Vuejs RFCs Composition API

[Vuejs-RFC-0013-composition-api][rfc-0013]

[rfc-0013]: <https://github.com/vuejs/rfcs/blob/master/active-rfcs/0013-composition-api.md>

适用版本： 2.x / 3.x

> 由于此 RFC 很长，所以另在独立页面部署：
>
> - Vue Composition API [RFC](https://vue-composition-api-rfc.netlify.com/)
> - [API Reference](https://vue-composition-api-rfc.netlify.com/api/)

## 🧭 摘要

介绍 Composition API ：包含一组可添加的、基于函数的 API，允许灵活地组合组件逻辑。

## 🌱 基本示例

```vue
<template>
  <button @click="increment">
    Count is: {{ state.count }}, double is: {{ state.double }}
  </button>
</template>

<script>
import { reactive, computed } from 'vue'

export default {
  setup() {
    const state = reactive({
      count: 0,
      double: computed(() => state.count * 2)
    })

    function increment() {
      state.count++
    }

    return {
      state,
      increment
    }
  }
}
</script>
```

## 🍃 动机

### 🔸 逻辑复用和代码组织

现在将代码组织为每个函数都执行特定的功能，而不必总是通过选项来组织代码。

新的 API 还使得在组件之间提取和重用逻辑变得更加简单。

### 🔸 更好的类型推断

新 API 大多使用的是普通的变量和函数，它们自然是类型友好的。

使用新 API 编写的代码可以享受完整的类型推断，几乎不需要手动类型提示。

使用新 API 编写的 TypeScript 代码与通过 JavaScript 编写的看起来几乎相同。

因此，即使是使用 JavaScript 的用户也可以获得更好的 IDE 支持。

## 📜 详细设计

> - API 简介
> - 代码组织
> - 逻辑提取和重用
> - 与现有 API 一起使用
> - 插件开发

### 1️⃣ API 简介

这里提出的 API 并没有引入新的概念，而是更多地将 Vue 的核心功能公开为独立功能。

🔹 **Reactive State and Side Effects** 响应状态和副作用

```js
import { reactive } from 'vue'

const state = reactive({ count: 0 })
```

`reactive()` 与 2.x 版本中的 `Vue.observable()` 方法等效，
重命名是为了避免与 RxJS 的可观察对象 ( Observables ) 混淆。

上例返回的 `state` 为 Vue 用户应该熟悉的可反应对象。

Vue 中可反应状态的基本用例是我们可以在渲染期间使用它。
由于依赖项跟踪，视图在响应状态更改时自动更新。

在 DOM 中渲染一些东西被认为是副作用 ( Side Effect ) 的：
我们的程序正在修改程序本身 ( DOM ) 外部的状态。

要应用并根据反应状态自动重新应用副作用，我们可以使用 `watchEffect()` API ：

```js
import { reactive, watchEffect } from 'vue'

const state = reactive({ count: 0 })

watchEffect(() => {
  document.body.innerHTML = `count is ${state.count}`
})
```

`watchEffect()` 方法的参数期望是一个具有可实现所需副作用的函数，在上例中设置了 `innerHTML` 值。

`watchEffect()` 会立即执行该函数，并跟踪其在执行期间作为依赖项使用的所有可反应状态属性。

上例中的 `state.count` 在初始执行后，将作为此监视程序的依赖项进行跟踪。
当 `state.count` 在将来的某个时候发生变化时，内部函数将再次执行。

这正是 Vue 可反应体系的精髓。当你从组件中的 `data()` 返回一个对象时，它在内部被 `reactive()` 处理为可响应的。

Vue 模板被编译为使用了这些可反应属性的渲染函数，可以认为它是一个更高效的 `innerHTML` 。

> `watchEffect()` 与 2.x 版本中的 `watch` 选项类似，但它不需要将所观察的数据源和副作用回调分离。
>
> Composition API 还提供了 `watch()` 函数，实现与 2.x 中 `watch` 选项相同功能。

继续上面例子，让我们来处理用户的输入操作：

```js
function increment() { state.count++ }

document.body.addEventListener('click', increment)
```

下面让我们用一个假设的 `renderTemplate()` 方法来简化示例，这样我们就可以专注于响应性方面：

```js
import { reactive, watchEffect } from 'vue'

const state = reactive({ count: 0 })

function increment() { state.count++ }

const renderContext = {
  state,
  increment
}

watchEffect(() => {
  // 假设的内部代码，不是实际的 API
  renderTemplate(
    `<button @click="increment">{{ state.count }}</button>`,
    renderContext
  )
})
```

🔹 **Computed State and Refs** 计算状态和引用

有时我们需要依赖于其他状态的状态 - 在 Vue 中是通过计算属性 ( Computed Properties ) 来处理的。

要创建一个计算值，我们可以直接使用 `computed()` API ：

```js
import { reactive, computed } from 'vue'

const state = reactive({ count: 0 })

const double = computed(() => state.count * 2)
```

`computed()` 函数返回的是什么？若猜测 `computed()` 的内部实现，我们可能会想到以下内容：

```js
// 简化的伪代码
function computed(getter) {
  let value
  watchEffect(() => {
    value = getter()
  })
  return value
}
```

但我们知道这是行不通的，如果 `value` 是类似于 `number` 的基本类型，
一旦返回，则它与内部 `computed()` 的更新逻辑的连接将丢失。
这是因为 JS 基本类型是通过值而不是通过引用传递的。

将值作为属性分配给对象时，也会出现相同的问题。
如果一个响应性值作为属性分配或从函数返回时不能保持其响应性。
为了确保我们始终可以读取计算的最新值，我们需要将实际值包装在一个对象中，然后返回该对象：

```js
// 简化的伪代码
function computed(getter) {
  const ref = {
    value: null
  }
  watchEffect(() => {
    ref.value = getter()
  })
  return ref
}
```

此外，我们还需要拦截对对象的 `.value` 属性的读/写操作，以执行依赖项跟踪和更改通知。
现在我们可以通过引用传递计算值，而不必担心失去响应性。
代价是，我们现在需要通过 `.value` 来获取最新的值：

```js
const double = computed(() => state.count * 2)

watchEffect(() => {
  console.log(double.value)
}) // -> 0

state.count++ // -> 2
```

上例的 `double` 是一个我们称为 `ref` 的对象，因为它是对它所持有的内部值的响应式引用。

- ref 对象有一个指向内部值的单一属性 `.value`

使用 Composition API 时，响应式引用和模板引用的概念是统一的。

> [Template Refs - Vue Composition API](https://composition-api.vuejs.org/api.html#template-refs)

为了获得对模板中元素或组件实例的引用，我们可以像往常一样声明 `ref` 并从 `setup()` 中返回：

```vue
<template>
  <div ref="root"></div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  setup() {
    const root = ref(null)

    onMounted(() => {
      // 初始渲染后 DOM 元素将被分配给 ref
      console.log(root.value) // <div/>
    })

    return { root }
  }
}
</script>
```

除了计算引用之外，我们还可以使用 `ref()` API 直接创建普通的可变引用：

```js
const count = ref(0)
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
```

🔹 **Ref Unwrapping** 引用（Ref）展开

我们可以将 ref 公开为渲染上下文的属性。

在内部，Vue 将对 refs 进行特殊处理，这样当在渲染上下文中遇到 ref 时，该上下文直接暴露其内部值。

这意味着在模板中，我们可以直接写 `{{count}}` 而不是 `{{count.value}}` 。

下面是同一个的计数器示例的另一个版本，其使用了 `ref` 来替换 `reactive` ：

```js
import { ref, watchEffect } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}

const renderContext = {
  count,
  increment
}

watchEffect(() => {
  renderTemplate(
    `<button @click="increment">{{ count }}</button>`,
    renderContext
  )
})
```

此外，当 ref 作为一个属性嵌套在一个反应性对象下时，它也会在访问时自动展开：

```js
const state = reactive({
  count: 0,
  double: computed(() => state.count * 2)
})

// 不必使用 `state.double.value`
console.log(state.double)
```

🔹 **Usage in Components** 在组件中使用

到目前为止，我们的代码已经提供了可以根据用户输入进行更新的工作 UI，但是该代码仅运行一次且不可重用。

如果我们想重用逻辑，那么合理的下一步似乎是将其重构为一个函数：

```js
import { reactive, computed, watchEffect } from 'vue'

function setup() {
  const state = reactive({
    count: 0,
    double: computed(() => state.count * 2)
  })

  function increment() {
    state.count++
  }

  return {
    state,
    increment
  }
}

const renderContext = setup()

watchEffect(() => {
  renderTemplate(
    `<button @click="increment">
      Count is: {{ state.count }}, double is: {{ state.double }}
    </button>`,
    renderContext
  )
})
```

> 注意，上面的代码并不依赖于组件实例的存在。
>
> 实际上，到目前为止介绍的 API 都可以在组件上下文之外使用，
> 这使我们能够在更广泛的场景中利用 Vue 的反应性系统 ( reactivity system ) 。

现在，如果我们把【调用 `setup()` 、创建监视器、以及将模板渲染到框架】的任务放在一边，
我们就可以仅使用 `setup()` 函数和模板来定义一个组件：

```vue
<template>
  <button @click="increment">
    Count is: {{ state.count }}, double is: {{ state.double }}
  </button>
</template>

<script>
import { reactive, computed } from 'vue'

export default {
  setup() {
    const state = reactive({
      count: 0,
      double: computed(() => state.count * 2)
    })

    function increment() {
      state.count++
    }

    return {
      state,
      increment
    }
  }
}
</script>
```

🔹 **Lifecycle Hooks** 生命周期钩子

我们知道可以使用 `watchEffect()` 和 `watch` APIs 来应用基于状态变化的副作用。

至于在不同的生命周期钩子中执行副作用，我们可以使用专用的 `onXXX` APIs （直接反映了现有的生命周期选项）：

```js
import { onMounted } from 'vue'

export default {
  setup() {
    onMounted(() => {
      console.log('component is mounted!')
    })
  }
}
```

这些生命周期注册方法只能在 `setup()` 钩子调用当中使用。

因为它们依赖于内部全局状态来定位当前活动实例。

在没有当前活动实例的情况下调用它们将导致错误。

它会自动推算出，使用内部全局状态调用 `setup()` 钩子的当前实例。

这样设计是为了减少将逻辑提取到外部函数时的摩擦。
