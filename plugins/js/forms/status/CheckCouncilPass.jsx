import '../../../css/index.css';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute } from 'react-router';
import DataService from '../../services/DataService.js';
import Global from '../../utils/globals';


let CheckCouncilPass = React.createClass({
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
        var reasons = '';
        if( _g.record && _g.record.code ) {
            code = _g.record.code;
            reasons = _g.record.reasons;
        }

        return (
            <div className="m-checkcouncilpass">
                <div className="tip-label">
                    <img src={_g.surl + 'selected.png'} alt="" className="tip-icon"/>
                </div>
                <div className="tip">
                    <p className="tip-header">您的备案已通过管局审核！</p>
                    <div>
                        <p className="tip-bd">备案订单号: {code} </p><button className="tip-button-detail" type="button" onClick={this.handleSubmit}> 查看备案详请 </button>
                        <br></br>
                        <p className="tip-bd"> {reasons} </p>
                    </div>
                </div>
            </div>
        );
    }
});


module.exports = CheckCouncilPass;

