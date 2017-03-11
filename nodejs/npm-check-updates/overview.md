# overview
npmアップデートを手軽にできるパッケージ

npm標準のoutdatedだと更新の確認できるけど、更新自体の手間は別途かかるのでそれをいい感じにできる

公式: https://github.com/tjunnone/npm-check-updates

## quick start
### install
グローバルで入れたかったけど、docker上のだったので今回はローカルに。
```
$ npm install --save-dev npm-check-updates
```

### check update
デフォルトでpackage.jsonに記載されている内容を確認してくれる。個別指定も可能。

```
$ (npm bin)/ncu
googleapis   ^16.1.0  →  ^18.0.0
gulp-notify   ^2.2.0  →   ^3.0.0
```

個別の場合はこちら ※正規表現使える
```
$ $(npm bin)ncu [package-name]
```

### update package.json
-u オプションをつけて実行するとpackage.jsonを更新してくれる
