# Nostalgist.js

![logo](https://nostalgist.js.org/_astro/logo.683ad1d6_1c6Ij.webp)

- <https://nostalgist.js.org/>
- <https://github.com/arianrhodsandlot/nostalgist>

Nostalgist.js 是一个 JavaScript 库，允许你在网页浏览器中运行 NES 和 Sega Genesis 等复古主机的模拟器。

```js
import { Nostalgist } from 'nostalgist'

await Nostalgist.nes('flappybird.nes')
```

### Launch

```js
await Nostalgist.launch({
  core: 'fceumm',
  rom: 'flappybird.nes'
})
```

### Save & Load

```js
const nostalgist = await Nostalgist.nes('flappybird.nes')

const { state } = await nostalgist.saveState()

nostalgist.loadState(state)
```
