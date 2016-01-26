var assert = require('assert');
var logger = using('easynode.framework.Logger').forFile(__filename);
var GenericObject = using('easynode.GenericObject');
var Model = using('easynode.framework.mvc.Model');

(function () {
    /**
     * Class Company
     *
     * @class netease.icp.backend.models.Company
     * @extends easynode.GenericObject
     * @since 0.1.0
     * @author allen.hu
     * */
    class Company extends Model {
        /**
         * 构造函数。
         *
         * @method 构造函数
         * @since 0.1.0
         * @author allen.hu
         * */
        constructor() {
            super('company', 'SELECT * FROM company')
            //调用super()后再定义子类成员。
        }

        /**
         * 定义模型字段
         *
         * @method defineFields
         * @since 0.1.0
         * @author allen.hu
         * */
        defineFields () {
            this
                .defineField('id', 'int')
                .defineField('province', 'string')
                .defineField('city', 'string')
                .defineField('area', 'string')
                .defineField('nature', 'int')
                .defineField('idtype', 'int')
                .defineField('idnumber', 'string')
                .defineField('name', 'string')
                .defineField('liveaddress', 'string')
                .defineField('commaddress', 'string')
                .defineField('owner', 'string')
                .defineField('managername', 'string')
                .defineField('manageridtype', 'int')
                .defineField('manageridnumber', 'string')
                .defineField('officephoneregion', 'string')
                .defineField('officephonenumber', 'string')
                .defineField('mobile', 'string')
                .defineField('email', 'string')
                .defineField('tenantid', 'string')
                .defineField('recordnumber', 'string')
                .defineField('updatetime', 'int')
                .defineField('createtime', 'int')
            ;
        }


        getClassName() {
            return EasyNode.namespace(__filename);
        }
    }

    module.exports = Company;
})();