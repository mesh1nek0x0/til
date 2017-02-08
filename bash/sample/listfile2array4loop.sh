#!/bin/bash
# *.listファイルを読み込んで配列にしてloopする
targetFile='hoge.list'

### ()を忘れると配列にならないので注意
cmds=(`cat $targetFile | awk '{printf "[command] %s %s %s", $1, $2, "\n"}'`)

### 配列はデフォルトが半角スペース区切りのため、一旦改行区切りに変える
IFS_BAK=$IFS
IFS=$'\n'
for cmd in "${cmds[@]}"; do
    eval $cmd
done

## 配列の区切りを元の値に戻す
IFS=$IFS_BAK
