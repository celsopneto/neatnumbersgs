function onOpen(e) {
  SpreadsheetApp.getUi()
    .createMenu('neatnumbersgs')
    .addItem('Show neatnumbers', 'openMenuDialog')
    .addToUi();
}


function openMenuDialog() {
  var html = getMenu();
  SpreadsheetApp.getUi()
    .showModalDialog(html, 'neatnumbersgs.');
}


function getMenu() {
  return HtmlService.createTemplateFromFile("menu") 
    .evaluate()
    .setHeight(600)
    .setWidth(600);
}


function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
    .getContent();
}
