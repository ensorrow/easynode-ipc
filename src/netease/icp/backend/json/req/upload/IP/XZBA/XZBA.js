/*
var xzba = {
    Xzly:{
        Ly:{
            IspId:0,
            Qsip:0,
            Zzip:0,
            Lydw:'',
            Bz:''
        }
    },
    Xzfp:{
        Fpsy:{
            IspId:0,
            Qsip:0,
            Zzip:0,
            Fpfs:0,
            Fpdx:0,
            Syfs:0,
            Fprq:'',
            Sfymtz:'',
            Dwmc:'',
            Dwxz:0,
            Dwfl:0,
            Dwhyfl:0,
            Shengid:0,
            Shiid:0,
            Xianid:0,
            Xxdz:'',
            Lxrxm:'',
            Lxrdh:'',
            Lxrdzyj:'',
            Wgip:0,
            Wgdz:'',
            Bz:''
        }
    },
    Xzgbjs:{
        Jsxx:{
            IspId:0,
            Gbdw:0,
            Sqdw:0,
            Qsip:0,
            Zzip:0,
            Bz:''
        }
    },
    Zdip:{
        Zdxx:{
            IspId:0,
            Qsip:0,
            Zzip:0,
            Sfymtz:0,
            Syfs:1,
            Fprq:'',
            Dwmc:'',
            Dwxz:'',
            Shengid:0,
            Shiid:0,
            Xianid:0,
            Xxdz:'',
            Lxrxm:'',
            Lxrdh:'',
            Lxrdzyj:'',
            Wgip:0,
            Wgdz:'',
            Bz:'',
            Ly_dwlx:0,
            Lydw:{
                Ly_dwmc:'',
                Ly_dwid:0
            }
        }
    }
};

var  ICP = {
    XZBA:xzba
};

var XZBA = {
    UploadData: {
        ICP: ICP
    };
}

export { XZBA };
*/



const fs = require('fs');

var xzba = {
    UploadData: {
        IP: {
            XZBA:{
                Xzly:{
                    Ly:{
                        IspId:0,
                        Qsip:0,
                        Zzip:0,
                        Lydw:'',
                        Bz:''
                    }
                },
                Xzfp:{
                    Fpsy:[]
                },
                Xzgbjs:{
                    Jsxx:[]
                },
                Zdip:{
                    Zdxx:[]
                }
            },
            Qqdwid:0
        }
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

    var fpsy = {
        IspId:0,
        Qsip:0,
        Zzip:0,
        Fpfs:0,
        Fpdx:0,
        Syfs:0,
        Fprq:'',
        Sfymtz:'',
        Dwmc:'',
        Dwxz:0,
        Dwfl:0,
        Dwhyfl:0,
        Shengid:0,
        Shiid:0,
        Xianid:0,
        Xxdz:'',
        Lxrxm:'',
        Lxrdh:'',
        Lxrdzyj:'',
        Wgip:0,
        Wgdz:'',
        Bz:''
    };

    var jsxx = {
        IspId:0,
        Gbdw:0,
        Sqdw:0,
        Qsip:0,
        Zzip:0,
        Bz:''
    };

    var zdxx =  {
        IspId:0,
        Qsip:0,
        Zzip:0,
        Sfymtz:0,
        Syfs:1,
        Fprq:'',
        Dwmc:'',
        Dwxz:'',
        Shengid:0,
        Shiid:0,
        Xianid:0,
        Xxdz:'',
        Lxrxm:'',
        Lxrdh:'',
        Lxrdzyj:'',
        Wgip:0,
        Wgdz:'',
        Bz:'',
        Ly_dwlx:0,
        Lydw:{
            Ly_dwmc:'',
            Ly_dwid:0
        }
    };

    xzba.UploadData.IP.XZBA.Xzly.Ly.IspId = 0;//ToDo
    xzba.UploadData.IP.XZBA.Xzly.Ly.Qsip = 0;
    xzba.UploadData.IP.XZBA.Xzly.Ly.Zzip = 0;
    xzba.UploadData.IP.XZBA.Xzly.Ly.Lydw = 0;
    xzba.UploadData.IP.XZBA.Xzly.Ly.Bz = '';
    xzba.UploadData.IP.XZBA.Xzfp.Fpsy.push(fpsy);
    xzba.UploadData.IP.XZBA.Xzgbjs.Jsxx.push(jsxx);
    xzba.UploadData.IP.XZBA.Zdip.Zdxx.push(zdxx);
    xzba.UploadData.IP.Qqdwid = 110000000211;

    console.log(xzba);
    return xzba;
};

export { XZBA_ASSIGN };
