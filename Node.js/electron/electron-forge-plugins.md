# Electron Forge Plugins

> <https://www.electronforge.io/config/plugins>

- Webpack Plugin
- Vite Plugin
- Electronegativity Plugin
- Auto Unpack Native Modules Plugin
- Local Electron Plugin
- Fuses Plugin

## Webpack Plugin [🔗][efp-webpack]

使用 Webpack 为你的 Electron Forge App 转换和捆绑代码。

```sh
npm install --save-dev @electron-forge/plugin-webpack
```

```js
// forge.config.cjs

module.exports = {
  // ...
  plugins: [
    {
      name: '@electron-forge/plugin-webpack',
      config: {
        mainConfig: './webpack.main.config.js',
        renderer: {
          config: './webpack.renderer.config.js',
          entryPoints: [
            {
              name: 'main_window',
              html: './src/renderer/index.html',
              js: './src/renderer/index.js',
              preload: {
                js: './src/preload.js'
              }
            }
          ]
        }
      }
    }
  ]
  // ...
}
```

```json
// package.json

{
  "name": "my-app",
  "main": "./.webpack/main"
  // ...
}
```

## Vite Plugin [🔗][efp-vite]

使用 Vite 为你的 Electron Forge App 转换和捆绑代码。

这个插件可以很方便地设置标准的 Vite 工具来编译你的主进程 ( Main Process ) 代码和渲染进程 ( Renderer Process ) 代码。

```sh
npm install --save-dev @electron-forge/plugin-vite
```

你必须提供两个 Vite 配置文件：

- `vite.main.config.js` - 用于主进程
- `vite.renderer.config.js` - 用于渲染进程

```js
// forge.config.mjs

export default {
  plugins: [
    {
      name: '@electron-forge/plugin-vite',
      config: {
        build: [
          {
            // `build.lib.entry` 的别名
            entry: 'src/main.js',
            config: 'vite.main.config.mjs'
          },
          {
            entry: 'src/preload.js',
            config: 'vite.preload.config.mjs'
          }
        ],
        renderer: [
          {
            name: 'main_window',
            config: 'vite.renderer.config.mjs'
          }
        ]
      }
    }
  ]
}
```

Vite 的构建配置为主进程和预加载脚本以及每个渲染进程生成一个单独的 Entry 。

项目 `package.json` 中的 `main` Entry 需要指向 `.vite/build/main.js` ：

```json
// package.json

{
  "name": "my-vite-app",
  "main": ".vite/build/main.js"
  // ...
}
```

## Local Electron Plugin [🔗][efp-local]

将本地构建的 Electron 集成到 Forge 应用程序中。

```sh
npm install --save-dev @electron-forge/plugin-local-electron
```

一旦你有了一个可以工作的 Electron 构建，将插件的 `electronPath` 配置选项指向包含构建的 Electron 二进制文件的文件夹。

```ts
// forge.config.ts

import type { ForgeConfig } from '@electron-forge/shared-types'

const config: ForgeConfig = {
  // ...
  plugins: [
    // ...
    {
      name: '@electron-forge/plugin-local-electron',
      config: {
        electronPath: '/Users/me/projects/electron/out/Testing'
      }
    }
  ]
}
```

> 注意，插件只接受绝对路径，可以使用 Node 的 `path.resolve()` 方法实现。

插件选项：

```ts
interface LocalElectronPluginConfig {
  /**
   * 是否启用插件，可以将其设置为环境变量，以便快速切换此插件
   *
   * @default true
   */
  enabled?: boolean

  /**
   * 指向 Electron 构建版本目录的绝对路径
   *
   * @example `/path/to/electron/out/D`
   */
  electronPath: string

  /**
   * 本地构建的 Electron 所针对的平台
   *
   * @default process.platform
   */
  electronPlatform?: string

  /**
   * 本地构建的 Electron 所针对的架构 architecture
   *
   * @default process.arch
   */
  electronArch?: string
}
```

[efp-webpack]: https://www.electronforge.io/config/plugins/webpack
[efp-vite]: https://www.electronforge.io/config/plugins/vite
[efp-local]: https://www.electronforge.io/config/plugins/local-electron
[efp-fuses]: https://www.electronforge.io/config/plugins/fuses
