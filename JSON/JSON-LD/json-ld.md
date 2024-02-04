# JSON-LD

![json-ld-logo](https://json-ld.org/images/json-ld-logo-64.png)

> JSON for Linking Data

- <https://json-ld.org/>

JSON-LD 是一种轻量级关联数据格式。人类很容易读和写。

它基于已经成功的 JSON 格式，并提供了一种在 web 规模上帮助 JSON 数据互操作的方法。

JSON-LD 是编程环境、REST Web 服务和非结构化数据库(如 Apache CouchDB 和 MongoDB)的理想数据格式。

## 一个简单示例

```json
{
  "@context": "https://json-ld.org/contexts/person.jsonld",
  "@id": "http://dbpedia.org/resource/John_Lennon",
  "name": "John Lennon",
  "born": "1940-10-09",
  "spouse": "http://dbpedia.org/resource/Cynthia_Lennon"
}
```

上面的例子描述了一个叫约翰·列侬的人。
常规 JSON 和 JSON-LD 之间的区别在于，上面的 JSON-LD 对象在 Web 上唯一地标识自己，
并且可以在现今运行的每个 Web 站点、Web 服务和数据库中使用，而不会引入歧义。

## W3C 规范 JSON-LD Working Group

- <https://www.w3.org/2018/json-ld-wg/>

- json-ld-syntax - <https://www.w3.org/TR/json-ld/>
- json-ld-api - <https://www.w3.org/TR/json-ld-api/>
- json-ld-framing - <https://www.w3.org/TR/json-ld-framing/>
- json-ld-streaming - <https://w3c.github.io/json-ld-streaming/>
