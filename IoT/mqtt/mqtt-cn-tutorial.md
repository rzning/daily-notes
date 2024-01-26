# MQTT 中文站教程

## MQTT 协议初学者指南

> [MQTT 协议初学者指南 - MQTT 中文站](https://www.mqtt.cn/1172.html)

MQTT（消息队列遥测传输）是一种轻量级的发布/订阅消息传输协议，专为 M2M（机器对机器）遥测在低带宽环境中设计。

- MQTT 版本
  - MQTT v3.1.0
  - MQTT v3.1.1 - 目前使用最广泛版本
  - MQTT v5.0
  - MQTT-SN - 约在 2013 年制定，用于 UDP 、 ZigBee 等传输方式。
- MQTT 客户端
  - 不需要为客户端分配地址。
  - Eclipse Paho 是一款比较常用的客户端软件。
- MQTT 代理或服务器
  - 最初的术语是代理，但现在已标准化为服务器。
  - 最受欢迎的自托管代理之一是免费开源的 Mosquitto
  - 商业代理如 HiveMQ
- WebSockets
  - WebSockets 允许将 MQTT 数据直接传送到 Web 浏览器。
- 端口
  - MQTT 的标准端口号是 1883 。
- 模型
  - MQTT 基于发布/订阅模型，必须要有代理服务器，
  - 一个 MQTT 服务器可以同时处理成千上万个客户端，
  - MQTT 支持广播消息。

## MQTT 协议的关键特性

> [关于 MQTT 你需要了解这些 - MQTT 中文站](https://www.mqtt.cn/376.html)

1. 简单易实现
   - 协议头部仅占用 2 个字节，消息格式清晰简单。
2. 支持三种不同的服务质量等级 (QoS)
   - QoS 0 : 最多交付一次，消息可能丢失。
   - QoS 1 : 至少交付一次，消息可能重复到达。
   - QoS 2 : 只交付一次，消息保证到达，且不会重复。
3. 轻量级和节省带宽
   - MQTT 协议头非常紧凑，消息传输时开销极小。
4. 双向通信
   - MQTT 基于发布/订阅模式，支持双向通信，即设备既可以发布消息，也可以订阅消息。
5. 安全性
   - MQTT 支持 TLS/SSL 加密，保证数据传输的安全性。
   - 还可提供用户名和密码认证机制，确保只有授权的设备能够连接和通信。
6. 在线状态感知
   - MQTT 使用心跳保活机制，保持连接活跃。
   - 若客户端长时间不活动，服务器可以感知到并主动断开连接。
   - 遗愿 (Last Will) 消息机制允许客户端在意外下线时发布一条指定消息，通知其他设备。

## MQTT 基本架构和组件

> [MQTT 协议的架构是怎样的？ - MQTT 中文站](https://www.mqtt.cn/635.html)

- 服务器 Broker
  - MQTT Broker 是中心服务器，负责接收所有发布的消息并将这些消息转发给所有订阅了相应主题的客户端。
  - Broker 负责维护客户端的会话信息，包括哪些客户端订阅了哪些主题。
  - Broker 还负责处理 QoS 流程和持久化功能。
- 客户端 Client
  - 客户端可以是任何设备，只要它们运行了 MQTT 客户端软件。
  - 客户端可以发布消息到一个主题，也可以订阅一个或多个主题来接收相关的消息。
- 主题 Topics
  - 主题是一个字符串，允许消息按类别进行组织。
  - 客户端可以发布消息到一个主题，也可以订阅一个主题来接受发布到该主题的消息。
  - 主题的层次结构使用斜线 ( / ) 分隔。
- 消息 Messages
  - 客户端发布的数据。
  - 可以是任何格式信息，如文本、二级制数据或 JSON 数据。
- 连接和会话
  - 当客户端想跟 Broker 通信时，首先需要建立一个连接。
  - 在连接时，客户端可以设置“清除会话”标志，决定是否在断开连接后保留会话状态。
  - 客户端也可以设置遗嘱消息，在客户端异常断开时由 Broker 发送一个消息。
- 服务质量等级 QoS ( Quality of Service )
  - OoS 定义了三个消息传输质量级别。
- 保留消息 Retained Messages
  - 当消息发布到某个主题时，可以被设置为“保留消息”。
  - 这意味着这个消息会被 Broker 保存，当有新的客户端订阅这个主题时，它会立即收到该保留消息。
- 最后遗嘱 LWT ( Last Will and Testament )
  - 客户端在连接到 Broker 时可以设置一个遗嘱消息。
  - 如果 Broker 检测到客户端异常断开连接，它会发布这个遗嘱消息到指定的主题。

MQTT 的架构基于发布/订阅模型，允许客户端发布消息和订阅主题，而 Broker 则负责管理这些消息和主题，并确保消息正确地传输到相关的订阅者。

## 使用 WebSocket 连接 MQTT 服务器

> [在 MQTT 中如何使用 WebSocket 进行通信？ - MQTT 中文站](https://www.mqtt.cn/644.html)

- MQTT
  - 通常 MQTT 使用 TCP 进行数据传输，但它也支持 WebSocket 连接。
- WebSocket
  - WebSocket 是一个提供全双工通信通道的协议，可以在单个 TCP 连接上发送和接收数据。
  - 与传统的 HTTP 不同，WebSocket 提供了持久连接，允许服务器和客户端之间实时交互。
- 配置 MQTT Broker 支持 WebSocket
  - 绝大多数现代 MQTT Broker 都支持 WebSocket 。
  - 例如对于 Mosquitto 可以在配置文件中添加以下配置开启 WebSocket 支持：
    ```properties
    listener 8080
    protocol websockets
    ```
    此配置将在端口 8080 上启用 WebSocket 监听器。
- 在客户端使用 WebSocket 进行 MQTT 通信
  - 许多 MQTT 客户端库支持 WebSocket 作为传输协议。
  - 例如使用 JavaScript 的 Paho MQTT 客户端库，可以如下连接到启用 WebSocket 的 MQTT Broker ：
    ```js
    var client = new Paho.MQTT.Client(
      'your_broker_url',
      8080,
      '/mqtt',
      'client_id'
    )
    client.connect({ onSuccess: onConnect })
    ```
- 当 MQTT 使用 WebSocket 进行传输时的工作方式：
  - 建立连接：
    - 客户端首先与 MQTT Broker 建立一个标准的 HTTP 连接。
    - 然后使用 HTTP 的 `Upgrade` 头请求将此连接升级为 WebSocket 连接。
  - 数据帧：
    - 一旦建立连接， MQTT 消息被封装在 WebSocket 数据帧中进行传输。
    - 这意味着每一个 MQTT 消息都被当做一个完整的 WebSocket 消息来处理。

## MQTT 术语表

> [MQTT 术语表：深入了解 MQTT 协议 - MQTT 中文站](https://www.mqtt.cn/606.html)

| 术语                    | 名称                | 说明                                                                                                                                    | 版本 |
| ----------------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| Broker                  | 经纪人              | MQTT 服务器，负责接收发布者（Publishers）发送的消息并将其传递给订阅者（Subscribers）                                                    | -    |
| Clean Start             | 清理启动            | 客户端可以在连接时使用 Clean Start 字段来指示是否期望从已存在的会话中恢复通信，或创建一个新的会话                                       | v5   |
| Client                  | 客户端              | 客户端是使用 MQTT 协议连接到 MQTT 经纪人的设备或应用程序。它可以是发布者或订阅者，通过 MQTT 协议完成发布和订阅操作。                    | -    |
| Client ID               | 客户端标识          | Client ID 用于唯一标识 MQTT 客户端的连接和会话。                                                                                        | -    |
| Connection              | 连接                | MQTT 客户端与 MQTT 服务器之间的网络连接。 MQTT 客户端之间不会直接建立连接，而是通过 MQTT 服务器中转消息。                               | -    |
| Content Type            | 内容类型            | Content Type 字段用于描述消息的内容类型，以便接收方能够更好地处理它。                                                                   | v5   |
| Enhanced Authentication | 增强认证            | MQTT v5.0 引入了 AUTH 报文，支持增强认证。                                                                                              | v5   |
| Flow Control            | 流控制              | 流控制机制，允许客户端和服务器协商最大消息发送速率，以避免网络拥塞和接收方过载的问题。                                                  | v5   |
| Keep Alive              | 保持连接            | 客户端在传输一个 MQTT 控制报文到发送下一个报文之间允许的最大空闲时间间隔。                                                              | -    |
| Message                 | 消息                | 通常指的是 PUBLISH 报文，即 MQTT 协议中的消息。                                                                                         | -    |
| Message Expiry Interval | 消息过期时间        | MQTT v5.0 允许客户端为消息设置过期时间，以确保在服务端中停留较长时间的消息不会被转发给订阅者。                                          | v5   |
| MQTT over QUIC          | MQTT 在 QUIC 上运行 | MQTT over ... 指的是 MQTT 运行在何种传输协议之上。MQTT 协议只要求底层传输提供有序、可靠的双向字节流，但并不强制要求使用特定的传输协议。 | -    |
| Packet                  | 报文                | 通常指 MQTT 协议中的控制报文，用于交换信息。例如 CONNECT 报文用于连接，PUBLISH 报文用于发布消息，SUBSCRIBE 报文用于订阅等。             | -    |
| Packet Identifier       | 报文标识符          | 报文标识符用于唯一标识 QoS 大于 0 的消息或订阅/取消订阅请求，通常由客户端和服务器内部管理。                                             | -    |
| Payload                 | 有效载荷            | MQTT 报文中的有效载荷部分，根据报文类型不同，有效载荷的内容会有所不同。对于 PUBLISH 报文来说，有效载荷即消息的实际内容。                | -    |
| PINGREQ & PINGRESP      | 心跳请求 & 心跳响应 | PINGREQ 报文由客户端发送，用于告知服务器客户端仍然活动。服务器必须及时响应 PINGREQ 报文，以保持连接。                                   | -    |
| Reason Code             | 原因码              | MQTT 使用 Reason Code 字段来指示操作结果。                                                                                              | -    |
| Reason String           | 原因字符串          | Reason String 字段用于在 Reason Code 的基础上进一步解释操作结果，提供更易读的信息                                                       | v5   |
| Retained Message        | 保留消息            | 保留消息在 MQTT 服务器中保留，除了被正常转发给订阅者外，还会在新订阅时发送给订阅者。每个主题只能有一条最新的保留消息。                  | -    |
| Security                | 安全性              | MQTT 支持多种安全机制，包括 TLS 加密传输、身份验证和访问控制，以确保通信的保密性和完整性，以及授权合法用户访问特定主题。                | -    |
| Session                 | 会话                | MQTT 的会话机制用于管理客户端和服务器之间的有状态交互，存储 QoS 1、2 消息的传输状态和订阅信息。                                         | -    |
| Subscription Identifier | 订阅标识符          | 客户端可以在订阅时指定订阅标识符，服务端在转发与这些订阅匹配的消息时需要附上与之关联的订阅标识符。                                      | -    |
| Subscription Options    | 订阅选项            | MQTT 允许客户端为每个订阅使用不同的订阅选项，例如是否接收保留消息、最大 QoS 等。                                                        | -    |
| Topic                   | 主题                | 主题用于标识和区分不同的消息，它是 MQTT 消息路由的基础。发布者指定消息的主题，订阅者选择订阅感兴趣的主题来接收相关的消息。              | -    |
| Topic Alias             | 主题别名            | MQTT v5.0 允许发送端将主题名映射成一个双字节整数表示的别名，从而减少带宽消耗，提高效率。                                                | v5   |
| Topic Filter            | 主题过滤器          | 主题过滤器在订阅时使用，可以包含单层通配符（+）和多层通配符（#）来同时订阅多个主题。                                                    | -    |
| Topic Name              | 主题名              | 主题名在发布消息时使用，不允许包含通配符。                                                                                              | -    |
| Username & Password     | 用户名和密码        | MQTT 允许客户端在连接报文中提供可选的用户名和密码，以实现对密码认证和令牌认证的支持。                                                   | -    |
| Will Delay Interval     | 遗嘱消息延迟时间    | 遗嘱消息延迟时间指示遗嘱消息可以在连接断开后延迟多久发送                                                                                | v5   |
| Will Message            | 遗嘱消息            | 如果客户端异常断开连接，那么客户端在连接时设置的遗嘱消息将由服务器转发给其他客户端。                                                    | -    |
| $ Topic                 | 以 $ 开头的主题     | 以 $ 开头的主题必须由服务器决定其使用方式和场景，客户端不能自行使用这类主题。                                                           | -    |
