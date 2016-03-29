/**
 * Created by hujiabao on 9/21/15.
 */

'use strict';

import co from 'co';
import chai from 'chai';
const assert = chai.assert;

require('easynode');
EasyNode.addArg('easynode-home',process.cwd());
EasyNode.addSourceDirectory('/node_modules/easynode/src');
const logger = using('easynode.framework.Logger').getLogger();

var IspService = using('netease.icp.backend.services.ispService');
var ispService ;

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

    it('createConnect',function (done){

        ispService.createConnect().then(function(){
           done();
        }).catch(function(e){
            done(e);
        });
    });


    after(function(done){
        console.log("IspService after");
        done();

    });

});