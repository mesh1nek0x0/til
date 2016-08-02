# ORDER BY tips
デフォルトはASC。忘れがちなのでメモメモ。

```
$ docker run --name mysql -e MYSQL_ROOT_PASSWORD=toor -d -p 3306:3306 mysql:latest
$ docker exec -it `docker ps -alq` bin/bash
# mysql -u root -p
Enter password:
mysql> create database example;
Query OK, 1 row affected (0.00 sec)

mysql> use example
Database changed
mysql> create table goods(id int, name varchar(20), price int);
Query OK, 0 rows affected (0.03 sec)

mysql> INSERT INTO goods VALUES(1, 'hoge', 100), (2, 'foo', 300), (3, 'bar', 50);
Query OK, 3 rows affected (0.01 sec)
Records: 3  Duplicates: 0  Warnings: 0

mysql> SELECT * FROM goods ORDER BY price;
+------+------+-------+
| id   | name | price |
+------+------+-------+
|    3 | bar  |    50 |
|    1 | hoge |   100 |
|    2 | foo  |   300 |
+------+------+-------+
3 rows in set (0.00 sec)

mysql> SELECT * FROM goods ORDER BY price DESC;
+------+------+-------+
| id   | name | price |
+------+------+-------+
|    2 | foo  |   300 |
|    1 | hoge |   100 |
|    3 | bar  |    50 |
+------+------+-------+
3 rows in set (0.00 sec)
```
