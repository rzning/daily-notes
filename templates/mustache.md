# Mustache

> 一个轻量的模板引擎

- site : <http://mustache.github.io/>
- Ruby : <https://github.com/mustache/mustache>
- javaScript : <https://github.com/janl/mustache.js>

# [mustache.js]
> Logic-less {{mustache}} templates with JavaScript

### 安装

```bash
$ npm install mustache --save
```

```bash
$ yarn add mustache
```

```bash
$ bower install --save mustache
```

### 命令行工具

```bash
$ mustache dataView.json myTemplate.mustache > output.html
```

> - `dataView.json` - 数据文件
> - `myTemplate.mustache` - 模板文件
> - `output.html` - 输出文件

### 使用

```js
var view = {
  city: 'Louyang',
  calc: function() {
    retrun (29+16)/2;
  }
};

var tpl = 'The avarage temperature in {{city}} today is {{calc}}';

var output = Mustache.render(tpl, view);
```

### API

```js
Mustache.render(
  template  : String,
  view      : Object,
  partials? : Object
) => String

Mustache.parse(
  template            : String,
  tags = ['{{', '}}'] : Tags
) => String

interface Tags [String, String]
```

> 类型标记方法参考 [rtype] - JavaScript 直观类型标记




[mustache.js]: <http://github.com/janl/mustache.js>
[rtype]: <https://github.com/ericelliott/rtype>
