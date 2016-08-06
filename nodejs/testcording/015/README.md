# 実装サンプル015
ならうより慣れろシリーズ

014で気になって調べてしまったのでわりとサクサク

レスポンスがちゃんと返るように加筆してます

```
$ cat post-parse.js
var http = require('http');
var querystring = require('querystring');
var setting = require('./setting');

var server = http.createServer();

server.on("request", function(req, res) {
  if (req.method === "POST") {
    var data = "";
    req.on("readable", function() {
      data += req.read();
    });

    req.on("end", function() {
      var query = querystring.parse(data);

      if (query.foo == "value") {
        console.log("foo is : " + query.foo);
      } else {
        Object.keys(query).forEach(function (index) {
          console.log(query[index] + "@" + index);
        });
      }
    });
  }

  res.writeHead(200);
  res.write("req end\n");
  res.end();
});

server.listen(setting.PORT, setting.IP, setting.startServer);
---@nodejs-window
$ node post-parse.js
server is running at http://localhost:8080
valuenull@foo # あれ？意図した分岐になっていない。nullがついてるせいだ！
foo is : value # 意図した通りになった！
---@curl-window
$ curl -X POST http://localhost:8080 --data 'foo=value'
req end
$ curl -X POST http://localhost:8080 --data 'foo=value&hoge=piyo'
req end
```

ではここからはquerystringとquerystring.parseについて

## Query String
モジュールの１つで、URLのquery文字列をパースしたり整形したりするユーティリティを提供している

cf. https://nodejs.org/api/querystring.html

### querystring.parse(str[, sep[, eq[, options]]])

* str:parseするクエリ
* sep:クエリの区切り文字、デフォルトは&
* eq:key,valueの区切り文字、デフォルトは=

具体例が早い
```
'foo=bar&abc=xyz&abc=123'
↓
{
  foo: 'bar',
  abc: ['xyz', '123']
}
```

このメソッドで返ってくるObjectはJavaScriptのObjectは継承してないから.toStringや.hashOwnPropertyとかは使えないよ、とのこと。

try it!
```
console.log(query.toString());
---@nodejs-window
$ node post-parse.js
server is running at http://localhost:8080
til/nodejs/testcording/015/post-parse.js:16
      console.log(query.toString()); # エラー出ました！

      TypeError: query.toString is not a function
```
