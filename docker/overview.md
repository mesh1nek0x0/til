
# docker 入門
かつてboot2docker入れていた時代と変わっていたのでちょっとおさらい。

# 仮想マシンの一覧確認
```
# defaultはtool boxを入れたときにポチポチボタンを押しているとできている
$ docker-machine ls
NAME      ACTIVE   DRIVER       STATE     URL                         SWARM   DOCKER    ERRORS
default   -        virtualbox   Running   tcp://192.168.99.100:2376           v1.11.1
```

# 仮想マシンの作成
```
$ docker-machine create --driver virtualbox hoge
Running pre-create checks...
Creating machine...
(hoge) Copying /Users/iida-ryota/.docker/machine/cache/boot2docker.iso to /Users/iida-ryota/.docker/machine/machines/hoge/boot2docker.iso...
(hoge) Creating VirtualBox VM...
(hoge) Creating SSH key...
(hoge) Starting the VM...
(hoge) Check network to re-create if needed...
(hoge) Waiting for an IP...
Waiting for machine to be running, this may take a few minutes...
Detecting operating system of created instance...
Waiting for SSH to be available...
Detecting the provisioner...
Provisioning with boot2docker...
Copying certs to the local machine directory...
Copying certs to the remote machine...
Setting Docker configuration on the remote daemon...
Checking connection to Docker...
Docker is up and running!
To see how to connect your Docker Client to the Docker Engine running on this virtual machine, run: docker-machine env hoge

# もちろんlsすると増えてる

$ docker-machine ls
NAME      ACTIVE   DRIVER       STATE     URL                         SWARM   DOCKER    ERRORS
default   -        virtualbox   Running   tcp://192.168.99.100:2376           v1.11.1
hoge      -        virtualbox   Running   tcp://192.168.99.101:2376           v1.11.1
```

# 作成したマシンにホストOSから接続する
```
$ docker-machine env hoge
export DOCKER_TLS_VERIFY="1"
export DOCKER_HOST="tcp://192.168.99.101:2376"
export DOCKER_CERT_PATH="/Users/iida-ryota/.docker/machine/machines/hoge"
export DOCKER_MACHINE_NAME="hoge"
# Run this command to configure your shell:
# eval $(docker-machine env hoge)

# このevalの欄を実行すると作ったマシンと通信した状態になる(docker [cmd]が使える)

# ちなみにIPだけ知りたい時は下記の通り
$ docker-machine ip hoge
192.168.99.101
```

# マシンを止める時
```
$ docker-machine stop hoge
Stopping "hoge"...
Machine "hoge" was stopped.
$ docker-machine stop default
Stopping "default"...
Machine "default" was stopped.
$ docker-machine ls
NAME      ACTIVE   DRIVER       STATE     URL   SWARM   DOCKER    ERRORS
default   -        virtualbox   Stopped                 Unknown
hoge      -        virtualbox   Stopped                 Unknown
```

# マシンを削除する時
```
$ docker-machine rm hoge
About to remove hoge
Are you sure? (y/n): y
Successfully removed hoge
# ちゃんと消えている
$ docker-machine ls
NAME      ACTIVE   DRIVER       STATE     URL   SWARM   DOCKER    ERRORS
default   -        virtualbox   Stopped                 Unknown
```

# ホストマシンのディレクトリをマウントする時
-v オプションで「ホストマシンのパス:コンテナ内のパス」と指定する。
```
# マウントしたいディレクトリを作っておいて
$ mkdir html && cd html
$ echo hello world > index.html
$ docker run -v `pwd`:/var/www/html -d -p 80:80 eboraas/apache

$ curl `docker-machine ip`
hello world
$ sed -i -e 's/world/mesh1neko/g' index.html
$ cat index.html
hello mesh1neko
$ curl `docker-machine ip`
hello mesh1neko
```

# 各containerに接続するとき
```
$ docker ps -a -q
5ab7dbb20cc0
$ docker exec -it 5ab /bin/bash
---5ab7dbb20cc0@container
root@5ab7dbb20cc0:/# ls
bin  boot  dev	etc  home  lib	lib64  media  mnt  opt	proc  root  run  sbin  srv  sys  tmp  usr  var
root@5ab7dbb20cc0:/# exit
exit
```

# 自動でホストのポートとマッピングする
-Pオプションを指定すれば、コンテナ内部で必要なポートを、ホストの空いているポートとマッピングしてくれます。
```
# たとえばMySQLがデフォルトとで3306のポートを使います。
$ docker run --name some-mysql -P -e MYSQL_ROOT_PASSWORD=toor -d mysql:latest
b549ac56a3461b508a633d007cc82a75c0b27fb2b4815e1a65e0902093e8fc77
$ docker ps -l
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                     NAMES
b549ac56a346        mysql:latest        "docker-entrypoint.sh"   36 seconds ago      Up 15 seconds       0.0.0.0:32770->3306/tcp   some-mysql
# ホスト側の32770がコンテナ側の3306にマッピングされている
#（ホストから`docker-machine ip`:32770で接続可能）
```

# 最後に立ち上げたコンテナのIDを表示する時
-lオプションと-qオプションを使うとよい
```
# さっき立ち上げたMySQLのコンテナのIDがわかる
$ docker ps -lq
b549ac56a346
```

# 割り当てたポートを確認したい
コンテナIDや名前からホスト側のポートがわかります（docker psだとみきれるんじゃいという人も安心）
```
# 最後に立てたコンテナのIDを取得してポートを確認してる
$ docker port `docker ps -lq`
3306/tcp -> 0.0.0.0:32772
```

# コンテナ内のプロセスを確認したい
同じみtopコマンドがあります
```
# ちゃんとmysql立てたのでmysqldがいますね！
docker top `docker ps -lq`
UID                 PID                 PPID                C                   STIME               TTY                 TIME                CMD
999                 2290                2279                0                   15:28               ?                   00:00:00            mysqld
```
