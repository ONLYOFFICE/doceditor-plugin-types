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

// Returns that sdkjs's JSDoc gives as `{object}` over an implementation that returns something
// specific. `object` is not a weak type in TypeScript, it is an empty one: no member of it can be
// read, and a cast away from it is unchecked because there is nothing to check against. So these
// are the entry points where the types stop helping entirely - `GetByInternalId`, reading document
// properties, parsing JSON.
//
// A stopgap, and meant to be switched off one entry at a time. sdkjs is being fixed upstream; when
// a fix lands, `generate-types.js` fails with the key to delete rather than quietly shadowing the
// now-correct annotation. Deleting the entry is then the whole change.
//
// Keyed `editor.Class.method`, because the same name means different things per editor: `Api.
// FromJSON` returns a builder object in Word and nothing in Slide, and `GetPosition` is a comment
// anchor, a cell anchor, a Point or a font offset depending on where you ask. The key is also what
// the failure prints, so it has to be unambiguous.
//
// Every entry is derived from the implementation, named in its comment. None is a guess: where the
// implementation could not be read, the `object` was left alone (`ApiFormRoles#GetRoleColor` was in
// this list until its JSDoc turned out to be complete and the gap to be in our own parser).
const RETURN_TYPE_OVERRIDE = {
  // `if (!obj) return null`, then an `instanceof` chain constructing nine classes. The tenth arm,
  // `obj.IsForm() ? ToApiForm(obj) : ...`, reaches ToApiForm, which constructs ApiTextForm,
  // ApiComboBoxForm, ApiCheckBoxForm, ApiPictureForm, ApiDateForm, ApiSignatureForm and
  // ApiComplexForm - all ApiFormBase subclasses, named by their common base here.
  'word.Api.GetByInternalId':
    'ApiDocument | ApiDocumentContent | ApiBlockLvlSdt | ApiInlineLvlSdt | ApiParagraph'
    + ' | ApiTable | ApiTableRow | ApiTableCell | ApiDrawing | ApiFormBase | null',

  // `var oResult = null` ... `return oResult`, assigned from nine `new Api*` in the type switch.
  // Note the absence of ApiFormBase and the presence of ApiHyperlink/ApiRun/ApiSection - the set
  // is not the same as GetByInternalId's, which is why it is spelled out rather than shared.
  'word.Api.FromJSON':
    'ApiBlockLvlSdt | ApiDocumentContent | ApiDrawing | ApiHyperlink | ApiInlineLvlSdt'
    + ' | ApiParagraph | ApiRun | ApiSection | ApiTable | null',

  // Builds `oDocInfo` with eleven fixed keys; `DocumentInfo` is declared in src/overrides/.
  'word.ApiDocument.GetDocumentInfo': 'DocumentInfo',
  'cell.Api.GetDocumentInfo': 'DocumentInfo',
  'slide.ApiPresentation.GetDocumentInfo': 'DocumentInfo',

  // Five counters; `DocumentStatistics` is declared in src/overrides/.
  'word.ApiDocument.GetStatistics': 'DocumentStatistics',

  // Returns the result of the selection call. Its own neighbour settles it: ApiDocument#
  // SelectCurrentSentence has the same body shape and is documented `{boolean}`, and slide's
  // ApiPresentation#SelectCurrentWord is already `{boolean}` in sdkjs today.
  'word.ApiDocument.SelectCurrentWord': 'boolean',

  // `return { "x": private_MM2EMU(posMm.x), "y": private_MM2EMU(posMm.y) }`, and the prose already
  // says "An object with the coordinates (in EMU)". `@typeofeditors ["CPE"]`, hence slide only.
  'slide.ApiComment.GetPosition': '{ x: EMU; y: EMU }',
};

module.exports = { PARAM_OPTIONAL_FROM, RETURN_TYPE_OVERRIDE };
