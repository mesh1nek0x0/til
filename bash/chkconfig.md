# chkconfig
ランレベルの設定コマンド。自動起動設定ででてくるやつです。

macにはありませんでした。でも自動起動設定はあるので、別のコマンドがありそうです。

## 自動起動設定の確認
```
### 個別確認
$ chkconfig --list [service]

### 一覧確認
$ chkconfig --list
```

## 自動起動設定の追加
```
$ chkconfig --add [service]
```

## 自動起動設定のon
デフォルトでランレベル2~5がONになる。だいたいこれで自動起動OKです
```
$ chkconfig on [service]
```
