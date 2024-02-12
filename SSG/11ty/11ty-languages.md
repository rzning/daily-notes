# Eleventy Template languages

- <https://www.11ty.dev/docs/languages/>

| 模板语言   | 11ty 标识名 | 文件扩展名  | NPM             |
| ---------- | ----------- | ----------- | --------------- |
| HTML       | `html`      | `.html`     | `N/A`           |
| Markdown   | `md`        | `.md`       | [markdown-it]   |
| WebC       | `webc`      | `.webc`     | [@11ty/webc]    |
| JavaScript | `11ty.js`   | `.11ty.js`  | `N/A`           |
| Liquid     | `liquid`    | `.liquid`   | [liquidjs]      |
| Nunjucks   | `njk`       | `.njk`      | [nunjucks]      |
| Handlebars | `hbs`       | `.hbs`      | [handlebars.js] |
| Mustache   | `mustache`  | `.mustache` | [mustache.js]   |
| EJS        | `ejs`       | `.ejs`      | [ejs]           |
| Haml       | `haml`      | `.haml`     | [haml.js]       |
| Pug        | `pug`       | `.pug`      | [pug]           |
| Custom     | _(Any)_     | `.*`        | _(Any)_         |

[markdown-it]: https://www.npmjs.com/package/markdown-it
[@11ty/webc]: https://github.com/11ty/webc
[@11ty/eleventy-plugin-webc]: https://github.com/11ty/eleventy-plugin-webc
[liquidjs]: https://www.npmjs.com/package/liquidjs
[nunjucks]: https://github.com/mozilla/nunjucks
[handlebars.js]: https://handlebarsjs.com/
[mustache.js]: https://github.com/janl/mustache.js/
[ejs]: https://www.npmjs.com/package/ejs
[haml.js]: https://www.npmjs.com/package/hamljs
[pug]: https://github.com/pugjs/pug

## 覆盖模板语言

有以下多种途径告诉 Eleventy ，你想如何处理一个文件：

1. 文件扩展名。
2. 配置选项：

   - 📚 `markdownTemplateEngine`

     - 指定用于预处理 Markdown 文件的默认全局模板引擎。
     - 使用 `false` 可避免预处理，只转换 Markdown 。

   - 📚 `htmlTemplateEngine`

     - 指定用于预处理 HTML 文件的默认全局模板引擎。
     - 使用 false 可避免预处理和透传复制内容。

3. 模板文件 FrontMatter 部分的 🌾 `templateEngineOverride` 选项：

   - 是否使用另一个模板引擎来处理当前模板。

### 文件 🌾 `templateEngineOverride` 选项示例

1️⃣ 替换单个模板引擎：

使用 Nunjucks 解析 `example.liquid`

```liquid
---
templateEngineOverride: njk
---
```

2️⃣ 给 Markdown 文件指定模板引擎：

默认情况下， Markdown 文件是通过 📚 `markdownTemplateEngine` 配置选项全局设置的额外预处理模板引擎来处理的。

因此，在 Markdown 文件上使用 🌾 `templateEngineOverride` 选项时，要确保列出想使用的每个模板引擎。

只使用 Markdown 处理：

```
---
templateEngineOverride: md
---
```

先使用 Nunjucks 再使用 Markdown 处理：

```
---
templateEngineOverride: njk,md
---
```

只复制文件，不做任何转换：

```
---
templateEngineOverride: false
---
```
