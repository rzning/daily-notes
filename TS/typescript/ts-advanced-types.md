# Advanced Types 高级类型

> - 英文文档 @ <http://www.typescriptlang.org/docs/handbook/advanced-types.html>
> - 中文文档 @ <https://www.tslang.cn/docs/handbook/advanced-types.html>

## Contents

- [Intersection Types](#intersection) - 交叉类型
- [Union Types](#union) - 联合类型
- [Type Guards and Differentiating Types](#guards) - 类型守卫和区分类型
- Nullable types - 可空类型
- Type Aliases - 类型别名
- String Literal Types - 字符串字面量类型
- Numeric Literal Types - 数字字面量类型
- Enum Member Types - 枚举成员类型
- Discriminated Unions - 可辨识联合
- Polymorphic `this` types - 多态的 `this` 类型
- Index types - 索引类型
- Mapped types - 映射类型
- Conditional Types - 有条件类型

<hr id="intersection" />

## Intersection Types

交叉类型

交叉类型 `A & B` 表示既要满足 `A` 类型也要满足 `B` 类型。

```ts
const a: number & string = '123'
//    ^
// error: 不能将类型“"123"”分配给类型“never”。

const b: string & string[] = ['string']
//    ^
// error: 不能将类型“string[]”分配给类型“string & string[]”。
//   不能将类型“string[]”分配给类型“string”。

const c: object & string[] = {}
//    ^
// error: 不能将类型“{}”分配给类型“object & string[]”。
//   Type '{}' is missing the following properties from
//   type 'string[]': length, pop, push, concat, and 26 more.

const d: object & string[] = [123]
//                            ^
// error: 不能将类型“number”分配给类型“string”。

const e: object & string[] = ['string']
// ok.
```

```ts
interface T {
  a: string
}

interface U {
  b: string
}

const a: T & U = {}
//    ^
// error: 不能将类型“{}”分配给类型“T & U”。
//   Property 'a' is missing in type '{}' but required in type 'T'.

const b: T & U = { a: 'a' }
//    ^
// error: 不能将类型“{ a: string; }”分配给类型“T & U”。
//   Property 'b' is missing in type '{ a: string; }' but required in type 'U'.

const c: T & U = { a: 'a', b: 'b' }
// ok.

const d: T & U = { a: 'a', b: 'b', c: 'c' }
//                                 ^
// error: 不能将类型“{ a: string; b: string; c: string; }”分配给类型“T & U”。
//   对象文字可以只指定已知属性，并且“c”不在类型“T & U”中。

```


<hr id="union" />

## Union Types

联合类型

联合类型 `A | B` 表示只需满足 `A` 类型或 `B` 类型其中一个。

```ts
const a: number | string = '123'
// ok.

const b: number | string = 123
// ok.
```

```ts
interface T {
  x: string
}

interface U {
  y: string
}

const a: T | U = {}
//    ^
// error: 不能将类型“{}”分配给类型“T | U”。
//   Property 'y' is missing in type '{}' but required in type 'U'.

const b: T | U = { x: 'x' }
// ok.

const c: T | U = { y: 'y' }
// ok.

const d: T | U = { x: 'x', y: 'y' }
// ok.

const e: T | U = { x: 'x', y: 'y', z: 'z' }
//                                 ^
// error: 不能将类型“{ x: string; y: string; z: string; }”分配给类型“T | U”。
//   对象文字可以只指定已知属性，并且“z”不在类型“T | U”中。

let value: T | U

value.x = 'x'
//    ^
// error: 类型“T | U”上不存在属性“x”。
//   类型“U”上不存在属性“x”。
```

如果一个值是联合类型，我们只能访问此联合类型的所有类型里共有的成员。

```ts
interface T {
  x: string
  z: string
}

interface U {
  y: string
  z: string
}

const a: T | U = { x: 'x' }
//    ^
// error: 不能将类型“{ x: string; }”分配给类型“T | U”。
//   Property 'z' is missing in type '{ x: string; }' but required in type 'T'.

const b: T | U = { z: 'z' }
//    ^
// error: 不能将类型“{ z: string; }”分配给类型“T | U”。
//   Property 'y' is missing in type '{ z: string; }' but required in type 'U'.

const c: T | U = { x: 'x', z: 'y' }
// ok.

const d: T | U = { x: 'x', y: 'y', z: 'z' }
// ok.

const m = c.x
// ok.

const n = d.x
//          ^
// error: 类型“T | U”上不存在属性“x”。
//   类型“U”上不存在属性“x”。

const o = d.z
// ok.
```

```ts
interface T {
  x: string
  z: string
}

interface U {
  y: string
  z: string
}

let value: T | U = { x: 'x', z: 'z' }

value.x = 'xx'
// ok.

value.y = 'yy'
//    ^
// error: 类型“T”上不存在属性“y”。

function funcA (value: T | U = { x: 'x', z: 'z' }) {
  value.x = 'xx'
  //    ^
  // error: 类型“T | U”上不存在属性“x”。
  //   类型“U”上不存在属性“x”。

  value.y = 'yy'
  //    ^
  // error: 类型“T | U”上不存在属性“y”。
  //   类型“T”上不存在属性“y”。

  value.z = 'zz'
  // ok.
}

function funcB (value: T | U) {
  value = { x: 'x', z: 'z' }

  value.x = 'xx'
  // ok.

  value.y = 'yy'
  //    ^
  // error: 类型“T”上不存在属性“y”。

  value.z = 'zz'
  // ok.
}

function funcC (value: T | U) {
  value = { x: 'x', y: 'y', z: 'z' }

  value.x = 'xx'
  //    ^
  // error: 类型“T | U”上不存在属性“x”。
  //   类型“U”上不存在属性“x”。

  value.y = 'yy'
  //    ^
  // error: 类型“T | U”上不存在属性“y”。
  //   类型“T”上不存在属性“y”。

  value.z = 'zz'
  // ok.
}
```

可以使用类型断言指明当前变量类型。

```ts
interface T {
  x: string
  z: string
}

interface U {
  y: string
  z: string
}

// 不能判断当前 value 是否含有 x 或 y 属性
function funcA (value: T | U) {
  if (value.x) {
    value.x = 'xx'
    // error.
  }

  if (value.y) {
    value.y = 'yy'
    // error.
  }

  if (value.z) {
    value.z = 'zz'
    // ok.
  }
}

// 使用类型断言指明类型
function funcB (value: T | U) {
  if ((<T>value).x) {
    (<T>value).x = 'xx'
    // ok.
  }

  if ((<U>value).y) {
    (<U>value).y = 'yy'
    // ok.
  }

  if (value.z) {
    value.z = 'zz'
    // ok.
  }
}
```

<hr id="guards">

## Type Guards and Differentiating Types

类型守卫和区分类型

### User-Defined Type Guards

用户自定义类型守卫

TypeScript 中的 类型守卫 ( type guard ) 为一些表达式，
这些表达式会在代码运行时检查，以确保在某些范围内的类型。

- Using type predicates

类型谓语 ( type predicate )


```ts
```