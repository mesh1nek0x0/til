# foreachでハマってしまったので覚書
foreachを使ってループ中の配列を操作する際の注意

## 失敗談
以下はとある動的計画法の解に用いたコードの

成功コードと失敗コードの抜粋です。
```
// foreach-ref-copy.php
// foreachでコピーされた値($value)を参照する場合
<?php
$dp = [30 => 100, 50 => 100, 80 => 200];

list($q, $r) = explode(" ", fgets(STDIN));
foreach ($dp as $key => $value) {
    if (array_key_exists($key + $q, $dp)) {
        $dp[$key + $q] = min($value + $r, $dp[$key + $q]);
    } else {
        $dp[$key + $q] = $value + $r;
    }
}
var_export($dp);
```

```
// foreach-ref-direct.php
// 直接ループ中の配列を参照する($dp[$key])場合
$dp = [30 => 100, 50 => 100, 80 => 200];

list($q, $r) = explode(" ", fgets(STDIN));
foreach ($dp as $key => $value) {
    if (array_key_exists($key + $q, $dp)) {
        $dp[$key + $q] = min($dp[$key] + $r, $dp[$key + $q]);
    } else {
        $dp[$key + $q] = $dp[$key] + $r;
    }
}
var_export($dp);
```

実行結果はこうなる

```
local-mesh1neko:tmp iida-ryota$ php foreach-ref-copy.php
50 50
array (
  30 => 100,
  50 => 100,
  80 => 150,
  100 => 150,
  130 => 250,
)

local-mesh1neko:tmp iida-ryota$ php foreach-ref-direct.php
50 50
array (
  30 => 100,
  50 => 100,
  80 => 150,
  100 => 150,
# 130の値が違う
  130 => 200,
)
```

## 解説
トレースすればよくわかります。コードを読み解くと

入力値50,50がそれぞれ$q, $rに入ります。

$dpの配列に対して、($key + $q)という配列の添字が存在するかチェックします。

存在しなければ、$valueに入力値$rを加算します。

存在した場合は、もともと存在した値と$valueと入力値$rの加算値を比較して

より小さい方で置換しています。

入力値を取得したら、30($key) + 50($q)で$dp[80]にチェックが入ります。

添字80は$dpに存在し、その要素には200が入っていましたが、

$dp[30] + 50 = 150と比較すると、150の方が小さいため

$dp[80] = 150となります。ここまでは問題ありません。

---

ところが、ここで$dp[80]に値を入れてしまった事で

ループを回し始めた時とは違う$dp[80]が入っている状態になります。

そのため、$valueで参照している箇所は、ループ開始時の$dp[80]の値が取れますが

$dp[$key]で参照する場合は、最新の値が取れてしまいます。

もちろん今回はたまたまループ開始時の値を参照する必要があったのに

最新の値をとってしまったことでテストケースをパスできなかっただけです。

どちらの参照の仕方が正しいのかは状況によります。


# まとめ
ループで回している最中の配列は気をつけようね！！！
