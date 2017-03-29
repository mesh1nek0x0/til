# overview
スタンドアローンなJS用テストライブラリ。

spy, stub, mockが利用できる。

公式：http://sinonjs.org

## 特徴
* spy
 * テスト対象の状態をテストします
 * 何回呼ばれた？
 * IN/OUTは意図通り？
 * 操作に手が加えられるわけではない
 * まさにspyだ
* stub
 * テストの返却値を変更します
 * 便利なことにspyとしても利用できるそうな
* fake
 * serverやtimeを操作できる
 * レスポンスを変えられる模様
 * 時間を進めたり戻したりできる模様

## quickstart
基本的にテストは開発onlyなので--save-dev
```
$ npm install --save-dev sinon mocha assert
```

テストを書いて実行します。

```
$(npm bin)/mocha spy.js
$(npm bin)/mocha stub.js
$(npm bin)/mocha fake-time.js
```