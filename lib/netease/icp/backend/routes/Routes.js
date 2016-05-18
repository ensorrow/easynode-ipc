'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Controllers = require('../controllers/Controllers');

var _Controllers2 = _interopRequireDefault(_Controllers);

var _koaBody = require('koa-body');

var _koaBody2 = _interopRequireDefault(_koaBody);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var assert = require('assert');
var logger = using('easynode.framework.Logger').forFile(__filename);
var GenericObject = using('easynode.GenericObject');
var S = require('string');
var thunkify = require('thunkify');

(function () {
    /**
     * Class Routes
     *
     * @class netease.icp.routes.Routes
     * @extends easynode.GenericObject
     * @since 0.1.0
     * @author allen.hu
     * */

    var Routes = function (_GenericObject) {
        _inherits(Routes, _GenericObject);

        /**
         * 构造函数。
         *
         * @method 构造函数
         * @since 0.1.0
         * @author allen.hu
         * */

        function Routes() {
            _classCallCheck(this, Routes);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(Routes).call(this));
            //调用super()后再定义子类成员。
        }

        _createClass(Routes, [{
            key: 'getClassName',
            value: function getClassName() {
                return EasyNode.namespace(__filename);
            }
        }], [{
            key: 'defineRoutes',
            value: function defineRoutes(httpServer) {
                Routes.addRoute(httpServer);

                httpServer.addMiddleware((0, _koaBody2.default)());
                httpServer.addWebDirs('plugins');
                httpServer.addWebDirs('plugins/build');
                httpServer.addWebDirs('plugins/assets');
                httpServer.addTemplateDirs('plugins/views');
            }
        }, {
            key: 'addRoute',
            value: function addRoute(httpServer) {
                httpServer.addRoute('get', '/', _Controllers2.default.home(httpServer));
                httpServer.addRoute('post', '/api/comments.json', _Controllers2.default.comment(httpServer));
                httpServer.addRoute('get', '/login/callback', _Controllers2.default.loginCallback(httpServer));
                httpServer.addRoute('get', '/logout', _Controllers2.default.logout(httpServer));
                httpServer.addRoute('post', '/upl', _Controllers2.default.upload(httpServer));
                httpServer.addRoute('post', '/upl2', _Controllers2.default.upload2(httpServer));
                httpServer.addRoute('post', '/records', _Controllers2.default.createRecord(httpServer));
                httpServer.addRoute('post', '/savedraft', _Controllers2.default.savedraft(httpServer));
                httpServer.addRoute('post', '/delrecord', _Controllers2.default.deleteRecord(httpServer));
                httpServer.addRoute('get', '/records', _Controllers2.default.getRecords(httpServer));
                httpServer.addRoute('get', '/record', _Controllers2.default.getRecord(httpServer));
                httpServer.addRoute('put', '/record', _Controllers2.default.putRecord(httpServer));
                httpServer.addRoute('put', '/user', _Controllers2.default.putUser(httpServer));
                httpServer.addRoute('get', '/pubips', _Controllers2.default.getPubips(httpServer));

                //to op(whitelist)
                httpServer.addRoute('put', '/admin/curtain', _Controllers2.default.putCurtainb(httpServer));
                httpServer.addRoute('get', '/admin/curtains', _Controllers2.default.getCurtainsb(httpServer));
                httpServer.addRoute('get', '/admin/curtains2', _Controllers2.default.getCurtainsb2(httpServer));
                httpServer.addRoute('get', '/admin/records', _Controllers2.default.getRecordsb(httpServer));
                httpServer.addRoute('post', '/admin/recordsbystatus', _Controllers2.default.getRecordsbByStatus(httpServer));
                httpServer.addRoute('get', '/admin/record', _Controllers2.default.getRecordb(httpServer));
                httpServer.addRoute('put', '/admin/record', _Controllers2.default.putRecordb(httpServer));
                httpServer.addRoute('put', '/admin/company', _Controllers2.default.putCompanyb(httpServer));
                httpServer.addRoute('put', '/admin/website', _Controllers2.default.putWebsiteb(httpServer));

                httpServer.addRoute('put', '/admin/rest/sys', _Controllers2.default.putSys(httpServer));
                httpServer.addRoute('get', '/admin/rest/sys', _Controllers2.default.getSys(httpServer));

                httpServer.addRoute('get', '/admin/icp/verifybamm', _Controllers2.default.checkBamm(httpServer));
                httpServer.addRoute('get', '/admin/icp/querybeianstatus', _Controllers2.default.querybeianstatus(httpServer));

                httpServer.addRoute('post', '/admin/ip/iply', _Controllers2.default.createIply(httpServer));
                httpServer.addRoute('post', '/admin/area/', _Controllers2.default.createArea(httpServer));

                httpServer.addRoute('post', '/admin/resources', _Controllers2.default.createResources(httpServer));
            }
        }]);

        return Routes;
    }(GenericObject);

    module.exports = Routes;
})();