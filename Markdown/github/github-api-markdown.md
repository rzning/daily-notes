GitHub REST API

# Markdown

- <https://developer.github.com/v3/markdown/>

## 1️⃣ 渲染一个任意 Markdown 文档

```rest
POST /markdown
```

- 参数
  - `text` ! - 小于 400KB 的 Markdown 文本
  - `mode` ? - 渲染模式 : `markdown` | `gfm`
  - `context` - 在 gfm 模式中表示创建引用时使用的存储库上下文


示例

```json
{
  "text": "Hello #1!",
  "mode": "gfm",
  "context": "github/gollum"
}
```

响应

```html
Status: 200 OK
Content-Type: text/html
Content-Length: 121
X-CommonMarker-Version: 0.17.4

<p>Hello <a href="http://github.com/github/gollum/issues/1" class="issue-link" title="This is another issue">#1</a>!</p>
```

## 2️⃣ 在 raw 模式下渲染一个 Markdown 文档

```rest
POST /markdown/raw
```

- 参数
  - 必须将 Markdown 作为纯文本发送到此终端 ( endpoint ) 而不是使用 JSON 格式
  - 使用 `text/plain` 或 `text/x-markdown` 的 `Content-Type` 头
  - 在 raw 模式下，不支持 gfm
  - Markdown 将以 plain 格式渲染

示例

```
curl https://api.github.com/markdown/raw -X "POST" -H "Content-Type: text/plain" -d "Hello **world** #1!"
```

响应

```html
Status: 200 OK
Content-Type: text/html
Content-Length: 40
X-CommonMarker-Version: 0.17.4

<p>Hello <strong>world</strong> #1!</p>
```
