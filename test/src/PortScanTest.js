/*
//插入ip备 案信息到数据表iply
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
EasyNode.ENV(process.env.ENV);
EasyNode.addArg('easynode-home',process.cwd());
EasyNode.addSourceDirectory('/node_modules/easynode/lib');
const logger = using('easynode.framework.Logger').getLogger();

var PortScanService = using('netease.icp.backend.services.PortScanService');
var portScanService ;

describe('PortScanTest',function() {

    before(function(done){
        console.log("PortScanTest before");
        try{
            portScanService = new PortScanService();
            done();
        }catch(e){
            done(e);
        }
    });

    it('port scan test for fc',function (done) {

        var next = function(qs,zz,curr){
            if( curr < qs || curr > zz ){
                return [0,'0.0.0.0'];
            }
            var d = curr%256;
            var tmp = parseInt(curr/256);
            var c = tmp%256;
            tmp = tmp/256;
            var b = parseInt(tmp%256);
            tmp = tmp/256;
            var a = parseInt(tmp%256);
            tmp = tmp/256;

            return [curr+1,a + '.' +b + '.' + c + '.' + d]
        }

        var results = [];

        var iplys =  [
            {qs:1778535425,zz:1778536446,curr:1778535425},
            {qs:1778534401,zz:1778535422,curr:1778534401},
            {qs:1778537473,zz:1778538494,curr:1778537473},
            {qs:1778545665,zz:1778546686,curr:1778545665},
            {qs:1778546689,zz:1778547710,curr:1778546689},
            {qs:3757891329,zz:3757891582,curr:3757891329},
            {qs:1778541057,zz:1778541566,curr:1778541057},
            {qs:1778531329,zz:1778531838,curr:1778531329},
            {qs:1778544641,zz:1778545662,curr:1778544641},
            {qs:1778541569,zz:1778542078,curr:1778541569},
            {qs:1778543617,zz:1778544638,curr:1778543617},
            {qs:1778547457,zz:1778547710,curr:1778547457}
        ];

        co(function*() {
            for( var index = 0; index < iplys.length; index++ ){
                var p = iplys[index];
                console.log("p:",p);
                while( p.curr != 0 ){
                    var [cv,ip] = next(p.qs,p.zz,p.curr);
                    p.curr = cv;

                    var ret = yield  portScanService.scan(ip, 80).then(function(ret){
                        console.log(ret);
                        results.push(ret);
                        return ret;
                    }).catch(function(err,ret){
                    });
                    ret = yield  portScanService.scan(ip, 443).then(function(ret){
                        console.log(ret);
                        results.push(ret);
                        return ret;
                    }).catch(function(err,ret){
                    });
                    if( p.curr == 0 ){
                        fs.writeFileSync("ip.txt",JSON.stringify(results));
                    }
                }
            }
        });

    });

    after(function(done){
        console.log("PortScanTest after");
        done();
    });

});

*/
