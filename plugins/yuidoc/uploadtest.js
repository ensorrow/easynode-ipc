
'use strict';

require('easynode');
var util = require('util');
var co = require('co');
var fs = require('fs');

EasyNode.addSourceDirectory('/node_modules/easynode/src');

const logger = using('easynode.framework.Logger').getLogger();

var StoreService = using('netease.icp.backend.services.StoreService');


var storeService = new StoreService();

co( function * () {
    var  url =  yield  storeService.uploadNos(Date.now(),'/Users/hujiabao/workspace_docker/icp/easynode-ipc/src/netease/icp/backend/services/IspService.js');
    console.log(url);
}).catch(function (err) {

});

