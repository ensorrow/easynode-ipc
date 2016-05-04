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
                var user = this.session.user || undefined;
                yield this.render('index',{user:user,loginCallback:app.config.loginCallback,config:{surl:app.config.resources.static,env:process.env.ENV}});
            }
        }

        /**
         * @api {get} /login/callback 登录回调函数
         * @apiName loginCallback
         * @apiGroup Login
         * @apiPermission  logined
         * @apiVersion 0.0.2
         * @apiDescription 登录回调处理
         *
         * @apiParam {Object} query 登录用户信息
         * @apiParam {String} query.tenantId 租户ID
         * @apiParam {String} query.status 登录状态，详见张荣超登录文档
         * @apiParam {Number} query.loginType 登录类型:手机号登录,URS登录
         * @apiParam {String} query.regIn 注册域
         * @paiParam {String} query.email 登录用户EMAIL
         * @apiParam {String} query.userName 登录用户名
         *
         * @apiSuccess  store session, and forward to '/'
         */
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

        /**
         * @api {get} /logout/ 退出登录
         * @apiName logout
         * @apiGroup Login
         * @apiPermission  logined
         * @apiVersion 0.0.2
         * @apiDescription 退出登录处理
         *
         * @apiSuccess  clean session, and forward to '/'
         */
        static logout(app){
            return function *(){
                this.session.user = null;

                yield this.render('index',{user:{},loginCallback:app.config.loginCallback,config:{surl:app.config.resources.static,env:process.env.ENV}});
            }
        }

        /**
         * @api {get} /comment/ 测试
         * @apiName comment
         * @apiGroup
         * @apiPermission
         * @apiVersion 0.0.2
         * @apiDescription 测试
         *
         */
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
         * @api {post} /savedraft 保存草稿
         * @apiName savedraft
         * @apiGroup Record
         * @apiPermission admin or self
         * @apiVersion 0.0.1
         * @apiDescription 用户登录后,创建申请记录草稿
         *
         *
         * @apiSampleRequest http://icp.hzspeed.cn/savedraft/
         *
         * @apiParam {Object} formData 保存草稿记录数据
         * @apiParam {Number} formData.drafttype 草稿类型:1-基本信息,2-公司信息,3-站点信息,4-申请材料信息
         * @apiParam {Object} baseinfo optional  drafttype=1时有效,记录baseinfo部分
         * @apiParam {Number} baseinfo.id  optional 记录id,没有表示创建记录
         * @apiParam {Number} baseinfo.type 备案类型：\n0-首次备案\n1-新增网站\n2-新增接入
         *
         * @apiParam {Object} companyinfo optional  drafttype=2时有效,记录companyinfo部分
         * @apiParam {Number} companyinfo.id  optional 记录id,没有表示创建记录
         * @apiParam {Number} companyinfo.*
         *
         * @apiParam {Object} siteinfo optional  drafttype=3时有效,记录siteinfo部分
         * @apiParam {Number} siteinfo.id  optional 记录id,没有表示创建记录
         * @apiParam {Number} siteinfo.*
         *
         * @apiParam {Object} material 记录material部分
         * @apiParam {Number} material.sitemanagerurl 主体单位负责人图片URL
         * @apiParam {String} material.checklisturl 核验单图片URL
         * @apiParam {String} material.protocolurl1 云平台服务协议第一页l图片URL
         * @apiParam {String} material.protocolurl2 云平台服务协议第二页图片URL
         * @apiParam {String} material.securityurl1 信息安全管理责任书第一页图片URL
         * @apiParam {String} material.securityurl2 信息安全管理责任书第二页图片URL
         *
         * return {drafttype: formData.drafttype, id: id};
         *
         * @apiSuccess {Object} ret 返回结果
         * @apiSuccess {Number} ret.drafttype 草稿类型
         * @apiSuccess {Number} ret.id 记录ID
         */
        static savedraft(app){
            var me = this;
            return function *(){
                var session = this.session;

                var ret = {};

                var storeService = new StoreService(app);
                ret = yield storeService.savedraft();

                this.type = 'json';
                this.body = {ret: ret};
            }
        }


        /**
         * @api {post} /records 创建申请记录
         * @apiName createRecord
         * @apiGroup Record
         * @apiPermission admin or self
         * @apiVersion 0.0.1
         * @apiDescription 用户登录后,创建申请记录
         *
         * @apiSampleRequest http://icp.hzspeed.cn/records/
         *
         * @apiParam {Object} baseinfo 记录baseinfo部分
         * @apiParam {Number} baseinfo.id 记录id
         * @apiParam {Number} baseinfo.type 备案类型：\n0-首次备案\n1-新增网站\n2-新增接入
         * @apiParam {Number} baseinfo.status  审核状态 0
         *
         * @apiParam {Object} material 记录material部分
         * @apiParam {Number} material.sitemanagerurl 主体单位负责人图片URL
         * @apiParam {String} material.checklisturl 核验单图片URL
         * @apiParam {String} material.protocolurl1 云平台服务协议第一页l图片URL
         * @apiParam {String} material.protocolurl2 云平台服务协议第二页图片URL
         * @apiParam {String} material.securityurl1 信息安全管理责任书第一页图片URL
         * @apiParam {String} material.securityurl2 信息安全管理责任书第二页图片URL
         *
         * @apiParam {Object} comapnyinfo 公司信息
         * @apiParam {Number} comapny.id 公司ID
         * @apiParam {String} comapny.province 省
         * @apiParam {String} comapny.city 市
         * @apiParam {String} comapny.area 区
         * @apiSuapiParamccess {Number} comapny.nature 性质 参见http://www.miitbeian.gov.cn/publish/query/indexFirst.action
         * @apiParam {Number} comapny.idtype 证件类型:
         * @apiParam {String} comapny.idnumber 证件号码
         * @apiParam {String} comapny.name 名称
         * @apiParam {String} comapny.liveaddress 居住地址
         * @apiParam {String} comapny.commaddress 通讯地址
         * @apiParam {String} comapny.owner 投资人或主管单位名称
         * @apiParam {String} comapny.managername 负责人姓名
         * @apiParam {Number} comapny.manageridtype 负责人证件类型
         * @apiParam {String} comapny.manageridnumber 负责人证件号码
         * @apiParam {String} comapny.managermanager 负责人居住地址
         * @apiParam {String} comapny.officephoneregion 办公室电话区号
         * @apiParam {String} comapny.officephonenumber 办公室电话号码
         * @apiParam {String} comapny.mobile 手机号码
         * @apiParam {String} comapny.email 电子邮箱
         * @apiParam {String} comapny.recordnumber 主体备案号
         *
         * @apiParam {Object} siteinfo 网站
         * @apiParam {Number} website.id 网站ID
         * @apiParam {String} website.name 网站名称
         * @apiParam {String} website.domain 网站域名
         * @apiParam {String} website.domain1 网站域名1
         * @apiParam {String} website.domain2 网站域名2
         * @apiParam {String} website.domain3 网站域名3
         * @apiParam {String} website.domain4 网站域名4
         * @apiParam {String} website.homeurl 网站首页URL
         * @apiParam {String} website.servicecontent 网站服务内容
         * @apiParam {Object} website.languages 网站语言,json结构
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
         }
         * @apiParam {String} website.ispname ISP名称
         * @apiParam {Object} website.ip 网站IP地址:
         {
            ip1:"",
            ip2:"",
            ip3:"",
            ip4:""
         }
         * @apiParam {Object} website.accessmethod 网站接入方式,json结构
         {
             specialline: false,
             webhost: false,
             virtualhost: true,
             other: false
         }
         * @apiParam {String} website.serverregion 服务器放置地
         *
         * @apiParam {String} website.managername 负责人姓名
         * @apiParam {Number} website.manageridtype 证件类型：
         * @apiParam {String} website.manageridnumber 证件号码
         * @apiParam {String} website.officephoneregion 办公室电话区号
         * @apiParam {String} website.officephonenumber 办公室电话号码
         * @apiParam {String} website.mobile 手机号码
         * @apiParam {String} website.email 电子邮箱
         * @apiParam {String} website.qq qq号码
         *
         * @apiUse EmptyRecord
         */
        static createRecord(app){
            var me = this;
            return function *(){

                var ret = {};
                var session = this.session;

                var storeService = new StoreService(app)
                ret = yield storeService.createRecord();

                this.type = 'json';
                this.body = {ret: ret};
            }
        }

        /**
         * @api {get} /record 获取记录详情
         * @apiName getRecord
         * @apiGroup Record
         * @apiPermission admin or self
         * @apiVersion 0.0.3
         * @apiDescription 管理员(登录后用户对象里用idadmin字段表示)能获取所有用户申请记录详情,本用户只能获取他自己的申请记录详情
         *
         * @apiParam {Number} id 记录id.
         *
         * @apiSampleRequest http://icp.hzspeed.cn/record/?id
         *
         * @apiSuccess {Object} record 记录
         * @apiSuccess {Number} record.id 记录id
         * @apiSuccess {Number} record.type 备案类型：\n0-首次备案\n1-新增网站\n2-新增接入
         * @apiSuccess {String} record.serverregion 主机区域
         * @apiSuccess {Number} record.companyid 公司id
         * @apiSuccess {Number} record.websiteid 网站id
         * @apiSuccess {String} record.sitemanagerurl 主体单位负责人图片URL
         * @apiSuccess {String} record.checklisturl 核验单图片URL
         * @apiSuccess {String} record.checkedlisturl 校验过的核验单图片URL
         * @apiSuccess {String} record.protocolurl1 云平台服务协议第一页l图片URL
         * @apiSuccess {String} record.protocolurl2 云平台服务协议第二页图片URL
         * @apiSuccess {String} record.securityurl1 信息安全管理责任书第一页图片URL
         * @apiSuccess {String} record.securityurl2 信息安全管理责任书第二页图片URL
         * @apiSuccess {String} record.code 备案号
         * @apiSuccess {Number} record.status 备案申请状态\n0-草稿\n1-初审中\n2-初审未通过\n3-初审已通过\n4-照片审核中\n5-照片审核未通过\n6-照片审核已通过\n7-通管局审核中\n8-通管局审核未通过\n9-通管局审核已通过\n10-待核实-\n11-未知状态\n
         * @apiSuccess {String} record.tenantid 租户ID
         * @apiSuccess {String} record.curtainurl 帘布照片URL
         * @apiSuccess {Number} record.updatetime 记录更新时间
         * @apiSuccess {Number} record.createtime 记录创建时间
         *
         * @apiSuccess {Object} comapny 记录
         * @apiSuccess {Number} comapny.id 公司ID
         * @apiSuccess {String} comapny.province 省
         * @apiSuccess {String} comapny.city 市
         * @apiSuccess {String} comapny.area 区
         * @apiSuccess {Number} comapny.nature 性质 参见:http://www.miitbeian.gov.cn/publish/query/indexFirst.action
         * @apiSuccess {Number} comapny.idtype 证件类型
         * @apiSuccess {String} comapny.idnumber 证件号码
         * @apiSuccess {String} comapny.name 名称
         * @apiSuccess {String} comapny.liveaddress 居住地址
         * @apiSuccess {String} comapny.commaddress 通讯地址
         * @apiSuccess {String} comapny.owner 投资人或主管单位名称
         * @apiSuccess {String} comapny.managername 负责人姓名
         * @apiSuccess {Number} comapny.manageridtype 负责人证件类型
         * @apiSuccess {String} comapny.manageridnumber 负责人证件号码
         * @apiSuccess {String} comapny.manageraddress 负责人居住地址
         * @apiSuccess {String} comapny.officephoneregion 办公室电话区号
         * @apiSuccess {String} comapny.officephonenumber 办公室电话号码
         * @apiSuccess {String} comapny.mobile 手机号码
         * @apiSuccess {String} comapny.email 电子邮箱
         * @apiSuccess {String} comapny.recordnumber 主体备案号
         * @apiSuccess {String} comapny.recordpassword 备案密码
         *
         * @apiSuccess {Object} website 网站
         * @apiSuccess {Number} website.id 网站ID
         * @apiSuccess {String} website.name 网站名称
         * @apiSuccess {String} website.domain 网站域名
         * @apiSuccess {String} website.domain1 网站域名1
         * @apiSuccess {String} website.domain2 网站域名2
         * @apiSuccess {String} website.domain3 网站域名3
         * @apiSuccess {String} website.domain4 网站域名4
         * @apiSuccess {String} website.homeurl 网站首页URL
         * @apiSuccess {String} website.servicecontent 网站服务内容
         * @apiSuccess {Object} website.languages 网站语言,json结构
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
                                        }
         * @apiSuccess {String} website.ispname ISP名称
         * @apiSuccess {String} website.ip 网站IP地址:1.2.3.4'
         * @apiSuccess {Object} website.accessmethod 网站接入方式,json结构
                                        {
                                            specialline: false,
                                            webhost: false,
                                            virtualhost: true,
                                            other: false
                                        }
         * @apiSuccess {String} website.serverregion 服务器放置地
         *
         * @apiSuccess {String} website.managername 负责人姓名
         * @apiSuccess {Number} website.manageridtype 证件类型：
         * @apiSuccess {String} website.manageridnumber 证件号码
         * @apiSuccess {String} website.officephoneregion 办公室电话区号
         * @apiSuccess {String} website.officephonenumber 办公室电话号码
         * @apiSuccess {String} website.mobile 手机号码
         * @apiSuccess {String} website.email 电子邮箱
         * @apiSuccess {String} website.qq qq号码
         * @apiSuccess {Number} website.prechecktype 前置审批类型 0-暂无 http://www.miitbeian.gov.cn/publish/query/indexFirst.action
         * @apiSuccess {String} website.checknumber optional 前置审批号
         * @apiSuccess {String} website.checkfileurl optional 前置审批文件
         * @apiSuccess {String} website.remark optional 备注

         *
         * @apiUse EmptyRecord
         */
       static getRecord(app){
            var me = this;
            return function *(){
                var session = this.session;
                var ret = {};

                var storeService = new StoreService(app)
                ret = yield storeService.getRecord();

                this.type = 'json';
                this.body = ret;
            }
        }


        /**
         * @api {get} /pubips 获得租户IPS
         * @apiName getPubips
         * @apiGroup User
         * @apiPermission admin or self
         * @apiVersion 0.0.3
         * @apiDescription 登陆租户获取租户IPS
         *
         *
         * @apiSampleRequest http://icp.hzspeed.cn/pubips/
         *
         * @apiSuccess {Object} res 租户外网IPS
         *
         * {
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
            code:  401 账号不存在

         * @apiUse EmptyRecord
         */
        static getPubips(app){
            var me = this;
            return function *(){
                var ret = {};


                //var storeService = new StoreService(app,app.config);
                //ret =  yield storeService.gettenantPubips();
                ret = yield app.ispService.gettenantPubips();

                this.type = 'json';
                this.body = ret;
            }
        }

        /**
         * @api {get} /admin/record 获取记录详情
         * @apiName getRecordb
         * @apiGroup Ops
         * @apiPermission whitelist
         * @apiVersion 0.0.2
         * @apiDescription 通过白名单管理权限
         *
         * @apiParam {Number} id 记录id.
         *
         * @apiSampleRequest http://icp.hzspeed.cn/admin/record/?id
         *
         * @apiSuccess {Object} record 记录
         * @apiSuccess {Number} record.id 记录id
         * @apiSuccess {Number} record.type 备案类型：\n0-首次备案\n1-新增网站\n2-新增接入
         * @apiSuccess {String} record.serverregion 主机区域
         * @apiSuccess {Number} record.companyid 公司id
         * @apiSuccess {Number} record.websiteid 网站id
         * @apiSuccess {String} record.sitemanagerurl 主体单位负责人图片URL
         * @apiSuccess {String} record.checklisturl 核验单图片URL
         * @apiSuccess {String} record.checkedlisturl 校验过的核验单图片URL
         * @apiSuccess {String} record.protocolurl1 云平台服务协议第一页l图片URL
         * @apiSuccess {String} record.protocolurl2 云平台服务协议第二页图片URL
         * @apiSuccess {String} record.securityurl1 信息安全管理责任书第一页图片URL
         * @apiSuccess {String} record.securityurl2 信息安全管理责任书第二页图片URL
         * @apiSuccess {String} record.code 备案号
         * @apiSuccess {Number} record.status 备案申请状态\n0-草稿\n1-初审中\n2-初审未通过\n3-初审已通过\n4-照片审核中\n5-照片审核未通过\n6-照片审核已通过\n7-通管局审核中\n8-通管局审核未通过\n9-通管局审核已通过\n10-待核实-\n11-未知状态\n
         * @apiSuccess {String} record.tenantid 租户ID
         * @apiSuccess {Number} record.operatetime 操作时间
         * @apiSuccess {String} record.operator 操作员
         * @apiSuccess {String} record.curtainurl 帘布照片URL
         * @apiSuccess {Number} record.updatetime 记录更新时间
         * @apiSuccess {Number} record.createtime 记录创建时间
         * @apiSuccess {String} record.beianstatus 备案状态,JSON数组的字符串
         * [
         *  {
         *   ret:true|false,
         *   msg:'',
         *   StatusInfo:{
         *    }
         *  }
         * ]
         * 当ret == true时,StatusInfo为以下两种:
         * 一.已备案的结果
         *   StatusInfo:{
         *      Cxtjlx:'',
         *      Cxtj:'',
         *      Wzmc:'',
         *      Ztbah:'',
         *      Wzbah:'',
         *      Bazt:0
         *   }
         * 二.未备案的结果
         *   StatusInfo:{
         *      Cxtjlx:'',
         *      Cxtj:'',
         *      Baxt:1
         *   }
         * 当ret == false时, StatusInfo为{}空对象
         * @apiSuccess {Object} comapny 记录
         * @apiSuccess {Number} comapny.id 公司ID
         * @apiSuccess {String} comapny.province 省
         * @apiSuccess {String} comapny.city 市
         * @apiSuccess {String} comapny.area 区
         * @apiSuccess {Number} comapny.nature 性质
         * @apiSuccess {Number} comapny.idtype 证件类型
         * @apiSuccess {String} comapny.idnumber 证件号码
         * @apiSuccess {String} comapny.name 名称
         * @apiSuccess {String} comapny.liveaddress 居住地址
         * @apiSuccess {String} comapny.commaddress 通讯地址
         * @apiSuccess {String} comapny.owner 投资人或主管单位名称
         * @apiSuccess {String} comapny.managername 负责人姓名
         * @apiSuccess {Number} comapny.manageridtype 负责人证件类型\n
         * @apiSuccess {String} comapny.manageridnumber 负责人证件号码
         * @apiSuccess {String} comapny.manageraddress 负责人居住地址
         * @apiSuccess {String} comapny.officephoneregion 办公室电话区号
         * @apiSuccess {String} comapny.officephonenumber 办公室电话号码
         * @apiSuccess {String} comapny.mobile 手机号码
         * @apiSuccess {String} comapny.email 电子邮箱
         * @apiSuccess {String} comapny.recordnumber 主体备案号
         * @apiSuccess {String} comapny.recordpassword 备案密码
         *
         * @apiSuccess {Object} website 网站
         * @apiSuccess {Number} website.id 网站ID
         * @apiSuccess {String} website.name 网站名称
         * @apiSuccess {String} website.domain 网站域名
         * @apiSuccess {String} website.domain1 网站域名1
         * @apiSuccess {String} website.domain2 网站域名2
         * @apiSuccess {String} website.domain3 网站域名3
         * @apiSuccess {String} website.domain4 网站域名4
         * @apiSuccess {String} website.homeurl 网站首页URL
         * @apiSuccess {String} website.servicecontent 网站服务内容
         * @apiSuccess {Object} website.languages 网站语言,json结构
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
         }
         * @apiSuccess {String} website.ispname ISP名称
         * @apiSuccess {String} website.ip 网站IP地址:1.2.3.4'
         * @apiSuccess {Object} website.accessmethod 网站接入方式,json结构
         {
             specialline: false,
             webhost: false,
             virtualhost: true,
             other: false
         }
         * @apiSuccess {String} website.serverregion 服务器放置地
         *
         * @apiSuccess {String} website.managername 负责人姓名
         * @apiSuccess {Number} website.manageridtype 证件类型：
         * @apiSuccess {String} website.manageridnumber 证件号码
         * @apiSuccess {String} website.officephoneregion 办公室电话区号
         * @apiSuccess {String} website.officephonenumber 办公室电话号码
         * @apiSuccess {String} website.mobile 手机号码
         * @apiSuccess {String} website.email 电子邮箱
         * @apiSuccess {String} website.qq qq号码
         * @apiSuccess {Number} website.prechecktype  前置审批类型 0-暂无 http://www.miitbeian.gov.cn/publish/query/indexFirst.action
         * @apiSuccess {String} website.checknumber optional 前置审批号
         * @apiSuccess {String} website.checkfileurl optional 前置审批文件
         * @apiSuccess {String} website.remark optional 备注
         *
         * @apiUse EmptyRecord
         */
        static getRecordb(app){
            var me = this;
            return function *(){
                var ret = {};

                var pass = Controllers.passWhitelist(this.remoteAddress,app);
                if( pass ) {
                    var storeService = new StoreService(app);
                    ret = yield storeService.getRecordb();
                }

                this.type = 'json';
                this.body = ret;
            }
        }

        /**
         * @api {put} /record 审核
         * @apiName putRecord
         * @apiGroup Record
         * @apiPermission admin or self
         * @apiVersion 0.0.2
         * @apiDescription 管理员(登录后用户对象里用idadmin字段表示)审核记录
         *
         * @apiSampleRequest http://icp.hzspeed.cn/record/
         *
         * @apiParam {Number} id 记录ID
         * @apiParam {Number} status 备案申请状态\n0-草稿\n1-初审中\n2-初审未通过\n3-初审已通过\n4-照片审核中\n5-照片审核未通过\n6-照片审核已通过\n7-通管局审核中\n8-通管局审核未通过\n9-通管局审核已通过\n10-待核实-\n11-未知状态\n
         * @apiParam {String} reasons 通过则为备注,拒绝则为理由(多条用p标签分隔)
         * @apiParam {String} [curtainurl] 帘布照片URL
         *
         * @apiSuccess {Number} ret true:成功,false:失败
         */
        static putRecord(app){
            var me = this;
            return function *(){
                var session = this.session;
                var ret = {};

                var storeService = new StoreService(app);
                ret = yield storeService.putRecord();

                this.type = 'json';
                this.body = {ret: ret};
            }
        }

        /**
         * @api {put} /user
         * @apiName putUser
         * @apiGroup User
         * @apiPermission admin or self
         * @apiVersion 0.0.2
         * @apiDescription 修改用户幕布申请地址
         *
         * @apiSampleRequest http://icp.hzspeed.cn/user/
         *
         * @apiParam {String} mailingaddress 幕布邮寄地址
         * @apiParam {String} recipient 收件人
         * @apiParam {String} recipientmobile 收件人手机号
         * @apiParam {String} [companyname] 公司名称
         *
         * @apiSuccess {Number} ret true:成功,false:失败
         */
        static putUser(app){
            var me = this;
            return function *(){
                var session = this.session;
                var ret = {};

                var storeService = new StoreService(app);
                ret = yield storeService.putUser();

                this.type = 'json';
                this.body = {ret: ret};
            }
        }

        /**
         * @api {put} /admin/record 审核
         * @apiName putRecordb
         * @apiGroup Ops
         * @apiPermission whitelist
         * @apiVersion 0.0.2
         * @apiDescription 通过白名单管理权限
         *
         * @apiSampleRequest http://icp.hzspeed.cn/admin/record
         *
         * @apiParam {Number} id 记录ID
         * @apiParam {Number} status 备案申请状态\n0-草稿\n1-初审中\n2-初审未通过\n3-初审已通过\n4-照片审核中\n5-照片审核未通过\n6-照片审核已通过\n7-通管局审核中\n8-通管局审核未通过\n9-通管局审核已通过\n10-待核实-\n11-未知状态\n
         * @apiParam {String} reasons 通过则为备注,拒绝则为理由(多条用p标签分隔)
         * @apiParam {String} [curtainurl] 帘布照片URL
         * @apiParam {String} [checkedlisturl] 校验过的核验单URL,当status=7时必须有该以该参娄
         * @apiParam {String} [beianstatus] 备案状态,JSON数组的字符串
         * [
         *  {
         *   ret:true|false,
         *   msg:'',
         *   StatusInfo:{
         *    }
         *  }
         * ]
         * 当ret == true时,StatusInfo为以下两种:
         * 一.已备案的结果
         *   StatusInfo:{
         *      Cxtjlx:'',
         *      Cxtj:'',
         *      Wzmc:'',
         *      Ztbah:'',
         *      Wzbah:'',
         *      Bazt:0
         *   }
         * 二.未备案的结果
         *   StatusInfo:{
         *      Cxtjlx:'',
         *      Cxtj:'',
         *      Baxt:1
         *   }
         * 当ret == false时, StatusInfo为{}空对象
         *
         * @apiParam {Number} operatetime 操作时间
         * @apiParam {String} operator 操作员
         *
         * @apiSuccess {Number} ret true:成功,false:失败
         */
        static putRecordb(app){
            var me = this;
            return function *(){
                var ret = {};

                var pass = Controllers.passWhitelist(this.remoteAddress,app);
                if( pass ) {
                    var storeService = new StoreService(app);
                    ret = yield storeService.putRecordb();
                }

                this.type = 'json';
                this.body = {ret: ret};
            }
        }

        /**
         * @api {put} /admin/company 修改企业信息
         * @apiName putCompanyb
         * @apiGroup Ops
         * @apiPermission whitelist
         * @apiVersion 0.0.2
         * @apiDescription 通过白名单管理权限
         *
         * @apiSampleRequest http://icp.hzspeed.cn/admin/company
         *
         * @apiParam {Number} id CompnayID
         * @apiParam {Number} [liveaddress] 主体单位证件住所
         * @apiParam {String} [commaddress] 主体单位通讯地址
         * @apiParam {String} [officephonenumber] 办公室电话
         * @apiParam {Number} [owner] 投资人或主管单位名称

         * @apiSuccess {Number} ret true:成功,false:失败
         */
        static putCompanyb(app){
            var me = this;
            return function *(){
                var ret = {};

                var pass = Controllers.passWhitelist(this.remoteAddress,app);
                if( pass ) {
                    var storeService = new StoreService(app);
                    ret = yield storeService.putCompanyb();
                }

                this.type = 'json';
                this.body = {ret: ret};
            }
        }

        /**
         * @api {put} /admin/website website信息
         * @apiName putWebsiteb
         * @apiGroup Ops
         * @apiPermission whitelist
         * @apiVersion 0.0.2
         * @apiDescription 通过白名单管理权限
         *
         * @apiSampleRequest http://icp.hzspeed.cn/admin/website
         *
         * @apiParam {Number} id WebsiteID
         * @apiParam {Number} [name] 网站名称
         * @apiParam {String} [languages] 网站语言, json格式转换后的字符串{"chinese":true,"chinesetraditional":false,"eglish":false,"japanese":false,"french":false,"spanish":false,"arabic":false,"russian":false,"customize":false,"customizeLang":""}
         * @apiParam {String} [officephonenumber] 办公室电话

         * @apiSuccess {Number} ret true:成功,false:失败
         */
        static putWebsiteb(app){
            var me = this;
            return function *(){
                var ret = {};

                var pass = Controllers.passWhitelist(this.remoteAddress,app);
                if( pass ) {
                    var storeService = new StoreService(app);
                    ret = yield storeService.putWebsiteb();
                }

                this.type = 'json';
                this.body = {ret: ret};
            }
        }


        /**
         * @api {put} /admin/curtain 寄送幕布
         * @apiName putCurtainb
         * @apiGroup Ops
         * @apiPermission whitelist
         * @apiVersion 0.0.2
         * @apiDescription 通过白名单管理权限
         *
         * @apiSampleRequest http://icp.hzspeed.cn/admin/curtain
         *
         * @apiParam {Number} id 用户ID
         * @apiParam {Number} operatetime 操作时间
         * @apiParam {String} operator 操作员
         *
         * @apiSuccess {Number} ret true:成功,false:失败
         */
        static putCurtainb(app){
            var me = this;
            return function *(){
                var ret = {};

                var pass = Controllers.passWhitelist(this.remoteAddress,app);
                if( pass ){
                    var storeService = new StoreService(app);
                    ret = yield storeService.putCurtainb();
                }

                this.type = 'json';
                this.body = {ret: ret};
            }
        }

        /**
         * @api {get} /records 获取记录列表
         * @apiName getRecords
         * @apiGroup Record
         * @apiPermission admin or self
         * @apiVersion 0.0.2
         * @apiDescription 管理员(登录后用户对象里用idadmin字段表示)能获取所有用户申请记录,本用户只能获取他自己的申请记录
         *
         * @apiParam {Number} filter 查询状态过滤条件 0-全部(除草稿) 1-待审核  2-已审核通过 3-审核失败的
         * @apiParam {Number} page 页号.
         * @apiParam {Number} rpp  每页记录数.
         *
         * @apiSampleRequest http://icp.hzspeed.cn/records
         *
         * @apiSuccess {Object[]} data 记录列表
         * @apiSuccess {Number} data.id 记录id
         * @apiSuccess {String} data.checklisturl 核验单图片URL
         * checkedlisturl
         * @apiSuccess {String} data.protocolurl1 云平台协议第一页图片
         * @apiSuccess {String} data.protocolurl2 云平台协议第二页图片
         * @apiSuccess {String} data.securityurl1 信息安全管理责任书第一页图片URL
         * @apiSuccess {String} data.securityurl2 信息安全管理责任书第二页图片URL
         * @apiSuccess {Number} data.companyid 公司id
         * @apiSuccess {Number} data.websiteid 网站id
         * @apiSuccess {String} data.tenantid 租户id
         * @apiSuccess {Number} data.type  备案类型: 0-首次备案, 1-新增网站, 2-新增接入
         * @apiSuccess {Number} data.status 备案状态: 0-草稿,1-初审中,2-初审未通过,3-初审已通过,4-照片审核中,5-照片审核未通过,6-照片审核已通过,7-通管局审核中,8-通管局审核未通过,9-通管局审核已通过,10-待核实,11-未知状态
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

                //测试环境：10.241.20.112   10.160.252.98    10.180.2.58
                //线上环境：10.166.3.39
                var pass = Controllers.passWhitelist(this.remoteAddress,app);
                var storeService = new StoreService(app)
                ret = yield storeService.getRecords();

                this.type = 'json';
                this.body = ret;
            }
        }

        /**
         * @api {get} /admin/records 获取记录列表
         * @apiName getRecordsb
         * @apiGroup Ops
         * @apiPermission whitelist
         * @apiVersion 0.0.2
         * @apiDescription 权限通过白名单管理
         *
         * @apiParam {Number} filter 查询状态过滤条件 0-全部(除草稿) 1-待审核  2-已审核通过 3-审核失败的 6-状态照片审核通过()
         * @apiParam {Number} page 页号.
         * @apiParam {Number} rpp  每页记录数.
         *
         * @apiSampleRequest http://icp.hzspeed.cn/admin/records
         *
         * @apiSuccess {Object[]} data 记录列表
         * @apiSuccess {Number} data.id 记录id
         * @apiSuccess {String} data.checklisturl 核验单图片URL
         * @apiSuccess {String} data.checkedlisturl 校验过的核验单图片URL
         * @apiSuccess {String} data.protocolurl1 云平台协议第一页图片
         * @apiSuccess {String} data.protocolurl2 云平台协议第二页图片
         * @apiSuccess {String} data.securityurl1 信息安全管理责任书第一页图片URL
         * @apiSuccess {String} data.securityurl2 信息安全管理责任书第二页图片URL
         * @apiSuccess {Number} data.companyid 公司id
         * @apiSuccess {Number} data.websiteid 网站id
         * @apiSuccess {String} data.tenantid 租户id
         * @apiSuccess {Number} data.type  备案类型: 0-首次备案, 1-新增网站, 2-新增接入
         * @apiSuccess {Number} data.status 备案状态: 0-草稿,1-初审中,2-初审未通过,3-初审已通过,4-照片审核中,5-照片审核未通过,6-照片审核已通过,7-通管局审核中,8-通管局审核未通过,9-通管局审核已通过,10-待核实,11-未知状态
         * @apiSuccess {String} data.code 备案编号
         * @apiSuccess {Number} data.operatetime 操作时间
         * @apiSuccess {String} data.operator 操作员
         * @apiSuccess {Number} data.updatetime 记录更新时间
         * @apiSuccess {Number} data.createtime 记录创建时间
         * @apiSuccess {Number} page 页号
         * @apiSuccess {Number} pages 总页数
         * @apiSuccess {Number} rows 总记录数
         * @apiSuccess {Number} rpp 每页显示数
         *
         * @apiUse  EmptyRecord
         */
        static getRecordsb(app){
            var me = this;
            return function *(){
                var ret = {};

                var pass = Controllers.passWhitelist(this.remoteAddress,app);
                if( pass ) {
                    var storeService = new StoreService(app)
                    ret = yield storeService.getRecordsb();
                }

                this.type = 'json';
                this.body = ret;
            }
        }

        /**
         * @api {post} /admin/recordsbystatus 获取记录列表
         * @apiName getRecordsbByStatus
         * @apiGroup Ops
         * @apiPermission whitelist
         * @apiVersion 0.0.2
         * @apiDescription 权限通过白名单管理
         *
         * @apiParam {Object} reqdata 请求数据
         * @apiParam {Array} reqdata.filter 查询状态值数组
         * @apiParam {Number} reqdata.page 页号.
         * @apiParam {Number} reqdata.rpp  每页记录数.
         *
         * @apiSampleRequest http://icp.hzspeed.cn/admin/recordsbystatus
         *
         * @apiSuccess {Object[]} data 记录列表
         * @apiSuccess {Number} data.id 记录id
         * @apiSuccess {String} data.checklisturl 核验单图片URL
         * @apiSuccess {String} data.checkedlisturl 校验过的核验单图片URL
         * @apiSuccess {String} data.protocolurl1 云平台协议第一页图片
         * @apiSuccess {String} data.protocolurl2 云平台协议第二页图片
         * @apiSuccess {String} data.securityurl1 信息安全管理责任书第一页图片URL
         * @apiSuccess {String} data.securityurl2 信息安全管理责任书第二页图片URL
         * @apiSuccess {Number} data.companyid 公司id
         * @apiSuccess {Number} data.websiteid 网站id
         * @apiSuccess {String} data.tenantid 租户id
         * @apiSuccess {Number} data.type  备案类型: 0-首次备案, 1-新增网站, 2-新增接入
         * @apiSuccess {Number} data.status 备案状态: 0-草稿,1-初审中,2-初审未通过,3-初审已通过,4-照片审核中,5-照片审核未通过,6-照片审核已通过,7-通管局审核中,8-通管局审核未通过,9-通管局审核已通过,10-待核实,11-未知状态
         * @apiSuccess {String} data.code 备案编号
         * @apiSuccess {Number} data.operatetime 操作时间
         * @apiSuccess {String} data.operator 操作员
         * @apiSuccess {Number} data.updatetime 记录更新时间
         * @apiSuccess {Number} data.createtime 记录创建时间
         * @apiSuccess {Number} page 页号
         * @apiSuccess {Number} pages 总页数
         * @apiSuccess {Number} rows 总记录数
         * @apiSuccess {Number} rpp 每页显示数
         *
         * @apiUse  EmptyRecord
         */
        static getRecordsbByStatus(app){
            var me = this;
            return function *(){
                var ret = {};

                var pass = Controllers.passWhitelist(this.remoteAddress,app);
                if( pass ) {
                    var storeService = new StoreService(app)
                    ret = yield storeService.getRecordsbByStatus();
                }

                this.type = 'json';
                this.body = ret;
            }
        }

        /**
         * @api {get} /admin/curtains 获取幕布寄送任务
         * @apiName getCurtainsb
         * @apiGroup Ops
         * @apiPermission whitelist
         * @apiVersion 0.0.2
         * @apiDescription 权限通过白名单管理
         *
         * @apiParam {Number} filter 查询状态过滤条件 1-正在申请幕布状态 2-已寄送幕布  3-正在申请+已寄送幕布用户
         * @apiParam {Number} page 页号.
         * @apiParam {Number} rpp  每页记录数.
         *
         * @apiSampleRequest http://icp.hzspeed.cn/admin/curtains
         *
         * @apiSuccess {Object[]} data 记录列表
         * @apiSuccess {Number} data.id 用户ID
         * @apiSuccess {Number} data.tenantid 租户ID
         * @apiSuccess {String} data.email 租户Email
         * @apiSuccess {String} data.username 租户名称
         * @apiSuccess {String} data.mailingaddress 幕布邮寄地址
         * @apiSuccess {String} data.recipient  幕布接收人
         * @apiSuccess {String} data.recipientmobile 幕布接收人电话
         * @apiSuccess {String} [data.companyname] 幕布接收人公司
         * @apiSuccess {Number} data.operatetime 操作时间
         * @apiSuccess {String} data.operator 操作员
         * @apiSuccess {Number} page 页号
         * @apiSuccess {Number} pages 总页数
         * @apiSuccess {Number} rows 总记录数
         * @apiSuccess {Number} rpp 每页显示数
         *
         * @apiUse  EmptyRecord
         */
        static getCurtainsb(app){
            var me = this;
            return function *(){
                var ret = {};

                var pass = Controllers.passWhitelist(this.remoteAddress,app);
                if( pass ) {
                    var storeService = new StoreService(app)
                    ret = yield storeService.getCurtainsb();
                }

                this.type = 'json';
                this.body = ret;
            }
        }

        static deleteRecord(app){
            var me = this;
            return function *(page){
                var session = this.session;
                var ret = {};

                var storeService = new StoreService(app)
                ret = yield storeService.deleteRecord();

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
                            url = yield storeService.uploadNos(Date.now()+encodeURIComponent(file.filename),file.path);
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

        /*
        * 没有文件类型限制*/
        static upload2(app){

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
                          var storeService = new StoreService(app);
                            url = yield storeService.uploadNos(Date.now()+encodeURIComponent(file.filename),file.path);
                            filename = file.filename;
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


        /**
         * @api {get} /rest/sys 获取sys信息
         * @apiName getSys
         * @apiGroup Ops
         * @apiPermission whitelist
         * @apiVersion 0.0.2
         * @apiDescription 通过白名单管理权限
         *
         * @apiSampleRequest http://icp.hzspeed.cn/rest/sys
         *
         * @apiParam {Number} key key
         *
         * @apiSuccess {String} value value
         */
        static getSys(app){
            var me = this;
            return function *(){
                var ret = {};

                var pass = Controllers.passWhitelist(this.remoteAddress,app);
                if( pass ) {
                    var storeService = new StoreService(app);
                    ret = yield storeService.getSys();
                }

                this.type = 'json';
                this.body = {ret: ret};
            }
        }

        /**
         * @api {put} /rest/sys 修改sys信息
         * @apiName putSys
         * @apiGroup Ops
         * @apiPermission whitelist
         * @apiVersion 0.0.2
         * @apiDescription 通过白名单管理权限
         *
         * @apiSampleRequest http://icp.hzspeed.cn/admin/website
         *
         * @apiParam {Number} key key
         * @apiParam {String} value value

         * @apiSuccess {Number} ret true:成功,false:失败
         */
        static putSys(app){
            var me = this;
            return function *(){
                var ret = {};

                var pass = Controllers.passWhitelist(this.remoteAddress,app);
                if( pass ) {
                    var storeService = new StoreService(app);
                    ret = yield storeService.putSys();
                }

                this.type = 'json';
                this.body = {ret: ret};
            }
        }

        /**
         * @api {put} /admin/icp/verifybamm 检查备案密码
         * @apiName putWebsiteb
         * @apiGroup Ops
         * @apiPermission whitelist
         * @apiVersion 0.0.2
         * @apiDescription 通过白名单管理权限
         *
         * @apiSampleRequest http://icp.hzspeed.cn/admin/icp/verifybamm
         *
         * @apiParam {String} baxh 备案号
         * @apiParam {String} bamm 备案密码

         * @apiSuccess {Object} ret { ret:true|false,msg:''}
         */
        static checkBamm(app){
            var me = this;
            return function *(){
                var ret = {};

                var pass = Controllers.passWhitelist(this.remoteAddress,app);
                if( pass ) {
                    var storeService = new StoreService(app);
                    ret = yield storeService.isp_verifybamm();
                }

                this.type = 'json';
                this.body = {ret: ret};
            }
        }

        /**
         * @api {put} /admin/icp/querybeianstatus 查询备案状态
         * @apiName putWebsiteb
         * @apiGroup Ops
         * @apiPermission whitelist
         * @apiVersion 0.0.2
         * @apiDescription 通过白名单管理权限
         *
         * @apiSampleRequest http://icp.hzspeed.cn/admin/icp/querybeianstatus
         *
         * @apiParam {Number} queryConditionType 查询条件类型
         * {
            0-表示通过网站域名查询网站是否已备案；
            1-表示通过工商营业执照号码查询单位主体是否备案；
            2-表示通过个人身份证号码查询个人主体是否备案；
            3-表示通过事业单位组织机构代码证号码查询单位主体是否备案；
            4-表示通过事业法人证号码查询单位主体是否备案；
            5-表示通过军队代号号码查询单位主体是否备案；
            6-表示通过社会团体社团法人证号码查询单位主体是否备案；
            7-表示通过护照号码查询个人主体是否备案；
            8-表示通过军官证号码查询个人主体是否备案；
            9-表示通过政府机关组织机构代码证号码查询单位主体是否备案；
            10-表示通过社会团体组织机构代码证号码查询单位主体是否备案；
            11-表示通过台胞证号码查询个人主体是否备案。
         * }
         * @apiParam {String} queryCondition 对queryConditionType对应的域名或证件号码

         * @apiSuccess {Object} ret { ret:true|false,msg:'', StatusInfo:{}}
         * 当ret=true,StatusInfo
         *  1）	查询成功的返回
         	已备案的结果信息：
         <StatusInfo>
         <Cxtjlx>条件类型</Cxtjlx>
         <Cxtj>网站域名或证件号码</Cxtj>
         <Wzmc>网站名称（当查询主体是否备案时，此项为空</Wzmc>
         <Ztbah>主体备案号</Ztbah>
         <Wzbah>网站备案号（当查询主体是否备案时，此项为空）</Wzbah>
         <Bazt>备案状态（0表示已备案）</Bazt>
         </StatusInfo>
         	未备案的结果信息：
         <StatusInfo>
         <Cxtjlx>条件类型</Cxtjlx>
         <Cxtj>网站域名或证件号码</Cxtj>
         <Bazt>备案状态（1表示未备案）</Bazt>
         </StatusInfo>
         * 当ret=false时, StatusInfo:{}
         */
        static querybeianstatus(app){
            var me = this;
            return function *(){
                var ret = {};

                var pass = Controllers.passWhitelist(this.remoteAddress,app);
                if( pass ) {
                    var storeService = new StoreService(app);
                    ret = yield storeService.isp_querybeianstatus();
                }

                this.type = 'json';
                this.body = {ret: ret};
            }
        }


        /**
         * @api {put} /admin/ip/iply 创建IP来源
         * @apiName putWebsiteb
         * @apiGroup IP
         * @apiPermission whitelist
         * @apiVersion 0.0.2
         * @apiDescription 通过白名单管理权限
         *
         * @apiSampleRequest http://icp.hzspeed.cn/admin/ip/iply
         *
         * @apiParam {Object} iply IP来源对象
         * @apiParam {Number} iply.qsip 起始IP
         * @apiParam {Number} iply.zzip 终止IP
         * @apiParam {Number} iply.lydw 来源单位
         * @apiParam {String} iply.bz 备注
         * @apiParam {String} iply.area 区域
         * @apiParam {Number} iply.net IP网段

         @apiSuccess {Object} ret { ret: {id:id} }
         */
        static createIply(app){
            var me = this;
            return function *(){
                var ret = {};

                var pass = Controllers.passWhitelist(this.remoteAddress,app);
                if( pass ) {
                    var storeService = new StoreService(app);
                    ret = yield storeService.createIply();
                }

                this.type = 'json';
                this.body = {ret: ret};
            }
        }


        /**
         * @api {put} /admin/area 创建区域表
         * @apiName putWebsiteb
         * @apiGroup IP
         * @apiPermission whitelist
         * @apiVersion 0.0.2
         * @apiDescription 通过白名单管理权限
         *
         * @apiSampleRequest http://icp.hzspeed.cn/admin/area
         *
         * @apiParam {Object} area 区域对象
         * @apiParam {String} area.code 区域编码
         * @apiParam {String} area.name 省市县名称
         * @apiParam {String} area.level 属性(省/直辖市,地级市,县)

         @apiSuccess {Object} ret { ret: {id:id} }
         */
        static createArea(app){
            var me = this;
            return function *(){
                var ret = {};

                var pass = Controllers.passWhitelist(this.remoteAddress,app);
                if( pass ) {
                    var storeService = new StoreService(app);
                    ret = yield storeService.createArea();
                }

                this.type = 'json';
                this.body = {ret: ret};
            }
        }


        /**
         * @api {put} /admin/resources 创建区域表
         * @apiName creaeResouces
         * @apiGroup IP
         * @apiPermission whitelist
         * @apiVersion 0.0.2
         * @apiDescription 通过白名单管理权限
         *
         * @apiSampleRequest http://icp.hzspeed.cn/admin/resources
         *
         * @apiParam {Object} deploy 部署对象
         * @apiParam {String} deploy.version  部署版本号
         * @apiParam {String} deploy.localurl  需部署的本地目录

         @apiSuccess {NUmber} ret { ret: true | false }
         */
        static createResources(app){
            var me = this;
            return function *(){
                var ret = {};

                var pass = Controllers.passWhitelist(this.remoteAddress,app);
                if( pass ) {
                    var storeService = new StoreService(app);
                    ret = yield storeService.createResources();
                }

                this.type = 'json';
                this.body = {ret: ret};
            }
        }


        static passWhitelist( ip,app ){
            var pass = false;
            const ips = app.config.whiteips;
            ips.forEach(function(v,index){
                if( ip.includes(v) ){
                    pass = true;
                }
            })
            console.log("pass:",pass);
            console.log("remoteAddress:",ip);
            return pass;
        }

        getClassName()
        {
            return EasyNode.namespace(__filename);
        }
    }

    module.exports = Controllers;
})();
