# Module: Class

类模块声明模板文件

- EN 🔗 <https://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-class-d-ts.html>
- ZH 🔗 <https://www.tslang.cn/docs/handbook/declaration-files/templates/module-class-d-ts.html>

当你想以下面方式使用 JavaScript 代码时：

若一个模块对外默认导出一个类（Class），例如通过下面 JavaScript 代码方式使用时：

```js
const Greeter = require('super-greeter')

const greeter = new Greeter()
greeter.greet()
```

同时支持通过 UMD 和模块方式导入：

## `module-class.d.ts`

```ts
// Type definitions for [~库名称~] [~可选版本号~]
// Project: [~项目名称~]
// Definitions by: [~你的名字~] <[~你的 URL 地址~]>

/*~ This is the module template file for class modules.
 *~ - 这是一个类模块（Class Modules）模块模板文件。
 *~ You should rename it to index.d.ts
 *~ and place it in a folder with the same name as the module.
 *~ - 你应该将它重命名为 `index.d.ts` 并将其放在与模块同名的文件夹中。
 *~ For example, if you were writing a file for "super-greeter", this
 *~ file should be 'super-greeter/index.d.ts'
 *~ - 例如，如果你正在为 'super-greeter' 编写声明文件，
 *~ - 此文件应该为 `super-greeter/index.d.ts`
 */

/*~ Note that ES6 modules cannot directly export class objects.
 *~ This file should be imported using the CommonJS-style:
 *~   import x = require('someLibrary');
 *~
 *~ Refer to the documentation to understand common
 *~ workarounds for this limitation of ES6 modules.
 */

// Note that ES6 modules cannot directly export class objects.
// This file should be imported using the CommonJS-style:
//   import x = require('[~THE MODULE~]');
// - 注意， ES6 模块不能直接导出类对象。
// - 该文件应该使用 CommonJS 方式导入：
// -   import x = require('[~此模块~]');
//
// Alternatively, if --allowSyntheticDefaultImports or
// --esModuleInterop is turned on, this file can also be
// imported as a default import:
//   import x from '[~THE MODULE~]';
//
// Refer to the TypeScript documentation at
// https://www.typescriptlang.org/docs/handbook/modules.html#export--and-import--require
// to understand common workarounds for this limitation of ES6 modules.

/*~ If this module is a UMD module that exposes a global variable 'myClassLib' when
 *~ loaded outside a module loader environment, declare that global here.
 *~ Otherwise, delete this declaration.
 */
export as namespace myClassLib

/*~ This declaration specifies that the class constructor function
 *~ is the exported object from the file
 */
export = MyClass

/*~ Write your module's methods and properties in this class */
declare class MyClass {
  constructor(customGreeting?: string)

  greet: void

  myMethod(opts: MyClass.MyClassMethodOptions): number
}

/*~ If you want to expose types from your module as well, you can
 *~ place them in this block.
 *~
 *~ Note that if you decide to include this namespace, the module can be
 *~ incorrectly imported as a namespace object, unless
 *~ --esModuleInterop is turned on:
 *~   import * as x from '[~THE MODULE~]'; // WRONG! DO NOT DO THIS!
 */
declare namespace MyClass {
  export interface MyClassMethodOptions {
    width?: number
    height?: number
  }
}
```
