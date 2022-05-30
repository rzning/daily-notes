# Prettier

- <https://github.com/prettier/prettier>
- <https://prettier.io/>

Prettier 是一个固执己见的代码格式工具。

Prettier 通过解析代码并使用自己的规则（考虑最大行宽）重新打印代码，从而实现一致的样式，
并在必要时包装 ( Wrapping ) 代码。

## 1. About

## 2. Usage

## 3. Configuring

### 3.1 Options

### 3.2 Configuration File

Prettier 使用 [cosmiconfig] 来支持配置文件，这意味着你可以通过下面方式配置 Prettier （按优先级顺序）：

[cosmiconfig]: https://github.com/davidtheclark/cosmiconfig

- `package.json` 文件中的 `prettier` 字段。
- 一个用 JSON 或 YAML 写的 `.prettierrc` 文件。
- 一个 `.prettierrc.json` , `.prettierrc.yml` , `.prettierrc.yaml` 或者 `.prettierrc.json5` 文件
- 一个使用 `module.exports` 导出的 `.prettierrc.js` , `.prettierrc.cjs` , `prettier.config.js` 或 `prettier.config.cjs` 文件。
- 一个 `.prettierrc.toml` 文件。

为了确保项目在不同计算机上 Prettier 运行一致， Prettier 不支持任何类型的全局配置。

### 配置覆盖

Prettier 允许你对某些文件扩展名、文件夹和特定文件进行不同的配置。

Prettier 借用了 ESLint 的格式重写：

> [ESLint Overrides](https://eslint.org/docs/user-guide/configuring/configuration-files#how-do-overrides-work)

```json
{
  "semi": false,
  "overrides": [
    {
      "files": "*.test.js",
      "options": {
        "semi": true
      }
    },
    {
      "files": ["*.html", "legacy/**/*.js"],
      "options": {
        "tabWidth": 4
      }
    }
  ]
}
```

## 4. Editors

## 5. Misc
