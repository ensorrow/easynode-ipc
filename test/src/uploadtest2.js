/**
 * Created by hujiabao on 9/21/15.
 */

'use strict';

import co from 'co';
import chai from 'chai';
//import request from 'supertest';

const assert = chai.assert;


require('easynode');

EasyNode.addArg('easynode-home',process.cwd());
EasyNode.addSourceDirectory('/node_modules/easynode/src');


const logger = using('easynode.framework.Logger').getLogger();



describe('UploadService',function() {

    before(function(done){
        console.log("UploadService before");
        try{

            var map = new Map([[1, "123"], [2, "Author"]]);

            map.size // 2
            map.has(1) // true
            map.get("title") // "Author"

/*
            var b = new Buffer('JavaScript');
            var s = b.toString('base64');
            // SmF2YVNjcmlwdA==
            console.log(s);


             b = new Buffer('SmF2YVNjcmlwdA==', 'base64')
             s = b.toString();
            console.log(s);


            b = new Buffer('1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
            var s = b.toString('base64');
            // SmF2YVNjcmlwdA==
            console.log(s);


            b = new Buffer('MTIzNDU2Nzg5MGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVo=', 'base64')
            s = b.toString();
            console.log(s);*/

            done();
        }catch(e){
            done(e);
        }
    });

    it('upload',function (done){
        done();
    });
    /*
        it('GET /getVersionInfo?version=0.0.2',function (done){
            req.get('/getVersionInfo?version=0.0.2')
                .expect(200)
                .expect({
                    resCode:0,
                    resReason:'0.1.0',
                    url:'http://apollodev.nos.netease.com/0.0.2-0.1.0.zip'
                })
                .end(done);
        });*/

    //it('GET /getVersionInfo?version=0.1.0',function (done){
    //    req.get('/getVersionInfo?version=0.1.0')
    //        .expect(200)
    //        .expect({
    //            resCode:102,
    //            resReason:'请求包版本号已是最新版本',
    //            url:''
    //        })
    //        .end(done);
    //});



    after(function(done){
        console.log("Uploadservice after");
        done();

    });

});