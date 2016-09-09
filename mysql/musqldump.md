# mysqldumpに関するtips
##  --skip-opt
-optの内容をスキップするオプション組み合わせて使う
```
root@f8e598ef9a72:/# mysqldump -u root -p --skip-extended-insert sample staff > skip-option.sql   
Enter password:
root@f8e598ef9a72:/# grep 'INSERT' skip-option.sql                                             
INSERT INTO `staff` VALUES (1,'Hoge','Kanazawa',27); # 本来まとめて出力されるはずがskipされている
INSERT INTO `staff` VALUES (2,'Piyo','Tokyo',27);
INSERT INTO `staff` VALUES (3,'Foo',NULL,27);
```


## --extended-insert, -e

> 複数の VALUES リストを含む、複数行の INSERT 構文を使用します。
> これにより、ダンプファイルのサイズが小さくなり、ファイルがリロードされる際の挿入が高速化されます。

なお、デフォルトでONになっている模様
```
root@f8e598ef9a72:/# mysqldump -u root -p sample staff > no-option.sql
Enter password:
root@f8e598ef9a72:/# grep 'INSERT' no-option.sql
INSERT INTO `staff` VALUES (1,'Hoge','Kanazawa',27),(2,'Piyo','Tokyo',27),(3,'Foo',NULL,27);

```

## --complete-insert, -c

> カラム名を含む、完全な INSERT ステートメントを使用します。
各行きちんと欲dumpが欲しい場合もあるよね

```
root@f8e598ef9a72:/# mysqldump -u root -p -c --skip-extended-insert sample staff > complete-option.s # わかりやすいように--skip-extended-insertをつけています
Enter password:
root@f8e598ef9a72:/# grep 'INSERT' complete-option.sql            
INSERT INTO `staff` (`id`, `name`, `branch`, `age`) VALUES (1,'Hoge','Kanazawa',27);
INSERT INTO `staff` (`id`, `name`, `branch`, `age`) VALUES (2,'Piyo','Tokyo',27);
INSERT INTO `staff` (`id`, `name`, `branch`, `age`) VALUES (3,'Foo',NULL,27); # NULLの部分もカラム名が入っている
```
