var assert = require('assert');
var logger = using('easynode.framework.Logger').forFile(__filename);
var GenericObject = using('easynode.GenericObject');
var S = require('string');
var thunkify = require('thunkify');
var Routes = using('netease.icp.backend.routes.Routes');
var MySqlDataSource = using('easynode.framework.db.MysqlDataSource');
var HTTPUtil =  using('easynode.framework.util.HTTPUtil');
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
    class Main extends GenericObject
    {
        /**
         * 构造函数。
         *
         * @method 构造函数
         * @since 0.1.0
         * @author allen.hu
         * */
        constructor()
        {
            super();
            //调用super()后再定义子类成员。
        }

        static * main(){
            //load config
            var configUrl = process.env.CONFIG_URL;
            var config = {};
            config = configUrl.startsWith("http") ? yield HTTPUtil.getJSON(configUrl) : require(configUrl);
            //
            //
            ////Database source, connection pool
            var ds = new MySqlDataSource();
            ds.initialize(config.mysql);

            ////数据库查询
            var conn = yield ds.getConnection();
            var sql = 'SELECT max(id)  as maxCode FROM user';
            var args = {};
            var arr = yield conn.execQuery(sql, args = {});
            console.log(arr);
            yield ds.releaseConnection(conn);


            //HTTP Server
            var KOAHttpServer =  using('easynode.framework.server.http.KOAHttpServer');
            var httpPort = S(EasyNode.config('http.server.port','7000')).toInt();
            var httpServer = new KOAHttpServer(httpPort);


            httpServer.ds = ds;
            httpServer.ds.conn = conn;

            var ispService = new IspService(httpServer);
            yield ispService.createConnect();
            httpServer.ispService = ispService;

            //设置ContextHook,
            httpServer.setActionContextListener({
                onCreate: function (ctx) {
                    console.log("onCreate");
                    return function * () {
                        ctx.setConnection(yield ds.getConnection());
                        yield ctx.getConnection().beginTransaction();
                    };
                },
                onDestroy: function (ctx) {
                    console.log("onDestroy");
                    return function * () {
                        yield ctx.getConnection().commit();
                        yield ds.releaseConnection(ctx.getConnection());
                    };
                },

                onError: function (ctx, err) {
                    console.log("onError");
                    return function * () {
                        yield ctx.getConnection().rollback();
                        !err.executeResult  && logger.error(err.stack);
                    };
                }
            });

            httpServer.config = config;
            httpServer.name = EasyNode.config('http.server.name','icp-Service');
            Routes.defineRoutes(httpServer);

            yield httpServer.start();
            httpServer.checklist = [];
            var sys  = yield ispService.readSys();
            httpServer.sys =  JSON.parse(sys);
            EasyNode.DEBUG && logger.debug(` init sys: `,httpServer.sys);
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
            var timerFunc =
            setInterval(function(){
                httpServer.checklist.forEach(function(element, index, array){
                    console.log("element:",element);
                    co( function*(){
                        var storeService = new StoreService(httpServer);
                        var ret = yield storeService.getRecordb(element);
                        console.log(ret);
                        try{
                            ret = yield storeService.isp_querybeianstatus(2,'330222197809135514');
                            console.log(ret);

                        }catch(e){
                            EasyNode.DEBUG && logger.debug(` ${e}`);
                            return false;
                        }

                    });

                });
            },10000);
        }

        getClassName()
        {
            return EasyNode.namespace(__filename);
        }
    }

    module.exports = Main;
})();
