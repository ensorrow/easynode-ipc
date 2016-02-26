import  '../../css/index.css';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute } from 'react-router';
import records from '../mocks/records';
import ReturnWidget from '../widgets/ReturnWidget.jsx';
import Global from '../utils/globals';
import DataService from '../services/DataService.js';
import reqwest from 'reqwest';
import DeleteRecord from './DeleteRecord.jsx';

let Operation = React.createClass({
    propTypes:{
        record: React.PropTypes.object.isRequired
    },
    getInitialState: function(){
        return {showDeleteRecord:false};
    },
    handleDelete: function(e){
        this.setState({showDeleteRecord:true});
    },
    onHidden: function(){
        this.setState({showDeleteRecord:false});
    },
    handleResult: function(to){
        DataService.getRecord(this.props.record.id,
            function(){
                Global.set('global',__globals__);
                location.href = to;
            },
            function(err){
                console.log("getRecord err");
                console.log(err);
            }
        );
    },
    render(){

        var drw = '';
        if( this.state.showDeleteRecord ){
            drw = <DeleteRecord onHidden={this.onHidden} onDelete={this.props.onDelete} record={this.props.record}/>
        }

        let type = this.props.record.type;
        let prg = this.props.record.status;

        var me = this;
        if( prg == 0 ) {
             (
                 <div>
                <td><input type="button" onClick={ me.handleResult.bind(me,"#/returntobase") } value="修改"></input> <input type="button" onClick={this.handleDelete} value="删除"></input></td>
                {drw}
                     </div>
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
        return d.getFullYear() + "年" + (d.getMonth()+1) + "月" + d.getDate() + "日" + " " + d.getHours() + "时" + d.getMinutes() + "分" +  d.getSeconds() + "秒";
    },
    handleResult: function(id,to){
        DataService.getRecord(id,
            function(){
                Global.set('global',__globals__);
                location.href = to;
            },
            function(err){
                console.log("getRecord err");
                console.log(err);
            }
        );
    },
    getCode: function(prg,id,code){
        var cs = prg == 0 ? '' : 'code';
        if( prg == 0 ){
            return <td className={cs}> {code} </td>
        }else{
            return <td className={cs} onClick={ this.handleResult.bind(this,id,"#/reviewrecorddetail") }> {code} </td>
        }
    },
    render: function(){
        var records = this.props.data.map((record)=>{
            let type = record.type;
            var typeStr =
                        type == 0  ? '首次备案' :
                        type == 1 ? '新增网站' :
                        type == 2 ? '新增接入' : '未知类型';

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
                   <tr className="" key={record.id}>
                       {this.getCode(record.status,record.id,record.code)}
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
        var reqData = { page:1, rpp: 100 };
        DataService.httpRequest('/records','get',reqData,'json','application/json',{},
            function(resp){
                me.setState({data: resp.data});
            },
            function(err){
            }
        );
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

        Global.set('global',__globals__);

        location.href = "#/returntobase";
    },
    render: function () {
        return (
            <div>
                <div className="m-recordlist">
                    <input type="button" onClick={this.handleClick} value="备案申请"></input>

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