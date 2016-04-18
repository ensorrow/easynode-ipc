/**
 * Created by hujiabao on 9/21/15.
 */

'use strict';

import co from 'co';
import chai from 'chai';
import request from 'superagent';

const assert = chai.assert;


require('easynode');

EasyNode.addArg('easynode-home',process.cwd());
EasyNode.addSourceDirectory('/node_modules/easynode/src');


const logger = using('easynode.framework.Logger').getLogger();


var storeService ;
var dataSequence = 0;

describe('ControllerTest',function() {

    before(function(done){
        console.log("ControllerTest before");
        try{
            done();
        }catch(e){
            done(e);
        }
    });

    it('upload',function (done){
        done();
    })

    it('get tenants public ips ',function (done){

        request.post('https://c.163.com/api/account/pubips?secret=3soLEF67wx&tenantId=b261f52d302b43ba821a6d731b17034c')
            //.send({secret:'3soLEF67wx',tenantId:'b261f52d302b43ba821a6d731b17034c'})
            .end(function(err,ret){
                console.log("err",err);

                console.log(ret.text);
                done();
            });

    })

    it('Put /admin/record',function (done){

        //590-首次备案  603-新增网站 669-新增接入
        request.put('http://icpdev.hzspeed.cn/admin/record')
            .send({id:724,status:7,reasons:'passed',checkedlisturl:'http://apollodev.nos.netease.com/1460686622187%E7%99%BB%E5%BD%952.png'})
            .end(done);
    });


    it('Put /record',function (done){

        //590-首次备案  603-新增网站 669-新增接入
        request.put('http://icpdev.hzspeed.cn/record')
            .send({id:684,status:1,reasons:'passed',tenantid:'cffbc4146a7941f9ad443ad650518ff1'})
            .end(done);
    });


    //it('Get /admin/records',function (done){
    //
    //    request.get('http://icpdev.hzspeed.cn/admin/records')
    //        .query({filter:6,rpp:20,page:0})
    //        .accept('json')
    //        .end(function(err, res){
    //            // Do something
    //
    //            console.log(res.text);
    //            //var ret = JSON.parse(res.text);
    //            //dataSequence = ret.ret;
    //            done();
    //        });
    //});

    //it('Get /admin/rest/sys',function (done){
    //
    //    request.get('http://icpdev.hzspeed.cn/admin/rest/sys')
    //        .query({id:1,key:1})
    //        .accept('json')
    //        .end(function(err, res){
    //            // Do something
    //
    //            console.log(res.text);
    //            //var ret = JSON.parse(res.text);
    //            //dataSequence = ret.ret;
    //            done();
    //        });
    //});
    //
    //it('Get /admin/icp/verifybamm',function (done){
    //
    //    request.get('http://icpdev.hzspeed.cn/admin/icp/verifybamm')
    //        .query({baxh:"浙ICP备14001515号",bamm:"EZM123"})
    //        .accept('json')
    //        .end(function(err, res){
    //            // Do something
    //
    //            console.log(res.text);
    //            done();
    //        });
    //});

    //it('Get /admin/icp/querybeianstatus identity',function (done){
    //
    //    request.get('http://icpdev.hzspeed.cn/admin/icp/querybeianstatus')
    //        .query({queryConditionType:2,queryCondition:""})
    //        .accept('json')
    //        .end(function(err, res){
    //            // Do something
    //
    //            console.log(res.text);
    //            done();
    //        });
    //});
    //
    //
    //it('Get /admin/icp/querybeianstatus 163.com',function (done){
    //
    //    request.get('http://icpdev.hzspeed.cn/admin/icp/querybeianstatus')
    //        .query({queryConditionType:0,queryCondition:"163.com"})
    //        .accept('json')
    //        .end(function(err, res){
    //            // Do something
    //
    //            console.log(res.text);
    //            done();
    //        });
    //});
    //
    //it('Get /admin/icp/querybeianstatus aaa163.com',function (done){
    //
    //    request.get('http://icpdev.hzspeed.cn/admin/icp/querybeianstatus')
    //        .query({queryConditionType:0,queryCondition:"aaa163.com"})
    //        .accept('json')
    //        .end(function(err, res){
    //            // Do something
    //
    //            console.log(res.text);
    //            done();
    //        });
    //});

    //it('Put /rest/sys',function (done){
    //
    //    request.put('http://icpdev.hzspeed.cn/rest/sys')
    //        .send({id:1,key:1,value:dataSequence+""})
    //        .accept('json')
    //        .end(function(err, res){
    //            // Do something
    //
    //            console.log(res.text);
    //            done();
    //        });
    //});


    after(function(done){
        console.log("Uploadservice after");
        done();

    });

});
