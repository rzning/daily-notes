
## 自定义使用类型

```ts
/**
 * 获取对象 T 成员的值类型
 */
type ValueOf<T> = T extends { [K: string]: infer V } ? V : T

/**
 * 去除函数 T 的第一个参数
 */
type OmitFirstParameter<T> = T extends (first: any, ...args: infer A) => infer R
  ? (...args: A) => R
  : T
```
