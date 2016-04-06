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
import fs from 'fs';

require('easynode');
EasyNode.addArg('easynode-home',process.cwd());
EasyNode.addSourceDirectory('/node_modules/easynode/src');
const logger = using('easynode.framework.Logger').getLogger();

var IspService = using('netease.icp.backend.services.IspService');
var ispService ;
var StoreService = using('netease.icp.backend.services.StoreService');
var storeService;

var url = 'http://icp.hzspeed.cn/admin/record/?id=590';
var urlPic = 'http://apollodev.nos.netease.com/1457595670071';
var json = {};
var Nos = require('nenos');

describe('IspService',function() {

    before(function(done){
        console.log("IspService before");
        try{
            ispService = new IspService();
            storeService = new StoreService();
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

    it('download Picture',function (done){

        co(function * () {
            var ret = yield storeService.downloadNos(1457595670071);
            done();
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
    //        yield ispService.isp_querypreviousupload(ispService.getInitParam(false)).then(function(result){
    //                console.log(result);
    //                done();
    //        }).catch(function(e){
    //                done(e);
    //        });
    //    });
    //
    //});
    //
    it('isp_upload',function (done){

        co(function * () {

            var beianInfo;
            var args;
            try{
                 beianInfo = yield ispService.genbeianInfo(json,ispService.FIRST);
                 args = Object.assign(ispService.getUploadInitParam(), beianInfo);
                // var ret = yield ispService.decryptContent([beianInfo.beianInfo,beianInfo.beianInfoHash]);
                //
                //console.log("decrypt resut:",ret.result);
                //console.log("decryptContent:",ret.beianInfo);

            }catch(e){
                EasyNode.DEBUG && logger.debug(` ${e}`);
            }
            try{
                fs.writeFileSync('/Users/hujiabao/Downloads/reqdata.txt',JSON.stringify(args));
            }catch(e){
                EasyNode.DEBUG && logger.debug(` ${e}`);
            }

            ispService.isp_upload(args).then(function (result) {
                console.log(result);
                console.log("aaa");
                done();
            }).catch(function (e) {
                console.log("eeeee");
                done(e);
            });
        });

    });

    //it('isp_download',function (done){
    //
    //    co(function * () {
    //
    //        var ret = ispService.getInitParam();
    //        ispService.isp_download(ret).then(function () {
    //            done();
    //        }).catch(function (e) {
    //            done(e);
    //        });
    //    });
    //
    //});
    //
    //it('isp_downloadack',function (done){
    //
    //    co(function * () {
    //
    //        var ret = ispService.getInitParam();
    //        ispService.isp_downloadack(ret).then(function(){
    //            done();
    //        }).catch(function(e){
    //            done(e);
    //        });
    //
    //    });
    //
    //});
    //
    //
    //
    //it('isp_querybeianstatus',function (done){
    //
    //    co(function * () {
    //
    //        var ret = ispService.getInitParam();
    //
    //        ispService.isp_querybeianstatus(ret).then(function () {
    //            done();
    //        }).catch(function (e) {
    //            done(e);
    //        });
    //
    //    });
    //});
    //
    //
    //it('isp_verifybamm',function (done){
    //    co(function * () {
    //
    //        var ret = ispService.getInitParam();
    //        ret = Object.assign(ret,{baxh:'aaa',bamm:'bbb'});
    //        console.log(ret);
    //        ispService.isp_verifybamm(ret).then(function (result) {
    //            console.log("verifybamm result:",result);
    //            done();
    //        }).catch(function (e) {
    //            done(e);
    //        });
    //    });
    //
    //});
    //
    //it('genPwdHash',function (done){
    //    var code = utils.randomString(20, '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
    //
    //    console.log( ispService.genPwdHash(code) );
    //    done();
    //});
    //
    //it('encryptContent',function (done){
    //    var code = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    //
    //    co(function * (){
    //        var {beianInfo,beianInfoHash} =  yield ispService.encryptContent(code);
    //        console.log(beianInfo);
    //        console.log(beianInfoHash);
    //        done();
    //    });
    //});
    //
    //it('decryptContent',function (done){
    //    var beianInfo2 = 'H4sIAAAAAAAAAzM0MjYxNTO3sDRITEpOSU1Lz8jMys7JzcsvKCwqLiktK6+orHJ0cnZxdXP38PTy9vH18w8IDAoOCQ0Lj4iMAgBFGT7tPgAAAA==';
    //    var beianInfoHash = 'OZFmswllxLaiTX8/gjB7JQ==';
    //    co(function * (){
    //        var {beianInfo,result} =  yield ispService.decryptContent([beianInfo2,beianInfoHash]);
    //        console.log(beianInfo);
    //        console.log(result);
    //        done();
    //    });
    //});
    //
    //it('getDownloadInitParam',function (done){
    //    co(function * (){
    //        var ret =  yield ispService.getInitParam();
    //        console.log(ret);
    //        ret =  yield ispService.getInitParam(false);
    //        console.log(ret);
    //        done();
    //    });
    //});
    //
    //it('getUploadInitParam',function (done){
    //    co(function * (){
    //        var ret =  yield ispService.getUploadInitParam();
    //        console.log(ret);
    //        done();
    //    });
    //});

    after(function(done){
        console.log("IspService after");
        done();
    });

});