var assert = require('assert');
var logger = using('easynode.framework.Logger').forFile(__filename);
var GenericObject = using('easynode.GenericObject');
var md5 =  require('md5');
var fs = require('co-fs');
var f =  require('fs');
var bfs = require('babel-fs');
var archiver = require('archiver');
var _ = require('lodash');
var User = using('netease.icp.backend.models.User');
var Company = using('netease.icp.backend.models.Company');
var Website = using('netease.icp.backend.models.Website');
var Record = using('netease.icp.backend.models.Record');
var Iply = using('netease.icp.backend.models.Iply');
var Area = using('netease.icp.backend.models.Area');
var Sys = using('netease.icp.backend.models.Sys');
var Nos = require('nenos');
var utils = require('utility');
//import request from 'superagent';
import {RecordCheckStatus} from '../../../../../public/netease/icp/constant/define';

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
        constructor(app,config = {}) {
            super();
            //调用super()后再定义子类成员。
            this.app = app;
            this.tenantpubips = config.tenantpubips;
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
                    id = arr.length > 0 ? arr[0].id : id;
                }catch(e){
                    EasyNode.DEBUG && logger.debug(` ${e},${e.stack}`);
                }finally{
                    yield me.app.ds.releaseConnection(conn);
                    return id;
                }
            }
        }

        getUserAddress(tenantId) {
            var me = this;
            return function* ()
            {
                var sql = '';
                sql = `SELECT mailingaddress,recipient,recipientmobile,companyname,applycurtainstatus FROM user WHERE tenantid = #tenantid#`;
                var args = {tenantid: tenantId};
                var empty = {mailingaddress:'',recipient:'',recipientmobile:'',companyname:'',applycurtainstatus:0};
                var arr = [];
                var conn = null;
                try{
                    conn = yield  me.app.ds.getConnection();
                    arr = yield conn.execQuery(sql, args);
                }catch(e){
                    EasyNode.DEBUG && logger.debug(` ${e},${e.stack}`);
                }finally{
                    yield me.app.ds.releaseConnection(conn);
                    return arr.length > 0 ?  arr[0] : empty;
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


        /**
         * 接口：
         POST https://c.163.com/api/account/pubips
         参数：
         secret=3soLEF67wx&tenantId=xxxxxxxx

         正确响应：
         {
             "params": [
                 {
                     "pubIp": "60.191.83.166"
                 }
             ],
             "code": 200,
             "msg": "succ"
         }

         错误响应：
         code : 413 secret(密码)不对。
         code:  401 账号不存在。
         * */
      /*  gettenantPubips(){
            var me = this;
            return function *(){
                console.log("sessin",this.session);
                var tenantId = this.session.user.tenantid;
                return  new Promise( function(res,rej) {
                    console.log("tenantId",tenantId);
                    var url = `${me.tenantpubips.urlPath}?secret=${me.tenantpubips.secret}&tenantId=${tenantId}`;
                    console.log(url);
                    request.post(url)
                        .end(function(err,ret){
                            if( err ){
                                rej();
                            }else{
                                res(ret.text);
                            }
                        });
                });
            }
        }
*/
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
                        const FILTER_CONDITION_PHOTO_PASSED = 6;
                        if( filter ==  FILTER_CONDITION_ALL )
                            ret = yield conn.list(model,{ status: { exp:'<>',value:0 } },{ page: page,rpp: rpp },['updatetime ASC]']);
                        if( filter ==  FILTER_CONDITION_WAITED )
                            ret = yield conn.list(model,{ status: { exp:'in',value:[1,4,7] } },{ page: page,rpp: rpp },['updatetime DESC']);
                        if( filter ==  FILTER_CONDITION_PASSED )
                            ret = yield conn.list(model,{ status: { exp:'in',value:[3,6,9] } },{ page: page,rpp: rpp },['updatetime DESC']);
                        if( filter ==  FILTER_CONDITION_NOPASS )
                            ret = yield conn.list(model,{ status: { exp:'in',value:[2,5,8] } },{ page: page,rpp: rpp },['updatetime DESC']);
                        if( filter == FILTER_CONDITION_PHOTO_PASSED ){
                            ret =  yield conn.list(model,{ status: { exp:'in',value:[6] } },{ page: page,rpp: rpp },['updatetime DESC']);
                        }
                    }else{
                        ret = yield conn.list(model,{ tenantid: { exp:'=',value: tenantid } },{ page: page,rpp: rpp },['updatetime DESC']);
                    }
                } catch(e){
                    EasyNode.DEBUG && logger.debug(` ${e} ${e.stack}`);
                }finally{
                    yield me.app.ds.releaseConnection(conn);
                    return ret;
                }
            }
        }

        getRecordsb(){
            var me = this;
            return function *(){

                var conn = null;
                var filter = parseInt(this.parameter.param('filter'));
                var page = parseInt(this.parameter.param('page'));
                var rpp = parseInt(this.parameter.param('rpp'));
                var ret = { rows:0, pages:0, page:0, rpp:0, data:[] };

                try{
                    var model = new Record().merge( { } );

                    conn = yield  me.app.ds.getConnection();

                    const FILTER_CONDITION_ALL = 0;
                    const FILTER_CONDITION_WAITED = 1;
                    const FILTER_CONDITION_PASSED = 2;
                    const FILTER_CONDITION_NOPASS = 3;
                    const FILTER_CONDITION_PHOTO_PASSED = 6;
                    if( filter ==  FILTER_CONDITION_ALL )
                        ret =  yield conn.list(model,{ status: { exp:'<>',value:0 } },{ page: page,rpp: rpp },['updatetime DESC']);
                    if( filter ==  FILTER_CONDITION_WAITED )
                        ret =  yield conn.list(model,{ status: { exp:'in',value:[1,4,7] } },{ page: page,rpp: rpp },['updatetime DESC']);
                    if( filter ==  FILTER_CONDITION_PASSED )
                        ret =  yield conn.list(model,{ status: { exp:'in',value:[3,6,9] } },{ page: page,rpp: rpp },['updatetime DESC']);
                    if( filter ==  FILTER_CONDITION_NOPASS )
                        ret =  yield conn.list(model,{ status: { exp:'in',value:[2,5,8] } },{ page: page,rpp: rpp },['updatetime DESC']);
                    if( filter == FILTER_CONDITION_PHOTO_PASSED ){
                        ret =  yield conn.list(model,{ status: { exp:'in',value:[6] } },{ page: page,rpp: rpp },['updatetime DESC']);
                    }
                } catch(e){
                    EasyNode.DEBUG && logger.debug(` ${e} ${e.stack}`);
                }finally{
                    yield me.app.ds.releaseConnection(conn);
                    return ret;
                }
            }
        }

        getRecordsbByStatus(){
            var me = this;
            return function *(){

                var conn = null;
                var form = this.request.body;
                console.log("form",form);
                var filter = form.filter;
                var page = parseInt(form.page);
                var rpp = parseInt(form.rpp);
                var ret = { rows:0, pages:0, page:0, rpp:0, data:[] };

                try{
                    var model = new Record().merge( { } );

                    conn = yield  me.app.ds.getConnection();

                    ret =  yield conn.list(model,{ status: { exp:'in',value:filter } },{ page: page,rpp: rpp },['updatetime DESC']);

                } catch(e){
                    EasyNode.DEBUG && logger.debug(` ${e} ${e.stack}`);
                }finally{
                    yield me.app.ds.releaseConnection(conn);
                    return ret;
                }
            }
        }

        getCurtainsb(){
            var me = this;
            return function *(){

                var conn = null;
                var filter = parseInt(this.parameter.param('filter'));
                var page = parseInt(this.parameter.param('page'));
                var rpp = parseInt(this.parameter.param('rpp'));
                var ret = { rows:0, pages:0, page:0, rpp:0, data:[] };

                try{
                    var model = new User().merge( { } );

                    conn = yield  me.app.ds.getConnection();

                    const FILTER_CONDITION_ALL = 3;
                    const FILTER_CONDITION_CHECKING = 1;
                    const FILTER_CONDITION_PASSED = 2;
                    if( filter ==  FILTER_CONDITION_ALL )
                        ret = yield conn.list(model,{ applycurtainstatus: { exp:'<>',value:0 } },{ page: page,rpp: rpp },['lastlogintime DESC']);
                    if( filter ==  FILTER_CONDITION_CHECKING )
                        ret = yield conn.list(model,{ applycurtainstatus: { exp:'in',value:[FILTER_CONDITION_CHECKING] } },{ page: page,rpp: rpp },['lastlogintime DESC']);
                    if( filter ==  FILTER_CONDITION_PASSED )
                        ret = yield conn.list(model,{ applycurtainstatus: { exp:'in',value:[FILTER_CONDITION_PASSED] } },{ page: page,rpp: rpp },['lastlogintime DESC']);
                } catch(e){
                    EasyNode.DEBUG && logger.debug(` ${e} ${e.stack}`);
                }finally{
                    yield me.app.ds.releaseConnection(conn);
                    return ret;
                }
            }
        }

        getRecord(){
            var me = this;
            return function *(){

                var tenantid = this.session.user.tenantid;
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

                    sql = `SELECT id,type,serverregion,companyid,websiteid,sitemanagerurl,checklisturl,checkedlisturl,protocolurl1,protocolurl2,securityurl1,securityurl2,curtainurl,code,status,tenantid,reasons FROM record WHERE id = #id# and tenantid = #tenantid#`;
                    arr =  yield conn.execQuery(sql,{ id:id,tenantid:tenantid });
                    if( arr.length <= 0 )
                        return ret;
                    record = arr[0];

                    if( record.companyid > 0 ){
                        sql = `SELECT id,province,city,area,nature,idtype,idnumber,name,liveaddress,commaddress,owner,managername,manageridtype,manageridnumber,manageraddress,officephoneregion,officephonenumber,mobile,email,recordnumber,recordpassword FROM company WHERE id = #id#`;
                        arr =  yield conn.execQuery(sql,{id:record.companyid});
                        company = arr[0];
                    }
                    if( record.websiteid > 0 ){
                        sql = `SELECT id,name,domain,domain1,domain1,domain2,domain3,domain4,homeurl,servicecontent,languages,ispname,ip,accessmethod,serverregion,managername,manageridtype,manageridnumber,officephoneregion,officephonenumber,mobile,email,qq,prechecktype,checknumber,checkfileurl,remark FROM website WHERE id = #id#`;
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

                } catch(e){
                    EasyNode.DEBUG && logger.debug(` ${e} ${e.stack}`);
                }finally{
                    yield me.app.ds.releaseConnection(conn);
                    return ret;
                }
            }
        }


        getRecordb(recordId = 0){
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
                    var id =  (this.parameter && this.parameter.param && this.parameter.param('id') ) || recordId ;
                    conn = yield  me.app.ds.getConnection();

                    sql = `SELECT id,type,serverregion,companyid,websiteid,sitemanagerurl,checklisturl,checkedlisturl,protocolurl1,protocolurl2,securityurl1,securityurl2,curtainurl,code,status,tenantid,reasons,operatetime,operator,beianstatus FROM record WHERE id = #id#`;
                    arr =  yield conn.execQuery(sql,{ id:id } );
                    if( arr.length <= 0 )
                        return ret;
                    record = arr[0];

                    if( record.companyid > 0 ){
                        sql = `SELECT id,province,city,area,nature,idtype,idnumber,name,liveaddress,commaddress,owner,managername,manageraddress,manageridtype,manageridnumber,officephoneregion,officephonenumber,mobile,email,recordnumber,recordpassword FROM company WHERE id = #id#`;
                        arr =  yield conn.execQuery(sql,{id:record.companyid});
                        company = arr[0];
                    }
                    if( record.websiteid > 0 ){
                        sql = `SELECT id,name,domain,domain1,domain1,domain2,domain3,domain4,homeurl,servicecontent,languages,ispname,ip,accessmethod,serverregion,managername,manageridtype,manageridnumber,officephoneregion,officephonenumber,mobile,email,qq,prechecktype,checknumber,checkfileurl,remark FROM website WHERE id = #id#`;
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

                } catch(e){
                    EasyNode.DEBUG && logger.debug(` ${e} ${e.stack}`);
                }finally{
                    yield me.app.ds.releaseConnection(conn);
                    return ret;
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
                var tenantid = form.tenantid || this.session.user.tenantid;
                var arr = [];
                var sql = ``;

                try{
                    conn = yield me.app.ds.getConnection();

                    sql = `SELECT id,tenantid FROM record WHERE id = #id# and tenantid = #tenantid#`;
                    arr =  yield conn.execQuery(sql,{ id:id,tenantid:tenantid });
                    if( arr.length <= 0 )
                        return false;

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

                    r = yield conn.update(model);
                    var ret =  r.affectedRows + r.insertId > 0 ?  true : false;
                    if( ret ){
                        if( status == 1 ){//初审中
                            me.app.checklist.push(id);
                        }
                    }
                    return ret;
                }catch(e){
                    EasyNode.DEBUG && logger.debug(` ${e},${e.stack}`);
                    return false;
                }finally {
                    yield me.app.ds.releaseConnection(conn);
                }
            }
        }

        putRecordb(){
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
                var operatetime = form.operatetime;
                var operator = form.operator;
                var checkedlisturl = form.checkedlisturl;
                var beianstatus = form.beianstatus;

                try{
                    conn = yield me.app.ds.getConnection();

                    model.merge( Object.assign({}, { id: id,operatetime:operatetime,operator:operator } ));
                    if( status ){
                        model.merge( Object.assign({}, { status: status } ));
                    }
                    if( reasons ){
                        model.merge( Object.assign({}, { reasons: reasons } ));
                    }
                    if( curtainurl ){
                        model.merge( Object.assign({}, { curtainurl: curtainurl } ));
                    }
                    if( checkedlisturl ){
                        model.merge( Object.assign({}, { checkedlisturl: checkedlisturl } ));
                    }
                    if( beianstatus ){
                        model.merge( Object.assign({}, { beianstatus: beianstatus } ));
                    }

                    r = yield conn.update(model);
                    var ret =  r.affectedRows + r.insertId > 0 ?  true : false;
                    if( ret ){
                        if( status == 7 ){//管局审核中
                            var ret = yield me.isp_upload(id);

                            EasyNode.DEBUG && logger.debug(` upload to GYB result:`, ret);
                            if( ret ){
                                //yield ms.isp_upload_hsjg(id);//useless
                                EasyNode.DEBUG && logger.debug(` upload hsjg`, ret);
                            }
                        }
                    }
                    return ret;
                }catch(e){
                    EasyNode.DEBUG && logger.debug(` ${e},${e.stack}`);
                    return false;
                }finally {
                    yield me.app.ds.releaseConnection(conn);
                }
            }
        }

        /**
         * @method 管局审核
         * @apiName decryptContent
         * @apiGroup ISP
         * @apiPermission whitelist
         * @apiVersion 0.0.2
         * @apiDescription
         *   管局审核意见及处理结果
         *
         * @apiParam {Object} gjsh  管局审核意见及处理结果对象
         * @apiParam {String} gjsh.Shrxm  审核人姓名
         * @apiParam {String} gjsh.Shr_ddhm  联系电话
         * @apiParam {String} gjsh.Shsj  审核时间
         * @apiParam {String} gjsh.Shyj  审核意见
         * @apiParam {Number} gjsh.Shjg  审核结果
         * @apiParam {Number} gjsh.Czlx  操作类型
         * @apiParam {Number} gjsh.Jlid  相关记录id
         *
         *
         * @apiSuccess {Object} ret {result:0|1,beianInfo:{}}  ret:0不通过,1通过, beianInfo解密,解压后的内容
        * */
        putRecordbgjsh(gjsh){
            var me = this;
            return function *(){
                var r = null;
                var conn = null;
                var model = new Record();
                var status = gjsh.Shjg == 0 ? RecordCheckStatus.RS_COUNCIL_NOPASS : RecordCheckStatus.RS_COUNCIL_PASS;
                var reasons = gjsh.Shyj;
                var id = gjsh.Jlid;
                var operatetime = Date.now();
                var operator = gjsh.Shrxm;

                try{
                    conn = yield me.app.ds.getConnection();

                    model.merge( Object.assign({}, { id: id,operatetime:operatetime,operator:operator,reasons: reasons,status: status  } ));

                    r = yield conn.update(model);
                    var ret =  r.affectedRows + r.insertId > 0 ?  true : false;
                    if( ret ){
                        console.log("record original gjsh, ToDo");//ToDo
                    }
                    return ret;
                }catch(e){
                    EasyNode.DEBUG && logger.debug(` ${e},${e.stack}`);
                    return false;
                }finally {
                    yield me.app.ds.releaseConnection(conn);
                }
            }
        }

        putBeianstatus(idp=0,beianstatusp=''){
            var me = this;
            return function *(){
                var r = null;
                var conn = null;
                var model = new Record();
                var id = idp;
                var beianstatus = beianstatusp;

                try{
                    conn = yield me.app.ds.getConnection();

                    model.merge( Object.assign({}, { id: id, beianstatus:beianstatus} ));

                    r = yield conn.update(model);
                    var ret =  r.affectedRows + r.insertId > 0 ?  true : false;
                    return ret;
                }catch(e){
                    EasyNode.DEBUG && logger.debug(` ${e},${e.stack}`);
                    return false;
                }finally {
                    yield me.app.ds.releaseConnection(conn);
                }
            }
        }

        putWebsiteb(){
            var me = this;
            return function *(){
                var r = null;
                var conn = null;
                var model = new Website();
                var form = this.request.body;
                var id = form.id;
                var languages = form.languages;
                var name = form.name;
                var officephonenumber = form.officephonenumber;


                try{
                    conn = yield me.app.ds.getConnection();
                    model.merge( Object.assign({}, { id: id} ));
                    if( languages ){
                        model.merge( Object.assign({}, { languages: languages } ));
                    }
                    if( name ){
                        model.merge( Object.assign({}, { name: name } ));
                    }
                    if( officephonenumber ){
                        model.merge( Object.assign({}, { officephonenumber: officephonenumber } ));
                    }

                    r = yield conn.update(model);
                    return r.affectedRows + r.insertId > 0 ?  true : false;
                }catch(e){
                    EasyNode.DEBUG && logger.debug(` ${e},${e.stack}`);
                    return false;
                }finally {
                    yield me.app.ds.releaseConnection(conn);
                }
            }
        }

        putCompanyb(){
            var me = this;
            return function *(){
                var r = null;
                var conn = null;
                var model = new Company();
                var form = this.request.body;
                var id = form.id;
                var liveaddress = form.liveaddress;
                var commaddress = form.commaddress;
                var officephonenumber = form.officephonenumber;
                var owner = form.owner;

                try{
                    conn = yield me.app.ds.getConnection();


                    model.merge( Object.assign({}, { id: id } ));
                    if( commaddress ){
                        model.merge( Object.assign({}, { commaddress: commaddress } ));
                    }
                    if( liveaddress ){
                        model.merge( Object.assign({}, { liveaddress: liveaddress } ));
                    }
                    if( officephonenumber ){
                        model.merge( Object.assign({}, { officephonenumber: officephonenumber } ));
                    }
                    if( owner ){
                        model.merge( Object.assign({}, { owner: owner } ));
                    }

                    r = yield conn.update(model);
                    return r.affectedRows + r.insertId > 0 ?  true : false;
                }catch(e){
                    EasyNode.DEBUG && logger.debug(` ${e},${e.stack}`);
                    return false;
                }finally {
                    yield me.app.ds.releaseConnection(conn);
                }
            }
        }

        putCurtainb(){
            var me = this;
            return function *(){
                var r = null;
                var conn = null;
                var model = new User();
                var form = this.request.body;
                var id = form.id;
                var operatetime = form.operatetime;
                var operator = form.operator;

                try{
                    conn = yield me.app.ds.getConnection();
                    model.merge( Object.assign({}, { id: id, applycurtainstatus:2,operatetime: operatetime, operator:operator} ));
                    r = yield conn.update(model);
                    return r.affectedRows + r.insertId > 0 ?  true : false;
                }catch(e){
                    EasyNode.DEBUG && logger.debug(` ${e},${e.stack}`);
                    return false;
                }finally {
                    yield me.app.ds.releaseConnection(conn);
                }
            }
        }

        putUser(){
            var me = this;
            return function *(){
                var r = null;
                var conn = null;
                var model = new User();
                var form = this.request.body;

                console.log(form);
                console.log(this.session.user);
                var id = this.session.user.id;
                var mailingaddress = form.mailingaddress;
                var recipient = form.recipient;
                var recipientmobile = form.recipientmobile;
                var companyname = form.companyname;

                try{
                    conn = yield me.app.ds.getConnection();
                    model.merge( Object.assign({}, { id: id, applycurtainstatus: 1 } ));
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
                    return r.affectedRows + r.insertId > 0 ?  true : false;
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
                var id = formData.id;
                var arr = [];
                var sql = ``;
                var tenantid = this.session.user.tenantid;

                try{
                    var model = new Record();
                    conn = yield  me.app.ds.getConnection();

                    sql = `SELECT id,tenantid FROM record WHERE id = #id# and tenantid = #tenantid#`;
                    arr =  yield conn.execQuery(sql,{ id:id,tenantid:tenantid });
                    if( arr.length <= 0 )
                        return {id: formData.id,ret:false};

                    yield conn.del( model,[formData.id]);
                    return {id: formData.id,ret:true};
                } catch(e){
                    EasyNode.DEBUG && logger.debug(` ${e} ${e.stack}`);
                    return {id: formData.id,ret:false};
                }finally{
                    yield me.app.ds.releaseConnection(conn);
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
                    return r.affectedRows + r.insertId > 0 ?  true : false;
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
                    return r.affectedRows + r.insertId > 0 ?  true : false;
                }catch(e){
                    EasyNode.DEBUG && logger.debug(` ${e},${e.stack}`);
                    return false;
                }finally {
                    yield me.app.ds.releaseConnection(conn);
                }
            }
        }


        savedraft() {
            var me = this;
            return function *(){

                var formData = this.request.body;
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

        /*
        formData.id optional
        formData.type 备案类型
        * */
        saveBaseInfo( formData ){
            var me = this;
            return function*() {
                var r = null;
                var id = 0;
                var conn = null;
                var code = '';
                var sql = '';
                var args = {};
                var tenantid = this.session.user.tenantid;

                try{
                    conn = yield me.app.ds.getConnection();

                    if( formData.baseinfo.hasOwnProperty("id") ){
                        sql = 'UPDATE record set type = #type#,updatetime = #updatetime# where id = #id#';
                        args = {  id: formData.baseinfo.id, type: formData.baseinfo.type, updatetime: Date.now() };

                        var ret = yield conn.execQuery(sql, args);

                        id = formData.baseinfo.id;
                    }else{
                        code = utils.randomString(32, '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
                        sql = 'INSERT record set type = #type#, code = #code#, tenantid = #tenantid#, updatetime = #updatetime#,createtime = #createtime#';
                        args = { type: formData.baseinfo.type,code: code,tenantid: tenantid,updatetime: Date.now(),createtime: Date.now() };

                        var ret = yield conn.execUpdate(sql, args);
                        id = ret.insertId;
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
                var tenantid = this.session.user.tenantid;

                try {
                    conn = yield me.app.ds.getConnection();

                    var model = new Company();
                    model.merge(Object.assign({},
                        formData.companyinfo,
                        {tenantid: tenantid},
                        {updatetime: Date.now()}
                    ));

                    if (formData.companyinfo.hasOwnProperty("id")) {
                        r = yield conn.update(model);
                        id = formData.companyinfo.id;
                    } else {
                        model.merge( { createtime: Date.now() } );
                        r = yield conn.create(model);
                        id = r.insertId;
                        yield  me.updateRecordCompanyid(formData.baseinfo.id,id);
                    }
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
                var tenantid = this.session.user.tenantid;

                try {
                    conn = yield me.app.ds.getConnection();

                    var data = Object.assign({},
                        formData.siteinfo,
                        {tenantid: tenantid},
                        {updatetime: Date.now()}
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
                        model.merge({createtime: Date.now()});
                        r = yield conn.create(model);
                        id = r.insertId;
                        yield me.updateRecordWebsiteid(formData.baseinfo.id,id);
                    }
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
                var tenantid = this.session.user.tenantid;

                try {
                    conn = yield me.app.ds.getConnection();

                    model.merge(Object.assign({},
                        formData.baseinfo,
                        formData.material,
                        {
                            tenantid: tenantid,
                            companyid: formData.companyinfo.id,
                            websiteid: formData.siteinfo.id,
                            status: 0
                        },
                        {updatetime: Date.now()}
                    ));

                    if (formData.baseinfo.hasOwnProperty("id")) {

                        model.merge(Object.assign({},{updatetime: Date.now()}));

                        r = yield conn.update(model);
                        id = formData.baseinfo.id;
                    } else {
                        //var code = utils.randomString(32, '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
                        //model.merge(Object.assign({},{code: code}));
                        model.merge({createtime: Date.now()});
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
            var me = this;
            var cfg = me.app.config.nos;
            return function* (){
                var url = `${cfg.urlPath}${key}`;
                let nos = new Nos(cfg.accessKey,cfg.secretKey,cfg.bucket);
                try{
                    yield nos.upload(key,filename);
                }catch (e){
                    console.log(e);
                }
                nos = null;
                return url;
            }
        }

        /*
        * key:  object key, can be date object
        * filename: 文件名
        * */
        downloadNos(key){
            var me = this;
            var cfg = me.app.config.nos;
            return function* (){
                var url = `${cfg.urlPath}${key}`;
                let nos = new Nos(cfg.accessKey,cfg.secretKey,cfg.bucket);

                try{
                    var ret = yield nos.getObject(key);
                }catch (e){
                    console.log(e);
                }

                nos = null;
                return ret;
            }
        }

        putSys(i=0,k=0,v="0"){
            var me = this;
            return function *(){
                var conn = null;
                var arr = [];
                var sql = ``;

                var form = this.request.body;
                var key = form.key || k;
                var value = form.value || v;
                var id = i > 0 ? i : (form.id || 0);

                try{
                    var model = new Sys();
                    conn = yield  me.app.ds.getConnection();

                    model.merge({id:id,k:key,value:value});

                    var r = yield conn.update(model);
                    return r.affectedRows + r.insertId > 0 ?  true : false;
                } catch(e){
                    EasyNode.DEBUG && logger.debug(` ${e} ${e.stack}`);
                    return false;
                }finally{
                    yield me.app.ds.releaseConnection(conn);
                }
            }
        }

        getSys(k=0){
            var me = this;
            return function *(){
                var conn = null;
                var arr = [];
                var sql = ``;

                var key = k > 0 ? k : (this.parameter.param('key') || 0);
                console.log("key:",key);
                try{
                    var model = new Sys();
                    conn = yield  me.app.ds.getConnection();

                    sql = `SELECT value FROM sys WHERE k = #key#`;
                    arr =  yield conn.execQuery(sql,{key:key});
                    if( arr.length <= 0 )
                        return 0;

                    return arr[0].value;
                } catch(e){
                    EasyNode.DEBUG && logger.debug(` ${e} ${e.stack}`);
                    return 0;
                }finally{
                    yield me.app.ds.releaseConnection(conn);
                }
            }
        }


         isp_upload(id){
            var me = this;
            return function* (){
                var json = yield me.getRecordb(id);
                var beianInfo;
                var args;
                try{
                    var type = json.record.type == 0 ? me.app.ispService.FIRST :
                        json.record.type == 1 ? me.app.ispService.XZWZ : me.app.ispService.XZJR ;
                    beianInfo = yield me.app.ispService.genbeianInfo(json,type);
                    args = me.app.ispService.getUploadInitParam();
                    args.beianInfo  = beianInfo.beianInfo;
                    args.beianInfoHash = beianInfo.beianInfoHash;

                    console.log("dataSequence upload:",args.dataSequence);
                }catch(e){
                    EasyNode.DEBUG && logger.debug(` ${e}`);
                    return false;
                }
                console.log("isp_upload......");
                try{
                    var ds = yield me.app.ispService.isp_upload(args).then(function (result) {
                        console.log("is_upload success",result);
                        args.dataSequence = result;
                    }).catch(function (e,result) {
                        console.log("isp_upload fail result",e,result);
                        return false;
                    });
                    me.app.sys.dataSequence = args.dataSequence;
                    yield me.app.ispService.writeSys(me.app.sys);
                    return true;
                }catch(e){
                    console.log(e.stack);
                    return false;
                }
            }
        }

        isp_upload_hsjg(id){
            var me = this;
            return function* (){
                var json = yield me.getRecordb(id);

                var beianInfo;
                var args;
                try{
                    beianInfo = yield me.app.ispService.genbeianInfo(json,me.app.ispService.HSJG);

                    args = me.app.ispService.getUploadInitParam();
                    args.beianInfo  = beianInfo.beianInfo;
                    args.beianInfoHash = beianInfo.beianInfoHash;

                    console.log("dataSequence upload:",args.dataSequence);
                }catch(e){
                    EasyNode.DEBUG && logger.debug(` ${e}`);
                    return false;
                }
                console.log("isp_upload hsjg......");
                try{
                    var ds = yield me.app.ispService.isp_upload(args).then(function (result) {
                        console.log("is_upload hsjg success",result);
                        args.dataSequence = result;
                    }).catch(function (e,result) {
                        console.log("isp_upload hsjg fail result",e,result);
                        return false;
                    });
                    me.app.sys.dataSequence = args.dataSequence;
                    yield me.app.ispService.writeSys(me.app.sys);
                    return true;
                }catch(e){
                    console.log(e.stack);
                    return false;
                }
            }
        }

        isp_verifybamm(baxhp='',bammp=''){
            var me = this;
            return function* (){
                var baxh = ( this.parameter && this.parameter.param && this.parameter.param('baxh') ) || baxhp;
                var bamm = ( this.parameter && this.parameter.param &&  this.parameter.param('bamm') ) || bammp;

                var args;

                try{
                    console.log("isp_verifybamm......");

                    args = me.app.ispService.getInitParam();
                    args.baxh = baxh;
                    args.bamm = bamm;
                    console.log(args);
                    var ret = yield me.app.ispService.isp_verifybamm(args).then(function (result) {
                        console.log("isp_verifybamm success",result);
                        return result;
                    }).catch(function (e,result) {
                        console.log("isp_verifybamm fail result",e,result);
                        return {ret:false,msg:"Error"};
                    });
                    return ret;
                }catch(e){
                    console.log(e.stack);
                }
            }
        }

        isp_querybeianstatus(queryConditionTypep=1,queryConditionp=''){
            var me = this;
            return function* (){
                var queryConditionType =  ( this.parameter && this.parameter.param && this.parameter.param('queryConditionType') ) || queryConditionTypep;
                var queryCondition = ( this.parameter && this.parameter.param && this.parameter.param('queryCondition') )|| queryConditionp;

                var args;

                try{
                    console.log("isp_querybeianstatus......");

                    args = me.app.ispService.getInitParam();
                    args.queryConditionType = queryConditionType;
                    args.queryCondition = queryCondition;

                    var ret = yield me.app.ispService.isp_querybeianstatus(args).then(function (result) {
                        console.log("isp_querybeianstatus success",result);
                        return result;
                    }).catch(function (e,result) {
                        console.log("isp_querybeianstatus fail result",e,result);
                        return {ret:false,msg:"Error"};
                    });
                    return ret;
                }catch(e){
                    console.log(e.stack);
                }
            }
        }

        createIply(){
            var me = this;
            return function *(){

                var model = null
                var r = null;
                var conn = null;
                var formData = this.request.body;
                var id;

                try{
                    conn = yield  me.app.ds.getConnection();

                    model = new Iply();
                    model.merge( Object.assign({},formData ));

                    r = yield conn.create(model);
                    id = r.insertId;
                }catch(e){
                    EasyNode.DEBUG && logger.debug(` ${e},${e.stack}`);
                }finally {
                    yield me.app.ds.releaseConnection(conn);
                    return { id: id };
                }
            }
        }


        createArea(){
            var me = this;
            return function *(){

                var model = null
                var r = null;
                var conn = null;
                var formData = this.request.body;
                var id;

                try{
                    conn = yield  me.app.ds.getConnection();

                    model = new Area();
                    model.merge( Object.assign({},formData,{updatetime:Date.now(),createtime:Date.now()} ));

                    r = yield conn.create(model);
                    id = r.insertId;
                }catch(e){
                    EasyNode.DEBUG && logger.debug(` ${e},${e.stack}`);
                }finally {
                    yield me.app.ds.releaseConnection(conn);
                    return { id: id };
                }
            }
        }



        getClassName() {
            return EasyNode.namespace(__filename);
        }


    }

    module.exports = StoreService;
})();