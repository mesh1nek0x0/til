# What is 'Electron'?
お手軽なクロスプラットフォームapp作成フレームワーク
http://electron.atom.io/

* HTML
* CSS
* JavaScript

といった、Web馴染みの技術でMacでもWindowsでも作れるアプリを作れる。

Slack, Atom, Kitematic(Docker)などもElectron製

## 根幹技術
* Chromium(OSSのウェブブラウザ)
* node.js
そのため、HTML/CSS/JavaScriptで作れる

## OSS
githubによってメンテナンスされているOSS.
https://github.com/electron/electron

2016/06/14現在で、とても活発

## CrossPlatform
1つのコードから、Mac, Windows, Linuxで動くappが作れる。

## 特徴
* 自動アップデートできる
* OS固有のメニューや通知を利用できる
* crash reportを集められる
* debugもできる
* Windowsのインストーラも準備できる
* 電源が減った時の挙動も設定できる

だいたいどんなことができるかは
[ここ](http://electron.atom.io/#get-started)からdemoアプリを入れるとわかりやすい。

// これだけでとてもいろいろできそうである

## 留意点
XSSの危険！！！

nodeのライブラリを透過的に呼び出すことができるため、

ブラウザだけで閉じておらず、よくあるWebのXSSより危険が大きい。

最新バージョンでは以下の様に設定して、ライブラリのrequireは回避できる模様。
```
nodeIntegration = false;
```
なお、古いバージョンでは新しいウィンドウを作ってこの値をそもそも上書きできるバグがあったらしい。

cf. http://utf-8.jp/public/2016/0307/electron.pdf

## 関連ツール
* Devtron

electronのデバックツール

http://electron.atom.io/devtron/

* Spectron

electronのテストツール

http://electron.atom.io/spectron/

* electonica

日本Node.jsグループ代表の古川さん製の学習ツール

簡単なブラウザまで作れるらしい

http://yosuke-furukawa.hatenablog.com/entry/2015/12/31/223045

* Photon kit

OSXのネイティブっぽいUIを提供してくれる

## release history
2016/05/09にメジャーver1.0.0のリリース。

2016/06/14現在では1.2.x系が最新。

http://electron.atom.io/releases/
