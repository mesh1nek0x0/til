# 言わずと知れた置換コマンドtips
## TABの指定（mac）
* Ctrl+v -> Tab

Ctrl+vを入力することで、補完とは区別される模様

※ただし、この場合コピペでは意図通り動作しない

### e.g. tsv -> csv
```bash
$ cat user.tsv
男	10代	関東	無	有	有	学生
女	20代	関西	有	無	有	会社員
男	30代	中部	無	有	無	自営業
女	20代	北陸	無	有	無	会社員
# Ctrl+v -> Tabで入力
$ sed -e 's/      /,/g' user.tsv > user.csv
$ cat user.csv
男,10代,関東,無,有,有,学生
女,20代,関西,有,無,有,会社員
男,30代,中部,無,有,無,自営業
女,20代,北陸,無,有,無,会社員
# コマンドをコピペして実行
$ sed -e 's/      /,/g' user.tsv > user.csv
$ cat user.csv
男	10代	関東	無	有	有	学生
女	20代	関西	有	無	有	会社員
男	30代	中部	無	有	無	自営業
女	20代	北陸	無	有	無	会社員
```

## 上書き指定(-i)
ただし、GNUのsedのみらしいので注意。


```
# 適当なファイルを作る
$ echo 'hoge piyo' > test.txt
$ cat test.txt
hoge piyo
# 通常は標準出力なので元ファイルはそのまま
$ sed -e 's/piyo/hogera/g' test.txt
hoge hogera
$ cat test.txt
hoge piyo

# -iをつけると元ファイルを上書き
$ sed -i -e  's/piyo/hogera/g' test.txt
$ cat test.txt
hoge hogera

# なお、バックアップはちゃんと作られる模様
$ cat test.txt-e
hoge piyo

# バックアップの拡張子も指定できる
$ sed -i.bak -e  's/hogera/piyo/g' test.txt

$ cat test.txt.bak
hoge hogera
$ cat test.txt
hoge piyo
```
