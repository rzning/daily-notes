# LLVM

- <http://llvm.org/>
- <https://github.com/llvm/llvm-project>

LLVM 项目是模块化和可重用的编译器及工具链技术的集合。

### 参考

- [The Architecture of Open Source Applications: LLVM](http://www.aosabook.org/en/llvm.html)
  - ![](http://www.aosabook.org/images/llvm/SimpleCompiler.png)
  - ![](http://www.aosabook.org/images/llvm/RetargetableCompiler.png)
- [LLVM - 百度百科](https://baike.baidu.com/item/LLVM)
  - LLVM 是构架编译器 (compiler) 的框架系统，以 C++ 编写而成，用于优化以任意程序语言编写的程序的编译时间 (compile-time) 、链接时间 (link-time) 、运行时间 (run-time) 以及空闲时间 (idle-time) 。
  - LLVM 命名最早源自于底层虚拟机（Low Level Virtual Machine）的缩写，由于命名带来的混乱，目前 LLVM 就是该项目的全称。
- [LLVM - 编译器架构 - OSCHINA](https://www.oschina.net/p/llvm)
  - ![](https://static.oschina.net/uploads/space/2019/0706/121704_AnOp_12.png)
- [深入浅出让你理解什么是 LLVM - 简书](https://www.jianshu.com/p/1367dad95445)
  - 传统的编译器架构
    - 前端 Frontend : 词法分析、语法分析、语义分析、生成中间代码
    - 优化器 Optimizer : 中间代码优化
    - 后端 Backend : 生成机器码
  - LLVM架构
    - 不同的前端后端使用统一的中间代码 LLVM Intermediate Representation (LLVM IR)
    - 如果需要支持一种新的编程语言，那么只需要实现一个新的前端
    - 如果需要支持一种新的硬件设备，那么只需要实现一个新的后端
  - [Clang](http://clang.llvm.org/)
    - Clang 是 LLVM 项目的一个子项目，基于 LLVM 架构的 C/C++/Objective-C 编译器前端。
    - ![](https://upload-images.jianshu.io/upload_images/3008243-a7c02c2c24265d98.png)
    - 一般狭义的 LLVM 指的是 LLVM 后端（包含代码优化和目标代码生成）。
- [llvm 入门篇 - 码农网](https://www.codercto.com/a/41721.html)
- [LLVM 编译原理和使用 - 六神的博客 - CSDN](https://blog.csdn.net/yayaayaya123/article/details/83993041)
  - 传统编译器分三个阶段：
    - 前端（Frontend）-- 优化器（Optimizer）-- 后端（Backend）
    - 前端负责分析源代码，可以检查语法级错误，并构建针对语言的抽象语法树（AST）；抽象语法树可以进一步转换为优化，最终转为新的表示方式，然后再交给让优化器和后端处理；最终由后端生成可执行的机器码。
  - LLVM编译工具链编译流程：
    - 预处理 -> 词法分析 -> Token -> 语法分析 -> AST -> 代码生成 -> LLVM IR -> 优化 -> 生成汇编代码 -> Link -> 目标文件
- [LLVM教程( 三）-- LLVM IR - Night_ZW的博客 - CSDN](https://blog.csdn.net/Night_ZW/article/details/55100646)
