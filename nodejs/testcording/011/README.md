# ならうよりなれろ
実装サンプル011

```
$ node print-req-header.js
server is running at http://localhost:8080

$ curl localhost:8080/foo # 別窓からcurl
URL :/foo
Method :GET
host : localhost:8080
user-agent : curl/7.43.0
accept : */*

## ブラウザからアクセスすると...たくさん出る
URL :/index
Method :GET
host : localhost:8080
connection : keep-alive
upgrade-insecure-requests : 1
user-agent : Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36
accept : text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
accept-encoding : gzip, deflate, sdch
accept-language : ja,en-US;q=0.8,en;q=0.6

$ cat print-req-header.js
var http    = require("http");
var setting = require("./setting.js");

var server = http.createServer();

server.on("request", function(req, res) {
  res.writeHead(200);
  res.write("URL :" + req.url + "\n");
  res.write("Method :" + req.method + "\n");

  Object.keys(req.headers).forEach(function (key) {
    res.write(key + " : " + req.headers[key] + "\n");
  });
  res.end();
});

server.listen(setting.PORT, setting.IP, setting.startServer);
```

## Object.keys(obj)
> returns an array of a given object's own enumerable properties
> 自身の列挙可能なプロパティが返されるオブジェクトです。

自身の列挙可能...と難しく見えるけど、要は引数に指定したオブジェクト自身のプロパティのみを返却してくれるとのこと。

親クラス...という言い方がjsの中で正しいかはわかりませんが、親の要素はここでは参照されないようです。

> まず紹介するのがenumerable属性です。日本語にすると「数えられる」とかそういう感じです。これは論理属性（trueかfalse）で、enumerableがfalseの属性はfor-in文やObject.keysで列挙されないのです。

むむ、またややこしいのが出てきた。enumerableというプロパティがあるそうだ。enumerable = falseのものは列挙されないと...。

とりあえず、現時点ではメソッドは"列挙されない"という認識にしましょうかね。

具体的には配列が返る模様です。

cf. https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
cf. http://js.studio-kingdom.com/javascript/object/keys


## arr.forEach(callback[, thisArg])
見た感じ、配列の要素を１つ１つに対してcallbackを実行してくれそうな感じです。

ただし、省略した場所は実行されないようです、ふむふむ。

callbackの方にも、currentValue, indexという引数順があるみたい。

```
$ cat for-each.js
[2, 5, , 9].forEach(function (value, index) {
  console.log(index + " : " + value);
});
$ node for-each.js
0 : 2 # 配列のindex:valueという形になっている
1 : 5
3 : 9
```
