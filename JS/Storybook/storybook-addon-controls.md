# Storybook Controls Addon

- <https://github.com/storybookjs/storybook/tree/next/addons/controls>

[Storybook] 控件 ( Controls ) 提供了一个图形化的用户界面 ( UI ) 来动态地与组件的参数交互，而不需要编写代码。

它会在组件示例 ( "stories" ) 旁边创建一个插件面板，这样你就可以实时编辑它们。

| Addons     | [React] | [Vue] | [Angular] | [Web Components] |
| ---------- | ------- | ----- | --------- | ---------------- |
| [Controls] | ✅      | ✅    | ✅        | ✅               |

更多框架支持信息参考：

- [Framework Support](https://storybook.js.org/docs/react/api/frameworks-feature-support)

[Storybook]: https://storybook.js.org/
[Controls]: https://storybook.js.org/docs/react/essentials/controls
[React]: https://storybook.js.org/docs/react
[Vue]: https://storybook.js.org/docs/vue
[Angular]: https://storybook.js.org/docs/angular
[Web Components]: https://storybook.js.org/docs/web-components

## Installation

Controls 是 [essentials] 的一部分，因此默认安装在所有新 Storybooks 中。

[essentials]: https://storybook.js.org/docs/react/essentials/introduction

如果你需要将它添加到你的 Storybook 中，你可以运行：

```sh
yarn add --dev @storybook/addon-controls
```

然后在 `.storybook/main.js` 文件中添加一下内容：

```js
module.exports = {
  addons: ['@storybook/addon-controls']
}
```

## Usage

Controls 的用法可查看官方文档：

- <https://storybook.js.org/docs/react/essentials/controls>

## FAQs

### 1️⃣ 如何用 Controls 取代 addon-knobs 插件？

Addon-knobs 是 Storybook 最受欢迎的插件之一，每周下载量超过 100 万次。
Knobs 也是一个成熟的插件，有很多在 addon-controls 中没有的选项。

我们不会立即弃用 addon-knobs 而是会继续在 Storybook 核心发行版中发布 knobs 直到 7.0 版本。
这将给我们时间基于用户的反馈来改进控件，也给 knobs 用户足够的时间来迁移。

### 2️⃣ 如何从 addon-knobs 中迁移？

如果你已经在使用 [Storybook Knobs][knobs] 你应该考虑迁移到 Controls 插件。

[knobs]: https://github.com/storybookjs/storybook/tree/master/addons/knobs

这里有两个迁移示例：

#### 示例 1 - Knobs to auto-generated args

addon-knobs 版本：

```js
import { text } from '@storybook/addon-knobs'
import { Button } from './Button'

export const Basic = () => <Button label={text('Label', 'hello')} />
```

使用 addon-controls 重写：

```js
export const Basic = (args) => <Button {...args} />
Basic.args = { label: 'hello' }
```

#### 示例 2 - Knobs to manually-configured args

addon-knobs 版本：

```js
import range from 'lodash/range'
import { number, text } from '@storybook/addon-knobs'

export const Reflow = () => {
  const count = number('Count', 5, { min: 0, max: 20, range: true })\
  const label = text('Label', 'reflow')
  return (
    <>
      {range(count).map((n) => (
        <Button label={`${label} ${n}`} />
      ))}
    </>
  )
}
```

使用 addon-controls 重写：

```js
export const Reflow = (args) => ({ count, label, ...args }) => (
  <>
    {range(count).map((n) => (
      <Button label={`${label} ${n}`} {...args} />
    ))}
  </>
)
Reflow.args = { count: 5, label: 'reflow' }\
Reflow.argTypes = {
  count: {
    control: { type: 'range', min: 0, max: 20 }
  }
}
```

### 3️⃣ 我的 Controls 并不是自动生成的，我该怎么办?

在一些已知的情况下 Controls 不能自动生成：

- 你正在使用一个不支持自动生成的框架
- 你正在尝试为外部库中定义的组件生成 Controls

通过一些手动操作，你仍然可以在这些情况下使用控件。

考虑下面例子：

```js
import { Button } from 'some-external-library'

export default {
  title: 'Button',
  argTypes: {
    label: {
      control: 'text'
    },
    borderWidth: {
      control: { type: 'number', min: 0, max: 10 }
    }
  }
}

export const Basic = (args) => <Button {...args} />
Basic.args = {
  label: 'hello',
  borderWidth: 1
}
```

`argTypes` 注解（如果需要，也可以应用于单个故事）为 Storybook 提供了在一些不受支持的情况下生成 Controls 所需的提示。

有关 Control Types 的完整列表，请参阅：

- [Control Annotations](https://storybook.js.org/docs/react/essentials/controls/#annotation)

### 4️⃣ 我该如何禁用特定故事中某些字段的 Control ？

`argTypes` 注解可用于隐藏特定行的 Controls 甚至隐藏行。

假设你有一个带有 `borderWidth` 和 `label` 属性的按钮组件，
您想要完全隐藏 `borderWidth` 行，并禁用特定故事上的 `label` 行控件，你可以这样做：

```jsx
import { Button } from './Button'

export default {
  title: 'Button',
  component: Button
}

export const CustomControls = (args) => <Button {...args} />
CustomControls.argTypes = {
  borderWidth: {
    table: { disable: true }
  },
  label: {
    control: { disable: true }
  }
}
```

与故事参数( [Story Parameters] ) 一样， `args` 和 `argTypes` 注解也是层次化合并的，
因此 Story 级注解将覆盖 Component 级注解。

[Story Parameters]: https://storybook.js.org/docs/react/writing-stories/parameters

### 5️⃣ 如何在 MDX 中使用 Controls 插件？

MDX 在底层将编译成组件故事格式 ( Component Story Format, CSF) ，
因此上面的每个例子都可以使用 `args` 和 `argTypes` Props 进行直接映射。

一个 CSF 示例：

```jsx
import { Button } from './Button'

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    background: { control: 'color' }
  }
}

const Template = (args) => <Button {...args} />

export const Basic = Template.bind({})
Basic.args = {
  label: 'hello',
  background: '#ff0'
}
```

使用 MDX 重写：

```jsx
import { Meta, Story } from '@storybook/addon-docs/blocks'
import { Button } from './Button'

<Meta title="Button" component={Button} argTypes={ { background: { control: 'color' } } } />

export const Template = (args) => <Button {...args} />

<Story name="Basic" args={{ label: 'hello', background: '#ff0' }}>
  {Template.bind({})}
</Story>
```

## 在 Vue 项目中的一个完整控件示例

### [Button.vue](https://github.com/storybookjs/storybook/blob/next/examples/vue-kitchen-sink/src/stories/Button.vue)

```vue
<template>
  <button
    :class="['button', { rounded }]"
    :style="{ color, borderColor: color }"
    @click="onClick"
    @dblclick="onDoubleClick"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    rounded: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: '#42b983'
    }
  },
  methods: {
    onClick(event) {
      this.$emit('click', event)
    },
    onDoubleClick(event) {
      this.$emit('double-click', event)
    }
  }
}
</script>

<style scoped>
.button {
  border: 3px solid;
  padding: 10px 20px;
  background-color: white;
  outline: none;
}
.rounded {
  border-radius: 5px;
}
</style>
```

### [addon-controls.stories.js](https://github.com/storybookjs/storybook/blob/next/examples/vue-kitchen-sink/src/stories/addon-controls.stories.js)

```js
import MyButton from './Button.vue'

const templateDecorator = () => ({
  template:
    '<div style="background-color: silver; padding: 10px;"><story/></div>'
})

export default {
  title: 'Addon/Controls',
  component: MyButton,
  argTypes: {
    color: { control: { type: 'color' } }
  },
  decorators: [templateDecorator]
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { MyButton },
  template: '<MyButton :color="color" :rounded="rounded">{{ label }}</MyButton>'
})

export const Rounded = Template.bind({})
Rounded.args = {
  rounded: true,
  color: '#f00',
  label: '一个圆角边缘的按钮'
}

export const Square = Template.bind({})
Square.args = {
  rounded: false,
  color: '#00f',
  label: '一个方形边缘的按钮'
}
```

### [addon-controls.stories.mdx](https://github.com/storybookjs/storybook/blob/next/examples/vue-kitchen-sink/src/stories/addon-controls.stories.mdx)

```jsx
import { Meta, Canvas, Story, ArgsTable } from '@storybook/addon-docs/blocks'
import MyButton from './Button.vue'
import InfoButton from './components/InfoButton.vue'

<Meta
  title="Addon/ControlsMDX"
  component={MyButton}
  argTypes={
    {
      color: { control: { type: 'color' } }
    }
  }
/>

export const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { MyButton },
  template: '<MyButton :color="color" :rounded="rounded">{{label}}</MyButton>'
})

# Addon-controls in MDX

Controls 也可以在 MDX Stories 中定义和使用。

## Rounded

<Canvas>
  <Story
    name="Rounded"
    args={{
      rounded: true,
      color: '#f00',
      label: '一个圆角边缘的按钮'
    }}
  >
    {Template.bind({})}
  </Story>
</Canvas>

<ArgsTable story="Rounded" />

## Square

<Canvas>
  <Story
    name="Square"
    args={{
      // rounded: false, 测试默认值处理
      color: '#00f',
      label: '一个方形边缘的按钮'
    }}
  >
    {Template.bind({})}
  </Story>
</Canvas>

<ArgsTable story="Square" />

## Multiple components

<ArgsTable components={{ MyButton, InfoButton }} >
```
