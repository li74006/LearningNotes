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

`apk add vim`

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

`ehco hello > hello.txt` : 创建了一个内容是 hello 的 hello.txt 文件。

`ls -l /etc > list.txt`

### Searching for Text

`grep hello file1.txt` : 搜索文件中的文字。

`grep -i hello file1.txt` : （ -i : insen）

`grep -i hello file1.txt file2.txt` 或 `grep -i hello file*`

`grep -i -r hello .` : 在当前文件夹中，不管大小写，遍历含有 hello 内容的文件。（其中 -i 和 -r 可以合并为 -ir）

### Chaining Commands

`mkdir test; cd test; echo done`

上一条命令中，如果已经存在 test 文件夹，那么不会新建 test 文件夹，而后会执行 后两步命令。

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

`docker start -i xxxContainer-ID` : 根据容器 ID 启动某个容器。

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

`cat /etc/group` : 查看组。

`usermod -G developers john`

### File Permissions

`chmod u+x xxxname.sh` : 给当前用户添加 xxxname.sh 文件的 x（执行）权限。

`chmod u+0 xxxname.sh` : 为所有用户添加该文件的执行权限。

`chmod og+x+w-r *.sh` : 为所有组添加 .sh 文件的执行、写并移除读的权限。

## Building Images

### Images and Containers

Image 包含：

- A cut-down OS
- Thrid-party libtaties
- Application files
- Enviornment variables
  ...

Container :

- Provides on isolated enviornment
- Can be stopped & restared
- Is just a process

### Dockerfile Instructions

Dockerfile :

- FROM : 指定 Base Image
- WORKDIR : 指定工作目录,接下来的命令都会在该目录下进行
- COPY : 把当前路径下的文件或目录复制到 image 中
- ADD : 和 COPY 相同，但是可以添加网络资源和自动解压压缩文件
- RUN : 执行操作系统命令
- ENV : 设置环境变量
- EXPOSE : 配置容器端口
- USER : 指定运行应用的用户
- CMD : 指定启动容器需要的命令
- ENTRYPOINT : 指定启动容器需要的命令

### Choosing the Right Base Image

Dockerfile:

```Dockerfile
FROM node:18.16.1-alpine3.17
WORKDIR /app
COPY . .
```

`docker build -t docker-react-app .`

`docker image ls` : 查看本地 docker image

`docker run -it docker-react-app` : 会进入 node 环境中。

`docker run -it docker-react-app sh ` ：因为 alpine linux 没有 bash，所以这里用 shell。

### Copying Files and Directories

如果把 windows os 项目中的 node_modules 也添加到 docker image 中，会报 bug，因为 win he linux 的 node_modules 不兼容，所以得排除 node_modules 的添加，然后在容器中重新 npm install 。

### Excluding Files and Directories

.dockerignore:

```dockerignore
node_modules
```

### Running Commands

```Dockerfile
FROM node:18.16.1-alpine3.17
WORKDIR /app
COPY . .
RUN npm install
```

### Setting Env Variables

```Dockerfile
FROM node:18.16.1-alpine3.17
WORKDIR /app
COPY . .
RUN npm install
ENV API_UPL=http://api.myapp.com/
EXPOSE 5173
```

### Setting the User

`addgroup app` ：创建一个叫 app 的组

`adduser -S -G app app` : 在 app 组中，创建一个名叫 app 的系统用户

`groups app` : 查看 app 组中用户

```dockerfile
FROM node:18.16.1-alpine3.17
WORKDIR /app
COPY . .
RUN npm install
ENV API_UPL=http://api.myapp.com/
EXPOSE 5173
RUN addgroup app && adduser -S -G app app
USER app # 接下来所有的命令都会由 app 输入执行
```

### Defining Entrypoints

```dockerfile
FROM node:18.16.1-alpine3.17
RUN addgroup app && adduser -S -G app app
USER app # 接下来所有的命令都会由 app 输入执行
WORKDIR /app
COPY . .
RUN npm install
ENV API_UPL=http://api.myapp.com/
EXPOSE 5173

# Shell form
CMD npm run xxx

# Exec form 一般用这种方式，系统直接执行命令，不会再开个 shell 或者啥执行
CMD ["npm", "start"]

# 这样不会在执行 docker run xxx npm run dev 时覆盖上面的 CMD 命令
# 如果想覆盖 entrypoint 要这样 ：docker run xxx --entrypoint npm run dev
ENTRYPOINT ["npm", "start"]
```

先创建用户，否则没有权限执行相应文件。

RUN 是在 build image 时候执行的，比如说 npm install。

CMS 是在容器的 runtime 执行。

### Speeding Up Builds

Dockerfile

```dockerfile
FROM node:18.16.1-alpine3.17
RUN addgroup app && adduser -S -G app app
USER app
WORKDIR /app

# 先把 package*.json 加到镜像中，然后 npm i ，然后再将所有文件加到 image 中，这样两边 node_mudules 目录结构都一样，就不用重新 i 一遍 package 了，直接用之前 docker 的 layer 就行
COPY package*.json .
RUN npm install
COPY . .
ENV API_UPL=http://api.myapp.com/
EXPOSE 5173
# CMD npm run dev
# CMD ["npm", "run", "dev"]

# ENTRYPOINT ["npm", "run", "dev"]
```

### Removing Images

`docker iamge prune` : 修剪 docker image

`docker container prune`

`docker image rm xxxName`

### Tagging Images

`docker build -t docker-react-app:1 .`

`docker image remove docker-react-app:1`

`docker image tag docker-react-app:1 dock-react-app:1.0.1`

`docker image tag xxxName:xxx`

### Sharing Images

1. 登录 Docker Hub
2. 创建一个仓库
3. docker login
4. docker push xxxxxx

### Saving and Loading Images

`docker image save -o docker-react-app.tar docker-react-app:3`

`docker image load -i docker-react-app.tar`

## Working with Containers

### Staring Containers

`docker run -d docker-react-app` : 后台启动容器（ -d detach），这样之后就能进入该容器输命令了

`docker run -d --name blue-sky docker-react-app` : 为启动的容器命名

`docker logs xxxContain-ID` : 查看某个容器日志

`docker logs -f xxxContain-ID` : 实时查看容器输出日志

`docker logs -n <行数> -t xxxContain-ID` : 查看自定义最后几行的日志（ -t 显示时间戳）

### Publishing Ports

`docker run -d -p 3000:5173 --name c1 docker-react-app` : 把本机的 3000 端口连给容器的 5173 端口（-p port）

package.json 中，需要 --host 暴露一下，才能在宿主机访问 5173。

### Excuting Command in Running Containers

`docker exec c1 ls`

`docker exec -it c1 sh` : 在打开的这个终端中，即使 exit 了，容器还是会在后台运行。

### Stopping and Starting Containers

`docker stop c1`

`docker start c1`

`docker run` 是运行一个新的容器，`docker start` 是运行一个已有容器。

### Removing Containers

`docker container rm c1` 或 `docker rm c1` 或 `docker rm -f c1 ` 可以强制删除运行中的容器 ( -f force)

### Persisting Data with Volumes

Volumes : 独立于容器的存储空间

`docker volume create app-data` : 创建一个 volume

`docker volume inspect app-data` : 检查 volume

`docker run -d -p 4000:3000 -v app-data:/app/data docker-react-app` : (-v volume)

Dockerfile

```dockerfile
FROM node:18.16.1-alpine3.17
# RUN addgroup app && adduser -S -G app app
# USER app
WORKDIR /app
RUN mkdir data # 这样，当使用 volume 时，就不会产生权限问题，否则上一步 docker 会用 root 用户新建一个 data 文件夹，app 用户就无法操作这个文件夹了
COPY package*.json .
RUN npm install
COPY . .
ENV API_UPL=http://api.myapp.com/
EXPOSE 5173
# CMD npm run dev
CMD ["npm", "run", "dev"]

# ENTRYPOINT ["npm", "run", "dev"]
```

### Copying Files between the Host and Container

`docker cp xxxContainer-ID:/app/log.txt .` : 从容器中复制出来

`docker cp secret.txt xxxContainer-ID:/app` : 从本地复制到容器中

### Sharing the Source Code with Container

`docker run -d -p 3000:3000 -v $(pwd):/app docker-react-app` : 将本地文件夹和容器文件夹映射到一块，实现本低修改后，映射的容器文件夹内容随之修改（$(pwd) 会打印当前的工作目录地址）

## Running Multi-container Applications

### Install Docker Compose

win 在装 docker 的时候已经给装好了

`docker image rm -f $(docker image ls -a -q)` : 通过 image id 列表，删除所有 image

`docker container rm -f $(docker container ls -a -q)` : 通过 container id 列表，删除所有 container

### The Sample Web Application

`docker-compose up`

### JSON and YAML Formats

.yaml/.yml 一般用作为配置文件，.json 一般用于交换数据。

### Creating a Compose

docker-compose.yml

```yml
version: "3.8"

services:
  web:
    build: ./fronted
    ports:
      - 3000:3000
  api:
    build: ./backend
    ports:
      - 3001:3001
    enviornment:
      # - DB_URL=mongodb://db/paperSack  # 或 👇
      DB_URL:mongodb://db/paperSack
  db:
    image: mongo:4.0-xenial
    ports:
      - 27017:27017
    volume:
      - paperSack: /data/db # 该路径是 mongodb 的默认数据存储位置

  volumes:
    paperSack:
```

### Building Images

`docker-compose build`

`docker-compose build --no-cache` : 强制重新构建，不使用之前的 layer

### Starting and Stopping the Application

`docker-compose up --build` : 先 build 再启动

`docker-compose up -d` : 后台启动

`docker-compose down` : 停止并移除容器

### Docker Networking

当运行 docker-compose 时，docker 会自动创建一个网络，并把容器都放到该网络下，方便其之间信息交互。

所以可以 `ping api`

`ifconfig` 查看容器 ip 地址

### Viewing Logs

`docker-compose logs`

`docker-compose xxxContainer-ID -f` (-f follow)

### Publishing Changes

docker-compose.yml

```yml
version: "3.8"

services:
  web:
    build: ./frontend
    ports:
      - 3000:3000
    volumes:
      - ./frontend:/app
  api:
    build: ./backend
    ports:
      - 3001:3001
    enviornment:
      # - DB_URL=mongodb://db/paperSack  # 或 👇
      DB_URL:mongodb://db/paperSack
    volumes:
      - ./backend:/app
  db:
    image: mongo:4.0-xenial
    ports:
      - 27017:27017
    volume:
      - paperSack: /data/db # 该路径是 mongodb 的默认数据存储位置

  volumes:
    paperSack:
```

### Migrating the Database

docker-compose.yml

```yml
version: "3.8"

services:
  web:
    build: ./fronted
    ports:
      - 3000:3000
    volumes:
      - ./frontend:/app
  api:
    build: ./backend
    ports:
      - 3001:3001
    enviornment:
      # - DB_URL=mongodb://db/paperSack  # 或 👇
      DB_URL:mongodb://db/paperSack
    volumes:
      - ./backend:/app
    command: ./wait-for db:27017 && migrate-mongo up && npm start # 等待 db 启动后，迁移 db 数据，然后再启动 server
  db:
    image: mongo:4.0-xenial
    ports:
      - 27017:27017
    volume:
      - paperSack: /data/db # 该路径是 mongodb 的默认数据存储位置

  volumes:
    paperSack:
```

### Running Test

```yml
web-test:
  image: vidly_web
  volumes:
    - ./frontend:/app
  command: npm test
```

## Deploying Applications

### Getting a Virtual Machine(VPS)

Mosh 用的 Digital Ocean。
我用 AWS ~

### Install Docker Machine

Docker Machine : 用于 开发端 和 VPS 上的 docker engine 交互信息。

`curl xxxxxx` : 上官网自己找命令。

### Provisioning a Host

`docker-machine create --driver digitalocean --digitalocean-access-token xxxxToken vidly`

### Connecting to the Host

`docker-machine ls`

`docker-machine ssh paperSack` : 这样就能直接登录 VPS

### Defining the Production Configuration

要新建一个生产环境下的 docker-compose 配置文件

docker-compose.prod.yml

```yml
version: "3.8"

services:
  web:
    build: ./frontend
    ports:
      - 80:3000
    restart: unless-stopped # 如果不手动停止，就会自动重启

  api:
    build: ./backend
    ports:
      - 3001:3001
    enviornment:
      # - DB_URL=mongodb://db/paperSack  # 或 👇
      DB_URL:mongodb://db/paperSack
    command: ./wait-for db:27017 && migrate-mongo up && npm start # 等待 db 启动后，迁移 db 数据，然后再启动 server
    restart: unless-stopped

  db:
    image: mongo:4.0-xenial
    ports:
      - 27017:27017
    volume:
      - paperSack: /data/db # 该路径是 mongodb 的默认数据存储位置
    restart: unless-stopped

  volumes:
    paperSack:
```

### Reducing the Image Size

/frontend/Dockerfile.prod

```dockerfile
# Setp 1 : Build stage
FROM node:14.16.0-alpine3.13 AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2 : Production
FROM nginx:1.12-alpine
RUN addgroup && adduser -S -G app app
USER app
COPY --from=build-stage /app/build/usr/share/nginx/html
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"] # daemon off : 守护进程
```

docker-compose.prod.yml

```yml
web:
  build:
    context: ./frontend
    docker: Dockerfile.prod
    ports:
      - 80:80
```

`docker-compose -f docker-compose.prod.yml build`（-f file）

### Deploying the Application

`docker-machine env paperSack` : 查看应用的环境变量

`docker-compose -f docker-compose.prod.yml up -d`

`RUN mkdir /app && chown `

### Troubleshooting Deployment Issues

用户权限会导致 nginx 无法运行。

别忘了改前端框架中生产环境中的 api 地址：

/frontend/Dockerfile.prod

```dockerfile
...
RUN npm install
COPY . .
ENV REACT_APP_API_URL=http://123.123.123.123:3001/api # 自己云服务器的地址
RUN npm run build
...
```

### Publishing Changes

可以在 docker-compose.prod.yml 中添加 image tag

```yml
web:
  image: paperSack_web:1
  build:
    context: ./frontend
    docker: Dockerfile.prod
    ports:
      - 80:80
```

有自动管理 image 版本的工具，需要自己学了就 ~ 听完了，开心！😊🎉
