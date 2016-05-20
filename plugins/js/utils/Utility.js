module.exports = {
    getRequest: function () {
        var url = location.hash;
        var theRequest = {};
        var index = url.indexOf('?');
        if( index != -1 ) {
            var str = url.substr(index + 1);
            var strs = str.split('&');
            for( var i = 0; i < strs.length; i++ ) {
                theRequest[strs[i].split('=')[0]] = strs[i].split('=')[1];
            }
        }
        return theRequest;
    },

    parsePTag: function (str) {
        var s = str || '';
        var reg = /<p>(.*?)<\/p>/gim;

        return s.match(reg) || [];
    }
};

