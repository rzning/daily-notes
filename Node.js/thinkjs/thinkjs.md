# ThinkJS

- <https://github.com/thinkjs/thinkjs>
- <https://thinkjs.org/>

基于 Koa 2.x 使用完整的 ES2015+ 功能来开发 Node.js 应用程序，支持 TypeScript

## 🚀 快速入门

```sh
# 安装
npm install -g think-cli

# 创建应用
thinkjs new demo

# 切换到项目目录
cd demo

# 安装依赖
npm install

# 启动服务
npm start
```

## 📂 项目结构

- `src/`
  - `bootstrap/` - 启动自动执行目录
    - `master.js`
    - `worker.js`
  - `config/` - 配置文件目录
    - `adapter.js`
      - cache
      - model
      - session
      - view
      - logger
    - `config.js`
      - workers
    - `config.production.js`
    - `extend.js`
      - view
      - model
      - cache
      - session
    - `middleware.js`
      - meta
      - resource
      - trace
      - payload
      - router
      - logic
      - controller
    - `router.js`
  - `controller/` - 控制器目录
  - `logic/` - 逻辑目录
  - `model/` - 模型目录
- `view/` - 模板目录
- `development.js` - 开发环境入口文件
- `production.js` - 生产环境入口文件


## 🚛 运行流程

Node.js 提供 [http] 模块，可以直接创建 HTTP 服务，以响应用户的请求。

> [Usage & Example | Node.js Documentation](https://nodejs.org/api/synopsis.html)

ThinkJS 也是调用 [http.createServer] 的方式来创建服务的，
整个运行流程可分为启动服务和响应用户请求两个部分。

```js
const Application = require('thinkjs')

const instance = new Application()

instance.run()
```

[http]: <https://nodejs.org/api/http.html>
[http.createServer]: <https://nodejs.org/api/http.html#http_http_createserver_options_requestlistener>

- 系统服务启动流程
  - 执行 `npm start` 或 `node development.js`
  - 实例化 ThinkJS 的 [Application] 类，并执行 `run()` 方法
  - 根据不同环境（Master 进程、Worker 进程、命令行调用）处理不同逻辑
  - 若为 Master 进程
    - 加载配置文件，生成 `think.config` 和 `think.logger` 对象
    - 加载 `src/bootstrap/master.js` 文件
    - 若配置了监听服务，则开始监听 `src/` 目录中文件的变化
    - 若配置了编译服务，则在文件修改后，会将文件编译到 `app/` 目录
    - 根据 `workers` 配置项，来 fork 对应数目的 Worker
      - Worker 进程启动后，将触发 `appReady` 事件
      - 可以通过 `think.app.on('appReady')` 来捕获
    - 若文件发生新的修改，会触发编译，然后杀死所有 Worker 并重新 fork
  - 若为 Worker 进程
    - ...

- 用户请求处理流程
  - ...


[Application]: <https://github.com/thinkjs/thinkjs/blob/3.0/lib/application.js>

