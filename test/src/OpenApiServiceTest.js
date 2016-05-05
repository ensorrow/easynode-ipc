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

var openapic = {
    "app_key": "daaf3fdb307f4a38844211325116b72c",
    "app_secret": "bc12d62d47344a31b3c21a8693e2498d"
};

var url = "https://open.c.163.com";
var token = {};
var image = {};
describe('OpenApiServiceTest',function() {

    before(function(done){
        console.log("OpenApiServiceTest before");
        try{
            done();
        }catch(e){
            done(e);
        }
    });

    it('generate api token',function (done){
        request.post(url+'/api/v1/token')
            .send(openapic)
            .accept('json')
            .end(function(err, res){
                // Do something
                //{"token":"6ffc416758d4410fba78fa39120d9bb6","expires_in":86400}
                token = JSON.parse(res.text);
                console.log(token.token);
                done();
            });
    });



    it('get repositories list',function (done){
        request.get(url+'/api/v1/repositories')
            .set('Authorization', 'Token ' + token.token)
            .send({limit:20,offset:0})
            .accept('json')
            .end(function(err, res){
                // Do something
                var json = JSON.parse(res.text);
                image = json.repositories[0];
                console.log(res.text);
                console.log(image);
                done();
            });
    });

    //icp repo_id=424
    it('get images  token',function (done){
        request.get(url+'/api/v1/repositories/424')
            .set('Authorization', 'Token ' + token.token)
            .accept('json')
            .end(function(err, res){
                // Do something
                token = JSON.parse(res.text);
                console.log(token.token);
                done();
            });
    });


    it('get contains list',function (done){
        request.get(url+'/api/v1/containers')
            .send({limit:20,offset:0})
            .set('Authorization', 'Token ' + token.token)
            .accept('json')
            .end(function(err, res){
                // Do something
                var json = JSON.parse(res.text);
                console.log(res.text);
                done();
            });
    });


    it('get apps list',function (done){
        request.get(url+'/api/v1/apps')
            .send({limit:20,offset:0})
            .set('Authorization', 'Token ' + token.token)
            .set('Content-Type','application/json;charset=utf-8')
            .accept('json')
            .end(function(err, res){
                // Do something
                var json = JSON.parse(res.text);
                console.log(res.text);
                done();
            });
    });


    /* it('generate api token',function (done){
         request.post(url+'/api/v1/containers')
             .set('Authorization', 'Token ' + token.token)
             .set('Content-Type','application/json;charset=utf-8')
             .send({
                 "charge_type": 1,
                 "spec_id": 1,
                 "image_type": 1,
                 "image_id": 2,
                 "name": "name",
                 "desc": "desc",
                 "ssh_key_ids": [
                     1,
                     2
                 ],
                 "env_var": {
                     "key": "value"
                 },
                 "use_public_network": 1,
                 "network_charge_type": 1,
                 "bandwidth": 100
             })
             .accept('json')
             .end(function(err, res){
                 // Do something
                 console.log(res.text);
                 done();
             });
     });*/

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
        console.log("OpenApiServiceTest after");
        done();

    });

});
