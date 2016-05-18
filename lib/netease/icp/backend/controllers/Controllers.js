'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var assert = require('assert');
var logger = using('easynode.framework.Logger').forFile(__filename);
var GenericObject = using('easynode.GenericObject');
var fs = require('co-fs');
var multipart = require('co-multipart');
var f = require('fs');
var util = require('util');
var thunkify = require('thunkify');
var LoginService = using('netease.icp.backend.services.LoginService');
var FileService = using('easynode.framework.util.FileService');
var StoreService = using('netease.icp.backend.services.StoreService');

(function () {

    // Myself result code
    var LOGIN_OK = 200;
    var LOGIN_ERR = 201;

    /**
     * Class Controllers
     *
     * @class netease.icp.Controllers
     * @extends easynode.GenericObject
     * @since 0.1.0
     * @author allen.hu
     * */

    var Controllers = function (_GenericObject) {
        _inherits(Controllers, _GenericObject);

        /**
         * 构造函数。
         *
         * @method 构造函数
         * @since 0.1.0
         * @author allen.hu
         * */

        function Controllers() {
            _classCallCheck(this, Controllers);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(Controllers).call(this));
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

        _createClass(Controllers, [{
            key: 'getClassName',
            value: function getClassName() {
                return EasyNode.namespace(__filename);
            }
        }], [{
            key: 'home',
            value: function home(app) {
                return regeneratorRuntime.mark(function _callee() {
                    var user, surl;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    user = this.session.user || undefined;
                                    surl = '' + app.config.resources.static + process.env.ENV + '_';
                                    _context.next = 4;
                                    return this.render('index', { user: user, loginCallback: app.config.loginCallback, config: { surl: surl, env: process.env.ENV } });

                                case 4:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, this);
                });
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

        }, {
            key: 'loginCallback',
            value: function loginCallback(app) {
                return regeneratorRuntime.mark(function _callee2() {
                    var loginService, result;
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    loginService = new LoginService(app);
                                    _context2.next = 3;
                                    return loginService.login(this.query);

                                case 3:
                                    result = _context2.sent;

                                    if (result.hasOwnProperty('user')) {
                                        this.session.user = result.user;
                                    } else {
                                        this.session.user = result;
                                    }
                                    this.redirect('/');

                                case 6:
                                case 'end':
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, this);
                });
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

        }, {
            key: 'logout',
            value: function logout(app) {
                return regeneratorRuntime.mark(function _callee3() {
                    var surl;
                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
                        while (1) {
                            switch (_context3.prev = _context3.next) {
                                case 0:
                                    this.session.user = null;

                                    surl = '' + app.config.resources.static + process.env.ENV + '_';
                                    _context3.next = 4;
                                    return this.render('index', { user: {}, loginCallback: app.config.loginCallback, config: { surl: surl, env: process.env.ENV } });

                                case 4:
                                case 'end':
                                    return _context3.stop();
                            }
                        }
                    }, _callee3, this);
                });
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

        }, {
            key: 'comment',
            value: function comment(app) {
                return regeneratorRuntime.mark(function _callee4() {
                    var parts, profile;
                    return regeneratorRuntime.wrap(function _callee4$(_context4) {
                        while (1) {
                            switch (_context4.prev = _context4.next) {
                                case 0:
                                    return _context4.delegateYield(multipart(this), 't0', 1);

                                case 1:
                                    parts = _context4.t0;

                                    console.dir(parts);

                                    profile = this.request.body;

                                    console.log(profile);
                                    console.log(this.parameter);
                                    console.log(this.body);
                                    console.log(this.query);

                                    this.type = 'json';
                                    this.body = [{ "author": "Pete Hunt", "text": "This is one comment" }, { "author": "Jordan Walke", "text": "This is *another* comment" }];

                                case 10:
                                case 'end':
                                    return _context4.stop();
                            }
                        }
                    }, _callee4, this);
                });
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

        }, {
            key: 'savedraft',
            value: function savedraft(app) {
                var me = this;
                return regeneratorRuntime.mark(function _callee5() {
                    var session, ret, storeService;
                    return regeneratorRuntime.wrap(function _callee5$(_context5) {
                        while (1) {
                            switch (_context5.prev = _context5.next) {
                                case 0:
                                    session = this.session;
                                    ret = {};
                                    storeService = new StoreService(app);
                                    _context5.next = 5;
                                    return storeService.savedraft();

                                case 5:
                                    ret = _context5.sent;

                                    this.type = 'json';
                                    this.body = { ret: ret };

                                case 8:
                                case 'end':
                                    return _context5.stop();
                            }
                        }
                    }, _callee5, this);
                });
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

        }, {
            key: 'createRecord',
            value: function createRecord(app) {
                var me = this;
                return regeneratorRuntime.mark(function _callee6() {
                    var ret, session, storeService;
                    return regeneratorRuntime.wrap(function _callee6$(_context6) {
                        while (1) {
                            switch (_context6.prev = _context6.next) {
                                case 0:
                                    ret = {};
                                    session = this.session;
                                    storeService = new StoreService(app);
                                    _context6.next = 5;
                                    return storeService.createRecord();

                                case 5:
                                    ret = _context6.sent;

                                    this.type = 'json';
                                    this.body = { ret: ret };

                                case 8:
                                case 'end':
                                    return _context6.stop();
                            }
                        }
                    }, _callee6, this);
                });
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
             * @apiSuccess {Number} record.status 备案申请状态\n0-草稿\n1-初审中\n2-初审未通过\n3-初审已通过\n4-照片审核中\n5-照片审核未通过\n6-照片审核已通过\n7-通管局审核中\n8-通管局审核未通过\n9-通管局审核已通过\n10-待核实
             * \n11-幕布申请中\n12-幕布已寄送\n13-未知
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

        }, {
            key: 'getRecord',
            value: function getRecord(app) {
                var me = this;
                return regeneratorRuntime.mark(function _callee7() {
                    var session, ret, storeService;
                    return regeneratorRuntime.wrap(function _callee7$(_context7) {
                        while (1) {
                            switch (_context7.prev = _context7.next) {
                                case 0:
                                    session = this.session;
                                    ret = {};
                                    storeService = new StoreService(app);
                                    _context7.next = 5;
                                    return storeService.getRecord();

                                case 5:
                                    ret = _context7.sent;

                                    this.type = 'json';
                                    this.body = ret;

                                case 8:
                                case 'end':
                                    return _context7.stop();
                            }
                        }
                    }, _callee7, this);
                });
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

        }, {
            key: 'getPubips',
            value: function getPubips(app) {
                var me = this;
                return regeneratorRuntime.mark(function _callee8() {
                    var ret;
                    return regeneratorRuntime.wrap(function _callee8$(_context8) {
                        while (1) {
                            switch (_context8.prev = _context8.next) {
                                case 0:
                                    ret = {};

                                    //var storeService = new StoreService(app,app.config);
                                    //ret =  yield storeService.gettenantPubips();

                                    _context8.next = 3;
                                    return app.ispService.gettenantPubips();

                                case 3:
                                    ret = _context8.sent;

                                    this.type = 'json';
                                    this.body = ret;

                                case 6:
                                case 'end':
                                    return _context8.stop();
                            }
                        }
                    }, _callee8, this);
                });
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
             * @apiSuccess {Number} record.status \n0-草稿\n1-初审中\n2-初审未通过\n3-初审已通过\n4-照片审核中\n5-照片审核未通过\n6-照片审核已通过\n7-通管局审核中\n8-通管局审核未通过\n9-通管局审核已通过\n10-待核实
             * \n11-幕布申请中\n12-幕布已寄送\n13-未知
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

        }, {
            key: 'getRecordb',
            value: function getRecordb(app) {
                var me = this;
                return regeneratorRuntime.mark(function _callee9() {
                    var ret, pass, storeService;
                    return regeneratorRuntime.wrap(function _callee9$(_context9) {
                        while (1) {
                            switch (_context9.prev = _context9.next) {
                                case 0:
                                    ret = {};
                                    pass = Controllers.passWhitelist(this.remoteAddress, app);

                                    if (!pass) {
                                        _context9.next = 7;
                                        break;
                                    }

                                    storeService = new StoreService(app);
                                    _context9.next = 6;
                                    return storeService.getRecordb();

                                case 6:
                                    ret = _context9.sent;

                                case 7:

                                    this.type = 'json';
                                    this.body = ret;

                                case 9:
                                case 'end':
                                    return _context9.stop();
                            }
                        }
                    }, _callee9, this);
                });
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
             * @apiParam {Number} status \n0-草稿\n1-初审中\n2-初审未通过\n3-初审已通过\n4-照片审核中\n5-照片审核未通过\n6-照片审核已通过\n7-通管局审核中\n8-通管局审核未通过\n9-通管局审核已通过\n10-待核实
             * \n11-幕布申请中\n12-幕布已寄送\n13-未知
             * @apiParam {String} reasons 通过则为备注,拒绝则为理由(多条用p标签分隔)
             * @apiParam {String} [curtainurl] 帘布照片URL
             *
             * @apiSuccess {Number} ret true:成功,false:失败
             */

        }, {
            key: 'putRecord',
            value: function putRecord(app) {
                var me = this;
                return regeneratorRuntime.mark(function _callee10() {
                    var session, ret, storeService;
                    return regeneratorRuntime.wrap(function _callee10$(_context10) {
                        while (1) {
                            switch (_context10.prev = _context10.next) {
                                case 0:
                                    session = this.session;
                                    ret = {};
                                    storeService = new StoreService(app);
                                    _context10.next = 5;
                                    return storeService.putRecord();

                                case 5:
                                    ret = _context10.sent;

                                    this.type = 'json';
                                    this.body = { ret: ret };

                                case 8:
                                case 'end':
                                    return _context10.stop();
                            }
                        }
                    }, _callee10, this);
                });
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
             * @apiParam {Number} recordid 申请记录id
             *
             * @apiSuccess {Number} ret true:成功,false:失败
             */

        }, {
            key: 'putUser',
            value: function putUser(app) {
                var me = this;
                return regeneratorRuntime.mark(function _callee11() {
                    var session, ret, storeService;
                    return regeneratorRuntime.wrap(function _callee11$(_context11) {
                        while (1) {
                            switch (_context11.prev = _context11.next) {
                                case 0:
                                    session = this.session;
                                    ret = {};
                                    storeService = new StoreService(app);
                                    _context11.next = 5;
                                    return storeService.putUser();

                                case 5:
                                    ret = _context11.sent;

                                    this.type = 'json';
                                    this.body = { ret: ret };

                                case 8:
                                case 'end':
                                    return _context11.stop();
                            }
                        }
                    }, _callee11, this);
                });
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
             * @apiParam {Number} status \n0-草稿\n1-初审中\n2-初审未通过\n3-初审已通过\n4-照片审核中\n5-照片审核未通过\n6-照片审核已通过\n7-通管局审核中\n8-通管局审核未通过\n9-通管局审核已通过\n10-待核实
             * \n11-幕布申请中\n12-幕布已寄送\n13-未知
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

        }, {
            key: 'putRecordb',
            value: function putRecordb(app) {
                var me = this;
                return regeneratorRuntime.mark(function _callee12() {
                    var ret, pass, storeService;
                    return regeneratorRuntime.wrap(function _callee12$(_context12) {
                        while (1) {
                            switch (_context12.prev = _context12.next) {
                                case 0:
                                    ret = {};
                                    pass = Controllers.passWhitelist(this.remoteAddress, app);

                                    if (!pass) {
                                        _context12.next = 7;
                                        break;
                                    }

                                    storeService = new StoreService(app);
                                    _context12.next = 6;
                                    return storeService.putRecordb();

                                case 6:
                                    ret = _context12.sent;

                                case 7:

                                    this.type = 'json';
                                    this.body = { ret: ret };

                                case 9:
                                case 'end':
                                    return _context12.stop();
                            }
                        }
                    }, _callee12, this);
                });
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

        }, {
            key: 'putCompanyb',
            value: function putCompanyb(app) {
                var me = this;
                return regeneratorRuntime.mark(function _callee13() {
                    var ret, pass, storeService;
                    return regeneratorRuntime.wrap(function _callee13$(_context13) {
                        while (1) {
                            switch (_context13.prev = _context13.next) {
                                case 0:
                                    ret = {};
                                    pass = Controllers.passWhitelist(this.remoteAddress, app);

                                    if (!pass) {
                                        _context13.next = 7;
                                        break;
                                    }

                                    storeService = new StoreService(app);
                                    _context13.next = 6;
                                    return storeService.putCompanyb();

                                case 6:
                                    ret = _context13.sent;

                                case 7:

                                    this.type = 'json';
                                    this.body = { ret: ret };

                                case 9:
                                case 'end':
                                    return _context13.stop();
                            }
                        }
                    }, _callee13, this);
                });
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

        }, {
            key: 'putWebsiteb',
            value: function putWebsiteb(app) {
                var me = this;
                return regeneratorRuntime.mark(function _callee14() {
                    var ret, pass, storeService;
                    return regeneratorRuntime.wrap(function _callee14$(_context14) {
                        while (1) {
                            switch (_context14.prev = _context14.next) {
                                case 0:
                                    ret = {};
                                    pass = Controllers.passWhitelist(this.remoteAddress, app);

                                    if (!pass) {
                                        _context14.next = 7;
                                        break;
                                    }

                                    storeService = new StoreService(app);
                                    _context14.next = 6;
                                    return storeService.putWebsiteb();

                                case 6:
                                    ret = _context14.sent;

                                case 7:

                                    this.type = 'json';
                                    this.body = { ret: ret };

                                case 9:
                                case 'end':
                                    return _context14.stop();
                            }
                        }
                    }, _callee14, this);
                });
            }

            /**
             * @api {put} /admin/curtain 寄送幕布
             * @apiName putCurtainb
             * @apiGroup Ops
             * @apiPermission whitelist
             * @apiVersion 0.0.2
             * @apiDescription 通过白名单管理权限(废弃的,通过put '/admin/record'来设置)
             *
             * @apiSampleRequest http://icp.hzspeed.cn/admin/curtain
             *
             * @apiParam {Number} id 用户ID
             * @apiParam {Number} operatetime 操作时间
             * @apiParam {String} operator 操作员
             *
             * @apiSuccess {Number} ret true:成功,false:失败
             */

        }, {
            key: 'putCurtainb',
            value: function putCurtainb(app) {
                var me = this;
                return regeneratorRuntime.mark(function _callee15() {
                    var ret, pass, storeService;
                    return regeneratorRuntime.wrap(function _callee15$(_context15) {
                        while (1) {
                            switch (_context15.prev = _context15.next) {
                                case 0:
                                    ret = {};
                                    pass = Controllers.passWhitelist(this.remoteAddress, app);

                                    if (!pass) {
                                        _context15.next = 7;
                                        break;
                                    }

                                    storeService = new StoreService(app);
                                    _context15.next = 6;
                                    return storeService.putCurtainb();

                                case 6:
                                    ret = _context15.sent;

                                case 7:

                                    this.type = 'json';
                                    this.body = { ret: ret };

                                case 9:
                                case 'end':
                                    return _context15.stop();
                            }
                        }
                    }, _callee15, this);
                });
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

        }, {
            key: 'getRecords',
            value: function getRecords(app) {
                var me = this;
                return regeneratorRuntime.mark(function _callee16() {
                    var session, ret, pass, storeService;
                    return regeneratorRuntime.wrap(function _callee16$(_context16) {
                        while (1) {
                            switch (_context16.prev = _context16.next) {
                                case 0:
                                    session = this.session;
                                    ret = {};

                                    //测试环境：10.241.20.112   10.160.252.98    10.180.2.58
                                    //线上环境：10.166.3.39

                                    pass = Controllers.passWhitelist(this.remoteAddress, app);
                                    storeService = new StoreService(app);
                                    _context16.next = 6;
                                    return storeService.getRecords();

                                case 6:
                                    ret = _context16.sent;

                                    this.type = 'json';
                                    this.body = ret;

                                case 9:
                                case 'end':
                                    return _context16.stop();
                            }
                        }
                    }, _callee16, this);
                });
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

        }, {
            key: 'getRecordsb',
            value: function getRecordsb(app) {
                var me = this;
                return regeneratorRuntime.mark(function _callee17() {
                    var ret, pass, storeService;
                    return regeneratorRuntime.wrap(function _callee17$(_context17) {
                        while (1) {
                            switch (_context17.prev = _context17.next) {
                                case 0:
                                    ret = {};
                                    pass = Controllers.passWhitelist(this.remoteAddress, app);

                                    if (!pass) {
                                        _context17.next = 7;
                                        break;
                                    }

                                    storeService = new StoreService(app);
                                    _context17.next = 6;
                                    return storeService.getRecordsb();

                                case 6:
                                    ret = _context17.sent;

                                case 7:

                                    this.type = 'json';
                                    this.body = ret;

                                case 9:
                                case 'end':
                                    return _context17.stop();
                            }
                        }
                    }, _callee17, this);
                });
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

        }, {
            key: 'getRecordsbByStatus',
            value: function getRecordsbByStatus(app) {
                var me = this;
                return regeneratorRuntime.mark(function _callee18() {
                    var ret, pass, storeService;
                    return regeneratorRuntime.wrap(function _callee18$(_context18) {
                        while (1) {
                            switch (_context18.prev = _context18.next) {
                                case 0:
                                    ret = {};
                                    pass = Controllers.passWhitelist(this.remoteAddress, app);

                                    if (!pass) {
                                        _context18.next = 7;
                                        break;
                                    }

                                    storeService = new StoreService(app);
                                    _context18.next = 6;
                                    return storeService.getRecordsbByStatus();

                                case 6:
                                    ret = _context18.sent;

                                case 7:

                                    this.type = 'json';
                                    this.body = ret;

                                case 9:
                                case 'end':
                                    return _context18.stop();
                            }
                        }
                    }, _callee18, this);
                });
            }

            /**
             * @api {get} /admin/curtains 获取幕布寄送任务
             * @apiName getCurtainsb
             * @apiGroup Ops
             * @apiPermission whitelist
             * @apiVersion 0.0.2
             * @apiDescription 权限通过白名单管理(废弃的,改用/admin/curtains2)
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

        }, {
            key: 'getCurtainsb',
            value: function getCurtainsb(app) {
                var me = this;
                return regeneratorRuntime.mark(function _callee19() {
                    var ret, pass, storeService;
                    return regeneratorRuntime.wrap(function _callee19$(_context19) {
                        while (1) {
                            switch (_context19.prev = _context19.next) {
                                case 0:
                                    ret = {};
                                    pass = Controllers.passWhitelist(this.remoteAddress, app);

                                    if (!pass) {
                                        _context19.next = 7;
                                        break;
                                    }

                                    storeService = new StoreService(app);
                                    _context19.next = 6;
                                    return storeService.getCurtainsb();

                                case 6:
                                    ret = _context19.sent;

                                case 7:

                                    this.type = 'json';
                                    this.body = ret;

                                case 9:
                                case 'end':
                                    return _context19.stop();
                            }
                        }
                    }, _callee19, this);
                });
            }

            /**
             * @api {get} /admin/curtains2 获取幕布寄送任务
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
             * @apiSampleRequest http://icp.hzspeed.cn/admin/curtains2
             *
             * @apiSuccess {Object[]} data 记录列表
             * @apiSuccess {Number} data.id 记录ID
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

        }, {
            key: 'getCurtainsb2',
            value: function getCurtainsb2(app) {
                var me = this;
                return regeneratorRuntime.mark(function _callee20() {
                    var ret, pass, storeService;
                    return regeneratorRuntime.wrap(function _callee20$(_context20) {
                        while (1) {
                            switch (_context20.prev = _context20.next) {
                                case 0:
                                    ret = {};
                                    pass = Controllers.passWhitelist(this.remoteAddress, app);

                                    if (!pass) {
                                        _context20.next = 7;
                                        break;
                                    }

                                    storeService = new StoreService(app);
                                    _context20.next = 6;
                                    return storeService.getCurtainsb2();

                                case 6:
                                    ret = _context20.sent;

                                case 7:

                                    this.type = 'json';
                                    this.body = ret;

                                case 9:
                                case 'end':
                                    return _context20.stop();
                            }
                        }
                    }, _callee20, this);
                });
            }
        }, {
            key: 'deleteRecord',
            value: function deleteRecord(app) {
                var me = this;
                return regeneratorRuntime.mark(function _callee21(page) {
                    var session, ret, storeService;
                    return regeneratorRuntime.wrap(function _callee21$(_context21) {
                        while (1) {
                            switch (_context21.prev = _context21.next) {
                                case 0:
                                    session = this.session;
                                    ret = {};
                                    storeService = new StoreService(app);
                                    _context21.next = 5;
                                    return storeService.deleteRecord();

                                case 5:
                                    ret = _context21.sent;

                                    this.type = 'json';
                                    this.body = { ret: ret };

                                case 8:
                                case 'end':
                                    return _context21.stop();
                            }
                        }
                    }, _callee21, this);
                });
            }
        }, {
            key: 'upload',
            value: function upload(app) {
                var supportFileTypes = '^.*\.(?:jpg|png|gif)$';
                var regEx = new RegExp(supportFileTypes);

                return regeneratorRuntime.mark(function _callee22() {
                    var session, hasError, filename, url, parts, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, file, storeService;

                    return regeneratorRuntime.wrap(function _callee22$(_context22) {
                        while (1) {
                            switch (_context22.prev = _context22.next) {
                                case 0:
                                    console.dir(this.cookies.get('koa.sid'));
                                    session = this.session;
                                    //if( session.hasOwnProperty('firms') ){
                                    //    delete session.firms;
                                    //}

                                    this.state.upload = 0;

                                    if (!(this.method.toLocaleLowerCase() == 'post')) {
                                        _context22.next = 51;
                                        break;
                                    }

                                    hasError = false;
                                    filename = '';
                                    url = '';
                                    return _context22.delegateYield(multipart(this), 't0', 8);

                                case 8:
                                    parts = _context22.t0;
                                    _iteratorNormalCompletion = true;
                                    _didIteratorError = false;
                                    _iteratorError = undefined;
                                    _context22.prev = 12;
                                    _iterator = parts.files[Symbol.iterator]();

                                case 14:
                                    if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                                        _context22.next = 31;
                                        break;
                                    }

                                    file = _step.value;

                                    if (file.filename.match(regEx)) {
                                        _context22.next = 23;
                                        break;
                                    }

                                    parts.dispose();
                                    this.status = 403;
                                    this.body = '403 Forbidden : Unsupported type of upload file [' + file.filename + ']';
                                    hasError = true; //ignore downstream middleware
                                    _context22.next = 28;
                                    break;

                                case 23:
                                    storeService = new StoreService(app);
                                    _context22.next = 26;
                                    return storeService.uploadNos(Date.now() + encodeURIComponent(file.filename), file.path);

                                case 26:
                                    url = _context22.sent;

                                    filename = file.filename;

                                case 28:
                                    _iteratorNormalCompletion = true;
                                    _context22.next = 14;
                                    break;

                                case 31:
                                    _context22.next = 37;
                                    break;

                                case 33:
                                    _context22.prev = 33;
                                    _context22.t1 = _context22['catch'](12);
                                    _didIteratorError = true;
                                    _iteratorError = _context22.t1;

                                case 37:
                                    _context22.prev = 37;
                                    _context22.prev = 38;

                                    if (!_iteratorNormalCompletion && _iterator.return) {
                                        _iterator.return();
                                    }

                                case 40:
                                    _context22.prev = 40;

                                    if (!_didIteratorError) {
                                        _context22.next = 43;
                                        break;
                                    }

                                    throw _iteratorError;

                                case 43:
                                    return _context22.finish(40);

                                case 44:
                                    return _context22.finish(37);

                                case 45:
                                    ;
                                    parts.dispose();

                                    this.type = 'json';
                                    this.body = { url: url };
                                    _context22.next = 52;
                                    break;

                                case 51:
                                    EasyNode.DEBUG && logger.debug('multipart must post');

                                case 52:
                                case 'end':
                                    return _context22.stop();
                            }
                        }
                    }, _callee22, this, [[12, 33, 37, 45], [38,, 40, 44]]);
                });
            }

            /*
            * 没有文件类型限制*/

        }, {
            key: 'upload2',
            value: function upload2(app) {

                return regeneratorRuntime.mark(function _callee23() {
                    var session, hasError, filename, url, parts, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, file, storeService;

                    return regeneratorRuntime.wrap(function _callee23$(_context23) {
                        while (1) {
                            switch (_context23.prev = _context23.next) {
                                case 0:
                                    console.dir(this.cookies.get('koa.sid'));
                                    session = this.session;
                                    //if( session.hasOwnProperty('firms') ){
                                    //    delete session.firms;
                                    //}

                                    this.state.upload = 0;

                                    if (!(this.method.toLocaleLowerCase() == 'post')) {
                                        _context23.next = 44;
                                        break;
                                    }

                                    hasError = false;
                                    filename = '';
                                    url = '';
                                    return _context23.delegateYield(multipart(this), 't0', 8);

                                case 8:
                                    parts = _context23.t0;
                                    _iteratorNormalCompletion2 = true;
                                    _didIteratorError2 = false;
                                    _iteratorError2 = undefined;
                                    _context23.prev = 12;
                                    _iterator2 = parts.files[Symbol.iterator]();

                                case 14:
                                    if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                                        _context23.next = 24;
                                        break;
                                    }

                                    file = _step2.value;
                                    storeService = new StoreService(app);
                                    _context23.next = 19;
                                    return storeService.uploadNos(Date.now() + encodeURIComponent(file.filename), file.path);

                                case 19:
                                    url = _context23.sent;

                                    filename = file.filename;

                                case 21:
                                    _iteratorNormalCompletion2 = true;
                                    _context23.next = 14;
                                    break;

                                case 24:
                                    _context23.next = 30;
                                    break;

                                case 26:
                                    _context23.prev = 26;
                                    _context23.t1 = _context23['catch'](12);
                                    _didIteratorError2 = true;
                                    _iteratorError2 = _context23.t1;

                                case 30:
                                    _context23.prev = 30;
                                    _context23.prev = 31;

                                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                        _iterator2.return();
                                    }

                                case 33:
                                    _context23.prev = 33;

                                    if (!_didIteratorError2) {
                                        _context23.next = 36;
                                        break;
                                    }

                                    throw _iteratorError2;

                                case 36:
                                    return _context23.finish(33);

                                case 37:
                                    return _context23.finish(30);

                                case 38:
                                    ;
                                    parts.dispose();

                                    this.type = 'json';
                                    this.body = { url: url };
                                    _context23.next = 45;
                                    break;

                                case 44:
                                    EasyNode.DEBUG && logger.debug('multipart must post');

                                case 45:
                                case 'end':
                                    return _context23.stop();
                            }
                        }
                    }, _callee23, this, [[12, 26, 30, 38], [31,, 33, 37]]);
                });
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

        }, {
            key: 'getSys',
            value: function getSys(app) {
                var me = this;
                return regeneratorRuntime.mark(function _callee24() {
                    var ret, pass, storeService;
                    return regeneratorRuntime.wrap(function _callee24$(_context24) {
                        while (1) {
                            switch (_context24.prev = _context24.next) {
                                case 0:
                                    ret = {};
                                    pass = Controllers.passWhitelist(this.remoteAddress, app);

                                    if (!pass) {
                                        _context24.next = 7;
                                        break;
                                    }

                                    storeService = new StoreService(app);
                                    _context24.next = 6;
                                    return storeService.getSys();

                                case 6:
                                    ret = _context24.sent;

                                case 7:

                                    this.type = 'json';
                                    this.body = { ret: ret };

                                case 9:
                                case 'end':
                                    return _context24.stop();
                            }
                        }
                    }, _callee24, this);
                });
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

        }, {
            key: 'putSys',
            value: function putSys(app) {
                var me = this;
                return regeneratorRuntime.mark(function _callee25() {
                    var ret, pass, storeService;
                    return regeneratorRuntime.wrap(function _callee25$(_context25) {
                        while (1) {
                            switch (_context25.prev = _context25.next) {
                                case 0:
                                    ret = {};
                                    pass = Controllers.passWhitelist(this.remoteAddress, app);

                                    if (!pass) {
                                        _context25.next = 7;
                                        break;
                                    }

                                    storeService = new StoreService(app);
                                    _context25.next = 6;
                                    return storeService.putSys();

                                case 6:
                                    ret = _context25.sent;

                                case 7:

                                    this.type = 'json';
                                    this.body = { ret: ret };

                                case 9:
                                case 'end':
                                    return _context25.stop();
                            }
                        }
                    }, _callee25, this);
                });
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

        }, {
            key: 'checkBamm',
            value: function checkBamm(app) {
                var me = this;
                return regeneratorRuntime.mark(function _callee26() {
                    var ret, pass, storeService;
                    return regeneratorRuntime.wrap(function _callee26$(_context26) {
                        while (1) {
                            switch (_context26.prev = _context26.next) {
                                case 0:
                                    ret = {};
                                    pass = Controllers.passWhitelist(this.remoteAddress, app);

                                    if (!pass) {
                                        _context26.next = 7;
                                        break;
                                    }

                                    storeService = new StoreService(app);
                                    _context26.next = 6;
                                    return storeService.isp_verifybamm();

                                case 6:
                                    ret = _context26.sent;

                                case 7:

                                    this.type = 'json';
                                    this.body = { ret: ret };

                                case 9:
                                case 'end':
                                    return _context26.stop();
                            }
                        }
                    }, _callee26, this);
                });
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

        }, {
            key: 'querybeianstatus',
            value: function querybeianstatus(app) {
                var me = this;
                return regeneratorRuntime.mark(function _callee27() {
                    var ret, pass, storeService;
                    return regeneratorRuntime.wrap(function _callee27$(_context27) {
                        while (1) {
                            switch (_context27.prev = _context27.next) {
                                case 0:
                                    ret = {};
                                    pass = Controllers.passWhitelist(this.remoteAddress, app);

                                    if (!pass) {
                                        _context27.next = 7;
                                        break;
                                    }

                                    storeService = new StoreService(app);
                                    _context27.next = 6;
                                    return storeService.isp_querybeianstatus();

                                case 6:
                                    ret = _context27.sent;

                                case 7:

                                    this.type = 'json';
                                    this.body = { ret: ret };

                                case 9:
                                case 'end':
                                    return _context27.stop();
                            }
                        }
                    }, _callee27, this);
                });
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

        }, {
            key: 'createIply',
            value: function createIply(app) {
                var me = this;
                return regeneratorRuntime.mark(function _callee28() {
                    var ret, pass, storeService;
                    return regeneratorRuntime.wrap(function _callee28$(_context28) {
                        while (1) {
                            switch (_context28.prev = _context28.next) {
                                case 0:
                                    ret = {};
                                    pass = Controllers.passWhitelist(this.remoteAddress, app);

                                    if (!pass) {
                                        _context28.next = 7;
                                        break;
                                    }

                                    storeService = new StoreService(app);
                                    _context28.next = 6;
                                    return storeService.createIply();

                                case 6:
                                    ret = _context28.sent;

                                case 7:

                                    this.type = 'json';
                                    this.body = { ret: ret };

                                case 9:
                                case 'end':
                                    return _context28.stop();
                            }
                        }
                    }, _callee28, this);
                });
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

        }, {
            key: 'createArea',
            value: function createArea(app) {
                var me = this;
                return regeneratorRuntime.mark(function _callee29() {
                    var ret, pass, storeService;
                    return regeneratorRuntime.wrap(function _callee29$(_context29) {
                        while (1) {
                            switch (_context29.prev = _context29.next) {
                                case 0:
                                    ret = {};
                                    pass = Controllers.passWhitelist(this.remoteAddress, app);

                                    if (!pass) {
                                        _context29.next = 7;
                                        break;
                                    }

                                    storeService = new StoreService(app);
                                    _context29.next = 6;
                                    return storeService.createArea();

                                case 6:
                                    ret = _context29.sent;

                                case 7:

                                    this.type = 'json';
                                    this.body = { ret: ret };

                                case 9:
                                case 'end':
                                    return _context29.stop();
                            }
                        }
                    }, _callee29, this);
                });
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

        }, {
            key: 'createResources',
            value: function createResources(app) {
                var me = this;
                return regeneratorRuntime.mark(function _callee30() {
                    var ret, pass, storeService;
                    return regeneratorRuntime.wrap(function _callee30$(_context30) {
                        while (1) {
                            switch (_context30.prev = _context30.next) {
                                case 0:
                                    ret = {};
                                    pass = Controllers.passWhitelist(this.remoteAddress, app);

                                    if (!pass) {
                                        _context30.next = 7;
                                        break;
                                    }

                                    storeService = new StoreService(app);
                                    _context30.next = 6;
                                    return storeService.createResources();

                                case 6:
                                    ret = _context30.sent;

                                case 7:

                                    this.type = 'json';
                                    this.body = { ret: ret };

                                case 9:
                                case 'end':
                                    return _context30.stop();
                            }
                        }
                    }, _callee30, this);
                });
            }
        }, {
            key: 'passWhitelist',
            value: function passWhitelist(ip, app) {
                var pass = false;
                var ips = app.config.whiteips;
                ips.forEach(function (v, index) {
                    if (ip.includes(v)) {
                        pass = true;
                    }
                });
                console.log("pass:", pass);
                console.log("remoteAddress:", ip);
                return pass;
            }
        }]);

        return Controllers;
    }(GenericObject);

    module.exports = Controllers;
})();