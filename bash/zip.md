# zipコマンドの学習メモ
## 基本

圧縮後のファイル名、圧縮するファイルを列挙...というのが基本形
```
zip [-options] [zipfile list]
```

## ディレクトリごと再帰
-rオプションを使う。

## 特定のファイル/ディレクトリを除く
-xオプションを使う

```
$ ls
app.zip                 index.js                package.json
credentials.json        node_modules            test.zip
$ zip -r test.zip *.json -x credentials.json
updating: package.json (deflated 33%)
```