# setコマンド tips
シェルのオプションを設定するコマンドです。

オプションなので使い道がさまざま。

```
# bashのbuilt inコマンド
$ type -a set
set is a shell builtin
```

## 引数の設定しなおし
改めて引数を設定し直すときに使う。
```
$ cat test.sh
#!/bin/bash
echo $1 $2
set -- "hoge piyo"
echo $1 $2

$ ./test.sh foo bar
foo bar
hoge piyo
```
