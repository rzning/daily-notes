# Node.js + MQTT

> [Node.js 和 MQTT：构建高性能 IoT 解决方案 - MQTT 中文站](https://www.mqtt.cn/1083.html)

MQTT 是一种轻量级的客户端-服务器协议，实现了发布/订阅消息传输模型。

MQTT 客户端将消息发送到代理服务器的指定主题，其他客户端可以订阅代理上的同一主题以接收这些消息。

## MQTT 技术概念

- 桥接 Bridge
  - 两个 MQTT 代理之间的连接。
- MQTT 客户端 Client
  - 连接到经过安全网络连接的 MQTT 代理的设备或使用 MQTT 客户端库编写的应用程序；
  - MQTT 客户端可以是发布者或订阅者。
- 消息 Message
  - 需要发布的消息，可以是缓冲区（Buffer）、字符串（String）或 JSON 对象。
- 主题 Topics
  - 代理用于过滤并将适当的消息发送到连接的客户端的字符串标识符。
- 发布者 Publisher
  - 发布者客户端将数据或消息分发到代理服务器上的主题，供其他订阅者客户端使用。
- 解耦 Decoupling
  - 发布者/订阅者只需要知道代理的主机名/IP 和端口，而无需知道彼此。

## 代理服务器 MQTT Broker

客户端连接始终由 Broker 代理服务器处理，因为 MQTT 订阅者和发布者始终是独立的。

代理服务器主要负责：

- 接收所有消息。
- 根据客户端订阅筛选消息，并将正确的消息发送给客户端。
- 保持与客户端之间的连接。
- 对客户端进行身份验证和授权。

建立连接过程：

1. 客户端通过发送 CONNECT 消息，请求与代理服务器进行连接。
2. 服务器收到消息建立连接后，将给客户端返回 CONNACK 消息和一个状态码。
3. 代理服务器须始终保持连接处于活动状态，除非客户端主动发送断开事件或网络意外断开。

```
        Client
  CONNECT ⇵ CONNACK
        Server
```

可以使用免费托管的 MQTT Broker 用于测试，比如 Eclipse 的 Mosquitto 。

- <https://test.mosquitto.org/>

## mqtt.js

mqtt.js 是 MQTT 协议的开源 JavaScript 库，适用于 Node.js 和浏览器。

通常，该库可用于发布消息和订阅 MQTT 代理上的主题。

```sh
npm install mqtt --save
```

## 用于发布消息的客户端

```js
// publisher.js

const mqtt = require('mqtt')

// 代理网站
const BROKER_URL = 'mqtt://test.mosquitto.org'

// MQTT 代理使用客户端 ID 来跟踪客户端及其状态
const clientId = 'mqttjs_' + Math.random().toString(8).substr(2, 4)

// connect() 方法返回客户端实例
const client = mqtt.connect(BROKER_URL, { clientId: clientId, clean: false })

// 主题名称
const topicName = 'test/connection'
// 消息内容
const payload = { 1: 'Hello world', 2: 'Welcome to the test connection' }

// 连接成功回调
client.on('connect', function (connack) {
  // 向指定主题发布消息
  client.publish(
    topicName,
    JSON.stringify(payload),
    { qos: 1, retain: true },
    (PacketCallback, err) => {
      if (err) {
        console.log(err, 'MQTT publish packet')
      }
    }
  )
})

client.on('error', function (err) {
  console.log('Error: ' + err)
  if (err.code == 'ENOTFOUND') {
    console.log('网络错误，请确保你有一个活跃的互联网连接。')
  }
})

client.on('close', function () {
  console.log('客户端关闭连接。')
})

client.on('reconnect', function () {
  console.log('客户端正在尝试重新连接。')
})

client.on('offline', function () {
  console.log('客户端当前脱机。')
})
```

发布 Publish 数据包主要包括下列属性：

```js
{
  cmd: 'publish',
  topic: 'test/connection',
  payload: '{"1":"Hello world","2":"Welcome to the test connection"}',
  qos: 1,
  retain: true,
  messageId: 12041,
  dup: false
}
```

## 用于订阅消息的客户端

```js
// subscriber.js

const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://test.mosquitto.org')
const topicName = 'test/connection'

// 连接到同一代理服务器，并订阅相同的主题
client.on('connect', () => {
  // 订阅主题
  client.subscribe(topicName, (err, granted) => {
    if (err) {
      // 订阅错误或客户端断开连接时发生的错误
      console.log('err', err)
    }
    // granted 是一个 { topic, qos } 类型的数组
    // - topic : 已经订阅的主题
    // - qos : 被授予的 QoS 级别
    console.log('granted', granted)
  })
})

// 接收到订阅消息事件时触发
client.on('message', (topic, message, packet) => {
  console.log(packet, packet.payload.toString())

  if (topic === topicName) {
    console.log(JSON.parse(message))
  }
})

// 当客户端发送任何数据包时触发。
// 这包括 Published 包以及 MQTT 用于管理订阅和连接的包
client.on('packetsend', (packet) => {
  console.log('Packet Send', packet)
})
```

## MQTT 其他功能特点

- 保留消息

  - 默认情况下，当服务器接收到没有订阅用户的主题消息时，会将消息丢弃。
  - 但是，当收到有保留标识的消息时，服务器会暂时保留此消息。
  - 当有新客户端端订阅此主题时，服务器会将保留消息发送给客户端。
  - 注意，代理服务器的每个主题只存储一条保留消息，当有新的保留消息时，会将旧的覆盖。

- 身份认证和数据安全支持

  - MQTT 支持各种身份验证方法和数据安全机制，包括 TLS 和 OAuth，通常在 MQTT 代理服务器上配置。

- 三个服务质量 ( QoS ) 级别

  - 0 - 至多一次
  - 1 - 是少一次
  - 2 - 正好一次

- 数据不可知

  - MQTT 是数据不可知的，客户端的用例确定了数据的结构方式。
  - 因此，客户端可以发送任何类型的消息，包括图像、编码文本、加密数据等。

- 端口

  - 默认的未加密 TCP/IP 端口是 1883。
  - 还支持加密的 SSL/TLS 端口 8883。
