# cpコマンドのtips

## 複数指定
半角スペース区切りで複数指定できた...

cp [OPTION]... SOURCE... DIRECTORY

SOURCE...とは複数でもよいのである。

```
$ touch a b c
$ ls
a
b
c
$ mkdir target-dir
$ ls -l target-dir/
$ cp a b c target-dir/
$ ls target-dir/
a
b
c
```
