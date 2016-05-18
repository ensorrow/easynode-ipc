'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _define = require('../../../../public/netease/icp/constant/define');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var assert = require('assert');
var logger = using('easynode.framework.Logger').forFile(__filename);
var GenericObject = using('easynode.GenericObject');
var S = require('string');
var thunkify = require('thunkify');
var Routes = using('netease.icp.backend.routes.Routes');
var MySqlDataSource = using('easynode.framework.db.MysqlDataSource');
var HTTPUtil = using('easynode.framework.util.HTTPUtil');
var IspService = using('netease.icp.backend.services.IspService');
var schedule = require('node-schedule');
var StoreService = using('netease.icp.backend.services.StoreService');
var co = require('co');


(function () {
    /**
     * Class Main
     *
     * @class netease.icp.backend.Main
     * @extends easynode.GenericObject
     * @since 0.1.0
     * @author allen.hu
     * */

    var Main = function (_GenericObject) {
        _inherits(Main, _GenericObject);

        /**
         * 构造函数。
         *
         * @method 构造函数
         * @since 0.1.0
         * @author allen.hu
         * */

        function Main() {
            _classCallCheck(this, Main);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(Main).call(this));
            //调用super()后再定义子类成员。
        }

        _createClass(Main, [{
            key: 'getClassName',

            //var job = schedule.scheduleJob('*/1 * * * *',function (){
            //    EasyNode.DEBUG && logger.debug(`Executing query task....`);
            //    httpServer.checklist.forEach(function(element, index, array){
            //        console.log("element:",element);
            //        co( function*(){
            //            var storeService = new StoreService(httpServer);
            //            var ret = yield storeService.getRecordb(element);
            //
            //            console.log(ret);
            //        });
            //
            //    });
            //});
            /* var timerFunc =
             setInterval(function(){
                     co( function*(){
                          if( !config.icp.QUERY ){
                             return ;
                         }
                          //1.下载数据
                         var args = ispService.getInitParam();
                         var fileInfos = yield ispService.isp_download(args).then(function (result) {
                             return result;
                         }).catch(function (e) {
                         });
                          if( fileInfos ){
                             //2.解密码,解压数据
                             var ret = yield ispService.decryptContent([fileInfos.return_FileName,fileInfos.beianInfo,fileInfos.beianInfoHash],fileInfos.compressionFormat,fileInfos.hashAlgorithm,fileInfos.encryptAlgorithm);
                              //3.处理数据
                             if( ret.result ){
                                 var fs = require('fs');
                                 fs.writeFileSync(fileInfos.return_FileName,JSON.stringify(ret.beianInfo),'utf8');
                                 var addressRet  = yield ispService.addressDownloadData(ret.beianInfo);
                                 console.log('addressRet:',addressRet);
                             }
                              //4.下载回执
                             args = null;
                             args = ispService.getInitParam();
                             args.fileName = fileInfos.return_FileName;
                              ret = yield ispService.isp_downloadack(args).then(function (result) {
                                 return result;
                             }).catch(function (e) {
                             });
                              console.log('isp_downloadack resutl',ret);
                         }
                            //1.查询备案状态开始
                         var id = httpServer.checklist.shift() || 0;
                         if( id == 0 )
                             return ;
                         var storeService = new StoreService(httpServer);
                         var ret = yield storeService.getRecordb(id);
                         var result = [];
                         var r = {};
                         try{
                             var r1 = yield ispService.gettenantPubips(ret.record.tenantid).then(function (result) {
                                 return result;
                             }).catch(function (e) {
                                 return null;
                             });
                             if( r1 ){
                                 r1 = JSON.parse(result);
                                 if( r1.code == 200 ){
                                     if(  ispService.validateIP(ret.website.ip,r1.params) ){
                                         result.push({return:{msg_code:0,msg:`用户IP${ret.website.ip} OK`}});
                                     }else{
                                         var tenantips = JSON.stringify(r1.params);
                                         result.push({return:{msg_code:10200,msg:`用户IP${ret.website.ip} 非法,不在范围${tenantips}`}});
                                     }
                                 }else{
                                      result.push({return:{msg_code:r1.code+10000,msg:r1.msg}});
                                 }
                             }
                               if( ret.website.domain ){
                                r =  yield storeService.isp_querybeianstatus(IDTYPE.DOMAIN,ret.website.domain);
                                 result.push(r);
                             }
                             if( ret.website.domain1 ){
                                 r =   yield storeService.isp_querybeianstatus(IDTYPE.DOMAIN,ret.website.domain1);
                                 result.push(r);
                             }
                             if( ret.website.domain2 ){
                                 r =  yield storeService.isp_querybeianstatus(IDTYPE.DOMAIN,ret.website.domain2);
                                 result.push(r);
                             }
                             if( ret.website.domain3 ){
                                 r =  yield storeService.isp_querybeianstatus(IDTYPE.DOMAIN,ret.website.domain3);
                                 result.push(r);
                             }
                             if( ret.website.domain4 ){
                                 r =  yield storeService.isp_querybeianstatus(IDTYPE.DOMAIN,ret.website.domain4);
                                 result.push(r);
                             }
                              r = yield storeService.isp_querybeianstatus(ret.company.idtype,ret.company.idnumber);
                             result.push(r);
                             ret = yield storeService.putBeianstatus(ret.record.id,JSON.stringify(result));
                             console.log("putBeianstatus result:",ret);
                          }catch(e){
                             EasyNode.DEBUG && logger.debug(` ${e}`);
                             return false;
                         }
                         //查询备案状态结束
                        });
             },10000);*/
            value: function getClassName() {
                return EasyNode.namespace(__filename);
            }
        }], [{
            key: 'main',
            value: regeneratorRuntime.mark(function main() {
                var configUrl, config, ds, conn, sql, args, arr, KOAHttpServer, httpPort, httpServer, pid, fs, ispService, sys;
                return regeneratorRuntime.wrap(function main$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                //load config
                                configUrl = process.env.CONFIG_URL;
                                config = {};

                                if (!configUrl.startsWith("http")) {
                                    _context4.next = 8;
                                    break;
                                }

                                _context4.next = 5;
                                return HTTPUtil.getJSON(configUrl);

                            case 5:
                                _context4.t0 = _context4.sent;
                                _context4.next = 9;
                                break;

                            case 8:
                                _context4.t0 = require(configUrl);

                            case 9:
                                config = _context4.t0;

                                //
                                //
                                ////Database source, connection pool
                                ds = new MySqlDataSource();

                                ds.initialize(config.mysql);

                                ////数据库查询
                                _context4.next = 14;
                                return ds.getConnection();

                            case 14:
                                conn = _context4.sent;
                                sql = 'SELECT max(id)  as maxCode FROM user';
                                args = {};
                                _context4.next = 19;
                                return conn.execQuery(sql, args = {});

                            case 19:
                                arr = _context4.sent;

                                console.log(arr);
                                _context4.next = 23;
                                return ds.releaseConnection(conn);

                            case 23:

                                //HTTP Server
                                KOAHttpServer = using('easynode.framework.server.http.KOAHttpServer');
                                httpPort = S(EasyNode.config('http.server.port', '7000')).toInt();
                                httpServer = new KOAHttpServer(httpPort);

                                httpServer.setSessionStorage(KOAHttpServer.SessionSupport.STORAGE_REDIS, {
                                    host: '218.205.113.98',
                                    port: 6380,
                                    db: 1,
                                    auth_pass: '1122334455'
                                });

                                pid = S(EasyNode.config('easynode.app.pid', '/var/tmp/icp.pid')).toString();
                                fs = require('fs');

                                console.log("pid", pid);
                                fs.writeFileSync(pid, process.pid);

                                httpServer.ds = ds;
                                httpServer.ds.conn = conn;
                                httpServer.config = config;

                                ispService = new IspService(httpServer, config);
                                //yield ispService.createConnect();

                                httpServer.ispService = ispService;

                                //设置ContextHook,
                                httpServer.setActionContextListener({
                                    onCreate: function onCreate(ctx) {
                                        console.log("onCreate");
                                        return regeneratorRuntime.mark(function _callee() {
                                            return regeneratorRuntime.wrap(function _callee$(_context) {
                                                while (1) {
                                                    switch (_context.prev = _context.next) {
                                                        case 0:
                                                            _context.t0 = ctx;
                                                            _context.next = 3;
                                                            return ds.getConnection();

                                                        case 3:
                                                            _context.t1 = _context.sent;

                                                            _context.t0.setConnection.call(_context.t0, _context.t1);

                                                            _context.next = 7;
                                                            return ctx.getConnection().beginTransaction();

                                                        case 7:
                                                        case 'end':
                                                            return _context.stop();
                                                    }
                                                }
                                            }, _callee, this);
                                        });
                                    },
                                    onDestroy: function onDestroy(ctx) {
                                        console.log("onDestroy");
                                        return regeneratorRuntime.mark(function _callee2() {
                                            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                                while (1) {
                                                    switch (_context2.prev = _context2.next) {
                                                        case 0:
                                                            _context2.next = 2;
                                                            return ctx.getConnection().commit();

                                                        case 2:
                                                            _context2.next = 4;
                                                            return ds.releaseConnection(ctx.getConnection());

                                                        case 4:
                                                        case 'end':
                                                            return _context2.stop();
                                                    }
                                                }
                                            }, _callee2, this);
                                        });
                                    },

                                    onError: function onError(ctx, err) {
                                        console.log("onError");
                                        return regeneratorRuntime.mark(function _callee3() {
                                            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                                while (1) {
                                                    switch (_context3.prev = _context3.next) {
                                                        case 0:
                                                            _context3.next = 2;
                                                            return ctx.getConnection().rollback();

                                                        case 2:
                                                            !err.executeResult && logger.error(err.stack);

                                                        case 3:
                                                        case 'end':
                                                            return _context3.stop();
                                                    }
                                                }
                                            }, _callee3, this);
                                        });
                                    }
                                });

                                httpServer.name = EasyNode.config('http.server.name', 'icp-Service');
                                Routes.defineRoutes(httpServer);

                                _context4.next = 41;
                                return httpServer.start();

                            case 41:
                                httpServer.checklist = [];
                                _context4.next = 44;
                                return ispService.readSys();

                            case 44:
                                sys = _context4.sent;

                                httpServer.sys = JSON.parse(sys);
                                EasyNode.DEBUG && logger.debug(' init sys: ', httpServer.sys);
                            case 47:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, main, this);
            })
        }]);

        return Main;
    }(GenericObject);

    module.exports = Main;
})();