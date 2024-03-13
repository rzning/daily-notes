# canvas-confetti

- <https://github.com/catdad/canvas-confetti>

> 🎉 performant confetti animation in the browser

在浏览器中执行五彩纸屑动画。

## Install

```sh
npm install --save canvas-confetti
```

## Examples

以默认方式启动一些五彩纸屑：

```js
confetti()
```

扔一堆五彩纸屑：

```js
confetti({
  particleCount: 150
})
```

放一些五彩纸屑到很宽的地方：

```js
confetti({
  spread: 180
})
```

来点创意，从页面的任意部分启动一个小的五彩纸屑：

```js
confetti({
  // 粒子数
  particleCount: 100,
  // 启动速度
  startVelocity: 30,
  // 扩散
  spread: 360,
  // 起点
  origin: {
    x: Math.random(),
    y: Math.random() - 0.2
  }
})
```

在 30 秒内从多个方向连续发射越来越多的五彩纸屑：

```js
// 持续 30 秒
var duration = 30 * 1000
var end = Date.now() + duration

;(function frame() {
  // 从左边边缘发射一些五彩纸屑
  confetti({
    particleCount: 7,
    angle: 60,
    spread: 55,
    origin: { x: 0 }
  })
  // 然后从右边缘发射几枚
  confetti({
    particleCount: 7,
    angle: 120,
    spread: 55,
    origin: { x: 1 }
  })

  // 持续调用，直到时间结束
  if (Date.now() < end) {
    requestAnimationFrame(frame)
  }
})()
```
