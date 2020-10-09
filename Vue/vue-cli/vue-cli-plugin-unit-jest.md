# @vue/cli-plugin-unit-jest

- [vue-cli/packages/@vue/cli-plugin-unit-jest](
  https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-unit-jest
)
  - [zh-CN](https://github.com/vuejs/vue-docs-zh-cn/tree/master/vue-cli-plugin-unit-jest)

## Usage

在已有的项目中添加 Jest 单元测试功能可执行以下命令

```
vue add @vue/unit-jest
```

## Generator

`generator/index.js` 生成器文件执行以下逻辑：

0️⃣ 添加模板文件:

- 若为 JS 环境则添加 `tests/unit/example.spec.js` 文件
- 若为 TS 环境则添加 `tests/unit/example.spec.ts` 文件

1️⃣ 注入命令:

- `vue-cli-service test:unit`

2️⃣ 添加开发依赖：

- `@vue/test-utils`

3️⃣ 创建 Jest 配置文件 `jest.config.js`

- 若有 Babel 则添加以下 Jest 配置：

  ```js
  {
    preset: '@vue/cli-plugin-unit-jest'
  }
  ```

- 若无 Babel 则添加以下配置：

  ```js
  {
    preset: '@vue/cli-plugin-unit-jest/presets/no-babel'
  }
  ```


4️⃣ 若存在 ESLint 则向 `.eslistrc` 配置文件注入配置项：

```js
{
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
```

5️⃣ 若存在 TypeScript 则执行以下逻辑

创建 Jest 配置文件:

```js
// babel

{
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel'
}

// no-babel

{
  preset: '@vue/cli-plugin-unit-jest/presets/typescript'
}
```

向 `tsconfig.json` 文件注入配置项:

```json
{
  "compilerOptions": {
    "types": [
      "jest"
    ]
  }
}
```
