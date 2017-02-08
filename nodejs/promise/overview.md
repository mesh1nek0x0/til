# promiseについて
## ざっくり
* 非同期処理を行う
* 非同期処理を並列したり直列（すなわち同期処理）したりできる
* エラーについて明示的に書きやすい
* コールバック地獄から解消

## API仕様
### コンストラクタ
* 利用するためにPromiseインスタンスが必要
 * 処理が終わったらresolveまたはrejectedを呼ぶ
```
var promise = new Promise(function(resolve, reject) {
  // hogehoge
});
```
### instanceメソッド
* thenというメソッドがある
 * resolveするかrejectするかで次の処理がかわる
 * resolve -> onFulfilled
 * reject -> onRejected
 * どちらもオプショナル引数
```
promise.then(onFulfilled, onRejected)
```

※なお、rejectされた際はpromise.catchで最終的に捕まるようです。

### staticメソッド
Promiseを扱う上での補助的なメソッドがいくつかあるらしい

## 状態の概念
４つの状態の概念が存在します。
* Fulfilled
 * resolveした状態
* Rejected
 * rejectした状態
* Pending
 * resolveもrejectもされてない初期状態
* Settled
 * resolveあるいはrejectした状態。上の２つをまとめた状態

## 簡単な書き方
ざっくりいうとreturn文をnew Promiseする感じです。

* return文をPromiseインスタンスにする
* コンストラクタとしてやりたい処理を書く
* 処理が正常に成功したらresolveする
* 異常が発生したらrejectする
* 呼び出す側はthen, then...,catchと処理を書く