---
title       : Create React App
recorddate  : 2020-03-27
repository  : https://github.com/facebook/create-react-app
website     : https://create-react-app.dev/
---

# Create React App

## 🚀 快速概览

```sh
npx create-react-app my-app
cd my-app
npm start
```

如果你之前通过 `npm install -g create-react-app` 安装了 `create-react-app` ，
建议你执行 `npm uninstall -g create-react-app` 进行卸载，以确保 npx 始终使用最新版本。

然后打开 <http://localhost:3000> 查看你的应用 。

当你准备将其部署到生产环境中时，可以执行 `npm run build` 来创建一个压缩的最小化捆绑包。

你并不需要单独安装或配置类似于 Webpack 或 Babel 等工具。
它们是预配置和隐藏的，因此可以使你的注意力集中在代码上，而不是构建工具。

## 🎇 创建一个应用

你需要在本地计算机上安装 Node 8.16.0 或 Node 10.16.0 或更高版本。

你可以使用 [nvm] ( macOS/Linux ) 或 [nvm-windows] 在不同项目之间切换 Node 版本。

[nvm]: <https://github.com/creationix/nvm>
[nvm-windows]: <https://github.com/coreybutler/nvm-windows>

你可以选择以下方式之一来创建新应用：

- npx

  ```sh
  npx create-react-app my-app
  ```

- npm

  ```sh
  npm init react-app my-app
  ```

- yarn

  ```sh
  yarn create react-app my-app
  ```

这将在当前文件夹下创建一个 `my-app` 目录。

在该目录中将自动生成初始项目结构并安装相应依赖项。

```
my-app
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
└── src
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── index.css
    ├── index.js
    ├── logo.svg
    └── serviceWorker.js
```

一旦安装完成，你可以打开你的项目文件夹：

```sh
cd my-app
```

在新创建的项目中，你可以运行一些内置的命令：

命令 | npm | yarn
-|-|-
启动本地开发服务 | `npm start` | `yarn start`
以交互模式运行测试监视程序 | `npm test` | `yarn test`
构建用于生产的应用 | `npm run build` | `yarn build`

## 🔮 设计哲学

- 只有一个构建依赖项
- 无需进行任何配置
- 无锁定，可在任何时候弹出到自定义设置

## 🧶 项目包含

你的环境将具有构建现代单页 React 应用所需的一切：

- React, JSX, ES6, TypeScript 和 Flow 语法支持
- ES6 外的语言附加功能，例如对象传播运算符
- 自动前缀的 CSS 因此你不需要 -webkit- 或其他前缀
- 快速的交互式单元测试运行程序，内置对覆盖率报告的支持
- 实时开发服务器警告常见错误
- 一个构建脚本，用于将 JS, CSS 和图像与哈希值和源映射捆绑在一起用于生产环境
- 符合所有渐进式 Web App 标准
- 单一依赖项即可轻松更新上述工具

## 🎉 热门的其他选择

Create React App 非常适合：

- 在舒适且功能丰富的开发环境中学习 React
- 快速启动新的单页面 React 应用程序
- 使用 React 为你的库和组件创建示例

其他常用情况参考：

- 若想简单的尝试 React 可以使用单个 HTML 文件或在线沙箱：
  [Try React](https://zh-hans.reactjs.org/docs/getting-started.html#try-react)

- 若需要将 React 与服务器端模板框架（如 Rails, Django 或 Symfony）集成在一起，
  或者你不构建单页面应用，可以考虑使用更加灵活的 [nwb] 或 [Neutrino]
  - 对于 Rails 可以使用 [Rails Webpacker](https://github.com/rails/webpacker)
  - 对于 Symfony 可以尝试 [Symfony's webpack Encore](https://symfony.com/doc/current/frontend/encore/reactjs.html)

- 若你需要发布一个 React 组件，可以试一下：
  - [nwb's React Components and Libraries](https://github.com/insin/nwb#react-components-and-libraries)
  - [Neutrino's React Components Preset](https://neutrinojs.org/packages/react-components/)

- 若你需要使用 React 和 Node.js 进行服务器端渲染，可参考 [Next.js] 或 [Razzle]
  - Create React App 与后台无关，仅生成静态的 HTML/JS/CSS 包

- 若你的网站大部分内容是静态的，可以考虑改用 [Gatsby] ，它在构建时会将网站预先渲染为 HTML

- 最后，若你需要更多的自定义设置，请查看 [Neutrino's React Preset](https://neutrinojs.org/packages/react/)

所有上述工具都可以在几乎没有配置的情况下工作。

如果你喜欢自己配置构建，请遵循本 [指南](https://zh-hans.reactjs.org/docs/add-react-to-a-website.html) 。

[nwb]: <https://github.com/insin/nwb>
[Neutrino]: <https://neutrino.js.org/>
[Next.js]: <https://github.com/zeit/next.js/>
[Razzle]: <https://github.com/jaredpalmer/razzle>
[Gatsby]: <https://www.gatsbyjs.org/>
