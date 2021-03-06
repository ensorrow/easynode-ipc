
function createCORSRequest (method, url) {
    var xhr = new XMLHttpRequest();
    if( 'withCredentials' in xhr ) {
        // XHR for Chrome/Firefox/Opera/Safari.
        xhr.open(method, url, true);
    }else if ( typeof XDomainRequest !== 'undefined') {
        // XDomainRequrest for IE.
        xhr = new XDomainRequest();
        xhr.open(method, url);
    }else{
        // CORS not supported.
        xhr = null;
    }
    return xhr;
}

function ajaxUpload ({url, name, cors, file, onProgress, onLoad, onError, withCredentials}) {
    let data = new FormData();
    data.append(name, file);

    let xhr = createCORSRequest('post', url, cors);
    xhr.withCredentials = withCredentials;
    xhr.upload.addEventListener('progress', onProgress, false);
    xhr.setRequestHeader('X-File-Name', encodeURIComponent(file.name));
    xhr.setRequestHeader('X-File-Size', file.size);
    xhr.onload = onLoad;
    xhr.onerror = onError;
    xhr.send(data);

    return xhr;
}

module.exports = function (args) {
    return ajaxUpload(args);
};

