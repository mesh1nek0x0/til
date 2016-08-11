# overview

## What is gulp?
![](http://www.codingpedia.org/wp-content/uploads/2014/04/gulp-2x.png)

The streaming build system.

http://gulpjs.com/

簡単にまとめてしまうと、nodejs製タスクランナー。

コーラ？みたいなアイコンでお馴染み。以下の参考リンクが　先行のgruntとの比較もあってわかりやすい。

cf. [5分で導入！ タスクランナーGulpでWeb制作を効率化しよう - ICS MEDIA](https://ics.media/entry/3290)


## コミュニティ
2013/06/30~2016/08/11現在も開発は続いている感じ

https://github.com/gulpjs/gulp/graphs/contributors

### なにができるか？
開発時に、繰り返しやる地味な作業をタスクとして扱い、自動化できる。

* scss -> css コンパイル
* js/cssなどの圧縮
* ファイルコピー
* ファイルの変更を監視（監視 -> コンパイル・圧縮・コピー）

### いいところ
* 記述が短くて済む(grunt比)
* シンプルな5つの機能を覚えればgulp master!!!
 * task
 * run
 * src
 * dest
 * watch
* 結果をどんどんpipeとして繋げるので中間ファイルいらない
 * タスクの考え方はshell scriptでpipeつなぐイメージ
* nodejsっぽくかける

cf. http://slides.com/contra/gulp

## 名前について
gulp（意:ごくこく飲む）。streamingだからかな？

grunt(意:ぶーぶー言う)。不明。
