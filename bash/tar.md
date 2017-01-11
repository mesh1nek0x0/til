# tar tips
アーカイブコマンドのtips

## 特定のディレクトリを除きたい
--exclude <FILE/DIRECTORY>と指定することで可能です

注意点としてはパターンマッチとなるため、サブディレクトリも全部含まれてしまいます。

また-X [*.list]と指定することも可能です

```
### こういうディレクトリがあった場合
$ tree test
test
├── foo.log
├── hoge.log
└── piyo
    └── piyo.log

1 directory, 3 files

### そのままアーカイブすると
$ tar czvf test.tar.gz test/
a test
a test/foo.log
a test/hoge.log
a test/piyo
a test/piyo/piyo.log

### このように全部が対象になりますが...
$ tar tzvf test.tar.gz | grep log
-rw-r--r--  0 iida-ryota wheel       0  1 11 21:11 test/foo.log
-rw-r--r--  0 iida-ryota wheel       0  1 11 21:11 test/hoge.log
-rw-r--r--  0 iida-ryota wheel       0  1 11 21:11 test/piyo/piyo.log

### --excludeを指定することで...
$ tar czvf test-exclude.tar.gz --exclude piyo test
a test
a test/foo.log
a test/hoge.log

### piyo配下が除かれました！やったね！
$ tar tzvf test-exclude.tar.gz | grep log
-rw-r--r--  0 iida-ryota wheel       0  1 11 21:11 test/foo.log
-rw-r--r--  0 iida-ryota wheel       0  1 11 21:11 test/hoge.log

### 注意が必要なパターン
$ tree test
test
├── foo
│   ├── foo
│   │   └── hoge.log
│   └── hoge.log
├── hoge
│   └── foo
└── piyo
    ├── foo
    │   └── hoge.log
    └── hoge.log

6 directories, 4 files
### フルパスを指定すれば特定のものだけ除外できる
$ tar czvf test-exclude.tar.gz --exclude ./test/foo test
a test
a test/hoge
a test/piyo
a test/piyo/foo
a test/piyo/hoge.log
a test/piyo/foo/hoge.log
a test/hoge/foo

### 文字列だけ指定すると全部除かれます
$ tar czvf test-exclude.tar.gz --exclude foo test
a test
a test/hoge
a test/piyo
a test/piyo/hoge.log

### -Xで指定するパターン
$ cat extract.list 
test/foo/hoge.log
test/piyo/hoge.log

### 指定のものだけ除かれている
$ tar czvf test-X.tar.gz -X extract.list test
a test
a test/foo
a test/hoge
a test/piyo
a test/piyo/foo
a test/piyo/foo/hoge.log
a test/hoge/foo
a test/foo/foo
a test/foo/foo/hoge.log
```


