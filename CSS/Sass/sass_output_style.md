# Sass 输出样式

Sass 允许您自定义 CSS 输出的显示方式。有四种输出样式可供选择。

- `:nested` - 嵌套
- `:expanded` - 展开
- `:compact` - 紧凑
- `:compressed` - 压缩

默认情况下，Sass 以嵌套样式 ( Nested Style ) 输出 CSS，该样式反映了文档结构。

你可以更改 Sass 输出 CSS 代码的方式，以反映给定时间的偏好或需求。

您可以使用 `:style` 选项或使用 `--style` 命令行标志在输出样式之间切换。

### 1. `:nested`

嵌套样式是 Sass 的默认样式。

处理大型 CSS 文件时，这种样式方式非常有用。
它使文件的结构更具可读性，并且易于理解。
每个属性都有自己的行，每个规则的缩进基于其嵌套的深度。

```sh
sass --watch styles.scss:styles.css --style nested
```

```css
div {
  padding: 20px;
  margin: 20px; }

.one {
  background: red; }

.two {
  background: yellow; }
```

### 2. `:expanded`

展开样式中每个属性和规则都占用一行。
属性在规则内缩进，但规则本身不会以任何特殊方式缩进。

```sh
sass --watch styles.scss:styles.css --style expanded
```

```css
div {
  padding: 20px;
  margin: 20px;
}

.one {
  background: red;
}

.two {
  background: yellow;
}
```

### 3. `:compact`

与嵌套和扩展样式相比，紧凑样式占用的空间要少得多。
它主要关注选择器，而不是其属性。
每个选择器占用一行，而其属性也位于同一行中。

```sh
sass --watch styles.scss:styles.css --style compact
```

```css
div { padding: 20px; margin: 20px; }

.one { background: red; }

.two { background: yellow; }
```

### 4. `:compressed`

压缩样式占用的空间尽可能最小，
它仅在文件末尾提供空格以分隔选择符和换行符。

压缩样式是生产站点的理想选择，在生产站点中，保持文件大小尽可能小很重要。

```sh
sass --watch styles.scss:styles.css --style compressed
```

```css
div{padding:20px;margin:20px}.one{background:red}.two{background:yellow}
```


### 参考

- [Sass Output Style - Quackit](https://www.quackit.com/sass/tutorial/sass_output_style.cfm)
- [Sass - Output Style - Tutorialspoint](https://www.tutorialspoint.com/sass/sass_output_style.htm)

