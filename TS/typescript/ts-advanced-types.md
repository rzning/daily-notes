# Advanced Types 高级类型

> - 英文文档 @ <http://www.typescriptlang.org/docs/handbook/advanced-types.html>
> - 中文文档 @ <https://www.tslang.cn/docs/handbook/advanced-types.html>

## Contents

- [Intersection Types](#intersection) - 交叉类型
- [Union Types](#union) - 联合类型
- [Type Guards and Differentiating Types](#guards) - 类型守卫和区分类型
  - User-Defined Type Guards - 用户自定义类型守卫
    - Using type predicates - 使用类型谓语
    - Using the in operator - 使用 `in` 操作符
  - typeof type guards - `typeof` 类型守卫
  - instanceof type guards - `instanceof` 类型守卫
- [Nullable types](#nullable) - 可空类型
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

- **Using type predicates**

类型谓语 ( type predicate ) 可作为函数的返回类型，表示当前变量是某种类型，
格式为 `parameterName is Type` ，其中 `parameterName` 必须是当前函数签名中参数的名称。


```ts
interface T {
  x: string
  z: string
}

interface U {
  y: string
  z: string
}

/**
 * 判断当前变量 v 是否为 T 类型
 * 
 * @param v 操作对象
 */
function isT (v: T | U): v is T {
  return (<T>v).x !== undefined
}

/**
 * 判断当前变量 v 是否为 U 类型
 * 
 * @param v 操作对象
 */
function isU (v: T | U): v is U {
  return (<U>v).y !== undefined
}

function funcA (value: T | U) {
  if (isT(value)) {
    value.x = 'xxx'
    // ok.
  }

  if (isU(value)) {
    value.y = 'yyy'
    // ok.
  }
}


function funcB (value: T | U) {
  if (isT(value)) {
    value.x = 'xxx'
    // ok.
  } else {
    value.y = 'yyy'
    // ok.
  }
}

```

使用 type predicate 语法， Typescript 不仅知道 `if` 分支中变量的类型，同样也知道 `else` 分支中变量的类型。

比如上例 `funcB()` 函数 `if` 分支中 TypeScript 将 `value` 识别为 `T` 类型，
并且由于 `value` 不是 `T` 类型，就是 `U` 类型，因此在 `else` 分支中 TypeScript 将 `value` 识别为 `U` 类型。

```ts
interface T {
  x: string
}

interface U {
  y: string
}

interface V {
  z: string
}


function isT (v: T | U | V): v is T {
  return (<T>v).x !== undefined
}


function func (value: T | U | V) {
  if (isT(value)) {
    value.x = 'xxx'
    // ok.
  } else {
    value.y = 'yyy'
    //    ^
    // error: 类型“U | V”上不存在属性“y”。
    //   类型“V”上不存在属性“y”。
  }
}
```

- **Using the `in` operator**

使用 `in` 操作符也能缩小变量的类型范围。

```ts
interface T {
  x: string
}

interface U {
  y: string
}

function funcA (value: T | U) {

  value.x = 'xx'
  //    ^
  // error: 类型“T | U”上不存在属性“x”。
  //   类型“U”上不存在属性“x”。

  if ('x' in value) {
    value.x = 'xxx'
    // ok.
  } else {
    value.y = 'yyy'
    // ok.
  }
}

function funcB (value: T | U) {
  if ('x' in value) {
    return value.x
    // ok.
  }
  return value.y
  // ok.
}
```

### `typeof` type guards

`typeof` 类型守卫只有以下两种形式可被识别：

- `typeof v === 'typename'`
- `typeof v !== 'typename'`

其中 `typename` 必须是 `number` , `string` , `boolean` 或 `symbol` ，其他类型则不能被 TypeScript 识别为类型守卫。

```ts
interface T {
  x: string
}

const value = { x: 'x' }

if (typeof value === T) {
  //                 ^
  // error: “T”仅表示类型，但在此处却作为值使用。
}
```

```ts
function func (value: string | number) {
  value.toUpperCase()
  //    ^
  // error: 类型“string | number”上不存在属性“toUpperCase”。
  //   类型“number”上不存在属性“toUpperCase”。

  if (typeof value === 'string') {
    return value.toUpperCase()
    // ok.
  }
  if (typeof value === 'number') {
    return value.toFixed(2)
    // ok.
  }
  throw new Error(`Expected string or number, got '${value}'.`);
}
```

### `instanceof` type guards

使用 `instanceof` 类型守卫是通过其构造函数缩小类型的一种方式。

使用中，要求 `instanceof` 的右侧为一个构造函数，此时 TypeScript 将变量类型缩小到：

1. 此构造函数的 `prototype` 属性的类型，类型 `any` 除外。
2. 或由该类型的构造签名返回的联合类型

```ts
interface T {
  x: string
}

function func (value: any) {
  if (value instanceof T) {
    //                 ^
    // error: “T”仅表示类型，但在此处却作为值使用。
  }
}
```

```ts
interface T {
  x: string
}

class U implements T {
  x: string
  y: string
}

class V implements T {
  x: string
  z: string
}

function func (value: U | V) {
  value.x = 'x'
  // ok.

  value.y = 'y'
  //    ^
  // error: 类型“U | V”上不存在属性“y”。
  //   类型“V”上不存在属性“y”。

  value.z = 'z'
  //    ^
  // error: 类型“U | V”上不存在属性“z”。
  //   类型“U”上不存在属性“z”。

  if (value instanceof U) {
    value.y = 'yy'
    // ok.
  }

  if (value instanceof V) {
    value.z = 'zz'
    // ok.
  }
}
```

<hr id="nullable" />

## Nullable types

