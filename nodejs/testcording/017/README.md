# 実装サンプル017
ならうより慣れろ精神も終盤

今回はおさらいみたいな感じなので補足事項はありません。

強いて挙げるならもとままだと計算結果がNaNになるので、read()の結果からNULLを除くことぐらい。

```
req.on("readable", function() {
  tmp = req.read();
  if (tmp !== null) { // この判定を入れないとパラメータdayの後ろにnullがつく
    req.data += tmp;
  }
});
```
