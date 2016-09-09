# Dockerのボリュームについて
## 役割
* コンテナ内の永続化機構
* ホストのディレクトリも割り当て可
* コンテナを削除しても残る->他のコンテナでも使用可能（ホストマシンに残っている）
* イメージには反映されない（RUNコマンドで実行した時もボリューム内は無視らしい）

## メリット
* コンテナ間のデータ共有
* ホストのファイルを共有できる

## 使い方
* コンテナ内の絶対パスで指定する
* 実行中のコンテナにもマウントできる
* 複数のボリュームをマウントも可能

```
$ docker run -i -t -v /www/website ubuntu:14.04 bash
root@8cc824390e11:/# cd www/website/
root@8cc824390e11:/www/website# echo "Hello Volume" > index.html
root@8cc824390e11:/www/website# cat index.html
Hello Volume

## 実際のボリュームはdockerのホストマシンに用意されている
$ docker inspect -f '{{json .Mounts}}' 8cc824390e11
[{"Name":"11adf4f701467a38d5c1248ced762a4bc4e45f82beaafd2738c9bc72d15ed956","Source":"/mnt/sda1/var/lib/docker/volumes/11adf4f701467a38d5c1248ced762a4bc4e45f82beaafd2738c9bc72d15ed956/_data","Destination":"/www/website","Driver":"local","Mode":"","RW":true,"Propagation":""}]

$ docker-machine ssh
                        ##         .
                  ## ## ##        ==
               ## ## ## ## ##    ===
           /"""""""""""""""""\___/ ===
      ~~~ {~~ ~~~~ ~~~ ~~~~ ~~~ ~ /  ===- ~~~
           \______ o           __/
             \    \         __/
              \____\_______/
 _                 _   ____     _            _
| |__   ___   ___ | |_|___ \ __| | ___   ___| | _____ _ __
| '_ \ / _ \ / _ \| __| __) / _` |/ _ \ / __| |/ / _ \ '__|
| |_) | (_) | (_) | |_ / __/ (_| | (_) | (__|   <  __/ |
|_.__/ \___/ \___/ \__|_____\__,_|\___/ \___|_|\_\___|_|
Boot2Docker version 1.11.1, build HEAD : 7954f54 - Wed Apr 27 16:36:45 UTC 2016
Docker version 1.11.1, build 5604cbe
$ sudo cat /mnt/sda1/var/lib/docker/volumes/11adf4f701467a38d5c1248ced762a4bc4e45f82beaafd2738c9bc72d15ed956/_data/index.htm　# あったあった！
l
Hello Volume
```

## 留意点
コンテナ削除時にボリュームがいらない時は一緒に消そう！

```
$ docker rm 8cc
8cc
$ sudo cat /mnt/sda1/var/lib/docker/volumes/11adf4f701467a38d5c1248ced762a4bc4e45f82beaafd2738c9bc72d15ed956/_data/index.htm
l
Hello Volume # 消したコンテナのボリュームが残っている

$ docker run -it -d -v /www/html ubuntu:14.04
00c88dfd465b4b7e56f5a3e8e7735350c93564a35495e54801cb00cfabbc8c56
local-mesh1neko:~$ docker inspect -f '{{json .Mounts}}' 00c88
[{"Name":"e62c8288b0fe975a6f5b67d66cd8a52b4bfdd8f88051546f0a6d5db4decf5f0e","Source":"/mnt/sda1/var/lib/docker/volumes/e62c8288b0fe975a6f5b67d66cd8a52b4bfdd8f88051546f0a6d5db4decf5f0e/_data","Destination":"/www/html","Driver":"local","Mode":"","RW":true,"Propagation":""}]
$ docker stop 00c8
00c8
$ docker rm -v 00c8
00c8
$ sudo ls -la /mnt/sda1/var/lib/docker/volumes/e62c8288b0fe975a6f5b67d66cd8a52b4bfdd8f88051546f0a6d5db4decf5f0e/_data
ls: /mnt/sda1/var/lib/docker/volumes/e62c8288b0fe975a6f5b67d66cd8a52b4bfdd8f88051546f0a6d5db4decf5f0e/_data: No such file or directory # ちゃんと消滅している
```

## ホストのディレクトリをボリュームとしてマウントする
* ホスト側の変更は自動的に反映
* 書き込み/読み込みを制限できる

```
### 基本的な構文
docker run -v host-absolute-path:container-path:[rw|ro] # read write と read only

### sample
$ mkdir volume
$ echo "hello host volume." > volume/index.html
$ cat volume/index.html
hello host volume.
$ docker run -it -v `pwd`/volume:/www/html ubuntu:14.04 bash
root@263688c6999a:/# cat www/html/index.html
hello host volume.
## ここでコンテナからデタッチ（停止ではない）
$ echo "changed host data" >> volume/index.html # ホストから追記します
$ cat volume/index.html
hello host volume.
changed host data

$ docker exec -it 263688c6999a bash # 再びコンテナにアタッチ
root@263688c6999a:/# cat www/html/index.html
hello host volume.
changed host data # 反映されている！yeah！
root@263688c6999a:/# exit

$ docker inspect -f '{{json .Mounts}}' 263688c6999a
[{"Source":"/Users/iida-ryota/Documents/til/docker/volume","Destination":"/www/html","Mode":"","RW":true,"Propagation":"rprivate"}]

## ちなみにこれ-vで消してもホストのディレクトリ消えないよね...？
$ cat volume/index.html # ある
hello host volume.
changed host data
$ docker rm -v 263688c6999a # ボリュームごと消す
263688c6999a
$ cat volume/index.html # 残ってる！！！まぁそりゃそうか
hello host volume.
changed host data

```

nginxでやってみる場合
```
$ mkdir public_html
$ docker run -d -P -v `pwd`/public_html:/usr/share/nginx/html nginx
d94c8d124ba15f2e767cd1bdb8aba15b475d8f815e10e84dc8d0c76d13670443
$ docker port d94
443/tcp -> 0.0.0.0:32768
80/tcp -> 0.0.0.0:32769 # 80ポートは32769でマッピングされている

$ curl `docker-machine ip`:32769/index.html
<html>
<head><title>404 Not Found</title></head> # ホストディレクトリで上書きされていますね
<body bgcolor="white">
<center><h1>404 Not Found</h1></center>
<hr><center>nginx/1.11.1</center>
</body>
</html>
$ echo "welcome to nginx." > public_html/index.html # 作ってあげます
$ curl `docker-machine ip`:32769/index.html
welcome to nginx. # 反映されている！
```

## 複数のVolumeから参照されるデータコンテナ
* アプリケーションやプロセスは実行できない
* 他のコンテナと共有する必要があるデータに使う
* 参照しやすい簡単な名前をつけるとよい
* 連鎖できる

```
### 連鎖の例
$ docker run --name webdata -v /srv/www busybox # これはデータコンテナ
$ docker run -it --name webserver --volumes-from webdata ubuntu:14.04 bash # appコンテナ1
root@13fcb15d7b22:/# echo "hoge" > srv/www/test.log # ログを書き込んでおく

$ docker run -it --name webserver-another --volumes-from webserver ubuntu:14.04 bash # 別のappコンテナ
root@003ddb9318c9:/# cat /srv/www/test.log
hoge # appコンテナ1のログが見える
root@003ddb9318c9:/# echo "created in webserver another." >> /srv/www/test.log # 追記する
root@003ddb9318c9:/# cat /srv/www/test.log
hoge
created in webserver another.
root@003ddb9318c9:/# eixt
$ docker attach webserver
root@13fcb15d7b22:/# cat /srv/www/test.log
hoge
created in webserver another. # 書き込まれてる！
```

### コンテナのログをバックアップしたい
ホストのディレクトリをマウントしたボリュームに、データコンテナの内容を吐き出せばOK

```
$ docker run --name logdata -v /var/log/nginx busybox
$ docker run --name webdata -v `pwd`/public_html:/usr/share/nginx/html busybox
$ docker run -d -P --name webserver --volumes-from logdata --volumes-from webdata nginx
b735b0d335b2446af8603b94f5f75e37c73fbd7f8bc7cf7055c7c777b859707c
$ docker port b73
443/tcp -> 0.0.0.0:32768
80/tcp -> 0.0.0.0:32769
$ curl `docker-machine ip`:32769
welcome to nginx.
$ docker exec -it b735b0d335b2 bash
oot@b735b0d335b2:/# cd /var/log/nginx/                                                                                                    
root@b735b0d335b2:/var/log/nginx# tail -F access.log
192.168.99.1 - - [02/Jul/2016:11:14:46 +0000] "GET / HTTP/1.1" 200 18 "-" "curl/7.43.0" "-" # これはcurlで
192.168.99.1 - - [02/Jul/2016:11:18:52 +0000] "GET / HTTP/1.1" 200 18 "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36" "-" # これはブラウザから
^C
root@b735b0d335b2:/var/log/nginx# exit
exit
$ mkdir backup
$ docker run -v `pwd`/backup:/backup --volumes-from logdata ubuntu:14.04 tar czvf /backup/nginx.log.tar.gz /var/log/nginx # ホストのディレクトリをマウントしたボリュームにtarを配置
/var/log/nginx/
/var/log/nginx/access.log
/var/log/nginx/error.log
tar: Removing leading `/' from member names
$ tar tvzf backup/nginx.log.tar.gz # ホストから確認できる
drwxr-xr-x  0 root   root        0  7  2 20:13 var/log/nginx/
-rw-r--r--  0 root   root      736  7  2 20:18 var/log/nginx/access.log
-rw-r--r--  0 root   root      268  7  2 20:18 var/log/nginx/error.log
```
