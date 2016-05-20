
import Global from './globals';
import DataSerice from '../services/DataService';



function pretendRequest (email, pass, cb) {
    setTimeout(()=>{
        if(email === 'hujb2000@163.com' && pass === 'password' ) {
            cb({
                authenticated:true,
                token: Math.random().toString(36).substring(7)
            });
        }else{
            cb({authenticated:false});
        }
    });
}

module.exports = {
    login (email, pass, cb) {
        cb = arguments[arguments.length - 1];
        if(localStorage.token) {
            if(cb) {
                cb(true);
            }
            this.onChange(true);
            return;
        }
        pretendRequest(email, pass, (res) => {
            if(res.authenticated) {
                localStorage.token = res.token;
                if(cb) {
                    cb(true);
                }
                this.onChange(true);
            }else{
                if(cb) {
                    cb(false);
                }
                this.onChange(false);
            }
        });
    },

    getToken: function () {
        return localStorage.token;
    },

    logout: function (cb) {
        delete _g.user;
        Global.set('global', _g);
        DataSerice.logout();
        cb && cb();
    },

    loggedIn: function () {
        try{
            if( _g === undefined || _g.user === undefined || _g.user == null || _g.user.username === undefined || _g.user.username.length == 0
            ||
            _g.user.hasOwnProperty('resCode')
            ) {

                return false;
            }
            return true;
        } catch(e) {
            return false;
        }
    },

    onChange: function () {

    }
};


