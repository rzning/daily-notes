# Aedes

- <https://github.com/moscajs/aedes>

可以在任何流服务器上运行的准系统 MQTT 服务器

## 安装

```sh
mpm install aedes
```

## API

### Aedes 对象

```ts
import { EventEmitter } from 'node:events'
import { Duplex } from 'node:stream'
import { Socket } from 'node:net'

interface Client {}

/**
 * 最后一次心跳时间戳
 */
type LastHearthbeatTimestamp = Date

/**
 * 代理服务器标识索引
 */
interface Brokers {
  [brokerId: string]: LastHearthbeatTimestamp
}

interface AedesOptions {
  // ...
}

class Aedes extends EventEmitter {
  /**
   * 服务器唯一标识符
   */
  id: Readonly<string>

  /**
   * 服务器上连接的客户端数量
   */
  connectedClients: Readonly<number>

  /**
   * 服务器是否关闭
   */
  closed: Readonly<boolean>

  /**
   * 服务器列表
   */
  brokers: Readonly<Brokers>

  constructor(option?: AedesOptions)

  /**
   * 一个连接侦听器，将流传输到服务器。
   * @example
   * const aedes = require('./aedes')()
   * const server = require('net').createServer(aedes.handle)
   */
  handle: (stream: Duplex | Socket) => Client

  /**
   * 服务器直接向订阅的客户端发送数据包
   * @param packet - 数据包
   * @param callback - 发布完成后回调
   */
  publish(packet: PublishPacket, callback: (error?: Error) => void): void

  /**
   * 在服务器端直接订阅主题，绕过授权订阅。
   * @param topic - 主题名称
   * @param deliverfunc - 传递函数，将消息传递给订阅客户端的函数
   * @param callback - 服务器成功注册订阅时回调
   */
  subscribe(
    topic: string,
    deliverfunc: (packet: AedesPublishPacket, callback: () => void) => void,
    callback: () => void
  ): void

  /**
   * 取消订阅
   * @param topic - 订阅的主题
   * @param deliverfunc
   * @param callback
   */
  unsubscribe(
    topic: string,
    deliverfunc: (packet: AedesPublishPacket, callback: () => void) => void,
    callback: () => void
  ): void

  /**
   * 关闭服务器并断开所有客户端连接。
   * @param callback
   */
  close(callback?: () => void): void

  // ...
}
```

### Client 对象

```ts
import { EventEmitter } from 'node:events'
import { Duplex } from 'node:stream'
import { Socket } from 'node:net'
import { IncomingMessage } from 'node:http'
import {
  IPublishPacket,
  ISubscribePacket,
  IUnsubscribePacket
} from 'mqtt-packet'

type QoS = 0 | 1 | 2

/**
 * 订阅
 */
interface Subscription {
  topic: string
  qos: QoS
  nl?: boolean
  rap?: boolean
  rh?: number
  clientId?: Client['id']
}
type Subscriptions = { subscriptions: Subscription[] }

/**
 * 订阅包
 */
type SubscribePacket = ISubscribePacket & { cmd: 'subscribe' }

/**
 * 退订包
 */
type UnsubscribePacket = IUnsubscribePacket & { cmd: 'unsubscribe' }

/**
 * 发布包
 */
type PublishPacket = IPublishPacket & { cmd: 'publish' }

/**
 * Client
 */
export interface Client extends EventEmitter {
  /**
   * 客户端唯一标识符，由 CONNECT 包指定
   */
  id: Readonly<string>

  /**
   * 客户端 clean 标志，由 CONNECT 报文中的 clean 标志设置
   */
  clean: Readonly<boolean>

  /**
   * 客户端版本
   */
  version: Readonly<number>

  /**
   * 客户端连接流对象
   */
  conn: Duplex | Socket

  /**
   * 仅适用于 websocket-stream
   */
  req?: IncomingMessage

  /**
   * 当客户端处于 CONNECT 阶段时为 true
   */
  connecting: Readonly<boolean>

  /**
   * 当发出连接事件时为 true，当客户端关闭时为 false
   */
  connected: Readonly<boolean>

  /**
   * 客户端是否关闭
   */
  closed: Readonly<boolean>

  /**
   * 连接成功时触发
   */
  on(event: 'connected', listener: () => void): this

  /**
   * 发生错误时触发
   */
  on(event: 'error', listener: (error: Error) => void): this

  /**
   * 将给定的数据包发布到该客户机。
   * 完全支持 QoS 1 和 QoS 2，不支持 retained 标志
   * @param message - 发布包
   * @param callback
   */
  publish(message: PublishPacket, callback?: (error?: Error) => void): void

  /**
   * 向客户端订阅主题列表
   * @param subscriptions - 可以是格式为 { topic, qos } 的单个对象或数组，也可以是一个完整的 SUBSCRIBE 包
   * @param callback - 订阅完成时调用
   */
  subscribe(
    subscriptions:
      | Subscription
      | Subscription[]
      | Subscriptions
      | SubscribePacket,
    callback?: (error?: Error) => void
  ): void

  /**
   * 取消订阅客户端到主题列表
   * @param topicObjects - 可以是格式为 { topic, qos } 的单个对象或数组，也可以是一个完整的 UNSUBSCRIBE 包
   * @param callback - 取消订阅完成时调用
   */
  unsubscribe(
    topicObjects:
      | Subscription
      | Subscription[]
      | Subscriptions
      | UnsubscribePacket,
    callback?: (error?: Error) => void
  ): void

  /**
   * 断开客户端连接
   * @param callback - 客户端关闭时调用
   */
  close(callback?: () => void): void

  /**
   * 清空传出队列，从持久性中清除与该客户端相关的所有传出消息 (QoS > 1)
   * @param callback - 操作结束时调用
   */
  emptyOutgoingQueue(callback?: () => void): void
}
```

## 特征 Features

- 完全兼容 MQTT 3.1 和 3.1.1
- 标准 TCP 支持
- SSL / TLS
- WebSocket 支持
- 消息持久性
- 自动重新连接
- 离线缓冲
- Backpress-support API
- 高可用性
- 可集群
- 身份验证和授权
- `$SYS` 支持
- 可插拔中间件
- 动态主题支持
- Aedes 之间的 MQTT 桥接支持
- MQTT 5.0（尚不支持）
- 网桥协议（仅限传入连接）

## 示例 Examples

<!-- todo... -->
