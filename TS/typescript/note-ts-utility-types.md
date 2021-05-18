
## 自定义实用类型

```ts
/**
 * 获取对象 T 成员的值类型
 */
type ValueOf<T> = T extends { [K: string]: infer V } ? V : T

type Values<T> = {
  [K in keyof T]: T[K]
}[keyof T]

/**
 * 去除函数 T 的第一个参数
 */
type OmitFirstParameter<T> = T extends (first: any, ...args: infer A) => infer R
  ? (...args: A) => R
  : T
```
