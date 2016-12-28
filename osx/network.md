
## default gatewayをコマンドラインから取得
routeコマンドでできる。アプリから見る時は設定→ネットワーク内のTCP/IPタブのルータが該当する。
```
local-mesh1neko:~$ route -n get default
   route to: default
destination: default
       mask: default
    gateway: 192.168.10.1
  interface: en0
      flags: <UP,GATEWAY,DONE,STATIC,PRCLONING>
 recvpipe  sendpipe  ssthresh  rtt,msec    rttvar  hopcount      mtu     expire
       0         0         0         0         0         0      1500         0
```

## ルーティングテーブル確認
```
local-mesh1neko:~$ netstat -nr
Routing tables

Internet:
Destination        Gateway            Flags        Refs      Use   Netif Expire
default            192.168.10.1       UGSc          360        2     en0        # default gatewayですね！
127                127.0.0.1          UCS             1        0     lo0        # localhostです
127.0.0.1          127.0.0.1          UH              2    25249     lo0
169.254            link#4             UCS             1        0     en0
192.168.10         link#4             UCS           254        0     en0
192.168.10.1/32    link#4             UCS             3        0     en0
192.168.10.1       c0:25:a2:5a:a:64   UHLWIir       360      607     en0   1183 # ルータです
192.168.10.2       link#4             UHLWIi          1        1     en0
192.168.10.3       link#4             UHLWIi          1        1     en0
192.168.10.4       link#4             UHLWIi          1        1     en0
192.168.10.5       link#4             UHLWIi          1        1     en0
192.168.10.6       link#4             UHLWIi          1        1     en0
192.168.10.7       link#4             UHLWIi          1        1     en0
192.168.10.8       1c:91:48:66:75:f5  UHLWIi          1        1     en0   1170 # たぶんおうちのなにかデバイス
192.168.10.9/32    link#4             UCS             2        0     en0
192.168.10.9       78:31:c1:c8:9b:2a  UHLWIi          1        5     lo0        # このmacです！
192.168.10.10      link#4             UHLWIi          1        1     en0
192.168.10.11      link#4             UHLWIi          1        1     en0
### ...(ry
192.168.10.255     link#4             UHLWbI          1       10     en0        # ブロードキャスト
192.168.99         link#12            UC              3        0 vboxnet        # vagrantっぽい
192.168.99.255     link#12            UHLWbI          1        8 vboxnet        # vagrantのブロードキャスト
255.255.255.255/32 link#4             UCS             1        0     en0
```
