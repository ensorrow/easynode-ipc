import reqwest from 'reqwest';
import assigner from 'object.assign';
var assign = assigner.getPolyfill();

module.exports = {

    httpRequest: function( url, method, data, type, contentType, headers, succ, err){
        console.log("11");
      reqwest({
          url: url,
          method: method,
          data: data,
          type: type,
          contentType: contentType,
          headers: assign( headers, {
              'If-Modified-Since': 'Thu, 01 Jun 1970 00:00:00 GMT'
          })
      },succ,err);
    },

    getRecord: function(id,succ,err) {
        reqwest({
            url: '/record',
            method: 'get',
            data: {id: id},
            type: 'json',
            contentType: 'application/json',
            headers: {
                'If-Modified-Since': 'Thu, 01 Jun 1970 00:00:00 GMT'
            },
            success: function (resp) {
                console.log("111");
                console.log(resp);
                var record = resp.record;
                var company = resp.company;
                var siteinfo = resp.website;

                __globals__.baseinfo = {};
                __globals__.companyinfo = {};
                __globals__.siteinfo = {};
                __globals__.material = {};
                __globals__.domains = [];
                __globals__.record = {};
                __globals__.baseinfo.type = record.type;

                __globals__.baseinfo.serverregion = record.serverregion;
                __globals__.baseinfo.id = record.id;
                __globals__.baseinfo.status = record.status;

                if (company) {
                    assign(__globals__.companyinfo, company);
                }
                if (siteinfo) {
                    assign(__globals__.siteinfo, siteinfo);
                    console.log(siteinfo);
                    var domains = [];
                    if (siteinfo.domain1 && siteinfo.domain1.length > 0) {
                        domains.push(1);
                    }
                    if (siteinfo.domain2 && siteinfo.domain2.length > 0) {
                        domains.push(2);
                    }
                    if (siteinfo.domain3 && siteinfo.domain3.length > 0) {
                        domains.push(3);
                    }
                    if (siteinfo.domain4 && siteinfo.domain4.length > 0) {
                        domains.push(4);
                    }
                    __globals__.domains = domains;
                    if (siteinfo.hasOwnProperty('accessmethod')) {
                        __globals__.siteinfo.accessmethod = JSON.parse(siteinfo.accessmethod);
                    }
                    if (siteinfo.hasOwnProperty('ip')) {
                        //__globals__.siteinfo.ip =  JSON.parse(siteinfo.ip);
                    }
                    if (siteinfo.hasOwnProperty('languages')) {
                        __globals__.siteinfo.languages = JSON.parse(siteinfo.languages);
                    }
                }
                if( record ){
                    __globals__.record = record;
                }
                __globals__.material.sitemanagerurl = record.sitemanagerurl;
                __globals__.material.checklisturl = record.checklisturl;
                __globals__.material.protocolurl1 = record.protocolurl1;
                __globals__.material.protocolurl2 = record.protocolurl2;
                __globals__.material.securityurl1 = record.securityurl1;
                __globals__.material.securityurl2 = record.securityurl2;
                succ();
            },
            error: function (e) {
                err(e);
            }
        });
    },
    logout: function(succ,err) {
        reqwest({
            url: '/logout',
            method: 'get',
            type: 'json',
            contentType: 'application/json',
            headers: {
                'If-Modified-Since': 'Thu, 01 Jun 1970 00:00:00 GMT'
            },
            success: function (resp) {
                succ && succ();
            },
            error: function (e) {
                err && err(e);
            }
        });
    },
}
