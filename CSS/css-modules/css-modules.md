# CSS Modules

- <https://github.com/css-modules/css-modules>

<img src="https://raw.githubusercontent.com/css-modules/logos/master/css-modules-logo.png" width="150" height="150" />

一个 CSS Module 是一个 CSS 文件，默认情况下，文件中的所有类名和动画名称的作用域都是局部的，只在本文件中有效。

所有 `url(...)` 和 `@imports` 都是模块请求格式。

- `./xxx` 和 `../xxx` 意味着相对路径查找
- `xxx` 和 `xxx/yyy` 表示在模块文件夹查找，如 `node_modules/`

一个 CSS Module 可编译为称为 ICSS ( [Interoperable CSS](https://github.com/css-modules/icss) ) 的低级交换格式，但其编写方式与普通 CSS 文件类似：

```css
/* style.css */
.mainColor {
  color: blue;
}
```

从 JS Module 导入 CSS Module 时，将会导出一个对象，其中包含所有从本地名称到全局名称的映射。

```js
import styles from './style.css'
// import { mainColor } from './style.css'

element.innerHTML = `<div class="${styles.mainColor}"> Content </div>`
```

## Naming 命名

对于本地类名称，建议使用驼峰 ( camelCase ) 命名法，但不强制。

若使用短横线连接命名时，需要使用 `styles['class-name']` 方式引用，显然没有 `styles.className` 方式更干净。

## Exceptions 例外

`:global` 将切换到当前选择器各自标识符的的全局作用域。

`:global(.xxx)` 各自的 `@keyframes :global(xxx)` 在全局范围内用括号括起来。

同样 `:local` 和 `:local(...)` 将针对本地范围。

如果选择器切换到全局模式，则规则也将激活全局模式。例如：

```css
.localA :global .global-b .global-c :local(.localD.localE) .global-d
```

## Composition 组成

组合选择器是可以的。

```css
.className {
  color: green;
  background: red;
}

.otherClassName {
  composes: className;
  color: yellow;
}
```

可以有多个 `composes` 规则，但 `composes` 规则必须在其他规则之前。

扩展仅适用于局部作用域的选择器，并且仅在选择器为单个名称时才适用。

当一个类名包含 ( composes ) 另一个类名时， CSS Module 将导出本地类的两个类名。

`composes` 允许包括多个类名：

```css
.otherClassName {
  composes: classNameA classNameB;
}
```

## Dependencies 依赖

### 从其他文件组合

允许从其他 CSS Modules 导入类名，并合并到指定类名下。

```css
.otherClassName {
  composes: className from './style.css';
}
```

从不同文件组成多个类时，其顺序时不确定的。

组合依赖不应该出现循环引用。

### 从全局类名组合

```css
.otherClassName {
  composes: globalClassName from global;
}
```

## Usage with preprocessors 预处理器

预处理器可以使定义全局或局部块变得容易。

例如使用 `less.js` ：

```less
:global {
  .global-class-name {
    color: green;
  }
}
```

## Implementations 实现

### Webpack

Webpack 的 [css-loader](https://github.com/webpack/css-loader) 在模块模式下将每个本地范围的标识符替换为一个全局惟一名称，并将其导出。

### Server-side and static websites

在服务器端或静态网站中， [PostCSS-Modules](https://github.com/outpunk/postcss-modules) 允许使用 CSS Modules 进行静态构建，并通过 Ruby, PHP 或任何其他语言或框架在服务器端使用。
