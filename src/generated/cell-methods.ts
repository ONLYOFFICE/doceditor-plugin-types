// Auto-generated from ONLYOFFICE/sdkjs JSDoc (common/apiBase_plugins.js + per-editor api_plugins.js).
// executeMethod names/args/returns for Cell. Run `npm run generate-plugin-methods` to regenerate.

// Requires ONLYOFFICE Docs Developer Edition (2, each tagged @requires below):
// EndGroupActions, StartGroupActions.

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

  /** Specifies if the comment is resolved (**true**) or not (**false**). */
  Solved?: boolean;

  /** An array containing the comment replies represented as the *CommentData* object. */
  Replies?: CommentData[];
}

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
interface ImageData {
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
 * **word** - text document editor,
 * **cell** - spreadsheet editor,
 * **slide** - presentation editor,
 * **pdf** - pdf editor.
 */
type editorType = "word" | "cell" | "slide" | "pdf";

/** An object containing the form properties. */
interface fillForms {
  /** The form tags which specify the content for each form type with such a tag. */
  tags: { text: string; checkBox: string; picture: string; comboBox: string };
}

/**
 * The data type selected in the editor and sent to the plugin:
 * **text** - the text data,
 * **html** - HTML formatted code,
 * **ole** - OLE object data,
 * **desktop** - the desktop editor data,
 * **desktop-external** - the main page data of the desktop app (system messages),
 * **none** - no data will be send to the plugin from the editor,
 * **sign** - the sign for the keychain plugin.
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

type CellMethodArgs = {
  /**
   * Adds a comment to the workbook.
   *
   * @param oCommentData - An object which contains the comment data.
   * @returns The comment ID in the string format or null if the comment cannot be added.
   * @since 7.3.0
   *
   * @example
   * ```js
   * window.Asc.plugin.executeMethod ("AddComment", [
   *     {
   *         "UserName": "John Smith",
   *         "QuoteText": "text",
   *         "Text": "comment",
   *         "Time": "1662737941471",
   *         "Solved": true,
   *         "Replies": [
   *             {
   *                 "UserName": "Mark Potato",
   *                 "Text": "reply 1",
   *                 "Time": "1662740895892",
   *                 "Solved": false
   *             }
   *         ]
   *     }
   * ], function (comment) {
   *     console.log (comment)
   * });
   * ```
   */
  AddComment: [oCommentData: CommentData];
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
   * Changes the specified comment.
   *
   * @param sId - The comment ID.
   * @param oCommentData - An object which contains the new comment data.
   * @since 7.3.0
   *
   * @example
   * ```js
   * window.Asc.plugin.executeMethod ("ChangeComment", ["1_631",
   *     {
   *         "UserName": "John Smith",
   *         "QuoteText": "text",
   *         "Text": "comment",
   *         "Time": "1662737941471",
   *         "Solved": true,
   *         "Replies": [
   *             {
   *                 "UserName": "Mark Potato",
   *                 "Text": "reply 1",
   *                 "Time": "1662740895892",
   *                 "Solved": false
   *             }
   *         ]
   *     }
   * ]);
   * ```
   */
  ChangeComment: [sId: string, oCommentData: CommentData];
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
   * Returns all the comments from the document.
   *
   * @returns An array of comment objects containing the comment data.
   * @since 8.1.0
   *
   * @example
   * ```js
   * window.Asc.plugin.executeMethod ("GetAllComments", null, function (comments) {
   *     Comments = comments;
   *     addComments (comments);
   * });
   * ```
   */
  GetAllComments: [];
  /**
   * Returns a library of local custom functions.
   *
   * @returns A library of custom functions in JSON format.
   * @since 8.1.0
   *
   * @example
   * ```js
   * window.Asc.plugin.executeMethod ("GetCustomFunctions", null, function (res) {
   *     console.log ("First custom function: " + res[0])
   * });
   * ```
   */
  GetCustomFunctions: [];
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
   * Returns the image data from the first of the selected drawings. If there are no drawings selected,
   * the method returns a white rectangle.
   *
   * @returns The ImageData object containig the information about the base64 encoded png image.
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
   * Returns the selected content in the specified format.
   *
   * @param prop - The returned content properties.
   * @returns The selected content.
   * @since 8.3.1
   */
  GetSelectedContent: [prop: { type?: "text" | "html" }];
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
  PutImageDataToSelection: [oImageData: ImageData];
  /**
   * Removes the specified comments.
   *
   * @param arrIds - An array which contains the IDs of the specified comments.
   * @since 7.3.0
   *
   * @example
   * ```js
   * window.Asc.plugin.executeMethod ("RemoveComments", [["1_631", "1_632"]]);
   * ```
   */
  RemoveComments: [arrIds: string[]];
  /**
   * Removes the OLE object from the workbook by its internal ID.
   *
   * @param internalId - The OLE object identifier which is used to work with OLE object added to the worksheet.
   * @since 9.1.0
   *
   * @example
   * ```js
   * const addOleToWorksheet = function () {
   * 	const worksheet = Api.GetActiveSheet();
   * 	const oleObject = worksheet.AddOleObject(
   * 		'https://static.onlyoffice.com/assets/docs/samples/img/onlyoffice_logo.png',
   * 		130 * 36000, 90 * 36000,
   * 		'https://youtu.be/SKGz4pmnpgY',
   * 		'asc.{38E022EA-AD92-45FC-B22B-49DF39746DB4}',
   * 		0, 2 * 36000, 4, 3 * 36000
   * 	);
   * 	return oleObject.Drawing.GetId();
   * };
   * Asc.plugin.callCommand(addOleToWorksheet, false, true, (id) => {
   * 	console.log('We added OLE object with id: ' + id);
   * 	Asc.plugin.executeMethod('RemoveOleObject', [id]);
   * 	console.log('We removed OLE object with id: ' + id);
   * });
   * ```
   */
  RemoveOleObject: [internalId: string];
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
   * Enables or disables the modal plugin footer button by index.
   *
   * @param index - The button index (0-based) in the buttons array from config.json.
   * @param isDisabled - Specifies whether to disable (true) or enable (false) the button.
   * @since 10.0.0
   */
  SetButtonDisabled: [index: number, isDisabled: boolean];
  /**
   * Updates a library of local custom functions.
   *
   * @param jsonString - A library of custom functions in JSON format.
   * @since 8.1.0
   *
   * @example
   * ```js
   * window.Asc.plugin.executeMethod ("SetCustomFunctions", [JSON.stringify (Content)], function () {
   *     window.Asc.plugin.executeCommand ("close", "");
   * });
   * ```
   */
  SetCustomFunctions: [jsonString: string];
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
   * Configures plugins from an external source. The settings can be set for all plugins or for a
   * specific plugin.
   * For example, this method can be used to pass an authorization token to the plugin. This method can
   * be used only with the connector class.
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

type CellMethodName = keyof CellMethodArgs;

type CellMethodReturnMap = {
  AddComment: string | null;
  AddOleObject: unknown;
  ChangeComment: boolean;
  CoAuthoringChatSendMessage: unknown;
  EditOleObject: unknown;
  EndAction: unknown;
  EndGroupActions: unknown;
  FocusEditor: unknown;
  GetAllComments: comment[];
  GetCustomFunctions: string;
  GetFileToDownload: string;
  GetFontList: FontInfo[];
  GetImageDataFromSelection: ImageData;
  GetInstalledPlugins: PluginData[];
  GetMacros: string;
  GetSelectedContent: string;
  GetSelectedOleObjects: OLEProperties[];
  GetSelectedText: string;
  GetSelectionType: SelectionType;
  GetVBAMacros: string | null;
  GetVersion: string;
  InputText: unknown;
  InstallPlugin: object;
  MouseMoveWindow: unknown;
  MouseUpWindow: unknown;
  OnDropEvent: unknown;
  OnEncryption: unknown;
  PasteHtml: unknown;
  PasteText: unknown;
  PutImageDataToSelection: unknown;
  RemoveComments: unknown;
  RemoveOleObject: unknown;
  RemovePlugin: object;
  ReplaceTextSmart: boolean;
  SetButtonDisabled: unknown;
  SetCustomFunctions: unknown;
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

type CellMethodReturn<T extends CellMethodName> = CellMethodReturnMap[T];

/**
 * Cell `executeMethod` names that need a paid ONLYOFFICE edition (2 of 46).
 * Each one's own `@requires` tag names the edition it needs.
 *
 * Nothing restricts these by default - use this to opt into enforcement, e.g.
 * `function run<T extends CellFreeMethodName>(name: T, args: CellMethodArgs[T])`.
 */
type CellPaidMethodName = "EndGroupActions" | "StartGroupActions";

/** Cell `executeMethod` names available in every edition, including Community. */
type CellFreeMethodName = Exclude<CellMethodName, CellPaidMethodName>;

export type { CellMethodArgs, CellMethodName, CellMethodReturn, CellPaidMethodName, CellFreeMethodName };
