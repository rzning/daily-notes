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
   * 注意，所以以 on 开头的方法都将被忽略，因为可拖动组件通过事件公开相同的 API。
   * 例如，可以使用 :options="{handle:'.handle'}" 来添加一个拖动句柄。
   */
  options: {
    type: Object,
    required: false
  },
  /**
   * 可拖动组件元素的 HTML 节点类型，为包含的槽（slot）创建的外部元素。
   * 也可以将 vue 组件的名称作为元素传递。在这种情况下，可拖动属性将被传递给创建的组件。
   */
  element: {
    type: String,
    default: 'div'
  },
  /**
   * 当克隆选项为真时，函数调用源组件来克隆元素。
   * 唯一的参数是要克隆的 viewModel 元素，返回的值是它的克隆版本。
   * 默认框架将重用这个 viewModel 元素，所以如果你想克隆或深度克隆它，你必须使用这个钩子。
   */
  clone: {
    type: Function,
    default: function _default(original) {
      return original;
    }
  },
  /**
   * 若此方法非空，将以类似于 Sortable onMove callback 的方式调用。
   * 返回 false 将取消拖动操作。
   */
  move: {
    type: Function,
    default: null
  },
  /**
   * 用来将额外的信息传递给由 `element` props 声明的子组件。
   * Value:
   * - props: 将被传递给子组件的 props
   * - on: 要在子组件中订阅的事件
   */
  componentData: {
    type: Object,
    required: false,
    default: null
  },
  /**
   * 使能拖放无过渡效果
   */
  noTransitionOnDrag: {
    type: Boolean,
    default: false
  }
}
```

### props `options`:

- 参考：[ sortable option documentation](https://github.com/RubaXa/Sortable#options)

### props `move`:

```
function onMoveCallback(evt, originalEvent) {
  ...
  // return false; -- for cancel
}
```

`evt` 对象具有和 [Sortable onMove event](https://github.com/RubaXa/Sortable#move-event-object)
相同的属性，和下面附加属性：

- `draggedContext`: 与拖动元素相关的上下文
  - `index`: 被拖动元素的索引
  - `element`: 被拖动元素的底层视图模型元素
  - `futureIndex`: 被拖动的元素的潜在索引，若拖放操作被接受
- `relatedContext`: 与当前拖动操作相关联的上下文
  - `index`: 目标元素索引
  - `element`: 目标元素视图模型元素
  - `list`: 目标列表
  - `component`: 目标 Vue 组件

### props `componentData`:

示例：

```vue
<draggable element="el-collapse" :list="list" :component-data="getComponentData()">
  <el-collapse-item v-for="item in list"
    :title="item.title" :name="item.name" :key="item.name">
    <div>
      {{item.description}}
    </div>
   </el-collapse-item>
</draggable>
```

```js
methods: {
  handleChange() {
    console.log('changed')
  },
  inputChanged(value) {
    this.activeNames = value
  },
  getComponentData() {
    return: {
      on: {
        change: this.handleChange,
        input: this.inputChanged
      },
      props: {
        value: this.activeNames
      }
    }
  }
}
```

## Event

### 支持的 Sortable 事件

- `start`, `add`, `remove`, `update`, `end`, `choose`, `sort`, `filter`, `clone`

每当事件（如： `onStart`）被 Sortable 以相同的参数触发时，就会调用这些事件。

注意 SortableJS `OnMove` 回调将被映射为 `move` prop

```vue
<draggable :list="list" @end="onEnd">
```

### change 事件

`change` 事件在 `list` prop 非空时触发，并且由于拖放操作，相应的数组将被修改。

这个事件被调时使用包含下列属性之一的参数：

- `added`: 包含被添加到数组中的元素的信息
  - `newIndex`: 被添加元素的索引
  - `element`: 被添加的元素
- `removed`: 包含从数组中移除的元素的信息
  - `oldIndex`: 元素被移除前的索引
  - `element`: 被移除的元素
- `moved`: 包含在数组中移动的元素的信息
  - `newIndex`: 被移动元素的当前索引
  - `oldIndex`: 被移动元素的先前索引
  - `element`: 被移动的元素

## Slots


[Sortable.js]: <https://github.com/RubaXa/Sortable>
