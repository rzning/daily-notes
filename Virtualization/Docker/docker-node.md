---
name        : markdown-it
recorddate  : 2020-09-10
repository  : https://github.com/nodejs/docker-node
website     : https://hub.docker.com/_/node/
---

# docker-node

Official Docker Image for Node.js 🐳

## 什么是 Node.js ？

Node.js 是基于 Chrome 的 JavaScript 运行时构建的平台，可轻松构建快速、可扩展的网络应用。

Node.js 使用事件驱动的非阻塞 I/O 模型，使其轻巧且高效，
非常适合在分布式设备上运行的数据密集型实时应用程序。

> See: <https://nodejs.org>

## 如何使用此镜像

在你的 Node.js 应用项目中创建 `Dockerfile` 文件：

```dockerfile
# 使用指定版本的 node 作为基础镜像
FROM node:14

# 指定应用的默认端口
EXPOSE 8088
```

接下来运行命令来构建和运行 Docker 镜像：

```sh
$ docker build -t my-nodejs-app .

$ docker run -it -rm --name my-running-app my-nodejs-app
```

若你使用 Docker Compose 则编写配置文件：

```yml
version: "2"
services:
  node:
    image: "node:12"
    user: "node"
    working_dir: /home/node/app
    environment: 
      - NODE_ENV=production
    volumes:
      - ./:/home/node/app
    expose:
      - "8081"
    command: "yarn run start"
```

然后使用 Docker Compose 命令来启动服务：

```sh
$ docker-compose up -d
```
