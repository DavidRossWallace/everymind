/*
********** tabsetsminder.js ***************
***  versian 1.0    ******************
***  Authored by David Ross Wallace **
**** 8/1/2020 ************************
**************************************
 */

var tabsetMinder=(function() {

    var tabs={};
    var tabSets={};

    var tabsetExists=function(strMindset)
    {
        // check for existing tabset
        return (tabSets.hasOwnProperty(strMindset));
    };

    var getSet=function(strMindset) {
        // get set object - contains all tab info and references to tab and sub tab objects
        var tabset=tabSets[strMindset];
        return tabset;
    };

    var getTab=function(tabObjId) {
        // get reference to tab object
        var tab=tabs[tabObjId];
        return tab;
    };

    var getTabInfo=function(strMindset,strTabAlias) {
        //	returns tabset associated with a particular mindset
        var tabsetInfo=tabSets[strMindset][strTabAlias];
        return tabsetInfo;
    };

    var addNewTab=function(objTabInfo) {
        // add mew single tab object and return it's id
        let p=objTabInfo;
        p.tabLabel=p.tabLabel;
        tabCounter++;

        let objId='dynTab'+tabCounter;
        p.tabId=objId;

        tabs[objId]=new PanelTab(p);
        tabs[objId].addTab();
        return tabs[objId].tabId;
    };

    var addNewNodeTab=function(objTabInfo) {

        // creates and entire set of dynamic tabs
        // creates tab contgent sections associatged with tabs

        let p=objTabInfo;
        let tabSetId=cleaners.idClean(p.mindset);
        let tsId=p.mindset;

        tabSets[tsId]={};

        p.command="triggerChildClick"; // getDefaultNodes
        p.paneClass="mindset-data-content";
        p.tabClass="top-level-tab mindset-data-tab";
        p.targetLibrary=p.knowledge;
        p.tabsetId=tsId;

        let newTabSet=tabSets[tsId];
        newTabSet.knowledge=p.knowledge;
        newTabSet.schema=p.schema;
        newTabSet.mindset=p.mindset;
        p.tabButtonAttributes=' trigger-target-alias="nodes" ';
        p.includeCloseButton="true";
        p.triggerType="mindset-data-tab";
        p.tabAlias="parent";
        let newTabObj=addNewTab(p);
        let newTabId=newTabObj;
        tabSets[tsId]=dressTabsetObject(tabSets[tsId],newTabId,'parent');
        let newP=addNewTabSet(newTabId,tabSetId);

        newP.tabParentId=newP.tabSetTabsId;
        newP.paneParentId=newP.tabSetPanesId;
        newP.mindset=p.mindset;
        newP.tabsetId=tsId
        newP.targetLibrary=p.targetLibrary;
        newP.includeCloseButton="false";
        newP.triggerType="nodes-data-tab";

        newP.command="getDatabase";
        newP.paneClass="mindset-database-content";
        newP.tabClass="sub-data-tab";
        newP.tabLabel="Database";
        newP.tabAlias="databases";
        let databaseTab=addNewTab(newP);
        tabSets[tsId]=dressTabsetObject(tabSets[tsId],databaseTab,'databases');

        newP.command="loadDefinition";
        newP.paneClass="mindset-definition-content";
        newP.tabClass="mindset-definition-tab hidden";
        newP.tabLabel="Definition";
        newP.tabAlias="Definition";
        let definitionsTab=addNewTab(newP);
        tabSets[tsId]=dressTabsetObject(tabSets[tsId],definitionsTab,'definitions');

        newP.command="loadFeatureNodes";
        newP.paneClass="mindset-nodes-content";
        newP.tabClass="sub-data-tab";
        newP.tabLabel="Nodes";
        newP.tabAlias="nodes";
        let nodesTab=addNewTab(newP);
        tabSets[tsId]=dressTabsetObject(tabSets[tsId],nodesTab,'nodes');

        newP.command="loadProperties";
        newP.paneClass="mindset-properties-content";
        newP.tabClass="mindset-properties-tab";
        newP.tabLabel="Properties";
        newP.tabAlias="properties";
        let propertiesTab=addNewTab(newP);
        tabSets[tsId]=dressTabsetObject(tabSets[tsId],propertiesTab,'properties');

        newP.paneClass="mindset-Correlations-content";
        newP.tabClass="mindset-Correlations-tab";
        newP.command="loadCorrelations";
        newP.tabLabel="Facts";
        newP.tabAlias="correlations";
        let correlationsTab=addNewTab(newP);
        tabSets[tsId]=dressTabsetObject(tabSets[tsId],correlationsTab,'correlations');

        newP.paneClass="mindset-Predictions-content";
        newP.tabClass="mindset-predictions-tab";
        newP.command="loadPredictions";
        newP.tabLabel="Predictions";
        newP.tabAlias="predictions";
        let predictionsTab=addNewTab(newP);
        tabSets[tsId]=dressTabsetObject(tabSets[tsId],predictionsTab,'predictions');

        newP.paneClass="mindset-nugget-editor-content";
        newP.tabClass="mindset-nugget-editor-tab hidden";
        newP.command="";
        newP.tabLabel="Editor";
        newP.tabAlias="nuggetEditor";
        let nuggetEditor=addNewTab(newP);
        tabSets[tsId]=dressTabsetObject(tabSets[tsId],nuggetEditor,'nuggetEditor');

        newP.paneClass="mindset-datatable-content";
        newP.tabClass="data-output-tabs mindset-datatable-tab";
        newP.command="outputToDataTable";
        newP.tabLabel="Data Table";
        newP.tabAlias="dataTable";
        let tableTab=addNewTab(newP);
        tabSets[tsId]=dressTabsetObject(tabSets[tsId],tableTab,'dataTable');

        newP.paneClass="mindset-json-content";
        newP.tabClass="mindset-json-tab";
        newP.command="outputToJSON";
        newP.tabLabel="JSON";
        newP.tabAlias="json";
        let JSONtab=addNewTab(newP);
        tabSets[tsId]=dressTabsetObject(tabSets[tsId],JSONtab,'json');

        newP.paneClass="mindset-cvs-content";
        newP.tabClass="data-output-tabs mindset-cvs-tab";
        newP.command="outputToCVS";
        newP.tabLabel="CVS";
        newP.tabAlias="cvs";
        let cvsTab=addNewTab(newP);
        tabSets[tsId]=dressTabsetObject(tabSets[tsId],cvsTab,'cvs');

        newP.paneClass="mindset-editor-content";
        newP.tabClass="mindset-editor-tab";
        newP.command="loadEditor";
        newP.tabLabel="New Eb Item";
        newP.tabAlias="editor";
        let editorTab=addNewTab(newP);
        tabSets[tsId]=dressTabsetObject(tabSets[tsId],editorTab,'editor');

    };

    var dressTabsetObject=function(objTabset,strTabId,strNewNode) {
        // decorates tab object
        let ts=objTabset;
        let tab=tabs[strTabId];
        let node=strNewNode;

        ts[node]={};
        ts[node].tabObectId=tab.tabId;
        ts[node].tabButtonId=tab.tabButton;
        ts[node].contentId=tab.contentParentId;
        ts[node].contentHeaderId=tab.contentHeaderId;
        ts[node].paneId=tab.panId;

        return ts;
    };

    var clickTab=function(strMindset,strTabAlias) {
        // dynsmically clicks tab given mindset and particular tab alias
        let tabSet=tabSets[strMindset][strTabAlias];
        $('#'+tabSet.tabButtonId).click();
        return tabSet.tabButtonId
    };
    var triggerTab=function(strMindset,strTabAlias,triggerInfo) {
        // like click but triggers so can pass parameter and override event handlers
        let tabSet=tabSets[strMindset][strTabAlias];
        var event = jQuery.Event( "click" );
        event.triggerInfo=triggerInfo;
        $('#'+tabSet.tabButtonId).trigger(event);

    };
    var getContentId=function(strMindset,strTabAlias) {
        // returns id of tab's content pane
        let tabSet=tabSets[strMindset];
        let contentId=tabSets[strMindset].contentId;
        return contentId;
    };
    var getContentHeaderId=function(strMindset,strTabAlias) {
        // returns the id for header container inside of particular tab pane content panel
        let tabSet=tabSets[strMindset];
        let contentHeaderId=tabSets[strMindset].contentHeaderId;
        return contentHeaderId;
    }
    var setTabLabel=function(strMindset,strTabAlias,htmlContent) {
        // dynamically swaps out a tab's innerHTML content
        let tabSet=tabSets[strMindset];
        let tab=tabs[tabSet[strTabAlias].tabObectId];
        tab.changeTabLabel(htmlContent);
        return tabSet[strTabAlias].tabButtonId;
    };
    var putContent=function(strMindset,strTabAlias,htmlContent) {
        // replaces content of a tab pane
        let tabSet=tabSets[strMindset];
        let tab=tabs[tabSet[strTabAlias].tabObectId];
        tab.setPaneContent(htmlContent);
        return tabSet[strTabAlias].contentId;
    };
    var putHeaderContent=function(strMindset,strTabAlias,htmlContent) {
        // replaces content of a tab pane header section
        let tabSet=tabSets[strMindset];
        let tab=tabs[tabSet[strTabAlias].tabObectId];
        tab.setPaneHeader(htmlContent);
        return tabSet[strTabAlias].contentHeaderId;
    };
    var hideAllTabs=function(strMindSet) {

    };

    var addNewTabSet=function(parentTabId,tabSetId) {
        //
        let p={};
        tabsetCounter++;
        let setName=tabSetId;
        p.tabSetTabsId=setName+'tabs';
        p.tabSetPanesId=setName+"panes";
        tabs[parentTabId].setPaneContent(content.tabSet(p));
        return p;
    };

    var addNewMindsetTabset=function(objSetInfo) {
        // Dynamically add adhock tabset
        let p=objSetInfo;
        let setName=addNewTabSet(p);
    }
    var removeTab=function(objTabInfo) {
        // remove tab
        let p=objTabInfo;
        let objId=bf.indexPrep(p.name);
        if (tabs.hasOwnProperty(objId)) {
            tabs[objId].removeTab();
            tabs[objId]=null;
        }
    }
    var cleaners={
        // string prep
        prepHeading:function(strHeading) {
            var cleanLabel=ms.label;
            cleanLabel=toTitleCase(cleanLabel.split("-").join(" "));
            return cleanLabel
        },

        idClean:function(str) {
            let cleanLabel=str.split("-").join("");
            return cleanLabel
        }
    }

    var content={
        // template for wrapping tabset - tabs + tab panes
        tabSet:function(p) {
            var htm='<ul id="'+ p.tabSetTabsId+'" class="nav nav-tabs">';
            htm+='</ul>';
            htm+='<div id="'+p.tabSetPanesId + '" class="tab-panes clearfix" >';
            htm+='</div>';
            return htm
        }

    }

    return {
        addNewTab:addNewTab,
        removeTab:removeTab,
        addNewTabSet:addNewTabSet,
        addNewNodeTab:addNewNodeTab,
        getSet:getSet,
        getTab:getTab,
        getTabInfo:getTabInfo,
        putContent:putContent,
        putHeaderContent:putHeaderContent,
        getContentId:getContentId,
        getContentHeaderId:getContentHeaderId,
        clickTab:clickTab,
        triggerTab:triggerTab,
        setTabLabel:setTabLabel,
        tabsetExists:tabsetExists
    }

})();
