微信小程序 > 开发 > 开发者工具 > 开发辅助 > NPM 支持

# NPM 支持

> [dev/devtools/npm](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html)

## 使用 npm 包

1. 在小程序中执行 `npm install` 命令安装 npm 包
2. 点击开发者工具菜单栏： `工具` --> `构建 npm`
3. 勾选 `使用 npm 模块` 选项
4. 构建完成后即可使用 npm 包

JS 中引入 NPM 包：

```js
const pkg = require('packageName')
const pkgOther = require('packageName/other')
```

使用 NPM 包中的自定义组件：

```json
{
  "usingComponents": {
    "comp": "packageName",
    "comp-other": "packageName/other"
  }
}
```

## 发布 npm 包

此处特指专为小程序定制的 npm 包。

- 小程序 npm 包根目录下必须包含 `构建文件生成目录` ，默认为 `miniprogram_dist` 目录，可以通过 `package.json` 文件 `miniprogram` 字段指定。

  ```json
  {
    "name": "miniprogram-custom-component",
    "version": "1.0.0",
    "description": "",
    "miniprogram": "dist",
    "devDependencies": {},
    "dependencies": {}
  }
  ```

- 小程序 npm 包里只有 `miniprogram_dist` 目录会被算入小程序包的占用空间。

## 发布其他 npm 包

小程序引用其他已发布包，要满足一下条件：

- 只支持纯 JS 包，不支持自定义组件。
- 必须有入口文件。
- 不支持依赖 C++ 插件。
- 不支持 Node.js 内置库。
- 小程序中无法使用一些全局变量（如 `window` 对象）和构造器（如 `Function` 构造器）。

## 原理介绍
