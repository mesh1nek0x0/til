# コーディングサンプル016
習うより慣れろ精神

今回は非常にシンプルで書くことが少ない。いいことですね。

```
$ cat response.js
var http    = require('http');
var setting = require('./setting');

var server = http.createServer();

server.on("request", function(req, res) {
  res.writeHead(200, setting.HEADER);
  res.write("<html><body>test data</body></html>");
  res.end();
});

server.listen(setting.PORT, setting.IP, setting.startServer);
```


## response.writeHead(statusCode, [reasonPhrase], [headers])
レスポンスヘッダに書き込める。

* statusCode:e.g. 200 OK, 404 not foundの３桁のコード
* reasonPhrase:たぶん OK とか not foundのことだろうな〜
* headers:実際のヘッダーの中身

res.endの前に呼ばなきゃダメとのこと！呼んでも暗黙的に実行されるらしい。

try reasonPhrase！第二引数にhogeeeといれてみた
```
$ curl -v -X POST http://localhost:8080 --data 'foo=value&hoge=piyo'
* Rebuilt URL to: http://localhost:8080/
*   Trying ::1...
* connect to ::1 port 8080 failed: Connection refused
*   Trying fe80::1...
* connect to fe80::1 port 8080 failed: Connection refused
*   Trying 127.0.0.1...
* Connected to localhost (127.0.0.1) port 8080 (#0)
> POST / HTTP/1.1
> Host: localhost:8080
> User-Agent: curl/7.43.0
> Accept: */*
> Content-Length: 19
> Content-Type: application/x-www-form-urlencoded
>
* upload completely sent off: 19 out of 19 bytes
< HTTP/1.1 200 hogeee # 成功です！！！
< Content-Type: text/html; charset=UTF-8
< Date: Sat, 06 Aug 2016 14:49:52 GMT
< Connection: keep-alive
< Transfer-Encoding: chunked
<
* Connection #0 to host localhost left intact
<html><body>test data</body></html>
```

## response.write(chunk[, encoding][, callback])
レスポンスボディを書き込むときに使います。

* chunk:かたまりという意。String または Buffer型を指定できる。書き込む文字列やそれを格納したBuffer
* encoding:デフォルトはUTF-8

注意したいのは何度も呼び出せる、ということです。分割して送信するけど最終的には１つのレスポンス、という扱い。

```
## こうかくと...
res.write("<html><body>");
res.write("test data");
res.write("</body></html>");
---
## 繋がって出てくる
$ curl localhost:8080/foo
<html><body>test data</body></html>
```

cf. https://nodejs.org/api/http.html#http_response_write_chunk_encoding_callback

## response.end([data][, encoding][, callback])
レスポンスの終了の合図！

dataを指定する場合、res.write(data, encoding) -> res.end()とするのと同意

cf. https://nodejs.org/api/http.html#http_response_end_data_encoding_callback
