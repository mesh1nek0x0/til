# 実装サンプル008
ならうよりなれろ精神

```
$ cat eventhandler.js
var IP_ADDRESS = 'localhost';
var PORT       = 8080;

var startServer = function () {
  console.log("Server is running at http://" + IP_ADDRESS + ":" + PORT);
}

var http = require("http");

var server = http.createServer();

server.on("request", function (req, res) {
  console.log(req.url);
});

server.on("request", function(req, res) {
  res.writeHead(200, {"Content-Type": "text/plain"});
});

server.on("request", function(req, res) {
  res.end("hello from 008" + req.url + "\n");
});

server.listen(PORT, IP_ADDRESS, startServer);

$ node eventhandler.js
Server is running at http://localhost:8080
/
/hogepoyo
---
## 別ウィンドウ
$ curl localhost:8080
hello from 008/
$ curl localhost:8080/hogepoyo
hello from 008/hogepoyo
```

## emitter.on(eventName, listener)
これはserverのメソッド？ではないみたい。Eventsクラスの下に属しているようだ。
```
eventName <String> | <Symbol> The name of the event.
listener <Function> The callback function
```
リスナーの配列に、eventNameで指定された指定されたlistenerを追加するぜ！みたいに書いてある。
同じlistenerが追加済みかはどうかはチェックしないらしい。

cf. https://nodejs.org/api/events.html#events_emitter_on_eventname_listener

なお、emitter.addListener(eventName, listener)はonのエイリアスとのこと。

cf. https://nodejs.org/api/events.html#events_emitter_addlistener_eventname_listener

### serverとEventの関係
どうやら、Serverはイベントを発火するのでEventEmitterのインスタンスでもあるよで、
EventEmitterのonメソッドを使えるようだ。

> All objects that emit events are instances of the EventEmitter class.
> These objects expose an eventEmitter.on() function that allows one or more functions to be attached to named events emitted by the object.

イベントを発火する全てのオブジェクトはEventEmitterクラスのインスタンスであり、
eventEmitter.on() functionにより、オブジェクトから発火される名前のついたイベントに関連づけることができる。

cf. https://nodejs.org/api/events.html#events_emitter_on_eventname_listener
