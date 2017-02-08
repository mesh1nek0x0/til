function myFunction() {

}

function onMyEdit(event) {
  Logger.log(event);
  // 変更したセルに変更履歴つけまっせ
  event.range.setComment(
    "Last Modified:" + new Date() + "\n" +
    "Edit:" +
      event.range.rowStart + ":" + event.range.columnStart + "\n" +
      event.range.rowEnd + ":" + event.range.columnEnd + "\n"
  );
}

function testonChange(e) {
  // Deprecated method but show detail!
  Browser.msgBox(Utilities.jsonStringify(e));
}
