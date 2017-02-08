function myFunction() {
  // 選択範囲を市松模様で色づけします
  var activeRange = SpreadsheetApp.getActiveRange();

  var row = activeRange.getNumRows();
  var column = activeRange.getNumColumns();

  var fontBorderColors = new Array("black", "blue");
  var backBorderColors = new Array("gray", "aqua");
  var borderColors = new Array(2);

  for (var i = 0; i < 2; i++) {
    borderColors[i] = new Array(row);
    for (var j = 0; j < row; j++) {
      borderColors[i][j] = new Array(column);
    }
  }

  for (var i = 0; i < row; i++) {
    for (var j = 0; j < column; j++) {
      borderColors[0][i][j] = fontBorderColors[(i+j)%2];
      borderColors[1][i][j] = backBorderColors[(i+j)%2];
    }
  }
  activeRange.setFontColors(borderColors[0]);
  activeRange.setBackgrounds(borderColors[1]);
}
