# VueDraggable Code Structure

- <https://github.com/SortableJS/Vue.Draggable/blob/master/dist/vuedraggable.js>

```js
;(function () {
  // ...
  function buildDraggable(Sortable) {
    // ...
    var draggableComponent = {
      name: 'draggable'
      // ...
    }

    return draggableComponent
  }

  if (typeof exports == 'object') {
    var Sortable = require('sortablejs')
    module.exports = buildDraggable(Sortable)
  } else if (typeof define == 'function' && define.amd) {
    define(['sortablejs'], function (Sortable) {
      return buildDraggable(Sortable)
    })
  } else if (window && window.Vue && window.Sortable) {
    var draggable = buildDraggable(window.Sortable)
    Vue.component('draggable', draggable)
  }
})()
```

## buidDraggable(Sortable)

```js
function buildDraggable(Sortable) {
  // ...
  var props = {
    // ...
  }

  var draggableComponent = {
    name: 'draggable',

    props: props,

    data: function () {
      return {
        transitionMode: false,
        noneFunctionalComponentMode: false,
        init: false
      }
    },

    render: function (h) {
      var children = this.$slots.default
      var attributes = {
        on: this.componentData.on,
        props: this.componentData.props
      }
      // ...
      return h(this.element, attributes, children)
    },
    mounted: function () {
      var options = this.options
      // ...
      this._sortable = new Sortable(this.rootContainer, options)
      this.computeIndexes()
    },
    beforeDestroy: function () {
      // ...
    },

    computed: {
      rootContainer: function () {
        // ...
      },
      isCloning: function () {
        // ...
      },
      readList: function () {
        // ...
      }
    },

    watch: {
      options: {
        // ...
      },
      realList: function () {
        // ...
      }
    },

    methods: {
      //...
      computeIndexes: function () {
        // ...
      }
      // ...
    }
  }

  return draggableComponent
}
```

## Props

```js
var props = {
  options: Object,
  list: Array,
  value: Array,
  noTransitionOnDrag: Boolean,
  clone: Function,
  element: String,
  move: Function
  componentData: Object
}
```

## Events Listened

```js
function buildDraggable(Sortable) {
  var eventsListened = ['Start', 'Add', 'Remove', 'Update', 'End']

  var draggableComponent = {
    mounted: function () {
      var _this = this
      var optionsAdded = {}

      eventsListened.forEach(function (elt) {
        optionsAdded['on' + elt] = delegateAndEmit.call(_this, elt)
      })

      var options = { ...this.options, ...optionsAdded }
      this._sortable = new Sortable(this.rootContainer, options)
      this.computeIndexes()
    }
  }
}
```

## Events To Emit
