'use strict';

var fs = require('fs');

var hsjg = {
  UploadData: {
    ICP: {
      HSJG: {
        Hsjgxx: []
      },
      Qqdwid: 0
    }
  },
  attr: { version: 'V.3.0' }
};

/*
* { website:
   { id: 313,
     name: 'sitename.com',
     domain: 'c.163.com',
     domain1: '',
     domain2: '',
     domain3: '',
     domain4: '',
     homeurl: 'homeurl.com',
     servicecontent: '1',
     languages: '{"chinese":true,"chinesetraditional":true,"eglish":true,"japanese":true,"french":false,"spanish":false,"arabic":false,"russian":false,"customize":false,"customizeLang":""}',
     ispname: '杭州网易雷火科技有限公司',
     ip: { ip1: '192', ip2: '168', ip3: '0', ip4: '1' },
     accessmethod: '{"specialline":false,"webhost":false,"virtualhost":true,"other":false}',
     serverregion: '1',
     managername: '宋佳磊',
     manageridtype: 1,
     manageridnumber: '330107197505270133',
     officephoneregion: '0571',
     officephonenumber: '86666618',
     mobile: '15725894562',
     email: 'hzsongjialei@163.com',
     qq: '8415647859',
     prechecktype: 0,
     checknumber: '',
     checkfileurl: '',
     remark: '' },
  company:
   { id: 554,
     province: '浙江省',
     city: '杭州市',
     area: '江干区',
     nature: 4,
     idtype: 1,
     idnumber: '330100311363968',
     name: '浙江省杭州朗和科技有限公司',
     liveaddress: '浙江省杭州市滨江区长河街道网商路599号4幢405室(主体单位证件住所)',
     commaddress: '浙江省杭州市长河街道网商路100号(主体单位通信地址)',
     owner: '杭州投资有限公司',
     managername: '张小川',
     manageraddress: '',
     manageridtype: 1,
     manageridnumber: '101107197505270043',
     officephoneregion: null,
     officephonenumber: '0571-8985254',
     mobile: '13103768743',
     email: 'zhangxiaochuan@corp.netease.com',
     recordnumber: '',
     recordpassword: '' },
  record:
   { id: 590,
     type: 0,
     serverregion: '1',
     companyid: 554,
     websiteid: 313,
     sitemanagerurl: 'http://apollodev.nos.netease.com/1457595670071',
     checklisturl: 'http://apollodev.nos.netease.com/1457595670071',
     protocolurl1: 'http://apollodev.nos.netease.com/1457595670071',
     protocolurl2: 'http://apollodev.nos.netease.com/1457595670071',
     securityurl1: 'http://apollodev.nos.netease.com/1457595670071',
     securityurl2: 'http://apollodev.nos.netease.com/1457595670071',
     curtainurl: 'http://apollodev.nos.netease.com/1457595670071',
     code: 'aLyj9gYVZXtrmDIzUzgLu0yrHcPvfWjG',
     status: 7,
     tenantid: '1114775c606840f89e35492feadc7e38',
     reasons: 'ok',
     operatetime: 0,
     operator: '' } }
*/
var HSJG_ASSIGN = function HSJG_ASSIGN(json) {
  'use strict';

  var cur = new Date();
  var hssj = cur.getFullYear() + '-' + (d.getMonth() + 1) + d.getDate();
  var hsjgxx = {
    Hsjg: 0,
    Hsrxm: '胡家宝',
    Hssj: hssj,
    Bbdw: 110000000211,
    Hsyj: '核实通过',
    Cwxx: '无',
    Baxx: {
      Zt_xx: {},
      Wz_xx: []
    }
  };

  hsjgxx.Hsjg = 0;
  hsjgxx.Hsrxm = '胡家宝';
  Hsrxm.Hssj = hssj;
  Hsrxm.Bddw = 110000000211;
  Hsrxm.Hsyj = '核实通过';
  Hsrxm.Cwxx = '无';

  var ztxx = {
    Ztid: 0,
    Dwmc: '',
    Dwxz: 0,
    Tzr: '',
    Txdz: {
      Shengid: 0,
      Shiid: 0,
      xianid: 0,
      Xxdz: ''
    },
    Zj: {
      Zjlx: 0,
      Zjhm: '',
      Zjzs: ''
    },
    Fzr: {
      Fzr_xm: '',
      Fzr_dhhm: '',
      sjhm: '',
      Fzr_dzyj: '',
      Msn: '',
      Qq: '',
      Fzr_zjlx: 0,
      Fzr_zjhm: ''
    },
    Bz: ''
  };
  var wzxx = {
    Wzid: 0,
    Wzmc: '',
    Nrlx: {
      Nrlx_xx: {
        Nrlx_id: 0,
        Qzsph: '',
        Spwj: ['']
      }
    },
    Fwnr: {
      Fwnr_id: []
    },
    Ym_xx: [{
      Ymid: 0,
      Ym: ''
    }],
    Jr_xx: {
      Jrid: 0,
      Wzfb: {
        Fbdd: []
      },
      Wzjrfs: {
        Jrfs: []
      },
      Ip_xx: [{
        IspIpid: 0,
        Ipid: 0,
        Qsip: 0,
        Zzip: 0
      }],
      Bbfs: 1
    },
    Wz_Fzr: {
      Fzr_xm: '',
      Fzr_dhhm: '',
      sjhm: '',
      Fzr_dzyj: '',
      Msn: '',
      Qq: '',
      Fzr_zjlx: '',
      Fzr_zjhm: ''
    },
    Syurl: '',
    Wz_Bz: ''
  };
  hsjgxx.Baxx.Zt_xx = ztxx;
  hsjgxx.Baxx.Wz_xx.push(wzxx);

  hsjg.UploadData.ICP.HSJG.hsjgxx.push(hsjgxx);
  hsjg.UploadData.ICP.Qqdwid = 110000000211;
  return hsjg;
};

module.exports = HSJG_ASSIGN;