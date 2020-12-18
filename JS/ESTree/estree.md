# The ESTree Spec

- <https://github.com/estree/estree>


## AST Descriptor Syntax

该规范使用自定义语法来描述其结构。例如，在撰写 `es2015.md` 时包含的 `Program` 的描述如下：

```js
extend interface Program {
  sourceType: "script" | "module";
  body: [ Statement, ModuleDeclaration ]
}
```
