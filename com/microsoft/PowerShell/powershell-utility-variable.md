# Microsoft.PowerShell.Utility 模块 Variable 相关 cmdlet

模块 : [Microsoft.PowerShell.Utility](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.utility/)

| cmdlet            | 别名         | 说明                                 |
| ----------------- | ------------ | ------------------------------------ |
| [Clear-Variable]  | `clv`        | 删除变量的值                         |
| [Get-Variable]    | `gv`         | 获取当前控制台中的变量               |
| [New-Variable]    | `nv`         | 创建一个新变量                       |
| [Remove-Variable] | `rv`         | 删除一个变量及其值                   |
| [Set-Variable]    | `set` , `sv` | 设置变量的值。若不存在，则创建该变量 |

## Clear-Variable

```powershell
# 移除名称以 my 开头的全局变量的值
Clear-Variable my* -Scope Global

# 清除子作用域中的某个变量，但不清除父作用域中的该变量
$a=3
&{ Clear-Variable a }
$a

3

# 删除名为 Processes 的变量的值
# 此 cmdlet 完成操作后，名为 Processes 的变量仍然存在，但值为 null
Clear-Variable -Name "Processes"
```

备注：

- 若要删除变量及其值，请使用 `Remove-Variable` 或 `Remove-Item` 。
- 即使使用 `-Force` 参数，该 cmdlet 也无法清除常量或系统所拥有的变量的值。
- 如果你清除的变量不存在，则此 cmdlet 无效。 它不会创建具有 null 值的变量。

## Get-Variable

获取名称以字母 m 开头的变量和值：

```powershell
Get-Variable m*
```

仅获取名称以 m 开头的变量的值：

```powershell
Get-Variable m* -ValueOnly
```

获取有关以字母 M 或字母 P 开头的变量的信息：

```powershell
Get-Variable -Include M*,P*
```

仅获取在本地作用域中定义的变量：

```powershell
Get-Variable -Scope 0

# 等效于
Get-Variable -Scope Local

# 可缩写为
gv -s 0
```

查找在父作用域（作用域 1）中定义但仅在本地作用域（作用域 0）中可见的变量：

```powershell
Compare-Object (Get-Variable -Scope 0) (Get-Variable -Scope 1)
```

备注：

- 此 cmdlet 不管理环境变量。 若要管理环境变量，可以使用环境变量提供程序。

## New-Variable

```powershell
# 创建一个名为 days 的新变量
New-Variable days

# 创建一个名为 zipcode 的变量，并为其分配值 98033
New-Variable -Name "zipcode" -Value 98033

# 创建一个名为 Max 的只读变量
New-Variable -Name Max -Value 256 -Option ReadOnly

# 创建一个变量，并使该变量在当前作用域和创建的任何新作用域内可用，并且无法更改或删除
New-Variable -Name 'TestVariable' -Value 'Test Value' -Option AllScope,Constant

# 创建私有变量
New-Variable -Name counter -Visibility Private

# 已加载该模块的用户无法查看或更改 Counter 变量的值
$counter
"Cannot access the variable '$counter' because it is a private variable"
```

## Remove-Variable

```powershell
# 删除 $Smp 变量
Remove-Variable Smp
```

备注：

- 此命令将从定义了变量的作用域（例如，当前会话）中删除变量及其值。
- 你不能使用此 cmdlet 删除设置为常量或由系统所拥有的变量。

## Set-Variable

```powershell
# 将 $desc 变量的值设置为 A description，然后获取该变量的值
Set-Variable -Name "desc" -Value "A description"
Get-Variable -Name "desc"

# 创建一个包含系统上所有进程的全局只读变量
Set-Variable -Name "processes" -Value (Get-Process) -Option constant -Scope global -Description "All processes"

# 将 counter 设为私有变量
Set-Variable -Name "counter" -Visibility Private
```

[Clear-Variable]: https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.utility/clear-variable
[Get-Variable]: https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.utility/get-variable
[New-Variable]: https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.utility/new-variable
[Remove-Variable]: https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.utility/remove-variable
[Set-Variable]: https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.utility/set-variable
