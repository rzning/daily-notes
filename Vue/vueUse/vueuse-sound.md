# @vueuse/sound

- <https://github.com/vueuse/sound>
- <https://sound.vueuse.org/>
- <https://vueuse.org/add-ons.html#sound-vueuse-sound>

> 🔊 A Vue composable for playing sound effects

- 基于强大的、久经考验的音频工具 : [Howler.js](https://howlerjs.com/)
- 此包是 [useSound](https://github.com/joshwcomeau/use-sound) React Hook 的 Vue 版本。

## Installation

```sh
yarn add @vueuse/sound
```

## Examples

```vue
<template>
  <button @click="play">点击播放</button>
</template>

<script>
import { useSound } from '@vueuse/sound'
import buttonSfx from '../assets/sounds/button.mp3'

export default {
  setup() {
    const { play } = useSound(buttonSfx)

    return {
      play
    }
  }
}
</script>
```

## API

```js
useSound(url, ComposableOptions)
```

- `url` - 它将加载的声音的 URL
- `ComposableOptions` - 一个配置对象，选项如下所示：

| 选项名称     | 值                 | 说明                                       |
| ------------ | ------------------ | ------------------------------------------ |
| volume       | number ( 0 ~ 1 )   | 音量                                       |
| playbackRate | number ( 0.5 ~ 4 ) | 播放速度                                   |
| interrupt    | boolean            | 是否可重叠                                 |
| soundEnabled | boolean            | 是否静音                                   |
| sprite       | SpriteMap          | 精灵，使用一个 `useSound` 合成多个声音效果 |
| [delegated]  | --                 | 任何附加参数都将被传递给 `Howl` 构造函数   |

### `play()` 函数

```js
const { play } = useSound('/meow.mp3')

const playOptions = {
  // 精灵标识
  id: '...'
  // 用于覆盖 useSound() 的 soundEnabled 选项
  // 一般不需要此选项，除非想在静音按钮上触发声音
  forceSoundEnabled: true
  // 指定播放速率
  playbackRate: 0.75
}

play(playOptions)
```

### ExposedData

```js
const [play, exposedData] = useSound('/meow.mp3')

// 停止播放
exposedData.stop()

// 暂停播放
exposedData.pause()

// 判断是否正在播放
if (exposedData.isPlaying) {
  // ...
}
```

| exposedData | 值                      | 说明                                               |
| ----------- | ----------------------- | -------------------------------------------------- |
| `stop()`    | `(id?: string) => void` | 停止                                               |
| `pause()`   | `(id?: string) => void` | 暂停                                               |
| `isPlaying` | `boolean`               | 是否正在播放                                       |
| `duration`  | `number \| null`        | 样本时长，单位为毫秒。对于精灵，它是整个文件的长度 |
| `sound`     | `Howl \| null`          | 底层 `Howl` 实例，参考 [Howler] 文档               |

[Howler]: https://github.com/goldfire/howler.js

## 精灵 Sprites

音频精灵是包含多个样本的单一音频文件。

比起加载许多独立的声音，你可以加载一个文件并将其分割成多个可以独立触发的部分。

对于精灵，我们需要定义一个 `SpriteMap` ,例如：

```js
const spriteMap = {
  laser: [0, 300],
  explosion: [1000, 300],
  meow: [2000, 75]
}
```

`SpriteMap` 是一个对象，其中 Key 是单个声音的 `id` ，值是一个包含 2 个元素的元组：

- 第一项为样本的开始时间（以毫秒为单位）
- 第二项为样本的长度（以毫秒为单位）

我们可以将 `SpriteMap` 作为 `ComposableOptions` 传递：

```js
const { play } = useSound('/path/to/sprite.mp3', {
  sprite: spriteMap
})
```

为播放特定的精灵，在调用 `play()` 函数时传递其 `id` 标识：

```html
<button @click="play({ id: 'laser' })">Play</button>
```

## Vite

如果你使用的是 Vite ，你应该在 `vite.config.js` 中的 `defineConfig` 选项中添加以下内容：

```js
optimizeDeps: {
  exclude: ['vue-demi']
}
```
