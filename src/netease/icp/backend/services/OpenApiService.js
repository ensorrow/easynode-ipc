/*
author: hujb2000
Reference:[OpenApi](https://c.163.com/wiki/index.php?title=OpenAPI%E4%BB%8B%E7%BB%8D)
APP key: daaf3fdb307f4a38844211325116b72c
APP Secret: bc12d62d47344a31b3c21a8693e2498d
*/
'use strict';
import co from 'co';
var assert = require('assert');
var logger = using('easynode.framework.Logger').forFile(__filename);
var GenericObject = using('easynode.GenericObject');
var _ = require('lodash');
var soap = require('icp-node-soap');
var utils = require('utility');

(function() {

  const HASHALGORITHM = 0; // 0-MD5
  const ENCRYPTALGORITHM = 0;// 0-不加密 1-AES加密算法，加密模式使用CBC模式，补码方式采用PKCS5Padding，密钥偏移量由部级系统、省局系统生成的字符串，如“0102030405060708”。
  const COMPRESSIONFORMAT = 0; // 0-zip压缩格式

  var map = new Map([
        [40001, 'Invalid parameters.'],
        [40002, 'Missing parameters.'],
        [40101, 'Unauthorized user.'],
        [40301, 'Api freq out of limit.'],
        [40302, 'Container quota insufficient.'],
        [40303, 'Ip quota insufficient.'],
        [40304, 'App quota insufficient.'],
        [40305, 'Replication quota insufficient.'],
        [40306, 'Nlb quota insufficient.'],
        [40307, 'Image quota insufficient.'],
        [40308, 'Tag quota insufficient.'],
        [40309, 'User status abnormal.'],
        [40310, 'Container status abnormal.'],
        [40311, 'App status abnormal.'],
        [40312, 'Image status abnormal.'],
        [40313, 'Secret key count limit.'],
        [40401, 'No such user.'],
        [40402, 'No such container.'],
        [40403, 'No such app.'],
        [40404, 'No such repository.'],
        [40405, 'No such secret key.'],
        [40406, 'No such api.'],
        [40501, 'Http method not allowed.'],
        [40901, 'Duplicate container name.'],
        [40902, 'Duplicate replication size.'],
        [40903, 'Duplicate app name.'],
        [40904, 'Duplicate secret key name.'],
        [40905, 'Duplicate repository name.'],
        [41501, 'Unsupported media type.'],
        [42201, 'Unprocessable entity.'],
        [50001, 'Create container error.'],
        [50002, 'Delete container error.'],
        [50003, 'Create app error.'],
        [50004, 'Delete app error.'],
        [50005, 'Create secret key error.'],
        [50006, 'Delete secret key error.'],
        [50007, 'Nce internal server error']
  ]);

    /**
     * Class OpenApiService
     *
     * @class netease.icp.backend.services.OpenApiService
     * @extends easynode.GenericObject
     * @since 0.1.0
     * @author allen.hu
     * */
  class OpenApiService extends GenericObject {
        /**
         * 构造函数。
         *
         * @method 构造函数
         * @since 0.1.0
         * @author allen.hu
         * */
    constructor(app, config = {}) {
      super();
            // 调用super()后再定义子类成员。
      this.app = app;

    }


    getClassName() {
      return EasyNode.namespace(__filename);
    }
    }

  module.exports = OpenApiService;
})();

