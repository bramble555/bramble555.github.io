---

# Git 最常用命令速查（精炼版）

---

# 一、Git 四个核心区域（必须理解）

```
Working Tree   工作区
Staging Area   暂存区（Index）
Git Directory  本地仓库
Remote Repo    远程仓库
```

---

# 二、最常用命令（每天都会用）

## 推送代码

```bash
git push -u origin <branch_name> (-u = upstream, 建立本地分支 和 远程分支 的追踪关系,方便以后可以直接 git push)
```

---

## 拉取远程代码

```bash
git pull origin <branch_name>
```

等价于

```
git fetch origin <branch_name>
git merge origin/<branch_name>
```

---

## 查看远程更新（不合并）

```bash
git fetch
```

作用

```
只下载远程代码
不修改本地代码
```

---

# 三、分支操作（开发最常用）

## 创建分支

```bash
git branch <branch_name>
```

---

## 创建并切换分支（最常用）

```bash
git checkout -b <branch_name>    (-b= branch,创建并切换分支)
```

等价命令

```bash
git switch -c <branch_name>    (-c = create,创建并切换分支)
```

---

## 切换分支

```bash
git switch <branch_name>
```

等价

```bash
git checkout <branch_name>
```

---

## 查看分支

查看本地

```bash
git branch
```

查看远程

```bash
git branch -r    (-r = remote)
```

查看所有

```bash
git branch -a
```

---

## 删除本地分支(危险)

```bash
git branch -d <branch_name>    (-d = delete)
```

---

## 删除远程分支(危险)

```bash
git push origin -d <branch_name>
```

---

# 四、代码合并

## 合并远程 main 到本地分支

```bash
git merge origin/main
```

---

## 推荐方式（大厂）

```bash
git rebase origin/main
```

优点

```
提交历史更直线
```

---

# 五、stash（临时保存代码）

开发到一半需要切分支

## 保存当前修改

```bash
git stash
```

---

## 查看 stash

```bash
git stash list
```

---

## 恢复代码

```bash
git stash pop
```

参数

```
pop = remove after apply
```

含义

```
恢复并删除 stash
```

或者

```bash
git stash apply
```

```
恢复但保留 stash
```

---

# 六、撤销操作（最容易忘）

---

## 撤销 add

```
Staging Area -> Working Tree
```

```bash
git reset HEAD .
```

---

## 撤销 commit 到暂存区

```
Git Directory -> Staging Area
```

```bash
git reset --soft HEAD^
```

---

## 撤销 commit 到未暂存

```
Git Directory -> Working Tree
```

```bash
git reset (--mixed) HEAD^    (默认就是 --mixed)
```

---

## 强制回退（危险）

```
Git Directory -> 上一个版本(⚠️你现在的工作区文件会消失)
Working Tree 同步回退
```

```bash
git reset --hard HEAD^
```

---

## 回到指定版本

```bash
git reset --hard <commit_id>
```

查看 commit

```bash
git log
```

```bash
git reflog
```
---

# 七、修改 commit

## 修改 commit 信息

```bash
git commit --amend

commit到了本地仓库,本地仓库到远程仓库还需要 

git push -f origin <branch_name>
```

---

## 把文件追加到上一次 commit

```bash
git add .
git commit --amend
```

---

# 八、.gitignore 失效问题

问题

```
文件已经 commit
后来加入 .gitignore
仍然被 Git 管理
```

原因

```
.gitignore 只忽略 未追踪文件
```

解决(只删除 Git 记录,保留本地文件)

```bash
git rm --cached <file_name>
```

---

# 九、公司开发流程（标准）

### 1 克隆仓库

```bash
git clone <repo_url>
```

---

### 2 切主分支

```bash
git checkout main
```

---

### 3 更新代码

```bash
git pull origin main
```

---

### 4 创建功能分支

```bash
git checkout -b feature/<branch_name>
```

分支规范

```
feature/<branch_name>  新功能
fix/<branch_name>      修复bug
hotfix/<branch_name>   紧急修复
```

---

###5 开发
git add .
git commit -m "feat: xxx"
### 6 合并最新 main（提交前必须做）
git fetch origin
git rebase origin/main

作用

同步最新主分支代码
提前解决冲突
### 7 推送
git push -u origin feature/<branch_name>
### 8 提交 MR
Merge Request

等待 Review

---

