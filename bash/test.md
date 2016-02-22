# bashのif文で役立つtestコマンド

## overview
評価コマンドです。条件を渡してあげて0（真）か1（偽）を返します。
if文で書くときは省力して?以下のような[  ]を使った書き方も可能。
どっちかというとbashではこっちを良く見かける。


```
if [ (CONDITION) ] ; then
```

※あくまでコマンドの省略系なので、[のあとにスペースが必要です！
また、数値と文字列では比較の仕方が違うのでPHPerは要注意。


## 数値の比較
 数学記号ではなく、以下のような略語。
由来を覚えておけば大丈夫。

* -eq : equal (==)
* -ne : not equal (!=)
* -lt : less than (<)
* -le : less than or eqaual (<=)
* -gt : greater than (>)
* -ge : greater than or equal (>=)

## 文字列の比較
* =  : equal
* != : not equal

## ファイルの比較もできる
TODO:追って学習する@2016-02-22
