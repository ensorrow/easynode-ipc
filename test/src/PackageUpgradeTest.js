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

var IspService = using('netease.icp.backend.services.IspService');
var ispService ;

var config = require('../../config.json');

describe('PackageUpgradeTest',function() {

    before(function(done){
        console.log("PackageUpgradeTest before");
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

    it('cheerio load test2',function (done){
        var $ = cheerio.load(`<ul id="fruits">
                                  <li class="apple">Apple</li>
                                  <li class="orange">Orange</li>
                                  <li class="pear">Pear</li>
                              </ul>`);
        var content = $('.apple','#fruits').text();

        assert( content == 'Apple',"Err1");

        content = $('ul .pear').attr('class');

        assert( content == 'pear', "pear class error");

        content = $('li[class=orange]').html();

        assert( content == 'Orange', "Orange error");

        content = $('ul').attr('id');

        assert( content == 'fruits', "Fruits error");

        content = $('.apple').attr('id', 'favorite').html();
        //?
        console.log("1,",content);

        assert( content == "Apple", "add attri favorite error");

        done();
    })

    /*for( var j=0; j<100; j++ ){
        console.log('jj:',j);
        it('for circle test',function (done){

            console.log("j:",j);

            done();
        })
    }*/


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
            console.log("1");
            co( function*() {
                for (var j = 0; j < 178; j++) {
                    var url = `http://www.miitbeian.gov.cn/basecode/query/showareacode.action?page.pageSize=20&pageNo=${j}`;
                    console.log(url);
                    var content = yield ispService.getPage(url);
                    content = iconv.decode(content, 'GBK');
                    console.log("u1");
                    //fs.writeFileSync('/Users/hujiabao/Downloads/content.html',content);

                    var $ = cheerio.load(content);
                    console.log('u2');
                    for (var index = 1; index < 21; index++) {
                        var a = $(`#${index}`).text();
                        a = a.replace(/\s+/g, ' ');
                        a = a.split(' ');

                        console.log(a);

                        var ret = yield new Promise(function (res, rej) {
                            request.post('http://icpdev.hzspeed.cn/admin/area')
                                .send({code: a[2], name: a[3], level: a[4]})
                                .end(function (err, ret) {
                                    if (err) {
                                        rej();
                                    } else {
                                        res(ret.text);
                                    }
                                });
                        });
                        console.log('u3');
                    }
                }
                console.log("2");
            });
        });
        console.log("3");
        //done();
        console.log("4");
    });


    after(function(done){
        console.log("PackageUpgradeTest after");
        done();

    });

});
