# 実装サンプル009
ならうよりなれろ精神

```
$ cat setting.js
exports.IP   = "localhost";
exports.PORT = 8080;
exports.startServer = function () {
  console.log("server is running at http://" + exports.IP + ":" + exports.PORT);
}

$ cat includefile.js
var http    = require("http");
var setting = require("./setting.js"); // load

var server = http.createServer();

server.on("request", function(req, res) {
  console.log(req.url);
});

server.on("request", function(req, res) {
  res.writeHead(200, {"Content-Type": "text/plain"});
});

server.on("request", function(req, res) {
  res.end("hello from 009 @" + req.url);
});

server.listen(setting.PORT, setting.IP, setting.startServer);

```

## exportsとは？
CommonJSに準拠したモジュールの定義を行うためのもの。

今の段階のイメージでは、C言語でいうヘッダー的なイメージ。

ここに定義を追加すると、requireで読み込める仕組みのようだ。

```
$ cat exports-sample.js
var add = require('./exports-included.js'); # requireはディレクトリ指定で複数読み込めるらしい
console.log(add(1, 5));
$ cat exports-included.js
module.exports = function (a, b) {
  return a + b;
};
$ node exports-sample.js
6
```

### exportsをオブジェクトで定義する
```
$ cat exports-obj-included.js
module.exports = {
  add: function (a, b) { // functionName: という書式な模様
    return a + b;
  },

  minus: function (a, b) {
    return a - b;
  }
}

$ cat exports-obj-sample.js
var math = require('./exports-obj-included.js');

console.log(math.add(5, 5));
console.log(math.minus(6, 3));

$ node exports-obj-sample.js
10
3

## なお、こうもかける
module.exports.add = function (a, b) {
  return a + b;
};

module.exports.minus = function (a, b) {
  return a - b;
};

```

### module.exportsとexportsの違い
見た目はmemcacheとmemcachedみたいでやだな。

なにやらざっと見る感じ、exportsはmodule.exportsの参照のようで

迷う場合はmodule.exportsを使いなさい的なことを言われている。今は従おう。

うむ、いまいちわかならい

```
exports = module.exports = {};
```

こういうイメージらしいので

> exportsを置き換えるような書き方をすると、
> module.exportsへの参照が切れてしまうだけで、exportsへ設定した値は公開されません。

だそうな。module.exportsを使いなさいというのはきっとそういうことだろう。

cf. [[teratail]Node.js module.exportsと exportsの違いについて](https://teratail.com/questions/17247)
