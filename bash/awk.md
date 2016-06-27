# awkを使うときに覚えておきたいtips

## '(シングルクォート)をエスケープする
\047または'\''で囲む。前者の方がエスケープ祭りにならなくてよさそう。

MySQLに投入するデータに'が含まれている場合に重宝しそう。
```
$ cat user.list | awk '{printf "SELECT * FROM users WHERE id = \047%s\047\n", $1}'
SELECT * FROM users WHERE id = 'user-test0001'
SELECT * FROM users WHERE id = 'user-test0002'
SELECT * FROM users WHERE id = 'user-test0003'
SELECT * FROM users WHERE id = 'user-test0004'
SELECT * FROM users WHERE id = 'user-test0005'
```

## 区切り文字の変更は-F
```
$ cat answer.csv
ans1,ans2,ans3,ans4
1,1,1,1
2,1,1,1
1,1,2,1
1,2,2,2
$ cat answer.csv | awk '{print $3}' # この場合区切れていないので何も出ない





$ cat answer.csv | awk -F ',' '{print $3}'
ans3
1
1
2
2

```
