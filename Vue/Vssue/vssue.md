# Vssue

- <https://github.com/meteorlxy/vssue>
- <https://vssue.js.org/zh/>

一个 Vue 驱动的、基于 Issue 的评论插件。

## 🚚 支持的代码托管平台

- GitHub
  - Github REST API V3
  - Github GraphQL API V4
- GitLab
  - Gitlab API V4 (Gitlab v11.0+)
- Bitbucket
  - Bitbucket API V2
- Gitee
  - Gitee API V5
- Gitea
  - Gitea API V1

## 🚀 开始使用

首先选择你要使用的代码托管平台，并前往对应官方平台创建 OAuth App

创建并配置好一个 OAuth App 后，将得到以下信息：

- `owner` - 存储库的拥有者账号
- `repo` - 对应存储库 ( Repository )
- `clientId` - 授权的客户端 ID
- `clientSecret` - 授权的客户端密钥

在浏览器中直接使用：

```html
<head>
  <!-- Vssue 的样式文件 -->
  <link rel="stylesheet" href="https://unpkg.com/vssue/dist/vssue.min.css">
</head>
<body>
  <div id="vssue-container"></div>

  <!-- 引入 Vue -->
  <script src="https://unpkg.com/vue/dist/vue.min.js"></script>
  <!-- Vssue Github 版  -->
  <script src="https://unpkg.com/vssue/dist/vssue.github.min.js"></script>
  <script>
    new Vue({
      el: '#vssue-container',
      template: `<vssue :title="title" :options="options"></vssue>`,
      data: {
        title: 'Vssue Dev',
        options: {
          owner: 'OWNER_OF_REPO',
          repo: 'NAME_OF_REPO',
          clientId: 'YOUR_CLIENT_ID',
          clientSecret: 'YOUR_CLIENT_SECRET'
        }
      }
    })
  </script>
</body>
```

也可在 Vue 组件中使用：

```vue
<template>
  <Vssue :title="title" :options="options" />
</template>

<script>
import { VssueComponent } from 'vssue'
import GithubV3 from '@vssue/api-github-v3'
import 'vssue/dist/vssue.css'

export default {
  name: 'VssueDemo',
  components: {
    Vssue: VssueComponent
  },
  data () {
    return {
      title: 'Vssue Demo',
      options: {
        api: GithubV3,
        owner: 'OWNER_OF_REPO',
        repo: 'NAME_OF_REPO',
        clientId: 'YOUR_CLIENT_ID',
        clientSecret: 'YOUR_CLIENT_SECRET'
      }
    }
  }
}
</script>
```
