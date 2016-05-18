var assert = require('assert');
var logger = using('easynode.framework.Logger').forFile(__filename);
var GenericObject = using('easynode.GenericObject');
var Model = using('easynode.framework.mvc.Model');

(function () {
    /**
     * Class Website
     *
     * @class netease.icp.backend.models.Website
     * @extends easynode.GenericObject
     * @since 0.1.0
     * @author allen.hu
     * */
    class Website extends Model {
        /**
         * 构造函数。
         *
         * @method 构造函数
         * @since 0.1.0
         * @author allen.hu
         * */
        constructor() {
            super('website', 'SELECT * FROM website')
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
                .defineField('name', 'string')
                .defineField('domain', 'string')
                .defineField('domain1', 'string')
                .defineField('domain2', 'string')
                .defineField('domain3', 'string')
                .defineField('domain4', 'string')
                .defineField('homeurl', 'string')
                .defineField('servicecontent', 'string')
                .defineField('languages', 'string')
                .defineField('ispname', 'string')
                .defineField('ip', 'string')
                .defineField('accessmethod', 'string')
                .defineField('serverregion', 'string')
                .defineField('managername', 'string')
                .defineField('manageridtype', 'int')
                .defineField('manageridnumber', 'string')
                .defineField('officephoneregion', 'string')
                .defineField('officephonenumber', 'string')
                .defineField('mobile', 'string')
                .defineField('email', 'string')
                .defineField('qq', 'string')
                .defineField('tenantid', 'string')
                .defineField('prechecktype', 'int')
                .defineField('checknumber', 'string')
                .defineField('checkfileurl', 'string')
                .defineField('remark', 'string')
                .defineField('updatetime', 'int')
                .defineField('createtime', 'int')
            ;
        }


        getClassName() {
            return EasyNode.namespace(__filename);
        }
    }

    module.exports = Website;
})();