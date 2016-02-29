'use strict'

var assert = require('assert');
var logger = using('easynode.framework.Logger').forFile(__filename);
var GenericObject = using('easynode.GenericObject');
var S = require('string');
var thunkify = require('thunkify');

import Controllers from '../controllers/Controllers';
import bodyParse from 'koa-body';


(function () {
    /**
     * Class Routes
     *
     * @class netease.icp.routes.Routes
     * @extends easynode.GenericObject
     * @since 0.1.0
     * @author allen.hu
     * */
    class Routes extends GenericObject
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

        static defineRoutes(httpServer)
        {
            Routes.addRoute(httpServer);

            httpServer.addMiddleware(bodyParse());
            httpServer.addWebDirs('plugins');
            httpServer.addTemplateDirs('plugins/views');
        }

        static addRoute(httpServer)
        {
            httpServer.addRoute('get', '/', Controllers.home(httpServer));
            httpServer.addRoute('post','/api/comments.json',Controllers.comment(httpServer));
            httpServer.addRoute('get','/login/callback',Controllers.loginCallback(httpServer));
            httpServer.addRoute('get','/logout',Controllers.logout(httpServer));
            httpServer.addRoute('post','/upl',Controllers.upload(httpServer));
            httpServer.addRoute('post','/records',Controllers.createRecord(httpServer));
            httpServer.addRoute('post','/savedraft',Controllers.savedraft(httpServer));
            httpServer.addRoute('post','/delrecord',Controllers.deleteRecord(httpServer));
            httpServer.addRoute('get','/records',Controllers.getRecords(httpServer));
            httpServer.addRoute('get','/record',Controllers.getRecord(httpServer));
            httpServer.addRoute('put','/record',Controllers.putRecord(httpServer));
            httpServer.addRoute('put','/user',Controllers.putUser(httpServer));

            //to op(whitelist)
            httpServer.addRoute('put','/curtain/admin',Controllers.putCurtainb(httpServer));
            httpServer.addRoute('get','/curtains/admin',Controllers.getCurtainsb(httpServer));
            httpServer.addRoute('get','/records/admin',Controllers.getRecordsb(httpServer));
            httpServer.addRoute('get','/record/admin',Controllers.getRecordb(httpServer));
            httpServer.addRoute('put','/record/admin',Controllers.putRecordb(httpServer));
        }

        getClassName()
        {
            return EasyNode.namespace(__filename);
        }
    }

    module.exports  = Routes;
})();
