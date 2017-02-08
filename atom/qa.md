# atom関連で解決した疑問
問題にはならないんだけど、やりにくいから解消した系

## フォルダのツリービューが右側
こういうのはだいたい左にあるのに...
1. メニューバーの[Packages]
1. [Tree View]の[Toggle Tree Side]

これでTreeされるSideがToggleます。

## ツリービューが邪魔
フォーカスを合わせると出てくるパッケージがあるのでインストールすれば解決。

すばらしい！！！

cf. https://atom.io/packages/autohide-tree-view

## フォルダのツリービューがしょぼい
ファイルの種類に応じてアイコン表示とかしたい
```
$ apm install file-icons
```
cf. https://atom.io/packages/file-icons

Dockerfileとかもちゃんとくじらアイコンになる嬉しい


## スペースを可視化したい
Atom -> Preference -> show invisibles

## 全角スペースも可視化したい
つshow-ideographic-space
