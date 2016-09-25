// cmd + :でできることをわざわざね！
function onOpen(event) {
  var functions = [
    {name: "現在日時の表示", functionName: "setNow"},
  ];

  SpreadsheetApp.getActiveSpreadsheet().addMenu(
     "追加機能", functions
  );
}

function setNow() {
  SpreadsheetApp.getActiveRange().setValue(new Date());
}
