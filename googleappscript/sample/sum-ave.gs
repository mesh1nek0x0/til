function myFunction() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var range = sheet.getRange(1, 11, 5);
  for (var i = 1; i <= range.getNumRows(); i++) {
    // radomでは0~1の値がランダムで出力されるため
    range.getCell(i, 1).setValue(Math.random() * (100 - 1) + 1);
  }
  sheet
  .getRange(i, 11)
  .setFormulaR1C1("=SUM(R[-5]C[0]:R[-1]C[0])")
  .setNumberFormat("0.00")

  sheet
  .getRange(i+1, 11)
  .setFormulaR1C1("=AVERAGE(R[-6]C[0]:R[-2]C[0])")
  .setNumberFormat("0.00")
  .setBorder(true, false ,true, false, false, false);
}
