# 実装サンプル007
ならうよりなれろ精神

```
$ cat declaration.js
var IP_ADDRESS = 'localhost';
var PORT       = '8080';
var startServer = function () {
  console.log("Server is Running at http://" + IP_ADDRESS + ":" + PORT);
};

var http = require("http");

var server = http.createServer();

server.on('request', function (req, res) {
  console.log(req.url);
  res.writeHead(200, {"Content-Type": "text/plain"});
  res.end("hello from 007 at :" + req.url);
});


server.listen(PORT, IP_ADDRESS, startServer);

$ node declaration.js
Server is Running at http://localhost:8080

$ curl localhost:8080 # 別のウィンドウから実行
hello from 007 at :/
$ curl localhost:8080/hogepiyo # 別のウィンドウから実行
hello from 007 at :/hogepiyo

## 以下はnode declaration.js を実行したウィンドウに出ているserver.onのconsole.log
/
/hogepiyo
```

## server.listen(port[, hostname][, backlog][, callback])
指定のポート、ホストでコネクションを受け付けます宣言。

hostは省略すると可能ならipv6の::、ダメならipv4の0.0.0.0をわり当てるそうな。

ポートに0を指定すると、OS側で利用できるポートを割てる模様

backlogやcallbackは今回使っていなさそうなので割愛

cf. https://nodejs.org/api/http.html#http_server_listen_port_hostname_backlog_callback
