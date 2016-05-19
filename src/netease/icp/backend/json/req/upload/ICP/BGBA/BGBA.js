const fs = require('fs');

var bgba = {
  UploadData: {
    ICP: {
      BGBA:{
        Baxx:[

        ]
      },
      Qqdwid:0
    }
  },
  attr: {version:'V.3.0'}
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
var BGBA_ASSIGN = function(json) {
  'use strict';
  var Baxx = {
    Zt_xx:{},
    Wz_xx:[],
    Fj:[],
    ICPmm:''
  };
  var ztxx = {
    Ztid:0,
    Dwmc:'',
    Baxh:'',
    Dwxz:0,
    Tzr:'',
    Txdz:{
      Shengid:0,
      Shiid:0,
      Xianid:0,
      Xxdz:''
    },
    Zj:{
      Zjlx:0,
      Zjhm:'',
      Zjzs:''
    },
    Fzr:{
      Fzr_xm:'',
      Fzr_dhhm:'',
      Fzr_sjhm:'',
      Fzr_dzyj:'',
      Msn:'',
      Qq:'',
      Fzr_zjlx:0,
      Fzr_zjhm:''
    },
    Bz:''
  };

  ztxx.Ztid = json.company.id;// ToDo
  ztxx.Dwmc = json.company.name;
  ztxx.Dwxz = json.company.nature;// ToDo
  ztxx.Tzr = json.company.owner;
  ztxx.Txdz.Shengid = 110000;// ToDo
  ztxx.Txdz.Shiid = 110101;// ToDo
  ztxx.Txdz.Xianid = 110102;// ToDo
  ztxx.Txdz.Xxdz = json.company.commaddress;
  ztxx.Zj.Zjlx = json.company.idtype;// ToDo
  ztxx.Zj.Zjhm = json.company.idnumber;
  ztxx.Zj.Zjzs = json.company.liveaddress;
  ztxx.Fzr.Fzr_xm = json.company.managername;
  ztxx.Fzr.Fzr_dhhm = json.company.officephonenumber;
  ztxx.Fzr.Fzr_sjhm = json.company.mobile;
  ztxx.Fzr.Fzr_dzyj = json.company.email;
  ztxx.Fzr.Msn = 'hujb2000@hotmail.com';// ToDo
  ztxx.Fzr.Qq = json.website.qq;// ToDo
  ztxx.Fzr.Fzr_zjlx = json.company.manageridtype;
  ztxx.Fzr.Fzr_zjhm = json.company.manageridnumber;
  ztxx.Bz = '无';// ToDo

  Baxx.Zt_xx = ztxx;

  var wzxx = {
    Wzid:0,
    Wzmc:'',
    Nrlx:{
      Nrlx_xx:{
        Nrlx_id:0,
        Qzsph:'',
        Spwj:['']
      }
    },
    Fwnr:{
      Fwnr_id:0
    },
    Yylb: {
      Yylb_id: [0]
    },
    Ym_xx:[

    ],
    Jr_xx:[

    ],
    Wz_Fzr:{
      Fzr_xm:'',
      Fzr_dhhm:'',
      Fzr_sjhm:'',
      Fzr_dzyj:'',
      Msn:'',
      Qq:'',
      Fzr_zjlx:0,
      Fzr_zjhm:''
    },
    Baxh:'',
    Syurl:'',
    Wz_Bz:''
  };

  wzxx.Wzid = json.website.id;
  wzxx.Wzmc = json.website.name;
  wzxx.Nrlx.Nrlx_xx.Nrlx_id = json.website.prechecktype;// ToDo
  wzxx.Nrlx.Nrlx_xx.Qzsph = json.website.checknumber;
  wzxx.Nrlx.Nrlx_xx.Spwj = json.website.checkfileurl;
  wzxx.Fwnr.Fwnr_id = json.website.servicecontent;// ToDo
  wzxx.Yylb.Yylb_id = [1];// json.website.languages;//ToDo
  wzxx.Ym_xx.push({IspYmid:json.website.id, Ymid:0, Ym:json.website.domain});
  if (json.website.domain1.length > 0) {
    wzxx.Ym_xx.push({IspYmid:json.website.id, Ymid:0, Ym:json.website.domain1});
  }
  if (json.website.domain2.length > 0) {
    wzxx.Ym_xx.push({IspYmid:json.website.id, Ymid:0, Ym:json.website.domain2});
  }
  if (json.website.domain3.length > 0) {
    wzxx.Ym_xx.push({IspYmid:json.website.id, Ymid:0, Ym:json.website.domain3});
  }
  if (json.website.domain4.length > 0) {
    wzxx.Ym_xx.push({IspYmid:json.website.id, Ymid:0, Ym:json.website.domain4});
  }
  wzxx.Jr_xx.push({
    Jrid:json.website.id,
    Wzfb:{
      Fbdd:[json.website.serverregion]
    },
    Wzjrfs:{
      Jrfs:[1]
    },
    Ip_xx:[
      {
        IspIpid:json.website.id,
        Ipid:json.website.ip.ip3,
        Qsip:json.website.ip.ip1,
        Zzip:json.website.ip.ip2
      }
    ]
  }); // ToDo
  wzxx.Wz_Fzr.Fzr_xm = json.website.managername;
  wzxx.Wz_Fzr.Fzr_dhhm = `0571${json.website.officephonenumber}`;// ToDo
  wzxx.Wz_Fzr.Fzr_sjhm = json.website.mobile;
  wzxx.Wz_Fzr.Fzr_dzyj = json.website.email;
  wzxx.Wz_Fzr.Msn = 'hujb2000@hotmail.com';// ToDo
  wzxx.Wz_Fzr.Qq = json.website.qq;
  wzxx.Wz_Fzr.Fzr_zjlx = json.website.manageridtype;
  wzxx.Wz_Fzr.Fzr_zjhm = json.website.manageridnumber;
  wzxx.Baxh = json.company.recordpassword;
  wzxx.Syurl = json.website.homeurl;
  wzxx.Wz_Bz = json.website.remark.length <= 0 ? 'remark empty' : json.website.remark;// ToDo
  Baxx.Wz_xx.push(wzxx);

  var fj = {
    Fjxx:{
      Fjwjgs:1,
      Fjyt:1,
      Fjnr:json.record.sitemanagerurl,
      Fjssdx:{
        Ssdxlx:1,
        Ssdxbs:{
          Jlid:0,
          Baxh:json.company.recordpassword
        }
      },
      Bz:'empty'
    }
  };// ToDo
  Baxx.Fj.push(fj);

  console.log(bgba);
  bgba.UploadData.ICP.XZBA.Baxx.push(Baxx);
  bgba.UploadData.ICP.Qqdwid = 110000000211;
  return bgba;
};

module.exports = BGBA_ASSIGN;

