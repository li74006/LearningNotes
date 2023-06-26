## Introduction Docker

### Docker in Action

`docker version`

`docker build -t xxxtagname .`

`docker image ls`

`docker ps`

`docker ps -a`

`docker run -it xxximagename` （

安装乌班图：

1. `docker run ubuntu`
2. `docker run it ubuntu`

## The Linux Command Line

### Running Linux

`echo xxxstring`

`whoami`

`echo $0`

`history` > `!index`

### Managing Packages

`apt` advanced package tool

1. 装某个包之前，先更行 package list database。

`apt update`

2. 更新之后，再安装这个包。

`apt install nano`

3. 删除某个包。

`apt remove nano`

<kbd>Ctrl</kbd> + <kbd>L</kbd> ：清理终端。

### Navigation the File System

`pwd` : print working directory.

`ls` : list.

`ls -1` : 只显示一行。

`ls -l` : 打印 list 详细信息。

`ls -a` : 打印包括隐藏文件在内的所有文件。

`ls /bin` : 绝对路径。

`cd xxx` + <kbd>Tab</kbd>

`cd ../..`

`cd ~` : /home

### Manipulating Files and Directories

`mkdir xxxdir`

`mv xxxdir` : 改名。

`touch hello.tst` : 新建文件。

`touch file1.txt file2.txt file3.txt` : 创建多个文件。

`nv hello.txt /etc` : 移动文件。

`rm file*` : 移除所有以 file 开头的文件。

`rm  -r docker` : 移除文件夹及其下的所有文件。(-r : recursive 递归)

### Editing and Viewing Files

`cat xxxfile.txt`

`more /etc/adduser.conf` + <kbd>Space / Enter</kbd> : 查看长文件，空格翻页，回车一行一行翻。

`head -n 5 /etc/adduser.conf` : 查看文件的前五行。

`tail -n 5 /etc/adduser.conf` : 查看文件的前五行。

`apt install less`
`less xxxfile.txt` : 也能看文件。

### Redirection

> Linux 中默认的输入是 键盘，默认的输出是屏幕，改变默认的输入输出就是 redirection。

`cat file1.txt > file2.txt` : 把文件 1 中的内容复制到文件 2。

`cat file1.txt file2.txt` : 打印文件 1、2 中的内容。

`cat file1.txt file2.txt > combined.txt` : 文件 1、2 中的内容复制到 combined 中。

`ehco hello > hello.txt` : 创建了毅哥内容是 hello 的 hello.txt 文件。

`ls -l /etc > list.txt`

### Searching for Text

`grep hello file1.txt` : 搜索文件中的文字。

`grep -i hello file1.txt` : （ -i : insen）

`grep -i hello file1.txt file2.txt` 或 `grep -i hello file*`

`grep -i -r hello .` : 在当前文件夹中，不管大小写，遍历含有 hello 内容的文件。（其中 -i 和 -r 可以合并为 -ir）

### Chaining Commands

`mkdir test; cd test; echo done`

上一条命令中，如果已经存在 test 文件夹，那么不会新建 test 文件夹，而后会执行 后梁步命令。

`mkdir test && cd test && echo done` : 这种命令下，如果已经存在 test 文件夹，那么后续的命令将不会执行。

`mkdir test || echon "directory exists"` : 或。

`ls /bin | less`

`ls /bin | head`

`ls /bin | head -n 5`

`mkdir hello;\` + <kbd>Enter</kbd> + `cd hello;\` + <kbd>Enter</kbd> + `echo done`

### Enviornment Variables

环境变量 ：可以用来设置存储应用的配置。

`printenv` : 打印所有环境变量。

`printenv PATH` 或 `echo $PATH`

`export DB_USER=mosh` : 在当前终端会话下设置一个环境变量。

`echo DB_USER=ohcysp >> .bashrc` : 在 .bashre 文件中添加 DB_USER=ohcysp。不要把敏感信息记录在环境变量中！

`source ~/.bashrc` : 重载 .bashrc 文件，因为环境变量只会在启动终端的时候加载一次，修改后需要重启终端或者重新加载 .bashrc 才能刷新修改后的环境变量。

### Managing Processes

`ps`

打印记过的 pts/0 中，pts 指的是 sudo terminal，0 指的是第一个 terminal window，如果在移动一个终端，那么就会打印出 pts/1。

`kill xxxPID` : 结束某个进程。

### Managing Users

`usermod` : 查看用户操作。

`useradd -m lii` 或 `adduser lii`

`usermod -s /bin/bash`

`cat /etc/shadow` : 存用户密码的文件。

`docker exec -it xxxCONTAINER-ID bash`

`docker exec -it -u lii xxxCONTAINER-ID bash`

`userdel lii` : 删除用户。

### Managing Groups

Groups : 同一组内的用户，拥有相同的权限。

`groupadd developers` : 添加新的组。

`cat /etc/group` : 产看组。

`usermod -G developers john`

### File Permissions

`chmod u+x xxxname.sh` : 给当前用户添加 xxxname.sh 文件的 x（执行）权限。

`chmod u+0 xxxname.sh` : 为所有用户添加该文件的执行权限。

`chmod og+x+w-r *.sh` : 为所有组添加 .sh 文件的执行、写并移除读的权限。
