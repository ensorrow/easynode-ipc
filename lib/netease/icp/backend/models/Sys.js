'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var assert = require('assert');
var logger = using('easynode.framework.Logger').forFile(__filename);
var GenericObject = using('easynode.GenericObject');
var Model = using('easynode.framework.mvc.Model');

(function () {
  /**
   * Class Sys
   *
   * @class netease.icp.backend.models.Sys
   * @extends easynode.GenericObject
   * @since 0.1.0
   * @author allen.hu
   * */

  var Sys = function (_Model) {
    _inherits(Sys, _Model);

    /**
     * 构造函数。
     *
     * @method 构造函数
     * @since 0.1.0
     * @author allen.hu
     * */

    function Sys() {
      _classCallCheck(this, Sys);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Sys).call(this, 'sys', 'SELECT * FROM sys'));
      // 调用super()后再定义子类成员。
    }

    /**
     * 定义模型字段
     *
     * @method defineFields
     * @since 0.1.0
     * @author allen.hu
     * */


    _createClass(Sys, [{
      key: 'defineFields',
      value: function defineFields() {
        this.defineField('id', 'int').defineField('k', 'int').defineField('value', 'string');
      }
    }, {
      key: 'getClassName',
      value: function getClassName() {
        return EasyNode.namespace(__filename);
      }
    }]);

    return Sys;
  }(Model);

  module.exports = Sys;
})();