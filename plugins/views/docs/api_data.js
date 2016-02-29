define({ "api": [
  {
    "type": "get",
    "url": "/admin/curtains",
    "title": "获取幕布寄送任务",
    "name": "getCurtainsb",
    "group": "Ops",
    "permission": [
      {
        "name": "whitelist"
      }
    ],
    "version": "0.0.2",
    "description": "<p>权限通过白名单管理</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "filter",
            "description": "<p>查询状态过滤条件 1-正在申请幕布状态 2-已寄送幕布  3-正在申请+已寄送幕布用户</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>页号.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "rpp",
            "description": "<p>每页记录数.</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://icp.hzspeed.cn/admin/curtains"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>记录列表</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.id",
            "description": "<p>用户ID</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.tenantid",
            "description": "<p>租户ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.email",
            "description": "<p>租户Email</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.username",
            "description": "<p>租户名称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.mailingaddress",
            "description": "<p>幕布邮寄地址</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.recipient",
            "description": "<p>幕布接收人</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.recipientmobile",
            "description": "<p>幕布接收人电话</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "data.companyname",
            "description": "<p>幕布接收人公司</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>页号</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "pages",
            "description": "<p>总页数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "rows",
            "description": "<p>总记录数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "rpp",
            "description": "<p>每页显示数</p>"
          }
        ]
      }
    },
    "filename": "../../src/netease/icp/backend/controllers/Controllers.js",
    "groupTitle": "Ops",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "EmptyRecord",
            "description": "<p>Please login again or register an aacount, maybe the session is expired</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Empty-Response:",
          "content": "\n{ rows:0, pages:0, page:0, rpp:0, data:[] };",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/admin/record",
    "title": "获取记录详情",
    "name": "getRecordb",
    "group": "Ops",
    "permission": [
      {
        "name": "whitelist"
      }
    ],
    "version": "0.0.2",
    "description": "<p>通过白名单管理权限</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>记录id.</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://icp.hzspeed.cn/admin/record/?id"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "record",
            "description": "<p>记录</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "record.id",
            "description": "<p>记录id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "record.type",
            "description": "<p>备案类型：\\n0-首次备案\\n1-新增网站\\n2-新增接入</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "record.serverregion",
            "description": "<p>主机区域</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "record.companyid",
            "description": "<p>公司id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "record.websiteid",
            "description": "<p>网站id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "record.sitemanagerurl",
            "description": "<p>主体单位负责人图片URL</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "record.checklisturl",
            "description": "<p>核验单图片URL</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "record.protocolurl1",
            "description": "<p>云平台服务协议第一页l图片URL</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "record.protocolurl2",
            "description": "<p>云平台服务协议第二页图片URL</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "record.securityurl1",
            "description": "<p>信息安全管理责任书第一页图片URL</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "record.securityurl2",
            "description": "<p>信息安全管理责任书第二页图片URL</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "record.code",
            "description": "<p>备案号</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "record.status",
            "description": "<p>备案申请状态\\n0-草稿\\n1-初审中\\n2-初审未通过\\n3-初审已通过\\n4-照片审核中\\n5-照片审核未通过\\n6-照片审核已通过\\n7-通管局审核中\\n8-通管局审核未通过\\n9-通管局审核已通过\\n10-未知状态\\n</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "record.tenantid",
            "description": "<p>租户ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "record.curtainurl",
            "description": "<p>帘布照片URL</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "record.updatetime",
            "description": "<p>记录更新时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "record.createtime",
            "description": "<p>记录创建时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "comapny",
            "description": "<p>记录</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "comapny.id",
            "description": "<p>公司ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comapny.province",
            "description": "<p>省</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comapny.city",
            "description": "<p>市</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comapny.area",
            "description": "<p>区</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "comapny.nature",
            "description": "<p>性质 \\n1-军队\\n2-政府机关\\n3-事业单位\\n4-企业\\n5-个人\\n</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "comapny.idtype",
            "description": "<p>证件类型\\n1-工商执照\\n2-组织机构代码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comapny.idnumber",
            "description": "<p>证件号码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comapny.name",
            "description": "<p>名称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comapny.liveaddress",
            "description": "<p>居住地址</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comapny.commaddress",
            "description": "<p>通讯地址</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comapny.owner",
            "description": "<p>投资人或主管单位名称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comapny.managername",
            "description": "<p>法人姓名</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "comapny.manageridtype",
            "description": "<p>法人证件类型\\n性质 \\n1-军队\\n2-政府机关\\n3-事业单位\\n4-企业\\n5-个人\\n</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comapny.manageridnumber",
            "description": "<p>法人证件号码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comapny.officephoneregion",
            "description": "<p>办公室电话区号</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comapny.officephonenumber",
            "description": "<p>办公室电话号码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comapny.mobile",
            "description": "<p>手机号码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comapny.email",
            "description": "<p>电子邮箱</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comapny.recordnumber",
            "description": "<p>主体备案号</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "website",
            "description": "<p>网站</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "website.id",
            "description": "<p>网站ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "website.name",
            "description": "<p>网站名称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "website.domain",
            "description": "<p>网站域名</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "website.domain1",
            "description": "<p>网站域名1</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "website.domain2",
            "description": "<p>网站域名2</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "website.domain3",
            "description": "<p>网站域名3</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "website.domain4",
            "description": "<p>网站域名4</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "website.homeurl",
            "description": "<p>网站首页URL</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "website.servicecontent",
            "description": "<p>网站服务内容</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "website.languages",
            "description": "<p>网站语言,json结构 { chinese: true, chinesetraditional: false, eglish: false, japanese: false, french: false, spanish: false, arabic: false, russian: false, customize: false, customizeLang: '' }</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "website.ispname",
            "description": "<p>ISP名称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "website.ip",
            "description": "<p>网站IP地址:1.2.3.4'</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "website.accessmethod",
            "description": "<p>网站接入方式,json结构 { specialline: false, webhost: false, virtualhost: true, other: false }</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "website.serverregion",
            "description": "<p>服务器放置地</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "website.managername",
            "description": "<p>负责人姓名</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "website.manageridtype",
            "description": "<p>证件类型：1-身分证 2-护照 3-军官证 4-台胞证</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "website.manageridnumber",
            "description": "<p>证件号码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "website.officephoneregion",
            "description": "<p>办公室电话区号</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "website.officephonenumber",
            "description": "<p>办公室电话号码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "website.mobile",
            "description": "<p>手机号码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "website.email",
            "description": "<p>电子邮箱</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "website.qq",
            "description": "<p>qq号码</p>"
          }
        ]
      }
    },
    "filename": "../../src/netease/icp/backend/controllers/Controllers.js",
    "groupTitle": "Ops",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "EmptyRecord",
            "description": "<p>Please login again or register an aacount, maybe the session is expired</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Empty-Response:",
          "content": "\n{ rows:0, pages:0, page:0, rpp:0, data:[] };",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/admin/records",
    "title": "获取记录列表",
    "name": "getRecordsb",
    "group": "Ops",
    "permission": [
      {
        "name": "whitelist"
      }
    ],
    "version": "0.0.2",
    "description": "<p>权限通过白名单管理</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "filter",
            "description": "<p>查询状态过滤条件 0-全部(除草稿) 1-待审核  2-已审核通过 3-审核失败的</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>页号.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "rpp",
            "description": "<p>每页记录数.</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://icp.hzspeed.cn/admin/records"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>记录列表</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.id",
            "description": "<p>记录id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.checklisturl",
            "description": "<p>核验单图片URL</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.protocolurl1",
            "description": "<p>云平台协议第一页图片</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.protocolurl2",
            "description": "<p>云平台协议第二页图片</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.securityurl1",
            "description": "<p>信息安全管理责任书第一页图片URL</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.securityurl2",
            "description": "<p>信息安全管理责任书第二页图片URL</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.companyid",
            "description": "<p>公司id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.websiteid",
            "description": "<p>网站id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.tenantid",
            "description": "<p>租户id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.type",
            "description": "<p>备案类型: 0-首次备案, 1-新增网站, 2-新增接入</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.status",
            "description": "<p>备案状态: 0-草稿,1-初审中,2-初审未通过,3-初审已通过,4-照片审核中,5-照片审核未通过,6-照片审核已通过,7-通管局审核中,8-通管局审核未通过,9-通管局审核已通过,10-未知状态</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.code",
            "description": "<p>备案编号</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.updatetime",
            "description": "<p>记录更新时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.createtime",
            "description": "<p>记录创建时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>页号</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "pages",
            "description": "<p>总页数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "rows",
            "description": "<p>总记录数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "rpp",
            "description": "<p>每页显示数</p>"
          }
        ]
      }
    },
    "filename": "../../src/netease/icp/backend/controllers/Controllers.js",
    "groupTitle": "Ops",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "EmptyRecord",
            "description": "<p>Please login again or register an aacount, maybe the session is expired</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Empty-Response:",
          "content": "\n{ rows:0, pages:0, page:0, rpp:0, data:[] };",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/admin/curtain",
    "title": "寄送幕布",
    "name": "putCurtainb",
    "group": "Ops",
    "permission": [
      {
        "name": "whitelist"
      }
    ],
    "version": "0.0.2",
    "description": "<p>通过白名单管理权限</p>",
    "sampleRequest": [
      {
        "url": "http://icp.hzspeed.cn/admin/curtain"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>用户ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "ret",
            "description": "<p>true:成功,false:失败</p>"
          }
        ]
      }
    },
    "filename": "../../src/netease/icp/backend/controllers/Controllers.js",
    "groupTitle": "Ops"
  },
  {
    "type": "put",
    "url": "/admin/record",
    "title": "审核",
    "name": "putRecordb",
    "group": "Ops",
    "permission": [
      {
        "name": "whitelist"
      }
    ],
    "version": "0.0.2",
    "description": "<p>通过白名单管理权限</p>",
    "sampleRequest": [
      {
        "url": "http://icp.hzspeed.cn/admin/record"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>记录ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>备案申请状态\\n0-草稿\\n1-初审中\\n2-初审未通过\\n3-初审已通过\\n4-照片审核中\\n5-照片审核未通过\\n6-照片审核已通过\\n7-通管局审核中\\n8-通管局审核未通过\\n9-通管局审核已通过\\n10-未知状态\\n</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "reasons",
            "description": "<p>通过则为备注,拒绝则为理由(多条用p标签分隔)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "curtainurl",
            "description": "<p>帘布照片URL</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "ret",
            "description": "<p>true:成功,false:失败</p>"
          }
        ]
      }
    },
    "filename": "../../src/netease/icp/backend/controllers/Controllers.js",
    "groupTitle": "Ops"
  },
  {
    "type": "post",
    "url": "/records",
    "title": "创建申请记录",
    "name": "createRecord",
    "group": "Record",
    "permission": [
      {
        "name": "admin or self"
      }
    ],
    "version": "0.0.1",
    "description": "<p>用户登录后,创建申请记录</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>记录id.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "baseinfo",
            "description": "<p>记录baseinfo部分</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "baseinfo.id",
            "description": "<p>记录id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "baseinfo.type",
            "description": "<p>备案类型：\\n0-首次备案\\n1-新增网站\\n2-新增接入</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "baseinfo.status",
            "description": "<p>审核状态 0</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "material",
            "description": "<p>记录material部分</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "material.sitemanagerurl",
            "description": "<p>主体单位负责人图片URL</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "material.checklisturl",
            "description": "<p>核验单图片URL</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "material.protocolurl1",
            "description": "<p>云平台服务协议第一页l图片URL</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "material.protocolurl2",
            "description": "<p>云平台服务协议第二页图片URL</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "material.securityurl1",
            "description": "<p>信息安全管理责任书第一页图片URL</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "material.securityurl2",
            "description": "<p>信息安全管理责任书第二页图片URL</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://icp.hzspeed.cn/records/"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "comapnyinfo",
            "description": "<p>公司信息</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "comapny.id",
            "description": "<p>公司ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comapny.province",
            "description": "<p>省</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comapny.city",
            "description": "<p>市</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comapny.area",
            "description": "<p>区</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "comapny.nature",
            "description": "<p>性质 \\n1-军队\\n2-政府机关\\n3-事业单位\\n4-企业\\n5-个人\\n</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "comapny.idtype",
            "description": "<p>证件类型\\n1-工商执照\\n2-组织机构代码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comapny.idnumber",
            "description": "<p>证件号码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comapny.name",
            "description": "<p>名称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comapny.liveaddress",
            "description": "<p>居住地址</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comapny.commaddress",
            "description": "<p>通讯地址</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comapny.owner",
            "description": "<p>投资人或主管单位名称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comapny.managername",
            "description": "<p>法人姓名</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "comapny.manageridtype",
            "description": "<p>法人证件类型\\n性质 \\n1-军队\\n2-政府机关\\n3-事业单位\\n4-企业\\n5-个人\\n</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comapny.manageridnumber",
            "description": "<p>法人证件号码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comapny.officephoneregion",
            "description": "<p>办公室电话区号</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comapny.officephonenumber",
            "description": "<p>办公室电话号码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comapny.mobile",
            "description": "<p>手机号码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comapny.email",
            "description": "<p>电子邮箱</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comapny.recordnumber",
            "description": "<p>主体备案号</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "siteinfo",
            "description": "<p>网站</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "website.id",
            "description": "<p>网站ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "website.name",
            "description": "<p>网站名称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "website.domain",
            "description": "<p>网站域名</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "website.domain1",
            "description": "<p>网站域名1</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "website.domain2",
            "description": "<p>网站域名2</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "website.domain3",
            "description": "<p>网站域名3</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "website.domain4",
            "description": "<p>网站域名4</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "website.homeurl",
            "description": "<p>网站首页URL</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "website.servicecontent",
            "description": "<p>网站服务内容</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "website.languages",
            "description": "<p>网站语言,json结构 { chinese: true, chinesetraditional: false, eglish: false, japanese: false, french: false, spanish: false, arabic: false, russian: false, customize: false, customizeLang: '' }</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "website.ispname",
            "description": "<p>ISP名称</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "website.ip",
            "description": "<p>网站IP地址: { ip1:&quot;&quot;, ip2:&quot;&quot;, ip3:&quot;&quot;, ip4:&quot;&quot; }</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "website.accessmethod",
            "description": "<p>网站接入方式,json结构 { specialline: false, webhost: false, virtualhost: true, other: false }</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "website.serverregion",
            "description": "<p>服务器放置地</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "website.managername",
            "description": "<p>负责人姓名</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "website.manageridtype",
            "description": "<p>证件类型：1-身分证 2-护照 3-军官证 4-台胞证</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "website.manageridnumber",
            "description": "<p>证件号码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "website.officephoneregion",
            "description": "<p>办公室电话区号</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "website.officephonenumber",
            "description": "<p>办公室电话号码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "website.mobile",
            "description": "<p>手机号码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "website.email",
            "description": "<p>电子邮箱</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "website.qq",
            "description": "<p>qq号码</p>"
          }
        ]
      }
    },
    "filename": "../../src/netease/icp/backend/controllers/Controllers.js",
    "groupTitle": "Record",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "EmptyRecord",
            "description": "<p>Please login again or register an aacount, maybe the session is expired</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Empty-Response:",
          "content": "\n{ rows:0, pages:0, page:0, rpp:0, data:[] };",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/record",
    "title": "获取记录详情",
    "name": "getRecord",
    "group": "Record",
    "permission": [
      {
        "name": "admin or self"
      }
    ],
    "version": "0.0.2",
    "description": "<p>管理员(登录后用户对象里用idadmin字段表示)能获取所有用户申请记录详情,本用户只能获取他自己的申请记录详情</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>记录id.</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://icp.hzspeed.cn/record/?id"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "record",
            "description": "<p>记录</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "record.id",
            "description": "<p>记录id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "record.type",
            "description": "<p>备案类型：\\n0-首次备案\\n1-新增网站\\n2-新增接入</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "record.serverregion",
            "description": "<p>主机区域</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "record.companyid",
            "description": "<p>公司id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "record.websiteid",
            "description": "<p>网站id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "record.sitemanagerurl",
            "description": "<p>主体单位负责人图片URL</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "record.checklisturl",
            "description": "<p>核验单图片URL</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "record.protocolurl1",
            "description": "<p>云平台服务协议第一页l图片URL</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "record.protocolurl2",
            "description": "<p>云平台服务协议第二页图片URL</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "record.securityurl1",
            "description": "<p>信息安全管理责任书第一页图片URL</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "record.securityurl2",
            "description": "<p>信息安全管理责任书第二页图片URL</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "record.code",
            "description": "<p>备案号</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "record.status",
            "description": "<p>备案申请状态\\n0-草稿\\n1-初审中\\n2-初审未通过\\n3-初审已通过\\n4-照片审核中\\n5-照片审核未通过\\n6-照片审核已通过\\n7-通管局审核中\\n8-通管局审核未通过\\n9-通管局审核已通过\\n10-未知状态\\n</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "record.tenantid",
            "description": "<p>租户ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "record.curtainurl",
            "description": "<p>帘布照片URL</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "record.updatetime",
            "description": "<p>记录更新时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "record.createtime",
            "description": "<p>记录创建时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "comapny",
            "description": "<p>记录</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "comapny.id",
            "description": "<p>公司ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comapny.province",
            "description": "<p>省</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comapny.city",
            "description": "<p>市</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comapny.area",
            "description": "<p>区</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "comapny.nature",
            "description": "<p>性质 \\n1-军队\\n2-政府机关\\n3-事业单位\\n4-企业\\n5-个人\\n</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "comapny.idtype",
            "description": "<p>证件类型\\n1-工商执照\\n2-组织机构代码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comapny.idnumber",
            "description": "<p>证件号码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comapny.name",
            "description": "<p>名称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comapny.liveaddress",
            "description": "<p>居住地址</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comapny.commaddress",
            "description": "<p>通讯地址</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comapny.owner",
            "description": "<p>投资人或主管单位名称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comapny.managername",
            "description": "<p>法人姓名</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "comapny.manageridtype",
            "description": "<p>法人证件类型\\n性质 \\n1-军队\\n2-政府机关\\n3-事业单位\\n4-企业\\n5-个人\\n</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comapny.manageridnumber",
            "description": "<p>法人证件号码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comapny.officephoneregion",
            "description": "<p>办公室电话区号</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comapny.officephonenumber",
            "description": "<p>办公室电话号码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comapny.mobile",
            "description": "<p>手机号码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comapny.email",
            "description": "<p>电子邮箱</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comapny.recordnumber",
            "description": "<p>主体备案号</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "website",
            "description": "<p>网站</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "website.id",
            "description": "<p>网站ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "website.name",
            "description": "<p>网站名称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "website.domain",
            "description": "<p>网站域名</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "website.domain1",
            "description": "<p>网站域名1</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "website.domain2",
            "description": "<p>网站域名2</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "website.domain3",
            "description": "<p>网站域名3</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "website.domain4",
            "description": "<p>网站域名4</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "website.homeurl",
            "description": "<p>网站首页URL</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "website.servicecontent",
            "description": "<p>网站服务内容</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "website.languages",
            "description": "<p>网站语言,json结构 { chinese: true, chinesetraditional: false, eglish: false, japanese: false, french: false, spanish: false, arabic: false, russian: false, customize: false, customizeLang: '' }</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "website.ispname",
            "description": "<p>ISP名称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "website.ip",
            "description": "<p>网站IP地址:1.2.3.4'</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "website.accessmethod",
            "description": "<p>网站接入方式,json结构 { specialline: false, webhost: false, virtualhost: true, other: false }</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "website.serverregion",
            "description": "<p>服务器放置地</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "website.managername",
            "description": "<p>负责人姓名</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "website.manageridtype",
            "description": "<p>证件类型：1-身分证 2-护照 3-军官证 4-台胞证</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "website.manageridnumber",
            "description": "<p>证件号码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "website.officephoneregion",
            "description": "<p>办公室电话区号</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "website.officephonenumber",
            "description": "<p>办公室电话号码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "website.mobile",
            "description": "<p>手机号码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "website.email",
            "description": "<p>电子邮箱</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "website.qq",
            "description": "<p>qq号码</p>"
          }
        ]
      }
    },
    "filename": "../../src/netease/icp/backend/controllers/Controllers.js",
    "groupTitle": "Record",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "EmptyRecord",
            "description": "<p>Please login again or register an aacount, maybe the session is expired</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Empty-Response:",
          "content": "\n{ rows:0, pages:0, page:0, rpp:0, data:[] };",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/records",
    "title": "获取记录列表",
    "name": "getRecords",
    "group": "Record",
    "permission": [
      {
        "name": "admin or self"
      }
    ],
    "version": "0.0.2",
    "description": "<p>管理员(登录后用户对象里用idadmin字段表示)能获取所有用户申请记录,本用户只能获取他自己的申请记录</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "filter",
            "description": "<p>查询状态过滤条件 0-全部(除草稿) 1-待审核  2-已审核通过 3-审核失败的</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>页号.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "rpp",
            "description": "<p>每页记录数.</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://icp.hzspeed.cn/records"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>记录列表</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.id",
            "description": "<p>记录id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.checklisturl",
            "description": "<p>核验单图片URL</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.protocolurl1",
            "description": "<p>云平台协议第一页图片</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.protocolurl2",
            "description": "<p>云平台协议第二页图片</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.securityurl1",
            "description": "<p>信息安全管理责任书第一页图片URL</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.securityurl2",
            "description": "<p>信息安全管理责任书第二页图片URL</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.companyid",
            "description": "<p>公司id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.websiteid",
            "description": "<p>网站id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.tenantid",
            "description": "<p>租户id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.type",
            "description": "<p>备案类型: 0-首次备案, 1-新增网站, 2-新增接入</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.status",
            "description": "<p>备案状态: 0-草稿,1-初审中,2-初审未通过,3-初审已通过,4-照片审核中,5-照片审核未通过,6-照片审核已通过,7-通管局审核中,8-通管局审核未通过,9-通管局审核已通过,10-未知状态</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.code",
            "description": "<p>备案编号</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.updatetime",
            "description": "<p>记录更新时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.createtime",
            "description": "<p>记录创建时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>页号</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "pages",
            "description": "<p>总页数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "rows",
            "description": "<p>总记录数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "rpp",
            "description": "<p>每页显示数</p>"
          }
        ]
      }
    },
    "filename": "../../src/netease/icp/backend/controllers/Controllers.js",
    "groupTitle": "Record",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "EmptyRecord",
            "description": "<p>Please login again or register an aacount, maybe the session is expired</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Empty-Response:",
          "content": "\n{ rows:0, pages:0, page:0, rpp:0, data:[] };",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/record",
    "title": "审核",
    "name": "putRecord",
    "group": "Record",
    "permission": [
      {
        "name": "admin or self"
      }
    ],
    "version": "0.0.2",
    "description": "<p>管理员(登录后用户对象里用idadmin字段表示)审核记录</p>",
    "sampleRequest": [
      {
        "url": "http://icp.hzspeed.cn/record/"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>记录ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>备案申请状态\\n0-草稿\\n1-初审中\\n2-初审未通过\\n3-初审已通过\\n4-照片审核中\\n5-照片审核未通过\\n6-照片审核已通过\\n7-通管局审核中\\n8-通管局审核未通过\\n9-通管局审核已通过\\n10-未知状态\\n</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "reasons",
            "description": "<p>通过则为备注,拒绝则为理由(多条用p标签分隔)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "curtainurl",
            "description": "<p>帘布照片URL</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "ret",
            "description": "<p>true:成功,false:失败</p>"
          }
        ]
      }
    },
    "filename": "../../src/netease/icp/backend/controllers/Controllers.js",
    "groupTitle": "Record"
  },
  {
    "type": "put",
    "url": "/user",
    "title": "",
    "name": "putUser",
    "group": "User",
    "permission": [
      {
        "name": "admin or self"
      }
    ],
    "version": "0.0.2",
    "description": "<p>修改用户幕布申请地址</p>",
    "sampleRequest": [
      {
        "url": "http://icp.hzspeed.cn/user/"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mailingaddress",
            "description": "<p>幕布邮寄地址</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "recipient",
            "description": "<p>收件人</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "recipientmobile",
            "description": "<p>收件人手机号</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "companyname",
            "description": "<p>公司名称</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "ret",
            "description": "<p>true:成功,false:失败</p>"
          }
        ]
      }
    },
    "filename": "../../src/netease/icp/backend/controllers/Controllers.js",
    "groupTitle": "User"
  }
] });
