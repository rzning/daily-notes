# Using GCC with MinGW

- <https://code.visualstudio.com/docs/cpp/config-mingw>

在本教程中，你将配置 VSCode 使用 [mingw-w64] 中的 GCC C++ 编译器 ( g++ ) 和 GDB 调试器，
来创建在 Windows 上运行的程序。

[mingw-w64]: http://www.mingw-w64.org

本教程不介绍 GCC, GDB, Mingw-w64 或 C++ 语言。

Mingw-w64 源码托管在 SourceForge 网站：

- 下载： [Mingw-builds](http://www.mingw-w64.org/doku.php/download/mingw-builds)
- 仓库： [MinGW-w64 | SourceForge.net](https://sourceforge.net/projects/mingw-w64/)

## 先决条件 Prerequisites

1. 安装 VSCode
2. 安装 VSCode C/C++ 扩展
3. 通过 SourceForge 网站安装 Mingw-w64
4. 将 Mingw-w64 bin 文件夹的路径添加到 Windows path 环境变量中

MinGW-W64 安装选项：

- Version:
  - 8.1.0
  - 7.3.0
- Architecture:
  - x86_64
  - i686
- Threads:
  - posix
  - win32
- Exception:
  - seh
  - dwarf
  - sjlj ( SetJump LongJump )
- Build revision:
  - 0

> 默认的安装路径类似于： `C:\Program Files\mingw-w64\x86_64-8.1.0-posix-seh-rt_v6-rev0\mingw64\bin`

验证你的 MinGW 安装：

```sh
g++ --version
gdb --version
```
