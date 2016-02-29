var assert = require('assert');
var logger = using('easynode.framework.Logger').forFile(__filename);
var GenericObject = using('easynode.GenericObject');
var md5 =  require('md5');
var fs = require('co-fs');
var f =  require('fs');
var bfs = require('babel-fs');
var archiver = require('archiver');
var _ = require('lodash');
var StoreService = using('netease.icp.backend.services.StoreService');

(function () {
    const LOGIN_SUCCESS = { resCode:200, resReason: "登陆恭喜!" };
    const LOGIN_PARA_ERR = { resCode: 302, resReason: "请求体错误" };
    const LOGIN_PARA_PARSE_ERR = { resCode: 701, resReason: "参数解析错误" };
    const LOGIN_PARA_LACK_ERR = { resCode: 705, resReason: "缺少参数" };
    const LOGIN_USER_NOT_EXIST = { resCode: 1004, resReason: "用户名不存在" };
    const LOGIN_PASS_ERR = { resCode: 1005, resReason: "密码错误" };
    const LOGIN_URS_NOPASS = { resCode: 1009, resReason: "urs认证失败" };
    const LOGIN_EMAIL_NOURL = { resCode: 1010, resReason: "该email不能以urs方式登录云平台" };
    const LOGIN_FIRST_URS_NOPASS = { resCode: 1011, resReason: "初次登录的 urs 用户在管理平台注册失败" };
    const LOGIN_USR_OR_PASS_ERROR = { resCode: 1012, resReason: "urs用户名或者密码错误"};
    const LOGIN_SERVER_ERROR = { resCode: -1, resReason: "服务器错误"};

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
            //调用super()后再定义子类成员。
            this.app = app;
        }


        login(query = {code: LOGIN_PARA_LACK_ERR.resCode}) {
            var me = this;
            return function * (){

                if (query.code == LOGIN_SUCCESS.resCode) {
                    var user = {};
                    user.tenantid = query.tenantId;
                    user.status = query.status;
                    user.logintype = query.loginType;
                    //user.regin = query.regIn;
                    user.email = query.email;
                    user.username = query.userName;


                    var storeService = new StoreService(me.app);

                    var id = yield  storeService.isFirst(user.tenantid);
                    console.log("iiiiiiiii",id);

                    var recordnumber = yield storeService.getRecordNumber(user.tenantid);
                    user.recordnumber = recordnumber;
                    user.id = id;
                    var useraddress = yield storeService.getUserAddress(user.tenantid);
                    console.log("useraddress", useraddress);
                    user = Object.assign({},user,useraddress);
                    var res = Object.assign({},{user:user},LOGIN_SUCCESS);


                    id ? yield  storeService.updateUser(Object.assign({},user,{id:id})) : yield  storeService.addUser(user);
                    return res;
                } else {
                     return query.code ==  LOGIN_PARA_ERR.resCode ? LOGIN_PARA_ERR :
                            query.code ==  LOGIN_PARA_PARSE_ERR.resCode ? LOGIN_PARA_PARSE_ERR :
                            query.code ==  LOGIN_PARA_LACK_ERR.resCode ? LOGIN_PARA_LACK_ERR :
                            query.code ==  LOGIN_PASS_ERR.resCode ? LOGIN_PASS_ERR :
                            query.code ==  LOGIN_URS_NOPASS.resCode ? LOGIN_URS_NOPASS :
                            query.code ==  LOGIN_USER_NOT_EXIST.resCode ? LOGIN_EMAIL_NOURL :
                            query.code ==  LOGIN_EMAIL_NOURL.resCode ? LOGIN_URS_NOPASS :
                            query.code ==  LOGIN_FIRST_URS_NOPASS.resCode ? LOGIN_FIRST_URS_NOPASS :
                            query.code ==  LOGIN_USR_OR_PASS_ERROR.resCode ? LOGIN_USR_OR_PASS_ERROR : LOGIN_USR_OR_PASS_ERROR;
                }
            }
        }

        getClassName() {
            return EasyNode.namespace(__filename);
        }
    }

    module.exports = LoginService;
})();