# overview
feature-richなjsテストフレームワーク

jsのテストといえばこれで決まり感ある

アサーションライブラリは含まれないため、chaiと一緒に使われることが多い印象。

公式：http://mochajs.org/

## 特徴
* describeとitでテストを区切る
 * describeは大きな区切り、今回のサンプルだと2rgbなのか2hexなのか
 * itは詳細項目、今回のサンプルだとstatus200とか結果とか
* 結果はreporterを指定することで変化する
 * nyanもあるよ
* 非同期のテストを行う際は注意が必要
 * コールバックにdoneメソッドを呼び出すことで、ちゃんと待ってくれる
* mocha自体に変更検知機能もある
```
$ $(npm bin)/mocha -w test/converte
r.js
```

## quikstart
package.jsonがある前提です。
```
$ npm install --save-dev mocha chai
$ $(npm bin)/mocha
$ mkdir test
$ touch test/mocha-sample.js
```
テストを書きます
```
$ cat test/mocha-sample.js
const expect = require('chai').expect;

describe('moche sample test', function () {
  it('sample testcase 1', function () {
    var result = 1 + 1;
    expect(2).to.equal(result);
  });
});
``
実行します
```
$(npm bin)/mocha test/mocha-sample.js


  moche sample test
    ✓ sample testcase 1


  1 passing (8ms)
```

## 参考
http://dev.classmethod.jp/server-side/node-mocha/
https://semaphoreci.com/community/tutorials/getting-started-with-node-js-and-mocha