'use strict';
var assert = require('assert');
var logger = using('easynode.framework.Logger').forFile(__filename);
var GenericObject = using('easynode.GenericObject');
var Model = using('easynode.framework.mvc.Model');

(function() {
    /**
     * Class User
     *
     * @class netease.icp.backend.models.User
     * @extends easynode.GenericObject
     * @since 0.1.0
     * @author allen.hu
     * */
  class User extends Model {
        /**
         * 构造函数。
         *
         * @method 构造函数
         * @since 0.1.0
         * @author allen.hu
         * */
    constructor() {
      super('user', 'SELECT * FROM user');
            // 调用super()后再定义子类成员。
    }

        /**
         * 定义模型字段
         *
         * @method defineFields
         * @since 0.1.0
         * @author allen.hu
         * */
    defineFields() {
      this
                .defineField('id', 'int')
                .defineField('tenantid', 'string')
                .defineField('logintype', 'int')
                .defineField('status', 'int')
                .defineField('email', 'string')
                .defineField('username', 'string')
                .defineField('recordnumber', 'int')
                .defineField('mailingaddress', 'string')
                .defineField('recipient', 'string')
                .defineField('recipientmobile', 'string')
                .defineField('companyname', 'string')
                .defineField('applycurtainstatus', 'int')
                .defineField('operatetime', 'int')
                .defineField('operator', 'string')
                .defineField('lastlogintime', 'int')
                .defineField('createtime', 'int')
            ;
    }


    getClassName() {
      return EasyNode.namespace(__filename);
    }
    }

  module.exports = User;
})();

