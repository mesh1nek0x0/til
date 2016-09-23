function myFunction() {
  var values = SpreadsheetApp.getActiveRange().getValues();
  var sum = 0;

  for (row in values) {
    for (column in values[row]) {
      sum += values[row][column];
    }
  }
  Browser.msgBox(sum);
}
