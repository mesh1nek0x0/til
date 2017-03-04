# quick start
下記の作業ログとメモ
http://docs.docker.jp/compose/gettingstarted.html

## 概要
pythonのアプリのwebコンテナとredisコンテナを連携させます。

* requirements.txtはwebコンテナで使う依存パッケージ読み込み
* redisでアクセス数をカウント

## 手順
```
$ docker-compose up
Creating network "composetest_default" with the default driver
Pulling redis (redis:latest)...
latest: Pulling from library/redis
693502eb7dfb: Already exists
338a71333959: Pull complete
83f12ff60ff1: Pull complete
...(ry
redis_1  | 1:M 04 Mar 02:05:54.391 * The server is now ready to accept connections on port 6379
web_1    |  * Running on http://0.0.0.0:5000/ (Press CTRL+C to
 quit)
...(ry
```

ちゃんと別タブでcurlするとアクセスがカウントアップされる
```
$ curl localhost:5000
Hello World! I have been seen 11 times.
$ curl localhost:5000
Hello World! I have been seen 12 times.
```

## 後片付け
-dつけずに実行したの別タブから停止（Ctrl + Cでもいいけど...）
```
$ docker-compose stop
Stopping composetest_web_1 ... done
Stopping composetest_redis_1 ... done

### コンテナも削除しておく（ボリュームも忘れずに）
$ docker-compose rm -v
Going to remove composetest_web_run_1, composetest_web_1, composetest_redis_1
Are you sure? [yN] y
Removing composetest_web_run_1 ... done
Removing composetest_web_1 ... done
Removing composetest_redis_1 ... done
```

