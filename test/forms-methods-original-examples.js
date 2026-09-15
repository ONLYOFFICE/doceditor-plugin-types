// @ts-check
/// <reference path="../index.d.ts" />

/**
 * ONLYOFFICE Form API - examples from the documentation
 * Source: the @example blocks of src/generated/forms-methods.ts, which
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
var $;
/** @type {any} */
var Content;
/** @type {any} */
var CreateImageEditor;
/** @type {any} */
var ExecTypograf;
/** @type {any} */
var config;
/** @type {any} */
var create_guid;
/** @type {any} */
var defaultLang;
/** @type {any} */
var ifr;
/** @type {any} */
var imageEditor;
/** @type {any} */
var initializationDone;
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
/** @type {any} */
var updateMenu;

// ==========================================================================
// AddOleObject

function example_AddOleObject() {
    var _param = {
        "data": "{data}",
        "imgSrc": "https://link-to-the-image.jpg",
        "guid": "asc.{38E022EA-AD92-45FC-B22B-49DF39746DB4}",
        "width": 70,
        "height": 70,
        "widthPix": 60 * 36000,
        "heightPix": 60 * 36000
    };
    window.Asc.plugin.executeMethod ("AddOleObject", [_param], function() {
        window.Asc.plugin.executeCommand ("close", "");
    });
}

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
// ConvertDocument

function example_ConvertDocument() {
    let info = "";
    window.Asc.plugin.executeMethod ("ConvertDocument", ["markdown", false, false, true, false], function (output) {
        // @ts-expect-error - getElementById returns HTMLElement; the snippet omits the narrowing to
        // HTMLTextAreaElement that .value needs. Plain DOM, nothing to do with these types.
        document.getElementById ("text-area").value = info + output;
    });
}

// ==========================================================================
// EditOleObject

function example_EditOleObject() {
    var _param = {
        "data": "{data}",
        "imgSrc": "https://link-to-the-image.jpg",
        "objectId": "5_556",
        "width": 70,
        "height": 70,
        "widthPix": 60 * 36000,
        "heightPix": 60 * 36000
    };
    window.Asc.plugin.executeMethod ("EditOleObject", [_param], function () {
        window.Asc.plugin.executeCommand ("close", "");
    });
}

// ==========================================================================
// EndAction

function example_EndAction() {
    window.Asc.plugin.executeMethod ("EndAction", ["Block", "Save to local storage...", ""]);
}

// ==========================================================================
// GetAllForms

function example_GetAllForms() {
    window.Asc.plugin.executeMethod ("GetAllForms", null, function (data) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].Tag == 11) {
                this.Asc.plugin.executeMethod ("SelectContentControl", [data[i].InternalId]);
                break;
            }
        }
    });
}

// ==========================================================================
// GetDocumentLang

function example_GetDocumentLang() {
    window.Asc.plugin.executeMethod("GetDocumentLang", [], function(lang) {
    	let documentLang = lang || defaultLang;

    	let options = Array.from($('#custom_menu option'));
    	let defaultOption = options.find(function(item) {
    		if (item.value == defaultLang)
    			return item;
    	});

    	let matchOption = undefined;
    	matchOption = options.find(function(item) {
    		if (item.value == documentLang)
    			return true;
    	});
    	if (!matchOption) {
    		matchOption = options.find(function(item) {
    			if (item.value.search(documentLang.split('-')[0]) != -1)
    				return true;
    		});
    	}

    	if (!matchOption)
    		matchOption = defaultOption;

    	if (matchOption) {
    		$('#custom_menu').val(matchOption.value);
    		$('#custom_menu').trigger('change');
    	}
    });
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
// GetFormValue

function example_GetFormValue() {
    window.Asc.plugin.executeMethod ("GetFormValue", ["1_713"], function (res) {
        console.log (res)
    });
}

// ==========================================================================
// GetFormsByTag

function example_GetFormsByTag() {
    window.Asc.plugin.executeMethod ("GetFormsByTag", ["{tag}"], function (data) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].InternalId == "5_556") {
                this.Asc.plugin.executeMethod ("SelectContentControl", [data[i].InternalId]);
                break;
            }
        }
    });
}

// ==========================================================================
// GetImageDataFromSelection

function example_GetImageDataFromSelection() {
    window.Asc.plugin.executeMethod ("GetImageDataFromSelection", [], function (result) {
        let image = document.createElement("img");
        image.src = result.src;
        image.width = result.width;
        image.height = result.height;
        CreateImageEditor ();
        initializationDone = true;
        var imageHeight = null;
        image.height > 500 ? imageHeight = 500 : imageHeight = image.height;
        window.Asc.plugin.resizeWindow (undefined, undefined, 870, imageHeight + 300, 0, 0);
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
// GetSelectedContent

function example_GetSelectedContent() {
    const prepareShape = function () {
    	const doc = Api.GetDocument();

    	const text = 'Text string to select from.';
    	const paragraph = doc.GetElement(0);
    	// @ts-expect-error - GetElement returns the union of everything a document can hold; AddText is
    	// ApiParagraph's. The snippet assumes the first element is a paragraph and does not check.
    	paragraph.AddText(text);

    	const range = paragraph.GetRange(6, 12);
    	range.Select();
    };

    Asc.plugin.callCommand(prepareShape);
    Asc.plugin.executeMethod('GetSelectedContent', [], console.log);
}

// ==========================================================================
// GetSelectedOleObjects

function example_GetSelectedOleObjects() {
    window.Asc.plugin.executeMethod ("GetSelectedOleObjects");
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
// GetSelectionType

function example_GetSelectionType() {
    window.Asc.plugin.executeMethod ("GetSelectionType", [], function(type) {
        switch (type) {
            case "none":
            case "drawing":
                window.Asc.plugin.executeMethod ("PasteText", [$("#txt_shower")[0].innerText], function (result) {
                    paste_done = true;
                });
                break;
            case "text":
                window.Asc.plugin.callCommand (function() {
                    Api.ReplaceTextSmart (Asc.scope.arr);
                }, undefined, undefined, function(result) {
                    paste_done = true;
                });
                break;
        }
    });
}

// ==========================================================================
// GetVBAMacros

function example_GetVBAMacros() {
    window.Asc.plugin.executeMethod ("GetVBAMacros", null, function (data) {
        if (data && typeof data === 'string' && data.includes ('<Module')) {
            var arr = data.split ('<Module ').filter (function (el) {return el.includes ('Type="Procedural"')});
            arr.forEach (function (el) {
                var start = el.indexOf ('<SourceCode>') + 12;
                var end = el.indexOf ('</SourceCode>', start);
                var macros = el.slice (start, end);

                start = el.indexOf ('Name="') + 6;
                end = el.indexOf ('"', start);
                var name = el.slice (start, end);
                var index = Content.macrosArray.findIndex (function (macr) {return macr.name == name});
                if (index == -1) {
                    macros = macros.replace (/&amp;/g,'&');
                    macros = macros.replace (/&lt;/g,'<');
                    macros = macros.replace (/&gt;/g,'>');
                    macros = macros.replace (/&apos;/g,'\'');
                    macros = macros.replace (/&quot;/g,'"');
                    macros = macros.replace (/Attribute [\w \.="\\]*/g,'');
                    Content.macrosArray.push (
                        {
                            name: name,
                            value: '(function ()\n{\n\t/* Enter your code here. */\n})();\n\n/*\nExecution of VBA commands does not support.\n' + macros + '*/',
                            guid: create_guid ()
                        }
                    );
                }
            });
        }
        updateMenu ();
        // @ts-ignore - CustomContextMenu is app-level plugin UI code, not part of the SDK ambient types
        window.CustomContextMenu.init ();
        if (Content.current === -1)
        {
            let event = new Event ("click");
            document.getElementById ("button_new").dispatchEvent (event);
        }
    });
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
// InputText

function example_InputText() {
    window.Asc.plugin.executeMethod ("InputText", ["ONLYOFFICE Plugins", "ONLYOFFICE for developers"]);
}

// ==========================================================================
// InstallPlugin

function example_InstallPlugin() {
    window.Asc.plugin.executeMethod ("InstallPlugin", [config], function (result) {
        postMessage (JSON.stringify (result));
    });
}

// ==========================================================================
// IsFormSigned

function example_IsFormSigned() {
    window.Asc.plugin.executeMethod ("IsFormSigned", [], function(isSigned) {
        console.log ("Form is signed: " + isSigned);
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
// OnEncryption

function example_OnEncryption() {
    window.Asc.plugin.executeMethod ("OnEncryption", [
        {
            "type": "getPasswordByFile",
            "password": "123456",
            "docinfo": "{docinfo}",
            "hash": "sha256"
        }
    ]);
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
// PutImageDataToSelection

function example_PutImageDataToSelection() {
    // @ts-ignore - saveImage is app-level plugin UI code, not part of the SDK ambient Window type
    window.saveImage = function () {
        let imageSrc = imageEditor.toDataURL ();
        let editorDimension = imageEditor.getCanvasSize ();
        let width = editorDimension.width;
        let height = editorDimension.height;
        let imageData = {
            "src": imageSrc,
            "width": width,
            "height": height
        };
        window.Asc.plugin.executeMethod ("PutImageDataToSelection", [imageData]);
        window.Asc.plugin.executeCommand ("close", "");
    };
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
// ReplaceTextSmart

function example_ReplaceTextSmart() {
    window.Asc.plugin.executeMethod ("ReplaceTextSmart", [Asc.scope.arr, String.fromCharCode(9), String.fromCharCode(13)], function (isDone) {
        if (!isDone)
            window.Asc.plugin.callCommand (function () {
                Api.ReplaceTextSmart (Asc.scope.arr);
            });
    });
}

// ==========================================================================
// SetFormValue

function example_SetFormValue() {
    window.Asc.plugin.executeMethod ("SetFormValue", ["1_713", true]);
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
// ShowError

function example_ShowError() {
    const text = 'Message you want to show';
    const level = 0; // Warning, not an error
    Asc.plugin.executeMethod('ShowError', [text, level]);
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
