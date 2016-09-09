# ファイルを変更したらnodeの再起動を行う！
やってみよう〜！

gulpの導入は../quickstart.mdにて。

## 下準備
### gulpfile.js（タスクリスト）を書く
```
const gulp  = require('gulp');
const spawn = require('child_process').spawn;

var server;

// gulp [default]で実行できるタスク
gulp.task('default', function() {
  console.log("hello from gulp default task!");
});

// gulp server-taskで実行できるタスク
gulp.task('server-task', function() {
  if (server) {
    server.kill('SIGKILL');
  }
  server = spawn('node', ['index.js']);
});

// gulp watch-taskで実行できるタスク
gulp.task("watch-task", ['server-task'], function() { # 開始時にserver-taskを指示
  gulp.watch("index.js", ["server-task"]); # 監視設定と、変化があったときのタスクを記載
});
```
#### child_process.spawn
nodejsでbashのコマンドが使えるようになるらしい。２種類あって、こちらは何度も実行する場合に利用するらしい。すぽーん！


### index.jsを書く
```
const http = require('http');

var server = http.createServer();

server.on('request', function(req, res) { # リクエストがきたら文字列を表示するだけサーバ
  console.log('request has come!');
  res.writeHead(200);
  res.write('hello gulp x nodejs server\n');
  res.end();
});

server.listen(8080, 'localhost', function() {
  console.log('server is starting...');
});
```

## let's try

### defaultのタスクをさせる

```
$ gulp # taskの指定なしだとdefaultが実行される
(node:5022) fs: re-evaluating native module sources is not supported. If you are using the graceful-fs module, please update it to a more recent version.
[22:58:42] Using gulpfile ~/Documents/til/gulp/auto-reload/gulpfile.js
[22:58:42] Starting 'default'...
hello from gulp default task!
[22:58:42] Finished 'default' after 121 μs
---@another-window
$ curl localhost:8080
curl: (7) Failed to connect to localhost port 8080: Connection refused # 当然サーバは起動していない
```

### watch-taskをさせる

```
$ gulp watch-task
(node:4994) fs: re-evaluating native module sources is not supported. If you are using the graceful-fs module, please update it to a more recent version.
[22:58:09] Using gulpfile ~/Documents/til/gulp/auto-reload/gulpfile.js
[22:58:09] Starting 'server-task'... # 最初のサーバ起動タスクが実行
[22:58:09] Finished 'server-task' after 8.34 ms
[22:58:09] Starting 'watch-task'... # 監視が開始
[22:58:09] Finished 'watch-task' after 11 ms
[22:58:20] Starting 'server-task'... # 監視にかかり、ファイルを変更
[22:58:20] Finished 'server-task' after 3.47 ms
---@another-window
$ curl localhost:8080
hello gulp x nodejs server
$ curl localhost:8080
hello gulp x nodejs server
hello gulp x nodejs server # ちゃんと追記した変更が反映されてる！
```
