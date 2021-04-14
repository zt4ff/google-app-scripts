// String.prototype.replaceAll polyfill
String.prototype.replaceAll = function (search, replacement) {
  var target = this;
  return target.replace(new RegExp(search, 'g'), replacement);
};

function escapeRegex(string) {
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}

function createPDF(pdfGeneratorData, shouldReturnPDFBlob) {
  try {
    const temporaryFolder = DriveApp.getFolderById(
      "12WnO7Y0qFrB3PXL3fAggL5klmwSltd4X"
    );
    const pdfFolder = DriveApp.getFolderById(
      "1Qwqm8R80tKDwWvKf-kkrHDXLM8rzotZY"
    );
    const documentTemplate = DriveApp.getFileById(
      "19Gyi1JNpyhVxw10BFyMeH2cC6t7EVLJ27EWF6-s0ZN4"
    );
    const documentTemplateCopy = documentTemplate.makeCopy(temporaryFolder);
    const openedDocumentTemplateCopy = DocumentApp.openById(
      documentTemplateCopy.getId()
    );
    const openedDocumentTemplateCopyBody = openedDocumentTemplateCopy.getBody();

    for (placeholder in pdfGeneratorData) {
      openedDocumentTemplateCopyBody.replaceText(
        escapeRegex(placeholder),
        pdfGeneratorData[placeholder]
      );
    }

    openedDocumentTemplateCopy.saveAndClose();

    const pdfContentBlob = documentTemplateCopy.getAs(MimeType.PDF).setName(documentProperties.getProperty("FILE-NAME").replaceAll(/\{\{.+?\}\}/g, marker =>
      pdfGeneratorData[marker]) || "default");

    if (shouldReturnPDFBlob) return pdfContentBlob

    pdfFolder
      .createFile(pdfContentBlob)

    temporaryFolder.removeFile(documentTemplateCopy);


  } catch (error) {
    Logger.log(error);
  }
}