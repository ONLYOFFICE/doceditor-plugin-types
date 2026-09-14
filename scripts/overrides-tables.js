// Corrections to sdkjs's own JSDoc, kept apart from the generator that applies them so `check-arity`
// can read the table without pulling in the whole object-model generator.

// Parameters sdkjs's JSDoc marks required that are optional in fact - `@param {Type} name` where
// `[name]` was meant. The value is the index from which the rest become optional; the trailing comment
// names them. Without these the signature rejects ONLYOFFICE's own sample code: `GetRange("A2")`
// appears 5932 times across the spreadsheet examples and did not type-check.
//
// Every entry has two confirmations - the example on the member's own page calls it with fewer
// arguments, and the implementation guards against the absence (`if (!Range2)`, `undefined === col`).
// Keyed `Class.method` because `Delete`, `Search` and `ToFixed` exist on dozens of classes.
// `npm run check-arity` re-derives it and fails both ways.
const PARAM_OPTIONAL_FROM = {
  'Api.AddComment': 1,  // sAuthor  [cell]
  'Api.AddDefName': 2,  // isHidden  [cell]
  'Api.CreateOleObject': 1,  // width, height, data, appId  [word/slide]
  'Api.InsertPivotExistingWorksheet': 2,  // confirmation  [cell]
  'ApiBlockLvlSdt.Search': 1,  // isMatchCase  [word]
  'ApiChart.InsertParagraph': 1,  // sPosition, beRNewPara  [word]
  'ApiChart.SetHorAxisTitle': 2,  // bIsBold  [word/cell/slide/pdf]
  'ApiChart.SetTitle': 2,  // bIsBold  [word/cell/slide/pdf]
  'ApiChart.SetVerAxisTitle': 2,  // bIsBold  [word/cell/slide/pdf]
  'ApiCheckBoxForm.Delete': 0,  // keepContent  [word/forms]
  'ApiCheckBoxForm.ToFixed': 2,  // keepPosition  [word/forms]
  'ApiComboBoxForm.Delete': 0,  // keepContent  [word/forms]
  'ApiComboBoxForm.ToFixed': 2,  // keepPosition  [word/forms]
  'ApiComplexForm.Delete': 0,  // keepContent  [word/forms]
  'ApiComplexForm.ToFixed': 2,  // keepPosition  [word/forms]
  'ApiCustomXmlPart.GetAttribute': 1,  // name  [cell/slide]
  'ApiDateForm.Delete': 0,  // keepContent  [word/forms]
  'ApiDateForm.ToFixed': 2,  // keepPosition  [word/forms]
  'ApiDocument.GetContent': 0,  // bGetCopies  [word]
  'ApiDocument.Search': 1,  // isMatchCase  [word]
  'ApiDocument.SetAssistantTrackRevisions': 1,  // assistantName  [word]
  'ApiDocumentContent.GetContent': 0,  // bGetCopies  [word]
  'ApiDrawing.InsertParagraph': 1,  // sPosition, beRNewPara  [word]
  'ApiFormBase.Delete': 0,  // keepContent  [word/forms]
  'ApiFormBase.ToFixed': 2,  // keepPosition  [word/forms]
  'ApiFormRoles.Add': 1,  // props  [forms]
  'ApiGroup.InsertParagraph': 1,  // sPosition, beRNewPara  [word]
  'ApiImage.InsertParagraph': 1,  // sPosition, beRNewPara  [word]
  'ApiOleObject.InsertParagraph': 1,  // sPosition, beRNewPara  [word]
  'ApiParagraph.Search': 1,  // isMatchCase  [word]
  'ApiPictureForm.Delete': 0,  // keepContent  [word/forms]
  'ApiPictureForm.ToFixed': 2,  // keepPosition  [word/forms]
  'ApiPresentation.AddSlide': 1,  // nIndex  [slide]
  'ApiRange.AddComment': 1,  // sAuthor  [cell]
  'ApiRange.GetAddress': 4,  // RelativeTo  [cell]
  'ApiRichContent.GetContent': 0,  // getCopies  [pdf]
  'ApiShape.InsertParagraph': 1,  // sPosition, beRNewPara  [word]
  'ApiSignatureForm.Delete': 0,  // keepContent  [word/forms]
  'ApiSignatureForm.ToFixed': 2,  // keepPosition  [word/forms]
  'ApiSmartArt.InsertParagraph': 1,  // sPosition, beRNewPara  [word]
  'ApiTable.Search': 1,  // isMatchCase  [word]
  'ApiTable.SetShd': 2,  // g, b  [word/slide]
  'ApiTableCell.Search': 1,  // isMatchCase  [word]
  'ApiTableCell.SetCellBorderBottom': 2,  // oApiFill  [slide]
  'ApiTableCell.SetCellBorderLeft': 2,  // oApiFill  [slide]
  'ApiTableCell.SetCellBorderRight': 2,  // oApiFill  [slide]
  'ApiTableCell.SetCellBorderTop': 2,  // oApiFill  [slide]
  'ApiTableCell.SetShd': 1,  // r, g, b  [slide/pdf]
  'ApiTableCellPr.SetShd': 2,  // g, b  [word]
  'ApiTablePr.SetShd': 2,  // g, b  [word]
  'ApiTextForm.Delete': 0,  // keepContent  [word/forms]
  'ApiTextForm.ToFixed': 2,  // keepPosition  [word/forms]
  'ApiWorksheet.AddDefName': 2,  // isHidden  [cell]
  'ApiWorksheet.AddOleObject': 5,  // nFromCol, nColOffset, nFromRow, nRowOffset  [cell]
  'ApiWorksheet.GetCells': 0,  // row, col  [cell]
  'ApiWorksheet.GetRange': 1,  // Range2  [cell]
  'ApiWorksheet.Move': 1,  // after  [cell]
};

module.exports = { PARAM_OPTIONAL_FROM };
