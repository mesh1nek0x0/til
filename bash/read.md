# readコマンド
標準入力を待ち受けるやつです。正式にはファイルディスクリプタから読み込むコマンド。

## usage
標準入力で受け取った値をargsに突っ込みます。

オプションを指定することで、時間制限や入力をechoしない（password入力とか）こともできる
```
read [options] [args ...]
```

## quick start
ワンライナーで使うことはそうそうなさそうですが、こういう感じで使えます。

```
### オプション無しバージョン
$ read msg; echo -e "msg is $msg"
piyo
msg is piyo
```

```
### オプションありバージョン（prompt表示+3秒入力待ち）
$ read -p 'type msg:' -t 3 msg; echo -e "msg is $msg"
type msg:hoge
msg is hoge
```

## コマンドの種類
内部コマンドも内部コマンドも外部コマンドもあるようです。
```
$ type -a read
read is a shell builtin
read is /usr/bin/read
```
