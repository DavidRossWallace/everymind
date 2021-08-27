var ncomp = (function () {

    var utilities = {
        getRealValue: function (pCheck) {
            var tValue = pCheck;
            if (pCheck != "meta") {
                if (kn[curkn].hasOwnProperty(pCheck)) {
                    if (kn[curkn][pCheck].hasOwnProperty("value")) {
                        tValue = kn[curkn][pCheck].value;
                    } else if (kn[curkn][pCheck].hasOwnProperty("meta")) {
                        if (kn[curkn][pCheck].meta.hasOwnProperty("value")) {
                            tValue = kn[curkn][pCheck].meta.value;
                        }
                    }
                }
            }
            return tValue;
        },
        getRealLabel: function (pCheck) {
            var tValue = pCheck;
            if (pCheck != "meta") {
                if (kn[curkn].hasOwnProperty(pCheck)) {
                    if (kn[curkn][pCheck].hasOwnProperty("label")) {
                        tValue = kn[curkn][pCheck].label;
                    } else if (kn[curkn][pCheck].hasOwnProperty("meta")) {
                        if (kn[curkn][pCheck].meta.hasOwnProperty("label")) {
                            tValue = kn[curkn][pCheck].meta.label;
                        }
                    }
                }
                if (kn[curkn].hasOwnProperty("index")) {
                    if (kn[curkn].index.hasOwnProperty(pCheck)) {
                        var tCode = kn[curkn].index[pCheck];
                        if (kn[curkn].hasOwnProperty(tCode)) {
                            if (kn[curkn][tCode].hasOwnProperty("label")) {
                                tValue = kn[curkn][tCode].label;
                            }
                        }
                    }
                }
            }
            return tValue;
        },
        nodeKeyCount: function (pNode) {
            var tCount = 0;
            if (kn[curkn].hasOwnProperty(pNode)) {

                tCount = Object.keys(kn[curkn][pNode]).length;
            }
            return tCount;
        },
        nodeChildKeyCount: function (pNode, pChild) {
            var tCount = 0;
            if (kn[curkn].hasOwnProperty(pNode)) {
                if (kn[curkn][pNode].hasOwnProperty(pChild)) {
                    tCount = Object.keys(kn[curkn][pNode][pChild]).length;
                }
            }
            return tCount;
        },
        arrayNodeCount: function (parentNode, pSubNode) {
            var tCount = 0;
            if (kn[curkn].hasOwnProperty(parentNode)) {
                if (kn[curkn][parentNode].hasOwnProperty(pSubNode)) {
                    tCount = kn[curkn][parentNode][pSubNode].length;
                }
            }
            return tCount;
        },
        objectNodeCount: function (parentNode, subNode) {
            var tCount = 0;
            if (kn[curkn].hasOwnProperty(parentNode)) {
                if (kn[curkn][parentNode].hasOwnProperty(subNode)) {
                    tCount = Object.keys(kn[curkn][parentNode][subNode]).length;
                }
            }
            return tCount;
        },
        getIfExists: function (pNode, pProperty) {
            var rValue = "";
            if (kn[curkn].hasOwnProperty(pNode)) {
                if (kn[curkn][pNode].hasOwnProperty(pProperty)) {
                    rValue = kn[curkn][pNode][pProperty];
                }
            }
            return rValue;
        },
        getShortString: function (pStr, pLen) {
            var newstr = pStr;
            if (newstr.length > pLen) {
                newstr = newstr.substr(0, pLen) + "...";
            }
            return newstr;
        }
    };
    var controlDefinitions = {
        wrapControls: {
            newFactForm: function () {

                var htm = '<div class="list-group-item new-fact" ><div class="row">';
                htm += '<div class="col-lg-11 col-md-11 col-sm-11"><div class="input-group" style="width:100%;padding:0;margin:0;">';
                htm += '<span class="input-group-addon pre-label" style="width:5%;padding:0;margin:0;">r</span>';
                htm += '<span class="input-group-addon pre-label" style="width:25%;padding:0;margin:0;"><input type="text" class="form-control new-r-value" id="newrvalue" placeholder="new property"  value="" ></span>';
                htm += '<span class="input-group-addon pre-label" style="width:5%;padding:0;margin:0;">ob</span>';
                htm += '<span class="input-group-addon pre-label" style="width:55%;padding:0;margin:0;"><input type="text"  id="new" class="form-control new-ob-value" placeholder="new value" ></span>';
                htm += '<div class="input-group-btn"><button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Add <span class="caret"></span></button>';
                htm += '<ul class="dropdown-menu dropdown-menu-left">';
                htm += '<li data-value="1"><a href="javascript:void(0);"  class="insert-action" data-command="addMetaProperty">Meta Property</a></li>';
                htm += '<li data-value="2"><a href="javascript:void(0);"  class="insert-action"  data-command="saveNewFactProperty">Fact Property</a></li>';
                htm += '<li data-value="3"><a href="javascript:void(0);" class="insert-action"  data-command="saveNewFactEdge">Edge</a></li>';
                htm += '<li role="separator" class="divider"></li>';
                htm += '<li data-value="4"><a href="javascript:void(0);"  class="insert-action"  data-command="addSubContext">sub object</a></li>';
                htm += '<li data-value="5"><a href="javascript:void(0);"  class="insert-action"  data-command="addSubArray">array</a></li>';
                htm += '</ul></div></div></div></div></div>';
                return htm;
            },
            newPropertyForm: function () {

                var htm = '<div class="list-group-item new-fact"   ><div class="row">';
                htm += '<div class="col-lg-11 col-md-11 col-sm-11"><div class="input-group"  style="width:100%;padding:0;margin:0;">';
                htm += '<span class="input-group-addon pre-label" style="width:7%;padding:0;margin:0;">Prop</span>';
                htm += '<span class="input-group-addon pre-label" style="width:23%;padding:0;margin:0;"><input type="text" class="form-control new-r-value"   ></span>';
                htm += '<span class="input-group-addon pre-label" style="width:7%;padding:0;margin:0;">Value</span>';
                htm += '<span class="input-group-addon pre-label" style="width:53%;padding:0;margin:0;"><input type="text"  class="form-control new-ob-value" placeholder="new value" ></span>';
                htm += '<div class="input-group-btn"><button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Add <span class="caret"></span></button>';
                htm += '<ul class="dropdown-menu dropdown-menu-left">';
                htm += '<li data-value="1"><a href="javascript:void(0);" class="insert-action" data-command="addSingleEdgeContext">Context Edge</a></li>';
                htm += '<li data-value="2"><a href="javascript:void(0);" class="insert-action" data-command="addMetaProperty">Meta Property</a></li>';
                htm += '<li data-value="3"><a href="javascript:void(0);" class="insert-action"  data-command="addFactProperty">Fact Property</a></li>';
                htm += '<li data-value="4"><a href="javascript:void(0);" class="insert-action"  data-command="addEdgeProperty">Edge</a></li>';
                htm += '<li role="separator" class="divider"></li>';
                htm += '<li data-value="5"><a href="javascript:void(0);"  class="insert-action"  data-command="addSubContext">sub object</a></li>';
                htm += '<li data-value="6"><a href="javascript:void(0);"  class="insert-action"  data-command="addSubArray">array</a></li>';
                htm += '</ul></div></div></div></div></div>';
                return htm;
            },
            keyAndSubArray: function (pKeyCode, pValue, pParentKey, pGrandparent) {
                var htm = "";
                var keyValue = utilities.getRealValue(pKeyCode);
                var keyLabel = utilities.getShortString(keyValue, 50);
                var keyHeading = pKeyCode;
                if (keyValue != pKeyCode) {
                    keyHeading += '&nbsp;:&nbsp;' + keyValue;
                }
                var tCount = 0;
                tCount = utilities.arrayNodeCount(pParentKey, pKeyCode);


                var newEntry = controlDefinitions.wrapControls.newFactForm();
                if (pValue != "") {
                    pValue = newEntry + pValue;
                } else {
                    pValue = newEntry;
                }
                htm += '<div class="list-group-item section-heading"  data-id="' + pKeyCode + '" title="party" >';
                htm += '<div class="row">';
                htm += '<div class="col-lg-9 col-md-9 col-sm-9 section-heading-text" aria-expanded="false" aria-controls="#' + pGrandparent + pParentKey + pKeyCode + '"  data-toggle="collapse" href="#' + pGrandparent + pParentKey + pKeyCode + '" >';
                htm += "array:&nbsp;" + keyHeading + '&nbsp;&nbsp;<i class="fa fa-plus text-primary" aria-hidden="true"></i></div>';
                htm += '<div class="col-lg-2 col-md-2 right-cell section-header-label"  ><a href="#" class="section-header-label"><span class="badge">' + tCount + '</span></a></div>';
                htm += '<div class="col-lg-1 col-md-1 col-sm-1">';
                htm += '<button type="button" class="btn btn-danger btn-sm delete-command" data-r="' + pKeyCode + '" data-command="deleteMetaObject"><i class="fa fa-trash-o fa-fw" aria-hidden="true"></i></button>';
                htm += '</div>';
                htm += '</div>';
                htm += '<div class="row">';
                htm += '<div class="col-lg-12 col-md-12 col-sm-12 collapse sub-node-section" id="' + pGrandparent + pParentKey + pKeyCode + '">';
                htm += '<div class="list-group" data-parent-value="' + keyValue + '" data-parent-code="' + pKeyCode + '" >' + pValue + '</div>';
                htm += '</div></div></div>';
                // console.log(htm);
                return htm;
            },
            keyAndSubObject: function (pKeyCode, pValue, pParentKey, pGrandparent) {
                var htm = "";
                var keyValue = utilities.getRealValue(pKeyCode);
                var keyLabel = utilities.getShortString(keyValue, 50);
                var keyHeading = pKeyCode;
                if (keyValue != pKeyCode) {
                    keyHeading += '&nbsp;:&nbsp;' + keyValue;
                }
                var tCount = 0;
                tCount = utilities.objectNodeCount(pParentKey, pKeyCode);
                var newEntry = controlDefinitions.wrapControls.newPropertyForm();
                if (pValue != "") {
                    pValue = newEntry + pValue;
                } else {
                    pValue = newEntry;
                }
                htm += '<div class="list-group-item section-heading"  data-id="' + pKeyCode + '" title="party" >';
                htm += '<div class="row">';
                htm += '<div class="col-lg-9 col-md-9 col-sm-9 section-heading-text" aria-expanded="false" aria-controls="#' + pGrandparent + pParentKey + pKeyCode + '"  data-toggle="collapse" href="#' + pGrandparent + pParentKey + pKeyCode + '" >';
                htm += "object:&nbsp;" + keyHeading + '&nbsp;&nbsp;<i class="fa fa-plus text-primary" aria-hidden="true"></i></div>';
                htm += '<div class="col-lg-2 col-md-2 right-cell section-header-label"  ><a href="#" class="section-header-label"><span class="badge">' + tCount + '</span></a></div>';
                htm += '<div class="col-lg-1 col-md-1 col-sm-1">';
                htm += '<button type="button" class="btn btn-danger btn-sm delete-command" data-r="' + keyValue + '" data-command="deleteMetaObject"><i class="fa fa-trash-o fa-fw" aria-hidden="true"></i></button>';
                htm += '</div>';
                htm += '</div>';
                htm += '<div class="row">';
                htm += '<div class="col-lg-12 col-md-12 collapse sub-node-section" id="' + pGrandparent + pParentKey + pKeyCode + '">';
                htm += '<div class="list-group" data-parent-value="' + keyValue + '" data-parent-code="' + pKeyCode + '" >' + pValue + '</div>';
                htm += '</div></div></div>';
                return htm;
            },
            nodeObject: function (pKey, pValue, pParentKey) {
                var htm = "";
                htm += '<div class="list-group-item">';
                htm += '<div class="row">';
                htm += '<div class="col-lg-12 col-md-12  "  data-toggle="tooltip" title="party!">' + controlDefinitions.wrapControls.newFactForm() + pValue + '</div>';
                htm += '</div></div>';
                return htm;
            },
            nodePair: function (pKey, pValue, pParentKey) {
                var htm = "";
                htm += '<div class="list-group-item"><div class="row">';
                htm += '<div class="col-lg-4 col-md-2  item-cell node-property-heading"  data-toggle="tooltip" title="party">' + pKey + '</div>';
                htm += '<div class="col-lg-8 col-md-10 item-cell " >' + pValue + '</div>';
                htm += '</div></div>';
                return htm;
            }
        },
        property: function (pKey, pValue, pParent) {

            var htm = '<div class="list-group-item"  data-parent="' + tParent + '"  data-oa="' + pParent + '" data-ob="' + pValue + '" data-r="' + pKey + '"><div class="row"><div class="col-lg-12 col-md-12 col-sm-12"><div class="input-group" style="width:100%">';
            htm += '<span class="input-group-addon" style="padding:0;margin:0;width:15%;"><input type="text" disabled class="form-control input-sm data-r-value"  value="' + pKey + '">';
            htm += '</span><span class="input-group-addon" style="padding:0;margin:0;width:55%;"><input type="text" value="' + pValue + '" class="form-control input-sm data-ob-value" ></span><div class="input-group-btn">';
            htm += '<button type="button" class="btn btn-danger btn-sm   delete-command"  data-command="deleteMetaProperty"><i class="fa fa-trash-o fa-fw" aria-hidden="true"></i></button>';
            htm += '<button type="button" class="btn btn-default btn-sm data-command"   data-command="updateMetaProperty"><i class="fa fa-plus fa-fw" aria-hidden="true"></i></button>';
            htm += '</div></div></div></div></div>';

            return htm;
        },
        factControls: {
            relation: function (factR, factOB, eValue, facts, tParent) {
                var oaValue = utilities.getRealValue(facts.oa);
                var htm = '<div class="list-group-item"   data-parent="' + tParent + '" data-oa="' + oaValue + '" data-ob="' + factOB + '" data-r="' + factR + '" ><div class="row"><div class="col-lg-12 col-md-12"><div class="input-group"  style="width:100%">';
                htm += '<div class="input-group-btn">';
                htm += '<button type="button"  data-node-code="' + facts.r + '"  class="btn btn-default btn-sm open-fact-node"><i class="fa fa-external-link fa-fw" aria-hidden="true"></i></button></div>';
                htm += '<span class="input-group-addon" style="width:5%;padding:0;margin:0;" data-toggle="tooltip" title="party">r</span>';
                htm += '<span class="input-group-addon" style="width:25%;padding:0;margin:0;"><input type="text" disabled class="form-control r-value input-sm"  value="' + factR + '"></span>';
                htm += '<span class="input-group-addon" style="width:5%;padding:0;margin:0;">ob</span>';
                htm += '<span class="input-group-addon" style="width:50%;padding:0;margin:0;"><input type="text" disabled    class="form-control ob-value input-sm" value="' + factOB + '"></span>';
                htm += '<span class="input-group-addon" style="width:5%;padding:0;margin:0;"><input type="text" disabled    class="form-control fact-direction-value input-sm" value="' + facts.d + '"></span>';
                htm += '<div class="input-group-btn">';
                if (facts.d == 1) {
                    htm += '<button type="button" data-oa="' + facts.oa + '" data-ob="' + facts.ob + '" data-r="' + facts.r + '"  class="btn btn-danger btn-sm delete-command" data-command="deleteFact">';
                    htm += '<i class="fa fa-trash-o fa-fw" aria-hidden="true"></i></button>';
                }
                htm += '<button type="button"  data-node-code="' + facts.ob + '"  class="btn btn-default btn-sm open-fact-node"><i class="fa fa-external-link fa-fw" aria-hidden="true"></i></button>';
                htm += '</div></div></div></div></div>';
                return htm;
            },
            edge: function (factR, factOB, eValue, facts, tParent) {
                var oaValue = utilities.getRealValue(facts.oa);
                var htm = '<div class="list-group-item"   data-parent="' + tParent + '" data-e="' + eValue + '" data-oa="' + oaValue + '" data-ob="' + factOB + '" data-r="' + factR + '" ><div class="row"><div class="col-lg-12 col-md-12"><div class="input-group"  style="width:100%">';
                htm += '<div class="input-group-btn">';
                htm += '<button type="button"  data-node-code="' + facts.e + '"  class="btn btn-default btn-sm open-fact-node"><i class="fa fa-external-link fa-fw" aria-hidden="true"></i></button></div>';
                htm += '<span class="input-group-addon" style="width:5%;padding:0;margin:0;" data-toggle="tooltip" title="party">e</span>';
                htm += '<span class="input-group-addon" style="width:25%;padding:0;margin:0;"><input type="text" disabled class="form-control r-value input-sm"  value="' + facts.e + '"></span>';
                htm += '<div class="input-group-btn">';
                htm += '<button type="button"  data-node-code="' + facts.r + '"  class="btn btn-default btn-sm open-fact-node"><i class="fa fa-external-link fa-fw" aria-hidden="true"></i></button></div>';
                htm += '<span class="input-group-addon" style="width:5%;padding:0;margin:0;" data-toggle="tooltip" title="party">r</span>';
                htm += '<span class="input-group-addon" style="width:25%;padding:0;margin:0;"><input type="text" disabled class="form-control r-value input-sm"  value="' + factR + '"></span>';
                htm += '<span class="input-group-addon" style="width:5%;padding:0;margin:0;">ob</span>';
                htm += '<span class="input-group-addon" style="width:50%;padding:0;margin:0;"><input type="text" disabled    class="form-control ob-value input-sm" value="' + factOB + '"></span>';
                htm += '<span class="input-group-addon" style="width:5%;padding:0;margin:0;"><input type="text" disabled    class="form-control fact-direction-value input-sm" value="' + facts.d + '"></span>';
                htm += '<div class="input-group-btn">';
                if (facts.d == 1) {
                    htm += '<button type="button" data-oa="' + facts.oa + '" data-ob="' + facts.ob + '" data-r="' + facts.r + '"  class="btn btn-danger btn-sm delete-command" data-command="deleteFact">';
                    htm += '<i class="fa fa-trash-o fa-fw" aria-hidden="true"></i></button>';
                }
                htm += '<button type="button"  data-node-code="' + facts.ob + '"  class="btn btn-default btn-sm open-fact-node"><i class="fa fa-external-link fa-fw" aria-hidden="true"></i></button>';
                htm += '</div></div></div></div></div>';
                return htm;
            },
            property: function (factR, factOB, eValue, facts, tParent) {
                var oaValue = utilities.getRealValue(facts.oa);
                var htm = '<div class="list-group-item fact-oa" data-oa="' + oaValue + '"  data-parent="' + tParent + '" data-r="' + factR + '"><div class="row"><div class="col-lg-12 col-md-12 col-sm-12"><div class="input-group"  style="width:100%;">';
                htm += '<div class="input-group-btn">';
                htm += '<button type="button"  data-node-code="' + facts.r + '"  class="btn btn-default btn-sm open-fact-node"><i class="fa fa-external-link fa-fw" aria-hidden="true"></i></button></div>';
                htm += '<span class="input-group-addon"  style="width:5%;padding:0;margin:0;" data-toggle="tooltip" title="party">r</span>';
                htm += '<span class="input-group-addon" style="width:25%;padding:0;margin:0;"><input type="text" disabled class="form-control r-value"  value="' + factR + '"></span>';
                htm += '<span class="input-group-addon pre-label" style="width:5%;padding:0;margin:0;">ob</span>';
                htm += '<span class="input-group-addon" style="width:55%;padding:0;margin:0;"><input type="text" value="' + factOB + '"  class="form-control ob-value" ></span><div class="input-group-btn">';
                htm += '<button type="button" data-oa="' + facts.oa + '" data-ob="' + facts.ob + '" data-r="' + facts.r + '" class="btn btn-danger btn-sm  delete-command" data-command="deleteFact"><i class="fa fa-trash-o fa-fw" aria-hidden="true"></i></button>';
                htm += '<button type="button" class="btn btn-default btn-sm update-property data-command" data-command="updateFactProperty"><i class="fa fa-plus fa-fw" aria-hidden="true"></i></button>';
                htm += '</div></div></div></div></div>';
                return htm;
            },
            metaProperty: function (k, v, tParent) {
                var htm = controlDefinitions.factControls.property(k, v, "metaProperty", tParent);
                return htm;
            }
        }
    };

    var displayDefinitions = {
        nodeObject: function (pKey, pValue, pParentKey) {
            var htm = "";
            htm += '<div class="list-group-item ">';
            htm += '<div class="row">';
            htm += '<div class="col-lg-12 col-md-12  "  data-toggle="tooltip" title="' + pParentKey + '!">' + pValue + '</div>';
            htm += '</div></div>';
            return htm;
        },
        nodePair: function (pKey, pValue, pParentKey) {
            var htm = "";
            htm += '<div class="list-group-item"><div class="row">';
            htm += '<div class="col-lg-4 col-md-2  item-cell node-property-heading"  data-toggle="tooltip" title="' + pParentKey + '!">' + pKey + '</div>';
            htm += '<div class="col-lg-8 col-md-10 item-cell " >' + pValue + '</div>';
            htm += '</div></div>';
            return htm;
        },
        nodeArray: function (pKey, pValue, pParentKey) {
            var htm = "";
            var keyValue = utilities.getShortString(utilities.getRealValue(pKey), 50);
            var keyLabel = utilities.getShortString(utilities.getRealLabel(pKey), 50);
            var keyHeading = pKey;
            if (keyValue != pKey) {
                keyHeading += '&nbsp;:&nbsp;<b>' + keyLabel + '</b>';
            }
            var tCount = 0;
            tCount = utilities.nodeKeyCount(pKey);
            if (pKey != "facts") {
                tCount = tCount + utilities.arrayNodeCount(pKey, "facts");
            }
            htm += '<a class="list-group-item object-node"  data-id="' + pKey + '">';
            htm += '<div class="row">';
            htm += '<div class="col-lg-10 col-md-10 base-node-list-item" ';
            htm += ' data-id="' + pKey + '" title="party" >' + keyHeading + '&nbsp;&nbsp;<i class="fa fa-plus text-primary" ></i></div>';
            htm += '<div class="col-lg-2 col-md-2 right-cell "  ><span class="badge">' + tCount + '</span></div>';
            htm += '</div></a>';
            return htm;
        }
    };

    var dataFun = {
        getObjectChain: function (listNode, stopVal) {
            var tCount = 1;

            var getNextItem = function (pListNode, pNodeArray, pStopVal, pCount) {
                var curNode = pListNode;

                var curStopVal = pStopVal;
                var innerCount = pCount + 1;
                if (innerCount > 10) {
                    return pNodeArray;
                }

                var nextNode = pListNode.parent().closest(".list-group");

                var checkCode = nextNode.attr("data-parent-code");
                console.log("checkCode:" + checkCode);
                if (checkCode == curStopVal) {
                    // console.log("attr:" + nextNode.attr("base-node"));
                    // curArray.push(curStopVal);
                    return pNodeArray;
                } else {
                    pNodeArray.unshift(nextNode.attr("data-parent-value"));
                    return getNextItem(nextNode, pNodeArray, curStopVal, innerCount);

                }


            };
            var startArray = [];
            return getNextItem(listNode, startArray, stopVal, tCount);
        },
        updateFactProperty: function ($btn) {
            var lstItem = $btn.closest(".list-group-item");
            var oacode = $("#baseNodeCode").val();
            var oaval = $("#baseNodeValue").val();
            var rval = lstItem.attr("data-r");
            var lstGroup = lstItem.closest(".list-group");
            var arChain = dataFun.getObjectChain(lstItem, oacode);
            arChain.unshift(oacode);

            // arChain.push(rval);
            var obval = lstItem.find(".ob-value").val();
            var p = {
                direction1: "0",
                oa: oaval,
                r: rval,
                context: arChain,
                ob: obval,
                factType: "p"
            };
            bf.store(p);
            bf.remember(function (p) {
                htm = controlDefinitions.factControls.property(rval, obval, oaval);
                lstItem.replaceWith(htm);
            });
        },
        saveNewFactProperty: function ($btn) {
            var lstItem = $btn.closest(".new-fact");
            var oacode = $("#baseNodeCode").val();
            var oaval = $("#baseNodeValue").val();

            var rval = lstItem.find(".new-r-value").val();
            var arChain = dataFun.getObjectChain(lstItem, oacode);
            arChain.unshift(oacode);
            //arChain.push(rval);
            var obval = lstItem.find(".new-ob-value").val();
            var p = {
                direction1: "0",
                oa: oaval,
                r: rval,
                context: arChain,
                ob: obval,
                factType: "p"
            };
            bf.store(p);
            bf.remember(p, function () {
                var factParent = lstItem.closest(".list-group");
                var newHTM = controlDefinitions.factControls.property(rval, obval, p);
                newFactForm = controlDefinitions.wrapControls.newFactForm();
                factParent.prepend(newHTM);
                factParent.prepend(newFactForm);
                lstItem.remove();
            });
        },
        addMetaProperty: function ($btn) {
            var lstItem = $btn.closest(".list-group-item");

            var oaval = $("#baseNodeCode").val();
            var rval = lstItem.find(".new-r-value").val();
            var lstGroup = lstItem.closest(".list-group");
            var myChain = [];

            var arChain = dataFun.getObjectChain(lstItem, oaval);
            arChain.unshift(oaval);
            arChain.push(rval);

            var tParent = lstGroup.attr("data-parent-code");
            var tContext = (tParent == oaval) ? "facts" : tParent;
            var obval = lstItem.find(".new-ob-value").val();

            var p = {
                direction1: "0",
                oa: oaval,
                r: rval,
                ob: obval,
                context: arChain,
                factType: "property"
            };
            console.log("p:" + JSON.stringify(p));
            bf.store(p);
            bf.updateMetaProp(p, function () {
                var factParent = lstItem.closest(".list-group");
                var newHTM = controlDefinitions.property(rval, obval, p);
                newFactForm = controlDefinitions.wrapControls.newPropertyForm();
                factParent.prepend(newHTM);
                factParent.prepend(newFactForm);
                lstItem.remove();
            });
        },
        updateMetaProperty: function ($btn) {
            var lstItem = $btn.closest(".list-group-item");
            var oaval = $("#baseNodeCode").val();
            var rval = lstItem.find(".data-r-value").val();
            var lstGroup = lstItem.closest(".list-group");
            var tParent = lstGroup.attr("data-parent-code");
            var arChain = dataFun.getObjectChain(lstItem, oaval);
            arChain.unshift(oaval);
            arChain.push(rval);
            console.log("arChain:" + JSON.stringify(arChain));
            var obval = lstItem.find(".data-ob-value").val();
            var p = {
                direction1: "0",
                oa: oaval,
                r: rval,
                ob: obval,
                context: arChain,
                factType: "property"
            };
            console.log("p:" + JSON.stringify(p));
            bf.store(p);
            bf.updateMetaProp(p, function () {
                var newHTM = controlDefinitions.property(rval, obval, p);
                lstItem.replaceWith(newHTM);

            });
        },
        deleteMetaObject: function ($btn) {
            var lstItem = $btn.closest(".list-group-item");
            var oaval = $("#baseNodeCode").val();
            var rval = lstItem.attr("data-id");
            var arChain = dataFun.getObjectChain(lstItem, oaval);
            arChain.unshift(oaval);
            arChain.push(rval);

            var p = {
                direction1: "0",
                oa: oaval,
                r: rval,
                ob: "whatever",
                context: arChain,
                factType: "unsetobject"
            };
            bf.store(p);
            bf.removeProperty(p, function () {
                lstItem.remove();
            });
        },
        deleteMetaProperty: function ($btn) {
            var lstItem = $btn.closest(".list-group-item");
            var oacode = $("#baseNodeCode").val();
            var rval = lstItem.attr("data-r");
            var arChain = dataFun.getObjectChain(lstItem, oacode);
            arChain.unshift(oacode);
            arChain.push(rval);
            var p = {
                direction1: "0",
                oa: oacode,
                r: rval,
                ob: "whatever",
                context: arChain,
                factType: "unsetprop"
            };
            console.log("deleteMetaProperty p:" + JSON.stringify(p));
            bf.store(p);
            bf.removeProperty(p, function () {
                lstItem.remove();
            });
        },
        addSingleEdgeContext: function ($btn) {
            var lstItem = $btn.closest(".new-fact");
            var oaCode = $("#baseNodeCode").val();
            var oaval = $("#baseNodeValue").val();
            var rval = lstItem.find(".new-r-value").val();
            var arChain = dataFun.getObjectChain(lstItem, oaCode);
            arChain.unshift(oaCode);
            arChain.push(rval);
            var obval = lstItem.find(".new-ob-value").val();
            var p = {
                direction1: "1",
                oa: oaval,
                r: rval,
                ob: obval,
                context: arChain,
                factType: "object"
            };
            bf.store(p);
            bf.addSingleEdgeNode(p, function () {
                var factParent = lstItem.closest(".list-group");
                var newHTM = controlDefinitions.property(rval, obval, p);
                newPropForm = controlDefinitions.wrapControls.newPropertyForm();
                newHTM = getNodeHeader(rval, newHTM);
                factParent.prepend(newHTM);
                factParent.prepend(newPropForm);
                lstItem.remove();
            });
        },
        addSubContext: function ($btn) {
            var lstItem = $btn.closest(".new-fact");
            var oaCode = $("#baseNodeCode").val();

            var rval = lstItem.find(".new-r-value").val();
            var arChain = dataFun.getObjectChain(lstItem, oaCode);
            arChain.unshift(oaCode);
            arChain.push(rval);
            var obval = lstItem.find(".new-ob-value").val();
            var p = {
                direction1: "0",
                oa: oaCode,
                r: rval,
                ob: obval,
                context: arChain,
                factType: "object"
            };
            bf.store(p);
            bf.addArrayNode(p, function () {
                var factParent = lstItem.closest(".list-group");
                var newHTM = controlDefinitions.property(rval, obval, p);
                newPropForm = controlDefinitions.wrapControls.newPropertyForm();
                newHTM = getNodeHeader(rval, newHTM);
                factParent.prepend(newHTM);
                factParent.prepend(newPropForm);
                lstItem.remove();
            });
        },
        addSubArray: function ($btn) {
            var lstItem = $btn.closest(".new-fact");
            var oaCode = $("#baseNodeCode").val();
            var oaval = $("#baseNodeValue").val();
            var rval = lstItem.find(".new-r-value").val();
            var obval = lstItem.find(".new-ob-value").val();
            var arChain = dataFun.getObjectChain(lstItem, oaCode);
            arChain.unshift(oaCode);
            arChain.push(rval);
            var p = {
                direction1: "0",
                oa: oaCode,
                r: rval,
                ob: obval,
                context: arChain,
                factType: "subarray"
            };
            bf.store(p);
            bf.addArrayNode(p, function () {
                var factParent = lstItem.closest(".list-group");
                var newHTM = controlDefinitions.factControls.property(rval, obval, p);
                newPropForm = controlDefinitions.wrapControls.newPropertyForm();
                newHTM = controlDefinitions.wrapControls.keyAndSubObject(rval, newHTM, oaCode, "1");
                factParent.prepend(newHTM);
                factParent.prepend(newPropForm);
                lstItem.remove();
            });
        },
        saveNewFactEdge: function ($btn) {
            var lstItem = $btn.closest(".new-fact");
            var oacode = $("#baseNodeCode").val();
            var oaval = $("#baseNodeValue").val();
            var lstGroup = lstItem.closest(".list-group");
            var rval = lstItem.find(".new-r-value").val();
            var obval = lstItem.find(".new-ob-value").val();
            var arChain = dataFun.getObjectChain(lstItem, oacode);
            arChain.unshift(oacode);
            //arChain.push(rval);
            var p = {
                direction1: "1",
                oa: oaval,
                r: rval,
                ob: obval,
                context: arChain,
                factType: "r"
            };

            bf.store(p);
            bf.remember(p, function () {
                var factParent = lstItem.closest(".list-group");
                htm = controlDefinitions.factControls.edge(rval, obval, p);
                newFactForm = controlDefinitions.wrapControls.newFactForm();
                factParent.prepend(htm);
                factParent.prepend(newFactForm);
                lstItem.remove();
            });

        },
        deleteFact: function ($btn) {
            var lstItem = $btn.closest(".list-group-item");
            var oaval = $("#baseNodeCode").val();
            var rval = $btn.attr("data-r");
            var lstGroup = lstItem.closest(".list-group");
            var tParent = lstGroup.attr("data-parent");
            var tContext = (oaval == tParent) ? "facts" : tParent;
            var obval = $btn.attr("data-ob");
            var p = {
                oa: oaval,
                r: rval,
                ob: obval,
                context: tContext,
                type: "pair",
                level: "2"
            };

            bf.deleteObject(p, function (p) {
                lstItem.remove();
            });
        },

        deleteObject: function ($btn) {

            var oaval = $("#baseNodeCode").val();

            var p = {
                oa: oaval,
                type: "object",
                level: "1"
            };

            bf.deleteObject(p, function (p) {
                $("#currentNodeForm").html("");
            });

        }
    };


    // ********************* NODE LOOPER ************************** //
    var loopNode = function (pKN, pParent, pKey, nodeWrap, pLevels) {
        var tParent = pParent;
        var objectKey = (pKey == "") ? "none" : pKey;

        if (typeof objectKey == "undefined") {
            objectKey = "none";
        }
        var db = pKN;
        var level = pLevels - 1;


        var checkProp = function (pObj, pProp) {
            var tReturn = false;
            if ((bf.isObj(pObj)) && (bf.isReal(pProp))) {
                if (pObj.hasOwnProperty(pProp)) {
                    tReturn = true;
                }
            }
            return tReturn;
        };

        var isReal = function (pIt) {
            var tReal = false;
            if (typeof pIt != "undefined") {
                if (pIt != null) {
                    tReal = true;
                }
            }
            return tReal;
        };

        function isArray(what) {
            return Object.prototype.toString.call(what) === '[object Array]';
        }

        function getType(pItem) {
            if (!isReal(pItem)) {
                return "undefined";
            } else if (isArray(pItem)) {
                return "array";
            } else if (typeof pItem === 'object') {
                if (Object.keys(pItem).length > 0) {
                    if (pItem.hasOwnProperty("ob")) {
                        return "fact";
                    } else {
                        return "object";
                    }
                }
            }
            return "value";
        }

        function composeItem(pValue, pPar, tKey, childs, pGrandPar) {
            var composed = "";

            var tValue = pValue;
            var tType = getType(tValue);
            switch (tType) {
                case "object":
                    if (tKey != "none") {
                        var subNodes = loopNode(tValue, pPar, tKey, nodeWrap, level);
                        composed = nodeWrap({
                            "type": "keySubObjectWrap",
                            fact: "none",
                            pairKey: tKey,
                            pairValue: subNodes,
                            parentCode: pPar,
                            grandparentCode: pGrandPar
                        }) + childs;
                    } else {
                        composed = loopNode(tValue, pPar, tKey, nodeWrap, level) + childs;
                    }
                    break;
                case "array":
                    if (tKey != "none") {
                        composed = nodeWrap({
                            "type": "keySubArrayWrap",
                            fact: "none",
                            pairKey: tKey,
                            pairValue: loopNode(tValue, pPar, tKey, nodeWrap, level),
                            parentCode: pPar,
                            grandparentCode: pGrandPar
                        }) + childs;
                    } else {
                        composed = loopNode(tValue, pPar, tKey, nodeWrap, level) + childs;
                    }
                    break;
                case "fact":
                    composed = childs + nodeWrap({
                        "type": "factWrap",
                        fact: tValue,
                        pairKey: tKey,
                        pairValue: tValue,
                        parentCode: pPar,
                        grandparentCode: pGrandPar
                    });
                    break;
                case "value":
                    composed = childs + nodeWrap({
                        "type": "pairWrap",
                        fact: "none",
                        pairKey: tKey,
                        pairValue: tValue,
                        parentCode: pPar
                    });
                    break;
                default:
                    composed = "";
            }
            return composed;
        }

        var parsers = {
            fobject: function (p) {
                var children = "";
                var tPar = objectKey;
                if (p.hasOwnProperty("code")) {
                    tPar = p.code;
                }

                for (var key in p) {

                    var tValue = p[key];
                    children = composeItem(tValue, tPar, key, children, tParent);
                }
                return children;
            },
            farray: function (p) {
                var children = "";
                var tPar = p;

                if (p.hasOwnProperty("code")) {
                    tPar = p.code;
                }

                for (i = 0; i < p.length; i++) {
                    var tValue = p[i];
                    children = composeItem(tValue, tPar, "none", children, tParent);
                }
                return children;
            }
        };

        var curType = getType(db);
        if (curType == "undefined") {
            return "";
        }
        var wrapped = "";
        var curChildren = "";

        if (level > 0) {
            curChildren = parsers["f" + curType](db);
        } else {
            curChildren = "";
        }
        //	if (objectKey!="none") {
        //		 wrapped = nodeWrap({"type":"nodeArray",fact:"none",pairKey:objectKey,pairValue:curChildren,parentCode:pParent});
        //		} else {
        //			wrapped = nodeWrap({"type":"nodeObject",fact:"none",pairKey:objectKey,pairValue:curChildren,parentCode:pParent});
        //		}
        wrapped = curChildren;
        return wrapped;
    };

    var composeNode = function (pNode, pNodeId, pLevels) {

        var nodeWrapper = function (callArgs) {
            var nodeDefs = {
                factWrap: function (args) {
                    var htm = "";
                    var fact = args.fact;
                    var pKey = args.pairKey;
                    var factType = "";
                    if (fact.hasOwnProperty("d")) {
                        factType = (fact.d == "0") ? "property" : "relation";
                        if (fact.hasOwnProperty("e")) {
                            factType = (fact.e != "0") ? "edge" : factType;
                        }
                        var origFact = Object.create(fact);
                        //	console.log("parent code fact-oa:" + fact.oa+" parent object:"+  JSON.stringify(args.grandparentCode));
                        //	console.log("original fact:" + JSON.stringify(origFact));
                        switch (args.grandparentCode) {
                            case fact.r:
                                fact.r = origFact.oa;
                                fact.oa = origFact.ob;
                            case fact.ob:
                                fact.ob = origFact.r;
                                fact.r = origFact.oa;

                            case fact.e:
                                fact.r = origFact.oa;
                        }
                        realR = utilities.getRealValue(fact.r);
                        realOB = (factType == "property") ? fact.ob : utilities.getRealValue(fact.ob);
                        realE = utilities.getRealValue(fact.e);
                        htm = controlDefinitions.factControls[factType](realR, realOB, realE, fact, args.parentCode);
                    } else {
                        htm = controlDefinitions.factControls.property(args.pairKey, args.pairValue, fact, args.parentCode);
                    }
                    return htm;
                },
                pairWrap: function (args) {
                    var htm = "";
                    // console.log("inside pairwrap");
                    htm = controlDefinitions.property(args.pairKey, args.pairValue, args.parentCode);
                    return htm;
                },
                nodeObject: function (args) {
                    var htm = controlDefinitions.wrapControls.nodeObject(args.pairKey, args.pairValue, args.parentCode, args.grandparentCode);
                    return htm;
                },
                keySubArrayWrap: function (args) {
                    var htm = controlDefinitions.wrapControls.keyAndSubArray(args.pairKey, args.pairValue, args.parentCode, args.grandparentCode);
                    return htm;
                },
                keySubObjectWrap: function (args) {
                    var htm = controlDefinitions.wrapControls.keyAndSubObject(args.pairKey, args.pairValue, args.parentCode, args.grandparentCode);
                    return htm;
                }
            };
            var controlCode = "";
            if (callArgs.type != "") {
                controlCode = nodeDefs[callArgs.type](callArgs);
            }
            return controlCode;
        };

        var levels = pLevels;
        tParent = "none";
        //if (pNode.hasOwnProperty("value")) {
        //	tParent=pNode.value;
        //}
        var results = loopNode(pNode, pNodeId, pNodeId, nodeWrapper, levels);
        return results;
    };

    var composeSimpleNode = function (pNode, pLevels) {
        var nodeWrapper = function (callArgs) {
            var nodeDefs = {
                objectNode: function (args) {
                    return "";
                },
                factWrap: function (args) {
                    var htm = "";
                    var fact = args.fact;
                    var pKey = args.pairKey;
                    if (fact.hasOwnProperty("d")) {
                        var factType = (fact.d == "0") ? "property" : "relation";
                        realR = utilities.getRealValue(fact.r);
                        realOB = (factType == "property") ? fact.ob : utilities.getRealValue(fact.ob);
                        htm = controlDefinitions.factControls[factType](realR, realOB, args.fact, args.parentCode);
                    } else {
                        fact.oa = "oa";
                        fact.r = "r";
                        fact.ob = "ob";
                        htm = controlDefinitions.factControls.property(args.pairKey, args.pairValue, args.fact, args.parentCode);
                    }
                    return htm;
                },
                pairWrap: function (args) {
                    var htm = "";
                    htm = displayDefinitions.nodePair(args.pairKey, args.pairValue, args.parentCode);
                    return htm;
                },
                nodeObject: function (args) {
                    var htm = displayDefinitions.nodeObject(args.pairKey, args.pairValue, args.parentCode);
                    return htm;
                },
                keySubObjectWrap: function (args) {
                    var htm = displayDefinitions.nodeArray(args.pairKey, args.pairValue, args.parentCode);
                    return htm;
                }
            };

            var controlCode = "";
            if (callArgs.type == "keySubObjectWrap") {
                controlCode = nodeDefs.keySubObjectWrap(callArgs);
            }
            return controlCode;
        };

        var levels = pLevels;
        var results = loopNode(pNode, "bleh", "none", nodeWrapper, levels);
        return results;
    };

    var drawNode = function (pNode, nodekn, levels) {
        curkn = nodekn;
        var nodeId = pNode;
        // var nHead=composeSimpleNode("build-everymind-planning-schema-knowledge",2);
        var itemList = "";
        if (kn.hasOwnProperty(nodeId)) {
            itemList = composeNode(kn[nodeId], nodeId, levels);
        } else {
            itemList = composeNode(kn[curkn][nodeId], nodeId, levels);
        }
        var nHead = getNodeHeader(nodeId, itemList);
        return nHead;
    };
    var getNodeAndHeading = function (pNode, nodekn, levels) {
        curkn = nodekn;
        var nodeId = pNode;
        var returnPackage = {};
        // var nHead=composeSimpleNode("build-everymind-planning-schema-knowledge",2);
        var itemList = "";
        if (kn.hasOwnProperty(nodeId)) {
            returnPackage.content = '<div class="node-form">' + composeNode(kn[nodeId], nodeId, levels) + '<div>';
        } else {
            returnPackage.content = '<div class="node-form">' + composeNode(kn[curkn][nodeId], nodeId, levels) + '<div>';
        }
        returnPackage.heading = getNodeHeaderMinimal(nodeId, itemList);
        return returnPackage;
    };
    var getNodeAndHeadingForNode = function (pNode, nodekn, levels) {
        curkn = nodekn;
        var nodeId = pNode;
        var returnPackage = {};
        // var nHead=composeSimpleNode("build-everymind-planning-schema-knowledge",2);
        var itemList = "";
        if (kn.hasOwnProperty(nodeId)) {
            returnPackage.content = '<div class="node-form">' + composeNode(kn[nodeId], nodeId, levels) + '<div>';
        } else {
            returnPackage.content = '<div class="node-form">' + composeNode(kn[curkn][nodeId], nodeId, levels) + '<div>';
        }
        returnPackage.heading = getNodeHeaderMinimalNode(nodeId, itemList);
        return returnPackage;
    };
    var drawLibrary = function (objNode, nodekn, levels) {
        curkn = nodekn;

        var nHead = composeSimpleNode(objNode, levels);

        return nHead;

    };
    $(document).ready(function () {


        $("#loadAll").on("click", function (e) {
            var nodeId = $(this).attr("data-id");
            var itemList = composeNode(kn, "convertedamericansides", 20);
            var nHead = getNodeHeader("convertedamericansides", itemList);
            $("#metaNodeForm").html(nHead);
        });


        $("#nodeObjectList").on("click", ".base-node-list-item", function (e) {
            var nodeId = $(this).attr("data-id");
            var itemList = "";
            if (kn.hasOwnProperty(nodeId)) {
                itemList = composeNode(kn[nodeId], nodeId, 10);
            } else {
                itemList = composeNode(kn[curkn][nodeId], nodeId, 10);
            }
            var nHead = getNodeHeader(nodeId, itemList);
            $("#currentNodeForm").html(nHead);
        });

        $("#nodeObjectList").on("click", ".section-heading-text", function (e) {

            var target = $(this).find("i");
            if (target.hasClass("fa-plus")) {
                target.removeClass("fa-plus").addClass("fa-minus");
            } else {
                target.removeClass("fa-minus").addClass("fa-plus");
            }
        });
        $("#nodeFormListPanel").on("click", ".insert-action", function (e) {
            e.stopPropagation();
            var $btn = $(this).closest("ul");
            //	console.log("btn:" + $btn.parent().html());
            dataFun[$(this).attr("data-command")]($btn);
        }).on("click", ".data-command", function (e) {
            e.stopPropagation();
            dataFun[$(this).attr("data-command")]($(this));
        }).on("click", ".delete-command", function (e) {
            e.stopPropagation();
            dataFun[$(this).attr("data-command")]($(this));
        }).on("click", ".open-fact-node", function (e) {
            e.stopPropagation();
            var nodeId = $(this).attr("data-node-code");
            var itemList = composeNode(kn[curkn][nodeId], nodeId, 4);
            var nHead = getNodeHeader(nodeId, itemList);
            $("#currentNodeForm").html(nHead);
        });

        $("#nodeListPanel").on("click", ".load-node-list", function (e) {
            e.stopPropagation();
            var $btn = $(this).closest("ul");
            var loadCommand = $(this).attr("data-command");
            var loadObject = (loadCommand == "kn") ? kn : kn[curkn];
            getBaseNodes(loadObject);
        });
    });
    var getNodeHeader = function (pNodeCode, pChildren) {
        var htm = "";
        var nodeCode = pNodeCode;
        var nodeValue = utilities.getRealValue(nodeCode);
        var nodeLabel = utilities.getRealLabel(nodeCode);
        var nCount = utilities.nodeKeyCount(nodeCode);
        var lastMod = utilities.getIfExists(nodeCode, "lastmodified");
        htm = '<div class="list-group-item current-node-header" >';
        htm += '<div class="row"><div class="col-lg-1 col-md-1 current-node-code">' + nodeCode + '</div>';
        htm += '<div class="col-lg-6 col-md-6 col-sm-6  "><input type="hidden" class="form-control" id="baseNodeCode" value="' + nodeCode + '"><input type="hidden" class="form-control" id="baseNodeValue" value="' + nodeValue + '">&nbsp;' + nodeLabel + '&nbsp;<span class="badge">' + nCount + '</span></div>';
        htm += '<div class="col-lg-4 col-md-4   item-cell right-cell">';
        htm += '<span  class="date-class" >' + lastMod + '</span></div>';
        htm += '<div class="col-lg-1 col-md-1 col-sm-1">';
        htm += '<button type="button" data-oa="' + nodeCode + '" class="btn btn-danger btn-sm  delete-command" data-command="deleteObject"><i class="fa fa-trash-o fa-fw" aria-hidden="true"></i></button>';
        htm += '</div>';
        htm += '</div>';
        htm += '<div class="list-group-item"><div class="row"><div class="col-lg-12 col-md-12 col-sm-12"  style="">';
        htm += '<div class="list-group" style="" data-parent-value="' + nodeValue + '" base-node="true" data-parent-code="' + nodeCode + '">' + controlDefinitions.wrapControls.newPropertyForm() + pChildren + '</div>';
        htm += '</div></div></div>';
        return htm;

    };
    var getNodeHeaderMinimal = function (pNodeCode) {
        var htm = "";
        var nodeCode = pNodeCode;
        var nodeValue = utilities.getRealValue(nodeCode);
        var nodeLabel = utilities.getRealLabel(nodeCode);
        var nCount = utilities.nodeKeyCount(nodeCode);
        var lastMod = utilities.getIfExists(nodeCode, "lastmodified");
        htm = '<div class="list-group-item current-node-header" >';
        htm += '<div class="row"><div class="col-lg-4 col-md-4 current-node-code">' + nodeCode + '</div>';
        htm += '<div class="col-lg-8 col-md-8 col-sm-8  ">&nbsp;' + nodeLabel + '&nbsp;';
        htm += '<span  class="date-class" >' + lastMod + '</span>';
        htm += '<span class="badge">' + nCount + '</span></div>';
        htm += '</div>';
        return htm;
    };
    var getNodeHeaderMinimalNode = function (pNodeCode) {
        var htm = "";
        var nodeCode = pNodeCode;
        var nodeValue = utilities.getRealValue(nodeCode);
        var nodeLabel = utilities.getRealLabel(nodeCode);
        var nCount = utilities.nodeKeyCount(nodeCode);
        var lastMod = utilities.getIfExists(nodeCode, "lastmodified");
        htm = '<div class="list-group-item current-node-header" >';
        htm += '<div class="row"><div class="col-lg-9 col-md-9"><span class="current-node-code">' + nodeCode + '</span>&nbsp;';
        htm += '&nbsp;<span class="node-label-heading">' + nodeLabel + '</span>&nbsp;&nbsp;';
        htm += '<span class="badge count-badge">' + nCount + '</span></div>';
        htm += '<div class="col-lg-3 col-md-3 col-sm-3  " style="text-align:right"><span  class="date-class node-heading-date-label" >Last Modified:</span>&nbsp;<span  class="date-class node-heading-date" >' + lastMod + '</span></div>';
        htm += '</div>';
        return htm;
    };
    var getObjectForm = function () {


    };

    var getBaseNodes = function (nodeObject) {

        var nodeList = composeSimpleNode(nodeObject, 2);
        $("#nodeObjectList").html(nodeList);
    };

    var init = function () {
        console.log("loading");
    };

    return {
        init: init,
        getBaseNodes: getBaseNodes,
        drawNode: drawNode,
        drawLibrary: drawLibrary,
        getNodeAndHeading: getNodeAndHeading,
        getNodeAndHeadingForNode: getNodeAndHeadingForNode
    };

})();
		
