# cssnano

- <https://github.com/cssnano/cssnano>
- <https://cssnano.co/>

cssnano 是建立在 [PostCSS] 生态系统之上的现代模块化压缩工具。

[PostCSS]: https://github.com/postcss/postcss

## Using PostCSS CLI

安装 [PostCSS CLI](https://github.com/postcss/postcss-cli)
和 cssnano

```sh
npm install postcss-cli --global

npm install cssnano --save-dev
```

创建 `postcss.config.js` 文件来配置 cssnano

```js
module.exports = {
  plugins: [
    require('cssnano')({
      prest: 'default'
    })
  ]
}
```

> [cssnano presets guide](https://cssnano.co/guides/presets)

运行命令压缩指定文件:

```sh
postcss input.css > output.css
```

## 参考

- <https://www.cssnano.cn/>
