# 実装サンプル002
ならうよりなれろ精神

```
$ cat server-start-log.js
var http = require("http");
http.createServer(function (req, res) {
   res.writeHead(200, {"Content-Type": "text/plain"});
   res.end("hello from 002\n");
}).listen(8080, "localhost", function() {
    console.log("Server runninng at http://localhost:8080");
});
$ node server-start-log.js
Server runninng at http://localhost:8080 # 起動時のログとしてでてる！
$ curl localhost:8080 # 別ウィンドウより
hello from 002 # ちゃんと意図したメッセージがでてる！
```

# server.listen(port[, hostname][, backlog][, callback])
前回も出てきた。引数の位置的にはbacklogなんですが、ドキュメントに書いてある説明とはなんか違う感じ。最後のcallbackとして動いているわけでもなさそう。

コールバックの関数が実行されてその結果が代入されているだけかな？
// 正しい使い方ではない気がする。
> Backlog is the maximum length of the queue of pending connections. The actual length will be determined by your OS through sysctl settings such as tcp_max_syn_backlog and somaxconn on linux. The default value of this parameter is 511 (not 512).

cf. https://nodejs.org/api/http.html#http_server_listen_port_hostname_backlog_callback

# console.log
nodeを実行したwindowの方にログが出ます。
