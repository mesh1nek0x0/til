# 便利なsortに関するtips

## エンコード違いやマルチバイト文字列をsortするとき
> デフォルトのロケールがUTF-8の環境で、euc-jpで作成されたファイルをソートしようとすると
> (無理やりUTF-8として解釈しようとするため?)変な順番になったりすることもある
らしい

そういうときはLC_ALL=Cを指定するとよい。
日本語で解釈せずにデフォルトのロケール（英語？）が使用されるらしい。

```bash
$ LC_ALL=C date
Wed Apr  6 00:08:27 JST 2016
$ date
2016年 4月 6日 水曜日 00時08分31秒 JST
$

# 指定なしだとエラーが出る
sort word.list
sort: string comparison failed: Illegal byte sequence
sort: Set LC_ALL='C' to work around the problem.
# 指定があればエラーは出ない
LC_ALL=C sort word.list
```
