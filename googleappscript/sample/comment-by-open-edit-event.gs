function myFunction() {

}

function onOpen(event) {
  var sheet = event.source.getActiveSheet();
  sheet.getRange("A1").setComment("OPEN:" + event.user.getEmail());
}
function onEdit(event) {
  var sheet = event.source.getActiveSheet();
  event.range.setComment("Last Modified:" + new Date());
}
