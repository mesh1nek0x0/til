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
