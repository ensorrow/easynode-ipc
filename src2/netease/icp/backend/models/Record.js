'use strict';
var assert = require('assert');
var logger = using('easynode.framework.Logger').forFile(__filename);
var GenericObject = using('easynode.GenericObject');
var Model = using('easynode.framework.mvc.Model');

(function() {
    /**
     * Class Record
     *
     * @class netease.icp.backend.models.Record
     * @extends easynode.GenericObject
     * @since 0.1.0
     * @author allen.hu
     * */
  class Record extends Model {
        /**
         * 构造函数。
         *
         * @method 构造函数
         * @since 0.1.0
         * @author allen.hu
         * */
    constructor() {
      super('record', 'SELECT * FROM record');
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
                .defineField('serverregion', 'string')
                .defineField('type', 'int')
                .defineField('companyid', 'int')
                .defineField('websiteid', 'int')
                .defineField('sitemanagerurl', 'string')
                .defineField('checklisturl', 'string')
                .defineField('checkedlisturl', 'string')
                .defineField('protocolurl1', 'string')
                .defineField('protocolurl2', 'string')
                .defineField('securityurl1', 'string')
                .defineField('securityurl2', 'string')
                .defineField('curtainurl', 'string')
                .defineField('code', 'string')
                .defineField('status', 'int')
                .defineField('beianstatus', 'string')
                .defineField('tenantid', 'string')
                .defineField('reasons', 'string')
                .defineField('operatetime', 'int')
                .defineField('operator', 'string')
                .defineField('updatetime', 'int')
                .defineField('createtime', 'int')
            ;
    }


    getClassName() {
      return EasyNode.namespace(__filename);
    }
    }

  module.exports = Record;
})();

