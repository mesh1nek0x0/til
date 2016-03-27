# 言わずと知れた置換コマンドtips
## TABの指定（mac）
* Ctrl+v -> Tab

Ctrl+vを入力することで、補完とは区別される模様

※ただし、この場合コピペでは意図通り動作しない

### e.g. tsv -> csv
```bash
local-mesh1neko:tmp iida-ryota$ cat user.tsv
男	10代	関東	無	有	有	学生
女	20代	関西	有	無	有	会社員
男	30代	中部	無	有	無	自営業
女	20代	北陸	無	有	無	会社員
# Ctrl+v -> Tabで入力
local-mesh1neko:tmp iida-ryota$ sed -e 's/      /,/g' user.tsv > user.csv
local-mesh1neko:tmp iida-ryota$ cat user.csv
男,10代,関東,無,有,有,学生
女,20代,関西,有,無,有,会社員
男,30代,中部,無,有,無,自営業
女,20代,北陸,無,有,無,会社員
# コマンドをコピペして実行
local-mesh1neko:tmp iida-ryota$ sed -e 's/      /,/g' user.tsv > user.csv
local-mesh1neko:tmp iida-ryota$ cat user.csv
男	10代	関東	無	有	有	学生
女	20代	関西	有	無	有	会社員
男	30代	中部	無	有	無	自営業
女	20代	北陸	無	有	無	会社員
```
