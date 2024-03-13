示例：使用 `按钮 btn` 触发 `选择文件 input 控件` 单击事件。

```html
<button id="btn">打开</button>
<input id="input" type="file" />
<script>
  var btn = document.getElementById('btn')
  var input = document.getElementById('input')
  btn.addEventListener(
    'click',
    function () {
      input.dispatchEvent(new MouseEvent('click'))
    },
    false
  )
</script>
```

参考：

- [EventTarget.dispatchEvent - Web API 接口 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/dispatchEvent)
- [创建和触发 events - Web开发者指南 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/Guide/Events/Creating_and_triggering_events)
- [Event - Web API 接口 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Event)
- [鼠标事件 - Web API 接口 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent)
