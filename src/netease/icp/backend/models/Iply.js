'use strict';
var assert = require('assert');
var logger = using('easynode.framework.Logger').forFile(__filename);
var GenericObject = using('easynode.GenericObject');
var Model = using('easynode.framework.mvc.Model');

(function () {
    /**
     * Class Company
     *
     * @class netease.icp.backend.models.Iply
     * @extends easynode.GenericObject
     * @since 0.1.0
     * @author allen.hu
     * */
    class Iply extends Model {
        /**
         * 构造函数。
         *
         * @method 构造函数
         * @since 0.1.0
         * @author allen.hu
         * */
        constructor () {
            super('iply', 'SELECT * FROM iply');
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
                .defineField('qsip', 'int')
                .defineField('zzip', 'int')
                .defineField('lydw', 'int')
                .defineField('bz', 'string')
                .defineField('area', 'string')
                .defineField('net', 'string')
                .defineField('status', 'int')
            ;
        }


        getClassName () {
            return EasyNode.namespace(__filename);
        }
    }

    module.exports = Iply;
})();

