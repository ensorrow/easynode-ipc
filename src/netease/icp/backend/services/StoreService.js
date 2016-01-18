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

        getClassName() {
            return EasyNode.namespace(__filename);
        }
    }

    module.exports = StoreService;
})();