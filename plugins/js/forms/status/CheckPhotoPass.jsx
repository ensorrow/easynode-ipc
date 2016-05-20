import '../../../css/index.css';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute } from 'react-router';
import DataService from '../../services/DataService.js';
import Global from '../../utils/globals';
var _g = window._g;

let CheckPhotoPass = React.createClass({

    handleSubmit: function (e) {
        e.preventDefault();

        DataService.getRecord( _g.record.id || 0,
            function () {
                Global.set('global', _g);
                location.href = '#/reviewrecorddetail';
            },
            function (err) {
                if( err ) {
                    err = err + '';
                }
            }
        );
    },
    render: function () {
        var code = '';
        if( _g.record && _g.record.code ) {
            code = _g.record.code;
        }

        return (
            <div className="m-checkphotopass">
                <div className="tip-label">
                    <img src={_g.surl + 'selected.png'} alt="" className="tip-icon"/>
                </div>
                <div className="tip">
                    <p className="tip-header">照片审核已通过，将在1个工作日内将您的备案信息提交至省通信管理局审核！</p>
                    <div>
                        <p className="tip-bd">备案订单号: {code} </p><button className="tip-button-detail" type="button" onClick={this.handleSubmit}> 查看备案详请 </button>
                    </div>
                    <div>
                        <p className="tip-footer">省通信管理局审核通过后将生成备案号和备案密码。并邮件发送给您，请及时查收邮件。</p>
                    </div>
                </div>
            </div>
        );
    }
});


module.exports = CheckPhotoPass;

