# DNSについて
domain name serverというやつです。

## NSレコード
権威DNSサーバが管理を委託しているDNSサーバのこと

example.comみたいな感じ。

## Aレコード
ゾーンファイルに書かれているドメイン名とIP（v4）の対応情報のこと

www.example.com <-> 203.209.xxx.xxx

## AAAAレコード
クワッドエーレコードと読むらしい。次世代Aレコード、つまりIPv6なわけです。

www.example.com <-> 8fe0::8f61:ac8:30cd:a16e

## CNAMEレコード
ざっくりいうとドメインの別名（エイリアス）です。

www.example.com <-> 203.209.xxx.xxx

hoge.example.com <-> 203.209.xxx.xxx
