# 実装サンプル005
ならうよりなれろ精神

004はコメントの書き方だったので飛ばした

```
$ cat show_request_url.js
var IP_ADDRESS = 'localhost';
var PORT       = '8080';

var http = require("http");

http.createServer(function (req, res) {
    console.log(req.url);
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("hello from 005 URL@" + req.url + "\n");
}).listen(PORT, IP_ADDRESS, function () {
    console.log("Server is running at http://" + IP_ADDRESS + ":" + PORT + "/");
});
$ node show_request_url.js
Server is running at http://localhost:8080/
/
/ # ブラウザからアクセス
/favicon.ico # ブラウザからアクセスするとfaviconの読み込みもあるみたい
/index
/favicon.ico
/index.html # これはcurlでのアクセス

$ curl localhost:8080 # ここからは別のウィンドウ
hello from 005 URL@/
$ curl localhost:8080/index.html
hello from 005 URL@/index.html
```

## request.url
リクエストのURLを取得できる模様。ドメイン以降が取得できるようです。

パースするときは別途専用のメソッド？を利用する。
