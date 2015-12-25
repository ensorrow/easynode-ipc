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

import records from '../mocks/records';


let Operation = React.createClass({
    propTypes:{
        record: React.PropTypes.object.isRequired
    },

    render(){
        let type = this.props.record.type;
        let prg = this.props.record.progress;

        if( prg == 0 ) {
            return (
                <td><Link to="/modify">修改</Link> <Link to="/delete">删除</Link></td>
            );
        }
        else if( prg == 1){
            return (
                <td><Link to="/detail">备案详情</Link> <Link to="/delete">删除</Link></td>
            );
        }
        else if( prg == 2){
            return (
                <td><Link to="/detail">备案详情</Link> <Link to="/checkresulttrialnopass">审核结果</Link> <Link to="/modify">修改</Link> <Link to="/delete">删除</Link></td>
            );
        }
        else if( prg == 3){
            return (
                <td><Link to="/detail">备案详情</Link> <Link to="/checkresulttrialpass">审核结果</Link> <Link to="/uploadphoto">上传照片</Link> <Link to="/delete">删除</Link></td>
            );
        }
        else if( prg == 4){
            return (
                <td><Link to="/detail">备案详情</Link> <Link to="/delete">删除</Link></td>
            );
        }
        else if( prg == 5){
            return (
                <td><Link to="/detail">备案详情</Link> <Link to="/checkresultphotonopass">审核结果</Link> <Link to="/modify">修改</Link> <Link to="/delete">删除</Link></td>
            );
        }
        else if( prg == 6){
            return (
                <td><Link to="/detail">备案详情</Link>  <Link to="/checkresultphotopass">审核结果</Link> <Link to="/delete">删除</Link></td>
            );
        }
        else if( prg == 7){
            return (
                <td><Link to="/detail">备案详情</Link> <Link to="/delete">删除</Link></td>
            );
        }
        else if( prg == 8){
            return (
                <td><Link to="/detail">备案详情</Link> <Link to="/checkresultcouncilpass">审核结果</Link> <Link to="/modify">修改</Link> <Link to="/delete">删除</Link></td>
            );
        }
        else {
            return (
                <td><Link to="/detail">备案详情</Link> <Link to="/checkresultcouncilnopass">审核结果</Link> <Link to="/delete">删除</Link></td>
            );
        }
    }
});

let Record = React.createClass({
    propTypes:{
        record: React.PropTypes.object.isRequired
    },


    render(){
        let type = this.props.record.type;
        var typeStr = type == 0  ? '首次备案' :
                      type == 1 ? '新增接入' :
                      type == 2 ? '新增网站' : '未知类型';

        let prg = this.props.record.progress;
        var prgStr = prg == 0 ? '草稿' :
                     prg == 1 ? '初审中' :
                     prg == 2 ? '初审未通过':
                     prg == 3 ? '初审已通过' :
                     prg == 4 ? '照片审核中' :
                     prg == 5 ? '照片审核未通过' :
                     prg == 6 ? '照片审核已通过' :
                     prg == 7 ? '通管局审核中' :
                     prg == 8 ? '通管局审核未通过' :
                     prg == 9 ? '通管局审核已通过' : "未知状态";
       return (
            <tbody>
               <tr>
               <td> {typeStr}</td>
               <td> {this.props.record.area} </td>
               <td> {prgStr} </td>
               <td> {this.props.record.createTime} </td>
               <Operation key={this.props.record.id} record={this.props.record}/>
               </tr>
            </tbody>
        );
    }
});

let RecordList = React.createClass({
    render: function () {
        return (
            <div>
                <Button>备案申请</Button>
                <table>
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
                    {this.renderRecords()}
                </table>
            </div>
        );
    },

    renderRecords(){
        return this.getRecords().map((record)=>{
               return <Record key={record.id} record={record}/>;
            });
    },

    getRecords(){
        return records;
    }
});

module.exports = RecordList;