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
                yield this.render('index',{user:user,loginCallback:app.config.loginCallback});
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

                yield this.render('index',{user:{},loginCallback:app.config.loginCallback});
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

                var storeService = new StoreService(app)
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
         * @apiSuccess {Object} comapnyinfo 公司信息
         * @apiSuccess {Number} comapny.id 公司ID
         * @apiSuccess {String} comapny.province 省
         * @apiSuccess {String} comapny.city 市
         * @apiSuccess {String} comapny.area 区
         * @apiSuccess {Number} comapny.nature 性质 \n1-军队\n2-政府机关\n3-事业单位\n4-企业\n5-个人\n
         * @apiSuccess {Number} comapny.idtype 证件类型\n1-工商执照\n2-组织机构代码
         * @apiSuccess {String} comapny.idnumber 证件号码
         * @apiSuccess {String} comapny.name 名称
         * @apiSuccess {String} comapny.liveaddress 居住地址
         * @apiSuccess {String} comapny.commaddress 通讯地址
         * @apiSuccess {String} comapny.owner 投资人或主管单位名称
         * @apiSuccess {String} comapny.managername 法人姓名
         * @apiSuccess {Number} comapny.manageridtype 法人证件类型\n性质 \n1-军队\n2-政府机关\n3-事业单位\n4-企业\n5-个人\n
         * @apiSuccess {String} comapny.manageridnumber 法人证件号码
         * @apiSuccess {String} comapny.officephoneregion 办公室电话区号
         * @apiSuccess {String} comapny.officephonenumber 办公室电话号码
         * @apiSuccess {String} comapny.mobile 手机号码
         * @apiSuccess {String} comapny.email 电子邮箱
         * @apiSuccess {String} comapny.recordnumber 主体备案号
         *
         * @apiSuccess {Object} siteinfo 网站
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
         * @apiSuccess {Object} website.ip 网站IP地址:
         {
            ip1:"",
            ip2:"",
            ip3:"",
            ip4:""
         }
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
         * @apiSuccess {Number} website.manageridtype 证件类型：1-身分证 2-护照 3-军官证 4-台胞证
         * @apiSuccess {String} website.manageridnumber 证件号码
         * @apiSuccess {String} website.officephoneregion 办公室电话区号
         * @apiSuccess {String} website.officephonenumber 办公室电话号码
         * @apiSuccess {String} website.mobile 手机号码
         * @apiSuccess {String} website.email 电子邮箱
         * @apiSuccess {String} website.qq qq号码
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
         * @apiSuccess {String} record.protocolurl1 云平台服务协议第一页l图片URL
         * @apiSuccess {String} record.protocolurl2 云平台服务协议第二页图片URL
         * @apiSuccess {String} record.securityurl1 信息安全管理责任书第一页图片URL
         * @apiSuccess {String} record.securityurl2 信息安全管理责任书第二页图片URL
         * @apiSuccess {String} record.code 备案号
         * @apiSuccess {Number} record.status 备案申请状态\n0-草稿\n1-初审中\n2-初审未通过\n3-初审已通过\n4-照片审核中\n5-照片审核未通过\n6-照片审核已通过\n7-通管局审核中\n8-通管局审核未通过\n9-通管局审核已通过\n10-未知状态\n
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
         * @apiSuccess {Number} comapny.nature 性质 \n1-军队\n2-政府机关\n3-事业单位\n4-企业\n5-个人\n
         * @apiSuccess {Number} comapny.idtype 证件类型\n1-工商执照\n2-组织机构代码
         * @apiSuccess {String} comapny.idnumber 证件号码
         * @apiSuccess {String} comapny.name 名称
         * @apiSuccess {String} comapny.liveaddress 居住地址
         * @apiSuccess {String} comapny.commaddress 通讯地址
         * @apiSuccess {String} comapny.owner 投资人或主管单位名称
         * @apiSuccess {String} comapny.managername 法人姓名
         * @apiSuccess {Number} comapny.manageridtype 法人证件类型\n性质 \n1-军队\n2-政府机关\n3-事业单位\n4-企业\n5-个人\n
         * @apiSuccess {String} comapny.manageridnumber 法人证件号码
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
         * @apiSuccess {Number} website.manageridtype 证件类型：1-身分证 2-护照 3-军官证 4-台胞证
         * @apiSuccess {String} website.manageridnumber 证件号码
         * @apiSuccess {String} website.officephoneregion 办公室电话区号
         * @apiSuccess {String} website.officephonenumber 办公室电话号码
         * @apiSuccess {String} website.mobile 手机号码
         * @apiSuccess {String} website.email 电子邮箱
         * @apiSuccess {String} website.qq qq号码
         * @apiSuccess {Number} website.prechecktype 前置审批类型 0-暂无 1-新闻 2-出版 3-教育 4-医疗保健 5-药品和医疗器械 6-电子公告服务 7-文化 8-广播电视节目
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
         * @apiSuccess {String} record.protocolurl1 云平台服务协议第一页l图片URL
         * @apiSuccess {String} record.protocolurl2 云平台服务协议第二页图片URL
         * @apiSuccess {String} record.securityurl1 信息安全管理责任书第一页图片URL
         * @apiSuccess {String} record.securityurl2 信息安全管理责任书第二页图片URL
         * @apiSuccess {String} record.code 备案号
         * @apiSuccess {Number} record.status 备案申请状态\n0-草稿\n1-初审中\n2-初审未通过\n3-初审已通过\n4-照片审核中\n5-照片审核未通过\n6-照片审核已通过\n7-通管局审核中\n8-通管局审核未通过\n9-通管局审核已通过\n10-未知状态\n
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
         * @apiSuccess {Number} comapny.nature 性质 \n1-军队\n2-政府机关\n3-事业单位\n4-企业\n5-个人\n
         * @apiSuccess {Number} comapny.idtype 证件类型\n1-工商执照\n2-组织机构代码
         * @apiSuccess {String} comapny.idnumber 证件号码
         * @apiSuccess {String} comapny.name 名称
         * @apiSuccess {String} comapny.liveaddress 居住地址
         * @apiSuccess {String} comapny.commaddress 通讯地址
         * @apiSuccess {String} comapny.owner 投资人或主管单位名称
         * @apiSuccess {String} comapny.managername 法人姓名
         * @apiSuccess {Number} comapny.manageridtype 法人证件类型\n性质 \n1-军队\n2-政府机关\n3-事业单位\n4-企业\n5-个人\n
         * @apiSuccess {String} comapny.manageridnumber 法人证件号码
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
         * @apiSuccess {Number} website.manageridtype 证件类型：1-身分证 2-护照 3-军官证 4-台胞证
         * @apiSuccess {String} website.manageridnumber 证件号码
         * @apiSuccess {String} website.officephoneregion 办公室电话区号
         * @apiSuccess {String} website.officephonenumber 办公室电话号码
         * @apiSuccess {String} website.mobile 手机号码
         * @apiSuccess {String} website.email 电子邮箱
         * @apiSuccess {String} website.qq qq号码
         * @apiSuccess {Number} website.prechecktype 前置审批类型 0-暂无 1-新闻 2-出版 3-教育 4-医疗保健 5-药品和医疗器械 6-电子公告服务 7-文化 8-广播电视节目
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
                    var storeService = new StoreService(app)
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
         * @apiParam {Number} status 备案申请状态\n0-草稿\n1-初审中\n2-初审未通过\n3-初审已通过\n4-照片审核中\n5-照片审核未通过\n6-照片审核已通过\n7-通管局审核中\n8-通管局审核未通过\n9-通管局审核已通过\n10-未知状态\n
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

                var storeService = new StoreService(app)
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

                var storeService = new StoreService(app)
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
         * @apiParam {Number} status 备案申请状态\n0-草稿\n1-初审中\n2-初审未通过\n3-初审已通过\n4-照片审核中\n5-照片审核未通过\n6-照片审核已通过\n7-通管局审核中\n8-通管局审核未通过\n9-通管局审核已通过\n10-未知状态\n
         * @apiParam {String} reasons 通过则为备注,拒绝则为理由(多条用p标签分隔)
         * @apiParam {String} [curtainurl] 帘布照片URL
         *
         * @apiSuccess {Number} ret true:成功,false:失败
         */
        static putRecordb(app){
            var me = this;
            return function *(){
                var ret = {};

                var pass = Controllers.passWhitelist(this.remoteAddress,app);
                if( pass ) {
                    var storeService = new StoreService(app)
                    ret = yield storeService.putRecordb();
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
         * @apiParam {Number} filter 查询状态过滤条件 0-全部(除草稿) 1-待审核  2-已审核通过 3-审核失败的
         * @apiParam {Number} page 页号.
         * @apiParam {Number} rpp  每页记录数.
         *
         * @apiSampleRequest http://icp.hzspeed.cn/admin/records
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
                            url = yield storeService.uploadNos(Date.now(),file.path);
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
