/**
 * Created by hujiabao on 9/21/15.
 */

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



describe('StoreService',function() {

    before(function(done){
        console.log("StoreService before");
        try{
            done();
        }catch(e){
            done(e);
        }
    });

    //it('readDatasequence',function (done){
    //
    //    co(function * () {
    //        var ds = yield storeService.readDatasequence();
    //        console.log("datasequence:",ds);
    //    });
    //
    //});



    after(function(done){
        console.log("StoreService after");
        done();
    });

});