import reqwest from 'reqwest';
import assigner from 'object.assign';
var assign = assigner.getPolyfill();


module.exports = {

    httpRequest: function ( url, method, data, type, contentType, headers, succ, err) {
        reqwest({
            url: url,
            method: method,
            data: data,
            type: type,
            contentType: contentType,
            headers: assign( headers, {
                'If-Modified-Since': 'Thu, 01 Jun 1970 00:00:00 GMT'
            })
        }, succ, err);
    },

    getRecord: function (id, succ, err) {
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
                var record = resp.record;
                var company = resp.company;
                var siteinfo = resp.website;

                _g.baseinfo = {};
                _g.companyinfo = {};
                _g.siteinfo = {};
                _g.material = {};
                _g.domains = [];
                _g.record = {};
                _g.baseinfo.type = record.type;

                _g.baseinfo.serverregion = record.serverregion;
                _g.baseinfo.id = record.id;
                _g.baseinfo.status = record.status;

                if (company) {
                    assign(_g.companyinfo, company);
                }
                if (siteinfo) {
                    assign(_g.siteinfo, siteinfo);
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
                    _g.domains = domains;
                    if (siteinfo.hasOwnProperty('accessmethod')) {
                        _g.siteinfo.accessmethod = JSON.parse(siteinfo.accessmethod);
                    }
                    if (siteinfo.hasOwnProperty('ip')) {
                        // _g.siteinfo.ip =  JSON.parse(siteinfo.ip);
                    }
                    if (siteinfo.hasOwnProperty('languages')) {
                        _g.siteinfo.languages = JSON.parse(siteinfo.languages);
                    }
                }
                if( record ) {
                    _g.record = record;
                }
                _g.material.sitemanagerurl = record.sitemanagerurl;
                _g.material.checklisturl = record.checklisturl;
                _g.material.protocolurl1 = record.protocolurl1;
                _g.material.protocolurl2 = record.protocolurl2;
                _g.material.securityurl1 = record.securityurl1;
                _g.material.securityurl2 = record.securityurl2;
                succ();
            },
            error: function (e) {
                err(e);
            }
        });
    },
    logout: function (succ, err) {
        reqwest({
            url: '/logout',
            method: 'get',
            type: 'json',
            contentType: 'application/json',
            headers: {
                'If-Modified-Since': 'Thu, 01 Jun 1970 00:00:00 GMT'
            },
            success: function (resp) {
                succ && succ(resp);
            },
            error: function (e) {
                err && err(e);
            }
        });
    }
};


