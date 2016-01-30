var assert = require('assert');
var logger = using('easynode.framework.Logger').forFile(__filename);
var GenericObject = using('easynode.GenericObject');
var S = require('string');
var thunkify = require('thunkify');
var Routes = using('netease.icp.backend.routes.Routes');
var MySqlDataSource = using('easynode.framework.db.MysqlDataSource');
var HTTPUtil =  using('easynode.framework.util.HTTPUtil');

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
        }

        getClassName()
        {
            return EasyNode.namespace(__filename);
        }
    }

    module.exports = Main;
})();
