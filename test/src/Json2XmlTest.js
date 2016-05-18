/*
/!**
 * Created by hujiabao on 9/21/15.
 *!/

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
var iconv = require('iconv-lite');

require('easynode');
EasyNode.addArg('easynode-home',process.cwd());
EasyNode.addSourceDirectory('/node_modules/easynode/lib');
const logger = using('easynode.framework.Logger').getLogger();
var parser = require('xml2json');
var json2xmlparser = require('js2xmlparser');


describe('json2xmlparserTest',function() {

    before(function(done){
        console.log("json2xmlparserTest before");
        try{
            done();
        }catch(e){
            done(e);
        }
    });

    it('json2xmlparser',function (done){

        var json = fs.readFileSync('/Users/hujiabao/Downloads/first_json.json');

        json = JSON.parse(json);
        var xml = json2xmlparser('UploadData',json,{declaration:{encoding:'GBK'}});

        console.log(xml);
        fs.writeFileSync('/Users/hujiabao/Downloads/first2.xml',xml);

        done();
    });



    after(function(done){
        console.log("json2xmlparserTest after");
        done();
    });

});
*/
