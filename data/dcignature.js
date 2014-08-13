self.port.on("dcignature-init", dcignatureInit);
self.port.on("config-updated",  updateStorage);


function dcignatureInit(storage) {
    updateStorage(storage);
    
    if (document.querySelector('form#write')) {
        document.dcWriteForm = document.querySelector('form#write');
        document.dcWriteForm.onsubmit = dcignatureSubmit;
        
        var upload_status = document.getElementById('upload_status');
        upload_status.value = "Y";
    }
    
}

function updateStorage(storage) {
    document.storage = storage;
}

function dcignatureSubmit(event) {
    var source = document.getElementById('tx_canvas_source');
    var iframe = document.getElementById('tx_canvas_wysiwyg');
    
    
    source.value = dcignatureAddContent(source.value);
    iframe.contentDocument.body.innerHTML = dcignatureAddContent(iframe.contentDocument.body.innerHTML);
    
}

function dcignatureAddContent(content) {
    return document.storage.global.header + content + document.storage.global.footer; 
}