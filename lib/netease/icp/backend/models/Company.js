'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

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

    var Company = function (_Model) {
        _inherits(Company, _Model);

        /**
         * 构造函数。
         *
         * @method 构造函数
         * @since 0.1.0
         * @author allen.hu
         * */

        function Company() {
            _classCallCheck(this, Company);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(Company).call(this, 'company', 'SELECT * FROM company'));
            //调用super()后再定义子类成员。
        }

        /**
         * 定义模型字段
         *
         * @method defineFields
         * @since 0.1.0
         * @author allen.hu
         * */

        _createClass(Company, [{
            key: 'defineFields',
            value: function defineFields() {
                this.defineField('id', 'int').defineField('province', 'string').defineField('city', 'string').defineField('area', 'string').defineField('nature', 'int').defineField('idtype', 'int').defineField('idnumber', 'string').defineField('name', 'string').defineField('liveaddress', 'string').defineField('commaddress', 'string').defineField('owner', 'string').defineField('managername', 'string').defineField('manageridtype', 'int').defineField('manageridnumber', 'string').defineField('manageraddress', 'string').defineField('officephoneregion', 'string').defineField('officephonenumber', 'string').defineField('mobile', 'string').defineField('email', 'string').defineField('tenantid', 'string').defineField('recordnumber', 'string').defineField('recordpassword', 'string').defineField('updatetime', 'int').defineField('createtime', 'int');
            }
        }, {
            key: 'getClassName',
            value: function getClassName() {
                return EasyNode.namespace(__filename);
            }
        }]);

        return Company;
    }(Model);

    module.exports = Company;
})();