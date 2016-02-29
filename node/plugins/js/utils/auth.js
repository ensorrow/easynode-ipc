module.exports ={
    login(email,pass,cb){
        cb = arguments[arguments.length-1];
        if(localStorage.token){
            if(cb) cb(true);
            this.onChange(true);
            return;
        }
        pretendRequest(email,pass,(res) => {
            if(res.authenticated){
                localStorage.token = res.token;
                if(cb)  cb(true);
                this.onChange(true);
            }else{
                if(cb) cb(false);
                this.onChange(false);
            }
        })
    },

    getToken: function(){
        return localStorage.token;
    },

    logout: function(cb){
        location.href = "/logout";
        __globals__.user = null;
    },

    loggedIn: function(){
        try{
            if( __globals__ === undefined || __globals__.user === undefined || __globals__.user == null ||  __globals__.user.username  === undefined || __globals__.user.username.length == 0
            ||
            __globals__.user.hasOwnProperty('resCode')
            ){

                return false;
            }
            return true;
        }
        catch(e){
            return false;
        }
    },

    onChange: function(){

    }
}

function pretendRequest(email,pass,cb){
    setTimeout(()=>{
        if(email === 'hujb2000@163.com'  && pass === 'password' ){
            cb({
                authenticated:true,
                token: Math.random().toString(36).substring(7)
            })
        }else{
            cb({authenticated:false});
        }
    })
}