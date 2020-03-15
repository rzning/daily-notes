---
title       : Material Components for the Web
recorddate  : 2020-03-15
repository  : https://github.com/material-components/material-components-web
website     : https://material.io/develop/web
---

# MDC Web

> Material Components for the Web

MDC Web 可帮助开发人员执行 [Material Design][MD] 。

这些组件由 Google 的工程师和用户体验设计师的核心团队开发，可实现可靠的开发工作流程，以构建美观实用的 Web 项目。

MDC Web 是 [Material Design Lite][MDL] 的后继产品。
除了实现 [Material Design][MDG] 准则外，
它还提供了更灵活的主题自定义，不仅在颜色方面，而且在字体，形状，状态等方面。
它还使用了专门的架构 ( [Architecture] ) 以适应不同的主流 Web 框架 ( [Major Web Frameworks][Frameworks] )

- 入门指南 [Getting Started Guide]
- 样例目录 [Demos][Catalog]
- 在其他框架上使用 [MDC Web on other frameworks][Frameworks]
- 设计指南 [Material Design Guidelines][MDG]
- 所有组件 [All Components][Components]


[MD]: <https://www.material.io/>
[MDG]: <https://material.io/design>
[MDL]: <https://getmdl.io/>
[Architecture]: <https://github.com/material-components/material-components-web/blob/master/docs/code/architecture.md>
[Frameworks]: <https://github.com/material-components/material-components-web/blob/master/docs/framework-wrappers.md>
[Getting Started Guide]: <https://github.com/material-components/material-components-web/blob/master/docs/getting-started.md>
[Catalog]: <https://material-components.github.io/material-components-web-catalog>
[Components]: <https://github.com/material-components/material-components-web/blob/master/packages>

## 🚀 Quick Start

通过 CDN 使用：

```html
<!-- MDC Web 所需的样式 -->
<link rel="stylesheet" href="https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css">

<!-- 渲染文本域组件 -->
<label class="mdc-text-field">
  <input type="text" class="mdc-text-field__input" aria-labelledby="my-label">
  <span class="mdc-floating-label" id="my-label">Label</span>
  <div class="mdc-line-ripple"></div>
</label>

<!-- 引入必须的 MDC Web JS 库 -->
<script src="https://unpkg.com/material-components-web@latest/dist/material-components-web.min.js"></script>

<!-- 实例化用到的文本域组件 -->
<script>
  mdc.textField.MDCTextField.attachTo(document.querySelector('.mdc-text-field'));
</script>
```
通过 NPM　使用：

> 这里假设你已经配置了将 Sass 编译为 CSS 的 webpack
>
> 要配置 webpack，请参阅完整的入门指南 [Getting Started Guide]

```sh
npm install @material/textfield
```

HTML

```html
<label class="mdc-text-field">
  <input type="text" class="mdc-text-field__input" aria-labelledby="my-label">
  <span class="mdc-floating-label" id="my-label">Label</span>
  <div class="mdc-line-ripple"></div>
</label>
```

CSS

```css
@import "@material/textfield/mdc-text-field";
```

JavaScript

```js
import {MDCTextField} from '@material/textfield/index'

const textField = new MDCTextField(document.querySelector('.mdc-text-field'))
```
