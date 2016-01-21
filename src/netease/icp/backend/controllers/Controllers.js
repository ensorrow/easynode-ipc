var assert = require('assert');
var logger = using('easynode.framework.Logger').forFile(__filename);
var GenericObject = using('easynode.GenericObject');
var fs = require('co-fs');
var multipart = require('co-multipart');
var f =  require('fs');
var util = require('util');
var thunkify = require('thunkify');
var LoginService = using('netease.icp.backend.services.LoginService');
var FileService =  using('easynode.framework.util.FileService');
var StoreService = using('netease.icp.backend.services.StoreService');

(function () {

    // Myself result code
    const LOGIN_OK = 200;
    const LOGIN_ERR = 201;

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

                if( user === undefined ){
                    yield this.render('index',{user:user,loginCallback:app.config.loginCallback});
                }else{
                    yield this.render('index',{user:user,loginCallback:app.config.loginCallback});
                }
            }
        }

        static logout(app){
            return function *(){
                this.session.user = null;

                yield this.render('index',{user:{},loginCallback:app.config.loginCallback});
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

        static upload(app){
            console.log("1");
            var supportFileTypes = '^.*\.(?:jpg|png|gif)$';
            var regEx = new RegExp(supportFileTypes);

            return function *(){
                console.dir(this.cookies.get('koa.sid'));
                var session = this.session;
                //if( session.hasOwnProperty('firms') ){
                //    delete session.firms;
                //}
                this.state.upload=0;
                if (this.method.toLocaleLowerCase() == 'post') {
                    var hasError = false;
                    var filename = '';
                    var parts = yield* multipart(this);
                    for(let file  of parts.files) {
                        if(!file.filename.match(regEx)) {
                            parts.dispose();
                            this.status = 403;
                            this.body = `403 Forbidden : Unsupported type of upload file [${file.filename}]`;
                            hasError = true;                //ignore downstream middleware
                        }
                        else{
                            console.log("2",file.path)
                            //var fileService = new FileService();
                            //yield fileService.copyFile(file.path,app.getUploadDir() + file.filename);
                            var storeService = new StoreService(app,app.conn);
                            var url = yield storeService.uploadNos(Date.now(),file.path);
                            console.log(url);
                            filename = file.filename;
                        }
                    };
                    parts.dispose();


                    this.type = 'json';
                    this.body = {a:'bbb'};
                }
                else {
                    EasyNode.DEBUG  && logger.debug('multipart must post');
                }
            }
        }

        static loginCallback(app){
            return function *(){
                var loginService = new LoginService(app);
                var result = yield loginService.login(this.query);
                if( result.hasOwnProperty('user') ){
                     this.session.user = result.user;
                     this.redirect('/');
                }else{
                    //TODO
                }
            }
        }

        getClassName()
        {
            return EasyNode.namespace(__filename);
        }
    }

    module.exports = Controllers;
})();
