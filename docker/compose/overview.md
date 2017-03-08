# overview
気軽に複数のコンテナを連携できる手段。

コンテナの起動順番とか気にしなくていいのがとってもgood

## compose.ymlの記述法
ymlの記述に従う感じ

cf. http://docs.docker.jp/compose/compose-file.html

### version
なんか２固定だった気がする

version1はcompose1.6.xまでのサポートでそれ以降は廃止予定のため使わない。

### services
連携させるコンテナ情報を順に書いていきます

* build
 * イメージをbuildするときに使うDockerfileのpath指定
* ports
 * 配列で指定します（-から始めて列挙する）
 * dockerホストとマッピングするポートを書きます
 * e.g. - "8080:8080"
* volumes
 * 配列で指定します
 * ホストのディレクトリをマウントしたり
* depends_on
 * 配列で記述します
 * 依存するコンテナの記述をします
* image
 * 使用するイメージを書きます
* env_file
 * そのままでも配列でもかける
 * e.g .env
 
## docker-composeコマンド
### up
>Create and start containers

-dオプションでバックグランドに回せます

### ps
docker psだと全部になるけど、ちゃんとここで立ち上げたのが見れる

```
$ docker-compose ps
       Name                      Command               State           Ports
-------------------------------------------------------------------------------------
composetest_redis_1   docker-entrypoint.sh redis ...   Up      6379/tcp

composetest_web_1     /bin/sh -c python app.py         Up      0.0.0.0:5000->5000/tcp
```

なお、-qでdocker ps同様にIDだけ表示できる

```
$ docker-compose ps -q
b24c388fd4354b7eb1dc7bb0d5a40c0aac99776e50edc419c8d9778695227717
1e9a3bcc5df21712b3813bbcf65ce935f80c342cf3db8340f184ad7ab5cfb27c
```

### run <container> <command>
指定のコンテナで指定のコマンドを一度だけ実行できる

>Run a one-off command on a service.

### stop
compose upで立てたサービスたちを落とします。

```
$ docker-compose stop
Stopping composetest_web_1 ... done
Stopping composetest_redis_1 ... done
```

### rm
-v オプションでボリュームごと削除できる

```
$ docker-compose rm -v
Going to remove composetest_web_run_1, composetest_web_1, composetest_redis_1
Are you sure? [yN] y
Removing composetest_web_run_1 ... done
Removing composetest_web_1 ... done
Removing composetest_redis_1 ... done
```
