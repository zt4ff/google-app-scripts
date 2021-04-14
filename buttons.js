const currentSheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

function pdfGenerator(number) {
  const pdfGeneratorData = {};
  const row = currentSheet
    .getRange(number, 1, 1, currentSheet.getLastColumn())
    .getValues();
  const rowData = documentProperties
    .getProperty("PLACEHOLDER_HOLDER_POSITION")
    .split(",")
    .map((value) => Number(value));

  documentProperties.getProperty("PLACEHOLDER_IDENTIFIER").split(',').forEach((placeholder, index) => {
    pdfGeneratorData[placeholder] = row[0][rowData[index]] || "";
  });
  return pdfGeneratorData
}


function getPDFFromRowNumber(number) {
  try {
    const pdfGeneratorData = pdfGenerator(number);

    // change the format of timestamp if it exists
    if (pdfGeneratorData["{{Timestamp}}"]) {
      pdfGeneratorData["{{Timestamp}}"] = Utilities.formatDate(pdfGeneratorData["{{Timestamp}}"], "GMT+2", "dd.MM.yyyy")
    }
    createPDF(pdfGeneratorData)
  } catch (error) {
    Logger.log(error);
  }
}

function sendEmail(number) {
  try {
    const pdfGeneratorData = pdfGenerator(number)
    const email = pdfGeneratorData["{{Email}}"];
    const formattedName = pdfGeneratorData["{{First name and Last name}}"].replaceAll(/ +?/g, "_");
    const formattedDate = Utilities.formatDate(pdfGeneratorData["{{Timestamp}}"], "GMT+2", "yyyyMMdd")
    // change the format of timestamp if it exists
    if (pdfGeneratorData["{{Timestamp}}"]) {
      pdfGeneratorData["{{Timestamp}}"] = Utilities.formatDate(pdfGeneratorData["{{Timestamp}}"], "GMT+2", "dd.MM.yyyy")
    }
    if (email) {
      MailApp.sendEmail({
        to: "segunkayode00@gmail.com",
        subject: `Confidentiality_Agreement_-_${formattedName}_${formattedDate}.pdf`,
        attachments: [createPDF(pdfGeneratorData, true)]
      });
    }


  } catch (error) {
    Logger.log(error)
  }
}

function updateMarker() {
  initilize()
}

function setFileName(name) {
  documentProperties.setProperty("FILE-NAME", name)
}

function test() {
  sendEmail(210)
}