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

## tips
-sオプションを使うとreadへの入力はechoされない（パスワード入力などに使う）ので便利ですが

Enterはreadに含まれるため、ちょっと工夫しないと表示がいけてない感じになります。

```
### 工夫もした場合
$ read -p 'type pass:' -s pass; echo ; echo -e "pass is $pass"
type pass:
pass is hoge

### -sありだけの場合
$ read -p 'type pass:' -s pass; echo -e "pass is $pass"
type pass:pass is pass # pass is ...は改行されてほしい...

### -sなしだけの場合
$ read -p 'type pass:' pass; echo -e "pass is $pass"
type pass:hoge
pass is hoge
```

※ただし、パイプでつなぐとecho一つだと今度は改行が多くなってしまうため以下のようにするとよいようです。
```
tty -s && echo ;
```

## コマンドの種類
内部コマンドも内部コマンドも外部コマンドもあるようです。
```
$ type -a read
read is a shell builtin
read is /usr/bin/read
```
