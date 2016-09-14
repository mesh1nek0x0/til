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

## 5 list(ソート済みの配列)の追加と参照
L/R-PUSH、L/R-POP、L-LEN/LRENGEといったコマンドで操作します。

※L/Rはたぶんleft/right

```
> RPUSH friends "Alice"
(integer) 1
> RPUSH friends "Bob"
(integer) 2
> LPUSH friends "Sam"
(integer) 3
> LLEN friends
(integer) 3 # listのサイズは3人ですね
> LRANGE friends 0 -1 # -1は末尾まで、という指定の模様
1) "Sam"
2) "Alice"
3) "Bob"
> LRANGE friends 1 2 # listは0からstartですね！
1) "Alice"
2) "Bob"
> DEL friends
(integer) 1
> LLEN friends
(integer) 0
> SET friends "Alice"
OK
> RPUSH friends "Bob" # 通常のkey/valueに突っ込もうとすると、そりゃ怒られるよね
(error) WRONGTYPE Operation against a key holding the wrong kind of value
> DEL friends
(integer) 1
```

## 6 list(ソート済みの配列)の長さと取り出し
５の方でLLENもLRANGEも触ってしまってた...

```
> RPUSH friends "Alice"
(integer) 1
> RPUSH friends "Bob"
(integer) 2
> LPUSH friends "Sam"
(integer) 3
> LPOP friends
"Sam" # 一番左の要素が取り出される
> LLEN friends
(integer) 2 # 取り出した分、短くなっている
> RPOP friends
"Bob" # 一番右の要素が取り出される
> LLEN friends
(integer) 1　# もちろん、取り出した分が短くなっている
> LRANGE friends 0 -1
1) "Alice"
```

## 7 listに似たsetの登録と削除
listはorderがありますが、こちらはorderを必要としない時に使うようです。

setはS-ADD/REM/ISMEMBER/MEMBERS/UNIONといったコマンドで操作します。

```
> SADD superpowers "flight"
(integer) 1
> SADD superpowers "x-ray vision"
(integer) 1
> SADD superpowers "reflexes"
(integer) 1
> get superpowers # key/valueな取り方だと怒られる、ええ
(error) WRONGTYPE Operation against a key holding the wrong kind of value
> SMEMBERS superpowers # var_dumpみたいですね
1) "flight"
2) "reflexes"
3) "x-ray vision"
> SREM superpowers # こういう削除じゃないみたい
(error) ERR wrong number of arguments for 'srem' command
> SREM superpowers "reflexes" # memberを指定しないとダメなようです
1
```

## 8 setの中身確認とUNION
7でちょっぴりやってしまったけど。。。

```
> SISMEMBER superpowers "flight"
(integer) 1 # これは登録済みなので1
> SISMEMBER superpowers "reflexes"
(integer) 0 # これはさっき7で消したので0

### UNIONを試す
> SADD birdpowers "flight"
(integer) 1
> SADD birdpowers "pecking"
(integer) 1
> SUNION superpowers birdpowers # 統合されてユニークになってますね！
1) "flight"
2) "pecking"
3) "x-ray vision"
```

## 9 sortedなlistのsets
listに似ているんですが、scoreという値に紐付いているというのが特徴

```
### まずはsortedなlistをつくるところから
> ZADD hackers 1940 "Alan Kay"
(integer) 1
> ZADD hackers 1906 "Grace Hopper"
(integer) 1
> ZADD hackers 1953 "Richard Stallman"
(integer) 1
> ZADD hackers 1965 "Yukihiro Matsumoto"
(integer) 1
> ZADD hackers 1916 "Claude Shannon"
(integer) 1
> ZADD hackers 1969 "Linus Torvalds"
(integer) 1
> ZADD hackers 1957 "Sophie Wilson"
(integer) 1
> ZADD hackers 1912 "Alan Turing"
(integer) 1

### 取り出してみましょう
> ZRANGE hackers 3 3
1) "Alan Kay" # 1906->1912->1916->1940なので、あってますね！
> ZRANGE hackers 2 4
1) "Claude Shannon"
2) "Alan Kay"
3) "Richard Stallman" # 1940->1953なのであってますね！

### 全部は-1で出せるみたいです
> ZRANGE hackers 0 -1
1) "Grace Hopper"
2) "Alan Turing"
3) "Claude Shannon"
4) "Alan Kay"
5) "Richard Stallman"
6) "Sophie Wilson"
7) "Yukihiro Matsumoto"
8) "Linus Torvalds"

### 松本さんを出しましょう
> ZRANGE hackers 6 6 # 0から始まるので７番目ですが6 6指定
1) "Yukihiro Matsumoto"
```

## 10 hash
PHPでいう連想配列ですかね。Objectを表現するためのperfect typeと書いてます。

H-SET/GET/GETALL/HMSETなどのコマンドがある

```
### 指示通り作ってみる
> HSET user:1000 name "John Smith"
(integer) 1
> HSET user:1000 email "john.smith@example.com"
(integer) 1
> HSET user:1000 password "s3cret"
(integer) 1

### 全部取得してみる
> HGETALL user:1000 # なんか想像と違う...
1) "name"
2) "John Smith"
3) "email"
4) "john.smith@example.com"
5) "password"
6) "s3cret"

### multipleなSETです
> HMSET user:1001 name "Mary Jones" password "hidden" email "mjones@example.com"
OK
> HGET user:1001 name
"Mary Jones"
> HGET user:1002 name
(nil)
> HGET user:1000 name
"John Smith"
> HGET user:1000 password
"s3cret"
```

## 11 hash無いの数値はatomicに操作できるよ

HINCRBYというコマンドがあります。

```
> HSET user:1000 visits 10
(integer) 1
> HINCRBY user:1000 visits 1
(integer) 11
> HGET user:1000 visits
"11"
> HINCRBY user:1000 visits 10
(integer) 21 # なんとただの++じゃないんですね
> HDEL user:1000 visits
(integer) 1
> HGET user:1000 visits
(nil) # 削除する消えるようです
> HINCRBY user:1000 visits 1
(integer) 1
```
