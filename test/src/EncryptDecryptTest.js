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
EasyNode.ENV(process.env.ENV);
EasyNode.addArg('easynode-home',process.cwd());
EasyNode.addSourceDirectory('/node_modules/easynode/lib');
const logger = using('easynode.framework.Logger').getLogger();
var iconv = require('iconv-lite');

var IspService = using('netease.icp.backend.services.IspService');
var ispService ;


var env = process.env.ENV;
const configPath = env == 'PRODUCTION' ? '../../configP.json' :
    env == 'TEST' ? '../../configT.json' : '../../config.json';
const encryptedPath = env == 'PRODUCTION' ? 'configP.enod' :
    env == 'TEST' ? 'configT.enod' : 'config.enod';
var config = require(configPath);
var encryptedData = '';

describe('EncryptDescryptTest',function() {

    before(function(done){
        console.log("EncryptDescryptTest before");
        try{
            ispService = new IspService(null,config);

            done();
        }catch(e){
            done(e);
        }
    });

    it('encrypt test',function (done){

        encryptedData = ispService.encryptAdv(JSON.stringify(config));
        fs.writeFileSync(encryptedPath,encryptedData,'utf8');
        console.log(encryptedData);
        done();
    })

    it('decrypt test',function (done){

        config = fs.readFileSync(encryptedPath,'utf8');
        var config = ispService.decryptAdv(config);

        config = iconv.decode( config, 'utf8');
        config = JSON.parse(config);
        console.log(config);
        done();
    })

    after(function(done){
        console.log("EncryptDescryptTest after");
        done();

    });

});
*/
