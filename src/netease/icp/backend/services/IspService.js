'use strict';
import co from 'co';
var assert = require('assert');
var logger = using('easynode.framework.Logger').forFile(__filename);
var GenericObject = using('easynode.GenericObject');
var fs = require('co-fs');
var archiver = require('archiver');
var _ = require('lodash');
var soap = require('icp-node-soap');
var utils = require('utility');
var ByteBuffer = require('ByteBuffer');
var iconv = require('iconv-lite');
const crypto = require('crypto');
var fso = require('fs');
var parser = require('xml2json');
var json2xml = require('icp-json2xml');
var js2xmlparser = require('js2xmlparser');
import hsjgAssign from '../json/req/upload/ICP/HSJG/HSJG';
import xzbaAssign from '../json/req/upload/ICP/XZBA/XZBA';
import xzwzAssign from '../json/req/upload/ICP/XZWZ/XZWZ';
import xzjrAssign from '../json/req/upload/ICP/XZJR/XZJR';
import ipxzbaAssign from '../json/req/upload/IP/XZBA/XZBA';
import ipscbaAssign from '../json/req/upload/IP/SCBA/SCBA';

var fstream = require('fstream');
var zlib = require('zlib');
var AdmZip = require('adm-zip');
var http = require('http');
import request from 'superagent';
var StoreService = using('netease.icp.backend.services.StoreService');
import {PhotoSizeLimit} from '../../../../../public/netease/icp/constant/define';

(function() {

  const HASHALGORITHM = 0; // 0-MD5
  const ENCRYPTALGORITHM = 0;// 0-不加密 1-AES加密算法，加密模式使用CBC模式，补码方式采用PKCS5Padding，密钥偏移量由部级系统、省局系统生成的字符串，如“0102030405060708”。
  const COMPRESSIONFORMAT = 0; // 0-zip压缩格式

  var map = new Map([
        [0, '操作成功'],
        [1, '操作成功，数据已经下载完毕'],
        [2, '目前服务器端没有可以下载的数据'],
        [3, '服务器端数据需要下载，请继续调用本接口进行下载'],
        [4, '用户名错误'],
        [5, '密码错误'],
        [6, '解密失败'],
        [7, '哈希值验证未通过'],
        [8, '解压缩失败'],
        [9, '加密算法类型错误'],
        [10, 'Hash算法类型错误'],
        [11, '压缩格式错误'],
        [12, '认证信息错误，服务器拒绝响应'],
        [13, '非本省ISP，服务器拒绝响应'],
        [14, '本次上载没有受理，请首先上载漏报的数据，然后再上载本次数据'],
        [15, '本次上载没有受理，已上报的数据文件已超过最大受理数量，请稍后再提交'],
        [16, '认证错误，随机数小于20个字符，服务器拒绝响应'],
        [17, '您上报的备案数据文件数量不符合要求（每次必须上报1个文件），服务器拒绝受理，请调整后重新上报'],
        [18, '上报的备案数据文件过大，服务器拒绝响应，请将上报的备案数据文件调整为50MB内并重新上报'],
        [19, '您的报备权限未开放，请联系所在省通信管理局'],
        [20, '请您在规定的时间段内进行报备，报备时间为：'],
        [21, '回调响应文件名称不能为空，请核实后继续调用'],
        [22, '备案密码校验超过X次，请仔细核对备案密码'],
        [901, '系统正在维护中，您的报备请求未被受理，请稍后重新报备'],
        [902, '系统正在维护中，您的下载请求未被受理，请稍后重新下载'],
        [999, '其他错误'],
        [1001, '管局审核通过'],
        [1002, '管局审核拒绝'],
        [1003, '网站主办者冲突，请核实后再次报备'],
        [1004, '无效域名，请核实后再次报备'],
        [1005, '域名冲突，该域名在备案信息库中已存在，请核实后再次报备'],
        [1006, '无效IP，请核实后再次报备'],
        [1007, '无效联系方式，请核实后再次报备'],
        [1008, '无效证件，请核实后再次报备'],
        [1009, '无效邮箱，请核实后再次报备'],
        [1010, '无效办公电话，请核实后再次报备'],
        [1011, '无效手机号码，请核实后再次报备'],
        [1012, '无效MSN，请核实后再次报备'],
        [1013, '无效QQ，请核实后再次报备'],
        [1014, '无效主办单位性质，请核实后再次报备'],
        [1015, '无效身份证号码，请核实后再次报备'],
        [1016, '备案申请中的数据在备案信息库中不存在，请核实后再次报备'],
        [1017, '备案变更中，审核通过后可再次申请变更'],
        [1018, 'ICP备案密码错误，请核实后再次报备'],
        [1019, '省市县代码错误，请核实后再次报备'],
        [1020, '网站名称冲突，请核实后再次报备'],
        [1021, '网站首页地址冲突，在备案信息库中已存在该首页地址，请核实后再次报备'],
        [1022, '网站首页地址格式错误，请核实后再次报备'],
        [1023, '备案申请中的IP数据在备案信息库中不存在，请核实后再次报备'],
        [1024, '备案信息中的IP地址冲突，请核实后再次报备'],
        [1025, '该网站只有一个接入，不能取消该接入'],
        [1026, '注销理由代码错误，请核实后再次报备'],
        [1027, '注销主体冲突，无需重复提交该主体的注销申请'],
        [1028, 'ICP用户名错误，请核实后再次报备'],
        [1029, '同一个网站不允许有相同的接入，请核实后再次报备'],
        [1030, '注销网站冲突，无需重复提交该网站的注销申请'],
        [1031, '网站负责人办公电话不能为空，请核实后再次报备'],
        [1032, '接入商已经对该网站提出取消接入请求，无需重复提交'],
        [1033, '无效的前置或专项审批内容类型，请核实后再次报备'],
        [1034, '无效网站服务内容，请核实后再次报备'],
        [1035, '无效网站接入方式，请核实后再次报备'],
        [1036, '无效服务器放置地点，请核实后再次报备'],
        [1037, '该网站已经报备，无需重复报备'],
        [1038, '该接入已经报备，无需重复报备'],
        [1039, '该备案信息中的网站域名已经报备，无需重复报备'],
        [1040, '该备案接入信息中的IP信息已经报备，无需重复报备'],
        [1041, '网站首页URL中必须包含域名中的其中一项，请核实后再次报备'],
        [1042, '主体正在注销中，不允许注销网站'],
        [1043, '网站正在注销中，不允许注销主体'],
        [1044, '主体负责人姓名不能为空'],
        [1045, '接入商只能到其所在省通信管理局系统进行ICP备案信息的报备'],
        [1046, '变更备案时不能改变主体所在省，如果需要修改，请先申请注销主体，然后重新报备'],
        [1047, '只能取消本接入商的接入信息，请核实后再次报备'],
        [1048, '您试图操作的不是您接入的备案，这种操作是非法的，请核实后再次报备'],
        [1049, '主体已注销，您的请求被拒绝'],
        [1050, '网站已注销，您的请求被拒绝'],
        [1051, '同一个接入商对同一个主体变更备案申请超过最大数，请稍后再试'],
        [1052, '您所提交的请求在原系统中正在受理，请稍后提交'],
        [1053, '您所提交的请求的单位已经被删除  请确认'],
        [1054, '报备单位无效'],
        [1055, '核验单提交信息不是该备案核验单，请确认'],
        [1056, '附件格式类型代码错误，请核实后再次报备'],
        [1057, '附件用途类型代码错误，请核实后再次报备'],
        [1058, '主体信息不存在'],
        [1059, '网站信息不存在'],
        [1060, '核验单信息成功入库'],
        [1061, '核验单用途类型与报备标识不匹配'],
        [1062, 'ICP接入信息比对IP库信息成功'],
        [1063, 'ICP备案接入信息中所使用的IP地址与你单位IP地址备案中报备的IP信息不一致，请核实后再次提交'],
        [1064, '“XX”网站的“XX域名”在黑名单中，请核实后再次报备'],
        [1065, '主体在黑名单中，请核实后再次报备'],
        [1066, '网站语言类别错误，请核实后再次报备'],
        [1067, '网站备案号或主键对应多个网站，请核实后再报备'],
        [1068, '网站备案号或主键对应多个缩略信息，请核实后再报备'],
        [1999, '其他错误'],
        [2001, '没有此报备单位，请核实后再次报备'],
        [2002, '报备信息中的起始IP大于终止IP，请核实后再次报备'],
        [2003, '此IP段已报备，请核实后再次报备'],
        [2004, '此IP广播已经报备，请核查后再次报备'],
        [2005, '此IP段未报备来源信息，请首先报备来源信息'],
        [2006, '报备信息中的起始IP不是合法IP地址，请核实后再次报备'],
        [2007, '报备信息中的终止IP不是合法IP地址'],
        [2008, '报备信息中的网关地址不是合法IP地址，请核实后再次报备'],
        [2009, '报备信息中的单位分类不正确，请核实后再次报备'],
        [2010, '报备信息中的分配使用方式不能为空，请核实后再次报备'],
        [2011, '报备信息中的省市县信息错误，请核实后再次报备'],
        [2012, '报备信息中的电话号码不是合法的电话号码，请核实后再次报备'],
        [2013, '报备信息中的Email不是有效的电子邮箱，请核实后再次报备'],
        [2014, '报备信息中的起始IP不能为空，请核实后再次报备'],
        [2015, '报备信息中的终止IP不能为空，请核实后再次报备'],
        [2016, '报备信息中的广播单位不能为空，请核实后再次报备'],
        [2017, '报备信息中的广播单位不存在，请核实后再次报备'],
        [2018, '报备信息中的申请广播单位不存在，请核实后再次报备'],
        [2019, '报备信息中的单位性质无效，请核实后再次报备'],
        [2020, '报备信息中的单位行业分类无效，请核实后再次报备'],
        [2021, '报备信息中的IP使用方式无效，请核实后再次报备'],
        [2022, '报备信息中的经营许可证不能为空，请核实后再次报备'],
        [2023, '报备信息中的单位行政级别无效，请核实后再次报备'],
        [2024, '报备信息中的省信息无效，请核实后再次报备'],
        [2025, '报备信息中的市信息无效，请核实后再次报备'],
        [2026, '报备信息中的县信息无效，请核实后再次报备'],
        [2027, '报备信息中的报备单位不能为空，请核实后再次报备'],
        [2028, '报备信息中的来源单位不能为空，请核实后再次报备'],
        [2029, '报备信息中的来源单位不正确，请核实后再次报备'],
        [2030, '报备信息中的使用时间不能为空，请核实后再次报备'],
        [2031, '报备信息中的单位名称不能为空，请核实后再次报备'],
        [2032, '报备信息中的IP使用方式不能为空，请核实后再次报备'],
        [2033, '报备信息中的域名跳转不能为空，请核实后再次报备'],
        [2034, '报备信息中的单位性质不能为空，请核实后再次报备'],
        [2035, '报备信息中的单位分类不能为空，请核实后再次报备'],
        [2036, '报备信息中的单位详细地址不能为空，请核实后再次报备'],
        [2037, '报备信息中的省信息不能为空，请核实后再次报备'],
        [2038, '报备信息中的市信息不能为空，请核实后再次报备'],
        [2039, '报备信息中的联系人电话不能为空，请核实后再次报备'],
        [2040, '报备信息中的联系人姓名不能为空，请核实后再次报备'],
        [2041, '报备信息中的分配使用方式无效，请核实后再次报备'],
        [2042, '报备信息中的联系人邮件不能为空，请核实后再次报备'],
        [2043, '报备信息中的网关IP地址不能为空，请核实后再次报备'],
        [2044, '报备信息中的网关物理地址不能为空，请核实后再次报备'],
        [2045, '报备信息中的来源单位名称不能为空，请核实后再次报备'],
        [2046, '报备信息中的来源单位类型不能为空，请核实后再次报备'],
        [2047, '报备信息中的分配对象不能为空，请核实后再次报备'],
        [2048, '报备信息中的分配单位不存在，请核实后再次报备'],
        [2049, '此信息已经报备，请核实后再次报备'],
        [2050, '分配和使用单位不能相同，请核实后再次报备'],
        [2051, '无效的广播报备单位'],
        [2052, '报备信息中的来源单位和请求单位不能相同，请核实后再次报备'],
        [2053, '报备信息中的申请广播单位与广播单位不能相同，请核实后再次报备'],
        [2054, '接入商只能操作属于本接入商的IP备案信息，请核实后再次报备'],
        [2055, '备案申请中的IP数据在备案信息库中不存在，请核实后再次报备'],
        [2056, '备案信息中的IP地址冲突，请核实后再次报备'],
        [2998, 'IP备案操作成功'],
        [2999, '其他错误'],
        [3001, '报备信息中的域名类型错误 ，请核实后再次报备'],
        [3002, '报备信息中的域名注册时间不能为空，请核实后再次报备'],
        [3003, '报备信息中的域名有效日期不能为空，请核实后再次报备'],
        [3004, '报备信息中的域名有效日期不能早于当前日期，请核实后再次报备'],
        [3005, '报备信息中的域名服务器不能为空，请核实后再次报备'],
        [3006, '报备信息中的域名所属注册商不能为空，请核实后再次报备'],
        [3007, '报备信息中的域名所属注册商名称中包含特殊字符、格式不正确或为空，请核实后再次报备'],
        [3008, '报备信息中的域名注册人名称不能为空，请核实后再次报备'],
        [3009, '报备信息中的域名注册人所在组织不能为空，请核实后再次报备'],
        [3010, '报备信息中的域名注册人所在省不能为空，请核实后再次报备'],
        [3011, '报备信息中的域名注册人所在城市不能为空，请核实后再次报备'],
        [3012, '报备信息中的域名注册人电子邮件不能为空，请核实后再次报备'],
        [3013, '报备信息中的域名注册人电子邮件格式错误，请核实后再次报备'],
        [3014, '报备信息中的域名注册人电话号码不能为空，请核实后再次报备'],
        [3015, '报备信息中的域名注册人电话号码格式错误，请核实后再次报备'],
        [3016, '报备信息中的域名注册人通信地址不能为空，请核实后再次报备'],
        [3017, '报备信息中的域名管理员名称不能为空，请核实后再次报备'],
        [3018, '报备信息中的域名管理员所在组织不能为空，请核实后再次报备'],
        [3019, '报备信息中的域名管理员所在省不能为空，请核实后再次报备'],
        [3020, '报备信息中的域名管理员所在城市不能为空，请核实后再次报备'],
        [3021, '报备信息中的域名管理员电子邮件不能为空，请核实后再次报备'],
        [3022, '报备信息中的域名管理员电子邮件格式错误，请核实后再次报备'],
        [3023, '报备信息中的域名管理员电话号码不能为空，请核实后再次报备'],
        [3024, '报备信息中的域名管理员电话号码格式错误，请核实后再次报备'],
        [3025, '报备信息中的域名管理员通信地址不能为空，请核实后再次报备'],
        [3026, '报备信息中的接入方式无效，请核实后再次报备'],
        [3027, '报备信息中的服务器放置地无效，请核实后再次报备'],
        [3028, '报备信息中的注册人省市错误，请核实后再次报备'],
        [3029, '报备信息中的管理员省市错误，请核实后再次报备'],
        [3030, '报备信息中的缴费人省市错误，请核实后再次报备'],
        [3031, '报备信息中的注册时间格式错误，请核实后再次报备'],
        [3032, '报备信息中的有效日期格式错误，请核实后再次报备'],
        [3033, '报备信息中的缴费人电话号码格式错误，请核实后再次报备'],
        [3034, '报备信息中的缴费人电子邮件格式错误，请核实后再次报备'],
        [3035, '报备信息中的域名注册时间超过当前时间，请核实后再次报备'],
        [3036, '域名报备单位只能到工信部备案系统进行域名报备，请核实后再次报备'],
        [3037, '接入商只能操作属于本接入商的域名备案信息，请核实后再次报备'],
        [3998, '域名备案操作成功'],
        [3999, '其他错误'],
        [5001, '数据文件格式不符合接口XSD规范，请核实后再次报备'],
        [5002, '该属性不存在，请核实后再次报备'],
        [5003, 'XML中请求单位Id和报备单位Id不一致，请核实后再次报备'],
        [5004, '接口版本错误，当前接口版本为“当前版本信息”'],
        [5005, '企业上报的未备案网站处理结果中的网站不属于该企业，请核实后再次报备'],
        [5006, '该未备案网站的处理结果已经上报，无需重复上报'],
        [5007, '处理结果代码错误，请核实后再次报备'],
        [5008, '上报信息中存在非法字符，请核实后再次报备'],
        [5009, '报备单位无此业务权限'],
        [5010, '您提交的附件格式不符合规范'],
        [5011, '该功能目前未开放'],
        [5999, '其他错误']
  ]);

    /**
     * Class IspService
     *
     * @class netease.icp.backend.services.IspService
     * @extends easynode.GenericObject
     * @since 0.1.0
     * @author allen.hu
     * */
  class IspService extends GenericObject {
        /**
         * 构造函数。
         *
         * @method 构造函数
         * @since 0.1.0
         * @author allen.hu
         * */
    constructor(app, config = {}) {
      super();
            // 调用super()后再定义子类成员。
      this.app = app;
      this.icp = config.icp;
      this.tenantpubips = config.tenantpubips;
      this.urls = [this.icp.REPORT_URL, this.icp.QUERY_URL, this.icp.VERIFY_URL];
      this.clientReport = null;
      this.clientQuery = null;
      this.clientVerify = null;
      this.dataSequence = 6;
      this.FIRST = 0;
      this.XZWZ = 1;
      this.XZJR = 2;
      this.HSJG = 3;
      this.IP_XZBA = 4;
      this.IP_SCBA = 5;
      this.MIN = 2;
      this.MAX = 98;
      this.dataSequence = 327;
    }

        /**
         * @method  创建连接
         * @since 0.1.0

         * @apiSuccess {Promise[]} Promise对象
         *
         */
    createConnect() {
      var me = this;
      var ps = me.urls.map(function(url) {
        return new Promise(function(res, rej) {
          soap.createClient(url, function(err, client) {
            if (err) {
              EasyNode.DEBUG && logger.debug(`createConnect to ${url} failed`);
              rej();
            } else {
              url == me.urls[0] ? me.clientReport = client :
                                url == me.urls[1] ? me.clientQuery = client : me.clientVerify = client;
              EasyNode.DEBUG && logger.debug(`createConnect to ${url} success ${client}`);
              res();
            }
          });
        });
      });

      return Promise.all(ps);
    }

        /**
         * @method 上报数据
         * @apiName isp_upload
         * @apiGroup ISP
         * @apiPermission whitelist
         * @apiVersion 0.0.2
         *
         * @apiDescription 该方法实现将企业侧系统的备案申请等数据提交到部级系统、省局系统
         *
         * 企业侧系统在调用该接口方法之前，首先要产生长度为20个字节的随机字符串（数字和大、小写字母），并将口令与该随机字符串连接（例如，口令是字符串“1234567890”，生成的随机字符串是 “abcdefghij”，那么连接后的结果是字符串“1234567890abcdefghij”）。
         * 将连接后的结果转换为GBK编码的二进制数据，使用hashAlgorithm定义的哈希算法进行哈希计算，得到参数pwdHash的值作为认证信息。
         企业侧系统在调用该方法上报备案数据时，一次调用只能上报一个XML格式的数据文件，并且所上报的XML数据文件大小不能超过50MB，单个XML数据文件内的备案数据不能超过1000条。企业侧系统上报的数据文件必须满足本规范所附的XSD格式规范。
         企业侧系统上报的数据文件名必须使用英文字母或数字，文件名长度不超过128个字节。
         企业侧系统在上报完数据文件后，应保存该数据文件3个月以上，以保证系统处理文件出现错误时重新上传数据文件。
         企业侧系统要对需要上报的备案信息按照附件“企业上报数据格式.xsd”指定的格式编制XML文件，然后依序进行如下处理：
         1）    对XML文件使用参数compressionFormat指定的压缩格式进行压缩；
         2）    对压缩后的信息使用参数hashAlgorithm指定的哈希算法计算哈希值，并对哈希值进行base64编码运算形成beianInfoHash；
         3）    如需加密上传，则对压缩后的信息使用参数encryptAlgorithm指定的加密算法加密，并对加密结果进行base64编码运算形成beianInfo；如不加密上传，则直接对压缩后的信息进行base64编码运算形成beianInfo。


         * @apiParam {Number} ispId 接入服务提供者的标识，可在部/省局系统的公共查询中查询得到
         * @apiParam {String} userName 用户名，由企业所在省管局（或部管局）维护管理
         * @apiParam {String} randVal 企业侧系统调用该方法时生成的随机字符串，长度是20字节
         * @apiParam {String} pwdHash 使用指定的哈希算法对用户密码和随机字符串进行哈希运算，然后进行base64编码运算得到的结果，用户口令由企业所在省管局（或部管局）维护管理
         * @apiParam {String} beianInfo 对备案信息（XML文件，格式参见“企业上报数据格式.xsd”）使用压缩算法进行压缩，再对压缩后的信息进行加密，然后进行Base64编码运算得到的结果
         * @apiParam {String} beianInfoHash 对备案信息（XML文件，格式参见“企业上报数据格式.xsd”）压缩后进行哈希运算得到的哈希值
         * @apiParam {Number} dataSequence 本次数据上报的数据编号
         * @apiParam {Number} encryptAlgorithm 本次数据上报的数据编号 0: 不进行加密,明文转输 1:AES加密算法，加密模式使用CBC模式，补码方式采用PKCS5Padding，密钥偏移量由部级系统、省局系统生成的字符串，如“0102030405060708”。
         * @apiParam {Number} hashAlgorithm 哈希算法 0: MD5哈希算法
         * @apiParam {Number} compressionFormat 压缩格式 0: Zip压缩算法
         *
         * @apiSuccess {XML} XML
         * 该方法返回一个XML数据流（数据格式详见文件“企业上报数据方法调用返回数据格式.xsd”），其中描述了本次操作的结果代码、结果描述。
         如果操作成功，则返回以下信息：
         <return>
         <msg_code>0</msg_code>
         <msg>操作成功</msg>
         </return>
         * @apiError {XML} xml
         * 如果操作错误，则返回以下信息：
         <return>
         <msg_code>x</msg_code>
         <msg>错误描述</msg>
         <dataSequences>（本标签当x=14时存在）
         <dataSequence>漏报的数据文件序号</dataSequence>
         </dataSequences>
         </return>
         msg_code参见第3-4节的接口返回状态msg_code代码表
         */
    isp_upload(args) {
      var me = this;
      return new Promise(function(res, rej) {
        me.clientReport.isp_upload(args, function(err, result) {
          if (err) {
            EasyNode.DEBUG && logger.debug(`isp_upload to ${args} failed, err: ${err}`);
            rej();
          } else {
            EasyNode.DEBUG && logger.debug(`isp_upload to ${args} success`);
            var xml = result.return;
            var json = parser.toJson(xml, {object: true, arrayNotation: false});
            console.log(json);
            if (parseInt(json.return.msg_code) == 0) {
              var msg = json.return.msg;
              me.dataSequence += 1;
              res(me.dataSequence);
              console.log(msg);
            } else if (parseInt(json.return.msg_code) == 14) {
              res(json.return.dataSequences.dataSequence);
            } else {
              EasyNode.DEBUG && console.log(map[json.return.msg_code]);
              console.log(json);
              res(me.dataSequence);
            }
          }
        });
      });
    }

        /**
         * @method 下载数据
         * @apiName isp_download
         * @apiGroup ISP
         * @apiPermission whitelist
         * @apiVersion 0.0.2
         *
         * @apiDescription 通过该方法，企业侧系统可以下载部级系统或省管局系统下发的备案管理数据文件。
         *
         * 企业侧系统在调用该接口方法之前，首先要产生长度为20个字节的随机字符串（数字和大、小写字母），并将口令与该随机字符串连接（例如，口令是字符串“1234567890”，生成的随机字符串是 “abcdefghij”，那么连接后的结果是字符串“1234567890abcdefghij”）。将连接后的结果转换为GBK编码的二进制数据，使用hashAlgorithm定义的哈希算法进行哈希计算，得到参数pwdHash的值作为认证信息。
         部级系统或省局系统接收到企业侧系统的下载请求后，将需要下发给该企业的备案管理数据文件（文件格式参见“企业下载数据格式.xsd”）依次进行如下处理：
         1）    对XML数据文件使用指定的压缩格式进行压缩；
         2）    对压缩后的信息使用哈希算法计算哈希值，然后对哈希值进行base64编码运算；
         3）    如需加密下载，则对压缩后的信息使用指定的加密算法加密，然后对加密结果进行base64编码运算；如不加密下载，则直接对压缩后的信息进行base64编码运算形成beianInfo。
         部级系统或省局系统将上述处理后的哈希值、编码运算后的加密（或者明文）结果、哈希算法、加密算法、压缩格式返回给企业系统（详见“企业下载数据格式.xsd”）


         返回数据处理
         注：
         1.    返回值XML流中的标签“encryptAlgorithm”为0时，表示“beianInfo”标签的内容是不加密的；为1时，表示“beianInfo”标签的内容经过AES加密算法的加密，加密模式使用CBC模式，补码方式采用PKCS5Padding，密钥偏移量由部级系统、省局系统生成的字符串，如“0102030405060708”；
         2.    返回值XML流中的标签“hashAlgorithm”为0时，表示哈希算法是MD5；
         3.    返回值XML流中的标签“compressionFormat”为0时，表示使用Zip压缩格式进行压缩；
         4.    本方法中数据加解密、计算哈希值和压缩/解压缩是指对数据字节流的加解密、计算哈希值和压缩/解压缩。


         * @apiParam {Number} ispId 接入服务提供者的标识，可在部/省局系统的公共查询中查询得到
         * @apiParam {String} userName 用户名，由企业所在省管局（或部管局）维护管理
         * @apiParam {String} randVal 企业侧系统调用该方法时生成的随机字符串，长度是20字节
         * @apiParam {String} pwdHash 使用指定的哈希算法对用户密码和随机字符串进行哈希运算，然后进行base64编码运算得到的结果，用户口令由企业所在省管局（或部管局）维护管理
         * @apiParam {Number} hashAlgorithm 哈希算法 0: MD5哈希算法
         *
         * @apiSuccess {XML} xml
         * 该方法返回一个XML数据流（数据格式详见文件“企业下载数据方法调用返回数据格式.xsd”），其中描述了本次操作的结果代码、结果描述。
         如果成功，返回以下信息：
         <return>
         <msg_code>0</msg_code>
         <msg>操作成功</msg>
         <fileInfos>
         <hashAlgorithm>哈希算法</hashAlgorithm>
         <compressionFormat>压缩格式</compressionFormat>
         <encryptAlgorithm>加密算法</encryptAlgorithm>
         <return_FileName>省局系统的备案数据文件名</return_FileName>
         <beianInfo>备案信息内容</beianInfo>
         <beianInfoHash>备案信息的哈希值</beianInfoHash>
         </fileInfos>
         </return>

         企业侧系统收到上述数据后，首先对beianInfo信息进行base64解码，接着对解码后的信息使用encryptAlgorithm指定的加密算法解密，在得到备案信息的压缩信息后，再使用hashAlgorithm指定的哈希算法计算哈希值，然后与beianInfoHash信息base64解码后的信息进行比较。如果比较一致，那么备案信息的完整性得到保证；如果比较不一致，则哈希值验证未通过，备案数据不完整。最后，在通过完整性校验后，使用compressionFormat指定的压缩格式对压缩后的信息进行解压缩，得到备案数据信息。
         如果操作错误，返回以下信息：
         <return>
         <msg_code>x</msg_code>
         <msg>错误描述</msg>
         </return>
         企业侧系统收到备案信息文件后，如果数据文件可以通过完整性校验，并进行解压缩，则应该调用本接口规范中第3-3-3节的“isp_downloadack”方法，将已正确接收到该文件的信息回执发送给部级系统或省局系统。
         msg_code参见第3-4节的接口返回状态msg_code代码表。
         对于部级系统或省局系统处理企业上报的备案数据文件所产生的错误信息，均以数据文件下载形式返回给企业。数据中的错误信息详见3-5节数据处理结果代码表。
         */
    isp_download(args) {
      var me = this;
      return new Promise(function(res, rej) {
        me.clientReport.isp_download(args, function(err, result) {
          if (err) {
            EasyNode.DEBUG && logger.debug(`isp_download to ${args} failed, err: ${err},result: ${result}`);
            console.log(result);
            rej();
          } else {
                        // EasyNode.DEBUG && logger.debug(`isp_download to ${args} success`);
            var xml = result.return;
            var json = parser.toJson(xml, {object: true, arrayNotation: false});
            if (json.return.msg_code == 3) { // Continue download

            }

            var fileInfos = json.return.fileInfos;

            res(fileInfos);
          }
        });
      });
    }

        /**
         * @method 下载确认数据包
         * @apiName isp_downloadack
         * @apiGroup ISP
         * @apiPermission whitelist
         * @apiVersion 0.0.2
         *
         * @apiDescription 企业侧系统在调用isp_download方法，成功下载备案管理数据文件完毕后，需要调用本方法，将已成功接收到下载文件的信息回执发送给部级系统或省局系统。
         *
         * 注：
         1.    如果企业侧系统在调用isp_download方法成功下载备案管理数据文件完毕后，不调用本方法将已成功接收到数据文件的信息回执发送给部级系统/省局系统，则部级系统/省局系统将在企业侧系统再次调用isp_download方法时，继续发送该数据文件。
         2.    本方法中计算哈希值是指对数据字节流的哈希值计算。


         * 企业侧系统在调用该接口方法之前，首先要产生长度为20个字节的随机字符串（数字和大、小写字母），并将口令与该随机字符串连接（例如，口令是字符串“1234567890”，生成的随机字符串是 “abcdefghij”，那么连接后的结果是字符串“1234567890abcdefghij”）。将连接后的结果转换为GBK编码的二进制数据，使用hashAlgorithm定义的哈希算法进行哈希计算，得到参数pwdHash的值作为认证信息。
         部级系统或省局系统接收到企业侧系统的下载请求后，将需要下发给该企业的备案管理数据文件（文件格式参见“企业下载数据格式.xsd”）依次进行如下处理：
         1）    对XML数据文件使用指定的压缩格式进行压缩；
         2）    对压缩后的信息使用哈希算法计算哈希值，然后对哈希值进行base64编码运算；
         3）    如需加密下载，则对压缩后的信息使用指定的加密算法加密，然后对加密结果进行base64编码运算；如不加密下载，则直接对压缩后的信息进行base64编码运算形成beianInfo。
         部级系统或省局系统将上述处理后的哈希值、编码运算后的加密（或者明文）结果、哈希算法、加密算法、压缩格式返回给企业系统（详见“企业下载数据格式.xsd”）


         返回数据处理
         注：
         1.    返回值XML流中的标签“encryptAlgorithm”为0时，表示“beianInfo”标签的内容是不加密的；为1时，表示“beianInfo”标签的内容经过AES加密算法的加密，加密模式使用CBC模式，补码方式采用PKCS5Padding，密钥偏移量由部级系统、省局系统生成的字符串，如“0102030405060708”；
         2.    返回值XML流中的标签“hashAlgorithm”为0时，表示哈希算法是MD5；
         3.    返回值XML流中的标签“compressionFormat”为0时，表示使用Zip压缩格式进行压缩；
         4.    本方法中数据加解密、计算哈希值和压缩/解压缩是指对数据字节流的加解密、计算哈希值和压缩/解压缩。


         * @apiParam {Number} ispId 接入服务提供者的标识，可在部/省局系统的公共查询中查询得到
         * @apiParam {String} userName 用户名，由企业所在省管局（或部管局）维护管理
         * @apiParam {String} randVal 企业侧系统调用该方法时生成的随机字符串，长度是20字节
         * @apiParam {String} pwdHash 使用指定的哈希算法对用户密码和随机字符串进行哈希运算，然后进行base64编码运算得到的结果，用户口令由企业所在省管局（或部管局）维护管理
         * @apiParam {Number} hashAlgorithm 哈希算法 0: MD5哈希算法
         * @apiParam {String} fileName  在isp_download方法中已成功接收到的备案信息文件名
         *
         * @apiSuccess {XML} xml
         *
         *该方法返回一个XML数据流（详见文件“企业数据下载确认方法调用返回数据格式.xsd”），参照以下信息：
         <return>
         <msg_code>x</msg_code>
         <msg>返回信息描述</msg>
         </return>
         msg_code参见第3-4节的返回状态msg_code代码表
         */
    isp_downloadack(args) {
      var me = this;
      return new Promise(function(res, rej) {
        me.clientReport.isp_downloadack(args, function(err, result) {
          if (err) {
            EasyNode.DEBUG && logger.debug(`isp_downloadack to ${args} failed, err: ${err}`);
            rej();
          } else {
            EasyNode.DEBUG && logger.debug(`isp_downloadack to ${args} success`);
            res(result);
          }
        });
      });
    }


        /**
         * @method 查询本企业最近一次上报备案数据及其序号
         * @apiName isp_querypreviousupload
         * @apiGroup ISP
         * @apiPermission whitelist
         * @apiVersion 0.0.2
         *
         * @apiDescription 查询本企业最近一次上报的备案数据及其序号。
         *
         注：
         1.    本方法在企业侧系统出现故障后，可以使用本方法与部级系统或省局系统进行通信参数的同步；企业侧系统在调用本方法得到数据文件序号后，在下次上报数据文件时，使用的文件序号应为本方法返回的数据文件序号加1；
         2.    企业侧系统在未进行数据上报操作时，调用本方法返回的数据文件为空，文件序号为0。


         * 企业侧系统在调用该接口方法之前，首先要产生长度为20个字节的随机字符串（数字和大、小写字母），并将口令与该随机字符串连接（例如，口令是字符串“1234567890”，生成的随机字符串是 “abcdefghij”，那么连接后的结果是字符串“1234567890abcdefghij”）。将连接后的结果转换为GBK编码的二进制数据，使用hashAlgorithm定义的哈希算法进行哈希计算，得到参数pwdHash的值作为认证信息。
         部级系统或省局系统接收到企业侧系统的下载请求后，将需要下发给该企业的备案管理数据文件（文件格式参见“企业下载数据格式.xsd”）依次进行如下处理：
         1）    对XML数据文件使用指定的压缩格式进行压缩；
         2）    对压缩后的信息使用哈希算法计算哈希值，然后对哈希值进行base64编码运算；
         3）    如需加密下载，则对压缩后的信息使用指定的加密算法加密，然后对加密结果进行base64编码运算；如不加密下载，则直接对压缩后的信息进行base64编码运算形成beianInfo。
         部级系统或省局系统将上述处理后的哈希值、编码运算后的加密（或者明文）结果、哈希算法、加密算法、压缩格式返回给企业系统（详见“企业下载数据格式.xsd”）


         * @apiParam {Number} ispId 接入服务提供者的标识，可在部/省局系统的公共查询中查询得到
         * @apiParam {String} userName 用户名，由企业所在省管局（或部管局）维护管理
         * @apiParam {String} randVal 企业侧系统调用该方法时生成的随机字符串，长度是20字节
         * @apiParam {String} pwdHash 使用指定的哈希算法对用户密码和随机字符串进行哈希运算，然后进行base64编码运算得到的结果，用户口令由企业所在省管局（或部管局）维护管理
         * @apiParam {Number} hashAlgorithm 哈希算法 0: MD5哈希算法
         *
         * @apiSuccess {XML} xml
         *该方法返回一个XML数据流（详见文件“企业最近上载数据查询方法调用返回数据格式.xsd”），其中描述了本次操作的结果代码、结果描述。
         如果成功，返回以下信息：
         <return>
         <msg_code>0</msg_code>
         <msg>代码描述</msg>
         <fileInfos>
         <hashAlgorithm>哈希算法</hashAlgorithm>
         <compressionFormat>压缩格式</compressionFormat>
         <encryptAlgorithm>加密算法</encryptAlgorithm>
         <dataSequence>数据文件序号</dataSequence>
         <return_FileName>上次上报的备案数据文件名</return_FileName>
         <beianInfo>上次上报备案信息内容</beianInfo>
         <beianInfoHash>备案信息的哈希值</beianInfoHash>
         </fileInfos>
         </return>
         企业侧系统收到上述数据后，首先对beianInfo信息进行base64解码，接着对解码后的信息使用encryptAlgorithm指定的加密算法解密，在得到备案信息的压缩信息后，再使用hashAlgorithm指定的哈希算法计算哈希值，然后与beianInfoHash信息base64解码后的信息进行比较。如果比较一致，那么备案信息的完整性得到保证；如果比较不一致，则哈希值验证未通过，备案数据不完整。最后，在通过完整性校验后，使用compressionFormat指定的压缩格式对压缩后的信息进行解压缩，得到备案数据信息。
         如果操作错误，返回以下信息：
         <return>
         <msg_code>x</msg_code>
         <msg>错误描述</msg>
         </return>
         */
    isp_querypreviousupload(args) {
      var me = this;

      return new Promise(function(res, rej) {
        me.clientReport.isp_querypreviousupload(args, function(err, result) {
          if (err) {
            EasyNode.DEBUG && logger.debug(`isp_querypreviousupload to ${args} failed, err: ${err}`);
            rej();
          } else {
            EasyNode.DEBUG && logger.debug(`isp_querypreviousupload to ${args} success ${result}`);
            var xml = result.return;
            var json = parser.toJson(xml, {object: true, arrayNotation: false});
            if (parseInt(json.return.msg_code) == 0) {
              me.dataSequence = parseInt(json.return.fileInfos.dataSequence);
            } else {
              EasyNode.DEBUG && console.log(map[json.return.msg_code]);
            }
            EasyNode.DEBUG && logger.debug(` e.dataSequence: ${me.dataSequence}`);
            res(json.return.fileInfos);
          }
        });
      });
    }

        /**
         * @method 查询备案状态
         * @apiName isp_querybeianstatus
         * @apiGroup ISP
         * @apiPermission whitelist
         * @apiVersion 0.0.2
         *
         * @apiDescription 企业侧系统可以通过该方法查询网站或主体的备案状态（即：是否已经完成备案）。如果网站已经备案，则返回该网站的网站名称、主体备案号和网站备案号；如果主体已经备案，则返回该主体的主体备案号；
         注：本方法中计算哈希值是指对数据字节流的哈希值计算。

         * 企业侧系统在调用该接口方法之前，首先要产生长度为20个字节的随机字符串（数字和大、小写字母），并将口令与该随机字符串连接（例如，口令是字符串“1234567890”，生成的随机字符串是 “abcdefghij”，那么连接后的结果是字符串“1234567890abcdefghij”）。将连接后的结果转换为GBK编码的二进制数据，使用hashAlgorithm定义的哈希算法进行哈希计算，得到参数pwdHash的值作为认证信息。
         部级系统或省局系统接收到企业侧系统的下载请求后，将需要下发给该企业的备案管理数据文件（文件格式参见“企业下载数据格式.xsd”）依次进行如下处理：
         1）    对XML数据文件使用指定的压缩格式进行压缩；
         2）    对压缩后的信息使用哈希算法计算哈希值，然后对哈希值进行base64编码运算；
         3）    如需加密下载，则对压缩后的信息使用指定的加密算法加密，然后对加密结果进行base64编码运算；如不加密下载，则直接对压缩后的信息进行base64编码运算形成beianInfo。
         部级系统或省局系统将上述处理后的哈希值、编码运算后的加密（或者明文）结果、哈希算法、加密算法、压缩格式返回给企业系统（详见“企业下载数据格式.xsd”）


         * @apiParam {Number} ispId 接入服务提供者的标识，可在部/省局系统的公共查询中查询得到
         * @apiParam {String} userName 用户名，由企业所在省管局（或部管局）维护管理
         * @apiParam {String} randVal 企业侧系统调用该方法时生成的随机字符串，长度是20字节
         * @apiParam {String} pwdHash 使用指定的哈希算法对用户密码和随机字符串进行哈希运算，然后进行base64编码运算得到的结果，用户口令由企业所在省管局（或部管局）维护管理
         * @apiParam {Number} hashAlgorithm 哈希算法 0: MD5哈希算法
         * @apiParam {Number} queryConditionType 查询条件类型：
         0-表示通过网站域名查询网站是否已备案；
         1-表示通过工商营业执照号码查询单位主体是否备案；
         2-表示通过个人身份证号码查询个人主体是否备案；
         3-表示通过事业单位组织机构代码证号码查询单位主体是否备案；
         4-表示通过事业法人证号码查询单位主体是否备案；
         5-表示通过军队代号号码查询单位主体是否备案；
         6-表示通过社会团体社团法人证号码查询单位主体是否备案；
         7-表示通过护照号码查询个人主体是否备案；
         8-表示通过军官证号码查询个人主体是否备案；
         9-表示通过政府机关组织机构代码证号码查询单位主体是否备案；
         10-表示通过社会团体组织机构代码证号码查询单位主体是否备案；
         11-表示通过台胞证号码查询个人主体是否备案。
         * @apiParam {String} queryCondition 与queryConditionType对应的域名或证件号码：
         *
         * @apiSuccess {XML} xml
         *该方法返回一个XML数据流（详见文件“是否备案查询方法调用返回数据格式.xsd”），其中描述了本次操作的结果代码、结果描述以及是否备案信息。
         1）    查询成功的返回
             已备案的结果信息：
         <return>
         <msg_code>0</msg_code>
         <msg>操作成功</msg>
         <StatusInfo>
         <Cxtjlx>条件类型</Cxtjlx>
         <Cxtj>网站域名或证件号码</Cxtj>
         <Wzmc>网站名称（当查询主体是否备案时，此项为空</Wzmc>
         <Ztbah>主体备案号</Ztbah>
         <Wzbah>网站备案号（当查询主体是否备案时，此项为空）</Wzbah>
         <Bazt>备案状态（0表示已备案）</Bazt>
         </StatusInfo>
         </return>
             未备案的结果信息：
         <return>
         <msg_code>0</msg_code>
         <msg>操作成功</msg>
         <StatusInfo>
         <Cxtjlx>条件类型</Cxtjlx>
         <Cxtj>网站域名或证件号码</Cxtj>
         <Bazt>备案状态（1表示未备案）</Bazt>
         </StatusInfo>
         </return>
         2）    查询错误，结果信息如下
         <return>
         <msg_code>x</msg_code>
         <msg>错误描述</msg>
         </return>
         msg_code参见第3-4节的返回状态msg_code代码表。

         */
    isp_querybeianstatus(args) {
      var me = this;
      return new Promise(function(res, rej) {
        me.clientQuery.isp_querybeianstatus(args, function(err, result) {
          if (err) {
            EasyNode.DEBUG && logger.debug(`isp_querybeianstatus to ${args} failed, err: ${err}`, result);
            rej();
          } else {
            EasyNode.DEBUG && logger.debug(`isp_querybeianstatus to ${args} success`, result);
            var xml = result.return;
            var json = parser.toJson(xml, {object: true, arrayNotation: false});
            console.log(json);
            var msg = json.return.msg;
            if (parseInt(json.return.msg_code) == 0) {
              res({ret: true, msg: msg, StatusInfo: json.return.StatusInfo});
            } else {
              EasyNode.DEBUG && console.log(map.get(parseInt(json.return.msg_code)));
              res({ret: false, msg: msg, StatusInfo: {}});
            }
          }
        });
      });
    }

        /**
         * @method 校验备案密码是否正确
         * @apiName isp_verifybamm
         * @apiGroup ISP
         * @apiPermission whitelist
         * @apiVersion 0.0.2
         *
         * @apiDescription
         * 方法调用限制：一定时间内，系统限制同一备案密码校验的次数，具体限制次数根据业务需要设定。
         企业侧系统可以通过该方法校验备案密码是否正确。
         注：本方法中计算哈希值是指对数据字节流的哈希值计算。

         * 企业侧系统在调用该接口方法之前，首先要产生长度为20个字节的随机字符串（数字和大、小写字母），并将口令与该随机字符串连接（例如，口令是字符串“1234567890”，生成的随机字符串是 “abcdefghij”，那么连接后的结果是字符串“1234567890abcdefghij”）。将连接后的结果转换为GBK编码的二进制数据，使用hashAlgorithm定义的哈希算法进行哈希计算，得到参数pwdHash的值作为认证信息。
         部级系统或省局系统接收到企业侧系统的下载请求后，将需要下发给该企业的备案管理数据文件（文件格式参见“企业下载数据格式.xsd”）依次进行如下处理：
         1）    对XML数据文件使用指定的压缩格式进行压缩；
         2）    对压缩后的信息使用哈希算法计算哈希值，然后对哈希值进行base64编码运算；
         3）    如需加密下载，则对压缩后的信息使用指定的加密算法加密，然后对加密结果进行base64编码运算；如不加密下载，则直接对压缩后的信息进行base64编码运算形成beianInfo。
         部级系统或省局系统将上述处理后的哈希值、编码运算后的加密（或者明文）结果、哈希算法、加密算法、压缩格式返回给企业系统（详见“企业下载数据格式.xsd”）


         * @apiParam {Number} ispId 接入服务提供者的标识，可在部/省局系统的公共查询中查询得到
         * @apiParam {String} userName 用户名，由企业所在省管局（或部管局）维护管理
         * @apiParam {String} randVal 企业侧系统调用该方法时生成的随机字符串，长度是20字节
         * @apiParam {String} pwdHash 使用指定的哈希算法对用户密码和随机字符串进行哈希运算，然后进行base64编码运算得到的结果，用户口令由企业所在省管局（或部管局）维护管理
         * @apiParam {Number} hashAlgorithm 哈希算法 0: MD5哈希算法
         * @apiParam {String} baxh 备案号
         * @apiParam {String} bamm 备案密码
         *
         * @apiSuccess {XML} xml
         该方法返回一个XML数据流，其中描述了本次操作的结果代码、结果描述以及是否校验成功。
         1）    校验操作成功的返回

         <return>
         <msg_code>0</msg_code>
         <msg>操作成功</msg>
         <VerifyRes>
         校验结果（0:表示校验成功1:表示校验失败）
         </VerifyRes >
         </return>
         2）    校验操作错误，结果信息如下
         <return>
         <msg_code>x</msg_code>
         <msg>错误描述</msg>
         </return>
         msg_code参见第3-4节的返回状态msg_code代码表。

         res( ret:true|false,msg:msg)
         */
    isp_verifybamm(args) {
      var me = this;
      return new Promise(function(res, rej) {
        me.clientVerify.isp_verifybamm(args, function(err, result) {
          if (err) {
            EasyNode.DEBUG && logger.debug(`isp_verifybamm to ${args} failed, err: ${err}`, result);
            rej();
          } else {
            EasyNode.DEBUG && logger.debug(`isp_verifybamm to ${args} success`, result);
            var xml = result.return;
            var json = parser.toJson(xml, {object: true, arrayNotation: false});
            console.log(json);
            var msg = json.return.msg;
            if (parseInt(json.return.msg_code) == 0) {
              res({ret: json.return.VerifyRes === 0, msg: msg});
            } else {
              EasyNode.DEBUG && console.log(map.get(parseInt(json.return.msg_code)));
              res({ret: false, msg: msg});
            }
          }
        });
      });
    }

        /**
         * @method 产生密码HASH值
         * @apiName genPwdHash
         * @apiGroup ISP
         * @apiPermission whitelist
         * @apiVersion 0.0.2
         * @apiDescription
         *  1. 生成长度20个字节的随机字符串（数字和大、小写字母）
         *  2. 并将口令与该随机字符串连接（例如，口令是字符串“1234567890”，生成的随机字符串是 “abcdefghij”，那么连接后的结果是字符串“1234567890abcdefghij”）
         *  3. 将连接后的结果转换为GBK编码的二进制数据
         *  4. 使用hashAlgorithm定义的哈希算法进行哈希计算，得到参数pwdHash
         *
         * @apiParam {String} pwd  局方配置的企业密码
         * @apiParam {Number} hashAlgorithm 哈希算法 0-MD5
         *
         * @apiSuccess {String} hashAlgorithm( GBK.BINARY(PWD+RANDOM(20) )
         */
    genPwdHash(random, pwd, hashAlgorithm) {
            // 2,3
      var tmp = iconv.encode(pwd + random, 'GBK');
      if (hashAlgorithm == 0) {
        return crypto
            .createHash('md5')
            .update(tmp)
            .digest('base64');
      }
      return crypto
                .createHash('md5')
                .update(tmp)
                .digest('base64');
    }

        /**
         * @method 加密内容
         * @apiName encryptContent
         * @apiGroup ISP
         * @apiPermission whitelist
         * @apiVersion 0.0.2
         * @apiDescription
         *  0. 按接口类型找到*.xsd文件,生成该编制的XML文件内容,然后依次进行以下处理
         *  1. 对xml文件全名用参数 compressionFormat 指定的压缩格式进行压缩
         *  2. 对压缩后的信息使用参数hashAlgorithm指定的哈希算法计算哈希值，并对哈希值进行base64编码运算形成beianInfoHash
         *  3. 如需加密上传，则对压缩后的信息使用参数encryptAlgorithm指定的加密算法加密，并对加密结果进行base64编码运算形成beianInfo；如不加密上传，则直接对压缩后的信息进行base64编码运算形成beianInfo
         *
         * 备注:
         *
         1.    企业侧系统在上报备案信息数据文件时，需要对上报的数据进行编号，该编号为4个字节长度的长整型值，初始值为1，每上报成功一次数据，该编号值递增1。如果企业侧系统上报的数据编号跟上次数据上报的编号不连续（例如上次数据上报的编号为500，本次上报的数据编号为502），那么省局系统会返回状态“本次上载没有受理，请首先上载漏报的数据，然后再上载本次数据”，同时对该次上报数据不予接收处理，要求企业侧系统首先上报漏报的数据（例如上次数据上报的编号为500，本次上报的数据编号为502，那么省局系统返回状态提示，要求企业侧系统首先上报（或重新上报）编号为501的数据）；
         2.    本方法中数据加解密、计算哈希值和压缩/解压缩是指对数据字节流的加解密、计算哈希值和压缩/解压缩；
         3.    IP报备流程中，IP报备必须先报来源信息，再报分配信息；
         4.    IP报备中，IP广播信息的报备是运营企业集团公司系统的报备功能，省级运营企业和其他接入商不报备此项信息；
         5.    域名报备只针对域名报备单位，其他报备单位不报备此项信息

         * @apiParam {String} content  带加工内容
         * @apiParam {Number} compressionFormat  压缩格式 0-zip压缩
         * @apiParam {Number} hashAlgorithm 哈希算法 0-MD5
         * @apiParam {Number} encryptAlgorithm 加密算法 0: 不加密  1: AES加密算法，加密模式使用CBC模式，补码方式采用PKCS5Padding，密钥偏移量由部级系统、省局系统生成的字符串，如“0102030405060708”。
         *
         * @apiSuccess {Object} ret {beianInfo:'', beianInfoHash:''}
         */
    encryptContent(content, compressionFormat = COMPRESSIONFORMAT, hashAlgorithm = HASHALGORITHM, encryptAlgorithm = ENCRYPTALGORITHM) {

      var ret = {beianInfo: '', beianInfoHash: ''};
      var me = this;

      return function *() {
        if (_.isEmpty(content)) {
          return ret;
        }
                // 1
        var contentCompression = null;
        yield me.generateZip(content, './beianinfo.zip', 'beianinfo.xml');
        contentCompression = fso.readFileSync('./beianinfo.zip');

                // 2
        if (hashAlgorithm == HASHALGORITHM) {
          ret.beianInfoHash = crypto.createHash('md5')
                                    .update(contentCompression)
                                    .digest('base64');
        }

                // 3
        if (encryptAlgorithm == ENCRYPTALGORITHM) {
          ret.beianInfo = contentCompression.toString('base64');
        }
        return ret;
      };
    }

        /*
        * Generate zip file
        * */
    generateZip(buffer, zipPath, name) {
      return new Promise(function(res, rej) {
        var output = fso.createWriteStream(zipPath);
        var zipArchiver = archiver('zip');

        output.on('close', function() {
          console.log(`${zipArchiver.pointer()} total bytes`);
          console.log('archiver has been finalized and the output file descriptor has closed.');
          res();
        });

        zipArchiver.on('error', function(err) {
          rej();
          throw err;
        });

        zipArchiver.pipe(output);

        zipArchiver.append(buffer, {name: name});

        zipArchiver.finalize();
      });
    }

        /*
        * unzip file
        * */
    unzip(buffer, fileName) {
      return new Promise(function(res, rej) {

        console.log(fileName);
        var resolved = false;

        var zip = new AdmZip(buffer);
        var zipEntries = zip.getEntries(); // an array of ZipEntry records

        zipEntries.forEach(function(zipEntry) {
          console.log(zipEntry.entryName);
          if (zipEntry.entryName == fileName) {
            resolved = true;
            res(zipEntry.getData());
          }
        });

        if (!resolved) {
          rej(new Error(`No file found in archive: ${fileName}`));
        }
      });
    }

        /**
         * @method 解密内容
         * @apiName decryptContent
         * @apiGroup ISP
         * @apiPermission whitelist
         * @apiVersion 0.0.2
         * @apiDescription
         *  0. 企业侧系统收到数据后
         *  1. 对beianInfo信息进行base64解码
         *  2. 使用encryptAlgorithm指定的加密算法解密
         *  3. 在得到备案信息的压缩信息后，再使用hashAlgorithm指定的哈希算法计算哈希值，然后与beianInfoHash信息base64解码后的信息进行比较
         *  4. 如果比较一致，那么备案信息的完整性得到保证；如果比较不一致，则哈希值验证未通过，备案数据不完整
         *  5. 通过完整性校验后，使用compressionFormat指定的压缩格式对压缩后的信息进行解压缩，得到备案数据信息

         * @apiParam {String} beianInfo  局方下发的备案信息
         * @apiParam {String} beianInfoHash  局方下发的备案信息的HASH
         * @apiParam {Number} compressionFormat  压缩格式 0-zip压缩
         * @apiParam {Number} hashAlgorithm 哈希算法 0-MD5
         * @apiParam {Number} encryptAlgorithm 加密算法 0: 不加密  1: AES加密算法，加密模式使用CBC模式，补码方式采用PKCS5Padding，密钥偏移量由部级系统、省局系统生成的字符串，如“0102030405060708”。
         *
         * @apiSuccess {Object} ret {result:0|1,beianInfo:{}}  ret:0不通过,1通过, beianInfo解密,解压后的内容
         */
    decryptContent([filename = '', beianInfo = '', beianInfoHash = ''], compressionFormat = COMPRESSIONFORMAT, hashAlgorithm = HASHALGORITHM, encryptAlgorithm = ENCRYPTALGORITHM) {
      var ret = {result: 0, beianInfo: {}};
      var me = this;
      return function *() {
        if (_.isEmpty(beianInfo)) {
          return ret;
        }

                // 1. base64 decode
        var contentDecodebase64 = beianInfo;
        var calcHash = '';
        var contentCompression = '';
        if (encryptAlgorithm == ENCRYPTALGORITHM) {
          contentCompression = contentDecodebase64;
        } else {
          try {
            contentCompression = contentDecodebase64;
            contentCompression = me.decryption(contentCompression);
          } catch (e) {
            EasyNode.DEBUG && logger.debug(` ${e}`);
            console.log(e.stack);
            return ret;
          }
        }
        if (hashAlgorithm == HASHALGORITHM) {
          calcHash = new Buffer(
              crypto.createHash('md5')
                    .update(contentCompression)
                    .digest('base64')
          );
        }
        EasyNode.DEBUG && logger.debug(`beianInfoHash calced ${calcHash}, beianInfoHash downloaded ${beianInfoHash}`);

        if (calcHash == beianInfoHash) {

          try {
            var xml = yield me.unzip(new Buffer(contentCompression, 'binary'), filename);
            xml = iconv.decode(xml, 'GBK');
            var json = parser.toJson(xml, {object: true, arrayNotation: false});
            ret.result = 1;
            ret.beianInfo = json;

          } catch (e) {
            EasyNode.DEBUG && logger.debug(` ${e}`);

          }
        } else {
                    // check fail
        }
        return ret;
      };
    }

        /**
         * @method isp_download 下载数据处理
         * @apiName genPwdHash
         * @apiGroup ISP
         * @apiPermission whitelist
         * @apiVersion 0.0.2
         * @apiDescription
         *  参见企业数据下载格式
         *
         * @apiParam {Object} json  ICP|IP|YM|JCDM|SJTB 具体参数企业数据下载格式.xsd文件
         *
         * @apiSuccess {Number} ret true || false
         */
    addressDownloadData(json) {
      var ret = false;
      var me = this;
      return function *() {
        if (json.DownloadData.hasOwnProperty('ICP')) {
          return yield me.addressDownloadDataICP(json);
        }
        if (json.DownloadData.hasOwnProperty('IP')) {
          return yield me.addressDownloadDataIP(json);
        }
        if (json.DownloadData.hasOwnProperty('YM')) {
          return yield me.addressDownloadDataYM(json);
        }
        if (json.DownloadData.hasOwnProperty('JCDM')) {
          return yield me.addressDownloadDataJCDM(json);
        }
        if (json.DownloadData.hasOwnProperty('SJTB')) {
          return yield me.addressDownloadDataSJTB(json);
        }
        return ret;
      };
    }


    addressDownloadDataICP(json) {
      var me = this;
      return function *() {
        if (json && json.DownloadData) {
          if (json.DownloadData.ICP.hasOwnProperty('BASJ')) {
            yield me.addressDownloadDataICPBASJ(json);
          }
          if (json.DownloadData.ICP.hasOwnProperty('ZXSJ')) {
            yield me.addressDownloadDataICPZXSJ(json);
          }
          if (json.DownloadData.ICP.hasOwnProperty('HMDLB')) {
            yield me.addressDownloadDataICPHMDLB(json);
          }
          if (json.DownloadData.ICP.hasOwnProperty('FFJRHMD')) {
            yield me.addressDownloadDataICPFFJRHMD(json);
          }
          if (json.DownloadData.ICP.hasOwnProperty('WBAWZLB')) {
            yield me.addressDownloadDataICWBAWZLB(json);
          }
          if (json.DownloadData.ICP.hasOwnProperty('BAJG')) {
            yield me.addressDownloadDataICPBAJG(json);
          }
          if (json.DownloadData.ICP.hasOwnProperty('HSRW')) {
            yield me.addressDownloadDataICPHSRW(json);
          }
          if (json.DownloadData.ICP.hasOwnProperty('HCJG')) {
            yield me.addressDownloadDataICPHCJG(json);
          }
          if (json.DownloadData.ICP.hasOwnProperty('XGTZ')) {
            yield me.addressDownloadDataICPXGTZ(json);
          }
        }
        return true;
      };
    }

    addressDownloadDataICPBASJ(json) {
      EasyNode.DEBUG && logger.debug(' addressDownloadDataICPBASJ ');
      var me = this;
      return function *() {
        return true;
      };
    }

    addressDownloadDataICPZXSJ(json) {
      EasyNode.DEBUG && logger.debug(' addressDownloadDataICPZXSJ ');
      var me = this;
      return function *() {

        return true;
      };
    }

    addressDownloadDataICPHMDLB(json) {
      EasyNode.DEBUG && logger.debug(' addressDownloadDataICPHMDLB ');
      return function *() {

        return true;
      };
    }

    addressDownloadDataICPFFJRHMD(json) {
      EasyNode.DEBUG && logger.debug(' addressDownloadDataICPFFJRHMD ');
      return function *() {

        return true;
      };
    }

    addressDownloadDataICPWBAWZLB(json) {
      EasyNode.DEBUG && logger.debug(' addressDownloadDataICPWBAWZLB ');
      return function *() {

        return true;
      };
    }

    addressDownloadDataICPBAJG(json) {
      EasyNode.DEBUG && logger.debug(' addressDownloadDataICPBAJG ');
      var me = this;
      return function *() {
        if (json.DownloadData.ICP.BAJG.hasOwnProperty('Jg_xx')) {
          console.log('BAJG:', json.DownloadData.ICP.BAJG.Jg_xx);
        }
        if (json.DownloadData.ICP.BAJG.hasOwnProperty('GJSHS')) {
          console.log('BAJG:', json.DownloadData.ICP.BAJG.GJSHS);
          var gjsh = json.DownloadData.ICP.GJSHS.Gjsh;
          for (var index = 0; index < gjsh.length; index += 1) {
            var storeService = new StoreService(me.app);
            var ret = yield storeService.putRecordbgjsh(gjsh[index]);
            console.log('addressICPBAJG result:', ret);
          }

                    // 1. 记录管局的审核意见
                    // 2. 修改审核意见的备案结果

        }
        return true;
      };
    }

    addressDownloadDataICPHSRW(json) {
      EasyNode.DEBUG && logger.debug(' addressDownloadDataICPHSRW ');
      return function *() {

        return true;
      };
    }

    addressDownloadDataICPHCJG(json) {
      EasyNode.DEBUG && logger.debug(' addressDownloadDataICPHCJG ');
      return function *() {

        return true;
      };
    }

    addressDownloadDataICPXGTZ(json) {
      EasyNode.DEBUG && logger.debug(' addressDownloadDataICPXGTZ ');
      return function *() {

        return true;
      };
    }

    addressDownloadDataIP(json) {
      EasyNode.DEBUG && logger.debug(' addressDownloadDataIP ');
      var me = this;
      return function *() {
        if (json && json.DownloadData) {
          if (json.DownloadData.IP.hasOwnProperty('BAJG')) {
            yield me.addressDownloadDataIPBAJG(json);
          }
          if (json.DownloadData.IP.hasOwnProperty('HCJG')) {
            yield me.addressDownloadDataIPHCJG(json);
          }
        }
        return true;
      };
    }

    addressDownloadDataIPBAJG(json) {
      EasyNode.DEBUG && logger.debug(' addressDownloadDataIPBAJG ', json);
      var me = this;
      return function *() {
        console.log('BAJG:', json.DownloadData.IP.BAJG[0]);
        return true;
      };
    }

    addressDownloadDataIPHCJG(json) {
      EasyNode.DEBUG && logger.debug(' addressDownloadDataIPHCJG ');
      var me = this;
      return function *() {
        if (json.DownloadData.IP.HCJG.hasOwnProperty('Jgxx')) {
          console.log('Lyjg:', json.DownloadData.IP.HCJG.Jgxx);
        }
        return true;
      };
    }

    addressDownloadDataYM(json) {
      EasyNode.DEBUG && logger.debug(' addressDownloadDataYM ');
      return function *() {

        return true;
      };
    }

    addressDownloadDataJCDM(json) {
      EasyNode.DEBUG && logger.debug(' addressDownloadDataJCDM ');
      return function *() {

        return true;
      };
    }

    addressDownloadDataSJTB(json) {
      EasyNode.DEBUG && logger.debug(' addressDownloadDataSJTB ');
      return function *() {

        return true;
      };
    }

    getPhoto(url, size, min, max, cur) {
      var me = this;
      console.log(url);
      return function *() {
        var image = yield me.downloadNos(url + cur);
        var image64 = new Buffer(image).toString('base64');
        // console.log('min:', min);
        // console.log('max:', max);
        // console.log('cur:', cur);
        if (image64.length > size) {
          // console.log('image64.length:', image64.length);
          // console.log('image64 quarlity:', cur);
          return yield me.getPhoto(url, size, min, cur, parseInt((cur - min) / 2));
        } else if (parseInt((max - cur) / 2) != 1) {
          // console.log('image64.length:', image64.length);
          // console.log('image64 quarlity:', cur);
          return yield me.getPhoto(url, size, cur, max, parseInt((max + cur) / 2));
        }
       // console.log('image64.length2:', image64.length);
        return image64;
      };
    }

    genbeianInfo(json, type) {
      var me = this;
      return function *() {
        var clip = '?imageView&quality=50';
        var img = '';
        var assignedJson = '';
        var xml2 = '';
        var ret = '';
        if (type == me.FIRST) {
          try {
            var c = '?imageView&quality=';

                        // var image = yield me.downloadNos(json.record.sitemanagerurl + clip);
                        // json.record.sitemanagerurl = new Buffer(image).toString('base64');

            json.record.sitemanagerurl = yield me.getPhoto(json.record.sitemanagerurl + c, PhotoSizeLimit.WEBSITEOWNERSIZE, me.MIN, me.MAX, (me.MAX - me.MIN) / 2);

            image = yield me.downloadNos(json.record.checkedlisturl + clip);
            json.record.checkedlisturl = new Buffer(image).toString('base64');

            image = yield me.downloadNos(json.record.protocolurl1 + clip);
            json.record.protocolurl1 = new Buffer(image).toString('base64');

            image = yield me.downloadNos(json.record.protocolurl2 + clip);
            json.record.protocolurl2 = new Buffer(image).toString('base64');

            image = yield me.downloadNos(json.record.securityurl1 + clip);
            json.record.securityurl1 = new Buffer(image).toString('base64');


            image = yield me.downloadNos(json.record.securityurl2 + clip);
            json.record.securityurl2 = new Buffer(image).toString('base64');

            assignedJson = xzbaAssign(json);
            xml2 = js2xmlparser('UploadData', assignedJson, {declaration:{encoding:'GBK'}});
            fso.writeFileSync('/Users/hujiabao/Downloads/first.xml', iconv.encode(xml2, 'GBK'), 'utf8');
            ret = yield me.encryptContent(iconv.encode(xml2, 'GBK'));
            return ret;
          } catch (e) {
            EasyNode.DEBUG && logger.debug(` ${e}`);
            return {beianInfo: '', beianInfoHash: ''};
          }
        } else if (type == me.XZWZ) {
          try {
            image = yield me.downloadNos(json.record.sitemanagerurl + clip);
            json.record.sitemanagerurl = new Buffer(image).toString('base64');

            image = yield me.downloadNos(json.record.checkedlisturl + clip);
            json.record.checkedlisturl = new Buffer(image).toString('base64');

            image = yield me.downloadNos(json.record.protocolurl1 + clip);
            json.record.protocolurl1 = new Buffer(image).toString('base64');

            image = yield me.downloadNos(json.record.protocolurl2 + clip);
            json.record.protocolurl2 = new Buffer(image).toString('base64');

            image = yield me.downloadNos(json.record.securityurl1 + clip);
            json.record.securityurl1 = new Buffer(image).toString('base64');


            image = yield me.downloadNos(json.record.securityurl2 + clip);
            json.record.securityurl2 = new Buffer(image).toString('base64');


            assignedJson = xzwzAssign(json);
            xml2 = json2xml(assignedJson, {attributes_key: 'attr', header: true});
            ret = yield me.encryptContent(iconv.encode(xml2, 'GBK'));
            return ret;
          } catch (e) {
            EasyNode.DEBUG && logger.debug(` ${e}`);
            return {beianInfo: '', beianInfoHash: ''};
          }
        } else if (type == me.XZJR) {
          try {
            image = yield me.downloadNos(json.record.sitemanagerurl + clip);
            json.record.sitemanagerurl = new Buffer(image).toString('base64');

            image = yield me.downloadNos(json.record.checkedlisturl + clip);
            json.record.checkedlisturl = new Buffer(image).toString('base64');

            image = yield me.downloadNos(json.record.protocolurl1 + clip);
            json.record.protocolurl1 = new Buffer(image).toString('base64');

            image = yield me.downloadNos(json.record.protocolurl2 + clip);
            json.record.protocolurl2 = new Buffer(image).toString('base64');

            image = yield me.downloadNos(json.record.securityurl1 + clip);
            json.record.securityurl1 = new Buffer(image).toString('base64');


            image = yield me.downloadNos(json.record.securityurl2 + clip);
            json.record.securityurl2 = new Buffer(image).toString('base64');


            assignedJson = xzjrAssign(json);
            xml2 = json2xml(assignedJson, {attributes_key: 'attr', header: true});
            ret = yield me.encryptContent(iconv.encode(xml2, 'GBK'));
            return ret;
          } catch (e) {
            EasyNode.DEBUG && logger.debug(` ${e}`);
            return {beianInfo: '', beianInfoHash: ''};
          }
        } else if (type == me.HSJG) {
          try {
            image = yield me.downloadNos(json.record.sitemanagerurl + clip);
            json.record.sitemanagerurl = new Buffer(image).toString('base64');

            image = yield me.downloadNos(json.record.checkedlisturl + clip);
            json.record.checkedlisturl = new Buffer(image).toString('base64');

            image = yield me.downloadNos(json.record.protocolurl1 + clip);
            json.record.protocolurl1 = new Buffer(image).toString('base64');

            image = yield me.downloadNos(json.record.protocolurl2 + clip);
            json.record.protocolurl2 = new Buffer(image).toString('base64');

            image = yield me.downloadNos(json.record.securityurl1 + clip);
            json.record.securityurl1 = new Buffer(image).toString('base64');


            image = yield me.downloadNos(json.record.securityurl2 + clip);
            json.record.securityurl2 = new Buffer(image).toString('base64');


            assignedJson = hsjgAssign(json);
            xml2 = json2xml(assignedJson, {attributes_key: 'attr', header: true});
            ret = yield me.encryptContent(iconv.encode(xml2, 'GBK'));
            return ret;
          } catch (e) {
            EasyNode.DEBUG && logger.debug(` ${e}`);
            return {beianInfo: '', beianInfoHash: ''};
          }
        } else if (type == me.IP_XZBA) {
          try {
            ssignedJson = ipxzbaAssign(json);
            xml2 = json2xml(assignedJson, {attributes_key: 'attr', header: true});
                        // fso.writeFileSync('/Users/hujiabao/Downloads/ip_xzba.xml',xml2,'utf8');
            ret = yield me.encryptContent(iconv.encode(xml2, 'GBK'));
            return ret;
          } catch (e) {
            EasyNode.DEBUG && logger.debug(` ${e}`);
            return {beianInfo: '', beianInfoHash: ''};
          }
        } else if (type == me.IP_SCBA) {
          try {
            assignedJson = ipscbaAssign(json);
            xml2 = json2xml(assignedJson, {attributes_key: 'attr', header: true});
                        // fso.writeFileSync('/Users/hujiabao/Downloads/ip_xzba.xml',xml2,'utf8');
            ret = yield me.encryptContent(iconv.encode(xml2, 'GBK'));
            return ret;
          } catch (e) {
            EasyNode.DEBUG && logger.debug(` ${e}`);
            return {beianInfo: '', beianInfoHash: ''};
          }
        }
        return {beianInfo: '', beianInfoHash: ''};
      };
    }

    getUploadInitParam() {
      var randVal = utils.randomString(20, '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
      var pwdHash = this.genPwdHash(randVal, this.icp.PASSWORD, this.icp.HASHALGORITHM);
      return {
        ispID: this.icp.ISPID,
        userName: this.icp.USERNAME,
        randVal: randVal,
        pwdHash: pwdHash,
        beianInfo: '',
        beianInfoHash: '',
        dataSequence: this.dataSequence,
        encryptAlgorithm: this.icp.ENCRYPTALGORITHM,
        hashAlgorithm: this.icp.HASHALGORITHM,
        compressionFormat: this.icp.COMPRESSIONFORMAT
      };
    }

    getInitParam(upcase = true) {
      var randVal = utils.randomString(20, '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
      var pwdHash = this.genPwdHash(randVal, this.icp.PASSWORD, this.icp.HASHALGORITHM);
      return upcase ?
        {
          ispID: this.icp.ISPID,
          userName: this.icp.USERNAME,
          randVal: randVal,
          pwdHash: pwdHash,
          hashAlgorithm: this.icp.HASHALGORITHM
        } :
        {
          ispId: this.icp.ISPID,
          userName: this.icp.USERNAME,
          randVal: randVal,
          pwdHash: pwdHash,
          hashAlgorithm: this.icp.HASHALGORITHM
        };
    }


    encryption(data) {
      var key = this.icp.KEY;
      var iv = this.icp.OFFSET;
      var clearEncoding = 'utf8';
      var cipherEncoding = 'base64';
      var cipherChunks = [];
      var cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
      cipher.setAutoPadding(true);

      var enc = cipher.update(data, clearEncoding, cipherEncoding);
      enc += cipher.final(cipherEncoding);

      return enc;
    }

        // data 是你的准备解密的字符串,key是你的密钥
    decryption(data) {
      var key = this.icp.KEY;
      var iv = this.icp.OFFSET;
      var clearEncoding = 'binary';
      var cipherEncoding = 'base64';
      var decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
      decipher.setAutoPadding(true);

      var enc = decipher.update(data, cipherEncoding, clearEncoding);
      enc += decipher.final(clearEncoding);

      return enc;
    }

    base64_encode(file) {
      var bitmap = fso.readFileSync(file);
      return new Buffer(bitmap).toString('base64');
    }

    base64_decode(base64Str, file) {
      var bitmap = new Buffer(base64str, 'base64');
      fso.writeFileSync(file, bitmap);
      EasyNode.DEBUG && logger.debug('******** File created from base64 encoded string ********');
    }

    readSys() {
      var me = this;
      return function *() {
        var storeService = new StoreService(me.app);
        var ret = yield storeService.getSys(1);
        me.dataSequence = JSON.parse(ret).dataSequence;
        return ret;
      };
    }

    writeSys(sys) {
      var me = this;
      return function *() {
        var storeService = new StoreService(me.app);
        var ret = yield storeService.putSys(1, 1, JSON.stringify(sys));
        if (ret == true) {
          me.dataSequence = parseInt(sys.dataSequence);
          console.log('write dataSequence:', me.dataSequence);
        }
      };
    }

    downloadNos(url) {
      var imgData = '';
      return new Promise(function(resq, rej) {
        http.get(url, function(res) {
          res.setEncoding('binary'); // 一定要设置response的编码为binary否则会下载下来的图片打不开
          res.on('data', function(chunk) {
            imgData += chunk;
          });

          res.on('end', function(err) {
            if (err) {
              console.log('down fail');
              rej();
            }
            console.log('down success');
            resq(imgData);
          });

          res.socket.on('error', function() {
            console.log('err');
          });
        });
      });
    }

    getPage(url) {
      var chunks = [];
      var size = 0;
      return new Promise(function(resq, rej) {
        http.get(url, function(res) {
          res.on('data', function(chunk) {
            size += chunk.length;
            chunks.push(chunk);
          });

          res.on('end', function(err) {
            if (err) {
              console.log('down fail');
              rej();
            }
            console.log('down success');
            var data = Buffer.concat(chunks, size);
            resq(data);
          });

          res.socket.on('error', function() {
            console.log('err');
            rej();
          });
        });
      });
    }


        /**
         * 接口：
         POST https://c.163.com/api/account/pubips
         参数：
         secret=3soLEF67wx&tenantId=xxxxxxxx

         正确响应：
         {
             "params": [
                 {
                     "pubIp": "60.191.83.166"
                 }
             ],
             "code": 200,
             "msg": "succ"
         }

         错误响应：
         code : 413 secret(密码)不对。
         code:  401 账号不存在。
         * */
    gettenantPubips(tId = 0) {
            /* var me = this;
            return  new Promise( function(res,rej) {
                request.post(`${me.tenantpubips.urlPath}?secret=${me.tenantpubips.secret}&tenantId=${tenantId}`)
                    .end(function(err,ret){
                        if( err ){
                            rej();
                        }else{
                            res(ret.text);
                        }
                    });
            });*/

      var me = this;
      return function *() {
        console.log('sessin', this.session);
        var tenantId = tId > 0 ? tId : this.session.user.tenantid;
        return new Promise(function(res, rej) {
          console.log('tenantId', tenantId);
          var url = `${me.tenantpubips.urlPath}?secret=${me.tenantpubips.secret}&tenantId=${tenantId}`;
          console.log(url);
          request.post(url)
                        .end(function(err, ret) {
                          if (err) {
                            rej();
                          } else {
                            res(ret.text);
                          }
                        });
        });
      };
    }

    validateIP(ip, ips) {
      var pass = false;
      ips.forEach(function(v, index) {
        if (ip.includes(v.pubIp)) {
          pass = true;
        }
      });
      return pass;
    }

    getClassName() {
      return EasyNode.namespace(__filename);
    }
    }

  module.exports = IspService;
})();

