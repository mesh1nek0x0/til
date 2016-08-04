# 実装サンプル013
ならうより慣れろ、よく続きますね。

```
$ cat parse.js
var http    = require("http");
var url     = require("url");
var setting = require('./setting');

var server = http.createServer();

server.on("request", function(req, res) {
  res.writeHead(200);;

  var parsedUrl = url.parse("http://" + setting.IP + ":" + setting.PORT + req.url);

  Object.keys(parsedUrl).forEach(function (key) {
    console.log(key + " : " +parsedUrl[key]);
  });

  switch (parsedUrl.pathname) {
    case "/":
      res.write("top.");
      break;
    case "/test":
      res.write("test.");
      break;
    default:
      res.write("404.");
      break;
  }

  res.end();
});

server.listen(setting.PORT, setting.IP, setting.startServer);

$ node parse.js
Server is running at http://localhost:8080
## 他のウィンドウからcurl localhost:8080/test?hoge=fooすると...
protocol : http:
slashes : true
auth : null
host : localhost:8080
port : 8080
hostname : localhost
hash : null
search : ?hoge=foo
query : hoge=foo
pathname : /test
path : /test?hoge=foo
href : http://localhost:8080/test?hoge=foo

```

## URL
今回のメインディッシュURLオブジェクト。parseするとURLからいろんな値が取れる。

公式の図が大変わかりよい。こういう値が取れます。いいですね。

protocolも取れるしbasic認証のauthも解析できるごいす〜！

cf. https://nodejs.org/api/url.html#url_url

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                    href                                     │
├──────────┬┬───────────┬─────────────────┬───────────────────────────┬───────┤
│ protocol ││   auth    │      host       │           path            │ hash  │
│          ││           ├──────────┬──────┼──────────┬────────────────┤       │
│          ││           │ hostname │ port │ pathname │     search     │       │
│          ││           │          │      │          ├─┬──────────────┤       │
│          ││           │          │      │          │ │    query     │       │
"  http:   // user:pass @ host.com : 8080   /p/a/t/h  ?  query=string   #hash "
│          ││           │          │      │          │ │              │       │
└──────────┴┴───────────┴──────────┴──────┴──────────┴─┴──────────────┴───────┘
```

### url.parse(urlString[, parseQueryString[, slashesDenoteHost]])
今回はurlStringだけでしたが、parseQueryString(boolean)を指定するとqueryの部分もparseしてくれるらしい

```
$ node parse.js
Server is running at http://localhost:8080
protocol : http:
slashes : true
null
host : localhost:8080
port : 8080
hostname : localhost
null
search : ?hoge=foo
{ hoge: 'foo' } # ちゃんとオブジェクトが表示されている！
pathname : /test
path : /test?hoge=foo
href : http://localhost:8080/test?hoge=foo
```

slashesDenoteHost(boolean)はよくわからない。実行してみたけど結果に差分がないように見える。

説明には以下のとおりあるが、結果の差が不明。使いどころも不明
//foo/bar を { pathname: '//foo/bar' } ではなく { host: 'foo', pathname: '/bar' } したいときにtrueにしてね！

```
$ node parse.js
Server is running at http://localhost:8080
## curl http://localhost:8080//test/poyo?hoge=foo を実行
protocol : http:
slashes : true
null
host : localhost:8080
port : 8080
hostname : localhost
null
search : ?hoge=foo
{ hoge: 'foo' }
pathname : //test/poyo # なってへんがな!!!
path : //test/poyo?hoge=foo
href : http://localhost:8080//test/poyo?hoge=foo
```

cf. https://nodejs.org/api/url.html#url_url_parse_urlstring_parsequerystring_slashesdenotehost
