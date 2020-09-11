# VSCode Remote Development using SSH

- <https://code.visualstudio.com/docs/remote/ssh>

Visual Studio Code Remote - SSH 扩展允许你打开任何运行有 SSH 服务的远程计算机、虚拟机或容器上的文件夹，
并充分利用 VSCode 的特性集。一旦连接到服务器，你就可以与远程文件系统中任何位置的文件和文件夹进行交互。

不需要在本地存放源代码就可以获得这些功能，因为扩展可以直接在远程机器上运行命令和其他扩展。

![architecture-ssh](https://code.visualstudio.com/assets/docs/remote/ssh/architecture-ssh.png)

## 🚀 入门指南

### 系统要求

- 本地：必须安装支持 OpenSSH 兼容的 SSH 客户端
- 远程 SSH 主机：必须运行 SSH Server

### 安装

- 安装一个 OpenSSH 兼容的 SSH 客户端（如果还没有）
- 安装 VSCode 和远程开发扩展包

### SSH 主机设置

- 设置一台 SSH 主机
- 【可选】如果你的 Linux 或 MacOS SSH 主机被多个用户同时访问，可以考虑在 VSCode 用户设置中启用
  Remote.SSH: Remote Server Listen On Socket 以提高安全性
- 【可选】虽然支持基于密码的身份认证，但建议为主机设置基于密钥的身份验证。

### 链接到远程主机

要首次链接到远程主机，请按下面步骤操作：

- 在终端运行一下命令，来验证你可以连接到 SSH 主机：

  ```sh
  ssh user@hostname
  # or
  ssh user@domain@hostname
  ```

- 在 VSCode 中，从命令面板 ( `F1` ) 选择 `Remote-SSH: Connect to Host...`
  并输入与上一步相同的 `user@hostname`

- 若 VSCode 不能自动检测到连接的服务器类型，你需要手动选择。
  - Linux
  - Windows
  - macOS

  > 选择的平台将保存在 VSCode 设置的 `remote.SSH.remotePlatform` 属性中，以便你在任何时候更改它。

- 稍后 VSCode 将连接到 SSH 服务器并进行设置。

- 你可以在状态栏查看链接到的主机的状态。

### 断开与远程主机的连接


### 记住主机和高级设置


## 管理扩展

