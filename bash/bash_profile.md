# .bash_profileについて
## 役割
shellにログインした時に実行される。

新しくログインした時は、.bash_profileも.bashrcも呼ぶ設定にすることが多いらしいので違いを感じにくい。

```
$ cat .bash_profile
echo "<This is bash_profile>"
test -r ~/.bashrc && . ~/.bashrc # これは.bashrcの読み込み設定

Last login: Thu Jun 30 23:15:38 on ttys002 # 新しくログインする
<This is bash_profile> # .bash_profileと
<This is bashrc.> # .bashrcも読み込まれる
local-mesh1neko:~$ bash
<This is bashrc.> # .bashrcだけ
local-mesh1neko:~$ exit
exit
```

## macでの設定
デフォルトでは存在しないらしい。確かになかった。
