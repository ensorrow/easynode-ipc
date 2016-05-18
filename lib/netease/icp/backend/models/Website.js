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
     * Class Website
     *
     * @class netease.icp.backend.models.Website
     * @extends easynode.GenericObject
     * @since 0.1.0
     * @author allen.hu
     * */

    var Website = function (_Model) {
        _inherits(Website, _Model);

        /**
         * 构造函数。
         *
         * @method 构造函数
         * @since 0.1.0
         * @author allen.hu
         * */

        function Website() {
            _classCallCheck(this, Website);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(Website).call(this, 'website', 'SELECT * FROM website'));
            //调用super()后再定义子类成员。
        }

        /**
         * 定义模型字段
         *
         * @method defineFields
         * @since 0.1.0
         * @author allen.hu
         * */


        _createClass(Website, [{
            key: 'defineFields',
            value: function defineFields() {
                this.defineField('id', 'int').defineField('name', 'string').defineField('domain', 'string').defineField('domain1', 'string').defineField('domain2', 'string').defineField('domain3', 'string').defineField('domain4', 'string').defineField('homeurl', 'string').defineField('servicecontent', 'string').defineField('languages', 'string').defineField('ispname', 'string').defineField('ip', 'string').defineField('accessmethod', 'string').defineField('serverregion', 'string').defineField('managername', 'string').defineField('manageridtype', 'int').defineField('manageridnumber', 'string').defineField('officephoneregion', 'string').defineField('officephonenumber', 'string').defineField('mobile', 'string').defineField('email', 'string').defineField('qq', 'string').defineField('tenantid', 'string').defineField('prechecktype', 'int').defineField('checknumber', 'string').defineField('checkfileurl', 'string').defineField('remark', 'string').defineField('updatetime', 'int').defineField('createtime', 'int');
            }
        }, {
            key: 'getClassName',
            value: function getClassName() {
                return EasyNode.namespace(__filename);
            }
        }]);

        return Website;
    }(Model);

    module.exports = Website;
})();