# troubleshooting
## クラス内でPromiseするとthisのスコープが変わる
アロー（=>）でつなぐと解決しました。

どうもnew Promise(function (resolve, reject) {})...という形で書いてしまうとスコープがずれる模様。
```
$ node scope-change-in-promise.js
Promise { 'Hoge scope' }
Promise {
  <rejected> TypeError: Cannot read property 'foo' of undefined
  ....
```
cf. http://qiita.com/clockmaker/items/7ba6e12260c12ea571dc