---
title: '工程文件 - Touch WX 入门'
author: Rzning
date: 2018-06-19 16:56:00 +0800
modified: 2018-08-05 17:09:00 +0800
---

# Touch WX

### 工程文件

- <http://www.wetouch.net/touchwx_doc/quickstart/project>
  - 工程目录结构 - [project/catalog]
  - 主框架页面 - [project/index]
  - 内容页面 - [project/code]

---

## 工程目录结构

- [project/catalog]

```
dist/
images/
node_modules/
pages/
static/
app.wxa
min.config.json
package.json
```

说明：

- `dist/` - 存放编译输出文件，可直接使用微信开发者工具打开
- `pages/` - 页面目录
- `static/` - 常用库和静态资源
- `app.wxa` - 主框架文件

每个页面都是由 `.wx` 文件构成。
可以放在根目录也可以放在子目录。
一般可以将第一个界面的 `.wx` 文件放在根目录，其他文件放在子目录。

## 主框架页面

- [project/index]

在 Touch WX 中使用 `app.wxa` 文件替代小程序工程中的 `app.json`, `app.js`, `app.wxss` 三个文件。

app.wxa

```vue
<template>
  <view>
    <page></page>
  </view>
</template>

<script>
import system from './static/utils/system'
export default {
  config: {
    usingComponents: {},
    pages: ['pages/home/index'],
    window: {
      backgroundTextStyle: 'dark',
      backgroundColor: '#efefef',
      navigationBarBackgroundColor: '#ffffff',
      navigationBarTitleText: 'TouchUI',
      navigationBarTextStyle: 'black'
    },
    networkTimeout: {
      request: 10000
    },
    theme: {
      'theme-color': '#39f'
    }
  },
  globalData: {},
  onLaunch() {
    system.attachInfo()
  },
  onShow() {},
  onHide() {}
}
</script>

<style lang="less">
@import './static/styles/index.less';
</style>
```

## 内容页面

- [project/code]

page.wx

```vue
<template>
  <!-- page.wxml -->
  <view> 页面内容 </view>
</template>

<script>
// page.js
export default {
  // page.json
  config: {
    navigationBarTitleText: '页面标题',
    navigationBarTextStyle: 'black'
  },
  data: {},
  onLoad: function () {}
}
</script>

<style lang="less">
// page.wxss
.content {
  .mix-flex-center();
}
</style>
```

[project/catalog]: http://www.wetouch.net/touchwx_doc/quickstart/project/catalog
[project/index]: http://www.wetouch.net/touchwx_doc/quickstart/project/index
[project/code]: http://www.wetouch.net/touchwx_doc/quickstart/project/code
