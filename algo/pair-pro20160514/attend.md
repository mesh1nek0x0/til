# 第35回アルゴリズム勉強会 参加ログ
2016/05/14

https://www.facebook.com/events/1703497296572920/

# 概要
以下の繰り返し。
1. ペアプロでhttp://yukicoder.me/の指定問題に挑戦
1. みんなでコードレビュー

今回は以下の３本立て。
1. 世界のなんとか
1. 干支の置物
1. 回転寿司

## [世界のなんとか](http://yukicoder.me/problems/560)
3の倍数と3がつくときにechoする感じです。

### ▼結果
strposで。最後のcontinue要らないよね...
http://yukicoder.me/submissions/92131

## [干支の置物](http://yukicoder.me/problems/924)
しましまにしまっしま。

PHPタグ付け忘れてWAたくさん出しました。スミマセン。

### ▼結果
思いついた案が正解だった。十二支に騙されてはいけない。
http://yukicoder.me/submissions/92150

## [回転寿司](http://yukicoder.me/problems/78)
おいしいお寿司をたくさん食べる計画。

### ▼結果
４個ずつ区切ればいいのでは？と思ったけど、
２個飛ばしに阻まれた。

ペアの人に助けられなんとかAC。動的計画法というらしい。

最大値だけわかればよかったのでその時点の最大値をpushしてpopするのを繰り返しました。

ちょっとしゃくとり法みたいな書き方になってしまった？
http://yukicoder.me/submissions/92186

# 所感
さらでかけるのはPHPだったので、PHPで挑戦でした。
最近shell芸も覚えてきたからbashでもよかったかな、と反省。

DP(Dynamic Programming)は名前だけ聞いた事あったけど、
ちゃんと学習できてよかった。復習がてらpaizaのDP問題にも挑戦したら違う事でハマった。
