# curlにまつわるtips

## POSTしたい
-X (--request) COMMANDでパラメータは-d(--data)以降に記載
```
curl -X POST http://localhost:8080 --data 'foo=value&hoge=piyo'
```
## 詳細な情報を表示したい
-v(--verbose) オプションを使うとやり取りの様子がわかります
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
< HTTP/1.1 200 hogeee
< Content-Type: text/html; charset=UTF-8
< Date: Sun, 07 Aug 2016 07:35:50 GMT
< Connection: keep-alive
< Transfer-Encoding: chunked
<
* Connection #0 to host localhost left intact
```
