# Tornado Web Server

- <https://github.com/tornadoweb/tornado>

Tornado 是一个 Python Web 框架和异步网络库。

通过使用非阻塞网络 I/O ， Tornado 可以扩展到数以万计的开放连接，使其成为长轮询 ( Long Polling ) 、WebSockets 和其他需要长时间连接到每个用户的应用程序的理想选择。

```sh
pip install tornado
```

一个简单的 Tornado 网络应用 Hello world 示例：

```python
import asyncio
import tornado

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.write("Hello, world")

def make_app():
    return tornado.web.Application([
        (r"/", MainHandler),
    ])

async def main():
    app = make_app()
    app.listen(8888)
    await asyncio.Event().wait()

if __name__ == "__main__":
    asyncio.run(main())
```

## 中文文档

- [Python Tornado 教程\_w3cschool](https://www.w3cschool.cn/pytornado/)
- [FriBox China - Tornado 文档（中文版）](http://fribox.cn/?p=581)
