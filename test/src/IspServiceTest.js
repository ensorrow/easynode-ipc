
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

var url = 'http://icpdev.hzspeed.cn/admin/record/?id=590';
var urlPic = 'http://apollodev.nos.netease.com/1457595670071';
var json = {};

var config = require('../../config.json');



describe('IspService',function() {

    before(function(done){
        console.log("IspService before");
        try{
            ispService = new IspService(null,config);
            done();
        }catch(e){
            done(e);
        }
    });

    it('get tenant public ips',function (done){

        co(function * () {
             var ret = yield ispService.gettenantPubips('').then(function (result) {
                return result;
            }).catch(function (e) {
            });

            console.log(ret);
            done();
        });

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

    //it('download Picture',function (done){
    //
    //    co(function * () {
    //        var pic = yield ispService.downloadNos('http://apollodev.nos.netease.com/1457408249032?imageView&quality=50');
    //        fs.writeFile("/Users/hujiabao/Downloads/1457595670071logonew.png", pic, "binary", function(err){
    //            if(err){
    //                console.log("down fail");
    //            }
    //            console.log("down success");
    //        });
    //    });
    //
    //});


    it('createConnect',function (done){

        ispService.createConnect().then(function(){
           done();
        }).catch(function(e){
            done(e);
        });

    });


    // it('isp_upload IP XZBA',function (done){
    //
    //    var iplys = [
    //        {
    //            qsip:1778535425,
    //            zzip:1778536446,
    //            lydw:1197,
    //            bz:'',
    //            area:'义桥',
    //            net:'106.2.76.0/22',
    //            status:0
    //        },
    //        {
    //            qsip:1778534401,
    //            zzip:1778535422,
    //            lydw:1197,
    //            bz:'',
    //            area:'义桥',
    //            net:'106.2.72.0/22',
    //            status:0
    //        },
    //        {
    //            qsip:1778537473,
    //            zzip:1778538494,
    //            lydw:1197,
    //            bz:'',
    //            area:'义桥',
    //            net:'106.2.84.0/22',
    //            status:0
    //        },
    //        {
    //            qsip:1778545665,
    //            zzip:1778546686,
    //            lydw:1197,
    //            bz:'',
    //            area:'义桥',
    //            net:'106.2.116.0/22',
    //            status:0
    //        },
    //        {
    //            qsip:1778546689,
    //            zzip:1778547710,
    //            lydw:1197,
    //            bz:'',
    //            area:'义桥',
    //            net:'106.2.120.0/22',
    //            status:0
    //        },
    //        {
    //            qsip:3757891329,
    //            zzip:3757891582,
    //            lydw:1197,
    //            bz:'',
    //            area:'萧山',
    //            net:'223.252.223.0/24'
    //        },
    //        {
    //            qsip:1778541057,
    //            zzip:1778541566,
    //            lydw:1197,
    //            bz:'',
    //            area:'萧山',
    //            net:'106.2.98.0/23',
    //            status:0
    //        },
    //        {
    //            qsip:1778531329,
    //            zzip:1778531838,
    //            lydw:1197,
    //            bz:'',
    //            area:'萧山',
    //            net:'106.2.60.0/23',
    //            status:0
    //        },
    //        {
    //            qsip:1778544641,
    //            zzip:1778545662,
    //            lydw:1197,
    //            bz:'',
    //            area:'萧山',
    //            net:'106.2.112.0/22',
    //            status:0
    //        },
    //        {
    //            qsip:1778541569,
    //            zzip:1778542078,
    //            lydw:1197,
    //            bz:'',
    //            area:'萧山',
    //            net:'106.2.100.0/23',
    //            status:0
    //        },
    //        {
    //            qsip:1778543617,
    //            zzip:1778544638,
    //            lydw:1197,
    //            bz:'',
    //            area:'萧山',
    //            net:'106.2.108.0/22',
    //            status:0
    //        },
    //        {
    //            qsip:1778547457,
    //            zzip:1778547710,
    //            lydw:1197,
    //            bz:'',
    //            area:'萧山',
    //            net:'106.2.123.0/24',
    //            status:0
    //        }
    //    ];var iplys = [
    //        {
    //            id:79,
    //            qsip:1778535425,
    //            zzip:1778536446,
    //            lydw:1197,
    //            bz:'',
    //            area:'义桥',
    //            net:'106.2.76.0/22',
    //            status:0
    //        },
    //        {
    //            id:80,
    //            qsip:1778534401,
    //            zzip:1778535422,
    //            lydw:1197,
    //            bz:'',
    //            area:'义桥',
    //            net:'106.2.72.0/22',
    //            status:0
    //        },
    //        {
    //            id:81,
    //            qsip:1778537473,
    //            zzip:1778538494,
    //            lydw:1197,
    //            bz:'',
    //            area:'义桥',
    //            net:'106.2.84.0/22',
    //            status:0
    //        },
    //        {
    //            id:82,
    //            qsip:1778545665,
    //            zzip:1778546686,
    //            lydw:1197,
    //            bz:'',
    //            area:'义桥',
    //            net:'106.2.116.0/22',
    //            status:0
    //        },
    //        {
    //            id:83,
    //            qsip:1778546689,
    //            zzip:1778547710,
    //            lydw:1197,
    //            bz:'',
    //            area:'义桥',
    //            net:'106.2.120.0/22',
    //            status:0
    //        },
    //        {
    //            id:84,
    //            qsip:3757891329,
    //            zzip:3757891582,
    //            lydw:1197,
    //            bz:'',
    //            area:'萧山',
    //            net:'223.252.223.0/24'
    //        },
    //        {
    //            id:85,
    //            qsip:1778541057,
    //            zzip:1778541566,
    //            lydw:1197,
    //            bz:'',
    //            area:'萧山',
    //            net:'106.2.98.0/23',
    //            status:0
    //        },
    //        {
    //            id:86,
    //            qsip:1778531329,
    //            zzip:1778531838,
    //            lydw:1197,
    //            bz:'',
    //            area:'萧山',
    //            net:'106.2.60.0/23',
    //            status:0
    //        },
    //        {
    //            id:87,
    //            qsip:1778544641,
    //            zzip:1778545662,
    //            lydw:1197,
    //            bz:'',
    //            area:'萧山',
    //            net:'106.2.112.0/22',
    //            status:0
    //        },
    //        {
    //            id:88,
    //            qsip:1778541569,
    //            zzip:1778542078,
    //            lydw:1197,
    //            bz:'',
    //            area:'萧山',
    //            net:'106.2.100.0/23',
    //            status:0
    //        },
    //        {
    //            id:89,
    //            qsip:1778543617,
    //            zzip:1778544638,
    //            lydw:1197,
    //            bz:'',
    //            area:'萧山',
    //            net:'106.2.108.0/22',
    //            status:0
    //        },
    //        {
    //            id:90,
    //            qsip:1778547457,
    //            zzip:1778547710,
    //            lydw:1197,
    //            bz:'',
    //            area:'萧山',
    //            net:'106.2.123.0/24',
    //            status:0
    //        }
    //    ];
    //
    //    co(function * () {
    //
    //        var index = 0;
    //
    //        var upload = function(json){
    //            return function*(){
    //                    var beianInfo;
    //                    var args;
    //                    try{
    //                        beianInfo = yield ispService.genbeianInfo(json,ispService.IP_XZBA);
    //                        args = ispService.getUploadInitParam();
    //                        args.beianInfo  = beianInfo.beianInfo;
    //                        args.beianInfoHash = beianInfo.beianInfoHash;
    //                        console.log("dataSequence upload:",args.dataSequence);
    //
    //                    }catch(e){
    //                        EasyNode.DEBUG && logger.debug(` ${e}`);
    //                    }
    //
    //                    console.log("isp_upload......");
    //                   var ret =  yield ispService.isp_upload(args);
    //                    return ret;
    //            }
    //        }
    //
    //
    //        for( var index = 0; index < iplys.length; index++ ){
    //            console.log("1:",index);
    //            console.log(iplys[index]);
    //            var ret = yield  upload(iplys[index]);
    //            console.log("2:",index);
    //            console.log("ret:",ret);
    //        }
    //
    //        done();
    //
    //    });
    //
    //});

    it('isp_querypreviousupload',function (done){

        co(function * (){
            var args = ispService.getInitParam(false);
            console.log(args);
            var fileInfos =  yield ispService.isp_querypreviousupload(args).then(function(result){
                    return  result;
            }).catch(function(e){
                    done(e);
            });
            //console.log("1",fileInfos);
            fs.writeFileSync("/Users/hujiabao/Downloads/response.text",JSON.stringify(fileInfos),'utf8');

            var ret = yield ispService.decryptContent([fileInfos.return_FileName,fileInfos.beianInfo,fileInfos.beianInfoHash],fileInfos.compressionFormat,fileInfos.hashAlgorithm,fileInfos.encryptAlgorithm);

            console.log(ret);

            done();
        });

    });

   /* it('isp_upload',function (done){

        co(function * () {

            var beianInfo;
            var args;
            try{
                console.log("1");
                 beianInfo = yield ispService.genbeianInfo(json,ispService.FIRST);
                console.log("2");
                 console.log("1");
                 args = ispService.getUploadInitParam();
                 args.beianInfo  = beianInfo.beianInfo;
                 args.beianInfoHash = beianInfo.beianInfoHash;
                 console.log("dataSequence upload:",args.dataSequence);

            }catch(e){
                EasyNode.DEBUG && logger.debug(` ${e}`);
            }

            /!*console.log("isp_upload......");
            try{
                yield ispService.isp_upload(args).then(function (result) {
                    console.log("is_upload success",result);
                    done();
                }).catch(function (e,result) {
                    console.log("isp_upload fail result",result);
                    done(e);
                });
            }catch(e){
                console.log(e.stack);
            }*!/

        });

    });*/

    //it('isp_aes',function (done){
    //
    //    co(function * () {
    //
    //        var fileInfos = { hashAlgorithm: '0',
    //            compressionFormat: '0',
    //            encryptAlgorithm: '1',
    //            return_FileName: '20160325145800_zj_3058.xml',
    //            beianInfo: 'Ls8OAZdqLhaj9MCcXmGqxy2DUdDv8Ld4rwQUi5AVdqBH8pODo+CL6hVYv6aN6x5av768LcUNIqfz\n349Lu20VImVPj3sz2xOyrVUvVfWYnhEUSo91lvNXqFtat7abvyJB84vEq4L2e8mOMBeXBP1xGTE0\nlwSxp17Q4ZAm29koG5HZrDZtD1ARkDu4gxRpJHQpe5A0KUkLt4b21pN4wm1TymLWDY33F7AW/aXn\ntg001UkIUpvJROdtC/EGAFX3Njw3mRrDcFFDm0zwvOzT1XJ4HMTZ3DNXjM3p72MiInlbxaecpLeO\nMWHcn3Dv0xt4F5U/2cOEN9cd/gX3aUcoQNMKgdpkiP1FmJn0eWBpE9+z2gTITB2laAp8bU3pgnho\nn8m2Tg1RSSNcYs5+fN0Nge0rYHg2FIvLNaJgfV5OvMBConCL8SDvztA+GdHOaLdTy1LnLRYaoChJ\nJ2B9+wFvsJ2PLsyTxC7cEq4IfH642lSgqYwDlbcdop7Md7R0C0LN5E9MQX2iBRkUfQ+Zo8DkL/j8\nVgwZ4sIl2W+krHjPKKEwvh4hh8WZpec7xlTOphS5iodOdD9jMYGxIA+mZBEj4V6ue0zVUamYC79v\nLYFfwAVzIMar2LY3ww6WOyLMTgIw4UsM',
    //            beianInfoHash: '/zrK5Hj2EqlugKYulKvAnQ==' };
    //        console.log(fileInfos);
    //        yield ispService.decryptContent([fileInfos.beianInfo,fileInfos.beianInfoHash],fileInfos.compressionFormat,fileInfos.hashAlgorithm,fileInfos.encryptAlgorithm);
    //
    //        //var encoded = ispService.encryption("abcdefghijklmnopqrstuvwxyz");
    //        //var decoded = ispService.decryption(encoded);
    //        //console.log(encoded);
    //        //console.log(decoded);
    //
    //        done();
    //    });
    //
    //});

    //it('isp_download',function (done){
    //
    //    co(function * () {
    //
    //        //1.下载数据
    //        var args = ispService.getInitParam();
    //        console.log('isp_download param',args);
    //        var fileInfos = yield ispService.isp_download(args).then(function (result) {
    //            return result;
    //        }).catch(function (e) {
    //            done(e);
    //        });
    //
    //        console.log("isp_download  info",fileInfos);
    //
    //        //2.解密码,解压数据
    //        var ret = yield ispService.decryptContent([fileInfos.return_FileName,fileInfos.beianInfo,fileInfos.beianInfoHash],fileInfos.compressionFormat,fileInfos.hashAlgorithm,fileInfos.encryptAlgorithm);
    //
    //        console.log("decryptContent", ret);
    //
    //        //3.处理数据
    //        if( ret.result ){
    //            fs.writeFileSync('/Users/hujiabao/Downloads/req.txt',JSON.stringify(ret));
    //            try{
    //                var addressRet  = yield ispService.addressDownloadData(ret.beianInfo);
    //                console.log('addressRet:',addressRet);
    //            }catch(e){
    //                EasyNode.DEBUG && logger.debug(` ${e}`);
    //            }
    //
    //        }
    //
    //        console.log("download data address over");
    //
    //        //4.下载回执
    //        console.log("downloadack start....");
    //        args = null;
    //        args = ispService.getInitParam();
    //        args.fileName = fileInfos.return_FileName;
    //
    //        ret = yield ispService.isp_downloadack(args).then(function (result) {
    //            return result;
    //        }).catch(function (e) {
    //            done(e);
    //        });
    //
    //        console.log("downloadack ended, ret:",ret);
    //
    //        done();
    //
    //    });
    //
    //});

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
    //        yield ispService.isp_querybeianstatus(ret).then(function () {
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
