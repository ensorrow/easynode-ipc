'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var assert = require('assert');
var logger = using('easynode.framework.Logger').forFile(__filename);
var GenericObject = using('easynode.GenericObject');
var md5 = require('md5');
var fs = require('co-fs');
var f = require('fs');
var bfs = require('babel-fs');
var archiver = require('archiver');
var _ = require('lodash');
var StoreService = using('netease.icp.backend.services.StoreService');

(function () {
  var LOGIN_SUCCESS = { resCode: 200, resReason: '登陆恭喜!' };
  var LOGIN_PARA_ERR = { resCode: 302, resReason: '请求体错误' };
  var LOGIN_PARA_PARSE_ERR = { resCode: 701, resReason: '参数解析错误' };
  var LOGIN_PARA_LACK_ERR = { resCode: 705, resReason: '缺少参数' };
  var LOGIN_USER_NOT_EXIST = { resCode: 1004, resReason: '用户名不存在' };
  var LOGIN_PASS_ERR = { resCode: 1005, resReason: '密码错误' };
  var LOGIN_URS_NOPASS = { resCode: 1009, resReason: 'urs认证失败' };
  var LOGIN_EMAIL_NOURL = { resCode: 1010, resReason: '该email不能以urs方式登录云平台' };
  var LOGIN_FIRST_URS_NOPASS = { resCode: 1011, resReason: '初次登录的 urs 用户在管理平台注册失败' };
  var LOGIN_USR_OR_PASS_ERROR = { resCode: 1012, resReason: 'urs用户名或者密码错误' };
  var LOGIN_SERVER_ERROR = { resCode: -1, resReason: '服务器错误' };

  // Myself result code
  var LOGIN_OK = 200;
  var LOGIN_ERR = 201;

  /**
   * Class LoginService
   *
   * @class netease.icp.backend.services.LoginService
   * @extends easynode.GenericObject
   * @since 0.1.0
   * @author allen.hu
   * */

  var LoginService = function (_GenericObject) {
    _inherits(LoginService, _GenericObject);

    /**
     * 构造函数。
     *
     * @method 构造函数
     * @since 0.1.0
     * @author allen.hu
     * */

    function LoginService(app) {
      _classCallCheck(this, LoginService);

      // 调用super()后再定义子类成员。

      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LoginService).call(this));

      _this.app = app;
      return _this;
    }

    /**
     * @method 登录处理
     * @since 0.1.0
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
     * @apiSuccess {Number} data.status 备案状态: 0-草稿,1-初审中,2-初审未通过,3-初审已通过,
     *      4-照片审核中,5-照片审核未通过,6-照片审核已通过,7-通管局审核中,8-通管局审核未通过,9-通管局审核已通过,10-未知状态
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


    _createClass(LoginService, [{
      key: 'login',
      value: function login() {
        var query = arguments.length <= 0 || arguments[0] === undefined ? { code: LOGIN_PARA_LACK_ERR.resCode } : arguments[0];

        var me = this;

        return regeneratorRuntime.mark(function _callee() {
          var user, storeService, id, recordnumber, useraddress, res;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!(query.code == LOGIN_SUCCESS.resCode)) {
                    _context.next = 30;
                    break;
                  }

                  user = {};

                  user.tenantid = query.tenantId;
                  user.status = query.status;
                  user.logintype = query.loginType;
                  // user.regin = query.regIn;
                  user.email = query.email;
                  user.username = query.userName;

                  storeService = new StoreService(me.app);
                  _context.next = 10;
                  return storeService.isFirst(user.tenantid);

                case 10:
                  id = _context.sent;
                  _context.next = 13;
                  return storeService.getRecordNumber(user.tenantid);

                case 13:
                  recordnumber = _context.sent;


                  user.recordnumber = recordnumber;
                  user.id = id;
                  _context.next = 18;
                  return storeService.getUserAddress(user.tenantid);

                case 18:
                  useraddress = _context.sent;


                  console.log('useraddress', useraddress);
                  user = Object.assign({}, user, useraddress);
                  res = Object.assign({}, { user: user }, LOGIN_SUCCESS);

                  if (!id) {
                    _context.next = 27;
                    break;
                  }

                  _context.next = 25;
                  return storeService.updateUser(Object.assign({}, user, { id: id }));

                case 25:
                  _context.next = 29;
                  break;

                case 27:
                  _context.next = 29;
                  return storeService.addUser(user);

                case 29:
                  return _context.abrupt('return', res);

                case 30:
                  return _context.abrupt('return', query.code == LOGIN_PARA_ERR.resCode ? LOGIN_PARA_ERR : query.code == LOGIN_PARA_PARSE_ERR.resCode ? LOGIN_PARA_PARSE_ERR : query.code == LOGIN_PARA_LACK_ERR.resCode ? LOGIN_PARA_LACK_ERR : query.code == LOGIN_PASS_ERR.resCode ? LOGIN_PASS_ERR : query.code == LOGIN_URS_NOPASS.resCode ? LOGIN_URS_NOPASS : query.code == LOGIN_USER_NOT_EXIST.resCode ? LOGIN_EMAIL_NOURL : query.code == LOGIN_EMAIL_NOURL.resCode ? LOGIN_URS_NOPASS : query.code == LOGIN_FIRST_URS_NOPASS.resCode ? LOGIN_FIRST_URS_NOPASS : query.code == LOGIN_USR_OR_PASS_ERROR.resCode ? LOGIN_USR_OR_PASS_ERROR : LOGIN_USR_OR_PASS_ERROR);

                case 31:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        });
      }
    }, {
      key: 'getClassName',
      value: function getClassName() {
        return EasyNode.namespace(__filename);
      }
    }]);

    return LoginService;
  }(GenericObject);

  module.exports = LoginService;
})();