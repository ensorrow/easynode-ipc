var assert = require('assert');
var logger = using('easynode.framework.Logger').forFile(__filename);
var GenericObject = using('easynode.GenericObject');
var fs = require('co-fs');
var multipart = require('co-multipart');
var f =  require('fs');
var util = require('util');
var thunkify = require('thunkify');

(function () {
    /**
     * Class Controllers
     *
     * @class netease.icp.Controllers
     * @extends easynode.GenericObject
     * @since 0.1.0
     * @author allen.hu
     * */
    class Controllers extends GenericObject
    {
        /**
         * 构造函数。
         *
         * @method 构造函数
         * @since 0.1.0
         * @author allen.hu
         * */
        constructor()
        {
            super();
            //调用super()后再定义子类成员。
        }


        /**
         * @api:
         * @apiDescription: 首页
         * @apiName {}
         * @apiGroup {}
         * @apiPermission {}
         * @apiSuccess {} {} {}
         * @apiVersion {}
         * */
        static home(app){
            return function *(){
                //console.log( this.parameter );
                //console.log( this.body );
                //console.log( this.query );
                console.log("**********");
                var user = {}
                user = this.session.user !== undefined ? this.session.user : {};
                console.log(user);
                console.log("2222");
                yield this.render('index',{user:user});
            }
        }

        static comment(app){
            return function *(){

                var parts = yield* multipart(this);
                console.dir(parts);

                let profile = this.request.body;
                console.log(profile);
                console.log( this.parameter );
                console.log( this.body );
                console.log( this.query );

                this.type = 'json';
                this.body = [
                    {"author": "Pete Hunt", "text": "This is one comment"},
                    {"author": "Jordan Walke", "text": "This is *another* comment"}
                ];
            }
        }

        static loginCallback(app){
            return function *(){
              /*  console.log("tenantId",this.query.tenantId);
                console.log("expire",new Date(parseInt(this.query.expire)));
                console.log("status",this.query.status);
                console.log("regIn",this.query.NCE);
                console.log("persist",this.query.persist);
                console.log("code",this.query.code);
                console.log("loginType",this.query.loginType);
                console.log("sign",this.query.sign);
                console.log("category",this.query.category);
                console.log("email",this.query.email);
                console.log("callback",this.query.callback);
                console.log("userName",this.query.userName);*/

                var user = {}
                user.loginType = this.query.loginType;
                user.email = this.query.email;
                user.userName = this.query.userName;
                this.session.user = user;

                this.redirect('/');
            }
        }

        getClassName()
        {
            return EasyNode.namespace(__filename);
        }
    }

    module.exports = Controllers;
})();
