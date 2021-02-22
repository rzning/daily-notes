# NPM 镜像源设置

## npm

npm 官方镜像源：

- <https://registry.npmjs.org/>

npm 查看全局包安装位置：

```sh
npm config get prefix
```

npm 查看当前镜像源：

```sh
npm config get registry
```

npm 临时修改镜像源：

```sh
npm install <包名> --registry=https://registry.npm.taobao.org 
```

npm 设置镜像源：

```sh
npm config set registry https://registry.npm.taobao.org
```

## yarn

yarn 官方镜像源：

- <https://registry.yarnpkg.com>

yarn 查看当前镜像源：

```sh
yarn config get registry
```

yarn 临时修改镜像源：

```sh
yarn add <包名> --registry https://registry.npm.taobao.org
```

yarn 修改镜像源：

```sh
yarn config set registry https://registry.npm.taobao.org
```

## 常用镜像源列表

镜像源 | 地址
-|-
npm | <https://registry.npmjs.org/>
yarn | <https://registry.yarnpkg.com>
cnpm | <http://r.cnpmjs.org/>
taobao | <https://registry.npm.taobao.org/>
nj | <https://registry.nodejitsu.com/>
skimdb |<https://skimdb.npmjs.com/registry>
rednpm | <http://registry.mirror.cqupt.edu.cn>

> 淘宝 NPM 镜像
> - <https://developer.aliyun.com/mirror/NPM>


## 镜像源管理工具

- nrm
  - NPM registry manager
  - <https://github.com/Pana/nrm>

- yrm
  - YARN registry manager
  - <https://github.com/i5ting/yrm>

```sh
# 安装
npm install -g nrm

# 列出可用镜像源信息
nrm ls

# 使用指定镜像源
nrm use cnpm
```
