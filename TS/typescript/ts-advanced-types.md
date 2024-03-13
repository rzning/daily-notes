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
- [Type Aliases](#aliases) - 类型别名
- [String Literal Types](#literal) - 字符串字面量类型
- [Numeric Literal Types](#numeric) - 数字字面量类型
- [Enum Member Types](#enum) - 枚举成员类型
- [Discriminated Unions](#discrim) - 可辨识联合
- [Polymorphic `this` types](#this) - 多态的 `this` 类型
- [Index types](#index) - 索引类型
- [Mapped types](#mapped) - 映射类型
- [Conditional Types](#conditional) - 有条件类型

<hr id="intersection" />

## ⒈ Intersection Types

> 交叉类型

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
  x: string
}

interface U {
  y: string
}

const a: T & U = {}
//    ^
// error: 不能将类型“{}”分配给类型“T & U”。
//   类型 "{}" 中缺少属性 "x"，但类型 "T" 中需要该属性。

const b: T & U = { x: 'x' }
//    ^
// error: 不能将类型“{ x: string; }”分配给类型“T & U”。
//   类型 "{ x: string; }" 中缺少属性 "y"，但类型 "U" 中需要该属性。

const c: T & U = { x: 'x', y: 'y' }
// ok.

const d: T & U = { x: 'x', y: 'y', z: 'z' }
//                                 ^^^^^^
// error: 不能将类型“{ x: string; y: string; z: string; }”分配给类型“T & U”。
//   对象文字可以只指定已知属性，并且“z”不在类型“T & U”中。
```

<hr id="union" />

## ⒉ Union Types

> 联合类型

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

function funcA(value: T | U = { x: 'x', z: 'z' }) {
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

function funcB(value: T | U) {
  value = { x: 'x', z: 'z' }

  value.x = 'xx'
  // ok.

  value.y = 'yy'
  //    ^
  // error: 类型“T”上不存在属性“y”。

  value.z = 'zz'
  // ok.
}

function funcC(value: T | U) {
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
function funcA(value: T | U) {
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
function funcB(value: T | U) {
  if ((<T>value).x) {
    ;(<T>value).x = 'xx'
    // ok.
  }

  if ((<U>value).y) {
    ;(<U>value).y = 'yy'
    // ok.
  }

  if (value.z) {
    value.z = 'zz'
    // ok.
  }
}
```

<hr id="guards">

## ⒊ Type Guards and Differentiating Types

> 类型守卫和区分类型

### 3.1 User-Defined Type Guards

用户自定义类型守卫

TypeScript 中的 类型守卫 ( type guard ) 为一些表达式，
这些表达式会在代码运行时检查，以确保在某些范围内的类型。

3.1.1 **Using type predicates**

类型谓语 ( type predicate ) 可作为函数的返回类型，表示当前变量是某种类型，
格式为：

```
parameterName is Type
```

- 其中 `parameterName` 必须是当前函数签名中参数的名称。

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
function isT(v: T | U): v is T {
  return (<T>v).x !== undefined
}

/**
 * 判断当前变量 v 是否为 U 类型
 *
 * @param v 操作对象
 */
function isU(v: T | U): v is U {
  return (<U>v).y !== undefined
}

function funcA(value: T | U) {
  if (isT(value)) {
    value.x = 'xxx'
    // ok.
  }

  if (isU(value)) {
    value.y = 'yyy'
    // ok.
  }
}

function funcB(value: T | U) {
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

function isT(v: T | U | V): v is T {
  return (<T>v).x !== undefined
}

function func(value: T | U | V) {
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

3.1.2 **Using the `in` operator**

使用 `in` 操作符也能缩小变量的类型范围。

```ts
interface T {
  x: string
}

interface U {
  y: string
}

function funcA(value: T | U) {
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

function funcB(value: T | U) {
  if ('x' in value) {
    return value.x
    // ok.
  }
  return value.y
  // ok.
}
```

### 3.2 `typeof` type guards

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
function func(value: string | number) {
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
  throw new Error(`Expected string or number, got '${value}'.`)
}
```

### 3.3 `instanceof` type guards

使用 `instanceof` 类型守卫是通过其构造函数缩小类型的一种方式。

使用中，要求 `instanceof` 的右侧为一个构造函数，此时 TypeScript 将变量类型缩小到：

1. 此构造函数的 `prototype` 属性的类型，类型 `any` 除外。
2. 或由该类型的构造签名返回的联合类型

```ts
interface T {
  x: string
}

function func(value: any) {
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

function func(value: U | V) {
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

## ⒋ Nullable types

> 可空类型

TypeScript 中有两个特殊类型 `null` 和 `undefined` 分别具有 null 和 undefined 值。

默认情况下，类型检查器认为 `null` 和 `undefined` 可以赋值给任何类型的变量。

使用 `--strictNullChecks` 标记可以避免此问题，
声明变量时不会自动包含 `null` 和 `undefined` 。
可以使用联合类型显式包含他们：

```ts
let str = 'str'
str = null // error.

let nstr: string | null = 'nstr'
nstr = null // ok.
nstr = undefined // error.
```

### 4.1 Optional parameters and properties

> 可选参数和属性

使用 `--strictNullChecks` 标记，可选参数和可选属性会被自动加上 `| undefined` 类型。

```ts
// 可选参数：
function func(x: number, y?: number) {
  return x + (y || 0)
}

func(1) // ok.
func(1, undefined) // ok.
func(1, null) // error.

// 可选属性：
class A {
  x: number
  y?: number
}

let a = new A()
a.x = undefined // error.
a.y = undefined // ok.
a.y = null // error.
```

### 4.2 Type guards and type assertions

> 类型守卫和类型断言

由于可空类型 ( `null` ) 是通过联合类型实现的，因此可以使用类型守卫去除 `null` ：

```ts
function funcA(nstr: string | null): string {
  if (nstr === null) {
    return 'default value'
  }
  return nstr
}

// 使用短路运算符
function funcB(nstr: string | null): string {
  return nstr | 'default value'
}
```

若编译器无法去除 `null` 或 `undefined` 类型，则可以使用类型断言手动去除。

类型断言的语法是添加 `!` 后缀：

- `identifier!` 表示从标识符 `identifier` 的类型中去除 `null` 和 `undefined`

<hr id="aliases" />

## ⒌ Type Aliases

> 类型别名

别名并不会创建新类型，它只是创建了一个新名称来引用该类型。

```ts
type Name = string
type NameResolver = () => string
type NameOrResolver = Name | NameResolver

// 类型别名也可以是泛型：
type Container<T> = { value: T }

// 可以在其属性中引用自身：
type Tree<T> = {
  value: T
  children?: Tree<T>[]
}

// 与交叉类型一起使用：
type LinkedList<T> = T & { next: LinkedList<T> }
interface Person {
  name: string
}
var people: LinkedList<Person>
var p1 = people.name
var p3 = people.next.next.name

// 类型声明不能出现在声明右侧的任何其他位置：
type Yikes = Array<Yikes> // error.
```

通常情况下，应该尽量使用接口来替代类型别名。

若无法通过接口来表达某种类型，而需要使用并集或元组类型来表达时，可以使用类型别名。

<hr id="literal" />

## ⒍ String Literal Types

> 字符串字面量类型

字符串字面量类型允许你指定字符串必须具有确切的值。

与联合类型配合使用可获得类似于字符串枚举类型的效果。

```ts
type Easing = 'ease-in' | 'ease-out' | 'ease-in-out'
class Tag {
  animate(dx: number, dy: number, easing: Easing) {
    // ...
  }
}

// 用于区分函数重载
function createElement(tagName: 'img'): HTMLImageElement
function createElement(tagName: 'input'): HTMLInputElement
// ...
function createElement(tagName: string): Element {
  // ...
}
```

<hr id="numeric" />

## ⒎ Numeric Literal Types

> 数字字面量类型

```ts
// 掷骰子
function rollDice(): 1 | 2 | 3 | 4 | 5 | 6 {
  // ...
}

function func(x: number) {
  if (x !== 1 || x !== 2) {
    //           ^
    // error: 这个条件将总是返回'true'，因为类型'1'和'2'没有重叠。
  }
}
```

<hr id="enum" />

## ⒏ Enum Member Types

> 枚举成员类型

当每个枚举成员都用字面量初始化时，枚举成员具有类型。

```ts
/** 形状的类型 */
enum ShapeKind {
  Circle,
  Square
}

interface Circle {
  kind: ShapeKind.Circle
  radius: number
}

interface Square {
  kind: ShapeKind.Square
  sideLength: number
}

let c: Circle = {
  kind: ShapeKind.Square,
  // ^
  // error: 不能将类型“ShapeKind.Square”分配给类型“ShapeKind.Circle”。
  radius: 100
}
```

<hr id="discrim" />

## ⒐ Discriminated Unions

> 可辨识联合

你可以结合下列类型来创建一个叫作可便是联合的高级模式。

- singleton types, union types, type guards, and type aliases
- 单例类型、联合类型、类型守卫、类型别名

它也被称为标签联合 ( tagged unions ) 或代数数据类型 ( algebraic data types )

可辨识联合在函数式编程中很有用，它具有以下三个要素：

1. 具有一个通用的单例类型属性 - discriminant
2. 一个类型别名包含了这些类型的联合 - union
3. 类型守卫这个通用属性 - guards

```ts
interface Square {
  kind: 'square'
  size: number
}
interface Rectangle {
  kind: 'rectangle'
  width: number
  height: number
}
interface Circle {
  kind: 'circle'
  radius: number
}

// 上面声明了三个接口，且都有 `kind` 属性，但有不同的字面量类型。
// 其中的 `kind` 属性被称作判别式 ( discriminant  ) 或标签 ( tag )

// 接下来使用以上接口定义一个可辨识联合类型
type Shape = Square | Rectangle | Circle

function area(s: Shape): number {
  // 使用可辨识联合的类型守卫
  switch (s.kind) {
    case 'square':
      return s.size * s.size
    case 'rectangle':
      return s.height * s.width
    case 'circle':
      return Math.PI * s.radius ** 2
    default:
      return assertNever(s)
  }
}

function assertNever(x: never): never {
  throw new Error('Unexpected object: ' + x)
}
```

<hr id="this" />

## ⒑ Polymorphic `this` types

> 多态的 `this` 类型

<hr id="index" />

## ⒒ Index types

> 索引类型

<hr id="mapped" />

## ⒓ Mapped types

> 映射类型

<hr id="conditional" />

## ⒔ Conditional types

> 有条件类型
