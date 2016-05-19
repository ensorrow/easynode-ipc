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
EasyNode.ENV('DEVELOP');
EasyNode.addArg('easynode-home',process.cwd());
EasyNode.addSourceDirectory('/node_modules/easynode/lib');


const logger = using('easynode.framework.Logger').getLogger();

var schedule = require('node-schedule');

describe('ScheduleTest',function() {

    before(function(done){
        console.log("ScheduleTest before");
        try{
            done();
        }catch(e){
            done(e);
        }
    });

    it('TimerTest',function (done){

        var j = schedule.scheduleJob('*!/1 * * * *', function(){
            console.log('The answer to life, the universe, and everything!');
        });

        done();

    });

    after(function(done){
        console.log("ScheduleTest after");
        done();

    });

});*/
