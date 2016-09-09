# 実装サンプル006
ならうよりなれろ精神

```
$ cat testdata
hoge text in testdata
$ cat file-read.js
var IP_ADDRESS = 'localhost';
var PORT       = '8080';

// module load
var fs   = require('fs');
var util = require('util');

(function test() {
    fs.readFile("./testdata", "utf8", function (err, data) { # nodeを起動している場所からの相対パス
        console.log("Read file ended");
        console.log(data);
    });
    console.log("readFile call End");
    for (var i = 0, len = 10000; i < len; ++i) {
        util.print("."); # なお、utilのprintはもうdeprecatedのため使うとconsole.log使えwarningが発生する
    }
})();
$ node file-read.js
readFile call End # 呼び出しが完了したら次の処理に進んでいる
...................(ry
  (node:1508) DeprecationWarning: util.print is deprecated. Use console.log instead.
  Read file ended # 読み込みが完了したら、実行されている
  hoge text in testdata

```

## fs(File System)
* POSIX標準の単純なラッパー関数として提供され、File I/Oを実現
* 同期型と非同期型があるそうな

### fs.readFile(file[, options], callback)
> ファイル全体の内容を非同期に読み込みます
> Asynchronously reads the entire contents of a file.
cf. https://nodejs.org/api/fs.html#fs_fs_readfile_file_options_callback

### fs.readFileSync(file[, options])
> ファイル全体の内容を同期的に読み込みます

## util
よくあるutilのようだ。
* フォーマット整えたり、ログを出力したり
* DeprecatedになっているAPIもいくつか存在している
