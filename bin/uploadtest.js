
'use strict';

require('easynode');
var util = require('util');
var co = require('co');
var fs = require('fs');

EasyNode.addSourceDirectory('node_modules/easynode/src');

const logger = using('easynode.framework.Logger').getLogger();

//var StoreService = using('netease.icp.backend.services.StoreService');
/*

var storeService = new StoreService();

co( function * () {
    var  url =  storeService.uploadNos(Date.now(),'/Users/hujiabao/workspace_docker/icp/easynode-ipc/plugins/build/bundle.js');
    console.log(url);
}).catch(function (err) {

});

*/
