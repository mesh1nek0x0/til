# みつけたtips

## シンタックスシュガー
普通に文字列連結するとめんどいのがいい感じにかける

```
var a = 'hoge';
// normal
console.log('hoge ' + a + ' bar');

// syntax sugar
console.log(`hoge ${a} bar`);
```

## 配列の最大・最小値
Math.(max/min).applyをつかう

maxやminは数値を可変長で受け取るため、配列では受け取れない。

そのため、applyでをかますことで配列を展開して渡せるようだ。

なお、配列が大きいとエラーになるらしいので留意すること

```
var scores = [72, 93, 85, 68];
console.log(Math.max.apply(null, scores));
```

## 連想配列(hash)のforEach
通常の配列はforEachできるんですが、hashはできません。Object.keysを活用するようです

```
var scores = {Foo: 72, Bar: 93, Hoge: 85, Hogera: 68};
Object.keys(socres).forEach(function (name) {
  console.log(`${name}'s score is ${scores[name]}`);
});
```

## 連想配列(hash)で値からkeyを導出
Object.keysでfilterすればとれるよ。配列ぶん回すよりスマートですね。
```
var scores = {Foo: 72, Bar: 93, Hoge: 85, Hogera: 68};
Object.keys(scores).filter(function (key) {
  return scores[key] === 93;
});

```
