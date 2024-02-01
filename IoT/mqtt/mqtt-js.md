# mqtt.js

- <https://www.npmjs.com/package/mqtt>
- <https://github.com/mqttjs/MQTT.js>

MQTT.js 是 MQTT 协议的客户端库，使用 JavaScript 为 node.js 和 browser 编写。

```sh
npm install mqtt --save
```

## Import Styles

CommonJS ( Require )

```js
const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://...')
```

ES6 Modules ( Import )

```js
// 默认导入
import mqtt from 'mqtt'
const client = mqtt.connect('mqtt://...')

// 导入单个组件
import { connect } from 'mqtt'
const client = connect('mqtt://...')
```

## Example

```js
import mqtt from 'mqtt'
const client = mqtt.connect('mqtt://test.mosquitto.org')

// 连接
client.on('connect', () => {
  // 订阅
  client.subscribe('presence', (err) => {
    if (!err) {
      // 发布
      client.publish('presence', 'Hello MQTT')
    }
  })
})

// 接收订阅消息
client.on('message', (topic, message) => {
  console.log(message.toString())
  client.end()
})

// 输出 : Hello MQTT
```

如果希望运行自己的 MQTT Broker （代理服务器），可以使用 [Mosquitto](https://mosquitto.org/) 或 [Aedes-cli](https://github.com/moscajs/aedes-cli) 并启动它。

你也可以使用一个测试服务器：

- <https://test.mosquitto.org/>
- <https://mqtt.eclipseprojects.io/>
- <https://broker.emqx.io>

## Command Line Tools

全局安装：

```sh
npm install mqtt -g
```

然后，在一命令行输入：

```sh
mqtt sub -t 'hello' -h 'test.mosquitto.org' -v
```

在另一个输入：

```sh
mqtt pub -t 'hello' -h 'test.mosquitto.org' -m 'from MQTT.js'
```

有关命令帮助可输入：

```sh
mqtt help <command>


$ mqtt help
MQTT.js command line interface, available commands are:

  * publish     publish a message to the broker        # 向代理发布消息
  * subscribe   subscribe for updates from the broker  # 订阅来自代理的更新
  * version     the current MQTT.js version            # 当前 MQTT.js 版本
  * help        help about commands                    # 命令帮助

Launch 'mqtt help [command]' to know more about the commands.
Done.
```

订阅 subscribe 命令帮助信息：

```sh
$ mqtt help sub
Usage: mqtt subscribe [opts] [topic]  # 订阅指定主题

Available options:

  -h/--hostname HOST    the broker host
  -p/--port PORT        the broker port
  -i/--clientId ID      the client id
  -q/--qos 0/1/2        the QoS of the message
  --no-clean            do not discard any pending message for
                        the given id
  -t/--topic TOPIC      the message topic
  -k/--keepalive SEC    send a ping every SEC seconds
  -u/--username USER    the username
  -P/--password PASS    the password
  -l/--protocol PROTO   the protocol to use, 'mqtt',
                        'mqtts', 'ws' or 'wss'
  --key PATH            path to the key file
  --cert PATH           path to the cert file
  --ca PATH             path to the ca certificate
  --insecure            do not verify the server certificate
  --will-topic TOPIC    the will topic
  --will-message BODY   the will message
  --will-qos 0/1/2      the will qos
  --will-retain         send a will retained message
  -v/--verbose          print the topic before the message
  -H/--help             show this
Done.
```

发布 publish 命令帮助信息：

```sh
$ mqtt help pub
Usage: mqtt publish [opts] topic [message]  # 向指定主题发布消息

Available options:

  -h/--hostname HOST    the broker host
  -p/--port PORT        the broker port
  -i/--client-id ID     the client id
  -q/--qos 0/1/2        the QoS of the message
  -t/--topic TOPIC      the message topic
  -m/--message MSG      the message body
  -r/--retain           send a retained message
  -s/--stdin            read the message body from stdin
  -M/--multiline        read lines from stdin as multiple messages
  -u/--username USER    the username
  -P/--password PASS    the password
  -C/--protocol PROTO   the protocol to use, 'mqtt',
                        'mqtts', 'ws' or 'wss'
  --key PATH            path to the key file
  --cert PATH           path to the cert file
  --ca PATH             path to the ca certificate
  --insecure            do not verify the server certificate
  --will-topic TOPIC    the will topic
  --will-payload BODY   the will message
  --will-qos 0/1/2      the will qos
  --will-retain         send a will retained message
  -H/--help             show this
Done.
```
