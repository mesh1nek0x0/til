# awkを使うときに覚えておきたいtips

## '(シングルクォート)をエスケープする
\047または'\''で囲む。前者の方がエスケープ祭りにならなくてよさそう。

MySQLに投入するデータに'が含まれている場合に重宝しそう。
```
iida-ryota:tmp iida-ryota$ cat user.list | awk '{printf "SELECT * FROM users WHERE id = \047%s\047\n", $1}'
SELECT * FROM users WHERE id = 'user-test0001'
SELECT * FROM users WHERE id = 'user-test0002'
SELECT * FROM users WHERE id = 'user-test0003'
SELECT * FROM users WHERE id = 'user-test0004'
SELECT * FROM users WHERE id = 'user-test0005'
```
