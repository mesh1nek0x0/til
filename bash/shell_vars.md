# シェル変数のtips

## IFS
ループの時などにお世話になる。
上書きした時は元に戻そうね。

 > 内部フィールド区切り文字 (Internal Field Separator)
 > 展開を行った後に単語を分割する場合や、組み込みコマンドの read を使ったときに行を単語に分割する場合に使われます。
 > デフォルト値は ``<空白><タブ><改行>'' です。

```
#!/bin/bash
a="foo bar buzz"
for i in `echo $a`;do echo ${i}---; done
(IFS=$'\n';for i in `echo $a`;do echo ${i}---; done)
---
# デフォルトはスペースで区切られてしまう
foo---
bar---
buzz---
# 改行指定にすると１つの扱いになる
foo bar buzz---
```
