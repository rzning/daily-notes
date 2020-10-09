declare namespace wx {
  /**
   * 创建离屏 canvas 实例
   */
  function createOffscreenCanvas(): OffscreenCanvas;

  /**
   * 创建 canvas 的绘图上下文 CanvasContext 对象
   * @param canvasId 要获取上下文的 canvas 组件 canvas-id 属性
   * @param component 自定义组件下的当前组件实例 this
   */
  function createCanvasContext(canvasId: string, component?: object): CanvasContext;
}

declare interface CanvasContext {
  //
}

declare interface OffscreenCanvas {
  //
}
