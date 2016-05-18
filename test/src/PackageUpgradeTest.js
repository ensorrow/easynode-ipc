/**
 * Created by hujiabao on 9/21/15.
 */

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
EasyNode.addSourceDirectory('/node_modules/easynode/lib');
const logger = using('easynode.framework.Logger').getLogger();
var iconv = require('iconv-lite');


var pkgPath = '../../node_modules/easynode/package.json';
var pkg = require(pkgPath);


var PackageUpgradeService = using('netease.icp.backend.services.PackageUpgradeService');
var packageUpgradeService ;

describe('PackageUpgradeTest',function() {

    before(function(done){
        packageUpgradeService = new PackageUpgradeService();
        done();
    });

    it('analysis package.json',function (done) {

        //console.log(Object.entries(pkg.dependencies));

        var pkgSet = new Set();



        var size = 0;
        co( function*(){

            for( var prop in  pkg.dependencies ){
                pkgSet.add(prop);
                size ++;

                var ret = yield  packageUpgradeService.exec(`npm install ${prop}  --save`).then(function(ret){
                    console.log(ret);
                    return ret;
                }).catch(function(err,ret){
                    console.log(err);
                    console.log(ret);
                });

            }

            done();
        });
    });


    after(function(done){
        console.log("PackageUpgradeTest after");
        done();
    });

});
