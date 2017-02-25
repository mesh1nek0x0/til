# overview
OSSのオンメモリkey-value分散型キャッシュ。
![memcached](http://memcached.org/images/memcached_banner75.jpg)

ねこっぽいなにか、かわいいとおもうよ

## 公式
http://memcached.org/

## 特徴
* シンプルな行ベースプロトコルらしい
 * telnetで操作できるよ！
 * https://github.com/memcached/memcached/blob/master/doc/protocol.txt
 * （読む気にはならなかった）
* libeventなるライブラリを使っているらしい
 * こいつがなにかはよくわからんがパフォーマンスに貢献しているらしい
* オンメモリのkey-valueキャッシュ
* データ操作についてはちゃんとコードで面倒みないとダメ
 * 同時に更新された場合の整合性とかね！
* 各サーバは通信はしない
 * お互いに同期したりといった相互通信はない
 * メモリを足せば全体として増える
* デフォルトで使うポートは11211

redisやcouchbaseなどのようにクラスタを組めたり、永続化できたりといって便利な機能はないが、その分難しく考えずにシンプルに利用できる。`Memcached is simple yet powerful.`

couchbaseがmemcachedをサポートしているだけあって、couchbaseの知識があると理解しやすかも...。ビジュアルのあるドキュメントはcouchbaseのほうが多いので...。

## コマンド
* set/get/gets
 * よくありますね
 * getsはcasに必要なcas値も取得できる
* replace
 * 置き換え、ないと失敗する
* cas
 * アトミックな更新で使う。check and set
* append/prepend
 * データの前後に値を追加できる
 * 使い道はよくわからない
* incr/decr
 * 数値増やしたり減らしたりするやつです
 * 数値の指定が必要で、勝手に++したり--したりされない
* delete
 * 削除するやつです