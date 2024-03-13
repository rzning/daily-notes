微信小程序 > 开发 > 指南 > 配置文件

# 配置文件

> [dev/framework/config](https://developers.weixin.qq.com/miniprogram/dev/framework/config.html)

<hr id="app"/>

## 全局配置 `app.json`

> 参考 @ [小程序全局配置](../reference/app.md)

```jsonc
{
  /* 页面路径列表 */
  "pages": ["pages/index/index", "pages/logs/index"],
  /* 全局默认窗口表现 */
  "window": {
    /* 导航栏背景色 */
    "navigationBarTitleText": "Demo"
  },
  /* 底部标签栏表现 */
  "tabBar": {
    /* 标签列表 */
    "list": [
      {
        /* 页面路径 */
        "pagePath": "pages/index/index",
        /* 标签按钮文字 */
        "text": "首页"
      },
      {
        "pagePath": "pages/logs/logs",
        "text": "日志"
      }
    ]
  },
  /* 网络超时时间 */
  "networkTimeout": {
    /* `wx.requset()` 超时时间 */
    "request": 10000,
    /* `wx.downloadFile()` 的超时时间 */
    "downloadFile": 10000
  },
  /* 使能 debug 模式 */
  "debug": true,
  /* 需跳转的小程序列表 */
  "navigateToMiniProgramAppIdList": ["wxe5f52902cf4de896"]
}
```

<hr id="page"/>

## 页面配置

> 参考 @ [小程序页面配置](../reference/page.md)

```jsonc
{
  /* 导航栏背景色 */
  "navigationBarBackgroundColor": "#ffffff",
  /* 导航栏标题颜色，仅支持 `black` / `white` */
  "navigationBarTextStyle": "black",
  /* 导航栏标题文字内容 */
  "navigationBarTitleText": "微信接口功能演示",
  /* 窗口背景色 */
  "backgroundColor": "#eeeeee",
  /* 下拉 loading 的样式，仅支持 `dark` / `light` */
  "backgroundTextStyle": "light"
}
```
