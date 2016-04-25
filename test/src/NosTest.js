/*
/!**
 * Created by hujiabao on 9/21/15.
 *!/

'use strict';

require("babel-polyfill");
import co from 'co';
import request from 'superagent';
import cheerio from 'cheerio';
import chai from 'chai';
const assert = chai.assert;
var utils = require('utility');
const crypto = require('crypto');
var md5 = crypto.createHash('md5');
import fs from 'fs';
require('easynode');
EasyNode.addArg('easynode-home',process.cwd());
EasyNode.addSourceDirectory('/node_modules/easynode/src');
const logger = using('easynode.framework.Logger').getLogger();
var iconv = require('iconv-lite');
var Nos = require('nenos');

var config = require('../../config.json');

describe('NosTest',function() {

    before(function(done){
        console.log("NosTest before");
        try{
            done();
        }catch(e){
            done(e);
        }
    });

    it('Nos load test',function (done){

        var key = Date.now();
        var filename = '/Users/hujiabao/workspace_docker/icp/easynode-ipc/config.json';
        var cfg = {
            "urlPath":"http://apollodev.nos.netease.com/",
            "accessKey":"c92f74b0d48f4fb39271a1109da74cc2",
            "secretKey":"f200fad9c6b541d28f01159de8d9ecea",
            "bucket":"apollodev"
        };

        co(function * () {
            var url = `${cfg.urlPath}${key}`;
            console.log('url', url);
            let nos = new Nos(cfg.accessKey,cfg.secretKey,cfg.bucket);
            try{
                console.log("1");
                yield nos.upload(key, filename).then(function(){

                });
                console.log("2");
            }catch (e){
                console.log(e);
            }
            nos = null;

            console.log('url', url);
        });



        done();
    })

    after(function(done){
        console.log("NosTest after");
        done();

    });

});
*/
