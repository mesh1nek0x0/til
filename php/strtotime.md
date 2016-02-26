# strtotimeでunix timestampを扱うために
dateのようにそのまま渡しても認識されません。
@をつける必要があります。

以下は、挙動を確認するためのサンプルです。

cf. [複合的な書式](http://php.net/manual/ja/datetime.formats.compound.php)

## 検証コード

```
<?php
echo "@はただのフォーマットを示す文字なので何も出ない", PHP_EOL;
echo "strtotime : ".strtotime("@"), PHP_EOL;
// ここで日付が出るのは、デフォルトが採用されているからです。
echo "date      : ".date('Y-m-d H:i:s', strtotime("@")), PHP_EOL;
echo "---", PHP_EOL;
echo "後ろに数字が続くのでフォーマットとして認識される", PHP_EOL;
echo "strtotime : ".strtotime("@" . 1456197973), PHP_EOL;
echo "date      : ".date('Y-m-d H:i:s', strtotime("@" . 1456197973)), PHP_EOL;
echo "---", PHP_EOL;
echo "\"@\"\"-\"? [0-9]+にある-（ハイフン）を入れるとエポックより前の表現", PHP_EOL;
echo "strtotime : ".strtotime("@-" . 1456197973), PHP_EOL;
echo "date      : ".date('Y-m-d H:i:s', strtotime("@-" . 1456197973)), PHP_EOL;
echo "---", PHP_EOL;
echo "数字だけでは、変換できない", PHP_EOL;
echo "strtotime : ".strtotime("1456197973"), PHP_EOL;
// ここで日付が出るのは、デフォルトが採用されているからです。
echo "date      : ".date('Y-m-d H:i:s', strtotime("1456197973")), PHP_EOL;
echo "---", PHP_EOL;

echo "でもdateコマンドは数字だけでもOK", PHP_EOL;
echo "date(int) : ".date('Y-m-d H:i:s', 1456197973), PHP_EOL;
echo "date(str) : ".date('Y-m-d H:i:s', "1456197973"), PHP_EOL;
echo "---", PHP_EOL;
```

## 実行結果

```
@はただのフォーマットを示す文字なので何も出ない
strtotime : 
date      : 1970-01-01 09:00:00
---
後ろに数字が続くのでフォーマットとして認識される
strtotime : 1456197973
date      : 2016-02-23 12:26:13
---
"@""-"? [0-9]+にある-（ハイフン）を入れるとエポックより前の表現
strtotime : -1456197973
date      : 1923-11-10 05:33:47
---
数字だけでは、変換できない
strtotime :
date      : 1970-01-01 09:00:00
---
でもdateコマンドは数字だけでもOK
date(int) : 2016-02-23 12:26:13
date(str) : 2016-02-23 12:26:13
---
```
