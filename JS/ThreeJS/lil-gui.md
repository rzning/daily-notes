# lil-gui

- <https://lil-gui.georgealways.com/>

- <https://github.com/georgealways/lil-gui>

> Makes a floating panel for controllers on the web.

为 Web 上的控制器创建一个控制面板。

## Guide

### 0️⃣ 安装 Installation

通过 npm 安装：

```sh
$ npm install lil-gui --save-dev
```

```js
import GUI from 'lil-gui'
```

从 CDN 导入：

```html
<script type="module">
  import GUI from 'https://cdn.jsdelivr.net/npm/lil-gui@0.18/+esm'
</script>
```

```html
<script src="https://cdn.jsdelivr.net/npm/lil-gui@0.18"></script>
<script>
  var GUI = lil.GUI
</script>
```

### 1️⃣ 添加控制器 Adding Controllers

lil-gui 将根据属性的数据类型选择合适的控制器。

```js
const gui = new GUI()
```
