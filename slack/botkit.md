# botkitに関するメモ

## config
* retry
 * Retry is disabled by default
 * Positive integer or Infinity...Infinityってどうやって指定するんだろう？
 * Maximum number of reconnect attemptsと書かれているので再接続の施行回数っぽい
 
## controller.hears
* 正規表現で受け取るメッセージのマッチングができる
* message.textでテキストの内容が取得できる

## json-file-storeで簡単なデータ保存
controller宣言時の設定値でjson-file-storeを利用した簡単なKVSを保持できる。

```
const controller = Botkit.slackbot({
  json_file_store: 'simple_db',
});
```

この場合、app直下に以下のファイル形式のデータストアが作成される

```
$ tree simple_db/
simple_db/
├── channels
├── teams
└── users
```

一応DB？の種別は3種デフォルトで用意されている。どうも使うチャンネル毎に切り替わるわけではない。
* channels
* teams
* users