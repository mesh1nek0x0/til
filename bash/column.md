# 表に整形するcolumnのtips

## -t
表を作るオプション
```
$ cat japan.csv
sushi fujiyama samurai
$ column -t japan.csv
sushi  fujiyama  samurai
```
## -s[separator] -t
-tオプションと一緒に使い、区切り文字の指定を行う
```
# 置換して,区切りに
$ sed -i -e 's/ /,/g' japan.csv
$ cat japan.csv
sushi,fujiyama,samurai
$ column -s, -t japan.csv 
sushi  fujiyama  samurai
```
