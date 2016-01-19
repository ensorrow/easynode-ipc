module.exports ={
    isEmpty: function(value){
        if( typeof(value) == 'string' ){
            return value.length > 0 ? false : true;
        }else{
            return value > 0 ? false :  true;
        }
    },
    check: function(o){
        var hasError = false;
        (function _check(o){
            for(var i in o){
                if(o.hasOwnProperty(i)){
                    if( typeof o[i] == 'object'){
                        _check(o[i]);
                    }else if(o[i] == true){
                        if( o['checked'] == true ){
                            hasError = false;
                            break;
                        }
                        else{
                            hasError = true;
                            return hasError;
                        }
                    }
                }
            }
        })(o);
        return hasError;
    }
}