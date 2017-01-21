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