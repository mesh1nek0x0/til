# 実装サンプル003
ならうよりなれろ精神

```
$ cat variables.js
var IP_ADDRESS = "localhost";
var PORT       = 8080;

var http = require("http");
http.createServer(function (req, res) {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("hello at 003\n");
}).listen(PORT, IP_ADDRESS, function() {
    console.log("Server is running at http://" + IP_ADDRESS + ":" + PORT + "/");
});
$ node variables.js
Server is running at http://localhost:8080/ # 宣言したものが反映されている

$ curl localhost:8080 # 別のウィンドウで実行
hello at 003 # 意図通りの値
```

# 文字列の連結
+でできる。PHPとは違いますね！こっちの方が一般的かな？
