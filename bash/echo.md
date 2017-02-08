# 標準出力echo tips

## エスケープされた日本語を読みたい

```
$ echo -e '\xe3\x82\xa8\xe3\x83\xa9\xe3\x83\xbc'
エラー
```

\xHHは16進数でPHP で日本語メッセージを trigger_error() すると Apache の error_log にこの形式で出力されるらしい

cf. [[Qiita]エスケープされた日本語文字列を読みたい](http://qiita.com/kumazo@github/items/39500f259500a424800b)
