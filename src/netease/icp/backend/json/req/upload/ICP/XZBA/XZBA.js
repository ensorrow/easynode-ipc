const fs = require('fs');

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
     checkedlisturl: 'http://apollodev.nos.netease.com/1457595670071',
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
var XZBA_ASSIGN = function(json) {
  'use strict';
  var xzba = {
    '@': {
      'version': 'V.3.0'
    },
    ICP: {
      XZBA:{
        Baxx:[

        ]
      },
      Qqdwid:0
    }
  };

  var Baxx = {
    Zt_xx:{},
    Wz_xx:[],
    Fj:[]
  };
  var ztxx = {
    IspZtid:0,
    Dwmc:'',
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
    Bbfs:1,
    Bz:''
  };

  ztxx.IspZtid = json.company.id;
  ztxx.Dwmc = json.company.name;
  ztxx.Dwxz = json.company.nature;// ToDo
  ztxx.Tzr = json.company.owner;
  ztxx.Txdz.Shengid = 330000;// ToDo
  ztxx.Txdz.Shiid = 330100;// ToDo
  ztxx.Txdz.Xianid = 330108;// ToDo
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
  ztxx.Bbfs = 1;// 0-自行报备,1-代为报备
  ztxx.Bz = '无';// ToDo

  Baxx.Zt_xx = ztxx;

  var wzxx = {
    IspWzid:0,
    Wzmc:'',
    Nrlx:{
      Nrlx_xx:{
        Nrlx_id:0,
        Qzsph:'',
        Spwj:['']
      }
    },
    Fwnr:{
      Fwnr_id:1
    },
    Yylb: {
      Yylb_id: [1]
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
    Syurl:'',
    Wz_Bz:''
  };

  wzxx.IspWzid = json.website.id;
  wzxx.Wzmc = json.website.name;
  wzxx.Nrlx.Nrlx_xx.Nrlx_id = json.website.prechecktype;// ToDo
  wzxx.Nrlx.Nrlx_xx.Qzsph = json.website.checknumber;
  wzxx.Nrlx.Nrlx_xx.Spwj = json.website.checkfileurl;
  wzxx.Fwnr.Fwnr_id = json.website.servicecontent;// ToDo
  wzxx.Yylb.Yylb_id = [1];// json.website.languages;//ToDo
  wzxx.Ym_xx.push({IspYmid:json.website.id, Ym:json.website.domain});
  if (json.website.domain1.length > 0) {
    wzxx.Ym_xx.push({IspYmid:json.website.id, Ym:json.website.domain1});
  }
  if (json.website.domain2.length > 0) {
    wzxx.Ym_xx.push({IspYmid:json.website.id, Ym:json.website.domain2});
  }
  if (json.website.domain3.length > 0) {
    wzxx.Ym_xx.push({IspYmid:json.website.id, Ym:json.website.domain3});
  }
  if (json.website.domain4.length > 0) {
    wzxx.Ym_xx.push({IspYmid:json.website.id, Ym:json.website.domain4});
  }
  wzxx.Jr_xx.push({
    IspJrid:json.website.id,
    Wzfb:{
      Fbdd:[json.website.serverregion]
    },
    Wzjrfs:{
      Jrfs:[2]
    },
    Ip_xx:[
      {
        IspIpid:json.website.id,
        Qsip: 1778535426,
        Zzip:1778535426
      }
    ]
  }); // ToDo
  wzxx.Wz_Fzr.Fzr_xm = json.website.managername;
  wzxx.Wz_Fzr.Fzr_dhhm = `${json.website.officephoneregion}-${json.website.officephonenumber}`;// ToDo
  wzxx.Wz_Fzr.Fzr_sjhm = json.website.mobile;
  wzxx.Wz_Fzr.Fzr_dzyj = json.website.email;
  wzxx.Wz_Fzr.Msn = 'hujb2000@hotmail.com';// ToDo
  wzxx.Wz_Fzr.Qq = json.website.qq;
  wzxx.Wz_Fzr.Fzr_zjlx = json.website.manageridtype;
  wzxx.Wz_Fzr.Fzr_zjhm = json.website.manageridnumber;
  wzxx.Syurl = json.website.homeurl;
  wzxx.Wz_Bz = json.website.remark.length <= 0 ? 'remark empty' : json.website.remark;// ToDo
  Baxx.Wz_xx.push(wzxx);

    /*
    fjwjgs:
    1-jpg
    2-png
    附件用途类型ID:
    1-网站备案信息真实性核验单
    2-网站主办者单位有效证件电子件
    3-备案主体负责人有效证件电子件
    4-备案网站负责人有效证件电子件
    5-网站负责人核验现场拍摄照片电子件
    附件所属对象类型
    1:主体
    2:网站
    * */

    // 核验单
  var fj = {};
  if (json.record.sitemanagerurl.length > 0) {
    fj = {
      Fjxx:{
        Fjwjgs:2,
        Fjyt:1,

        Fjnr:json.record.checkedlisturl,
        Fjssdx:{
          Ssdxlx:2,
          Ssdxbs:json.website.id
        },
        Bz:'empty'
      }
    };// ToDo
    Baxx.Fj.push(fj);
  }

    // 主体负责人
  if (json.record.sitemanagerurl.length > 0) {
    fj = {
      Fjxx: {
        Fjwjgs: 2,
        Fjyt: 3,
        Fjnr: json.record.sitemanagerurl,
        Fjssdx: {
          Ssdxlx: 1,
          Ssdxbs: json.company.id
        },
        Bz: 'empty'
      }
    };// ToDo
    Baxx.Fj.push(fj);
  }

    /*
    if( json.record.sitemanagerurl.length > 0 ) {
        fj = {
            Fjxx: {
                Fjwjgs: 2,
                Fjyt: 3,
                Fjnr: json.record.sitemanagerurl,
                Fjssdx: {
                    Ssdxlx: 1,
                    Ssdxbs: json.company.id
                },
                Bz: 'empty'
            }
        };//ToDo
        Baxx.Fj.push(fj);
    }


    if( json.record.sitemanagerurl.length > 0 ) {
        fj = {
            Fjxx: {
                Fjwjgs: 2,
                Fjyt: 4,
                Fjnr: json.record.sitemanagerurl,
                Fjssdx: {
                    Ssdxlx: 2,
                    Ssdxbs: json.website.id
                },
                Bz: 'empty'
            }
        };//ToDo
        Baxx.Fj.push(fj);
    }
    if( json.record.curtainurl.length > 0 ){
        fj = {
            Fjxx:{
                Fjwjgs:2,
                Fjyt:5,
                Fjnr:json.record.curtainurl,
                Fjssdx:{
                    Ssdxlx:2,
                    Ssdxbs:json.website.id
                },
                Bz:'empty'
            }
        };//ToDo
        Baxx.Fj.push(fj);
    }*/

  console.log(xzba);
  xzba.ICP.XZBA.Baxx.push(Baxx);
  xzba.ICP.Qqdwid = 110000000211;
    // fs.writeFileSync('/Users/hujiabao/Downloads/first_json.json',JSON.stringify(xzba));
  return xzba;
};

module.exports = XZBA_ASSIGN;
