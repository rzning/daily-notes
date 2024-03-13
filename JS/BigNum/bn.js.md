# bn.js

![bn.js](https://github.com/indutny/bn.js/raw/master/logo.png)

- <https://github.com/indutny/bn.js>

> BigNum in pure javascript

## Install

```sh
npm install --save bn.js
```

## Usage

```js
const BN = require('bn.js')

const a = new BN('dead', 16)

const b = new BN('101010', 2)

const result = a.add(b)

console.log(result.toString(10))
// 57047
```

注意：此库不支持小数。

## Notation 符号

### Prefixes

- `i` - 就地执行操作，将结果存储在宿主对象中，即调用该方法的对象。

- `u` - 无符号 ( Unsigned ) ，在执行操作时忽略操作数的符号，或者始终返回正值。

### Postfixes

- `n` - 函数的参数必须是一个简单的 JavaScript 数字，不支持小数。

- `rn` - 函数的参数和返回值都是简单的 JavaScript 数字，不支持小数。

### Examples

- `a.iadd(b)` - 对 `a` 和 `b` 执行加法运算，将结果存储在 `a` 中。

- `a.umod(b)` - 将 `a` 对 `b` 取模，返回正值。

- `a.iushln(13)` - 将 `a` 按位左移 13 位。

## Instructions 指令说明

Utilities

| 实用函数                              | 说明                                                                                                          |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `a.clone()`                           | 克隆数字                                                                                                      |
| `a.toString(base, length)`            | 转换为字符串，并用零填充                                                                                      |
| `a.toNumber()`                        | 转换为 JavaScript 数，限制为 53 位                                                                            |
| `a.toJSON()`                          | 转换为 JSON 兼容的十六进制字符串，是 `toString(16)` 的别名                                                    |
| `a.toArray(endian, length)`           | 转换为字节数组，可选的零填充到指定长度，超出则抛错                                                            |
| `a.toArrayLike(type, endian, length)` | 转换为指定类型实例，其行为必须与 `Array` 类似                                                                 |
| `a.toBuffer(endian, length)`          | 转换为 Node.js Buffer 。为了与 browserify 或类似工具兼容，可使用 `a.toArrayLike(Buffer, endian, length)` 代替 |
| `a.bitLength()`                       | 获取占用的位数                                                                                                |
| `a.zeroBits()`                        | 返回不重要的后续零位个数量，如 `1010000` 有 4 个零位                                                          |
| `a.byteLength()`                      | 返回占用的字节数                                                                                              |
| `a.isNeg()`                           | 是否为负数                                                                                                    |
| `a.isEven()`                          | 是否为偶数                                                                                                    |
| `a.isOdd()`                           | 是否为奇数                                                                                                    |
| `a.isOero()`                          | 是否为零                                                                                                      |
| `a.cmp(b)`                            | 比较数字，返回 `-1` ( `a < b` ) , `0` ( `a == b` ) 或 `1` ( `a > b` )                                         |
| `a.lt(b)`                             | 小于                                                                                                          |
| `a.lte(b)`                            | 小于或等于                                                                                                    |
| `a.gt(b)`                             | 大于                                                                                                          |
| `a.gte(b)`                            | 大于或等于                                                                                                    |
| `a.eq(b)`                             | 等于                                                                                                          |
| `a.toTwos(width)`                     | 转换为 2 的补码表示，其中 `width` 为位宽                                                                      |
| `a.fromTwos(width)`                   | 从 2 的补码表示进行还原                                                                                       |
| `BN.isBN(object)`                     | 是否为 BN.js 实例                                                                                             |
| `BN.max(a, b)`                        | 返回 `a` 和 `b` 中的大数                                                                                      |
| `BN.min(a, b)`                        | 返回 `a` 和 `b` 中的小数                                                                                      |

Arithmetics

| 算数            | 说明                          | 前缀/后缀                |
| --------------- | ----------------------------- | ------------------------ |
| `a.neg()`       | Negate Sign 取反              | `i`                      |
| `a.abs()`       | Absolute Value 绝对值         | `i`                      |
| `a.add(b)`      | Addition 加法                 | `i` , `n` , `in`         |
| `a.sub(b)`      | Subtraction 减法              | `i` , `n` , `in`         |
| `a.mul(b)`      | Multiply 乘法                 | `i` , `n` , `in`         |
| `a.sqr()`       | Square 平方                   | `i`                      |
| `a.pow(b)`      | Power 幂                      |
| `a.div(b)`      | Divide 除法                   | `divn` , `idivn`         |
| `a.mod(b)`      | Reduct 余数                   | `u` , `n` , 但无 `umodn` |
| `a.divmod(b)`   | 返回有除法得到的商和余数      |
| `a.divRound(b)` | Rounded Division 舍入整数除法 |

Bit operations

| 位操作             | 说明                        |
| ------------------ | --------------------------- |
| `a.or(b)`          | 按位或                      |
| `a.and(b)`         | 按位与                      |
| `a.xor(b)`         | 按位异或                    |
| `a.setn(b, value)` | 设置指定位                  |
| `a.shln(b)`        | Shift Left 左位移           |
| `a.shrn(b)`        | Shift Right 右位移          |
| `a.testn(b)`       | 测试是否设置了指定位        |
| `a.maskn(b)`       | 清除索引大于或等于 `b` 的位 |
| `a.bincn(b)`       | 将 `1 << b` 加到数字上      |
| `a.notn(w)`        | 按位非                      |

Reduction

| 函数        | 说明                   |
| ----------- | ---------------------- |
| `a.gcd(b)`  | GCD 最大公约数         |
| `a.egcd(b)` | 扩展的 GCD 结果        |
| `a.invm(b)` | inverse `a` modulo `b` |
