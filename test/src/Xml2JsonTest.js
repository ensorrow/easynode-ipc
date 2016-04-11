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
EasyNode.addSourceDirectory('/node_modules/easynode/src');
const logger = using('easynode.framework.Logger').getLogger();
var parser = require('xml2json');


describe('Xml2JsonTest',function() {

    before(function(done){
        console.log("Xml2JsonTest before");
        try{
            done();
        }catch(e){
            done(e);
        }
    });

    it('Xml2Json',function (done){

        var xml = fs.readFileSync('/Users/hujiabao/Downloads/beianinfo.xml');
        xml = iconv.decode(xml,'GBK');
        var json = parser.toJson(xml, {object: true, arrayNotation: false});
        console.log(json);
        console.log(json.UploadData.ICP.Qqdwid);
        console.log(json.UploadData.ICP.XZBA.Baxx);
        done();
    });



    after(function(done){
        console.log("Xml2JsonTest after");
        done();
    });

});
*/
