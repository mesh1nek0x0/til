# 無名関数に関するメモ
anonymous functionというそうな。匿名ですね。

JavaScriptはグローバル汚染の問題が深刻なのもあって無名関数形式が流行ったのかしら。

callbackで変数として渡してしまえるのも個人的に吉。

文字通り以下のような、よく関数定義と異なる。
```

// よくある関数定義
function cry() {
  console.log('nyaooooooo!');
}

cry();
```

変数に直接入れてしまいます。
```
// 名前を省略した無名関数定義
var dog = function () {
  console.log('waoooooooo!');
}

dog();
```

それぞれ実行すると...
```
$ node anonymous-function.js
nyaooooooo!
waoooooooo!
```
