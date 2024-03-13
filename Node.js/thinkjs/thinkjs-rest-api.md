# ThinkJS RESTful API

- <https://thinkjs.org/zh-cn/doc/2.2/rest_api.html>
- <https://thinkjs.org/zh-cn/doc/3.0/rest.html>

项目中，经常要提供一个 API 供第三方使用

一个通用的 API 设计规范就是使用 RESTful API

RESTful API 是使用 HTTP 中的请求类型来标识对资源的操作。

| 格式                 | 说明                  |
| -------------------- | --------------------- |
| `GET /ticket`        | 获取 ticket 列表      |
| `GET /ticket/:id`    | 查看某个具体的 ticket |
| `POST /ticket`       | 新建一个 ticket       |
| `PUT /ticket/:id`    | 更新指定 id 的 ticket |
| `DELETE /ticket/:id` | 删除指定 id 的 ticekt |

## 创建 RESTful Controller

可以通过 `--rest` 或 `-r` 参数来创建一个 RESTful API

如创建一个 user 控制器：

```sh
thinkjs controller user -r
```

执行命令后将生成以下文件：

- `src/`
  - `controller/`
    - `rest.js` - RESTful Controller 的基类
    - `user.js` - 继承自 `rest.js` 类，用来处理资源 user 的请求
  - `logic/`
    - `user.js`

## 添加自定义路由

修改 `src/config/router.js` 添加如下配置：

```js
module.exports = [['/user/:id?', 'rest']]
```

通过自定义路由，将 `/user/:id` 相关的请求指定为 REST Controller

然后就可以通过以下方式对其访问了：

| 请求               | 说明         | 执行           |
| ------------------ | ------------ | -------------- |
| `GET /user`        | 获取用户列表 | `getAction`    |
| `GET /user/:id`    | 获取某个用户 | `getAction`    |
| `POST /user`       | 添加一个用户 | `postAction`   |
| `PUT /user/:id`    | 更新某个用户 | `putAction`    |
| `DELETE /user/:id` | 删除某个用户 | `deleteAction` |
