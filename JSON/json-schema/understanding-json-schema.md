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

使用 `type` 关键字指定特定的类型

```json
{
  "type": "string"
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



