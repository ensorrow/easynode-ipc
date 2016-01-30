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
         * @apiDefine EmptyRecord
         * @apiError EmptyRecord Please login again or register an aacount, maybe the session is expired
         *
         * @apiErrorExample Empty-Response:
         *
         *          { rows:0, pages:0, page:0, rpp:0, data:[] };
         *
         */

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
         * @api {get} /records 获取记录列表
         * @apiName getRecords
         * @apiGroup Record
         * @apiPermission admin or self
         * @apiVersion 0.0.1
         * @apiDescription 管理员(登录后用户对象里用idadmin字段表示)能获取所有用户申请记录,本用户只能获取他自己的申请记录
         *
         * @apiParam {Number} page 页号.
         * @apiParam {Number} rpp  每页记录数.
         *
         * @apiSampleRequest http://icp.hzspeed.cn/records
         *
         * @apiSuccess {Object[]} data 记录列表
         * @apiSuccess {Number} data.id 记录id
         * @apiSuccess {String} data.checklisturl 核验单图片URL
         * @apiSuccess {String} data.protocolurl1 云平台协议第一页图片
         * @apiSuccess {String} data.protocolurl2 云平台协议第二页图片
         * @apiSuccess {String} data.securityurl1 信息安全管理责任书第一页图片URL
         * @apiSuccess {String} data.securityurl2 信息安全管理责任书第二页图片URL
         * @apiSuccess {Number} data.companyid 公司id
         * @apiSuccess {Number} data.websiteid 网站id
         * @apiSuccess {String} data.tenantid 租户id
         * @apiSuccess {Number} data.type  备案类型: 0-首次备案, 1-新增网站, 2-新增接入
         * @apiSuccess {Number} data.status 备案状态: 0-草稿,1-初审中,2-初审未通过,3-初审已通过,4-照片审核中,5-照片审核未通过,6-照片审核已通过,7-通管局审核中,8-通管局审核未通过,9-通管局审核已通过,10-未知状态
         * @apiSuccess {String} data.code 备案编号
         * @apiSuccess {Number} data.updatetime 记录更新时间
         * @apiSuccess {Number} data.createtime 记录创建时间
         * @apiSuccess {Number} page 页号
         * @apiSuccess {Number} pages 总页数
         * @apiSuccess {Number} rows 总记录数
         * @apiSuccess {Number} rpp 每页显示数
         *
         * @apiUse  EmptyRecord
        */
        static getRecords(app){
            var me = this;
            return function *(){
                var session = this.session;
                var ret = {};

                var storeService = new StoreService(app)
                ret = yield storeService.getRecords();

                this.type = 'json';
                this.body = ret;
            }
        }

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
