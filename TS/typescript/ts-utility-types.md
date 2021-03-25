# Utility Types

- <https://www.typescriptlang.org/docs/handbook/utility-types.html>

TypeScript 提供了几种实用工具类型以便利常见的类型转换。这些工具在全局范围可用。

- `Partial<Type>`
- `Readonly<Type>`
- `Record<Keys,Type>`
- `Pick<Type, Keys>`
- `Omit<Type, Keys>`
- `Exclude<Type, ExcludedUnion>`
- `Extract<Type, Union>`
- `NonNullable<Type>`
- `Parameters<Type>`
- `ConstructorParameters<Type>`
- `ReturnType<Type>`
- `InstanceType<Type>`
- `Required<Type>`
- `ThisParameterType<Type>`
- `OmitThisParameter<Type>`
- `ThisType<Type>`

## `Partial<Type>`

```ts
type Partial<T> = {
  [P in keyof T]?: T[P]
}
```

将类型中所有属性设置为可选：

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

## `Required<Type>`

```ts
type Required<T> = {
  [P in keyof T]-?: T[P]
}
```

与 `Partial` 相反，将类型中所有属性设置为必须的：

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

## `Readonly<Type>`

```ts
type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}
```

将类型中所有属性设置为只读：

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

## `Record<Keys,Type>`

```ts
type Record<K extends keyof any, T> = {
  [P in K]: T
}
```

构造一个对象类型，其属性键为 `Keys` ，属性值为 `Type` 。

该实用类型可用于将一个类型的属性映射到另一个类型。

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

## `Pick<Type, Keys>`

```ts
type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}
```

通过 `Keys` 从 `Type` 中选择一组属性来构造类型：

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

## `Exclude<Type, ExcludedUnion>`

```ts
type Exclude<T, U> = T extends U ? never : T
```

从联合类型中排除：

```ts
type T0 = Exclude<'a' | 'b' | 'c', 'a'>
//    ^ = type T0 = "b" | "c"

type T1 = Exclude<'a' | 'b' | 'c', 'a' | 'b'>
//    ^ = type T1 = "c"

type T2 = Exclude<string | number | (() => void), Function>
//    ^ = type T2 = string | number
```
