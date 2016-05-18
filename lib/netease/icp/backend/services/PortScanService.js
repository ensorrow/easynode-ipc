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
var md5 = require('md5');
var net = require('net');
var Socket = net.Socket;

(function () {

    /**
     * Class StoreService
     *
     * @class netease.icp.backend.services.PortScanService
     * @extends easynode.GenericObject
     * @since 0.1.0
     * @author allen.hu
     * @description
     * */

    var PortScanService = function (_GenericObject) {
        _inherits(PortScanService, _GenericObject);

        /**
         * 构造函数。
         *
         * @method 构造函数
         * @since 0.1.0
         * @author allen.hu
         * */

        function PortScanService() {
            _classCallCheck(this, PortScanService);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(PortScanService).call(this));
            //调用super()后再定义子类成员。
        }

        _createClass(PortScanService, [{
            key: 'scan',
            value: function scan(host, port) {
                return new Promise(function (res, rej) {
                    var status = '';
                    var timeout = 400;
                    var error = null;
                    var connectionRefused = false;

                    var socket = new Socket();

                    // Socket connection established, port is open
                    socket.on('connect', function () {
                        status = 'open';
                        socket.destroy();
                        res({ host: host, port: port });
                    });

                    // If no response, assume port is not listening
                    socket.setTimeout(timeout);
                    socket.on('timeout', function () {
                        status = 'closed';
                        socket.destroy();
                        rej();
                    });

                    // Assuming the port is not open if an error. May need to refine based on
                    // exception
                    socket.on('error', function (exception) {
                        if (exception.code !== "ECONNREFUSED") {} else connectionRefused = true;
                        status = 'closed';
                        rej();
                    });

                    // Return after the socket has closed
                    socket.on('close', function (exception) {
                        if (exception && !connectionRefused) error = error || exception;else error = null;
                        rej();
                    });
                    socket.connect(port, host);
                });
            }
        }, {
            key: 'getClassName',
            value: function getClassName() {
                return EasyNode.namespace(__filename);
            }
        }]);

        return PortScanService;
    }(GenericObject);

    module.exports = PortScanService;
})();