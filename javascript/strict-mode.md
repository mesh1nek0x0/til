# what is "use strict"
javascriptでよくみかけるこいつ。

なんでも構文チェックをより厳密（strict）にしてくれるらしい。

ECMAScript5から使えるとのこと。

グロバール汚染が激しいと噂のjavascriptはこういう書き方もOKなんですが
```
hoge = "foo";
console.log(hoge);
```

```
$ node non-strict.js
bar # 実行できちゃう！！！
```

一方、strictでやると...

```
$ node strict
/Users/iida-ryota/Documents/til/javascript/strict.js:3
hoge = "bar"
     ^

ReferenceError: hoge is not defined # 定義されてねぇ！と怒られる。
    at Object.<anonymous> (/Users/iida-ryota/Documents/til/javascript/strict.js:3:6)
    at Module._compile (module.js:541:32)
    at Object.Module._extensions..js (module.js:550:10)
    at Module.load (module.js:456:32)
    at tryModuleLoad (module.js:415:12)
    at Function.Module._load (module.js:407:3)
    at Function.Module.runMain (module.js:575:10)
    at startup (node.js:160:18)
    at node.js:445:3
local-mesh1neko:javascript[master]
```

好き好んでグローバル変数使う人いないもんね。

typoで間違えてグローバル変数が作られたりもしないし、知らないと謎のおまじないですが、知ってみるといいやつですね。

その他今後のECMAScriptでの予約語が使えなくなったりもする。

素直にしたがっておく方が自分も困らなくてハッピーである。

特記事項を学習したらまた追記する。
