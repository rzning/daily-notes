# Electron Forge

- <https://www.electronforge.io/>
- <https://github.com/electron/forge>

> :electron: A complete tool for building and publishing Electron applications

Electron Forg 是一个构建和发布 Electron 应用程序的完整工具。

## 📚 [Electron][e-home] 文档

### 1️⃣ 教程 / [打包您的应用程序][e-packaging]

Electron 的核心模块中没有捆绑任何用于打包或分发文件的工具。

Electron Forge 是一个处理 Electron 应用程序打包与分发的一体化工具。

在工具底层，它将许多现有的 Electron 工具 组合到一起，因此您不必费心处理不同系统的打包工作。

- @electron/packager
- @electron/osx-sign
- electron-winstaller

使用 CLI 工具将你的项目导入到 Electron Forge ：

```sh
yarn add --dev @electron-forge/cli
npx electron-forge import
```

转换脚本完成后，Forge 会创建一个 `forge.config.js` 配置文件，并将将一些依赖项和脚本添加到项目的 `package.json` 文件中：

```json
{
  // ...
  "devDependencies": {
    "@electron-forge/cli": "^7.3.0",
    "@electron-forge/maker-deb": "^7.3.0",
    "@electron-forge/maker-rpm": "^7.3.0",
    "@electron-forge/maker-squirrel": "^7.3.0",
    "@electron-forge/maker-zip": "^7.3.0",
    "@electron-forge/plugin-auto-unpack-natives": "^7.3.0",
    "electron": "^29.1.0"
  },
  "dependencies": {
    "electron-squirrel-startup": "^1.0.0"
  },
  "scripts": {
    "start": "electron-forge start",
    "package": "electron-forge package",
    "make": "electron-forge make"
  }
  // ...
}
```

### 2️⃣ 分发 / [使用 Electron Forge 分发应用程序][e-forge]

如果你不想在你的项目中使用 Electron Forge，你可以使用其他第三方工具来分发你的应用程序。

- [electron-builder](https://github.com/electron-userland/electron-builder)
- [Hydraulic Conveyor](https://hydraulic.dev/)

[e-home]: https://www.electronjs.org/zh/
[e-packaging]: https://www.electronjs.org/zh/docs/latest/tutorial/打包教程
[e-forge]: https://www.electronjs.org/zh/docs/latest/tutorial/forge-overview

## 🚀 开始使用 Getting Started

要开始使用 Electron Forge，我们首先需要使用 `create-electron-app` 初始化一个新项目

```sh
npm init electron-app@latest my-app

npx create-electron-app@latest my-app

yarn create electron-app my-app
```

这个脚本是 Forge `init` 命令的一个便捷包装。

> | create-electron-app | [yarn][cea-yarn] | [cnpm][cea-cnpm] |
> | ------------------- | ---------------- | ---------------- |
>
> [cea-yarn]: https://classic.yarnpkg.com/en/package/create-electron-app
> [cea-cnpm]: https://npmmirror.com/package/create-electron-app
>
> ```ts
> #!/usr/bin/env node
>
> /* eslint-disable */
> import '@electron-forge/cli/dist/electron-forge-init'
> ```

使用预置模板：

```sh
yarn create electron-app my-app --template=vite
```

- `webpack`
- `webpack-typescript`
- `vite`
- `vite-typescript`

执行初始化后，将生成名为 `my-app` 的目录，其中包含一个你需要的基本 Electron 应用项目。

```sh
# 跳转到项目目录
cd my-app

# 启动本地开发服务
yarn run start

# 打包应用
yarn run package

# 构建应用
yarn run make

# 发布应用
yarn run publish
```
