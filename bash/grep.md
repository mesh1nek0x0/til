# grep tips
## 特定のワードを抜き出す
正規表現と組み合わせるととてもつよい

-o, --only-matching

sample-access.log
```
127.0.0.1 - frank [10/Oct/2000:13:55:36 -0700] "GET /apache_pb.gif HTTP/1.0" 200 2326
127.0.0.1 - frank [10/Oct/2000:13:55:36 -0700] "GET /apache_pb.gif HTTP/1.0" 200 2326
```
e.g. IPアドレス形式っぽいワードを抽出
```
$ grep -o -E '[0-9]+(\.[0-9]+){3}' sample-access.log 
127.0.0.1
127.0.0.1
# egrepでもOK
$ egrep -o '[0-9]+(\.[0-9]+){3}' sample-access.log

```
