
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
