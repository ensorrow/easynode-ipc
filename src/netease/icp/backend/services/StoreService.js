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

    const FILTER_CONDITION_ALL = 0;
    const FILTER_CONDITION_WAITED = 1;
    const FILTER_CONDITION_PASSED = 2;
    const FILTER_CONDITION_NOPASS = 3;

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

        createRecord() {
            var me = this;
            return function *(){

                var id = 0;
                var model = null
                var companyid = 0;
                var websiteid = 0;
                var r = null;
                var conn = null;
                var code = '';
                var tenantid = this.session.user.tenantid;
                var formData = this.request.body;

                try{
                    conn = yield  me.app.ds.getConnection();
                    yield * conn.beginTransaction()();

                    //1. insert companyinfo
                    model = new Company();
                    model.merge( Object.assign({},formData.companyinfo,{tenantid:tenantid},{createtime:Date.now(),updatetime:Date.now()} ));

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
                    var data  = Object.assign({},formData.siteinfo,{tenantid:tenantid},{createtime:Date.now(),updatetime:Date.now()} );
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
                    model.merge( Object.assign({},formData.baseinfo,formData.material,{tenantid:tenantid,companyid:companyid,websiteid:websiteid,status: 1,code:code},{createtime:Date.now(),updatetime:Date.now()} ));

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


        getRecords(){
            var me = this;
            return function *(){

                var conn = null;
                var tenantid = this.session.user.tenantid;
                var isadmin = this.session.user.isadmin || false;
                var filter = parseInt(this.parameter.param('filter'));
                var page = parseInt(this.parameter.param('page'));
                var rpp = parseInt(this.parameter.param('rpp'));
                var ret = { rows:0, pages:0, page:0, rpp:0, data:[] };

                try{
                    var model = new Record().merge( { tenantid:tenantid } );

                    conn = yield  me.app.ds.getConnection();
                    if( isadmin ){
                        const FILTER_CONDITION_ALL = 0;
                        const FILTER_CONDITION_WAITED = 1;
                        const FILTER_CONDITION_PASSED = 2;
                        const FILTER_CONDITION_NOPASS = 3;
                        if( filter ==  FILTER_CONDITION_ALL )
                            return yield conn.list(model,{ status: { exp:'<>',value:0 } },{ page: page,rpp: rpp });
                        if( filter ==  FILTER_CONDITION_WAITED )
                            return yield conn.list(model,{ status: { exp:'in',value:[1,4,7] } },{ page: page,rpp: rpp });
                        if( filter ==  FILTER_CONDITION_PASSED )
                            return yield conn.list(model,{ status: { exp:'in',value:[3,6,9] } },{ page: page,rpp: rpp });
                        if( filter ==  FILTER_CONDITION_NOPASS )
                            return yield conn.list(model,{ status: { exp:'in',value:[2,5,8] } },{ page: page,rpp: rpp });
                    }else{
                        return yield conn.list(model,{ tenantid: { exp:'=',value: tenantid } },{ page: page,rpp: rpp });
                    }
                } catch(e){
                    EasyNode.DEBUG && logger.debug(` ${e} ${e.stack}`);
                    return ret;
                }finally{
                    yield me.app.ds.releaseConnection(conn);
                }
            }
        }


        getRecord(){
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
                    var id = this.parameter.param('id') || 0;
                    conn = yield  me.app.ds.getConnection();

                    sql = `SELECT id,type,serverregion,companyid,websiteid,sitemanagerurl,checklisturl,protocolurl1,protocolurl2,securityurl1,securityurl2,curtainurl,code,status,tenantid,reasons,mailingaddress,recipient,recipientmobile,companyname FROM record WHERE id = #id#`;
                    arr =  yield conn.execQuery(sql,{ id:id });
                    if( arr.length <= 0 )
                        return ret;
                    record = arr[0];

                    if( record.companyid > 0 ){
                        sql = `SELECT id,province,city,area,nature,idtype,idnumber,name,liveaddress,commaddress,owner,managername,manageridtype,manageridnumber,officephoneregion,officephonenumber,mobile,email,recordnumber FROM company WHERE id = #id#`;
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

        putRecord(){
            var me = this;
            return function *(){
                var r = null;
                var conn = null;
                var model = new Record();
                var form = this.request.body;
                var status = form.status;
                var reasons = form.reasons;
                var id = form.id;
                var curtainurl = form.curtainurl;
                var mailingaddress = form.mailingaddress;
                var recipient = form.recipient;
                var recipientmobile = form.recipientmobile;
                var companyname = form.companyname;

                try{
                    conn = yield me.app.ds.getConnection();
                    model.merge( Object.assign({}, { id: id } ));
                    if( status ){
                        model.merge( Object.assign({}, { status: status } ));
                    }
                    if( reasons ){
                        model.merge( Object.assign({}, { reasons: reasons } ));
                    }
                    if( curtainurl ){
                        model.merge( Object.assign({}, { curtainurl: curtainurl } ));
                    }
                    if( mailingaddress ){
                        model.merge( Object.assign({}, { mailingaddress: mailingaddress } ));
                    }
                    if( recipient ){
                        model.merge( Object.assign({}, { recipient: recipient } ));
                    }
                    if( recipientmobile ){
                        model.merge( Object.assign({}, { recipientmobile: recipientmobile } ));
                    }
                    if( companyname ){
                        model.merge( Object.assign({}, { companyname: companyname } ));
                    }

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

        deleteRecord(){
            var me = this;
            return function *(){
                var conn = null;
                var formData = this.request.body;

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
                        {sitemanagerurl:'',checklisturl:'',protocolurl1:'',protocolurl2:'',securityurl1:'',securityurl2:'',reasons:''},
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


        /*
        * key:  object key, can be date object
        * filename: 文件名
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