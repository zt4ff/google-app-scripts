function createMenu() {
  const ui = SpreadsheetApp.getUi();
  const menu = ui.createMenu("PDF utility");
  menu.addItem("pdf generator", "showSidebar");

  menu.addToUi();
}

function showSidebar() {
  const ui = SpreadsheetApp.getUi();

  // sidebar user interface
  const htmlTemplate = HtmlService.createTemplateFromFile("index");
  htmlTemplate.fileName = documentProperties.getProperty("FILE-NAME")
  const html = htmlTemplate.evaluate();

  html.setTitle("PDF Generator");



  ui.showSidebar(html);
}
