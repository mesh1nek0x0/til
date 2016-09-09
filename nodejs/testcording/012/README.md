# 実装サンプル012
習うより馴れろ精神

```
$ cat routing.js
var http    = require("http");
var setting = require("./setting.js");

var server = http.createServer();

server.on("request", function(req, res) {
  res.writeHead(200);

  if (req.url == "/") {
    res.write("this is top page.\n");
  } else if (req.url == "/test") {
    res.write("this is test page.\n")
  } else {
    res.write("404\n");
  }

  res.end();
});

server.listen(setting.PORT, setting.IP, setting.startServer());
$ curl localhost:8080/hoge # 別のウィンドウからcurl
404
$ curl localhost:8080/test
this is test page.
$ curl localhost:8080/
this is top page.
```

特に新しい内容はないですね。強いてあげるなら以下のようにswitchでもかけるぐらい

```
switch (req.url) {
  case "/":
    res.write("this is top page.\n");
    break;
  case "/test":
    res.write("this is test page.\n")
    break;
  default:
    res.write("404.\n")
    break;
}
```
