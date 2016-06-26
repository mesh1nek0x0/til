# pingのtips

## 回数指定
-cオプション
```
$ ping -c 5 127.0.0.1
PING 127.0.0.1 (127.0.0.1): 56 data bytes
64 bytes from 127.0.0.1: icmp_seq=0 ttl=64 time=0.084 ms
64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.068 ms
64 bytes from 127.0.0.1: icmp_seq=2 ttl=64 time=0.110 ms
64 bytes from 127.0.0.1: icmp_seq=3 ttl=64 time=0.139 ms
64 bytes from 127.0.0.1: icmp_seq=4 ttl=64 time=0.069 ms

--- 127.0.0.1 ping statistics ---
5 packets transmitted, 5 packets received, 0.0% packet loss
round-trip min/avg/max/stddev = 0.068/0.094/0.139/0.027 ms
```
