# サンプル実装014
ならうより慣れろ

POSTデータの読み込みですが、ちょっとわかりにくいのでいろいろ加筆

```
$ cat req-post.js
var http = require('http');
var setting = require('./setting');

var server = http.createServer();

server.on("request", function(req, res) {
  console.log("request has come!");
  if (req.method === "POST") {
    var data = "";
    req.on("readable", function() {
      data += req.read();
    });
    req.on("end", function () {
      console.log(data);
    });
  }

  res.writeHead(200);
  res.write("req end.\n");
  res.end();
});

server.listen(setting.PORT, setting.IP, setting.startServer);
--- @nodejs-window
node req-post.js
Server is running at http://localhost:8080
request has come!
hoge=foonull
request has come!
hoge=foo&piyo=barnull # ふむ、毎回nullが末尾につきますね
---@curl-window
$ curl -X POST http://localhost:8080 --data 'hoge=foo'
req end.
$ curl -X POST http://localhost:8080 --data 'hoge=foo&piyo=bar'
req end.
```

どうやらreq.read()で順々によみこむのかな？一部を書き換えて実験してみよう
```
var data = "";
var tmp = "";
req.on("readable", function() {
  if (tmp = req.read()) {
    data += tmp;
  }
});
---@nodejs-window
$ node req-post.js
Server is running at http://localhost:8080
request has come!
hoge=foo&piyo=bar # 意図通りになりました。
```
readableイベント？、endイベント、それからreq.read()について調べます。

## Event: 'readable'
Streamというインターフェースで提供される。ざっと見た感じファイルのデータ読み込みや、リクエストパラメータのデータ読み込みイベントとして使われている模様。

cf. https://nodejs.org/api/stream.html#stream_event_readable

## readable.read([size])
StreamというIFで提供されるAPIの１つ。オプション引数としてsizeを指定できる。size指定はbyte単位で、なしの場合は最後まで読み込む。

``` Return <String> | <Buffer> | <Null> ```

内部のバッファから順次読み込むようです（読み込めない場合にnull）

特に指定がなければBufferのオブジェクトが返却されるらしい。

一応検証
```
console.log(tmp instanceof Buffer);
---@nodejs-window
$ node req-post.js
Server is running at http://localhost:8080
request has come!
true # そのようです！
hoge=foo&piyo=bar&hoge=foo
```

cf. https://nodejs.org/api/stream.html#stream_readable_read_size

## Event: 'end'
これもどうやらStreamインターフェースで提供されるイベントのようですね。

提供するデータがもう無くなった場合に生成されるそうです。

cf. https://nodejs.org/api/stream.html#stream_event_end

## おまけ
getパラメータみたいにurlパースはできないけど、どうやるのか調べてみた。

querystringというモジュールがありました。

> The querystring.parse() method parses a URL query string (str) into a collection of key and value pairs.

cf. https://nodejs.org/api/querystring.html

```
var querystring = require('querystring');
...
var query = querystring.parse(data);
Object.keys(query).forEach(function(key) {
  console.log("key" + ":" + query[key]);
});
---@nodejs-window
$ node req-post.js
Server is running at http://localhost:8080
request has come!
true
hoge=foo&piyo=bar&hoge=foo
key:foo,foo # 意図通りでてますね〜
key:bar
---@curl-window
$ curl -X POST http://localhost:8080 --data 'hoge=foo&piyo=bar&hoge=foo'
req end.
```
