DCloud > uni-app > 介绍 > 快速上手

# 快速上手

> <https://uniapp.dcloud.io/quickstart>

- 使用 HBuilderX
- 使用 vue-cli
- 两者区别

---

## 通过 HBuilderX 可视化界面构建

## 通过 vue-cli 命令行构建

### 1. 安装 vue-cli

> 安装参考 @ [vue-cli](https://cli.vuejs.org/zh/guide/installation.html)

```sh
npm install -g @vue/cli
# OR
yarn global add @vue/cli
```

### 2. 创建 uni-app

```sh
vue create -p dcloudio/uni-preset-vue my-project
```

- 根据提示选择项目模板。
- 初次体验可选择 `hello uni-app` 项目模板。
- 选择自定义模板时，需要填写 uni-app 模板托管在云端的仓库地址。

### 3. 运行和发布

```sh
# H5
yarn run dev:h5
yarn run build:h5

# 微信小程序
yarn run dev:mp-weixin
yarn run build:mp-weixin
```

- `dev` 模式编译输出目录为 `/dist/dev/`
- `build` 模式编译输出目录为 `/dist/build/`
- `dev:h5` 模式无输出目录，存在于缓存中。
- `dev` 模式有 SourceMap 可以方便进行断点调试。
- `build` 模式将对代码进行压缩。
