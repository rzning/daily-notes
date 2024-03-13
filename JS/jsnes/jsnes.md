# JSNES

A JavaScript NES emulator.

## Installation

npm:

```sh
$ npm install jsnes
```

yarn:

```sh
$ yarn add jsnes
```

unpkg:

```html
<script
  type="text/javascript"
  src="https://unpkg.com/jsnes/dist/jsnes.min.js"
></script>
```

## Usage

```js
// 初始化并设置输出
var nes = new jsnes.NES({
  onFrame(frameBuffer) {
    // ...
  },
  onAudioSample(left, right) {
    // ...
  }
})

// 从磁盘读取 ROM 数据
const fs = require('fs')
let romData = fs.readFileSync('path/to/rom.nes', {
  encoding: 'binary'
})

// 以字符串或字节数组加载 ROM 数据
nes.loadROM(romData)

// 以 60fps 或尽可能快的速度运行帧
nes.frame()
nes.frame()
// ...

// 将你拥有的任何输入设备连接到控制器
nes.buttonDown(1, jsnes.Controller.BUTTON_A)
nes.frame()
nes.buttonUp(1, jsnes.Controller.BUTTON_A)
nes.frame()
// ...
```
