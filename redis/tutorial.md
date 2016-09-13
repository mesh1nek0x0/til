# official tutorial
http://try.redis.io/

## 1 基本コマンド
Redisはkvsって言われてるし、しばしばNoSQLデータベースとしても扱われるよ。

真髄は特定のkeyに対して紐づくvalueがあること。

基本的なコマンドはSETとGETの組み合わせて可能です。

SETすると永続化（たぶん有効期限がないという意味で）される。

```
> SET server:name "fidooo"
OK
> GET server:name
"fidooo"
```

## 2 続・基本コマンド
DELやINCRコマンドもあるよ！

```
> SET connections 10
OK
> INCR connections
(integer) 11 # ちゃんと増えた
> SETNX connections 15
(integer) 0 # すでに定義済みなので失敗
> GET connections
"11" # 11のまま
> DEL connections
(integer) 1 # 削除成功の1
> GET connections
(nil) # 削除したのでない
> INCR connections
(integer) 1
```

## 3 INCRの不可分性(atomic)について
要するに

```
x = GET count
x = x + 1
SET count x
```

なのだけど、クライアントが複数になると崩壊するよね？

## 4 データの有効期限
EXPIREで設定したり、TTLで残時間を確認できる。-1は無期限で、-2はロスト。

```
> SET resource:lock "Redis Demo 1"
OK
> TTL resource:lock
(integer) -1 # 普通に追加した値のTTLは無期限になっている
> EXPIRE resource:lock 5
(integer) 1
> TTL resource:lock
(integer) 4　# へってる！
> TTL resource:lock
(integer) 1　# へってる！
> TTL resource:lock
(integer) -2 # あ、消えた！
> GET resource:lock
(nil) # もちろんとれません
> SET resource:lock "Redis Demo 2"
OK
> GET resource:lock
"Redis Demo 2"
> TTL resource:lock
(integer) -1
```
