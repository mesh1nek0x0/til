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