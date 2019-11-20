# semver

- <https://github.com/npm/node-semver>

The semantic versioner for npm

NPM 使用的语义化版本控制器

## Install

```
npm install semver
```

## Usage

```js
const semver = require('semver')

semver.valid('1.2.3') // '1.2.3'
semver.valid('a.b.c') // null
semver.clean('  =v1.2.3   ') // '1.2.3'
semver.satisfies('1.2.3', '1.x || >=2.5.0 || 5.0.0 - 7.2.3') // true
semver.gt('1.2.3', '9.8.7') // false
semver.lt('1.2.3', '9.8.7') // true
semver.minVersion('>=1.0.0') // '1.0.0'
semver.valid(semver.coerce('v2')) // '2.0.0'
semver.valid(semver.coerce('42.6.7.9.3-alpha')) // '42.6.7'
```

## SemVer

Semantic Versioning Specification 2.0.0

语义化版本控制规范

- <https://semver.org/>

一个版本号中开头的 `"="` 或 `"v"` 将被删除或忽略。

## Ranges

一个版本范围 `version range` 是一组比较器 `comparators` 指定了满足范围的版本。

一个比较器 `comparator` 由一个运算符 `operator` 和一个版本号 `version` 组成。

operators | description | notes
:-:|-|-
`<` | Less than | 小于
`<=` | Less than or equal to | 小于或等于
`>` | Greater than | 大于
`>=` | Greater than or equal to | 大于或等于
`=` | Equal ( optional ) | 相等，若省略则默认相等

比较器可以通过空格连接起来，形成一个比较器集 `comparator set` ，其结果由它所包含的所有比较器的交集 ( intersection ) 来满足。

一个范围 `range` 由一个或多个比较器集 `comparator sets` 组成，由 `||` 连接。

当且仅当版本 `version` 满足至少一个由 `||` 分离的比较器集 `comparator set` 中的每个比较器 `comparator` 时，版本才匹配范围。

```
range: >=1.2.7 <1.3.0
match: v1.2.7, v1.2.8, v1.2.99
not:   v1.2.6, v1.3.0, 1.1.0
```

```
range: 1.2.7 || >=1.2.9 <2.0.0
match: v1.2.7, v1.2.9, v1.4.6
not:   v1.2.8, v2.0.0
```

## Functions

Comparison 比较

method | description
-|-
`gt(v1, v2)` | `v1 > v2`
`gte(v1, v2)` | `v1 >= v2`
`lt(v1, v2)` | `v1 < v2`
`lte(v1, v2)` | `v1 <= v2`
`eq(v1, v2)` | `v1 == v2`
`neq(v1, v2)` | `v1 != v2`
`cmp(v1, comparator, v2)` | 传入相应比较字符串，用于以上比较
`compare(v1, v2)` | 返回 `0` : `v1 == v2` , `1` : `v1 > v2` , `-1` : `v1 < v2`
`rcompare(v1, v2)` | 与 `compare()` 方法相反
`compareBuild(v1, v2)` | 与 `compare()` 方法类似
`diff(v1, v2)` | 根据发布类型返回两个版本的差异，若版本相同则返回 `null`


