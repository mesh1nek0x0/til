# ttyコマンド
端末の名前を出してくれるコマンドです。端末じゃないときは端末じゃないよと教えてくれます。

## usage
オプションは一個しかないです。-sをつけるとexit statusだけ返します。

でも-sオプションはもう非推奨で`test -t 0`が推奨らしい。
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

## 使い方
### 実用的な使い方
-sをつけて端末からの利用かどうかを判定して使う？

### 意味はないけど楽しい使い方
terminalを複数立ち上げて別のterminalに出力を投げることができます。

出力結果を複数の端末に出したりすれば意味は出せそう。

```
$ who
iida-ryota console  Dec 14 20:17
iida-ryota ttys000  Dec 27 23:20
iida-ryota ttys002  Dec 27 23:20
$ tty
/dev/ttys000
```

```
$ tty
/dev/ttys002
```
この状態でttys000からttys0002へ出力を出せます。
```
### ttys000
$ echo 'This is '`tty` > /dev/ttys002
$
```

```
### ttys002
$ This is /dev/ttys000

$
```

## コマンドの種類
これはビルドインコマンドはないようですね。
```
$ type -a tty
tty is /usr/bin/tty
```
