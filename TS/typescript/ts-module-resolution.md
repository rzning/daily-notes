# 模块解析策略 Module Resolution Strategies

- <https://www.typescriptlang.org/docs/handbook/module-resolution.html>

> 相关 `tsconfig.json` 配置项 : [moduleResolution][tsconfig-module-resolution]
>
> 用于指定模块的解析策略 ( Specify the module resolution strategy )
>
> - `"node"` - 用于 Node.js 的 CommonJS 实现
> - `"node16"` 或 `"nodenext"` - ( 从 TS 4.7 开始 ) 用于对 Node.js 的 ECMAScript 模块支持
> - `"classic"` - 使用 TS 1.6 版本之前的解析策略
>
> 默认值：
>
> - 在 `--module commonjs` 条件下， `moduleResolution` 的默认值为 `Node` 。
> - 否则，在其他情况下，包括 [module][tsconfig-module] 被设置为 `amd` , `system` , `umd` , `es2015` , `esnext` 等，其默认值为 `Classic` 。

模块解析 ( Module Resolution ) 是编译器用来找出导入所指内容的过程。

## 相对和非相对模块导入

- 相对导入 ( Relative Import ) : 以 `/` , `./` 或 `../` 开头的导入

  - 相对导入是相对于导入文件解析的，不能解析为一个环境模块声明。
  - 你应该对自己的模块使用相对导入。

- 非相对导入 ( Non-Relative Import ) : 任何其他形式的导入

  - 非相对导入可以相对于 [baseUrl][tsconfig-baseurl] 进行解析，或者通过路径映射 () 进行解析。
  - 它们还可以解析为环境模块 [Ambient Modules][ambient-modules] 声明。
  - 在导入任何外部依赖项时应使用非相对路径。

[tsconfig-module-resolution]: https://www.typescriptlang.org/tsconfig#moduleResolution
[tsconfig-baseurl]: https://www.typescriptlang.org/tsconfig#baseUrl
[tsconfig-module]: https://www.typescriptlang.org/tsconfig#module
[ambient-modules]: https://www.typescriptlang.org/docs/handbook/modules.html#ambient-modules

## Classic

```json
// tsconfig.json
{
  "compilerOptions": {
    "moduleResolution": "Classic"
  }
}
```

这曾经是 TypeScript 的默认解析策略，现在这种策略主要用于向后兼容。

相对导入将相对于导入文件进行解析。

所以在源文件 `/root/src/folder/A.ts` 中的 `import { b } from "./moduleB"` 将进行一下查找：

1. `/root/src/folder/moduleB.ts`
2. `/root/src/folder/moduleB.d.ts`

对于非相对模块导入，编译器从包含导入文件的目录开始，沿着目录树往上查找，试图找到匹配的定义文件。

例如，在源文件 `/root/src/folder/A.ts` 中的非相对导入 `import { b } from "moduleB"`
将尝试依次从一下位置来定位 `"moduleB"` ：

1. `/root/src/folder/moduleB.ts`
2. `/root/src/folder/moduleB.d.ts`
3. `/root/src/moduleB.ts`
4. `/root/src/moduleB.d.ts`
5. `/root/moduleB.ts`
6. `/root/moduleB.d.ts`
7. `/moduleB.ts`
8. `/moduleB.d.ts`

## Node

```json
// tsconfig.json
{
  "compilerOptions": {
    "moduleResolution": "Node"
  }
}
```

`"Node"` 解析策略试图在运行时模拟 [Node.js](https://nodejs.org/zh-cn/) 模块的解析机制，
以便在编译时定位模块的定义文件。

完整的 Node.js 解析算法可查看官方文档中的描述：

- [CommonJS modules | Node.js](https://nodejs.org/api/modules.html#modules_all_together)

### 相对导入

在源文件 `/root/src/moduleA.ts` 中相对导入 `import { b } from "./moduleB"` 将尝试依次从下列位置来定位 `"moduleB"` ：

1. `/root/src/moduleB.ts`
2. `/root/src/moduleB.tsx`
3. `/root/src/moduleB.d.ts`
4. `/root/src/moduleB/package.json` ( 若它指定了 `types` 属性 )
5. `/root/src/moduleB/index.ts`
6. `/root/src/moduleB/index.tsx`
7. `/root/src/moduleB/index.d.ts`

### 非相对导入

在源文件 `/root/src/moduleA.ts` 中的 `import { b } from "moduleB"` 将导致以下查找：

1. `/root/src/node_modules/moduleB.ts`
2. `/root/src/node_modules/moduleB.tsx`
3. `/root/src/node_modules/moduleB.d.ts`
4. `/root/src/node_modules/moduleB/package.json` ( 若它指定了 `types` 属性 )
5. `/root/src/node_modules/@types/moduleB.d.ts`
6. `/root/src/node_modules/moduleB/index.ts`
7. `/root/src/node_modules/moduleB/index.tsx`
8. `/root/src/node_modules/moduleB/index.d.ts`

---

9. `/root/node_modules/moduleB.ts`
10. `/root/node_modules/moduleB.tsx`
11. `/root/node_modules/moduleB.d.ts`
12. `/root/node_modules/moduleB/package.json` ( 若它指定了 `types` 属性 )
13. `/root/node_modules/@types/moduleB.d.ts`
14. `/root/node_modules/moduleB/index.ts`
15. `/root/node_modules/moduleB/index.tsx`
16. `/root/node_modules/moduleB/index.d.ts`

---

17. `/node_modules/moduleB.ts`
18. `/node_modules/moduleB.tsx`
19. `/node_modules/moduleB.d.ts`
20. `/node_modules/moduleB/package.json` ( 若它指定了 `types` 属性 )
21. `/node_modules/@types/moduleB.d.ts`
22. `/node_modules/moduleB/index.ts`
23. `/node_modules/moduleB/index.tsx`
24. `/node_modules/moduleB/index.d.ts`
