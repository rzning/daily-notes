# TypeScript 中的 Infer 关键词

最初见于
[TypeScript 内置工具类型](https://www.typescriptlang.org/docs/handbook/utility-types.html)
中的 `ReturnType` ：

- `ReturnType<Type>`
  - 实现： `type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;`
  - 源码： [es5.d.ts](https://github.com/microsoft/TypeScript/blob/master/src/lib/es5.d.ts#L1504)
  - 示例： [utility-types.html#example-10](https://www.typescriptlang.org/docs/handbook/utility-types.html#example-10)


## 另见参考

- [TypeScript 的 Infer 关键词 - 知乎](https://zhuanlan.zhihu.com/p/133249506)
  - <https://github.com/olivewind/blog/issues/7>
  - `infer` 关键词常在条件类型中和 `extends` 关键词一同出现，表示将要推断的类型，
    作为类型变量可以在三元表达式的 True 部分引用。
  - 而 `ReturnType` 正是使用这种方式提取到了函数的返回类型。
