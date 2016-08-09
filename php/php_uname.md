# php_unameのtips
こんな関数あるんだと驚きました。

bashのunameをPHPで実行できるし、引数の意味合いも同じ

※全てがあるわけではない

```
$ php -a
Interactive shell

php > echo php_uname('n');
local-mesh1neko.local
php > echo php_uname('m');
x86_64
php > echo php_uname('v');
Darwin Kernel Version 15.3.0: Thu Dec 10 18:40:58 PST 2015; root:xnu-3248.30.4~1/RELEASE_X86_64
php > echo php_uname('s');
Darwin
```

これで特定のサーバでだけ実行したい時もバッチリですね！
