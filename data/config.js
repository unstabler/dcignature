self.port.on("init", init);
var currentGallery = 'global';

function init (storage) {
    document.storage = storage;
    
    var form   = document.getElementById("config");
    var header = document.getElementById("content_header");
    var footer = document.getElementById("content_footer");
    
    header.value = getGalleryConfig(currentGallery).header;
    footer.value = getGalleryConfig(currentGallery).footer;
    
    form.onsubmit = saveConfig;
}

function getGalleryConfig(gallery) {
    return document.storage[gallery];
}

function setGalleryConfig(gallery, config) {
    document.storage[gallery] = config;
    self.port.emit("config-save", document.storage);
}

function saveConfig() {
    var gallery = currentGallery;
    var header = document.getElementById("content_header");
    var footer = document.getElementById("content_footer");
    var config = {
        "header": header.value,
        "footer": footer.value
    };
    
    setGalleryConfig(gallery, config);
    alert("설정이 저장되었습니다.");
    return false;
}