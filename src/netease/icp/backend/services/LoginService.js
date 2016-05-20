'use strict';
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

(function() {
  const LOGIN_SUCCESS = {resCode:200, resReason: '登陆恭喜!'};
  const LOGIN_PARA_ERR = {resCode: 302, resReason: '请求体错误'};
  const LOGIN_PARA_PARSE_ERR = {resCode: 701, resReason: '参数解析错误'};
  const LOGIN_PARA_LACK_ERR = {resCode: 705, resReason: '缺少参数'};
  const LOGIN_USER_NOT_EXIST = {resCode: 1004, resReason: '用户名不存在'};
  const LOGIN_PASS_ERR = {resCode: 1005, resReason: '密码错误'};
  const LOGIN_URS_NOPASS = {resCode: 1009, resReason: 'urs认证失败'};
  const LOGIN_EMAIL_NOURL = {resCode: 1010, resReason: '该email不能以urs方式登录云平台'};
  const LOGIN_FIRST_URS_NOPASS = {resCode: 1011, resReason: '初次登录的 urs 用户在管理平台注册失败'};
  const LOGIN_USR_OR_PASS_ERROR = {resCode: 1012, resReason: 'urs用户名或者密码错误'};
  const LOGIN_SERVER_ERROR = {resCode: -1, resReason: '服务器错误'};

    // Myself result code
  const LOGIN_OK = 200;
  const LOGIN_ERR = 201;

    /**
     * Class LoginService
     *
     * @class netease.icp.backend.services.LoginService
     * @extends easynode.GenericObject
     * @since 0.1.0
     * @author allen.hu
     * */
  class LoginService extends GenericObject {
        /**
         * 构造函数。
         *
         * @method 构造函数
         * @since 0.1.0
         * @author allen.hu
         * */
    constructor(app) {
      super();
            // 调用super()后再定义子类成员。
      this.app = app;
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
    login(query = {code: LOGIN_PARA_LACK_ERR.resCode}) {
      var me = this;

      return function *() {

        if (query.code == LOGIN_SUCCESS.resCode) {
          var user = {};
          user.tenantid = query.tenantId;
          user.status = query.status;
          user.logintype = query.loginType;
                    // user.regin = query.regIn;
          user.email = query.email;
          user.username = query.userName;


          var storeService = new StoreService(me.app);
          var id = yield storeService.isFirst(user.tenantid);
          var recordnumber = yield storeService.getRecordNumber(user.tenantid);

          user.recordnumber = recordnumber;
          user.id = id;
          var useraddress = yield storeService.getUserAddress(user.tenantid);

          user = Object.assign({}, user, useraddress);
          var res = Object.assign({}, {user:user}, LOGIN_SUCCESS);

          id ? yield storeService.updateUser(Object.assign({}, user, {id:id})) : yield storeService.addUser(user);
          return res;
        }

        return query.code == LOGIN_PARA_ERR.resCode ? LOGIN_PARA_ERR :
                    query.code == LOGIN_PARA_PARSE_ERR.resCode ? LOGIN_PARA_PARSE_ERR :
                    query.code == LOGIN_PARA_LACK_ERR.resCode ? LOGIN_PARA_LACK_ERR :
                    query.code == LOGIN_PASS_ERR.resCode ? LOGIN_PASS_ERR :
                    query.code == LOGIN_URS_NOPASS.resCode ? LOGIN_URS_NOPASS :
                    query.code == LOGIN_USER_NOT_EXIST.resCode ? LOGIN_EMAIL_NOURL :
                    query.code == LOGIN_EMAIL_NOURL.resCode ? LOGIN_URS_NOPASS :
                    query.code == LOGIN_FIRST_URS_NOPASS.resCode ? LOGIN_FIRST_URS_NOPASS :
                    query.code == LOGIN_USR_OR_PASS_ERROR.resCode ? LOGIN_USR_OR_PASS_ERROR : LOGIN_USR_OR_PASS_ERROR;

      };
    }

    getClassName() {
      return EasyNode.namespace(__filename);
    }
    }

  module.exports = LoginService;
})();

