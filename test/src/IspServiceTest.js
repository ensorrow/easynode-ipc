/**
 * Created by hujiabao on 9/21/15.
 */

'use strict';

import co from 'co';
require("babel-polyfill");
import chai from 'chai';
const assert = chai.assert;
var utils = require('utility');
const crypto = require('crypto');
var md5 = crypto.createHash('md5');


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

    it('createConnect',function (done){

        ispService.createConnect().then(function(){
           done();
        }).catch(function(e){
            done(e);
        });
    });

    it('isp_querypreviousupload',function (done){

        co(function * (){
            ispService.isp_querypreviousupload(ispService.getDownloadInitParam()).then(function(){
                    done();
                }).catch(function(e){
                    done(e);
                });
            });

    });

 /*   it('isp_download',function (done){
        ispService.isp_download(ispService.getDownloadInitParam()).then(function(){
            done();
        }).catch(function(e){
            done(e);
        });
    });*/
/*
    it('isp_upload',function (done){
        ispService.isp_upload({}).then(function(){
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

   /* it('genPwdHash',function (done){
        var code = utils.randomString(20, '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

        console.log( ispService.genPwdHash(code) );
        done();
    });

    it('encryptContent',function (done){
        var code = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

        co(function * (){
            var {beianInfo,beianInfoHash} =  yield ispService.encryptContent(code);
            done();
        });
    });

    it('decryptContent',function (done){
        var beianInfo2 = 'H4sIAAAAAAAAAzM0MjYxNTO3sDRITEpOSU1Lz8jMys7JzcsvKCwqLiktK6+orHJ0cnZxdXP38PTy9vH18w8IDAoOCQ0Lj4iMAgBFGT7tPgAAAA==';
        var beianInfoHash = 'Mzk5MTY2YjMwOTY1YzRiNmEyNGQ3ZjNmODIzMDdiMjU=';
        co(function * (){
            var {beianInfo,result} =  yield ispService.decryptContent([beianInfo2,beianInfoHash]);
            done();
        });
    });
*/
   /* it('getDownloadInitParam',function (done){
        co(function * (){
            var ret =  yield ispService.getDownloadInitParam();
            console.log(ret);
            done();
        });
    });*/

    //it('getUploadInitParam',function (done){
    //    co(function * (){
    //        var ret =  yield ispService.getUploadInitParam();
    //        done();
    //    });
    //});

    after(function(done){
        console.log("IspService after");
        done();
    });

});