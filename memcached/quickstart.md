# quickstart

## [local]<->[memcached on docker-my/image]編

### 方針
アプリケーションとの連携はさておき、docker上にmemcachedサーバをたてて、local(mac)からデータを入れたり出したりしてみる

centosのイメージがあるので、このイメージをベースに上にmemcachedを載せてみましょうかね。

（わざわざyum installするだけならdockerじゃなくもいい気もするけどね！）

```
$ docker images | grep cent
centos              latest              67591570dd29        2 months ago        192 MB
```

▼dockerfileを作ります

* 起動はmemcached
 * オプションはいろいろある見たいだけど公式のdockerfileには指定がないのでとりあえずそのままやってみよう

```
$ docker build -t mesh1neko/memcached-centos:1.0 .
$ docker images | grep mem
mesh1neko/memcached-centos   1.0                 d45aca8d48f1        8 minutes ago       383 MB
```

▼コンテナを立てます
```
$ docker run -d -p 11211:11211 mesh1neko/memcached-centos:1.0
277b70e1002afa063afbbc87c0c135432a5c55b9c2214002e7e314397fc6f908

```

▼データ操作サンプル-基本
SET方法
```
set <key> <compress-flag> <expire> <size>
<value>
```

GET方法
```
get <key>
```

データをsetしてgetしてみます（あるものないもの）
```
$ telnet localhost 11211
Trying ::1...
Connected to localhost.
Escape character is '^]'.
set hoge 0 0 3

123
STORED
get hoge
VALUE hoge 0 3
123
END
get hogera
END
quit
Connection closed by foreign host.
```

▼データ操作サンプル-応用
データの更新まわり

* setは存在するとそのまま上書きされます。
* keyがあった場合のみ上書きするのはreplace
 * keyが存在しなかった場合 `NOT_STORED`
* CAS（Check And Set）によるアトミックな更新ができる。単純な更新でない。
 * getsで取得すると末尾に数字（CAS値）がつき、この値を指定して更新を指定する
 * すでにこのCAS値が使用されている場合は更新できない

replace方法
```
replace <key> <compress-flag> <expire> <size>
```

e.g. replace
```
$ telnet localhost 11211
Trying ::1...
Connected to localhost.
Escape character is '^]'.
set foo 0 0 3
123
STORED
get foo
VALUE foo 0 3
123
END
set foo 0 0 3
456
STORED
get foo
VALUE foo 0 3
456
END
replace hoge 0 0 3
123
NOT_STORED
replace foo 0 4
ERROR
replace foo 0 0 4
1234
STORED
get foo
VALUE foo 0 4
```

cas方法
```
gets <key>
cas <key> <compress-flag> <expire> <size>
<value>
```

e.g. cas
```
gets foo
VALUE foo 0 4 7
1234
END
cas foo 0 0 4 7
6789
STORED
gets foo
VALUE foo 0 4 8
6789
END
cas foo 0 0 4 7
1234
EXISTS
```