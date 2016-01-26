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
                yield this.render('index',{user:user,loginCallback:app.config.loginCallback});
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


        /**
         * @api:
         * @apiDescription: 提交初审核
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
        static committrial(app){
            var me = this;
            return function *(){

                var ret = {};
                var session = this.session;

                var storeService = new StoreService(app)
                ret = yield storeService.insertApplyRecord(this.request.body);

                this.type = 'json';
                this.body = {ret: ret};
            }
        }

        /**
         * @api:
         * @apiDescription: 保存草稿
         * @apiName {}
         * @apiGroup {}
         * @apiPermission {}
         * @apiSuccess {} {} {}
         * @apiVersion {}
         * print:
         * */
        static savedraft(app){
            var me = this;
            return function *(){
                var session = this.session;

                var ret = {};

                var storeService = new StoreService(app)
                ret = yield storeService.savedraft(this.request.body);

                this.type = 'json';
                this.body = {ret: ret};
            }
        }



        /**
         * @api {post} /getRecord'
         * @apiDescription:  获取申请记录
         * @apiName {getRecord}
         * @apiGroup {}
         *
         * @apiParam {id} record.id
         *
         * @apiSuccess {}
         *
         * @apiError {Object} error 参数验证错误或服务器内部错误描述
         */
        static getRecord(app){
            var me = this;
            return function *(){
                var session = this.session;
                var ret = {};

                var storeService = new StoreService(app)
                ret = yield storeService.getRecord(this.request.body);

                this.type = 'json';
                this.body = {ret: ret};
            }
        }

        /**
         * @api {post} /getapplyrecord/'
         * @apiDescription:  列出申请列表
         * @apiName {listApplyRecord}
         * @apiGroup {Manager}
         *
         * @apiParam {Number} page 页号
         * @apiParam {String} tenantId 租户ID
         *
         * @apiSuccess {Number} deviceId 所绑定设备id
         * @apiSuccess {String} phone 设备电话号码
         * @apiSuccess {Number} userId 当前用户id
         * @apiSuccess {Number} bindId 绑定关系id 注-只有_method为check且已经注册过才有此字段
         * @apiSuccess {Number} status 绑定关系状态 0-已审核 1-待审核 2-已删除
         *
         * @apiError {Object} error 参数验证错误或服务器内部错误描述
         */
        static listApplyRecord(app){
            var me = this;
            return function *(page){
                var session = this.session;
                var ret = {};

                var storeService = new StoreService(app)
                ret = yield storeService.getApplyRecords(this.request.body);


                this.type = 'json';
                this.body = {ret: ret};
            }
        }


        /**
         * @api {post} /deleteapplyrecord/'
         * @apiDescription:  删除申请列表
         * @apiName {deleteApplyRecord}
         * @apiGroup {Manager}
         *
         * @apiParam {String} id 申请记录ID
         * @apiParam {String} tenantId 租户ID
         *
         * @apiSuccess {Bool} 1: 成功删除 0 :删除失败
         *
         * @apiError {Object} error 参数验证错误或服务器内部错误描述
         */
        static deleteApplyRecord(app){
            var me = this;
            return function *(page){
                var session = this.session;
                var ret = {};

                var storeService = new StoreService(app)
                ret = yield storeService.deleteApplyRecords(this.request.body);

                this.type = 'json';
                this.body = {ret: ret};
            }
        }



        /**
         * @api:
         * @apiDescription: 上传照片
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
        static upload(app){
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
                    var url = '';
                    var parts = yield* multipart(this);
                    for(let file  of parts.files) {
                        if(!file.filename.match(regEx)) {
                            parts.dispose();
                            this.status = 403;
                            this.body = `403 Forbidden : Unsupported type of upload file [${file.filename}]`;
                            hasError = true;                //ignore downstream middleware
                        }
                        else{
                            var storeService = new StoreService(app);
                            url = yield storeService.uploadNos(Date.now(),file.path);
                            filename = file.filename;
                        }
                    };
                    parts.dispose();


                    this.type = 'json';
                    this.body = {url:url};
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

                if( result.hasOwnProperty('user') ) {
                    this.session.user = result.user;
                }else{
                    this.session.user = result;
                }
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
