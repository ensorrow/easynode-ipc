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
var libxml = require('libxmljs');

describe('XmlValidateAgainstXsd',function() {

    before(function(done){
        console.log("XmlValidateAgainstXsd before");
        try{
            done();
        }catch(e){
            done(e);
        }
    });

    it('xsd-schema-validator',function (done){


       /!* var xsd = fs.readFileSync('/Users/hujiabao/Downloads/企业上报数据格式.xsd');
        var xsdDoc = x.parseXmlString(xsd);

        var xml0 = fs.readFileSync('/Users/hujiabao/Downloads/ip_xzba.xml');
        var xmlDoc0 = x.parseXmlString(xml0);

        var result0 = xmlDoc0.validate(xsdDoc);
        console.log("result0:", result0);*!/


        //   Error: Unsupported encoding GBK

         var xsd = fs.readFileSync('/Users/hujiabao/Downloads/企业上报数据格式.xsd');
         xsd = iconv.decode(xsd,'GBK');
         var xml_valid = fs.readFileSync('/Users/hujiabao/Downloads/ip_xzba.xml');
         //var xml_invalid = '<?xml version="1.0"?><comment>A comment</comment>';

         var xsdDoc = libxml.parseXml(xsd);
         var xmlDocValid = libxml.parseXml(xml_valid);
       // var xmlDocInvalid = libxml.parseXml(xml_invalid);



        done();
    });



    after(function(done){
        console.log("XmlValidateAgainstXsd after");
        done();
    });

});
*/
