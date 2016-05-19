"use strict";
var assert = require('assert');
var logger = using('easynode.framework.Logger').forFile(__filename);
var GenericObject = using('easynode.GenericObject');
import child_process from 'child_process';

(function () {


    /**
     * Class PackageUpgradeService
     *
     * @class netease.icp.backend.services.PackageUpgradeService
     * @extends easynode.GenericObject
     * @since 0.1.0
     * @author allen.hu
     * @description
     * */
    class PackageUpgradeService extends GenericObject {
        /**
         * 构造函数。
         *
         * @method 构造函数
         * @since 0.1.0
         * @author allen.hu
         * */
        constructor() {
            super();
            //调用super()后再定义子类成员。
        }

        exec(command){
            console.log(command);
            return new Promise((resolve, reject) => {
                child_process.exec.call(null, command, (err, stdout, stderr) => {
                    if(err){
                        reject(stderr);
                    }else{
                        resolve(stdout);
                    }
                });
            });
        }


        getClassName() {
            return EasyNode.namespace(__filename);
        }


    }

    module.exports = PackageUpgradeService;
})();

