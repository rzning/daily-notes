Bosque Language Overview
========================

`Bosque` 语言源于 [TypeScript] 语法和类型的灵感，以及 [ML] 和 [Node/JavaScript] 语义的启发的组合。
本文档概述了 `Bosque` 语言中的语法，操作和语义，重点介绍了该语言中的独特或不寻常的特性。

[TypeScript]: <https://www.typescriptlang.org/>
[ML]: <https://www.smlnj.org/>
[Node/JavaScript]: <https://nodejs.org/en/>


# 目录

<details>
<summary>Bosque Language Overview</summary>

- [0 Highlight Features] 重要特点
    - [0.1 Immutable Values] 不可变值
    - [0.2 Block Scoping] 块级作用域
    - [0.3 Reference Parameter Threading] 线程参考参数
    - [0.4 Typed Strings] 类型字符串
    - [0.5 Flexible Invocations] 灵活调用
    - [0.6 Bulk Algebraic Data Operations] 批量代数数据操作
    - [0.7 None Processing] None 处理
    - [0.8 Iterative Processing] 迭代处理
    - [0.9 Recursion] 递归
    - [0.10 Determinacy] 确定性
    - [0.11 Equality and Representation] 相等和表示法
    - [0.12 Errors and Checks] 错误和检查
    - [0.13 Atomic Constructors and Factories] 原子构造器和工厂
    - [0.14 Synthesis Blocks] 合成块
    - [0.15 Code Style] 代码风格
- 1 Type System 类型系统
    - 1.1 Nominal Types 标称类型
    - 1.2 Structural Types 结构类型
    - 1.3 Function Types 函数类型
    - 1.4 Combination Types 组合类型
    - 1.5 Generics 泛型
- 2 Core Types 核心类型
- 3 Collections 集合
- 4 Type Checking 类型检查
- 5 Expressions 表达式
    - 5.1 Arguments 参数
    - 5.2 Constants 常量
    - 5.3 Variable and Scoped Access 变量和作用域访问
    - 5.4 Tuple and Record Constructors 元组和记录构造函数
    - 5.5 Entity Constructors 实体构造函数
    - 5.6 Lambda Constructors λ 构造函数
    - 5.7 Scoped Invokes 作用域调用
    - 5.8 Chaining and None-Chaining 链式和无链操作
    - 5.9 Tuple Typed Access Operators 元组类型访问操作符
    - 5.10 Record Typed Access Operators 记录类型访问操作符
    - 5.11 Nominal Typed Access Operators 标称类型访问操作符
    - 5.12 Typed Projection 类型投射
    - 5.13 Difference 差异
    - 5.14 Update 更新
    - 5.15 Merge 合并
    - 5.16 Lambda Apply λ 应用
    - 5.17 Invoke 调用
    - 5.18 Pipeline 管道
    - 5.19 Unary Operators 一元操作符
    - 5.20 Binary Operators 二元操作符
    - 5.21 Equality Comparison 等式比较
    - 5.22 Order Comparison 命令比较
    - 5.23 Logic Operators 逻辑操作符
    - 5.24 None Coalescing 非合并
    - 5.25 Select 选择
    - 5.26 Statement Expressions 声明表达式
    - 5.27 Thunk Blocks 形式转换块
    - 5.28 Synthesis Blocks 合成块
- 6 Statements 语句
    - 6.1 Empty 空
    - 6.2 Variable Declaration 变量声明
    - [6.3 Variable Assignment] 变量赋值
    - 6.4 Structured Declaration and Assignment 结构化声明和赋值
    - 6.5 Return and Yield 返回
    - 6.6 Validation 验证
    - 6.7 If-Then-Else 条件判断
    - 6.8 Match 匹配
    - 6.9 Block 块
- 7 Invokable Declarations 调用声明
- 8 Concept and Entity Declarations 概念和实体声明
- 9 Namespace Declarations 命名空间声明

</details>

[0 Highlight Features]: <#0-highlight-features>
[0.1 Immutable Values]: <#0.1-immutable-values>
[0.2 Block Scoping]: <#0.2-block-scoping>
[0.3 Reference Parameter Threading]: <#0.3-reference-parameter-threading>
[0.4 Typed Strings]: <#0.4-typed-strings>
[0.5 Flexible Invocations]: <#0.5-flexible-invocations>
[0.6 Bulk Algebraic Data Operations]: <#0.6-bulk-algebraic-data-operations>
[0.7 None Processing]: <#0.7-none-processing>
[0.8 Iterative Processing]: <#0.8-iterative-processing>
[0.9 Recursion]: <#0.9-recursion>
[0.10 Determinacy]: <#0.10-determinacy>
[0.11 Equality and Representation]: <#0.11-equality-and-representation>
[0.12 Errors and Checks]: <#0.12-errors-and-checks>
[0.13 Atomic Constructors and Factories]: <#0.13-atomic-constructors-and-factories>
[0.14 Synthesis Blocks]: <#0.14-synthesis-blocks>
[0.15 Code Style]: <#0.15-code-style>


# 0 Highlight Features

Bosque 编程语言旨在为人类和机器编写简单明了且易于推理的代码。

设计的重点在于识别和消除各种意外复杂性的来源，以及如何通过深思熟虑的语言设计来减轻这些复杂性。

## 0.1 Immutable Values

Bosque 语言中的所有值都是不可变的!

在没有副作用的情况下，对语句或代码块的效果进行推理和理解会大大简化。
函数式语言长期以来一直受益于该模型所允许的程序开发的简化、复杂的工具和积极的编译器优化。
从这个角度看，Bosque 语言的必然选择是采用只包含不可变数据的纯函数模型。

## 0.2 Block Scoping

带有块结构代码的局部变量，对于结构化代码是一个非常有吸引力的模型。

Bosque 语言将函数式编程与块级作用域和 `{...}` 花括号融合在一起，允许通过多个赋值来更新变量（[6.3 Variable Assignment] 变量赋值）。这支持在块作用域语言中进行函数式编程，并允许开发人员编写如下代码：

```bosque
function abs (x: Int): Int {
    var! sign = 1;
    if (x < 0) {
        sign = -1;
    }
    return x * sign;
}
```

## 0.3 Reference Parameter Threading

## 0.4 Typed Strings

## 0.5 Flexible Invocations

## 0.6 Bulk Algebraic Data Operations

## 0.7 None Processing

## 0.8 Iterative Processing

## 0.9 Recursion

## 0.10 Determinacy

## 0.11 Equality and Representation

## 0.12 Errors and Checks

## 0.13 Atomic Constructors and Factories

## 0.14 Synthesis Blocks

## 0.15 Code Style

### 0.15.1 Brackets Position

### 0.15.2 Naming Rules

### 0.15.3 Spacing Rules

### 0.15.4 Colon Rules

### 0.15.5 Method Arguments

### 0.15.6 If Statements



## 6.3 Variable Assignment
[6.3 Variable Assignment]: <#6.3-variable-assignment>

