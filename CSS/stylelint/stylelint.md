# stylelint

- <https://github.com/stylelint/stylelint>
- <https://stylelint.io/>

A mighty, modern style linter

## Getting started

使用 npm 安装 stylelint 和
[standard configuration](https://github.com/stylelint/stylelint-config-standard)

```sh
npm install --save-dev stylelint stylelint-config-standard
```

在项目根目录创建 `.stylelintrc.json` 配置文件

```json
{
  "extends": "stylelint-config-standard"
}
```

对项目中的所有 CSS  文件执行 stylelint

```sh
npx stylelint "**/*.css"
```

## Node.js API

```js
stylelint.lint(options).then(resultObject => {
  /* .. */
})
```

Example A

```js
stylelint
  .lint({
    config: { rules: 'color-no-invalid-hex' },
    files: 'all/my/stylesheets/*.css'
  })
  .then(data => {
    // data.output
    // data.errored
    // data.results
    // todo...
  })
  .catch(err => {
    console.error(err.stack)
  })
```
