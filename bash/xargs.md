# 表標準出力からコマンドを実行できるxargsのtips

## よくあるfind + grep
```
$ find  ./ -type f -name "*.yml" | xargs grep 'hoge'
```

## 実行前にコマンド確認したいんだけど...
```
$ find  ./ -type d -name "logs*" | xargs -p grep 'hoge'
grep hoge ./.git/logs ./logs ?...n
```

## 実行結果を使って別の処理をしたい
```
# awkと使うと、とある結果のログを順番にgrepしたりも簡単に...
# 今回は結果がidに置き換えられている
$ cat hoge.list | awk '{print $1}' | xargs -I id -p grep 'id' piyo.log
grep id1 piyo.log?...y
grep id2 piyo.log?...y
id2	piyo	2016/05/12
grep id3 piyo.log?...y
id3	hogera	2016/05/11
grep id4 piyo.log?...y
id4	hoge	2016/05/13
```
