# Sass Variables

- <https://sass-lang.com/documentation/variables>

Sass 变量名以 `$` 符开头。

| Variables make it possible to reduce repetition, do complex math, configure libraries, and much more.
| -
| 变量使 减少重复、做复杂的数学运算、配置库 等成为可能。

变量声明看起来很像属性声明 ( [Property Declaration][declarations] ) :

```scss
<variable>: <expression>;
```

## 1. 用法

与只能在样式规则 ( Style Rule ) 或 `@` 规则 ( [At-Rule][at-rules] ) 中声明的属性不同，变量可以在任何地方声明。

要使用变量，只需将其包含在值中。

SCSS :

```scss
$base-color: #c6538c;
$border-dark: rgba($base-color, 0.88);

.alert {
  border: 1px solid $border-dark;
}
```

=> CSS :

```css
.alert {
  border: 1px solid rgba(198, 83, 140, 0.88);
}
```

## 2. 命令式特性

与 CSS 变量是声明式 ( Declarative ) 的不同， Sass 变量是命令式 ( Imperative ) 的。

这意味着如果你使用了一个 Sass 变量，然后更改了它的值，那么之前使用的将保持不变。

SCSS SYNTAX :

```scss
$variable: value 1;
.rule-1 {
  value: $variable;
}

$variable: value 2;
.rule-2 {
  value: $variable;
}
```

=> CSS OUTPUT :

```css
.rule-1 {
  value: value 1;
}

.rule-2 {
  value: value 2;
}
```

## 3. 连字符 `-` 和下划线 `_`

与 Sass 其他所有标识符一样， Sass 变量将连字符和下划线视为相同的。

这意味着 `$font-size` 和 `$font_size` 都是引用同一个变量。

这是 Sass 非常早期的历史遗留，当时它只允许在标识符名称中使用下划线 ( Underscores ) 。

## 4. 默认值 `!default`

Sass 提供 `!default` 标识符，只有当变量未定义或其值为 `null` 时，才会将值赋给变量，否则将使用现有值。

通常在编写 Sass 库时经常使用该语法，来构成可配置的模块，这样能实现在用户使用库的变量生成 CSS 之前来配置它们。

用 `!default` 定义的变量，可以在加载模块时使用 `@use` 规则来配置。

Sass 库经常使用 `!default` 变量，来允许他们的用户来配置库的 CSS 。

使用以下语法来加载一个带有配置的模块：

```scss
@use <url> with (
  <variable>: <value>,
  <variable>: <value>
);
```

配置的值将覆盖变量的默认值。

只有在样式表 ( Stylesheet ) 的顶层写的带有 `!default` 标识的变量才能被配置。

SCSS SYNTAX :

```scss
// _library.scss

$black: #000 !default;
$border-radius: 0.25rem !default;
$box-shadow: 0 0.5rem 1rem rgba($black, 0.15) !default;

code {
  border-radius: $border-radius;
  box-shadow: $box-shadow;
}
```

```scss
// style.scss

@use 'library' with (
  $black: #222,
  $border-radius: 0.1rem
);
```

=> CSS OUTPUT :

```css
code {
  border-radius: 0.1rem;
  box-shadow: 0 0.5rem 1rem rgba(34, 34, 34, 0.15);
}
```

> - 目前只有 Dart Sass 支持 `@use` 语法，
> - 其他实现（如 LibSass , Ruby Sass 等）的用户必须使用 `@import` 规则。

## 5. 内置变量

由内置模块 ( [Built-in Module][modules] ) 定义的变量不能被修改。

```scss
@use 'sass:math' as math;

// 此赋值将失败
math.$pi: 0;
```

## 6. 作用范围

在样式表顶层声明的变量是全局的 ( Global ) ，全局变量可以在模块的任何地方访问它们。

在块中声明的通常是局部的 ( Local ) ，并且只能在它们被声明的块中访问。

```scss
$global-variable: global value;

.content {
  $local-variable: local value;
  global: $global-variable;
  local: $local-variable;
}
```

### 6.1 遮蔽 Shadowing

局部变量与全局变量可以同名，此时实际上会有两个具有相同名称的不同变量。

在块局部将访问局部变量，不仅不会察觉到同名的全局变量，而且也不会意外的更改全局变量的值。

```scss
$variable: global value;

.content {
  $variable: local value;
  value: $variable;
}

.sidebar {
  value: $variable;
}
```

=>

```css
.content {
  value: local value;
}

.sidebar {
  value: global value;
}
```

若需要在局部作用域（例如在 mixin 中）设置全局变量的值，可以使用 `!global` 标识。

```scss
$variable: first global value;

.content {
  $variable: second global value !global;
  value: $variable;
}

.sidebar {
  value: $variable;
}
```

=>

```css
.content {
  value: second global value;
}

.sidebar {
  value: second global value;
}
```

`!global` 标识只能用于设置已经在文件顶层声明过的变量，不能用于声明新变量。

### 6.2 流控制作用域 Flow Control Scope

在流控制规则 ( [Flow Control Rules][flow-control-rules] ) 中声明的变量遵循以下作用域规则：

- 它们不会在与流控制规则相同的级别上遮蔽变量。
- 相反，它们只是给这些变量赋值。

```scss
$dark-theme: true !default;
$primary-color: #f8bbd0 !default;
$accent-color: #6a1b9a !default;

@if $dark-theme {
  $primary-color: darken($primary-color, 60%);
  $accent-color: lighten($accent-color, 60%);
}

.button {
  background-color: $primary-color;
  border: 1px solid $accent-color;
  border-radius: 3px;
}
```

=>

```css
.button {
  background-color: #750c30;
  border: 1px solid #f5ebfc;
  border-radius: 3px;
}
```

流控制作用域中的变量可以赋值给外部作用域中的现有变量，但它们不能在作用域中声明新的变量。

## 7. 高级变量函数

Sass 核心库提供了两个处理变量的高级函数：

- `meta.variable-exists()` - 用于判断给定名称（不包含 `$` 符）的变量是否存在于当前作用域中
- `meta.global-variable-exists()` - 用于判断给定名称（不包含 `$` 符）的变量是否存在于全局作用域中

用户有时希望基于另一个变量使用插值来定义变量名，但 Sass 不允许这样做，因为这样很难一眼看出这些变量定义在哪里。
你可以使用一个从名称到值的映射，然后可以使用变量访问该映射：

```scss
@use 'sass:map';

$theme-colors: (
  'success': #28a745,
  'info': #17a2b8,
  'warning': #ffc107
);

.alert {
  // 代替 $theme-color-#{warning}
  background-color: map.get($theme-colors, 'warning');
}
```

=>

```css
.alert {
  background-color: #ffc107;
}
```

[declarations]: https://sass-lang.com/documentation/style-rules/declarations
[at-rules]: https://sass-lang.com/documentation/at-rules
[modules]: https://sass-lang.com/documentation/modules
[flow-control-rules]: https://sass-lang.com/documentation/at-rules/control
