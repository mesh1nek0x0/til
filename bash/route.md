# routeコマンドnote
ルーティングテーブルを表示するコマンド

インフラエンジニアじゃないとそうそうお世話になることはなさそう。

静的にルーティングを設定したり、ルーティングテーブルの情報を確認できる。

このホストから出て行く時どことっているかわかるね！！！

通常ならtracerouteでよくない？という感じもする。

```
$ route
usage: route [-dnqtv] command [[modifiers] args]
### オプション指定とどういう操作かと引数がいるもよう

local-mesh1neko:~$ route -n get www.google.com # googleへのルーティングをGETしてみる
   route to: 216.58.200.164
destination: 216.58.200.164
    gateway: 192.168.10.1
  interface: en0
      flags: <UP,GATEWAY,HOST,DONE,WASCLONED,IFSCOPE,IFREF>
 recvpipe  sendpipe  ssthresh  rtt,msec    rttvar  hopcount      mtu     expire
       0         0         0         0         0         0      1500         0
```
