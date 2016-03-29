/**
 * Created by hujiabao on 9/21/15.
 */

'use strict';

import co from 'co';
require("babel-polyfill");
import chai from 'chai';
const assert = chai.assert;
var utils = require('utility');


require('easynode');
EasyNode.addArg('easynode-home',process.cwd());
EasyNode.addSourceDirectory('/node_modules/easynode/src');
const logger = using('easynode.framework.Logger').getLogger();

var IspService = using('netease.icp.backend.services.ispService');
var ispService ;

describe('IspService',function() {

    before(function(done){
        console.log("IspService before");
        try{
            ispService = new IspService();

            done();
        }catch(e){
            done(e);
        }
    });

   /* it('createConnect',function (done){

        ispService.createConnect().then(function(){
           done();
        }).catch(function(e){
            done(e);
        });
    });


    it('isp_upload',function (done){
        ispService.isp_upload({}).then(function(){
            done();
        }).catch(function(e){
            done(e);
        });
    });

    it('isp_download',function (done){
        ispService.isp_download({}).then(function(){
            done();
        }).catch(function(e){
            done(e);
        });
    });

    it('isp_downloadack',function (done){
        ispService.isp_downloadack({}).then(function(){
            done();
        }).catch(function(e){
            done(e);
        });
    });

    it('isp_querypreviousupload',function (done){
        ispService.isp_querypreviousupload({}).then(function(){
            done();
        }).catch(function(e){
            done(e);
        });
    });

    it('isp_querybeianstatus',function (done){
        ispService.isp_querybeianstatus({}).then(function(){
            done();
        }).catch(function(e){
            done(e);
        });
    });


    it('isp_verifybamm',function (done){
        ispService.isp_verifybamm({}).then(function(){
            done();
        }).catch(function(e){
            done(e);
        });
    });*/

    it('genPwdHash',function (done){
        var code = utils.randomString(20, '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

        console.log( ispService.genPwdHash(code) );
        done();
    });

    it('encryptContent',function (done){
        var code = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

        co(function * (){
            var ret =  yield ispService.encryptContent(code);
            if( ret == '111' )
                done();
            else {
                done();
            }
        });

    });

    after(function(done){
        console.log("IspService after");
        done();
    });

});