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
    });


    it('Post /admin/record',function (done){

        request.put('http://icpdev.hzspeed.cn/admin/record')
            .send({id:590,status:7,reasons:'passed'})
            .end(done);
    });


    it('Get /rest/sys',function (done){

        request.get('http://icpdev.hzspeed.cn/rest/sys')
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