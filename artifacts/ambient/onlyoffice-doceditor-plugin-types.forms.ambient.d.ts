// AUTO-GENERATED - do not edit by hand. Run `npm run generate-ambient` to regenerate.
// Self-contained, non-module ambient bundle of @onlyoffice/doceditor-plugin-types for the "forms" editor,
// for tools (e.g. a Monaco editor's addExtraLib()) that want one global-scope .d.ts blob instead of
// an installable, module-based npm package. Declares Asc/AscPlugin and the Forms namespace.
// Forms has no global `Api` - its methods are called through Asc.plugin.executeMethod.
// Load exactly one of the five bundles: they declare the same globals with different types.
// Source of truth is still the modular package under src/ - this is a build artifact, not something
// to hand-edit.
//
// Reached by URL rather than through the npm package, so: the guide for working with these types is
// https://raw.githubusercontent.com/ONLYOFFICE/doceditor-plugin-types/master/AGENTS.md

// ---- typedefs used by the shared sources, declared in another editor's ----
interface TextAnnotation {
  /** ID of the paragraph containing the annotation. */
  paragraphId: string;

  /** ID of the annotation range. */
  rangeId: string;

  /** Annotation type (e.g., `"grammar"`). */
  name?: string;
}
interface TextAnnotationRange {
  /** Unique identifier for the range. */
  id: string;

  /** Starting index of the text range. */
  start: number;

  /** Length of the text range. */
  length: number;

  /** Annotation type (e.g., `"grammar"`). */
  name?: string;
}

// ---- src/generated/forms.ts ----
// Auto-generated from ONLYOFFICE/sdkjs JSDoc
// Editor type: form

declare namespace Forms {
  /** Types of all supported forms. */
  export type ApiForm = ApiTextForm | ApiComboBoxForm | ApiCheckBoxForm | ApiPictureForm | ApiDateForm | ApiComplexForm | ApiSignatureForm;

  /** Axis position in the chart. */
  export type AxisPos = "top" | "bottom" | "right" | "left";

  /** The Base64 image string. */
  export type Base64Img = string;

  /**
   * The type of a fill which uses an image as a background.
   *
   * - **"tile"** - if the image is smaller than the shape which is filled, the image will be tiled all
   * over the created shape surface.
   * - **"stretch"** - if the image is smaller than the shape which is filled, the image will be
   * stretched to fit the created shape surface.
   */
  export type BlipFillType = "tile" | "stretch";

  /** The border properties object. */
  export interface Border {
    /** The border style. */
    Type: BorderType;

    /** The border width measured in eighths of a point. */
    Size: pt_8;

    /** The spacing offset from the text to the border measured in points. */
    Space: pt;

    /** The border color. */
    Color: ApiColor;
  }

  /**
   * A border type which will be added to the document element.
   *
   * - **"none"** - no border will be added to the created element or the selected element side.
   * - **"single"** - a single border will be added to the created element or the selected element side.
   */
  export type BorderType = "none" | "single";

  /** Possible values for the caption label. */
  export type CaptionLabel = "Table" | "Equation" | "Figure";

  /**
   * Possible values for the caption numbering format.
   *
   * - **"ALPHABETIC"** - upper letter.
   * - **"alphabetic"** - lower letter.
   * - **"Roman"** - upper Roman.
   * - **"roman"** - lower Roman.
   * - **"Arabic"** - arabic.
   */
  export type CaptionNumberingFormat = "ALPHABETIC" | "alphabetic" | "Roman" | "roman" | "Arabic";

  /**
   * Possible values for the caption separator.
   *
   * - **"hyphen"** - the "-" punctuation mark.
   * - **"period"** - the "." punctuation mark.
   * - **"colon"** - the ":" punctuation mark.
   * - **"longDash"** - the "—" punctuation mark.
   * - **"dash"** - the "-" punctuation mark.
   */
  export type CaptionSep = "hyphen" | "period" | "colon" | "longDash" | "dash";

  /** This type specifies the available chart types which can be used to create a new chart. */
  export type ChartType = "ColumnClustered" | "ColumnStacked" | "ColumnStacked100" | "3DColumnClustered" | "3DColumnStacked" | "3DColumnStacked100" | "3DColumn" | "BarClustered" | "BarStacked" | "BarStacked100" | "3DBarClustered" | "3DBarStacked" | "3DBarStacked100" | "Line" | "LineStacked" | "LineStacked100" | "LineMarkers" | "LineMarkersStacked" | "LineMarkersStacked100" | "3DLine" | "Pie" | "3DPie" | "Doughnut" | "XYScatter" | "XYScatterLines" | "XYScatterLinesNoMarkers" | "XYScatterSmooth" | "XYScatterSmoothNoMarkers" | "StockHLC" | "StockOHLC" | "StockVHLC" | "StockVOHLC" | "Area" | "AreaStacked" | "AreaStacked100" | "Combo" | "ComboColumnClusteredLine" | "ComboColumnClusteredLineSecondaryAxis" | "Radar" | "RadarMarkers" | "RadarFilled" | "unknown";

  /** This type specifies the legacy chart type names which are kept for backward compatibility. */
  export type ChartTypeLegacy = "bar" | "barStacked" | "barStackedPercent" | "bar3D" | "barStacked3D" | "barStackedPercent3D" | "barStackedPercent3DPerspective" | "horizontalBar" | "horizontalBarStacked" | "horizontalBarStackedPercent" | "horizontalBar3D" | "horizontalBarStacked3D" | "horizontalBarStackedPercent3D" | "lineNormal" | "lineStacked" | "lineStackedPercent" | "lineNormalMarker" | "lineStackedMarker" | "lineStackedPerMarker" | "line3D" | "pie" | "pie3D" | "doughnut" | "scatter" | "scatterLine" | "scatterLineMarker" | "scatterSmooth" | "scatterSmoothMarker" | "stock" | "area" | "areaStacked" | "areaStackedPercent" | "comboCustom" | "comboBarLine" | "comboBarLineSecondary" | "radar" | "radarMarker" | "radarFilled" | "unknown";

  /** Checkbox / radio button properties. */
  export type CheckBoxFormPr = FormPrBase | CheckBoxFormPrBase;

  /** Specific checkbox / radio button properties. */
  export interface CheckBoxFormPrBase {
    /**
     * Specifies if the current checkbox is a radio button. In this case, the key parameter is considered
     * as an identifier for the group of radio buttons.
     */
    radio: boolean;
  }

  /** Option for checkbox */
  export type CheckboxOption = boolean;

  /** Option for radio groups, dropdowns and combo boxes. */
  export interface ChoiceOption {
    /** Stored value. */
    value: string;

    /** Display text. */
    label: string;
  }

  /** Combo box / dropdown list properties. */
  export type ComboBoxFormPr = FormPrBase | ComboBoxFormPrBase;

  /** Specific combo box / dropdown list properties. */
  export interface ComboBoxFormPrBase {
    /** Specifies if the combo box text can be edited. */
    editable: boolean;

    /**
     * Specifies if the combo box form content should be autofit, i.e. whether the font size adjusts to the
     * size of the fixed size form.
     */
    autoFit: boolean;

    /**
     * The combo box items.
     * This array consists of strings or arrays of two strings where the first string is the displayed
     * value and the second one is its meaning.
     * If the array consists of single strings, then the displayed value and its meaning are the same.
     * Example: ["First", ["Second", "2"], ["Third", "3"], "Fourth"].
     */
    items: (string | string[])[];
  }

  /** A dictionary of users and their comments. */
  export interface CommentReport {
    /** The comments grouped by username. */
    username?: UserComments;
  }

  /** Represents a single comment record. */
  export interface CommentReportRecord {
    /** Specifies whether the comment is a response. */
    IsAnswer: boolean;

    /** The comment text. */
    CommentMessage: string;

    /** The comment local timestamp. */
    Date: number;

    /** The comment UTC timestamp. */
    DateUTC: number;

    /** The quoted text (if available). */
    QuoteText?: string;
  }

  /**
   * Document comparison and merge properties.
   *
   * @since 10.0.0
   */
  export interface ComparisonPr {
    /** Specifies whether changes are tracked by word (true) or by character (false). */
    words?: boolean;

    /** Specifies whether to mark differences in formatting. */
    formatting?: boolean;

    /** Specifies whether to mark differences in case. */
    caseChanges?: boolean;

    /** Specifies whether to mark differences in white space. */
    whiteSpace?: boolean;

    /** Specifies whether to compare differences in tables. */
    tables?: boolean;

    /** Specifies whether to compare differences in headers and footers. */
    headersAndFooters?: boolean;

    /** Specifies whether to compare differences in footnotes and endnotes. */
    footnotes?: boolean;

    /** Specifies whether to compare differences in text boxes. */
    textBoxes?: boolean;

    /** Specifies whether to compare differences in comments. */
    comments?: boolean;

    /**
     * The name to which the tracked changes are attributed. If not specified, the author of the second
     * document is used.
     */
    authorName?: string;
  }

  /** The checkbox content control properties */
  export interface ContentControlCheckBoxPr {
    /** Indicates whether the checkbox is checked by default. */
    checked?: boolean;

    /** A custom symbol to display when the checkbox is checked (e.g., "☒"). */
    checkedSymbol?: string;

    /** A custom symbol to display when the checkbox is unchecked (e.g., "☐"). */
    uncheckedSymbol?: string;
  }

  /** The date picker content control properties. */
  export interface ContentControlDatePr {
    /** The date format. Example: "mm.dd.yyyy". */
    format: string;

    /**
     * The date language. Possible value for this parameter is a language identifier as defined by
     * RFC 4646/BCP 47. Example: "en-CA".
     */
    lang: string;
  }

  /** The object representing the items in the combo box or drop-down list. */
  export interface ContentControlListItem {
    /** The text to be displayed in the combo box or drop-down list. */
    display: string;

    /** The value associated with the item. */
    value: string;
  }

  /** Represents an attribute of an XML node. */
  export interface CustomXmlNodeAttribute {
    /** The attribute name. */
    name: string;

    /** The attribute value. */
    value: string;
  }

  /** Available dash type for line. */
  export type DashType = "dash" | "dashDot" | "dot" | "lgDash" | "lgDashDot" | "lgDashDotDot" | "solid" | "sysDash" | "sysDashDot" | "sysDashDotDot" | "sysDot";

  /** The date form properties. */
  export type DateFormPr = FormPrBase | DateFormPrBase;

  /** Specific date form properties. */
  export interface DateFormPrBase {
    /** The date format, ex: mm.dd.yyyy */
    format: string;

    /**
     * The date language. Possible value for this parameter is a language identifier as defined by
     * RFC 4646/BCP 47. Example: "en-CA".
     */
    lang: string;
  }

  /** Any valid element which can be added to the document structure. */
  export type DocumentElement = ApiParagraph | ApiTable | ApiBlockLvlSdt;

  /** Any valid drawing element. */
  export type Drawing = ApiShape | ApiImage | ApiGroup | ApiOleObject | ApiChart | ApiSmartArt;

  /** Available drawing element for grouping. */
  export type DrawingForGroup = ApiShape | ApiGroup | ApiImage | ApiChart;

  /** This type specifies the type of drawing lock. */
  export type DrawingLockType = "noGrp" | "noUngrp" | "noSelect" | "noRot" | "noChangeAspect" | "noMove" | "noResize" | "noEditPoints" | "noAdjustHandles" | "noChangeArrowheads" | "noChangeShapeType" | "noDrilldown" | "noTextEdit" | "noCrop" | "txBox";

  /** English measure unit. 1 mm = 36000 EMUs, 1 inch = 914400 EMUs. */
  export type EMU = number;

  /** The available fill types. */
  export type FillType = "solid" | "gradient" | "pattern" | "blip" | "nofill";

  /** Form data. */
  export interface FormData {
    /** The form key. If the current form is a radio button, then this field contains the group key. */
    key: string;

    /** The current field value. */
    value: string | boolean;

    /** The form tag. */
    tag: string;

    /** The form type. */
    type: FormSpecificType;

    /** The form role. */
    role?: string;

    /** The form role color in hex format. */
    roleColor?: string;

    /**
     * The list of available options for the field.
     * Present for checkboxes, radio button groups, dropdown lists, and combo boxes.
     */
    options?: ChoiceOption[] | CheckboxOption[];

    /** The checkbox label. Present only for checkbox fields. */
    label?: string;

    /** The date format string (e.g. **MM/DD/YYYY**). Present only for date picker fields. */
    format?: string;

    /** The date language/locale name (e.g. **en-US**). Present only for date picker fields. */
    lang?: string;
  }

  /** Form insertion specific properties. */
  export interface FormInsertPr {
    /** Specifies if the currently selected text should be saved as a placeholder of the inserted form. */
    placeholderFromSelection?: boolean;

    /** Specifies if the currently selected text should be saved as the content of the inserted form. */
    keepSelectedTextInForm?: boolean;
  }

  /** Common form properties. */
  export interface FormPrBase {
    /** The form key. */
    key: string;

    /** The form tip text. */
    tip: string;

    /** The form tag. */
    tag: string;

    /** The role to fill out form. */
    role: string;

    /** Specifies if the form is required or not. */
    required: boolean;

    /** The form placeholder text. */
    placeholder: string;
  }

  /** The specific form type. */
  export type FormSpecificType = "text" | "checkBox" | "picture" | "comboBox" | "dropDownList" | "dateTime" | "radio" | "complex" | "signature";

  /**
   * Form type.
   *
   * The available form types.
   */
  export type FormType = "textForm" | "comboBoxForm" | "dropDownForm" | "checkBoxForm" | "radioButtonForm" | "pictureForm" | "complexForm" | "dateForm" | "signatureForm";

  /**
   * The coordinate value for the geometry paths.
   *
   * Can be a guide name from "gdLst", a numeric value, or a string representation of a number.
   */
  export type GeometryCoordinate = string | number;

  /** This type specifies the formula type that will be used for a geometry guide. */
  export type GeometryFormulaType = "*/" | "+-" | "+/" | "?:" | "abs" | "at2" | "cat2" | "cos" | "max" | "min" | "mod" | "pin" | "sat2" | "sin" | "sqrt" | "tan" | "val";

  /**
   * Header and footer types which can be applied to the document sections.
   *
   * - **"default"** - a header or footer which can be applied to any default page.
   * - **"title"** - a header or footer which is applied to the title page.
   * - **"even"** - a header or footer which can be applied to even pages to distinguish them from the
   * odd ones (which will be considered default).
   */
  export type HdrFtrType = "default" | "title" | "even";

  /** The line cap type. */
  export type LineCapType = "flat" | "round" | "square";

  /** The line end size. */
  export type LineEndSize = "large" | "medium" | "small";

  /** The line end type. */
  export type LineEndType = "none" | "arrow" | "diamond" | "oval" | "stealth" | "triangle";

  /** The line join type. */
  export type LineJoinType = "empty" | "round" | "bevel" | "miter";

  /** Standard numeric format. */
  export type NumFormat = "General" | "0" | "0.00" | "#,##0" | "#,##0.00" | "0%" | "0.00%" | "0.00E+00" | "# ?/?" | "# ??/??" | "m/d/yyyy" | "d-mmm-yy" | "d-mmm" | "mmm-yy" | "h:mm AM/PM" | "h:mm:ss AM/PM" | "h:mm" | "h:mm:ss" | "m/d/yyyy h:mm" | "#,##0_);(#,##0)" | "#,##0_);[Red](#,##0)" | "#,##0.00_);(#,##0.00)" | "#,##0.00_);[Red](#,##0.00)" | "mm:ss" | "[h]:mm:ss" | "mm:ss.0" | "##0.0E+0" | "@";

  /** The types of elements that can be added to the paragraph structure. */
  export type ParagraphContent = ApiUnsupported | ApiRun | ApiInlineLvlSdt | ApiHyperlink | ApiFormBase | ApiMath;

  /**
   * A paragraph-like container that can directly hold inline-level content (Hyperlink, InlineLvlSdt,
   * etc.).
   */
  export type ParagraphLikeContainer = ApiParagraph | ApiInlineLvlSdt | ApiHyperlink | ApiFormBase;

  /** The path command types. */
  export type PathCommandType = "moveTo" | "lineTo" | "bezier3" | "bezier4" | "arcTo" | "close";

  /** The path fill type. */
  export type PathFillType = "none" | "norm" | "lighten" | "lightenLess" | "darken" | "darkenLess";

  /** The available preset patterns which can be used for the fill. */
  export type PatternType = "cross" | "dashDnDiag" | "dashHorz" | "dashUpDiag" | "dashVert" | "diagBrick" | "diagCross" | "divot" | "dkDnDiag" | "dkHorz" | "dkUpDiag" | "dkVert" | "dnDiag" | "dotDmnd" | "dotGrid" | "horz" | "horzBrick" | "lgCheck" | "lgConfetti" | "lgGrid" | "ltDnDiag" | "ltHorz" | "ltUpDiag" | "ltVert" | "narHorz" | "narVert" | "openDmnd" | "pct10" | "pct20" | "pct25" | "pct30" | "pct40" | "pct5" | "pct50" | "pct60" | "pct70" | "pct75" | "pct80" | "pct90" | "plaid" | "shingle" | "smCheck" | "smConfetti" | "smGrid" | "solidDmnd" | "sphere" | "trellis" | "upDiag" | "vert" | "wave" | "wdDnDiag" | "wdUpDiag" | "weave" | "zigZag";

  /** Picture form properties. */
  export type PictureFormPr = FormPrBase | PictureFormPrBase;

  /** Specific picture form properties. */
  export interface PictureFormPrBase {
    /** The condition to scale an image in the picture form: "always", "never", "tooBig" or "tooSmall". */
    scaleFlag: ScaleFlag;

    /** Specifies if the aspect ratio of the picture form is locked or not. */
    lockAspectRatio: boolean;

    /** Specifies if the form border width is respected or not when scaling the image. */
    respectBorders: boolean;

    /**
     * Horizontal picture position inside the picture form measured in percent:
     * **0** - the picture is placed on the left;
     * **50** - the picture is placed in the center;
     * **100** - the picture is placed on the right.
     */
    shiftX: percentage;

    /**
     * Vertical picture position inside the picture form measured in percent:
     * **0** - the picture is placed on top;
     * **50** - the picture is placed in the center;
     * **100** - the picture is placed on the bottom.
     */
    shiftY: percentage;
  }

  /** 60000th of a degree (5400000 = 90 degrees). */
  export type PositiveFixedAngle = number;

  /** The 1000th of a percent (100000 = 100%). */
  export type PositivePercentage = number;

  /** The available preset color names. */
  export type PresetColor = "aliceBlue" | "antiqueWhite" | "aqua" | "aquamarine" | "azure" | "beige" | "bisque" | "black" | "blanchedAlmond" | "blue" | "blueViolet" | "brown" | "burlyWood" | "cadetBlue" | "chartreuse" | "chocolate" | "coral" | "cornflowerBlue" | "cornsilk" | "crimson" | "cyan" | "darkBlue" | "darkCyan" | "darkGoldenrod" | "darkGray" | "darkGreen" | "darkGrey" | "darkKhaki" | "darkMagenta" | "darkOliveGreen" | "darkOrange" | "darkOrchid" | "darkRed" | "darkSalmon" | "darkSeaGreen" | "darkSlateBlue" | "darkSlateGray" | "darkSlateGrey" | "darkTurquoise" | "darkViolet" | "deepPink" | "deepSkyBlue" | "dimGray" | "dimGrey" | "dkBlue" | "dkCyan" | "dkGoldenrod" | "dkGray" | "dkGreen" | "dkGrey" | "dkKhaki" | "dkMagenta" | "dkOliveGreen" | "dkOrange" | "dkOrchid" | "dkRed" | "dkSalmon" | "dkSeaGreen" | "dkSlateBlue" | "dkSlateGray" | "dkSlateGrey" | "dkTurquoise" | "dkViolet" | "dodgerBlue" | "firebrick" | "floralWhite" | "forestGreen" | "fuchsia" | "gainsboro" | "ghostWhite" | "gold" | "goldenrod" | "gray" | "green" | "greenYellow" | "grey" | "honeydew" | "hotPink" | "indianRed" | "indigo" | "ivory" | "khaki" | "lavender" | "lavenderBlush" | "lawnGreen" | "lemonChiffon" | "lightBlue" | "lightCoral" | "lightCyan" | "lightGoldenrodYellow" | "lightGray" | "lightGreen" | "lightGrey" | "lightPink" | "lightSalmon" | "lightSeaGreen" | "lightSkyBlue" | "lightSlateGray" | "lightSlateGrey" | "lightSteelBlue" | "lightYellow" | "lime" | "limeGreen" | "linen" | "ltBlue" | "ltCoral" | "ltCyan" | "ltGoldenrodYellow" | "ltGray" | "ltGreen" | "ltGrey" | "ltPink" | "ltSalmon" | "ltSeaGreen" | "ltSkyBlue" | "ltSlateGray" | "ltSlateGrey" | "ltSteelBlue" | "ltYellow" | "magenta" | "maroon" | "medAquamarine" | "medBlue" | "mediumAquamarine" | "mediumBlue" | "mediumOrchid" | "mediumPurple" | "mediumSeaGreen" | "mediumSlateBlue" | "mediumSpringGreen" | "mediumTurquoise" | "mediumVioletRed" | "medOrchid" | "medPurple" | "medSeaGreen" | "medSlateBlue" | "medSpringGreen" | "medTurquoise" | "medVioletRed" | "midnightBlue" | "mintCream" | "mistyRose" | "moccasin" | "navajoWhite" | "navy" | "oldLace" | "olive" | "oliveDrab" | "orange" | "orangeRed" | "orchid" | "paleGoldenrod" | "paleGreen" | "paleTurquoise" | "paleVioletRed" | "papayaWhip" | "peachPuff" | "peru" | "pink" | "plum" | "powderBlue" | "purple" | "red" | "rosyBrown" | "royalBlue" | "saddleBrown" | "salmon" | "sandyBrown" | "seaGreen" | "seaShell" | "sienna" | "silver" | "skyBlue" | "slateBlue" | "slateGray" | "slateGrey" | "snow" | "springGreen" | "steelBlue" | "tan" | "teal" | "thistle" | "tomato" | "turquoise" | "violet" | "wheat" | "white" | "whiteSmoke" | "yellow" | "yellowGreen";

  /** The reading order (left-to-right or right-to-left). */
  export type ReadingOrder = "ltr" | "rtl";

  /**
   * The possible values for the base which the relative horizontal positioning of an object will be
   * calculated from.
   */
  export type RelFromH = "character" | "column" | "insideMargin" | "leftMargin" | "rightMargin" | "margin" | "outsideMargin" | "page";

  /**
   * The possible values for the base which the relative vertical positioning of an object will be
   * calculated from.
   */
  export type RelFromV = "bottomMargin" | "insideMargin" | "topMargin" | "margin" | "outsideMargin" | "page" | "line" | "paragraph";

  /** A dictionary of users and their review changes. */
  export interface ReviewReport {
    /** The review changes grouped by username. */
    username?: UserReviewChanges;
  }

  /** Represents a single review change record. */
  export interface ReviewReportRecord {
    /** The review record type. */
    Type: ReviewReportRecordType;

    /** The review change value (only for "TextAdd" and "TextRem" types). */
    Value?: string;

    /** The timestamp of the change. */
    Date: number;

    /** The element that was reviewed. */
    ReviewedElement: ApiParagraph | ApiTable;
  }

  /** Review record type. */
  export type ReviewReportRecordType = "TextAdd" | "TextRem" | "ParaAdd" | "ParaRem" | "TextPr" | "ParaPr" | "Unknown";

  /** The role properties. */
  export interface RoleProperties {
    /** The role color. */
    color: string;
  }

  /** The condition to scale an image in the picture form. */
  export type ScaleFlag = "always" | "never" | "tooBig" | "tooSmall";

  /** The available color scheme identifiers. */
  export type SchemeColorId = "accent1" | "accent2" | "accent3" | "accent4" | "accent5" | "accent6" | "bg1" | "bg2" | "dk1" | "dk2" | "folHlink" | "hlink" | "lt1" | "lt2" | "tx1" | "tx2";

  /** The lock type of the content control. */
  export type SdtLock = "unlocked" | "contentLocked" | "sdtContentLocked" | "sdtLocked";

  /**
   * The section break type which defines how the contents of the current section are placed relative to
   * the previous section.
   *
   * WordprocessingML supports five distinct types of section breaks:
   *
   * - **Next page** ("nextPage") - starts a new section on the next page (the default value).
   * - **Odd** ("oddPage") - starts a new section on the next odd-numbered page.
   * - **Even** ("evenPage") - starts a new section on the next even-numbered page.
   * - **Continuous** ("continuous") - starts a new section in the next paragraph.
   * This means that continuous section breaks might not specify certain page-level section properties,
   * since they shall be inherited from the following section.
   * However, these breaks can specify other section properties, such as line numbering and
   * footnote/endnote settings.
   * - **Column** ("nextColumn") - starts a new section in the next column on the page.
   */
  export type SectionBreakType = "nextPage" | "oddPage" | "evenPage" | "continuous" | "nextColumn";

  /** Properties used to create a shadow. */
  export interface ShadowSettings {
    /** The shadow color (black by default). */
    color?: ApiColor;

    /** The shadow transparency from 0.0 (opaque) to 1.0 (clear). */
    transparency?: number;

    /** The horizontal offset of the shadow measured in points (a positive value offsets to the right). */
    offsetX?: number;

    /** The vertical offset of the shadow measured in points (a positive value offsets downwards). */
    offsetY?: number;

    /** The shadow size as a percentage of the shape size. */
    size?: number;

    /** Specifies whether the shadow rotates together with the shape. */
    rotateWithShape?: boolean;
  }

  /** This type specifies the preset shape geometry that will be used for a shape. */
  export type ShapeType = "accentBorderCallout1" | "accentBorderCallout2" | "accentBorderCallout3" | "accentCallout1" | "accentCallout2" | "accentCallout3" | "actionButtonBackPrevious" | "actionButtonBeginning" | "actionButtonBlank" | "actionButtonDocument" | "actionButtonEnd" | "actionButtonForwardNext" | "actionButtonHelp" | "actionButtonHome" | "actionButtonInformation" | "actionButtonMovie" | "actionButtonReturn" | "actionButtonSound" | "arc" | "bentArrow" | "bentConnector2" | "bentConnector3" | "bentConnector4" | "bentConnector5" | "bentUpArrow" | "bevel" | "blockArc" | "borderCallout1" | "borderCallout2" | "borderCallout3" | "bracePair" | "bracketPair" | "callout1" | "callout2" | "callout3" | "can" | "chartPlus" | "chartStar" | "chartX" | "chevron" | "chord" | "circularArrow" | "cloud" | "cloudCallout" | "corner" | "cornerTabs" | "cube" | "curvedConnector2" | "curvedConnector3" | "curvedConnector4" | "curvedConnector5" | "curvedDownArrow" | "curvedLeftArrow" | "curvedRightArrow" | "curvedUpArrow" | "decagon" | "diagStripe" | "diamond" | "dodecagon" | "donut" | "doubleWave" | "downArrow" | "downArrowCallout" | "ellipse" | "ellipseRibbon" | "ellipseRibbon2" | "flowChartAlternateProcess" | "flowChartCollate" | "flowChartConnector" | "flowChartDecision" | "flowChartDelay" | "flowChartDisplay" | "flowChartDocument" | "flowChartExtract" | "flowChartInputOutput" | "flowChartInternalStorage" | "flowChartMagneticDisk" | "flowChartMagneticDrum" | "flowChartMagneticTape" | "flowChartManualInput" | "flowChartManualOperation" | "flowChartMerge" | "flowChartMultidocument" | "flowChartOfflineStorage" | "flowChartOffpageConnector" | "flowChartOnlineStorage" | "flowChartOr" | "flowChartPredefinedProcess" | "flowChartPreparation" | "flowChartProcess" | "flowChartPunchedCard" | "flowChartPunchedTape" | "flowChartSort" | "flowChartSummingJunction" | "flowChartTerminator" | "foldedCorner" | "frame" | "funnel" | "gear6" | "gear9" | "halfFrame" | "heart" | "heptagon" | "hexagon" | "homePlate" | "horizontalScroll" | "irregularSeal1" | "irregularSeal2" | "leftArrow" | "leftArrowCallout" | "leftBrace" | "leftBracket" | "leftCircularArrow" | "leftRightArrow" | "leftRightArrowCallout" | "leftRightCircularArrow" | "leftRightRibbon" | "leftRightUpArrow" | "leftUpArrow" | "lightningBolt" | "line" | "lineInv" | "mathDivide" | "mathEqual" | "mathMinus" | "mathMultiply" | "mathNotEqual" | "mathPlus" | "moon" | "nonIsoscelesTrapezoid" | "noSmoking" | "notchedRightArrow" | "octagon" | "parallelogram" | "pentagon" | "pie" | "pieWedge" | "plaque" | "plaqueTabs" | "plus" | "quadArrow" | "quadArrowCallout" | "rect" | "ribbon" | "ribbon2" | "rightArrow" | "rightArrowCallout" | "rightBrace" | "rightBracket" | "round1Rect" | "round2DiagRect" | "round2SameRect" | "roundRect" | "rtTriangle" | "smileyFace" | "snip1Rect" | "snip2DiagRect" | "snip2SameRect" | "snipRoundRect" | "squareTabs" | "star10" | "star12" | "star16" | "star24" | "star32" | "star4" | "star5" | "star6" | "star7" | "star8" | "straightConnector1" | "stripedRightArrow" | "sun" | "swooshArrow" | "teardrop" | "textRect" | "trapezoid" | "triangle" | "upArrowCallout" | "upDownArrow" | "upDownArrow" | "upDownArrowCallout" | "uturnArrow" | "verticalScroll" | "wave" | "wedgeEllipseCallout" | "wedgeRectCallout" | "wedgeRoundRectCallout";

  /** A shade type which can be added to the document element. */
  export type ShdType = "nil" | "clear";

  /**
   * The possible values for the base which the relative horizontal size of an object will be calculated
   * from.
   */
  export type SizeRelFromH = "insideMargin" | "leftMargin" | "rightMargin" | "margin" | "outsideMargin" | "page";

  /**
   * The possible values for the base which the relative vertical size of an object will be calculated
   * from.
   */
  export type SizeRelFromV = "bottomMargin" | "insideMargin" | "topMargin" | "margin" | "outsideMargin" | "page";

  /** The style type used for the document element. */
  export type StyleType = "paragraph" | "table" | "run" | "numbering";

  /** Custom tab types. */
  export type TabJc = "clear" | "left" | "right" | "center";

  /** A paragraph tab stop. */
  export interface TabStop {
    /** The tab stop position measured in twentieths of a point (1/1440 of an inch). */
    Pos: twips;

    /** The tab stop alignment style. */
    Val: TabJc;

    /** The tab leader character. */
    Leader: "none" | "dot" | "heavy" | "hyphen" | "middleDot" | "underscore";
  }

  export interface TableLook {
    /** Specifies that the first column conditional formatting shall be applied to the table. */
    firstCol: boolean;

    /** Specifies that the first row conditional formatting shall be applied to the table. */
    firstRow: boolean;

    /** Specifies that the last column conditional formatting shall be applied to the table. */
    lastCol: boolean;

    /** Specifies that the last row conditional formatting shall be applied to the table. */
    lastRow: boolean;

    /** Specifies that the horizontal banding conditional formatting shall not be applied to the table. */
    bandHor: boolean;

    /** Specifies that the vertical banding conditional formatting shall not be applied to the table. */
    bandVer: boolean;
  }

  /**
   * This simple type specifies possible values for the table sections to which the current conditional
   * formatting properties will be applied when this selected table style is used.
   *
   * - **"topLeftCell"** - specifies that the table formatting is applied to the top left cell.
   * - **"topRightCell"** - specifies that the table formatting is applied to the top right cell.
   * - **"bottomLeftCell"** - specifies that the table formatting is applied to the bottom left cell.
   * - **"bottomRightCell"** - specifies that the table formatting is applied to the bottom right cell.
   * - **"firstRow"** - specifies that the table formatting is applied to the first row.
   * - **"lastRow"** - specifies that the table formatting is applied to the last row.
   * - **"firstColumn"** - specifies that the table formatting is applied to the first column. Any
   * subsequent row which is in *table header* ({@link ApiTableRowPr#SetTableHeader}) will also use this
   * conditional format.
   * - **"lastColumn"** - specifies that the table formatting is applied to the last column.
   * - **"bandedColumn"** - specifies that the table formatting is applied to odd numbered groupings of
   * rows.
   * - **"bandedColumnEven"** - specifies that the table formatting is applied to even numbered groupings
   * of rows.
   * - **"bandedRow"** - specifies that the table formatting is applied to odd numbered groupings of
   * columns.
   * - **"bandedRowEven"** - specifies that the table formatting is applied to even numbered groupings of
   * columns.
   * - **"wholeTable"** - specifies that the conditional formatting is applied to the whole table.
   */
  export type TableStyleOverrideType = "topLeftCell" | "topRightCell" | "bottomLeftCell" | "bottomRightCell" | "firstRow" | "lastRow" | "firstColumn" | "lastColumn" | "bandedColumn" | "bandedColumnEven" | "bandedRow" | "bandedRowEven" | "wholeTable";

  /**
   * The possible values for the units of the width property are defined by a specific table or table
   * cell width property.
   *
   * - **"auto"** - sets the table or table cell width to auto width.
   * - **"twips"** - sets the table or table cell width to be measured in twentieths of a point.
   * - **"nul"** - sets the table or table cell width to be of a zero value.
   * - **"percent"** - sets the table or table cell width to be measured in percent to the parent
   * container.
   */
  export type TableWidth = "auto" | "twips" | "nul" | "percent";

  /** The available text flow direction inside a drawing content. */
  export type TextFlowDirection = "lrtb" | "tbrl" | "btlr";

  /** The text field format data. */
  export interface TextFormFormat {
    /** The format type. */
    type: "none" | "digit" | "letter" | "mask" | "regExp";

    /** The format value. Required for **"mask"** and **"regExp"** types. */
    value?: string;
  }

  /** Properties for inserting a text field. */
  export type TextFormInsertPr = FormPrBase | TextFormPrBase | FormInsertPr;

  /** Text field properties. */
  export type TextFormPr = FormPrBase | TextFormPrBase;

  /** Specific text field properties. */
  export interface TextFormPrBase {
    /**
     * Specifies if the text field should be a comb of characters with the same cell width. The maximum
     * number of characters must be set to a positive value.
     */
    comb: boolean;

    /** The maximum number of characters in the text field. */
    maxCharacters: number;

    /**
     * The cell width for each character measured in millimeters. If this parameter is not specified or
     * equal to 0 or less, then the width will be set automatically.
     */
    cellWidth: number;

    /** Specifies if the current fixed size text field is multiline or not. */
    multiLine: boolean;

    /**
     * Specifies if the text field content should be autofit, i.e. whether the font size adjusts to the
     * size of the fixed size form.
     */
    autoFit: boolean;
  }

  /** Text transform type. */
  export type TextTransform = "textArchDown" | "textArchDownPour" | "textArchUp" | "textArchUpPour" | "textButton" | "textButtonPour" | "textCanDown" | "textCanUp" | "textCascadeDown" | "textCascadeUp" | "textChevron" | "textChevronInverted" | "textCircle" | "textCirclePour" | "textCurveDown" | "textCurveUp" | "textDeflate" | "textDeflateBottom" | "textDeflateInflate" | "textDeflateInflateDeflate" | "textDeflateTop" | "textDoubleWave1" | "textFadeDown" | "textFadeLeft" | "textFadeRight" | "textFadeUp" | "textInflate" | "textInflateBottom" | "textInflateTop" | "textPlain" | "textRingInside" | "textRingOutside" | "textSlantDown" | "textSlantUp" | "textStop" | "textTriangle" | "textTriangleInverted" | "textWave1" | "textWave2" | "textWave4" | "textNoShape";

  /**
   * Possible values for the position of chart tick labels (either horizontal or vertical).
   *
   * - **"none"** - not display the selected tick labels.
   * - **"nextTo"** - sets the position of the selected tick labels next to the main label.
   * - **"low"** - sets the position of the selected tick labels in the part of the chart with lower
   * values.
   * - **"high"** - sets the position of the selected tick labels in the part of the chart with higher
   * values.
   */
  export type TickLabelPosition = "none" | "nextTo" | "low" | "high";

  /** The type of tick mark appearance. */
  export type TickMark = "cross" | "in" | "none" | "out";

  /** Options for converting document content to an HTML string. */
  export interface ToHtmlOptions {
    /**
     * Defines if the HTML headings and IDs will be generated when the Markdown renderer of your target
     * platform does not handle Markdown-style IDs.
     */
    HtmlHeadings?: boolean;

    /** Defines if the images will be created in the base64 format. */
    Base64img?: boolean;

    /**
     * Defines if all heading levels will be demoted to conform with the following standard: single H1 as
     * title, H2 as top-level heading in the text body.
     */
    DemoteHeadings?: boolean;

    /**
     * Defines if HTML tags will be preserved. By default, the opening angle brackets will be replaced with
     * the special characters.
     */
    RenderHTMLTags?: boolean;
  }

  /**
   * Table of contents properties which specify whether to generate the table of contents from the
   * outline levels or the specified styles.
   */
  export interface TocBuildFromPr {
    /** The highest heading level included in the table of contents (the start of the outline range). */
    OutlineLvlStart?: number;

    /** The lowest heading level included in the table of contents (the end of the outline range). */
    OutlineLvls?: number;

    /**
     * Style levels (for example, [{Name: "Heading 1", Lvl: 2}, {Name: "Heading 2", Lvl: 3}]). If
     * _StylesLvls.length_ is greater than 0, the _OutlineLvls_ property is ignored.
     */
    StylesLvls: TocStyleLvl[];
  }

  /**
   * Possible values for the table of contents leader:
   *
   * - **"dot"** - "......."
   * - **"dash"** - "-------"
   * - **"underline"** - "_______"
   */
  export type TocLeader = "dot" | "dash" | "underline" | "none";

  /** Table of contents properties. */
  export interface TocPr {
    /** Specifies whether to show page numbers in the table of contents. */
    ShowPageNums?: boolean;

    /** Specifies whether to right-align page numbers in the table of contents. */
    RightAlgn?: boolean;

    /** The leader type in the table of contents. */
    LeaderType?: TocLeader;

    /** Specifies whether to format the table of contents as links. */
    FormatAsLinks?: boolean;

    /** Specifies whether to generate the table of contents from the outline levels or the specified styles. */
    BuildFrom?: TocBuildFromPr;

    /** The table of contents style type. */
    TocStyle?: TocStyle;
  }

  /** Possible values for the table of contents style. */
  export type TocStyle = "simple" | "online" | "standard" | "modern" | "classic";

  /** Table of contents style levels. */
  export interface TocStyleLvl {
    /** Style name (for example, "Heading 1"). */
    Name: string;

    /** Level which will be applied to the specified style in the table of contents. */
    Lvl: number;
  }

  /** Table of figures properties. */
  export interface TofPr {
    /** Specifies whether to show page numbers in the table of figures. */
    ShowPageNums?: boolean;

    /** Specifies whether to right-align page numbers in the table of figures. */
    RightAlgn?: boolean;

    /** The leader type in the table of figures. */
    LeaderType?: TocLeader;

    /** Specifies whether to format the table of figures as links. */
    FormatAsLinks?: boolean;

    /**
     * Specifies whether to generate the table of figures based on the specified caption label or the
     * paragraph style name used (for example, "Heading 1").
     */
    BuildFrom?: CaptionLabel | string;

    /** Specifies whether to include the label and number in the table of figures. */
    LabelNumber?: boolean;

    /** The table of figures style type. */
    TofStyle?: TofStyle;
  }

  /** Possible values for the table of figures style. */
  export type TofStyle = "simple" | "online" | "classic" | "distinctive" | "centered" | "formal";

  /** Represents a user's comment history. */
  export interface UserComments {
    /** A list of comments. */
    comments: CommentReportRecord[];
  }

  /** Represents a user's review history. */
  export interface UserReviewChanges {
    /** A list of review records. */
    reviews: ReviewReportRecord[];
  }

  /**
   * The available text vertical alignment (used to align text in a shape with a placement for text
   * inside it).
   */
  export type VerticalTextAlign = "top" | "center" | "bottom";

  /** The watermark direction. */
  export type WatermarkDirection = "horizontal" | "clockwise45" | "counterclockwise45" | "clockwise90" | "counterclockwise90";

  /** The watermark type. */
  export type WatermarkType = "none" | "text" | "image";

  /**
   * This element specifies the information which shall be used to establish a mapping to an XML element
   * stored within a Custom XML.
   */
  export interface XmlMapping {
    /** The set of prefix mappings which shall be used to interpret the XPath expression specified in xpath. */
    prefixMapping: string;

    /** The XPath expression. */
    xpath: string;

    /** The custom XML data identifier. */
    storeItemID: string;
  }

  /**
   * Available values of the "bookmark" reference type:
   *
   * - **"text"** - the entire bookmark text;
   * - **"pageNum"** - the bookmark page number;
   * - **"paraNum"** - the bookmark paragraph number;
   * - **"noCtxParaNum"** - the abbreviated paragraph number (the specific item only, e.g. instead of
   * "4.1.1" you refer to "1" only);
   * - **"fullCtxParaNum** - the full paragraph number, e.g. "4.1.1";
   * - **"aboveBelow"** - the words "above" or "below" depending on the item position.
   */
  export type bookmarkRefTo = "text" | "pageNum" | "paraNum" | "noCtxParaNum" | "fullCtxParaNum" | "aboveBelow";

  /** A numeric value from 0 to 255. */
  export type byte = number;

  /**
   * Available values of the "equation"/"figure"/"table" reference type:
   *
   * - **"entireCaption"**- the entire caption text;
   * - **"labelNumber"** - the label and object number only, e.g. "Table 1.1";
   * - **"captionText"** - the caption text only;
   * - **"pageNum"** - the page number containing the referenced object;
   * - **"aboveBelow"** - the words "above" or "below" depending on the item position.
   */
  export type captionRefTo = "entireCaption" | "labelNumber" | "captionText" | "pageNum" | "aboveBelow";

  /**
   * Available values of the "endnote" reference type:
   *
   * - **"endnoteNum"** - the endnote number;
   * - **"pageNum"** - the endnote page number;
   * - **"aboveBelow"** - the words "above" or "below" depending on the item position;
   * - **"formEndnoteNum"** - the form number formatted as an endnote. The numbering of the actual
   * endnotes is not affected.
   */
  export type endnoteRefTo = "endnoteNum" | "pageNum" | "aboveBelow" | "formEndnoteNum";

  /**
   * Available values of the "footnote" reference type:
   *
   * - **"footnoteNum"** - the footnote number;
   * - **"pageNum"** - the page number of the footnote;
   * - **"aboveBelow"** - the words "above" or "below" depending on the position of the item;
   * - **"formFootnoteNum"** - the form number formatted as a footnote. The numbering of the actual
   * footnotes is not affected.
   */
  export type footnoteRefTo = "footnoteNum" | "pageNum" | "aboveBelow" | "formFootnoteNum";

  /**
   * Available values of the "heading" reference type:
   *
   * - **"text"** - the entire heading text;
   * - **"pageNum"** - the heading page number;
   * - **"headingNum"** - the heading sequence number;
   * - **"noCtxHeadingNum"** - the abbreviated heading number. Make sure the cursor pointer is in the
   * section you are referencing to, e.g. you are in section 4 and you wish to refer to heading 4.B, so
   * instead of "4.B" you receive "B" only;
   * - **"fullCtxHeadingNum"** - the full heading number even if the cursor pointer is in the same
   * section;
   * - **"aboveBelow"** - the words "above" or "below" depending on the item position.
   */
  export type headingRefTo = "text" | "pageNum" | "headingNum" | "noCtxHeadingNum" | "fullCtxHeadingNum" | "aboveBelow";

  /** Available highlight colors. */
  export type highlightColor = "black" | "blue" | "cyan" | "green" | "magenta" | "red" | "yellow" | "white" | "darkBlue" | "darkCyan" | "darkGreen" | "darkMagenta" | "darkRed" | "darkYellow" | "darkGray" | "lightGray" | "none";

  /** Half-points (2 half-points = 1 point). */
  export type hps = number;

  /** 240ths of a line. */
  export type line240 = number;

  /** 1 millimetre equals 1/10th of a centimetre. */
  export type mm = number;

  /**
   * Available values of the "numbered" reference type:
   *
   * - **"pageNum"** - the numbered item page number;
   * - **"paraNum"** - the numbered item paragraph number;
   * - **"noCtxParaNum"** - the abbreviated paragraph number (the specific item only, e.g. instead of
   * "4.1.1" you refer to "1" only);
   * - **"fullCtxParaNum"** - the full paragraph number, e.g. "4.1.1";
   * - **"text"** - the paragraph text value, e.g. if you have "4.1.1. Terms and Conditions", you refer
   * to "Terms and Conditions" only;
   * - **"aboveBelow"** - the words "above" or "below" depending on the item position.
   */
  export type numberedRefTo = "pageNum" | "paraNum" | "noCtxParaNum" | "fullCtxParaNum" | "text" | "aboveBelow";

  /** Value from 0 to 100. */
  export type percentage = number;

  /** A point. */
  export type pt = number;

  /** Eighths of a point (24 eighths of a point = 3 points). */
  export type pt_8 = number;

  /** Twentieths of a point (equivalent to 1/1440th of an inch). */
  export type twips = number;

  /**
   * The main class of the Form API. Use it to create forms: text fields, combo boxes,
   * checkboxes and radio buttons, date fields, picture forms, signature forms, and complex
   * fields.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/Api/
   */
  export interface Api {
    /**
     * Converts a document to Markdown or HTML text.
     *
     * @param convertType - Conversion type.
     * @param htmlHeadings - Defines if the HTML headings and IDs will be generated when the Markdown renderer of your target
     *   platform does not handle Markdown-style IDs.
     * @param base64img - Defines if the images will be created in the base64 format.
     * @param demoteHeadings - Defines if all heading levels in your document will be demoted to conform with the following
     *   standard: single H1 as title, H2 as top-level heading in the text body.
     * @param renderHTMLTags - Defines if HTML tags will be preserved in your Markdown. If you just want to use an occasional
     *   HTML tag, you can avoid using the opening angle bracket in the following way: \<tag>text\</tag>.
     *   By default, the opening angle brackets will be replaced with the special characters.
     * @default convertType = "markdown"
     * @default htmlHeadings = false
     * @default base64img = false
     * @default demoteHeadings = false
     * @default renderHTMLTags = false
     *
     * @example
     * ```js
     * // How do I export the text of a document as Markdown in a document?
     *
     * // Write headings and paragraphs, then append the Markdown version of that content in a document.
     *
     * let doc = Api.GetDocument();
     * let paragraph = doc.GetElement(0);
     * paragraph.AddText("Heading 1");
     * paragraph.SetStyle(doc.GetStyle("Heading 1"));
     *
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("This document will be converted to Markdown.");
     * doc.Push(paragraph);
     * paragraph.Search("Markdown")[0].SetBold(true);
     *
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Heading 2");
     * doc.Push(paragraph);
     * paragraph.SetStyle(doc.GetStyle("Heading 2"));
     *
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("There is an example of two heading levels.");
     * doc.Push(paragraph);
     *
     * let md = Api.ConvertDocument("markdown", false, false, true, false);
     * paragraph = Api.CreateParagraph();
     * paragraph.AddLineBreak();
     * paragraph.AddText("Markdown").SetBold(true);
     * paragraph.AddLineBreak();
     * paragraph.AddText(md);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/Api/Methods/ConvertDocument/
     */
    ConvertDocument(convertType?: "markdown" | "html", htmlHeadings?: boolean, base64img?: boolean, demoteHeadings?: boolean, renderHTMLTags?: boolean): string;

    /**
     * Creates a checkbox / radio button with the specified checkbox / radio button properties.
     *
     * @param formPr - Checkbox / radio button properties.
     *
     * @example
     * ```js
     * // How do I insert checkboxes or radio buttons in a document?
     *
     * // Create selectable options that let users pick from predefined choices in a document.
     *
     * let doc = Api.GetDocument();
     * let paragraph = doc.GetElement(0);
     *
     * let checkBoxForm = Api.CreateCheckBoxForm({
     * 	"key": "Marital status",
     * 	"tip": "Specify your marital status",
     * 	"required": true,
     * 	"placeholder": "Marital status",
     * 	"radio": true
     * });
     * paragraph.AddElement(checkBoxForm);
     * paragraph.AddText(" Married");
     * paragraph.AddLineBreak();
     *
     * checkBoxForm = Api.CreateCheckBoxForm({
     * 	"key": "Marital status",
     * 	"tip": "Specify your marital status",
     * 	"required": true,
     * 	"placeholder": "Marital status",
     * 	"radio": true
     * });
     * paragraph.AddElement(checkBoxForm);
     * paragraph.AddText(" Single");
     * paragraph.AddLineBreak();
     *
     * checkBoxForm = Api.CreateCheckBoxForm({
     * 	"key": "Children",
     * 	"tip": "Indicate if you have children",
     * 	"required": false,
     * 	"placeholder": "Children",
     * 	"radio": false
     * });
     * paragraph.AddElement(checkBoxForm);
     * paragraph.AddText(" Single");
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/Api/Methods/CreateCheckBoxForm/
     */
    CreateCheckBoxForm(formPr: CheckBoxFormPr): ApiCheckBoxForm;

    /**
     * Creates a combo box / dropdown list with the specified combo box / dropdown list properties.
     *
     * @param formPr - Combo box / dropdown list properties.
     *
     * @example
     * ```js
     * // How do I add a dropdown field to a document?
     *
     * // Set up a selection menu with multiple choices that users can pick from in a document.
     *
     * let doc = Api.GetDocument();
     * let comboBoxForm = Api.CreateComboBoxForm({
     * 	"key": "Personal information",
     * 	"tip": "Choose your country",
     * 	"required": true,
     * 	"placeholder": "Country",
     * 	"editable": false,
     * 	"autoFit": false,
     * 	"items": ["Latvia", "USA", "UK"]
     * });
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(comboBoxForm);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/Api/Methods/CreateComboBoxForm/
     */
    CreateComboBoxForm(formPr: ComboBoxFormPr): ApiComboBoxForm;

    /**
     * Creates a complex form with the specified complex form properties.
     *
     * @param formPr - Complex form properties.
     *
     * @example
     * ```js
     * // How do I create a form field that contains multiple parts in a document?
     *
     * // Build a composite field that allows users to enter different types of data together in a document.
     *
     * let doc = Api.GetDocument();
     * let complexForm = Api.CreateComplexForm({
     * 	"key": "Email",
     * 	"tip": "Email",
     * 	"placeholder": "Start to fill complex form"
     * });
     * complexForm.Add(Api.CreateTextForm());
     * complexForm.Add("@onlyoffice.com");
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(complexForm);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/Api/Methods/CreateComplexForm/
     */
    CreateComplexForm(formPr: FormPrBase): ApiComplexForm;

    /**
     * Creates a date form with the specified date form properties.
     *
     * @param formPr - Date form properties.
     *
     * @example
     * ```js
     * // How do I add a date picker field to a document?
     *
     * // Set up a form field that accepts date values with specific formatting in a document.
     *
     * let doc = Api.GetDocument();
     * let dateForm = Api.CreateDateForm({
     * 	"key": "Nowadays",
     * 	"tip": "Enter current date",
     * 	"required": true,
     * 	"placeholder": "Your date here",
     * 	"format": "mm.dd.yyyy",
     * 	"lang": "en-US"
     * });
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(dateForm);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/Api/Methods/CreateDateForm/
     */
    CreateDateForm(formPr: DateFormPr): ApiDateForm;

    /**
     * Creates a picture form with the specified picture form properties.
     *
     * @param formPr - Picture form properties.
     *
     * @example
     * ```js
     * // How do I create an image field for users to upload pictures in a document?
     *
     * // Enable users to fill in a form by selecting or uploading image files in a document.
     *
     * let doc = Api.GetDocument();
     * let pictureForm = Api.CreatePictureForm({
     * 	"key": "Personal information",
     * 	"tip": "Upload your photo",
     * 	"required": true,
     * 	"placeholder": "Photo",
     * 	"scaleFlag": "tooBig",
     * 	"lockAspectRatio": true,
     * 	"respectBorders": false,
     * 	"shiftX": 50,
     * 	"shiftY": 50
     * });
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(pictureForm);
     * pictureForm.SetImage("https://static.onlyoffice.com/assets/docs/samples/img/onlyoffice_logo.png", Api.MillimetersToEmus(70), Api.MillimetersToEmus(80));
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/Api/Methods/CreatePictureForm/
     */
    CreatePictureForm(formPr: PictureFormPr): ApiPictureForm;

    /**
     * Creates a signature form with the specified form properties.
     *
     * @param formPr - Signature form properties.
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/Api/Methods/CreateSignatureForm/
     */
    CreateSignatureForm(formPr: FormPrBase): ApiSignatureForm;

    /**
     * Creates a text field with the specified text field properties.
     *
     * @param formPr - Text field properties.
     *
     * @example
     * ```js
     * // How do I create a text box field in a document?
     *
     * // Insert a fillable text area where users can type their responses in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({
     * 	"key": "Personal information",
     * 	"tip": "Enter your first name",
     * 	"required": true,
     * 	"placeholder": "First name",
     * 	"comb": true,
     * 	"maxCharacters": 10,
     * 	"cellWidth": 3,
     * 	"multiLine": false,
     * 	"autoFit": false
     * });
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/Api/Methods/CreateTextForm/
     */
    CreateTextForm(formPr: TextFormPr): ApiTextForm;

    /**
     * Replaces each paragraph (or text in cell) in the select with the corresponding text from an array of
     * strings.
     *
     * @param textStrings - An array of replacement strings.
     * @param tab - A character which is used to specify the tab in the source text.
     * @param newLine - A character which is used to specify the line break character in the source text.
     * @default tab = "\t"
     * @default newLine = "\r\n"
     *
     * @example
     * ```js
     * // How do I replace text without losing its bold or italic styling in a document?
     *
     * // Swap out paragraph text for new content and retain the existing character formatting in a document.
     *
     * let doc = Api.GetDocument();
     * let paragraph = doc.GetElement(0);
     * paragraph.AddText("This is the normal text. ");
     * paragraph.AddText("The is bold text. ").SetBold(true);
     * paragraph.AddText("This is italic text.").SetItalic(true);
     *
     * paragraph.GetRange().Select();
     * Api.ReplaceTextSmart(["This is the normal text. This bold text was smart replaced. This is italic text."]);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/Api/Methods/ReplaceTextSmart/
     */
    ReplaceTextSmart(textStrings: string[], tab?: string, newLine?: string): boolean;
  }

  /** Class representing a container for the document content. */
  export interface ApiBlockLvlSdt {
  }

  /** Class representing a bookmark in the document. */
  export interface ApiBookmark {
  }

  /** Class representing a paragraph bullet. */
  export interface ApiBullet {
  }

  /** Class representing a chart. */
  export interface ApiChart extends ApiDrawing {
  }

  /** Class representing a chart series. */
  export interface ApiChartSeries {
  }

  /**
   * Class representing a document checkbox / radio button.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiCheckBoxForm/
   */
  export interface ApiCheckBoxForm extends Omit<ApiFormBase, "GetClassType" | "GetValue" | "SetValue"> {
    /**
     * Clears the current form.
     *
     * @example
     * ```js
     * // How do I clear the content of a form in a document?
     *
     * // Reset a filled-in form field to blank so it is ready for new input in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetText("John Smith");
     * textForm.Clear();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document was cleared.");
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/Clear/
     */
    Clear(): boolean;

    /**
     * Copies the current form (copies with the shape if it exists).
     *
     * @example
     * ```js
     * // How do I copy a form field in a document?
     *
     * // Reuse an existing form by placing an identical copy elsewhere on the same paragraph.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let copyTextForm = textForm.Copy();
     * paragraph.AddLineBreak();
     * paragraph.AddElement(copyTextForm);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/Copy/
     */
    Copy(): ApiForm;

    /**
     * Removes a form and its content.
     *
     * If keepContent is true, the content is not deleted.
     *
     * @param keepContent - Specifies if the content will be deleted or not.
     * @returns returns false if form wasn't added to the document.
     * @since 9.2.0
     *
     * @example
     * ```js
     * // How do I delete a form field in a document?
     *
     * // Clean up a document by removing one of several inserted checkbox forms.
     *
     * const doc = Api.GetDocument();
     * const checkBoxForm = Api.CreateCheckBoxForm({
     * 	'key': 'Marital status',
     * 	'tip': 'Specify your marital status',
     * 	'placeholder': 'Marital status',
     * 	'radio': true
     * });
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(checkBoxForm);
     * paragraph.AddText(' Married');
     * let copyCheckBoxForm = checkBoxForm.Copy();
     * paragraph.AddLineBreak();
     * paragraph.AddElement(copyCheckBoxForm);
     * paragraph.AddText(' Single');
     * checkBoxForm.Delete();
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/Delete/
     */
    Delete(keepContent?: boolean): boolean;

    /**
     * Returns the background color of the current form.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetBackgroundColor/
     */
    GetBackgroundColor(): ApiColor;

    /**
     * Returns the border color of the current form.
     *
     * @since 9.1.0
     *
     * @example
     * ```js
     * // How do I get the border color of a form field in a document?
     *
     * // Verify a custom border color by reading its RGB values back after applying it.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetBorderColor(Api.RGB(255, 111, 61));
     * let borderColor = textForm.GetBorderColor();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Border color (RGB): (" + borderColor.r + ", " + borderColor.g + ", " + borderColor.b + ")");
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetBorderColor/
     */
    GetBorderColor(): ApiColor;

    /**
     * Returns the choice name of the current radio button.
     *
     * @since 8.3.2
     *
     * @example
     * ```js
     * // How do I find out which radio button a user has chosen by reading its name in a document?
     *
     * // Identify the active selection in a grouped set of choices so it can be displayed or processed in a document.
     *
     * let doc = Api.GetDocument();
     *
     * // Create first radio button
     * let checkBoxForm = Api.CreateCheckBoxForm({
     *     "tip": "Select your preferred contact method",
     *     "required": true,
     *     "placeholder": "Contact preference",
     *     "radio": true
     * });
     * checkBoxForm.SetRadioGroup("ContactPreference");
     * checkBoxForm.SetChoiceName("Email");
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(checkBoxForm);
     * paragraph.AddText(" Email");
     * paragraph.AddLineBreak();
     *
     * // Create second radio button
     * checkBoxForm = Api.CreateCheckBoxForm({
     *     "tip": "Select your preferred contact method",
     *     "required": true,
     *     "placeholder": "Contact preference",
     *     "radio": true
     * });
     * checkBoxForm.SetRadioGroup("ContactPreference");
     * checkBoxForm.SetChoiceName("Phone");
     * paragraph.AddElement(checkBoxForm);
     * paragraph.AddText(" Phone");
     * paragraph.AddLineBreak();
     * checkBoxForm.SetChecked(true);
     *
     * // Create third radio button
     * checkBoxForm = Api.CreateCheckBoxForm({
     *     "tip": "Select your preferred contact method",
     *     "required": true,
     *     "placeholder": "Contact preference",
     *     "radio": true
     * });
     * checkBoxForm.SetRadioGroup("ContactPreference");
     * checkBoxForm.SetChoiceName("Mail");
     * paragraph.AddElement(checkBoxForm);
     * paragraph.AddText(" Mail");
     *
     * // Find the selected radio button and display the choice name
     * let radioGroup = checkBoxForm.GetRadioGroup();
     * paragraph = Api.CreateParagraph();
     * doc.GetAllForms().forEach(form => {
     *     if ("ContactPreference" === form.GetRadioGroup() && form.IsChecked()) {
     *         let choiceName = form.GetChoiceName();
     *         paragraph.AddText("Selected option: " + choiceName);
     *     }
     * });
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiCheckBoxForm/Methods/GetChoiceName/
     */
    GetChoiceName(): string;

    /**
     * Returns a type of the ApiCheckBoxForm class.
     *
     * @since 9.0.4
     *
     * @example
     * ```js
     * // How do I confirm the object type of a checkbox form at runtime in a document?
     *
     * // Verify that a form element is a checkbox before applying checkbox-specific operations in a document.
     *
     * let doc = Api.GetDocument();
     * let checkBoxForm = Api.CreateCheckBoxForm({"key": "Marital status", "tip": "Specify your marital status", "required": true, "placeholder": "Marital status", "radio": true});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(checkBoxForm);
     * paragraph.AddText(" Married");
     * paragraph.AddLineBreak();
     * checkBoxForm = Api.CreateCheckBoxForm({"key": "Marital status", "tip": "Specify your marital status", "required": true, "placeholder": "Marital status", "radio": true});
     * paragraph.AddElement(checkBoxForm);
     * paragraph.AddText(" Single");
     * let classType = checkBoxForm.GetClassType();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Class type: " + classType);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiCheckBoxForm/Methods/GetClassType/
     */
    GetClassType(): "checkBoxForm";

    /**
     * Returns the current form key.
     *
     * @example
     * ```js
     * // How do I get the key of a form field in a document?
     *
     * // Confirm the grouping key of a combo box by reading it back and displaying it.
     *
     * let doc = Api.GetDocument();
     * let comboBoxForm = Api.CreateComboBoxForm({"key": "Personal information", "tip": "Choose your country", "required": true, "placeholder": "Country", "editable": false, "autoFit": false, "items": ["Latvia", "USA", "UK"]});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(comboBoxForm);
     * let key = comboBoxForm.GetFormKey();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form key: " + key);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetFormKey/
     */
    GetFormKey(): string;

    /**
     * Returns a type of the current form.
     *
     * @example
     * ```js
     * // How do I get the type of a form field in a document?
     *
     * // Distinguish one form from another by printing its type identifier next to it.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let formType = textForm.GetFormType();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form type: " + formType);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetFormType/
     */
    GetFormType(): FormType;

    /**
     * Returns the choice name of the currently selected radio button in the group.
     *
     * Returns an empty string if the current form is not a radio button or nothing is selected.
     *
     * @since 9.4.0
     *
     * @example
     * ```js
     * // The GetGroupValue method returns the selected choice name, or an empty string if nothing is selected.
     *
     * // Create two radio buttons, select one, then read the group value and display it.
     *
     * let doc = Api.GetDocument();
     * let paragraph = doc.GetElement(0);
     * let radio1 = Api.CreateCheckBoxForm({"tip": "Select your marital status", "required": true, "placeholder": "Status", "radio": true});
     * radio1.SetRadioGroup("MaritalStatus");
     * radio1.SetChoiceName("Married");
     * paragraph.AddElement(radio1);
     * paragraph.AddText(" Married");
     * paragraph.AddLineBreak();
     * let radio2 = Api.CreateCheckBoxForm({"tip": "Select your marital status", "required": true, "placeholder": "Status", "radio": true});
     * radio2.SetRadioGroup("MaritalStatus");
     * radio2.SetChoiceName("Single");
     * paragraph.AddElement(radio2);
     * paragraph.AddText(" Single");
     * radio1.SetGroupValue("Married");
     * let groupValue = radio1.GetGroupValue();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Selected radio button: " + groupValue);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiCheckBoxForm/Methods/GetGroupValue/
     */
    GetGroupValue(): string;

    /**
     * Returns an internal id of the current form.
     *
     * @since 9.2.0
     *
     * @example
     * ```js
     * // How do I get the internal ID of a form field in a document?
     *
     * // Uniquely track a form by reading its auto-assigned internal identifier.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let internalId = textForm.GetInternalId();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Internal id: " + internalId);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetInternalId/
     */
    GetInternalId(): string;

    /**
     * Returns the label of the current check box.
     *
     * @since 9.2.0
     *
     * @example
     * ```js
     * // How do I retrieve the label displayed next to a checkbox form in a document?
     *
     * // Confirm the descriptive label of a checkbox before presenting it to users in a document.
     *
     * let doc = Api.GetDocument();
     * let checkBoxForm = Api.CreateCheckBoxForm({"tip": "Select if you agree to terms", "required": true, "key" : "Terms agreement"});
     * checkBoxForm.SetLabel(" I agree to the terms and conditions");
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(checkBoxForm);
     *
     * // Get the label from the checkbox form
     * let label = checkBoxForm.GetLabel();
     *
     * // Add the retrieved label text to the document
     * paragraph.AddLineBreak();
     * paragraph.AddLineBreak();
     * paragraph.AddText("Retrieved label: " + label);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiCheckBoxForm/Methods/GetLabel/
     */
    GetLabel(): string;

    /**
     * Returns the lock state of the current form.
     *
     * @since 9.3.0
     *
     * @example
     * ```js
     * // How do I find out whether a form field is locked in a document?
     *
     * // Protect a form, then confirm the lock is active by reading the lock state.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetLock(true);
     * let locked = textForm.GetLock();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document is locked: " + locked);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetLock/
     */
    GetLock(): boolean;

    /**
     * Returns the parent element (a paragraph or an inline content control) that directly contains the
     * current form.
     *
     * @returns returns null if the form has no parent.
     * @since 10.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetParent/
     */
    GetParent(): ParagraphLikeContainer;

    /**
     * Returns the placeholder text from the current form.
     *
     * @since 9.1.0
     *
     * @example
     * ```js
     * // How do I get the placeholder text of a form field in a document?
     *
     * // Confirm a hint label by retrieving the placeholder text after setting it on a form.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetPlaceholderText("First name");
     * let placeholderText = textForm.GetPlaceholderText();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Placeholder text: " + placeholderText);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetPlaceholderText/
     */
    GetPlaceholderText(): string;

    /**
     * Returns the position (index) of the current form within its parent element.
     *
     * @returns returns -1 if the form has no parent.
     * @since 10.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetPosInParent/
     */
    GetPosInParent(): number;

    /**
     * Returns the radio group key if the current checkbox is a radio button.
     *
     * @example
     * ```js
     * // How do I find out which radio group a checkbox button belongs to in a document?
     *
     * // Confirm that multiple radio buttons share the same group so only one can be selected at a time in a document.
     *
     * let doc = Api.GetDocument();
     * let checkBoxForm = Api.CreateCheckBoxForm({"tip": "Specify your marital status", "required": true, "placeholder": "Marital status", "radio": true});
     * checkBoxForm.SetRadioGroup("Marital status");
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(checkBoxForm);
     * paragraph.AddText(" Married");
     * paragraph.AddLineBreak();
     * checkBoxForm = Api.CreateCheckBoxForm({"tip": "Specify your marital status", "required": true, "placeholder": "Marital status", "radio": true});
     * checkBoxForm.SetRadioGroup("Marital status");
     * paragraph.AddElement(checkBoxForm);
     * paragraph.AddText(" Single");
     * let radioGroup = checkBoxForm.GetRadioGroup();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Radio group name of the radio buttons in this document: " + radioGroup);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiCheckBoxForm/Methods/GetRadioGroup/
     */
    GetRadioGroup(): string;

    /**
     * Returns the role of the current form.
     *
     * @since 9.0.0
     *
     * @example
     * ```js
     * // How do I get the role of a form field in a document?
     *
     * // Assign a custom role to a form, then read it back to verify the assignment.
     *
     * const doc = Api.GetDocument();
     * let paragraph = doc.GetElement(0);
     *
     * const roles = doc.GetFormRoles();
     * const rolePr = { "color": "#ffefbf" };
     * roles.Add("MY_ROLE", rolePr);
     *
     * const textForm = Api.CreateTextForm({
     * 	"tip": "Enter your first name",
     * 	"required": true,
     * 	"placeholder": "First name",
     * 	"comb": true,
     * 	"maxCharacters": 10,
     * 	"cellWidth": 3,
     * 	"multiLine": false,
     * 	"autoFit": false
     * });
     * paragraph.AddElement(textForm);
     *
     * textForm.SetRole("MY_ROLE");
     * const role = textForm.GetRole();
     *
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form role: " + role);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetRole/
     */
    GetRole(): string;

    /**
     * Returns the tag attribute for the current form.
     *
     * @since 9.0.0
     *
     * @example
     * ```js
     * // How do I get the tag of a form field in a document?
     *
     * // Label a form with a custom tag, then retrieve it to confirm it was stored correctly.
     *
     * const doc = Api.GetDocument();
     * let paragraph = doc.GetElement(0);
     *
     * const textForm = Api.CreateTextForm({
     * 	"key": "Personal information",
     * 	"tip": "Enter your first name",
     * 	"required": true,
     * 	"placeholder": "First name",
     * 	"comb": true,
     * 	"maxCharacters": 10,
     * 	"cellWidth": 3,
     * 	"multiLine": false,
     * 	"autoFit": false
     * });
     * textForm.SetTag('MY_TAG');
     * paragraph.AddElement(textForm);
     *
     * const formTag = textForm.GetTag();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form tag: " + formTag);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetTag/
     */
    GetTag(): string;

    /**
     * Returns the text from the current form.
     *
     * @example
     * ```js
     * // How do I read the current value typed into a form in a document?
     *
     * // Extract the raw content of a filled-in text field to use or display elsewhere in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let text = textForm.GetText();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form text: " + text);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetText/
     */
    GetText(): string;

    /**
     * Returns the text properties from the current form.
     *
     * **Note:**
     * Used if possible for this type of form.
     *
     * @example
     * ```js
     * // How do I access the font and style settings of a form field in a document?
     *
     * // Retrieve the current text properties of a form so they can be adjusted and reapplied in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let textPr = Api.CreateTextPr();
     * textPr.SetFontSize(30);
     * textPr.SetBold(true);
     * textForm.SetTextPr(textPr);
     * let formTextPr = textForm.GetTextPr();
     * formTextPr.SetItalic(true);
     * textForm.SetTextPr(formTextPr);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetTextPr/
     */
    GetTextPr(): ApiTextPr;

    /**
     * Returns the tip text of the current form.
     *
     * @example
     * ```js
     * // How do I read the instructional hint shown when a user hovers over a form field in a document?
     *
     * // Display the tooltip message of a drop-down form to verify what guidance is shown to the user in a document.
     *
     * let doc = Api.GetDocument();
     * let comboBoxForm = Api.CreateComboBoxForm({"key": "Personal information", "tip": "Choose your country", "required": true, "placeholder": "Country", "editable": false, "autoFit": false, "items": ["Latvia", "USA", "UK"]});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(comboBoxForm);
     * let tipText = comboBoxForm.GetTipText();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form tip text: " + tipText);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetTipText/
     */
    GetTipText(): string;

    /**
     * Returns the current state of the checkbox form as a boolean value.
     *
     * @since 9.4.0
     *
     * @example
     * ```js
     * // The GetValue method returns true if the checkbox is checked and false otherwise.
     *
     * // Check the checkbox form and then read its value to display the state.
     *
     * let doc = Api.GetDocument();
     * let checkBoxForm = Api.CreateCheckBoxForm({"key": "Agreement", "tip": "I agree to the terms", "required": true, "placeholder": "Agreement"});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(checkBoxForm);
     * paragraph.AddText(" I agree to the terms");
     * checkBoxForm.SetValue(true);
     * let value = checkBoxForm.GetValue();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Checkbox value: " + value);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiCheckBoxForm/Methods/GetValue/
     */
    GetValue(): boolean;

    /**
     * Returns a shape in which the form is placed to control the position and size of the fixed size form
     * frame.
     *
     * The null value will be returned for the inline forms.
     *
     * @returns returns the shape in which the form is placed.
     *
     * @example
     * ```js
     * // How do I get the surrounding shape of a form field so I can adjust its border or position in a document?
     *
     * // Apply a custom outline to the wrapper shape of a form field to make it stand out visually in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.ToFixed(10 * 240, 2 * 240);
     * let shape = textForm.GetWrapperShape();
     * let stroke = Api.CreateStroke(36000, Api.CreateSolidFill(Api.RGB(255, 111, 61)));
     * shape.SetOutLine(stroke);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetWrapperShape/
     */
    GetWrapperShape(): ApiShape;

    /**
     * Returns the state of the current checkbox (checked or not).
     *
     * @example
     * ```js
     * // How do I find out if a checkbox form is checked in a document?
     *
     * // Confirm the checked state of a specific radio button after programmatically selecting it in a document.
     *
     * let doc = Api.GetDocument();
     * let checkBoxForm = Api.CreateCheckBoxForm({"key": "Marital status", "tip": "Specify your marital status", "required": true, "placeholder": "Marital status", "radio": true});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(checkBoxForm);
     * paragraph.AddText(" Married");
     * paragraph.AddLineBreak();
     * checkBoxForm = Api.CreateCheckBoxForm({"key": "Marital status", "tip": "Specify your marital status", "required": true, "placeholder": "Marital status", "radio": true});
     * paragraph.AddElement(checkBoxForm);
     * paragraph.AddText(" Single");
     * checkBoxForm.SetChecked(true);
     * let checked = checkBoxForm.IsChecked();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The second radio button from this document is checked: " + checked);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiCheckBoxForm/Methods/IsChecked/
     */
    IsChecked(): boolean;

    /**
     * Checks if the current form is filled.
     *
     * @since 9.4.0
     *
     * @example
     * ```js
     * // How do I tell if a form field has been filled out in a document?
     *
     * // Verify the fill status of multiple form fields to determine which ones still need input in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm1 = Api.CreateTextForm({"key": "Name1", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": false, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm1);
     * let textForm2 = Api.CreateTextForm({"key": "Name2", "tip": "Enter your last name", "required": true, "placeholder": "Last name", "comb": false, "multiLine": false, "autoFit": false});
     * paragraph.AddElement(textForm2);
     * textForm2.SetText("Smith");
     * let filled1 = textForm1.IsFilled();
     * let filled2 = textForm2.IsFilled();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first text form is filled: " + filled1);
     * doc.Push(paragraph);
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The second text form is filled: " + filled2);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/IsFilled/
     */
    IsFilled(): boolean;

    /**
     * Checks if the current form is fixed size.
     *
     * @example
     * ```js
     * // How do I find out if a form field is locked to a specific size in a document?
     *
     * // Confirm the fixed-size status of a form field before deciding whether layout adjustments are needed in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.ToFixed(10 * 240, 2 * 240);
     * let fixed = textForm.IsFixed();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document is fixed: " + fixed);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/IsFixed/
     */
    IsFixed(): boolean;

    /**
     * Checks if the current checkbox is a radio button.
     *
     * @example
     * ```js
     * // How do I find out if a checkbox form is a radio button in a document?
     *
     * // Distinguish a radio-style form from a standard checkbox by reading its type in a document.
     *
     * let doc = Api.GetDocument();
     * let checkBoxForm = Api.CreateCheckBoxForm({"key": "Marital status", "tip": "Specify your marital status", "required": true, "placeholder": "Marital status", "radio": true});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(checkBoxForm);
     * paragraph.AddText(" Married");
     * paragraph.AddLineBreak();
     * checkBoxForm = Api.CreateCheckBoxForm({"key": "Marital status", "tip": "Specify your marital status", "required": true, "placeholder": "Marital status", "radio": true});
     * paragraph.AddElement(checkBoxForm);
     * paragraph.AddText(" Single");
     * let radioButton = checkBoxForm.IsRadioButton();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The second form from this document is a radio button: " + radioButton);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiCheckBoxForm/Methods/IsRadioButton/
     */
    IsRadioButton(): boolean;

    /**
     * Checks if the current form is required.
     *
     * @example
     * ```js
     * // How do I check if a form field must be filled out before the document is submitted in a document?
     *
     * // Confirm whether a form field is required so the result can be shown to the reader in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let required = textForm.IsRequired();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document is required: " + required);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/IsRequired/
     */
    IsRequired(): boolean;

    /**
     * Places a cursor before/after the current form.
     *
     * @param isAfter - Specifies whether a cursor will be placed before (false) or after (true) the current form.
     * @default isAfter = true
     * @since 8.1.0
     *
     * @example
     * ```js
     * // How do I place the cursor right after a form field to continue typing in a document?
     *
     * // Shift focus out of a completed form field so the next input lands in the surrounding text in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetText("The cursor will be placed after the current form.");
     * textForm.MoveCursorOutside(true);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/MoveCursorOutside/
     */
    MoveCursorOutside(isAfter?: boolean): boolean;

    /**
     * Sets the background color to the current form.
     *
     * @param color - The background color.
     * @since 9.1.0
     *
     * @example
     * ```js
     * // How do I fill a form field with a specific background color in a document?
     *
     * // Color the background of a form field to make it visually distinct from surrounding text in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetBackgroundColor(Api.HexColor('#FF6F3D'));
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetBackgroundColor/
     */
    SetBackgroundColor(color?: ApiColor): boolean;

    /**
     * Sets the border color to the current form.
     *
     * @param color - The border color.
     * @since 9.1.0
     *
     * @example
     * ```js
     * // How do I change the border color of a form field in a document?
     *
     * // Style the outline of a form field with a specific color to draw attention to it in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetBorderColor(Api.HexColor('#FF6F3D'));
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetBorderColor/
     */
    SetBorderColor(color?: ApiColor): boolean;

    /**
     * Checks the current checkbox.
     *
     * @param isChecked - Specifies if the current checkbox will be checked (true) or not (false).
     *
     * @example
     * ```js
     * // How do I programmatically check a checkbox form in a document?
     *
     * // Pre-select a specific radio button option without requiring manual user interaction in a document.
     *
     * let doc = Api.GetDocument();
     * let checkBoxForm = Api.CreateCheckBoxForm({"key": "Marital status", "tip": "Specify your marital status", "required": true, "placeholder": "Marital status", "radio": true});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(checkBoxForm);
     * paragraph.AddText(" Married");
     * paragraph.AddLineBreak();
     * checkBoxForm = Api.CreateCheckBoxForm({"key": "Marital status", "tip": "Specify your marital status", "required": true, "placeholder": "Marital status", "radio": true});
     * paragraph.AddElement(checkBoxForm);
     * paragraph.AddText(" Single");
     * checkBoxForm.SetChecked(true);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiCheckBoxForm/Methods/SetChecked/
     */
    SetChecked(isChecked: boolean): boolean;

    /**
     * Sets the choice name for the current radio button.
     *
     * @param choiceName - The radio button choice name.
     * @since 8.3.2
     *
     * @example
     * ```js
     * // How do I label individual radio button choices in a grouped form in a document?
     *
     * // Build a grouped set of radio buttons with distinct choice labels and retrieve the selected label in a document.
     *
     * let doc = Api.GetDocument();
     *
     * // Create first radio button
     * let checkBoxForm = Api.CreateCheckBoxForm({
     *     "tip": "Select your preferred contact method",
     *     "required": true,
     *     "placeholder": "Contact preference",
     *     "radio": true
     * });
     * checkBoxForm.SetRadioGroup("ContactPreference");
     * checkBoxForm.SetChoiceName("Email");
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(checkBoxForm);
     * paragraph.AddText(" Email");
     * paragraph.AddLineBreak();
     *
     * // Create second radio button
     * checkBoxForm = Api.CreateCheckBoxForm({
     *     "tip": "Select your preferred contact method",
     *     "required": true,
     *     "placeholder": "Contact preference",
     *     "radio": true
     * });
     * checkBoxForm.SetRadioGroup("ContactPreference");
     * checkBoxForm.SetChoiceName("Phone");
     * paragraph.AddElement(checkBoxForm);
     * paragraph.AddText(" Phone");
     * paragraph.AddLineBreak();
     * checkBoxForm.SetChecked(true);
     *
     * // Create third radio button
     * checkBoxForm = Api.CreateCheckBoxForm({
     *     "tip": "Select your preferred contact method",
     *     "required": true,
     *     "placeholder": "Contact preference",
     *     "radio": true
     * });
     * checkBoxForm.SetRadioGroup("ContactPreference");
     * checkBoxForm.SetChoiceName("Mail");
     * paragraph.AddElement(checkBoxForm);
     * paragraph.AddText(" Mail");
     *
     * // Find the selected radio button and display the choice name
     * let radioGroup = checkBoxForm.GetRadioGroup();
     * paragraph = Api.CreateParagraph();
     * doc.GetAllForms().forEach(form => {
     *     if ("ContactPreference" === form.GetRadioGroup() && form.IsChecked()) {
     *         let choiceName = form.GetChoiceName();
     *         paragraph.AddText("Selected option: " + choiceName);
     *     }
     * });
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiCheckBoxForm/Methods/SetChoiceName/
     */
    SetChoiceName(choiceName: string): boolean;

    /**
     * Sets a key to the current form.
     *
     * @param sKey - Form key.
     *
     * @example
     * ```js
     * // How do I set the key that identifies a form field in a document?
     *
     * // Label a form field with a custom key so it can be referenced or grouped with related fields in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetFormKey("Personal information");
     * let key = textForm.GetFormKey();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form key: " + key);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetFormKey/
     */
    SetFormKey(sKey: string): boolean;

    /**
     * Selects the radio button with the specified choice name in the group.
     *
     * @param value - The choice name of the radio button to select.
     * @since 9.4.0
     *
     * @example
     * ```js
     * // The SetGroupValue method changes which radio button is selected across all buttons in the same group.
     *
     * // Create two radio buttons in the same group, then select one using SetGroupValue.
     *
     * let doc = Api.GetDocument();
     * let paragraph = doc.GetElement(0);
     * let radio1 = Api.CreateCheckBoxForm({"tip": "Select your gender", "required": true, "placeholder": "Gender", "radio": true});
     * radio1.SetRadioGroup("Gender");
     * radio1.SetChoiceName("Male");
     * paragraph.AddElement(radio1);
     * paragraph.AddText(" Male");
     * paragraph.AddLineBreak();
     * let radio2 = Api.CreateCheckBoxForm({"tip": "Select your gender", "required": true, "placeholder": "Gender", "radio": true});
     * radio2.SetRadioGroup("Gender");
     * radio2.SetChoiceName("Female");
     * paragraph.AddElement(radio2);
     * paragraph.AddText(" Female");
     * radio1.SetGroupValue("Female");
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiCheckBoxForm/Methods/SetGroupValue/
     */
    SetGroupValue(value: string): boolean;

    /**
     * Sets the label for the current check box.
     *
     * @param label - The label.
     * @since 9.2.0
     *
     * @example
     * ```js
     * // How do I add descriptive text next to a checkbox in a document?
     *
     * // Label each checkbox option so readers know what they are selecting in a document.
     *
     * let doc = Api.GetDocument();
     * let checkBoxForm = Api.CreateCheckBoxForm({"tip": "Specify your marital status", "required": true, "radio": true, "key" : "Marital status"});
     * checkBoxForm.SetLabel(" Married");
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(checkBoxForm);
     * paragraph.AddLineBreak();
     * checkBoxForm = Api.CreateCheckBoxForm({"tip": "Specify your marital status", "required": true, "radio" : true, "key" : "Marital status"});
     * checkBoxForm.SetLabel(" Single");
     * paragraph.AddElement(checkBoxForm);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiCheckBoxForm/Methods/SetLabel/
     */
    SetLabel(label: string): boolean;

    /**
     * Sets the lock state of the current form.
     *
     * @param isLock - Specifies whether to lock the form (true) or unlock it (false).
     * @returns Returns true if the operation is successful.
     * @since 9.3.0
     *
     * @example
     * ```js
     * // How do I lock a form field so it cannot be changed in a document?
     *
     * // Protect specific fields from modification while keeping others editable.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetLock(true);
     * let locked = textForm.GetLock();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document is locked: " + locked);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetLock/
     */
    SetLock(isLock: boolean): boolean;

    /**
     * Sets the placeholder text to the current form.
     *
     * **Note:**
     * The placeholder text can't be set for checkbox or radio button forms.
     *
     * @param sText - The text that will be set to the current form.
     *
     * @example
     * ```js
     * // How do I add hint text inside an empty form field in a document?
     *
     * // Display a prompt inside a field before the user fills it in.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetPlaceholderText("First name");
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetPlaceholderText/
     */
    SetPlaceholderText(sText: string): boolean;

    /**
     * Sets the radio group key to the current radio button.
     *
     * @param sKey - Radio group key.
     *
     * @example
     * ```js
     * // How do I link multiple radio buttons into a single exclusive group in a document?
     *
     * // Ensure mutually exclusive choices by assigning all related buttons to the same group in a document.
     *
     * let doc = Api.GetDocument();
     * let checkBoxForm = Api.CreateCheckBoxForm({"tip": "Specify your marital status", "required": true, "placeholder": "Marital status", "radio": true});
     * checkBoxForm.SetRadioGroup("Marital status");
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(checkBoxForm);
     * paragraph.AddText(" Married");
     * paragraph.AddLineBreak();
     * checkBoxForm = Api.CreateCheckBoxForm({"tip": "Specify your marital status", "required": true, "placeholder": "Marital status", "radio": true});
     * checkBoxForm.SetRadioGroup("Marital status");
     * paragraph.AddElement(checkBoxForm);
     * paragraph.AddText(" Single");
     * let radioGroup = checkBoxForm.GetRadioGroup();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Radio group name of the radio buttons in this document: " + radioGroup);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiCheckBoxForm/Methods/SetRadioGroup/
     */
    SetRadioGroup(sKey: string): boolean;

    /**
     * Specifies if the current form should be required.
     *
     * @param bRequired - Defines if the current form is required (true) or not (false).
     *
     * @example
     * ```js
     * // How do I make a form field mandatory in a document?
     *
     * // Ensure a field must be filled before the document form is submitted.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetRequired(true);
     * let required = textForm.IsRequired();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document is required: " + required);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetRequired/
     */
    SetRequired(bRequired: boolean): boolean;

    /**
     * Sets the role to the current form.
     *
     * @param role - The role which will be attached to the current form.
     * @since 9.0.0
     *
     * @example
     * ```js
     * // How do I associate a form field with a specific role in a document?
     *
     * // Restrict which signers or participants are responsible for a given field.
     *
     * const doc = Api.GetDocument();
     * let paragraph = doc.GetElement(0);
     *
     * const roles = doc.GetFormRoles();
     * const rolePr = { "color": "#ffefbf" };
     * roles.Add("MY_ROLE", rolePr);
     *
     * const textForm = Api.CreateTextForm({
     * 	"tip": "Enter your first name",
     * 	"required": true,
     * 	"placeholder": "First name",
     * 	"comb": true,
     * 	"maxCharacters": 10,
     * 	"cellWidth": 3,
     * 	"multiLine": false,
     * 	"autoFit": false
     * });
     * paragraph.AddElement(textForm);
     *
     * textForm.SetRole("MY_ROLE");
     * const role = textForm.GetRole();
     *
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form role: " + role);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetRole/
     */
    SetRole(role: string): boolean;

    /**
     * Sets the tag attribute to the current form.
     *
     * @param tag - The tag which will be added to the current container.
     * @since 9.0.0
     *
     * @example
     * ```js
     * // How do I attach a label or identifier to a form field in a document?
     *
     * // Organize or reference form fields programmatically using custom tags.
     *
     * const doc = Api.GetDocument();
     * let paragraph = doc.GetElement(0);
     *
     * const textForm = Api.CreateTextForm({
     * 	"key": "Personal information",
     * 	"tip": "Enter your first name",
     * 	"required": true,
     * 	"placeholder": "First name",
     * 	"comb": true,
     * 	"maxCharacters": 10,
     * 	"cellWidth": 3,
     * 	"multiLine": false,
     * 	"autoFit": false
     * });
     * textForm.SetTag('MY_TAG');
     * paragraph.AddElement(textForm);
     *
     * const formTag = textForm.GetTag();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form tag: " + formTag);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetTag/
     */
    SetTag(tag: string): boolean;

    /**
     * Sets the text properties to the current form.
     *
     * **Note:**
     * Used if possible for this type of form.
     *
     * @param textPr - The text properties that will be set to the current form.
     *
     * @example
     * ```js
     * // How do I change the font size and style of text inside a form field in a document?
     *
     * // Make form field text bold and larger to improve readability.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let textPr = Api.CreateTextPr();
     * textPr.SetFontSize(30);
     * textPr.SetBold(true);
     * textForm.SetTextPr(textPr);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetTextPr/
     */
    SetTextPr(textPr: ApiTextPr): boolean;

    /**
     * Sets the tip text to the current form.
     *
     * @param sText - Tip text.
     *
     * @example
     * ```js
     * // How do I add a tooltip that appears when hovering over a form field in a document?
     *
     * // Give users helpful instructions that appear when they hover over a field.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetTipText("Enter your first name");
     * let tipText = textForm.GetTipText();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Tip text: " + tipText);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetTipText/
     */
    SetTipText(sText: string): boolean;

    /**
     * Sets the state of the checkbox form.
     *
     * @param value - Specifies if the checkbox will be checked (true) or not (false).
     * @since 9.4.0
     *
     * @example
     * ```js
     * // The SetValue method accepts a boolean: true to check the box, false to uncheck it.
     *
     * // Create a checkbox form and mark it as checked using SetValue.
     *
     * let doc = Api.GetDocument();
     * let checkBoxForm = Api.CreateCheckBoxForm({"key": "Agreement", "tip": "I agree to the terms", "required": true, "placeholder": "Agreement"});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(checkBoxForm);
     * paragraph.AddText(" I agree to the terms");
     * checkBoxForm.SetValue(true);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiCheckBoxForm/Methods/SetValue/
     */
    SetValue(value: boolean): boolean;

    /**
     * Converts the current form to a fixed size form.
     *
     * @param width - The wrapper shape width measured in twentieths of a point (1/1440 of an inch).
     * @param height - The wrapper shape height measured in twentieths of a point (1/1440 of an inch).
     * @param keepPosition - Save position on the page (it can be a little bit slow, because it runs the document
     *   calculation).
     *
     * @example
     * ```js
     * // How do I set a specific width and height for a form field in a document?
     *
     * // Lock a form's dimensions so layout does not shift when content changes.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.ToFixed(10 * 240, 2 * 240);
     * let fixed = textForm.IsFixed();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document has a fixed size: " + fixed);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/ToFixed/
     */
    ToFixed(width: twips, height: twips, keepPosition?: boolean): boolean;

    /**
     * Converts the current form to an inline form.
     *
     * **Note:**
     * A picture form can't be converted to an inline form, as it's always a fixed-size object.
     *
     * @example
     * ```js
     * // How do I switch a form field from fixed size to inline positioning in a document?
     *
     * // Allow a form field to flow with surrounding text instead of occupying a fixed block.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.ToFixed(10 * 240, 2 * 240);
     * let copyForm = textForm.Copy();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddElement(copyForm);
     * doc.Push(paragraph);
     * copyForm.ToInline();
     * let fixed = textForm.IsFixed();
     * let fixedCopy = copyForm.IsFixed();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document has a fixed size: " + fixed);
     * paragraph.AddLineBreak();
     * paragraph.AddText("The second form from this document has a fixed size: " + fixedCopy);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/ToInline/
     */
    ToInline(): boolean;
  }

  /** Represents a color that can be applied to text. */
  export interface ApiColor {
  }

  /**
   * Class representing a document combo box / drop-down list.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiComboBoxForm/
   */
  export interface ApiComboBoxForm extends Omit<ApiFormBase, "GetClassType" | "GetValue" | "SetValue"> {
    /**
     * Clears the current form.
     *
     * @example
     * ```js
     * // How do I clear the content of a form in a document?
     *
     * // Reset a filled-in form field to blank so it is ready for new input in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetText("John Smith");
     * textForm.Clear();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document was cleared.");
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/Clear/
     */
    Clear(): boolean;

    /**
     * Copies the current form (copies with the shape if it exists).
     *
     * @example
     * ```js
     * // How do I copy a form field in a document?
     *
     * // Reuse an existing form by placing an identical copy elsewhere on the same paragraph.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let copyTextForm = textForm.Copy();
     * paragraph.AddLineBreak();
     * paragraph.AddElement(copyTextForm);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/Copy/
     */
    Copy(): ApiForm;

    /**
     * Removes a form and its content.
     *
     * If keepContent is true, the content is not deleted.
     *
     * @param keepContent - Specifies if the content will be deleted or not.
     * @returns returns false if form wasn't added to the document.
     * @since 9.2.0
     *
     * @example
     * ```js
     * // How do I delete a form field in a document?
     *
     * // Clean up a document by removing one of several inserted checkbox forms.
     *
     * const doc = Api.GetDocument();
     * const checkBoxForm = Api.CreateCheckBoxForm({
     * 	'key': 'Marital status',
     * 	'tip': 'Specify your marital status',
     * 	'placeholder': 'Marital status',
     * 	'radio': true
     * });
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(checkBoxForm);
     * paragraph.AddText(' Married');
     * let copyCheckBoxForm = checkBoxForm.Copy();
     * paragraph.AddLineBreak();
     * paragraph.AddElement(copyCheckBoxForm);
     * paragraph.AddText(' Single');
     * checkBoxForm.Delete();
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/Delete/
     */
    Delete(keepContent?: boolean): boolean;

    /**
     * Returns the background color of the current form.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetBackgroundColor/
     */
    GetBackgroundColor(): ApiColor;

    /**
     * Returns the border color of the current form.
     *
     * @since 9.1.0
     *
     * @example
     * ```js
     * // How do I get the border color of a form field in a document?
     *
     * // Verify a custom border color by reading its RGB values back after applying it.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetBorderColor(Api.RGB(255, 111, 61));
     * let borderColor = textForm.GetBorderColor();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Border color (RGB): (" + borderColor.r + ", " + borderColor.g + ", " + borderColor.b + ")");
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetBorderColor/
     */
    GetBorderColor(): ApiColor;

    /**
     * Returns a type of the ApiComboBoxForm class.
     *
     * @since 9.0.4
     *
     * @example
     * ```js
     * // How do I check what class type a combo box form belongs to in a document?
     *
     * // Distinguish a combo box form from other form objects by reading its type label.
     *
     * let doc = Api.GetDocument();
     * let comboBoxForm = Api.CreateComboBoxForm({"key": "Personal information", "tip": "Choose your country", "required": true, "placeholder": "Country", "editable": false, "autoFit": false, "items": ["Latvia", "USA", "UK"]});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(comboBoxForm);
     * let classType = comboBoxForm.GetClassType();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Class type: " + classType);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiComboBoxForm/Methods/GetClassType/
     */
    GetClassType(): "comboBoxForm";

    /**
     * Returns the current form key.
     *
     * @example
     * ```js
     * // How do I get the key of a form field in a document?
     *
     * // Confirm the grouping key of a combo box by reading it back and displaying it.
     *
     * let doc = Api.GetDocument();
     * let comboBoxForm = Api.CreateComboBoxForm({"key": "Personal information", "tip": "Choose your country", "required": true, "placeholder": "Country", "editable": false, "autoFit": false, "items": ["Latvia", "USA", "UK"]});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(comboBoxForm);
     * let key = comboBoxForm.GetFormKey();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form key: " + key);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetFormKey/
     */
    GetFormKey(): string;

    /**
     * Returns a type of the current form.
     *
     * @example
     * ```js
     * // How do I get the type of a form field in a document?
     *
     * // Distinguish one form from another by printing its type identifier next to it.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let formType = textForm.GetFormType();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form type: " + formType);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetFormType/
     */
    GetFormType(): FormType;

    /**
     * Returns an internal id of the current form.
     *
     * @since 9.2.0
     *
     * @example
     * ```js
     * // How do I get the internal ID of a form field in a document?
     *
     * // Uniquely track a form by reading its auto-assigned internal identifier.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let internalId = textForm.GetInternalId();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Internal id: " + internalId);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetInternalId/
     */
    GetInternalId(): string;

    /**
     * Returns the list values from the current combo box.
     *
     * @example
     * ```js
     * // How do I read the list of selectable items from a combo box form in a document?
     *
     * // Print every available option to confirm the dropdown choices are set correctly.
     *
     * let doc = Api.GetDocument();
     * let comboBoxForm = Api.CreateComboBoxForm({"key": "Personal information", "tip": "Choose your country", "required": true, "placeholder": "Country", "editable": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(comboBoxForm);
     * comboBoxForm.SetListValues(["Latvia", "USA", "UK"]);
     * let listValues = comboBoxForm.GetListValues();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Combo box list values: ");
     * paragraph.AddLineBreak();
     * for (let i = 0; i < listValues.length; i++ ){
     * 	paragraph.AddText(listValues[i]);
     * 	paragraph.AddLineBreak();
     * }
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiComboBoxForm/Methods/GetListValues/
     */
    GetListValues(): string[];

    /**
     * Returns the lock state of the current form.
     *
     * @since 9.3.0
     *
     * @example
     * ```js
     * // How do I find out whether a form field is locked in a document?
     *
     * // Protect a form, then confirm the lock is active by reading the lock state.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetLock(true);
     * let locked = textForm.GetLock();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document is locked: " + locked);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetLock/
     */
    GetLock(): boolean;

    /**
     * Returns the parent element (a paragraph or an inline content control) that directly contains the
     * current form.
     *
     * @returns returns null if the form has no parent.
     * @since 10.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetParent/
     */
    GetParent(): ParagraphLikeContainer;

    /**
     * Returns the placeholder text from the current form.
     *
     * @since 9.1.0
     *
     * @example
     * ```js
     * // How do I get the placeholder text of a form field in a document?
     *
     * // Confirm a hint label by retrieving the placeholder text after setting it on a form.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetPlaceholderText("First name");
     * let placeholderText = textForm.GetPlaceholderText();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Placeholder text: " + placeholderText);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetPlaceholderText/
     */
    GetPlaceholderText(): string;

    /**
     * Returns the position (index) of the current form within its parent element.
     *
     * @returns returns -1 if the form has no parent.
     * @since 10.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetPosInParent/
     */
    GetPosInParent(): number;

    /**
     * Returns the role of the current form.
     *
     * @since 9.0.0
     *
     * @example
     * ```js
     * // How do I get the role of a form field in a document?
     *
     * // Assign a custom role to a form, then read it back to verify the assignment.
     *
     * const doc = Api.GetDocument();
     * let paragraph = doc.GetElement(0);
     *
     * const roles = doc.GetFormRoles();
     * const rolePr = { "color": "#ffefbf" };
     * roles.Add("MY_ROLE", rolePr);
     *
     * const textForm = Api.CreateTextForm({
     * 	"tip": "Enter your first name",
     * 	"required": true,
     * 	"placeholder": "First name",
     * 	"comb": true,
     * 	"maxCharacters": 10,
     * 	"cellWidth": 3,
     * 	"multiLine": false,
     * 	"autoFit": false
     * });
     * paragraph.AddElement(textForm);
     *
     * textForm.SetRole("MY_ROLE");
     * const role = textForm.GetRole();
     *
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form role: " + role);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetRole/
     */
    GetRole(): string;

    /**
     * Returns the tag attribute for the current form.
     *
     * @since 9.0.0
     *
     * @example
     * ```js
     * // How do I get the tag of a form field in a document?
     *
     * // Label a form with a custom tag, then retrieve it to confirm it was stored correctly.
     *
     * const doc = Api.GetDocument();
     * let paragraph = doc.GetElement(0);
     *
     * const textForm = Api.CreateTextForm({
     * 	"key": "Personal information",
     * 	"tip": "Enter your first name",
     * 	"required": true,
     * 	"placeholder": "First name",
     * 	"comb": true,
     * 	"maxCharacters": 10,
     * 	"cellWidth": 3,
     * 	"multiLine": false,
     * 	"autoFit": false
     * });
     * textForm.SetTag('MY_TAG');
     * paragraph.AddElement(textForm);
     *
     * const formTag = textForm.GetTag();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form tag: " + formTag);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetTag/
     */
    GetTag(): string;

    /**
     * Returns the text from the current form.
     *
     * @example
     * ```js
     * // How do I read the current value typed into a form in a document?
     *
     * // Extract the raw content of a filled-in text field to use or display elsewhere in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let text = textForm.GetText();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form text: " + text);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetText/
     */
    GetText(): string;

    /**
     * Returns the text properties from the current form.
     *
     * **Note:**
     * Used if possible for this type of form.
     *
     * @example
     * ```js
     * // How do I access the font and style settings of a form field in a document?
     *
     * // Retrieve the current text properties of a form so they can be adjusted and reapplied in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let textPr = Api.CreateTextPr();
     * textPr.SetFontSize(30);
     * textPr.SetBold(true);
     * textForm.SetTextPr(textPr);
     * let formTextPr = textForm.GetTextPr();
     * formTextPr.SetItalic(true);
     * textForm.SetTextPr(formTextPr);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetTextPr/
     */
    GetTextPr(): ApiTextPr;

    /**
     * Returns the tip text of the current form.
     *
     * @example
     * ```js
     * // How do I read the instructional hint shown when a user hovers over a form field in a document?
     *
     * // Display the tooltip message of a drop-down form to verify what guidance is shown to the user in a document.
     *
     * let doc = Api.GetDocument();
     * let comboBoxForm = Api.CreateComboBoxForm({"key": "Personal information", "tip": "Choose your country", "required": true, "placeholder": "Country", "editable": false, "autoFit": false, "items": ["Latvia", "USA", "UK"]});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(comboBoxForm);
     * let tipText = comboBoxForm.GetTipText();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form tip text: " + tipText);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetTipText/
     */
    GetTipText(): string;

    /**
     * Returns the current text value of the combo box form.
     *
     * @since 9.4.0
     *
     * @example
     * ```js
     * // The GetValue method returns the currently selected or entered text in the combo box.
     *
     * // Set list values and select one, then read it back and display it in the document.
     *
     * let doc = Api.GetDocument();
     * let comboBoxForm = Api.CreateComboBoxForm({"key": "Department", "tip": "Select your department", "required": true, "placeholder": "Department", "editable": false, "list": ["HR", "Engineering", "Marketing"]});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(comboBoxForm);
     * comboBoxForm.SetListValues(["HR", "Engineering", "Marketing"]);
     * comboBoxForm.SetValue("Engineering");
     * let value = comboBoxForm.GetValue();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Selected department: " + value);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiComboBoxForm/Methods/GetValue/
     */
    GetValue(): string;

    /**
     * Returns a shape in which the form is placed to control the position and size of the fixed size form
     * frame.
     *
     * The null value will be returned for the inline forms.
     *
     * @returns returns the shape in which the form is placed.
     *
     * @example
     * ```js
     * // How do I get the surrounding shape of a form field so I can adjust its border or position in a document?
     *
     * // Apply a custom outline to the wrapper shape of a form field to make it stand out visually in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.ToFixed(10 * 240, 2 * 240);
     * let shape = textForm.GetWrapperShape();
     * let stroke = Api.CreateStroke(36000, Api.CreateSolidFill(Api.RGB(255, 111, 61)));
     * shape.SetOutLine(stroke);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetWrapperShape/
     */
    GetWrapperShape(): ApiShape;

    /**
     * Checks if the combo box text can be edited.
     *
     * If it is not editable, then this form is a drop-down list.
     *
     * @example
     * ```js
     * // How do I check if a combo box form allows free-text input in a document?
     *
     * // Show whether a combo box restricts selection to preset options or permits manual entry in a document.
     *
     * let doc = Api.GetDocument();
     * let comboBoxForm = Api.CreateComboBoxForm({"key": "Personal information", "tip": "Choose your country", "required": true, "placeholder": "Country", "editable": false, "autoFit": false, "items": ["Latvia", "USA", "UK"]});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(comboBoxForm);
     * let editable = comboBoxForm.IsEditable();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first combo box from this document is editable: " + editable);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiComboBoxForm/Methods/IsEditable/
     */
    IsEditable(): boolean;

    /**
     * Checks if the current form is filled.
     *
     * @since 9.4.0
     *
     * @example
     * ```js
     * // How do I tell if a form field has been filled out in a document?
     *
     * // Verify the fill status of multiple form fields to determine which ones still need input in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm1 = Api.CreateTextForm({"key": "Name1", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": false, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm1);
     * let textForm2 = Api.CreateTextForm({"key": "Name2", "tip": "Enter your last name", "required": true, "placeholder": "Last name", "comb": false, "multiLine": false, "autoFit": false});
     * paragraph.AddElement(textForm2);
     * textForm2.SetText("Smith");
     * let filled1 = textForm1.IsFilled();
     * let filled2 = textForm2.IsFilled();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first text form is filled: " + filled1);
     * doc.Push(paragraph);
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The second text form is filled: " + filled2);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/IsFilled/
     */
    IsFilled(): boolean;

    /**
     * Checks if the current form is fixed size.
     *
     * @example
     * ```js
     * // How do I find out if a form field is locked to a specific size in a document?
     *
     * // Confirm the fixed-size status of a form field before deciding whether layout adjustments are needed in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.ToFixed(10 * 240, 2 * 240);
     * let fixed = textForm.IsFixed();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document is fixed: " + fixed);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/IsFixed/
     */
    IsFixed(): boolean;

    /**
     * Checks if the current form is required.
     *
     * @example
     * ```js
     * // How do I check if a form field must be filled out before the document is submitted in a document?
     *
     * // Confirm whether a form field is required so the result can be shown to the reader in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let required = textForm.IsRequired();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document is required: " + required);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/IsRequired/
     */
    IsRequired(): boolean;

    /**
     * Places a cursor before/after the current form.
     *
     * @param isAfter - Specifies whether a cursor will be placed before (false) or after (true) the current form.
     * @default isAfter = true
     * @since 8.1.0
     *
     * @example
     * ```js
     * // How do I place the cursor right after a form field to continue typing in a document?
     *
     * // Shift focus out of a completed form field so the next input lands in the surrounding text in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetText("The cursor will be placed after the current form.");
     * textForm.MoveCursorOutside(true);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/MoveCursorOutside/
     */
    MoveCursorOutside(isAfter?: boolean): boolean;

    /**
     * Selects the specified value from the combo box list values.
     *
     * @param sValue - The combo box list value that will be selected.
     *
     * @example
     * ```js
     * // How do I programmatically pick an option from a combo box list in a document?
     *
     * // Pre-fill a combo box with a known answer to set the default selection in a document.
     *
     * let doc = Api.GetDocument();
     * let comboBoxForm = Api.CreateComboBoxForm({"key": "Personal information", "tip": "Choose your country", "required": true, "placeholder": "Country", "editable": false, "autoFit": false, "items": ["Latvia", "USA", "UK"]});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(comboBoxForm);
     * comboBoxForm.SelectListValue("USA");
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiComboBoxForm/Methods/SelectListValue/
     */
    SelectListValue(sValue: string): boolean;

    /**
     * Sets the background color to the current form.
     *
     * @param color - The background color.
     * @since 9.1.0
     *
     * @example
     * ```js
     * // How do I fill a form field with a specific background color in a document?
     *
     * // Color the background of a form field to make it visually distinct from surrounding text in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetBackgroundColor(Api.HexColor('#FF6F3D'));
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetBackgroundColor/
     */
    SetBackgroundColor(color?: ApiColor): boolean;

    /**
     * Sets the border color to the current form.
     *
     * @param color - The border color.
     * @since 9.1.0
     *
     * @example
     * ```js
     * // How do I change the border color of a form field in a document?
     *
     * // Style the outline of a form field with a specific color to draw attention to it in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetBorderColor(Api.HexColor('#FF6F3D'));
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetBorderColor/
     */
    SetBorderColor(color?: ApiColor): boolean;

    /**
     * Sets a key to the current form.
     *
     * @param sKey - Form key.
     *
     * @example
     * ```js
     * // How do I set the key that identifies a form field in a document?
     *
     * // Label a form field with a custom key so it can be referenced or grouped with related fields in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetFormKey("Personal information");
     * let key = textForm.GetFormKey();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form key: " + key);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetFormKey/
     */
    SetFormKey(sKey: string): boolean;

    /**
     * Sets the list values to the current combo box.
     *
     * @param aListString - The combo box list values.
     *
     * @example
     * ```js
     * // How do I define the drop-down choices available in a combo box form in a document?
     *
     * // Supply a set of predefined values to a combo box so users can pick from a list in a document.
     *
     * let doc = Api.GetDocument();
     * let comboBoxForm = Api.CreateComboBoxForm({"key": "Personal information", "tip": "Choose your country", "required": true, "placeholder": "Country", "editable": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(comboBoxForm);
     * comboBoxForm.SetListValues(["Latvia", "USA", "UK"]);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiComboBoxForm/Methods/SetListValues/
     */
    SetListValues(aListString: string[]): boolean;

    /**
     * Sets the lock state of the current form.
     *
     * @param isLock - Specifies whether to lock the form (true) or unlock it (false).
     * @returns Returns true if the operation is successful.
     * @since 9.3.0
     *
     * @example
     * ```js
     * // How do I lock a form field so it cannot be changed in a document?
     *
     * // Protect specific fields from modification while keeping others editable.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetLock(true);
     * let locked = textForm.GetLock();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document is locked: " + locked);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetLock/
     */
    SetLock(isLock: boolean): boolean;

    /**
     * Sets the placeholder text to the current form.
     *
     * **Note:**
     * The placeholder text can't be set for checkbox or radio button forms.
     *
     * @param sText - The text that will be set to the current form.
     *
     * @example
     * ```js
     * // How do I add hint text inside an empty form field in a document?
     *
     * // Display a prompt inside a field before the user fills it in.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetPlaceholderText("First name");
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetPlaceholderText/
     */
    SetPlaceholderText(sText: string): boolean;

    /**
     * Specifies if the current form should be required.
     *
     * @param bRequired - Defines if the current form is required (true) or not (false).
     *
     * @example
     * ```js
     * // How do I make a form field mandatory in a document?
     *
     * // Ensure a field must be filled before the document form is submitted.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetRequired(true);
     * let required = textForm.IsRequired();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document is required: " + required);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetRequired/
     */
    SetRequired(bRequired: boolean): boolean;

    /**
     * Sets the role to the current form.
     *
     * @param role - The role which will be attached to the current form.
     * @since 9.0.0
     *
     * @example
     * ```js
     * // How do I associate a form field with a specific role in a document?
     *
     * // Restrict which signers or participants are responsible for a given field.
     *
     * const doc = Api.GetDocument();
     * let paragraph = doc.GetElement(0);
     *
     * const roles = doc.GetFormRoles();
     * const rolePr = { "color": "#ffefbf" };
     * roles.Add("MY_ROLE", rolePr);
     *
     * const textForm = Api.CreateTextForm({
     * 	"tip": "Enter your first name",
     * 	"required": true,
     * 	"placeholder": "First name",
     * 	"comb": true,
     * 	"maxCharacters": 10,
     * 	"cellWidth": 3,
     * 	"multiLine": false,
     * 	"autoFit": false
     * });
     * paragraph.AddElement(textForm);
     *
     * textForm.SetRole("MY_ROLE");
     * const role = textForm.GetRole();
     *
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form role: " + role);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetRole/
     */
    SetRole(role: string): boolean;

    /**
     * Sets the tag attribute to the current form.
     *
     * @param tag - The tag which will be added to the current container.
     * @since 9.0.0
     *
     * @example
     * ```js
     * // How do I attach a label or identifier to a form field in a document?
     *
     * // Organize or reference form fields programmatically using custom tags.
     *
     * const doc = Api.GetDocument();
     * let paragraph = doc.GetElement(0);
     *
     * const textForm = Api.CreateTextForm({
     * 	"key": "Personal information",
     * 	"tip": "Enter your first name",
     * 	"required": true,
     * 	"placeholder": "First name",
     * 	"comb": true,
     * 	"maxCharacters": 10,
     * 	"cellWidth": 3,
     * 	"multiLine": false,
     * 	"autoFit": false
     * });
     * textForm.SetTag('MY_TAG');
     * paragraph.AddElement(textForm);
     *
     * const formTag = textForm.GetTag();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form tag: " + formTag);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetTag/
     */
    SetTag(tag: string): boolean;

    /**
     * Sets the text to the current combo box.
     *
     * **Note:**
     * Available only for editable combo box forms.
     *
     * @param sText - The combo box text.
     *
     * @example
     * ```js
     * // How do I set the text value of a combo box form in a document?
     *
     * // Pre-fill a combo box with a custom entry that is not in the predefined list in a document.
     *
     * let doc = Api.GetDocument();
     * let comboBoxForm = Api.CreateComboBoxForm({"key": "Personal information", "tip": "Choose your country", "required": true, "placeholder": "Country", "editable": true, "autoFit": false, "items": ["Latvia", "USA", "UK"]});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(comboBoxForm);
     * comboBoxForm.SetText("France");
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiComboBoxForm/Methods/SetText/
     */
    SetText(sText: string): boolean;

    /**
     * Sets the text properties to the current form.
     *
     * **Note:**
     * Used if possible for this type of form.
     *
     * @param textPr - The text properties that will be set to the current form.
     *
     * @example
     * ```js
     * // How do I change the font size and style of text inside a form field in a document?
     *
     * // Make form field text bold and larger to improve readability.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let textPr = Api.CreateTextPr();
     * textPr.SetFontSize(30);
     * textPr.SetBold(true);
     * textForm.SetTextPr(textPr);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetTextPr/
     */
    SetTextPr(textPr: ApiTextPr): boolean;

    /**
     * Sets the tip text to the current form.
     *
     * @param sText - Tip text.
     *
     * @example
     * ```js
     * // How do I add a tooltip that appears when hovering over a form field in a document?
     *
     * // Give users helpful instructions that appear when they hover over a field.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetTipText("Enter your first name");
     * let tipText = textForm.GetTipText();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Tip text: " + tipText);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetTipText/
     */
    SetTipText(sText: string): boolean;

    /**
     * Sets the value of the combo box form.
     *
     * Selects a list item if the value matches one,
     * otherwise sets it as free text (only for editable combo boxes).
     *
     * @param value - The value to set.
     * @since 9.4.0
     *
     * @example
     * ```js
     * // SetValue selects a list item when the value matches; for editable combo boxes it also accepts free text.
     *
     * // Create a combo box form with a list, then set its value to one of the list items.
     *
     * let doc = Api.GetDocument();
     * let comboBoxForm = Api.CreateComboBoxForm({"key": "Department", "tip": "Select your department", "required": true, "placeholder": "Department", "editable": false, "list": ["HR", "Engineering", "Marketing"]});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(comboBoxForm);
     * comboBoxForm.SetListValues(["HR", "Engineering", "Marketing"]);
     * comboBoxForm.SetValue("Engineering");
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiComboBoxForm/Methods/SetValue/
     */
    SetValue(value: string): boolean;

    /**
     * Converts the current form to a fixed size form.
     *
     * @param width - The wrapper shape width measured in twentieths of a point (1/1440 of an inch).
     * @param height - The wrapper shape height measured in twentieths of a point (1/1440 of an inch).
     * @param keepPosition - Save position on the page (it can be a little bit slow, because it runs the document
     *   calculation).
     *
     * @example
     * ```js
     * // How do I set a specific width and height for a form field in a document?
     *
     * // Lock a form's dimensions so layout does not shift when content changes.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.ToFixed(10 * 240, 2 * 240);
     * let fixed = textForm.IsFixed();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document has a fixed size: " + fixed);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/ToFixed/
     */
    ToFixed(width: twips, height: twips, keepPosition?: boolean): boolean;

    /**
     * Converts the current form to an inline form.
     *
     * **Note:**
     * A picture form can't be converted to an inline form, as it's always a fixed-size object.
     *
     * @example
     * ```js
     * // How do I switch a form field from fixed size to inline positioning in a document?
     *
     * // Allow a form field to flow with surrounding text instead of occupying a fixed block.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.ToFixed(10 * 240, 2 * 240);
     * let copyForm = textForm.Copy();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddElement(copyForm);
     * doc.Push(paragraph);
     * copyForm.ToInline();
     * let fixed = textForm.IsFixed();
     * let fixedCopy = copyForm.IsFixed();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document has a fixed size: " + fixed);
     * paragraph.AddLineBreak();
     * paragraph.AddText("The second form from this document has a fixed size: " + fixedCopy);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/ToInline/
     */
    ToInline(): boolean;
  }

  /** Class representing a comment. */
  export interface ApiComment {
  }

  /** Class representing a comment reply. */
  export interface ApiCommentReply {
  }

  /**
   * Class representing a complex field.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiComplexForm/
   */
  export interface ApiComplexForm extends Omit<ApiFormBase, "GetValue"> {
    /**
     * Appends the text content of the given form to the end of the current complex form.
     *
     * @param value - The text or the form to add.
     * @since 9.0.0
     *
     * @example
     * ```js
     * // How do I add form fields and static text to a complex form in a document?
     *
     * // Build a multi-part entry field by combining a text input and a suffix label inside one form.
     *
     * let doc = Api.GetDocument();
     * let complexForm = Api.CreateComplexForm({"key": "Email", "tip": "Email", "placeholder": "Start to fill complex form"});
     * complexForm.Add(Api.CreateTextForm());
     * complexForm.Add("@onlyoffice.com");
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(complexForm);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiComplexForm/Methods/Add/
     */
    Add(value: string | ApiDateForm | ApiPictureForm | ApiCheckBoxForm | ApiComboBoxForm | ApiTextForm): boolean;

    /**
     * Clears the current form.
     *
     * @example
     * ```js
     * // How do I clear the content of a form in a document?
     *
     * // Reset a filled-in form field to blank so it is ready for new input in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetText("John Smith");
     * textForm.Clear();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document was cleared.");
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/Clear/
     */
    Clear(): boolean;

    /**
     * Clears all content from the current complex form, resetting it to its placeholder state.
     *
     * @since 9.0.0
     *
     * @example
     * ```js
     * // How do I clear the content inside a complex form in a document?
     *
     * // Wipe user-entered values from a complex form without removing the form structure itself.
     *
     * let doc = Api.GetDocument()
     * let complexForm = Api.CreateComplexForm({"key": "Complex1"});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(complexForm);
     * complexForm.Add(Api.CreateCheckBoxForm());
     * complexForm.Add("Text");
     * complexForm.ClearContent();
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiComplexForm/Methods/ClearContent/
     */
    ClearContent(): boolean;

    /**
     * Copies the current form (copies with the shape if it exists).
     *
     * @example
     * ```js
     * // How do I copy a form field in a document?
     *
     * // Reuse an existing form by placing an identical copy elsewhere on the same paragraph.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let copyTextForm = textForm.Copy();
     * paragraph.AddLineBreak();
     * paragraph.AddElement(copyTextForm);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/Copy/
     */
    Copy(): ApiForm;

    /**
     * Removes a form and its content.
     *
     * If keepContent is true, the content is not deleted.
     *
     * @param keepContent - Specifies if the content will be deleted or not.
     * @returns returns false if form wasn't added to the document.
     * @since 9.2.0
     *
     * @example
     * ```js
     * // How do I delete a form field in a document?
     *
     * // Clean up a document by removing one of several inserted checkbox forms.
     *
     * const doc = Api.GetDocument();
     * const checkBoxForm = Api.CreateCheckBoxForm({
     * 	'key': 'Marital status',
     * 	'tip': 'Specify your marital status',
     * 	'placeholder': 'Marital status',
     * 	'radio': true
     * });
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(checkBoxForm);
     * paragraph.AddText(' Married');
     * let copyCheckBoxForm = checkBoxForm.Copy();
     * paragraph.AddLineBreak();
     * paragraph.AddElement(copyCheckBoxForm);
     * paragraph.AddText(' Single');
     * checkBoxForm.Delete();
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/Delete/
     */
    Delete(keepContent?: boolean): boolean;

    /**
     * Returns the background color of the current form.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetBackgroundColor/
     */
    GetBackgroundColor(): ApiColor;

    /**
     * Returns the border color of the current form.
     *
     * @since 9.1.0
     *
     * @example
     * ```js
     * // How do I get the border color of a form field in a document?
     *
     * // Verify a custom border color by reading its RGB values back after applying it.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetBorderColor(Api.RGB(255, 111, 61));
     * let borderColor = textForm.GetBorderColor();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Border color (RGB): (" + borderColor.r + ", " + borderColor.g + ", " + borderColor.b + ")");
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetBorderColor/
     */
    GetBorderColor(): ApiColor;

    /**
     * Returns a type of the ApiComplexForm class.
     *
     * @since 9.0.4
     *
     * @example
     * ```js
     * // How do I get the class type of a complex form in a document?
     *
     * // Identify what kind of object a complex form is by reading its type label at runtime.
     *
     * let doc = Api.GetDocument();
     * let complexForm = Api.CreateComplexForm();
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(complexForm);
     * let classType = complexForm.GetClassType();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Class type: " + classType);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiComplexForm/Methods/GetClassType/
     */
    GetClassType(): "form";

    /**
     * Returns the current form key.
     *
     * @example
     * ```js
     * // How do I get the key of a form field in a document?
     *
     * // Confirm the grouping key of a combo box by reading it back and displaying it.
     *
     * let doc = Api.GetDocument();
     * let comboBoxForm = Api.CreateComboBoxForm({"key": "Personal information", "tip": "Choose your country", "required": true, "placeholder": "Country", "editable": false, "autoFit": false, "items": ["Latvia", "USA", "UK"]});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(comboBoxForm);
     * let key = comboBoxForm.GetFormKey();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form key: " + key);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetFormKey/
     */
    GetFormKey(): string;

    /**
     * Returns a type of the current form.
     *
     * @example
     * ```js
     * // How do I get the type of a form field in a document?
     *
     * // Distinguish one form from another by printing its type identifier next to it.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let formType = textForm.GetFormType();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form type: " + formType);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetFormType/
     */
    GetFormType(): FormType;

    /**
     * Returns an internal id of the current form.
     *
     * @since 9.2.0
     *
     * @example
     * ```js
     * // How do I get the internal ID of a form field in a document?
     *
     * // Uniquely track a form by reading its auto-assigned internal identifier.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let internalId = textForm.GetInternalId();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Internal id: " + internalId);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetInternalId/
     */
    GetInternalId(): string;

    /**
     * Returns the lock state of the current form.
     *
     * @since 9.3.0
     *
     * @example
     * ```js
     * // How do I find out whether a form field is locked in a document?
     *
     * // Protect a form, then confirm the lock is active by reading the lock state.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetLock(true);
     * let locked = textForm.GetLock();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document is locked: " + locked);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetLock/
     */
    GetLock(): boolean;

    /**
     * Returns the parent element (a paragraph or an inline content control) that directly contains the
     * current form.
     *
     * @returns returns null if the form has no parent.
     * @since 10.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetParent/
     */
    GetParent(): ParagraphLikeContainer;

    /**
     * Returns the placeholder text from the current form.
     *
     * @since 9.1.0
     *
     * @example
     * ```js
     * // How do I get the placeholder text of a form field in a document?
     *
     * // Confirm a hint label by retrieving the placeholder text after setting it on a form.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetPlaceholderText("First name");
     * let placeholderText = textForm.GetPlaceholderText();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Placeholder text: " + placeholderText);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetPlaceholderText/
     */
    GetPlaceholderText(): string;

    /**
     * Returns the position (index) of the current form within its parent element.
     *
     * @returns returns -1 if the form has no parent.
     * @since 10.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetPosInParent/
     */
    GetPosInParent(): number;

    /**
     * Returns the role of the current form.
     *
     * @since 9.0.0
     *
     * @example
     * ```js
     * // How do I get the role of a form field in a document?
     *
     * // Assign a custom role to a form, then read it back to verify the assignment.
     *
     * const doc = Api.GetDocument();
     * let paragraph = doc.GetElement(0);
     *
     * const roles = doc.GetFormRoles();
     * const rolePr = { "color": "#ffefbf" };
     * roles.Add("MY_ROLE", rolePr);
     *
     * const textForm = Api.CreateTextForm({
     * 	"tip": "Enter your first name",
     * 	"required": true,
     * 	"placeholder": "First name",
     * 	"comb": true,
     * 	"maxCharacters": 10,
     * 	"cellWidth": 3,
     * 	"multiLine": false,
     * 	"autoFit": false
     * });
     * paragraph.AddElement(textForm);
     *
     * textForm.SetRole("MY_ROLE");
     * const role = textForm.GetRole();
     *
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form role: " + role);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetRole/
     */
    GetRole(): string;

    /**
     * Returns an ordered list of subforms.
     *
     * @since 9.0.0
     *
     * @example
     * ```js
     * // How do I access each individual sub-form inside a complex form in a document?
     *
     * // Count or iterate over the sub-forms of a complex form to process them separately in a document.
     *
     * let doc = Api.GetDocument();
     * let complexForm = Api.CreateComplexForm({"key": "Email", "tip": "Email", "placeholder": "Start to fill complex form"});
     * complexForm.Add(Api.CreateTextForm({"placeholder" : "username"}));
     * complexForm.Add("@");
     * let comboBox = Api.CreateComboBoxForm({"editable" : false, "placeholder" : "mail.com"});
     * comboBox.SetListValues(["onlyoffice.com", "gmail.com", "hotmail.com"]);
     * complexForm.Add(comboBox);
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(complexForm);
     * paragraph.AddLineBreak();
     * let subForms = complexForm.GetSubForms();
     * paragraph.AddText("Number of subforms: " + subForms.length);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiComplexForm/Methods/GetSubForms/
     */
    GetSubForms(): ApiForm[];

    /**
     * Returns the tag attribute for the current form.
     *
     * @since 9.0.0
     *
     * @example
     * ```js
     * // How do I get the tag of a form field in a document?
     *
     * // Label a form with a custom tag, then retrieve it to confirm it was stored correctly.
     *
     * const doc = Api.GetDocument();
     * let paragraph = doc.GetElement(0);
     *
     * const textForm = Api.CreateTextForm({
     * 	"key": "Personal information",
     * 	"tip": "Enter your first name",
     * 	"required": true,
     * 	"placeholder": "First name",
     * 	"comb": true,
     * 	"maxCharacters": 10,
     * 	"cellWidth": 3,
     * 	"multiLine": false,
     * 	"autoFit": false
     * });
     * textForm.SetTag('MY_TAG');
     * paragraph.AddElement(textForm);
     *
     * const formTag = textForm.GetTag();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form tag: " + formTag);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetTag/
     */
    GetTag(): string;

    /**
     * Returns the text from the current form.
     *
     * @example
     * ```js
     * // How do I read the current value typed into a form in a document?
     *
     * // Extract the raw content of a filled-in text field to use or display elsewhere in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let text = textForm.GetText();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form text: " + text);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetText/
     */
    GetText(): string;

    /**
     * Returns the text properties from the current form.
     *
     * **Note:**
     * Used if possible for this type of form.
     *
     * @example
     * ```js
     * // How do I access the font and style settings of a form field in a document?
     *
     * // Retrieve the current text properties of a form so they can be adjusted and reapplied in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let textPr = Api.CreateTextPr();
     * textPr.SetFontSize(30);
     * textPr.SetBold(true);
     * textForm.SetTextPr(textPr);
     * let formTextPr = textForm.GetTextPr();
     * formTextPr.SetItalic(true);
     * textForm.SetTextPr(formTextPr);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetTextPr/
     */
    GetTextPr(): ApiTextPr;

    /**
     * Returns the tip text of the current form.
     *
     * @example
     * ```js
     * // How do I read the instructional hint shown when a user hovers over a form field in a document?
     *
     * // Display the tooltip message of a drop-down form to verify what guidance is shown to the user in a document.
     *
     * let doc = Api.GetDocument();
     * let comboBoxForm = Api.CreateComboBoxForm({"key": "Personal information", "tip": "Choose your country", "required": true, "placeholder": "Country", "editable": false, "autoFit": false, "items": ["Latvia", "USA", "UK"]});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(comboBoxForm);
     * let tipText = comboBoxForm.GetTipText();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form tip text: " + tipText);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetTipText/
     */
    GetTipText(): string;

    /**
     * Returns the current text value of the complex form.
     *
     * @since 9.4.0
     *
     * @example
     * ```js
     * // The GetValue method concatenates the text of all sub-forms and text nodes inside the complex form.
     *
     * // Build a complex form with a text sub-form and a string suffix, then read the combined value.
     *
     * let doc = Api.GetDocument();
     * let complexForm = Api.CreateComplexForm({"key": "Email", "tip": "Email", "placeholder": "Enter your email"});
     * let textForm = Api.CreateTextForm({"key": "Username"});
     * complexForm.Add(textForm);
     * complexForm.Add("@example.com");
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(complexForm);
     * textForm.SetText("john.doe");
     * let value = complexForm.GetValue();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Complex form value: " + value);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiComplexForm/Methods/GetValue/
     */
    GetValue(): string;

    /**
     * Returns a shape in which the form is placed to control the position and size of the fixed size form
     * frame.
     *
     * The null value will be returned for the inline forms.
     *
     * @returns returns the shape in which the form is placed.
     *
     * @example
     * ```js
     * // How do I get the surrounding shape of a form field so I can adjust its border or position in a document?
     *
     * // Apply a custom outline to the wrapper shape of a form field to make it stand out visually in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.ToFixed(10 * 240, 2 * 240);
     * let shape = textForm.GetWrapperShape();
     * let stroke = Api.CreateStroke(36000, Api.CreateSolidFill(Api.RGB(255, 111, 61)));
     * shape.SetOutLine(stroke);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetWrapperShape/
     */
    GetWrapperShape(): ApiShape;

    /**
     * Checks if the current form is filled.
     *
     * @since 9.4.0
     *
     * @example
     * ```js
     * // How do I tell if a form field has been filled out in a document?
     *
     * // Verify the fill status of multiple form fields to determine which ones still need input in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm1 = Api.CreateTextForm({"key": "Name1", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": false, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm1);
     * let textForm2 = Api.CreateTextForm({"key": "Name2", "tip": "Enter your last name", "required": true, "placeholder": "Last name", "comb": false, "multiLine": false, "autoFit": false});
     * paragraph.AddElement(textForm2);
     * textForm2.SetText("Smith");
     * let filled1 = textForm1.IsFilled();
     * let filled2 = textForm2.IsFilled();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first text form is filled: " + filled1);
     * doc.Push(paragraph);
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The second text form is filled: " + filled2);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/IsFilled/
     */
    IsFilled(): boolean;

    /**
     * Checks if the current form is fixed size.
     *
     * @example
     * ```js
     * // How do I find out if a form field is locked to a specific size in a document?
     *
     * // Confirm the fixed-size status of a form field before deciding whether layout adjustments are needed in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.ToFixed(10 * 240, 2 * 240);
     * let fixed = textForm.IsFixed();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document is fixed: " + fixed);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/IsFixed/
     */
    IsFixed(): boolean;

    /**
     * Checks if the current form is required.
     *
     * @example
     * ```js
     * // How do I check if a form field must be filled out before the document is submitted in a document?
     *
     * // Confirm whether a form field is required so the result can be shown to the reader in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let required = textForm.IsRequired();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document is required: " + required);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/IsRequired/
     */
    IsRequired(): boolean;

    /**
     * Places a cursor before/after the current form.
     *
     * @param isAfter - Specifies whether a cursor will be placed before (false) or after (true) the current form.
     * @default isAfter = true
     * @since 8.1.0
     *
     * @example
     * ```js
     * // How do I place the cursor right after a form field to continue typing in a document?
     *
     * // Shift focus out of a completed form field so the next input lands in the surrounding text in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetText("The cursor will be placed after the current form.");
     * textForm.MoveCursorOutside(true);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/MoveCursorOutside/
     */
    MoveCursorOutside(isAfter?: boolean): boolean;

    /**
     * Sets the background color to the current form.
     *
     * @param color - The background color.
     * @since 9.1.0
     *
     * @example
     * ```js
     * // How do I fill a form field with a specific background color in a document?
     *
     * // Color the background of a form field to make it visually distinct from surrounding text in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetBackgroundColor(Api.HexColor('#FF6F3D'));
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetBackgroundColor/
     */
    SetBackgroundColor(color?: ApiColor): boolean;

    /**
     * Sets the border color to the current form.
     *
     * @param color - The border color.
     * @since 9.1.0
     *
     * @example
     * ```js
     * // How do I change the border color of a form field in a document?
     *
     * // Style the outline of a form field with a specific color to draw attention to it in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetBorderColor(Api.HexColor('#FF6F3D'));
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetBorderColor/
     */
    SetBorderColor(color?: ApiColor): boolean;

    /**
     * Sets a key to the current form.
     *
     * @param sKey - Form key.
     *
     * @example
     * ```js
     * // How do I set the key that identifies a form field in a document?
     *
     * // Label a form field with a custom key so it can be referenced or grouped with related fields in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetFormKey("Personal information");
     * let key = textForm.GetFormKey();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form key: " + key);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetFormKey/
     */
    SetFormKey(sKey: string): boolean;

    /**
     * Sets the lock state of the current form.
     *
     * @param isLock - Specifies whether to lock the form (true) or unlock it (false).
     * @returns Returns true if the operation is successful.
     * @since 9.3.0
     *
     * @example
     * ```js
     * // How do I lock a form field so it cannot be changed in a document?
     *
     * // Protect specific fields from modification while keeping others editable.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetLock(true);
     * let locked = textForm.GetLock();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document is locked: " + locked);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetLock/
     */
    SetLock(isLock: boolean): boolean;

    /**
     * Sets the placeholder text to the current form.
     *
     * **Note:**
     * The placeholder text can't be set for checkbox or radio button forms.
     *
     * @param sText - The text that will be set to the current form.
     *
     * @example
     * ```js
     * // How do I add hint text inside an empty form field in a document?
     *
     * // Display a prompt inside a field before the user fills it in.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetPlaceholderText("First name");
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetPlaceholderText/
     */
    SetPlaceholderText(sText: string): boolean;

    /**
     * Specifies if the current form should be required.
     *
     * @param bRequired - Defines if the current form is required (true) or not (false).
     *
     * @example
     * ```js
     * // How do I make a form field mandatory in a document?
     *
     * // Ensure a field must be filled before the document form is submitted.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetRequired(true);
     * let required = textForm.IsRequired();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document is required: " + required);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetRequired/
     */
    SetRequired(bRequired: boolean): boolean;

    /**
     * Sets the role to the current form.
     *
     * @param role - The role which will be attached to the current form.
     * @since 9.0.0
     *
     * @example
     * ```js
     * // How do I associate a form field with a specific role in a document?
     *
     * // Restrict which signers or participants are responsible for a given field.
     *
     * const doc = Api.GetDocument();
     * let paragraph = doc.GetElement(0);
     *
     * const roles = doc.GetFormRoles();
     * const rolePr = { "color": "#ffefbf" };
     * roles.Add("MY_ROLE", rolePr);
     *
     * const textForm = Api.CreateTextForm({
     * 	"tip": "Enter your first name",
     * 	"required": true,
     * 	"placeholder": "First name",
     * 	"comb": true,
     * 	"maxCharacters": 10,
     * 	"cellWidth": 3,
     * 	"multiLine": false,
     * 	"autoFit": false
     * });
     * paragraph.AddElement(textForm);
     *
     * textForm.SetRole("MY_ROLE");
     * const role = textForm.GetRole();
     *
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form role: " + role);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetRole/
     */
    SetRole(role: string): boolean;

    /**
     * Sets the tag attribute to the current form.
     *
     * @param tag - The tag which will be added to the current container.
     * @since 9.0.0
     *
     * @example
     * ```js
     * // How do I attach a label or identifier to a form field in a document?
     *
     * // Organize or reference form fields programmatically using custom tags.
     *
     * const doc = Api.GetDocument();
     * let paragraph = doc.GetElement(0);
     *
     * const textForm = Api.CreateTextForm({
     * 	"key": "Personal information",
     * 	"tip": "Enter your first name",
     * 	"required": true,
     * 	"placeholder": "First name",
     * 	"comb": true,
     * 	"maxCharacters": 10,
     * 	"cellWidth": 3,
     * 	"multiLine": false,
     * 	"autoFit": false
     * });
     * textForm.SetTag('MY_TAG');
     * paragraph.AddElement(textForm);
     *
     * const formTag = textForm.GetTag();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form tag: " + formTag);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetTag/
     */
    SetTag(tag: string): boolean;

    /**
     * Sets the text properties to the current form.
     *
     * **Note:**
     * Used if possible for this type of form.
     *
     * @param textPr - The text properties that will be set to the current form.
     *
     * @example
     * ```js
     * // How do I change the font size and style of text inside a form field in a document?
     *
     * // Make form field text bold and larger to improve readability.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let textPr = Api.CreateTextPr();
     * textPr.SetFontSize(30);
     * textPr.SetBold(true);
     * textForm.SetTextPr(textPr);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetTextPr/
     */
    SetTextPr(textPr: ApiTextPr): boolean;

    /**
     * Sets the tip text to the current form.
     *
     * @param sText - Tip text.
     *
     * @example
     * ```js
     * // How do I add a tooltip that appears when hovering over a form field in a document?
     *
     * // Give users helpful instructions that appear when they hover over a field.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetTipText("Enter your first name");
     * let tipText = textForm.GetTipText();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Tip text: " + tipText);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetTipText/
     */
    SetTipText(sText: string): boolean;

    /**
     * Sets the value of the form field.
     *
     * @param value - The value to set.
     * @since 9.4.0
     *
     * @example
     * ```js
     * // The SetValue method provides a type-agnostic way to set form values across all form types.
     *
     * // Set the form value and add the form to a document paragraph.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Name", "tip": "Enter your name", "required": true, "placeholder": "Your name"});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetValue("Jane Doe");
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetValue/
     */
    SetValue(value: string | boolean): boolean;

    /**
     * Converts the current form to a fixed size form.
     *
     * @param width - The wrapper shape width measured in twentieths of a point (1/1440 of an inch).
     * @param height - The wrapper shape height measured in twentieths of a point (1/1440 of an inch).
     * @param keepPosition - Save position on the page (it can be a little bit slow, because it runs the document
     *   calculation).
     *
     * @example
     * ```js
     * // How do I set a specific width and height for a form field in a document?
     *
     * // Lock a form's dimensions so layout does not shift when content changes.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.ToFixed(10 * 240, 2 * 240);
     * let fixed = textForm.IsFixed();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document has a fixed size: " + fixed);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/ToFixed/
     */
    ToFixed(width: twips, height: twips, keepPosition?: boolean): boolean;

    /**
     * Converts the current form to an inline form.
     *
     * **Note:**
     * A picture form can't be converted to an inline form, as it's always a fixed-size object.
     *
     * @example
     * ```js
     * // How do I switch a form field from fixed size to inline positioning in a document?
     *
     * // Allow a form field to flow with surrounding text instead of occupying a fixed block.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.ToFixed(10 * 240, 2 * 240);
     * let copyForm = textForm.Copy();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddElement(copyForm);
     * doc.Push(paragraph);
     * copyForm.ToInline();
     * let fixed = textForm.IsFixed();
     * let fixedCopy = copyForm.IsFixed();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document has a fixed size: " + fixed);
     * paragraph.AddLineBreak();
     * paragraph.AddText("The second form from this document has a fixed size: " + fixedCopy);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/ToInline/
     */
    ToInline(): boolean;
  }

  /** Class representing a list of values of the combo box / drop-down list content control. */
  export interface ApiContentControlList {
  }

  /** Class representing an entry of the combo box / drop-down list content control. */
  export interface ApiContentControlListEntry {
  }

  /** Class representing document properties (similar to BuiltInDocumentProperties in VBA). */
  export interface ApiCore {
  }

  /** Class representing custom properties of the document. */
  export interface ApiCustomProperties {
  }

  /**
   * Class representing a custom XML node.
   *
   * @since 9.0.0
   */
  export interface ApiCustomXmlNode {
  }

  /**
   * Class representing a custom XML part.
   *
   * @since 9.0.0
   */
  export interface ApiCustomXmlPart {
  }

  /**
   * Class representing a custom XML manager, which provides methods to manage custom XML parts in the
   * document.
   */
  export interface ApiCustomXmlParts {
  }

  /**
   * Class representing a document date field.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiDateForm/
   */
  export interface ApiDateForm extends Omit<ApiFormBase, "GetClassType" | "GetValue" | "SetValue"> {
    /**
     * Clears the current form.
     *
     * @example
     * ```js
     * // How do I clear the content of a form in a document?
     *
     * // Reset a filled-in form field to blank so it is ready for new input in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetText("John Smith");
     * textForm.Clear();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document was cleared.");
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/Clear/
     */
    Clear(): boolean;

    /**
     * Copies the current form (copies with the shape if it exists).
     *
     * @example
     * ```js
     * // How do I copy a form field in a document?
     *
     * // Reuse an existing form by placing an identical copy elsewhere on the same paragraph.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let copyTextForm = textForm.Copy();
     * paragraph.AddLineBreak();
     * paragraph.AddElement(copyTextForm);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/Copy/
     */
    Copy(): ApiForm;

    /**
     * Removes a form and its content.
     *
     * If keepContent is true, the content is not deleted.
     *
     * @param keepContent - Specifies if the content will be deleted or not.
     * @returns returns false if form wasn't added to the document.
     * @since 9.2.0
     *
     * @example
     * ```js
     * // How do I delete a form field in a document?
     *
     * // Clean up a document by removing one of several inserted checkbox forms.
     *
     * const doc = Api.GetDocument();
     * const checkBoxForm = Api.CreateCheckBoxForm({
     * 	'key': 'Marital status',
     * 	'tip': 'Specify your marital status',
     * 	'placeholder': 'Marital status',
     * 	'radio': true
     * });
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(checkBoxForm);
     * paragraph.AddText(' Married');
     * let copyCheckBoxForm = checkBoxForm.Copy();
     * paragraph.AddLineBreak();
     * paragraph.AddElement(copyCheckBoxForm);
     * paragraph.AddText(' Single');
     * checkBoxForm.Delete();
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/Delete/
     */
    Delete(keepContent?: boolean): boolean;

    /**
     * Returns the background color of the current form.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetBackgroundColor/
     */
    GetBackgroundColor(): ApiColor;

    /**
     * Returns the border color of the current form.
     *
     * @since 9.1.0
     *
     * @example
     * ```js
     * // How do I get the border color of a form field in a document?
     *
     * // Verify a custom border color by reading its RGB values back after applying it.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetBorderColor(Api.RGB(255, 111, 61));
     * let borderColor = textForm.GetBorderColor();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Border color (RGB): (" + borderColor.r + ", " + borderColor.g + ", " + borderColor.b + ")");
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetBorderColor/
     */
    GetBorderColor(): ApiColor;

    /**
     * Returns a type of the ApiDateForm class.
     *
     * @since 9.0.4
     *
     * @example
     * ```js
     * // How do I get the class type of a date form object in a document?
     *
     * // Confirm the object kind before applying type-specific logic to a date form in a document.
     *
     * let doc = Api.GetDocument();
     * let dateForm = Api.CreateDateForm({"key": "Nowadays", "tip": "Enter current date", "required": true, "placeholder": "Your date here", "format": "mm.dd.yyyy", "lang": "en-US"});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(dateForm);
     * let classType = dateForm.GetClassType();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Class type: " + classType);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiDateForm/Methods/GetClassType/
     */
    GetClassType(): "dateForm";

    /**
     * Returns the date of the current form.
     *
     * @returns The date object, or undefined if the form is a placeholder.
     * @since 9.0.0
     *
     * @example
     * ```js
     * // How do I read the current date from a date form in a document?
     *
     * // Display the date a user entered into a date form by fetching its stored value in a document.
     *
     * let doc = Api.GetDocument();
     * let dateForm = Api.CreateDateForm({"key": "Nowadays", "tip": "Enter current date", "required": true, "placeholder": "Your date here", "format": "mm.dd.yyyy", "lang": "en-US"});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(dateForm);
     * dateForm.SetDate(new Date());
     * let formDate = dateForm.GetDate();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first date form from this document has setted time: " + formDate.toString());
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiDateForm/Methods/GetDate/
     */
    GetDate(): undefined | Date;

    /**
     * Returns the current form key.
     *
     * @example
     * ```js
     * // How do I get the key of a form field in a document?
     *
     * // Confirm the grouping key of a combo box by reading it back and displaying it.
     *
     * let doc = Api.GetDocument();
     * let comboBoxForm = Api.CreateComboBoxForm({"key": "Personal information", "tip": "Choose your country", "required": true, "placeholder": "Country", "editable": false, "autoFit": false, "items": ["Latvia", "USA", "UK"]});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(comboBoxForm);
     * let key = comboBoxForm.GetFormKey();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form key: " + key);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetFormKey/
     */
    GetFormKey(): string;

    /**
     * Returns a type of the current form.
     *
     * @example
     * ```js
     * // How do I get the type of a form field in a document?
     *
     * // Distinguish one form from another by printing its type identifier next to it.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let formType = textForm.GetFormType();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form type: " + formType);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetFormType/
     */
    GetFormType(): FormType;

    /**
     * Gets the date format of the current form.
     *
     * @since 8.1.0
     *
     * @example
     * ```js
     * // How do I check which date format is applied to a date form in a document?
     *
     * // Confirm the format after changing it to make sure the update took effect.
     *
     * let doc = Api.GetDocument();
     * let dateForm = Api.CreateDateForm({"key": "Nowadays", "tip": "Enter current date", "required": true, "placeholder": "Your date here", "format": "mm.dd.yyyy", "lang": "en-US"});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(dateForm);
     * dateForm.SetFormat("dddd, dd MMMM yyyy");
     * let format = dateForm.GetFormat();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first date form from this document has format: " + format);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiDateForm/Methods/GetFormat/
     */
    GetFormat(): string;

    /**
     * Returns an internal id of the current form.
     *
     * @since 9.2.0
     *
     * @example
     * ```js
     * // How do I get the internal ID of a form field in a document?
     *
     * // Uniquely track a form by reading its auto-assigned internal identifier.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let internalId = textForm.GetInternalId();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Internal id: " + internalId);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetInternalId/
     */
    GetInternalId(): string;

    /**
     * Gets the used date language of the current form.
     *
     * @since 8.1.0
     *
     * @example
     * ```js
     * // How do I find out which language is set on a date form in a document?
     *
     * // Verify the locale after updating it to confirm the change was applied.
     *
     * let doc = Api.GetDocument();
     * let dateForm = Api.CreateDateForm({"key": "Nowadays", "tip": "Enter current date", "required": true, "placeholder": "Your date here", "format": "mm.dd.yyyy", "lang": "en-US"});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(dateForm);
     * dateForm.SetLanguage("en-CA");
     * let langId = dateForm.GetLanguage();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first date form from this document has setted language: " + langId);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiDateForm/Methods/GetLanguage/
     */
    GetLanguage(): string;

    /**
     * Returns the lock state of the current form.
     *
     * @since 9.3.0
     *
     * @example
     * ```js
     * // How do I find out whether a form field is locked in a document?
     *
     * // Protect a form, then confirm the lock is active by reading the lock state.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetLock(true);
     * let locked = textForm.GetLock();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document is locked: " + locked);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetLock/
     */
    GetLock(): boolean;

    /**
     * Returns the parent element (a paragraph or an inline content control) that directly contains the
     * current form.
     *
     * @returns returns null if the form has no parent.
     * @since 10.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetParent/
     */
    GetParent(): ParagraphLikeContainer;

    /**
     * Returns the placeholder text from the current form.
     *
     * @since 9.1.0
     *
     * @example
     * ```js
     * // How do I get the placeholder text of a form field in a document?
     *
     * // Confirm a hint label by retrieving the placeholder text after setting it on a form.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetPlaceholderText("First name");
     * let placeholderText = textForm.GetPlaceholderText();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Placeholder text: " + placeholderText);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetPlaceholderText/
     */
    GetPlaceholderText(): string;

    /**
     * Returns the position (index) of the current form within its parent element.
     *
     * @returns returns -1 if the form has no parent.
     * @since 10.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetPosInParent/
     */
    GetPosInParent(): number;

    /**
     * Returns the role of the current form.
     *
     * @since 9.0.0
     *
     * @example
     * ```js
     * // How do I get the role of a form field in a document?
     *
     * // Assign a custom role to a form, then read it back to verify the assignment.
     *
     * const doc = Api.GetDocument();
     * let paragraph = doc.GetElement(0);
     *
     * const roles = doc.GetFormRoles();
     * const rolePr = { "color": "#ffefbf" };
     * roles.Add("MY_ROLE", rolePr);
     *
     * const textForm = Api.CreateTextForm({
     * 	"tip": "Enter your first name",
     * 	"required": true,
     * 	"placeholder": "First name",
     * 	"comb": true,
     * 	"maxCharacters": 10,
     * 	"cellWidth": 3,
     * 	"multiLine": false,
     * 	"autoFit": false
     * });
     * paragraph.AddElement(textForm);
     *
     * textForm.SetRole("MY_ROLE");
     * const role = textForm.GetRole();
     *
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form role: " + role);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetRole/
     */
    GetRole(): string;

    /**
     * Returns the tag attribute for the current form.
     *
     * @since 9.0.0
     *
     * @example
     * ```js
     * // How do I get the tag of a form field in a document?
     *
     * // Label a form with a custom tag, then retrieve it to confirm it was stored correctly.
     *
     * const doc = Api.GetDocument();
     * let paragraph = doc.GetElement(0);
     *
     * const textForm = Api.CreateTextForm({
     * 	"key": "Personal information",
     * 	"tip": "Enter your first name",
     * 	"required": true,
     * 	"placeholder": "First name",
     * 	"comb": true,
     * 	"maxCharacters": 10,
     * 	"cellWidth": 3,
     * 	"multiLine": false,
     * 	"autoFit": false
     * });
     * textForm.SetTag('MY_TAG');
     * paragraph.AddElement(textForm);
     *
     * const formTag = textForm.GetTag();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form tag: " + formTag);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetTag/
     */
    GetTag(): string;

    /**
     * Returns the text from the current form.
     *
     * @example
     * ```js
     * // How do I read the current value typed into a form in a document?
     *
     * // Extract the raw content of a filled-in text field to use or display elsewhere in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let text = textForm.GetText();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form text: " + text);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetText/
     */
    GetText(): string;

    /**
     * Returns the text properties from the current form.
     *
     * **Note:**
     * Used if possible for this type of form.
     *
     * @example
     * ```js
     * // How do I access the font and style settings of a form field in a document?
     *
     * // Retrieve the current text properties of a form so they can be adjusted and reapplied in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let textPr = Api.CreateTextPr();
     * textPr.SetFontSize(30);
     * textPr.SetBold(true);
     * textForm.SetTextPr(textPr);
     * let formTextPr = textForm.GetTextPr();
     * formTextPr.SetItalic(true);
     * textForm.SetTextPr(formTextPr);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetTextPr/
     */
    GetTextPr(): ApiTextPr;

    /**
     * Returns the timestamp of the current form.
     *
     * @returns The Unix timestamp in milliseconds, or undefined if the form is a placeholder.
     * @since 8.1.0
     *
     * @example
     * ```js
     * // How do I get the date and time value entered into a date form in a document?
     *
     * // Convert the returned timestamp to a readable date to display it as a formatted string.
     *
     * let doc = Api.GetDocument();
     * let dateForm = Api.CreateDateForm({"key": "Nowadays", "tip": "Enter current date", "required": true, "placeholder": "Your date here", "format": "mm.dd.yyyy", "lang": "en-US"});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(dateForm);
     * dateForm.SetTime(new Date().getTime());
     * let timeStamp = dateForm.GetTime();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first date form from this document has setted time: " + new Date(timeStamp));
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiDateForm/Methods/GetTime/
     */
    GetTime(): undefined | number;

    /**
     * Returns the tip text of the current form.
     *
     * @example
     * ```js
     * // How do I read the instructional hint shown when a user hovers over a form field in a document?
     *
     * // Display the tooltip message of a drop-down form to verify what guidance is shown to the user in a document.
     *
     * let doc = Api.GetDocument();
     * let comboBoxForm = Api.CreateComboBoxForm({"key": "Personal information", "tip": "Choose your country", "required": true, "placeholder": "Country", "editable": false, "autoFit": false, "items": ["Latvia", "USA", "UK"]});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(comboBoxForm);
     * let tipText = comboBoxForm.GetTipText();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form tip text: " + tipText);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetTipText/
     */
    GetTipText(): string;

    /**
     * Returns the date of the current form.
     *
     * @since 9.4.0
     *
     * @example
     * ```js
     * // The GetValue method returns a Date object, or undefined if the form still shows its placeholder.
     *
     * // Set a date on the form and then retrieve it to display the date string.
     *
     * let doc = Api.GetDocument();
     * let dateForm = Api.CreateDateForm({"key": "EventDate", "tip": "Enter the event date", "required": true, "placeholder": "Event date", "format": "mm.dd.yyyy", "lang": "en-US"});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(dateForm);
     * dateForm.SetDate(new Date(2024, 0, 15));
     * let value = dateForm.GetValue();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Date form value: " + value.toString());
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiDateForm/Methods/GetValue/
     */
    GetValue(): Date | undefined;

    /**
     * Returns a shape in which the form is placed to control the position and size of the fixed size form
     * frame.
     *
     * The null value will be returned for the inline forms.
     *
     * @returns returns the shape in which the form is placed.
     *
     * @example
     * ```js
     * // How do I get the surrounding shape of a form field so I can adjust its border or position in a document?
     *
     * // Apply a custom outline to the wrapper shape of a form field to make it stand out visually in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.ToFixed(10 * 240, 2 * 240);
     * let shape = textForm.GetWrapperShape();
     * let stroke = Api.CreateStroke(36000, Api.CreateSolidFill(Api.RGB(255, 111, 61)));
     * shape.SetOutLine(stroke);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetWrapperShape/
     */
    GetWrapperShape(): ApiShape;

    /**
     * Checks if the current form is filled.
     *
     * @since 9.4.0
     *
     * @example
     * ```js
     * // How do I tell if a form field has been filled out in a document?
     *
     * // Verify the fill status of multiple form fields to determine which ones still need input in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm1 = Api.CreateTextForm({"key": "Name1", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": false, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm1);
     * let textForm2 = Api.CreateTextForm({"key": "Name2", "tip": "Enter your last name", "required": true, "placeholder": "Last name", "comb": false, "multiLine": false, "autoFit": false});
     * paragraph.AddElement(textForm2);
     * textForm2.SetText("Smith");
     * let filled1 = textForm1.IsFilled();
     * let filled2 = textForm2.IsFilled();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first text form is filled: " + filled1);
     * doc.Push(paragraph);
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The second text form is filled: " + filled2);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/IsFilled/
     */
    IsFilled(): boolean;

    /**
     * Checks if the current form is fixed size.
     *
     * @example
     * ```js
     * // How do I find out if a form field is locked to a specific size in a document?
     *
     * // Confirm the fixed-size status of a form field before deciding whether layout adjustments are needed in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.ToFixed(10 * 240, 2 * 240);
     * let fixed = textForm.IsFixed();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document is fixed: " + fixed);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/IsFixed/
     */
    IsFixed(): boolean;

    /**
     * Checks if the current form is required.
     *
     * @example
     * ```js
     * // How do I check if a form field must be filled out before the document is submitted in a document?
     *
     * // Confirm whether a form field is required so the result can be shown to the reader in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let required = textForm.IsRequired();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document is required: " + required);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/IsRequired/
     */
    IsRequired(): boolean;

    /**
     * Places a cursor before/after the current form.
     *
     * @param isAfter - Specifies whether a cursor will be placed before (false) or after (true) the current form.
     * @default isAfter = true
     * @since 8.1.0
     *
     * @example
     * ```js
     * // How do I place the cursor right after a form field to continue typing in a document?
     *
     * // Shift focus out of a completed form field so the next input lands in the surrounding text in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetText("The cursor will be placed after the current form.");
     * textForm.MoveCursorOutside(true);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/MoveCursorOutside/
     */
    MoveCursorOutside(isAfter?: boolean): boolean;

    /**
     * Sets the background color to the current form.
     *
     * @param color - The background color.
     * @since 9.1.0
     *
     * @example
     * ```js
     * // How do I fill a form field with a specific background color in a document?
     *
     * // Color the background of a form field to make it visually distinct from surrounding text in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetBackgroundColor(Api.HexColor('#FF6F3D'));
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetBackgroundColor/
     */
    SetBackgroundColor(color?: ApiColor): boolean;

    /**
     * Sets the border color to the current form.
     *
     * @param color - The border color.
     * @since 9.1.0
     *
     * @example
     * ```js
     * // How do I change the border color of a form field in a document?
     *
     * // Style the outline of a form field with a specific color to draw attention to it in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetBorderColor(Api.HexColor('#FF6F3D'));
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetBorderColor/
     */
    SetBorderColor(color?: ApiColor): boolean;

    /**
     * Sets the date to the current form.
     *
     * @param date - The date object or the date in the string format.
     * @since 9.0.0
     *
     * @example
     * ```js
     * // How do I populate a date form with a chosen date in a document?
     *
     * // Pre-fill a date form with today's date and read back the stored value in a document.
     *
     * let doc = Api.GetDocument();
     * let dateForm = Api.CreateDateForm({"key": "Nowadays", "tip": "Enter current date", "required": true, "placeholder": "Your date here", "format": "mm.dd.yyyy", "lang": "en-US"});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(dateForm);
     * dateForm.SetDate(new Date());
     * let formDate = dateForm.GetDate();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first date form from this document has setted time: " + formDate.toString());
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiDateForm/Methods/SetDate/
     */
    SetDate(date: Date | string): boolean;

    /**
     * Sets a key to the current form.
     *
     * @param sKey - Form key.
     *
     * @example
     * ```js
     * // How do I set the key that identifies a form field in a document?
     *
     * // Label a form field with a custom key so it can be referenced or grouped with related fields in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetFormKey("Personal information");
     * let key = textForm.GetFormKey();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form key: " + key);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetFormKey/
     */
    SetFormKey(sKey: string): boolean;

    /**
     * Sets the date format to the current form.
     *
     * @param sFormat - The date format. For example, mm.dd.yyyy
     * @since 8.1.0
     *
     * @example
     * ```js
     * // How do I change the way dates are formatted in a date form in a document?
     *
     * // Switch a date form to a long-form date pattern and verify the updated format in a document.
     *
     * let doc = Api.GetDocument();
     * let dateForm = Api.CreateDateForm({"key": "Nowadays", "tip": "Enter current date", "required": true, "placeholder": "Your date here", "format": "mm.dd.yyyy", "lang": "en-US"});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(dateForm);
     * dateForm.SetFormat("dddd, dd MMMM yyyy");
     * let format = dateForm.GetFormat();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first date form from this document has format: " + format);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiDateForm/Methods/SetFormat/
     */
    SetFormat(sFormat: string): boolean;

    /**
     * Sets the date language to the current form.
     *
     * @param sLangId - The date language. The possible value for this parameter is a language identifier as defined in
     *   RFC 4646/BCP 47. Example: "en-CA".
     * @since 8.1.0
     *
     * @example
     * ```js
     * // How do I change the locale of a date form in a document?
     *
     * // Update a date form to use a different language and confirm the new locale is applied in a document.
     *
     * let doc = Api.GetDocument();
     * let dateForm = Api.CreateDateForm({"key": "Nowadays", "tip": "Enter current date", "required": true, "placeholder": "Your date here", "format": "mm.dd.yyyy", "lang": "en-US"});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(dateForm);
     * dateForm.SetLanguage("en-CA");
     * let langId = dateForm.GetLanguage();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first date form from this document has setted language: " + langId);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiDateForm/Methods/SetLanguage/
     */
    SetLanguage(sLangId: string): boolean;

    /**
     * Sets the lock state of the current form.
     *
     * @param isLock - Specifies whether to lock the form (true) or unlock it (false).
     * @returns Returns true if the operation is successful.
     * @since 9.3.0
     *
     * @example
     * ```js
     * // How do I lock a form field so it cannot be changed in a document?
     *
     * // Protect specific fields from modification while keeping others editable.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetLock(true);
     * let locked = textForm.GetLock();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document is locked: " + locked);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetLock/
     */
    SetLock(isLock: boolean): boolean;

    /**
     * Sets the placeholder text to the current form.
     *
     * **Note:**
     * The placeholder text can't be set for checkbox or radio button forms.
     *
     * @param sText - The text that will be set to the current form.
     *
     * @example
     * ```js
     * // How do I add hint text inside an empty form field in a document?
     *
     * // Display a prompt inside a field before the user fills it in.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetPlaceholderText("First name");
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetPlaceholderText/
     */
    SetPlaceholderText(sText: string): boolean;

    /**
     * Specifies if the current form should be required.
     *
     * @param bRequired - Defines if the current form is required (true) or not (false).
     *
     * @example
     * ```js
     * // How do I make a form field mandatory in a document?
     *
     * // Ensure a field must be filled before the document form is submitted.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetRequired(true);
     * let required = textForm.IsRequired();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document is required: " + required);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetRequired/
     */
    SetRequired(bRequired: boolean): boolean;

    /**
     * Sets the role to the current form.
     *
     * @param role - The role which will be attached to the current form.
     * @since 9.0.0
     *
     * @example
     * ```js
     * // How do I associate a form field with a specific role in a document?
     *
     * // Restrict which signers or participants are responsible for a given field.
     *
     * const doc = Api.GetDocument();
     * let paragraph = doc.GetElement(0);
     *
     * const roles = doc.GetFormRoles();
     * const rolePr = { "color": "#ffefbf" };
     * roles.Add("MY_ROLE", rolePr);
     *
     * const textForm = Api.CreateTextForm({
     * 	"tip": "Enter your first name",
     * 	"required": true,
     * 	"placeholder": "First name",
     * 	"comb": true,
     * 	"maxCharacters": 10,
     * 	"cellWidth": 3,
     * 	"multiLine": false,
     * 	"autoFit": false
     * });
     * paragraph.AddElement(textForm);
     *
     * textForm.SetRole("MY_ROLE");
     * const role = textForm.GetRole();
     *
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form role: " + role);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetRole/
     */
    SetRole(role: string): boolean;

    /**
     * Sets the tag attribute to the current form.
     *
     * @param tag - The tag which will be added to the current container.
     * @since 9.0.0
     *
     * @example
     * ```js
     * // How do I attach a label or identifier to a form field in a document?
     *
     * // Organize or reference form fields programmatically using custom tags.
     *
     * const doc = Api.GetDocument();
     * let paragraph = doc.GetElement(0);
     *
     * const textForm = Api.CreateTextForm({
     * 	"key": "Personal information",
     * 	"tip": "Enter your first name",
     * 	"required": true,
     * 	"placeholder": "First name",
     * 	"comb": true,
     * 	"maxCharacters": 10,
     * 	"cellWidth": 3,
     * 	"multiLine": false,
     * 	"autoFit": false
     * });
     * textForm.SetTag('MY_TAG');
     * paragraph.AddElement(textForm);
     *
     * const formTag = textForm.GetTag();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form tag: " + formTag);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetTag/
     */
    SetTag(tag: string): boolean;

    /**
     * Sets the text properties to the current form.
     *
     * **Note:**
     * Used if possible for this type of form.
     *
     * @param textPr - The text properties that will be set to the current form.
     *
     * @example
     * ```js
     * // How do I change the font size and style of text inside a form field in a document?
     *
     * // Make form field text bold and larger to improve readability.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let textPr = Api.CreateTextPr();
     * textPr.SetFontSize(30);
     * textPr.SetBold(true);
     * textForm.SetTextPr(textPr);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetTextPr/
     */
    SetTextPr(textPr: ApiTextPr): boolean;

    /**
     * Sets the timestamp to the current form.
     *
     * @param nTimeStamp - The timestamp that will be set to the current date form.
     * @since 8.1.0
     *
     * @example
     * ```js
     * // How do I set the current date and time on a date form in a document?
     *
     * // Pre-fill a date form with a specific point in time to reflect today's date in a document.
     *
     * let doc = Api.GetDocument();
     * let dateForm = Api.CreateDateForm({"key": "Nowadays", "tip": "Enter current date", "required": true, "placeholder": "Your date here", "format": "mm.dd.yyyy", "lang": "en-US"});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(dateForm);
     * dateForm.SetTime(new Date().getTime());
     * let timeStamp = dateForm.GetTime();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first date form from this document has setted time: " + new Date(timeStamp));
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiDateForm/Methods/SetTime/
     */
    SetTime(nTimeStamp: number): boolean;

    /**
     * Sets the tip text to the current form.
     *
     * @param sText - Tip text.
     *
     * @example
     * ```js
     * // How do I add a tooltip that appears when hovering over a form field in a document?
     *
     * // Give users helpful instructions that appear when they hover over a field.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetTipText("Enter your first name");
     * let tipText = textForm.GetTipText();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Tip text: " + tipText);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetTipText/
     */
    SetTipText(sText: string): boolean;

    /**
     * Sets the date of the current form.
     *
     * @param value - The date object or the date in the string format.
     * @since 9.4.0
     *
     * @example
     * ```js
     * // The SetValue method accepts either a Date instance or a date string and applies it to the form.
     *
     * // Create a date form and assign a specific date using SetValue.
     *
     * let doc = Api.GetDocument();
     * let dateForm = Api.CreateDateForm({"key": "EventDate", "tip": "Enter the event date", "required": true, "placeholder": "Event date", "format": "mm.dd.yyyy", "lang": "en-US"});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(dateForm);
     * dateForm.SetValue(new Date(2024, 0, 15));
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiDateForm/Methods/SetValue/
     */
    SetValue(value: Date | string): boolean;

    /**
     * Converts the current form to a fixed size form.
     *
     * @param width - The wrapper shape width measured in twentieths of a point (1/1440 of an inch).
     * @param height - The wrapper shape height measured in twentieths of a point (1/1440 of an inch).
     * @param keepPosition - Save position on the page (it can be a little bit slow, because it runs the document
     *   calculation).
     *
     * @example
     * ```js
     * // How do I set a specific width and height for a form field in a document?
     *
     * // Lock a form's dimensions so layout does not shift when content changes.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.ToFixed(10 * 240, 2 * 240);
     * let fixed = textForm.IsFixed();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document has a fixed size: " + fixed);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/ToFixed/
     */
    ToFixed(width: twips, height: twips, keepPosition?: boolean): boolean;

    /**
     * Converts the current form to an inline form.
     *
     * **Note:**
     * A picture form can't be converted to an inline form, as it's always a fixed-size object.
     *
     * @example
     * ```js
     * // How do I switch a form field from fixed size to inline positioning in a document?
     *
     * // Allow a form field to flow with surrounding text instead of occupying a fixed block.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.ToFixed(10 * 240, 2 * 240);
     * let copyForm = textForm.Copy();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddElement(copyForm);
     * doc.Push(paragraph);
     * copyForm.ToInline();
     * let fixed = textForm.IsFixed();
     * let fixedCopy = copyForm.IsFixed();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document has a fixed size: " + fixed);
     * paragraph.AddLineBreak();
     * paragraph.AddText("The second form from this document has a fixed size: " + fixedCopy);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/ToInline/
     */
    ToInline(): boolean;
  }

  /**
   * Class representing a document.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiDocument/
   */
  export interface ApiDocument extends ApiDocumentContent {
    /**
     * Clears all forms in the document.
     *
     * @example
     * ```js
     * // How do I reset every form field to its empty state in a document?
     *
     * // Wipe entered data from text forms and content controls to start fresh in a document.
     *
     * let doc = Api.GetDocument();
     * let paragraph = doc.GetElement(0);
     * let inlineLvlSdt = Api.CreateInlineLvlSdt();
     * paragraph.AddInlineLvlSdt(inlineLvlSdt);
     * let run = Api.CreateRun();
     * run.AddText("This is an inline text content control.");
     * inlineLvlSdt.AddElement(run, 0);
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * paragraph.AddLineBreak();
     * paragraph.AddElement(textForm);
     * doc.ClearAllFields();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("All fields from this document were just cleared.");
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiDocument/Methods/ClearAllFields/
     */
    ClearAllFields(): boolean;

    /**
     * Returns all existing forms in the document.
     *
     * @example
     * ```js
     * // How do I access every form field present in a document?
     *
     * // Pre-fill a text field and select a combo box value when automating document completion.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Name", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let comboBoxForm = Api.CreateComboBoxForm({"key": "Country", "tip": "Choose your country", "required": true, "placeholder": "Country", "editable": false, "autoFit": false, "items": ["Latvia", "USA", "UK"]});
     * paragraph.AddLineBreak();
     * paragraph.AddElement(comboBoxForm);
     * let forms = doc.GetAllForms();
     * forms[0].SetText("John Smith");
     * forms[1].SelectListValue("USA");
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiDocument/Methods/GetAllForms/
     */
    GetAllForms(): ApiForm[];

    /**
     * Returns a list of all form keys attached to the specified role.
     *
     * @param role - The form role.
     * @returns A list of all form keys attached to the specified role.
     * @since 9.0.0
     *
     * @example
     * ```js
     * // How do I find which form fields belong to a particular role in a document?
     *
     * // Separate form responsibilities by role so each participant sees only their required fields in a document.
     *
     * let doc = Api.GetDocument();
     * let roles = doc.GetFormRoles();
     * roles.Add("Employee");
     * roles.Add("Chief");
     * let textForm = Api.CreateTextForm({"role" : "Employee", "key": "Employee FirstName", "tip": "Enter your first name", "tag": "form_1", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let comboBoxForm = Api.CreateComboBoxForm({"role" : "Employee", "key": "Country", "tip": "Choose your country", "tag": "form_1", "required": true, "placeholder": "Country", "editable": false, "autoFit": false, "items": ["Latvia", "USA", "UK"]});
     * paragraph.AddLineBreak();
     * paragraph.AddElement(comboBoxForm);
     *
     * paragraph = Api.CreateParagraph();
     * doc.Push(paragraph);
     * textForm = Api.CreateTextForm({"role" : "Chief", "key": "Chief FirstName", "tip": "Enter your first name", "tag": "form_1", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * paragraph.AddElement(textForm);
     *
     * let keys = doc.GetFormKeysByRole("Employee");
     * paragraph = Api.CreateParagraph();
     * doc.Push(paragraph);
     * paragraph.AddText("Form keys that need to be filled by 'Employee':");
     *
     * keys.forEach(key => {
     *     paragraph.AddLineBreak();
     *     paragraph.AddText(key);
     * });
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiDocument/Methods/GetFormKeysByRole/
     */
    GetFormKeysByRole(role: string): string[];

    /**
     * Returns a collection of form roles.
     *
     * @since 9.0.0
     *
     * @example
     * ```js
     * // How do I see what roles have access to form fields in a document?
     *
     * // Access the role management system to view form permissions in a document.
     *
     * let doc = Api.GetDocument();
     * let roles = doc.GetFormRoles();
     * roles.Add("Customer");
     * roles.Add("Seller");
     * let paragraph = doc.GetElement(0);
     * roles.GetAllRoles().forEach(role => {
     *     paragraph.AddText(role);
     *     paragraph.AddLineBreak();
     * });
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiDocument/Methods/GetFormRoles/
     */
    GetFormRoles(): ApiFormRoles;

    /**
     * Returns the form value for the specified key.
     *
     * For a group of radio buttons returns Choice, i.e. the name of the selected item.
     *
     * @param key - The form key.
     * @returns Returns true/false for checkboxes and string for other form types. Returns null if there is no
     *   form with the specified key.
     * @since 9.0.0
     *
     * @example
     * ```js
     * // How do I retrieve what a user entered in a named form field in a document?
     *
     * // Verify filled-in form data by looking up field values by key in a document.
     *
     * let doc = Api.GetDocument();
     * let paragraph1 = doc.GetElement(0);
     * let checkBox = Api.CreateCheckBoxForm({key: "BestCompany"});
     * checkBox.SetChecked(true);
     * paragraph1.Push(checkBox);
     * let textForm = Api.CreateTextForm({key: "CompanyName"});
     * textForm.SetText("OnlyOffice");
     * paragraph1.Push(textForm);
     *
     * let paragraph = Api.CreateParagraph();
     * doc.Push(paragraph);
     * let formValue = doc.GetFormValueByKey("CompanyName");
     * paragraph.AddText("CompanyName: " + formValue);
     * paragraph.AddLineBreak();
     * formValue = doc.GetFormValueByKey("BestCompany");
     * paragraph.AddText("BestCompany: " + formValue);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiDocument/Methods/GetFormValueByKey/
     */
    GetFormValueByKey(key: string): null | boolean | string;

    /**
     * Returns a list of all forms in the document with the specified key.
     *
     * @param key - The form key.
     * @since 9.0.0
     *
     * @example
     * ```js
     * // How do I find every form field that uses a given key in a document?
     *
     * // Locate duplicate-keyed form fields across multiple paragraphs in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "FirstName", "tip": "Enter your first name", "tag": "form_1", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let comboBoxForm = Api.CreateComboBoxForm({"key": "Country", "tip": "Choose your country", "tag": "form_1", "required": true, "placeholder": "Country", "editable": false, "autoFit": false, "items": ["Latvia", "USA", "UK"]});
     * paragraph.AddLineBreak();
     * paragraph.AddElement(comboBoxForm);
     *
     * paragraph = Api.CreateParagraph();
     * doc.Push(paragraph);
     * textForm = Api.CreateTextForm({"key": "FirstName", "tip": "Enter your first name", "tag": "form_1", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * paragraph.AddElement(textForm);
     *
     * let forms = doc.GetFormsByKey("FirstName");
     * paragraph = Api.CreateParagraph();
     * doc.Push(paragraph);
     * paragraph.AddText("Number of forms with key 'FirstName': " + forms.length);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiDocument/Methods/GetFormsByKey/
     */
    GetFormsByKey(key: string): ApiForm[];

    /**
     * Returns a list of all forms in the document with the specified role name.
     *
     * @param role - The form role.
     * @since 9.0.0
     *
     * @example
     * ```js
     * // How do I filter forms by their assigned role in a document?
     *
     * // Separate employee and manager fields by querying each role independently in a document.
     *
     * let doc = Api.GetDocument();
     * let roles = doc.GetFormRoles();
     * roles.Add("Employee");
     * roles.Add("Chief");
     * let textForm = Api.CreateTextForm({"role" : "Employee", "key": "Employee FirstName", "tip": "Enter your first name", "tag": "form_1", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let comboBoxForm = Api.CreateComboBoxForm({"role" : "Employee", "key": "Country", "tip": "Choose your country", "tag": "form_1", "required": true, "placeholder": "Country", "editable": false, "autoFit": false, "items": ["Latvia", "USA", "UK"]});
     * paragraph.AddLineBreak();
     * paragraph.AddElement(comboBoxForm);
     *
     * paragraph = Api.CreateParagraph();
     * doc.Push(paragraph);
     * textForm = Api.CreateTextForm({"role" : "Chief", "key": "Chief FirstName", "tip": "Enter your first name", "tag": "form_1", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * paragraph.AddElement(textForm);
     *
     * let forms = doc.GetFormsByRole("Employee");
     * paragraph = Api.CreateParagraph();
     * doc.Push(paragraph);
     * paragraph.AddText("Number of forms with role 'Employee': " + forms.length);
     *
     * forms = doc.GetFormsByRole("Chief");
     * paragraph = Api.CreateParagraph();
     * doc.Push(paragraph);
     * paragraph.AddText("Number of forms with role 'Chief': " + forms.length);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiDocument/Methods/GetFormsByRole/
     */
    GetFormsByRole(role: string): ApiForm[];

    /**
     * Returns a list of all forms in the document with the specified tag name.
     *
     * @param sTag - Form tag.
     *
     * @example
     * ```js
     * // How do I look up forms by their tag in a document?
     *
     * // Populate related form fields at once by targeting them through a shared tag in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "FirstName", "tip": "Enter your first name", "tag": "form_1", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let comboBoxForm = Api.CreateComboBoxForm({"key": "Country", "tip": "Choose your country", "tag": "form_1", "required": true, "placeholder": "Country", "editable": false, "autoFit": false, "items": ["Latvia", "USA", "UK"]});
     * paragraph.AddLineBreak();
     * paragraph.AddElement(comboBoxForm);
     * let forms = doc.GetFormsByTag("form_1");
     * forms[0].SetText("John Smith");
     * forms[1].SelectListValue("USA");
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiDocument/Methods/GetFormsByTag/
     */
    GetFormsByTag(sTag: string): ApiForm[];

    /**
     * Returns the data from all forms present in the current document.
     *
     * If a form was created and not assigned to any part of the document, it won't appear in this list.
     *
     * @since 8.0.0
     *
     * @example
     * ```js
     * // How do I export form field data as a JSON string in a document?
     *
     * // Verify filled-in form values by printing them as text at the end of a document.
     *
     * let doc = Api.GetDocument();
     * let paragraph1 = doc.GetElement(0);
     * let checkBox = Api.CreateCheckBoxForm({key: "BestCompany"});
     * checkBox.SetChecked(true);
     * paragraph1.Push(checkBox);
     * let textForm = Api.CreateTextForm({key: "CompanyName"});
     * textForm.SetText("OnlyOffice");
     * paragraph1.Push(textForm);
     *
     * let text = JSON.stringify(doc.GetFormsData());
     * let paragraph2 = Api.CreateParagraph();
     * paragraph2.AddText(text);
     * doc.Push(paragraph2);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiDocument/Methods/GetFormsData/
     */
    GetFormsData(): FormData[];

    /**
     * Returns the highlight color of the forms in the document.
     *
     * @returns Returns the highlight color, or _null_ if the highlight is disabled.
     * @since 9.4.0
     *
     * @example
     * ```js
     * // How do I retrieve the current form highlight color in a document?
     *
     * // Confirm a highlight was applied correctly by displaying its hex value in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * doc.SetFormsHighlight(191, 219, 254);
     * let highlight = doc.GetFormsHighlight();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The forms highlight color is: " + highlight.GetHex());
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiDocument/Methods/GetFormsHighlight/
     */
    GetFormsHighlight(): ApiColor | null;

    /**
     * Returns a list of all tags that are used for all forms in the document.
     *
     * @example
     * ```js
     * // How do I retrieve every form tag from a document?
     *
     * // Verify which tags are attached to text and combo-box form fields after filling them with values.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "tag": "form_1", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let comboBoxForm = Api.CreateComboBoxForm({"key": "Personal information", "tip": "Choose your country", "tag": "form_2", "required": true, "placeholder": "Country", "editable": false, "autoFit": false, "items": ["Latvia", "USA", "UK"]});
     * paragraph.AddLineBreak();
     * paragraph.AddElement(comboBoxForm);
     * let forms = doc.GetAllForms();
     * forms[0].SetText("John Smith");
     * forms[1].SelectListValue("USA");
     * let tags = doc.GetTagsOfAllForms();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Forms tags: ");
     * paragraph.AddLineBreak();
     * for (let i = 0; i < tags.length; i++ ){
     * 	paragraph.AddText(tags[i]);
     * 	paragraph.AddLineBreak();
     * }
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiDocument/Methods/GetTagsOfAllForms/
     */
    GetTagsOfAllForms(): string[];

    /**
     * Inserts a text box with the specified text box properties over the selected text.
     *
     * @param formPr - Properties for inserting a text field.
     *
     * @example
     * ```js
     * // How do I convert text into a fillable field in a document?
     *
     * // Turn highlighted content into an interactive text input area in a document.
     *
     * let doc = Api.GetDocument();
     * let paragraph = doc.GetElement(0);
     * paragraph.AddText("First name");
     * paragraph.Select();
     * doc.InsertTextForm({
     * 	"key": "Personal information",
     * 	"tip": "Enter your first name",
     * 	"required": true,
     * 	"placeholder": "Name",
     * 	"comb": true,
     * 	"maxCharacters": 10,
     * 	"cellWidth": 3,
     * 	"multiLine": false,
     * 	"autoFit": false,
     * 	"placeholderFromSelection": true,
     * 	"keepSelectedTextInForm": false
     * });
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiDocument/Methods/InsertTextForm/
     */
    InsertTextForm(formPr: TextFormInsertPr): ApiTextForm;

    /**
     * Sets the data to the specified forms.
     *
     * @param arrData - An array of form data to set to the specified forms.
     * @since 8.0.0
     *
     * @example
     * ```js
     * // How do I fill in form fields programmatically in a document?
     *
     * // Pre-fill checkboxes and text fields by matching each field's key to a corresponding value.
     *
     * let doc = Api.GetDocument();
     * let paragraph1 = doc.GetElement(0);
     * let checkBox = Api.CreateCheckBoxForm({key: "BestCompany"});
     * paragraph1.Push(checkBox);
     * let textForm = Api.CreateTextForm({key: "CompanyName"});
     * paragraph1.Push(textForm);
     *
     * doc.SetFormsData([
     *     {key: "BestCompany", value: true},
     *     {key: "CompanyName", value: "OnlyOffice"}
     * ]);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiDocument/Methods/SetFormsData/
     */
    SetFormsData(arrData: FormData[]): boolean;

    /**
     * Sets the highlight to the forms in the document.
     *
     * @param color - The highlight color for the forms.
     * @since 9.1.0
     *
     * @example
     * ```js
     * // How do I highlight form fields with a custom color in a document?
     *
     * // Draw attention to fillable areas by painting them with a distinct background color.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * doc.SetFormsHighlight(Api.HexColor('#FF6F3D'));
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiDocument/Methods/SetFormsHighlight/
     */
    SetFormsHighlight(color: ApiColor): boolean;
  }

  /** Class representing a container for paragraphs and tables. */
  export interface ApiDocumentContent {
  }

  /** Class representing a graphical object. */
  export interface ApiDrawing {
  }

  /**
   * Class representing a drop cap. A drop cap is a large initial letter that is split off from a
   * paragraph into a
   * separate framed paragraph.
   */
  export interface ApiDropCap {
  }

  /** Class representing a base class for fill. */
  export interface ApiFill {
  }

  /**
   * Class representing a document form base.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/
   */
  export interface ApiFormBase {
    /**
     * Clears the current form.
     *
     * @example
     * ```js
     * // How do I clear the content of a form in a document?
     *
     * // Reset a filled-in form field to blank so it is ready for new input in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetText("John Smith");
     * textForm.Clear();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document was cleared.");
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/Clear/
     */
    Clear(): boolean;

    /**
     * Copies the current form (copies with the shape if it exists).
     *
     * @example
     * ```js
     * // How do I copy a form field in a document?
     *
     * // Reuse an existing form by placing an identical copy elsewhere on the same paragraph.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let copyTextForm = textForm.Copy();
     * paragraph.AddLineBreak();
     * paragraph.AddElement(copyTextForm);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/Copy/
     */
    Copy(): ApiForm;

    /**
     * Removes a form and its content.
     *
     * If keepContent is true, the content is not deleted.
     *
     * @param keepContent - Specifies if the content will be deleted or not.
     * @returns returns false if form wasn't added to the document.
     * @since 9.2.0
     *
     * @example
     * ```js
     * // How do I delete a form field in a document?
     *
     * // Clean up a document by removing one of several inserted checkbox forms.
     *
     * const doc = Api.GetDocument();
     * const checkBoxForm = Api.CreateCheckBoxForm({
     * 	'key': 'Marital status',
     * 	'tip': 'Specify your marital status',
     * 	'placeholder': 'Marital status',
     * 	'radio': true
     * });
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(checkBoxForm);
     * paragraph.AddText(' Married');
     * let copyCheckBoxForm = checkBoxForm.Copy();
     * paragraph.AddLineBreak();
     * paragraph.AddElement(copyCheckBoxForm);
     * paragraph.AddText(' Single');
     * checkBoxForm.Delete();
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/Delete/
     */
    Delete(keepContent?: boolean): boolean;

    /**
     * Returns the background color of the current form.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetBackgroundColor/
     */
    GetBackgroundColor(): ApiColor;

    /**
     * Returns the border color of the current form.
     *
     * @since 9.1.0
     *
     * @example
     * ```js
     * // How do I get the border color of a form field in a document?
     *
     * // Verify a custom border color by reading its RGB values back after applying it.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetBorderColor(Api.RGB(255, 111, 61));
     * let borderColor = textForm.GetBorderColor();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Border color (RGB): (" + borderColor.r + ", " + borderColor.g + ", " + borderColor.b + ")");
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetBorderColor/
     */
    GetBorderColor(): ApiColor;

    /**
     * Returns a type of the ApiFormBase class.
     *
     * @example
     * ```js
     * // How do I get the class type of a form object in a document?
     *
     * // Confirm what kind of object a form belongs to by printing its class type label.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let classType = textForm.GetClassType();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Class type: " + classType);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetClassType/
     */
    GetClassType(): "form";

    /**
     * Returns the current form key.
     *
     * @example
     * ```js
     * // How do I get the key of a form field in a document?
     *
     * // Confirm the grouping key of a combo box by reading it back and displaying it.
     *
     * let doc = Api.GetDocument();
     * let comboBoxForm = Api.CreateComboBoxForm({"key": "Personal information", "tip": "Choose your country", "required": true, "placeholder": "Country", "editable": false, "autoFit": false, "items": ["Latvia", "USA", "UK"]});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(comboBoxForm);
     * let key = comboBoxForm.GetFormKey();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form key: " + key);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetFormKey/
     */
    GetFormKey(): string;

    /**
     * Returns a type of the current form.
     *
     * @example
     * ```js
     * // How do I get the type of a form field in a document?
     *
     * // Distinguish one form from another by printing its type identifier next to it.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let formType = textForm.GetFormType();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form type: " + formType);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetFormType/
     */
    GetFormType(): FormType;

    /**
     * Returns an internal id of the current form.
     *
     * @since 9.2.0
     *
     * @example
     * ```js
     * // How do I get the internal ID of a form field in a document?
     *
     * // Uniquely track a form by reading its auto-assigned internal identifier.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let internalId = textForm.GetInternalId();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Internal id: " + internalId);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetInternalId/
     */
    GetInternalId(): string;

    /**
     * Returns the lock state of the current form.
     *
     * @since 9.3.0
     *
     * @example
     * ```js
     * // How do I find out whether a form field is locked in a document?
     *
     * // Protect a form, then confirm the lock is active by reading the lock state.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetLock(true);
     * let locked = textForm.GetLock();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document is locked: " + locked);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetLock/
     */
    GetLock(): boolean;

    /**
     * Returns the parent element (a paragraph or an inline content control) that directly contains the
     * current form.
     *
     * @returns returns null if the form has no parent.
     * @since 10.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetParent/
     */
    GetParent(): ParagraphLikeContainer;

    /**
     * Returns the placeholder text from the current form.
     *
     * @since 9.1.0
     *
     * @example
     * ```js
     * // How do I get the placeholder text of a form field in a document?
     *
     * // Confirm a hint label by retrieving the placeholder text after setting it on a form.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetPlaceholderText("First name");
     * let placeholderText = textForm.GetPlaceholderText();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Placeholder text: " + placeholderText);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetPlaceholderText/
     */
    GetPlaceholderText(): string;

    /**
     * Returns the position (index) of the current form within its parent element.
     *
     * @returns returns -1 if the form has no parent.
     * @since 10.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetPosInParent/
     */
    GetPosInParent(): number;

    /**
     * Returns the role of the current form.
     *
     * @since 9.0.0
     *
     * @example
     * ```js
     * // How do I get the role of a form field in a document?
     *
     * // Assign a custom role to a form, then read it back to verify the assignment.
     *
     * const doc = Api.GetDocument();
     * let paragraph = doc.GetElement(0);
     *
     * const roles = doc.GetFormRoles();
     * const rolePr = { "color": "#ffefbf" };
     * roles.Add("MY_ROLE", rolePr);
     *
     * const textForm = Api.CreateTextForm({
     * 	"tip": "Enter your first name",
     * 	"required": true,
     * 	"placeholder": "First name",
     * 	"comb": true,
     * 	"maxCharacters": 10,
     * 	"cellWidth": 3,
     * 	"multiLine": false,
     * 	"autoFit": false
     * });
     * paragraph.AddElement(textForm);
     *
     * textForm.SetRole("MY_ROLE");
     * const role = textForm.GetRole();
     *
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form role: " + role);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetRole/
     */
    GetRole(): string;

    /**
     * Returns the tag attribute for the current form.
     *
     * @since 9.0.0
     *
     * @example
     * ```js
     * // How do I get the tag of a form field in a document?
     *
     * // Label a form with a custom tag, then retrieve it to confirm it was stored correctly.
     *
     * const doc = Api.GetDocument();
     * let paragraph = doc.GetElement(0);
     *
     * const textForm = Api.CreateTextForm({
     * 	"key": "Personal information",
     * 	"tip": "Enter your first name",
     * 	"required": true,
     * 	"placeholder": "First name",
     * 	"comb": true,
     * 	"maxCharacters": 10,
     * 	"cellWidth": 3,
     * 	"multiLine": false,
     * 	"autoFit": false
     * });
     * textForm.SetTag('MY_TAG');
     * paragraph.AddElement(textForm);
     *
     * const formTag = textForm.GetTag();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form tag: " + formTag);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetTag/
     */
    GetTag(): string;

    /**
     * Returns the text from the current form.
     *
     * @example
     * ```js
     * // How do I read the current value typed into a form in a document?
     *
     * // Extract the raw content of a filled-in text field to use or display elsewhere in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let text = textForm.GetText();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form text: " + text);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetText/
     */
    GetText(): string;

    /**
     * Returns the text properties from the current form.
     *
     * **Note:**
     * Used if possible for this type of form.
     *
     * @example
     * ```js
     * // How do I access the font and style settings of a form field in a document?
     *
     * // Retrieve the current text properties of a form so they can be adjusted and reapplied in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let textPr = Api.CreateTextPr();
     * textPr.SetFontSize(30);
     * textPr.SetBold(true);
     * textForm.SetTextPr(textPr);
     * let formTextPr = textForm.GetTextPr();
     * formTextPr.SetItalic(true);
     * textForm.SetTextPr(formTextPr);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetTextPr/
     */
    GetTextPr(): ApiTextPr;

    /**
     * Returns the tip text of the current form.
     *
     * @example
     * ```js
     * // How do I read the instructional hint shown when a user hovers over a form field in a document?
     *
     * // Display the tooltip message of a drop-down form to verify what guidance is shown to the user in a document.
     *
     * let doc = Api.GetDocument();
     * let comboBoxForm = Api.CreateComboBoxForm({"key": "Personal information", "tip": "Choose your country", "required": true, "placeholder": "Country", "editable": false, "autoFit": false, "items": ["Latvia", "USA", "UK"]});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(comboBoxForm);
     * let tipText = comboBoxForm.GetTipText();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form tip text: " + tipText);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetTipText/
     */
    GetTipText(): string;

    /**
     * Returns the current value of the form field.
     *
     * @since 9.4.0
     *
     * @example
     * ```js
     * // The GetValue method returns the form's current value regardless of its specific type.
     *
     * // Read the form value after setting it and display the result in a new paragraph.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Name", "tip": "Enter your name", "required": true, "placeholder": "Your name"});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetValue("Jane Doe");
     * let value = textForm.GetValue();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form value: " + value);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetValue/
     */
    GetValue(): string | boolean;

    /**
     * Returns a shape in which the form is placed to control the position and size of the fixed size form
     * frame.
     *
     * The null value will be returned for the inline forms.
     *
     * @returns returns the shape in which the form is placed.
     *
     * @example
     * ```js
     * // How do I get the surrounding shape of a form field so I can adjust its border or position in a document?
     *
     * // Apply a custom outline to the wrapper shape of a form field to make it stand out visually in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.ToFixed(10 * 240, 2 * 240);
     * let shape = textForm.GetWrapperShape();
     * let stroke = Api.CreateStroke(36000, Api.CreateSolidFill(Api.RGB(255, 111, 61)));
     * shape.SetOutLine(stroke);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetWrapperShape/
     */
    GetWrapperShape(): ApiShape;

    /**
     * Checks if the current form is filled.
     *
     * @since 9.4.0
     *
     * @example
     * ```js
     * // How do I tell if a form field has been filled out in a document?
     *
     * // Verify the fill status of multiple form fields to determine which ones still need input in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm1 = Api.CreateTextForm({"key": "Name1", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": false, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm1);
     * let textForm2 = Api.CreateTextForm({"key": "Name2", "tip": "Enter your last name", "required": true, "placeholder": "Last name", "comb": false, "multiLine": false, "autoFit": false});
     * paragraph.AddElement(textForm2);
     * textForm2.SetText("Smith");
     * let filled1 = textForm1.IsFilled();
     * let filled2 = textForm2.IsFilled();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first text form is filled: " + filled1);
     * doc.Push(paragraph);
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The second text form is filled: " + filled2);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/IsFilled/
     */
    IsFilled(): boolean;

    /**
     * Checks if the current form is fixed size.
     *
     * @example
     * ```js
     * // How do I find out if a form field is locked to a specific size in a document?
     *
     * // Confirm the fixed-size status of a form field before deciding whether layout adjustments are needed in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.ToFixed(10 * 240, 2 * 240);
     * let fixed = textForm.IsFixed();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document is fixed: " + fixed);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/IsFixed/
     */
    IsFixed(): boolean;

    /**
     * Checks if the current form is required.
     *
     * @example
     * ```js
     * // How do I check if a form field must be filled out before the document is submitted in a document?
     *
     * // Confirm whether a form field is required so the result can be shown to the reader in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let required = textForm.IsRequired();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document is required: " + required);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/IsRequired/
     */
    IsRequired(): boolean;

    /**
     * Places a cursor before/after the current form.
     *
     * @param isAfter - Specifies whether a cursor will be placed before (false) or after (true) the current form.
     * @default isAfter = true
     * @since 8.1.0
     *
     * @example
     * ```js
     * // How do I place the cursor right after a form field to continue typing in a document?
     *
     * // Shift focus out of a completed form field so the next input lands in the surrounding text in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetText("The cursor will be placed after the current form.");
     * textForm.MoveCursorOutside(true);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/MoveCursorOutside/
     */
    MoveCursorOutside(isAfter?: boolean): boolean;

    /**
     * Sets the background color to the current form.
     *
     * @param color - The background color.
     * @since 9.1.0
     *
     * @example
     * ```js
     * // How do I fill a form field with a specific background color in a document?
     *
     * // Color the background of a form field to make it visually distinct from surrounding text in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetBackgroundColor(Api.HexColor('#FF6F3D'));
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetBackgroundColor/
     */
    SetBackgroundColor(color?: ApiColor): boolean;

    /**
     * Sets the border color to the current form.
     *
     * @param color - The border color.
     * @since 9.1.0
     *
     * @example
     * ```js
     * // How do I change the border color of a form field in a document?
     *
     * // Style the outline of a form field with a specific color to draw attention to it in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetBorderColor(Api.HexColor('#FF6F3D'));
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetBorderColor/
     */
    SetBorderColor(color?: ApiColor): boolean;

    /**
     * Sets a key to the current form.
     *
     * @param sKey - Form key.
     *
     * @example
     * ```js
     * // How do I set the key that identifies a form field in a document?
     *
     * // Label a form field with a custom key so it can be referenced or grouped with related fields in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetFormKey("Personal information");
     * let key = textForm.GetFormKey();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form key: " + key);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetFormKey/
     */
    SetFormKey(sKey: string): boolean;

    /**
     * Sets the lock state of the current form.
     *
     * @param isLock - Specifies whether to lock the form (true) or unlock it (false).
     * @returns Returns true if the operation is successful.
     * @since 9.3.0
     *
     * @example
     * ```js
     * // How do I lock a form field so it cannot be changed in a document?
     *
     * // Protect specific fields from modification while keeping others editable.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetLock(true);
     * let locked = textForm.GetLock();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document is locked: " + locked);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetLock/
     */
    SetLock(isLock: boolean): boolean;

    /**
     * Sets the placeholder text to the current form.
     *
     * **Note:**
     * The placeholder text can't be set for checkbox or radio button forms.
     *
     * @param sText - The text that will be set to the current form.
     *
     * @example
     * ```js
     * // How do I add hint text inside an empty form field in a document?
     *
     * // Display a prompt inside a field before the user fills it in.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetPlaceholderText("First name");
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetPlaceholderText/
     */
    SetPlaceholderText(sText: string): boolean;

    /**
     * Specifies if the current form should be required.
     *
     * @param bRequired - Defines if the current form is required (true) or not (false).
     *
     * @example
     * ```js
     * // How do I make a form field mandatory in a document?
     *
     * // Ensure a field must be filled before the document form is submitted.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetRequired(true);
     * let required = textForm.IsRequired();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document is required: " + required);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetRequired/
     */
    SetRequired(bRequired: boolean): boolean;

    /**
     * Sets the role to the current form.
     *
     * @param role - The role which will be attached to the current form.
     * @since 9.0.0
     *
     * @example
     * ```js
     * // How do I associate a form field with a specific role in a document?
     *
     * // Restrict which signers or participants are responsible for a given field.
     *
     * const doc = Api.GetDocument();
     * let paragraph = doc.GetElement(0);
     *
     * const roles = doc.GetFormRoles();
     * const rolePr = { "color": "#ffefbf" };
     * roles.Add("MY_ROLE", rolePr);
     *
     * const textForm = Api.CreateTextForm({
     * 	"tip": "Enter your first name",
     * 	"required": true,
     * 	"placeholder": "First name",
     * 	"comb": true,
     * 	"maxCharacters": 10,
     * 	"cellWidth": 3,
     * 	"multiLine": false,
     * 	"autoFit": false
     * });
     * paragraph.AddElement(textForm);
     *
     * textForm.SetRole("MY_ROLE");
     * const role = textForm.GetRole();
     *
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form role: " + role);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetRole/
     */
    SetRole(role: string): boolean;

    /**
     * Sets the tag attribute to the current form.
     *
     * @param tag - The tag which will be added to the current container.
     * @since 9.0.0
     *
     * @example
     * ```js
     * // How do I attach a label or identifier to a form field in a document?
     *
     * // Organize or reference form fields programmatically using custom tags.
     *
     * const doc = Api.GetDocument();
     * let paragraph = doc.GetElement(0);
     *
     * const textForm = Api.CreateTextForm({
     * 	"key": "Personal information",
     * 	"tip": "Enter your first name",
     * 	"required": true,
     * 	"placeholder": "First name",
     * 	"comb": true,
     * 	"maxCharacters": 10,
     * 	"cellWidth": 3,
     * 	"multiLine": false,
     * 	"autoFit": false
     * });
     * textForm.SetTag('MY_TAG');
     * paragraph.AddElement(textForm);
     *
     * const formTag = textForm.GetTag();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form tag: " + formTag);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetTag/
     */
    SetTag(tag: string): boolean;

    /**
     * Sets the text properties to the current form.
     *
     * **Note:**
     * Used if possible for this type of form.
     *
     * @param textPr - The text properties that will be set to the current form.
     *
     * @example
     * ```js
     * // How do I change the font size and style of text inside a form field in a document?
     *
     * // Make form field text bold and larger to improve readability.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let textPr = Api.CreateTextPr();
     * textPr.SetFontSize(30);
     * textPr.SetBold(true);
     * textForm.SetTextPr(textPr);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetTextPr/
     */
    SetTextPr(textPr: ApiTextPr): boolean;

    /**
     * Sets the tip text to the current form.
     *
     * @param sText - Tip text.
     *
     * @example
     * ```js
     * // How do I add a tooltip that appears when hovering over a form field in a document?
     *
     * // Give users helpful instructions that appear when they hover over a field.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetTipText("Enter your first name");
     * let tipText = textForm.GetTipText();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Tip text: " + tipText);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetTipText/
     */
    SetTipText(sText: string): boolean;

    /**
     * Sets the value of the form field.
     *
     * @param value - The value to set.
     * @since 9.4.0
     *
     * @example
     * ```js
     * // The SetValue method provides a type-agnostic way to set form values across all form types.
     *
     * // Set the form value and add the form to a document paragraph.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Name", "tip": "Enter your name", "required": true, "placeholder": "Your name"});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetValue("Jane Doe");
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetValue/
     */
    SetValue(value: string | boolean): boolean;

    /**
     * Converts the current form to a fixed size form.
     *
     * @param width - The wrapper shape width measured in twentieths of a point (1/1440 of an inch).
     * @param height - The wrapper shape height measured in twentieths of a point (1/1440 of an inch).
     * @param keepPosition - Save position on the page (it can be a little bit slow, because it runs the document
     *   calculation).
     *
     * @example
     * ```js
     * // How do I set a specific width and height for a form field in a document?
     *
     * // Lock a form's dimensions so layout does not shift when content changes.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.ToFixed(10 * 240, 2 * 240);
     * let fixed = textForm.IsFixed();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document has a fixed size: " + fixed);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/ToFixed/
     */
    ToFixed(width: twips, height: twips, keepPosition?: boolean): boolean;

    /**
     * Converts the current form to an inline form.
     *
     * **Note:**
     * A picture form can't be converted to an inline form, as it's always a fixed-size object.
     *
     * @example
     * ```js
     * // How do I switch a form field from fixed size to inline positioning in a document?
     *
     * // Allow a form field to flow with surrounding text instead of occupying a fixed block.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.ToFixed(10 * 240, 2 * 240);
     * let copyForm = textForm.Copy();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddElement(copyForm);
     * doc.Push(paragraph);
     * copyForm.ToInline();
     * let fixed = textForm.IsFixed();
     * let fixedCopy = copyForm.IsFixed();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document has a fixed size: " + fixed);
     * paragraph.AddLineBreak();
     * paragraph.AddText("The second form from this document has a fixed size: " + fixedCopy);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/ToInline/
     */
    ToInline(): boolean;
  }

  /**
   * Class representing a collection of form roles.
   *
   * @since 9.0.0
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormRoles/
   */
  export interface ApiFormRoles {
    /**
     * Adds a new form role.
     *
     * @param name - The name of role being added.
     * @param props - The role properties.
     * @since 9.0.0
     *
     * @example
     * ```js
     * // How do I add a new role that can fill forms in a document?
     *
     * // Define a role name that controls who can edit form fields in a document.
     *
     * let doc = Api.GetDocument();
     * let roles = doc.GetFormRoles();
     * roles.Add("Customer");
     * roles.Add("Seller");
     * let paragraph = doc.GetElement(0);
     * roles.GetAllRoles().forEach(role => {
     *     paragraph.AddText(role);
     *     paragraph.AddLineBreak();
     * });
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormRoles/Methods/Add/
     */
    Add(name: string, props?: RoleProperties): boolean;

    /**
     * Lists all available roles.
     *
     * @since 9.0.0
     *
     * @example
     * ```js
     * // How do I see every role that can access form fields in a document?
     *
     * // List all the role names available for controlling form permissions in a document.
     *
     * let doc = Api.GetDocument();
     * let roles = doc.GetFormRoles();
     * roles.Add("Customer");
     * roles.Add("Seller");
     * let paragraph = doc.GetElement(0);
     * let orderIndex = 1;
     * roles.GetAllRoles().forEach(role => {
     *     paragraph.AddText(orderIndex + ": ");
     *     paragraph.AddText(role);
     *     paragraph.AddLineBreak();
     *     orderIndex++;
     * });
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormRoles/Methods/GetAllRoles/
     */
    GetAllRoles(): string[];

    /**
     * Returns a number of form roles.
     *
     * @since 9.0.0
     *
     * @example
     * ```js
     * // How do I find out how many roles exist in a document?
     *
     * // Check the total number of roles that have been created in a document.
     *
     * let doc = Api.GetDocument();
     * let roles = doc.GetFormRoles();
     * roles.Add("Customer");
     * roles.Add("Seller");
     * let paragraph = doc.GetElement(0);
     * roles.GetAllRoles().forEach(role => {
     *     paragraph.AddText(role);
     *     paragraph.AddLineBreak();
     * });
     * let numRoles = roles.GetCount();
     * paragraph.AddText("Number of roles: " + numRoles);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormRoles/Methods/GetCount/
     */
    GetCount(): number;

    /**
     * Returns the RGB color of the specified role.
     *
     * @param name - The role name.
     * @since 9.0.0
     *
     * @example
     * ```js
     * // How do I find out what color a role uses in a document?
     *
     * // Check the color value for a specific role in a document.
     *
     * let doc = Api.GetDocument();
     * let roles = doc.GetFormRoles();
     * roles.Add("Customer");
     * let color = roles.GetRoleColor("Customer");
     * let paragraph = doc.GetElement(0);
     * paragraph.AddText("Role color: rgb(" + color.r + ", " + color.g + ", " + color.b + ")");
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormRoles/Methods/GetRoleColor/
     */
    GetRoleColor(name: string): null | object;

    /**
     * Checks if a role with the specified name exists.
     *
     * @param name - The role name.
     * @since 9.0.0
     *
     * @example
     * ```js
     * // How do I verify whether a specific role is available in a document?
     *
     * // Test for the presence of a role and display the result in a document.
     *
     * let doc = Api.GetDocument();
     * let roles = doc.GetFormRoles();
     * roles.Add("Customer");
     * roles.Add("Seller");
     * let paragraph = doc.GetElement(0);
     * ["Customer", "CEO"].forEach(roleName => {
     *     if (roles.HaveRole(roleName)) {
     *         paragraph.AddText(roleName + " role is present in the form");
     *     } else {
     *         paragraph.AddText(roleName + " role is not present in the form");
     *     }
     *     paragraph.AddLineBreak();
     * });
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormRoles/Methods/HaveRole/
     */
    HaveRole(name: string): boolean;

    /**
     * Moves a role down in filling order.
     *
     * @param name - The role name.
     * @since 9.0.0
     *
     * @example
     * ```js
     * // How do I change the order of roles to place one later in the sequence in a document?
     *
     * // Reposition a role downward in the list and display the updated order in a document.
     *
     * let doc = Api.GetDocument();
     * let roles = doc.GetFormRoles();
     * roles.Add("Customer");
     * roles.Add("Seller");
     *
     * // Make the selected role the last one to fill
     * while (roles.MoveDown("Customer"));
     *
     * let paragraph = doc.GetElement(0);
     * let orderIndex = 1;
     * roles.GetAllRoles().forEach(role => {
     *     paragraph.AddText(orderIndex + ": ");
     *     paragraph.AddText(role);
     *     paragraph.AddLineBreak();
     *     orderIndex++;
     * });
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormRoles/Methods/MoveDown/
     */
    MoveDown(name: string): boolean;

    /**
     * Moves a role up in filling order.
     *
     * @param name - The role name.
     * @since 9.0.0
     *
     * @example
     * ```js
     * // How do I change the order of roles to place one earlier in the sequence in a document?
     *
     * // Reposition a role upward in the list and display the updated order in a document.
     *
     * let doc = Api.GetDocument();
     * let roles = doc.GetFormRoles();
     * roles.Add("Customer");
     * roles.Add("Seller");
     *
     * // Make the selected role the first one to fill
     * while (roles.MoveUp("Customer"));
     *
     * let paragraph = doc.GetElement(0);
     * let orderIndex = 1;
     * roles.GetAllRoles().forEach(role => {
     *     paragraph.AddText(orderIndex + ": ");
     *     paragraph.AddText(role);
     *     paragraph.AddLineBreak();
     *     orderIndex++;
     * });
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormRoles/Methods/MoveUp/
     */
    MoveUp(name: string): boolean;

    /**
     * Removes a role with the specified name.
     *
     * @param name - The name of role to be removed.
     * @param delegateRole - The name of the role to which all forms bound to this role will be delegated.
     * @since 9.0.0
     *
     * @example
     * ```js
     * // How do I remove a role that is no longer needed in a document?
     *
     * // Eliminate a specific role and show the remaining roles in a document.
     *
     * let doc = Api.GetDocument();
     * let roles = doc.GetFormRoles();
     * roles.Add("Customer");
     * roles.Add("Seller");
     * roles.Remove("Anyone");
     * let paragraph = doc.GetElement(0);
     * roles.GetAllRoles().forEach(role => {
     *     paragraph.AddText(role);
     *     paragraph.AddLineBreak();
     * });
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormRoles/Methods/Remove/
     */
    Remove(name: string, delegateRole?: string): boolean;

    /**
     * Sets the color for the specified role.
     *
     * @param name - The role name.
     * @param color - The role color.
     * @since 9.0.0
     *
     * @example
     * ```js
     * // How do I apply a specific color to identify a role in a document?
     *
     * // Change the color value for a role to customize its appearance in a document.
     *
     * let doc = Api.GetDocument();
     * let roles = doc.GetFormRoles();
     * roles.Add("Customer");
     * roles.SetRoleColor("Customer", "#C6E0B3");
     * doc.InsertTextForm({
     * 	key: "Name",
     * 	role: "Customer",
     * 	placeholder: "Enter your name"
     * });
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormRoles/Methods/SetRoleColor/
     */
    SetRoleColor(name: string, color: string): boolean;
  }

  /** Class representing the shape geometry. */
  export interface ApiGeometry {
  }

  /** Class representing gradient stop. */
  export interface ApiGradientStop {
  }

  /** Class representing a group of drawings. */
  export interface ApiGroup extends ApiDrawing {
  }

  /** Class representing a Paragraph hyperlink. */
  export interface ApiHyperlink {
  }

  /** Class representing an image. */
  export interface ApiImage extends ApiDrawing {
  }

  /** Class representing a container for the paragraph elements. */
  export interface ApiInlineLvlSdt {
  }

  /** Class representing a mathematical equation. */
  export interface ApiMath {
  }

  /** Class representing the numbering properties. */
  export interface ApiNumbering {
  }

  /** Class representing a reference to a specified level of the numbering. */
  export interface ApiNumberingLevel {
  }

  /** Class representing an Ole object. */
  export interface ApiOleObject extends ApiDrawing {
  }

  /** Class representing the paragraph properties. */
  export interface ApiParaPr {
  }

  /** Class representing a paragraph. */
  export interface ApiParagraph extends ApiParaPr {
  }

  /** Class representing a path in geometry. */
  export interface ApiPath {
  }

  /** Class representing a path command. */
  export interface ApiPathCommand {
  }

  /**
   * Class representing a document picture form.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiPictureForm/
   */
  export interface ApiPictureForm extends Omit<ApiFormBase, "GetClassType" | "GetValue" | "SetValue"> {
    /**
     * Clears the current form.
     *
     * @example
     * ```js
     * // How do I clear the content of a form in a document?
     *
     * // Reset a filled-in form field to blank so it is ready for new input in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetText("John Smith");
     * textForm.Clear();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document was cleared.");
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/Clear/
     */
    Clear(): boolean;

    /**
     * Copies the current form (copies with the shape if it exists).
     *
     * @example
     * ```js
     * // How do I copy a form field in a document?
     *
     * // Reuse an existing form by placing an identical copy elsewhere on the same paragraph.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let copyTextForm = textForm.Copy();
     * paragraph.AddLineBreak();
     * paragraph.AddElement(copyTextForm);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/Copy/
     */
    Copy(): ApiForm;

    /**
     * Removes a form and its content.
     *
     * If keepContent is true, the content is not deleted.
     *
     * @param keepContent - Specifies if the content will be deleted or not.
     * @returns returns false if form wasn't added to the document.
     * @since 9.2.0
     *
     * @example
     * ```js
     * // How do I delete a form field in a document?
     *
     * // Clean up a document by removing one of several inserted checkbox forms.
     *
     * const doc = Api.GetDocument();
     * const checkBoxForm = Api.CreateCheckBoxForm({
     * 	'key': 'Marital status',
     * 	'tip': 'Specify your marital status',
     * 	'placeholder': 'Marital status',
     * 	'radio': true
     * });
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(checkBoxForm);
     * paragraph.AddText(' Married');
     * let copyCheckBoxForm = checkBoxForm.Copy();
     * paragraph.AddLineBreak();
     * paragraph.AddElement(copyCheckBoxForm);
     * paragraph.AddText(' Single');
     * checkBoxForm.Delete();
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/Delete/
     */
    Delete(keepContent?: boolean): boolean;

    /**
     * Returns the background color of the current form.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetBackgroundColor/
     */
    GetBackgroundColor(): ApiColor;

    /**
     * Returns the border color of the current form.
     *
     * @since 9.1.0
     *
     * @example
     * ```js
     * // How do I get the border color of a form field in a document?
     *
     * // Verify a custom border color by reading its RGB values back after applying it.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetBorderColor(Api.RGB(255, 111, 61));
     * let borderColor = textForm.GetBorderColor();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Border color (RGB): (" + borderColor.r + ", " + borderColor.g + ", " + borderColor.b + ")");
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetBorderColor/
     */
    GetBorderColor(): ApiColor;

    /**
     * Returns a type of the ApiPictureForm class.
     *
     * @since 9.0.4
     *
     * @example
     * ```js
     * // How do I find out what category a picture form field belongs to in a document?
     *
     * // Confirm the kind of form element in use by reading its category label in a document.
     *
     * let doc = Api.GetDocument();
     * let pictureForm = Api.CreatePictureForm({"key": "Personal information", "tip": "Upload your photo", "required": true, "placeholder": "Photo", "scaleFlag": "tooBig", "lockAspectRatio": true, "respectBorders": false, "shiftX": 50, "shiftY": 50});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(pictureForm);
     * pictureForm.SetImage("https://static.onlyoffice.com/assets/docs/samples/img/onlyoffice_logo.png", Api.MillimetersToEmus(70), Api.MillimetersToEmus(80));
     * let classType = pictureForm.GetClassType();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Class type: " + classType);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiPictureForm/Methods/GetClassType/
     */
    GetClassType(): "pictureForm";

    /**
     * Returns the current form key.
     *
     * @example
     * ```js
     * // How do I get the key of a form field in a document?
     *
     * // Confirm the grouping key of a combo box by reading it back and displaying it.
     *
     * let doc = Api.GetDocument();
     * let comboBoxForm = Api.CreateComboBoxForm({"key": "Personal information", "tip": "Choose your country", "required": true, "placeholder": "Country", "editable": false, "autoFit": false, "items": ["Latvia", "USA", "UK"]});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(comboBoxForm);
     * let key = comboBoxForm.GetFormKey();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form key: " + key);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetFormKey/
     */
    GetFormKey(): string;

    /**
     * Returns a type of the current form.
     *
     * @example
     * ```js
     * // How do I get the type of a form field in a document?
     *
     * // Distinguish one form from another by printing its type identifier next to it.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let formType = textForm.GetFormType();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form type: " + formType);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetFormType/
     */
    GetFormType(): FormType;

    /**
     * Returns an image in the base64 format from the current picture form.
     *
     * @example
     * ```js
     * // How do I read back the image data from a picture form in a document?
     *
     * // Access the visual content embedded within a picture form in a document.
     *
     * let doc = Api.GetDocument();
     * let pictureForm = Api.CreatePictureForm({"key": "Personal information", "tip": "Upload your photo", "required": true, "placeholder": "Photo", "scaleFlag": "tooBig", "lockAspectRatio": true, "respectBorders": false, "shiftX": 50, "shiftY": 50});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(pictureForm);
     * pictureForm.SetImage("https://static.onlyoffice.com/assets/docs/samples/img/onlyoffice_logo.png", Api.MillimetersToEmus(70), Api.MillimetersToEmus(80));
     * let base64img = pictureForm.GetImage();
     * let drawing = Api.CreateImage(base64img, 60 * 36000, 35 * 36000);
     * paragraph.AddDrawing(drawing);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiPictureForm/Methods/GetImage/
     */
    GetImage(): Base64Img;

    /**
     * Returns an internal id of the current form.
     *
     * @since 9.2.0
     *
     * @example
     * ```js
     * // How do I get the internal ID of a form field in a document?
     *
     * // Uniquely track a form by reading its auto-assigned internal identifier.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let internalId = textForm.GetInternalId();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Internal id: " + internalId);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetInternalId/
     */
    GetInternalId(): string;

    /**
     * Returns the lock state of the current form.
     *
     * @since 9.3.0
     *
     * @example
     * ```js
     * // How do I find out whether a form field is locked in a document?
     *
     * // Protect a form, then confirm the lock is active by reading the lock state.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetLock(true);
     * let locked = textForm.GetLock();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document is locked: " + locked);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetLock/
     */
    GetLock(): boolean;

    /**
     * Returns the parent element (a paragraph or an inline content control) that directly contains the
     * current form.
     *
     * @returns returns null if the form has no parent.
     * @since 10.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetParent/
     */
    GetParent(): ParagraphLikeContainer;

    /**
     * Returns the picture position inside the current form.
     *
     * @returns Array of two numbers [shiftX, shiftY]
     *
     * @example
     * ```js
     * // How do I find out where a picture is positioned inside a form in a document?
     *
     * // Inspect the horizontal and vertical shift of an image inside a picture form in a document.
     *
     * let doc = Api.GetDocument();
     * let pictureForm = Api.CreatePictureForm({"key": "Personal information", "tip": "Upload your photo", "required": true, "placeholder": "Photo", "scaleFlag": "tooBig", "lockAspectRatio": true, "respectBorders": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(pictureForm);
     * pictureForm.SetImage("https://static.onlyoffice.com/assets/docs/samples/img/onlyoffice_logo.png", Api.MillimetersToEmus(70), Api.MillimetersToEmus(80));
     * pictureForm.SetPicturePosition(70, 70);
     * let position = pictureForm.GetPicturePosition();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Picture position: ");
     * paragraph.AddLineBreak();
     * for (let i = 0; i < position.length; i++ ){
     * 	let shift = position[i];
     * 	paragraph.AddText("" + shift);
     * 	paragraph.AddLineBreak();
     * }
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiPictureForm/Methods/GetPicturePosition/
     */
    GetPicturePosition(): percentage[];

    /**
     * Returns the placeholder text from the current form.
     *
     * @since 9.1.0
     *
     * @example
     * ```js
     * // How do I get the placeholder text of a form field in a document?
     *
     * // Confirm a hint label by retrieving the placeholder text after setting it on a form.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetPlaceholderText("First name");
     * let placeholderText = textForm.GetPlaceholderText();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Placeholder text: " + placeholderText);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetPlaceholderText/
     */
    GetPlaceholderText(): string;

    /**
     * Returns the position (index) of the current form within its parent element.
     *
     * @returns returns -1 if the form has no parent.
     * @since 10.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetPosInParent/
     */
    GetPosInParent(): number;

    /**
     * Returns the role of the current form.
     *
     * @since 9.0.0
     *
     * @example
     * ```js
     * // How do I get the role of a form field in a document?
     *
     * // Assign a custom role to a form, then read it back to verify the assignment.
     *
     * const doc = Api.GetDocument();
     * let paragraph = doc.GetElement(0);
     *
     * const roles = doc.GetFormRoles();
     * const rolePr = { "color": "#ffefbf" };
     * roles.Add("MY_ROLE", rolePr);
     *
     * const textForm = Api.CreateTextForm({
     * 	"tip": "Enter your first name",
     * 	"required": true,
     * 	"placeholder": "First name",
     * 	"comb": true,
     * 	"maxCharacters": 10,
     * 	"cellWidth": 3,
     * 	"multiLine": false,
     * 	"autoFit": false
     * });
     * paragraph.AddElement(textForm);
     *
     * textForm.SetRole("MY_ROLE");
     * const role = textForm.GetRole();
     *
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form role: " + role);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetRole/
     */
    GetRole(): string;

    /**
     * Returns the current scaling condition of the picture form.
     *
     * @example
     * ```js
     * // How do I check how a picture is scaled inside a form in a document?
     *
     * // Determine whether a picture shrinks, grows, or stays fixed within a form in a document.
     *
     * let doc = Api.GetDocument();
     * let pictureForm = Api.CreatePictureForm({"key": "Personal information", "tip": "Upload your photo", "required": true, "placeholder": "Photo", "scaleFlag": "tooBig", "lockAspectRatio": true, "respectBorders": false, "shiftX": 50, "shiftY": 50});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(pictureForm);
     * pictureForm.SetImage("https://static.onlyoffice.com/assets/docs/samples/img/onlyoffice_logo.png", Api.MillimetersToEmus(70), Api.MillimetersToEmus(80));
     * let scaleFlag = pictureForm.GetScaleFlag();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Picture scale flag: " + scaleFlag);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiPictureForm/Methods/GetScaleFlag/
     */
    GetScaleFlag(): ScaleFlag;

    /**
     * Returns the tag attribute for the current form.
     *
     * @since 9.0.0
     *
     * @example
     * ```js
     * // How do I get the tag of a form field in a document?
     *
     * // Label a form with a custom tag, then retrieve it to confirm it was stored correctly.
     *
     * const doc = Api.GetDocument();
     * let paragraph = doc.GetElement(0);
     *
     * const textForm = Api.CreateTextForm({
     * 	"key": "Personal information",
     * 	"tip": "Enter your first name",
     * 	"required": true,
     * 	"placeholder": "First name",
     * 	"comb": true,
     * 	"maxCharacters": 10,
     * 	"cellWidth": 3,
     * 	"multiLine": false,
     * 	"autoFit": false
     * });
     * textForm.SetTag('MY_TAG');
     * paragraph.AddElement(textForm);
     *
     * const formTag = textForm.GetTag();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form tag: " + formTag);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetTag/
     */
    GetTag(): string;

    /**
     * Returns the text from the current form.
     *
     * @example
     * ```js
     * // How do I read the current value typed into a form in a document?
     *
     * // Extract the raw content of a filled-in text field to use or display elsewhere in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let text = textForm.GetText();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form text: " + text);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetText/
     */
    GetText(): string;

    /**
     * Returns the text properties from the current form.
     *
     * **Note:**
     * Used if possible for this type of form.
     *
     * @example
     * ```js
     * // How do I access the font and style settings of a form field in a document?
     *
     * // Retrieve the current text properties of a form so they can be adjusted and reapplied in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let textPr = Api.CreateTextPr();
     * textPr.SetFontSize(30);
     * textPr.SetBold(true);
     * textForm.SetTextPr(textPr);
     * let formTextPr = textForm.GetTextPr();
     * formTextPr.SetItalic(true);
     * textForm.SetTextPr(formTextPr);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetTextPr/
     */
    GetTextPr(): ApiTextPr;

    /**
     * Returns the tip text of the current form.
     *
     * @example
     * ```js
     * // How do I read the instructional hint shown when a user hovers over a form field in a document?
     *
     * // Display the tooltip message of a drop-down form to verify what guidance is shown to the user in a document.
     *
     * let doc = Api.GetDocument();
     * let comboBoxForm = Api.CreateComboBoxForm({"key": "Personal information", "tip": "Choose your country", "required": true, "placeholder": "Country", "editable": false, "autoFit": false, "items": ["Latvia", "USA", "UK"]});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(comboBoxForm);
     * let tipText = comboBoxForm.GetTipText();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form tip text: " + tipText);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetTipText/
     */
    GetTipText(): string;

    /**
     * Returns the current image of the picture form as a base64 encoded string.
     *
     * @since 9.4.0
     *
     * @example
     * ```js
     * // The GetValue method of ApiPictureForm returns the image data currently stored in the form.
     *
     * // Create a picture form, add it to the document, and read its current value.
     *
     * let doc = Api.GetDocument();
     * let pictureForm = Api.CreatePictureForm({"key": "Photo", "tip": "Upload your photo", "required": true, "placeholder": "Photo"});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(pictureForm);
     * let value = pictureForm.GetValue();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Picture form value type: " + typeof value);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiPictureForm/Methods/GetValue/
     */
    GetValue(): string;

    /**
     * Returns a shape in which the form is placed to control the position and size of the fixed size form
     * frame.
     *
     * The null value will be returned for the inline forms.
     *
     * @returns returns the shape in which the form is placed.
     *
     * @example
     * ```js
     * // How do I get the surrounding shape of a form field so I can adjust its border or position in a document?
     *
     * // Apply a custom outline to the wrapper shape of a form field to make it stand out visually in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.ToFixed(10 * 240, 2 * 240);
     * let shape = textForm.GetWrapperShape();
     * let stroke = Api.CreateStroke(36000, Api.CreateSolidFill(Api.RGB(255, 111, 61)));
     * shape.SetOutLine(stroke);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetWrapperShape/
     */
    GetWrapperShape(): ApiShape;

    /**
     * Checks if the current form is filled.
     *
     * @since 9.4.0
     *
     * @example
     * ```js
     * // How do I tell if a form field has been filled out in a document?
     *
     * // Verify the fill status of multiple form fields to determine which ones still need input in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm1 = Api.CreateTextForm({"key": "Name1", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": false, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm1);
     * let textForm2 = Api.CreateTextForm({"key": "Name2", "tip": "Enter your last name", "required": true, "placeholder": "Last name", "comb": false, "multiLine": false, "autoFit": false});
     * paragraph.AddElement(textForm2);
     * textForm2.SetText("Smith");
     * let filled1 = textForm1.IsFilled();
     * let filled2 = textForm2.IsFilled();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first text form is filled: " + filled1);
     * doc.Push(paragraph);
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The second text form is filled: " + filled2);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/IsFilled/
     */
    IsFilled(): boolean;

    /**
     * Checks if the current form is fixed size.
     *
     * @example
     * ```js
     * // How do I find out if a form field is locked to a specific size in a document?
     *
     * // Confirm the fixed-size status of a form field before deciding whether layout adjustments are needed in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.ToFixed(10 * 240, 2 * 240);
     * let fixed = textForm.IsFixed();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document is fixed: " + fixed);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/IsFixed/
     */
    IsFixed(): boolean;

    /**
     * Checks if the aspect ratio of the current picture form is locked or not.
     *
     * @example
     * ```js
     * // How do I find out if a picture form preserves its original proportions in a document?
     *
     * // Confirm that resizing a picture form will not distort its image in a document.
     *
     * let doc = Api.GetDocument();
     * let pictureForm = Api.CreatePictureForm({"key": "Personal information", "tip": "Upload your photo", "required": true, "placeholder": "Photo", "scaleFlag": "tooBig", "respectBorders": false, "shiftX": 50, "shiftY": 50});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(pictureForm);
     * pictureForm.SetImage("https://static.onlyoffice.com/assets/docs/samples/img/onlyoffice_logo.png", Api.MillimetersToEmus(70), Api.MillimetersToEmus(80));
     * pictureForm.SetLockAspectRatio(true);
     * let lock = pictureForm.IsLockAspectRatio();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The aspect ratio of the picture form in this document is locked: " + lock);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiPictureForm/Methods/IsLockAspectRatio/
     */
    IsLockAspectRatio(): boolean;

    /**
     * Checks if the current form is required.
     *
     * @example
     * ```js
     * // How do I check if a form field must be filled out before the document is submitted in a document?
     *
     * // Confirm whether a form field is required so the result can be shown to the reader in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let required = textForm.IsRequired();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document is required: " + required);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/IsRequired/
     */
    IsRequired(): boolean;

    /**
     * Checks if the form border width is respected or not.
     *
     * @example
     * ```js
     * // How do I find out if a picture form prevents the image from overlapping its borders in a document?
     *
     * // Verify that the image inside a picture form stays within its frame when scaled in a document.
     *
     * let doc = Api.GetDocument();
     * let pictureForm = Api.CreatePictureForm({"key": "Personal information", "tip": "Upload your photo", "required": true, "placeholder": "Photo", "scaleFlag": "tooBig", "lockAspectRatio": true, "shiftX": 50, "shiftY": 50});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(pictureForm);
     * pictureForm.SetImage("https://static.onlyoffice.com/assets/docs/samples/img/onlyoffice_logo.png", Api.MillimetersToEmus(70), Api.MillimetersToEmus(80));
     * pictureForm.SetRespectBorders(true);
     * let respectBorders = pictureForm.IsRespectBorders();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The borders of the picture form in this document are respected when scaling the image: " + respectBorders);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiPictureForm/Methods/IsRespectBorders/
     */
    IsRespectBorders(): boolean;

    /**
     * Places a cursor before/after the current form.
     *
     * @param isAfter - Specifies whether a cursor will be placed before (false) or after (true) the current form.
     * @default isAfter = true
     * @since 8.1.0
     *
     * @example
     * ```js
     * // How do I place the cursor right after a form field to continue typing in a document?
     *
     * // Shift focus out of a completed form field so the next input lands in the surrounding text in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetText("The cursor will be placed after the current form.");
     * textForm.MoveCursorOutside(true);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/MoveCursorOutside/
     */
    MoveCursorOutside(isAfter?: boolean): boolean;

    /**
     * Sets the background color to the current form.
     *
     * @param color - The background color.
     * @since 9.1.0
     *
     * @example
     * ```js
     * // How do I fill a form field with a specific background color in a document?
     *
     * // Color the background of a form field to make it visually distinct from surrounding text in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetBackgroundColor(Api.HexColor('#FF6F3D'));
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetBackgroundColor/
     */
    SetBackgroundColor(color?: ApiColor): boolean;

    /**
     * Sets the border color to the current form.
     *
     * @param color - The border color.
     * @since 9.1.0
     *
     * @example
     * ```js
     * // How do I change the border color of a form field in a document?
     *
     * // Style the outline of a form field with a specific color to draw attention to it in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetBorderColor(Api.HexColor('#FF6F3D'));
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetBorderColor/
     */
    SetBorderColor(color?: ApiColor): boolean;

    /**
     * Sets a key to the current form.
     *
     * @param sKey - Form key.
     *
     * @example
     * ```js
     * // How do I set the key that identifies a form field in a document?
     *
     * // Label a form field with a custom key so it can be referenced or grouped with related fields in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetFormKey("Personal information");
     * let key = textForm.GetFormKey();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form key: " + key);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetFormKey/
     */
    SetFormKey(sKey: string): boolean;

    /**
     * Sets an image to the current picture form.
     *
     * @param imageSrc - The image source where the image to be inserted should be taken from (currently, only internet
     *   URL or base64 encoded images are supported).
     *
     * @example
     * ```js
     * // How do I insert a specific image into a picture form in a document?
     *
     * // Populate a picture form with an image from a web address in a document.
     *
     * let doc = Api.GetDocument();
     * let pictureForm = Api.CreatePictureForm({"tip": "Upload your photo", "required": true, "placeholder": "Photo", "scaleFlag": "tooBig", "lockAspectRatio": true, "respectBorders": false, "shiftX": 50, "shiftY": 50});
     * pictureForm.SetImage("https://static.onlyoffice.com/assets/docs/samples/img/onlyoffice_logo.png", Api.MillimetersToEmus(70), Api.MillimetersToEmus(80));
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(pictureForm);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiPictureForm/Methods/SetImage/
     */
    SetImage(imageSrc: string): boolean;

    /**
     * Sets the lock state of the current form.
     *
     * @param isLock - Specifies whether to lock the form (true) or unlock it (false).
     * @returns Returns true if the operation is successful.
     * @since 9.3.0
     *
     * @example
     * ```js
     * // How do I lock a form field so it cannot be changed in a document?
     *
     * // Protect specific fields from modification while keeping others editable.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetLock(true);
     * let locked = textForm.GetLock();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document is locked: " + locked);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetLock/
     */
    SetLock(isLock: boolean): boolean;

    /**
     * Locks the aspect ratio of the current picture form.
     *
     * @param isLock - Specifies if the aspect ratio of the current picture form will be locked (true) or not (false).
     * @default isLock = true
     *
     * @example
     * ```js
     * // How do I ensure a picture form keeps its original proportions when resized in a document?
     *
     * // Protect an image from distortion by locking the width-to-height ratio of its form in a document.
     *
     * let doc = Api.GetDocument();
     * let pictureForm = Api.CreatePictureForm({"key": "Personal information", "tip": "Upload your photo", "required": true, "placeholder": "Photo", "scaleFlag": "tooBig", "respectBorders": false, "shiftX": 50, "shiftY": 50});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(pictureForm);
     * pictureForm.SetImage("https://static.onlyoffice.com/assets/docs/samples/img/onlyoffice_logo.png", Api.MillimetersToEmus(70), Api.MillimetersToEmus(80));
     * pictureForm.SetLockAspectRatio(true);
     * let lock = pictureForm.IsLockAspectRatio();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The aspect ratio of the picture form in this document is locked: " + lock);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiPictureForm/Methods/SetLockAspectRatio/
     */
    SetLockAspectRatio(isLock?: boolean): boolean;

    /**
     * Sets the picture position inside the current form:
     *
     * - **0** - the picture is placed on the left/top;
     * - **50** - the picture is placed in the center;
     * - **100** - the picture is placed on the right/bottom.
     *
     * @param nShiftX - Horizontal position measured in percent.
     * @param nShiftY - Vertical position measured in percent.
     *
     * @example
     * ```js
     * // How do I shift an image to a specific spot inside a picture field in a document?
     *
     * // Reposition the image horizontally and vertically inside a picture field in a document.
     *
     * let doc = Api.GetDocument();
     * let pictureForm = Api.CreatePictureForm({"key": "Personal information", "tip": "Upload your photo", "required": true, "placeholder": "Photo", "scaleFlag": "tooBig", "lockAspectRatio": true, "respectBorders": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(pictureForm);
     * pictureForm.SetImage("https://static.onlyoffice.com/assets/docs/samples/img/onlyoffice_logo.png", Api.MillimetersToEmus(70), Api.MillimetersToEmus(80));
     * pictureForm.SetPicturePosition(70, 70);
     * let position = pictureForm.GetPicturePosition();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Picture position: ");
     * paragraph.AddLineBreak();
     * for (let i = 0; i < position.length; i++ ){
     * 	let shift = position[i];
     * 	paragraph.AddText("" + shift);
     * 	paragraph.AddLineBreak();
     * }
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiPictureForm/Methods/SetPicturePosition/
     */
    SetPicturePosition(nShiftX: percentage, nShiftY: percentage): boolean;

    /**
     * Sets the placeholder text to the current form.
     *
     * **Note:**
     * The placeholder text can't be set for checkbox or radio button forms.
     *
     * @param sText - The text that will be set to the current form.
     *
     * @example
     * ```js
     * // How do I add hint text inside an empty form field in a document?
     *
     * // Display a prompt inside a field before the user fills it in.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetPlaceholderText("First name");
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetPlaceholderText/
     */
    SetPlaceholderText(sText: string): boolean;

    /**
     * Specifies if the current form should be required.
     *
     * @param bRequired - Defines if the current form is required (true) or not (false).
     *
     * @example
     * ```js
     * // How do I make a form field mandatory in a document?
     *
     * // Ensure a field must be filled before the document form is submitted.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetRequired(true);
     * let required = textForm.IsRequired();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document is required: " + required);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetRequired/
     */
    SetRequired(bRequired: boolean): boolean;

    /**
     * Respects the form border width when scaling the image.
     *
     * @param isRespect - Specifies if the form border width will be respected (true) or not (false).
     * @default isRespect = true
     *
     * @example
     * ```js
     * // How do I keep a scaled image from overflowing the edges of its picture field in a document?
     *
     * // Ensure the border of a picture field stays visible no matter how the image is resized in a document.
     *
     * let doc = Api.GetDocument();
     * let pictureForm = Api.CreatePictureForm({"key": "Personal information", "tip": "Upload your photo", "required": true, "placeholder": "Photo", "scaleFlag": "tooBig", "lockAspectRatio": true, "shiftX": 50, "shiftY": 50});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(pictureForm);
     * pictureForm.SetImage("https://static.onlyoffice.com/assets/docs/samples/img/onlyoffice_logo.png", Api.MillimetersToEmus(70), Api.MillimetersToEmus(80));
     * pictureForm.SetRespectBorders(true);
     * let respectBorders = pictureForm.IsRespectBorders();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The borders of the picture form in this document are respected when scaling the image: " + respectBorders);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiPictureForm/Methods/SetRespectBorders/
     */
    SetRespectBorders(isRespect?: boolean): boolean;

    /**
     * Sets the role to the current form.
     *
     * @param role - The role which will be attached to the current form.
     * @since 9.0.0
     *
     * @example
     * ```js
     * // How do I associate a form field with a specific role in a document?
     *
     * // Restrict which signers or participants are responsible for a given field.
     *
     * const doc = Api.GetDocument();
     * let paragraph = doc.GetElement(0);
     *
     * const roles = doc.GetFormRoles();
     * const rolePr = { "color": "#ffefbf" };
     * roles.Add("MY_ROLE", rolePr);
     *
     * const textForm = Api.CreateTextForm({
     * 	"tip": "Enter your first name",
     * 	"required": true,
     * 	"placeholder": "First name",
     * 	"comb": true,
     * 	"maxCharacters": 10,
     * 	"cellWidth": 3,
     * 	"multiLine": false,
     * 	"autoFit": false
     * });
     * paragraph.AddElement(textForm);
     *
     * textForm.SetRole("MY_ROLE");
     * const role = textForm.GetRole();
     *
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form role: " + role);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetRole/
     */
    SetRole(role: string): boolean;

    /**
     * Sets the scaling condition to the current picture form.
     *
     * @param sScaleFlag - Picture scaling condition: "always", "never", "tooBig" or "tooSmall".
     *
     * @example
     * ```js
     * // How do I control whether an image shrinks or grows to match the size of a picture field in a document?
     *
     * // Decide the conditions under which an image adjusts its size inside a picture field in a document.
     *
     * let doc = Api.GetDocument();
     * let pictureForm = Api.CreatePictureForm({"key": "Personal information", "tip": "Upload your photo", "required": true, "placeholder": "Photo", "lockAspectRatio": true, "respectBorders": false, "shiftX": 50, "shiftY": 50});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(pictureForm);
     * pictureForm.SetImage("https://static.onlyoffice.com/assets/docs/samples/img/onlyoffice_logo.png", Api.MillimetersToEmus(70), Api.MillimetersToEmus(80));
     * pictureForm.SetScaleFlag("tooBig");
     * let scaleFlag = pictureForm.GetScaleFlag();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Picture scale flag: " + scaleFlag);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiPictureForm/Methods/SetScaleFlag/
     */
    SetScaleFlag(sScaleFlag: ScaleFlag): boolean;

    /**
     * Sets the tag attribute to the current form.
     *
     * @param tag - The tag which will be added to the current container.
     * @since 9.0.0
     *
     * @example
     * ```js
     * // How do I attach a label or identifier to a form field in a document?
     *
     * // Organize or reference form fields programmatically using custom tags.
     *
     * const doc = Api.GetDocument();
     * let paragraph = doc.GetElement(0);
     *
     * const textForm = Api.CreateTextForm({
     * 	"key": "Personal information",
     * 	"tip": "Enter your first name",
     * 	"required": true,
     * 	"placeholder": "First name",
     * 	"comb": true,
     * 	"maxCharacters": 10,
     * 	"cellWidth": 3,
     * 	"multiLine": false,
     * 	"autoFit": false
     * });
     * textForm.SetTag('MY_TAG');
     * paragraph.AddElement(textForm);
     *
     * const formTag = textForm.GetTag();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form tag: " + formTag);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetTag/
     */
    SetTag(tag: string): boolean;

    /**
     * Sets the text properties to the current form.
     *
     * **Note:**
     * Used if possible for this type of form.
     *
     * @param textPr - The text properties that will be set to the current form.
     *
     * @example
     * ```js
     * // How do I change the font size and style of text inside a form field in a document?
     *
     * // Make form field text bold and larger to improve readability.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let textPr = Api.CreateTextPr();
     * textPr.SetFontSize(30);
     * textPr.SetBold(true);
     * textForm.SetTextPr(textPr);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetTextPr/
     */
    SetTextPr(textPr: ApiTextPr): boolean;

    /**
     * Sets the tip text to the current form.
     *
     * @param sText - Tip text.
     *
     * @example
     * ```js
     * // How do I add a tooltip that appears when hovering over a form field in a document?
     *
     * // Give users helpful instructions that appear when they hover over a field.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetTipText("Enter your first name");
     * let tipText = textForm.GetTipText();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Tip text: " + tipText);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetTipText/
     */
    SetTipText(sText: string): boolean;

    /**
     * Sets an image to the picture form.
     *
     * @param value - The image source (URL or base64 encoded image).
     * @since 9.4.0
     *
     * @example
     * ```js
     * // The SetValue method of ApiPictureForm is a shorthand for SetImage that fits the unified value interface.
     *
     * // Create a picture form and assign an image from a URL using SetValue.
     *
     * let doc = Api.GetDocument();
     * let pictureForm = Api.CreatePictureForm({"key": "Photo", "tip": "Upload your photo", "required": true, "placeholder": "Photo"});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(pictureForm);
     * pictureForm.SetValue("https://static.onlyoffice.com/assets/docs/samples/img/onlyoffice_logo.png");
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiPictureForm/Methods/SetValue/
     */
    SetValue(value: string): boolean;

    /**
     * Converts the current form to a fixed size form.
     *
     * @param width - The wrapper shape width measured in twentieths of a point (1/1440 of an inch).
     * @param height - The wrapper shape height measured in twentieths of a point (1/1440 of an inch).
     * @param keepPosition - Save position on the page (it can be a little bit slow, because it runs the document
     *   calculation).
     *
     * @example
     * ```js
     * // How do I set a specific width and height for a form field in a document?
     *
     * // Lock a form's dimensions so layout does not shift when content changes.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.ToFixed(10 * 240, 2 * 240);
     * let fixed = textForm.IsFixed();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document has a fixed size: " + fixed);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/ToFixed/
     */
    ToFixed(width: twips, height: twips, keepPosition?: boolean): boolean;

    /**
     * Converts the current form to an inline form.
     *
     * **Note:**
     * A picture form can't be converted to an inline form, as it's always a fixed-size object.
     *
     * @example
     * ```js
     * // How do I switch a form field from fixed size to inline positioning in a document?
     *
     * // Allow a form field to flow with surrounding text instead of occupying a fixed block.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.ToFixed(10 * 240, 2 * 240);
     * let copyForm = textForm.Copy();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddElement(copyForm);
     * doc.Push(paragraph);
     * copyForm.ToInline();
     * let fixed = textForm.IsFixed();
     * let fixedCopy = copyForm.IsFixed();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document has a fixed size: " + fixed);
     * paragraph.AddLineBreak();
     * paragraph.AddText("The second form from this document has a fixed size: " + fixedCopy);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/ToInline/
     */
    ToInline(): boolean;
  }

  /** Class representing a Preset Color. */
  export interface ApiPresetColor extends ApiUniColor {
  }

  /** Class representing an RGB Color. */
  export interface ApiRGBColor extends ApiUniColor {
  }

  /**
   * Class representing a continuous region in a document.
   * Each Range object is determined by the position of the start and end characters.
   */
  export interface ApiRange {
  }

  export interface ApiRangeTextPr extends ApiTextPr {
  }

  /** Class representing a small text block called 'run'. */
  export interface ApiRun extends ApiTextPr {
  }

  /** Class representing a Scheme Color. */
  export interface ApiSchemeColor extends ApiUniColor {
  }

  /** Class representing a document section. */
  export interface ApiSection {
  }

  /** Class representing a shadow. */
  export interface ApiShadow {
  }

  /** Class representing a shape. */
  export interface ApiShape extends ApiDrawing {
  }

  /** Class representing the shading of text, a paragraph, a table or a table cell. */
  export interface ApiShd {
  }

  /**
   * Class representing a document picture form.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiSignatureForm/
   */
  export interface ApiSignatureForm extends Omit<ApiFormBase, "GetClassType" | "GetValue" | "SetValue"> {
    /**
     * Clears the current form.
     *
     * @example
     * ```js
     * // How do I clear the content of a form in a document?
     *
     * // Reset a filled-in form field to blank so it is ready for new input in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetText("John Smith");
     * textForm.Clear();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document was cleared.");
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/Clear/
     */
    Clear(): boolean;

    /**
     * Copies the current form (copies with the shape if it exists).
     *
     * @example
     * ```js
     * // How do I copy a form field in a document?
     *
     * // Reuse an existing form by placing an identical copy elsewhere on the same paragraph.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let copyTextForm = textForm.Copy();
     * paragraph.AddLineBreak();
     * paragraph.AddElement(copyTextForm);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/Copy/
     */
    Copy(): ApiForm;

    /**
     * Removes a form and its content.
     *
     * If keepContent is true, the content is not deleted.
     *
     * @param keepContent - Specifies if the content will be deleted or not.
     * @returns returns false if form wasn't added to the document.
     * @since 9.2.0
     *
     * @example
     * ```js
     * // How do I delete a form field in a document?
     *
     * // Clean up a document by removing one of several inserted checkbox forms.
     *
     * const doc = Api.GetDocument();
     * const checkBoxForm = Api.CreateCheckBoxForm({
     * 	'key': 'Marital status',
     * 	'tip': 'Specify your marital status',
     * 	'placeholder': 'Marital status',
     * 	'radio': true
     * });
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(checkBoxForm);
     * paragraph.AddText(' Married');
     * let copyCheckBoxForm = checkBoxForm.Copy();
     * paragraph.AddLineBreak();
     * paragraph.AddElement(copyCheckBoxForm);
     * paragraph.AddText(' Single');
     * checkBoxForm.Delete();
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/Delete/
     */
    Delete(keepContent?: boolean): boolean;

    /**
     * Returns the background color of the current form.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetBackgroundColor/
     */
    GetBackgroundColor(): ApiColor;

    /**
     * Returns the border color of the current form.
     *
     * @since 9.1.0
     *
     * @example
     * ```js
     * // How do I get the border color of a form field in a document?
     *
     * // Verify a custom border color by reading its RGB values back after applying it.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetBorderColor(Api.RGB(255, 111, 61));
     * let borderColor = textForm.GetBorderColor();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Border color (RGB): (" + borderColor.r + ", " + borderColor.g + ", " + borderColor.b + ")");
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetBorderColor/
     */
    GetBorderColor(): ApiColor;

    /**
     * Returns a type of the ApiSignatureForm class.
     *
     * @since 9.4.0
     *
     * @example
     * ```js
     * // How do I find out what category a form object belongs to in a document?
     *
     * // Identify the kind of element a signature form represents in a document.
     *
     * let doc = Api.GetDocument();
     * let signatureForm = Api.CreateSignatureForm({"key": "Signature", "tip": "Please sign here", "placeholder": "Signature"});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(signatureForm);
     * let classType = signatureForm.GetClassType();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Class type: " + classType);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiSignatureForm/Methods/GetClassType/
     */
    GetClassType(): "signatureForm";

    /**
     * Returns the current form key.
     *
     * @example
     * ```js
     * // How do I get the key of a form field in a document?
     *
     * // Confirm the grouping key of a combo box by reading it back and displaying it.
     *
     * let doc = Api.GetDocument();
     * let comboBoxForm = Api.CreateComboBoxForm({"key": "Personal information", "tip": "Choose your country", "required": true, "placeholder": "Country", "editable": false, "autoFit": false, "items": ["Latvia", "USA", "UK"]});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(comboBoxForm);
     * let key = comboBoxForm.GetFormKey();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form key: " + key);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetFormKey/
     */
    GetFormKey(): string;

    /**
     * Returns a type of the current form.
     *
     * @example
     * ```js
     * // How do I get the type of a form field in a document?
     *
     * // Distinguish one form from another by printing its type identifier next to it.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let formType = textForm.GetFormType();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form type: " + formType);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetFormType/
     */
    GetFormType(): FormType;

    /**
     * Returns an internal id of the current form.
     *
     * @since 9.2.0
     *
     * @example
     * ```js
     * // How do I get the internal ID of a form field in a document?
     *
     * // Uniquely track a form by reading its auto-assigned internal identifier.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let internalId = textForm.GetInternalId();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Internal id: " + internalId);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetInternalId/
     */
    GetInternalId(): string;

    /**
     * Returns the lock state of the current form.
     *
     * @since 9.3.0
     *
     * @example
     * ```js
     * // How do I find out whether a form field is locked in a document?
     *
     * // Protect a form, then confirm the lock is active by reading the lock state.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetLock(true);
     * let locked = textForm.GetLock();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document is locked: " + locked);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetLock/
     */
    GetLock(): boolean;

    /**
     * Returns the parent element (a paragraph or an inline content control) that directly contains the
     * current form.
     *
     * @returns returns null if the form has no parent.
     * @since 10.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetParent/
     */
    GetParent(): ParagraphLikeContainer;

    /**
     * Returns the placeholder text from the current form.
     *
     * @since 9.1.0
     *
     * @example
     * ```js
     * // How do I get the placeholder text of a form field in a document?
     *
     * // Confirm a hint label by retrieving the placeholder text after setting it on a form.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetPlaceholderText("First name");
     * let placeholderText = textForm.GetPlaceholderText();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Placeholder text: " + placeholderText);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetPlaceholderText/
     */
    GetPlaceholderText(): string;

    /**
     * Returns the position (index) of the current form within its parent element.
     *
     * @returns returns -1 if the form has no parent.
     * @since 10.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetPosInParent/
     */
    GetPosInParent(): number;

    /**
     * Returns the role of the current form.
     *
     * @since 9.0.0
     *
     * @example
     * ```js
     * // How do I get the role of a form field in a document?
     *
     * // Assign a custom role to a form, then read it back to verify the assignment.
     *
     * const doc = Api.GetDocument();
     * let paragraph = doc.GetElement(0);
     *
     * const roles = doc.GetFormRoles();
     * const rolePr = { "color": "#ffefbf" };
     * roles.Add("MY_ROLE", rolePr);
     *
     * const textForm = Api.CreateTextForm({
     * 	"tip": "Enter your first name",
     * 	"required": true,
     * 	"placeholder": "First name",
     * 	"comb": true,
     * 	"maxCharacters": 10,
     * 	"cellWidth": 3,
     * 	"multiLine": false,
     * 	"autoFit": false
     * });
     * paragraph.AddElement(textForm);
     *
     * textForm.SetRole("MY_ROLE");
     * const role = textForm.GetRole();
     *
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form role: " + role);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetRole/
     */
    GetRole(): string;

    /**
     * Returns the tag attribute for the current form.
     *
     * @since 9.0.0
     *
     * @example
     * ```js
     * // How do I get the tag of a form field in a document?
     *
     * // Label a form with a custom tag, then retrieve it to confirm it was stored correctly.
     *
     * const doc = Api.GetDocument();
     * let paragraph = doc.GetElement(0);
     *
     * const textForm = Api.CreateTextForm({
     * 	"key": "Personal information",
     * 	"tip": "Enter your first name",
     * 	"required": true,
     * 	"placeholder": "First name",
     * 	"comb": true,
     * 	"maxCharacters": 10,
     * 	"cellWidth": 3,
     * 	"multiLine": false,
     * 	"autoFit": false
     * });
     * textForm.SetTag('MY_TAG');
     * paragraph.AddElement(textForm);
     *
     * const formTag = textForm.GetTag();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form tag: " + formTag);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetTag/
     */
    GetTag(): string;

    /**
     * Returns the text from the current form.
     *
     * @example
     * ```js
     * // How do I read the current value typed into a form in a document?
     *
     * // Extract the raw content of a filled-in text field to use or display elsewhere in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let text = textForm.GetText();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form text: " + text);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetText/
     */
    GetText(): string;

    /**
     * Returns the text properties from the current form.
     *
     * **Note:**
     * Used if possible for this type of form.
     *
     * @example
     * ```js
     * // How do I access the font and style settings of a form field in a document?
     *
     * // Retrieve the current text properties of a form so they can be adjusted and reapplied in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let textPr = Api.CreateTextPr();
     * textPr.SetFontSize(30);
     * textPr.SetBold(true);
     * textForm.SetTextPr(textPr);
     * let formTextPr = textForm.GetTextPr();
     * formTextPr.SetItalic(true);
     * textForm.SetTextPr(formTextPr);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetTextPr/
     */
    GetTextPr(): ApiTextPr;

    /**
     * Returns the tip text of the current form.
     *
     * @example
     * ```js
     * // How do I read the instructional hint shown when a user hovers over a form field in a document?
     *
     * // Display the tooltip message of a drop-down form to verify what guidance is shown to the user in a document.
     *
     * let doc = Api.GetDocument();
     * let comboBoxForm = Api.CreateComboBoxForm({"key": "Personal information", "tip": "Choose your country", "required": true, "placeholder": "Country", "editable": false, "autoFit": false, "items": ["Latvia", "USA", "UK"]});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(comboBoxForm);
     * let tipText = comboBoxForm.GetTipText();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form tip text: " + tipText);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetTipText/
     */
    GetTipText(): string;

    /**
     * Returns the current image of the signature form as a base64 encoded string.
     *
     * @since 9.4.0
     *
     * @example
     * ```js
     * // The GetValue method of ApiSignatureForm returns the signature image data stored in the form.
     *
     * // Create a signature form, add it to the document, and read its current value.
     *
     * let doc = Api.GetDocument();
     * let signatureForm = Api.CreateSignatureForm({"key": "Signature", "tip": "Please sign here", "required": true, "placeholder": "Signature"});
     * signatureForm.Value = "https://static.onlyoffice.com/assets/docs/samples/img/onlyoffice_logo.png";
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(signatureForm);
     * let value = signatureForm.GetValue();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Signature form value: " + value);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiSignatureForm/Methods/GetValue/
     */
    GetValue(): string;

    /**
     * Returns a shape in which the form is placed to control the position and size of the fixed size form
     * frame.
     *
     * The null value will be returned for the inline forms.
     *
     * @returns returns the shape in which the form is placed.
     *
     * @example
     * ```js
     * // How do I get the surrounding shape of a form field so I can adjust its border or position in a document?
     *
     * // Apply a custom outline to the wrapper shape of a form field to make it stand out visually in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.ToFixed(10 * 240, 2 * 240);
     * let shape = textForm.GetWrapperShape();
     * let stroke = Api.CreateStroke(36000, Api.CreateSolidFill(Api.RGB(255, 111, 61)));
     * shape.SetOutLine(stroke);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetWrapperShape/
     */
    GetWrapperShape(): ApiShape;

    /**
     * Checks if the current form is filled.
     *
     * @since 9.4.0
     *
     * @example
     * ```js
     * // How do I tell if a form field has been filled out in a document?
     *
     * // Verify the fill status of multiple form fields to determine which ones still need input in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm1 = Api.CreateTextForm({"key": "Name1", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": false, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm1);
     * let textForm2 = Api.CreateTextForm({"key": "Name2", "tip": "Enter your last name", "required": true, "placeholder": "Last name", "comb": false, "multiLine": false, "autoFit": false});
     * paragraph.AddElement(textForm2);
     * textForm2.SetText("Smith");
     * let filled1 = textForm1.IsFilled();
     * let filled2 = textForm2.IsFilled();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first text form is filled: " + filled1);
     * doc.Push(paragraph);
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The second text form is filled: " + filled2);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/IsFilled/
     */
    IsFilled(): boolean;

    /**
     * Checks if the current form is fixed size.
     *
     * @example
     * ```js
     * // How do I find out if a form field is locked to a specific size in a document?
     *
     * // Confirm the fixed-size status of a form field before deciding whether layout adjustments are needed in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.ToFixed(10 * 240, 2 * 240);
     * let fixed = textForm.IsFixed();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document is fixed: " + fixed);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/IsFixed/
     */
    IsFixed(): boolean;

    /**
     * Checks if the current form is required.
     *
     * @example
     * ```js
     * // How do I check if a form field must be filled out before the document is submitted in a document?
     *
     * // Confirm whether a form field is required so the result can be shown to the reader in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let required = textForm.IsRequired();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document is required: " + required);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/IsRequired/
     */
    IsRequired(): boolean;

    /**
     * Places a cursor before/after the current form.
     *
     * @param isAfter - Specifies whether a cursor will be placed before (false) or after (true) the current form.
     * @default isAfter = true
     * @since 8.1.0
     *
     * @example
     * ```js
     * // How do I place the cursor right after a form field to continue typing in a document?
     *
     * // Shift focus out of a completed form field so the next input lands in the surrounding text in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetText("The cursor will be placed after the current form.");
     * textForm.MoveCursorOutside(true);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/MoveCursorOutside/
     */
    MoveCursorOutside(isAfter?: boolean): boolean;

    /**
     * Sets the background color to the current form.
     *
     * @param color - The background color.
     * @since 9.1.0
     *
     * @example
     * ```js
     * // How do I fill a form field with a specific background color in a document?
     *
     * // Color the background of a form field to make it visually distinct from surrounding text in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetBackgroundColor(Api.HexColor('#FF6F3D'));
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetBackgroundColor/
     */
    SetBackgroundColor(color?: ApiColor): boolean;

    /**
     * Sets the border color to the current form.
     *
     * @param color - The border color.
     * @since 9.1.0
     *
     * @example
     * ```js
     * // How do I change the border color of a form field in a document?
     *
     * // Style the outline of a form field with a specific color to draw attention to it in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetBorderColor(Api.HexColor('#FF6F3D'));
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetBorderColor/
     */
    SetBorderColor(color?: ApiColor): boolean;

    /**
     * Sets a key to the current form.
     *
     * @param sKey - Form key.
     *
     * @example
     * ```js
     * // How do I set the key that identifies a form field in a document?
     *
     * // Label a form field with a custom key so it can be referenced or grouped with related fields in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetFormKey("Personal information");
     * let key = textForm.GetFormKey();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form key: " + key);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetFormKey/
     */
    SetFormKey(sKey: string): boolean;

    /**
     * Sets the lock state of the current form.
     *
     * @param isLock - Specifies whether to lock the form (true) or unlock it (false).
     * @returns Returns true if the operation is successful.
     * @since 9.3.0
     *
     * @example
     * ```js
     * // How do I lock a form field so it cannot be changed in a document?
     *
     * // Protect specific fields from modification while keeping others editable.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetLock(true);
     * let locked = textForm.GetLock();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document is locked: " + locked);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetLock/
     */
    SetLock(isLock: boolean): boolean;

    /**
     * Sets the placeholder text to the current form.
     *
     * **Note:**
     * The placeholder text can't be set for checkbox or radio button forms.
     *
     * @param sText - The text that will be set to the current form.
     *
     * @example
     * ```js
     * // How do I add hint text inside an empty form field in a document?
     *
     * // Display a prompt inside a field before the user fills it in.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetPlaceholderText("First name");
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetPlaceholderText/
     */
    SetPlaceholderText(sText: string): boolean;

    /**
     * Specifies if the current form should be required.
     *
     * @param bRequired - Defines if the current form is required (true) or not (false).
     *
     * @example
     * ```js
     * // How do I make a form field mandatory in a document?
     *
     * // Ensure a field must be filled before the document form is submitted.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetRequired(true);
     * let required = textForm.IsRequired();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document is required: " + required);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetRequired/
     */
    SetRequired(bRequired: boolean): boolean;

    /**
     * Sets the role to the current form.
     *
     * @param role - The role which will be attached to the current form.
     * @since 9.0.0
     *
     * @example
     * ```js
     * // How do I associate a form field with a specific role in a document?
     *
     * // Restrict which signers or participants are responsible for a given field.
     *
     * const doc = Api.GetDocument();
     * let paragraph = doc.GetElement(0);
     *
     * const roles = doc.GetFormRoles();
     * const rolePr = { "color": "#ffefbf" };
     * roles.Add("MY_ROLE", rolePr);
     *
     * const textForm = Api.CreateTextForm({
     * 	"tip": "Enter your first name",
     * 	"required": true,
     * 	"placeholder": "First name",
     * 	"comb": true,
     * 	"maxCharacters": 10,
     * 	"cellWidth": 3,
     * 	"multiLine": false,
     * 	"autoFit": false
     * });
     * paragraph.AddElement(textForm);
     *
     * textForm.SetRole("MY_ROLE");
     * const role = textForm.GetRole();
     *
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form role: " + role);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetRole/
     */
    SetRole(role: string): boolean;

    /**
     * Sets the tag attribute to the current form.
     *
     * @param tag - The tag which will be added to the current container.
     * @since 9.0.0
     *
     * @example
     * ```js
     * // How do I attach a label or identifier to a form field in a document?
     *
     * // Organize or reference form fields programmatically using custom tags.
     *
     * const doc = Api.GetDocument();
     * let paragraph = doc.GetElement(0);
     *
     * const textForm = Api.CreateTextForm({
     * 	"key": "Personal information",
     * 	"tip": "Enter your first name",
     * 	"required": true,
     * 	"placeholder": "First name",
     * 	"comb": true,
     * 	"maxCharacters": 10,
     * 	"cellWidth": 3,
     * 	"multiLine": false,
     * 	"autoFit": false
     * });
     * textForm.SetTag('MY_TAG');
     * paragraph.AddElement(textForm);
     *
     * const formTag = textForm.GetTag();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form tag: " + formTag);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetTag/
     */
    SetTag(tag: string): boolean;

    /**
     * Sets the text properties to the current form.
     *
     * **Note:**
     * Used if possible for this type of form.
     *
     * @param textPr - The text properties that will be set to the current form.
     *
     * @example
     * ```js
     * // How do I change the font size and style of text inside a form field in a document?
     *
     * // Make form field text bold and larger to improve readability.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let textPr = Api.CreateTextPr();
     * textPr.SetFontSize(30);
     * textPr.SetBold(true);
     * textForm.SetTextPr(textPr);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetTextPr/
     */
    SetTextPr(textPr: ApiTextPr): boolean;

    /**
     * Sets the tip text to the current form.
     *
     * @param sText - Tip text.
     *
     * @example
     * ```js
     * // How do I add a tooltip that appears when hovering over a form field in a document?
     *
     * // Give users helpful instructions that appear when they hover over a field.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetTipText("Enter your first name");
     * let tipText = textForm.GetTipText();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Tip text: " + tipText);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetTipText/
     */
    SetTipText(sText: string): boolean;

    /**
     * Sets an image to the signature form.
     *
     * @param value - The image source (URL or base64 encoded image).
     * @since 9.4.0
     *
     * @example
     * ```js
     * // The SetValue method of ApiSignatureForm is a shorthand for SetImage that fits the unified value interface.
     *
     * // Create a signature form and assign a signature image from a URL using SetValue.
     *
     * let doc = Api.GetDocument();
     * let signatureForm = Api.CreateSignatureForm({"key": "Signature", "tip": "Please sign here", "required": true, "placeholder": "Signature"});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(signatureForm);
     * signatureForm.SetValue("https://static.onlyoffice.com/assets/docs/samples/img/onlyoffice_logo.png");
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiSignatureForm/Methods/SetValue/
     */
    SetValue(value: string): boolean;

    /**
     * Converts the current form to a fixed size form.
     *
     * @param width - The wrapper shape width measured in twentieths of a point (1/1440 of an inch).
     * @param height - The wrapper shape height measured in twentieths of a point (1/1440 of an inch).
     * @param keepPosition - Save position on the page (it can be a little bit slow, because it runs the document
     *   calculation).
     *
     * @example
     * ```js
     * // How do I set a specific width and height for a form field in a document?
     *
     * // Lock a form's dimensions so layout does not shift when content changes.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.ToFixed(10 * 240, 2 * 240);
     * let fixed = textForm.IsFixed();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document has a fixed size: " + fixed);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/ToFixed/
     */
    ToFixed(width: twips, height: twips, keepPosition?: boolean): boolean;

    /**
     * Converts the current form to an inline form.
     *
     * **Note:**
     * A picture form can't be converted to an inline form, as it's always a fixed-size object.
     *
     * @example
     * ```js
     * // How do I switch a form field from fixed size to inline positioning in a document?
     *
     * // Allow a form field to flow with surrounding text instead of occupying a fixed block.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.ToFixed(10 * 240, 2 * 240);
     * let copyForm = textForm.Copy();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddElement(copyForm);
     * doc.Push(paragraph);
     * copyForm.ToInline();
     * let fixed = textForm.IsFixed();
     * let fixedCopy = copyForm.IsFixed();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document has a fixed size: " + fixed);
     * paragraph.AddLineBreak();
     * paragraph.AddText("The second form from this document has a fixed size: " + fixedCopy);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/ToInline/
     */
    ToInline(): boolean;
  }

  /** Class representing a smart art. */
  export interface ApiSmartArt extends ApiDrawing {
  }

  /** Class representing a stroke. */
  export interface ApiStroke {
  }

  /** Class representing a style. */
  export interface ApiStyle {
  }

  /** Class representing a table. */
  export interface ApiTable extends ApiTablePr {
  }

  /** Class representing a table cell. */
  export interface ApiTableCell extends ApiTableCellPr {
  }

  /** Class representing the table cell properties. */
  export interface ApiTableCellPr {
  }

  /** Class representing the table properties. */
  export interface ApiTablePr {
  }

  /** Class representing a table row. */
  export interface ApiTableRow extends ApiTableRowPr {
  }

  /** Class representing the table row properties. */
  export interface ApiTableRowPr {
  }

  /**
   * Class representing a set of formatting properties which shall be conditionally applied to the parts
   * of a table
   * which match the requirement specified on the `Type`.
   */
  export interface ApiTableStylePr {
  }

  /**
   * Class representing a document text field.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiTextForm/
   */
  export interface ApiTextForm extends Omit<ApiFormBase, "GetClassType" | "GetValue" | "SetValue"> {
    /**
     * Clears the current form.
     *
     * @example
     * ```js
     * // How do I clear the content of a form in a document?
     *
     * // Reset a filled-in form field to blank so it is ready for new input in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetText("John Smith");
     * textForm.Clear();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document was cleared.");
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/Clear/
     */
    Clear(): boolean;

    /**
     * Copies the current form (copies with the shape if it exists).
     *
     * @example
     * ```js
     * // How do I copy a form field in a document?
     *
     * // Reuse an existing form by placing an identical copy elsewhere on the same paragraph.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let copyTextForm = textForm.Copy();
     * paragraph.AddLineBreak();
     * paragraph.AddElement(copyTextForm);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/Copy/
     */
    Copy(): ApiForm;

    /**
     * Removes a form and its content.
     *
     * If keepContent is true, the content is not deleted.
     *
     * @param keepContent - Specifies if the content will be deleted or not.
     * @returns returns false if form wasn't added to the document.
     * @since 9.2.0
     *
     * @example
     * ```js
     * // How do I delete a form field in a document?
     *
     * // Clean up a document by removing one of several inserted checkbox forms.
     *
     * const doc = Api.GetDocument();
     * const checkBoxForm = Api.CreateCheckBoxForm({
     * 	'key': 'Marital status',
     * 	'tip': 'Specify your marital status',
     * 	'placeholder': 'Marital status',
     * 	'radio': true
     * });
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(checkBoxForm);
     * paragraph.AddText(' Married');
     * let copyCheckBoxForm = checkBoxForm.Copy();
     * paragraph.AddLineBreak();
     * paragraph.AddElement(copyCheckBoxForm);
     * paragraph.AddText(' Single');
     * checkBoxForm.Delete();
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/Delete/
     */
    Delete(keepContent?: boolean): boolean;

    /**
     * Returns the allowed symbols for the current text field.
     *
     * @example
     * ```js
     * // How do I find out which symbols are permitted in a text field in a document?
     *
     * // Confirm the character restriction applied to a text entry area in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({ key: "Letters", placeholder: "Letters only" });
     * textForm.SetAllowedSymbols("abcdefghijklmnopqrstuvwxyz");
     * let allowedSymbols = textForm.GetAllowedSymbols();
     * let paragraph = doc.GetElement(0);
     * paragraph.AddText("Allowed symbols: " + allowedSymbols);
     * paragraph.Push(textForm);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiTextForm/Methods/GetAllowedSymbols/
     */
    GetAllowedSymbols(): string;

    /**
     * Returns the background color of the current form.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetBackgroundColor/
     */
    GetBackgroundColor(): ApiColor;

    /**
     * Returns the border color of the current form.
     *
     * @since 9.1.0
     *
     * @example
     * ```js
     * // How do I get the border color of a form field in a document?
     *
     * // Verify a custom border color by reading its RGB values back after applying it.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetBorderColor(Api.RGB(255, 111, 61));
     * let borderColor = textForm.GetBorderColor();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Border color (RGB): (" + borderColor.r + ", " + borderColor.g + ", " + borderColor.b + ")");
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetBorderColor/
     */
    GetBorderColor(): ApiColor;

    /**
     * Returns a limit of the text field characters.
     *
     * @returns if this method returns -1 -> the form has no limit for characters
     *
     * @example
     * ```js
     * // How do I check how many characters a text entry area is limited to in a document?
     *
     * // Verify the character cap set on a text field to ensure input constraints are correct in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetCharactersLimit(5);
     * textForm.SetText("John Smith");
     * let limit = textForm.GetCharactersLimit();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Characters limit: " + limit);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiTextForm/Methods/GetCharactersLimit/
     */
    GetCharactersLimit(): number;

    /**
     * Returns a type of the ApiTextForm class.
     *
     * @since 9.0.4
     *
     * @example
     * ```js
     * // How do I find out what type of element a text entry area represents in a document?
     *
     * // Confirm the category of a text field to distinguish it from other elements in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let classType = textForm.GetClassType();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Class type: " + classType);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiTextForm/Methods/GetClassType/
     */
    GetClassType(): "textForm";

    /**
     * Returns the current form key.
     *
     * @example
     * ```js
     * // How do I get the key of a form field in a document?
     *
     * // Confirm the grouping key of a combo box by reading it back and displaying it.
     *
     * let doc = Api.GetDocument();
     * let comboBoxForm = Api.CreateComboBoxForm({"key": "Personal information", "tip": "Choose your country", "required": true, "placeholder": "Country", "editable": false, "autoFit": false, "items": ["Latvia", "USA", "UK"]});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(comboBoxForm);
     * let key = comboBoxForm.GetFormKey();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form key: " + key);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetFormKey/
     */
    GetFormKey(): string;

    /**
     * Returns a type of the current form.
     *
     * @example
     * ```js
     * // How do I get the type of a form field in a document?
     *
     * // Distinguish one form from another by printing its type identifier next to it.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let formType = textForm.GetFormType();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form type: " + formType);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetFormType/
     */
    GetFormType(): FormType;

    /**
     * Returns the format of the current text field.
     *
     * @example
     * ```js
     * // How do I check what format rule is set on a text entry area in a document?
     *
     * // Confirm the mask or pattern controlling user input in a text field in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({ key: "Code", placeholder: "Enter code" });
     * textForm.SetFormat({ type: "mask", value: "9-9-9" });
     * let format = textForm.GetFormat();
     * let paragraph = doc.GetElement(0);
     * paragraph.AddText("Text form format type: " + format.type + ", value: " + format.value);
     * paragraph.Push(textForm);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiTextForm/Methods/GetFormat/
     */
    GetFormat(): TextFormFormat;

    /**
     * Returns an internal id of the current form.
     *
     * @since 9.2.0
     *
     * @example
     * ```js
     * // How do I get the internal ID of a form field in a document?
     *
     * // Uniquely track a form by reading its auto-assigned internal identifier.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let internalId = textForm.GetInternalId();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Internal id: " + internalId);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetInternalId/
     */
    GetInternalId(): string;

    /**
     * Returns the lock state of the current form.
     *
     * @since 9.3.0
     *
     * @example
     * ```js
     * // How do I find out whether a form field is locked in a document?
     *
     * // Protect a form, then confirm the lock is active by reading the lock state.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetLock(true);
     * let locked = textForm.GetLock();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document is locked: " + locked);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetLock/
     */
    GetLock(): boolean;

    /**
     * Returns the parent element (a paragraph or an inline content control) that directly contains the
     * current form.
     *
     * @returns returns null if the form has no parent.
     * @since 10.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetParent/
     */
    GetParent(): ParagraphLikeContainer;

    /**
     * Returns the placeholder text from the current form.
     *
     * @since 9.1.0
     *
     * @example
     * ```js
     * // How do I get the placeholder text of a form field in a document?
     *
     * // Confirm a hint label by retrieving the placeholder text after setting it on a form.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetPlaceholderText("First name");
     * let placeholderText = textForm.GetPlaceholderText();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Placeholder text: " + placeholderText);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetPlaceholderText/
     */
    GetPlaceholderText(): string;

    /**
     * Returns the position (index) of the current form within its parent element.
     *
     * @returns returns -1 if the form has no parent.
     * @since 10.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetPosInParent/
     */
    GetPosInParent(): number;

    /**
     * Returns the role of the current form.
     *
     * @since 9.0.0
     *
     * @example
     * ```js
     * // How do I get the role of a form field in a document?
     *
     * // Assign a custom role to a form, then read it back to verify the assignment.
     *
     * const doc = Api.GetDocument();
     * let paragraph = doc.GetElement(0);
     *
     * const roles = doc.GetFormRoles();
     * const rolePr = { "color": "#ffefbf" };
     * roles.Add("MY_ROLE", rolePr);
     *
     * const textForm = Api.CreateTextForm({
     * 	"tip": "Enter your first name",
     * 	"required": true,
     * 	"placeholder": "First name",
     * 	"comb": true,
     * 	"maxCharacters": 10,
     * 	"cellWidth": 3,
     * 	"multiLine": false,
     * 	"autoFit": false
     * });
     * paragraph.AddElement(textForm);
     *
     * textForm.SetRole("MY_ROLE");
     * const role = textForm.GetRole();
     *
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form role: " + role);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetRole/
     */
    GetRole(): string;

    /**
     * Returns the tag attribute for the current form.
     *
     * @since 9.0.0
     *
     * @example
     * ```js
     * // How do I get the tag of a form field in a document?
     *
     * // Label a form with a custom tag, then retrieve it to confirm it was stored correctly.
     *
     * const doc = Api.GetDocument();
     * let paragraph = doc.GetElement(0);
     *
     * const textForm = Api.CreateTextForm({
     * 	"key": "Personal information",
     * 	"tip": "Enter your first name",
     * 	"required": true,
     * 	"placeholder": "First name",
     * 	"comb": true,
     * 	"maxCharacters": 10,
     * 	"cellWidth": 3,
     * 	"multiLine": false,
     * 	"autoFit": false
     * });
     * textForm.SetTag('MY_TAG');
     * paragraph.AddElement(textForm);
     *
     * const formTag = textForm.GetTag();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form tag: " + formTag);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetTag/
     */
    GetTag(): string;

    /**
     * Returns the text from the current form.
     *
     * @example
     * ```js
     * // How do I read the current value typed into a form in a document?
     *
     * // Extract the raw content of a filled-in text field to use or display elsewhere in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let text = textForm.GetText();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form text: " + text);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetText/
     */
    GetText(): string;

    /**
     * Returns the text properties from the current form.
     *
     * **Note:**
     * Used if possible for this type of form.
     *
     * @example
     * ```js
     * // How do I access the font and style settings of a form field in a document?
     *
     * // Retrieve the current text properties of a form so they can be adjusted and reapplied in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let textPr = Api.CreateTextPr();
     * textPr.SetFontSize(30);
     * textPr.SetBold(true);
     * textForm.SetTextPr(textPr);
     * let formTextPr = textForm.GetTextPr();
     * formTextPr.SetItalic(true);
     * textForm.SetTextPr(formTextPr);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetTextPr/
     */
    GetTextPr(): ApiTextPr;

    /**
     * Returns the tip text of the current form.
     *
     * @example
     * ```js
     * // How do I read the instructional hint shown when a user hovers over a form field in a document?
     *
     * // Display the tooltip message of a drop-down form to verify what guidance is shown to the user in a document.
     *
     * let doc = Api.GetDocument();
     * let comboBoxForm = Api.CreateComboBoxForm({"key": "Personal information", "tip": "Choose your country", "required": true, "placeholder": "Country", "editable": false, "autoFit": false, "items": ["Latvia", "USA", "UK"]});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(comboBoxForm);
     * let tipText = comboBoxForm.GetTipText();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form tip text: " + tipText);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetTipText/
     */
    GetTipText(): string;

    /**
     * Returns the current text value of the text form.
     *
     * @since 9.4.0
     *
     * @example
     * ```js
     * // The GetValue method of ApiTextForm returns the current text content of the field.
     *
     * // Set a value to the text form and then read it back to display in the document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetValue("John Smith");
     * let value = textForm.GetValue();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Text form value: " + value);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiTextForm/Methods/GetValue/
     */
    GetValue(): string;

    /**
     * Returns a shape in which the form is placed to control the position and size of the fixed size form
     * frame.
     *
     * The null value will be returned for the inline forms.
     *
     * @returns returns the shape in which the form is placed.
     *
     * @example
     * ```js
     * // How do I get the surrounding shape of a form field so I can adjust its border or position in a document?
     *
     * // Apply a custom outline to the wrapper shape of a form field to make it stand out visually in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.ToFixed(10 * 240, 2 * 240);
     * let shape = textForm.GetWrapperShape();
     * let stroke = Api.CreateStroke(36000, Api.CreateSolidFill(Api.RGB(255, 111, 61)));
     * shape.SetOutLine(stroke);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetWrapperShape/
     */
    GetWrapperShape(): ApiShape;

    /**
     * Checks if the text field content is autofit, i.e. whether the font size adjusts to the size of the
     * fixed size form.
     *
     * @example
     * ```js
     * // How do I find out if a text field is set to shrink text to fit in a document?
     *
     * // Confirm the auto-fit setting on a form field before adjusting its layout in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let autoFit = textForm.IsAutoFit();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first text form from this document is autofit: " + autoFit);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiTextForm/Methods/IsAutoFit/
     */
    IsAutoFit(): boolean;

    /**
     * Checks if the text field is a comb of characters with the same cell width.
     *
     * @example
     * ```js
     * // How do I determine if a text field uses a comb layout for its characters in a document?
     *
     * // Verify that equal-width character cells are active on a text field in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "maxCharacters": 10, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetComb(true);
     * let comb = textForm.IsComb();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first text form from this document is comb: " + comb);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiTextForm/Methods/IsComb/
     */
    IsComb(): boolean;

    /**
     * Checks if the current form is filled.
     *
     * @since 9.4.0
     *
     * @example
     * ```js
     * // How do I tell if a form field has been filled out in a document?
     *
     * // Verify the fill status of multiple form fields to determine which ones still need input in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm1 = Api.CreateTextForm({"key": "Name1", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": false, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm1);
     * let textForm2 = Api.CreateTextForm({"key": "Name2", "tip": "Enter your last name", "required": true, "placeholder": "Last name", "comb": false, "multiLine": false, "autoFit": false});
     * paragraph.AddElement(textForm2);
     * textForm2.SetText("Smith");
     * let filled1 = textForm1.IsFilled();
     * let filled2 = textForm2.IsFilled();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first text form is filled: " + filled1);
     * doc.Push(paragraph);
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The second text form is filled: " + filled2);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/IsFilled/
     */
    IsFilled(): boolean;

    /**
     * Checks if the current form is fixed size.
     *
     * @example
     * ```js
     * // How do I find out if a form field is locked to a specific size in a document?
     *
     * // Confirm the fixed-size status of a form field before deciding whether layout adjustments are needed in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.ToFixed(10 * 240, 2 * 240);
     * let fixed = textForm.IsFixed();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document is fixed: " + fixed);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/IsFixed/
     */
    IsFixed(): boolean;

    /**
     * Checks if the current text field is multiline.
     *
     * @example
     * ```js
     * // How do I find out if a form field allows line breaks and wrapping in a document?
     *
     * // Confirm that a text field supports more than one line of text in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let multiline = textForm.IsMultiline();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first text form from this document is multiline: " + multiline);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiTextForm/Methods/IsMultiline/
     */
    IsMultiline(): boolean;

    /**
     * Checks if the current form is required.
     *
     * @example
     * ```js
     * // How do I check if a form field must be filled out before the document is submitted in a document?
     *
     * // Confirm whether a form field is required so the result can be shown to the reader in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let required = textForm.IsRequired();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document is required: " + required);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/IsRequired/
     */
    IsRequired(): boolean;

    /**
     * Places a cursor before/after the current form.
     *
     * @param isAfter - Specifies whether a cursor will be placed before (false) or after (true) the current form.
     * @default isAfter = true
     * @since 8.1.0
     *
     * @example
     * ```js
     * // How do I place the cursor right after a form field to continue typing in a document?
     *
     * // Shift focus out of a completed form field so the next input lands in the surrounding text in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetText("The cursor will be placed after the current form.");
     * textForm.MoveCursorOutside(true);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/MoveCursorOutside/
     */
    MoveCursorOutside(isAfter?: boolean): boolean;

    /**
     * Sets the allowed symbols for the current text field.
     *
     * Only the specified characters will be accepted as input.
     *
     * @param symbols - A string of allowed characters.
     *
     * @example
     * ```js
     * // How do I limit which characters a user can type into a text field in a document?
     *
     * // Prevent unwanted input by defining the exact characters allowed in a text field in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({ key: "Digits", placeholder: "Digits only" });
     * textForm.SetAllowedSymbols("0123456789");
     * let paragraph = doc.GetElement(0);
     * paragraph.AddText("Text form accepting digits only: ");
     * paragraph.Push(textForm);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiTextForm/Methods/SetAllowedSymbols/
     */
    SetAllowedSymbols(symbols: string): boolean;

    /**
     * Specifies if the text field content should be autofit, i.e. whether the font size adjusts to the
     * size of the fixed size form.
     *
     * @param bAutoFit - Defines if the text field content is autofit (true) or not (false).
     *
     * @example
     * ```js
     * // How do I make a text field automatically adjust its size to match the entered text in a document?
     *
     * // Keep a text field tidy by letting it expand or shrink to fit its content in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "multiLine": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.ToFixed(6 * 240, 2 * 240);
     * textForm.SetAutoFit(true);
     * let autoFit = textForm.IsAutoFit();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first text form from this document is autofit: " + autoFit);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiTextForm/Methods/SetAutoFit/
     */
    SetAutoFit(bAutoFit: boolean): boolean;

    /**
     * Sets the background color to the current form.
     *
     * @param color - The background color.
     * @since 9.1.0
     *
     * @example
     * ```js
     * // How do I fill a form field with a specific background color in a document?
     *
     * // Color the background of a form field to make it visually distinct from surrounding text in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetBackgroundColor(Api.HexColor('#FF6F3D'));
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetBackgroundColor/
     */
    SetBackgroundColor(color?: ApiColor): boolean;

    /**
     * Sets the border color to the current form.
     *
     * @param color - The border color.
     * @since 9.1.0
     *
     * @example
     * ```js
     * // How do I change the border color of a form field in a document?
     *
     * // Style the outline of a form field with a specific color to draw attention to it in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetBorderColor(Api.HexColor('#FF6F3D'));
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetBorderColor/
     */
    SetBorderColor(color?: ApiColor): boolean;

    /**
     * Sets the cell width to the applied comb of characters.
     *
     * @param nCellWidth - The cell width measured in millimeters. If this parameter is not specified or equal to 0 or
     *   less, then the width will be set automatically. Must be >= 1 and <= 558.8.
     * @default nCellWidth = 0
     *
     * @example
     * ```js
     * // How do I control the width of individual character boxes in a text field in a document?
     *
     * // Adjust character cell width to ensure uniform spacing across a comb text field in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "maxCharacters": 10, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetComb(true);
     * textForm.SetCellWidth(7);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiTextForm/Methods/SetCellWidth/
     */
    SetCellWidth(nCellWidth?: mm): boolean;

    /**
     * Sets a limit to the text field characters.
     *
     * @param nChars - The maximum number of characters in the text field. If this parameter is equal to -1, no limit
     *   will be set. A limit is required to be set if a comb of characters is applied. Maximum value for
     *   this parameter is 1000000.
     *
     * @example
     * ```js
     * // How do I cap the total number of characters allowed in a text field in a document?
     *
     * // Enforce a maximum input length to keep text field entries concise in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetCharactersLimit(5);
     * textForm.SetText("John Smith");
     * let limit = textForm.GetCharactersLimit();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Characters limit: " + limit);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiTextForm/Methods/SetCharactersLimit/
     */
    SetCharactersLimit(nChars: number): boolean;

    /**
     * Specifies if the text field should be a comb of characters with the same cell width.
     *
     * The maximum number of characters must be set to a positive value.
     *
     * @param bComb - Defines if the text field is a comb of characters (true) or not (false).
     *
     * @example
     * ```js
     * // How do I split a text field into evenly spaced individual character cells in a document?
     *
     * // Give a text field a structured grid appearance by enabling its comb layout in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "maxCharacters": 10, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetComb(true);
     * let comb = textForm.IsComb();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first text form from this document is comb: " + comb);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiTextForm/Methods/SetComb/
     */
    SetComb(bComb: boolean): boolean;

    /**
     * Sets a key to the current form.
     *
     * @param sKey - Form key.
     *
     * @example
     * ```js
     * // How do I set the key that identifies a form field in a document?
     *
     * // Label a form field with a custom key so it can be referenced or grouped with related fields in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetFormKey("Personal information");
     * let key = textForm.GetFormKey();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form key: " + key);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetFormKey/
     */
    SetFormKey(sKey: string): boolean;

    /**
     * Sets the format for the current text field.
     *
     * @param format - The format to set.
     *
     * @example
     * ```js
     * // How do I restrict a text field to accept only a certain type of input in a document?
     *
     * // Enforce a structured input pattern on a text field to guide user entries in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({ key: "Phone", placeholder: "Enter digits" });
     * textForm.SetFormat({ type: "digit" });
     * let paragraph = doc.GetElement(0);
     * paragraph.AddText("Text form with digit format: ");
     * paragraph.Push(textForm);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiTextForm/Methods/SetFormat/
     */
    SetFormat(format: TextFormFormat): boolean;

    /**
     * Sets the lock state of the current form.
     *
     * @param isLock - Specifies whether to lock the form (true) or unlock it (false).
     * @returns Returns true if the operation is successful.
     * @since 9.3.0
     *
     * @example
     * ```js
     * // How do I lock a form field so it cannot be changed in a document?
     *
     * // Protect specific fields from modification while keeping others editable.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetLock(true);
     * let locked = textForm.GetLock();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document is locked: " + locked);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetLock/
     */
    SetLock(isLock: boolean): boolean;

    /**
     * Specifies if the current text field should be miltiline.
     *
     * @param bMultiline - Defines if the current text field is multiline (true) or not (false).
     * @returns return false, if the text field is not fixed size.
     *
     * @example
     * ```js
     * // How do I enable a text field to accept line breaks and wrap across multiple rows in a document?
     *
     * // Expand a text field so users can enter longer responses across several lines in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.ToFixed(3 * 240, 3 * 240);
     * textForm.SetMultiline(true);
     * let multiline = textForm.IsMultiline();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first text form from this document is multiline: " + multiline);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiTextForm/Methods/SetMultiline/
     */
    SetMultiline(bMultiline: boolean): boolean;

    /**
     * Sets the placeholder text to the current form.
     *
     * **Note:**
     * The placeholder text can't be set for checkbox or radio button forms.
     *
     * @param sText - The text that will be set to the current form.
     *
     * @example
     * ```js
     * // How do I add hint text inside an empty form field in a document?
     *
     * // Display a prompt inside a field before the user fills it in.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetPlaceholderText("First name");
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetPlaceholderText/
     */
    SetPlaceholderText(sText: string): boolean;

    /**
     * Specifies if the current form should be required.
     *
     * @param bRequired - Defines if the current form is required (true) or not (false).
     *
     * @example
     * ```js
     * // How do I make a form field mandatory in a document?
     *
     * // Ensure a field must be filled before the document form is submitted.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetRequired(true);
     * let required = textForm.IsRequired();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document is required: " + required);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetRequired/
     */
    SetRequired(bRequired: boolean): boolean;

    /**
     * Sets the role to the current form.
     *
     * @param role - The role which will be attached to the current form.
     * @since 9.0.0
     *
     * @example
     * ```js
     * // How do I associate a form field with a specific role in a document?
     *
     * // Restrict which signers or participants are responsible for a given field.
     *
     * const doc = Api.GetDocument();
     * let paragraph = doc.GetElement(0);
     *
     * const roles = doc.GetFormRoles();
     * const rolePr = { "color": "#ffefbf" };
     * roles.Add("MY_ROLE", rolePr);
     *
     * const textForm = Api.CreateTextForm({
     * 	"tip": "Enter your first name",
     * 	"required": true,
     * 	"placeholder": "First name",
     * 	"comb": true,
     * 	"maxCharacters": 10,
     * 	"cellWidth": 3,
     * 	"multiLine": false,
     * 	"autoFit": false
     * });
     * paragraph.AddElement(textForm);
     *
     * textForm.SetRole("MY_ROLE");
     * const role = textForm.GetRole();
     *
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form role: " + role);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetRole/
     */
    SetRole(role: string): boolean;

    /**
     * Sets the tag attribute to the current form.
     *
     * @param tag - The tag which will be added to the current container.
     * @since 9.0.0
     *
     * @example
     * ```js
     * // How do I attach a label or identifier to a form field in a document?
     *
     * // Organize or reference form fields programmatically using custom tags.
     *
     * const doc = Api.GetDocument();
     * let paragraph = doc.GetElement(0);
     *
     * const textForm = Api.CreateTextForm({
     * 	"key": "Personal information",
     * 	"tip": "Enter your first name",
     * 	"required": true,
     * 	"placeholder": "First name",
     * 	"comb": true,
     * 	"maxCharacters": 10,
     * 	"cellWidth": 3,
     * 	"multiLine": false,
     * 	"autoFit": false
     * });
     * textForm.SetTag('MY_TAG');
     * paragraph.AddElement(textForm);
     *
     * const formTag = textForm.GetTag();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form tag: " + formTag);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetTag/
     */
    SetTag(tag: string): boolean;

    /**
     * Sets the text to the current text field.
     *
     * @param text - The text that will be set to the current text field.
     *
     * @example
     * ```js
     * // How do I pre-fill a text form with specific content in a document?
     *
     * // Populate a text form with a default value so the field is not empty in a document.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetText("John Smith");
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiTextForm/Methods/SetText/
     */
    SetText(text: string): boolean;

    /**
     * Sets the text properties to the current form.
     *
     * **Note:**
     * Used if possible for this type of form.
     *
     * @param textPr - The text properties that will be set to the current form.
     *
     * @example
     * ```js
     * // How do I change the font size and style of text inside a form field in a document?
     *
     * // Make form field text bold and larger to improve readability.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let textPr = Api.CreateTextPr();
     * textPr.SetFontSize(30);
     * textPr.SetBold(true);
     * textForm.SetTextPr(textPr);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetTextPr/
     */
    SetTextPr(textPr: ApiTextPr): boolean;

    /**
     * Sets the tip text to the current form.
     *
     * @param sText - Tip text.
     *
     * @example
     * ```js
     * // How do I add a tooltip that appears when hovering over a form field in a document?
     *
     * // Give users helpful instructions that appear when they hover over a field.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetTipText("Enter your first name");
     * let tipText = textForm.GetTipText();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Tip text: " + tipText);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetTipText/
     */
    SetTipText(sText: string): boolean;

    /**
     * Sets the text value of the text form.
     *
     * @param value - The text value to set.
     * @since 9.4.0
     *
     * @example
     * ```js
     * // The SetValue method fills the text form with the given string value.
     *
     * // Create a text form, set its value, and add it to the first paragraph.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetValue("John Smith");
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiTextForm/Methods/SetValue/
     */
    SetValue(value: string): boolean;

    /**
     * Converts the current form to a fixed size form.
     *
     * @param width - The wrapper shape width measured in twentieths of a point (1/1440 of an inch).
     * @param height - The wrapper shape height measured in twentieths of a point (1/1440 of an inch).
     * @param keepPosition - Save position on the page (it can be a little bit slow, because it runs the document
     *   calculation).
     *
     * @example
     * ```js
     * // How do I set a specific width and height for a form field in a document?
     *
     * // Lock a form's dimensions so layout does not shift when content changes.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.ToFixed(10 * 240, 2 * 240);
     * let fixed = textForm.IsFixed();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document has a fixed size: " + fixed);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/ToFixed/
     */
    ToFixed(width: twips, height: twips, keepPosition?: boolean): boolean;

    /**
     * Converts the current form to an inline form.
     *
     * **Note:**
     * A picture form can't be converted to an inline form, as it's always a fixed-size object.
     *
     * @example
     * ```js
     * // How do I switch a form field from fixed size to inline positioning in a document?
     *
     * // Allow a form field to flow with surrounding text instead of occupying a fixed block.
     *
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.ToFixed(10 * 240, 2 * 240);
     * let copyForm = textForm.Copy();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddElement(copyForm);
     * doc.Push(paragraph);
     * copyForm.ToInline();
     * let fixed = textForm.IsFixed();
     * let fixedCopy = copyForm.IsFixed();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document has a fixed size: " + fixed);
     * paragraph.AddLineBreak();
     * paragraph.AddText("The second form from this document has a fixed size: " + fixedCopy);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/ToInline/
     */
    ToInline(): boolean;
  }

  /** Class representing the text properties. */
  export interface ApiTextPr {
  }

  /** Class representing a text range within a presentation shape's text frame. */
  export interface ApiTextRange {
  }

  /** Class representing a base class for color types. */
  export interface ApiUniColor {
  }

  /** Class representing an unsupported element. */
  export interface ApiUnsupported {
  }

  /** Class representing the settings which are used to create a watermark. */
  export interface ApiWatermarkSettings {
  }

  export type EditorEventArgs = {
    /** The function called when the user clicks the "Complete & Submit" button. */
    onSubmitForm: [];
  };

  export type EditorEventName = keyof EditorEventArgs;

}

// ---- src/generated/forms-methods.ts ----
// Auto-generated from ONLYOFFICE/sdkjs JSDoc (common/apiBase_plugins.js + per-editor api_plugins.js).
// executeMethod names/args/returns for Forms. Run `npm run generate-plugin-methods` to regenerate.

// Requires ONLYOFFICE Docs Developer Edition (2, each tagged @requires below):
// EndGroupActions, StartGroupActions.

/** The addin field data. */
interface AddinFieldData {
  /** Field identifier. */
  FieldId: string;

  /** Field value. */
  Value: string;

  /** Field text content. */
  Content: string;
}

/**
 * The skinnable plugin button used in the plugin interface (used for visual plugins with their own
 * window only, i.e. isVisual == true and isInsideMode == false).
 */
interface Button {
  /** The label which is displayed on the button. */
  text: string;

  /** Defines if the button is primary or not. The primary flag affects the button skin only. */
  primary?: boolean;

  /** Defines if the button is shown in the viewer mode only or not. */
  isViewer?: boolean;

  /**
   * Translations for the text field. The object keys are the two letter language codes (ru, de, it,
   * etc.) and the values are the button label translation for each language.
   */
  textLocale?: localeTranslate;
}

/** Represents an RGBA color with components in the range [0, 255]. */
type Color = unknown;

/** The comment data. */
interface CommentData {
  /** The comment author. */
  UserName: string;

  /** The quote comment text. */
  QuoteText?: string;

  /** The comment text. */
  Text: string;

  /** The time when the comment was posted (in milliseconds). */
  Time?: string;

  /** The user ID of the comment author. */
  UserId?: string;

  /** Specifies if the comment is resolved (**true**) or not (**false**). */
  Solved?: boolean;

  /** An array containing the comment replies represented as the *CommentData* object. */
  Replies?: CommentData[];
}

/** The content control object. */
interface ContentControl {
  /**
   * A tag assigned to the content control. The same tag can be assigned to several content controls so
   * that you can make reference to them in your code.
   */
  Tag: string | number;

  /**
   * A unique content control identifier. It can be used to search for a certain content control and make
   * reference to it in your code.
   */
  Id: string;

  /** A value that defines if it is possible to delete and/or edit the content control or not. */
  Lock: ContentControlLock;

  /**
   * A unique internal identifier of the content control. It is used for all operations with content
   * controls.
   */
  InternalId: string;

  /** An alias of the content control. */
  Alias: string;

  /** The visualization type of the content control: **1** - frame (bounding box), **2** - hidden. */
  Appearance: 1 | 2;

  /** A unique form key. Present only if the content control is a form field. */
  FormKey?: string;

  /** A group key of the radio button. Present only if the content control is a radio button form field. */
  RadioGroup?: string;

  /** The current value of the form field. Present only if the content control is a form field. */
  FormValue?: string | boolean | Date;

  /** The tag color of the content control. Present only if the tag color is set. */
  Color?: object;

  /** The border color of the content control. Present only if the border color is set. */
  Border?: object;

  /** The shading color of the content control. Present only if the shading color is set. */
  Shd?: object;
}

/** The content control checkbox properties. */
interface ContentControlCheckBoxProperties {
  /** Defines if the content control checkbox is checked or not. */
  Checked: boolean;

  /** A symbol in the HTML code format that is used when the checkbox is checked. */
  CheckedSymbol: number;

  /** A symbol in the HTML code format that is used when the checkbox is not checked. */
  UncheckedSymbol: number;
}

/** The content control datepicker properties. */
interface ContentControlDatePickerProperties {
  /**
   * A format in which the date will be displayed.
   * For example: *"MM/DD/YYYY", "dddd\,\ mmmm\ dd\,\ yyyy", "DD\ MMMM\ YYYY", "MMMM\ DD\,\ YYYY",
   * "DD-MMM-YY", "MMMM\ YY", "MMM-YY", "MM/DD/YYYY\ hh:mm\ AM/PM", "MM/DD/YYYY\ hh:mm:ss\ AM/PM",
   * "hh:mm", "hh:mm:ss", "hh:mm\ AM/PM", "hh:mm:ss:\ AM/PM"*.
   */
  DateFormat: string;

  /** The current date and time. */
  Date: object;
}

/** The content control list element. */
interface ContentControlListElement {
  /** The element display text. */
  Display: string;

  /** The element value. */
  Value: string;
}

/**
 * A value that defines if it is possible to delete and/or edit the content control or not:
 *
 * - **0** - only deleting
 * - **1** - disable deleting or editing
 * - **2** - only editing
 * - **3** - full access
 */
type ContentControlLock = 0 | 1 | 2 | 3;

/** The content control parent properties. */
interface ContentControlParentPr {
  /** The content control parent. For example, oParagraph. */
  Parent: object;

  /** The content control position within the parent object. */
  Pos: number;

  /** A number of elements in the parent object. */
  Count: number;
}

/** The content control properties. */
interface ContentControlProperties {
  /**
   * A unique identifier of the content control. It can be used to search for a certain content control
   * and make reference to it in the code.
   */
  Id?: number;

  /**
   * A tag assigned to the content control. The same tag can be assigned to several content controls so
   * that it is possible to make reference to them in the code.
   */
  Tag: string;

  /** A value that defines if it is possible to delete and/or edit the content control or not. */
  Lock?: ContentControlLock;

  /** A unique internal identifier of the content control. */
  InternalId?: string;

  /** The alias attribute. */
  Alias?: string;

  /** The content control placeholder text. */
  PlaceHolderText?: string;

  /** Defines if the content control is shown as the bounding box (**1**) or not (**2**). */
  Appearance?: number;

  /** The color for the current content control in RGBA format. */
  Color?: Color;

  /** The background shading properties. */
  Shd?: { Color: Color };

  /** The border properties. */
  Border?: { Color: Color };
}

/** The content control properties and contents. */
interface ContentControlPropertiesAndContent {
  /** The content control properties. */
  ContentControlProperties?: ContentControlProperties;

  /**
   * A script that will be executed to generate the data within the content control (can be replaced with
   * the *Url* parameter).
   */
  Script: string;

  /** A link to the shared file (can be replaced with the *Script* parameter). */
  Url: string;
}

/**
 * A numeric value that specifies the content control type:
 *
 * - **1** - block content control
 * - **2** - inline content control
 * - **3** - row content control
 * - **4** - cell content control
 */
type ContentControlType = 1 | 2 | 3 | 4;

/** The context menu item. */
interface ContextMenuItem {
  /** The item ID. */
  id: string;

  /** The item text. */
  text: string;

  /** The item data (this data will be sent to the click event callback). */
  data?: string;

  /** Specifies if the current item is disabled or not. */
  disabled?: boolean;

  /**
   * The item icons (see the plugins
   * {@link https://api.onlyoffice.com/docs/plugins/configuration/configuration config} documentation).
   */
  icons?: string;

  /** An array containing the context menu items for the current item. */
  items: ContextMenuItem[];
}

/**
 * The document editing restrictions:
 *
 * - **none** - no editing restrictions,
 * - **comments** - allows editing comments,
 * - **forms** - allows editing form fields,
 * - **readOnly** - does not allow editing.
 */
type DocumentEditingRestrictions = 'none' | 'comments' | 'forms' | 'readOnly';

/**
 * The current editing restrictions, a combination of the flags:
 * **0x00** - no editing restrictions,
 * **0x01** - allows editing form fields,
 * **0x02** - allows editing comments and regions delimited by range permissions,
 * **0x04** - the document is signed and cannot be changed,
 * **0x80** - does not allow editing.
 */
type EditorRestrictions = number;

/**
 * Plugin event ("onDocumentContentReady", "onTargetPositionChanged", onClick", "onInputHelperClear",
 * "onInputHelperInput", etc.).
 */
type EventType = string;

/** The floating action button displayed over the editor area. */
interface FloatActionButton {
  /** The button ID. */
  id: string;

  /** The button text. */
  text?: string;

  /** The button hint. */
  hint?: string;

  /** The button data (this data will be sent to the click event callback). */
  data?: string;

  /**
   * The button icons, 28x28 px (see the plugins
   * {@link https://api.onlyoffice.com/docs/plugin-and-macros/structure/configuration/ config}
   * documentation).
   */
  icons?: string;

  /** Specifies if a button toggle is enabled or not. */
  enableToggle?: boolean;

  /** Specifies if the current button is disabled or not. */
  disabled?: boolean;

  /** Specifies if the current button is visible or not. */
  visible?: boolean;

  /** Specifies if the button must be removed from the editor area. */
  removed?: boolean;
}

/** The main floating action button item. */
interface FloatActionButtonsMainItem {
  /** The plugin guid. */
  guid: string;

  /** An array containing the floating action buttons for the plugin. */
  items: FloatActionButton[];
}

/** An object containing the font information. */
interface FontInfo {
  /** The font name. */
  m_wsFontName: string;

  /** The path to the file with the current font. */
  m_wsFontPath: string;

  /** The font number in the file if there is more than one font in the file. */
  m_lIndex: number;

  /** Specifies if the font characters are bold or not. */
  m_bBold: boolean;

  /** Specifies if the font characters are italic or not. */
  m_bItalic: boolean;

  /** Specifies if the current font is monospaced or not. */
  m_bIsFixed: boolean;

  /**
   * The PANOSE Typeface Classification Number, a compact 10-byte description of the font critical visual
   * characteristics, such as contrast, weight, and serif style.
   */
  m_aPanose: number[];

  /** The Unicode range encompassed by the font file (Bits 0-31). */
  m_ulUnicodeRange1: number;

  /** The Unicode range encompassed by the font file (Bits 32-63). */
  m_ulUnicodeRange2: number;

  /** The Unicode range encompassed by the font file (Bits 64-95). */
  m_ulUnicodeRange3: number;

  /** The Unicode range encompassed by the font file (Bits 96-127). */
  m_ulUnicodeRange4: number;

  /** The code pages encompassed by the font file (Bits 0-31). */
  m_ulCodePageRange1: number;

  /** The code pages encompassed by the font file (Bits 32-63). */
  m_ulCodePageRange2: number;

  /** The visual weight (stroke blackness or thickness) of the font characters (1-1000). */
  m_usWeigth: number;

  /** The relative change from the normal aspect ratio (width to height ratio). */
  m_usWidth: number;

  /** The font family class which values are assigned by IBM to each font family. */
  m_sFamilyClass: number;

  /**
   * The specific file type(s) used to store font data: **0** - *.fon, **1** - *.ttf, **2** - *.ttf,
   * *.otf (CFF), **3** - unknown font format.
   */
  m_eFontFormat: number;

  /** The arithmetic average of the escapement (width) of all non-zero width glyphs in the font. */
  m_shAvgCharWidth: number;

  /** The height above the baseline for a clipping region. */
  m_shAscent: number;

  /** The vertical extent below the baseline for a clipping region. */
  m_shDescent: number;

  /** The typographic line gap for the current font. */
  m_shLineGap: number;

  /**
   * The distance between the baseline and the approximate height of non-ascending lowercase letters
   * measured in FUnits.
   */
  m_shXHeight: number;

  /**
   * The distance between the baseline and the approximate height of uppercase letters measured in
   * FUnits.
   */
  m_shCapHeight: number;
}

/** An object containing the information about the base64 encoded *png* image. */
interface AscImageData {
  /** The image source in the base64 format. */
  src: string;

  /** The image width in pixels. */
  width: number;

  /** The image height in pixels. */
  height: number;

  /** Specifies how to adjust the image object in case of replacing the selected image. */
  replaceMode?: ReplaceImageMode;
}

/** An object containing the data about all the macros from the document. */
interface Macros {
  /** An array of macros codes (*[{"name": "Macros1", "value": "{macrosCode}"}]*). */
  macrosArray: string[];

  /** A current macro index. */
  current: number;
}

/** The OLE object data. */
interface OLEObjectData {
  /** OLE object data (internal format). */
  Data?: string;

  /** An image in the base64 format stored in the OLE object and used by the plugin. */
  AscImageData?: string;

  /**
   * An identifier of the plugin which can edit the current OLE object and must be of the *asc.{UUID}*
   * type.
   */
  ApplicationId?: string;

  /** The OLE object identifier which is used to work with OLE object added to the document. */
  InternalId?: string;

  /** An identifier of the drawing object containing the current OLE object. */
  ParaDrawingId?: string;

  /** The OLE object width measured in millimeters. */
  Width?: number;

  /** The OLE object height measured in millimeters. */
  Height?: number;

  /** The OLE object image width in pixels. */
  WidthPix?: number;

  /** The OLE object image height in pixels. */
  HeightPix?: number;
}

/** The OLE object properties */
interface OLEProperties {
  /** OLE object data (internal format). */
  data?: string;

  /** A link to the image (its visual representation) stored in the OLE object and used by the plugin. */
  imgSrc?: string;

  /**
   * An identifier of the plugin which can edit the current OLE object and must be of the *asc.{UUID}*
   * type.
   */
  guid?: string;

  /** The OLE object width measured in millimeters. */
  width?: number;

  /** The OLE object height measured in millimeters. */
  height?: number;

  /** The OLE object image width in pixels. */
  widthPix?: number;

  /** The OLE object image height in pixels. */
  heightPix?: number;
}

/** The plugin object. */
interface PluginData {
  /** The URL to plugin config. */
  url: string;

  /** The plugin identifier. It must be of the *asc.{UUID}* type. */
  guid: string;

  /** Specifies if the plugin can be removed (**true**) or not (**false**). */
  canRemoved: boolean;

  /**
   * The {@link https://api.onlyoffice.com/docs/plugins/configuration/configuration config} of the
   * installed plugin. The version is taken from the config and compared with the current one to check
   * for updates.
   */
  obj: object;
}

/** The plugin options. */
interface PluginOptions {
  /** The parameters which will be set for all plugins ({ "all" : { key, value } }). */
  all: object;

  /**
   * The parameters which will be set for a specific plugin. The plugin must be specified with the plugin
   * GUID of the asc.{UUID} type ({ "plugin_guid" : { keyForSpecificPlugin : valueForSpecificPlugin } }).
   */
  plugin_guid: object;
}

/** Specifies how to adjust the image object in case of replacing the selected image. */
type ReplaceImageMode = "fill" | "fit" | "original" | "stretch";

/** The current selection type ("none", "text", "drawing", or "slide"). */
type SelectionType = "none" | "text" | "drawing" | "slide" | "image";

/** This type specifies the preset shape geometry that will be used for a shape. */
type ShapeType = "accentBorderCallout1" | "accentBorderCallout2" | "accentBorderCallout3" | "accentCallout1" | "accentCallout2" | "accentCallout3" | "actionButtonBackPrevious" | "actionButtonBeginning" | "actionButtonBlank" | "actionButtonDocument" | "actionButtonEnd" | "actionButtonForwardNext" | "actionButtonHelp" | "actionButtonHome" | "actionButtonInformation" | "actionButtonMovie" | "actionButtonReturn" | "actionButtonSound" | "arc" | "bentArrow" | "bentConnector2" | "bentConnector3" | "bentConnector4" | "bentConnector5" | "bentUpArrow" | "bevel" | "blockArc" | "borderCallout1" | "borderCallout2" | "borderCallout3" | "bracePair" | "bracketPair" | "callout1" | "callout2" | "callout3" | "can" | "chartPlus" | "chartStar" | "chartX" | "chevron" | "chord" | "circularArrow" | "cloud" | "cloudCallout" | "corner" | "cornerTabs" | "cube" | "curvedConnector2" | "curvedConnector3" | "curvedConnector4" | "curvedConnector5" | "curvedDownArrow" | "curvedLeftArrow" | "curvedRightArrow" | "curvedUpArrow" | "decagon" | "diagStripe" | "diamond" | "dodecagon" | "donut" | "doubleWave" | "downArrow" | "downArrowCallout" | "ellipse" | "ellipseRibbon" | "ellipseRibbon2" | "flowChartAlternateProcess" | "flowChartCollate" | "flowChartConnector" | "flowChartDecision" | "flowChartDelay" | "flowChartDisplay" | "flowChartDocument" | "flowChartExtract" | "flowChartInputOutput" | "flowChartInternalStorage" | "flowChartMagneticDisk" | "flowChartMagneticDrum" | "flowChartMagneticTape" | "flowChartManualInput" | "flowChartManualOperation" | "flowChartMerge" | "flowChartMultidocument" | "flowChartOfflineStorage" | "flowChartOffpageConnector" | "flowChartOnlineStorage" | "flowChartOr" | "flowChartPredefinedProcess" | "flowChartPreparation" | "flowChartProcess" | "flowChartPunchedCard" | "flowChartPunchedTape" | "flowChartSort" | "flowChartSummingJunction" | "flowChartTerminator" | "foldedCorner" | "frame" | "funnel" | "gear6" | "gear9" | "halfFrame" | "heart" | "heptagon" | "hexagon" | "homePlate" | "horizontalScroll" | "irregularSeal1" | "irregularSeal2" | "leftArrow" | "leftArrowCallout" | "leftBrace" | "leftBracket" | "leftCircularArrow" | "leftRightArrow" | "leftRightArrowCallout" | "leftRightCircularArrow" | "leftRightRibbon" | "leftRightUpArrow" | "leftUpArrow" | "lightningBolt" | "line" | "lineInv" | "mathDivide" | "mathEqual" | "mathMinus" | "mathMultiply" | "mathNotEqual" | "mathPlus" | "moon" | "nonIsoscelesTrapezoid" | "noSmoking" | "notchedRightArrow" | "octagon" | "parallelogram" | "pentagon" | "pie" | "pieWedge" | "plaque" | "plaqueTabs" | "plus" | "quadArrow" | "quadArrowCallout" | "rect" | "ribbon" | "ribbon2" | "rightArrow" | "rightArrowCallout" | "rightBrace" | "rightBracket" | "round1Rect" | "round2DiagRect" | "round2SameRect" | "roundRect" | "rtTriangle" | "smileyFace" | "snip1Rect" | "snip2DiagRect" | "snip2SameRect" | "snipRoundRect" | "squareTabs" | "star10" | "star12" | "star16" | "star24" | "star32" | "star4" | "star5" | "star6" | "star7" | "star8" | "straightConnector1" | "stripedRightArrow" | "sun" | "swooshArrow" | "teardrop" | "trapezoid" | "triangle" | "upArrowCallout" | "upDownArrow" | "upDownArrow" | "upDownArrowCallout" | "uturnArrow" | "verticalScroll" | "wave" | "wedgeEllipseCallout" | "wedgeRectCallout" | "wedgeRoundRectCallout";

/**
 * Specifies if the whole text or only its part will be returned or replaced:
 *
 * - **entirely** - replaces/returns the whole text,
 * - **beforeCursor** - replaces/returns only the part of the text before the cursor,
 * - **afterCursor** - replaces/returns only the part of the text after the cursor.
 */
type TextPartType = "entirely" | "beforeCursor" | "afterCursor";

/** The toolbar menu item. */
interface ToolbarMenuItem {
  /** The item ID. */
  id: string;

  /** The item type. */
  type: ToolbarMenuItemType;

  /** The item text. */
  text: string;

  /** The item hint. */
  hint: string;

  /**
   * The item icons (see the plugins
   * {@link https://api.onlyoffice.com/docs/plugins/configuration/configuration config} documentation).
   */
  icons?: string;

  /** Specifies if the current item is disabled or not. */
  disabled?: boolean;

  /** Specifies if an item toggle is enabled or not. */
  enableToggle?: boolean;

  /** Specifies if the current item is locked in the view mode or not. */
  lockInViewMode?: boolean;

  /** Specifies if a separator is used between the toolbar menu items or not. */
  separator?: boolean;

  /** Specifies if the toolbar menu items are split or not. */
  split?: boolean;

  /** An array containing the context menu items for the current item. */
  items?: ContextMenuItem[];
}

/**
 * The possible values of the base which the relative vertical position of the toolbar menu item will
 * be calculated from.
 */
type ToolbarMenuItemType = "button" | "...";

/** The main toolbar menu item. */
interface ToolbarMenuMainItem {
  /** The plugin guid. */
  guid: string;

  /** An array containing the toolbar menu tabs for the current item. */
  tabs: ToolbarMenuTab[];
}

/** The toolbar menu tab. */
interface ToolbarMenuTab {
  /** The tab ID. */
  id: string;

  /** The tab text. */
  text: string;

  /** An array containing the toolbar menu items for the current tab. */
  items?: ToolbarMenuItem[];
}

/** The main window header item. */
interface WindowHeaderMainItem {
  /** The plugin guid. */
  guid: string;

  /** The plugin child window ID. When omitted, the items are placed on the plugin's main frame header. */
  windowID?: string;

  /** An array containing the window header items. */
  items: WindowHeaderMenuItem[];
}

/** The window header menu item. */
interface WindowHeaderMenuItem {
  /** The item ID. */
  id: string;

  /** The item type. */
  type: "button";

  /** The item text. */
  text?: string;

  /** The item hint. */
  hint?: string;

  /** The item alignment in the window header. */
  align?: "left" | "right";

  /**
   * The item icons (see the plugins
   * {@link https://api.onlyoffice.com/docs/plugin-and-macros/structure/configuration/ config}
   * documentation).
   */
  icons?: string;

  /** Specifies if the current item is disabled or not. */
  disabled?: boolean;

  /** Specifies if an item toggle is enabled or not. */
  enableToggle?: boolean;

  /** Specifies if the button is split (button + dropdown arrow) or not. */
  split?: boolean;

  /** Specifies if the item replaces the window title or not. */
  isTitle?: boolean;

  /** Specifies if the item must be removed from the header. */
  removed?: boolean;

  /** An array containing the dropdown menu items for the current header item. */
  items?: ContextMenuItem[];
}

/** Comment object. */
interface comment {
  /** The comment ID. */
  Id: string;

  /** An object which contains the comment data. */
  Data: CommentData;
}

/**
 * The editors which the plugin is available for:
 *
 * - **word** - text document editor,
 * - **cell** - spreadsheet editor,
 * - **slide** - presentation editor,
 * - **pdf** - pdf editor.
 */
type editorType = "word" | "cell" | "slide" | "pdf";

/** An object containing the form properties. */
interface fillForms {
  /** The form tags which specify the content for each form type with such a tag. */
  tags: { text: string; checkBox: string; picture: string; comboBox: string };
}

/**
 * The data type selected in the editor and sent to the plugin:
 *
 * - **text** - the text data,
 * - **html** - HTML formatted code,
 * - **ole** - OLE object data,
 * - **desktop** - the desktop editor data,
 * - **desktop-external** - the main page data of the desktop app (system messages),
 * - **none** - no data will be send to the plugin from the editor,
 * - **sign** - the sign for the keychain plugin.
 */
type initDataType = "text" | "html" | "ole" | "desktop" | "desktop-external" | "none" | "sign";

/** An object containing the watermark properties. */
interface watermark_on_draw {
  /** The watermark transparency degree. */
  transparent: number;

  /** The type which specifies the preset shape geometry for the current watermark. */
  type: ShapeType;

  /** The watermark width measured in millimeters. */
  width: number;

  /** The watermark height measured in millimeters. */
  height: number;

  /** The watermark rotation angle measured in degrees. */
  rotate: number;

  /** The text margins measured in millimeters in the watermark shape. */
  margins: number[];

  /**
   * The watermark fill color in the RGB format, or the URL to image (base64 support:
   * data:image/png;...). The empty array [] means that the watermark has no fill.
   */
  fill: number[] | string;

  /** The watermark stroke width measured in millimeters. */
  "stroke-width": number;

  /**
   * The watermark stroke color in the RGB format. The empty array [] means that the watermark stroke has
   * no fill.
   */
  stroke: number[];

  /** The vertical text align in the watermark shape: **0** - bottom, **1** - center, **4** - top. */
  align: number;

  /** The array with paragraphs from the current watermark with their properties. */
  paragraphs: { align: number; fill: number[]; linespacing: number; runs: object[] };
}

// Cross-file type stubs
type localeTranslate = unknown;

type FormsMethodArgs = {
  /**
   * Adds an OLE object to the current document position.
   *
   * @param data - The OLE object properties.
   *
   * @example
   * ```js
   * var _param = {
   *     "data": "{data}",
   *     "imgSrc": "https://link-to-the-image.jpg",
   *     "guid": "asc.{38E022EA-AD92-45FC-B22B-49DF39746DB4}",
   *     "width": 70,
   *     "height": 70,
   *     "widthPix": 60 * 36000,
   *     "heightPix": 60 * 36000
   * };
   * window.Asc.plugin.executeMethod ("AddOleObject", [_param], function() {
   *     window.Asc.plugin.executeCommand ("close", "");
   * });
   * ```
   */
  AddOleObject: [data: OLEProperties];
  /**
   * Sends a message to the co-authoring chat.
   *
   * @param sText - Message text.
   *
   * @example
   * ```js
   * window.Asc.plugin.executeMethod ("CoAuthoringChatSendMessage", [Asc.scope.meeting_info], function (isTrue) {
   *     if (isTrue)
   *         alert ("Meeting was created");
   *     else
   *         alert ("Meeting was create, please update SDK for checking info about created meeting in chat.");
   * });
   * ```
   */
  CoAuthoringChatSendMessage: [sText: string];
  /**
   * Converts a document to Markdown or HTML text.
   *
   * @param sConvertType - Conversion type ("markdown" or "html").
   * @param bHtmlHeadings - Defines if the HTML headings and IDs will be generated when the Markdown renderer of your target
   *   platform does not handle Markdown-style IDs.
   * @param bBase64img - Defines if the images will be created in the base64 format.
   * @param bDemoteHeadings - Defines if all heading levels in your document will be demoted to conform with the following
   *   standard: single H1 as title, H2 as top-level heading in the text body.
   * @param bRenderHTMLTags - Defines if HTML tags will be preserved in your Markdown. If you just want to use an occasional
   *   HTML tag, you can avoid using the opening angle bracket in the following way: \<tag>text\</tag>.
   *   By default, the opening angle brackets will be replaced with the special characters.
   * @returns The Markdown/HTML text.
   *
   * @example
   * ```js
   * let info = "";
   * window.Asc.plugin.executeMethod ("ConvertDocument", ["markdown", false, false, true, false], function (output) {
   *     document.getElementById ("text-area").value = info + output;
   * });
   * ```
   */
  ConvertDocument: [sConvertType?: "markdown" | "html", bHtmlHeadings?: boolean, bBase64img?: boolean, bDemoteHeadings?: boolean, bRenderHTMLTags?: boolean];
  /**
   * Edits an OLE object in the document.
   *
   * @param data - The OLE object properties.
   *
   * @example
   * ```js
   * var _param = {
   *     "data": "{data}",
   *     "imgSrc": "https://link-to-the-image.jpg",
   *     "objectId": "5_556",
   *     "width": 70,
   *     "height": 70,
   *     "widthPix": 60 * 36000,
   *     "heightPix": 60 * 36000
   * };
   * window.Asc.plugin.executeMethod ("EditOleObject", [_param], function () {
   *     window.Asc.plugin.executeCommand ("close", "");
   * });
   * ```
   */
  EditOleObject: [data: OLEProperties];
  /**
   * Specifies the end action for long operations.
   *
   * **Note:**
   * GroupActions are available only for ONLYOFFICE Docs Enterprise and ONLYOFFICE Docs Developer.
   *
   * @param type - The action type: **"Information"** - ends a non-blocking informational action, **"Block"** -
   *   ends a blocking interaction action.
   * @param description - A string description displayed during the action.
   * @param status - The error status code. If no error occurs, then an empty string is passed.
   *
   * @example
   * ```js
   * window.Asc.plugin.executeMethod ("EndAction", ["Block", "Save to local storage...", ""]);
   * ```
   */
  EndAction: [type: "Information" | "Block" | "GroupActions", description?: string | { scrollToTarget?: boolean; cancel?: boolean }, status?: string];
  /**
   * Ends the group action started with {@link Api#StartGroupActions}.
   *
   * @requires ONLYOFFICE Docs Developer Edition. This method is not present in Community Edition builds.
   * @param pr - Optional parameters.
   * @since 10.0.0
   */
  EndGroupActions: [pr?: { scrollToTarget?: boolean; cancel?: boolean }];
  /** Returns focus to the editor. */
  FocusEditor: [];
  /**
   * Returns information about all the forms that have been added to the document.
   *
   * @returns An array with all the forms from the document.
   *
   * @example
   * ```js
   * window.Asc.plugin.executeMethod ("GetAllForms", null, function (data) {
   *     for (var i = 0; i < data.length; i++) {
   *         if (data[i].Tag == 11) {
   *             this.Asc.plugin.executeMethod ("SelectContentControl", [data[i].InternalId]);
   *             break;
   *         }
   *     }
   * });
   * ```
   */
  GetAllForms: [];
  /**
   * Returns the document language.
   *
   * @returns Document language.
   * @since 7.4.0
   *
   * @example
   * ```js
   * window.Asc.plugin.executeMethod("GetDocumentLang", [], function(lang) {
   * 	let documentLang = lang || defaultLang;
   *
   * 	let options = Array.from($('#custom_menu option'));
   * 	let defaultOption = options.find(function(item) {
   * 		if (item.value == defaultLang)
   * 			return item;
   * 	});
   *
   * 	let matchOption = undefined;
   * 	matchOption = options.find(function(item) {
   * 		if (item.value == documentLang)
   * 			return true;
   * 	});
   * 	if (!matchOption) {
   * 		matchOption = options.find(function(item) {
   * 			if (item.value.search(documentLang.split('-')[0]) != -1)
   * 				return true;
   * 		});
   * 	}
   *
   * 	if (!matchOption)
   * 		matchOption = defaultOption;
   *
   * 	if (matchOption) {
   * 		$('#custom_menu').val(matchOption.value);
   * 		$('#custom_menu').trigger('change');
   * 	}
   * });
   * ```
   */
  GetDocumentLang: [];
  /**
   * Returns the current file to download in the specified format.
   *
   * @param format - A format in which you need to download a file.
   * @returns URL to download the file in the specified format or error.
   * @since 7.2.0
   *
   * @example
   * ```js
   * window.Asc.plugin.executeMethod ("GetFileToDownload", ["pdf"], function (res) {
   *     console.log (res)
   * });
   * ```
   */
  GetFileToDownload: [format?: string];
  /**
   * Returns the fonts list.
   *
   * @returns An array of the FontInfo objects containing the data about the used fonts.
   *
   * @example
   * ```js
   * window.Asc.plugin.executeMethod ("GetFontList", null, function (res) {
   *     console.log (res)
   * });
   * ```
   */
  GetFontList: [];
  /**
   * Returns a value of the specified form.
   *
   * @param internalId - A unique internal identifier of the form.
   * @returns The form value in the string or boolean format depending on the form type. The null value means
   *   that the form is filled with a placeholder.
   *
   * @example
   * ```js
   * window.Asc.plugin.executeMethod ("GetFormValue", ["1_713"], function (res) {
   *     console.log (res)
   * });
   * ```
   */
  GetFormValue: [internalId: string];
  /**
   * Returns information about all the forms that have been added to the document with specified tag.
   *
   * @param tag - The form tag.
   * @returns An array with all the forms from the document with the specified tag.
   *
   * @example
   * ```js
   * window.Asc.plugin.executeMethod ("GetFormsByTag", ["{tag}"], function (data) {
   *     for (var i = 0; i < data.length; i++) {
   *         if (data[i].InternalId == "5_556") {
   *             this.Asc.plugin.executeMethod ("SelectContentControl", [data[i].InternalId]);
   *             break;
   *         }
   *     }
   * });
   * ```
   */
  GetFormsByTag: [tag: string];
  /**
   * Returns the image data from the first of the selected drawings.
   *
   * If there are no drawings selected, the method returns a white rectangle.
   *
   * @returns The AscImageData object containig the information about the base64 encoded png image.
   * @since 7.2.0
   *
   * @example
   * ```js
   * window.Asc.plugin.executeMethod ("GetImageDataFromSelection", [], function (result) {
   *     let image = document.createElement("img");
   *     image.src = result.src;
   *     image.width = result.width;
   *     image.height = result.height;
   *     CreateImageEditor ();
   *     initializationDone = true;
   *     var imageHeight = null;
   *     image.height > 500 ? imageHeight = 500 : imageHeight = image.height;
   *     window.Asc.plugin.resizeWindow (undefined, undefined, 870, imageHeight + 300, 0, 0);
   * });
   * ```
   */
  GetImageDataFromSelection: [];
  /**
   * Returns all the installed plugins.
   *
   * @returns An array of all the installed plugins.
   * @since 7.2.0
   *
   * @example
   * ```js
   * window.Asc.plugin.executeMethod ("GetInstalledPlugins", null, function (result) {
   *     postMessage (JSON.stringify ({type: 'InstalledPlugins', data: result }));
   * });
   * ```
   */
  GetInstalledPlugins: [];
  /**
   * Returns the document macros.
   *
   * @returns The Macros object containing the data about all the macros from the document
   *
   * @example
   * ```js
   * window.Asc.plugin.executeMethod ("GetMacros", [JSON.stringify(Content)], function(data) {
   *
   *     try
   *     {
   *         Content = JSON.parse (data);
   *
   *         for (var i = 0; i < Content.macrosArray.length; i++)
   *         {
   *             var value = Content.macrosArray[i].name;
   *             if (undefined === value)
   *                 value = "";
   *
   *             value = value.replace (/&/g,'&amp;');
   *             value = value.replace (/</g,'&lt;');
   *             value = value.replace (/>/g,'&gt;');
   *             value = value.replace (/'/g,'&apos;');
   *             value = value.replace (/"/g,'&quot;');
   *
   *             Content.macrosArray[i].name = value;
   *         }
   *     }
   *     catch (err)
   *     {
   *         Content = {
   *             macrosArray : [],
   *             current : -1
   *         };
   *     }
   * });
   * ```
   */
  GetMacros: [oContent?: string];
  /**
   * Returns the current role name for the OForm document.
   *
   * @returns The current role name, or an empty string if no role is set.
   * @since 10.0.0
   */
  GetOFormRole: [];
  /**
   * Returns the restrictions the editor currently applies to the document.
   *
   * @returns The current restrictions.
   * @since 10.0.0
   */
  GetRestrictions: [];
  /**
   * Returns the selected content in the specified format.
   *
   * @param prop - The returned content properties.
   * @returns The selected content.
   * @since 8.3.1
   *
   * @example
   * ```js
   * const prepareShape = function () {
   * 	const doc = Api.GetDocument();
   *
   * 	const text = 'Text string to select from.';
   * 	const paragraph = doc.GetElement(0);
   * 	paragraph.AddText(text);
   *
   * 	const range = paragraph.GetRange(6, 12);
   * 	range.Select();
   * };
   *
   * Asc.plugin.callCommand(prepareShape);
   * Asc.plugin.executeMethod('GetSelectedContent', [], console.log);
   * ```
   */
  GetSelectedContent: [prop?: { type?: "text" | "html" }];
  /**
   * Returns an array of the selected OLE objects.
   *
   * @returns An array of the *OLEProperties* objects containing the data about the OLE object parameters.
   *
   * @example
   * ```js
   * window.Asc.plugin.executeMethod ("GetSelectedOleObjects");
   * ```
   */
  GetSelectedOleObjects: [];
  /**
   * Returns the selected text from the document.
   *
   * @param prop - The resulting string display properties.
   * @returns Selected text.
   * @since 7.1.0
   *
   * @example
   * ```js
   * function CorrectText () {
   *     switch (window.Asc.plugin.info.editorType) {
   *         case 'word':
   *         case 'slide': {
   *             window.Asc.plugin.executeMethod ("GetSelectedText", [{"Numbering": false, "Math": false, "TableCellSeparator": '\n', "ParaSeparator": '\n', "TabSymbol": String.fromCharCode(9)}], function (data) {
   *                 sText = data;
   *                 ExecTypograf (sText);
   *             });
   *             break;
   *         }
   *         case 'cell': {
   *             window.Asc.plugin.executeMethod ("GetSelectedText", [{"Numbering": false, "Math": false, "TableCellSeparator": '\n', "ParaSeparator": '\n', "TabSymbol": String.fromCharCode(9)}], function (data) {
   *                 if (data == '') {
   *                     sText = sText.replace (/\t/g, '\n');
   *                     ExecTypograf (sText);
   *                 }
   *                 else {
   *                     sText = data;
   *                     ExecTypograf (sText);
   *                 }
   *             });
   *             break;
   *         }
   *     }
   * }
   * ```
   */
  GetSelectedText: [prop?: { Numbering?: boolean; Math?: boolean; TableCellSeparator?: string; TableRowSeparator?: string; ParaSeparator?: string; TabSymbol?: string; NewLineSeparator?: string }];
  /**
   * Returns the type of the current selection.
   *
   * @returns The selection type.
   *
   * @example
   * ```js
   * window.Asc.plugin.executeMethod ("GetSelectionType", [], function(type) {
   *     switch (type) {
   *         case "none":
   *         case "drawing":
   *             window.Asc.plugin.executeMethod ("PasteText", [$("#txt_shower")[0].innerText], function (result) {
   *                 paste_done = true;
   *             });
   *             break;
   *         case "text":
   *             window.Asc.plugin.callCommand (function() {
   *                 Api.ReplaceTextSmart (Asc.scope.arr);
   *             }, undefined, undefined, function(result) {
   *                 paste_done = true;
   *             });
   *             break;
   *     }
   * });
   * ```
   */
  GetSelectionType: [];
  /**
   * Returns all VBA macros from the document.
   *
   * @returns VBA xml macros.
   * @since 7.3.0
   *
   * @example
   * ```js
   * window.Asc.plugin.executeMethod ("GetVBAMacros", null, function (data) {
   *     if (data && typeof data === 'string' && data.includes ('<Module')) {
   *         var arr = data.split ('<Module ').filter (function (el) {return el.includes ('Type="Procedural"')});
   *         arr.forEach (function (el) {
   *             var start = el.indexOf ('<SourceCode>') + 12;
   *             var end = el.indexOf ('</SourceCode>', start);
   *             var macros = el.slice (start, end);
   *
   *             start = el.indexOf ('Name="') + 6;
   *             end = el.indexOf ('"', start);
   *             var name = el.slice (start, end);
   *             var index = Content.macrosArray.findIndex (function (macr) {return macr.name == name});
   *             if (index == -1) {
   *                 macros = macros.replace (/&amp;/g,'&');
   *                 macros = macros.replace (/&lt;/g,'<');
   *                 macros = macros.replace (/&gt;/g,'>');
   *                 macros = macros.replace (/&apos;/g,'\'');
   *                 macros = macros.replace (/&quot;/g,'"');
   *                 macros = macros.replace (/Attribute [\w \.="\\]*\/g,'');
   *                 Content.macrosArray.push (
   *                     {
   *                         name: name,
   *                         value: '(function ()\n{\n\t/* Enter your code here. *\/\n})();\n\n/*\nExecution of VBA commands does not support.\n' + macros + '*\/',
   *                         guid: create_guid ()
   *                     }
   *                 );
   *             }
   *         });
   *     }
   *     updateMenu ();
   *     window.CustomContextMenu.init ();
   *     if (Content.current === -1)
   *     {
   *         let event = new Event ("click");
   *         document.getElementById ("button_new").dispatchEvent (event);
   *     }
   * });
   * ```
   */
  GetVBAMacros: [];
  /**
   * Returns the editor version.
   *
   * @returns The editor version.
   *
   * @example
   * ```js
   * window.Asc.plugin.executeMethod ("GetVersion", [], function (version) {
   *     if (version === undefined) {
   *         window.Asc.plugin.executeMethod ("PasteText", [ifr.contentDocument.getElementById ("google_translate_element").outerText], function (result) {
   *             paste_done = true;
   *         });
   *     }
   *     else {
   *         window.Asc.plugin.executeMethod ("GetSelectionType", [], function (type) {
   *             switch (type) {
   *                 case "none":
   *                 case "drawing":
   *                     window.Asc.plugin.executeMethod("PasteText", [ifr.contentDocument.getElementById ("google_translate_element").outerText], function (result) {
   *                         paste_done = true;
   *                     });
   *                     break;
   *                 case "text":
   *                     window.Asc.plugin.callCommand (function () {
   *                         Api.ReplaceTextSmart (Asc.scope.arr);
   *                     }, undefined, undefined, function (result) {
   *                         paste_done = true;
   *                     });
   *                     break;
   *             }
   *         });
   *     }
   * });
   * ```
   */
  GetVersion: [];
  /**
   * Inserts text into the document.
   *
   * @param text - A string value that specifies the text to be inserted into the document.
   * @param textReplace - A string value that specifies the text to be replaced with a new text.
   *
   * @example
   * ```js
   * window.Asc.plugin.executeMethod ("InputText", ["ONLYOFFICE Plugins", "ONLYOFFICE for developers"]);
   * ```
   */
  InputText: [text: string, textReplace: string];
  /**
   * Installs a plugin using the specified plugin config.
   *
   * @param config - The plugin {@link https://api.onlyoffice.com/docs/plugins/configuration/configuration config}.
   * @returns An object with the result information.
   * @since 7.2.0
   *
   * @example
   * ```js
   * window.Asc.plugin.executeMethod ("InstallPlugin", [config], function (result) {
   *     postMessage (JSON.stringify (result));
   * });
   * ```
   */
  InstallPlugin: [config?: object];
  /**
   * Checks if the document is in the editing PDF form mode.
   *
   * @returns Returns **true** if the document is in the editing PDF form mode.
   * @since 9.3.0
   */
  IsEditingPdfForm: [];
  /**
   * Checks if the document is in the filling form mode.
   *
   * @returns Returns **true** if the document is in the filling form mode.
   * @since 9.3.0
   */
  IsFillingForm: [];
  /**
   * Checks if the document is in the filling PDF form mode.
   *
   * @returns Returns **true** if the document is in the filling PDF form mode.
   * @since 9.3.0
   */
  IsFillingPdfForm: [];
  /**
   * Checks whether the specified form has been digitally signed.
   *
   * @returns Returns true if the form is signed, false otherwise.
   * @since 9.3.0
   *
   * @example
   * ```js
   * window.Asc.plugin.executeMethod ("IsFormSigned", [], function(isSigned) {
   *     console.log ("Form is signed: " + isSigned);
   * });
   * ```
   */
  IsFormSigned: [];
  /**
   * Sends an event to the plugin when the mouse button is moved inside the plugin iframe.
   *
   * @param frameId - The frame ID.
   * @param x - The X coordinate.
   * @param y - The Y coordinate.
   * @since 7.4.0
   *
   * @example
   * ```js
   * window.Asc.plugin.executeMethod ("MouseMoveWindow", ["iframe_asc.{BE5CBF95-C0AD-4842-B157-AC40FEDD9841}", 70, 40]);
   * ```
   */
  MouseMoveWindow: [frameId: string, x: number, y: number];
  /**
   * Sends an event to the plugin when the mouse button is released inside the plugin iframe.
   *
   * @param frameId - The frame ID.
   * @param x - The X coordinate.
   * @param y - The Y coordinate.
   * @since 7.4.0
   *
   * @example
   * ```js
   * window.Asc.plugin.executeMethod ("MouseUpWindow", ["iframe_asc.{BE5CBF95-C0AD-4842-B157-AC40FEDD9841}", 70, 40]);
   * ```
   */
  MouseUpWindow: [frameId: string, x: number, y: number];
  /**
   * Implements the external drag&drop emulation.
   *
   * @param obj - The drag&drop emulation properties.
   * @since 7.3.0
   *
   * @example
   * ```js
   * window.Asc.plugin.executeMethod ("OnDropEvent", [{
   *   "type": "onbeforedrop",
   *   "x" : pos.x,
   *   "y" : pos.y
   * }]);
   *
   * window.Asc.plugin.executeMethod ("OnDropEvent", [{
   *   "type": "ondrop",
   *   "x" : pos.x,
   *   "y" : pos.y,
   *   "text" : "test text",
   *   "html" : "<span>test html</span>"
   * }]);
   * ```
   */
  OnDropEvent: [obj: { type?: string; x?: number; y?: number; html?: string; text?: string }];
  /**
   * Encrypts the document.
   *
   * @param obj - The encryption properties.
   *
   * @example
   * ```js
   * window.Asc.plugin.executeMethod ("OnEncryption", [
   *     {
   *         "type": "getPasswordByFile",
   *         "password": "123456",
   *         "docinfo": "{docinfo}",
   *         "hash": "sha256"
   *     }
   * ]);
   * ```
   */
  OnEncryption: [obj: { type?: string; password?: string; data?: string; check?: boolean; docinfo?: string; hash?: string; error?: string }];
  /**
   * Pastes text in the HTML format into the document.
   *
   * @param htmlText - A string value that specifies the text in the *HTML* format to be pasted into the document.
   * @param options - Additional paste options.
   *
   * @example
   * ```js
   * window.Asc.plugin.executeMethod ("PasteHtml", ["&lt;p&gt;&lt;b&gt;Plugin methods for OLE objects&lt;/b&gt;&lt;/p&gt;&lt;ul&gt;&lt;li&gt;AddOleObject&lt;/li&gt;&lt;li&gt;EditOleObject&lt;/li&gt;&lt;/ul&gt;"]);
   * ```
   */
  PasteHtml: [htmlText: string, options?: { MergeLast?: boolean }];
  /**
   * Pastes text into the document.
   *
   * @param text - A string value that specifies the text to be pasted into the document.
   *
   * @example
   * ```js
   * window.Asc.plugin.executeMethod ("PasteText", ["ONLYOFFICE for developers"]);
   * ```
   */
  PasteText: [text: string];
  /**
   * Replaces the first selected drawing with the image specified in the parameters.
   *
   * If there are no drawings selected, the method inserts the image at the current position.
   *
   * @param oImageData - The information about the base64 encoded *png* image.
   * @since 7.2.0
   *
   * @example
   * ```js
   * window.saveImage = function () {
   *     let imageSrc = imageEditor.toDataURL ();
   *     let editorDimension = imageEditor.getCanvasSize ();
   *     let width = editorDimension.width;
   *     let height = editorDimension.height;
   *     let imageData = {
   *         "src": imageSrc,
   *         "width": width,
   *         "height": height
   *     };
   *     window.Asc.plugin.executeMethod ("PutImageDataToSelection", [imageData]);
   *     window.Asc.plugin.executeCommand ("close", "");
   * };
   * ```
   */
  PutImageDataToSelection: [oImageData: AscImageData];
  /**
   * Removes a plugin with the specified GUID.
   *
   * @param guid - The plugin identifier. It must be of the *asc.{UUID}* type.
   * @param backup - The plugin backup. This parameter is used when working with the desktop editors.
   * @returns An object with the result information.
   * @since 7.2.0
   *
   * @example
   * ```js
   * function removePlugin(backup) {
   *     if (removeGuid)
   *         window.Asc.plugin.executeMethod('RemovePlugin', [removeGuid, backup], function(result) {
   *             postMessage(result);
   *         });
   *
   *     removeGuid = null;
   * };
   * ```
   */
  RemovePlugin: [guid: string, backup: string];
  /**
   * Replaces each paragraph (or text in cell) in the select with the corresponding text from an array of
   * strings.
   *
   * @param arrString - An array of replacement strings.
   * @param sParaTab - A character which is used to specify the tab in the source text. Any symbol can be used. The
   *   default separator is "\t".
   * @param sParaNewLine - A character which is used to specify the line break character in the source text. Any symbol can
   *   be used. The default separator is "\r\n".
   * @returns Always returns true.
   * @since 7.1.0
   *
   * @example
   * ```js
   * window.Asc.plugin.executeMethod ("ReplaceTextSmart", [Asc.scope.arr, String.fromCharCode(9), String.fromCharCode(13)], function (isDone) {
   *     if (!isDone)
   *         window.Asc.plugin.callCommand (function () {
   *             Api.ReplaceTextSmart (Asc.scope.arr);
   *         });
   * });
   * ```
   */
  ReplaceTextSmart: [arrString: string[], sParaTab?: string, sParaNewLine?: string];
  /**
   * Sets a value to the specified form.
   *
   * @param internalId - A unique internal identifier of the form.
   * @param value - Form value to be set. Its type depends on the form type.
   *
   * @example
   * ```js
   * window.Asc.plugin.executeMethod ("SetFormValue", ["1_713", true]);
   * ```
   */
  SetFormValue: [internalId: string, value: string | boolean];
  /**
   * Sets macros to the document.
   *
   * @param data - The *Macros* object containing the data about all the macros from the document.
   *
   * @example
   * ```js
   * window.Asc.plugin.executeMethod ("SetMacros", [JSON.stringify (Content)], function () {
   *     window.Asc.plugin.executeCommand ("close", "");
   * });
   * ```
   */
  SetMacros: [data: string];
  /**
   * Configures plugins from an external source.
   *
   * The settings can be set for all plugins or for a specific plugin. For example, this method can be
   * used to pass an authorization token to the plugin.
   *
   * **Note:**
   * This method can be used only with the
   * {@link https://api.onlyoffice.com/docs/docs-api/usage-api/automation-api/connector-class connector class}.
   *
   * @param options - Plugin options.
   * @since 8.1.1
   */
  SetPluginsOptions: [options: PluginOptions];
  /**
   * Sets the properties to the document.
   *
   * @param obj - The document properties.
   *
   * @example
   * ```js
   * var initSettings = {
   *     "copyoutenabled" : false,
   *     "hideContentControlTrack" : false,
   *     "watermark_on_draw" : JSON.stringify ( {
   *         "transparent" : 0.3,
   *         "type" : "rect",
   *         "width" : 100,
   *         "height" : 100,
   *         "rotate" : -45,
   *         "margins" : [ 10, 10, 10, 10 ],
   *         "fill" : [255, 0, 0],
   *         "stroke-width" : 1,
   *         "stroke" : [0, 0, 255],
   *         "align" : 1,
   *
   *         "paragraphs" : [ {
   *             "align" : 2,
   *             "fill" : [255, 0, 0],
   *             "linespacing" : 1,
   *
   *             "runs" : [
   *                         {
   *                             "text" : "Do not steal, %user_name%!",
   *                             "fill" : [0, 0, 0],
   *                             "font-family" : "Arial",
   *                             "font-size" : 40,
   *                             "bold" : true,
   *                             "italic" : false,
   *                             "strikeout" : false,
   *                             "underline" : false
   *                         },
   *                         {
   *                             "text" : "<%br%>"
   *                         }
   *                     ]
   *             }
   *         ]
   *     }),
   *     "disableAutostartMacros" : true,
   *     "fillForms" : JSON.stringify ( {
   *         "tags" : {
   *             "111" : {
   *                 "text" : "Text in form with tag 111",
   *                 "checkBox" : "true",
   *                 "picture" : "https://upload.wikimedia.org/wikipedia/commons/9/91/ONLYOFFICE_logo.png",
   *                 "comboBox" : "item1"
   *             },
   *             "222" : {
   *                 "text" : "Text in form with tag 222",
   *                 "checkBox" : "false",
   *                 "comboBox" : "item2"
   *             },
   *             "333" : {
   *                 "text" : "OnlyOffice"
   *             }
   *         }
   *     })
   * };
   * window.Asc.plugin.executeMethod ("SetProperties", [initSettings], function () {
   *     window.Asc.plugin.executeCommand ("close", "");
   * });
   * ```
   */
  SetProperties: [obj: { copyoutenabled?: boolean; hideContentControlTrack?: boolean; watermark_on_draw?: string; disableAutostartMacros?: boolean; fillForms?: string }];
  /**
   * Shows or hides buttons in the header.
   *
   * @param id - The button ID.
   * @param bShow - The flag specifies whether the button is shown (**true**) or hidden (**false**).
   * @param align - The parameter indicates whether the button will be displayed on the right side of the window or
   *   on the left. The default value is "left".
   * @since 7.2.0
   *
   * @example
   * ```js
   * window.Asc.plugin.executeMethod ("ShowButton", ["back", false, "right"]);
   * ```
   */
  ShowButton: [id: string, bShow: boolean, align: string];
  /**
   * Shows an error/warning message.
   *
   * @param error - The error text.
   * @param level - -1 or 0 for error or warning.
   * @since 8.3.0
   *
   * @example
   * ```js
   * const text = 'Message you want to show';
   * const level = 0; // Warning, not an error
   * Asc.plugin.executeMethod('ShowError', [text, level]);
   * ```
   */
  ShowError: [error: string, level: number];
  /**
   * Shows the input helper.
   *
   * @param guid - A string value which specifies a plugin identifier which must be of the *asc.{UUID}* type.
   * @param w - A number which specifies the window width measured in millimeters.
   * @param h - A number which specifies the window height measured in millimeters.
   * @param isKeyboardTake - Defines if the keyboard is caught (**true**) or not (**false**).
   *
   * @example
   * ```js
   * window.Asc.plugin.executeMethod ("ShowInputHelper", ["asc.{UUID}", 70, 70, true]);
   * ```
   */
  ShowInputHelper: [guid: string, w: number, h: number, isKeyboardTake: boolean];
  /**
   * Specifies the start action for long operations.
   *
   * **Note:**
   * GroupActions are available only for ONLYOFFICE Docs Enterprise and ONLYOFFICE Docs Developer.
   *
   * @param type - The action type: **"Information"** - a non-blocking informational action, **"Block"** - a
   *   blocking interaction action.
   * @param description - A string description displayed during the action.
   *
   * @example
   * ```js
   * window.Asc.plugin.executeMethod ("StartAction", ["Block", "Save to local storage..."], function () {
   *     setPasswordByFile ("sha256", "123456");
   *
   *     setTimeout (function () {
   *         window.Asc.plugin.executeMethod ("EndAction", ["Block", "Save to localstorage..."]);
   *     }, 200);
   * });
   * ```
   */
  StartAction: [type: "Information" | "Block" | "GroupActions", description?: string | { lockScroll?: boolean; keepSelection?: boolean }];
  /**
   * Starts a group action that combines multiple editor operations into a single undoable step.
   *
   * @requires ONLYOFFICE Docs Developer Edition. This method is not present in Community Edition builds.
   * @param pr - Optional parameters.
   * @since 10.0.0
   */
  StartGroupActions: [pr?: { lockScroll?: boolean; keepSelection?: boolean }];
  /**
   * Unshows the input helper.
   *
   * @param guid - A string value which specifies a plugin identifier which must be of the *asc.{UUID}* type.
   * @param isclear - Defines if the input context will be cleared (**true**) or not (**false**).
   *
   * @example
   * ```js
   * window.Asc.plugin.executeMethod ("UnShowInputHelper", ["asc.{UUID}", true]);
   * ```
   */
  UnShowInputHelper: [guid: string, isclear: boolean];
  /**
   * Updates a plugin using the specified plugin config.
   *
   * @param config - The plugin {@link https://api.onlyoffice.com/docs/plugins/configuration/configuration config}.
   * @returns An object with the result information.
   * @since 7.3.0
   *
   * @example
   * ```js
   * window.Asc.plugin.executeMethod ("UpdatePlugin", [config], function (result) {
   *     postMessage (JSON.stringify (result));
   * });
   * ```
   */
  UpdatePlugin: [config?: object];
};

type FormsMethodName = keyof FormsMethodArgs;

type FormsMethodReturnMap = {
  AddOleObject: unknown;
  CoAuthoringChatSendMessage: unknown;
  ConvertDocument: string;
  EditOleObject: unknown;
  EndAction: unknown;
  EndGroupActions: unknown;
  FocusEditor: unknown;
  GetAllForms: ContentControl[];
  GetDocumentLang: string;
  GetFileToDownload: string;
  GetFontList: FontInfo[];
  GetFormValue: null | string | boolean;
  GetFormsByTag: ContentControl[];
  GetImageDataFromSelection: AscImageData;
  GetInstalledPlugins: PluginData[];
  GetMacros: string;
  GetOFormRole: string;
  GetRestrictions: EditorRestrictions;
  GetSelectedContent: string;
  GetSelectedOleObjects: OLEProperties[];
  GetSelectedText: string;
  GetSelectionType: SelectionType;
  GetVBAMacros: string | null;
  GetVersion: string;
  InputText: unknown;
  InstallPlugin: object;
  IsEditingPdfForm: boolean;
  IsFillingForm: boolean;
  IsFillingPdfForm: boolean;
  IsFormSigned: boolean;
  MouseMoveWindow: unknown;
  MouseUpWindow: unknown;
  OnDropEvent: unknown;
  OnEncryption: unknown;
  PasteHtml: unknown;
  PasteText: unknown;
  PutImageDataToSelection: unknown;
  RemovePlugin: object;
  ReplaceTextSmart: boolean;
  SetFormValue: unknown;
  SetMacros: unknown;
  SetPluginsOptions: unknown;
  SetProperties: unknown;
  ShowButton: unknown;
  ShowError: unknown;
  ShowInputHelper: unknown;
  StartAction: unknown;
  StartGroupActions: unknown;
  UnShowInputHelper: unknown;
  UpdatePlugin: object;
};

type FormsMethodReturn<T extends FormsMethodName> = FormsMethodReturnMap[T];

/**
 * Forms `executeMethod` names that need a paid ONLYOFFICE edition (2 of 50).
 * Each one's own `@requires` tag names the edition it needs.
 *
 * Nothing restricts these by default - use this to opt into enforcement, e.g.
 * `function run<T extends FormsFreeMethodName>(name: T, args: FormsMethodArgs[T])`.
 */
type FormsPaidMethodName = "EndGroupActions" | "StartGroupActions";

/** Forms `executeMethod` names available in every edition, including Community. */
type FormsFreeMethodName = Exclude<FormsMethodName, FormsPaidMethodName>;

// ---- src/theme/index.d.ts ----
// Editor theme (Asc.plugin.theme / onThemeChanged) - split out of index.d.ts since it's a large,
// self-contained block of CSS-variable-style theme tokens with no dependencies on other modules.

type KnownThemeName = "theme-night" | "theme-light" | "theme-dark" | "theme-gray" | "theme-white" | "theme-classic-light" | "theme-contrast-dark";

interface AscTheme {
    /** Theme name */
    Name: KnownThemeName | string;
    /** @deprecated Theme name (duplicate for compatibility) */
    name: KnownThemeName | string;
    /** Theme type (light/dark) */
    Type: "light" | "dark";
    /** @deprecated Theme type (light/dark) */
    type: "light" | "dark";
    /** Show rulers button */
    RulersButton: boolean;
    /** Show navigation buttons */
    NavigationButtons: boolean;
    /** Set thumbnail scroll width to null if no scrolling */
    ThumbnailScrollWidthNullIfNoScrolling: boolean;
    /** Need to invert on active */
    isNeedInvertOnActive: boolean;
    /** Support notes */
    SupportNotes: boolean;
    /** Style thumbnail width */
    STYLE_THUMBNAIL_WIDTH: number;
    /** Style thumbnail height */
    STYLE_THUMBNAIL_HEIGHT: number;
    /** Forms content controls outline border radius hover */
    FormsContentControlsOutlineBorderRadiusHover: number;
    /** Forms content controls outline border radius active */
    FormsContentControlsOutlineBorderRadiusActive: number;
    /** Themes thumbnail width */
    THEMES_THUMBNAIL_WIDTH: number;
    /** Themes thumbnail height */
    THEMES_THUMBNAIL_HEIGHT: number;
    /** Themes layout thumbnail height */
    THEMES_LAYOUT_THUMBNAIL_HEIGHT: number;
    /** Splitter width in mm */
    SplitterWidthMM: number;
    /** Animation pane timeline scroller opacity */
    AnimPaneTimelineScrollerOpacity: number;
    /** Animation pane timeline scroller hover opacity */
    AnimPaneTimelineScrollerOpacityHovered: number;
    /** Animation pane timeline scroller active opacity */
    AnimPaneTimelineScrollerOpacityActive: number;
    /** Background color */
    BackgroundColor: string;
    /** Page outline color */
    PageOutline: string;
    /** Dark ruler color */
    RulerDark: string;
    /** Light ruler color */
    RulerLight: string;
    /** Ruler outline color */
    RulerOutline: string;
    /** Ruler markers outline color */
    RulerMarkersOutlineColor: string;
    /** Old ruler markers outline color */
    RulerMarkersOutlineColorOld: string;
    /** Ruler markers fill color */
    RulerMarkersFillColor: string;
    /** Old ruler markers fill color */
    RulerMarkersFillColorOld: string;
    /** Ruler text color */
    RulerTextColor: string;
    /** Ruler tabs color */
    RulerTabsColor: string;
    /** Old ruler tabs color */
    RulerTabsColorOld: string;
    /** Ruler table color 1 */
    RulerTableColor1: string;
    /** Ruler table color 2 */
    RulerTableColor2: string;
    /** Scroll background color */
    ScrollBackgroundColor: string;
    /** Scroll outline color */
    ScrollOutlineColor: string;
    /** Scroll outline hover color */
    ScrollOutlineHoverColor: string;
    /** Scroll outline active color */
    ScrollOutlineActiveColor: string;
    /** Scroller color */
    ScrollerColor: string;
    /** Scroller hover color */
    ScrollerHoverColor: string;
    /** Scroller active color */
    ScrollerActiveColor: string;
    /** Scroll arrow color */
    ScrollArrowColor: string;
    /** Scroll arrow hover color */
    ScrollArrowHoverColor: string;
    /** Scroll arrow active color */
    ScrollArrowActiveColor: string;
    /** Scroller target color */
    ScrollerTargetColor: string;
    /** Scroller target hover color */
    ScrollerTargetHoverColor: string;
    /** Scroller target active color */
    ScrollerTargetActiveColor: string;
    /** Content controls background */
    ContentControlsBack: string;
    /** Content controls hover background */
    ContentControlsHover: string;
    /** Content controls active background */
    ContentControlsActive: string;
    /** Content controls text color */
    ContentControlsText: string;
    /** Content controls active text color */
    ContentControlsTextActive: string;
    /** Content controls anchor active color */
    ContentControlsAnchorActive: string;
    /** Forms content controls outline hover */
    FormsContentControlsOutlineHover: string;
    /** Forms content controls outline active */
    FormsContentControlsOutlineActive: string;
    /** Forms content controls markers background */
    FormsContentControlsMarkersBackground: string;
    /** Forms content controls markers background hover */
    FormsContentControlsMarkersBackgroundHover: string;
    /** Forms content controls markers background active */
    FormsContentControlsMarkersBackgroundActive: string;
    /** Forms content controls outline mover hover */
    FormsContentControlsOutlineMoverHover: string;
    /** Forms content controls outline mover active */
    FormsContentControlsOutlineMoverActive: string;
    /** Thumbnails background color */
    BackgroundColorThumbnails: string;
    /** Thumbnails active background color */
    BackgroundColorThumbnailsActive: string;
    /** Thumbnails hover background color */
    BackgroundColorThumbnailsHover: string;
    /** Thumbnails page active outline color */
    ThumbnailsPageOutlineActive: string;
    /** Thumbnails page hover outline color */
    ThumbnailsPageOutlineHover: string;
    /** Thumbnails page number text color */
    ThumbnailsPageNumberText: string;
    /** Thumbnails page number active text color */
    ThumbnailsPageNumberTextActive: string;
    /** Thumbnails page number hover text color */
    ThumbnailsPageNumberTextHover: string;
    /** Thumbnails lock color */
    ThumbnailsLockColor: string;
    /** Notes background color */
    BackgroundColorNotes: string;
    /** Border splitter color */
    BorderSplitterColor: string;
    /** Animation pane background */
    AnimPaneBackground: string;
    /** Animation pane selected item fill */
    AnimPaneItemFillSelected: string;
    /** Animation pane hovered item fill */
    AnimPaneItemFillHovered: string;
    /** Animation pane button fill */
    AnimPaneButtonFill: string;
    /** Animation pane button hover fill */
    AnimPaneButtonFillHovered: string;
    /** Animation pane button disabled fill */
    AnimPaneButtonFillDisabled: string;
    /** Animation pane play button fill */
    AnimPanePlayButtonFill: string;
    /** Animation pane play button outline */
    AnimPanePlayButtonOutline: string;
    /** Animation pane entrance effect bar fill */
    AnimPaneEffectBarFillEntrance: string;
    /** Animation pane entrance effect bar outline */
    AnimPaneEffectBarOutlineEntrance: string;
    /** Animation pane emphasis effect bar fill */
    AnimPaneEffectBarFillEmphasis: string;
    /** Animation pane emphasis effect bar outline */
    AnimPaneEffectBarOutlineEmphasis: string;
    /** Animation pane exit effect bar fill */
    AnimPaneEffectBarFillExit: string;
    /** Animation pane exit effect bar outline */
    AnimPaneEffectBarOutlineExit: string;
    /** Animation pane path effect bar fill */
    AnimPaneEffectBarFillPath: string;
    /** Animation pane path effect bar outline */
    AnimPaneEffectBarOutlinePath: string;
    /** Animation pane timeline ruler outline */
    AnimPaneTimelineRulerOutline: string;
    /** Animation pane timeline ruler tick */
    AnimPaneTimelineRulerTick: string;
    /** Animation pane timeline scroller fill */
    AnimPaneTimelineScrollerFill: string;
    /** Animation pane timeline scroller outline */
    AnimPaneTimelineScrollerOutline: string;
    /** Animation pane text color */
    AnimPaneText: string;
    /** Animation pane active text color */
    AnimPaneTextActive: string;
    /** Animation pane hover text color */
    AnimPaneTextHover: string;
    /** DEM background color */
    DemBackgroundColor: string;
    /** DEM button background color */
    DemButtonBackgroundColor: string;
    /** DEM button hover background color */
    DemButtonBackgroundColorHover: string;
    /** DEM button active background color */
    DemButtonBackgroundColorActive: string;
    /** DEM button border color */
    DemButtonBorderColor: string;
    /** DEM button text color */
    DemButtonTextColor: string;
    /** DEM button active text color */
    DemButtonTextColorActive: string;
    /** DEM splitter color */
    DemSplitterColor: string;
    /** DEM text color */
    DemTextColor: string;
    /** General background color */
    Background: string;
    /** Active background color */
    BackgroundActive: string;
    /** Highlighted background color */
    BackgroundHighlighted: string;
    /** General border color */
    Border: string;
    /** Active border color */
    BorderActive: string;
    /** Highlighted border color */
    BorderHighlighted: string;
    /** General text color */
    Color: string;
    /** Active text color */
    ColorActive: string;
    /** Highlighted text color */
    ColorHighlighted: string;
    /** Filtering text color */
    ColorFiltering: string;
    /** Sheet view cell background */
    SheetViewCellBackground: string;
    /** Sheet view cell pressed background */
    SheetViewCellBackgroundPressed: string;
    /** Sheet view cell hover background */
    SheetViewCellBackgroundHover: string;
    /** Sheet view cell title label color */
    SheetViewCellTitleLabel: string;
    /** Dark text color */
    ColorDark: string;
    /** Dark active text color */
    ColorDarkActive: string;
    /** Dark highlighted text color */
    ColorDarkHighlighted: string;
    /** Dark filtering text color */
    ColorDarkFiltering: string;
    /** Group data border color */
    GroupDataBorder: string;
    /** Editor border color */
    EditorBorder: string;
    /** Select all icon color */
    SelectAllIcon: string;
    /** Sheet view select all icon color */
    SheetViewSelectAllIcon: string;
    /** Document toolbar header background */
    "toolbar-header-document": string;
    /** Spreadsheet toolbar header background */
    "toolbar-header-spreadsheet": string;
    /** Presentation toolbar header background */
    "toolbar-header-presentation": string;
    /** PDF toolbar header background */
    "toolbar-header-pdf": string;
    /** Visio toolbar header background */
    "toolbar-header-visio": string;
    /** Document toolbar header text on background */
    "text-toolbar-header-on-background-document": string;
    /** Spreadsheet toolbar header text on background */
    "text-toolbar-header-on-background-spreadsheet": string;
    /** Presentation toolbar header text on background */
    "text-toolbar-header-on-background-presentation": string;
    /** PDF toolbar header text on background */
    "text-toolbar-header-on-background-pdf": string;
    /** Visio toolbar header text on background */
    "text-toolbar-header-on-background-visio": string;
    /** Normal background color */
    "background-normal": string;
    /** Toolbar background color */
    "background-toolbar": string;
    /** Additional toolbar background color */
    "background-toolbar-additional": string;
    /** Primary dialog button background color */
    "background-primary-dialog-button": string;
    /** Notification popover background color */
    "background-notification-popover": string;
    /** Notification badge background color */
    "background-notification-badge": string;
    /** Scrim background color */
    "background-scrim": string;
    /** Loader background color */
    "background-loader": string;
    /** Accent button background color */
    "background-accent-button": string;
    /** Contrast popover background color */
    "background-contrast-popover": string;
    /** Contrast popover shadow */
    "shadow-contrast-popover": string;
    /** Button hover highlight */
    "highlight-button-hover": string;
    /** Button pressed highlight */
    "highlight-button-pressed": string;
    /** Button pressed hover highlight */
    "highlight-button-pressed-hover": string;
    /** Primary dialog button hover highlight */
    "highlight-primary-dialog-button-hover": string;
    /** Header button hover highlight */
    "highlight-header-button-hover": string;
    /** Header button pressed highlight */
    "highlight-header-button-pressed": string;
    /** Text select highlight */
    "highlight-text-select": string;
    /** Accent button hover highlight */
    "highlight-accent-button-hover": string;
    /** Accent button pressed highlight */
    "highlight-accent-button-pressed": string;
    /** Document toolbar tab underline */
    "highlight-toolbar-tab-underline-document": string;
    /** Spreadsheet toolbar tab underline */
    "highlight-toolbar-tab-underline-spreadsheet": string;
    /** Presentation toolbar tab underline */
    "highlight-toolbar-tab-underline-presentation": string;
    /** PDF toolbar tab underline */
    "highlight-toolbar-tab-underline-pdf": string;
    /** Visio toolbar tab underline */
    "highlight-toolbar-tab-underline-visio": string;
    /** Document header tab underline */
    "highlight-header-tab-underline-document": string;
    /** Spreadsheet header tab underline */
    "highlight-header-tab-underline-spreadsheet": string;
    /** Presentation header tab underline */
    "highlight-header-tab-underline-presentation": string;
    /** PDF header tab underline */
    "highlight-header-tab-underline-pdf": string;
    /** Visio header tab underline */
    "highlight-header-tab-underline-visio": string;
    /** Toolbar border color */
    "border-toolbar": string;
    /** Divider border color */
    "border-divider": string;
    /** Regular control border color */
    "border-regular-control": string;
    /** Toolbar button hover border */
    "border-toolbar-button-hover": string;
    /** Preview hover border */
    "border-preview-hover": string;
    /** Preview select border */
    "border-preview-select": string;
    /** Control focus border */
    "border-control-focus": string;
    /** Color shading border */
    "border-color-shading": string;
    /** Error border color */
    "border-error": string;
    /** Contrast popover border */
    "border-contrast-popover": string;
    /** Normal text color */
    "text-normal": string;
    /** Normal pressed text color */
    "text-normal-pressed": string;
    /** Secondary text color */
    "text-secondary": string;
    /** Tertiary text color */
    "text-tertiary": string;
    /** Link text color */
    "text-link": string;
    /** Link hover text color */
    "text-link-hover": string;
    /** Link active text color */
    "text-link-active": string;
    /** Link visited text color */
    "text-link-visited": string;
    /** Inverse text color */
    "text-inverse": string;
    /** Toolbar header text color */
    "text-toolbar-header": string;
    /** Contrast background text color */
    "text-contrast-background": string;
    /** Alt key hint text color */
    "text-alt-key-hint": string;
    /** Normal icon color */
    "icon-normal": string;
    /** Normal pressed icon color */
    "icon-normal-pressed": string;
    /** Inverse icon color */
    "icon-inverse": string;
    /** Toolbar header icon color */
    "icon-toolbar-header": string;
    /** Notification badge icon color */
    "icon-notification-badge": string;
    /** Contrast popover icon color */
    "icon-contrast-popover": string;
    /** Success icon color */
    "icon-success": string;
    /** Canvas background color */
    "canvas-background": string;
    /** Canvas content background color */
    "canvas-content-background": string;
    /** Canvas page border color */
    "canvas-page-border": string;
    /** Canvas ruler background color */
    "canvas-ruler-background": string;
    /** Canvas ruler border color */
    "canvas-ruler-border": string;
    /** Canvas ruler margins background color */
    "canvas-ruler-margins-background": string;
    /** Canvas ruler mark color */
    "canvas-ruler-mark": string;
    /** Canvas ruler handle border color */
    "canvas-ruler-handle-border": string;
    /** Canvas ruler disabled handle border color */
    "canvas-ruler-handle-border-disabled": string;
    /** Canvas high contrast color */
    "canvas-high-contrast": string;
    /** Canvas disabled high contrast color */
    "canvas-high-contrast-disabled": string;
    /** Canvas cell border color */
    "canvas-cell-border": string;
    /** Canvas cell title background color */
    "canvas-cell-title-background": string;
    /** Canvas cell title hover background color */
    "canvas-cell-title-background-hover": string;
    /** Canvas cell title selected background color */
    "canvas-cell-title-background-selected": string;
    /** Canvas cell title border color */
    "canvas-cell-title-border": string;
    /** Canvas cell title hover border color */
    "canvas-cell-title-border-hover": string;
    /** Canvas cell title selected border color */
    "canvas-cell-title-border-selected": string;
    /** Canvas cell title text color */
    "canvas-cell-title-text": string;
    /** Canvas dark cell title color */
    "canvas-dark-cell-title": string;
    /** Canvas dark cell title hover color */
    "canvas-dark-cell-title-hover": string;
    /** Canvas dark cell title selected color */
    "canvas-dark-cell-title-selected": string;
    /** Canvas dark cell title border color */
    "canvas-dark-cell-title-border": string;
    /** Canvas dark cell title hover border color */
    "canvas-dark-cell-title-border-hover": string;
    /** Canvas dark cell title selected border color */
    "canvas-dark-cell-title-border-selected": string;
    /** Canvas dark content background color */
    "canvas-dark-content-background": string;
    /** Canvas dark page border color */
    "canvas-dark-page-border": string;
    /** Canvas scroll thumb color */
    "canvas-scroll-thumb": string;
    /** Canvas scroll thumb hover color */
    "canvas-scroll-thumb-hover": string;
    /** Canvas scroll thumb pressed color */
    "canvas-scroll-thumb-pressed": string;
    /** Canvas scroll thumb border color */
    "canvas-scroll-thumb-border": string;
    /** Canvas scroll thumb hover border color */
    "canvas-scroll-thumb-border-hover": string;
    /** Canvas scroll thumb pressed border color */
    "canvas-scroll-thumb-border-pressed": string;
    /** Canvas scroll arrow color */
    "canvas-scroll-arrow": string;
    /** Canvas scroll arrow hover color */
    "canvas-scroll-arrow-hover": string;
    /** Canvas scroll arrow pressed color */
    "canvas-scroll-arrow-pressed": string;
    /** Canvas scroll thumb target color */
    "canvas-scroll-thumb-target": string;
    /** Canvas scroll thumb target hover color */
    "canvas-scroll-thumb-target-hover": string;
    /** Canvas scroll thumb target pressed color */
    "canvas-scroll-thumb-target-pressed": string;
    /** Canvas sheet view cell background color */
    "canvas-sheet-view-cell-background": string;
    /** Canvas sheet view cell hover background color */
    "canvas-sheet-view-cell-background-hover": string;
    /** Canvas sheet view cell pressed background color */
    "canvas-sheet-view-cell-background-pressed": string;
    /** Canvas sheet view cell title label color */
    "canvas-sheet-view-cell-title-label": string;
    /** Canvas 1px freeze line color */
    "canvas-freeze-line-1px": string;
    /** Canvas 2px freeze line color */
    "canvas-freeze-line-2px": string;
    /** Canvas select all icon color */
    "canvas-select-all-icon": string;
    /** Canvas animation pane background color */
    "canvas-anim-pane-background": string;
    /** Canvas animation pane selected item fill color */
    "canvas-anim-pane-item-fill-selected": string;
    /** Canvas animation pane hovered item fill color */
    "canvas-anim-pane-item-fill-hovered": string;
    /** Canvas animation pane button fill color */
    "canvas-anim-pane-button-fill": string;
    /** Canvas animation pane button hover fill color */
    "canvas-anim-pane-button-fill-hovered": string;
    /** Canvas animation pane button disabled fill color */
    "canvas-anim-pane-button-fill-disabled": string;
    /** Canvas animation pane play button fill color */
    "canvas-anim-pane-play-button-fill": string;
    /** Canvas animation pane play button outline color */
    "canvas-anim-pane-play-button-outline": string;
    /** Canvas animation pane entrance effect bar fill color */
    "canvas-anim-pane-effect-bar-entrance-fill": string;
    /** Canvas animation pane entrance effect bar outline color */
    "canvas-anim-pane-effect-bar-entrance-outline": string;
    /** Canvas animation pane emphasis effect bar fill color */
    "canvas-anim-pane-effect-bar-emphasis-fill": string;
    /** Canvas animation pane emphasis effect bar outline color */
    "canvas-anim-pane-effect-bar-emphasis-outline": string;
    /** Canvas animation pane exit effect bar fill color */
    "canvas-anim-pane-effect-bar-exit-fill": string;
    /** Canvas animation pane exit effect bar outline color */
    "canvas-anim-pane-effect-bar-exit-outline": string;
    /** Canvas animation pane path effect bar fill color */
    "canvas-anim-pane-effect-bar-path-fill": string;
    /** Canvas animation pane path effect bar outline color */
    "canvas-anim-pane-effect-bar-path-outline": string;
    /** Canvas animation pane timeline ruler outline color */
    "canvas-anim-pane-timeline-ruler-outline": string;
    /** Canvas animation pane timeline ruler tick color */
    "canvas-anim-pane-timeline-ruler-tick": string;
    /** Canvas animation pane timeline scroller fill color */
    "canvas-anim-pane-timeline-scroller-fill": string;
    /** Canvas animation pane timeline scroller outline color */
    "canvas-anim-pane-timeline-scroller-outline": string;
    /** Canvas animation pane timeline scroller opacity */
    "canvas-anim-pane-timeline-scroller-opacity": string;
    /** Canvas animation pane timeline scroller hover opacity */
    "canvas-anim-pane-timeline-scroller-opacity-hovered": string;
    /** Canvas animation pane timeline scroller active opacity */
    "canvas-anim-pane-timeline-scroller-opacity-active": string;
    /** Toolbar height controls value */
    "toolbar-height-controls": string;
    /** Sprite button icons UID */
    "sprite-button-icons-uid": string;
}

// ---- src/config/plugin-config.d.ts ----
// config.json shape - ButtonConfig/VariationConfig/PluginConfig and their supporting types.
// PluginInfo is not here even though it also describes config-shaped data: it's a runtime-plugin
// concept (window.Asc.plugin.info), not a static config.json shape, so it lives in ./src/plugin/plugin.d.ts.

interface ButtonConfig {
    /**
     * Hide this button when the document is open read-only. Opt-out: read as `isViewer !== false`,
     * so the button shows in viewer mode unless this is `false`.
     *
     * Note the opposite sense of {@link VariationConfig.isViewer}, which is opt-in and defaults to
     * hidden. Same name, same file, inverted default.
     */
    isViewer?: boolean;
    primary?: boolean;
    text: string;
    textLocale?: Record<string, string>;
}

type EditorType = 'word' | 'cell' | 'slide' | 'pdf';

type IconScale = '100%' | '125%' | '150%' | '175%' | '200%';

type IconScaleEntry = {
    active?: string;
    hover?: string;
    normal: string;
};

type IconConfig = {
    [K in IconScale]?: IconScaleEntry;
} & {
    /** Light/dark icon set variant - real-world config.json files pair this with `theme`. */
    style?: 'light' | 'dark';
    /** Icon theme name, e.g. `"flat"`/`"flatDark"` - not a fixed enum in practice. */
    theme?: string;
    /** Fallback used for any scale not otherwise listed. */
    default?: IconScaleEntry;
};

type InitDataType = 'text' | 'html' | 'ole' | 'desktop' | 'desktop-external' | 'none' | 'sign';

type MenuType = 'left' | 'right';

interface PluginConfig {
    $schema?: string;
    baseUrl?: string;
    /**
     * Places the plugin in its own group in the **Plugins** tab, separated from the rest. Omitted,
     * the plugin joins the last group. Read as `item.group.name` / `item.group.rank`.
     */
    group?: {
        name: string;
        /** Position of the group in the tab, an integer from 1. */
        rank: number;
    };
    guid: string;
    /** A help/support link for the plugin. */
    help?: string;
    /** On desktop editors, serves the plugin through the `onlyoffice://` custom scheme instead of `file://`, so it gets a real origin with working CORS and a secure context. */
    onlyofficeScheme?: boolean;
    minVersion?: string;
    name: string;
    nameLocale?: Record<string, string>;
    /** The plugin author who proposed the plugin for publication. */
    offered?: string;
    variations: VariationConfig[];
    /**
     * The plugin's own version, e.g. `"1.0"`. Optional per the reference, and genuinely omitted by
     * shipped plugins - `guid`, `name` and `variations` are the only required top-level fields.
     */
    version?: string;
}

interface InstalledPluginInfo {
    baseUrl: string;
    canRemoved: boolean;
    guid: string;
    obj: PluginConfig;
    removed?: boolean;
}

interface StoreConfig {
    background?: {
        dark: string;
        light: string;
    };
    categories?: string[];
    icons?: {
        dark: string;
        light: string;
    };
    screenshots?: string[];
}

interface VariationConfig {
    /** Defaults to no buttons (an empty toolbar) when omitted - routinely omitted in practice. */
    buttons?: ButtonConfig[];
    cryptoDisabledForExternalCloud?: string;
    cryptoDisabledForInternalCloud?: string;
    cryptoDisabledOnStart?: string;
    cryptoMode?: string;
    description: string;
    descriptionLocale?: Record<string, string>;
    EditorsSupport: EditorType[];
    events?: string[];
    fixedSize?: boolean;
    /** Some plugins use the same rich per-scale shape here as `icons2` instead of a plain path/map. */
    icons?: Record<string, string> | string[] | string | IconConfig[];
    icons2?: IconConfig[];
    initData?: string;
    initDataType?: InitDataType;
    initOnSelectionChanged?: boolean;
    isCanDocked?: boolean;
    isCustomWindow?: boolean;
    /**
     * Hide a viewer-enabled variation from the viewer's plugin list after all. Only consulted when
     * `isViewer` is `true`, and read as `isDisplayedInViewer !== false`.
     */
    isDisplayedInViewer?: boolean;
    isInsideMode?: boolean;
    isModal?: boolean;
    /** Whether the variation's content needs sequential numbering (used by some panel plugins). */
    /**
     * Whether the created panel starts expanded (`true`, the default) or collapsed (`false`).
     *
     * Panel variations only - `type` of `"panel"` or `"panelRight"`. The side-menu button and the
     * panel are created either way; `false` only skips expanding it on render, leaving the user to
     * open it from the button. Read as `isActivated !== false`, so omitting it and setting it to
     * `true` are the same - only `false` does anything.
     * @since 8.3.0
     */
    isActivated?: boolean;
    isSystem?: boolean;
    isTargeted?: boolean;
    isUpdateOleOnResize?: boolean;
    /**
     * Offer this variation when the document is open read-only. Opt-in, default `false`: in edit
     * mode a variation is listed regardless, and in viewer mode only `isViewer: true` puts it
     * there - subject to `isDisplayedInViewer`, which can hide it again.
     *
     * The editor's test is `isEdit || isViewer && isDisplayedInViewer !== false`. Note that
     * {@link ButtonConfig.isViewer} is the opposite: opt-out, shown unless set to `false`.
     */
    isViewer?: boolean;
    /** Omitted in practice about as often as it's set explicitly. */
    isVisual?: boolean;
    menu?: MenuType;
    /** executeMethod names this variation calls - purely descriptive/documentation, not enforced. */
    methods?: string[];
    name?: string;
    nameLocale?: Record<string, string>;
    /** Store listing screenshots for this specific variation (see also StoreConfig.screenshots). */
    screens?: string[];
    size?: number[];
    store?: StoreConfig;
    type?: VariationType;
    url: string;
}

type VariationType = 'window' | 'panel' | 'panelRight' | 'background' | 'system';

// ---- src/plugin/events.d.ts ----
// Plugin-window-level events (Asc.plugin.attachEvent/onContextMenuShow/onWindowResize/...) - a
// distinct registry from the per-editor content events (paragraph/page changes) declared in
// ./plugin.d.ts alongside attachEditorEvent/detachEditorEvent.

// A handful of Word-only events reuse ContentControl/comment/TextAnnotation/TextAnnotationRange -
// the same shapes `executeMethod`'s Word surface already models (with real-example-verified
// optionality) - rather than duplicating them by hand and letting the copies drift.

interface ContextMenuShowEvent {
    /** The context type used by the editor, for example `All`. */
    type: string;
}

/** Event arguments are tuples so events with no payload can be represented as `[]`. */
type PluginEventMap = {
    onContextMenuShow: [event: ContextMenuShowEvent];
    /** Payload is not documented consistently across editor versions. */
    onWindowResize: [event: unknown];
    /** Payload is not documented consistently across editor versions. */
    onInputHelperInput: [event: unknown];
    onInputHelperClear: [];
    onExternalMouseUp: [];
    onClickBack: [];
    onDocumentContentReady: [];
    onTargetPositionChanged: [];
    /** `isSelectionUse` - defines if the selection is used or not. */
    onClick: [isSelectionUse: boolean];
    /** Payload shape is not documented consistently across editor versions. */
    onKeyDown: [event: unknown];
    /** `isEnabled` - whether the mouse or touchpad is enabled (true) or not (false). */
    onEnableMouseEvent: [isEnabled: boolean];
    /** `value` - the restrictions value. */
    onChangeRestrictions: [value: number];
    /** `id` - the ID of the floating action button that was clicked. Since editor 10.0.0. */
    onFloatActionButtonClick: [id: string];

    // Word only (per sdkjs/word/plugin-events.js's own `@typeofeditors ["CDE"]`) - firing an
    // attachEvent for one of these outside Word is not documented and won't happen in practice.
    /** Word only. Fired when a comment is added via `AddComment`. */
    onAddComment: [comment: comment];
    /** Word only. Fired when a comment is changed via `ChangeComment`. */
    onChangeCommentData: [comment: comment];
    /** Word only. Fired when the current page changes. `index` is the newly activated page. */
    onChangeCurrentPage: [index: number];
    /** Word only. Fired when a comment is removed via `RemoveComments`. */
    onRemoveComment: [comment: comment];
    /** Word only. Fired when the user clicks the "Complete & Submit" button on a form. */
    onSubmitForm: [];
    /** Word only. Fired when a content control receives focus. */
    onFocusContentControl: [control: ContentControl];
    /** Word only. Fired when a content control loses focus. */
    onBlurContentControl: [control: ContentControl];
    /** Word only. Fired when a content control changes. */
    onChangeContentControl: [control: ContentControl];
    /** Word only. Fired with the IDs of content control(s) that lost focus tracking in the document. */
    onHideContentControlTrack: [ids: string[]];
    /** Word only. Fired with the IDs of content control(s) that gained focus tracking in the document. */
    onShowContentControlTrack: [ids: string[]];
    /** Word only. Fired when one or more OLE objects are inserted into the document. */
    onInsertOleObjects: [data: object[]];
    // The four annotation events below are declared in sdkjs (word/plugin-events.js), but nothing
    // there ever fires them: the only code that dispatches them is the annotation engine, which a
    // Community Edition build does not have. Attaching a handler succeeds and it is simply never
    // called - so the licence has to be stated here, where a plugin author reads it, rather than
    // discovered by debugging a handler that never runs. `npm run check-plugin-events` fails if this
    // marking drifts from the sources.

    /**
     * Word only. Fired when a text annotation (e.g. a grammar/spellcheck range) loses focus.
     *
     * @requires ONLYOFFICE Docs Developer Edition. Annotations are not present in other
     *   builds, where this event is never fired.
     * @since 9.2.0
     */
    onBlurAnnotation: [annotation: TextAnnotation];
    /**
     * Word only. Fired when a text annotation receives focus.
     *
     * @requires ONLYOFFICE Docs Developer Edition. Annotations are not present in other
     *   builds, where this event is never fired.
     * @since 9.2.0
     */
    onFocusAnnotation: [annotation: TextAnnotation];
    /**
     * Word only. Fired when the user clicks a text annotation.
     *
     * @requires ONLYOFFICE Docs Developer Edition. Annotations are not present in other
     *   builds, where this event is never fired.
     * @since 9.2.0
     */
    onClickAnnotation: [annotation: TextAnnotation];
    /**
     * Word only. Fired when a paragraph's text is updated in the document.
     *
     * @requires ONLYOFFICE Docs Developer Edition. Dispatched only by the annotation
     *   engine, which other builds do not have, so this event is never fired there.
     * @since 9.2.0
     */
    onParagraphText: [data: { paragraphId: string; recalcId: string; text: string; annotations: TextAnnotationRange[] }];

    // Cell only.
    /** Cell only. Fired when the current worksheet changes. `index` is the newly activated sheet. */
    onChangeCurrentSheet: [index: number];

    // Slide only.
    /** Slide only. Fired when the current slide changes. `index` is the newly activated slide. */
    onChangeCurrentSlide: [index: number];
    /** Slide only. Fired when a slide show presentation starts. */
    onSlideShowBegin: [];
    /** Slide only. Fired when a slide show presentation ends. */
    onSlideShowEnd: [];
    /** Slide only. Fired after the slide changes during a slide show, before its content is displayed. */
    onSlideShowNextSlide: [];
    /** Slide only. Fired when the slide changes during a slide show, with the current and previous indices (`previousSlideIndex` is `-1` for the first slide). */
    onSlideShowSlideChanged: [data: { slideIndex: number; previousSlideIndex: number }];

    // Pdf only.
    /** Pdf only. Fired when a text selection ends, at the page and point where it ended. */
    onSelectionEnd: [page: number, x: number, y: number];
    /** Pdf only. Fired when a text selection is canceled. */
    onSelectionCancel: [];
};

type PluginEventName = keyof PluginEventMap | (string & {});
type PluginEventCallback<T = unknown> = (...args: T[]) => void;
type PluginEventHandler<K extends keyof PluginEventMap> = (...args: PluginEventMap[K]) => void;

/** Editor content events (paragraph/page changes) - a distinct registry from PluginEventName, which covers plugin-window-level events (theme, resize, ...) */
type PluginEditorEventName = 'onChangeCurrentPage' | 'onParagraphText' | 'onParagraphAdd' | 'onParagraphRemove' | string;

type PluginEditorEventCallback<T = unknown> = (...args: T[]) => void;

// ---- src/plugin/buttons.d.ts ----
// Plugin menu buttons (Asc.Buttons and the context-menu/toolbar/window-header/content-control
// button classes) - split out of index.d.ts since it's a self-contained group referencing only
// config types (EditorType/IconConfig), not the plugin runtime itself.

// The payload the editor passes to both context-menu hooks below; declared with the plugin-window
// events because that is where `onContextMenuShow` itself lives.

type CustomMenuClickCallback = (data?: string) => void;

type ToolbarButtonType = "button" | "big-button";

interface ButtonMenuItem {
    id: string;
    text: string;
    hint?: string;
    items?: ButtonMenuItem[];
    onclick?: CustomMenuClickCallback;
}

interface ButtonBase {
    id: string;
    editors: EditorType[];
    icons: IconConfig | string[] | string | null;
    text: string;
    hint: string | null;
    data: string;
    separator: boolean;
    lockInViewMode: boolean;
    enableToggle: boolean;
    disabled: boolean;
    removed: boolean;
    parent: ButtonBase | null;
    childs: ButtonBase[] | null;
    menu?: ButtonMenuItem[];
    split?: boolean;
    pressed?: boolean;
    attachOnClick: (callback: CustomMenuClickCallback) => void;
    copy?: () => ButtonBase;
}

/**
 * One entry of the menu as the `Asc.Buttons` helper layer builds it - the object `toItem()` returns
 * and the two hooks below are handed. Only `id` and `text` are always present; every other field is
 * written only when the matching property is set on the button.
 *
 * Not the same shape as the generated `ContextMenuItem`, which is what `executeMethod`'s
 * `AddContextMenuItem` accepts: this one carries the helper's own `hint`, `separator`,
 * `lockInViewMode`, `enableToggle` and `pressed`, and has no `icons`.
 */
interface ContextMenuShowItem {
    id: string;
    text: string;
    hint?: string;
    separator?: boolean;
    data?: unknown;
    lockInViewMode?: boolean;
    enableToggle?: boolean;
    disabled?: boolean;
    pressed?: boolean;
    items?: ContextMenuShowItem[];
}

interface ButtonContextMenu extends ButtonBase {
    showOnOptionsType: string[];
    addCheckers: (...keys: string[]) => void;
    /**
     * Called first, every time the menu is about to be shown. Return `true` to drop this button
     * from this particular menu - the editor then skips it and all of its children, before the
     * `showOnOptionsType` and `EditorsSupport` tests run at all.
     *
     * Override to decide per invocation, from `options` or from where the button would be placed.
     * The default implementation returns `false`, so nothing is dropped.
     */
    onContextMenuShowAnalyze?: (options: ContextMenuShowEvent, parent: ContextMenuShowItem) => boolean;
    /**
     * Called once the item has been built and before it is pushed into the parent's `items`, so a
     * mutation here lands in the menu the editor renders. Children are processed afterwards.
     *
     * Use it to adjust text, `disabled` or `pressed` per invocation; returning anything is
     * pointless, as `onContextMenuShow` ignores the result.
     */
    onContextMenuShowExtendItem?: (options: ContextMenuShowEvent, item: ContextMenuShowItem) => void;
}

interface ButtonToolbar extends ButtonBase {
    type: ToolbarButtonType;
    tab: string;
}

interface ButtonContentControl extends ButtonBase {
    checker?: (contentControlId: string) => boolean | Promise<boolean>;
    addChecker: (checker: (contentControlId: string) => boolean | Promise<boolean>) => void;
}

interface ButtonWindowHeader extends ButtonBase {
    align: "left" | "center" | "right" | string;
    isLabel: boolean;
    isTitle: boolean;
}

interface Buttons {
    registerContextMenu: () => void;
    registerToolbarMenu: () => void;
    updateToolbarMenu: (id: string, text: string, buttons: ButtonToolbar[]) => void;
    registerWindowHeader: (id: string, buttons: ButtonWindowHeader[], frame?: WindowHeaderFrameOptions) => void;
    updateWindowHeader: (id: string, buttons: ButtonWindowHeader[], add?: boolean, frame?: WindowHeaderFrameOptions) => void;
    registerContentControl: () => void;
}

interface WindowHeaderFrameOptions {
    align?: "left" | "center" | "right" | string;
    isLabel?: boolean;
    isTitle?: boolean;
}

// ---- src/plugin/editor.d.ts ----
// The global `Editor` object: `Editor.GetSelectedText()` where `Asc.plugin.executeMethod` was.
//
// It is a Proxy installed by `startPluginApi()` (sdkjs `common/plugins/plugin_base_api.js`), and it
// has two kinds of member. Every name except `RunMacro` is forwarded to `executeMethod` with the
// arguments spread rather than passed as an array; `RunMacro` is its own thing, over `callCommand`.
// Both take a trailing callback or return a Promise. The Proxy answers `undefined` for `then`, which
// is what lets `await Editor.Something()` work - without that exclusion `await` would treat `Editor`
// itself as a thenable and hang.
//
// The declarations here are the shapes; each editor entry point (`src/editors/<editor>.d.ts`)
// declares the global itself with that editor's own method maps, the same way it declares `Api`.
// Two entry points in one program therefore collide on `Editor` exactly as they do on `Api`, and for
// the same reason: a plugin runs in one editor.

/**
 * One forwarded method: `Editor.Name(...args)`.
 *
 * The callback form is declared as returning `void` even though the runtime returns `executeMethod`'s
 * own `true`/`false`. That boolean reports whether the call went out now or was queued behind another
 * one in flight - an internal detail of the single-method-at-a-time protocol, not an answer about the
 * method. `Asc.plugin.executeMethod` declares `void` for the same reason.
 *
 * Three signatures rather than two, because a tuple cannot put a required element after an optional
 * one: `[...Args, callback]` is not expressible when `Args` itself ends in an optional parameter, and
 * for a method like `GetSelectedText(prop?)` the callback form would otherwise demand the argument it
 * is allowed to omit. The second signature covers passing only a callback. What stays out of reach is
 * a method with several optional parameters called with some of them *and* a callback - rare enough
 * to leave; it is reported as no-matching-overload rather than silently accepted.
 */
type EditorMethod<Args extends unknown[], Result> = {
    (...args: Args): Promise<Result>;
    (callback: (result: Result) => void): void;
    (...args: [...Args, (result: Result) => void]): void;
};

/** Every `executeMethod` name of one editor, as a callable property. */
type EditorMethods<ArgsMap, ReturnMap> = {
    [K in keyof ArgsMap]: ArgsMap[K] extends unknown[]
        ? EditorMethod<ArgsMap[K], K extends keyof ReturnMap ? ReturnMap[K] : unknown>
        : never;
};

/**
 * `Editor.RunMacro(fn, ...args)` - `callCommand` with two long-standing traps closed.
 *
 * The arguments are `JSON.stringify`d into the macro source and applied to `fn` inside the editor,
 * so data reaches the body as parameters instead of through `Asc.scope`. They must therefore survive
 * JSON, which is what `CommandSerializable` states: a function anywhere in an argument is a compile
 * error rather than an `undefined` that only shows up at runtime.
 *
 * The body is also wrapped in `try`/`catch` by the runtime, and the Promise form rejects with an
 * `Error` carrying the original message. `callCommand` has no such path - a throw there is lost and
 * the callback simply never fires - so this is the form to reach for when the macro can fail.
 */
interface EditorRunMacro {
    <Result, Args extends unknown[]>(
        macro: (...args: Args) => Result & CommandSerializable<Result>,
        ...args: Args & CommandSerializable<Args>
    ): Promise<Result>;
    <Result, Args extends unknown[]>(
        macro: (...args: Args) => Result & CommandSerializable<Result>,
        ...argsAndCallback: [...(Args & CommandSerializable<Args>), (result: Result) => void]
    ): void;
}

/** The global `Editor` of one editor: its `executeMethod` names, plus `RunMacro`. */
type EditorGlobal<ArgsMap, ReturnMap> = EditorMethods<ArgsMap, ReturnMap> & {
    RunMacro: EditorRunMacro;
};

// ---- src/plugin/plugin.d.ts ----
// The plugin runtime itself: Asc (the window.Asc entry point), AscPlugin (window.Asc.plugin),
// PluginWindow, PluginScope, and PluginInfo. This is the hub module - it cross-imports the
// per-editor namespaces/method types, theme, config, events, and buttons to assemble AscPlugin's
// executeMethod/attachEditorEvent overloads and Asc's button constructors.

/**
 * Rejects anything a `callCommand` result can't survive.
 *
 * The command body is serialized with `Function.prototype.toString()` and re-run inside the
 * editor's own process, so its return value has to cross a process boundary. The editor filters it
 * through `Asc.checkReturnCommand`, which walks the value up to 10 levels deep and replaces
 * anything carrying methods - an `ApiParagraph`, an `ApiDocument`, any other `Api.*` object - with
 * `undefined`. Mapping function-valued properties to `never` turns that silent data loss into a
 * compile error, while plain data (object literals, interfaces, arrays, unions, nested
 * combinations) passes through untouched.
 */
type CommandSerializable<T> =
    T extends Function ? never :
    T extends object ? { [K in keyof T]: CommandSerializable<T[K]> } :
    T;

/** An item of the input helper list. */
interface InputHelperItem {
    /**
     * The item index. Optional when setting items - the runtime assigns the array position as the
     * id for any item that omits it - and always present on items read back via `getItems`.
     */
    id?: string;
    /** The item text. */
    text: string;
}

/**
 * A window that appears and disappears as the user types, positioned against the cursor. Obtained
 * from `Asc.plugin.getInputHelper()` after `Asc.plugin.createInputHelper()`.
 */
interface InputHelper {
    /** Creates the input helper window. */
    createWindow(): void;
    /** Returns all items currently in the input helper. */
    getItems(): InputHelperItem[];
    /** Sets the items shown in the input helper. */
    setItems(items: InputHelperItem[]): void;
    /** Shows the input helper at the given size, optionally capturing the keyboard. */
    show(width: number, height: number, isCaptureKeyboard?: boolean): void;
    /** Hides the input helper. */
    unShow(): void;
    /**
     * Returns the scrollable size of the input helper window.
     *
     * Keyed `w`/`h`, not `width`/`height`: sdkjs's own JSDoc declares this `@returns {number}` and
     * describes it as "width and height", but the implementation returns `{ w, h }` - the shape
     * here follows the implementation.
     */
    getScrollSizes(): { w: number; h: number };
}

interface PluginScope {
    [key: string]: any;
    /**
     * Only present on the initial `Asc.scope` the runtime bootstraps (`plugins.dev.js` sets it once
     * at startup as a convenience for plugin authors - the runtime itself never calls it). Plugins
     * routinely replace `Asc.scope` wholesale with a plain data payload before `callCommand`
     * (`window.Asc.scope = { foo: 1 }`) so that data is readable inside the sandboxed callback -
     * that payload has no reason to carry `prototype.clear`, so it must stay optional here.
     */
    prototype?: {
        clear(): void;
    };
}

interface Asc {
    plugin: AscPlugin;
    scope: PluginScope;
    PluginWindow: new () => PluginWindow;
    ButtonContextMenu: new (parent?: ButtonBase | null, id?: string) => ButtonContextMenu;
    ButtonToolbar: new (parent?: ButtonBase | null, id?: string) => ButtonToolbar;
    ButtonContentControl: new (parent?: ButtonBase | null, id?: string) => ButtonContentControl;
    ButtonWindowHeader: new (parent?: ButtonBase | null, id?: string) => ButtonWindowHeader;
    Buttons: Buttons;
}

interface AscPlugin {
    /** Plugin GUID from config.json. */
    guid?: string;
    /** Window identifier assigned when the plugin is opened in a separate window. */
    windowID?: string;
    /** Handler for context-menu item clicks registered with attachContextMenuClickEvent. */
    event_onContextMenuClick?: (id?: string) => void;
    /** Handler for toolbar-menu item clicks registered with attachToolbarMenuClickEvent. */
    event_onToolbarMenuClick?: (id?: string) => void;
    /** Handler for window-header item clicks registered with attachWindowHeaderMenuClickEvent. */
    event_onWindowHeaderMenuClick?: (id?: string) => void;
    /**
     * Per-editor overloads (typed from each editor's own plugin-events.js) come first so a known
     * event name gets its real payload type; the final overload is a loose fallback for events
     * not modeled yet (e.g. the low-level common/UI ones - onContextMenuShow, onClick, onKeyDown, ...).
     */
    attachEditorEvent: (<T extends Forms.EditorEventName>(eventName: T, callback: (...args: Forms.EditorEventArgs[T]) => void) => void) &
        ((eventName: PluginEditorEventName, callback: PluginEditorEventCallback) => void);
    attachContextMenuClickEvent: (id: string, callback: CustomMenuClickCallback) => void;
    attachEvent: (<T extends keyof PluginEventMap>(eventName: T, callback: (...args: PluginEventMap[T]) => void) => void) &
        ((eventName: string, callback: (...args: unknown[]) => void) => void);
    attachToolbarMenuClickEvent: (id: string, callback: CustomMenuClickCallback) => void;
    attachWindowHeaderMenuClickEvent: (id: string, callback: CustomMenuClickCallback) => void;
    button: (id: number, text: string) => void;
    /**
     * Runs `command` inside the editor's process, where the global `Api` is the entry point.
     *
     * The function is serialized with `Function.prototype.toString()`, so it is **not a closure**:
     * nothing from the surrounding scope is visible inside it. Pass data in through
     * `Asc.scope` (JSON-serialized into the command's context and readable there as `Asc.scope` or
     * the bare `scope`) rather than by capturing variables.
     *
     * `command`'s return value is delivered to `callback`. It must be plain data - see
     * {@link CommandSerializable}; returning an `Api.*` object yields `undefined` at runtime and is
     * rejected here at compile time.
     *
     * @param isClose - Close the plugin window once the command has run.
     * @param isCalc - Recalculate the document afterwards (default `true`; pass `false` only when
     * the edits certainly cannot affect recalculation).
     */
    callCommand: <T>(
        command: () => T & CommandSerializable<T>,
        isClose?: boolean,
        isCalc?: boolean,
        callback?: (value: T) => void,
    ) => void;
    /**
     * Promise-returning {@link AscPlugin.callCommand}, available when the host supports async
     * functions. Always runs with `isClose: false` and `isCalc: true`; use `callCommand` directly
     * when you need either of those to differ.
     */
    callCommandAsync: <T>(command: () => T & CommandSerializable<T>) => Promise<T>;
    /** Promise-returning {@link AscPlugin.executeMethod}, typed per editor the same way. */
    callMethodAsync: (<T extends FormsMethodName>(methodName: T, args?: FormsMethodArgs[T]) => Promise<FormsMethodReturn<T>>);
    /**
     * Fetches a remotely located script and executes it as a command, the same way
     * {@link AscPlugin.callCommand} executes an inline function. The callback receives the fetched
     * source text, not the command's return value.
     */
    callModule: (url: string, callback?: (response: string) => void, isClose?: boolean) => void;
    /** Fetches a remotely located text resource without executing it. */
    loadModule: (url: string, callback?: (response: string) => void) => void;
    /** Creates the {@link InputHelper} - a window that tracks the cursor as the user types. */
    createInputHelper: () => void;
    /** Returns the {@link InputHelper} created by {@link AscPlugin.createInputHelper}. */
    getInputHelper: () => InputHelper;
    /** Called when the user picks an item from the input helper. */
    inputHelper_onSelectItem?: (item: InputHelperItem) => void;
    /**
     * Fallback for a {@link AscPlugin.callCommand} result when that call was made without its own
     * `callback` argument.
     */
    onCommandCallback?: (returnValue: unknown) => void;
    /**
     * Fallback for an {@link AscPlugin.executeMethod} result when that call was made without its
     * own `callback` argument.
     */
    onMethodReturn?: (returnValue: unknown) => void;
    /**
     * Called after the host replaces {@link PluginInfo.options} via an `updateOptions` message. It
     * takes no arguments - read the new value from `Asc.plugin.info.options`, which is already
     * updated by the time this runs.
     */
    onUpdateOptions?: () => void;
    /** Called when the editor integrator sends the plugin a message. */
    onExternalPluginMessage?: (data: { type: string; [key: string]: unknown }) => void;
    detachEditorEvent: (<T extends Forms.EditorEventName>(eventName: T) => void) &
        ((eventName: PluginEditorEventName) => void);
    detachEvent: (<T extends keyof PluginEventMap>(eventName: T) => void) &
        ((eventName: string) => void);
    event_onContextMenuShow?: PluginEventHandler<"onContextMenuShow">;
    event_onWindowResize?: PluginEventHandler<"onWindowResize">;
    event_onInputHelperInput?: PluginEventHandler<"onInputHelperInput">;
    event_onInputHelperClear?: PluginEventHandler<"onInputHelperClear">;
    event_onExternalMouseUp?: PluginEventHandler<"onExternalMouseUp">;
    event_onClickBack?: PluginEventHandler<"onClickBack">;
    event_onDocumentContentReady?: PluginEventHandler<"onDocumentContentReady">;
    event_onTargetPositionChanged?: PluginEventHandler<"onTargetPositionChanged">;
    event_onClick?: PluginEventHandler<"onClick">;
    event_onKeyDown?: PluginEventHandler<"onKeyDown">;
    event_onEnableMouseEvent?: PluginEventHandler<"onEnableMouseEvent">;
    event_onChangeRestrictions?: PluginEventHandler<"onChangeRestrictions">;
    onDestroy?: () => void;
    onEvent: (eventName: string, payload?: unknown) => void;
    executeMethod: ((methodName: 'CloseWindow', args?: [windowId: number]) => void) &
        ((methodName: 'ShowButton', args?: [buttonId: string, visible: boolean, align?: string]) => void) &
        /**
         * Like CloseWindow/ShowButton, undocumented on api.onlyoffice.com but real and callable.
         * sdkjs's own JSDoc for `pluginMethod_ResizeWindow` types size/minSize/maxSize as plain
         * `number`, but the web runtime (`onPluginWindowResize` in web-apps' Plugins.js) reads
         * `size[0]`/`size[1]` and `minSize.length`/`maxSize[0]` - all three are `[width, height]`
         * pairs on the wire, which is also how every real caller (e.g. the antidote and mendeley
         * plugins) passes them. minSize/maxSize are omitted when only resizing, and the callback
         * fires with `"resize_result"` once the window has been resized.
         */
        ((methodName: 'ResizeWindow', args?: [frameId: string, size: [width: number, height: number], minSize?: [width: number, height: number], maxSize?: [width: number, height: number]], callback?: (result: 'resize_result') => void) => void) &
        (<T extends FormsMethodName>(methodName: T, args?: FormsMethodArgs[T], callback?: (result: FormsMethodReturn<T>) => void) => void);
    executeCommand: ExecuteCommandCallback;
    info: PluginInfo;
    /**
     * Called when the plugin is launched. The argument is the launch data the variation asked for
     * through `initDataType` - the selected text for `"text"`, HTML for `"html"`, and so on, empty
     * for `"none"`. The runtime passes `Asc.plugin.info.data`, so the same value is readable there.
     *
     * An implementation that ignores it may take no parameters at all.
     */
    init: (data: string) => void;
    onExternalMouseUp: () => void;
    onThemeChanged: (theme: AscTheme) => void;
    onThemeChangedBase: (theme: AscTheme) => void;
    onTranslate(): void;
    resizeWindow: (width: number, height: number, minWidth?: number, minHeight?: number, maxWidth?: number, maxHeight?: number) => void;
    sendEvent: (eventName: string, eventData?: unknown) => void;
    sendToPlugin(message: string, payload?: unknown): void;
    theme: AscTheme;
    tr: (key: string) => string;
    /** Set to `true` after `tr` is first initialized */
    tr_init?: boolean;
    /** Translation map for the current language, populated by `pluginInitTranslateManager` */
    translateManager?: Record<string, string>;
    trigger: (eventName: string, eventData?: unknown) => void;
    version: string;
}

interface PluginWindow {
    id: string;
    show: (variation: VariationConfig) => void;
    close: () => void;
    attachEvent: (eventName: string, callback: PluginEventCallback) => void;
    detachEvent: (eventName: string) => void;
    command: (methodName: string, payload?: unknown) => void;
}

interface ExecuteCommandCallback {
    (command: string, value?: unknown, callback?: () => void): void;
}

interface PluginInfo {
    editorType: EditorType;
    editorSubType?: 'pdf' | string;
    /**
     * What the editor sent the plugin at launch, shaped by the variation's `initDataType`: the
     * selected text for `"text"`, HTML for `"html"`, and so on. The same value `init` receives as
     * its argument, which is the usual way to read it.
     */
    data?: string;
    /**
     * Replaced wholesale whenever the host sends `updateOptions`, just before
     * {@link AscPlugin.onUpdateOptions} fires. The payload is whatever that host chose to send, so
     * it carries no shape the editor guarantees.
     */
    options?: unknown;
    /**
     * Set by the runtime around a command issued from a plugin window, and read by the editor to
     * decide whether to recalculate after it. Not something a plugin assigns.
     */
    recalculate?: boolean;
    documentCallbackUrl: string;
    documentId: string;
    documentTitle: string;
    guid: string;
    isEmbedMode: boolean;
    isMobileMode: boolean;
    isViewMode: boolean;
    jwt: string;
    lang: string;
    mmToPx: number;
    theme: AscTheme;
    userId: string;
    userName: string;
}

// ---- src/services/desktop-editor.d.ts ----
// Native C++ object injected by ONLYOFFICE Desktop Editor into the browser window.
//
// Unreachable inside a `callCommand` body, and the interface below says so. The mechanism: the
// editor evaluates that body against a scope it builds itself (`_safePluginEval` in sdkjs's
// common/macros.js), binding this name to an empty object alongside sandboxed
// `setTimeout`/`setInterval`/`XMLHttpRequest`. The declaration stays global anyway - the plugin
// frame is where it is meant to be used, and a global cannot be scoped away inside one body.

type DesktopDialogType = 'plugin' | 'images' | 'cell' | 'word' | 'slide';

/**
 * The ONLYOFFICE Desktop Editor bridge, present only when the plugin runs in the desktop app -
 * hence `AscDesktopEditor | undefined` on the global.
 *
 * Not reachable inside `Asc.plugin.callCommand`: that body runs in the editor's own scope, where the
 * editor rebinds this name to an empty object. Read what you need in the plugin frame and pass it in
 * through `Asc.scope`.
 */
interface AscDesktopEditor {
    // Plugin management
    GetInstallPlugins(): string;
    GetBackupPlugins(): string;
    PluginInstall(path: string): boolean;

    // File dialogs
    OpenFilenameDialog(type: DesktopDialogType, multiple: boolean, callback: (file: string | string[]) => void): void;

    // Local file operations
    LocalStartOpen(): void;
    LocalFileSave(params: string, password: string, docinfo?: unknown, fileType?: number, jsonOptions?: string, passwordOld?: string): void;
    LocalFileSaveChanges(changes: string, deleteIndex: number, count: number): void;
    LocalFileGetSaved(): boolean;
    LocalFileGetSourcePath(): string;
    LocalFileGetRelativePath(path: string): string;
    LocalFileGetOpenChangesCount(): number;
    LocalFileGetImageUrl(path: string): string;
    LocalFileGetImageUrlCorrect(path: string): string;
    IsLocalFileExist(path: string): boolean;
    GetOpenedFile(path: string): ArrayBuffer | null;
    AddChanges(type: number, base64: string): void;

    // Document state
    SetDocumentName(name: string): void;
    onDocumentModifiedChanged(isModified: boolean): void;
    SetLocalRestrictions(value: number): void;
    SetAdvancedOptions(xml: string): void;
    NativeViewerOpen(password: string): void;
    CheckUserId(): string;

    // Encryption
    buildCryptedEnd(success: boolean): void;

    // External conversions
    startExternalConvertation(type: string, params: string): void;
}

// ---- src/services/simple-request.d.ts ----
// window.AscSimpleRequest - a small cross-origin request helper injected alongside window.Asc.

interface AscSimpleRequestOptions {
    url: string;
    crossOrigin?: boolean;
    crossDomain?: boolean;
    timeout?: number;
    headers?: string;
    complete?: (response: any, status: string) => void;
    error?: (response: any, status: string, error: any) => void;
}

interface AscSimpleRequest {
    createRequest(options: AscSimpleRequestOptions): void;
}

// ---- window.Asc / window.AscDesktopEditor / window.AscSimpleRequest ----
interface Window {
    Asc: Asc;
    AscDesktopEditor?: AscDesktopEditor;
    AscSimpleRequest?: AscSimpleRequest;
}
declare var Asc: Asc;
declare var AscDesktopEditor: AscDesktopEditor | undefined;
declare var AscSimpleRequest: AscSimpleRequest | undefined;
