import '../../css/index.css';
import React from 'react';
import DataService from '../services/DataService.js';
import Global from '../utils/globals';
var _g = window._g;

let SubmitCheckSuccess = React.createClass({
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
            <div className="m-submitchecksuccess">
                <div className="tip-label">
                    <img src={_g.surl + 'selected.png'} alt="" className="tip-icon"/>
                </div>
                <div className="tip">
                    <p className="tip-header">照片提交成功，审核需要1-2个工作日，请耐心等待！</p>
                    <div>
                        <p className="tip-bd">备案订单号: {code} </p> <button className="tip-button-detail" type="button" onClick={this.handleSubmit}> 查看备案详请 </button>
                    </div>
                    <div>
                        <p className="tip-footer">审核通过后可查看审核结果并邮件通知，请及时查收邮件。</p>
                    </div>
                </div>
            </div>
        );
    }
});


module.exports = SubmitCheckSuccess;

