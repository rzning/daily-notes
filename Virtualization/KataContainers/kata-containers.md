# Kata Containers

The speed of containers, the security of VMs

- <https://katacontainers.io/>
- <https://github.com/kata-containers/runtime>


### 参考

- [Kata Container 介绍 - 码迷](http://www.mamicode.com/info-detail-2696327.html)

  - docker 容器，性能高，不安全；VM虚拟机，安全性好，性能损耗大；
  - Kata Container 轻量级虚拟机的容器，即安全，性能也高。
  - Kata Containers 旨在将虚拟机（VM）的安全优势与容器的速度和可管理性统一起来。
  - Kata Container 是两个现有的开源项目合并：
    - Intel Clear Containers -- 项目的目标是通过英特尔®虚拟化技术（VT）解决容器内部的安全问题
    - Hyper runV -- 优先于技术无关支持许多不同的CPU架构和管理程序。

- [kata-container 初探 - 帅气小韩的专栏 - CSDN 博客](https://blog.csdn.net/hdu_hanwei/article/details/82389111)

  - kata containers 是由 OpenStack 基金会管理，但独立于 OpenStack 项目之外的容器项目。
  - kata containers 整合了 Intel 的 Clear Containers 和 Hyper.sh 的 runV
  - 符合 OCI ( Open Container Initiative ) 规范，同时还可以兼容 k8s 的 CRI ( Container Runtime Interface ) 接口规范。
  - 项目包含几个配套组件，如 Runtime, Agent, Proxy, Shim 等。
    - Runtime, proxy 和 shim 是运行在宿主机上的。
    - 每创建一个容器就会创建一个 proxy, agent 和 shim 而 runtime 只有一个。
  - Agent
    - Kata-agent 运行在 guest 中，管理容器和处理容器的运行。
    - Kata-agent 的执行单元是，定义了一系列命名空间的沙盒。
  - Runtime
    - Kata-runtime 是一个 OCI 兼容的容器运行时，负责处理 OCI 运行时规范指定的所有命令并启动 kata-shim 实例。
    - 配置文件是 `/usr/share/defaults/kata-containers/configuration.toml`
  - Proxy
    - 默认使用 virtio-serial 和 VM 通信，内核版本高于 4.8 可以使用 vsock 一种虚拟的套接字。
    - VM 可以运行多个容器进程。
    - Kata-proxy 给多个 kata-shim 和 kata-runtime 客户端提供对 kata-agent 提供访问。
  - Shim
    - 一个容器处理能够像 docker 的 containerd-shim 一样处理响应，前提是可以监控容器进程。
    - Runtime 运行在宿主机上，不能直接监控运行在虚拟机里的进程，最多只能看到 QEMU 进程。
    - kata-shim 扮演了监控容器进程的角色。
    - Kata-shim 需要处理容器的所有 I/O 流，包括 stdout, stdin 和 stderr 以及转发所有的要发送出去的信号。
  - Create 命令 -- 执行 `docker create` 时 kata-runtime 做了以下工作：
    1. 创建一个沙盒，沙盒的作用是创建网络命名空间，启动虚拟机和 shim 进程
    2. 调用 pre-start 钩子，负责在主机网络命名空间和刚才创建的网络命名空间之间，创建 veth pair
    3. 扫描网络空间的网络，在 veth 和 vm 的 tap 设备之间创建 MACVTAP 连接
    4. 通过创建好的 tap 设备，在网络命名空间启动 VM
    5. 等待 VM 运行
    6. 启动 kata-proxy 并连接到 VM。Kata-proxy 进程代理所有和 VM 的通信，每个 VM 一个代理
    7. 通过 Kata-proxy 和 kata-agent 通信，配置 VM 内部的沙盒
    8. 依赖于 OCI 配置文件 `config.json` 和 kata-agent 通信创建容器
    9. 启动 kata-shim 会连接到 kata-proxy 提供的 gRPC 服务。
  - Start 命令
    - 使用 runc 时 docker start 会在自己的命名空间里运行一个容器进程。
    - Kata-container 来说 kata-runtime 主要的任务是让 VM 里的 kata-agent 启动容器。
    - 通过 kata-proxy 和 kata-agent 通信，在 VM 里启动容器负载
    - 调用 post-start 钩子，1.0 版本是个空函数
  - Exec 命令
    - 请求通过 kata-proxy 发送到 kata-agent 在虚拟机的容器里，启动一个新的 kata-shim 进程。
    - 当你执行 docker exec 命令时，通过 ps 就可以发现多了一个 shim 进程。
    - 这个新的 kata-shim 在原来的 kata-shim 的网络命名空间和 PID 命名空间里被创建，用于 exec
  - Kill 命令
    - 执行 kill 命令 kata-runtime 会发送一个 UNIX 信号给容器进程，kill 发送终止信号，比如 SIGKILL 或者 SIGTERM 来终止容器进程。
    - 以前只是停止容器，对 kata-runtime 来说需要容器和虚拟机一块停止。
  - Delete 命令
    - 删除所有容器相关的资源，运行的容器不能被删除，强制删除需要带上 `—force` 选项

- [Katacontainers 与 Docker 和 Kubernetes 的集成 - 孔令贤的博客](https://lingxiankong.github.io/2018-07-20-katacontainer-docker-k8s.html)
