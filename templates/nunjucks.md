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

### 标签 Tags

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

`extends` 用于指定模板继承：

```jinja
{% extends "base.html" %}

{% extends parentTemplate %}

{% extends name + ".html" %}`.
```

</details>

<details>
<summary>block</summary>

`block` 用于在模板上定义一个区块，并用名称标识它，以便在模板继承中使用。

父模板定义的区块，子模板可以用新内容覆盖它们。

```jinja
{% block css %}
<link rel="stylesheet" href="app.css" />
{% endblock %}
```

在循环中定义区块：

```jinja
{% for item in items %}
{% block item %}{{ item }}{% endblock %}
{% endfor %}
```

子模版中覆盖 `item` 区块内容：

```jinja
{% extends "item.njk" %}

{% block item %}
条目的名称是： {{ item.name }}
{% endblock %}
```

你还可以在子模板中调用 `super()` 函数来渲染父区块中的内容。

</details>

<details>
<summary>include</summary>

`include` 用来引入其他模板，这可以帮助我们将模板切分成更小的部分。

```jinja
{% include "item.njk" %}
```

在循环中引入模板：

```jinja
{% for item in items %}
{% include "item.njk" %}
{% endfor %}
```

</details>

<details>
<summary>import</summary>

`import` 用来加载一个不同的模板，并允许你访问其导出的值。

模板中定义的宏 ( Macros ) 和使用 `set` 定义的顶级域值将会导出，允许你在不同模板中访问它们。

默认情况，从 `import` 导入的模板没有当前模板的上下文，因此它们不能访问当前模板中的任何变量。

例如，在表单模板 `forms.njk` 中定义了字段 `field` 和标签 `label` 宏：

```jinja
{% macro field(name, value='', type='text') %}
<div class="field">
  <input type="{{ type }}" name="{{ name }}"
         value="{{ value | escape }}" />
</div>
{% endmacro %}

{% macro label(text) %}
<div>
  <label>{{ text }}</label>
</div>
{% endmacro %}
```

使用 `import` 导入上面模板，并将其导出值绑定到 `forms` 变量上：

```jinja
{% import "forms.njk" as forms %}

{{ forms.label('用户名') }}
{{ forms.field('user') }}
{{ forms.label('密码') }}
{{ forms.field('pass', type='password') }}
```

你也可以使用 `from import` 命令将模板中的指定值导入到当前命名控件中：

```jinja
{% from "forms.njk" import field, label as description %}

{{ description('用户名') }}
{{ field('user') }}
{{ description('密码') }}
{{ field('pass', type='password') }}
```

在 `import` 命令末尾添加 `with context` 可使导入的模板使用当前上下文进行处理：

```jinja
{% from "forms.njk" import field with context %}
```

</details>

<details>
<summary>raw</summary>

如果你想输出任何特殊的 nunjacks 标签，比如 `{{` ，
你可以使用 `{% raw %}` 块，其中的任何内容都将作为纯文本输出。

</details>

<details>
<summary>verbatim</summary>

`{% verbatim %}` 与 `{% raw %}` 具有相同的行为。
它是为了与 Twig 逐字标签兼容而添加的。

</details>

<details>
<summary>filter</summary>

`filter` 区块允许你使用区块中的内容调用过滤器：

```jinja
{% filter title %}
愿原力与你同在 may the force be with you
{% endfilter %}

{% filter replace("force", "forth") %}
may the force be with you
{% endfilter %}
```

</details>

<details>
<summary>call</summary>

`call` 区块允许使用标记内的所有文本调用宏。

如果希望将大量内容传递到宏中，这将非常有用。

在宏中，你可以调用 `caller()` 获取这些内容。

```jinja
{% macro add(x, y) %}
{{ caller() }}: {{ x + y }}
{% endmacro%}

{% call add(1, 2) -%}
结果是：
{%- endcall %}
```

上例将输出："结果是：3"

</details>

### 位置 positional 参数和关键字 keyword 参数

```jinja
{% macro foo(x, y, z=5, w=6) %}
{{ x }}, {{ y }}, {{ z }}, {{ w}}
{% endmacro %}

{{ foo(1, 2) }}        -> 1, 2, 5, 6
{{ foo(1, 2, w=10) }}  -> 1, 2, 5, 10

{# 将位置参数指定为关键字参数 #}
{{ foo(20, y=21) }}     -> 20, 21, 5, 6


{# 使用位置参数代替关键字参数 #}
{{ foo(5, 6, 7, 8) }}   -> 5, 6, 7, 8

{# 跳过位置参数 #}
{{ foo(8, z=7) }}      -> 8, , 7, 6
```

### 注释 Comments

可以使用 `{#` 和 `#}` 编写注释。在渲染时，注释被完全去除。

```jinja
{# 循环遍历所有用户 #}
{% for user in users %}...{% endfor %}
```

### 空白字符控制 Whitespace Control

模板引擎默认会逐字输出变量和标记块以外的所有内容，并保留文件中的所有空白。

你可以在开始 / 结束块或变量中添加 `-` 号来告诉引擎删除所有前导或尾随空格。

- `-%}` - 去除标签右侧的空白字符
- `{%-` - 去除标签之前的空白字符

```jinja
{% for i in [1,2,3,4,5] -%}
  {{ i }}
{%- endfor %}
```

上面代码将准确输出 `12345` 。

### 表达式 Expressions

你可以使用 JavaScript 中常用的类型字面量表达式：

- Strings: `"How are you?"`
- Numbers: `40`, `30.123`
- Arrays: `[1, 2, "array"]`
- Dicts: `{ one: 1, two: 2 }`
- Boolean: `true`, `false`

1️⃣ 数学运算 Math

| 加法     | 减法        | 除法     | 取整除         | 取模   | 乘法           | 乘方  |
| -------- | ----------- | -------- | -------------- | ------ | -------------- | ----- |
| Addition | Subtraction | Division | Floor Division | Modulo | Multiplication | Power |
| `+`      | `-`         | `/`      | `//`           | `%`    | `*`            | `**`  |

```jinja
{{ 2 + 3 }}
```

2️⃣ 比较运算符 Comparisons

`==` , `===` , `!=` , `!==` , `>` , `>=` , `<` , `<=`

```jinja
{% if i == 0 %}...{% endif %}
```

3️⃣ 逻辑运算符 Logic

- `and` - 与
- `or` - 或
- `not` - 非
- 使用 `( ... )` 进行分组

```jinja
{% if (x < 5 or y < 5) and not foo %}...{% endif %}
```

4️⃣ 条件表达式 IF Expression

类似于 JavaScript 的三元运算符 ( Ternary Operator ) ，可以使用 if 内联表达式：

```jinja
{{ "true" if foo else "false" }}

{# 给 foo 指定默认值 #}
{{ baz(foo if foo else "default") }}

{# else 是可选的 #}
{{ "true" if foo }}
```

5️⃣ 函数调用 Function Calls

如果你已经将 JavaScript 方法传递给模板，则可以直接调用：

```jinja
{{ foo(1, 2, 3) }}
```

6️⃣ 正则表达式 Regular Expressions

可以像 JavaScript 一样创建者则表达式，但需要使用 `r` 作为前缀：

```jinja
{% set regExp = r/^foo.*/g %}
{% if regExp.test('foo') %}
  Foo in the house!
{% endif %}
```

正则支持下列标识：

- `g` : 全局应用 apply globally
- `i` : 不区分大小写 case insensitive
- `m` : 多行 multiline
- `y` : 粘性 sticky

### 自动转义 Autoescaping

如果在环境变量中指定了 autoescaping 则所有的输出都将自动转义，以确保安全输出。

可以使用安全 `safe` 过滤器来取消转义。

```jinja
{{ foo }}           // &lt;span%gt;
{{ foo | safe }}    // <span>
```

关闭全局自动转义，可以使用转义 `escape` 过滤器手动转义变量：

```jinja
{{ foo }}           // <span>
{{ foo | escape }}  // &lt;span&gt;
```

### 全局函数 Global Functions

1️⃣ `range([start], stop, [step])`

遍历指定范围的数字：

- `start` - 起始数字，默认为 `0`
- `stop` - 结束数字
- `step` - 间隔，默认为 `1`

```jinja
{% for i in range(0, 5) -%}
  {{ i }},
{%- endfor %}

{# 输出 : 0,1,2,3,4 #}
```

2️⃣ `cycler(item1, item2, ...itemN)`

循环遍历多个值：

```jinja
{% set cls = cycler("odd", "even") %}
{% for row in rows %}
  <div class="{{ cls.next() }}">{{ row.name }}</div>
{% endfor %}
```

上例输出中奇数行的类名为 `odd` ，偶数行的类名为 `even` 。

你可以使用 `current` 属性来访问当前项，上面例子中为 `cls.current` 。

3️⃣ `joiner([separator])`

使用逗号等分隔符组合多个项目时，可使用 joiner 去除第一次调用

- `separator` - 自定义分隔符，默认为 ',' 逗号。

```jinja
{% set tags = ['food', 'beer', 'dessert'] %}
{% set comma = joiner() %}

{% for tag in tags -%}
  {{ comma() }} {{ tag }}
{%- endfor %}
```

上例将输出： `food, beer, dessert` 。

## 参考

- [Nunjucks 中文网](https://www.nunjucks.cn/)
- [Nunjucks 中文文档 - BootCSS](https://nunjucks.bootcss.com/)
