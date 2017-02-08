# netstat関連

## ルーティングテーブルの表示
今回はdockerでCentOS7をいれてみました
```
# netstat -r
Kernel IP routing table
Destination     Gateway         Genmask         Flags   MSS Window  irtt Iface
default         gateway         0.0.0.0         UG        0 0          0 eth0
172.17.0.0      0.0.0.0         255.255.0.0     U         0 0          0 eth0
```

* Destination
 * 宛先対象となるネットワークまたはホスト
 * defaultと書かれているときは該当しない場合ここになる
* Gataway
 * gataway（他のネットワークへの出入り口）のIPアドレス
* Genmask
 * 宛先対象ネットワークのサブネットマスク
* Flags
 * 英文字１文字ずつ意味がある
 * U:有効、G:gatewayなど
* MSS
 * TCP接続の最大セグメントサイズ
* Window
 * TCP接続のウィンドウ・サイズ
* irtt
 * 初期ラウンドトリップ時間（ネットワーク上の相手側ホストからリクエストの応答が戻ってくるまでの時間）
* Iface
 * このルーティングの送出先インターフェース（物理的にパケットを飛ばす先）
