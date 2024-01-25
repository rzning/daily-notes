# NPM

- <https://www.npmjs.com/>

## npm CLI Commands

```sh
# 查看命令帮助信息
npm install --help

# 安装指定包，别名 add, i, in, ins
npm install <pkg>

# 更新指定包，别名 up, upgrade
npm update <pkg>

# 卸载指定包，别名 unlink, remove, rm, r, un
npm uninstall <pkg>

# 查看包安装路径
npm root [--global]

# 查看包所在路径
npm prefix [--global]

# 查看 npm 用户名
npm whoami

# 管理 npm 配置文件，别名 c
npm config set <key> = <value>
npm config get <key>
npm config delete <key>
npm config list [--json]
npm config edit [--global]
npm config fix

# 初始化 package.json 文件，加 -y 跳过问答式界面，别名 create
npm init

# 管理你的 package.json 文件
npm pkg set <key> = <value>
npm pkg get <key>
npm pkg delete <key>
npm pkg fix

# 查看当前目录已安装的依赖包，别名 list
npm ls
npm ls <pkgname>

# 查找过时的依赖包
npm outdated

# 删除重复的包，别名 ddp
npm dedupe

# 查找所有依赖项中存在的漏洞
npm audit [fix]

# 打开指定包仓库页面
npm repo <pkgname>

# 打开指定包文档页面，别名 home
npm docs <pkgname>

# 查看指定包存在的问题，别名 issues
npm bugs <pkgname>

# 查看指定包注册信息，别名 info, show, v
npm view <pkgname>

# 搜索指定包，别名 find, s, se
npm search <pkgname>

# 在指定包目录中打开 subshell
npm explore <pkgname>
```
