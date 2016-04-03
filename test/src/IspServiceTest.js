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
var request = require('superagent');

require('easynode');
EasyNode.addArg('easynode-home',process.cwd());
EasyNode.addSourceDirectory('/node_modules/easynode/src');
const logger = using('easynode.framework.Logger').getLogger();

var IspService = using('netease.icp.backend.services.IspService');
var ispService ;

var url = 'http://icp.hzspeed.cn/admin/record/?id=590';
var json = {};
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

    it('getRecordJson',function (done){

        request
            .get(url)
            .end(function(err, res){
                // Do something
                if( err ){
                    done(err);
                }else{
                    json = res.body;
                    console.log(json);
                    done();
                }
            });
    });

    it('createConnect',function (done){

        ispService.createConnect().then(function(){
           done();
        }).catch(function(e){
            done(e);
        });
    });


    //it('isp_querypreviousupload',function (done){
    //
    //    co(function * (){
    //        yield ispService.isp_querypreviousupload(ispService.getDownloadInitParam()).then(function(){
    //                done();
    //        }).catch(function(e){
    //                done(e);
    //        });
    //    });
    //
    //});

    it('isp_upload',function (done){


        co(function * () {


            var beianInfo = yield ispService.genbeianInfo(json,ispService.FIRST);
            var args;
            try{
                 args = Object.assign( ispService.getUploadInitParam(), beianInfo);
                console.log(args);

            }catch(e){
                EasyNode.DEBUG && logger.debug(` ${e}`);
            }

            ispService.isp_upload(args).then(function () {
                done();
            }).catch(function (e) {
                done(e);
            });
        });

    });

    //it('isp_download',function (done){
    //
    //    co(function * () {
    //
    //        var ret = ispService.getDownloadInitParam();
    //        console.log(ret);
    //        //ispService.isp_download(ret).then(function () {
    //        //    done();
    //        //}).catch(function (e) {
    //        //    done(e);
    //        //});
    //    });
    //
    //});
/*



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