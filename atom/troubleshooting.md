# atom関連のtroubleシュート

## auto hide tree viewがautoじゃなくなった
途中でクラッシュしてから動かなくなった。
どうやらその際固定モードに切り替わったみたい。

cmd + shift + p
からhideと入力して
unpinを選択すると復活する模様

## linter-eslintを入れたがうまく動作しない
core packageのwhitespaceと競合していたので

whitespaceの設定を切りました。

## terminal-plusが動くけど入力できない
すでにissueが上がっていました。

https://github.com/jeremyramin/terminal-plus/issues/201

一時的な解決策はこちらの通り、私も解決しました。

これはブランチの指定の解除忘れなんですかね...
https://github.com/jeremyramin/terminal-plus/issues/402

>In ~/.atom/packages/terminal-plus/package.json in the dependencies section
>remove the commit id (#......) at the end of the pty.js entry:

なにはともあれ、packageを自分でrebuildできる方法あるんですね。勉強になりました。