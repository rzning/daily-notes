# Taro

![](https://img.shields.io/node/v/@tarojs/cli.svg?style=flat-square)
![](https://img.shields.io/npm/v/@tarojs/taro.svg?style=flat-square)
![](https://img.shields.io/npm/l/@tarojs/taro.svg?style=flat-square)
![](https://img.shields.io/npm/dt/@tarojs/taro.svg?style=flat-square)
![](https://img.shields.io/travis/NervJS/taro.svg?style=flat-square)

- <https://github.com/nervjs/taro>
- <https://taro.aotu.io/>

多端统一开发框架，支持用 [React] 的开发方式编写一次代码，生成能运行在微信小程序、H5、[React Native] 等的应用。

---

## 特点

#### [React] 语法风格

[Taro] 的语法规则基于 [React] 规范，它采用与 [React] 一致的组件化思想，组件生命周期与 [React] 保持一致，
同时在书写体验上也尽量与 [React] 类似，支持使用 [JSX] 语法，让代码具有更丰富的表现力。

#### 快速开发微信小程序

[Taro] 立足于微信小程序开发，众所周知小程序的开发体验并不是非常友好，比如小程序中无法使用 [npm] 来进行第三方库的管理，
无法使用一些比较新的 [ES] 规范等等，针对小程序端的开发弊端，[Taro] 具有以下的优秀特性：

- [x] 支持使用 [npm]/[yarn] 安装管理第三方依赖。
- [x] 支持使用 [ES7]/[ES8] 甚至更加新的 [ES] 规范，一切都可自行配置。
- [x] 支持使用 [CSS] 预编译器，例如 [Sass] 等。
- [x] 支持使用 [Redux] 进行状态管理。
- [x] 小程序 API 优化，异步 API [Promise] 化等等。

#### 支持多端开发转化

[Taro] 方案的初心就是为了打造一个多端开发的解决方案。目前 [Taro] 代码可以支持转换到 **微信小程序** 以及 **H5 端**。

## 快速开始

使用 [npm] 或者 [yarn] 全局安装，或者直接使用 [npx] 安装 [Taro] 开发工具 `@tarojs/cli`：

```bash
$ npm install -g @tarojs/cli
$ yarn global add @tarojs/cli
```

使用命令创建模板项目：

```bash
$ taro init myApp
```

npm5.2+ 也可在不全局安装的情况下使用 [npx] 创建模板项目：

```bash
$ npx @tarojs/cli init myApp
```

进入项目目录开始开发，可以选择小程序预览模式，或者 H5 预览模式。

若使用微信小程序预览模式，则需要自行下载并打开[微信开发者工具]，选择预览项目根目录。

微信小程序编译预览模式:

```bash
# npm script
$ npm run dev:weapp

# 仅限全局安装
$ taro build --type weapp --watch

# npx 用户也可以使用
$ npx taro build --type weapp --watch
```

H5 编译预览模式：

```bash
# npm script
$ npm run dev:h5

# 仅限全局安装
$ taro build --type h5 --watch

# npx 用户也可以使用
$ npx taro build --type h5 --watch
```

## 项目打包

打包小程序代码:

```bash
# npm script
$ npm build dev:weapp

# 仅限全局安装
$ taro build --type weapp

# npx 用户也可以使用
$ npx taro build --type weapp
```

打包 H5 代码：

```bash
# npm script
$ npm build dev:h5

# 仅限全局安装
$ taro build --type h5

# npx 用户也可以使用
$ npx taro build --type h5
```

[Taro]: https://taro.aotu.io/
[React]: https://reactjs.org/
[React Native]: https://facebook.github.io/react-native/
[JSX]: https://reactjs.org/docs/jsx-in-depth.html
[npm]: https://www.npmjs.com/
[yarn]: https://yarnpkg.com
[CSS]: https://www.w3.org/Style/CSS
[Sass]: http://sass-lang.com/
[Redux]: https://redux.js.org/
[ES7]: http://www.ecma-international.org/ecma-262/7.0/index.html
[ES8]: http://www.ecma-international.org/ecma-262/8.0/index.html
[ES]: http://www.ecma-international.org/publications/standards/Ecma-262.htm
[Promise]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[npx]: https://npm.im/npx
[微信开发者工具]: https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html
