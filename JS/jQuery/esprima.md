# Esprima

- <https://github.com/jquery/esprima>
- <https://esprima.org/>

Esprima 是一款用 ECMAScript 编写的高性能、符合标准的 [ECMAScript] 解析器。

## Features

- 全面支持 ECMAScript 2017 ( [ECMA-262 8th Edition][ECMAScript] )
- 合理的语法树格式标准化 ( [ESTree] )
- 实验性的支持 [JSX] （React 的一个语法扩展）
- 可选的语法节点位置跟踪（基于索引和行-列）
- 大量测试（大约 1500 个单元测试，完全覆盖代码）


[ECMAScript]: <http://www.ecma-international.org/publications/standards/Ecma-262.htm>
[ESTree]: <https://github.com/estree/estree/blob/master/es5.md>
[JSX]: <https://facebook.github.io/jsx/>

# API

Esprima 可以用来对 JavaScript 程序进行词法分析（令牌化）和语法分析（解析）。

一个在 Node.js REPL 执行的简单例子：

```js
> var esprima = require('esprima')
> var program = 'const answer = 42'

> esprima.tokenize(program)
[
  { type: 'Keyword', value: 'const' },
  { type: 'Identifier', value: 'answer' },
  { type: 'Punctuator', value: '=' },
  { type: 'Numeric', value: '42' }
]

> esprima.parseScript(program)
{
  type: 'Program',
  body: [
    {
      type: 'VariableDeclaration',
      declarations: [Object],
      kind: 'const'
    }
  ],
  sourceType: 'script'
}
```

需要了解更多信息，请阅读完整的文档：

- <http://esprima.org/doc>
