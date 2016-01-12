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
         * print:
         * console.log( this.parameter );
         * console.log( this.body );
         * console.log( this.query );
         * */
        static home(app){
            return function *(){
                var user = this.session.user !== undefined ? this.session.user : undefined;

                console.log("home.user", user);
                if( user === undefined ){
                    yield this.render('index',{user:user});
                }else{
                    yield this.render('index',{user:user});
                }
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

                var user = {}
                user.loginType = this.query.loginType;
                user.email = this.query.email;
                user.userName = this.query.userName;
                this.session.user = user;

                console.log("loginCallback.redirect to home", this.session.user);
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
