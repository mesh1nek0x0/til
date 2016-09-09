
## グローバルにインストール
```
$ npm install --global gulp-cli
```


## ローカルにインストールするための準備
```
$ npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg> --save` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
name: (gulp) gulp-sample
version: (1.0.0)
description: glup quick start sample
entry point: (index.js)
test command:
git repository:
keywords: gulp
author: mesh1neko
license: (ISC) MIT
About to write to /Users/iida-ryota/Documents/til/gulp/package.json:

{
  "name": "gulp-sample",
  "version": "1.0.0",
  "description": "glup quick start sample",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "gulp"
  ],
  "author": "mesh1neko",
  "license": "MIT"
}


Is this ok? (yes)
```

## （晴れて）ローカルにインストール
```
local-mesh1neko:gulp[master]$ npm install --save-dev gulp
$ cat package.json
{
  "name": "gulp-sample",
  "version": "1.0.0",
  "description": "glup quick start sample",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "gulp"
  ],
  "author": "mesh1neko",
  "license": "MIT",
  "devDependencies": {
    "gulp": "^3.9.1" # ちゃんと追加された！
  }
}
```

## コマンドも叩ける
よしよし
```
$ gulp -v
[10:28:31] CLI version 1.2.2
[10:28:31] Local version 3.9.1
```

## 試しに実行
nodeのパッケージなので、書き方が特殊とかはないんすね。
```
$ cat gulpfile.js
var gulp = require('gulp');

gulp.task('default', function() {
  console.log('hello gulp!!!');
});

$ gulp
(node:3092) fs: re-evaluating native module sources is not supported. If you are using the graceful-fs module, please update it to a more recent version.
[10:37:58] Using gulpfile ~/Documents/til/gulp/gulpfile.js
[10:37:58] Starting 'default'...
hello gulp!!!
[10:37:58] Finished 'default' after 167 μs
```

いい感じです。
fsモジュールが古いらしいがちゃんと動いている、あとで調べよう。

## watchしてみる
憧れのnodejs再起動を目指して、とりあえずローカルの変更検知から。

```
$ cat gulpfile.js
var gulp = require('gulp');

gulp.watch('./monitored.log', function(event) {
    console.log('File ' + event.path + 'was ' + event.type + ', running tasks...');
});

gulp.task('default', function() {
  console.log('hello gulp!!!');
});

---@another-window

local-mesh1neko:gulp[master]$ mv monitored.log rename-monitored.log

---@gulp-window
$ echo hoge > monitored.log
$ gulp
(node:3237) fs: re-evaluating native module sources is not supported. If you are using the graceful-fs module, please update it to a more recent version.
[10:40:10] Using gulpfile ~/Documents/til/gulp/gulpfile.js
[10:40:10] Starting 'default'...
hello gulp!!!
[10:40:10] Finished 'default' after 172 μs
---@another-window
$ echo foo > monitored.log
$ mv rename-monitored.log monitored.log
$ echo bar > monitored.log # ここからはもうwatchされなかった
$ mv rename-monitored.log monitored.log # 戻してもダメ
$ echo bar > monitored.log # もちろん追記もダメ
---@gulp-window
File /Users/iida-ryota/Documents/til/gulp/monitored.logwas changed, running tasks...
File /Users/iida-ryota/Documents/til/gulp/monitored.logwas deleted, running tasks...
```
できたー！けど疑問が。

### watchの対象範囲は？
deleteされたらwatchされなくなったけど、最初からなくても対象になる？

```
// watchをワイルドカード指定にしてみます
gulp.watch('./*.log', function(event) {
    console.log('File ' + event.path + 'was ' + event.type + ', running tasks...');
});
```

実験！
```
---@gulp-window
$ gulp
(node:3237) fs: re-evaluating native module sources is not supported. If you are using the graceful-fs module, please update it to a more recent version.
[10:40:10] Using gulpfile ~/Documents/til/gulp/gulpfile.js
[10:40:10] Starting 'default'...
hello gulp!!!
[10:40:10] Finished 'default' after 172 μs
---@another-window
local-mesh1neko:gulp[master]$ echo hogera > monitored.log　# これは元からあるのでいける
local-mesh1neko:gulp[master]$ echo foo > 2nd-monitored.log # added されるかと思ったけどされない！
local-mesh1neko:gulp[master]$ echo bar > 2nd-monitored.log # 当然追記もwatchされない
local-mesh1neko:gulp[master]$ echo piyo > monitored.log # これは元からあるのでいける

---@gulp-window
File /Users/iida-ryota/Documents/til/gulp/monitored.logwas changed, running tasks...
File /Users/iida-ryota/Documents/til/gulp/monitored.logwas changed, running tasks...
```
