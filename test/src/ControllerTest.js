/*
/!**
 * Created by hujiabao on 9/21/15.
 *!/

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
    });


    it('Post /admin/record',function (done){

        //590-首次备案  603-新增网站 669-新增接入
        request.put('http://icpdev.hzspeed.cn/admin/record')
            .send({id:669,status:7,reasons:'passed'})
            .end(done);
    });


    it('Get /admin/rest/sys',function (done){

        request.get('http://icpdev.hzspeed.cn/admin/rest/sys')
            .query({id:1,key:1})
            .accept('json')
            .end(function(err, res){
                // Do something

                console.log(res.text);
                //var ret = JSON.parse(res.text);
                //dataSequence = ret.ret;
                done();
            });
    });

    it('Get /admin/icp/verifybamm',function (done){

        request.get('http://icpdev.hzspeed.cn/admin/icp/verifybamm')
            .query({baxh:"浙ICP备14001515号",bamm:"EZM123"})
            .accept('json')
            .end(function(err, res){
                // Do something

                console.log(res.text);
                done();
            });
    });

    it('Get /admin/icp/querybeianstatus',function (done){

        request.get('http://icpdev.hzspeed.cn/admin/icp/querybeianstatus')
            .query({queryConditionType:2,queryCondition:"330222197809135514"})
            .accept('json')
            .end(function(err, res){
                // Do something

                console.log(res.text);
                done();
            });
    });


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

});*/
