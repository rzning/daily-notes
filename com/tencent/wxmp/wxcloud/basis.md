微信小程序 > 开发 > 云开发 > 基础

# 基础

1. [介绍](#intro)
2. [起步](#quickstart)
3. [云开发能力](#capabilities)
4. [环境](#environment)
5. [配额](#quota)

<hr id="intro"/>

## 1. 介绍

> [dev/wxcloud/basis/getting-started](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)

云开发为开发者提供完整原生云端支持和微信服务支持。

| 能力   | 说明                                                        |
| ------ | ----------------------------------------------------------- |
| 云函数 | 在服务器端运行的代码                                        |
| 数据库 | 一个可在前端操作，也能使用云函数读写的 JSON 数据库          |
| 存储   | 可在前端直接上传/下载云端文件，也可在云开发控制台可视化管理 |
| 云调用 | 基于云函数免鉴权使用开放接口能力                            |

<hr id="quickstart"/>

## 2. 起步

> [dev/wxcloud/basis/quickstart](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/quickstart.html)

- 2.1 新建云开发模板
  - 新建项目，勾选 `云开发 QuickStart 项目`
  - 无游客模式，不可使用 [测试号](../devtools/assist.md#sandbox)
  - `project.config.json` 配置文件中增加 `cloudfunctionRoot` 字段，用于指定云函数的存放目录
  - 云函数目录有特殊图标
  - 从基础库 2.2.3 开始支持
  - 从基础库 2.4.1 开始小程序插件支持，并且使用插件方而非宿主的云资源
- 2.2 开通云开发
  - 点击开发者工具中工具栏左侧 `云开发` 打开云控制台
  - 根据提示开通云开发，创建云环境
  - 默认配额下可创建两个环境
  - 各个环境相互隔离，每个环境都有独立的资源
  - 每个环境都有唯一环境 ID 标识
  - 初始创建的环境自动成为默认环境
- 2.3 体验小程序
  - 开通并创建好云环境后，即可在模拟器上操作部分云能力
- 2.4 查看控制台
  - 云开发控制台用于管理云开发资源
  - 可进行运营分析
  - 管理数据库
  - 管理存储空间
  - 查看云函数列表及操作日志

<hr id="capabilities"/>

## 3. 基础能力

> [dev/wxcloud/basis/capabilities](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/capabilities.html)

### 3.1 数据库

云开发提供一个 JSON 数据库

一个数据库可以有多个集合，集合中有多条记录（JSON 对象）。

| 关系型            | 文档型                |
| ----------------- | --------------------- |
| 数据库 `database` | 数据库 `database`     |
| 表 `table`        | 集合 `collection`     |
| 行 `row`          | 记录 `record` / `doc` |
| 列 `column`       | 字段 `field`          |

数据库 API 分小程序端和服务器端两部分。

- 小程序端 API 拥有严格调用权限控制
- 服务器端 API 可用于操作敏感数据

使用 API 操作数据库只需三步：

1. 获取数据库引用
2. 构造查询或更新条件
3. 发出请求

```js
// 1.
const db = wx.cloud.database()

// 2.
db.collection('books')
  .where({
    publishInfo: {
      year: 2006
    }
  })
  .get({
    // 3.
    success(res) {
      console.log(res)
    }
  })
```

- 参考 @ [数据库指引](./guide.md#database)

### 3.2 存储

### 3.3 云函数

### 3.4 云调用

### 3.5 HTTP API

<hr id="environment"/>

## 4. 资源环境

> [dev/wxcloud/basis/concepts/environment](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/concepts/environment.html)

<hr id="quota"/>

## 5. 配额说明

> [dev/wxcloud/billing/quota](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/billing/quota.html)
