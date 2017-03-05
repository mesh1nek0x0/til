# dockerに関するtips

## timezoneの指定の仕方
デフォルトはUTCになる。指定の仕方は２つあるらしい。

* 実行時の環境変数としてTZを指定する

```
$ docker run -e "TZ=Asia/Tokyo"
```

* -vでホストの情報を読み込み専用でマウントする
```
$ docker run -v /etc/localtime:/etc/localtime:ro
```

ホストマシンの環境によっては環境変数で実行する方が無難そうなイメージ

cf. http://stackoverflow.com/questions/22800624/will-docker-container-auto-sync-time-with-the-host-machine