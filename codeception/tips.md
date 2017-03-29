# cedeceptionのtips

## seleniumのテストを書くときのXPathの取り方
Chromeの要素を検証から、開発パネル？の方の要素で右クリックする[Copy as XPath]を選択できる。

この手のメソッドで要素をとるのもお茶の子さいさいです。
```
grabTextFrom(String $cssOrXPathOrRegex)
```

## 取得したHTMLを簡単にローカルで立ち上げたい
chromeでページを保存する機能を使って、ローカルに保存します。

この際外部ファイルのディレクトリ+index.htmlとして保存されるので

これらをまとめるディレクトリ作って、放り込みます
```
$ tree hoge/
hoge/
├── index.html
└── index_files
    ├── bg3.gif
    ├── calendar.js
    ...
```

あとはpythonで実行します。ポート公開の許可を求められます。

```
$ python -m SimpleHTTPServer 8888
```