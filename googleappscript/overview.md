# GoogleAppScript概要

## これはなに？
GoogleApp（ドキュメント、スプレッドシート、メールやカレンダーなど）に対してAPIを用いてアクセスできる。
雑に言うとマクロだけど、厳密に言うとマクロではないらしい。記述はどうやらJavascriptで行うらしい。ほう。
頭文字をとってGASと書かれることもあるようです。

## クライアントサイドJSでなくサーバサイドJS
Javascriptですが、スクリプト自体はサーバ上で動くのでクライアントサイドJSおなじみの
```
alert("hoge");
```
これは動かない。代わりにGoogleAppScriptように用意されたものを駆使していきます。

## プロジェクトとして扱える
複数のGASファイルをまとめて１つのプロジェクトとして扱えるので、そこそこの規模のスクリプトもかける。
結構夢が広がりますが、無理にGASでやろうとしそうなのは危ないところですね。適材適所を意識したいところ。

## 簡単なサンプル
最初はマクロっぽく使うのがよいようです。
適当なスプレッドシートを開き[ツール]->[スクリプトエディタ]で以下のコードを書いて実行するとhello worldできる。

```
function myFunction() {
    Browser.msgBox("hello world");
}
```

## logを表示するとき
[表示] -> ログ または command + Enter

## 頻出するオブジェクトメソッド
### Browser.msgBox(prompt):String
ポップアップのダイアログを表示できる。ユーザがOKしたか、キャンセルしたのかの文字列が返る。

なお、引数の数でいろんなポップアップは出せる
* msgBox(prompt, buttons)
* msgBox(title, prompt, buttons)

cf. https://developers.google.com/apps-script/reference/base/browser#msgBox(String)

### Logger.log(data)
クライアントサイドJSでならconsole.logで同じみな感じのやつですね。

なお、フォーマットの指定もできる模様
* log(format, values)

cf. https://developers.google.com/apps-script/reference/base/logger#logdata

ここまでの実装サンプル
```
function myFunction() {
  var result = Browser.msgBox("hoge", "are you ok?", Browser.Buttons.YES_NO);
  if (result == "yes") {
    Browser.msgBox("oh! You ok!");
  } else {
    Browser.msgBox("oh... You cancel...");
  }
  Logger.log("script ends");
}
```

### Browser.inputBox(prompt)
ポップアップのダイアログで入力させられます。

msgBox同様、いろいろ装飾できます。
* inputBox(prompt, buttons)
* inputBox(title, prompt, buttons)

ただし、キャンセル以外は入力した値が返るようです。
```
function myFunction() {
  var result = Browser.inputBox("attention!" , "hoge piyo~" , Browser.Buttons.YES_NO_CANCEL);
  Logger.log(result);
  if (result == "foo") {
    Browser.msgBox("oh! You foo!");
  } else if (result.length == 0) {
    Browser.msgBox("oh...You cancel...");
  } else {
    Browser.msgBox("oh... please reload and type foo!");
  }
}
```
