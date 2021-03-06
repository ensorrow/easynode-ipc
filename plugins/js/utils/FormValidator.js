module.exports = {
    isEmpty: function (value) {
        if( typeof (value) == 'string' ) {
            return value.length > 0 ? false : true;
        }else{
            return value > 0 ? false : true;
        }
    },
    regular: function (val, regular) {
        return typeof regular != 'function' ? false : !regular(val);
    },
    check: function (oo) {
        var hasError = false;
        var err = 0;
        function _check (o) {
            for(var i in o) {
                if(o.hasOwnProperty(i)) {
                    if( typeof o[i] == 'object') {
                        hasError = _check(o[i]);
                        err = hasError ? err + 1 : err;
                    }else if(o[i] == true && i != 'focus') {
                        if( o.checked == true ) {
                            hasError = false;
                        } else {
                            hasError = true;
                        }
                        err = hasError ? err + 1 : err;
                    }else{
                        hasError = false;
                    }
                }
            }
        }
        _check(oo);
        return err > 0 ? true : false;
    }
};


