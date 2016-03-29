var assert = require('assert');
var logger = using('easynode.framework.Logger').forFile(__filename);
var GenericObject = using('easynode.GenericObject');
var md5 =  require('md5');
var fs = require('co-fs');
var f =  require('fs');
var bfs = require('babel-fs');
var archiver = require('archiver');
var _ = require('lodash');


(function () {
    /**
     * Class IspService
     *
     * @class netease.icp.backend.services.IspService
     * @extends easynode.GenericObject
     * @since 0.1.0
     * @author allen.hu
     * */
    class IspService extends GenericObject {
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




        getClassName() {
            return EasyNode.namespace(__filename);
        }
    }

    module.exports = IspService;
})();