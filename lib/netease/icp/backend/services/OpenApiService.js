/*
author: hujb2000
Reference:[OpenApi](https://c.163.com/wiki/index.php?title=OpenAPI%E4%BB%8B%E7%BB%8D)
APP key: daaf3fdb307f4a38844211325116b72c
APP Secret: bc12d62d47344a31b3c21a8693e2498d
*/
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _co = require('co');

var _co2 = _interopRequireDefault(_co);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var assert = require('assert');
var logger = using('easynode.framework.Logger').forFile(__filename);
var GenericObject = using('easynode.GenericObject');
var _ = require('lodash');
var soap = require('icp-node-soap');
var utils = require('utility');

(function () {

  var HASHALGORITHM = 0; // 0-MD5
  var ENCRYPTALGORITHM = 0; // 0-不加密 1-AES加密算法，加密模式使用CBC模式，补码方式采用PKCS5Padding，密钥偏移量由部级系统、省局系统生成的字符串，如“0102030405060708”。
  var COMPRESSIONFORMAT = 0; // 0-zip压缩格式

  var map = new Map([[40001, 'Invalid parameters.'], [40002, 'Missing parameters.'], [40101, 'Unauthorized user.'], [40301, 'Api freq out of limit.'], [40302, 'Container quota insufficient.'], [40303, 'Ip quota insufficient.'], [40304, 'App quota insufficient.'], [40305, 'Replication quota insufficient.'], [40306, 'Nlb quota insufficient.'], [40307, 'Image quota insufficient.'], [40308, 'Tag quota insufficient.'], [40309, 'User status abnormal.'], [40310, 'Container status abnormal.'], [40311, 'App status abnormal.'], [40312, 'Image status abnormal.'], [40313, 'Secret key count limit.'], [40401, 'No such user.'], [40402, 'No such container.'], [40403, 'No such app.'], [40404, 'No such repository.'], [40405, 'No such secret key.'], [40406, 'No such api.'], [40501, 'Http method not allowed.'], [40901, 'Duplicate container name.'], [40902, 'Duplicate replication size.'], [40903, 'Duplicate app name.'], [40904, 'Duplicate secret key name.'], [40905, 'Duplicate repository name.'], [41501, 'Unsupported media type.'], [42201, 'Unprocessable entity.'], [50001, 'Create container error.'], [50002, 'Delete container error.'], [50003, 'Create app error.'], [50004, 'Delete app error.'], [50005, 'Create secret key error.'], [50006, 'Delete secret key error.'], [50007, 'Nce internal server error']]);

  /**
   * Class OpenApiService
   *
   * @class netease.icp.backend.services.OpenApiService
   * @extends easynode.GenericObject
   * @since 0.1.0
   * @author allen.hu
   * */

  var OpenApiService = function (_GenericObject) {
    _inherits(OpenApiService, _GenericObject);

    /**
     * 构造函数。
     *
     * @method 构造函数
     * @since 0.1.0
     * @author allen.hu
     * */

    function OpenApiService(app) {
      var config = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      _classCallCheck(this, OpenApiService);

      // 调用super()后再定义子类成员。

      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(OpenApiService).call(this));

      _this.app = app;

      return _this;
    }

    _createClass(OpenApiService, [{
      key: 'getClassName',
      value: function getClassName() {
        return EasyNode.namespace(__filename);
      }
    }]);

    return OpenApiService;
  }(GenericObject);

  module.exports = OpenApiService;
})();