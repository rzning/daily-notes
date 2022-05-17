# eslint-config-prettier

- <https://github.com/prettier/eslint-config-prettier>

关闭所有不必要的或可能与 [Prettier][prettier] 冲突的规则。

[prettier]: https://github.com/prettier/prettier

## Installation

```sh
yarn add --dev eslint-config-prettier
```

安装依赖，然后将将 `"prettier"` 添加到 `.eslintrc.*` 配置文件的 `extends` 数组中：

```json
{
  "extends": ["some-other-config-you-use", "prettier"]
}
```

是的，只添加一个 `"prettier"` 扩展即可，它会关闭一些核心 ESLint 规则，以及以下插件中的一些规则:

- [@typescript-eslint/eslint-plugin](https://github.com/typescript-eslint/typescript-eslint)
- [eslint-plugin-babel](https://github.com/babel/babel/tree/main/eslint/babel-eslint-plugin)
- [eslint-plugin-flowtype](https://github.com/gajus/eslint-plugin-flowtype)
- [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react)
- [eslint-plugin-standard](https://github.com/standard/eslint-plugin-standard)
- [eslint-plugin-unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn)
- [eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue)

> 👉 使用 [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier) ？
> 可以查看 [eslint-plugin-prettier 的推荐配置](https://github.com/prettier/eslint-plugin-prettier#recommended-configuration)

> ❗❗ 提示：升级到 8.0.0 之后就无需添加类似 `"prettier/react"` 选项了，
> 只需添加一个 `"prettier"` 就包括所有规则了。
> 参见 : [更新日志-v8.0.0](https://github.com/prettier/eslint-config-prettier/blob/main/CHANGELOG.md#version-800-2021-02-21)
