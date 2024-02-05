# Nunjucks

- <https://mozilla.github.io/nunjucks/>
- <https://github.com/mozilla/nunjucks>

Nunjucks 是一个全功能的 javascript 模板引擎。

```sh
npm install nunjucks
```

## 使用

渲染字符串：

```js
nunjucks.configure({ autoescape: true })
nunjucks.renderString('Hello {{ username }}', { username: 'James' })
```

使用 `render()` 渲染文件：

```js
// views 为指定的相对路径
nunjucks.configure('views', { autoescape: true })
nunjucks.render('index.html', { foo: 'bar' })
```

与 Express 集成：

```js
var app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app
})

app.get('/', function (req, res) {
  res.render('index.html')
})
```

## 模板 Templates

Nunjucks 是 [jinja2] 的 javascript 的实现，推荐使用 `.njk` 作为文件扩展名。

[jinja2]: https://palletsprojects.com/p/jinja/

支持 Nunjucks 的 jinja 语法高亮显示插件：

- vscode : <https://github.com/ronnidc/vscode-nunjucks>

### 变量 Variables

```jinja
{{ username }}
{{ foo.bar }}
{{ foo["bar"] }}
```

### 过滤器 Filters

```jinja
{{ foo | title }}
{{ foo | join(",") }}
{{ foo | replace("foo", "bar") | capitalize }}
```

select 过滤器示例：

```jinja
{% set numbers=[0, 1, 2, 3, 4, 5] %}

{{ numbers | select("odd") | join }}            => 135 （奇数）
{{ numbers | select("even") | join }}           => 024 （偶数）
{{ numbers | select("divisibleby", 3) | join }} => 03  （被 3 整除）
{{ numbers | select() | join }}                 => 12345 （对每个对象计算为布尔值）
```

<details>
<summary><b>过滤器列表</b></summary>
        
| 过滤器     | 说明                                                                         |
| ---------- | ---------------------------------------------------------------------------- |
| abs        | 绝对值                                                                       |
| batch      | 批处理列表项                                                                 |
| capitalize | 首字母大写                                                                   |
| center     | 将值居中到给定宽度的字段中                                                   |
| default    | 指定默认值 `default(value, default, [boolean])` （别名 `d` ）                |
| dictsort   | 字典排序                                                                     |
| dump       | 在对象上调用 `JSON.stringify()`                                              |
| escape     | 将字符串中的 `&` , `<` , `>` , `'` 和 `"` 转换为 HTML 安全序列 （别名 `e` ） |
| float      | 将一个值转换为浮点数                                                         |
| first      | 获取数组中的第一项                                                           |
| groupby    | 按指定属性，对一系列对象进行分组                                             |
| indent     | 使用空格缩进字符串，默认缩进 4 个空格                                        |
| int        | 将值转换为整数                                                               |
| join       | 将序列转为字符串连接 join(',', 'property')                                   |
| last       | 获取数组中的最后一项                                                         |
| length     | 返回数组或字符串的长度                                                       |
| list       | 将值转换为列表                                                               |
| lower      | 将字符串全部转换为小写                                                       |
| nl2br      | 使用 HTML `<br />` 标签替换新行                                              |
| random     | 从数组中随机选择一个值                                                       |
| reject     | 通过对每个对象应用测试来筛选对象序列，并拒绝测试成功的对象                   |
| rejectattr | 与 `selectattr` 过滤器相反，筛选对象序列                                     |
| replace    | 替换值                                                                       |
| reverse    | 反转字符串                                                                   |
| round      | 对数值四舍五入                                                               |
| safe       | 将值标记为安全，意味着在启用自动转义的环境中，将不对其转义                   |
| select     | 通过对每个对象应用测试来筛选对象序列，并且只选择测试成功的对象               |
| selectattr | 通过对每个对象的指定属性应用测试来筛选对象序列，并且只选择测试成功的对象。   |
| slice      | 对数组进行切片                                                               |
| sort       | 对数组排序                                                                   |
| string     | 将对象转换为字符串                                                           |
| striptags  | 剥离 SGML/XML 标记并用一个空格替换相邻的空白                                 |
| sum        | 对数组项求和                                                                 |
| title      | 将字符串的第一个字母转为大写                                                 |
| trim       | 去掉前后空白                                                                 |
| truncate   | 返回字符串的截断副本，若被截断则追加 `...` 省略号                            |
| upper      | 将字符串转换为大写                                                           |
| urlencode  | 用于 URLs 的转义字符串，使用 UTF-8 编码                                      |
| urlize     | 将纯文本的 URLs 转换为可点击的链接                                           |
| wordcount  | 计算并输出字符串中的单词数                                                   |

</details>

### 模板继承 Template Inheritance

使用 `block` 和 `extends` 标签实现模板继承。

- `{% block %}` 标签定义了子模板可以填充的块。
- `block` 标记所做的就是告诉模板引擎子模板可以覆盖模板中的那些占位符。
- 可以在子区块中调用 `super()` 来渲染父区块内容。

parent.njk 父模板：

```jinja
{% block header %}
这是默认内容
{% endblock %}

<section class="left">
  {% block left %}
  {% endblock %}
</section>

<section class="right">
  {% block right %}
  这是更多内容
  {% endblock %}
</section>
```

child.njk 子模版：

```jinja
{% extends "parent.njk" %}

{% block left %}
  这是左侧边栏
{% endblock %}

{% block right %}
  这是右侧边栏
  {{ super() }}
{% endblock %}
```

output.html 输出：

```html
这是默认内容

<section class="left"> 这是左侧边栏 </section>

<section class="right"> 这是右侧边栏 这是更多内容 </section>
```

### 标签

<details>
<summary>if</summary>

分支结构

```jinja
{% if hungry %}
  我饿了
{% elif tired %}
  我累了
{% else %}
  我很好
{% endif %}
```

</details>

<details>
<summary>for</summary>

```js
var items = [
  { title: 'foo', id: 1 },
  { title: 'bar', id: 2 }
]
```

```jinja
<ul>
{% for item in items %}
  <li>{{ item.title }}</li>
{% else %}
  <li>若 items 为空数组，则渲染此消息。</li>
{% endfor %}
</ul>
```

支持 ES 迭代器，比如 `Map` 和 `Set` ：

```js
var fruits = new Map([
  ['banana', 'yellow'],
  ['apple', 'red'],
  ['peach', 'pink']
])
```

```jinja
{% for fruit, color in fruits %}
  {{ fruit }} 的颜色是 {{ color }}
{% endfor %}
```

Nunjucks 会将数组解开，数组内的值对应到变量：

```js
var points = [
  [0, 1, 2],
  [5, 6, 7],
  [12, 13, 14]
]
```

```jinja
{% for x, y, z in points %}
  点坐标 : {{ x }}, {{ y }}, {{ z }}
{% endfor %}

```

在循环中可以获取到下列特殊变量：

- `loop.index` : 当前循环数（从 1 索引）
- `loop.index0` : 当前循环数（从 0 索引）
- `loop.revindex` : 直到结束的迭代次数（从 1 索引）
- `loop.revindex0` : 直到结束的迭代次数（从 0 索引）
- `loop.first` : 是否第一次迭代
- `loop.last` : 是否最后一次迭代
- `loop.length` : 项目总数

</details>

<details>
<summary>asyncEach</summary>

> 只适用于异步模板。

`asyncEach` 是 `for` 的异步版本。

</details>

<details>
<summary>asyncAll</summary>

> 只适用于异步模板。

`asyncAll` 类似于 `asyncEach` ，不同之处在于它并行地呈现所有项，并且保留项的顺序。

</details>

<details>
<summary>macro</summary>

宏 `macro` 允许你定义可复用的内容块，类似与编程语言中的函数。

例如定义一个 字段 `field` 宏：

```jinja
{% macro field(name, value='', type='text') %}
<div class="field">
  <input type="{{ type }}" name="{{ name }}"
         value="{{ value | escape }}" />
</div>
{% endmacro %}
```

调用 `field` 宏：

```jinja
{{ field('user') }}
{{ field('pass', type='password') }}
```

</details>

<details>
<summary>set</summary>

使用 `set` 设置和修改变量：

```jinja
{% set username = "joe" %}
{{ username }}

{% set x, y, z = 5 %}
```

将一个区块赋值到变量，在某种情况下可以代替宏语法：

```jinja
{% set standardModal %}
    {% include 'standardModalData.html' %}
{% endset %}

<div class="js-modal" data-modal="{{standardModal | e}}">
```

</details>

<details>
<summary>extends</summary>
</details>

<details>
<summary>block</summary>
</details>

<details>
<summary>include</summary>
</details>

<details>
<summary>import</summary>
</details>

<details>
<summary>raw</summary>
</details>

<details>
<summary>verbatim</summary>
</details>

<details>
<summary>filter</summary>
</details>

<details>
<summary>call</summary>
</details>
