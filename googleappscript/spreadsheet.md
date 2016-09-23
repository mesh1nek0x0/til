# Google Spread Sheetに関する知識
GASで操作するために必要なGSSの構造について

## オブジェクト
### SpreadsheetAppオブジェクト
まずはここからスプレッドシートのインスタンスをGETできるようです。

### Spreadsheetオブジェクト
どうやら１スプレッドシートのインスタンスのようです。

### Sheetオブジェクト
シートを管理するオブジェクト。きっとSpreadsheetオブジェクトから生成されるインスタンスで、切り替えたり名前変えたりできそう。嬉しい！！！

### Rangeオブジェクト
セルの範囲を管理するオブジェクト。きっとSheetオブジェクトから生成されるインスタンスで、セルの内容を変更できる、嬉しい！！！

※セルのオブジェクトは存在せず、Rangeの最小=セルという認識です。

## よく使うメソッド

### SpreadsheetApp.getActiveSpreadsheet(void):Spreadsheet
現在開いているスプレッドシートのSpreadsheetオブジェクトを取得できます。

cf. https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet-app#getActiveSpreadsheet()

### SpreadSheet.getActiveSheet(void):Sheet
自分が属しているSpreadSheetオブジェクトで現在表示されているシートを取得できるようです。

cf. https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet#getActiveSheet()

### Sheet.getRange(row, column):Range
指定の範囲（※ここでは行と列の指定のためセルになる）を取得できるようです。
複数行・列の取得の場合は以下の引数が増えます。

* getRange(row, column, numRows):Range
* getRange(row, column, numRows, numColumns):Range

引数を見る感じ列でまとめて撮る場合は、1行n列という取り方になりますね。

cf. https://developers.google.com/apps-script/reference/spreadsheet/sheet#getRange(Integer,Integer)
cf. https://developers.google.com/apps-script/reference/spreadsheet/sheet#getrangerow-column-numrows
cf. https://developers.google.com/apps-script/reference/spreadsheet/sheet#getrangerow-column-numrows-numcolumns

### Range.getValue(void):Object
指定の範囲の左上のセルの値を取得できる。中に入っている値によって返却される値の型は変わります。
範囲内全部を取得するときはgetValues(void):Object[]というメソッドを使う。

cf. https://developers.google.com/apps-script/reference/spreadsheet/range#getValue()


### SpreadSheetApp.getActiveRange():Range
現在選択中のRangeオブジェクトがとれる。
※複数選択した場合は最後に選択した範囲を取得。

cf. https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet#getActiveRange()


### Range.getCell(row, column):Range
範囲内のセルを相対的なrow, column指定で取得できる。ここでいう相対というのは選択範囲の左上を1, 1とするという意味です。

### Range.getNumRows(void):Integer
選択範囲の行数を取得できる。

### Range.getColumnRows(void):Integer
選択範囲の列数を取得できる。

## セルのプロパティ操作でつかうメソッドについて
rangeに対してメソッドが生えているので各プロパティ毎に、get/setでそれぞれ2種類のメソッドがあります（単体と複数）。
また、いずれもRangeオブジェクトを返します。

* Background(s)
 * 背景色。CSSのカラーコードで表記する。
* FontColor(s)
 * 文字色。CSSのカラーコードで表記する。
* FontFamily(ies)
 * 文字フォント。文字列で指定する。
* FontSize(s)
 * 文字の大きさ。数値で指定します。
* FontStyle(s)
 * italic, normal, obliqueの３種類のみ。boldは別指定。
* FontWeight(s)
 * normalかboldのいずれかで指定します。ここの区別はよくわかりませんね。

## フォーマットとフォーミュラ
訳通りいくと形式と計算式ですね。これらもrangeに対してメソッドが生えているので、get/setでそれぞれ2種類のメソッドがあります（単体と複数）。また、いずれもRangeオブジェクトを返します。※borderは除く

* NumberFormat(s)
 * 数字の表示形式。果たして日時の形式もここに含まれるのかな？
* Formula(s)
 * 計算式です。=SUM(A1:A3)的な
* Formula(s)R1C1
 * これも計算式です。ただし、計算するセルの指定は絶対指定でなく、相対的な指定です。

```
cell.setFormulaR1C1("=SUM(R[-3]C[0]:R[-1]C[0])");
```
cf. https://smurfonspreadsheets.wordpress.com/2007/11/12/r1c1-notation/

* border
 * 枠線です。こいつはsetしかありません。
