const fs = require('fs');

var IP_XZBA_ASSIGN = function(json) {
  'use strict';

  var xzba = {
    UploadData: {
      IP: {
        XZBA:{
          Xzly:{
            Ly:[]
          }
        },
        Qqdwid:0
      }
    },
    attr: {version:'V.3.0'}
  };

  var ly = {
    IspId:1,
    Qsip:1778535425,
    Zzip:1778536446,
    Lydw:1197,
    Bz:'义桥'
  };


  ly.IspId = json.id;
  ly.Qsip = json.qsip;
  ly.Zzip = json.zzip;
  ly.Lydw = json.lydw;
  ly.Bz = json.area;

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

  var zdxx = {
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

  xzba.UploadData.IP.XZBA.Xzly.Ly.push(ly);// ToDo
   // xzba.UploadData.IP.XZBA.Xzfp.Fpsy.push(fpsy);
   // xzba.UploadData.IP.XZBA.Xzgbjs.Jsxx.push(jsxx);
   // xzba.UploadData.IP.XZBA.Zdip.Zdxx.push(zdxx);
  xzba.UploadData.IP.Qqdwid = 110000000211;

  return xzba;
};

module.exports = IP_XZBA_ASSIGN;

