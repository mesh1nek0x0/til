# nodemon

公式：https://nodemon.io/

github:https://github.com/remy/nodemon

>Nodemon is a utility that will monitor for any changes in your source and automatically restart your server. Perfect for development.

ソースコードの変更を検知して、サーバをrestartしてくれる優れもの。開発にうってつけ！といったところ。

発音は好きなように呼べばいいらしい、のーでーもん？

## usage 
npmやnodeで実行するのと変わらない感じで実行できるもよう

```
nodemon [your node app]
```

scriptファイルを指定しなかった場合、package.jsonからmainやscrpts run項目のscriptをみつけて実行してくれる。

優先度はmain > scripts:run

なお、デフォルトでrsでリスタートします。

## nodemon.json
実行時の設定をファイルに落とせます。

指定がないものはデフォルトの設定を引き継ぐことになります。

この手の設定値は実行時の引数としてオプションでも指定できる。

e.g.
```
$ nodemon --watch app/ --watch lib/
```

どうもlib/*みたいなglob形式では指定出来ないらしい、要注意ですね。

もちろん無視するファイルも指定できる。

watchはデフォルトで*.*なので全ファイルチェックになるもよう...

変更を検知範囲とrestartする範囲は区切られているのかな？

## gulpバージョン
[gulp-nodemon](https://github.com/JacksonGariety/gulp-nodemon)があります

gulp側の変更検知もあるしこれはややこしいのでは...？