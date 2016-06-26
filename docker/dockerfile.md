# dcokerfile記述に関するtips
構成の設定ファイル。いわゆるInfrastructure as Code

## 用語
### 命令
Dockerfile内で記述する構成を実際に指示すること。特に頻出するのは以下の通り。
* FROM
* RUN

### FROM命令
* 構築のベースとするイメージを指定する命令
* 複数回指定できる // 意味はあるのか？？

### RUN命令
　行うのは以下のこと。
* コマンドの実行
* ライブラリやパッケージのインストール
* ファイルシステムの変更の記録

RUNのたびに新しいイメージがコミットされるため&&でつないで層を抑えるもよい手段。

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
