# dcokerfile記述に関するtips
構成の設定ファイル。いわゆるInfrastructure as Code

キャッシュを意識して記述することが大事。

## 用語
### 命令
Dockerfile内で記述する構成を実際に指示すること。特に頻出するのは以下の通り。
* RUN
* COPY
* CMD

### FROM命令
* 構築のベースとするイメージを指定する命令
* 複数回指定できる // 意味はあるのか？？

### RUN命令
　行うのは以下のこと。
* コマンドの実行
* ライブラリやパッケージのインストール
* ファイルシステムの変更の記録

RUNのたびに新しいイメージがコミットされるため&&でつないで層を抑えるもよい手段。

また見やすさを考慮する場合は¥で改行するのも有効。
```
$ cat Dockerfile
# comment
FROM ubuntu:14.04
RUN apt-get update && apt-get install -y vim # 分ける場合は&&の代わりに普通に改行

### historyで確認するとよくわかる
## 別々
docker history e5b6a42f94ae | wc -l # wc -lは行数確認
      8
## まとめた場合
$ docker history 5899af9ff1d0 | wc -l
       7 # 1層分小さくなった
```
### CMD命令
* コンテナ「作成」時に標準で実行
* 形式が２つある（shell, exec）
* 複数回指定できるが実行されるのは最後のもの
* 実行時に上書きできる

```
$ cat Dockerfile
# comment
FROM ubuntu:14.04
RUN apt-get update && apt-get install -y vim
CMD ["ping", "-c", "30", "127.0.0.1"]
$ docker run mesh1neko/myimage:1.2
PING 127.0.0.1 (127.0.0.1) 56(84) bytes of data.
64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.037 ms
64 bytes from 127.0.0.1: icmp_seq=2 ttl=64 time=0.042 ms
...(ry
--- 127.0.0.1 ping statistics ---
30 packets transmitted, 30 received, 0% packet loss, time 28999ms
rtt min/avg/max/mdev = 0.031/0.041/0.055/0.007 ms
$ docker run mesh1neko/myimage:1.2 echo "hello docker file"
hello docker file

### 確認してみるとCOMMANDが変わっている
$ docker ps -a --filter ancestor=mesh1neko/myimage:1.2
CONTAINER ID        IMAGE                   COMMAND                  CREATED             STATUS                     PORTS               NAMES
097fc5297b2e        mesh1neko/myimage:1.2   "echo 'hello docker f"   2 minutes ago       Exited (0) 2 minutes ago                       distracted_mccarthy
e5ec8ede4c41        mesh1neko/myimage:1.2   "ping -c 30 127.0.0.1"   3 minutes ago       Exited (0) 2 minutes ago                       thirsty_mirzakhani
```

### ENTRYPOINT命令
* コンテナ「実行」時に標準で実行
* これがあるときCMD命令は無視される
* 形式が２つある（shell, exec）
* docker run 時に--entrypointを指定することで上書きできる

```
$ cat Dockerfile
FROM ubuntu:14.04
RUN apt-get update && apt-get install -y vim
#CMD ["ping", "-c", "30", "127.0.0.1"]
ENTRYPOINT ["ping", "-c", "3"] # pingを実行する様に書かれているが...
CMD ["127.0.0.1"]
$ docker run -i -t --entrypoint bash mesh1neko/myimage:1.4　# bashを実行する様に指定
root@9b83ee684d64:/# exit
exit

```

#### CMD*ENTRYPOINT
ちょっと複雑。CMDに書いたものが指定なし時のデフォルトになる。

e.g. 以下のように組み合わせて使うと
```
$ cat Dockerfile
FROM ubuntu:14.04
RUN apt-get update && apt-get install -y vim
ENTRYPOINT ["ping", "-c", "3"] #
CMD ["127.0.0.1"]

$ docker run mesh1neko/myimage:1.4 # 引数なし
PING 127.0.0.1 (127.0.0.1) 56(84) bytes of data.
64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.042 ms # CMDの値が採用されている
64 bytes from 127.0.0.1: icmp_seq=2 ttl=64 time=0.035 ms
64 bytes from 127.0.0.1: icmp_seq=3 ttl=64 time=0.035 ms

--- 127.0.0.1 ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 1998ms
rtt min/avg/max/mdev = 0.035/0.037/0.042/0.006 ms

$ docker run mesh1neko/myimage:1.4 192.168.10.10 # 引数あり
PING 192.168.10.10 (192.168.10.10) 56(84) bytes of data.
64 bytes from 192.168.10.10: icmp_seq=1 ttl=61 time=0.415 ms # 引数の値で上書きされている
64 bytes from 192.168.10.10: icmp_seq=2 ttl=61 time=0.500 ms
64 bytes from 192.168.10.10: icmp_seq=3 ttl=61 time=0.474 ms

--- 192.168.10.10 ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2000ms
rtt min/avg/max/mdev = 0.415/0.463/0.500/0.035 ms
```

#### shell形式とexec形式
shell形式はシェル上で実行されるため、変数を展開できる。

### COPY命令
* ホストからコンテナへファイルのコピーが可能
* ソースは複数指定できる（※ビルド指定ディレクトリからたどる）

```
$ cat Dockerfile
FROM java:7
COPY Hello.java / # DockerfileのディレクトリにあるHello.javaをコンテナの/ディレクトリへ
RUN javac Hello.java
ENTRYPOINT ["java", "Hello"]
```

### WORKDIR命令
* RUNやCMD、COPYなどの各命令の実行のディレクトリを変更できる // pathを変更する感じ
* 何度でも指定できる

```
$ cat Dockerfile
FROM java:7
COPY src /home/root/hellofromjava/src # ホストのsrcディレクトリをコピる
WORKDIR /home/root/hellofromjava # 実行ディレクトリを指定
RUN mkdir bin
RUN javac -d bin src/Hello.java
ENTRYPOINT ["java", "-cp", "bin", "Hello"] # -cpはclass path
```

### MAINTAINER命令
* Dockerfileのメンテナを明示
* FROM命令のあとの書くらしい
* オプションだけど書いた方がいい

```
$ cat Dockerfile
# comment
FROM ubuntu:14.04
MAINTAINER image-test <mesh1neko@example.com> # どことなくこんなつけ方の印象
RUN apt-get update && apt-get install -y vim
#CMD ["ping", "-c", "30", "127.0.0.1"]
ENTRYPOINT ["ping", "-c", "3"]
CMD ["127.0.0.1"]

$ docker build -t mesh1neko/myimage:1.5 .
Sending build context to Docker daemon 2.048 kB
Step 1 : FROM ubuntu:14.04
 ---> 38c759202e30
Step 2 : MAINTAINER image-test <mesh1neko@example.com>
...(ry
```

### ENV命令
* 環境変数を設定できる

```
$ cat Dockerfile
# comment
FROM ubuntu:14.04
MAINTAINER image-test <mesh1neko@gmail.com>
ENV FOO bar

root@fc1eb0e2b67e:/# echo "${FOO}" # buildしてコンテナを実行してみると...
bar
root@fc1eb0e2b67e:/# exit
exit
```

### ADD命令
* ホストからコンテナへファイルのコピーが可能
* ソースは複数指定できる（※ビルド指定ディレクトリからたどる）
* tarを展開できる機能がある
* URLを指定できる機能もあるが推奨されていないらしい

```
$ tar tvzf file.tar.gz
-rw-r--r--  0 iida-ryota staff       0  6 28 23:28 file-a.txt
-rw-r--r--  0 iida-ryota staff       0  6 28 23:28 file-b.txt
$ cat Dockerfile
# comment
FROM ubuntu:14.04
MAINTAINER image-test <mesh1neko@gmail.com>
WORKDIR /home/root/
ADD file.tar.gz .

$ docker build -t mesh1neko/myimage:1.7 .
$ docker run -it mesh1neko/myimage:1.7 /bin/bash
root@1a971e67bc36:/home/root# ls
file-a.txt  file-b.txt # ちゃんと展開されている！
root@1a971e67bc36:/home/root# exit
```

## build
Dockerfileを元に構築を実行します。構築時は以下の様に-tをつけるのが一般的らしい
```
$ cat Dockerfile
# comment
FROM ubuntu:14.04
RUN apt-get update
RUN apt-get install -y vim

$ docker build -t mesh1neko/myimage:1.0 . # .はカレントディレクトなのでゴミではない
```
なお、構築時にRUN命令ごとにイメージがcommitされてキャッシュされている。

キャッシュを使いたくない場合は--no cacheオプションを使用する

### docker historyで構築履歴を確認する
いつ作成されたか、サイズがどのくらいかがわかります。
```
$ docker images
REPOSITORY               TAG                 IMAGE ID            CREATED             SIZE
mesh1neko/myimage        1.0                 e5b6a42f94ae        13 minutes ago      261.6 MB
$ docker history e5b6a42f94ae
IMAGE               CREATED             CREATED BY                                      SIZE                COMMENT
e5b6a42f94ae        13 minutes ago      /bin/sh -c apt-get install -y vim               43.13 MB            
669f6d1173e4        21 minutes ago      /bin/sh -c apt-get update                       21.83 MB            
38c759202e30        45 hours ago        /bin/sh -c #(nop) CMD ["/bin/bash"]             0 B                 
<missing>           45 hours ago        /bin/sh -c sed -i 's/^#\s*\(deb.*universe\)$/   1.895 kB            
<missing>           45 hours ago        /bin/sh -c rm -rf /var/lib/apt/lists/*          0 B                 
<missing>           45 hours ago        /bin/sh -c set -xe   && echo '#!/bin/sh' > /u   8.841 MB            
<missing>           45 hours ago        /bin/sh -c #(nop) ADD file:b6ff401cf2a7a08c11   187.8 MB
```
