# Utility Types

- <https://www.typescriptlang.org/docs/handbook/utility-types.html>

TypeScript 提供了几种实用工具类型以便利常见的类型转换。这些工具在全局范围可用。

- ⒈ `Partial<Type>`
- ⒉ `Required<Type>`
- ⒊ `Readonly<Type>`
- ⒋ `Record<Keys,Type>`
- ⒌ `Pick<Type, Keys>`
- ⒍ `Omit<Type, Keys>`
- ⒎ `Exclude<Type, ExcludedUnion>`
- ⒏ `Extract<Type, Union>`
- ⒐ `NonNullable<Type>`
- ⒑ `Parameters<Type>`
- ⒒ `ConstructorParameters<Type>`
- ⒓ `ReturnType<Type>`
- ⒔ `InstanceType<Type>`
- ⒕ `ThisParameterType<Type>`
- ⒖ `OmitThisParameter<Type>`
- ⒗ `ThisType<Type>`

## ⒈ `Partial<Type>`

```ts
type Partial<T> = {
  [P in keyof T]?: T[P]
}
```

将类型中所有属性设置为可选：

<details>
<summary>Example</summary>

```ts
interface Todo {
  title: string
  description: string
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate }
}

const todo1 = {
  title: '整理房间',
  description: '打扫卫生'
}

const todo2 = updateTodo(todo1, {
  description: '规整物品'
})
```

</details>

## ⒉ `Required<Type>`

```ts
type Required<T> = {
  [P in keyof T]-?: T[P]
}
```

与 `Partial` 相反，将类型中所有属性设置为必须的：

<details>
<summary>Example</summary>

```ts
interface Props {
  a?: number
  b?: string
}

const obj: Props = { a: 5 }

const obj2: Required<Props> = { a: 5 }
//    ^^^^
// error: 类型 "{ a: number; }" 中缺少属性 "b"，但类型 "Required<Props>" 中需要该属性。
```

</details>

## ⒊ `Readonly<Type>`

```ts
type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}
```

将类型中所有属性设置为只读：

<details>
<summary>Example</summary>

```ts
interface Todo {
  title: string
}

const todo: Readonly<Todo> = {
  title: 'Hello'
}

todo.title = 'Fine'
//   ^^^^^
// error: 无法分配到 "title" ，因为它是只读属性。
```

Object.freeze()

```ts
function freeze<Type>(obj: Type): Readonly<Type>
```

</details>

## ⒋ `Record<Keys,Type>`

```ts
type Record<K extends keyof any, T> = {
  [P in K]: T
}
```

构造一个对象类型，其属性键为 `Keys` ，属性值为 `Type` 。

该实用类型可用于将一个类型的属性映射到另一个类型。

<details>
<summary>Example</summary>

```ts
interface CatInfo {
  age: number
  breed: string
}

type CatName = 'miffy' | 'boris' | 'mordred'

const cats: Record<CatName, CatInfo> = {
  miffy: { age: 10, breed: 'Persian' },
  boris: { age: 5, breed: 'Maine Coon' },
  mordred: { age: 16, breed: 'British Shorthair' }
}

cats.boris
//   ^^^^^ = (property) boris: CatInfo
```

</details>

## ⒌ `Pick<Type, Keys>`

```ts
type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}
```

通过 `Keys` 从 `Type` 中选择一组属性来构造类型：

<details>
<summary>Example</summary>

```ts
interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoPreview = Pick<Todo, 'title' | 'completed'>

const todo: TodoPreview = {
  title: 'Clean room',
  completed: false
}

todo.title
//   ^^^^^ = (property) title: string

todo.description
//   ^^^^^^^^^^^
// error: 类型“TodoPreview”上不存在属性“description”。
```

</details>

## ⒍ `Omit<Type, Keys>`

```ts
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>
```

从 `Type` 中选择 `Keys` 以外的所有属性来构造类型：

<details>
<summary>Example</summary>

```ts
interface Todo {
  title: string
  description: string
  completed: boolean
  createdAt: number
}

type TodoPreview = Omit<Todo, 'description'>

const todo: TodoPreview = {
  title: 'Clean room',
  completed: false,
  createdAt: 1617088767899
}

type TodoInfo = Omit<Todo, 'completed' | 'createdAt'>

const todoInfo: TodoInfo = {
  title: 'Pick up kids',
  description: 'Kindergarten closes at 5pm'
}
```

</details>

## ⒎ `Exclude<Type, ExcludedUnion>`

```ts
type Exclude<T, U> = T extends U ? never : T
```

从联合类型 `Type` 中排除可分配给 `ExcludedUnion` 的类型：

<details>
<summary>Example</summary>

```ts
type T0 = Exclude<'a' | 'b' | 'c', 'a'>
//    ^ = type T0 = "b" | "c"

type T1 = Exclude<'a' | 'b' | 'c', 'a' | 'b'>
//    ^ = type T1 = "c"

type T2 = Exclude<string | number | (() => void), Function>
//    ^ = type T2 = string | number
```

</details>

## ⒏ `Extract<Type, Union>`

```ts
type Extract<T, U> = T extends U ? T : never
```

从联合类型 `Type` 中提取所有可分配给 `Union` 的类型：

<details>
<summary>Example</summary>

```ts
type T0 = Extract<'a' | 'b' | 'c', 'a' | 'f'>
//    ^ = type T0 = "a"
type T1 = Extract<string | number | (() => void), Function>
//    ^ = type T1 = () => void
```

</details>

## ⒐ `NonNullable<Type>`

```ts
type NonNullable<T> = T extends null | undefined ? never : T
```

从 `Type` 中排除 `null` 和 `undefined` 来构造类型：

<details>
<summary>Example</summary>

```ts
type T0 = NonNullable<string | number | undefined>
//    ^ = type T0 = string | number
type T1 = NonNullable<string[] | null | undefined>
//    ^ = type T1 = string[]
```

</details>

## ⒑ `Parameters<Type>`

```ts
type Parameters<T extends (...args: any) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never
```

获取函数 `Type` 的参数类型来构造一个元组类型：

<details>
<summary>Example</summary>

```ts
type T0 = Parameters<() => string>
//    ^ = type T0 = []
type T1 = Parameters<(s: string) => void>
//    ^ = type T1 = [s: string]
type T2 = Parameters<<T>(arg: T) => T>
//    ^ = type T2 = [arg: unknown]

declare function f1(arg: { a: number; b: string }): void
type T3 = Parameters<typeof f1>
//    ^ = type T3 = [arg: {
//        a: number;
//        b: string;
//    }]

type T4 = Parameters<any>
//    ^ = type T4 = unknown[]
type T5 = Parameters<never>
//    ^ = type T5 = never

type T6 = Parameters<string>
//                   ^^^^^^
// error: 类型“string”不满足约束“(...args: any) => any”。
// => type T6 = never

type T7 = Parameters<Function>
//                   ^^^^^^^^
// error: 类型“Function”不满足约束“(...args: any) => any”。
//   类型“Function”提供的内容与签名“(...args: any): any”不匹配。
// => type T7 = never
```

</details>

## ⒒ `ConstructorParameters<Type>`

```ts
type ConstructorParameters<T extends new (...args: any) => any> =
  T extends new (...args: infer P) => any ? P : never
```

获取构造函数 `Type` 的参数类型来构造一个元组类型：

<details>
<summary>Example</summary>

```ts
type T0 = ConstructorParameters<ErrorConstructor>
//    ^ = type T0 = [message?: string]
type T1 = ConstructorParameters<FunctionConstructor>
//    ^ = type T1 = string[]
type T2 = ConstructorParameters<RegExpConstructor>
//    ^ = type T2 = [pattern: string | RegExp, flags?: string]
type T3 = ConstructorParameters<any>
//    ^ = type T3 = unknown[]

type T4 = ConstructorParameters<Function>
//                              ^^^^^^^^
// error: 类型“Function”不满足约束“new (...args: any) => any”。
//   类型“Function”提供的内容与签名“new (...args: any): any”不匹配。
// => type T4 = never
```

</details>

## ⒓ `ReturnType<Type>`

```ts
type ReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer R
  ? R
  : any
```

获取函数 `Type` 的返回类型：

<details>
<summary>Example</summary>

```ts
type T0 = ReturnType<() => string>
//    ^ = type T0 = string
type T1 = ReturnType<(s: string) => void>
//    ^ = type T1 = void
type T2 = ReturnType<<T>() => T>
//    ^ = type T2 = unknown
type T3 = ReturnType<<T extends U, U extends number[]>() => T>
//    ^ = type T3 = number[]

declare function f1(): { a: number; b: string }
type T4 = ReturnType<typeof f1>
//    ^ = type T4 = {
//        a: number;
//        b: string;
//    }

type T5 = ReturnType<any>
//    ^ = type T5 = any
type T6 = ReturnType<never>
//    ^ = type T6 = never

type T7 = ReturnType<string>
//                   ^^^^^^
// error: 类型“string”不满足约束“(...args: any) => any”。
// => type T7 = any

type T8 = ReturnType<Function>
//                   ^^^^^^^^
// error: 类型“Function”不满足约束“(...args: any) => any”。
//   类型“Function”提供的内容与签名“(...args: any): any”不匹配。
// => type T8 = any
```

</details>

## ⒔ `InstanceType<Type>`

```ts
type InstanceType<T extends new (...args: any) => any> = T extends new (
  ...args: any
) => infer R
  ? R
  : any
```

获取构造函数 `Type` 的返回类型：

<details>
<summary>Example</summary>

```ts
class C {
  x = 0
  y = 0
}
type T0 = InstanceType<typeof C>
//    ^ = type T0 = C

type T1 = InstanceType<any>
//    ^ = type T1 = any
type T2 = InstanceType<never>
//    ^ = type T2 = never

type T3 = InstanceType<string>
//                     ^^^^^^
// error: 类型“string”不满足约束“new (...args: any) => any”。
// => type T3 = any

type T4 = InstanceType<Function>
//                     ^^^^^^^^
// error: 类型“Function”不满足约束“new (...args: any) => any”。
//   类型“Function”提供的内容与签名“new (...args: any): any”不匹配。
// => type T4 = any
```

</details>

## ⒕ `ThisParameterType<Type>`

```ts
type ThisParameterType<T> = T extends (this: infer U, ...args: any[]) => any
  ? U
  : unknown
```

获取函数 `Type` 的 This 参数的类型：

<details>
<summary>Example</summary>

```ts
function toHex(this: Number) {
  return this.toString(16)
}

function numberToString(n: ThisParameterType<typeof toHex>) {
  //                    ^ = (parameter) n: Number
  return toHex.apply(n)
}
```

</details>

## ⒖ `OmitThisParameter<Type>`

```ts
type OmitThisParameter<T> =
  unknown extends ThisParameterType<T>
    ? T
    : T extends (...args: infer A) => infer R
      ? (...args: A) => R
      : T
```

从函数 `Type` 中移除 This 参数：

- 如果 `Type` 没有显式声明 This 参数，则简单返回 `Type` 类型；
- 否则，将从 `Type` 创建一个不带 This 参数的新函数类型。
- 函数泛型被抹去，只有最后的重载签名被传递到新的函数类型当中。

<details>
<summary>Example</summary>

```ts
function toHex(this: Number) {
  return this.toString(16)
}

const fiveToHex: OmitThisParameter<typeof toHex> = toHex.bind(5)

console.log(fiveToHex())

type T1 = typeof toHex
//    ^ = type T1 = (this: Number) => string
type T2 = typeof fiveToHex
//    ^ = type T2 = () => string
```

</details>

## ⒗ `ThisType<Type>`

```ts
interface ThisType<T> {}
```

标记上下文 This 类型：

- 不返回转换后的类型。
- 必须启用 `--noImplicitThis` 标记。

`ThisType<Type>` 标记接口 ( Marker Interface ) 只是在 `lib.d.ts` 中声明了一个空接口，
除了在对象字面量的上下文类型中被识别之外，该接口的作用类似于任何空接口。

<details>
<summary>Example</summary>

```ts
type ObjectDescriptor<D, M> = {
  data?: D
  methods?: M & ThisType<D & M> // 方法中 `this` 的类型为 D & M
}

function makeObject<D, M>(desc: ObjectDescriptor<D, M>): D & M {
  let data: object = desc.data || {}
  let methods: object = desc.methods || {}
  return { ...data, ...methods } as D & M
}

let obj = makeObject({
  data: { x: 0, y: 0, z: 0 },
  methods: {
    moveBy(dx: number, dy: number) {
      this.x += dx
      //   ^ = (property) x: number
      this.y += dy
      //   ^ = (property) y: number

      this.z = 'z'
      // ^^^
      // error: 不能将类型“string”分配给类型“number”。
      // => (property) z: number
    }
  }
})

obj.x = 10
obj.y = 20
obj.moveBy(5, 5)
```

</details>
