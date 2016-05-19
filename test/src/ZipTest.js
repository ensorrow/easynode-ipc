/*

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
EasyNode.ENV('DEVELOP');
EasyNode.addArg('easynode-home',process.cwd());
EasyNode.addSourceDirectory('/node_modules/easynode/lib');
const logger = using('easynode.framework.Logger').getLogger();
var unzip = require('unzip');
var zlib = require('zlib');


describe('ZipTest',function() {

    before(function(done){
        console.log("ZipTest before");
        try{
            done();
        }catch(e){
            done(e);
        }
    });

    it('unzip',function (done){
       /!* console.log("1");
        fs.createReadStream('/Users/hujiabao/Downloads/response.zip').pipe(unzip.Extract({ path: '/Users/hujiabao/Downloads/output' }));
        console.log("2")
        done();
        console.log("3");*!/


    });



    after(function(done){
        console.log("ZipTest after");
        done();
    });

});

*/
