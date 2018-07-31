# Vue.Draggable

- <https://github.com/SortableJS/Vue.Draggable>

Vue 组件（Vue.js 2.0）允许拖放，并与 View-Model 数据同步。

基于 [Sortable.js] 并提供其所有特性。

---

## Installation

```bash
> npm install vuedraggable
```

For Modules:

```js
import draggable from 'vuedraggable'

export default {
  components: {
    draggable,
    ...
  }
  ...
}

// or
var draggable = require('vuedraggable')
```

For Browser:

```html
<script src="//cdnjs.cloudflare.com/ajax/libs/vue/2.5.2/vue.min.js"></script>
<script src="//cdn.jsdelivr.net/npm/sortablejs@1.7.0/Sortable.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/Vue.Draggable/2.16.0/vuedraggable.min.js"></script>
```

## Usage

```vue
<template>
  <div class="container">
    <draggable v-model="myArray" :options="dragOptions" @start="drag=true" @end="drag=false">
      <transition-group>
        <div v-for="item in myArray" :key="item.id">
          {{item.name}}
        </div>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  components: {
    draggable
  },
  data () {
    return {
      myArray: [ ... ]
    }
  },
  computed: {
    dragOptions () {
      return {
        animation: 0,
        ...
      }
    }
  }
  methods: {
  
  }
}
</script>

```

## Props

```js
{
  /**
   * 存放可拖放组件的数组。代表与通过内部元素 v-for 指令引用的数组相同。
   * 这是使用的首选方式，因为它与 Vuex 兼容。
   * 它不应该直接使用，除了 v-model 指令。
   */
  value: {
    type: Array,
    required: false,
    default: null
  },
  /**
   * 替代 `value` prop，一个与拖放同步的数组。
   * 主要的区别在于，`list` prop 是通过拼接的方法更新的，而 `value` 是不可变的。
   * 不可与 `value` prop 同时使用。
   */
  list: {
    type: Array,
    required: false,
    default: null
  },
  /**
   * 用于初始化 sortable 对象的配置项
   */
  options: {
    type: Object,
    required: false
  },

  noTransitionOnDrag: {
    type: Boolean,
    default: false
  },
  clone: {
    type: Function,
    default: function _default(original) {
      return original;
    }
  },
  element: {
    type: String,
    default: 'div'
  },
  move: {
    type: Function,
    default: null
  },
  componentData: {
    type: Object,
    required: false,
    default: null
  }
}
```

> [ sortable option documentation](https://github.com/RubaXa/Sortable#options)



[Sortable.js]: <https://github.com/RubaXa/Sortable>
