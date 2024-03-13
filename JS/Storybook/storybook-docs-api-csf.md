# Component Story Format ( CSF )

- <https://storybook.js.org/docs/react/api/csf>

组件故事格式 ( CSF ) 是编写故事的推荐方法。
它是一个基于 ES6 模块的开放标准，可以移植到 Storybook 之外。

> 如果你正在使用旧的 `storiesOf()` 语法编写故事，你可以参考：
>
> - [storiesOf (Legacy) API](https://github.com/storybookjs/storybook/tree/master/lib/core/docs/storiesOf.md)

在 CSF 中，故事和组件元数据被定义为 ES 模块。
每个组件故事文件都包含一个必需的默认导出和一个或多个命名导出。

除了 React Native 之外，所有框架都支持 CSF ，
在 React Native 中你应该使用 `storiesOf()` API 代替。

## Default Export

默认导出 ( Default Export ) 有关你组件的元数据：

```js
// MyComponent.story.js

import MyComponent from './MyComponent'

export default {

  // 在 UI 左侧故事层次结构导航栏中显示的标题，应该保证全局唯一
  title: 'Path/To/MyComponent',

  // 对应组件引用，该字段是可选的（但推荐使用），
  // 插件可以根据该字段来自动生成参数表 ( Prop Table ) 和组件其他元数据。
  component: MyComponent,

  // 装饰器
  decorators: [ ... ],

  // 参数
  parameters: { ... }
}
```

## Named Story Exports

使用 CSF 默认情况下，文件的每个命名导出都代表一个 Story 函数：

```jsx
// MyComponent.stories.js

import React from 'react'

import MyComponent from './MyComponent'

export default {
  title: 'Path/To/MyComponent',
  component: MyComponent
}

export const Basic = () => <MyComponent />
export const WithProp = () => <MyComponent prop="value" />
```

导出的标识符将使用 Lodash 的 `startCase()` 方法转换为 "start case" 格式。

建议导出名称以大写字母开头。

Story 函数可以添加几个不同的标注信息：

```js
// MyComponent.stories.js

export const Simple = () => <MyComponent />

// 故事名称
Simple.storyName = 'So simple!'
// 装饰器
Simple.decorators = [ ... ]
// 参数
Simple.parameters = { ... }
```

## Args story inputs

从 Storybook 6.0 开始 Stories 接受名为 `args` 的命名输入。

Args 是由 Storybook 及其插件提供的动态数据。

以一个记录点击事件的文本按钮为例：

```js
// Button.stories.js

import React from 'react'

import { action } from '@storybook/addon-actions'

import { Button } from './Button'

export default {
  title: 'Button',
  component: Button
}
export const Text = () => <Button label="Hello" onClick={action('clicked')} />
```

现在可以使用 `args` 重写上面例子：

```js
// Button.stories.js

export const Text = ({ label, onClick }) => (
  <Button label={label} onClick={onClick} />
)

Text.args = {
  label: 'Hello',
  onClick: action('clicked')
}
```

## Non-story Exports

你可以通过可选的 `includeStories` 和 `excludeStories` 配置字段来指定那些是故事性导出：

```js
// MyComponent.stories.js

import React from 'react'

import MyComponent from './MyComponent'

import someData from './data.json'

export default {
  title: 'MyComponent',
  component: MyComponent,

  // 👇 故事导出
  includeStories: ['SimpleStory', 'ComplexStory'],

  // 👇 数据导出
  excludeStories: /.*Data$/
}

export const simpleData = { foo: 1, bar: 'baz' }
export const complexData = { foo: 1, foobar: { bar: 'baz', baz: someData } }

export const SimpleStory = () => <MyComponent data={simpleData} />
export const ComplexStory = () => <MyComponent data={complexData} />
```

匹配故事导出示例：

- `includeStories: /^[A-Z]/`
- `includeStories: /.*Story$/`
- `includeStories: ['SimpleStory', 'ComplexStory']`
- `excludeStories: /^[a-z]/`
- `excludeStories: /.*Data$/`
- `excludeStories: ['simpleData', 'complexData']`

如果遵循以大写字母开头 ( UpperCamelCase ) 的故事导出最佳实践，则推荐的使用上列第一条选项。
