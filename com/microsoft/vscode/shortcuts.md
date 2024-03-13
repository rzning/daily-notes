# Visual Studio Code

Keyboard shortcuts for Windows

> <https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf>

| shortcuts       | command                                 | description            |
| --------------- | --------------------------------------- | ---------------------- |
| `Ctrl+K Ctrl+R` | `workbench.action.keybindingsReference` | 帮助：键盘快捷方式参考 |

## 通用 General

| shortcuts             | command                                      | description                          |
| --------------------- | -------------------------------------------- | ------------------------------------ |
| `Ctrl+Shift+P` , `F1` | `workbench.action.showCommands`              | 显示命令面板                         |
| `Ctrl+P` , `Ctrl+E`   | `workbench.action.quickOpen`                 | 快速打开，转到指定文件               |
| `Ctrl+Shift+N`        | `workbench.action.newWindow`                 | 新建窗口                             |
| `Ctrl+Shift+W`        | `workbench.action.closeWindow`               | 关闭窗口                             |
| `Ctrl+,`              | `workbench.action.openSettings`              | 打开用户设置                         |
| `Ctrl+K Ctrl+S`       | `workbench.action.openGlobalKeybindings`     | 打开键盘快捷方式                     |
| [ `Ctrl+Alt+K` ]      | `workbench.action.openGlobalKeybindingsFile` | 打开用户自定义键盘快捷方式 JSON 文件 |

## 基本编辑 Basic editing

| shortcuts             | command                             | description            |
| --------------------- | ----------------------------------- | ---------------------- |
| 行操作                |
| `Ctrl+Shift+K`        | `editor.action.deleteLines`         | 删除行                 |
| `Alt+UpArrow`         | `editor.action.moveLinesUpAction`   | 向上移动行             |
| `Alt+DownArrow`       | `editor.action.moveLinesDownAction` | 向下移动行             |
| `Shift+Alt+UpArrow`   | `editor.action.copyLinesUpAction`   | 向上复制行             |
| `Shift+Alt+DownArrow` | `editor.action.copyLinesDownAction` | 向下复制行             |
| `Ctrl+Shift+Enter`    | `editor.action.insertLineBefore`    | 在上面插入新行         |
| `Ctrl+Enter`          | `editor.action.insertLineAfter`     | 在下面插入新行         |
| `Ctrl+[`              | `editor.action.outdentLines`        | 减少行缩进             |
| `Ctrl+]`              | `editor.action.indentLines`         | 增加行缩进             |
| 括号匹配              |
| `Ctrl+Shift+\`        | `editor.action.jumpToBracket`       | 跳转到匹配的括号       |
| [ `Ctrl+Shift+A` ]    | `editor.action.selectToBracket`     | 选择括号所有内容       |
| 区域折叠              |
| `Ctrl+Shift+[`        | `editor.fold`                       | 折叠区域               |
| `Ctrl+Shift+]`        | `editor.unfold`                     | 展开区域               |
| `Ctrl+K Ctrl+L`       | `editor.toggleFold`                 | 切换折叠               |
| `Ctrl+K Ctrl+[`       | `editor.foldRecursively`            | 递归方式折叠所有子区域 |
| `Ctrl+K Ctrl+]`       | `editor.unfoldRecursively`          | 递归方式展开所有子区域 |
| `Ctrl+K Ctrl+0`       | `editor.foldAll`                    | 全部折叠               |
| `Ctrl+K Ctrl+J`       | `editor.unfoldAll`                  | 全部展开               |
| `Ctrl+K Ctrl+1`       | `editor.foldLevel1`                 | 折叠级别 1             |
| `Ctrl+K Ctrl+2`       | `editor.foldLevel2`                 | 折叠级别 2             |
| `Ctrl+K Ctrl+3`       | `editor.foldLevel3`                 | 折叠级别 3             |
| `Ctrl+K Ctrl+7`       | `editor.foldLevel7`                 | 折叠级别 7             |
| `Ctrl+K Ctrl+8`       | `editor.foldAllMarkerRegions`       | 折叠所有标记区域       |
| `Ctrl+K Ctrl+9`       | `editor.unfoldAllMarkerRegions`     | 展开所有标记区域       |
| 注释                  |
| `Ctrl+K Ctrl+/`       | `editor.foldAllBlockComments`       | 折叠所有块注释         |
| `Ctrl+K Ctrl+C`       | `editor.action.addCommentLine`      | 添加行注释             |
| `Ctrl+K Ctrl+U`       | `editor.action.removeCommentLine`   | 移除行注释             |
| `Ctrl+/`              | `editor.action.commentLine`         | 切换行注释             |
| `Shift+Alt+A`         | `editor.action.blockComment`        | 切换块注释             |
| 自动换行              |
| `Alt+Z`               | `editor.action.toggleWordWrap`      | 切换自动换行           |
