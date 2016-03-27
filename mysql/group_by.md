# 集約関数GROUP BYに関するtips

## GROUP_CONCAT()
GROUP_BYに指定した以外の値も表示したい時に使える。

本来GROUP BYに指定した値以外は丸められ？てしまって分からなくなるが

連結して出力するように指定すると、お望みの値が取得できます。

※本来は複数の値を連結して出力するようです。

また、連結できる最大文字数には限度があるので注意

cf. [MySQL公式:GROUP_CONCAT](http://dev.mysql.com/doc/refman/5.6/ja/group-by-functions.html#function_group-concat)

```
mysql> SHOW VARIABLES LIKE 'group_concat_max_len';
+----------------------+-------+
| Variable_name        | Value |
+----------------------+-------+
| group_concat_max_len | 1024  |
+----------------------+-------+
1 row in set (0.00 sec)
```

実行sample
```bash
mysql> SELECT VERSION();
+-----------+
| VERSION() |
+-----------+
| 5.6.29    |
+-----------+
1 row in set (0.00 sec)

mysql> use example;
Database changed
mysql> show create table access_logs\G
*************************** 1. row ***************************
       Table: access_logs
Create Table: CREATE TABLE `access_logs` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `ip_address` varchar(20) NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=latin1
1 row in set (0.00 sec)

mysql> SELECT COUNT(*) FROM access_logs;
+----------+
| COUNT(*) |
+----------+
|      100 |
+----------+
1 row in set (0.00 sec)

# 集計して5件未満だけ
mysql> SELECT COUNT(ip_address) as cnt FROM access_logs GROUP BY ip_address HAVING  cnt < 5;
+-----+
| cnt |
+-----+
|   2 |
|   2 |
|   2 |
|   1 |
+-----+
4 rows in set (0.00 sec)

# GROUP BYに指定したip_address以外でまとめられてしまっている、idを出すと...
mysql> SELECT COUNT(ip_address) as cnt, GROUP_CONCAT(id) FROM access_logs GROUP BY ip_address HAVING  cnt < 5;
+-----+------------------+
| cnt | GROUP_CONCAT(id) |
+-----+------------------+
|   2 | 48,60            |
|   2 | 74,86            |
|   2 | 66,80            |
|   1 | 72               |
+-----+------------------+
4 rows in set (0.00 sec)
```
