# 本地编辑

> GitHub 上的项目，实现本地编辑并同步提交到服务器之前，需要进行 SSH 或 GPG 秘钥认证。

1. 克隆仓库到本地

```sh
$git clone https://github.com/rzning/daily-notes.git

$cd daily-notes

$code .
```

2. 编辑文件，并提交

```sh
$git add --all

$git commit -m "新建 `local-editor.md` 文件"
```

3. 推送至远程仓库

```sh
$git push -u origin master
```

> 此命令的作用是将当前分支（如 `master` 分支）的内容推送到远程
> `origin` 仓库的 `master` 分支。
>
> 参数 `-u` 的作用是，在推送的同时，将 `origin` 仓库的
> `master` 分支设置为当前分支的上游 `upstream` 分支。
