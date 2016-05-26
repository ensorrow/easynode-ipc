'use strict';
var assert = require('assert');
var logger = using('easynode.framework.Logger').forFile(__filename);
var GenericObject = using('easynode.GenericObject');
var S = require('string');
var thunkify = require('thunkify');
var Routes = using('netease.icp.backend.routes.Routes');
var MySqlDataSource = using('easynode.framework.db.MysqlDataSource');
var HTTPUtil = using('easynode.framework.util.HTTPUtil');
var StringUtil = using('easynode.framework.util.StringUtil');
var IspService = using('netease.icp.backend.services.IspService');
var schedule = require('node-schedule');
var StoreService = using('netease.icp.backend.services.StoreService');
var co = require('co');
var fs = require('fs');

import {IDTYPE} from '../../../../public/netease/icp/constant/define';


(function() {
    /**
     * Class Main
     *
     * @class netease.icp.backend.Main
     * @extends easynode.GenericObject
     * @since 0.1.0
     * @author allen.hu
     * */
  class Main extends GenericObject
    {
        /**
         * 构造函数。
         *
         * @method 构造函数
         * @since 0.1.0
         * @author allen.hu
         * */
    constructor() {
      super();
            // 调用super()后再定义子类成员。

    }


    static *main() {
            // load config
      var configUrl = process.env.CONFIG_URL;
      var config = {};
      if( configUrl.startsWith('http') ){
        config = yield HTTPUtil.getJSON(configUrl);
      } else {
        config = fs.readFileSync(configUrl);
      }
      config = JSON.parse(StringUtil.decryptAdv(config.toString('utf8')));

            //
            //
            // //Database source, connection pool
      var ds = new MySqlDataSource();
      ds.initialize(config.mysql);

            // //数据库查询
      var conn = yield ds.getConnection();
      var sql = 'SELECT max(id)  as maxCode FROM user';
      var args = {};
      var arr = yield conn.execQuery(sql, args = {});
      yield ds.releaseConnection(conn);


            // HTTP Server
      var KOAHttpServer = using('easynode.framework.server.http.KOAHttpServer');
      var httpPort = S(EasyNode.config('http.server.port', '7000')).toInt();
      var httpServer = new KOAHttpServer(httpPort);
      httpServer.setSessionStorage(KOAHttpServer.SessionSupport.STORAGE_REDIS, {
        host: '218.205.113.98',
        port: 6380,
        db:1,
        auth_pass: '1122334455'
      });

      var pid = S(EasyNode.config('easynode.app.pid', '/var/tmp/icp.pid')).toString();
      fs.writeFileSync(pid, process.pid);

      httpServer.ds = ds;
      httpServer.ds.conn = conn;
      httpServer.config = config;

      var ispService = new IspService(httpServer, config);
            // yield ispService.createConnect();
      httpServer.ispService = ispService;

            // 设置ContextHook,
      httpServer.setActionContextListener({
        onCreate: function(ctx) {
          return function *() {
            ctx.setConnection(yield ds.getConnection());
            yield ctx.getConnection().beginTransaction();
          };
        },
        onDestroy: function(ctx) {
          return function *() {
            yield ctx.getConnection().commit();
            yield ds.releaseConnection(ctx.getConnection());
          };
        },

        onError: function(ctx, err) {
          return function *() {
            yield ctx.getConnection().rollback();
            !err.executeResult && logger.error(err.stack);
          };
        }
      });


      httpServer.name = EasyNode.config('http.server.name', 'icp-Service');
      Routes.defineRoutes(httpServer);


      yield httpServer.start();
      httpServer.checklist = [];
      var sys = yield ispService.readSys();
      httpServer.sys = JSON.parse(sys);
      EasyNode.DEBUG && logger.debug(' init sys: ', httpServer.sys);
            // var job = schedule.scheduleJob('*/1 * * * *',function (){
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
            // });
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
    }

    getClassName() {
      return EasyNode.namespace(__filename);
    }
  }

  module.exports = Main;
})();

