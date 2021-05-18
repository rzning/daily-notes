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


### 2021-05-18

[巧用 TypeScript（五） - infer - SegmentFault 思否](https://segmentfault.com/a/1190000018514540)

- tuple 转 union
  - `[string, number]` -> `string | number`
  - ```ts
    type ElementOf<T> = T extends Array<infer E> ? E : never

    type ATuple = [string, number]

    type ToUnion = ElementOf<ATuple>
    // => type ToUnion = string | number

    type T = ElementOf<['a', 'b', 3, number]>
    // type T = number | "a" | "b"
    ```
  - 另一种解法：
    ```ts
    type TTuple = [string, number]
    type Res = TTuple[number]
    // => type Res = string | number
    ```

- union 转 intersection
  - `string | number` -> `string & number`
  - 逆变位置上，同一类型变量的多个候选类型将会被推断为交叉类型
    - <https://github.com/Microsoft/TypeScript/pull/21496>
    - ```ts
      type Bar<T> = T extends {
        a: (x: infer U) => void; b: (x: infer U) => void
      } ? U : never
      interface A {}
      interface B {}
      type C = Bar<{ a: (x: A) => void; b: (x: B) => void }>
      // => type C = A & B
      ```
  - 
    ```ts
    type UnionToIntersection<U> =
      (U extends any ? (k: U) => void : never) extends (k: infer I) => void
        ? I
        : never

    interface A {}
    interface B {}
    type C = UnionToIntersection<A | B>
    // => type C = A & B
    ```

- 获取函数名：

  - 
    ```ts
    type FuncName<T> = {
      [P in keyof T]: T[P] extends Function ? P : never
    }[keyof T]

    type A = {
      name: string
      setName(name: string): void
      getName(): string
    }

    type B = FuncName<A>
    // => type B = "setName" | "getName"

    type Test<T> = {
      [key in keyof T]: T[key] extends Function ? key : never
    }

    type C = Test<A>
    // => type C = {
    //   name: never;
    //   setName: "setName";
    //   getName: "getName";
    // }
    ```
