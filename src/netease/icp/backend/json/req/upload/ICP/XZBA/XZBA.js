var xzba = {
   Baxx:[
       {
       Zt_xx:{
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
       },
       Wz_xx:{
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
               Fwnr_id:0
           },
           Yylb: {
               Yylb_id: [0]
           },
           Ym_xx:[
               {
                   IspYmid:0,
                   Ym:''
               }
           ],
           Jr_xx:[
               {
                   IspJrid:0,
                   Wzfb:[
                       1
                   ],
                   Wzjrfs:{
                       Jrfs:[
                           1
                       ]
                   },
                   Ip_xx:{
                       IspIpid:0,
                       Qsip:'',
                       Zzip:''
                   }
               }
           ],
           Wz_Fzr:{
               Fzr_xm:'',
               Fzr_ddhm:'',
               Fzr_sjhm:'',
               Fzr_dzyj:'',
               Msn:'',
               Qq:'',
               Fzr_zjlx:0,
               Fzr_zjhm:''
           },
           Syurl:'',
           Wz_Bz:''
       },
       Fj: [
           {
           Fjxx: {
               Fjwjgs: 0,
               Fjyt: 0,
               Fjnr: '',
               Fjssdx: {
                   Ssdxlx: 1,
                   Ssdxbs: 0
               },
               Bz: ''
            }
           }
       ]
    }
   ]
};

var  ICP = {
    XZBA:xzba
};

var XZBA = {
    UploadData: {
        ICP: ICP

    },
    attr: {version:"V.3.0"}
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
function XZBA_ASSIGN(json){
    "use strict";
    var tmp = ICP.XZBA.Baxx[0];
    tmp.Zt_xx.IspZtid = json.company.id;
    tmp.Zt_xx.Dwmc = json.company.name;
    tmp.Zt_xx.Dwxz = json.company.nature;//ToDo
    tmp.Zt_xx.Tzr = json.company.owner;
    tmp.Zt_xx.Txdz.Shengid = 0;
    tmp.Zt_xx.Txdz.Shiid = 0;
    tmp.Zt_xx.Txdz.Xianid = 0;
    tmp.Zt_xx.Txdz.Xxdz = json.company.commaddress;
    tmp.Zt_xx.Zj.Zjlx = json.company.idtype;//ToDo
    tmp.Zt_xx.Zj.Zjhm = json.company.idnumber;
    tmp.Zt_xx.Zj.Zjzs = json.company.liveaddress
    tmp.Zt_xx.Fzr.Fzr_xm = json.company.managername;
    tmp.Zt_xx.Fzr.Fzr_dhhm = json.company.officephonenumber;
    tmp.Zt_xx.Fzr.Fzr_sjhm = json.company.mobile;
    tmp.Zt_xx.Fzr.Fzr_dzyj = json.company.email;
    tmp.Zt_xx.Fzr.Msn = '';//ToDo
    tmp.Zt_xx.Fzr.Qq = json.website.qq;//ToDo
    tmp.Zt_xx.Fzr.Fzr_zjlx = json.company.manageridtype;
    tmp.Zt_xx.Fzr.Fzr_zjhm = json.company.manageridnumber;
    tmp.Zt_xx.Bbfs = 1;//0-自行报备,1-代为报备
    tmp.Zt_xx.Bz = '';//ToDo

    tmp.Wz_xx.IspWzid = json.website.id;
    tmp.Wz_xx.Wzmc = json.website.name;
    tmp.Wz_xx.Nrlx.Nrlx_xx.Nrlx_id = json.website.prechecktype;//ToDo
    tmp.Wz_xx.Nrlx.Nrlx_xx.Qzsph = json.website.checknumber;
    tmp.Wz_xx.Nrlx.Nrlx_xx.Spwj = json.website.checkfileurl;
    tmp.Wz_xx.Fwnr.Fwnr_id = json.website.servicecontent;//ToDo
    tmp.Wz_xx.Yylb.Yylb_id = [1];//json.website.languages;//ToDo
    tmp.Wz_xx.Ym_xx.push({IspYmid:json.website.id,Ym:json.website.domain});
    if( json.website.domain1.length > 0 ){
        tmp.Wz_xx.Ym_xx.push({IspYmid:json.website.id,Ym:json.website.domain1});
    }
    if( json.website.domain2.length > 0 ){
        tmp.Wz_xx.Ym_xx.push({IspYmid:json.website.id,Ym:json.website.domain2});
    }
    if( json.website.domain3.length > 0 ){
        tmp.Wz_xx.Ym_xx.push({IspYmid:json.website.id,Ym:json.website.domain3});
    }
    if( json.website.domain4.length > 0 ){
        tmp.Wz_xx.Ym_xx.push({IspYmid:json.website.id,Ym:json.website.domain4});
    }
    tmp.Wz_xx.Jr_xx.push({
        IspJrid:json.website.id,
        Wzfb:{
            Fbdd:json.website.serverregion
        },
        Wzjrfs:{
            Jrfs:[1]
        },
        Ip_xx:{
            IspIpid:json.website.id,
            Qsip:json.website.ip.ip1,
            Zzip:json.website.ip.ip2
        }
    }); //ToDo
    tmp.Wz_xx.Wz_Fzr.Fzr_xm = json.website.managername;
    tmp.Wz_xx.Wz_Fzr.Fzr_dhhm = json.website.officephonenumber;
    tmp.Wz_xx.Wz_Fzr.Fzr_sjhm = json.website.mobile;
    tmp.Wz_xx.Wz_Fzr.Fzr_dzyj = json.website.email;
    tmp.Wz_xx.Wz_Fzr.Msq = '';//ToDo
    tmp.Wz_xx.Wz_Fzr.Qq = json.website.qq;
    tmp.Wz_xx.Wz_Fzr.Fzr_zjlx = json.website.manageridtype;
    tmp.Wz_xx.Wz_Fzr.Fzr_zjhm = json.website.manageridnumber;
    tmp.Wz_xx.Syurl = json.website.homeurl;
    tmp.Wz_xx.Wz_Bz = json.website.remark;
    var temp = {
        Fjxx:{
            Fjwjgx:0,
            Fjyt:'',
            Fjnr:'',
            Fjssdx:{
                Ssdxlx:1,
                Ssdxbs:json.website.id
            },
            Bz:''
        }
    };//ToDo
    tmp.Fj.push(temp);
    ICP.XZBA.Baxx.push(tmp);

    return XZBA;
};

export { XZBA_ASSIGN };
