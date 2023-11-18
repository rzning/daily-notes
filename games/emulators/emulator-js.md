# EmulatorJS

- <https://www.emulatorjs.com/>

> Retro Gaming Online Emulator

复古游戏在线模拟器

[Ethan O'Brien's EmulatorJS][e-1] 和 [LinuxServer's EmulatorJS][e-2] 都有一个不起眼的开始，他们看到 <https://www.emulatorjs.com/> 上充斥着广告的服务，然后想 “我可以做得更好” 。

[e-1]: https://github.com/EmulatorJS/EmulatorJS
[e-2]: https://github.com/linuxserver/emulatorjs

## EmulatorJS/EmulatorJS

![logo](https://emulatorjs.org/favicon.ico)

- <https://emulatorjs.org/>
- <https://github.com/EmulatorJS/EmulatorJS>

EmulatorJS 是一个高度封装的模拟器。后端是 RetroArch 通过 Emscripten 编译成 WebAssembly (WASM)。

> 这个项目不隶属于 [linuxserver/emulatorjs](https://github.com/linuxserver/emulatorjs)

Demo :

- <https://demo.emulatorjs.org/>
- <https://demo.emulatorjs.org/data/loader.js>

从 4.0 版本开始 EmulatorJS 不再是 emulatorjs.com 项目的反向工程版本，现在它是完全重写的。

### 安装

1. 下载 [github project](mainzip) 并将其解压缩到你的 webserver 托管文件夹中。
2. 选择要嵌入的模拟器，然后将其代码复制并粘贴到 `index.html` 文件中，并编辑必要的字段。

[mainzip]: https://github.com/EmulatorJS/EmulatorJS/archive/refs/heads/main.zip

### NES 示例

```html
<div style="width:640px;height:480px;max-width:100%">
  <div id="game"></div>
</div>

<script type="text/javascript">
  EJS_player = '#game'

  // Can also be fceumm or nestopia
  EJS_core = 'nes'

  // 光束 Lightgun
  EJS_lightgun = false

  // BIOS 文件路径
  // example: https://dl.dropboxusercontent.com/s/[random-code]/bios.bin
  EJS_biosUrl = ''

  // 游戏 ROM 路径
  // example: https://dl.dropboxusercontent.com/s/[random-code]/mario.nes
  EJS_gameUrl = ''

  // 数据目录的路径
  EJS_pathtodata = 'data/'
</script>
<script src="data/loader.js"></script>
```

### 嵌入到 React 等单页面应用

要在 React 或 SPA 中嵌入 EmulatorJS ，唯一的方法是将 iframe 嵌入到页面中，并在该 iframe 中运行此模拟器。

你不能直接在页面上运行它，这将破坏单页面应用程序，并篡改 DOM 。

### 支持的系统

- Nintendo

  - Game Boy Advance
  - Famicom / NES
  - Virtual Boy
  - Game Boy
  - SNES
  - DS
  - 64

- Sega

  - Master System
  - Mega Drive
  - Game Gear
  - Saturn
  - 32X
  - CD

- Atari

  - 2600
  - 5200
  - 7800
  - Lynx
  - Jaguar

- Other

  - PlayStation
  - Arcade
  - 3DO
  - MAME 2003

## linuxserver/emulatorjs

- <https://github.com/linuxserver/emulatorjs>

自托管基于 web 的复古仿真前端与空间和艺术管理。

这个应用程序的目的是为那些希望在网页浏览器中运行复古游戏的人提供一个自托管的解决方案。

- 它包含一个用于扫描 ROMs 和摄取美术资产的后端应用程序，
- 以及一个用于通过任何基本 Web 服务器提供这些文件的静态前端应用程序。

后端应用程序或多或少是一次运行的交易，当你以你喜欢的方式最终确定菜单时，
前端的最终静态文件不再需要后端帮助程序。
