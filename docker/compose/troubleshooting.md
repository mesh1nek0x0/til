# docker-compose 周りのトラブル

## Invalid bind mount spec
Windowsでホストのディレクトリをマウントしようとしたらエラーになった。

どうもwindowsのパスを変換しないとマウントできないらしく、

docker-composeの1.9から標準サポートではなくなったらしい。

環境変数の指定で解決できる。

```
COMPOSE_CONVERT_WINDOWS_PATHS=1 docker-compose up
```

cf. https://github.com/docker/compose/releases/tag/1.9.0