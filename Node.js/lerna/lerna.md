# Lerna

- <https://lerna.js.org/>
- <https://github.com/lerna/lerna>

一个用于管理包含多个包的 JavaScript 项目的工具。

## 关于

将大型代码库分割成独立的有各自版本控制的包，对于代码共享非常有用。

但是，跨许多存储库进行更改变得很麻烦且难以跟踪，并且跨存储库的测试也变得非常复杂。

为解决这些以及许多其他类似问题，一些项目将代码库组织到多包存储库 ( multi-package ) 中，有时被称为 [monorepos] 。

像 [Babel] , [React] , [Angular] , [Ember] , [Meteor] , [Jest] 等项目都在一个存储库中开发所有的包。

[monorepos]: https://github.com/babel/babel/blob/master/doc/design/monorepo.md
[Babel]: https://github.com/babel/babel/tree/master/packages
[React]: https://github.com/facebook/react/tree/master/packages
[Angular]: https://github.com/angular/angular/tree/master/modules
[Ember]: https://github.com/emberjs/ember.js/tree/master/packages
[Meteor]: https://github.com/meteor/meteor/tree/devel/packages
[Jest]: https://github.com/facebook/jest/tree/master/packages

Lerna 是一个工具，可以优化 ( optimizes ) 使用 git 和 npm 管理多包存储库的工作流程 ( workflow ) 。

Lerna 还可以减少开发和构建环境中大量软件包副本的时间和空间要求。

使用 Lerna 管理的项目目录结构类似于下面这样：

```
my-lerna-repo/
  package.json
  packages/
    package-1/
      package.json
    package-2/
      package.json
```

## 开始

```sh
$ mkdir my-lerna-repo && cd my-lerna-repo
$ npx lerna init
```

将创建一个 `lerna.json` 配置文件以及一个 `packages` 目录，目录结构如下：

```
my-lerna-repo
  packages/
  package.json
  lerna.json
```

## 如何运作

Lerna 允许你使用以下两种方式之一来管理你的项目：

- 固定模式 Fixed
- 独立模式 Independent
