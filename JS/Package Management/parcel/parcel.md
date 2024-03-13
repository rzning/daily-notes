---
name: Parcel
recorddate: 2020-03-30
repository: https://github.com/parcel-bundler/parcel
website: https://parceljs.org/
---

# Parcel

- <https://parceljs.org/>
- <https://github.com/parcel-bundler/parcel>

> Blazing fast, zero configuration web application bundler
>
> 极速零配置的 Web 应用程序打包工具

## 入门指南

在开始之前，你需要安装 Node 和 Yarn ( 或 npm ) 环境，并在空的项目目录运行下面命令来创建一个 `package.json` 项目（包）描述文件。

```sh
yarn init
```

然后使用 Yarn 在你的应用内安装 `parcel` 包：

```sh
yarn add --dev parcel@next
```

接下来你只需将 Parcel 指向你的入口文件。
例如你要构建一个网站，创建一个 `index.html` 文件：

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>My First Parcel App</title>
  </head>
  <body>
    <h1>Hello, World!</h1>
  </body>
</html>
```

现在只需运行：

```sh
yarn parcel index.html
```

这将在本地启动了一个服务，可以通过提供的URL 例如 <http://localhost:1234/> 来访问了。

接下来，你可以通过在代码中指定内容来添加相应的依赖项。
例如在刚才的 `index.html` 中添加一个 `styles.css` 样式文件和一个 `app.js` 脚本文件：

```css
/* styles.css */
h1 {
  color: hotpink;
  font-family: cursive;
}
```

```js
// app.js
console.log('Hello World')
```

```html
<!-- index.html -->
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>My First Parcel App</title>
    <link rel="stylesheet" href="./styles.css" />
    <script src="./app.js"></script>
  </head>
  <body>
    <h1>Hello, World!</h1>
  </body>
</html>
```

Parcel 允许你在不刷新浏览器的情况下，实时更新文件内容并查看最终效果。
