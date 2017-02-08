# redis overview
## what is?
http://redis.io/

いわゆるNoSQLに分類される。公式ではデータ構造サーバと称している。

永続化も可能なインメモリのKVSですが、単なるkey/valueだけではないのが特徴。

後述する様々なデータ型や操作性からdatabaseとしてもchacheとしてもmessage brokerとしても使えるそうだ。

レプリケーションやトランザクションもサポートしているらしい。

## よくみる用語

### data type
データの型としては以下のものが取り扱える
* string（単純なKVS）
* hash（連想配列）
* list（連結リスト）
* set（重複のない集合）
* sorted set（ソート済みのSET）

listとsorted setが違うのは構造上の参照の問題でしょうね

### redisのデータベース
整数値でデータベースが用意される？模様。名前はつけられないらしい。

SELECTで切り替える。デフォルトは0の模様。

cf. http://redis.io/commands/SELECT

### EXPIRE/TTL
データの有効期限と残り時間のこと。コマンドでもある。

### bgsave
バックグランドで永続化するためのコマンド。最初に打っておくといいらしい。

再起動するときに読み込まれるらしい。

### INCR/DECR
プログラミングで頻出する++/--と同義。BYがつくと指定の値の分増減する。

### MEMBER
setでの要素のこと。

```
> SADD superpowers "flight"
(integer) 1
> SISMEMBER superpowers "flight"
(integer) 1
> SISMEMBER superpowers "reflexes"
(integer) 0 # これは未定義
```

### MULTI/EXEC/DISCARD
トランザクション処理の魔法の言葉

### UNION/DIFF/INTER
set（集合）の出力操作。和・差・積です。

### score
sorted setでの順番を決めるあたいのこと
