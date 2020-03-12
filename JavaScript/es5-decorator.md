---
title       : ECMAScript Decorator
recorddate  : 2020-03-13
---

装饰器 ( Decorator ) 是一种与类 ( class ) 相关的语法，用来注释或修改类和类方法。

装饰器是一个函数，以 `@<methodName>` 格式调用，可以放在类或类方法的定义前面。

```ts
interface TypedPropertyDescriptor<T> {
    enumerable?: boolean
    configurable?: boolean
    writable?: boolean
    value?: T
    get?: () => T
    set?: (value: T) => void
}

type ClassDecorator = <T extends Function>(target: T) => T | void
type PropertyDecorator = (target: Object, propertyKey: string | symbol) => void
type MethodDecorator = <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T> | void
type ParameterDecorator = (target: Object, propertyKey: string | symbol, parameterIndex: number) => void
```

1. 类装饰 Class Decorator
2. 类属性装饰 Property Decorator
3. 类方法装饰 Method Decorator
4. 类方法参数修饰 Parameter Decorator

## 1️⃣ 类装饰器

下面示例中，装饰器 `@testable` 给目标类添加了 `isTestable` 属性：

```js
@testable
class MyClass {
  //...
}

function testable (target) {
  target.isTestable = true
}

MyClass.isTestable // true
```

装饰器的作用相当于：

```js
@decorator
class A {}

// 等同于

class A
A = decorator(A) || A
```

装饰器函数的第一个参数为需装饰的目标类：

```js
/**
 * @param {class} target 所修饰的目标类
 */
function testable (target) {
  //...
}
```

为装饰器传参：

```js
function testable(isTestable) {
  return function (target) {
    target.isTestable = isTestable
  }
}

@testable(false)
class MyClass {}
MyClass.isTestable // false
```

> 装饰器对类行为的改变发生在代码编译阶段，而非运行时。

可通过目标类的 `prototype` 属性来添加该类的实例属性：

```js
function testable(target) {
  target.prototype.isTestable = true
}

@testable
class MyClass {}

const obj = new MyClass()
obj.isTestable // true
```

通过装饰器实现混入功能：

```js
function mixins (...objects) {
  return function (target) {
    Object.assign(target.prototype, ...objects)
  }
}

@mixins({
  foo() { console.log('foo') }
})
class MyClass {}

const obj = new MyClass()
obj.foo() // 'foo'
```

## 3️⃣ 类方法装饰器

类方法装饰器方法接收三个参数：

```ts
/**
 * 修改指定属性为只读
 * @param {Object} target 目标类原型对象 Target.prototype
 * @param {string} name 当前修饰的属性名
 * @param {PropertyDecorator} descriptor 当前属性描述对象
 */
function readonly (target, name, descriptor) {
  descriptor.writable = false
  return descriptor
}

interface PropertyDescriptor {
  configurable?: boolean
  enumerable?: boolean
  value?: any
  writable?: boolean
  get?(): any
  set?(v: any): void
}

class Person {
  @readonly
  name () { return `${this.first} ${this.last}` }
}

// 相当于
readonly(Person.prototype, 'name', descriptor)

// 类似于
Object.defineProperty(Person.prototype, 'name', descriptor)
```

多个装饰器将从外到内注册，然后由内向外执行：

```js
function dec (id) {
  console.log('evaluated', id)
  return function (target, property, descriptor) {
    console.log('executed', id)
  }
}

class MyClass {
  @dec(1)
  @dec(2)
  method () {}
}

// evaluated 1
// evaluated 2
// executed 2
// executed 1
```

## 参考

- [装饰器 - ECMAScript 6入门 - 阮一峰](https://es6.ruanyifeng.com/#docs/decorator#core-decorators-js)
