import  '../../css/index.css';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute } from 'react-router';


require('../es5-shim.min.js');
var ReactUI = require('../ReactUI');
var Form = ReactUI.Form;
var FormControl = ReactUI.FormControl;
var Icon = ReactUI.Icon;
var Input = ReactUI.Input;
var Button = ReactUI.Button;
var FormSubmit = ReactUI.FormSubmit;
var Table = ReactUI.Table;
var Filter = ReactUI.Filter;
var Pagination = ReactUI.Pagination;
var Modal = ReactUI.Modal;



import records from '../mocks/records';
import ReturnWidget from '../widgets/ReturnWidget.jsx';


import Global from '../utils/globals';
import DataService from '../services/DataService.js';
import reqwest from 'reqwest';

let Operation = React.createClass({
    propTypes:{
        record: React.PropTypes.object.isRequired
    },
    handleDelete: function(e){
        var tenantId = __globals__.user == undefined ? '111111' : __globals__.user.tenantId;

        var me = this;
        Modal.open({
            header: '确认删除?',
            content: (
                <div>
                    <p>备案信息将被删除删除 {this.props.record.code}</p>
                    <p>您确定要删除备案信息？</p>
                </div>
            ),
            width: 400,
            buttons: {
                '取消': true,
                '确定': () => {

                    reqwest({
                        url: '/deleteapplyrecord',
                        method: 'post',
                        data: JSON.stringify({id:this.props.record.id}),
                        type:'json',
                        contentType: 'application/json',
                        success: function(resp){
                            //{ret:{id:96,ret:false}}
                            //me.setState({data: resp.ret.data});
                            if( resp.ret.ret ){
                                var onDelete = me.props.onDelete;
                                onDelete && onDelete(resp.ret.id);
                            }
                        },
                        error: function(err){
                            //TODO
                        }
                    });

                    return true;
                }
            }
        });

    },
    handleModify: function(){
        DataService.getRecord(this.props.record.id,
            function(){
                Global.set('global',__globals__);
                location.href = "#/returntobase";
            },
            function(err){
                console.log("getRecord err")
                console.log(err);
            }
        );
    },
    handleDetail: function(){
        DataService.getRecord(this.props.record.id,
            function(){
                console.log("2");
                console.log(__globals__);
                Global.set('global',__globals__);
                console.log(Global.get('global'));
                location.href = "#/reviewrecorddetail";
            },
            function(err){
                console.log("getRecord err")
                console.log(err);
            }
        );
    },

    render(){
        let type = this.props.record.type;
        let prg = this.props.record.status;

        if( prg == 0 ) {
            return (
                <td><button type="button" onClick={this.handleModify}>修改</button> <button type="button" onClick={this.handleDelete}>删除</button></td>
            );
        }
        else if( prg == 1){
            return (
                <td><button type="button" onClick={this.handleDetail}>备案详情</button> <button type="button" onClick={this.handleDelete}>删除</button></td>
            );
        }
        else if( prg == 2){
            return (
                <td><button type="button" onClick={this.handleDetail}>备案详情</button> <Link to="/checkresulttrialnopass">审核结果</Link> <button type="button" onClick={this.handleModify}>修改</button> <button type="button" onClick={this.handleDelete}>删除</button></td>
            );
        }
        else if( prg == 3){
            return (
                <td><button type="button" onClick={this.handleDetail}>备案详情</button> <Link to="/checkresulttrialpass">审核结果</Link> <Link to="/uploadphoto">上传照片</Link> <button type="button" onClick={this.handleDelete}>删除</button></td>
            );
        }
        else if( prg == 4){
            return (
                <td><button type="button" onClick={this.handleDetail}>备案详情</button> <button type="button" onClick={this.handleDelete}>删除</button></td>
            );
        }
        else if( prg == 5){
            return (
                <td><button type="button" onClick={this.handleDetail}>备案详情</button> <Link to="/checkresultphotonopass">审核结果</Link> <button type="button" onClick={this.handleModify}>修改</button> <button type="button" onClick={this.handleDelete}>删除</button></td>
            );
        }
        else if( prg == 6){
            return (
                <td><button type="button" onClick={this.handleDetail}>备案详情</button>  <Link to="/checkresultphotopass">审核结果</Link> <button type="button" onClick={this.handleDelete}>删除</button></td>
            );
        }
        else if( prg == 7){
            return (
                <td><button type="button" onClick={this.handleDetail}>备案详情</button> <button type="button" onClick={this.handleDelete}>删除</button></td>
            );
        }
        else if( prg == 8){
            return (
                <td><button type="button" onClick={this.handleDetail}>备案详情</button> <Link to="/checkresultcouncilpass">审核结果</Link> <Link to="/modify">修改</Link> <button type="button" onClick={this.handleDelete}>删除</button></td>
            );
        }
        else {
            return (
                <td><button type="button" onClick={this.handleDetail}>备案详情</button> <Link to="/checkresultcouncilnopass">审核结果</Link> <button type="button" onClick={this.handleDelete}>删除</button></td>
            );
        }
    }
});

let Records = React.createClass({

    onDelete: function(id){
        var onDelete =  this.props.onDelete;
        onDelete && onDelete(id);
    },
    format: function(m){
        var d = new Date(m);
        return d.getFullYear() + "年" + d.getMonth()+1 + "月" + d.getDate() + "日" + " " + d.getHours() + "时" + d.getMinutes() + "分" +  d.getSeconds() + "秒";
    },
    render: function(){
        var records = this.props.data.map((record)=>{
            let type = record.type;
            var typeStr =
                        type == 0  ? '首次备案' :
                        type == 1 ? '新增接入' :
                        type == 2 ? '新增网站' : '未知类型';

            let prg = record.status;
            var prgStr =
                        prg == 0 ? '草稿' :
                        prg == 1 ? '初审中' :
                        prg == 2 ? '初审未通过':
                        prg == 3 ? '初审已通过' :
                        prg == 4 ? '照片审核中' :
                        prg == 5 ? '照片审核未通过' :
                        prg == 6 ? '照片审核已通过' :
                        prg == 7 ? '通管局审核中' :
                        prg == 8 ? '通管局审核未通过' :
                        prg == 9 ? '通管局审核已通过' : "未知状态";
            var status =
                        prg == 0 ? 'draft' :
                        prg == 1 ? 'checking' :
                        prg == 2 ? 'nopass':
                        prg == 3 ? 'passed' :
                        prg == 4 ? 'checking' :
                        prg == 5 ? 'nopass' :
                        prg == 6 ? 'passed' :
                        prg == 7 ? 'checking' :
                        prg == 8 ? 'nopass' :
                        prg == 9 ? 'passed' : "draft";

           return  (
                   <tr key={record.id}>
                       <td> {record.code} </td>
                       <td> {typeStr}</td>
                       <td> {record.serverregion == "1" ? "HZ1":"HZ1"} </td>
                       <td className={status}> {prgStr} </td>
                       <td> { this.format(record.updatetime) } </td>
                       <Operation key={record.id} record={record} onDelete={this.onDelete}/>
                   </tr>
           );
        });
        return (
            <tbody>
                {records}
            </tbody>
        )
    }
});

let RecordList = React.createClass({
    onDelete: function(id){
        var data = this.state.data;
        data.map((record,index)=>{
            if( record.id == id ){
                data.splice(index,1);
                return;
            }
        });
        this.setState({ data:data} );
    },
    loadRecords: function(){
        var me = this;
        var reqData = { page:1, rpp1: 100};
        reqwest({
            url: '/records',
            method: 'get',
            data: reqData,
            type:'json',
            contentType: 'application/json',
            success: function(resp){
                me.setState({data: resp.data});
                console.log(resp);
            },
            error: function(err){
                //TODO
            }
        });
    },
    getInitialState: function(){
        return {data:[]};
    },
    componentDidMount: function(){
        this.loadRecords();
    },
    handleClick: function(){

        __globals__.baseinfo = {};
        __globals__.material = {};
        __globals__.companyinfo = {};
        __globals__.siteinfo = {};
        __globals__.record = {};
        __globals__.domains = [];

        location.href = "#/returntobase";
    },
    render: function () {
        return (
            <div>
                <div className="m-recordlist">
                    <Button onClick={this.handleClick}>备案申请</Button>

                    <div>
                    </div>
                    <table className="gridtable">
                        <thead>
                            <tr>
                            <th>申请ID</th>
                            <th>类型</th>
                            <th>主机所在区域</th>
                            <th>进展</th>
                            <th>创建时间</th>
                            <th>操作</th>
                            </tr>
                        </thead>
                        <Records data={this.state.data} onDelete={this.onDelete}/>
                    </table>
                </div>
            </div>
        );
    }

});

module.exports = RecordList;