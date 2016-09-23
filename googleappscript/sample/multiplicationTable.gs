function myFunction() {
  // genarate i*j grid
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  for (var i = 1; i < 10; i++) {
    for (var j = 1; j < 10; j++) {
      sheet.getRange(i, j).setValue(i * j);
    }
  }

  // calculate row & column total
  for (var i = 1; i < 10; i++) {
    var rowSum = 0;
    var columnSum = 0;
    for (var j = 1; j < 10; j++) {
      rowSum += sheet.getRange(j ,i).getValue();
      columnSum += sheet.getRange(i, j).getValue();
    }
    sheet.getRange(i, j).setValue(rowSum);
    sheet.getRange(j, i).setValue(columnSum);
  }
}
