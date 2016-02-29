import  '../../css/index.css';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute } from 'react-router';
import DataService from '../services/DataService.js';

let DeleteRecord = React.createClass({
    propTypes:{
        record: React.PropTypes.object.isRequired
    },
    handleCancel: function(){
        var onHidden = this.props.onHidden;
        onHidden && onHidden();
    },
    handleSubmit: function(){
        var me = this;
        var reqData = JSON.stringify( {id:this.props.record.id} );
        DataService.httpRequest('/delrecord','post',reqData,'json','application/json',{},
            function(resp){
                //{ret:{id:96,ret:false}}
                //me.setState({data: resp.ret.data});
                if( resp.ret.ret ){
                    var onDelete = me.props.onDelete;
                    onDelete && onDelete(resp.ret.id);
                }
            },
            function(err){
            }
        );
    },
    render: function () {
        return (
            <div className="m-deleterecord">
                <div className="m-deleterecord-header">
                    <label>确认删除</label>
                    <img src="../assets/close.png" onClick={this.handleCancel}/>
                </div>
                <div className="m-deleterecord-bd">
                    <div className="m-deleterecord-icon">
                        <img src="../assets/mark.png" alt="" className="tip-icon" />
                    </div>
                    <div className="m-deleterecord-tip">
                        <p className="tip-bd">备案信息将被删除</p>
                        <p>{this.props.record.code}</p>
                        <p className="tip-bd">您确定要删除备案信息吗?</p>
                    </div>
                    <div className="m-deleterecord-actions">
                        <button className="u-commit" onClick={this.handleSubmit}>确定</button>
                        <button className="u-cancel" onClick={this.handleCancel}>取消</button>
                    </div>
                </div>
            </div>
        );
    }
});


module.exports = DeleteRecord;