function myFunction() {
  // 選択範囲にn * m = n*mという文字を表示します
  var activeRange = SpreadsheetApp.getActiveRange();

  for (var i = 1; i <= activeRange.getNumRows(); i++) {
    for (var j = 1; j <= activeRange.getNumColumns(); j++) {
      activeRange.getCell(i, j).setValue(i + " * " + j + " = " + i*j);
    }
  }
}
