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

                console.log("aaaa");
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
            var supportFileTypes = '^.*\.(?:jpg|png|gif)$';
            var regEx = new RegExp(supportFileTypes);

            return function *(){
                console.log("sessionid");
                console.dir(this.cookies.get('koa.sid'));
                var session = this.session;

                //if( session.hasOwnProperty('firms') ){
                //    delete session.firms;
                //}

                let body = this.request.body;
                console.log(body);

                /* { user:
   { tenantid: 'b261f52d302b43ba821a6d731b17034c',
     status: '1',
     logintype: '1',
     email: 'hujb2000@163.com',
     username: 'hujb2000@163.com' },
  loginCallback:
   { success: 'http://icp.hzspeed.cn/login/callback?result=200',
     error: 'http://icp.hzspeed.cn/login/callback?result=201' },
  baseinfo: { currTypeSelected: 0, currRegionSelected: 0 },
  companyinfo:
   { province: '山西省',
     city: '长治市',
     area: '襄垣县',
     nature: '2',
      idType: '2',
     idNumber: '1',
     name: '1',
     liveAddress: '1',
     commAddress: '1',
     owner: '1',
     managerName: '1',
     managerIdType: '3',
     managerIdNumber: '1',
     officePhoneNumber: '1',
     mobile: '1',
     email: '1' },
  siteinfo:
   { name: '1',
     domain: '',
     domain1: '',
     domain2: '',
     domain3: '',
     domain4: '',
  homeUrl: '1',
     serviceContent: 1,
     languages:
      { chinese: true,
        chinesetraditional: false,
        eglish: false,
        japanese: false,
        french: false,
        spanish: false,
        arabic: false,
        russian: false,
        customize: false,
        customizeLang: '' },
     ispName: '',
  ip: { ip1: '1', ip2: '1', ip3: '1', ip4: '1' },
     accessMethod:
      { specialline: false,
        webhost: false,
        virtualhost: true,
        other: false },
     serverRegion: '1',
     managerName: '1',
     managerIdType: '3',
     managerIdNumber: '1',
     officePhoneRegion: '1',
     officePhoneNumber: '1',
     mobile: '1',
     email: '1',
     qq: '1' },
 material:
   { siteManagerUrl: 'http://apollodev.nos.netease.com/1453382882631',
     checkListUrl: 'http://apollodev.nos.netease.com/1453382882631',
     protocolUrl1: 'http://apollodev.nos.netease.com/1453382882631',
     protocolUrl2: 'http://apollodev.nos.netease.com/1453382882631',
     securityUrl1: 'http://apollodev.nos.netease.com/1453382882631',
     securityUrl2: 'http://apollodev.nos.netease.com/1453382882631' } }
*/


                this.type = 'json';
                this.body = {url:"aaa"};
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
                            var storeService = new StoreService(app,app.conn);
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
