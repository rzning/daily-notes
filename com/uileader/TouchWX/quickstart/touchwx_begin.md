---
title       : "起步 - Touch WX 入门"
author      : Rzning
date        : 2018-06-19 16:00:00 +0800
modified    : 2018-08-05 17:07:00 +0800
---
# Touch WX

### 起步
- ~~<http://www.touchui.io/touchui_doc_wx/quickstart/begin>~~
- <http://www.wetouch.net/touchwx_doc/quickstart/begin>

  - 框架介绍 - [begin/wx]
  - 环境安装 - [begin/ide]
  - 首个程序 - [begin/miniProgram]
  - 常见问题 - [begin/question]

---

## 框架介绍
- [begin/wx]

Touch WX 是一套完全免费的微信小程序开发框架，扩展了小程序的能力。

特点：

1. 增加 30 多种常用组件。
2. 兼容阿里 iconfont 图标库，支持 less 语法。
3. 页面由四文件改为单文件方式开发。
4. 小程序可直接转为 H5 应用。

原理：

将 Touch WX 工程中所写的代码进行编译，直接输出为微信小程序工程原始代码。

扩充的 30 多种组件，完全是基于小程序官方的自定义组件机制实现（row & col 除外）。

## 环境安装
- [begin/ide]

基本环境：

1. 安装 [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)

2. 安装 [Node.js](https://nodejs.org/en/)

3. 安装 [vscode](https://code.visualstudio.com/)

安装插件：

`Vetur`, `TouchWX`, `touchui-wx-cli`

1. 在 vscode 中安装 Vetur 插件

    Touch WX 基于 Vue 开发，使用 `.wx` 和 `.wxa` 后缀，安装 Vetur 插件实现语法高亮提示。

2. 在 vscode 中安装 TouchWX 插件

3. 安装 touchui-wx-cli

```bash
# install
$ npm install -g touchui-wx-cli
# or
$ yarn global add touchui-wx-cli

# version
$tui -v
```

4. 按需更新 touchui-wx-cli

```bash
$ npm update touchui-wx-cli -g
```

5. 按需更新 touchui-wx-components

```bash
npm update touchui-wx-components
```

## 构建基础工程
- [begin/miniProgram]

1. 新建空目录。

2. 用 vscode 打开，右键菜单 `Touch WX 创建基础工程`。

3. 输入项目名称。

4. 回车，插件将自动执行以下操作：
    1. 创建基础工程所需文件；
    2. 安装项目依赖；
    3. 编译输出 `dist` 目录。

5. 使用微信开发者工具新建项目，打开 `dist` 目录。

6. 启动服务：
    - 在 vscode 中右键菜单 `Touch WX 启动开发服务`，将自动执行 `tui dev` 命令。

7. 新建页面：
    1. 在 vscode 中对应目录右键菜单 `Touch WX 新建页面`；
    2. 输入文件夹名称；
    3. 输入页面标题；
    4. 回车后生成对应 `.wx` 文件，并自动将页面路径添加到 `app.wxa` 路由配置列表。

8. 识别为 Touch WX 工程:
    - 在 vscode 中右键菜单 `Touch WX 识别为 Touch WX 工程`

9. 语法高亮：

```js
//.vscode/settings.json
{
  "touchuiwx.enable": true,
  "vetur.extensions": [
    ".wxa",
    ".wx"
  ],
  "files.associations": {
    "*.wxa": "vue",
    "*.wx": "vue"
  },
  "git.ignoreLimitWarning": true
}
```

10. 安装依赖：
    - 在 vscode 中右键菜单 `Touch WX 安装依赖`

11. 导入导出：
    - `Touch WX 导出为 TouchUI 工程`
    - `Touch WX 从 TouchUI 工程导入`

## 常见问题
- [begin/question]

1. 如果提示 `statusBarHeight` 错误，需要将微信开发者工具更新到最新版。
2. 由 touchui 导入的工程在微信开发者工具预览时，如果切换 tabBar 白屏，点击刷新按钮进行编译。
3. 在 Touch WX 工程进行开发，如果修改文件后没有自动输出到 dist，需要点击菜单项：启动开发服务。
4. 当修改了图标 css 或其他全局 css 或全局 js 后，需要全部重新编译输出。这时可以打开 `app.wxa` 文件，保存一下就会全部重新编译输出。
5. image 标签导致 VSCode 语法检查，可以使用 `<image/>` 自闭合标签。
6. 除了 image 组件其他组件尽量都不要写自闭合，否则编译后可能导致代码结构错乱。



[begin/wx]: <http://www.wetouch.net/touchwx_doc/quickstart/begin/wx>
[begin/ide]: <http://www.wetouch.net/touchwx_doc/quickstart/begin/ide>
[begin/miniProgram]: <http://www.wetouch.net/touchwx_doc/quickstart/begin/miniProgram>
[begin/question]: <http://www.wetouch.net/touchwx_doc/quickstart/begin/question>
