# Storybook Controls Addon

- <https://github.com/storybookjs/storybook/tree/next/addons/controls>

[Storybook] 控件 ( Controls ) 提供了一个图形化的用户界面 ( UI ) 来动态地与组件的参数交互，而不需要编写代码。

它会在组件示例 ( "stories" ) 旁边创建一个插件面板，这样你就可以实时编辑它们。

Addons | [React] | [Vue] | [Angular] | [Web Components]
-|-|-|-|-
[Controls] | ✅ | ✅ | ✅ | ✅ | ✅

更多框架支持信息参考：

- [Framework Support](https://storybook.js.org/docs/react/api/frameworks-feature-support)

[Storybook]: <https://storybook.js.org/>
[Controls]: <https://storybook.js.org/docs/react/essentials/controls>
[React]: <https://storybook.js.org/docs/react>
[Vue]: <https://storybook.js.org/docs/vue>
[Angular]: <https://storybook.js.org/docs/angular>
[Web Components]: <https://storybook.js.org/docs/web-components>


## Installation

Controls 是 [essentials] 的一部分，因此默认安装在所有新 Storybooks 中。

[essentials]: <https://storybook.js.org/docs/react/essentials/introduction>

如果你需要将它添加到你的 Storybook 中，你可以运行：

```sh
yarn add --dev @storybook/addon-controls
```

然后在 `.storybook/main.js` 文件中添加一下内容：

```js
module.exports = {
  addons: [
    '@storybook/addon-controls'
  ]
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

[knobs]: <https://github.com/storybookjs/storybook/tree/master/addons/knobs>

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
import {Button} from 'some-external-library'

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


### 5️⃣ 如何在 MDX 中使用 Controls 插件？


