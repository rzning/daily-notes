# @electron/get

- <https://github.com/electron/get>

> Download Electron release artifacts

用于下载 Electron 发布的基于不同平台预编译二进制文件。

```sh
yarn add @electron/get --dev
```

## 使用 Usage

简单示例：下载一个 Electron 二进制 ZIP 文件

```js
import { download } from '@electron/get'

// 在 async 函数中使用此方法，从 Node 12 开始不支持顶级 await
const zipFilePath = await download('29.0.1')
```

高级示例：下载一个 MacOS Electron 符号文件

```js
import { downloadArtifact } from '@electron/get'

async function getSymbolsFile() {
  const zipFilePath = await downloadArtifact({
    version: '29.0.1',
    platform: 'darwin',
    artifactName: 'electron',
    artifactSuffix: 'symbols',
    arch: 'x64'
  })

  return zipfilePath
}
```

## 指定镜像 Specifying a Mirror

要指定从另一个位置下载 Electron 资产，可以使用 `mirrorOptions` 选项：

```ts
interface MirrorOptions {
  /**
   * 要从中下载镜像的基本 URL
   * @example 'https://github.com/electron/electron/releases/download'
   */
  mirror?: string
  /**
   * Electron 每晚构建镜像 URL
   */
  nightlyMirror?: string
  /**
   * 要从中下载的目录的名称，通常按版本号限定范围
   * @example 'v29.0.1'
   */
  customDir?: string
  /**
   * 要下载资产的名称
   * @example 'electron-v29.0.1-linux-arm64.zip'
   */
  customFilename?: string
  /**
   * 要下载资产的版本
   * @example '29.0.1'
   */
  customVersion?: string
  /**
   * 一个函数，用于自定义从 getArtifactRemoteURL() 返回的 URL
   */
  resolveAssetURL?: (opts: any) => Promise<string>
}
```

根据 `mirrorOptions` 解析下载 URL 为：

```
https://github.com/electron/electron/releases/download/v29.0.1/electron-v29.0.1-linux-arm64.zip
|                                                     |       |                               |
|---------------- mirror / nightlyMirror -------------|-------|------- customFilename --------|
                                                          |
                                                      customDir
```

示例：

```js
import { download } from '@electron/get'

async function getZipFile() {
  const zipFilePath = await download('29.0.1', {
    mirrorOptions: {
      mirror: 'https://npmmirror.com/mirrors/electron/',
      customDir: 'v29.0.1',
      customFilename: 'electron-v29.0.1-linux-x64.zip'
    }
  })
  // 将从 https://npmmirror.com/mirrors/electron/v29.0.1/
  // 下载 electron-v29.0.1-linux-x64.zip

  return zipFilePath
}
```

`customDir` 可以使用 `{{ version }}` 占位符，它将会被指定的版本替换：

```js
async function getZipFile() {
  const zipFilePath = await download('29.0.1', {
    mirrorOptions: {
      mirror: 'https://mirror.example.com/electron/',
      customDir: 'version-{{ version }}',
      platform: 'linux',
      arch: 'x64'
    }
  })
  // 将从 https://mirror.example.com/electron/version-29.0.1/
  // 下载 electron-v29.0.1-linux-x64.zip

  return zipFilePath
}
```

## 使用环境变量 Using Environment Variables

镜像选项也可以通过以下环境变量指定：

- `ELECTRON_CUSTOM_DIR` - 指定要从中下载的自定义目录
- `ELECTRON_CUSTOM_FILENAME` - 指定要下载的自定义文件名
- `ELECTRON_MIRROR` - 指定要从中下载的服务器 URL
- `ELECTRON_NIGHTLY_MIRROR` - 指定要下载的夜间更新版本的服务器 URL
- `ELECTRON_CUSTOM_VERSION` - 用于指定要下载的版本

设置 `ELECTRON_CUSTOM_VERSION` 环境变量将覆盖传递给 `download()` 或 `downloadArtifact()` 的版本。

## 工作原理 How It Works

该模块将 Electron 下载到系统上的已知位置，并对其进行缓存，以便将来对该资产的请求可以立即返回。

默认缓存位置为：

- Linux: `$XDG_CACHE_HOME` or `~/.cache/electron/`
- MacOS: `~/Library/Caches/electron/`
- Windows: `%LOCALAPPDATA%/electron/Cache` or `~/AppData/Local/electron/Cache/`

默认情况下，模块使用 [got] 作为下载器。

因此，你可以通过 `downloadOptions` 使用与 [got] 相同的 [options][got-options] 。

[got]: https://github.com/sindresorhus/got
[got-options]: https://github.com/sindresorhus/got/blob/main/documentation/2-options.md
