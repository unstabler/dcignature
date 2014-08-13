var tabs     = require('sdk/tabs');
var data     = require('sdk/self').data;
var pageMod  = require('sdk/page-mod');
var menuItem = require("menuitems");

init();

function init() {
    
    menuItem.Menuitem({
        id: "config",
        menuid: "menu_ToolsPopup",
        label: "DCignature 설정",
        onCommand: function() {
            tabs.open(data.url("config.html"));
        },
        insertbefore: "menu_pageInfo"
    });

    pageMod.PageMod({
        include: data.url("config.html"),
        contentScript: 'alert("설정을 열어주었구나! 고마워 > <)");'
    });
    
    tabs.on("ready", hookTab);
    
}








function hookTab (tab) {
    var gallery = checkURL(tab);
    globalLog("current url : " + tab.url);
    globalLog("config url : " + data.url("config.html"));
    if (!gallery)
        return;
    
}

function checkURL (tab) {
    var regex = /http[s]?:\/\/gall\.dcinside\.com\/board\/write\/\?id=([a-zA-Z0-9]+)/;
    var gall = regex.exec(tab.url);
    if (gall)
        return gall[1];
    else 
        return;
}


function globalLog(string) {
    console.log(string);
    tabs.activeTab.attach({
        contentScript: 'console.log("' + string + '");'
    });
}