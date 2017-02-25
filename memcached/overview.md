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