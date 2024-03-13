微信小程序 > 开发 > API > 画布

# 画布

| 方法                                | 返回                                | 说明                                           |
| ----------------------------------- | ----------------------------------- | ---------------------------------------------- |
| [`wx.createOffscreenCanvas()`][1.1] | [OffscreenCanvas](#offscreencanvas) | 创建离屏 canvas 实例                           |
| [`wx.createCanvasContext()`][1.2]   | [CanvasContext](#canvascontext)     | 创建 canvas 的绘图上下文对象                   |
| [`wx.canvasToTempFilePath()`][1.3]  |                                     | 把当前画布指定区域的内容导出生成指定大小的图片 |
| [`wx.canvasPutImageData()`][1.4]    |                                     | 将像素数据绘制到画布                           |
| [`wx.canvasGetImageData()`][1.5]    |                                     | 获取 canvas 区域隐含的像素数据                 |

```ts
declare interface wx {
  /**
   * 创建离屏 canvas 实例
   */
  createOffscreenCanvas(): OffscreenCanvas

  /**
   * 创建 canvas 的绘图上下文对象
   */
  createCanvasContext(canvasId: string, component: object): CanvasContext
}
```

## Canvas

> [dev/api/canvas/Canvas](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/Canvas.html)

## CanvasContext

> [dev/api/canvas/CanvasContext](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/CanvasContext.html)

## CanvasGradient

## OffscreenCanvas

> [dev/api/canvas/OffscreenCanvas](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/OffscreenCanvas.html)

[1.1]: https://developers.weixin.qq.com/miniprogram/dev/api/canvas/wx.createOffscreenCanvas.html
[1.2]: https://developers.weixin.qq.com/miniprogram/dev/api/canvas/wx.createCanvasContext.html
[1.3]: https://developers.weixin.qq.com/miniprogram/dev/api/canvas/wx.canvasToTempFilePath.html
[1.4]: https://developers.weixin.qq.com/miniprogram/dev/api/canvas/wx.canvasPutImageData.html
[1.5]: https://developers.weixin.qq.com/miniprogram/dev/api/canvas/wx.canvasGetImageData.html
