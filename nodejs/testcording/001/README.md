# 実装サンプル
ならうよりなれろ精神

```
$ cat helloworld.js
var http = require("http");

http.createServer(function (req, res) {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("hello world from local nodejs\n");
}).listen(8080, "localhost");

$ curl localhost:8080 # 別ウィンドウから
curl: (7) Failed to connect to localhost port 8080: Connection refused # まだ実行していないので当たり前
$ node helloworld.js # 実行した
$ curl localhost:8080 # これも別ウィンドウから
hello world from local nodejs # 期待通り！
```

# require("http")
nodeのhttpモジュールを読み込んでいる模様

cf. https://nodejs.org/api/http.html

## http.createServer([requestListener])
http.Server.のインスタンスを返すらしい。

> The requestListener is a function which is automatically added to the 'request' event.
引数のrequestListenerはリクエストイベントに自動的に追加されるfunction？

cf. https://nodejs.org/api/http.html#http_http_createserver_requestlistener

### Class: http.Server
```
Event: 'request'
function (request, response) { }
```
なるものが定義されている。createServerで言及されていたのはこれだろう。

* requestはhttp.IncomingMessage.のインスタンス
* responseはhttp.ServerResponse.のインスタンス

cf. https://nodejs.org/api/http.html#http_class_http_server

# response.writeHead(statusCode[, statusMessage][, headers])
レスポンスのヘッダを書き込むよ！というもの。

* statusCodeはHTTPの3桁のもの。e.g. 404
* statusMessageはコードに付随するメッセージ
* 最後のheadersはたぶんレスポンスボディのヘッダー

NOTE:setHeaderとwriteHeadは別物。setHeaderはセットするだけみたい。

cf. https://nodejs.org/api/http.html#http_class_http_serverresponse

# response.end([data][, encoding][, callback])
echoまがいに使っていますがレスポンスヘッダーとボディの送信終わった！という信号を送るものらしい。

dataが指定された場合、このresponse.endに続いてresponse.writeが呼ばれるのと同様のようです。他の２つは今は使われていないので割愛。

cf. https://nodejs.org/api/http.html#http_response_end_data_encoding_callback

# server.listen(port[, hostname][, backlog][, callback])
今回指定されているportとhostnameでリクエスト受け付けます。という感じ。

* hostname省略 -> ipv6の::やipv4の0.0.0.0を割り当てて（使える方）
* portに0指定 -> 空いてるポートを割り当て

cf. https://nodejs.org/api/http.html#http_server_listen_port_hostname_backlog_callback
