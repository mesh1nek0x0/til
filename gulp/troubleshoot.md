# gulpに関するトラブルシュート

## ファイルのaddedやrenameをwatchできない
quickstart.mdでも触れたけど、

> The type of change that occurred, either added, changed, deleted or renamed.

にもかかわらず"added"や"renamed"というイベントが反応しない。。。

調べてみたら興味深いissueを発見した。どうも./から始めるとwatchしてくれないらしい。へぇ〜。

cf. https://github.com/sindresorhus/gulp-ruby-sass/issues/11

watchするパスを変更して...
```
gulp.watch('monitoring/*.log', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});
```

### let's try
```
---@gulp-window
$ mkdir monitoring
$ gulp
(node:3617) fs: re-evaluating native module sources is not supported. If you are using the graceful-fs module, please update it to a more recent version.
[14:03:31] Using gulpfile ~/Documents/til/gulp/gulpfile.js
[14:03:31] Starting 'default'...
hello gulp!!!
[14:03:31] Finished 'default' after 120 μs
---@another-window
$ echo foo > monitoring/monitoring.log # change
$ echo foo > monitoring/2nd-monitoring.log # add
$ rm monitoring/monitoring.log # delete
$ mv monitoring/2nd-monitoring.log monitoring/`date +%Y%m%d`-monitoring.log # rename
$ cp monitoring/20160811-monitoring.log monitoring/monitoring.log # copy
---@gulp-window
File /Users/iida-ryota/Documents/til/gulp/monitoring/monitoring.log was changed, running tasks...
File /Users/iida-ryota/Documents/til/gulp/monitoring/2nd-monitoring.log was added, running tasks...
File /Users/iida-ryota/Documents/til/gulp/monitoring/monitoring.log was deleted, running tasks...
File /Users/iida-ryota/Documents/til/gulp/monitoring/2nd-monitoring.log was deleted, running tasks... # ファイル削除のイベントも起きるのね
File /Users/iida-ryota/Documents/til/gulp/monitoring/20160811-monitoring.log was renamed, running tasks...
File /Users/iida-ryota/Documents/til/gulp/monitoring/monitoring.log was added, running tasks... # copyは追加と同じ
^C
```

### 根本原因
gulpがファイルのワイルドカード読み込みに使っている node-globというパッケージに以下のような説明があった。

>Dots
>If a file or directory path portion has a . as the first character, then it will not match any glob pattern unless that pattern's corresponding path part also has a . as its first character.
>For example, the pattern a/.*/c would match the file at a/.b/c. However the pattern a/*/c would not, because * does not start with a dot character.

* .から始まるpathを指定しても思う通り動作しないよ
* でも.を文字列としてなら対応してるよ

e.g.

| パターン | a/.b/cにマッチ... |
|-|-|
|a/.*/c|する|
|a/*/c |しない|

たぶん'.~'と続く隠しファイルを拾わないためなのかな〜

cf. https://github.com/isaacs/node-glob
