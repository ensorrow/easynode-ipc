"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _define = require('../../../../../public/netease/icp/constant/define');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var assert = require('assert');
var logger = using('easynode.framework.Logger').forFile(__filename);
var GenericObject = using('easynode.GenericObject');
var md5 = require('md5');
var fs = require('co-fs');
var f = require('fs');
var bfs = require('babel-fs');
var archiver = require('archiver');
var _ = require('lodash');
var User = using('netease.icp.backend.models.User');
var Company = using('netease.icp.backend.models.Company');
var Website = using('netease.icp.backend.models.Website');
var Record = using('netease.icp.backend.models.Record');
var Iply = using('netease.icp.backend.models.Iply');
var Area = using('netease.icp.backend.models.Area');
var Sys = using('netease.icp.backend.models.Sys');
console.log(Sys);
var Nos = require('nenos');
var utils = require('utility');
var SqlUtil = using('easynode.framework.util.SqlUtil');
//import request from 'superagent';


(function () {

    var FILTER_CONDITION_ALL = 0;
    var FILTER_CONDITION_WAITED = 1;
    var FILTER_CONDITION_PASSED = 2;
    var FILTER_CONDITION_NOPASS = 3;

    /**
     * Class StoreService
     *
     * @class netease.icp.backend.services.StoreService
     * @extends easynode.GenericObject
     * @since 0.1.0
     * @author allen.hu
     * @description
     * */

    var StoreService = function (_GenericObject) {
        _inherits(StoreService, _GenericObject);

        /**
         * 构造函数。
         *
         * @method 构造函数
         * @since 0.1.0
         * @author allen.hu
         * */

        function StoreService(app) {
            var config = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

            _classCallCheck(this, StoreService);

            //调用super()后再定义子类成员。

            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(StoreService).call(this));

            _this.app = app;
            _this.tenantpubips = config.tenantpubips;
            return _this;
        }

        _createClass(StoreService, [{
            key: 'isFirst',
            value: function isFirst(tenantId) {
                var me = this;
                return regeneratorRuntime.mark(function _callee() {
                    var sql, args, arr, conn, id;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    sql = '';

                                    sql = 'SELECT id FROM user WHERE tenantid = #tenantid#';
                                    args = { tenantid: tenantId };
                                    arr = [];
                                    conn = null;
                                    id = 0;
                                    _context.prev = 6;
                                    _context.next = 9;
                                    return me.app.ds.getConnection();

                                case 9:
                                    conn = _context.sent;
                                    _context.next = 12;
                                    return conn.execQuery(sql, args);

                                case 12:
                                    arr = _context.sent;

                                    id = arr.length > 0 ? arr[0].id : id;
                                    _context.next = 19;
                                    break;

                                case 16:
                                    _context.prev = 16;
                                    _context.t0 = _context['catch'](6);

                                    EasyNode.DEBUG && logger.debug(' ' + _context.t0 + ',' + _context.t0.stack);

                                case 19:
                                    _context.prev = 19;
                                    _context.next = 22;
                                    return me.app.ds.releaseConnection(conn);

                                case 22:
                                    return _context.abrupt('return', id);

                                case 24:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, this, [[6, 16, 19, 24]]);
                });
            }
        }, {
            key: 'getUserAddress',
            value: function getUserAddress(tenantId) {
                var me = this;
                return regeneratorRuntime.mark(function _callee2() {
                    var sql, args, empty, arr, conn;
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    sql = '';

                                    sql = 'SELECT mailingaddress,recipient,recipientmobile,companyname,applycurtainstatus FROM user WHERE tenantid = #tenantid#';
                                    args = { tenantid: tenantId };
                                    empty = { mailingaddress: '', recipient: '', recipientmobile: '', companyname: '', applycurtainstatus: 0 };
                                    arr = [];
                                    conn = null;
                                    _context2.prev = 6;
                                    _context2.next = 9;
                                    return me.app.ds.getConnection();

                                case 9:
                                    conn = _context2.sent;
                                    _context2.next = 12;
                                    return conn.execQuery(sql, args);

                                case 12:
                                    arr = _context2.sent;
                                    _context2.next = 18;
                                    break;

                                case 15:
                                    _context2.prev = 15;
                                    _context2.t0 = _context2['catch'](6);

                                    EasyNode.DEBUG && logger.debug(' ' + _context2.t0 + ',' + _context2.t0.stack);

                                case 18:
                                    _context2.prev = 18;
                                    _context2.next = 21;
                                    return me.app.ds.releaseConnection(conn);

                                case 21:
                                    return _context2.abrupt('return', arr.length > 0 ? arr[0] : empty);

                                case 23:
                                case 'end':
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, this, [[6, 15, 18, 23]]);
                });
            }
        }, {
            key: 'getRecordNumber',
            value: function getRecordNumber(tenantId) {
                var me = this;
                return regeneratorRuntime.mark(function _callee3() {
                    var sql, args, arr, conn, id;
                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
                        while (1) {
                            switch (_context3.prev = _context3.next) {
                                case 0:
                                    sql = '';

                                    sql = 'SELECT id FROM record WHERE tenantid = #tenantid#';
                                    args = { tenantid: tenantId };
                                    arr = [];
                                    conn = null;
                                    id = 0;
                                    _context3.prev = 6;
                                    _context3.next = 9;
                                    return me.app.ds.getConnection();

                                case 9:
                                    conn = _context3.sent;
                                    _context3.next = 12;
                                    return conn.execQuery(sql, args);

                                case 12:
                                    arr = _context3.sent;
                                    _context3.next = 18;
                                    break;

                                case 15:
                                    _context3.prev = 15;
                                    _context3.t0 = _context3['catch'](6);

                                    EasyNode.DEBUG && logger.debug(' ' + _context3.t0 + ',' + _context3.t0.stack);

                                case 18:
                                    _context3.prev = 18;
                                    _context3.next = 21;
                                    return me.app.ds.releaseConnection(conn);

                                case 21:
                                    return _context3.abrupt('return', arr.length);

                                case 23:
                                case 'end':
                                    return _context3.stop();
                            }
                        }
                    }, _callee3, this, [[6, 15, 18, 23]]);
                });
            }
        }, {
            key: 'addUser',
            value: function addUser(user) {
                var me = this;
                return regeneratorRuntime.mark(function _callee4() {
                    var conn, model, id, r;
                    return regeneratorRuntime.wrap(function _callee4$(_context4) {
                        while (1) {
                            switch (_context4.prev = _context4.next) {
                                case 0:
                                    conn = null;
                                    model = new User();

                                    model.merge(Object.assign({}, user));
                                    model.merge({ lastlogintime: Date.now(), createtime: Date.now() });
                                    id = 0;
                                    _context4.prev = 5;
                                    _context4.next = 8;
                                    return me.app.ds.getConnection();

                                case 8:
                                    conn = _context4.sent;
                                    _context4.next = 11;
                                    return conn.create(model);

                                case 11:
                                    r = _context4.sent;

                                    id = r.insertId;
                                    _context4.next = 18;
                                    break;

                                case 15:
                                    _context4.prev = 15;
                                    _context4.t0 = _context4['catch'](5);

                                    EasyNode.DEBUG && logger.debug(' ' + _context4.t0 + ',' + _context4.t0.stack);

                                case 18:
                                    _context4.prev = 18;
                                    _context4.next = 21;
                                    return me.app.ds.releaseConnection(conn);

                                case 21:
                                    return _context4.abrupt('return', { insertId: id });

                                case 23:
                                case 'end':
                                    return _context4.stop();
                            }
                        }
                    }, _callee4, this, [[5, 15, 18, 23]]);
                });
            }
        }, {
            key: 'updateUser',
            value: function updateUser(user) {
                var me = this;
                return regeneratorRuntime.mark(function _callee5() {
                    var conn, model, id, r;
                    return regeneratorRuntime.wrap(function _callee5$(_context5) {
                        while (1) {
                            switch (_context5.prev = _context5.next) {
                                case 0:
                                    conn = null;
                                    model = new User();


                                    model.merge(Object.assign({}, user));
                                    model.merge({ lastlogintime: Date.now() });
                                    id = 0;
                                    _context5.prev = 5;
                                    _context5.next = 8;
                                    return me.app.ds.getConnection();

                                case 8:
                                    conn = _context5.sent;
                                    _context5.next = 11;
                                    return conn.update(model);

                                case 11:
                                    r = _context5.sent;
                                    _context5.next = 17;
                                    break;

                                case 14:
                                    _context5.prev = 14;
                                    _context5.t0 = _context5['catch'](5);

                                    EasyNode.DEBUG && logger.debug(' ' + _context5.t0 + ',' + _context5.t0.stack);

                                case 17:
                                    _context5.prev = 17;
                                    _context5.next = 20;
                                    return me.app.ds.releaseConnection(conn);

                                case 20:
                                    return _context5.abrupt('return', { insertId: id });

                                case 22:
                                case 'end':
                                    return _context5.stop();
                            }
                        }
                    }, _callee5, this, [[5, 14, 17, 22]]);
                });
            }
        }, {
            key: 'createRecord',
            //useless
            value: function createRecord() {
                var me = this;
                return regeneratorRuntime.mark(function _callee6() {
                    var id, model, companyid, websiteid, r, conn, code, tenantid, formData, data;
                    return regeneratorRuntime.wrap(function _callee6$(_context6) {
                        while (1) {
                            switch (_context6.prev = _context6.next) {
                                case 0:
                                    id = 0;
                                    model = null;
                                    companyid = 0;
                                    websiteid = 0;
                                    r = null;
                                    conn = null;
                                    code = '';
                                    tenantid = this.session.user.tenantid;
                                    formData = this.request.body;
                                    _context6.prev = 9;
                                    _context6.next = 12;
                                    return me.app.ds.getConnection();

                                case 12:
                                    conn = _context6.sent;
                                    return _context6.delegateYield(conn.beginTransaction()(), 't0', 14);

                                case 14:

                                    //1. insert companyinfo
                                    model = new Company();
                                    model.merge(Object.assign({}, formData.companyinfo, { tenantid: tenantid }, { createtime: Date.now(), updatetime: Date.now() }));

                                    if (!formData.companyinfo.hasOwnProperty("id")) {
                                        _context6.next = 23;
                                        break;
                                    }

                                    _context6.next = 19;
                                    return conn.update(model);

                                case 19:
                                    r = _context6.sent;

                                    id = formData.companyinfo.id;
                                    _context6.next = 27;
                                    break;

                                case 23:
                                    _context6.next = 25;
                                    return conn.create(model);

                                case 25:
                                    r = _context6.sent;

                                    id = r.insertId;

                                case 27:
                                    companyid = id;

                                    //2. insert siteinfo
                                    model = null;
                                    model = new Website();
                                    data = Object.assign({}, formData.siteinfo, { tenantid: tenantid }, { createtime: Date.now(), updatetime: Date.now() });

                                    data.manageridtype = parseInt(data.manageridtype);
                                    data.accessmethod = JSON.stringify(data.accessmethod);
                                    data.ip = JSON.stringify(data.ip);
                                    data.languages = JSON.stringify(data.languages);
                                    model.merge(data);

                                    if (!formData.siteinfo.hasOwnProperty("id")) {
                                        _context6.next = 43;
                                        break;
                                    }

                                    _context6.next = 39;
                                    return conn.update(model);

                                case 39:
                                    r = _context6.sent;

                                    id = formData.siteinfo.id;
                                    _context6.next = 47;
                                    break;

                                case 43:
                                    _context6.next = 45;
                                    return conn.create(model);

                                case 45:
                                    r = _context6.sent;

                                    id = r.insertId;

                                case 47:
                                    websiteid = id;

                                    //3. insert appliyrecord
                                    model = null;
                                    model = new Record();
                                    code = utils.randomString(32, '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
                                    model.merge(Object.assign({}, formData.baseinfo, formData.material, { tenantid: tenantid, companyid: companyid, websiteid: websiteid, status: 1, code: code }, { createtime: Date.now(), updatetime: Date.now() }));

                                    if (!formData.baseinfo.hasOwnProperty("id")) {
                                        _context6.next = 59;
                                        break;
                                    }

                                    _context6.next = 55;
                                    return conn.update(model);

                                case 55:
                                    r = _context6.sent;

                                    id = formData.baseinfo.id;
                                    _context6.next = 63;
                                    break;

                                case 59:
                                    _context6.next = 61;
                                    return conn.create(model);

                                case 61:
                                    r = _context6.sent;

                                    id = r.insertId;

                                case 63:
                                    return _context6.delegateYield(conn.commit()(), 't1', 64);

                                case 64:
                                    _context6.next = 70;
                                    break;

                                case 66:
                                    _context6.prev = 66;
                                    _context6.t2 = _context6['catch'](9);

                                    EasyNode.DEBUG && logger.debug(' ' + _context6.t2 + ',' + _context6.t2.stack);
                                    return _context6.delegateYield(conn.rollback()(), 't3', 70);

                                case 70:
                                    _context6.prev = 70;
                                    _context6.next = 73;
                                    return me.app.ds.releaseConnection(conn);

                                case 73:
                                    return _context6.abrupt('return', { code: code, id: id });

                                case 75:
                                case 'end':
                                    return _context6.stop();
                            }
                        }
                    }, _callee6, this, [[9, 66, 70, 75]]);
                });
            }

            /**
             * 接口：
             POST https://c.163.com/api/account/pubips
             参数：
             secret=3soLEF67wx&tenantId=xxxxxxxx
              正确响应：
             {
                 "params": [
                     {
                         "pubIp": "60.191.83.166"
                     }
                 ],
                 "code": 200,
                 "msg": "succ"
             }
              错误响应：
             code : 413 secret(密码)不对。
             code:  401 账号不存在。
             * */
            /*  gettenantPubips(){
                  var me = this;
                  return function *(){
                      console.log("sessin",this.session);
                      var tenantId = this.session.user.tenantid;
                      return  new Promise( function(res,rej) {
                          console.log("tenantId",tenantId);
                          var url = `${me.tenantpubips.urlPath}?secret=${me.tenantpubips.secret}&tenantId=${tenantId}`;
                          console.log(url);
                          request.post(url)
                              .end(function(err,ret){
                                  if( err ){
                                      rej();
                                  }else{
                                      res(ret.text);
                                  }
                              });
                      });
                  }
              }
            */

        }, {
            key: 'getRecords',
            value: function getRecords() {
                var me = this;
                return regeneratorRuntime.mark(function _callee7() {
                    var conn, tenantid, isadmin, filter, page, rpp, ret, model, _FILTER_CONDITION_ALL, _FILTER_CONDITION_WAITED, _FILTER_CONDITION_PASSED, _FILTER_CONDITION_NOPASS, FILTER_CONDITION_PHOTO_PASSED;

                    return regeneratorRuntime.wrap(function _callee7$(_context7) {
                        while (1) {
                            switch (_context7.prev = _context7.next) {
                                case 0:
                                    conn = null;
                                    tenantid = this.session.user.tenantid;
                                    isadmin = this.session.user.isadmin || false;
                                    filter = parseInt(this.parameter.param('filter'));
                                    page = parseInt(this.parameter.param('page'));
                                    rpp = parseInt(this.parameter.param('rpp'));
                                    ret = { rows: 0, pages: 0, page: 0, rpp: 0, data: [] };
                                    _context7.prev = 7;
                                    model = new Record().merge({ tenantid: tenantid });
                                    _context7.next = 11;
                                    return me.app.ds.getConnection();

                                case 11:
                                    conn = _context7.sent;

                                    if (!isadmin) {
                                        _context7.next = 40;
                                        break;
                                    }

                                    _FILTER_CONDITION_ALL = 0;
                                    _FILTER_CONDITION_WAITED = 1;
                                    _FILTER_CONDITION_PASSED = 2;
                                    _FILTER_CONDITION_NOPASS = 3;
                                    FILTER_CONDITION_PHOTO_PASSED = 6;

                                    if (!(filter == _FILTER_CONDITION_ALL)) {
                                        _context7.next = 22;
                                        break;
                                    }

                                    _context7.next = 21;
                                    return conn.list(model, { status: { exp: '<>', value: 0 } }, { page: page, rpp: rpp }, ['updatetime ASC]']);

                                case 21:
                                    ret = _context7.sent;

                                case 22:
                                    if (!(filter == _FILTER_CONDITION_WAITED)) {
                                        _context7.next = 26;
                                        break;
                                    }

                                    _context7.next = 25;
                                    return conn.list(model, { status: { exp: 'in', value: [1, 4, 7] } }, { page: page, rpp: rpp }, ['updatetime DESC']);

                                case 25:
                                    ret = _context7.sent;

                                case 26:
                                    if (!(filter == _FILTER_CONDITION_PASSED)) {
                                        _context7.next = 30;
                                        break;
                                    }

                                    _context7.next = 29;
                                    return conn.list(model, { status: { exp: 'in', value: [3, 6, 9] } }, { page: page, rpp: rpp }, ['updatetime DESC']);

                                case 29:
                                    ret = _context7.sent;

                                case 30:
                                    if (!(filter == _FILTER_CONDITION_NOPASS)) {
                                        _context7.next = 34;
                                        break;
                                    }

                                    _context7.next = 33;
                                    return conn.list(model, { status: { exp: 'in', value: [2, 5, 8] } }, { page: page, rpp: rpp }, ['updatetime DESC']);

                                case 33:
                                    ret = _context7.sent;

                                case 34:
                                    if (!(filter == FILTER_CONDITION_PHOTO_PASSED)) {
                                        _context7.next = 38;
                                        break;
                                    }

                                    _context7.next = 37;
                                    return conn.list(model, { status: { exp: 'in', value: [6] } }, { page: page, rpp: rpp }, ['updatetime DESC']);

                                case 37:
                                    ret = _context7.sent;

                                case 38:
                                    _context7.next = 43;
                                    break;

                                case 40:
                                    _context7.next = 42;
                                    return conn.list(model, { tenantid: { exp: '=', value: tenantid } }, { page: page, rpp: rpp }, ['updatetime DESC']);

                                case 42:
                                    ret = _context7.sent;

                                case 43:
                                    _context7.next = 48;
                                    break;

                                case 45:
                                    _context7.prev = 45;
                                    _context7.t0 = _context7['catch'](7);

                                    EasyNode.DEBUG && logger.debug(' ' + _context7.t0 + ' ' + _context7.t0.stack);

                                case 48:
                                    _context7.prev = 48;
                                    _context7.next = 51;
                                    return me.app.ds.releaseConnection(conn);

                                case 51:
                                    return _context7.abrupt('return', ret);

                                case 53:
                                case 'end':
                                    return _context7.stop();
                            }
                        }
                    }, _callee7, this, [[7, 45, 48, 53]]);
                });
            }
        }, {
            key: 'getRecordsb',
            value: function getRecordsb() {
                var me = this;
                return regeneratorRuntime.mark(function _callee8() {
                    var conn, filter, page, rpp, ret, model, _FILTER_CONDITION_ALL2, _FILTER_CONDITION_WAITED2, _FILTER_CONDITION_PASSED2, _FILTER_CONDITION_NOPASS2, FILTER_CONDITION_PHOTO_PASSED;

                    return regeneratorRuntime.wrap(function _callee8$(_context8) {
                        while (1) {
                            switch (_context8.prev = _context8.next) {
                                case 0:
                                    conn = null;
                                    filter = parseInt(this.parameter.param('filter'));
                                    page = parseInt(this.parameter.param('page'));
                                    rpp = parseInt(this.parameter.param('rpp'));
                                    ret = { rows: 0, pages: 0, page: 0, rpp: 0, data: [] };
                                    _context8.prev = 5;
                                    model = new Record().merge({});
                                    _context8.next = 9;
                                    return me.app.ds.getConnection();

                                case 9:
                                    conn = _context8.sent;
                                    _FILTER_CONDITION_ALL2 = 0;
                                    _FILTER_CONDITION_WAITED2 = 1;
                                    _FILTER_CONDITION_PASSED2 = 2;
                                    _FILTER_CONDITION_NOPASS2 = 3;
                                    FILTER_CONDITION_PHOTO_PASSED = 6;

                                    if (!(filter == _FILTER_CONDITION_ALL2)) {
                                        _context8.next = 19;
                                        break;
                                    }

                                    _context8.next = 18;
                                    return conn.list(model, { status: { exp: '<>', value: 0 } }, { page: page, rpp: rpp }, ['updatetime DESC']);

                                case 18:
                                    ret = _context8.sent;

                                case 19:
                                    if (!(filter == _FILTER_CONDITION_WAITED2)) {
                                        _context8.next = 23;
                                        break;
                                    }

                                    _context8.next = 22;
                                    return conn.list(model, { status: { exp: 'in', value: [1, 4, 7] } }, { page: page, rpp: rpp }, ['updatetime DESC']);

                                case 22:
                                    ret = _context8.sent;

                                case 23:
                                    if (!(filter == _FILTER_CONDITION_PASSED2)) {
                                        _context8.next = 27;
                                        break;
                                    }

                                    _context8.next = 26;
                                    return conn.list(model, { status: { exp: 'in', value: [3, 6, 9] } }, { page: page, rpp: rpp }, ['updatetime DESC']);

                                case 26:
                                    ret = _context8.sent;

                                case 27:
                                    if (!(filter == _FILTER_CONDITION_NOPASS2)) {
                                        _context8.next = 31;
                                        break;
                                    }

                                    _context8.next = 30;
                                    return conn.list(model, { status: { exp: 'in', value: [2, 5, 8] } }, { page: page, rpp: rpp }, ['updatetime DESC']);

                                case 30:
                                    ret = _context8.sent;

                                case 31:
                                    if (!(filter == FILTER_CONDITION_PHOTO_PASSED)) {
                                        _context8.next = 35;
                                        break;
                                    }

                                    _context8.next = 34;
                                    return conn.list(model, { status: { exp: 'in', value: [6] } }, { page: page, rpp: rpp }, ['updatetime DESC']);

                                case 34:
                                    ret = _context8.sent;

                                case 35:
                                    _context8.next = 40;
                                    break;

                                case 37:
                                    _context8.prev = 37;
                                    _context8.t0 = _context8['catch'](5);

                                    EasyNode.DEBUG && logger.debug(' ' + _context8.t0 + ' ' + _context8.t0.stack);

                                case 40:
                                    _context8.prev = 40;
                                    _context8.next = 43;
                                    return me.app.ds.releaseConnection(conn);

                                case 43:
                                    return _context8.abrupt('return', ret);

                                case 45:
                                case 'end':
                                    return _context8.stop();
                            }
                        }
                    }, _callee8, this, [[5, 37, 40, 45]]);
                });
            }
        }, {
            key: 'getRecordsbByStatus',
            value: function getRecordsbByStatus() {
                var me = this;
                return regeneratorRuntime.mark(function _callee9() {
                    var conn, form, filter, page, rpp, ret, model;
                    return regeneratorRuntime.wrap(function _callee9$(_context9) {
                        while (1) {
                            switch (_context9.prev = _context9.next) {
                                case 0:
                                    conn = null;
                                    form = this.request.body;

                                    console.log("form", form);
                                    filter = form.filter || [];
                                    page = parseInt(form.page || 0);
                                    rpp = parseInt(form.rpp || 0);
                                    ret = { rows: 0, pages: 0, page: 0, rpp: 0, data: [] };
                                    _context9.prev = 7;
                                    model = new Record().merge({});
                                    _context9.next = 11;
                                    return me.app.ds.getConnection();

                                case 11:
                                    conn = _context9.sent;
                                    _context9.next = 14;
                                    return conn.list(model, { status: { exp: 'in', value: filter } }, { page: page, rpp: rpp }, ['updatetime DESC']);

                                case 14:
                                    ret = _context9.sent;
                                    _context9.next = 20;
                                    break;

                                case 17:
                                    _context9.prev = 17;
                                    _context9.t0 = _context9['catch'](7);

                                    EasyNode.DEBUG && logger.debug(' ' + _context9.t0 + ' ' + _context9.t0.stack);

                                case 20:
                                    _context9.prev = 20;
                                    _context9.next = 23;
                                    return me.app.ds.releaseConnection(conn);

                                case 23:
                                    return _context9.abrupt('return', ret);

                                case 25:
                                case 'end':
                                    return _context9.stop();
                            }
                        }
                    }, _callee9, this, [[7, 17, 20, 25]]);
                });
            }
        }, {
            key: 'getCurtainsb',
            value: function getCurtainsb() {
                var me = this;
                return regeneratorRuntime.mark(function _callee10() {
                    var conn, filter, page, rpp, ret, model, _FILTER_CONDITION_ALL3, FILTER_CONDITION_CHECKING, _FILTER_CONDITION_PASSED3;

                    return regeneratorRuntime.wrap(function _callee10$(_context10) {
                        while (1) {
                            switch (_context10.prev = _context10.next) {
                                case 0:
                                    conn = null;
                                    filter = parseInt(this.parameter.param('filter'));
                                    page = parseInt(this.parameter.param('page'));
                                    rpp = parseInt(this.parameter.param('rpp'));
                                    ret = { rows: 0, pages: 0, page: 0, rpp: 0, data: [] };
                                    _context10.prev = 5;
                                    model = new User().merge({});
                                    _context10.next = 9;
                                    return me.app.ds.getConnection();

                                case 9:
                                    conn = _context10.sent;
                                    _FILTER_CONDITION_ALL3 = 3;
                                    FILTER_CONDITION_CHECKING = 1;
                                    _FILTER_CONDITION_PASSED3 = 2;

                                    if (!(filter == _FILTER_CONDITION_ALL3)) {
                                        _context10.next = 17;
                                        break;
                                    }

                                    _context10.next = 16;
                                    return conn.list(model, { applycurtainstatus: { exp: '<>', value: 0 } }, { page: page, rpp: rpp }, ['lastlogintime DESC']);

                                case 16:
                                    ret = _context10.sent;

                                case 17:
                                    if (!(filter == FILTER_CONDITION_CHECKING)) {
                                        _context10.next = 21;
                                        break;
                                    }

                                    _context10.next = 20;
                                    return conn.list(model, { applycurtainstatus: { exp: 'in', value: [FILTER_CONDITION_CHECKING] } }, { page: page, rpp: rpp }, ['lastlogintime DESC']);

                                case 20:
                                    ret = _context10.sent;

                                case 21:
                                    if (!(filter == _FILTER_CONDITION_PASSED3)) {
                                        _context10.next = 25;
                                        break;
                                    }

                                    _context10.next = 24;
                                    return conn.list(model, { applycurtainstatus: { exp: 'in', value: [_FILTER_CONDITION_PASSED3] } }, { page: page, rpp: rpp }, ['lastlogintime DESC']);

                                case 24:
                                    ret = _context10.sent;

                                case 25:
                                    _context10.next = 30;
                                    break;

                                case 27:
                                    _context10.prev = 27;
                                    _context10.t0 = _context10['catch'](5);

                                    EasyNode.DEBUG && logger.debug(' ' + _context10.t0 + ' ' + _context10.t0.stack);

                                case 30:
                                    _context10.prev = 30;
                                    _context10.next = 33;
                                    return me.app.ds.releaseConnection(conn);

                                case 33:
                                    return _context10.abrupt('return', ret);

                                case 35:
                                case 'end':
                                    return _context10.stop();
                            }
                        }
                    }, _callee10, this, [[5, 27, 30, 35]]);
                });
            }
        }, {
            key: 'getCurtainsb2',
            value: function getCurtainsb2() {
                var me = this;
                return regeneratorRuntime.mark(function _callee11() {
                    var conn, filter, page, rpp, ret, datas, total, offset, limit, sql, sqlCount, _FILTER_CONDITION_ALL4, FILTER_CONDITION_CHECKING, _FILTER_CONDITION_PASSED4;

                    return regeneratorRuntime.wrap(function _callee11$(_context11) {
                        while (1) {
                            switch (_context11.prev = _context11.next) {
                                case 0:
                                    conn = null;
                                    filter = parseInt(this.parameter.param('filter'));
                                    page = parseInt(this.parameter.param('page'));
                                    rpp = parseInt(this.parameter.param('rpp'));
                                    ret = { rows: 0, pages: 0, page: 0, rpp: 0, data: [] };
                                    datas = {};
                                    total = 0;
                                    offset = (page - 1) * rpp;
                                    limit = rpp;
                                    sql = '';
                                    sqlCount = '';
                                    _context11.prev = 11;
                                    _context11.next = 14;
                                    return me.app.ds.getConnection();

                                case 14:
                                    conn = _context11.sent;
                                    _FILTER_CONDITION_ALL4 = 3;
                                    FILTER_CONDITION_CHECKING = 1;
                                    _FILTER_CONDITION_PASSED4 = 2;

                                    if (!(filter == _FILTER_CONDITION_ALL4)) {
                                        _context11.next = 33;
                                        break;
                                    }

                                    sqlCount = 'select count(u.id) as total from user as u, record as r  where u.tenantid = r.tenantid and r.status in (11,12)';
                                    _context11.next = 22;
                                    return conn.execQuery(sqlCount);

                                case 22:
                                    datas = _context11.sent;

                                    ret.rows = datas[0].total || 0;

                                    if (!(ret.rows > 0)) {
                                        _context11.next = 33;
                                        break;
                                    }

                                    ret.pages = SqlUtil.calculatePages(ret.rows, rpp);
                                    ret.page = page;
                                    ret.rpp = rpp;
                                    sql = 'select r.id,u.tenantid,u.email,u.username,u.mailingaddress,u.recipient,u.recipientmobile,u.companyname,r.operatetime,r.operator from user as u, record as r  where u.tenantid = r.tenantid and r.status in (11,12) order by r.operatetime DESC limit ' + limit + ' offset ' + offset;
                                    _context11.next = 31;
                                    return conn.execQuery(sql);

                                case 31:
                                    datas = _context11.sent;

                                    ret.data = datas;

                                case 33:
                                    if (!(filter == FILTER_CONDITION_CHECKING)) {
                                        _context11.next = 48;
                                        break;
                                    }

                                    sqlCount = 'select count(u.id) as total from user as u, record as r  where u.tenantid = r.tenantid and r.status in (11)';
                                    _context11.next = 37;
                                    return conn.execQuery(sqlCount);

                                case 37:
                                    datas = _context11.sent;

                                    ret.rows = datas[0].total || 0;

                                    if (!(ret.rows > 0)) {
                                        _context11.next = 48;
                                        break;
                                    }

                                    ret.pages = SqlUtil.calculatePages(ret.rows, rpp);
                                    ret.page = page;
                                    ret.rpp = rpp;
                                    sql = 'select r.id,u.tenantid,u.email,u.username,u.mailingaddress,u.recipient,u.recipientmobile,u.companyname,r.operatetime,r.operator from user as u, record as r  where u.tenantid = r.tenantid and r.status in (11)  order by r.operatetime DESC limit ' + limit + ' offset ' + offset;
                                    _context11.next = 46;
                                    return conn.execQuery(sql);

                                case 46:
                                    datas = _context11.sent;

                                    ret.data = datas;

                                case 48:
                                    if (!(filter == _FILTER_CONDITION_PASSED4)) {
                                        _context11.next = 63;
                                        break;
                                    }

                                    sqlCount = 'select count(u.id) as total from user as u, record as r  where u.tenantid = r.tenantid and r.status in (12)';
                                    _context11.next = 52;
                                    return conn.execQuery(sqlCount);

                                case 52:
                                    datas = _context11.sent;

                                    ret.rows = datas[0].total || 0;

                                    if (!(ret.rows > 0)) {
                                        _context11.next = 63;
                                        break;
                                    }

                                    ret.pages = SqlUtil.calculatePages(ret.rows, rpp);
                                    ret.page = page;
                                    ret.rpp = rpp;
                                    sql = 'select r.id,u.tenantid,u.email,u.username,u.mailingaddress,u.recipient,u.recipientmobile,u.companyname,r.operatetime,r.operator from user as u, record as r  where u.tenantid = r.tenantid and r.status in (12) order by r.operatetime DESC limit ' + limit + ' offset ' + offset;
                                    _context11.next = 61;
                                    return conn.execQuery(sql);

                                case 61:
                                    datas = _context11.sent;

                                    ret.data = datas;

                                case 63:
                                    _context11.next = 68;
                                    break;

                                case 65:
                                    _context11.prev = 65;
                                    _context11.t0 = _context11['catch'](11);

                                    EasyNode.DEBUG && logger.debug(' ' + _context11.t0 + ' ' + _context11.t0.stack);

                                case 68:
                                    _context11.prev = 68;
                                    _context11.next = 71;
                                    return me.app.ds.releaseConnection(conn);

                                case 71:
                                    return _context11.abrupt('return', ret);

                                case 73:
                                case 'end':
                                    return _context11.stop();
                            }
                        }
                    }, _callee11, this, [[11, 65, 68, 73]]);
                });
            }
        }, {
            key: 'getRecord',
            value: function getRecord() {
                var me = this;
                return regeneratorRuntime.mark(function _callee12() {
                    var tenantid, ret, conn, record, arr, company, website, sql, id;
                    return regeneratorRuntime.wrap(function _callee12$(_context12) {
                        while (1) {
                            switch (_context12.prev = _context12.next) {
                                case 0:
                                    tenantid = this.session.user.tenantid;
                                    ret = {};
                                    conn = null;
                                    record = null;
                                    arr = [];
                                    company = null;
                                    website = null;

                                    //1. record
                                    //2. company
                                    //3. website

                                    _context12.prev = 7;
                                    sql = '';
                                    id = this.parameter.param('id') || 0;
                                    _context12.next = 12;
                                    return me.app.ds.getConnection();

                                case 12:
                                    conn = _context12.sent;


                                    sql = 'SELECT id,type,serverregion,companyid,websiteid,sitemanagerurl,checklisturl,checkedlisturl,protocolurl1,protocolurl2,securityurl1,securityurl2,curtainurl,code,status,tenantid,reasons FROM record WHERE id = #id# and tenantid = #tenantid#';
                                    _context12.next = 16;
                                    return conn.execQuery(sql, { id: id, tenantid: tenantid });

                                case 16:
                                    arr = _context12.sent;

                                    if (!(arr.length <= 0)) {
                                        _context12.next = 19;
                                        break;
                                    }

                                    return _context12.abrupt('return', ret);

                                case 19:
                                    record = arr[0];

                                    if (!(record.companyid > 0)) {
                                        _context12.next = 26;
                                        break;
                                    }

                                    sql = 'SELECT id,province,city,area,nature,idtype,idnumber,name,liveaddress,commaddress,owner,managername,manageridtype,manageridnumber,manageraddress,officephoneregion,officephonenumber,mobile,email,recordnumber,recordpassword FROM company WHERE id = #id#';
                                    _context12.next = 24;
                                    return conn.execQuery(sql, { id: record.companyid });

                                case 24:
                                    arr = _context12.sent;

                                    company = arr[0];

                                case 26:
                                    if (!(record.websiteid > 0)) {
                                        _context12.next = 32;
                                        break;
                                    }

                                    sql = 'SELECT id,name,domain,domain1,domain1,domain2,domain3,domain4,homeurl,servicecontent,languages,ispname,ip,accessmethod,serverregion,managername,manageridtype,manageridnumber,officephoneregion,officephonenumber,mobile,email,qq,prechecktype,checknumber,checkfileurl,remark FROM website WHERE id = #id#';
                                    _context12.next = 30;
                                    return conn.execQuery(sql, { id: record.websiteid });

                                case 30:
                                    arr = _context12.sent;

                                    website = arr[0];

                                case 32:
                                    if (website) {
                                        website.ip = JSON.parse(website.ip);
                                        ret.website = website;
                                    }
                                    if (company) {
                                        ret.company = company;
                                    }

                                    ret.record = record;

                                    _context12.next = 40;
                                    break;

                                case 37:
                                    _context12.prev = 37;
                                    _context12.t0 = _context12['catch'](7);

                                    EasyNode.DEBUG && logger.debug(' ' + _context12.t0 + ' ' + _context12.t0.stack);

                                case 40:
                                    _context12.prev = 40;
                                    _context12.next = 43;
                                    return me.app.ds.releaseConnection(conn);

                                case 43:
                                    return _context12.abrupt('return', ret);

                                case 45:
                                case 'end':
                                    return _context12.stop();
                            }
                        }
                    }, _callee12, this, [[7, 37, 40, 45]]);
                });
            }
        }, {
            key: 'getRecordb',
            value: function getRecordb() {
                var recordId = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

                var me = this;
                return regeneratorRuntime.mark(function _callee13() {
                    var ret, conn, record, arr, company, website, sql, id;
                    return regeneratorRuntime.wrap(function _callee13$(_context13) {
                        while (1) {
                            switch (_context13.prev = _context13.next) {
                                case 0:
                                    ret = {};
                                    conn = null;
                                    record = null;
                                    arr = [];
                                    company = null;
                                    website = null;

                                    //1. record
                                    //2. company
                                    //3. website

                                    _context13.prev = 6;
                                    sql = '';
                                    id = this.parameter && this.parameter.param && this.parameter.param('id') || recordId;
                                    _context13.next = 11;
                                    return me.app.ds.getConnection();

                                case 11:
                                    conn = _context13.sent;


                                    sql = 'SELECT id,type,serverregion,companyid,websiteid,sitemanagerurl,checklisturl,checkedlisturl,protocolurl1,protocolurl2,securityurl1,securityurl2,curtainurl,code,status,tenantid,reasons,operatetime,operator,beianstatus FROM record WHERE id = #id#';
                                    _context13.next = 15;
                                    return conn.execQuery(sql, { id: id });

                                case 15:
                                    arr = _context13.sent;

                                    if (!(arr.length <= 0)) {
                                        _context13.next = 18;
                                        break;
                                    }

                                    return _context13.abrupt('return', ret);

                                case 18:
                                    record = arr[0];

                                    if (!(record.companyid > 0)) {
                                        _context13.next = 25;
                                        break;
                                    }

                                    sql = 'SELECT id,province,city,area,nature,idtype,idnumber,name,liveaddress,commaddress,owner,managername,manageraddress,manageridtype,manageridnumber,officephoneregion,officephonenumber,mobile,email,recordnumber,recordpassword FROM company WHERE id = #id#';
                                    _context13.next = 23;
                                    return conn.execQuery(sql, { id: record.companyid });

                                case 23:
                                    arr = _context13.sent;

                                    company = arr[0];

                                case 25:
                                    if (!(record.websiteid > 0)) {
                                        _context13.next = 31;
                                        break;
                                    }

                                    sql = 'SELECT id,name,domain,domain1,domain1,domain2,domain3,domain4,homeurl,servicecontent,languages,ispname,ip,accessmethod,serverregion,managername,manageridtype,manageridnumber,officephoneregion,officephonenumber,mobile,email,qq,prechecktype,checknumber,checkfileurl,remark FROM website WHERE id = #id#';
                                    _context13.next = 29;
                                    return conn.execQuery(sql, { id: record.websiteid });

                                case 29:
                                    arr = _context13.sent;

                                    website = arr[0];

                                case 31:
                                    if (website) {
                                        website.ip = JSON.parse(website.ip);
                                        ret.website = website;
                                    }
                                    if (company) {
                                        ret.company = company;
                                    }

                                    ret.record = record;

                                    _context13.next = 39;
                                    break;

                                case 36:
                                    _context13.prev = 36;
                                    _context13.t0 = _context13['catch'](6);

                                    EasyNode.DEBUG && logger.debug(' ' + _context13.t0 + ' ' + _context13.t0.stack);

                                case 39:
                                    _context13.prev = 39;
                                    _context13.next = 42;
                                    return me.app.ds.releaseConnection(conn);

                                case 42:
                                    return _context13.abrupt('return', ret);

                                case 44:
                                case 'end':
                                    return _context13.stop();
                            }
                        }
                    }, _callee13, this, [[6, 36, 39, 44]]);
                });
            }
        }, {
            key: 'putRecord',
            value: function putRecord() {
                var me = this;
                return regeneratorRuntime.mark(function _callee14() {
                    var r, conn, model, form, status, reasons, id, curtainurl, tenantid, arr, sql, ret;
                    return regeneratorRuntime.wrap(function _callee14$(_context14) {
                        while (1) {
                            switch (_context14.prev = _context14.next) {
                                case 0:
                                    r = null;
                                    conn = null;
                                    model = new Record();
                                    form = this.request.body;
                                    status = form.status;
                                    reasons = form.reasons;
                                    id = form.id;
                                    curtainurl = form.curtainurl;
                                    tenantid = form.tenantid || this.session.user.tenantid;
                                    arr = [];
                                    sql = '';
                                    _context14.prev = 11;
                                    _context14.next = 14;
                                    return me.app.ds.getConnection();

                                case 14:
                                    conn = _context14.sent;


                                    sql = 'SELECT id,tenantid FROM record WHERE id = #id# and tenantid = #tenantid#';
                                    _context14.next = 18;
                                    return conn.execQuery(sql, { id: id, tenantid: tenantid });

                                case 18:
                                    arr = _context14.sent;

                                    if (!(arr.length <= 0)) {
                                        _context14.next = 21;
                                        break;
                                    }

                                    return _context14.abrupt('return', false);

                                case 21:

                                    model.merge(Object.assign({}, { id: id }));
                                    if (status) {
                                        model.merge(Object.assign({}, { status: status }));
                                    }
                                    if (reasons) {
                                        model.merge(Object.assign({}, { reasons: reasons }));
                                    }
                                    if (curtainurl) {
                                        model.merge(Object.assign({}, { curtainurl: curtainurl }));
                                    }

                                    _context14.next = 27;
                                    return conn.update(model);

                                case 27:
                                    r = _context14.sent;
                                    ret = r.affectedRows + r.insertId > 0 ? true : false;

                                    if (ret) {
                                        if (status == 1) {
                                            //初审中
                                            me.app.checklist.push(id);
                                        }
                                    }
                                    return _context14.abrupt('return', ret);

                                case 33:
                                    _context14.prev = 33;
                                    _context14.t0 = _context14['catch'](11);

                                    EasyNode.DEBUG && logger.debug(' ' + _context14.t0 + ',' + _context14.t0.stack);
                                    return _context14.abrupt('return', false);

                                case 37:
                                    _context14.prev = 37;
                                    _context14.next = 40;
                                    return me.app.ds.releaseConnection(conn);

                                case 40:
                                    return _context14.finish(37);

                                case 41:
                                case 'end':
                                    return _context14.stop();
                            }
                        }
                    }, _callee14, this, [[11, 33, 37, 41]]);
                });
            }
        }, {
            key: 'putRecord2',
            value: function putRecord2(id, status) {
                var me = this;
                return regeneratorRuntime.mark(function _callee15() {
                    var r, conn, model, recordid, recordstatusstatus, arr, sql, ret;
                    return regeneratorRuntime.wrap(function _callee15$(_context15) {
                        while (1) {
                            switch (_context15.prev = _context15.next) {
                                case 0:
                                    r = null;
                                    conn = null;
                                    model = new Record();
                                    recordid = id;
                                    recordstatusstatus = status;
                                    arr = [];
                                    sql = '';
                                    _context15.prev = 7;
                                    _context15.next = 10;
                                    return me.app.ds.getConnection();

                                case 10:
                                    conn = _context15.sent;


                                    sql = 'SELECT id FROM record WHERE id = #id#';
                                    _context15.next = 14;
                                    return conn.execQuery(sql, { id: recordid });

                                case 14:
                                    arr = _context15.sent;

                                    if (!(arr.length <= 0)) {
                                        _context15.next = 17;
                                        break;
                                    }

                                    return _context15.abrupt('return', false);

                                case 17:

                                    model.merge(Object.assign({}, { id: recordid }));
                                    if (status) {
                                        model.merge(Object.assign({}, { status: recordstatusstatus }));
                                    }

                                    _context15.next = 21;
                                    return conn.update(model);

                                case 21:
                                    r = _context15.sent;
                                    ret = r.affectedRows + r.insertId > 0 ? true : false;
                                    return _context15.abrupt('return', ret);

                                case 26:
                                    _context15.prev = 26;
                                    _context15.t0 = _context15['catch'](7);

                                    EasyNode.DEBUG && logger.debug(' ' + _context15.t0 + ',' + _context15.t0.stack);
                                    return _context15.abrupt('return', false);

                                case 30:
                                    _context15.prev = 30;
                                    _context15.next = 33;
                                    return me.app.ds.releaseConnection(conn);

                                case 33:
                                    return _context15.finish(30);

                                case 34:
                                case 'end':
                                    return _context15.stop();
                            }
                        }
                    }, _callee15, this, [[7, 26, 30, 34]]);
                });
            }
        }, {
            key: 'putRecordb',
            value: function putRecordb() {
                var me = this;
                return regeneratorRuntime.mark(function _callee16() {
                    var r, conn, model, form, status, reasons, id, curtainurl, operatetime, operator, checkedlisturl, beianstatus, ret;
                    return regeneratorRuntime.wrap(function _callee16$(_context16) {
                        while (1) {
                            switch (_context16.prev = _context16.next) {
                                case 0:
                                    r = null;
                                    conn = null;
                                    model = new Record();
                                    form = this.request.body;
                                    status = form.status;
                                    reasons = form.reasons;
                                    id = form.id;
                                    curtainurl = form.curtainurl;
                                    operatetime = form.operatetime;
                                    operator = form.operator;
                                    checkedlisturl = form.checkedlisturl;
                                    beianstatus = form.beianstatus;
                                    _context16.prev = 12;
                                    _context16.next = 15;
                                    return me.app.ds.getConnection();

                                case 15:
                                    conn = _context16.sent;


                                    model.merge(Object.assign({}, { id: id, operatetime: operatetime, operator: operator }));
                                    if (status) {
                                        model.merge(Object.assign({}, { status: status }));
                                    }
                                    if (reasons) {
                                        model.merge(Object.assign({}, { reasons: reasons }));
                                    }
                                    if (curtainurl) {
                                        model.merge(Object.assign({}, { curtainurl: curtainurl }));
                                    }
                                    if (checkedlisturl) {
                                        model.merge(Object.assign({}, { checkedlisturl: checkedlisturl }));
                                    }
                                    if (beianstatus) {
                                        model.merge(Object.assign({}, { beianstatus: beianstatus }));
                                    }

                                    _context16.next = 24;
                                    return conn.update(model);

                                case 24:
                                    r = _context16.sent;
                                    ret = r.affectedRows + r.insertId > 0 ? true : false;

                                    if (!ret) {
                                        _context16.next = 33;
                                        break;
                                    }

                                    if (!(status == 7)) {
                                        _context16.next = 33;
                                        break;
                                    }

                                    _context16.next = 30;
                                    return me.isp_upload(id);

                                case 30:
                                    ret = _context16.sent;


                                    EasyNode.DEBUG && logger.debug(' upload to GYB result:', ret);
                                    if (ret) {
                                        //yield ms.isp_upload_hsjg(id);//useless
                                        EasyNode.DEBUG && logger.debug(' upload hsjg', ret);
                                    }

                                case 33:
                                    return _context16.abrupt('return', ret);

                                case 36:
                                    _context16.prev = 36;
                                    _context16.t0 = _context16['catch'](12);

                                    EasyNode.DEBUG && logger.debug(' ' + _context16.t0 + ',' + _context16.t0.stack);
                                    return _context16.abrupt('return', false);

                                case 40:
                                    _context16.prev = 40;
                                    _context16.next = 43;
                                    return me.app.ds.releaseConnection(conn);

                                case 43:
                                    return _context16.finish(40);

                                case 44:
                                case 'end':
                                    return _context16.stop();
                            }
                        }
                    }, _callee16, this, [[12, 36, 40, 44]]);
                });
            }

            /**
             * @method 管局审核
             * @apiName decryptContent
             * @apiGroup ISP
             * @apiPermission whitelist
             * @apiVersion 0.0.2
             * @apiDescription
             *   管局审核意见及处理结果
             *
             * @apiParam {Object} gjsh  管局审核意见及处理结果对象
             * @apiParam {String} gjsh.Shrxm  审核人姓名
             * @apiParam {String} gjsh.Shr_ddhm  联系电话
             * @apiParam {String} gjsh.Shsj  审核时间
             * @apiParam {String} gjsh.Shyj  审核意见
             * @apiParam {Number} gjsh.Shjg  审核结果
             * @apiParam {Number} gjsh.Czlx  操作类型
             * @apiParam {Number} gjsh.Jlid  相关记录id
             *
             *
             * @apiSuccess {Object} ret {result:0|1,beianInfo:{}}  ret:0不通过,1通过, beianInfo解密,解压后的内容
            * */

        }, {
            key: 'putRecordbgjsh',
            value: function putRecordbgjsh(gjsh) {
                var me = this;
                return regeneratorRuntime.mark(function _callee17() {
                    var r, conn, model, status, reasons, id, operatetime, operator, ret;
                    return regeneratorRuntime.wrap(function _callee17$(_context17) {
                        while (1) {
                            switch (_context17.prev = _context17.next) {
                                case 0:
                                    r = null;
                                    conn = null;
                                    model = new Record();
                                    status = gjsh.Shjg == 0 ? _define.RecordCheckStatus.RS_COUNCIL_NOPASS : _define.RecordCheckStatus.RS_COUNCIL_PASS;
                                    reasons = gjsh.Shyj;
                                    id = gjsh.Jlid;
                                    operatetime = Date.now();
                                    operator = gjsh.Shrxm;
                                    _context17.prev = 8;
                                    _context17.next = 11;
                                    return me.app.ds.getConnection();

                                case 11:
                                    conn = _context17.sent;


                                    model.merge(Object.assign({}, { id: id, operatetime: operatetime, operator: operator, reasons: reasons, status: status }));

                                    _context17.next = 15;
                                    return conn.update(model);

                                case 15:
                                    r = _context17.sent;
                                    ret = r.affectedRows + r.insertId > 0 ? true : false;

                                    if (ret) {
                                        console.log("record original gjsh, ToDo"); //ToDo
                                    }
                                    return _context17.abrupt('return', ret);

                                case 21:
                                    _context17.prev = 21;
                                    _context17.t0 = _context17['catch'](8);

                                    EasyNode.DEBUG && logger.debug(' ' + _context17.t0 + ',' + _context17.t0.stack);
                                    return _context17.abrupt('return', false);

                                case 25:
                                    _context17.prev = 25;
                                    _context17.next = 28;
                                    return me.app.ds.releaseConnection(conn);

                                case 28:
                                    return _context17.finish(25);

                                case 29:
                                case 'end':
                                    return _context17.stop();
                            }
                        }
                    }, _callee17, this, [[8, 21, 25, 29]]);
                });
            }
        }, {
            key: 'putBeianstatus',
            value: function putBeianstatus() {
                var idp = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
                var beianstatusp = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

                var me = this;
                return regeneratorRuntime.mark(function _callee18() {
                    var r, conn, model, id, beianstatus, ret;
                    return regeneratorRuntime.wrap(function _callee18$(_context18) {
                        while (1) {
                            switch (_context18.prev = _context18.next) {
                                case 0:
                                    r = null;
                                    conn = null;
                                    model = new Record();
                                    id = idp;
                                    beianstatus = beianstatusp;
                                    _context18.prev = 5;
                                    _context18.next = 8;
                                    return me.app.ds.getConnection();

                                case 8:
                                    conn = _context18.sent;


                                    model.merge(Object.assign({}, { id: id, beianstatus: beianstatus }));

                                    _context18.next = 12;
                                    return conn.update(model);

                                case 12:
                                    r = _context18.sent;
                                    ret = r.affectedRows + r.insertId > 0 ? true : false;
                                    return _context18.abrupt('return', ret);

                                case 17:
                                    _context18.prev = 17;
                                    _context18.t0 = _context18['catch'](5);

                                    EasyNode.DEBUG && logger.debug(' ' + _context18.t0 + ',' + _context18.t0.stack);
                                    return _context18.abrupt('return', false);

                                case 21:
                                    _context18.prev = 21;
                                    _context18.next = 24;
                                    return me.app.ds.releaseConnection(conn);

                                case 24:
                                    return _context18.finish(21);

                                case 25:
                                case 'end':
                                    return _context18.stop();
                            }
                        }
                    }, _callee18, this, [[5, 17, 21, 25]]);
                });
            }
        }, {
            key: 'putWebsiteb',
            value: function putWebsiteb() {
                var me = this;
                return regeneratorRuntime.mark(function _callee19() {
                    var r, conn, model, form, id, languages, name, officephonenumber;
                    return regeneratorRuntime.wrap(function _callee19$(_context19) {
                        while (1) {
                            switch (_context19.prev = _context19.next) {
                                case 0:
                                    r = null;
                                    conn = null;
                                    model = new Website();
                                    form = this.request.body;
                                    id = form.id;
                                    languages = form.languages;
                                    name = form.name;
                                    officephonenumber = form.officephonenumber;
                                    _context19.prev = 8;
                                    _context19.next = 11;
                                    return me.app.ds.getConnection();

                                case 11:
                                    conn = _context19.sent;

                                    model.merge(Object.assign({}, { id: id }));
                                    if (languages) {
                                        model.merge(Object.assign({}, { languages: languages }));
                                    }
                                    if (name) {
                                        model.merge(Object.assign({}, { name: name }));
                                    }
                                    if (officephonenumber) {
                                        model.merge(Object.assign({}, { officephonenumber: officephonenumber }));
                                    }

                                    _context19.next = 18;
                                    return conn.update(model);

                                case 18:
                                    r = _context19.sent;
                                    return _context19.abrupt('return', r.affectedRows + r.insertId > 0 ? true : false);

                                case 22:
                                    _context19.prev = 22;
                                    _context19.t0 = _context19['catch'](8);

                                    EasyNode.DEBUG && logger.debug(' ' + _context19.t0 + ',' + _context19.t0.stack);
                                    return _context19.abrupt('return', false);

                                case 26:
                                    _context19.prev = 26;
                                    _context19.next = 29;
                                    return me.app.ds.releaseConnection(conn);

                                case 29:
                                    return _context19.finish(26);

                                case 30:
                                case 'end':
                                    return _context19.stop();
                            }
                        }
                    }, _callee19, this, [[8, 22, 26, 30]]);
                });
            }
        }, {
            key: 'putCompanyb',
            value: function putCompanyb() {
                var me = this;
                return regeneratorRuntime.mark(function _callee20() {
                    var r, conn, model, form, id, liveaddress, commaddress, officephonenumber, owner;
                    return regeneratorRuntime.wrap(function _callee20$(_context20) {
                        while (1) {
                            switch (_context20.prev = _context20.next) {
                                case 0:
                                    r = null;
                                    conn = null;
                                    model = new Company();
                                    form = this.request.body;
                                    id = form.id;
                                    liveaddress = form.liveaddress;
                                    commaddress = form.commaddress;
                                    officephonenumber = form.officephonenumber;
                                    owner = form.owner;
                                    _context20.prev = 9;
                                    _context20.next = 12;
                                    return me.app.ds.getConnection();

                                case 12:
                                    conn = _context20.sent;


                                    model.merge(Object.assign({}, { id: id }));
                                    if (commaddress) {
                                        model.merge(Object.assign({}, { commaddress: commaddress }));
                                    }
                                    if (liveaddress) {
                                        model.merge(Object.assign({}, { liveaddress: liveaddress }));
                                    }
                                    if (officephonenumber) {
                                        model.merge(Object.assign({}, { officephonenumber: officephonenumber }));
                                    }
                                    if (owner) {
                                        model.merge(Object.assign({}, { owner: owner }));
                                    }

                                    _context20.next = 20;
                                    return conn.update(model);

                                case 20:
                                    r = _context20.sent;
                                    return _context20.abrupt('return', r.affectedRows + r.insertId > 0 ? true : false);

                                case 24:
                                    _context20.prev = 24;
                                    _context20.t0 = _context20['catch'](9);

                                    EasyNode.DEBUG && logger.debug(' ' + _context20.t0 + ',' + _context20.t0.stack);
                                    return _context20.abrupt('return', false);

                                case 28:
                                    _context20.prev = 28;
                                    _context20.next = 31;
                                    return me.app.ds.releaseConnection(conn);

                                case 31:
                                    return _context20.finish(28);

                                case 32:
                                case 'end':
                                    return _context20.stop();
                            }
                        }
                    }, _callee20, this, [[9, 24, 28, 32]]);
                });
            }
        }, {
            key: 'putCurtainb',
            value: function putCurtainb() {
                var me = this;
                return regeneratorRuntime.mark(function _callee21() {
                    var r, conn, model, form, id, operatetime, operator;
                    return regeneratorRuntime.wrap(function _callee21$(_context21) {
                        while (1) {
                            switch (_context21.prev = _context21.next) {
                                case 0:
                                    r = null;
                                    conn = null;
                                    model = new User();
                                    form = this.request.body;
                                    id = form.id;
                                    operatetime = form.operatetime;
                                    operator = form.operator;
                                    _context21.prev = 7;
                                    _context21.next = 10;
                                    return me.app.ds.getConnection();

                                case 10:
                                    conn = _context21.sent;

                                    model.merge(Object.assign({}, { id: id, applycurtainstatus: 2, operatetime: operatetime, operator: operator }));
                                    _context21.next = 14;
                                    return conn.update(model);

                                case 14:
                                    r = _context21.sent;
                                    return _context21.abrupt('return', r.affectedRows + r.insertId > 0 ? true : false);

                                case 18:
                                    _context21.prev = 18;
                                    _context21.t0 = _context21['catch'](7);

                                    EasyNode.DEBUG && logger.debug(' ' + _context21.t0 + ',' + _context21.t0.stack);
                                    return _context21.abrupt('return', false);

                                case 22:
                                    _context21.prev = 22;
                                    _context21.next = 25;
                                    return me.app.ds.releaseConnection(conn);

                                case 25:
                                    return _context21.finish(22);

                                case 26:
                                case 'end':
                                    return _context21.stop();
                            }
                        }
                    }, _callee21, this, [[7, 18, 22, 26]]);
                });
            }
        }, {
            key: 'putCurtainb2',
            value: function putCurtainb2() {
                var me = this;
                return regeneratorRuntime.mark(function _callee22() {
                    var r, conn, model, form, id, operatetime, operator;
                    return regeneratorRuntime.wrap(function _callee22$(_context22) {
                        while (1) {
                            switch (_context22.prev = _context22.next) {
                                case 0:
                                    r = null;
                                    conn = null;
                                    model = new Record();
                                    form = this.request.body;
                                    id = form.id;
                                    operatetime = form.operatetime;
                                    operator = form.operator;
                                    _context22.prev = 7;
                                    _context22.next = 10;
                                    return me.app.ds.getConnection();

                                case 10:
                                    conn = _context22.sent;

                                    model.merge(Object.assign({}, { id: id, status: 12, operatetime: operatetime, operator: operator }));
                                    _context22.next = 14;
                                    return conn.update(model);

                                case 14:
                                    r = _context22.sent;
                                    return _context22.abrupt('return', r.affectedRows + r.insertId > 0 ? true : false);

                                case 18:
                                    _context22.prev = 18;
                                    _context22.t0 = _context22['catch'](7);

                                    EasyNode.DEBUG && logger.debug(' ' + _context22.t0 + ',' + _context22.t0.stack);
                                    return _context22.abrupt('return', false);

                                case 22:
                                    _context22.prev = 22;
                                    _context22.next = 25;
                                    return me.app.ds.releaseConnection(conn);

                                case 25:
                                    return _context22.finish(22);

                                case 26:
                                case 'end':
                                    return _context22.stop();
                            }
                        }
                    }, _callee22, this, [[7, 18, 22, 26]]);
                });
            }
        }, {
            key: 'putUser',
            value: function putUser() {
                var me = this;
                return regeneratorRuntime.mark(function _callee23() {
                    var r, conn, model, form, userid, mailingaddress, recipient, recipientmobile, companyname, recordid;
                    return regeneratorRuntime.wrap(function _callee23$(_context23) {
                        while (1) {
                            switch (_context23.prev = _context23.next) {
                                case 0:
                                    r = null;
                                    conn = null;
                                    model = new User();
                                    form = this.request.body;


                                    console.log(form);
                                    console.log(this.session.user);
                                    userid = form.userid || this.session.user.id;
                                    mailingaddress = form.mailingaddress;
                                    recipient = form.recipient;
                                    recipientmobile = form.recipientmobile;
                                    companyname = form.companyname;
                                    recordid = form.recordid;
                                    _context23.prev = 12;
                                    _context23.next = 15;
                                    return me.app.ds.getConnection();

                                case 15:
                                    conn = _context23.sent;

                                    model.merge(Object.assign({}, { id: userid, applycurtainstatus: 1 }));
                                    if (mailingaddress) {
                                        model.merge(Object.assign({}, { mailingaddress: mailingaddress }));
                                    }
                                    if (recipient) {
                                        model.merge(Object.assign({}, { recipient: recipient }));
                                    }
                                    if (recipientmobile) {
                                        model.merge(Object.assign({}, { recipientmobile: recipientmobile }));
                                    }
                                    if (companyname) {
                                        model.merge(Object.assign({}, { companyname: companyname }));
                                    }

                                    _context23.next = 23;
                                    return conn.update(model);

                                case 23:
                                    r = _context23.sent;
                                    _context23.next = 26;
                                    return me.putRecord2(recordid, 11);

                                case 26:
                                    return _context23.abrupt('return', r.affectedRows + r.insertId > 0 ? true : false);

                                case 29:
                                    _context23.prev = 29;
                                    _context23.t0 = _context23['catch'](12);

                                    EasyNode.DEBUG && logger.debug(' ' + _context23.t0 + ',' + _context23.t0.stack);
                                    return _context23.abrupt('return', false);

                                case 33:
                                    _context23.prev = 33;
                                    _context23.next = 36;
                                    return me.app.ds.releaseConnection(conn);

                                case 36:
                                    return _context23.finish(33);

                                case 37:
                                case 'end':
                                    return _context23.stop();
                            }
                        }
                    }, _callee23, this, [[12, 29, 33, 37]]);
                });
            }
        }, {
            key: 'deleteRecord',
            value: function deleteRecord() {
                var me = this;
                return regeneratorRuntime.mark(function _callee24() {
                    var conn, formData, id, arr, sql, tenantid, model;
                    return regeneratorRuntime.wrap(function _callee24$(_context24) {
                        while (1) {
                            switch (_context24.prev = _context24.next) {
                                case 0:
                                    conn = null;
                                    formData = this.request.body;
                                    id = formData.id;
                                    arr = [];
                                    sql = '';
                                    tenantid = this.session.user.tenantid;
                                    _context24.prev = 6;
                                    model = new Record();
                                    _context24.next = 10;
                                    return me.app.ds.getConnection();

                                case 10:
                                    conn = _context24.sent;


                                    sql = 'SELECT id,tenantid FROM record WHERE id = #id# and tenantid = #tenantid#';
                                    _context24.next = 14;
                                    return conn.execQuery(sql, { id: id, tenantid: tenantid });

                                case 14:
                                    arr = _context24.sent;

                                    if (!(arr.length <= 0)) {
                                        _context24.next = 17;
                                        break;
                                    }

                                    return _context24.abrupt('return', { id: formData.id, ret: false });

                                case 17:
                                    _context24.next = 19;
                                    return conn.del(model, [formData.id]);

                                case 19:
                                    return _context24.abrupt('return', { id: formData.id, ret: true });

                                case 22:
                                    _context24.prev = 22;
                                    _context24.t0 = _context24['catch'](6);

                                    EasyNode.DEBUG && logger.debug(' ' + _context24.t0 + ' ' + _context24.t0.stack);
                                    return _context24.abrupt('return', { id: formData.id, ret: false });

                                case 26:
                                    _context24.prev = 26;
                                    _context24.next = 29;
                                    return me.app.ds.releaseConnection(conn);

                                case 29:
                                    return _context24.finish(26);

                                case 30:
                                case 'end':
                                    return _context24.stop();
                            }
                        }
                    }, _callee24, this, [[6, 22, 26, 30]]);
                });
            }
        }, {
            key: 'updateRecordCompanyid',
            value: function updateRecordCompanyid(id, companyid) {
                var me = this;
                return regeneratorRuntime.mark(function _callee25() {
                    var r, conn, model, code;
                    return regeneratorRuntime.wrap(function _callee25$(_context25) {
                        while (1) {
                            switch (_context25.prev = _context25.next) {
                                case 0:
                                    r = null;
                                    conn = null;
                                    model = new Record();
                                    code = '';
                                    _context25.prev = 4;
                                    _context25.next = 7;
                                    return me.app.ds.getConnection();

                                case 7:
                                    conn = _context25.sent;


                                    model.merge(Object.assign({}, { companyid: companyid, id: id }));
                                    _context25.next = 11;
                                    return conn.update(model);

                                case 11:
                                    r = _context25.sent;
                                    return _context25.abrupt('return', r.affectedRows + r.insertId > 0 ? true : false);

                                case 15:
                                    _context25.prev = 15;
                                    _context25.t0 = _context25['catch'](4);

                                    EasyNode.DEBUG && logger.debug(' ' + _context25.t0 + ',' + _context25.t0.stack);
                                    return _context25.abrupt('return', false);

                                case 19:
                                    _context25.prev = 19;
                                    _context25.next = 22;
                                    return me.app.ds.releaseConnection(conn);

                                case 22:
                                    return _context25.finish(19);

                                case 23:
                                case 'end':
                                    return _context25.stop();
                            }
                        }
                    }, _callee25, this, [[4, 15, 19, 23]]);
                });
            }
        }, {
            key: 'updateRecordWebsiteid',
            value: function updateRecordWebsiteid(id, websiteid) {
                var me = this;
                return regeneratorRuntime.mark(function _callee26() {
                    var r, conn, model, code;
                    return regeneratorRuntime.wrap(function _callee26$(_context26) {
                        while (1) {
                            switch (_context26.prev = _context26.next) {
                                case 0:
                                    r = null;
                                    conn = null;
                                    model = new Record();
                                    code = '';
                                    _context26.prev = 4;
                                    _context26.next = 7;
                                    return me.app.ds.getConnection();

                                case 7:
                                    conn = _context26.sent;


                                    model.merge(Object.assign({}, { websiteid: websiteid, id: id }));
                                    _context26.next = 11;
                                    return conn.update(model);

                                case 11:
                                    r = _context26.sent;
                                    return _context26.abrupt('return', r.affectedRows + r.insertId > 0 ? true : false);

                                case 15:
                                    _context26.prev = 15;
                                    _context26.t0 = _context26['catch'](4);

                                    EasyNode.DEBUG && logger.debug(' ' + _context26.t0 + ',' + _context26.t0.stack);
                                    return _context26.abrupt('return', false);

                                case 19:
                                    _context26.prev = 19;
                                    _context26.next = 22;
                                    return me.app.ds.releaseConnection(conn);

                                case 22:
                                    return _context26.finish(19);

                                case 23:
                                case 'end':
                                    return _context26.stop();
                            }
                        }
                    }, _callee26, this, [[4, 15, 19, 23]]);
                });
            }
        }, {
            key: 'savedraft',
            value: function savedraft() {
                var me = this;
                return regeneratorRuntime.mark(function _callee27() {
                    var formData, model, r;
                    return regeneratorRuntime.wrap(function _callee27$(_context27) {
                        while (1) {
                            switch (_context27.prev = _context27.next) {
                                case 0:
                                    formData = this.request.body;
                                    model = null;
                                    r = null;

                                    if (!(formData.drafttype == 1)) {
                                        _context27.next = 9;
                                        break;
                                    }

                                    _context27.next = 6;
                                    return me.saveBaseInfo(formData);

                                case 6:
                                    return _context27.abrupt('return', _context27.sent);

                                case 9:
                                    if (!(formData.drafttype == 2)) {
                                        _context27.next = 15;
                                        break;
                                    }

                                    _context27.next = 12;
                                    return me.saveCompanyInfo(formData);

                                case 12:
                                    return _context27.abrupt('return', _context27.sent);

                                case 15:
                                    if (!(formData.drafttype == 3)) {
                                        _context27.next = 21;
                                        break;
                                    }

                                    _context27.next = 18;
                                    return me.saveWebsiteInfo(formData);

                                case 18:
                                    return _context27.abrupt('return', _context27.sent);

                                case 21:
                                    if (!(formData.drafttype == 4)) {
                                        _context27.next = 25;
                                        break;
                                    }

                                    _context27.next = 24;
                                    return me.saveMaterial(formData);

                                case 24:
                                    return _context27.abrupt('return', _context27.sent);

                                case 25:
                                case 'end':
                                    return _context27.stop();
                            }
                        }
                    }, _callee27, this);
                });
            }

            /*
            formData.id optional
            formData.type 备案类型
            * */

        }, {
            key: 'saveBaseInfo',
            value: function saveBaseInfo(formData) {
                var me = this;
                return regeneratorRuntime.mark(function _callee28() {
                    var r, id, conn, code, sql, args, tenantid, ret;
                    return regeneratorRuntime.wrap(function _callee28$(_context28) {
                        while (1) {
                            switch (_context28.prev = _context28.next) {
                                case 0:
                                    r = null;
                                    id = 0;
                                    conn = null;
                                    code = '';
                                    sql = '';
                                    args = {};
                                    tenantid = this.session.user.tenantid;
                                    _context28.prev = 7;
                                    _context28.next = 10;
                                    return me.app.ds.getConnection();

                                case 10:
                                    conn = _context28.sent;

                                    if (!formData.baseinfo.hasOwnProperty("id")) {
                                        _context28.next = 20;
                                        break;
                                    }

                                    sql = 'UPDATE record set type = #type#,updatetime = #updatetime# where id = #id#';
                                    args = { id: formData.baseinfo.id, type: formData.baseinfo.type, updatetime: Date.now() };

                                    _context28.next = 16;
                                    return conn.execQuery(sql, args);

                                case 16:
                                    ret = _context28.sent;


                                    id = formData.baseinfo.id;
                                    _context28.next = 27;
                                    break;

                                case 20:
                                    code = utils.randomString(32, '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
                                    sql = 'INSERT record set type = #type#, code = #code#, tenantid = #tenantid#, updatetime = #updatetime#,createtime = #createtime#';
                                    args = { type: formData.baseinfo.type, code: code, tenantid: tenantid, updatetime: Date.now(), createtime: Date.now() };

                                    _context28.next = 25;
                                    return conn.execUpdate(sql, args);

                                case 25:
                                    ret = _context28.sent;

                                    id = ret.insertId;

                                case 27:
                                    _context28.next = 32;
                                    break;

                                case 29:
                                    _context28.prev = 29;
                                    _context28.t0 = _context28['catch'](7);

                                    EasyNode.DEBUG && logger.debug(' ' + _context28.t0 + ',' + _context28.t0.stack);

                                case 32:
                                    _context28.prev = 32;
                                    _context28.next = 35;
                                    return me.app.ds.releaseConnection(conn);

                                case 35:
                                    return _context28.abrupt('return', { drafttype: formData.drafttype, id: id });

                                case 37:
                                case 'end':
                                    return _context28.stop();
                            }
                        }
                    }, _callee28, this, [[7, 29, 32, 37]]);
                });
            }

            //2.

        }, {
            key: 'saveCompanyInfo',
            value: function saveCompanyInfo(formData) {
                var me = this;
                return regeneratorRuntime.mark(function _callee29() {
                    var r, id, conn, tenantid, model;
                    return regeneratorRuntime.wrap(function _callee29$(_context29) {
                        while (1) {
                            switch (_context29.prev = _context29.next) {
                                case 0:
                                    r = null;
                                    id = 0;
                                    conn = null;
                                    tenantid = this.session.user.tenantid;
                                    _context29.prev = 4;
                                    _context29.next = 7;
                                    return me.app.ds.getConnection();

                                case 7:
                                    conn = _context29.sent;
                                    model = new Company();

                                    model.merge(Object.assign({}, formData.companyinfo, { tenantid: tenantid }, { updatetime: Date.now() }));

                                    if (!formData.companyinfo.hasOwnProperty("id")) {
                                        _context29.next = 17;
                                        break;
                                    }

                                    _context29.next = 13;
                                    return conn.update(model);

                                case 13:
                                    r = _context29.sent;

                                    id = formData.companyinfo.id;
                                    _context29.next = 24;
                                    break;

                                case 17:
                                    model.merge({ createtime: Date.now() });
                                    _context29.next = 20;
                                    return conn.create(model);

                                case 20:
                                    r = _context29.sent;

                                    id = r.insertId;
                                    _context29.next = 24;
                                    return me.updateRecordCompanyid(formData.baseinfo.id, id);

                                case 24:
                                    _context29.next = 29;
                                    break;

                                case 26:
                                    _context29.prev = 26;
                                    _context29.t0 = _context29['catch'](4);

                                    EasyNode.DEBUG && logger.debug(' ' + _context29.t0 + ',' + _context29.t0.stack);

                                case 29:
                                    _context29.prev = 29;
                                    _context29.next = 32;
                                    return me.app.ds.releaseConnection(conn);

                                case 32:
                                    return _context29.abrupt('return', { drafttype: formData.drafttype, id: id });

                                case 34:
                                case 'end':
                                    return _context29.stop();
                            }
                        }
                    }, _callee29, this, [[4, 26, 29, 34]]);
                });
            }

            //3.

        }, {
            key: 'saveWebsiteInfo',
            value: function saveWebsiteInfo(formData) {
                var me = this;
                return regeneratorRuntime.mark(function _callee30() {
                    var r, id, model, conn, tenantid, data;
                    return regeneratorRuntime.wrap(function _callee30$(_context30) {
                        while (1) {
                            switch (_context30.prev = _context30.next) {
                                case 0:
                                    r = null;
                                    id = 0;
                                    model = new Website();
                                    conn = null;
                                    tenantid = this.session.user.tenantid;
                                    _context30.prev = 5;
                                    _context30.next = 8;
                                    return me.app.ds.getConnection();

                                case 8:
                                    conn = _context30.sent;
                                    data = Object.assign({}, formData.siteinfo, { tenantid: tenantid }, { updatetime: Date.now() });

                                    data.manageridtype = parseInt(data.manageridtype);
                                    data.accessmethod = JSON.stringify(data.accessmethod);
                                    data.ip = JSON.stringify(data.ip);
                                    data.languages = JSON.stringify(data.languages);
                                    model.merge(data);

                                    if (!formData.siteinfo.hasOwnProperty("id")) {
                                        _context30.next = 22;
                                        break;
                                    }

                                    _context30.next = 18;
                                    return conn.update(model);

                                case 18:
                                    r = _context30.sent;

                                    id = formData.siteinfo.id;
                                    _context30.next = 29;
                                    break;

                                case 22:
                                    model.merge({ createtime: Date.now() });
                                    _context30.next = 25;
                                    return conn.create(model);

                                case 25:
                                    r = _context30.sent;

                                    id = r.insertId;
                                    _context30.next = 29;
                                    return me.updateRecordWebsiteid(formData.baseinfo.id, id);

                                case 29:
                                    _context30.next = 34;
                                    break;

                                case 31:
                                    _context30.prev = 31;
                                    _context30.t0 = _context30['catch'](5);

                                    EasyNode.DEBUG && logger.debug(' ' + _context30.t0 + ',' + _context30.t0.stack);

                                case 34:
                                    _context30.prev = 34;
                                    _context30.next = 37;
                                    return me.app.ds.releaseConnection(conn);

                                case 37:
                                    return _context30.abrupt('return', { drafttype: formData.drafttype, id: id });

                                case 39:
                                case 'end':
                                    return _context30.stop();
                            }
                        }
                    }, _callee30, this, [[5, 31, 34, 39]]);
                });
            }

            //4. here, where in the draft status, it'll not generate the apply code.

        }, {
            key: 'saveMaterial',
            value: function saveMaterial(formData) {
                var me = this;
                return regeneratorRuntime.mark(function _callee31() {
                    var r, id, model, conn, tenantid;
                    return regeneratorRuntime.wrap(function _callee31$(_context31) {
                        while (1) {
                            switch (_context31.prev = _context31.next) {
                                case 0:
                                    r = null;
                                    id = 0;
                                    model = new Record();
                                    conn = null;
                                    tenantid = this.session.user.tenantid;
                                    _context31.prev = 5;
                                    _context31.next = 8;
                                    return me.app.ds.getConnection();

                                case 8:
                                    conn = _context31.sent;


                                    model.merge(Object.assign({}, formData.baseinfo, formData.material, {
                                        tenantid: tenantid,
                                        companyid: formData.companyinfo.id,
                                        websiteid: formData.siteinfo.id,
                                        status: 0
                                    }, { updatetime: Date.now() }));

                                    if (!formData.baseinfo.hasOwnProperty("id")) {
                                        _context31.next = 18;
                                        break;
                                    }

                                    model.merge(Object.assign({}, { updatetime: Date.now() }));

                                    _context31.next = 14;
                                    return conn.update(model);

                                case 14:
                                    r = _context31.sent;

                                    id = formData.baseinfo.id;
                                    _context31.next = 23;
                                    break;

                                case 18:
                                    //var code = utils.randomString(32, '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
                                    //model.merge(Object.assign({},{code: code}));
                                    model.merge({ createtime: Date.now() });
                                    _context31.next = 21;
                                    return conn.create(model);

                                case 21:
                                    r = _context31.sent;

                                    id = r.insertId;

                                case 23:
                                    _context31.next = 28;
                                    break;

                                case 25:
                                    _context31.prev = 25;
                                    _context31.t0 = _context31['catch'](5);

                                    EasyNode.DEBUG && logger.debug(' ' + _context31.t0 + ',' + _context31.t0.stack);

                                case 28:
                                    _context31.prev = 28;
                                    _context31.next = 31;
                                    return me.app.ds.releaseConnection(conn);

                                case 31:
                                    return _context31.abrupt('return', { drafttype: formData.drafttype, id: id });

                                case 33:
                                case 'end':
                                    return _context31.stop();
                            }
                        }
                    }, _callee31, this, [[5, 25, 28, 33]]);
                });
            }

            /*
            * key:  object key, can be date object
            * filename: 文件名
            * */

        }, {
            key: 'uploadNos',
            value: function uploadNos(key, filename) {
                var me = this;
                var cfg = me.app.config.nos;
                return regeneratorRuntime.mark(function _callee32() {
                    var url, nos;
                    return regeneratorRuntime.wrap(function _callee32$(_context32) {
                        while (1) {
                            switch (_context32.prev = _context32.next) {
                                case 0:
                                    url = '' + cfg.urlPath + key;
                                    nos = new Nos(cfg.accessKey, cfg.secretKey, cfg.bucket);
                                    _context32.prev = 2;
                                    _context32.next = 5;
                                    return nos.upload(key, filename);

                                case 5:
                                    _context32.next = 10;
                                    break;

                                case 7:
                                    _context32.prev = 7;
                                    _context32.t0 = _context32['catch'](2);

                                    console.log(_context32.t0);

                                case 10:
                                    nos = null;
                                    return _context32.abrupt('return', url);

                                case 12:
                                case 'end':
                                    return _context32.stop();
                            }
                        }
                    }, _callee32, this, [[2, 7]]);
                });
            }

            /*
            * key:  object key, can be date object
            * filename: 文件名
            * */

        }, {
            key: 'downloadNos',
            value: function downloadNos(key) {
                var me = this;
                var cfg = me.app.config.nos;
                return regeneratorRuntime.mark(function _callee33() {
                    var url, nos, ret;
                    return regeneratorRuntime.wrap(function _callee33$(_context33) {
                        while (1) {
                            switch (_context33.prev = _context33.next) {
                                case 0:
                                    url = '' + cfg.urlPath + key;
                                    nos = new Nos(cfg.accessKey, cfg.secretKey, cfg.bucket);
                                    _context33.prev = 2;
                                    _context33.next = 5;
                                    return nos.getObject(key);

                                case 5:
                                    ret = _context33.sent;
                                    _context33.next = 11;
                                    break;

                                case 8:
                                    _context33.prev = 8;
                                    _context33.t0 = _context33['catch'](2);

                                    console.log(_context33.t0);

                                case 11:

                                    nos = null;
                                    return _context33.abrupt('return', ret);

                                case 13:
                                case 'end':
                                    return _context33.stop();
                            }
                        }
                    }, _callee33, this, [[2, 8]]);
                });
            }
        }, {
            key: 'putSys',
            value: function putSys() {
                var i = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
                var k = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
                var v = arguments.length <= 2 || arguments[2] === undefined ? "0" : arguments[2];

                var me = this;
                return regeneratorRuntime.mark(function _callee34() {
                    var conn, arr, sql, form, key, value, id, model, r;
                    return regeneratorRuntime.wrap(function _callee34$(_context34) {
                        while (1) {
                            switch (_context34.prev = _context34.next) {
                                case 0:
                                    conn = null;
                                    arr = [];
                                    sql = '';
                                    form = this.request.body;
                                    key = form.key || k;
                                    value = form.value || v;
                                    id = i > 0 ? i : form.id || 0;
                                    _context34.prev = 7;
                                    model = new Sys();
                                    _context34.next = 11;
                                    return me.app.ds.getConnection();

                                case 11:
                                    conn = _context34.sent;


                                    model.merge({ id: id, k: key, value: value });

                                    _context34.next = 15;
                                    return conn.update(model);

                                case 15:
                                    r = _context34.sent;
                                    return _context34.abrupt('return', r.affectedRows + r.insertId > 0 ? true : false);

                                case 19:
                                    _context34.prev = 19;
                                    _context34.t0 = _context34['catch'](7);

                                    EasyNode.DEBUG && logger.debug(' ' + _context34.t0 + ' ' + _context34.t0.stack);
                                    return _context34.abrupt('return', false);

                                case 23:
                                    _context34.prev = 23;
                                    _context34.next = 26;
                                    return me.app.ds.releaseConnection(conn);

                                case 26:
                                    return _context34.finish(23);

                                case 27:
                                case 'end':
                                    return _context34.stop();
                            }
                        }
                    }, _callee34, this, [[7, 19, 23, 27]]);
                });
            }
        }, {
            key: 'getSys',
            value: function getSys() {
                var k = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

                var me = this;
                return regeneratorRuntime.mark(function _callee35() {
                    var conn, arr, sql, key, model;
                    return regeneratorRuntime.wrap(function _callee35$(_context35) {
                        while (1) {
                            switch (_context35.prev = _context35.next) {
                                case 0:
                                    conn = null;
                                    arr = [];
                                    sql = '';
                                    key = k > 0 ? k : this.parameter.param('key') || 0;

                                    console.log("key:", key);
                                    _context35.prev = 5;
                                    _context35.next = 8;
                                    return me.app.ds.getConnection();

                                case 8:
                                    conn = _context35.sent;
                                    model = new Sys();


                                    sql = 'SELECT value FROM sys WHERE k = #key#';
                                    _context35.next = 13;
                                    return conn.execQuery(sql, { key: key });

                                case 13:
                                    arr = _context35.sent;

                                    if (!(arr.length <= 0)) {
                                        _context35.next = 16;
                                        break;
                                    }

                                    return _context35.abrupt('return', 0);

                                case 16:
                                    return _context35.abrupt('return', arr[0].value);

                                case 19:
                                    _context35.prev = 19;
                                    _context35.t0 = _context35['catch'](5);

                                    EasyNode.DEBUG && logger.debug(' ' + _context35.t0 + ' ' + _context35.t0.stack);
                                    return _context35.abrupt('return', 0);

                                case 23:
                                    _context35.prev = 23;
                                    _context35.next = 26;
                                    return me.app.ds.releaseConnection(conn);

                                case 26:
                                    return _context35.finish(23);

                                case 27:
                                case 'end':
                                    return _context35.stop();
                            }
                        }
                    }, _callee35, this, [[5, 19, 23, 27]]);
                });
            }
        }, {
            key: 'isp_upload',
            value: function isp_upload(id) {
                var me = this;
                return regeneratorRuntime.mark(function _callee36() {
                    var json, beianInfo, args, type, ds;
                    return regeneratorRuntime.wrap(function _callee36$(_context36) {
                        while (1) {
                            switch (_context36.prev = _context36.next) {
                                case 0:
                                    _context36.next = 2;
                                    return me.getRecordb(id);

                                case 2:
                                    json = _context36.sent;
                                    _context36.prev = 3;
                                    type = json.record.type == 0 ? me.app.ispService.FIRST : json.record.type == 1 ? me.app.ispService.XZWZ : me.app.ispService.XZJR;
                                    _context36.next = 7;
                                    return me.app.ispService.genbeianInfo(json, type);

                                case 7:
                                    beianInfo = _context36.sent;

                                    args = me.app.ispService.getUploadInitParam();
                                    args.beianInfo = beianInfo.beianInfo;
                                    args.beianInfoHash = beianInfo.beianInfoHash;

                                    console.log("dataSequence upload:", args.dataSequence);
                                    _context36.next = 18;
                                    break;

                                case 14:
                                    _context36.prev = 14;
                                    _context36.t0 = _context36['catch'](3);

                                    EasyNode.DEBUG && logger.debug(' ' + _context36.t0);
                                    return _context36.abrupt('return', false);

                                case 18:
                                    console.log("isp_upload......");
                                    _context36.prev = 19;
                                    _context36.next = 22;
                                    return me.app.ispService.isp_upload(args).then(function (result) {
                                        console.log("is_upload success", result);
                                        args.dataSequence = result;
                                    }).catch(function (e, result) {
                                        console.log("isp_upload fail result", e, result);
                                        return false;
                                    });

                                case 22:
                                    ds = _context36.sent;

                                    me.app.sys.dataSequence = args.dataSequence;
                                    _context36.next = 26;
                                    return me.app.ispService.writeSys(me.app.sys);

                                case 26:
                                    return _context36.abrupt('return', true);

                                case 29:
                                    _context36.prev = 29;
                                    _context36.t1 = _context36['catch'](19);

                                    console.log(_context36.t1.stack);
                                    return _context36.abrupt('return', false);

                                case 33:
                                case 'end':
                                    return _context36.stop();
                            }
                        }
                    }, _callee36, this, [[3, 14], [19, 29]]);
                });
            }
        }, {
            key: 'isp_upload_hsjg',
            value: function isp_upload_hsjg(id) {
                var me = this;
                return regeneratorRuntime.mark(function _callee37() {
                    var json, beianInfo, args, ds;
                    return regeneratorRuntime.wrap(function _callee37$(_context37) {
                        while (1) {
                            switch (_context37.prev = _context37.next) {
                                case 0:
                                    _context37.next = 2;
                                    return me.getRecordb(id);

                                case 2:
                                    json = _context37.sent;
                                    _context37.prev = 3;
                                    _context37.next = 6;
                                    return me.app.ispService.genbeianInfo(json, me.app.ispService.HSJG);

                                case 6:
                                    beianInfo = _context37.sent;


                                    args = me.app.ispService.getUploadInitParam();
                                    args.beianInfo = beianInfo.beianInfo;
                                    args.beianInfoHash = beianInfo.beianInfoHash;

                                    console.log("dataSequence upload:", args.dataSequence);
                                    _context37.next = 17;
                                    break;

                                case 13:
                                    _context37.prev = 13;
                                    _context37.t0 = _context37['catch'](3);

                                    EasyNode.DEBUG && logger.debug(' ' + _context37.t0);
                                    return _context37.abrupt('return', false);

                                case 17:
                                    console.log("isp_upload hsjg......");
                                    _context37.prev = 18;
                                    _context37.next = 21;
                                    return me.app.ispService.isp_upload(args).then(function (result) {
                                        console.log("is_upload hsjg success", result);
                                        args.dataSequence = result;
                                    }).catch(function (e, result) {
                                        console.log("isp_upload hsjg fail result", e, result);
                                        return false;
                                    });

                                case 21:
                                    ds = _context37.sent;

                                    me.app.sys.dataSequence = args.dataSequence;
                                    _context37.next = 25;
                                    return me.app.ispService.writeSys(me.app.sys);

                                case 25:
                                    return _context37.abrupt('return', true);

                                case 28:
                                    _context37.prev = 28;
                                    _context37.t1 = _context37['catch'](18);

                                    console.log(_context37.t1.stack);
                                    return _context37.abrupt('return', false);

                                case 32:
                                case 'end':
                                    return _context37.stop();
                            }
                        }
                    }, _callee37, this, [[3, 13], [18, 28]]);
                });
            }
        }, {
            key: 'isp_verifybamm',
            value: function isp_verifybamm() {
                var baxhp = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
                var bammp = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

                var me = this;
                return regeneratorRuntime.mark(function _callee38() {
                    var baxh, bamm, args, ret;
                    return regeneratorRuntime.wrap(function _callee38$(_context38) {
                        while (1) {
                            switch (_context38.prev = _context38.next) {
                                case 0:
                                    baxh = this.parameter && this.parameter.param && this.parameter.param('baxh') || baxhp;
                                    bamm = this.parameter && this.parameter.param && this.parameter.param('bamm') || bammp;
                                    _context38.prev = 2;

                                    console.log("isp_verifybamm......");

                                    args = me.app.ispService.getInitParam();
                                    args.baxh = baxh;
                                    args.bamm = bamm;
                                    console.log(args);
                                    _context38.next = 10;
                                    return me.app.ispService.isp_verifybamm(args).then(function (result) {
                                        console.log("isp_verifybamm success", result);
                                        return result;
                                    }).catch(function (e, result) {
                                        console.log("isp_verifybamm fail result", e, result);
                                        return { ret: false, msg: "Error" };
                                    });

                                case 10:
                                    ret = _context38.sent;
                                    return _context38.abrupt('return', ret);

                                case 14:
                                    _context38.prev = 14;
                                    _context38.t0 = _context38['catch'](2);

                                    console.log(_context38.t0.stack);

                                case 17:
                                case 'end':
                                    return _context38.stop();
                            }
                        }
                    }, _callee38, this, [[2, 14]]);
                });
            }
        }, {
            key: 'isp_querybeianstatus',
            value: function isp_querybeianstatus() {
                var queryConditionTypep = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
                var queryConditionp = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

                var me = this;
                return regeneratorRuntime.mark(function _callee39() {
                    var queryConditionType, queryCondition, args, ret;
                    return regeneratorRuntime.wrap(function _callee39$(_context39) {
                        while (1) {
                            switch (_context39.prev = _context39.next) {
                                case 0:
                                    queryConditionType = this.parameter && this.parameter.param && this.parameter.param('queryConditionType') || queryConditionTypep;
                                    queryCondition = this.parameter && this.parameter.param && this.parameter.param('queryCondition') || queryConditionp;
                                    _context39.prev = 2;

                                    console.log("isp_querybeianstatus......");

                                    args = me.app.ispService.getInitParam();
                                    args.queryConditionType = queryConditionType;
                                    args.queryCondition = queryCondition;

                                    _context39.next = 9;
                                    return me.app.ispService.isp_querybeianstatus(args).then(function (result) {
                                        console.log("isp_querybeianstatus success", result);
                                        return result;
                                    }).catch(function (e, result) {
                                        console.log("isp_querybeianstatus fail result", e, result);
                                        return { ret: false, msg: "Error" };
                                    });

                                case 9:
                                    ret = _context39.sent;
                                    return _context39.abrupt('return', ret);

                                case 13:
                                    _context39.prev = 13;
                                    _context39.t0 = _context39['catch'](2);

                                    console.log(_context39.t0.stack);

                                case 16:
                                case 'end':
                                    return _context39.stop();
                            }
                        }
                    }, _callee39, this, [[2, 13]]);
                });
            }
        }, {
            key: 'createIply',
            value: function createIply() {
                var me = this;
                return regeneratorRuntime.mark(function _callee40() {
                    var model, r, conn, formData, id;
                    return regeneratorRuntime.wrap(function _callee40$(_context40) {
                        while (1) {
                            switch (_context40.prev = _context40.next) {
                                case 0:
                                    model = null;
                                    r = null;
                                    conn = null;
                                    formData = this.request.body;
                                    _context40.prev = 4;
                                    _context40.next = 7;
                                    return me.app.ds.getConnection();

                                case 7:
                                    conn = _context40.sent;


                                    model = new Iply();
                                    model.merge(Object.assign({}, formData));

                                    _context40.next = 12;
                                    return conn.create(model);

                                case 12:
                                    r = _context40.sent;

                                    id = r.insertId;
                                    _context40.next = 19;
                                    break;

                                case 16:
                                    _context40.prev = 16;
                                    _context40.t0 = _context40['catch'](4);

                                    EasyNode.DEBUG && logger.debug(' ' + _context40.t0 + ',' + _context40.t0.stack);

                                case 19:
                                    _context40.prev = 19;
                                    _context40.next = 22;
                                    return me.app.ds.releaseConnection(conn);

                                case 22:
                                    return _context40.abrupt('return', { id: id });

                                case 24:
                                case 'end':
                                    return _context40.stop();
                            }
                        }
                    }, _callee40, this, [[4, 16, 19, 24]]);
                });
            }
        }, {
            key: 'createArea',
            value: function createArea() {
                var me = this;
                return regeneratorRuntime.mark(function _callee41() {
                    var model, r, conn, formData, id;
                    return regeneratorRuntime.wrap(function _callee41$(_context41) {
                        while (1) {
                            switch (_context41.prev = _context41.next) {
                                case 0:
                                    model = null;
                                    r = null;
                                    conn = null;
                                    formData = this.request.body;
                                    _context41.prev = 4;
                                    _context41.next = 7;
                                    return me.app.ds.getConnection();

                                case 7:
                                    conn = _context41.sent;


                                    model = new Area();
                                    model.merge(Object.assign({}, formData, { updatetime: Date.now(), createtime: Date.now() }));

                                    _context41.next = 12;
                                    return conn.create(model);

                                case 12:
                                    r = _context41.sent;

                                    id = r.insertId;
                                    _context41.next = 19;
                                    break;

                                case 16:
                                    _context41.prev = 16;
                                    _context41.t0 = _context41['catch'](4);

                                    EasyNode.DEBUG && logger.debug(' ' + _context41.t0 + ',' + _context41.t0.stack);

                                case 19:
                                    _context41.prev = 19;
                                    _context41.next = 22;
                                    return me.app.ds.releaseConnection(conn);

                                case 22:
                                    return _context41.abrupt('return', { id: id });

                                case 24:
                                case 'end':
                                    return _context41.stop();
                            }
                        }
                    }, _callee41, this, [[4, 16, 19, 24]]);
                });
            }
        }, {
            key: 'createResources',
            value: function createResources() {
                var me = this;
                return regeneratorRuntime.mark(function _callee42() {
                    var formData, version, localurl, fileList, walk, index, fileName, pos, key, url;
                    return regeneratorRuntime.wrap(function _callee42$(_context42) {
                        while (1) {
                            switch (_context42.prev = _context42.next) {
                                case 0:
                                    walk = function walk(path) {
                                        var dirList = f.readdirSync(path);
                                        dirList.forEach(function (item) {
                                            if (f.statSync(path + '/' + item).isDirectory()) {
                                                walk(path + '/' + item);
                                            } else {
                                                fileList.push(path + '/' + item);
                                            }
                                        });
                                    };

                                    formData = this.request.body;
                                    version = formData.version;
                                    localurl = formData.localurl;
                                    fileList = [];


                                    walk(localurl);

                                    console.log(fileList);

                                    index = 0;

                                case 8:
                                    if (!(index < fileList.length)) {
                                        _context42.next = 21;
                                        break;
                                    }

                                    fileName = fileList[index];
                                    pos = fileName.lastIndexOf('/') + 1;

                                    fileName = fileName.substr(pos, fileName.length - pos);
                                    console.log(fileName);
                                    key = version + '_' + process.env.ENV + '_' + fileName;
                                    _context42.next = 16;
                                    return me.uploadNos(key, fileList[index]);

                                case 16:
                                    url = _context42.sent;

                                    console.log(url);

                                case 18:
                                    index++;
                                    _context42.next = 8;
                                    break;

                                case 21:
                                    return _context42.abrupt('return', { ret: true });

                                case 22:
                                case 'end':
                                    return _context42.stop();
                            }
                        }
                    }, _callee42, this);
                });
            }
        }, {
            key: 'getClassName',
            value: function getClassName() {
                return EasyNode.namespace(__filename);
            }
        }]);

        return StoreService;
    }(GenericObject);

    module.exports = StoreService;
})();