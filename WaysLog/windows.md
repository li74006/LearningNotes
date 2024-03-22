### 1. 禁用了自己导致无法登录 windows

> 为了改开机界面的壁纸，做了件巨傻逼的事情，把 lanlan 的账户给禁用了，以为能自动以 Administrator 账户登录 😅

解决方法：

1. 按住左 <kbd>Shift</kbd>，点击右下角重启可进入安全模式，但是进安全模式没啥用；
2. 接 U 盘重启进入 PE，获取 BitLocker 密钥后进入 C:\WINDOWS\SYSTEM32\文件夹下，找到当前目录下 sethc.exe，将其改名成 sethc.exe.bak；
3. 复制当前文件夹下 cmd.exe 到当前目录并改名为 sethc.exe；
4. 再复制 cmd.exe 到当前目录下的 dllcache 目录里改名为 sethc.exe（我电脑里没有，就没进行此步骤）；
5. 重启后到了登陆界面，狂按 shift 键，此时会弹出 cmd 窗口；
6. 执行 lusrmgr.msc 命令，并将禁用的账户重新启用，搞定！

> 其实思路就是将 粘连键 的 .exe 改成了 cmd.exe，就能实现按 5 下 Shift 调出 cmd
