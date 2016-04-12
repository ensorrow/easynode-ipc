
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
        var iplys = [
            {
                qsip:0x6A024c01,
                zzip:0x66A024FFE,
                lydw:1197,
                bz:'',
                area:'义桥',
                net:'106.2.76.0/22',
                status:0
            },
            {
                qsip:0x6A024801,
                zzip:0x6A024BFE,
                lydw:1197,
                bz:'',
                area:'义桥',
                net:'106.2.72.0/22',
                status:0
            },
            {
                qsip:0x6A025401,
                zzip:0x6A0257FE,
                lydw:1197,
                bz:'',
                area:'义桥',
                net:'106.2.84.0/22',
                status:0
            },
            {
                qsip:0x6A027401,
                zzip:0x6A0277FE,
                lydw:1197,
                bz:'',
                area:'义桥',
                net:'106.2.116.0/22',
                status:0
            },
            {
                qsip:0x6A027801,
                zzip:0x6A027BFE,
                lydw:1197,
                bz:'',
                area:'义桥',
                net:'106.2.120.0/22',
                status:0
            },
            {
                qsip:0xDFFCDF01,
                zzip:0xDFFCDFFE,
                lydw:1197,
                bz:'',
                area:'萧山',
                net:'223.252.223.0/24'
            },
            {
                qsip:0x6A026201,
                zzip:0x6A0263FE,
                lydw:1197,
                bz:'',
                area:'萧山',
                net:'106.2.98.0/23',
                status:0
            },
            {
                qsip:0x6A023C01,
                zzip:0x6A023DFE,
                lydw:1197,
                bz:'',
                area:'萧山',
                net:'106.2.60.0/23',
                status:0
            },
            {
                qsip:0x6A027001,
                zzip:0x6A0273FE,
                lydw:1197,
                bz:'',
                area:'萧山',
                net:'106.2.112.0/22',
                status:0
            },
            {
                qsip:0x6A026401,
                zzip:0x6A0265FE,
                lydw:1197,
                bz:'',
                area:'萧山',
                net:'106.2.100.0/23',
                status:0
            },
            {
                qsip:0x6A026C01,
                zzip:0x6A026FFE,
                lydw:1197,
                bz:'',
                area:'萧山',
                net:'106.2.108.0/22',
                status:0
            },
            {
                qsip:0x6A027B01,
                zzip:0x6A027BFE,
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

