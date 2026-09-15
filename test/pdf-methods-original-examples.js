// @ts-check
/// <reference path="../index.d.ts" />

/**
 * ONLYOFFICE PDF Form API - examples from the documentation
 * Source: the @example blocks of src/generated/pdf-methods.ts, which
 * generate-plugin-methods.js copies verbatim from api.onlyoffice.com.
 *
 * The calls are unmodified; this file exists so that every documented
 * executeMethod call shape is type-checked against the generated types. A
 * signature that drifts on the next regeneration stops compiling here.
 *
 * Two liberties, neither touching a snippet's own text: each example is
 * wrapped in a function of its own (several declare the same top-level
 * variable with different shapes), and the names below - referenced by the
 * surrounding plugin code shown on the docs page but not by the copied block -
 * are declared so the file type-checks.
 */
/** @type {any} */
var Content;
/** @type {any} */
var ExecTypograf;
/** @type {any} */
var config;
/** @type {any} */
var ifr;
/** @type {any} */
var paste_done;
/** @type {any} */
var pos;
/** @type {any} */
var removeGuid;
/** @type {any} */
var sText;
/** @type {any} */
var setPasswordByFile;

// ==========================================================================
// CoAuthoringChatSendMessage

function example_CoAuthoringChatSendMessage() {
    window.Asc.plugin.executeMethod ("CoAuthoringChatSendMessage", [Asc.scope.meeting_info], function (isTrue) {
        if (isTrue)
            alert ("Meeting was created");
        else
            alert ("Meeting was create, please update SDK for checking info about created meeting in chat.");
    });
}

// ==========================================================================
// EndAction

function example_EndAction() {
    window.Asc.plugin.executeMethod ("EndAction", ["Block", "Save to local storage...", ""]);
}

// ==========================================================================
// GetFileToDownload

function example_GetFileToDownload() {
    window.Asc.plugin.executeMethod ("GetFileToDownload", ["pdf"], function (res) {
        console.log (res)
    });
}

// ==========================================================================
// GetFontList

function example_GetFontList() {
    window.Asc.plugin.executeMethod ("GetFontList", null, function (res) {
        console.log (res)
    });
}

// ==========================================================================
// GetInstalledPlugins

function example_GetInstalledPlugins() {
    window.Asc.plugin.executeMethod ("GetInstalledPlugins", null, function (result) {
        postMessage (JSON.stringify ({type: 'InstalledPlugins', data: result }));
    });
}

// ==========================================================================
// GetMacros

function example_GetMacros() {
    window.Asc.plugin.executeMethod ("GetMacros", [JSON.stringify(Content)], function(data) {

        try
        {
            Content = JSON.parse (data);

            for (var i = 0; i < Content.macrosArray.length; i++)
            {
                var value = Content.macrosArray[i].name;
                if (undefined === value)
                    value = "";

                value = value.replace (/&/g,'&amp;');
                value = value.replace (/</g,'&lt;');
                value = value.replace (/>/g,'&gt;');
                value = value.replace (/'/g,'&apos;');
                value = value.replace (/"/g,'&quot;');

                Content.macrosArray[i].name = value;
            }
        }
        catch (err)
        {
            Content = {
                macrosArray : [],
                current : -1
            };
        }
    });
}

// ==========================================================================
// GetSelectedText

function example_GetSelectedText() {
    function CorrectText () {
        switch (window.Asc.plugin.info.editorType) {
            case 'word':
            case 'slide': {
                window.Asc.plugin.executeMethod ("GetSelectedText", [{"Numbering": false, "Math": false, "TableCellSeparator": '\n', "ParaSeparator": '\n', "TabSymbol": String.fromCharCode(9)}], function (data) {
                    sText = data;
                    ExecTypograf (sText);
                });
                break;
            }
            case 'cell': {
                window.Asc.plugin.executeMethod ("GetSelectedText", [{"Numbering": false, "Math": false, "TableCellSeparator": '\n', "ParaSeparator": '\n', "TabSymbol": String.fromCharCode(9)}], function (data) {
                    if (data == '') {
                        sText = sText.replace (/\t/g, '\n');
                        ExecTypograf (sText);
                    }
                    else {
                        sText = data;
                        ExecTypograf (sText);
                    }
                });
                break;
            }
        }
    }
}

// ==========================================================================
// GetVersion

function example_GetVersion() {
    window.Asc.plugin.executeMethod ("GetVersion", [], function (version) {
        if (version === undefined) {
            window.Asc.plugin.executeMethod ("PasteText", [ifr.contentDocument.getElementById ("google_translate_element").outerText], function (result) {
                paste_done = true;
            });
        }
        else {
            window.Asc.plugin.executeMethod ("GetSelectionType", [], function (type) {
                switch (type) {
                    case "none":
                    case "drawing":
                        window.Asc.plugin.executeMethod("PasteText", [ifr.contentDocument.getElementById ("google_translate_element").outerText], function (result) {
                            paste_done = true;
                        });
                        break;
                    case "text":
                        window.Asc.plugin.callCommand (function () {
                            // @ts-expect-error - a documentation error, not a typing one. sdkjs declares
                            // ReplaceTextSmart only in word/apiBuilder.js, so Pdf.Api really has no such method -
                            // the PDF page copied a Word example. An unused directive here means PDF gained it.
                            Api.ReplaceTextSmart (Asc.scope.arr);
                        }, undefined, undefined, function (result) {
                            paste_done = true;
                        });
                        break;
                }
            });
        }
    });
}

// ==========================================================================
// InstallPlugin

function example_InstallPlugin() {
    window.Asc.plugin.executeMethod ("InstallPlugin", [config], function (result) {
        postMessage (JSON.stringify (result));
    });
}

// ==========================================================================
// MouseMoveWindow

function example_MouseMoveWindow() {
    window.Asc.plugin.executeMethod ("MouseMoveWindow", ["iframe_asc.{BE5CBF95-C0AD-4842-B157-AC40FEDD9841}", 70, 40]);
}

// ==========================================================================
// MouseUpWindow

function example_MouseUpWindow() {
    window.Asc.plugin.executeMethod ("MouseUpWindow", ["iframe_asc.{BE5CBF95-C0AD-4842-B157-AC40FEDD9841}", 70, 40]);
}

// ==========================================================================
// OnDropEvent

function example_OnDropEvent() {
    window.Asc.plugin.executeMethod ("OnDropEvent", [{
      "type": "onbeforedrop",
      "x" : pos.x,
      "y" : pos.y
    }]);

    window.Asc.plugin.executeMethod ("OnDropEvent", [{
      "type": "ondrop",
      "x" : pos.x,
      "y" : pos.y,
      "text" : "test text",
      "html" : "<span>test html</span>"
    }]);
}

// ==========================================================================
// PasteHtml

function example_PasteHtml() {
    window.Asc.plugin.executeMethod ("PasteHtml", ["&lt;p&gt;&lt;b&gt;Plugin methods for OLE objects&lt;/b&gt;&lt;/p&gt;&lt;ul&gt;&lt;li&gt;AddOleObject&lt;/li&gt;&lt;li&gt;EditOleObject&lt;/li&gt;&lt;/ul&gt;"]);
}

// ==========================================================================
// PasteText

function example_PasteText() {
    window.Asc.plugin.executeMethod ("PasteText", ["ONLYOFFICE for developers"]);
}

// ==========================================================================
// RemovePlugin

function example_RemovePlugin() {
    function removePlugin(backup) {
        if (removeGuid)
            window.Asc.plugin.executeMethod('RemovePlugin', [removeGuid, backup], function(result) {
                postMessage(result);
            });

        removeGuid = null;
    };
}

// ==========================================================================
// SetMacros

function example_SetMacros() {
    window.Asc.plugin.executeMethod ("SetMacros", [JSON.stringify (Content)], function () {
        window.Asc.plugin.executeCommand ("close", "");
    });
}

// ==========================================================================
// SetProperties

function example_SetProperties() {
    var initSettings = {
        "copyoutenabled" : false,
        "hideContentControlTrack" : false,
        "watermark_on_draw" : JSON.stringify ( {
            "transparent" : 0.3,
            "type" : "rect",
            "width" : 100,
            "height" : 100,
            "rotate" : -45,
            "margins" : [ 10, 10, 10, 10 ],
            "fill" : [255, 0, 0],
            "stroke-width" : 1,
            "stroke" : [0, 0, 255],
            "align" : 1,

            "paragraphs" : [ {
                "align" : 2,
                "fill" : [255, 0, 0],
                "linespacing" : 1,

                "runs" : [
                            {
                                "text" : "Do not steal, %user_name%!",
                                "fill" : [0, 0, 0],
                                "font-family" : "Arial",
                                "font-size" : 40,
                                "bold" : true,
                                "italic" : false,
                                "strikeout" : false,
                                "underline" : false
                            },
                            {
                                "text" : "<%br%>"
                            }
                        ]
                }
            ]
        }),
        "disableAutostartMacros" : true,
        "fillForms" : JSON.stringify ( {
            "tags" : {
                "111" : {
                    "text" : "Text in form with tag 111",
                    "checkBox" : "true",
                    "picture" : "https://upload.wikimedia.org/wikipedia/commons/9/91/ONLYOFFICE_logo.png",
                    "comboBox" : "item1"
                },
                "222" : {
                    "text" : "Text in form with tag 222",
                    "checkBox" : "false",
                    "comboBox" : "item2"
                },
                "333" : {
                    "text" : "OnlyOffice"
                }
            }
        })
    };
    window.Asc.plugin.executeMethod ("SetProperties", [initSettings], function () {
        window.Asc.plugin.executeCommand ("close", "");
    });
}

// ==========================================================================
// ShowButton

function example_ShowButton() {
    window.Asc.plugin.executeMethod ("ShowButton", ["back", false, "right"]);
}

// ==========================================================================
// ShowInputHelper

function example_ShowInputHelper() {
    window.Asc.plugin.executeMethod ("ShowInputHelper", ["asc.{UUID}", 70, 70, true]);
}

// ==========================================================================
// StartAction

function example_StartAction() {
    window.Asc.plugin.executeMethod ("StartAction", ["Block", "Save to local storage..."], function () {
        setPasswordByFile ("sha256", "123456");

        setTimeout (function () {
            window.Asc.plugin.executeMethod ("EndAction", ["Block", "Save to localstorage..."]);
        }, 200);
    });
}

// ==========================================================================
// UnShowInputHelper

function example_UnShowInputHelper() {
    window.Asc.plugin.executeMethod ("UnShowInputHelper", ["asc.{UUID}", true]);
}

// ==========================================================================
// UpdatePlugin

function example_UpdatePlugin() {
    window.Asc.plugin.executeMethod ("UpdatePlugin", [config], function (result) {
        postMessage (JSON.stringify (result));
    });
}
