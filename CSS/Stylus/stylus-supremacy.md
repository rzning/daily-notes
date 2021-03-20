# Stylus Supremacy

Stylus Supremacy 是一个用于格式化 [Stylus] 文件的 JavaScript 库。
你也可以说是一个适用于 Stylus 语言的美化器 ( Beautifier ) 。

[Stylus]: <http://stylus-lang.com/>

## Command-line Usage

全局安装 NPM 包：

```sh
npm install stylus-supremacy -g
```

格式化文件，默认打印到控制台：

```sh
stylus-supremacy format ./style.styl
```

一次格式化多个文件：

```sh
stylus-supremacy format ./**/*.styl
```

使用 `--options` 或者 `-p` 指定配置文件：

```sh
stylus-supremacy format ./style.styl --options ./options.json
```

使用 `--outDir` 或者 `-o` 指定输出目录：

```sh
stylus-supremacy format ./style.styl --outDir ./ouput/directory
```

使用 `--replace` 或者 `-r` 参数来覆盖原文件：

```sh
stylus-supremacy format ./style.styl --replace
```

使用 `--compare` 或者 `-c` 来检查能否被正确格式化，并输出详细信息：

```sh
stylus-supremacy format ./style.styl --compare
```

注意 `--outDir` , `--replace` 和 `--compare` 三个参数不能同时使用。

## Programming Usage

```js
const stylusSupremacy = require('stylus-supremacy')

const stylusContent = `
body
  background-color #369
`

const result = stylusSupremacy.format(stylusContent, {
  insertColons: true,
  insertSemicolons: true,
  insertBraces: true
})

console.log(result)
//  body {
//    background-color: #369;
//  }
```

`format(content, options)` 方法始终返回格式化后的 Stylus 字符串，若出现错误则会抛出异常。

## Formatting Options

```jsonc
{
  // 插入冒号 : boolean
  "insertColons": true,
  // 插入分号 : boolean
  "insertSemicolons": true,
  // 插入花括号 : boolean
  "insertBraces": true,
  // 在 @import/@require(s) 周围插入空行
  // : true | false | "root" | "nested"
  "insertNewLineAroundImports": true,
  // 在区块周围插入新行
  // : true | false | "root" | "nested"
  "insertNewLineAroundBlocks": true,
  // 在一组 CSS 属性周围插入空行 : boolean
  "insertNewLineAroundProperties": false,
  // 在一组非属性、非导入、非区块的周围插入空行
  // : true | false | "root" | "nested"
  "insertNewLineAroundOthers": false,
  // 属性值按组折行 : boolean
  "preserveNewLinesBetweenPropertyValues": false,
  // 在注释前插入空格 : boolean
  "insertSpaceBeforeComment": true,
  // 在注释内容前插入空格 : boolean
  "insertSpaceAfterComment": true,
  // 在逗号后插入空格 : boolean
  "insertSpaceAfterComma": true,
  // 在圆括号内测插入空格 : boolean
  "insertSpaceInsideParenthesis": false,
  // 在负号后的值用圆括号包裹 : boolean
  "insertParenthesisAfterNegation": false,
  // 在 if 条件周围用圆括号包裹 : boolean
  "insertParenthesisAroundIfCondition": true,
  // 在 else 之前折行 : boolean
  "insertNewLineBeforeElse": false,
  // 小于 1 的小数值开头是否插入 0 : boolean
  "insertLeadingZeroBeforeFraction": true,
  // 选择器之间的分隔符
  // : "," | ", " | ",\n" | "\n"
  "selectorSeparator": ", ",
  // 缩进符，在 VSCode 扩展中不可用 : string
  "tabStopChar": "\t",
  // 换行符，在 VSCode 扩展中不可用 : "\n" | "\r\n"
  "newLineChar": "\n",
  // 字符串使用单引号还是双引号 : "'" | "\""
  "quoteChar": "'",
  // 属性排序
  // : false | "alphabetical" | "grouped" | array<string>
  "sortProperties": false,
  // 使用 @import 替换 @require
  "alwaysUseImport": false,
  // 使用 not 替换 !
  "alwaysUseNot": false,
  // 始终使用 @block
  "alwaysUseAtBlock": false,
  // 使用 @extands 替换 @extend
  "alwaysUseExtends": false,
  // 将 border 和 outline 属性的 0 替换为 none
  "alwaysUseNoneOverZero": false,
  // 始终使用不带参数的 0
  "alwaysUseZeroWithoutUnit": false,
  // 减少边距重复值
  "reduceMarginAndPaddingValues": false,
  // 匹配忽略文件 : array<string>
  // 示例 : ["bin/**", "src/vendors/**"]
  "ignoreFiles": []
}
```

> 从 2.4 版本开始开始配置选项添加 `stylusSupremacy.` 前缀，但为了向后兼容，可以省略它们。

> 配置文件默认使用 [JSON5] 进行解析，从 2.1.1 版本开始支持 [YAML 1.2] 解析。

[JSON5]: <https://json5.org/>
[YAML 1.2]: <https://yaml.org/spec/1.2/spec.html>

## Stylint Compatibility

- Stylint 兼容性

可以直接使用 `--options` 命令行参数引用 `.stylintrc` 配置文件：

```sh
stylus-supremacy format ./style.styl --options ./path/to/.stylintrc
```
