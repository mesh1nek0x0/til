# ttyコマンド
端末の名前を出してくれるコマンドです。端末じゃないときは端末じゃないよと教えてくれます。

## usage
オプションは一個しかないです。
```
tty [option]
```

端末かどうかでexit statusが異なります。

* 端末である:0
* 端末じゃない:1

## quick start
これだけで使うことはあんまりなさそうですが...
```
### 端末から実行した場合
$ tty; echo $? # $?は最後のexit statusが入っています
/dev/ttys000
0

### パイプから実行された場合
$ echo hoge | tty; echo $?
not a tty
1
```

## コマンドの種類
これはビルドインコマンドはないようですね。
```
$ type -a tty
tty is /usr/bin/tty
```
