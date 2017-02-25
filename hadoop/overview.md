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