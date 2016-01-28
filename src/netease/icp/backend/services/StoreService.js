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
        constructor(app) {
            super();
            //调用super()后再定义子类成员。
            this.app = app;
        }

        /**
         * @api: isFirst
         * @apiDescription:
         * @apiName {storeService}
         * @apiGroup {}

         * @apiSuccess { return id }
         * @apiVersion {}
         * */
        isFirst(tenantId) {
            var me = this;
            return function* ()
            {
                var sql = '';
                sql = `SELECT id FROM user WHERE tenantid = #tenantid#`;
                var args = {tenantid: tenantId};
                var arr = [];
                var conn = null;
                var id = 0;
                try{
                    conn = yield  me.app.ds.getConnection();
                    arr = yield conn.execQuery(sql, args);
                    id = arr[0].id;
                }catch(e){
                    EasyNode.DEBUG && logger.debug(` ${e},${e.stack}`);
                    return id;
                }finally{
                    yield me.app.ds.releaseConnection(conn);
                    return id;
                }
            }
        }

        /**
         * @api: getRecordNumber
         * @apiDescription: 获取租户备案记录数
         * @apiName {storeService}
         * @apiGroup {}

         * @apiParam {String tenanatId} 租户ID
         * @apiSuccess { recordNumber }
         * @apiError   { 0 }
         * @apiVersion {}
         * */
        getRecordNumber(tenantId) {
            var me = this;
            return function* ()
            {
                var sql = '';
                sql = `SELECT id FROM record WHERE tenantid = #tenantid#`;
                var args = {tenantid: tenantId};
                var arr = [];
                var conn = null;
                var id = 0;
                try{
                    conn = yield  me.app.ds.getConnection();
                    arr = yield conn.execQuery(sql, args);
                }catch(e){
                    EasyNode.DEBUG && logger.debug(` ${e},${e.stack}`);
                    return 0;
                }finally{
                    yield me.app.ds.releaseConnection(conn);
                    return arr.length;
                }
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
                var conn = null;
                var model = new User();
                model.merge( Object.assign({},user) );
                model.merge( {lastlogintime: Date.now(),createtime:Date.now()} );
                var id = 0;

                try {
                    conn = yield  me.app.ds.getConnection();
                    var r = yield conn.create(model);
                    id = r.insertId;
                }catch(e){
                    EasyNode.DEBUG && logger.debug(` ${e},${e.stack}`);
                }finally{
                    yield me.app.ds.releaseConnection(conn);
                    return {insertId:id};
                }
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
                var conn = null;
                var model = new User();

                model.merge( Object.assign({},user) );
                model.merge( {lastlogintime: Date.now()} );
                var id = 0;

                try {
                    conn = yield  me.app.ds.getConnection();
                    var r = yield conn.update(model);
                }catch(e){
                    EasyNode.DEBUG && logger.debug(` ${e},${e.stack}`);
                }finally{
                    yield me.app.ds.releaseConnection(conn);
                    return {insertId:id};//useless
                }
            }
        }

        /**
         * @api:  插入申请记录
         * @apiDescription:
         * @apiName {storeService}
         * @apiGroup {}

           @apiParam {formData}
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
                var conn = null;
                var code = '';

                try{
                    conn = yield  me.app.ds.getConnection();
                    yield * conn.beginTransaction()();

                    //1. insert companyinfo
                    model = new Company();
                    model.merge( Object.assign({},formData.companyinfo,{tenantid:formData.user.tenantid},{createtime:Date.now(),updatetime:Date.now()} ));

                    if( formData.companyinfo.hasOwnProperty("id") ){
                        r = yield conn.update(model);
                        id = formData.companyinfo.id;
                    }else{
                        r = yield conn.create(model);
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
                        r = yield conn.update(model);
                        id = formData.siteinfo.id;
                    }else{
                        r = yield conn.create(model);
                        id = r.insertId;
                    }
                    websiteid = id;

                    //3. insert appliyrecord
                    model = null;
                    model = new Record();
                    code = utils.randomString(32, '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
                    model.merge( Object.assign({},formData.baseinfo,formData.material,{tenantid:formData.user.tenantid,companyid:companyid,websiteid:websiteid,status: 1,code:code},{createtime:Date.now(),updatetime:Date.now()} ));

                    if( formData.baseinfo.hasOwnProperty("id") ){
                        r = yield conn.update(model);
                        id = formData.baseinfo.id;
                    }else{
                        r = yield conn.create(model);
                        id = r.insertId;
                    }

                    yield * conn.commit()();
                }catch(e){
                    EasyNode.DEBUG && logger.debug(` ${e},${e.stack}`);
                    yield * conn.rollback()();
                }finally {
                    yield me.app.ds.releaseConnection(conn);

                    return { code: code, id: id };
                }
            }
        }

        /**
         * @api:  获取申请记录
         * @apiDescription:
         * @apiName {storeService}
         * @apiGroup {}
         * @apiParam {formData}
         * @apiParam {formData.page} 页号
         * @apiParam {formData.tenantId} 租户ID
         * @apiSuccess {}
         * @apiVersion {}
         * */
        getApplyRecords(formData){
            var me = this;
            return function *(){
                var conn = null;
                var ret = {rows:0, pages:0, page:0, rpp:0,data:[]};
                try{
                    var model = new Record().merge({tenantid:formData.tenantId});
                    conn = yield  me.app.ds.getConnection();
                    if( formData.tenantId == "111111"){
                        return yield conn.list(model,{status:{exp:'<>',value:0}},{page:formData.page});
                    }else{
                        return yield conn.list(model,{tenantid:{exp:'=',value:formData.tenantId}},{page:formData.page,rpp:100});
                    }
                } catch(e){
                    EasyNode.DEBUG && logger.debug(` ${e} ${e.stack}`);
                    return ret;
                }finally{
                    yield me.app.ds.releaseConnection(conn);
                }
            }
        }

        /**
         * @api:  获取记录
         * @apiDescription:
         * @apiName {storeService}
         * @apiGroup {}
         * @apiParam {formData}
         * @apiParam {formData.id} record.id
         * @apiSuccess { ret }
         * @apiSuccess { ret.record } must have
         * @apiSuccess { ret.company } option have
         * @apiSuccess { ret.website } option have
         * @apiVersion {}
         * */
        getRecord(formData){
            var me = this;
            return function *(){

                var ret = {};
                var conn = null;
                var record = null;
                var arr = [];
                var company = null;
                var website = null;

                //1. record
                //2. company
                //3. website
                try{
                    var sql = '';
                    conn = yield  me.app.ds.getConnection();

                    sql = `SELECT id,type,serverregion,companyid,websiteid,sitemanagerurl,checklisturl,protocolurl1,protocolurl2,securityurl1,securityurl2 FROM record WHERE id = #id#`;
                    arr =  yield conn.execQuery(sql,{id:formData.id});
                    if( arr.length <= 0 )
                        return ret;
                    record = arr[0];

                    if( record.companyid > 0 ){
                        sql = `SELECT id,province,city,area,nature,idtype,idnumber,name,liveaddress,commaddress,owner,managername,manageridtype,manageridnumber,officephonenumber,officephonenumber,mobile,email,recordnumber FROM company WHERE id = #id#`;
                        arr =  yield conn.execQuery(sql,{id:record.companyid});
                        company = arr[0];
                    }
                    if( record.websiteid > 0 ){
                        sql = `SELECT id,name,domain,domain1,domain1,domain2,domain3,domain4,homeurl,servicecontent,languages,ispname,ip,accessmethod,serverregion,managername,manageridtype,manageridnumber,officephoneregion,officephonenumber,mobile,email,qq FROM website WHERE id = #id#`;
                        arr =  yield conn.execQuery(sql,{id:record.websiteid});
                        website = arr[0];
                    }
                    if( website ){
                        website.ip = JSON.parse(website.ip);
                        ret.website = website;
                    }
                    if( company ){
                        ret.company = company;
                    }

                    ret.record = record;
                    return ret;
                } catch(e){
                    EasyNode.DEBUG && logger.debug(` ${e} ${e.stack}`);
                    return ret;
                }finally{
                    yield me.app.ds.releaseConnection(conn);
                }
            }
        }

        /**
         * @api:  删除申请记录
         * @apiDescription:
         * @apiName {storeService}
         * @apiGroup {}
         * @apiParam {formData}
         * @apiParam {formData.id} 编码
         * @apiSuccess {}
         * @apiVersion {}
         * */
        deleteApplyRecords(formData){
            var me = this;
            return function *(){
                var conn = null;
                try{
                    var model = new Record();
                    conn = yield  me.app.ds.getConnection();

                    yield conn.del( model,[formData.id]);
                } catch(e){
                    EasyNode.DEBUG && logger.debug(` ${e} ${e.stack}`);
                    return {id: formData.id,ret:false};
                }finally{
                    yield me.app.ds.releaseConnection(conn);
                    return {id: formData.id,ret:true};
                }
            }
        }

        /**
         * @api:  更新记录companyid
         * @apiDescription:
         * @apiName {storeService}
         * @apiGroup {}
         * @apiParam {id}  record id
         * @apiParam {companyid}  companyid
         * @apiSuccess { return true| false }
         * @apiVersion {}
         * */
        updateRecordCompanyid(id,companyid) {
            var me = this;
            return function *(){
                var r = null;
                var conn = null;
                var model = new Record();
                var code = '';

                try{
                    conn = yield me.app.ds.getConnection();

                    model.merge( Object.assign({}, {companyid:companyid,id:id} ));
                    r = yield conn.update(model);
                    return true;
                }catch(e){
                    EasyNode.DEBUG && logger.debug(` ${e},${e.stack}`);
                    return false;
                }finally {
                    yield me.app.ds.releaseConnection(conn);
                }
            }
        }

        /**
         * @api:  更新记录websiteid
         * @apiDescription:
         * @apiName {storeService}
         * @apiGroup {}
         * @apiParam {id}  record id
         * @apiParam {websiteid}  websiteid
         * @apiSuccess { return true| false }
         * @apiVersion {}
         * */
        updateRecordWebsiteid(id,websiteid) {
            var me = this;
            return function *(){
                var r = null;
                var conn = null;
                var model = new Record();
                var code = '';

                try{
                    conn = yield me.app.ds.getConnection();

                    model.merge( Object.assign({}, {websiteid:websiteid,id:id} ));
                    r = yield conn.update(model);
                    return true;
                }catch(e){
                    EasyNode.DEBUG && logger.debug(` ${e},${e.stack}`);
                    return false;
                }finally {
                    yield me.app.ds.releaseConnection(conn);
                }
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
                var conn = null;
                var model = new Record();
                var code = '';

                try{
                    conn = yield me.app.ds.getConnection();

                    model.merge( Object.assign({},
                        formData.baseinfo,
                        {sitemanagerurl:'',checklisturl:'',protocolurl1:'',protocolurl2:'',securityurl1:'',securityurl2:''},
                        {tenantid:formData.user.tenantid,companyid:0,websiteid:0,status: 0},
                        {createtime:Date.now(),updatetime:Date.now()}
                    ));

                    if( formData.companyinfo && formData.companyinfo.hasOwnProperty('id') ){
                        model.merge({companyid:formData.companyinfo.id});
                    }
                    if( formData.siteinfo && formData.siteinfo.hasOwnProperty('id') ){
                        model.merge({websiteid:formData.siteinfo.id});
                    }


                    if( formData.baseinfo.hasOwnProperty("id") ){
                        model.merge( Object.assign({},
                            {updatetime:Date.now()}
                        ));

                        r = yield conn.update(model);
                        id = formData.baseinfo.id;
                    }else{
                        code = utils.randomString(32, '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
                        model.merge( Object.assign({},
                            {code:code},
                            {createtime:Date.now(),updatetime:Date.now()}
                        ));

                        r = yield conn.create(model);
                        id = r.insertId;
                    }
                }catch(e){
                    EasyNode.DEBUG && logger.debug(` ${e},${e.stack}`);
                }finally {
                    yield me.app.ds.releaseConnection(conn);
                    return {drafttype: formData.drafttype, id: id};
                }
            }
        }

        //2.
        saveCompanyInfo( formData ){
            var me = this;
            return function*() {
                var r = null;
                var id = 0;
                var conn = null;

                try {
                    conn = yield me.app.ds.getConnection();

                    var model = new Company();
                    model.merge(Object.assign({},
                        formData.companyinfo,
                        {tenantid: formData.user.tenantid},
                        {createtime: Date.now(), updatetime: Date.now()}
                    ));

                    if (formData.companyinfo.hasOwnProperty("id")) {
                        r = yield conn.update(model);
                        id = formData.companyinfo.id;
                    } else {
                        r = yield conn.create(model);
                        id = r.insertId;
                    }
                    yield  me.updateRecordCompanyid(formData.baseinfo.id,id);
                }catch(e){
                        EasyNode.DEBUG && logger.debug(` ${e},${e.stack}`);
                }finally {
                    yield me.app.ds.releaseConnection(conn);
                    return {drafttype: formData.drafttype, id: id};
                }
            }
        }

        //3.
        saveWebsiteInfo( formData ){
            var me = this;
            return function*() {
                var r = null;
                var id = 0;
                var model = new Website();
                var conn = null;

                try {
                    conn = yield me.app.ds.getConnection();

                    var data = Object.assign({},
                        formData.siteinfo,
                        {tenantid: formData.user.tenantid},
                        {createtime: Date.now(), updatetime: Date.now()}
                    );
                    data.manageridtype = parseInt(data.manageridtype);
                    data.accessmethod = JSON.stringify(data.accessmethod);
                    data.ip = JSON.stringify(data.ip);
                    data.languages = JSON.stringify(data.languages);
                    model.merge(data);


                    if (formData.siteinfo.hasOwnProperty("id")) {
                        r = yield conn.update(model);
                        id = formData.siteinfo.id;
                    } else {
                        r = yield conn.create(model);
                        id = r.insertId;
                    }
                    yield me.updateRecordWebsiteid(formData.baseinfo.id,id);
                }catch(e){
                        EasyNode.DEBUG && logger.debug(` ${e},${e.stack}`);
                }finally {
                    yield me.app.ds.releaseConnection(conn);
                    return {drafttype: formData.drafttype, id: id};
                }
            }
        }

        //4. here, where in the draft status, it'll not generate the apply code.
        saveMaterial( formData ){
            var me = this;
            return function*() {
                var r = null;
                var id = 0;
                var model = new Record();
                var conn = null;

                try {
                    conn = yield me.app.ds.getConnection();

                    model.merge(Object.assign({},
                        formData.baseinfo,
                        formData.material,
                        {
                            tenantid: formData.user.tenantid,
                            companyid: formData.companyinfo.id,
                            websiteid: formData.siteinfo.id,
                            status: 0
                        },
                        {createtime: Date.now(), updatetime: Date.now()}
                    ));

                    if (formData.baseinfo.hasOwnProperty("id")) {

                        model.merge(Object.assign({},{updatetime: Date.now()}));

                        r = yield conn.update(model);
                        id = formData.baseinfo.id;
                    } else {
                        //var code = utils.randomString(32, '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
                        //model.merge(Object.assign({},{code: code}));
                        r = yield conn.create(model);
                        id = r.insertId;
                    }
                }catch(e){
                    EasyNode.DEBUG && logger.debug(` ${e},${e.stack}`);
                }finally {
                    yield me.app.ds.releaseConnection(conn);
                    return {drafttype: formData.drafttype, id: id};
                }
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