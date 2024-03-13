# Paho

- <https://eclipse.dev/paho/>
- <https://projects.eclipse.org/projects/iot.paho>

Paho 是一个 [![iot-logo]](https://iot.eclipse.org/) 项目

Eclipse Paho 项目以各种编程语言提供 MQTT 和 MQTT-SN 的开源（主要是客户端）实现。

Paho 项目的创建旨在提供开放和标准消息传递协议的可扩展开源实现，旨在针对机器对机器 （M2M） 和物联网 （IoT） 的新兴、现有和新兴应用。

[iot-logo]: https://iot.eclipse.org/assets/images/iot_logo.svg

## MQTT 客户端比较

| Client / Features     | Java | Python | JavaScript | GoLang | C   | C++ | Rust | .Net (C#) | Android Service | Embedded C/C++ |
| --------------------- | ---- | ------ | ---------- | ------ | --- | --- | ---- | --------- | --------------- | -------------- |
| MQTT 3.1              | ✔   | ✔     | ✔         | ✔     | ✔  | ✔  | ✔   | ✔        | ✔              | ✔             |
| MQTT 3.1.1            | ✔   | ✔     | ✔         | ✔     | ✔  | ✔  | ✔   | ✔        | ✔              | ✔             |
| MQTT 5.0              | ✔   | ✔     | 🚫         | 🚫     | ✔  | ✔  | 🚫   | 🚫        | 🚫              | 🚫             |
| LWT                   | ✔   | ✔     | ✔         | ✔     | ✔  | ✔  | ✔   | ✔        | ✔              | ✔             |
| SSL / TLS             | ✔   | ✔     | ✔         | ✔     | ✔  | ✔  | ✔   | ✔        | ✔              | ✔             |
| Automatic Reconnect   | ✔   | ✔     | ✔         | ✔     | ✔  | ✔  | ✔   | 🚫        | ✔              | 🚫             |
| Offline Buffering     | ✔   | ✔     | ✔         | ✔     | ✔  | ✔  | ✔   | 🚫        | ✔              | 🚫             |
| Message Persistence   | ✔   | 🚫     | ✔         | ✔     | ✔  | ✔  | ✔   | 🚫        | ✔              | 🚫             |
| WebSocket Support     | ✔   | ✔     | ✔         | ✔     | ✔  | ✔  | 🚫   | 🚫        | ✔              | 🚫             |
| Standard MQTT Support | ✔   | ✔     | 🚫         | ✔     | ✔  | ✔  | ✔   | ✔        | ✔              | ✔             |
| Blocking API          | ✔   | ✔     | 🚫         | 🚫     | ✔  | ✔  | ✔   | 🚫        | 🚫              | ✔             |
| Non-Blocking API      | ✔   | ✔     | ✔         | ✔     | ✔  | ✔  | ✔   | ✔        | ✔              | ✔             |
| High Availability     | ✔   | 🚫     | ✔         | ✔     | ✔  | ✔  | ✔   | 🚫        | ✔              | 🚫             |

## Eclipse Paho JavaScript 客户端

| Features             | 特征            | JS  | 说明                                                 |
| -------------------- | --------------- | --- | ---------------------------------------------------- |
| MQTT 3.1             | MQTT 3.1 版本   | ✔  |
| MQTT 3.1.1           | MQTT 3.1.1 版本 | ✔  |
| MQTT 5.0             | MQTT 5.0 版本   | 🚫  |
| LWT                  | 最后遗嘱        | ✔  | 最后遗嘱和遗嘱消息。                                 |
| SSL / TLS            | SSL / TLS       | ✔  | 传输层安全性或 SSL。                                 |
| Automatic Reconnect  | 自动重新连接    | ✔  | 如果连接丢失，可以自动重新连接到服务器。             |
| Offline Buffering    | 离线缓冲        | 🚫  | 将在脱机时缓冲消息，以便在重新建立连接时发送。       |
| Message Persistence  | 消息持久性      | ✔  | 支持在应用程序崩溃时持久化消息。                     |
| WebSocket Support    | WebSocket 支持  | ✔  | 可以与支持 WebSockets 的 MQTT 服务器通信。           |
| Standard TCP Support | 标准 TCP 支持   | 🚫  | 可以与支持 TCP 的 MQTT 服务器通信。                  |
| Blocking API         | 阻塞 API        | 🚫  | 支持阻塞或单线程 API。                               |
| Non-Blocking API     | 非阻塞 API      | ✔  | 支持异步 APIs                                        |
| High Availability    | 高可用性        | ✔  | 如果客户端无法连接到服务器，则故障转移到备选服务器。 |

### 获取

[v1.0.3](https://mirrors.nju.edu.cn/eclipse//paho/releases/1.0.3/paho.javascript-1.0.3.zip)

- [NJU Mirror](https://mirrors.nju.edu.cn/) : 南京大学开源镜像站
  - [/eclipse/paho/releases/1.0.3/](https://mirrors.nju.edu.cn/eclipse/paho/releases/1.0.3/)
    - [paho.javascript-1.0.3.zip](https://mirrors.nju.edu.cn/eclipse/paho/releases/1.0.3/paho.javascript-1.0.3.zip)

CDNs

```html
<script
  src="https://cdnjs.cloudflare.com/ajax/libs/paho-mqtt/1.0.1/mqttws31.js"
  type="text/javascript"
></script>

<script
  src="https://cdnjs.cloudflare.com/ajax/libs/paho-mqtt/1.0.1/mqttws31.min.js"
  type="text/javascript"
></script>
```

### 文档

- [eclipse-paho-jsdoc](https://eclipse.dev/paho/files/jsdoc/index.html)
  - Namespaces
    - MQTT
      - 这个编程接口允许 JavaScript 客户机应用程序使用 MQTT V3.1 或 V3.1.1 协议连接到支持 MQTT 的消息传递服务器。
      - 支持的功能包括:
        1. 连接和断开与服务器的连接。服务器由其主机名和端口号标识。
        2. 指定与服务器通信链路相关的选项，例如保持连接心跳的频率，以及是否需要 SSL/TLS。
        3. 订阅和接收来自 MQTT 主题的消息。
        4. 向 MQTT 主题发布消息。
      - 此 API 主要有两个对象组成：
        - `Paho.MQTT.Client` - 封装了客户端对象，用于与服务器端通信。
        - `Paho.MQTT.Message` - 封装了消息的有效负载以及与其传递相关的各种属性
  - Classes
    - Client
      - `new Client(host, port, path, clientId)`
    - Message
      - `new Message(payload)`

### 示例

下面示例代码使用 WebSockets 连接到服务器并订阅主题 `World` ，一旦订阅，它就向该主题发布消息 `Hello` 。进入订阅主题的任何消息都将被打印到 Javascript 控制台。

```js
// 创建客户端实例
client = new Paho.MQTT.Client(
  location.hostname,
  Number(location.port),
  'clientId'
)

// 设置回调处理程序
client.onConnectionLost = onConnectionLost
client.onMessageArrived = onMessageArrived

// 建立连接
client.connect({ onSuccess: onConnect })

// 当客户端连接成功时调用
function onConnect() {
  // 建立连接后，进行订阅并发送一个消息。
  console.log('onConnect')

  // 订阅 World 主题
  client.subscribe('World')

  // 向 World 主题发送 Hello 消息
  message = new Paho.MQTT.Message('Hello')
  message.destinationName = 'World'
  client.send(message)
}

// 当客户端失去连接时调用
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log('onConnectionLost:' + responseObject.errorMessage)
  }
}

// 当收到订阅的消息时调用
function onMessageArrived(message) {
  console.log('onMessageArrived:' + message.payloadString)
}
```
