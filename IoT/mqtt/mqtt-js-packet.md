# mqtt-packet

- <https://github.com/mqttjs/mqtt-packet>

mqtt-packet 是一个用于对 MQTT 数据包进行编码和解码的低级库。

它作为 MQTT.js 的核心协议实现，可以在其他 MQTT 相关项目中独立使用。

在 JS 中轻松地解析和生成 MQTT 数据包。

采用 node 方式对 MQTT 3.1.1、5.0 数据包进行编码解码。

```sh
npm install mqtt-packet --save
```

## 示例 Examples

生成 Generating

```js
const mqtt = require('mqtt-packet')

const object = {
  cmd: 'publish',
  retain: false,
  qos: 0,
  dup: false,
  length: 10,
  topic: 'test',
  // 也可以是一个 Buffer
  payload: 'test'
}

console.log(mqtt.generate(object))

// Prints:
//
// <Buffer 30 0a 00 04 74 65 73 74 74 65 73 74>
//
// Which is the same as:
//
// Buffer.from([
//   48, 10, // Header (publish)
//   0, 4, // Topic length
//   116, 101, 115, 116, // Topic (test)
//   116, 101, 115, 116 // Payload (test)
// ])
```

解析 Parsing

```js
const mqtt = require('mqtt-packet')

// 协议版本默认是 4 即 MQTT v3.1.1， opts 通常是一个连接包
const opts = { protocolVersion: 4 }

const parser = mqtt.parser(opts)

// 同步发送所有解析过的数据包
parser.on('packet', (packet) => {
  console.log(packet)
  // Prints:
  //
  // {
  //   cmd: 'publish',
  //   retain: false,
  //   qos: 0,
  //   dup: false,
  //   length: 10,
  //   topic: 'test',
  //   payload: <Buffer 74 65 73 74>
  // }
})

parser.parse(
  Buffer.from([
    48,
    10, // Header (publish)
    0,
    4, // Topic length
    116,
    101,
    115,
    116, // Topic (test)
    116,
    101,
    115,
    116 // Payload (test)
  ])
)
// 返回解析器中剩余的字节数
```

## API

- `mqtt#generate(object, [opts])`

  - 生成一个包含 MQTT 数据包的 `Buffer` 。
  - 该 `object` 必须是下面 Packets 部分指定的对象之一。
  - 如果无法生成数据包，则抛出错误。

- `mqtt#writeToStream(object, stream,[opts])`

  - 将 `object` 定义的 mqtt 包写入指定流。

- `mqtt#parser([opts])`

  - 解析给定的 `Buffer` 并同步发出包含的所有 MQTT 数据包。
  - 返回待解析的剩余字节数。

## 数据包 Packets

- Connect
- Connack
- Subscribe
- Suback
- Unsubscribe
- Unsuback
- Publish
- Puback
- Pubrec
- Pubrel
- Pubcomp
- Pingreq
- Pingresp
- Disconnect
- Auth
