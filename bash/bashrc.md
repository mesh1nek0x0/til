# .bashrcについて
## 役割
shellが起動した時に実行される。

新しくログインした時は、.bash_profileも.bashrcも呼ぶ設定にすることが多いらしいので違いを感じにくい。

違うWindowを開いたら反映してくれない〜だと困るものはココに書く。

```
$ cat .bashrc
echo "<This is bashrc.>"

Last login: Wed Jun 29 23:05:55 on ttys000 # 新しくログインした
<This is bashrc.>
$
$ bash # bashを実行してもでるよ
<This is bashrc.>
local-mesh1neko:~$ exit
exit
```
## macでの設定
デフォルトでは存在しないらしい。確かになかった。
