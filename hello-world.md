# Newbie
新手上路，我的第一个仓库，参照 [Hello-world - GitHub Guides](https://guides.github.com/activities/hello-world/) 教程。


## GitHub

GitHub 是一个代码托管平台，用于版本控制和协作。

此教程将提到一些 GitHub 的基本术语，如仓库（repositories）、分支（branches）、提交（commits）和合并请求（Pull Request）。

![:octocat:](https://assets-cdn.github.com/images/icons/emoji/octocat.png)


## 第一步，新建仓库

一个仓库（repository）通常用来组织一个独立的项目。

### :one: Create a Repository

1. 点击页面右上角的加号（+）下拉按钮，然后选择 **New repository** 。
2. 在 **Repository name** 位置输入仓库名称 `newbie` 。
3. 在 **Description** 位置写一个简短的描述。
4. 勾选 **Initialize this repository with a README** ，用于创建一个默认的 README.md 文件。
5. 点击 **Create repository** 。

:candy: 完成新仓库创建。


## 第二步，新建分支

分支（Branching）是一种可以同时在一个仓库的不同版本上工作的方式。

仓库在创建时，已经有一个名为 `master` 的默认分支。

### :two: Create a Branch

1. 切换到新建仓库 `newbie` 主页。
2. 点击文件列表顶部的名为 `branch:master` 的下拉按钮。
3. 创建名为 `readme-edits` 的分支。

:cherries: 此时仓库就有了名为 `master` 和 `read-edits` 两个分支。


## 第三步，编辑和提交修改

在 GitHub 保存变化被称为提交（commits）。

每个提交都有一个关联的提交消息（commit message），用于描述此次特定的变化，并且会捕获改变的历史信息。

### :three: Make and commit changes

1. 点击 `README.md` 文件。
2. 点击文件视图的右上角铅笔（Edit this file）图标进行编辑。
3. 在编辑器内对文档进行编辑。
4. 在页面底部 **Commit changes** 位置写一个提交消息，用来描述此次更改。
5. 点击 **Commit changes** 按钮提交更改。

:dango: 此次更改只会作用于 `readme-edits` 分支上的 README 文件。


## 第四步，创建一个合并请求

合并请求（Pull Requests）是 GitHub 上协作的核心。

当你打开一个 *pull request* 时，你将提出你的改进建议，并请求某人进行审查。
若采纳了你的改进请求，就会将其合并到他们的分支。

下面将会为刚才对 README 文件所做的更改，打开一个合并请求。

### :four: Open a Pull Request

1. 点击页面上部 **Pull Requests** 标签按钮，将显示 **Pull Requests** 标签页。
2. 点击标签页右上角绿色的 **New pull request** 按钮。
3. 在 **compare:** 栏选择你创建的 `readme-edits` 分支，选择后将会与在 **base:** 栏显示的 `master` 默认分支进行比较，并会列出详细的比较结果。
4. 检查两个分支的差异，确信这些就是你想提交的。
5. 若没有异议，则点击绿色的 **Create pull request** 按钮，以创建一个合并请求。
6. 给此次合并请求设定一个标题并写一些简单的描述信息。
7. 点击 **Create pull request** 按钮。

:four_leaf_clover: 完成对一个 Pull Request 的创建。

## 第五步，采纳请求合并

现在是时候将修改后的 `readme-edits` 分支合并到 `master` 主分支了。

### :five: Merge Pull Request

1. 在刚才新创建的 Pull Request 详情页面，点击绿色的 **Merge pull request** 按钮的右侧下拉部位，选择合并方式。有以下三种合并方式。
    - **Merge pull request** - 将此分支的所有提交（commit）合并到基本分支。
    - **Squash and merge** - 只将此分支的当前提交（commit）合并到基本分支。
    - **Rebase and merge** - 重置此分支的当前提交（commit）并合并到基本分支。
2. 点击当前选中的合并方式按钮。
3. 点击 **Confirm merge** 按钮确认合并。
4. 由于当前分支 `readme-edits` 的所有改动都合并到了 `master` 主分支，此时可以点击紫色框里的 **Delete branch** 按钮来删除当前分支。

:cherry_blossom: 完成对一次 Pull Request 的采纳。


---
*:octocat: Rzning*
