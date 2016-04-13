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
EasyNode.addArg('easynode-home',process.cwd());
EasyNode.addSourceDirectory('/node_modules/easynode/src');
const logger = using('easynode.framework.Logger').getLogger();
var unzip = require('unzip');
var zlib = require('zlib');


describe('IpServiceTest',function() {

    before(function(done){
        console.log("IpServiceTest before");
        try{
            done();
        }catch(e){
            done(e);
        }
    });

    it('insert iply',function (done){

        var ipcalc = function(minIP,maxIP,net){
            var ret = { qsip:0, zzip:0, net:net };

            var arr = minIP.split('.');
            ret.qsip = arr[0]*256*256*256 + arr[1]*256*256  + arr[2]*256 + parseInt(arr[3]);

            arr = maxIP.split('.');
            ret.zzip = arr[0]*256*256*256 + arr[1]*256*256  + arr[2]*256 + parseInt(arr[3]);

            return ret;
        };

        var ret = ipcalc('106.2.76.1','106.2.79.254','106.2.76.0/22');
        console.log(ret);

        ret = ipcalc('106.2.72.1','106.2.75.254','106.2.72.0/22');
        console.log(ret);

        ret = ipcalc('106.2.84.1','106.2.87.254','106.2.84.0/22');
        console.log(ret);

        ret = ipcalc('106.2.116.1','106.2.119.254','106.2.116.0/22');
        console.log(ret);

        ret = ipcalc('106.2.120.1','106.2.123.254','106.2.120.0/22');
        console.log(ret);

        ////
        ret = ipcalc('223.252.223.1','223.252.223.254','223.252.223.0/24');
        console.log(ret);

        ret = ipcalc('106.2.98.1','106.2.99.254','106.2.98.0/23');
        console.log(ret);

        ret = ipcalc('106.2.60.1 ','106.2.61.254','106.2.60.0/23');
        console.log(ret);

        ret = ipcalc('106.2.112.1 ','106.2.115.254 ','106.2.112.0/22');
        console.log(ret);

        ret = ipcalc('106.2.100.1','106.2.101.254','106.2.100.0/23');
        console.log(ret);

        ret = ipcalc('106.2.108.1','106.2.111.254','106.2.108.0/22');
        console.log(ret);

        ret = ipcalc('106.2.123.1','106.2.123.254','106.2.123.0/24');
        console.log(ret);


        var iplys = [
            {
                qsip:1778535425,
                zzip:1778536446,
                lydw:1197,
                bz:'',
                area:'义桥',
                net:'106.2.76.0/22',
                status:0
            },
            {
                qsip:1778534401,
                zzip:1778535422,
                lydw:1197,
                bz:'',
                area:'义桥',
                net:'106.2.72.0/22',
                status:0
            },
            {
                qsip:1778537473,
                zzip:1778538494,
                lydw:1197,
                bz:'',
                area:'义桥',
                net:'106.2.84.0/22',
                status:0
            },
            {
                qsip:1778545665,
                zzip:1778546686,
                lydw:1197,
                bz:'',
                area:'义桥',
                net:'106.2.116.0/22',
                status:0
            },
            {
                qsip:1778546689,
                zzip:1778547710,
                lydw:1197,
                bz:'',
                area:'义桥',
                net:'106.2.120.0/22',
                status:0
            },
            {
                qsip:3757891329,
                zzip:3757891582,
                lydw:1197,
                bz:'',
                area:'萧山',
                net:'223.252.223.0/24'
            },
            {
                qsip:1778541057,
                zzip:1778541566,
                lydw:1197,
                bz:'',
                area:'萧山',
                net:'106.2.98.0/23',
                status:0
            },
            {
                qsip:1778531329,
                zzip:1778531838,
                lydw:1197,
                bz:'',
                area:'萧山',
                net:'106.2.60.0/23',
                status:0
            },
            {
                qsip:1778544641,
                zzip:1778545662,
                lydw:1197,
                bz:'',
                area:'萧山',
                net:'106.2.112.0/22',
                status:0
            },
            {
                qsip:1778541569,
                zzip:1778542078,
                lydw:1197,
                bz:'',
                area:'萧山',
                net:'106.2.100.0/23',
                status:0
            },
            {
                qsip:1778543617,
                zzip:1778544638,
                lydw:1197,
                bz:'',
                area:'萧山',
                net:'106.2.108.0/22',
                status:0
            },
            {
                qsip:1778547457,
                zzip:1778547710,
                lydw:1197,
                bz:'',
                area:'萧山',
                net:'106.2.123.0/24',
                status:0
            }
        ];

        co(function*(){

            for( var index = 0; index < iplys.length; index++ ){
                request.post('http://icpdev.hzspeed.cn/admin/ip/iply')
                  .send( iplys[index] )
                  .end();
            }

            done();
        });

    });

    after(function(done){
        console.log("IpServiceTest after");
        done();
    });

});

*/
