import '../../css/index.css';
import React from 'react';
import ReturnWidget from '../widgets/ReturnWidget.jsx';
import Global from '../utils/globals';
import DataService from '../services/DataService.js';
import reqwest from 'reqwest';
import DeleteRecord from './DeleteRecord.jsx';
import {Button,Modal} from 'antd';
const confirm = Modal.confirm;

let Operation = React.createClass({
    propTypes:{
        record: React.PropTypes.object.isRequired
    },
    getInitialState: function () {
        return {};
    },
    handleDelete: function (e) {
        var onShow = this.props.onShow;
        onShow && onShow(this.props.record);
    },
    handleResult: function (to) {
        var me = this;
        DataService.getRecord(this.props.record.id,
            function () {
                Global.set('global', _g);
                location.href = to;
            },
            function (err) {
                if( err ) {
                    err = err + '';
                }
            }
        );
    },
    showConfirm(target, title, msg) {
        var _this = this;
        confirm({
            title: title,
            content: msg,
            onOk() {
                _this.handleResult(target);//TODO 怎么判断是从变更主体跳转的,react router应该是可以传信息的,应该还需要在跳转以后向后端请求当前主体信息
            }
        })
    },
    handleOwnerChange: function () {
        this.showConfirm.bind(this,'#/fillcompanyinfo/isChangeOwner','您确定要变更此备案号的主体信息吗?', '变更备案，修改或删除备案信息后，系统将保留您最新提交的信息，如修改或删除已备案域名，将影响原备案域名的正常访问，请您谨慎操作。')()
    },
    handleOwnerCancel: function () {

    },
    handleSiteChange: function () {//TODO
        this.showConfirm('#/fillsiteinfo/isChangeOwner','您确定要变更此备案号的网站信息吗?', '变更备案，修改或删除备案信息后，系统将保留您最新提交的信息，如修改或删除已备案域名，将影响原备案域名的正常访问，请您谨慎操作。')
    },
    handleSiteCancel: function () {

    },
    render () {

        let type = this.props.record.type;
        let prg = this.props.record.status;

        var me = this;
        if( prg == 0 ) {
            return (
                <td><a href="#" onClick={ me.handleResult.bind(me, '#/returntobase') }>修改</a><span className="ant-divider"></span> <a href="#" onClick={this.handleDelete}>删除</a></td>
            );
        } else if( prg == 1) {
            return (
                <td><a href="#" onClick={ me.handleResult.bind(me, '#/reviewrecorddetail')}>备案详情</a> </td>
            );
        } else if( prg == 2) {
            return (
                <td><a href="#" onClick={ me.handleResult.bind(me, '#/reviewrecorddetail')}>备案详情</a> <span className="ant-divider"></span> <a onClick={ me.handleResult.bind(me, '#/checkresulttrialnopass') } href="javascript:;">审核结果</a><span className="ant-divider"></span> <a href="#" onClick={ me.handleResult.bind(me, '#/returntobase') }>修改</a></td>
            );
        } else if( prg == 3) {
            return (
                <td><a href="#" onClick={ me.handleResult.bind(me, '#/reviewrecorddetail')}>备案详情</a> <span className="ant-divider"></span> <a onClick={ me.handleResult.bind(me, '#/checkresulttrialpass') } href="javascript:;">审核结果</a><span className="ant-divider"></span> <input type="button" onClick={ me.handleResult.bind(me, '#/uploadphoto') } value="上传照片"></input></td>
            );
        } else if( prg == 4) {
            return (
                <td><a href="#" onClick={ me.handleResult.bind(me, '#/reviewrecorddetail')}>备案详情</a> </td>
            );
        } else if( prg == 5) {
            return (
                <td><a href="#" onClick={ me.handleResult.bind(me, '#/reviewrecorddetail')}>备案详情</a> <span className="ant-divider"></span> <a onClick={ me.handleResult.bind(me, '#/checkresultphotonopass') } href="javascript:;">审核结果</a><span className="ant-divider"></span> <input type="button" onClick={ me.handleResult.bind(me, '#/uploadphoto') } value="上传照片"></input></td>
            );
        } else if( prg == 6) {
            return (
                <td><a href="#" onClick={ me.handleResult.bind(me, '#/reviewrecorddetail')}>备案详情</a> <span className="ant-divider"></span> <a onClick={ me.handleResult.bind(me, '#/checkresultphotopass') } href="javascript:;">审核结果</a></td>
            );
        } else if( prg == 7) {
            return (
                <td><a href="#" onClick={ me.handleResult.bind(me, '#/reviewrecorddetail')}>备案详情</a> </td>
            );
        } else if( prg == 8) {
            return (
                <td><a href="#" onClick={ me.handleResult.bind(me, '#/reviewrecorddetail')}>备案详情</a> <span className="ant-divider"></span> <a onClick={ me.handleResult.bind(me, '#/checkresultcouncilnopass') } href="javascript:;">审核结果</a><span className="ant-divider"></span> <a href="#" onClick={ me.handleResult.bind(me, '#/returntobase') }>修改</a></td>
            );
        } else if( prg == 9) {
            return (
                <td><a href="#" onClick={ me.handleResult.bind(me, '#/reviewrecorddetail')}>备案详情</a> <span className="ant-divider"></span> <a onClick={ me.handleResult.bind(me, '#/checkresultcouncilpass') } href="javascript:;">审核结果</a> <span className="ant-divider"></span> <a onClick={ me.handleOwnerChange } href="#">变更主体</a> <span className="ant-divider"></span> <a onClick={ me.handleOwnerCancel } href="javascript:;">注销主体</a> <span className="ant-divider"></span> <a onClick={ me.handleSiteChange } href="javascript:;">变更网站</a> <span className="ant-divider"></span> <a onClick={ me.handleSiteCancel } href="javascript:;">注销网站</a>  </td>
            );
        } else if( prg == 10) {
            return (
                <td><a href="#" onClick={ me.handleResult.bind(me, '#/reviewrecorddetail')}>备案详情</a> </td>
            );
        } else if( prg == 11) {
            return (
                <td><a href="#" onClick={ me.handleResult.bind(me, '#/reviewrecorddetail')}>备案详情</a> </td>
            );
        } else if( prg == 12) {
            return (
                <td><a href="#" onClick={ me.handleResult.bind(me, '#/reviewrecorddetail')}>备案详情</a> <span className="ant-divider"></span> <input type="button" onClick={ me.handleResult.bind(me, '#/uploadphoto') } value="上传照片"></input></td>
            );
        }
    }
});

let Records = React.createClass({

    onDelete: function (id) {
        var onDelete = this.props.onDelete;
        onDelete && onDelete(id);
    },
    format: function (m) {
        var d = new Date(m);
        return d.getFullYear() + '年' + (d.getMonth() + 1) + '月' + d.getDate() + '日' + ' ' + d.getHours() + '时' + d.getMinutes() + '分' + d.getSeconds() + '秒';
    },
    handleResult: function (id, to) {
        DataService.getRecord(id,
            function () {
                Global.set('global', _g);
                location.href = to;
            },
            function (err) {
                if( err ) {
                    err = err + '';
                }
            }
        );
    },
    onShow: function (record) {
        var onShow = this.props.onShow;
        onShow && onShow(record);
    },
    getCode: function (prg, id, code) {
        var cs = prg == 0 ? '' : 'code';
        if( prg == 0 ) {
            return <td className={cs}> {code} </td>;
        }else{
            return <td className={cs} onClick={ this.handleResult.bind(this, id, '#/reviewrecorddetail') }> {code} </td>;
        }
    },
    render: function () {
        var records = this.props.data.map((record)=>{
            let type = record.type;
            var typeStr =
                        type == 0 ? '首次备案' :
                        type == 1 ? '新增网站' :
                        type == 2 ? '新增接入' : '未知类型';

            let prg = record.status;
            var prgStr =
                        prg == 0 ? '草稿' :
                        prg == 1 ? '信息初审中' :
                        prg == 2 ? '初审未通过' :
                        prg == 3 ? '初审已通过' :
                        prg == 4 ? '照片审核中' :
                        prg == 5 ? '照片未通过' :
                        prg == 6 ? '待核实' :
                        prg == 7 ? '管局审核中' :
                        prg == 8 ? '被管局退回' :
                        prg == 9 ? '备案已成功' :
                        prg == 10 ? '已提交管局' :
                        prg == 11 ? '幕布申请中' :
                        prg == 12 ? '幕布已寄送' : '未知状态';


            var status =
                        prg == 0 ? 'draft' :
                        prg == 1 ? 'checking' :
                        prg == 2 ? 'nopass' :
                        prg == 3 ? 'passed' :
                        prg == 4 ? 'checking' :
                        prg == 5 ? 'nopass' :
                        prg == 6 ? 'checking' :
                        prg == 7 ? 'checking' :
                        prg == 8 ? 'nopass' :
                        prg == 9 ? 'passed' :
                        prg == 10 ? 'checking' :
                        prg == 11 ? 'checking' :
                        prg == 12 ? 'passed' : 'draft';

            return (
                   <tr className="ant-table-row" key={record.id}>
                       {this.getCode(record.status, record.id, record.code)}
                       <td> {typeStr}</td>
                       <td> {record.serverregion == '1' ? 'HZ1' : 'HZ1'} </td>
                       <td className={status}> {prgStr} </td>
                       <td> { this.format(record.updatetime) } </td>
                       <Operation key={record.id} record={record} onDelete={this.onDelete} onShow={this.onShow}/>
                   </tr>
           );
        });
        return (
            <tbody className="ant-table-tbody">
                {records}
            </tbody>
        );
    }
});

let RecordList = React.createClass({
    onDelete: function (id) {
        var data = this.state.data;
        data.map((record, index)=>{
            if( record.id == id ) {
                data.splice(index, 1);
                return;
            }
        });
        this.setState({ data:data, showDeleteRecord:false } );
    },
    loadRecords: function () {
        var me = this;
        var reqData = { page:1, rpp: 100 };
        DataService.httpRequest('/records', 'get', reqData, 'json', 'application/json', {},
            function (resp) {
                me.setState({data: resp.data});
            },
            function (err) {
                if( err ) {
                    err = err + '';
                }
            }
        );
    },
    getInitialState: function () {
        return {data:[], showDeleteRecord:false, deleterecord:{}};
    },
    componentDidMount: function () {
        this.loadRecords();
    },
    onShow: function (dr) {
        this.setState({showDeleteRecord:true, deleterecord:dr});
    },
    onHidden: function () {
        this.setState({showDeleteRecord:false});
    },
    handleClick: function () {

        _g.baseinfo = {};
        _g.material = {};
        _g.companyinfo = {};
        _g.siteinfo = {};
        _g.record = {};
        _g.domains = [];

        Global.set('global', _g);

        location.href = '#/returntobase';
    },
    render: function () {
        var deleterecord = '';
        if( this.state.showDeleteRecord ) {
            deleterecord = <DeleteRecord onDelete={this.onDelete} onHidden={this.onHidden} record={this.state.deleterecord}/>;
        }
        return (
            <div>
                <div className="m-recordlist">
                    {/*<input type="button" onClick={this.handleClick} value="备案申请"></input>*/}
                    <Button onClick={this.handleClick} type="primary">备案申请</Button>
                    <div>
                    </div>
                    <div className="ant-table">
                        <div className="ant-table-body">
                            <table>
                                <thead>
                                <tr>
                                    <th className="fid">申请ID</th>
                                    <th className="ftype">类型</th>
                                    <th className="farea">主机所在区域</th>
                                    <th className="fprocess">进展</th>
                                    <th className="fdate">创建时间</th>
                                    <th className="fop">操作</th>
                                </tr>
                                </thead>
                                <Records data={this.state.data} onDelete={this.onDelete} onShow={this.onShow}/>
                            </table>
                        </div>
                    </div>
                    {/*<table className="gridtable">*/}
                        {/*<thead>*/}
                            {/*<tr>*/}
                            {/*<th className="fid">申请ID</th>*/}
                            {/*<th className="ftype">类型</th>*/}
                            {/*<th className="farea">主机所在区域</th>*/}
                            {/*<th className="fprocess">进展</th>*/}
                            {/*<th className="fdate">创建时间</th>*/}
                            {/*<th className="fop">操作</th>*/}
                            {/*</tr>*/}
                        {/*</thead>*/}
                        {/*<Records data={this.state.data} onDelete={this.onDelete} onShow={this.onShow}/>*/}
                    {/*</table>*/}
                </div>
                {deleterecord}
            </div>
        );
    }

});

module.exports = RecordList;

