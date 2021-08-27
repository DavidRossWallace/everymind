/*
********** mindforms.js ***************
***  versian 3.0    ******************
***  Authored by David Ross Wallace **
**** 8/1/2017 ************************
**************************************
 */

mindforms = (function () {

    var state = {
        curCkeditor: "",
        ckEditorHTML: "",
        dataLink: "",
        curkn: "",
        defkn: ""
    };

    var definitionToForm = function (pPackage) {
        var oa = pPackage.oa;
        var backupCurKn = curkn;
        var targetForm = (pPackage.hasOwnProperty("targetForm")) ? pPackage.targetForm : "mindFormPanel";
        var dataKN = $("#slDefinitionLibrary").val();
        state.defkn = dataKN;
        console.log("getting for for oa:" + oa);
        console.log("the value of curkn is:" + curkn);
        $("#newObjectName").val(kn[curkn][oa].value);

        var objInstance = makeClassObject(kn[curkn][oa], kn[curkn]);

        var def = bf.indexPrep(objInstance.definition);
        var knDef = $("#slDefinitionLibrary").val();
        var deff = bf.getObjectCode(kn[knDef], def);

        if (kn[knDef].hasOwnProperty(deff)) {
            defCode = deff;
            renderObjectForm(defCode, targetForm, function (arPropMap) {
                setMatchedValues(objInstance, arPropMap);
            });
            $('#knowledgeManagerOutputPaneTab').tab('show');
            curkn = $("#activeKN").val();
        }
    };

    var renderObjectForm = function (pObjDef, targetForm, callback) {

        var defCode = pObjDef;
        var objDef = makeMindObject(kn[state.defkn][defCode], kn[state.defkn]);
        var props = new Array();
        props = objDef.related["property-of"].split(",");
        drawMindForm(objDef, state.defkn, props, targetForm, true, function (arPropMap) {
            callback(arPropMap);
            $(".select2-container").attr("width", "90%");
        });
    };
    
    var urlToCode = function (pLib, pObjectName) {
        var tCode = null;
        if (typeof pLib != "undefined") {
            if (typeof pObjectName != "undefined") {
                if (pObjectName != "") {
                    var tValue = cleanName(pObjectName);
                    var rCode = "";
                    var lib = pLib;
                    for (var sub in lib) {
                        if (lib.hasOwnProperty(lib[sub])) {
                            if (lib[sub].hasOwnProperty("value")) {
                                var tVal = lib[sub].value;
                                tVal = cleanName(tVal);
                                if (tVal == tValue) {
                                    return lib[sub].value;
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    var cleanName = function (strName) {
        if ((typeof strName == "undefined") || (strName == "")) {
            return null;
        } else {
            if (strName) {
                var tName = strName.toLowerCase();
                tName = tName.split("  ").join(" ");
                tName = tName.split(" ").join("-");
                tName = tName.split("_").join("-");
                tName = tName.split("--").join("-");
                return tName;
            } else {
                return null;
            }
        }
    };
    var unClean = function (strName) {
        if (typeof strname == "undefined") {
            return null;
        } else {
            var tName = strName.toLowerCase();
            tName = tName.split("-").join(" ");
            return tName;
        }
        return null;
    };
    var getValue = function () {
        var id = this.code;
        var sourceValue = this['maps-to'];
        var strValue = "";
        sourceValue = cleanName(sourceValue);
        strValue = this[sourceValue];
        return strValue;
    };
    var drawMindForm = function (objDef, pKnDef, arProps, pFormParent, blAllowInputs, callback) {
        var tObj = objDef;
        var arPropertyMap = new Array();
        var groupHeader = function (pId) {
            return '<div id="' + pId + '" class="row" style="clear:inline-start;">';
        };
        var groupFooter = '</div>';
        var formId = "newObjectForm";
        var elemHTML = '<div class="container-fluid"><form id="' + formId + '" name="' + formId + '" class="form" ></form></div>';
        $("#" + pFormParent).html(elemHTML);
        var pLine = 1;
        var nId = groupHeader(formId + pLine);
        $("#" + formId).append(nId + groupFooter);
        elemHTML = "";
        var colCount = 12;
        var knDef = pKnDef; 
        for (var i = 0; i < arProps.length; i++) {
            var curObjCode = bf.getObjectCode(kn[knDef], arProps[i]);
            var curObj = makeMindObject(kn[knDef][curObjCode], kn[knDef]);
            if (curObj.hasOwnProperty("input-type")) {

                if (curObj.hasOwnProperty("controlwidth") != true) {
                    curObj.controlwidth = 2;
                }
                var curColWidth = curObj.controlwidth;
                var remaining = colCount - curColWidth;
                if (remaining < 0) {

                    colCount = 12 - curColWidth;
                    pLine = pLine + 1;
                    var newHeader = groupHeader(formId + pLine);
                    $("#" + formId).append(newHeader + groupFooter);
                } else {
                    colCount = colCount - curColWidth;
                }

                $("#" + formId + pLine).append(buildFormElement.call(curObj));
                if ((curObj.hasOwnProperty("option-source-type")) && (curObj.hasOwnProperty("input-type"))) {
                    curObj.options = getOptions.call(curObj);
                    if (curObj.options.length > 0) {
                        var opt = addControlOptions.call(curObj);
                    }
                }
                arPropertyMap.push({
                    "id": cleanName(curObj.code),
                    "val": cleanName(curObj['maps-to']),
                    "input-type": cleanName(curObj['input-type']),
                    "instances": cleanName(curObj['instances'])
                });
            }
        }
        callback(arPropertyMap);
    };
    var getOptions = function () {

        var getSource = {

            "defined": function (t) {
                var rOpt = '';
                if (t.related.hasOwnProperty('option-of')) {
                    rOpt = t.related['option-of'].split(',');
                }
                return rOpt;
            },
            "dynamic": function (t) {

                var definitionLib = $("#slDefinitionLibrary").val();
                var knowledgeLib = $("#activeKN").val();
                
                var optionSourceLibrary = (t.hasOwnProperty("option-source-library")) ? t["option-source-library"] : "knowledge";
                var library = (optionSourceLibrary == "schema") ? definitionLib : knowledgeLib;
                
                var filterR = (t.hasOwnProperty("filterr")) ? bf.getObjectCode(kn[library], t["filterr"]) : "";
                var filterOB = (t.hasOwnProperty("filterob")) ? bf.getObjectCode(kn[library], t["filterob"]) : "";
                var objectSourceNode = (t.hasOwnProperty("object-source-node")) ? bf.getObjectCode(kn[library], t["object-source-node"]) : "";
                var optionReturnNode = (t.hasOwnProperty("option-return-node")) ? bf.getObjectCode(kn[library], t["option-return-node"]) : "oa";
                
                var arObjects = [];
                var arFilteredOptions = [];
                var arNewObjects = [];
                var arReturnResults = [];
                
                if ((optionReturnNode == "") || (optionReturnNode == "oa")) {

                    arObjects = bf.getMatchingObjects([], kn[library], filterR, filterOB, objectSourceNode, ["0", "1"]);
                    if (arObjects.length >= 0) {
                        for (var i = 0; i < arObjects.length; i++) {
                            arFilteredOptions.push(kn[library][arObjects[i]].label);
                        }
                    }
                    arReturnResults = arFilteredOptions;
                } else {
                    
                    var loopNodest = (objectSourceNode == "") ? kn[library] : kn[library][objectSourceNode];
                    bf.loop_object(loopNodest, function (key) {
                        
                        if (this.hasOwnProperty("facts")) {
                            var validate = function (fact, i, subject) {
                                var returnVal = false;
                                var target = bf.getLabelOrReturn(library, fact[optionReturnNode]);
                                if ($.inArray(target, arNewObjects) < 0) {
                                    returnVal = true;
                                }
                                return returnVal;
                            };
                            var instructions = function (fact, i, subject) {
                                curVal = bf.getLabelOrReturn(library, fact[optionReturnNode]);
                                arNewObjects.push(curVal);
                                return curVal;
                            };
                            var arFilteredOptions = bf.getMatchingPairsCustomWithValidate([], this.facts, objectSourceNode, filterR, filterOB, validate, instructions, ["0", "1"]);
                        }
                    });

                    arReturnResults = arNewObjects;
                }
                return arReturnResults;
            }
        };
        var arOptions2 = new Array();
        if (this.hasOwnProperty("option-source-type")) {
            arOptions2 = getSource[this['option-source-type']](this);
        }
        return arOptions2;
    };

    var addControlOptions = function () {

        var add = {
            "select": function (t) {
                var arOptionsb = t.options;
                if (arOptionsb.length > 0) {
                    $("<option>").val("").text("").appendTo("#" + cleanName(t.code));
                    for (var x = 0; x < arOptionsb.length; x++) {
                        var optVal = bf.indexPrep(arOptionsb[x]);

                        $("<option>").val(optVal).text(optVal).appendTo("#" + cleanName(t.code));
                    }
                }
                return "";
            },
            "select2": function (t) {
                return "";
            },
            "combo-select": function (t) {
                var cOptions = t.options;
                ("#" + cleanName(t.code)).attr("data-options", cOptions.join(","));
                return "";
            },
            "textbox": function (t) {
                return "";
            },
            "autolookup": function (t) {
                return "";
            },
            "textarea": function (t) {
                return "";
            }
        };
        console.log("this before add:" + JSON.stringify(this));
        return add[this['input-type']](this);
    };
    var cleanHTML = function (tHTML) {
        var nHTML = tHTML.replace(/[^(\x20-\x7F)]*/g, '');
        return nHTML;

    };
    var setMatchedValues = function (pCurObj, pProps) {
        var arProps = pProps;
        var curObj = pCurObj;
        for (i = 0; i < arProps.length; i++) {
            var tVal = arProps[i].val;
            tVal = cleanName(tVal);
            var tInputType = arProps[i]['input-type'];
            if ((curObj.hasOwnProperty(tVal)) || (tInputType == "richtexteditor")) {
                var t = {};
                t.curObj = curObj;
                t.val = tVal;
                t.id = arProps[i].id;
                t.instances = arProps[i].instances;
                var placeData = {
                    "textbox": function (t) {
                        $('#' + t.id).val(t.curObj[t.val]);
                    },
                    "datepicker": function (t) {
                        $('#' + t.id).val(t.curObj[t.val]);
                    },
                    "autolookup": function (t) {
                        $('#' + t.id).tokenfield('setTokens', t.curObj[t.val]);
                    },
                    "combo-select": function (t) {
                        var arOptions = [];
                        $ctr = $('#' + t.id);
                        if (typeof $ctr.attr("data-options") !== typeof undefined && $ctr.attr("data-options") !== false) {
                            var curChoices = $ctr.attr("data-options");
                            arOptions = curChoices.split(',');
                        }
                        $('#' + t.id).val(t.curObj[t.val]);
                        everyMultiCombo("combo-select", arOptions, t.instances, "mindFormPanel", function () {
                        });
                    },
                    "select": function (t) {
                        $('#' + t.id).val(bf.indexPrep(t.curObj[t.val]));
                    },
                    "textarea": function (t) {
                        var dataUrl = "mindsets/" + globalMindset + "/linked-data/" + t.curObj[t.val] + ".php";
                        $.get(dataUrl, function (data) {
                            var taData = $('<div></div>').html(data);
                            $('#' + t.id).html(taData.html());
                            $('#' + t.id).attr("data-link", t.curObj[t.val]);
                            // done
                        });
                    },
                    "richtexteditor": function (t) {
                        var dataUrl;
                        if (t.curObj.hasOwnProperty(t.val)) {
                            $('#' + t.id).attr("data-link", t.curObj[t.val]);
                            var dataUrl = "mindsets/" + globalMindset + "/linked-data/" + t.curObj[t.val] + ".php";
                            //	var dataUrl='linked-data/'+ curkn+"-"+t.curObj[t.val]+".php";
                            var tThis = t;
                            console.log("***** data-link-value:" + dataUrl + "  globalMindset:" + globalMindset);
                            $('#' + t.id).load(dataUrl, function () {
                                CKEDITOR.replace(tThis.id);
                                state.curCkeditor = tThis.id;
                                state.dataLink = tThis.curObj[tThis.val];
                            });
                        } else {
                            CKEDITOR.replace(t.id);
                            state.curCkeditor = t.id;
                            state.dataLink = "data-link";
                        }

                    }
                };
                placeData[tInputType](t);
            }
        }
    };

    var makeClassObject = function (pObj, pCurKN) {
        
        tCurKN = (pCurKN == "") ? "" : pCurKN;
        function mindObj(thekn) {
            $.extend(true, this, pObj);
            $.extend(true, this, bf.factsToObject(this.facts, "", "", ["0", "1"], thekn));
        }

        return new mindObj(tCurKN);
    };

    var makeMindObject = function (pObj, pCurKN) {
        
        tCurKN = (pCurKN == "") ? kn[curkn] : pCurKN;

        function mindObj(thekn) {
            $.extend(true, this, pObj);
            this.value = bf.indexPrep(this.value);
            $.extend(true, this, defFactsToObject(this.facts, thekn));
        }
        return new mindObj(tCurKN);
    };

    var defFactsToObject = function (pFacts, tCurKn) {
        var obj = {};
        obj.related = {};
        var facts = (pFacts === "") ? new Array() : pFacts;

        var knn = tCurKn;
        if (facts) {
            for (var i = 0; i < facts.length; i++) {
                if (facts[i].d != "2") {
                    var tmpR;
                    var tmpOb;
                    if (knn.hasOwnProperty(facts[i].r)) {
                        tmpR = bf.indexPrep(knn[facts[i].r].value);
                    } else {
                        tmpR = facts[i].r;
                    }

                    if (knn.hasOwnProperty(facts[i].ob)) {
                        tmpOb = knn[facts[i].ob].value;
                    } else {
                        tmpOb = facts[i].ob;
                    }

                    if (knn.hasOwnProperty(facts[i].oa)) {
                        tmpOa = knn[facts[i].oa].value;
                    } else {
                        tmpOa = facts[i].oa;
                    }

                    if ((tmpR != "code") && (tmpR != "value") && (tmpR != "facts")) {

                        if (facts[i].d == "3") {

                            if (obj.related.hasOwnProperty(tmpR)) {
                                obj.related[tmpR] = obj.related[tmpR] + "," + tmpOb;
                            } else {
                                obj.related[tmpR] = tmpOb;
                            }
                        } else if ((facts[i].d == "1") || (facts[i].d == "0")) {
                            if (obj.hasOwnProperty(tmpR)) {
                                obj[tmpR] = obj[tmpR] + "," + tmpOb;
                            } else {
                                obj[tmpR] = tmpOb;
                            }
                        }

                    }
                }
            }
            return obj;
        }
    };

    // construct form element html
    var buildFormElement = function () {

        var wrap = function (t, html) {
            var htm = '<div class="col-lg-' + t.controlwidth + ' col-md-' + t.controlwidth + ' form-group" > ';
            htm += '<label  for="' + cleanName(t.code) + '">' + t.value + '</label><br />';
            htm += html;
            htm += '</div>';
            return htm;
        };
        var draw = {
            "select": function (t) {
                return '<select id="' + cleanName(t.code) + '"   name="' + cleanName(t.code) + '"   type="select" class="form-control"  ></select>';
            },
            "textbox": function (t) {
                return '<input type="text"   name="' + cleanName(t.code) + '" id="' + cleanName(t.code) + '" class="form-control"   />';
            },
            "autolookup": function (t) {
                return '<input type="text"  name="' + cleanName(t.code) + '" id="' + cleanName(t.code) + '" class="form-control"   />';
            },
            "combo-select": function (t) {
                return '<input type="text" name="' + cleanName(t.code) + '" id="' + cleanName(t.code) + '" class="form-control combo-select"   />';
            },
            "textarea": function (t) {
                var ctrlText = '<textarea name="' + cleanName(t.code) + '"   id="' + cleanName(t.code) + '" class="form-control"   rows="4"   /></textarea>';
                return ctrlText;
            },
            "datepicker": function (t) {
                return '<input type="text"   name="' + cleanName(t.code) + '" id="' + cleanName(t.code) + '" class="form-control date-form-field"   />';
            },
            "richtexteditor": function (t) {
                var ctrlText = '<textarea name="' + cleanName(t.code) + '" data-link="linked-data" id="' + cleanName(t.code) + '" class="form-control"   rows="4"   /></textarea>';
                return ctrlText;
            }

        };
        
        if (this.hasOwnProperty("input-type") != true) {
            this['input-type'] = "textbox";
        }
        if (this.hasOwnProperty("object-sub-type") != true) {
            this["object-sub-type"] = "property";
        }
        if (this.hasOwnProperty("instances") != true) {
            this["instances"] = "single";
        }
        
        var html = draw[this['input-type']](this);
        return wrap(this, html);
    };

    var loadTypeOptions = function () {
        var arObjectTypes = [];
        var defKn = $("#slDefinitionLibrary").val();

        if (kn[defKn]) {
            objDefCode = bf.getObjectCode(kn[defKn], "object-definition");
            objTypeCode = bf.getObjectCode(kn[defKn], "object-type");

            if ((bf.isReal(objDefCode)) && (bf.isReal(objTypeCode))) {
                if (bf.worthLooping(kn[defKn][objTypeCode].facts)) {
                    arObjectTypes = bf.getMatchingPairsCustom(arObjectTypes, kn[defKn][objDefCode].facts, "", objTypeCode, "", function (facts, i, subject, arResults) {
                        var tReturn = "";
                        var cVal = facts[i].ob;

                        if ($.inArray(cVal, arResults) < 0) {
                            tReturn = cVal;
                        }
                        return tReturn;
                    }, ["3"]);
                    
                    for (i = 0; i < arObjectTypes.length; i++) {
                        var optCode = arObjectTypes[i];
                        if (kn[defKn].hasOwnProperty(optCode)) {
                            $("<option>").val(optCode).text(kn[defKn][optCode].value).appendTo("#slNewObjectType");

                        }
                    }
                }
            }
        }
    };

    var ofui = {
        startCreateObject: function (objDef, pTargetForm) {

            var defCode = (objDef != "") ? bf.getObjectCode(kn[state.defkn], objDef) : $("#slNewObjectType").val();
            renderObjectForm(defCode, pTargetForm, function (arPropMap) {
                var arProps = arPropMap;

                for (i = 0; i < arProps.length; i++) {
                    if (arProps[i].hasOwnProperty("val")) {
                        var tVal = arProps[i].val;
                        tVal = tVal;
                        var tInputType = arProps[i]['input-type'];
                        if (tInputType == "richtexteditor") {
                            var t = {};
                            t.val = tVal;
                            t.id = arProps[i].id;

                            CKEDITOR.replace(t.id);
                            state.curCkeditor = t.id;
                            state.dataLink = "data-link";

                        }
                    }
                }
            });
        },
        endCreateObject: function () {
        }
    };

    // ******************************** Save New Object Section *******************************

    var saveNewObject = function () {
        defKn = $("#slDefinitionLibrary").val();

        ckid = state.curCkeditor;
        if (ckid != "") {

            if (kn[defKn].hasOwnProperty(ckid)) {
                var tempVal = kn[defKn][ckid].code;
                state.ckEditorHTML = cleanHTML(CKEDITOR.instances[ckid].getData());
            
                CKEDITOR.instances[ckid].destroy();
                $('#' + ckid).val(state.dataLink);
            }
            state.curCkeditor = "";
        }

        var arControls = $("#newObjectForm").serializeArray();
        var newobjectType = kn[defKn][$("#slNewObjectType").val()].value;
        var defLibrary = kn[defKn];
        var oa = $("#newObjectName").val();
        var p = {};
        
        p.oa = oa;
        p.r = "definition";
        p.direction1 = "1";
        p.factType = "r";
        if (globalMindset != "") {
            p.mindset = globalMindset;
        } else {
            var newGLobal = $("#slNewObjectType").val();
            p.mindset = newGLobal;
            bf.setGlobalMindet("mindforms800:saveNewObject", newGLobal);
        }
        p.ob = newobjectType;
        p.subType = $("#newObjType").val();

        bf.store(p);

        for (i = 0; i < arControls.length; i++) {

            if ((arControls[i].value != "") && (arControls[i].name != "newObjectItemName")) {
                var propCode = arControls[i].name;

                if (kn[defKn].hasOwnProperty(propCode)) {
                    var objDef = makeClassObject(kn[defKn][propCode], kn[defKn]);
                    objDef.newValue = arControls[i].value;
                    $ctr = $('#' + propCode);
                    if (typeof $ctr.attr("data-link") !== typeof undefined && $ctr.attr("data-link") !== false) {
                        objDef.newLinkedContentValue = state.ckEditorHTML;
                        state.dataLink = "";
                        state.ckEditorHTML = "";
                        state.curCkeditor = "";
                    } else {
                        objDef.newLinkedContentValue = "";
                    }

                    objDef.newOa = oa;
                    addSaveItem.apply(objDef);
                    var tempP = {};


                }
            }
        }

        if (globalCurrentTarget == "") {
            curkn = $("#activeKN").val();
        } else {

            curkn = globalCurrentTarget;
        }
        bf.remember(tempP, (function (p) {
            $("#newObjectForm").parent().html("");
        }));
    };
    var addSaveItem = function () {

        var t = {};
        var instances = "single";
        if (this.hasOwnProperty("instances")) {
            instances = this.instances;
        }
        t.context = "";
        if (this.hasOwnProperty("context")) {
            t.context = this.context;
        }
        t.oa = this.newOa;
        t.subType = $("#newObjType").val();
        t.r = this["maps-to"];

        t.linkedcontent = this.newLinkedContentValue;
        if (globalMindset != "") {
            t.mindset = globalMindset;
        } else {
            var newGLobal = $("#slNewObjectType").val();
            t.mindset = newGLobal;
            bf.setGlobalMindet("mindforms800:addSaveItem", newGLobal);
        }


        t.ob = this.newValue;
        t["object-sub-type"] = this["object-sub-type"];
        // console.log("adding item:" + t.oa+ "-" + t.r + "-"+t.ob);

        var addItem = {
            "single": function (t) {
                var p = {};
                p.oa = t.oa;
                p.r = t.r;
                p.ob = t.ob;
                p.instance = "single";
                p.linkedcontent = t.linkedcontent;
                p.mindset = t.mindset;
                p.context = t.context;

                if (t["object-sub-type"] == "property") {
                    p.linkedcontent = t.linkedcontent;
                    p.direction1 = "0";
                    p.factType = "p";
                } else {
                    if (t["object-sub-type"] == "linked-data") {
                        p.direction1 = "0";
                        p.factType = "ld";
                    } else {
                        p.direction1 = "1";
                        p.factType = "r";
                    }
                }

                bf.store(p);

            },
            "multiple": function (t) {
                var tOb = t.ob;
                var p = {};
                if (tOb != "") {
                    var arOb = tOb.split(",");

                    p.context = t.context;
                    p.oa = t.oa;
                    p.r = t.r;
                    p.direction1 = "1";
                    p.factType = "r";
                    p.instance = "multiple";
                    p.mindset = t.mindset;
                    if (arOb.length > 0) {
                        for (z = 0; z < arOb.length; z++) {
                            p.ob = arOb[z];
                            bf.store(p);

                        }
                    }
                }
            }
        };

        addItem[instances](t);
    };

    var init = function () {
        $('body').on('focus', ".date-form-field", function () {
            $(this).datepicker();
        });
        loadTypeOptions();
        pubsub.subscribe('loaded/knowledge', function (data) {
            loadTypeOptions();
        });
        $("#btnCreateObject").on("click", function (e) {
            e.preventDefault();
            if ($("#slNewObjectType").val() == "getNewFactForm") {
                $("#mindFormPanel").append(schemaForms.getNewFactForm());
            } else {
                if ($("#slNewObjectType").val() != "") {
                    state.defkn = $("#slDefinitionLibrary").val();
                    state.curkn == $("#activeKN").val();
                    ofui.startCreateObject("", "mindFormPanel");
                    curkn = $("#activeKN").val();
                }
            }
        });
    };

    var buildEmptyForm = function (pPackage) {
        console.log("form package:" + JSON.stringify(pPackage));
        var p = pPackage;
        state.curkn = p.knowledge;
        state.defkn = p.schema;
        // curkn=p.schema;
        var defObj = p.objectDefinitionCode;
        var targetForm = p.targetForm;
        $("#" + targetForm).html("");
        var tkn = p.schema;
        ofui.startCreateObject(defObj, targetForm);
        // curkn=$("#activeKN").val();
    };
    return {
        init: init,
        loadDef: loadTypeOptions,
        drawform: definitionToForm,
        saveNew: saveNewObject,
        buildForm: buildEmptyForm
    };
})();


    
