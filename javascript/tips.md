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