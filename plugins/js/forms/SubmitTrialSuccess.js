import  '../../css/index.css';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute } from 'react-router';
import ReturnWidget from '../widgets/ReturnWidget.jsx';
import DataService from '../services/DataService.js';
import Global from '../utils/globals';

let SubmitTrialSuccess = React.createClass({

    handleSubmit: function(e){
        e.preventDefault();

        DataService.getRecord( __globals__.record.id||0,
            function(){
                Global.set('global',__globals__);
                location.href = "#/reviewrecorddetail";
            },
            function(err){
                console.log("getRecord err")
                console.log(err);
            }
        );
    },
    render: function () {
        var code = '';
        if( __globals__.record && __globals__.record.code ){
            code = __globals__.record.code;
        }
        return (
            <div>
                <ReturnWidget/>
                <div className="m-submittrialsuccess">
                    <div className="tip-label">
                        <img src={__globals__.surl + "selected.png"} alt="" className="tip-icon"/>
                    </div>
                    <div className="tip">
                        <p className="tip-header">备案信息提交成功,初审需要1-2个工作日,请耐心等待!</p>
                        <div>
                            <p className="tip-bd">备案订单号: { code }</p>  <button className="tip-button-detail" type="button" onClick={this.handleSubmit}> 查看备案详请 </button>
                        </div>
                        <div>
                            <p className="tip-footer">审核通过后将有邮件通知,请及时查收邮件!</p>
                         </div>
                    </div>
                </div>
            </div>
        );
    }
});


module.exports = SubmitTrialSuccess;