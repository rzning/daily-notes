# Eclipse IoT

![iot-logo](https://iot.eclipse.org/assets/images/iot_logo.svg)

> Open Source for IoT

Eclipse IoT 技术为全球领先的商业物联网解决方案提供支持。

## 项目 Projects

Eclipse IoT 开源项目可帮助您构建 IoT 设备、网关（“智能对象”）、云后端等。

### 📜 Eclipse Hono™

![hono-logo](https://projects.eclipse.org/sites/default/files/HONO-Logo_Bild-Wort_quadrat-w-200x180px.png)

- <https://eclipse.dev/hono/>

Eclipse Hono™ 提供远程服务接口，用于连接大量物联网 设备到后端，并以统一的方式与它们交互，而不考虑设备 通信协议。

### 📜 Eclipse Mosquitto™

![mosquitto-logo](https://projects.eclipse.org/sites/default/files/mosquitto-200px.png)

- <https://eclipse.org/mosquitto>
- <https://mosquitto.org/>

Eclipse mosquito 提供了 MQTT 协议的轻量级服务器实现，适用于从全功率机器到嵌入式和低功率机器的所有情况。

传感器和执行器通常是 MQTT 消息的来源和目的地，它们可能非常小，而且功率不足。

除了接受来自 MQTT 客户机应用程序的连接外，Mosquito 还有一个桥接，允许它连接到其他 MQTT 服务器，包括其他 mosquito 实例。

### 📜 Eclipse Paho

![paho-logo](https://projects.eclipse.org/sites/default/files/paho-logo-200.png)

> MQTT, M2M, PAHO, MESSAGING

- <https://eclipse.dev/paho/>

Eclipse Paho 项目为面向机器对机器 ( M2M ) 的针对新的、现有的和新兴的应用程序的开放的和标准的消息传递协议提供可靠的开源实现。

## 沙盒 Sandboxes

### 1️⃣ MQTT

<https://mqtt.eclipseprojects.io/>

一个公共测试 MQTT 代理服务器，目前监听以下端口：

| 端口 | 说明                         | 备注               |
| ---- | ---------------------------- | ------------------ |
| 1883 | MQTT 通过未加密的 TCP        |
| 8883 | MQTT 通过加密的 TCP          |
| 80   | MQTT 通过未加密的 WebSockets | URL 必须为 `/mqtt` |
| 443  | MQTT 通过加密的 WebSockets   | URL 必须为 `/mqtt` |

你可以将此 MQTT 服务器与来自 [Paho] 项目的客户机代码，来自 Paho 的 Eclipse MQTT 视图，或来自 MQTT.org 下载页面上列出的其他客户机 APIs 一起使用。

加密端口支持带有 x509 证书的 TLS v1.2、v1.1 或 v1.0 版本，并且需要客户端支持才能连接。

该服务器正在运行开源的 [Mosquitto broker](http://mosquitto.org/) 最新版本。

[Paho]: https://eclipse.org/paho/

### 2️⃣ CoAP

CoAP 测试服务器：

```
coap://californium.eclipseprojects.io:5683/
```

DTLS-enabled 版本：

```
coaps://californium.eclipseprojects.io:5684
```

此服务正在运行 [Eclipse Californium](https://eclipse.dev/californium/)

### 3️⃣ Lightweight M2M (LWM2M)

为了测试 LWM2M 通信场景，我们托管了一个 LWM2M 服务器。

你可以在 [Wakaama](https://eclipse.dev/wakaama/) 项目中使用该服务器。

LWM2M 服务器可以在下例地址中获得：

- `coap://leshan.eclipseprojects.io:5683`
- `coaps://leshan.eclipseprojects.io:5684`

一个 Web 界面允许与注册的 LWM2M 客户端进行交互：

- <http://leshan.eclipseprojects.io/>

该服务器正在运行开源的 [Eclipse Leshan](https://eclipse.dev/leshan/) 服务器。
