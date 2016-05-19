'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var assert = require('assert');
var logger = using('easynode.framework.Logger').forFile(__filename);
var GenericObject = using('easynode.GenericObject');


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

    var PackageUpgradeService = function (_GenericObject) {
        _inherits(PackageUpgradeService, _GenericObject);

        /**
         * 构造函数。
         *
         * @method 构造函数
         * @since 0.1.0
         * @author allen.hu
         * */

        function PackageUpgradeService() {
            _classCallCheck(this, PackageUpgradeService);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(PackageUpgradeService).call(this));
            //调用super()后再定义子类成员。
        }

        _createClass(PackageUpgradeService, [{
            key: 'exec',
            value: function exec(command) {
                console.log(command);
                return new Promise(function (resolve, reject) {
                    _child_process2.default.exec.call(null, command, function (err, stdout, stderr) {
                        if (err) {
                            reject(stderr);
                        } else {
                            resolve(stdout);
                        }
                    });
                });
            }
        }, {
            key: 'getClassName',
            value: function getClassName() {
                return EasyNode.namespace(__filename);
            }
        }]);

        return PackageUpgradeService;
    }(GenericObject);

    module.exports = PackageUpgradeService;
})();