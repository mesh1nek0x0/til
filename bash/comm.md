# 行単位で共通具合を確認できるcomm tips
diffじゃなくて、共通してるものを確認したい時に便利.

※sort済みでないと使えない

## 共通具合を全部確認する
comm file1 file2
```
$ cat a.list # a.listがある
hoge
piyo
hogera
hogehoge
$ cat b.list # b.listがある
piyo
hogera
hogehoge
piyopiyo
# どちらのlistもsortして
$ sort a.list > a.list.sorted
$ sort b.list > b.list.sorted
# 1列目：arg1にしかない
# 2列目：arg2にしかない
# 3列目：両方に存在する
$ comm a.list.sorted b.list.sorted
hoge
		hogehoge
		hogera
		piyo
	piyopiyo
```

# フィルタする列を指定する
comm [-123] file1 file2

```
# 共通項だけ知りたい(1列目だけ、2列目だけをフィルタする)
$ comm -12 a.list.sorted b.list.sorted
hogehoge
hogera
piyo

# １列目だけ表示したい（2, 3列目をフィルタする）
$ comm -23 a.list.sorted b.list.sorted
hoge
# 同じ表示はdiffとgrepとsedでもできる
$ diff a.list.sorted b.list.sorted | grep '<' | sed -E 's/^< //'
hoge

```
