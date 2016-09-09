# macへJMeterの導入
```
# 落としてきて
$ wget http://ftp.jaist.ac.jp/pub/apache//jmeter/binaries/apache-jmeter-3.0.tgz
--2016-06-05 13:14:18--  http://ftp.jaist.ac.jp/pub/apache//jmeter/binaries/apache-jmeter-3.0.tgz
Resolving ftp.jaist.ac.jp... 150.65.7.130
Connecting to ftp.jaist.ac.jp|150.65.7.130|:80... connected.
HTTP request sent, awaiting response... 200 OK
Length: 45178166 (43M) [application/x-gzip]
Saving to: 'apache-jmeter-3.0.tgz'

apache-jmeter-3.0.tgz              100%[==================================================================>]  43.08M  1.97MB/s   in 34s    

2016-06-05 13:14:52 (1.28 MB/s) - 'apache-jmeter-3.0.tgz' saved [45178166/45178166]

## md5も確認
$ md5 apache-jmeter-3.0.tgz
MD5 (apache-jmeter-3.0.tgz) = f85a9df24d5774bd051ec1040cbda2b9
local-mesh1neko:jmeter iida-ryota$ curl https://www.apache.org/dist/jmeter/binaries/apache-jmeter-3.0.tgz.md5
f85a9df24d5774bd051ec1040cbda2b9 *apache-jmeter-3.0.tgz

// 各リンクはブラウザで調べた

$ ls
apache-jmeter-3.0.tgz	overview.md		trial
# 展開します
$ tar xzf apache-jmeter-3.0.tgz
$ sh apache-jmeter-3.0/bin/jmeter
Writing log file to: /Users/iida-ryota/Documents/til/jmeter/jmeter.log

# 立ち上がりました
# javaは別で入れてたのかも
```

# テスト実行するためのテストシナリオの作成
// ふむ、概要は知っていたけど、よくわからないUIですね
テスト計画やワークベンチを右クリックして、スレッドクループとか子要素を追加できるようです。（わかりにくい）

以下の要素を設定
* HTTPリクエスト初期値設定（接続先IP, port設定）
* スレッドグループ（スレッド数, RampUp期間, ループ回数を全て1）
  * サンプラー：HTTPリクエスト(/にアクセス)
  * リスナー：結果をツリーで表示（今回は１アクセスなので,結果もみたい）
  * リスナー：統計レポート（結果のサマリー）

なお、今回の負荷対象はコンテナ内のNode.js(Express)環境
イメージ図
```
// 負荷クライアント
[host:OS X(mac) with JMeter]
    |
    v                    // 負荷サーバ
[guest:boot2docker- - - >[Node.js(express):container]]
```

# 負荷対象サーバの準備
```
$ docker run -p 49160:8080 -d mesh1neko/node-web-app
7dec8d5a99029316b842fb7b3d19325ba8005d772c746c1a4e55cff0610a8e09
$ curl `docker-machine ip`:49160
Hello world
```

# お試しの実行
まずはGUIから。テスト計画を選択して再生したら無事成功。

```
# お次はコマンドから
$ ./apache-jmeter-3.0/bin/jmeter -n -t ./test.jmx -l test.log
Writing log file to: /Users/iida-ryota/Documents/til/jmeter/jmeter.log
Creating summariser <summary>
Created the tree successfully using ./test.jmx
Starting the test @ Sun Jun 05 14:32:26 JST 2016 (1465104746888)
Waiting for possible Shutdown/StopTestNow/Heapdump message on port 4445
summary =      1 in 00:00:00 =    5.0/s Avg:    83 Min:    83 Max:    83 Err:     0 (0.00%)
Tidying up ...    @ Sun Jun 05 14:32:27 JST 2016 (1465104747162)
... end of run

# ちゃんとできた模様！はっぴーである

## -n(non-gui)
GUIを立ち上げないオプション。その分メモリにも優しいようだ。

## -t [target.jmx]
テスト計画ファイルの指定

## -l [log.jtl]
実行のログの吐き出し先を指定できる
```
