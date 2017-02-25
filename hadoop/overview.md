# overview
大規模データを分散処理するOSSミドルウェア

Javaで書かれてる

![hadoop](http://hadoop.apache.org/images/hadoop-logo.jpg)

像はphpとかぶってる

## 公式
http://hadoop.apache.org/

## 特徴
大きく分けて３つの要素からなっている。
* 分散ファイルシステム:HDFS(Hadoop Distributed File System)
* 大規模分散処理フレームワーク:Hadoop MapReduce Framework
* ジョブ・クラスタ管理:Hadoop YARN

基本アイディアはビッグデータにはサーバをたくさん並べて効率よく処理しようといった感じのもよう、わかりやすい。

Hadoop Echo System（わかる名前を並べてみた）
* Cassandra
* HBase
* Hive
* Spark

### MapReduce
３つのフェイズを経ることで指定の処理を効率よくやる。

たとえば、テキストのカウント処理などを分散して行う場合...

`THE END OF MONEY IS THE END OF LOVE`

Map:単語をkeyとしてmappingするイメージ
```
[THE->1, END->1, ... LOVE->1]
```

Shuffle:key順にsortして結合するイメージ
```
[END->[1,1], IS->1, ... THE->[1, 1]]
```

Reduce:各keyの値を加算するイメージ
```
[END->2, IS->1, ... THE->2]
```

（このあたりはcouchbaseのMapReduceでもやりましたね）

## 全体像
どうもhadoopにHDFSにデータを突っ込む処理があって、mapreduceはHDFS上のディレクトリを指定して処理が進められるようだ。

## チューニングのポイント
大規模なデータ読み込みが必要なため、全体を通していかにDISKのI/Oを減らすかが重要になる。

* mapreduceの入出力ファイルの圧縮
 * ただし、圧縮にはCPU処理が伴うため、負荷とトレードオフであることに注意
* sortに使えるメモリの割合を増やす
* diskに吐き出す閾値を高めに設定する

ただ、細かいことはさておき台数増やせばなんとかなる節はあるようだ

> Don't forget that you can always just add nodes!

cf. http://kzky.hatenablog.com/entry/2013/10/26/hadoop%E3%83%81%E3%83%A5%E3%83%BC%E3%83%8B%E3%83%B3%E3%82%B0%E3%81%AE%E3%81%9F%E3%82%81%E3%81%AE%E3%83%91%E3%83%A9%E3%83%A1%E3%83%BC%E3%82%BF%E9%96%A2%E9%80%A3%E3%81%AE%E3%83%A1%E3%83%A2%EF%BC%8E

cf. http://d.hatena.ne.jp/wyukawa/20120701/1341136447
cf. http://metasearch.osdn.jp/wiki/index.php?Hadoop%A5%C1%A5%E5%A1%BC%A5%CB%A5%F3%A5%B0