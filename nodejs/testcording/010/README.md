# 実装サンプル010
ならうよりなれろ精神

```
### ファイルがちゃんと存在する場合
$ node isfile-exits.js
server is running @ http://localhost:8080
/hoge

## 別窓からは...
$ curl localhost:8080/hoge
helo from 010@/hoge

### ファイルが存在しない場合
$ node isfile-exits.js
default startServer...
/hoge

## 別窓からは...
$ curl localhost:8080/hoge
curl: (7) Failed to connect to localhost port 8080: Connection refused # 8080でアクセス不可
$ curl localhost:4343/hoge
helo from 010@/hoge # デフォルト設定のportに接続可


# 解説用に読み込む部分だけ
$ head -n 15 isfile-exits.js
var http = require("http");

var path;
try {
  path = require.resolve("./configs.js");
  var config = require(path);
} catch (e) {
  var config = {
    "IP": "localhost",
    "PORT": 4343,
    startServer: function() {
      console.log("default startServer...");
    }
  }
}
...
```
## try {} catch (e) {}構文
存在するのね！ただ、他の言語のtry~catchと同様に考えない方がよさそう。

例外を補足しきれないと、nodeのプロセス自体が落ちてしまうため（JavaなどはTomcatとかがいるから大丈夫なんでしょうね）

非同期処理も相まって、なかなか使いどころが難しい。

## require.resolve()
requireの内部で機械的にモジュールの位置を見つけるために使う。ただし、読み込むというよりも単にfilenameの解決をするだけの模様。

cf. https://nodejs.org/api/globals.html#globals_require_resolve

## {"":"", hoge: function() {}}
こういう書き方をする、というもの。

パッと見普通にJSONっぽくfunctionを要素にぶち込む模様。

JavaScriptのオブジェクトリテラル（オブジェクトの記法とでも呼ぶべきか？）と一緒にしていいのか？
