# 日付の表示や設定を行うdate tips
作業ログの保存で結構使うことが多いdateコマンド

## +によるフォーマット指定
```
# yyyy-mm-dd hh:mm:ss
## よく考えたらPHPのHisってすごいわかりづらいね
$ date +'%Y-%m-%d %H:%M:%S'
2016-05-15 19:38:53

# こういう風に今日の作業ディレクトリやログを作ることも
$ mkdir `date +%Y%m%d`
$ echo 'hogeeeee' > `date +%Y%m%d`/`date +%Y%m%d.log`
# もちろんこういう参照もできるし
$ cat `date +%Y%m%d`/`date +%Y%m%d.log`
hogeeeee
# ちゃんと指定してもOK
$ cat 20160515/20160515.log
hogeeeee

```

## -vによる日時調整(bsd date:mac)
BSD系のdateコマンドにあるオプション。GNU系割愛。
```
# +-数字と日時を表す英文字で調整できる
$ date +%Y%m%d
20160515
$ date -v-1d +%Y%m%d
20160514
$ date -v-1y +%Y%m%d
20150515
```
