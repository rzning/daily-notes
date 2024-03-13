# Sortable

- <https://github.com/RubaXa/Sortable>
- <http://rubaxa.github.io/Sortable/>

一个 JavaScript 库，可以在现代浏览器和触摸设备上重新排列拖放列表。

---

## Inatall

```bash
$ npm install sortablejs --save
```

```bash
$ yarn add sortablejs
```

```bash
$ bower install --save sortablejs
```

## CDN

```html
<!-- @1.6.1 -->
<script src="https://cdn.jsdelivr.net/npm/sortablejs@1.6.1/Sortable.min.js"></script>

<!-- @latest 1.7.0 -->
<script src="https://cdn.jsdelivr.net/npm/sortablejs@latest/Sortable.min.js"></script>
```

## Usage

```html
<ul id="list">
  <li>item 1</li>
  <li>item 2</li>
  <li>item 3</li>
  <li>item 4</li>
</ul>

<script>
  var elem = document.getElementById('list')
  var sortable = Sortable.create(elem)
</script>
```

## Options

```js
var sortable = new Sortable(elem, {
  group: 'name',
  delay: 0,
  animation: 150,
  touchStartThreshold: 0,
  handle: '.my-handle',
  store: null,
  sort: true
})
```

## Reference

- [拖放排序插件Sortable.js - 国外插件的中文文档 - SegmentFault 思否](https://segmentfault.com/a/1190000008209715)
- [Sortable.js拖拽排序使用方法解析 - javascript技巧 - 脚本之家](https://www.jb51.net/article/96446.htm)
