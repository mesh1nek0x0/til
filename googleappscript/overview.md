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

## 簡単に実行するボタンを作りたいとき
図形描画から図形をつくって、スクリプトでmyFunctionを割り当てればクリックで動くぞ！

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
## イベントハンドラ
なにかしらのアクションがあったときに実行される。JSではお馴染みですね。

GoogleAppScriptではアプリケーションに応じたEventオブジェクトが用意されているようです。
https://developers.google.com/apps-script/guides/triggers/events

以下のような形式で定義する
```
function on***(event) {
  // hoge foo bar
}
```

* Google Sheets
 * Open
 * Change
 * Edit
 * Form submit
* Google Docs
 * Open
* Google Form
 * Open
 * Form submit
* Add On
 * install
* Time-driven

### シンプル・インストーラブル・トリガー
イベントハンドラには種類があります。

* シンプルイベントハンドラ
 * 決まった関数名に対して紐付いているため、簡単に使えるが1イベントに対して、複数のfunctionは割り当てられない。

* インストーラブルイベントハンドラ
 * イベントに対して、自由に処理の紐付けができる。追加の設定は必要だが、１イベントに対して複数のfunctionの割り当てができる。
 この設定がトリガーである。

参考したページによると...
>インストーラブル・イベントハンドラの引数には、sourceプロパティはありません。

ただし、Editイベントは、シンプルでもインストーラブルでもあるので（おそらく２つのインターフェースを継承している？）ので
トリガーで設定しても、シンプルのときと同じプロパティが取得できるようです。
```
[16-09-24 16:29:08:510 JST] {authMode=FULL, range=Range, oldValue=27.0, source=Spreadsheet, value=3, triggerUid=1164505138}
```

じゃあ、Changeイベントでトリガーを設定すると...
```
function testonChange(e) {
  Browser.msgBox(Utilities.jsonStringify(e));
}
---
### oh...?
{"authMode":"FULL","source":"Spreadsheet","triggerUid":1147772149,"changeType":"EDIT"}
{"authMode":"FULL","source":"Spreadsheet","triggerUid":1147772149,"changeType":"INSERT_ROW"}
```

なんでや！sourceついてますやん、、、よーわかりませんがな。。。公式のマニュアルのプロパティには載っていないのですが。

cf. https://developers.google.com/apps-script/guides/triggers/events#change

気になってTime-drivenの方も確認してみた
```
function timeTriger(event) {
    var sheet = SpreadsheetApp.getActiveSheet();
    sheet.getRange("A2").setValue(Utilities.jsonStringify(event));
    sheet.getRange("A1").setValue(event.minute + "(m)" + event.second + "(s)");
}
---
### こっちにはsourceは入ってないですね！
{"authMode":"FULL","week-of-year":38,"day-of-week":6,"month":9,"hour":10,"year":2016,"timezone":"UTC","day-of-month":24,"triggerUid":1062176184,"minute":59,"second":23}
```

## menuの追加
図形描画でボタン割り当ててもいいけど、これがないと使い勝手悪いですよね！

SpreadsheetAppオブジェクトから追加できるようなので、onOpenイベント時に追加してあげましょう！


## 全体像
学びながらまとめたクラス図はこちら。

![](https://lh3.googleusercontent.com/Hpt-B7K1fDBBAhOM0G4SpzdegriIs2jTLA2EmtlXMRYi7RjFw_KkoTVOwjcd4fgPzhP_c-cp_R7t21ca9FMZ1Vb0FHKVNX0ESFniiWR5wI0IjvKUtRSXbsG57W6grAgqBo-lYhWIykw6OW96fP9fVF943k0kD2L1qiOG7rvG9TZUIXoV-SCsfC40avI8QpXXZTqALjal96Ks8KNWALqbEiwO9KsLp7L8diu0N13ua3KYhXGSua6QjxZK4IUqDxgjdcEz1qkue1YoPETbh2vZlNrWkwQjbPvnBWuJ-tNAjweWEVNEQmNXKleptttqewmGXgbkPIitvTXABHPTx9qxXMiFqR1hIdQhgQEPx8O9IMwoJ7YBHUQNuR3EU-EgQ9y094805yiIUvyJf9m6cghgnIkfw21mDaNrRWEK2bqlkZq2o7iaH1U_nfFZOc9SHo0eunK2RKLFzn1zIEKCvOYo6-LduNc4xWavHWEtfl-qVmwjn3pa2ZYFJNxEsGUd0qNLzlH1NlpB6kl72EQtvL1Y6rHNWisnZlB0M3pYC9V_aynrMbRhWAtxcHlPIA8j90B9AvmIFta45Gd3oR8z27yv60c8IHHl20V5b106WuVNgmsrhBd9=w938-h939-no)
