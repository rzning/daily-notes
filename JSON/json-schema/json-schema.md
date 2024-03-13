# JSON Schema

- <https://json-schema.org/>
- <https://github.com/json-schema-org/json-schema-spec>

JSON Schema 是一个词汇表，可用于注释 ( anotate ) 和验证 ( validate ) JSON 文档。

## 标准化 Standardization

- [JSON Schema (core)](https://datatracker.ietf.org/doc/draft-handrews-json-schema/)
- [JSON Schema Validation](https://datatracker.ietf.org/doc/draft-handrews-json-schema-validation/)
- [JSON Hyper-Schema](https://datatracker.ietf.org/doc/draft-handrews-json-schema-hyperschema/)
- [Relative JSON Pointers](https://datatracker.ietf.org/doc/draft-handrews-relative-json-pointer/)

## 快速入门 Quickstart

我们将验证或描述的 JSON 文档称为实例 ( Instance ) ，而包含描述的文档称为模式架构 ( Schema ) 。

最基本的 schema 是一个空白 JSON 对象，它不限制任何东西，并且什么也没描述：

```json
{}
```

你可以通过向 schema 添加验证关键字来对 instance 应用约束。

例如可以通过 `type` 关键字来限制 instance 的数据类型：

```json
{
  "type": "string"
}
```

JSON Schema 已准备好用于超媒体 ( Hypermedia ) ，非常适合注释现有的基于 JSON 的 HTTP API 。

JSON Schema 文档由 URI 标识，可以在 HTTP 链接头 ( Link headers ) 中使用 URI ，
并且在 JSON Schema 中允许递归定义 ( recursive definitions ) 。

## 了解更多 Learn More

- [Understanding JSON Schema](https://json-schema.org/understanding-json-schema/)
- [The specification](https://json-schema.org/specification.html)
- [Implementations](https://json-schema.org/implementations.html)
- [Learning resources](https://json-schema.org/learn/)
- [Getting Started Step-By-Step](https://json-schema.org/learn/getting-started-step-by-step.html)

### 中文帖子

- [JSON Schema详解 - 成长的足迹 - CSDN博客](https://blog.csdn.net/taiyangdao/article/details/77865622)
- [什么是JSON Schema？ - nausealiu的博客 - CSDN博客](https://blog.csdn.net/nausealiu/article/details/90414261)
- [Json Schema 快速入门 - 简书](https://www.jianshu.com/p/8278eb2458c4)
- [json-schema简介与应用 - 简书](https://www.jianshu.com/p/8eb4e26babaf)
