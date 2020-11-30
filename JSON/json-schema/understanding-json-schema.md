# Understanding JSON Schema

- <https://json-schema.org/understanding-json-schema/>

JSON Schema 是用于验证 JSON 数据结构的强大工具。

当前版本： JSON Schema draft 7

## 1. JSON Schema 基础

空对象表示可接受任何有效的 JSON

```json
{ }
```

可以使用 `true` 代替空对象表示匹配任何内容

```json
true
```

使用 `false` 表示不匹配任何内容的 Schema

```json
false
```

使用 `type` 关键字指定特定的类型：

```json
{
  "type": "string"
}
```

`type` 关键字常用值举例：

- `string`, `number`, `object`, `array`, `boolean`, `null`

`type` 关键字的值也可是数组形式，表示同时满足多个类型：

```json
{
  "type": ["number", "string"]
}
```

声明一个 JSON Schema ：

- 由于 JSON Schema 本身也是 JSON ，为区分一个 JSON 是否是一个 JSON Schema ，
  可以使用 `$schema` 关键字表明当前 JSON 块是一个 JSON Schema

```json
{
  "$schema": "https://json-schema.org/draft/2019-09/schema"
}
```

`$schema` 关键字的值表明了你的当前 Schema 是基于哪个 JSON Schema 特定版本编写的，例如：

- `http://json-schema.org/draft/2019-09/schema`
- `http://json-schema.org/draft-07/schema`
- `http://json-schema.org/draft-06/schema`
- `http://json-schema.org/draft-04/schema`

最好的做法是还需要添加 `$id` 属性，作为每个 Schema 的唯一标识符：

```json
{
  "$id": "http://yourdomain.com/schemas/myschema.json"
}
```


## 2. JSON Schema 参考

### 2.1 特定类型关键字

使用 `type` 属性指定 JSON 中节点的数据类型。

```ts
type NumericType = 'integer' | 'number'
type SpecificType = 'string' | NumericType | 'object' | 'array' | 'boolean' | 'null'

interface Schema {
  "type": SpecificType | SpecificType[]
}
```


## 3. 构建一个复杂的 Schema



