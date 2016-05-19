'use strict';
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
    class PortScanService extends GenericObject {
        /**
         * 构造函数。
         *
         * @method 构造函数
         * @since 0.1.0
         * @author allen.hu
         * */
        constructor () {
            super();
            //调用super()后再定义子类成员。
        }

        scan (host, port) {
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
                    res({host : host, port : port});
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
                    if (exception.code === 'ECONNREFUSED') {
                        connectionRefused = true;
                    } else {
                        connectionRefused = false;
                    }
                    status = 'closed';
                    rej();
                });

                // Return after the socket has closed
                socket.on('close', function (exception) {
                    if (exception && !connectionRefused) {
                        error = error || exception;
                    } else {
                        error = null;
                    }
                    rej();
                });
                socket.connect( port, host );
            });
        }

        getClassName () {
            return EasyNode.namespace(__filename);
        }

    }

    module.exports = PortScanService;
})();

