const documentProperties = PropertiesService.getDocumentProperties();

//TODO- run this function manually once
function initilize() {
  documentProperties.setProperty("PLACEHOLDER_IDENTIFIER", `${getPlaceHolderValueFromDocument()}`)
  documentProperties.setProperty(
    "PLACEHOLDER_HOLDER_POSITION",
    `${getPlaceHolderPosition(getPlaceHolderValueFromDocument)}`
  );
}

function getPlaceHolderValueFromDocument() {
   const documentTemplate = DocumentApp.openById(
      "19Gyi1JNpyhVxw10BFyMeH2cC6t7EVLJ27EWF6-s0ZN4"
    );

  const documentTemplateBody = documentTemplate.getBody();
  const docText = documentTemplateBody.getText();

  //Set up the reference loop
  let textStart = 0;
  let doc = docText;
  let docList = [];

  //Loop through text grab the identifier items. Start loop from last set of end identfiers.
  while (textStart > -1) {
    let textStart = doc.indexOf("{{");

    if (textStart === -1) {
      break;
    } else {
      let textEnd = doc.indexOf("}}") + 2;
      let word = doc.substring(textStart - 1, textEnd + 1);

      doc = doc.substring(textEnd);

      // include the start and end placeholder {{ and }}
      docList.push(word.substring(true, word.length - true));
    }
  }
  //return a unique set of identifiers.
  return [...new Set(docList)];
}

function getPlaceHolderPosition(getPHFromDoc) {
  const arr = [];
  const row = currentSheet
    .getRange(1, 1, 1, currentSheet.getLastColumn())
    .getValues()[0];
  getPHFromDoc().forEach((d) => {
    row.forEach((a) => {
      if (a === d.slice(2, -2)) {
        arr.push(row.indexOf(a));
      }
    });
  });
  return arr
}










