var assert = require('assert');
var logger = using('easynode.framework.Logger').forFile(__filename);
var GenericObject = using('easynode.GenericObject');
var md5 =  require('md5');
var fs = require('co-fs');
var f =  require('fs');
var bfs = require('babel-fs');
var Nos = require('nenos');
var archiver = require('archiver');
var _ = require('lodash');
var User = using('netease.icp.backend.models.User');
var Company = using('netease.icp.backend.models.Company');
var Website = using('netease.icp.backend.models.Website');
var Record = using('netease.icp.backend.models.Record');
var Nos = require('nenos');
var utils = require('utility');

(function () {

    /**
     * Class StoreService
     *
     * @class netease.icp.backend.services.StoreService
     * @extends easynode.GenericObject
     * @since 0.1.0
     * @author allen.hu
     * @description
     * */
    class StoreService extends GenericObject {
        /**
         * 构造函数。
         *
         * @method 构造函数
         * @since 0.1.0
         * @author allen.hu
         * */
        constructor(app,conn) {
            super();
            //调用super()后再定义子类成员。
            this.app = app;
            this.conn = conn;
        }

        /**
         * @api: isFirst
         * @apiDescription:
         * @apiName {storeService}
         * @apiGroup {}

         * @apiSuccess { return true|false }
         * @apiVersion {}
         * */
        isFirst(tenantId,userName,email) {
            var me = this;
            return function* ()
            {
                var sql = '';
                sql = `SELECT
                id
                FROM
                user
                WHERE
                tenantId = #tenantId# and
                userName = #userName# and
                email = #email#`;
                var args = {tenantId: tenantId, userName: userName, email: email};
                var arr = yield me.conn.execQuery(sql, args);
                return arr.length <= 0 ? true : false;
            }
        }

        /**
         * @api: addUser
         * @apiDescription:
         * @apiName {storeService}
         * @apiGroup {}

         * @apiSuccess { return insertId }
         * @apiVersion {}
         * */
        addUser(user) {
            var me = this;
            return function *(){
                var model = new User();
                model.merge( Object.assign({},user) );
                model.merge( {lastlogintime: Date.now(),createtime:Date.now()} );
                var r = yield me.conn.create(model);
                return {insertId:r.insertId};
            }
        }

        /**
         * @api: updateUser
         * @apiDescription:
         * @apiName {storeService}
         * @apiGroup {}

         * @apiSuccess { return insertId }
         * @apiVersion {}
         * */
        updateUser(user) {
            var me = this;
            return function *(){
                var model = new User();
                model.merge( Object.assign({},user) );
                model.merge( {lastlogintime: Date.now()} );
                return yield me.conn.update(model);
            }
        }

        /**
         * @api:  插入申请记录
         * @apiDescription:
         * @apiName {storeService}
         * @apiGroup {}

           @apiParam {formData}
 格式如下:
{
    user:
    {
        tenantid: 'b261f52d302b43ba821a6d731b17034c',
        status: '1',
        logintype: '1',
        email: 'hujb2000@163.com',
        username: 'hujb2000@163.com'
    },
    loginCallback:
    {
        success: 'http://icp.hzspeed.cn/login/callback?result=200',
        error: 'http://icp.hzspeed.cn/login/callback?result=201'
    },
    baseinfo:
    {
        type: 0,
        serverregion: 0
    },
    companyinfo:
    {
        province: '山西省',
        city: '长治市',
        area: '襄垣县',
        nature: '2',
        idtype: '2',
        idnumber: '1',
        name: '1',
        liveaddress: '1',
        commaddress: '1',
        owner: '1',
        managername: '1',
        manageridtype: '3',
        manageridnumber: '1',
        officephonenumber: '1',
        mobile: '1',
        email: '1'
    },
    siteinfo:
    {
        name: '1',
        domain: '',
        domain1: '',
        domain2: '',
        domain3: '',
        domain4: '',
        homeurl: '1',
        servicecontent: 1,
        languages:
        {
            chinese: true,
            chinesetraditional: false,
            eglish: false,
            japanese: false,
            french: false,
            spanish: false,
            arabic: false,
            russian: false,
            customize: false,
            customizeLang: ''
       },
       ispname: '',
       ip:
       {
        ip1: '1', ip2: '1', ip3: '1', ip4: '1'
       },
        accessmethod:
        {
            specialline: false,
            webhost: false,
            virtualhost: true,
            other: false
        },
         serverregion: '1',
         managername: '1',
         manageridtype: '3',
         manageridnumber: '1',
         officephoneregion: '1',
         officephonenumber: '1',
         mobile: '1',
         email: '1',
         qq: '1'
     },
    material:
    {
        sitemanagerurl: 'http://apollodev.nos.netease.com/1453382882631',
        checklisturl: 'http://apollodev.nos.netease.com/1453382882631',
        protocolurl1: 'http://apollodev.nos.netease.com/1453382882631',
        protocolurl2: 'http://apollodev.nos.netease.com/1453382882631',
        securityurl1: 'http://apollodev.nos.netease.com/1453382882631',
        securityurl2: 'http://apollodev.nos.netease.com/1453382882631'
    }
 }

         * @apiSuccess { return insertId }
         * @apiVersion {}
         * */
        insertApplyRecord(formData) {
            var me = this;
            return function *(){

                var id = 0;
                var model = null
                var companyid = 0;
                var websiteid = 0;
                var r = null;

                //1. insert companyinfo
                model = new Company();
                model.merge( Object.assign({},formData.companyinfo,{tenantid:formData.user.tenantid},{createtime:Date.now(),updatetime:Date.now()} ));

                if( formData.companyinfo.hasOwnProperty("id") ){
                    r = yield me.conn.update(model);
                    id = formData.companyinfo.id;
                }else{
                    r = yield me.conn.create(model);
                    id = r.insertId;
                }
                companyid =  id;

                //2. insert siteinfo
                model = null;
                model = new  Website();
                var data  = Object.assign({},formData.siteinfo,{tenantid:formData.user.tenantid},{createtime:Date.now(),updatetime:Date.now()} );
                data.manageridtype = parseInt(data.manageridtype);
                data.accessmethod = JSON.stringify(data.accessmethod);
                data.ip = JSON.stringify(data.ip);
                data.languages = JSON.stringify(data.languages);
                model.merge( data );

                if( formData.siteinfo.hasOwnProperty("id") ){
                    r = yield me.conn.update(model);
                    id = formData.siteinfo.id;
                }else{
                    r = yield me.conn.create(model);
                    id = r.insertId;
                }
                websiteid = id;

                //3. insert appliyrecord
                model = null;
                model = new Record();
                var code = utils.randomString(32, '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
                model.merge( Object.assign({},formData.baseinfo,formData.material,{tenantid:formData.user.tenantid,companyid:companyid,websiteid:websiteid,status: 1,code:code},{createtime:Date.now(),updatetime:Date.now()} ));

                if( formData.material.hasOwnProperty("id") ){
                    r = yield me.conn.update(model);
                    id = formData.material.id;
                }else{
                    r = yield me.conn.create(model);
                    id = r.insertId;
                }
                return { code: code, id: id };
            }
        }


        /**
         * @api:  保存草稿
         * @apiDescription:
         * @apiName {storeService}
         * @apiGroup {}
         @apiParam {formData}
         * @apiSuccess { return insertId }
         * @apiVersion {}
         * */
        savedraft(formData) {
            var me = this;
            return function *(){

                console.log(formData);

                var model = null;
                var r = null;
                if( formData.drafttype  == 1){
                    return yield me.saveBaseInfo(formData);
                }
                else if( formData.drafttype  == 2){
                    return yield me.saveCompanyInfo(formData);
                }
                else if( formData.drafttype  == 3){
                    return yield me.saveWebsiteInfo(formData);
                }
                else if( formData.drafttype  == 4){
                    return yield me.saveMaterial(formData);
                }
            }
        }

        //1.
        saveBaseInfo( formData ){
            var me = this;
            return function*() {
                var r = null;
                var id = 0;
                var model = new Record();

                model.merge( Object.assign({},
                    formData.baseinfo,
                    {sitemanagerurl:'',checklisturl:'',protocolurl1:'',protocolurl2:'',securityurl1:'',securityurl2:''},
                    {tenantid:formData.user.tenantid,companyid:0,websiteid:0,status: 0,code:''},
                    {createtime:Date.now(),updatetime:Date.now()}
                ));

                if( formData.baseinfo.hasOwnProperty("id") ){
                    r = yield me.conn.update(model);
                    id = formData.baseinfo.id;
                }else{
                    r = yield me.conn.create(model);
                    id = r.insertId;
                }
                return {drafttype: formData.drafttype, id: formData.baseinfo.id};
            }
        }

        //2.
        saveCompanyInfo( formData ){
            var me = this;
            return function*() {
                var r = null;
                var id = 0;

                var model = new Company();
                model.merge( Object.assign({},
                    formData.companyinfo,
                    {tenantid:formData.user.tenantid},
                    {createtime:Date.now(),updatetime:Date.now()}
                ));

                if( formData.companyinfo.hasOwnProperty("id") ){
                    r = yield me.conn.update(model);
                    id = formData.companyinfo.id;
                }else{
                    r = yield me.conn.create(model);
                    id = r.insertId;
                }
                return {drafttype: formData.drafttype, id: id};
            }
        }

        //3.
        saveWebsiteInfo( formData ){
            var me = this;
            return function*() {
                var r = null;
                var id = 0;
                var model = new Website();

                var data  = Object.assign({},
                    formData.siteinfo,
                    {tenantid:formData.user.tenantid},
                    {createtime:Date.now(),updatetime:Date.now()}
                );
                data.manageridtype = parseInt(data.manageridtype);
                data.accessmethod = JSON.stringify(data.accessmethod);
                data.ip = JSON.stringify(data.ip);
                data.languages = JSON.stringify(data.languages);
                model.merge( data );


                if( formData.siteinfo.hasOwnProperty("id") ){
                    r = yield me.conn.update(model);
                    id = formData.siteinfo.id;
                }else{
                    r = yield me.conn.create(model);
                    id = r.insertId;
                }
                return {drafttype: formData.drafttype, id: id};
            }
        }

        //4.
        saveMaterial( formData ){
            var me = this;
            return function*() {
                var r = null;
                var id = 0;
                var model = new Record();

                var code = utils.randomString(32, '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
                model.merge( Object.assign({},
                    formData.baseinfo,
                    formData.material,
                    {tenantid:formData.user.tenantid,companyid:formData.companyinfo.id,websiteid:formData.siteinfo.id,status:0,code:code},
                    {createtime:Date.now(),updatetime:Date.now()} ));


                if( formData.material.hasOwnProperty("id") ){
                    r = yield me.conn.update(model);
                    id = formData.material.id;
                }else{
                    r = yield me.conn.create(model);
                    id = r.insertId;
                }
                return {drafttype: formData.drafttype, id: id};
            }
        }

        /**
         * @api:   上传文件至NOS,key as the ObjectKey
         * @apiDescription:
         * @apiName {}
         * @apiGroup {}
         * @apiPermission {}
         * @apiSuccess {} {} {}
         * @apiVersion {}
         * */
        uploadNos(key,filename){
            return function* (){
                var url = `http://apollodev.nos.netease.com/${key}`;
                    let nos = new Nos('c92f74b0d48f4fb39271a1109da74cc2','f200fad9c6b541d28f01159de8d9ecea','apollodev');
                yield nos.upload(key,filename);
                nos = null;
                return url;
            }
        }

        getClassName() {
            return EasyNode.namespace(__filename);
        }
    }

    module.exports = StoreService;
})();