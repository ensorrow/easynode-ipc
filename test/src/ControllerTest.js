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


    /*
      * @apiParam {Number} status 备案申请状态\n0-草稿\n1-初审中\n2-初审未通过\n3-初审已通过\n4-照片审核中\n5-照片审核未通过\n6-照片审核已通过\n7-通管局审核中\n8-通管局审核未通过\n9-通管局审核已通过\n10-未知状态\n
         * @apiParam {String} reasons 通过则为备注,拒绝则为理由(多条用p标签分隔)
         * @apiParam {String} [curtainurl] 帘布照片URL
         * @apiParam {Number} operatetime 操作时间
         * @apiParam {String} operator 操作员
    * */

    it('Post /admin/record',function (done){
        console.log(request);

        request.put('http://icpdev.hzspeed.cn/admin/record')
            .send({id:590,status:7,reasons:'passed'})
            .end(done);
    });


    after(function(done){
        console.log("Uploadservice after");
        done();

    });

});