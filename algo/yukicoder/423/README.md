# 427 テレビ
https://yukicoder.me/problems/no/423

## 方針
* ruby
 * ハムスター語の数字しか与えられないのでhamu or ham
 * 先にhamuを1に変換して次にhamを0に変換すればhamuをhamに誤変換しない
 * leading hamsは許されないので、計算結果が0からはじまることはない
 * ハムスター語→2進数→10進数*2→2進数→ハムスター語

## 結果
### ruby
１発ACならず...pとputsは気をつけましょうね

2進数<->10進数の変換がto_i(2), to_s(2)でできるのは便利ですね

https://yukicoder.me/submissions/142359

