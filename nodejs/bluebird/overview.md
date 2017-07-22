# bluebird
Promise/A+に準拠したPromiseライブラリ。

JS標準のPromiseにはない便利な機構が存在する。

# 便利な機構
## error catch時のフィルタリング
ほかの言語でよくある

```
try {
  doSomething();
} catch (ValidationError error) {
  // doHandling for validation error
} catch (error) {
  // doHandling for error
}
```

# API
## Promise.coroutine
generator/yieldと組み合わせることで、非同期の中で同期的に処理をかける。

引数としてgeneratorの関数を渡す
cf. http://bluebirdjs.com/docs/api/promise.coroutine.html