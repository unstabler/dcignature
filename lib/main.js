var tabs     = require('sdk/tabs');
var data     = require('sdk/self').data;
var pageMod  = require('sdk/page-mod');
var menuItem = require("menuitems");

var storage  = require ("sdk/simple-storage").storage;

init();

function init() {
    
    if (!storage.global) {
        storage.global = {
            "header": "",
            "footer": ""
        };
    }
    
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
        contentScriptFile: data.url("config.js"),
        onAttach: configInit
    });
    
    // FIXME: 글쓰기 페이지에서 해당 이벤트가 두번 실행됨
    pageMod.PageMod({
        include: /http[s]?:\/\/gall\.dcinside\.com\/board\/write\/\?id=([a-zA-Z0-9]+)/,
        contentScriptFile: data.url("dcignature.js"),
        onAttach: dcignatureInit
    });
    
}


function configInit (worker) {
    worker.port.emit("init", storage);
    worker.port.on("config-save", updateConfig);
}


function dcignatureInit (worker) {
    worker.port.emit("dcignature-init", storage);
}

function updateConfig (newStorage) {
    storage = newStorage;
}


function globalLog(string) {
    console.log(string);
    tabs.activeTab.attach({
        contentScript: 'console.log("' + string + '");'
    });
}