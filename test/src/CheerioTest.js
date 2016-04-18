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
EasyNode.addSourceDirectory('/node_modules/easynode/src');
const logger = using('easynode.framework.Logger').getLogger();
var iconv = require('iconv-lite');

var IspService = using('netease.icp.backend.services.IspService');
var ispService ;

var config = require('../../config.json');

describe('CheerioTest',function() {

    before(function(done){
        console.log("CheerioTest before");
        try{
            ispService = new IspService(null,config);
            done();
        }catch(e){
            done(e);
        }
    });

    it('cheerio load test',function (done){
        var $ = cheerio.load('<h2 class="title">Hello World</h2>');
        $('h2.title').text('Hello Three');
        $('h2').addClass('welcome');

        console.log($.html());

        done();
    })

    /*
    URL:http://www.miitbeian.gov.cn/publish/query/indexFirst.action
    Real URL: http://www.miitbeian.gov.cn/basecode/query/showareacode.action
    change path action: showareacode.action
    formData:
    {
        code:
        areaName:
        areaCodeBlur:0
        page.pageSize:20
        pageNo:2
        jumpPageNo:
    }
    page structure: document.querySelector('.a >table > tbody')
                     document.querySelectorAll('.a >table > tbody >tr')
    * */
    it('cheerio load page',function (done){

        co(function * () {
            var content =  yield ispService.getPage('http://www.miitbeian.gov.cn/basecode/query/showareacode.action');

            var $ = cheerio.load(content);
            //content = iconv.encode(content,'GBK');

            var table = $('.a > table');
            var body = table['0'].children;
            console.log(typeof body);
              //fs.writeFileSync('/Users/hujiabao/Downloads/areas.text',JSON.stringify(body));
            fs.writeFileSync('/Users/hujiabao/Downloads/content.html',iconv.decode(content,'GBK'));
            console.log(body.length);

            done();

            });
    })


    after(function(done){
        console.log("CheerioTest after");
        done();

    });

});
