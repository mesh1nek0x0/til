# note
Django（ジャンゴ）はpython用のWebアプリケーションフレームワーク

ちゃんとセットアップするとIt workedがでます
```
$ curl localhost:8000 | grep 'worked'
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  1767    0  1767    0     0   122k      0 --:--:-- --:--:-- --:--:--  132k

  <h1>It worked!</h1>
```

Ctrl+Cで抜けてもサーバ生きてる...?
```
^CERROR: Aborting.
local-mesh1neko:python-postgre[master]$ docker-compose ps
      Name               Command              State               Ports
-----------------------------------------------------------------------------
pythonpostgre_db_   docker-             Up                  5432/tcp
1                   entrypoint.sh
                    postgres
pythonpostgre_web   python manage.py    Up                  0.0.0.0:8000->800

_1                  runserver ...                           0/tcp

$ curl localhost:8000 | grep worked
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Cur
rent
                                 Dload  Upload   Total   Spent    Left  Spe
ed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--
100  1767    0  1767    0     0   160k      0 --:--:-- --:--:-- --:--:--  1
72k

  <h1>It worked!</h1>
```
