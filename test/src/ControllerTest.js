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

var env = process.env.ENV;
const BASE_URI = env == 'PRODUCTION' ? 'http://icp.c.163.com' :
                 env == 'TEST' ? 'http://icp.hzspeed.cn' : 'http://icpdev.hzspeed.cn';
const LOCAL_URI = env == 'PRODUCTION' ? '/usr/src/app' :
                  env == 'TEST' ? '/usr/src/app' : '/Users/hujiabao/workspace_docker/icp/easynode-ipc';
const VERSION = '0.0.5';

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
    });

    it('deploy resouces',function (done){
        var url = `${BASE_URI}/admin/resources`;
        console.log(url);
        request.post(url)
            .send({version:VERSION,localurl:`${LOCAL_URI}/plugins/assets`})
            .accept('json')
            .end(function(err, res){
                // Do something
                console.log(res.text);
            });

        var url = `${BASE_URI}/admin/resources`;
        console.log(url);
        request.post(url)
            .send({version:VERSION,localurl:`${LOCAL_URI}/plugins/build`})
            .accept('json')
            .end(function(err, res){
                // Do something
                console.log(res.text);
                done();
            });
    });

    it('get curtains',function (done){

        //.send({filter:3,page:0,rpp:2})->query
        request.get(`${BASE_URI}/admin/curtains2`)
            .query({filter:3,page:1,rpp:2})
            .accept('json')
            .end(function(err, res){
                // Do something
                console.log(res.text);
                done();
            });


    });

    it('putt curtains',function (done){

        //.send({filter:3,page:0,rpp:2})->query
        request.put(`${BASE_URI}/user`)
            .send({mailingaddress:'hujb2000@163.com',recipient:'胡家宝',recipientmobile:'18657105763',recordid:860,userid:165})
            .accept('json')
            .end(function(err, res){
                // Do something
                console.log(res.text);
                done();
            });
    });

    /* it('Put /admin/record',function (done){

         //590-首次备案  603-新增网站 669-新增接入
         request.put('http://icpdev.hzspeed.cn/admin/record')
             .send({id:724,status:7,reasons:'passed',checkedlisturl:'http://apollodev.nos.netease.com/1460686622187%E7%99%BB%E5%BD%952.png'})
             .end(done);
     });*/

  /*  it('Post /admin/recordsbystatus',function (done){

        request.post('http://icpdev.hzspeed.cn/admin/recordsbystatus')
            .send({filter:[1],rpp:20,page:0})
            .accept('json')
            .end(function(err, res){
                // Do something

                console.log(res.text);
                var datas = JSON.parse(res.text);
                datas = datas.data;
                for( var index=0; index< datas.length; index++){
                    console.log(datas[index].status);
                }
                done();
            });
    });
*/
    /*it('Put /admin/area',function (done){

        request.post('http://icpdev.hzspeed.cn/admin/area')
            .send({code:'111',name:'test',level:'县'})
            .end(done);
    });*/

    /*it('get area code',function (done){

        var opts = {
            "page.pageSize":"20",
            "pageNo":"3"
        };//Not work, post with ? param can work
        request.post('http://www.miitbeian.gov.cn/basecode/query/showareacode.action?page.pageSize=20&pageNo=3')
            .send(opts)
            .end(function(err,ret){
                console.log("err",err);

                console.log(ret.text);
                done();
            });

    })*/

   /* it('get tenants public ips ',function (done){

        request.post('https://c.163.com/api/account/pubips?secret=3soLEF67wx&tenantId=b261f52d302b43ba821a6d731b17034c')
            //.send({secret:'3soLEF67wx',tenantId:'b261f52d302b43ba821a6d731b17034c'})
            .end(function(err,ret){
                console.log("err",err);

                console.log(ret.text);
                done();
            });

    })



    it('Put /record',function (done){

        //590-首次备案  603-新增网站 669-新增接入
        request.put('http://icpdev.hzspeed.cn/record')
            .send({id:684,status:1,reasons:'passed',tenantid:'cffbc4146a7941f9ad443ad650518ff1'})
            .end(done);
    });
*/

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
