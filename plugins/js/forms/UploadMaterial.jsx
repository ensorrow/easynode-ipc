import '../../css/index.css';
import React from 'react';
import ProgressBar from './ProgressBar.jsx';
import ReturnWidget from '../widgets/ReturnWidget.jsx';
import upload from '../utils/upload';
import FormValidator from '../utils/FormValidator';
import DataService from '../services/DataService.js';
import reqwest from 'reqwest';
import Toast from '../widgets/Toast.jsx';
import ViewPhoto from './ViewPhoto.js';
import Global from '../utils/globals';
import {NATURE} from '../constants/define';
var URLSafeBase64 = require('urlsafe-base64');

import {Button} from 'antd';

const FT = {
    'SITEMANAGERURL': 0,
    'CHECKLISTURL': 1,
    'PROTOCOLURL1': 2,
    'PROTOCOLURL2': 3,
    'SECURITYURL1': 4,
    'SECURITYURL2': 5,
    'COMPANYCERTURL': 6,
    'COMPANYMANAGERURL': 7
};

let UploadMaterial = React.createClass({

    getInitialState: function () {
        return {
            showViewPhoto:false,
            processing:  false,
            url:'',
            formError:{
                companymanagerurl: {isBlank: false},
                companycerturl: {isBlank: false},
                sitemanagerurl: {isBlank: false},
                checklisturl: {isBlank: false},
                protocolurl1: {isBlank: false},
                protocolurl2: {isBlank: false},
                securityurl1: {isBlank: false},
                securityurl2: {isBlank: false}
            },
            materials:{
                companymanagerurl: '',
                companycerturl: '',
                sitemanagerurl: '',
                checklisturl: '',
                protocolurl1: '',
                protocolurl2: '',
                securityurl1: '',
                securityurl2: ''
            },
            sample:{
                companymanagerurl: 'http://apollodev.nos.netease.com/1459492803511',
                companycerturl: 'http://apollodev.nos.netease.com/1468397592354%E5%8D%95%E4%BD%8D%E4%B8%BB%E5%8A%9E%E5%8D%95%E4%BD%8D%E8%AF%81%E4%BB%B6%E7%A4%BA%E4%BE%8B.jpg',
                sitemanagerurl: 'http://apollodev.nos.netease.com/1459492803511',
                checklisturl: 'http://apollodev.nos.netease.com/1459493043170',
                checklisturl_gr: 'http://apollodev.nos.netease.com/1468226400504%E6%A0%B8%E9%AA%8C%E5%8D%95-%E4%B8%AA%E4%BA%BA%E6%A0%B7%E4%BE%8B.png',
                checklisturl_qy: 'http://apollodev.nos.netease.com/1468226458779%E6%A0%B8%E9%AA%8C%E5%8D%95-%E4%BC%81%E4%B8%9A%E6%A0%B7%E4%BE%8B.png',
                checklisturl_gd_gr: 'http://apollodev.nos.netease.com/1468226510921%E6%A0%B8%E9%AA%8C%E5%8D%95-%E5%B9%BF%E4%B8%9C%E7%9C%81%E4%B8%AA%E4%BA%BA%E6%A0%B8%E9%AA%8C%E5%8D%95.png',
                checklisturl_gd_qy: 'http://apollodev.nos.netease.com/1468226706484%E6%A0%B8%E9%AA%8C%E5%8D%95-%E5%B9%BF%E4%B8%9C%E7%9C%81-%E4%BC%81%E4%B8%9A%E6%A0%B7%E4%BE%8B.png',

                checklisturl_tpl_gr: 'http://apollodev.nos.netease.com/1468373917595%E6%A0%B8%E9%AA%8C%E5%8D%95-%E4%B8%AA%E4%BA%BA%E6%A0%B7%E4%BE%8B.png',
                checklisturl_tpl_qy: 'http://apollodev.nos.netease.com/1468373970923%E6%A0%B8%E9%AA%8C%E5%8D%95-%E4%BC%81%E4%B8%9A%E6%A0%B7%E4%BE%8B.png',
                checklisturl_tpl_gd_gr: 'http://apollodev.nos.netease.com/1468374008123%E6%A0%B8%E9%AA%8C%E5%8D%95-%E5%B9%BF%E4%B8%9C%E7%9C%81%E4%B8%AA%E4%BA%BA.png',
                checklisturl_tpl_gd_qy: 'http://apollodev.nos.netease.com/1468374022562%E6%A0%B8%E9%AA%8C%E5%8D%95-%E5%B9%BF%E4%B8%9C%E7%9C%81%E4%BC%81%E4%B8%9A%E6%A0%B7%E4%BE%8B.png',
                protocolurl1: 'http://apollodev.nos.netease.com/146157007813512.png',
                protocolurl2: 'http://apollodev.nos.netease.com/146157007813512.png',
                securityurl1: 'http://apollodev.nos.netease.com/1459493107645',
                securityurl2: 'http://apollodev.nos.netease.com/1459493107645'
            }
        };
    },
    onReturn: function () {
        location.href = '#/fillsiteinfo/'+this.props.params.entry;
    },
    handleSubmit: function (e) {
        e.preventDefault();

        if( this.state.processing ) {
            return;
        }

        var materials = this.state.materials;
        var formError;
        for( var field in materials ) {
            if( materials.hasOwnProperty(field) ) {
                formError = this.validator(field, materials[field]);
            }
        }
        this.setState({
            formError: formError
        });

        var hasError = FormValidator.check(formError);

        if( hasError ) {
            this.setState({
                processing: false
            });
            return;
        }

        this.setState({
            processing: true
        });

        this.save();

        // commit
        var reqData = JSON.stringify(_g);
        DataService.httpRequest('/records', 'post', reqData, 'json', 'application/json', {},
            function (resp) {
                // { code: code, id: id }
                _g.record = resp.ret;

                Toast.show('保存草稿成功');

                location.href = '#/submittrialsuccess';

                Global.set('global', _g);
            },
            function (err) {
                Toast.show('保存草稿失败');
                if( err ) {
                    err = err + '';
                }
            }
        );

        this.setState({
            processing: false
        });
    },
    save: function () {
        if( _g.material == undefined ) {
            _g.material = {};
        }
        _g.material = this.state.materials;
    },
    onSave: function (succ, err) {

        this.save();

        _g.drafttype = 4;
        // savedraft
        var reqData = JSON.stringify(_g);
        DataService.httpRequest('/savedraft', 'post', reqData, 'json', 'application/json', {},
            function (resp) {
                if( resp.ret.drafttype == 4 ) {
                    _g.baseinfo.id = resp.ret.id;
                }
                if( typeof (succ) == 'function' ) {
                    succ();
                }
            },
            function (err2) {
            }
        );

    },
    assignUrl: function (id, url) {
        var materials = this.state.materials;
        switch(id) {
        case '1':
            materials.sitemanagerurl = url;
            break;
        case '2':
            materials.checklisturl = url;
            break;
        case '3':
            materials.protocolurl1 = url;
            break;
        case '4':
            materials.protocolurl2 = url;
            break;
        case '5':
            materials.securityurl1 = url;
            break;
        case '6':
            materials.securityurl2 = url;
            break;
        case '7':
            materials.companycerturl = url;
            break;
        case '8':
            materials.companymanagerurl = url;
            break;
        default:
            break;
        }
        this.setState({
            materials: materials
        });
    },
    onChange: function (ee) {
        var file = ee.target.files[0];
        var me = this;
        var id = ee.target.id;
        upload({
            url: '/upl',
            name: file.name,
            cors: true,
            withCredentials: false,
            file: file,
            onProgress: (e)=>{
        // console.log(e.loaded/e.total*100 + '%');
            },
            onLoad: (e) =>{
                var resp = JSON.parse(e.currentTarget.responseText);
                me.assignUrl(id, resp.url);
            },
            onError: (e)=>{
            }
        });
        // console.log(e);
        // e.target.files[0];
        // e.target.files[0].name;
        // e.target.files.length;
        // e.target.files.value ;//c:\\塔式\h.png
        // //e.target.formAction: http://icp.hzspeed.cn/#/uploadmaterial?_k=l5safv
    },
    validator: function (fieldName, value) {
        var formError = this.state.formError;
        formError[fieldName].isBlank = FormValidator.isEmpty(value);
        return formError;
    },
    componentDidMount: function () {
        if( _g.material != undefined && this.props.params.entry != 'isChangeOwner') {
            _g.material.companycerturl = _g.material.companycerturl || '';
            _g.material.companymanagerurl = _g.material.companymanagerurl || '';
            _g.material.sitemanagerurl = _g.material.sitemanagerurl || '';
            _g.material.checklisturl = _g.material.checklisturl || '';
            _g.material.protocolurl1 = _g.material.protocolurl1 || '';
            _g.material.protocolurl2 = _g.material.protocolurl2 || '';
            _g.material.securityurl1 = _g.material.securityurl1 || '';
            _g.material.securityurl2 = _g.material.securityurl2 || '';
            this.setState( {materials: _g.material } );
        }
    },
    componentWillUnmount: function () {
    },
    handleDoubleClick: function (url) {
        this.setState({url: url});
        this.setState({showViewPhoto:true});
    },
    onHidden: function () {
        this.setState({showViewPhoto:false});
    },
    getDeleteCtrl: function (id) {
        var url = id == FT.SITEMANAGERURL ? this.state.materials.sitemanagerurl :
                    id == FT.CHECKLISTURL ? this.state.materials.checklisturl :
                    id == FT.PROTOCOLURL1 ? this.state.materials.protocolurl1 :
                    id == FT.PROTOCOLURL2 ? this.state.materials.protocolurl2 :
                    id == FT.SECURITYURL1 ? this.state.materials.securityurl1 :
                    id == FT.SECURITYURL2 ? this.state.materials.securityurl2 :
                    id == FT.COMPANYCERTURL ? this.state.materials.companycerturl :
                    id == FT.COMPANYMANAGERURL ? this.state.materials.companymanagerurl : '';
        return url.length > 0 ? <img className="m-uploadmaterial-delete" src={_g.surl + 'close.png'} onClick={this.handleDelete.bind(this, id)}></img>
            : '';
    },
    handleDelete: function (id) {
        var materials = this.state.materials;
        id == FT.SITEMANAGERURL ? materials.sitemanagerurl = '' :
        id == FT.CHECKLISTURL ? materials.checklisturl = '' :
        id == FT.PROTOCOLURL1 ? materials.protocolurl1 = '' :
        id == FT.PROTOCOLURL2 ? materials.protocolurl2 = '' :
        id == FT.SECURITYURL1 ? materials.securityurl1 = '' :
        id == FT.SECURITYURL2 ? materials.securityurl2 = '' :
        id == FT.COMPANYCERTURL ? materials.companycerturl = '' : materials.companymanagerurl = '';
        this.setState({
            materials: materials
        });
    },
    getChecklistUrl: function () {
        var name = URLSafeBase64.encode(new Buffer(_g.companyinfo.name).toString('base64'));
        var url = _g.siteinfo.domain;
        if( _g.siteinfo.domain1.length > 0 ){
            url = url + ";"  + _g.siteinfo.domain1;
        }
        if( _g.siteinfo.domain2.length > 0 ){
            url = url + ";"  + _g.siteinfo.domain2;
        }
        if( _g.siteinfo.domain3.length > 0 ){
            url = url + ";"  + _g.siteinfo.domain3;
        }
        if( _g.siteinfo.domain4.length > 0 ){
            url = url + ";"  + _g.siteinfo.domain4;
        }
        url = URLSafeBase64.encode(new Buffer(url).toString('base64'));
        var param = `?watermark&type=2&text=${name}&fontsize=600&fontcolor=IzAwMDAwMA==&dissolve=100&gravity=northwest&dx=430&dy=194%7cwatermark&type=2&text=${url}&fontsize=600&fontcolor=IzAwMDAwMA==&dissolve=100&gravity=northwest&dx=430&dy=254`;
        if( _g.companyinfo.nature == NATURE.GR ) {
            if( _g.companyinfo.province == '广东省' ) {
                return this.state.sample.checklisturl_tpl_gd_gr + param;
            }else{
                return this.state.sample.checklisturl_tpl_gr + param;
            }
        }else{
            if( _g.companyinfo.province == '广东省' ) {
                return this.state.sample.checklisturl_tpl_gd_qy + param;
            }else{
                return this.state.sample.checklisturl_tpl_qy + param;
            }
        }
    },
    getChecklistSampleUrl: function () {
        if( _g.companyinfo.nature == NATURE.GR ) {
            if( _g.companyinfo.province == '广东省' ) {
                return this.state.sample.checklisturl_gd_gr;
            }else{
                return this.state.sample.checklisturl_gr;
            }
        }else{
            if( _g.companyinfo.province == '广东省' ) {
                return this.state.sample.checklisturl_gd_qy;
            }else{
                return this.state.sample.checklisturl_qy;
            }
        }
    },
    getCompanyCertUrl: function () {
        if( _g.companyinfo.nature == NATURE.GR ) {
            return this.state.sample.companymanagerurl;
        }else{
            return this.state.sample.companycerturl;
        }
    },
    render: function () {
        var me = this;
        let entry = this.props.params.entry;
        var viewphoto = '';
        if( this.state.showViewPhoto ) {
            viewphoto = <ViewPhoto onHidden={this.onHidden} url={this.state.url}/>;
        }

        var sitemanagerurl = this.state.materials.sitemanagerurl.length > 0 ? this.state.materials.sitemanagerurl : '../assets/view.png';
        var companycerturl = this.state.materials.companycerturl.length > 0 ? this.state.materials.companycerturl : '../assets/view.png';
        var companymanagerurl = this.state.materials.companymanagerurl.length > 0 ? this.state.materials.companymanagerurl : '../assets/view.png';        
        var checklisturl = this.state.materials.checklisturl.length > 0 ? this.state.materials.checklisturl : '../assets/view.png';
        var protocolurl1 = this.state.materials.protocolurl1.length > 0 ? this.state.materials.protocolurl1 : '../assets/view.png';
        var protocolurl2 = this.state.materials.protocolurl2.length > 0 ? this.state.materials.protocolurl2 : '../assets/view.png';
        var securityurl1 = this.state.materials.securityurl1.length > 0 ? this.state.materials.securityurl1 : '../assets/view.png';
        var securityurl2 = this.state.materials.securityurl2.length > 0 ? this.state.materials.securityurl2 : '../assets/view.png';
        var samplechecklisturl = this.getChecklistSampleUrl();
        return (
            <div>
                <ReturnWidget/>
                <ProgressBar step={4} key={1}/>
                <div className="m-uploadmaterial">
                    <form className="">
                        <fieldset>
                            <div className="m-uploadmaterial-legend"><span>网站基本信息</span></div>
                            <div className="m-uploadmaterial-item">
                                <div className="m-uploadmaterial-label">
                                    <span className="red">*</span><label>主体单位负责人证件图片:</label>
                                    <span>1、需要上传身份证正反面合二为一复印件,需为彩色照片或扫描件,黑</span>
                                    <span>  白照片无效,支持图片格式:JPEG\PNG\GIF</span>
                                    <span>2、不能包含公司、组织等企业性质的词语</span>
                                </div>
                                <div className="m-uploadmaterial-ctrl">
                                    {this.getDeleteCtrl(FT.COMPANYMANAGERURL, entry)}
                                    <div className="m-uploadmaterial-ctrl-picture-table">
                                        <div className="m-uploadmaterial-ctrl-picture">
                                            <img src={companymanagerurl} alt="" onDoubleClick={me.handleDoubleClick.bind(me, companymanagerurl)}/>
                                        </div>
                                    </div>
                                    <div className="m-uploadmaterial-ctrl-button">
                                        <input type="button" value="上传图片"/>
                                        <input type="file" className="" placeholder="" name="" id="8" accept="image/jpeg,image/png,image/gif" required onChange={this.onChange}/>
                                    </div>
                                </div>
                                <div className="m-uploadmaterial-desc">
                                    <input type="button" value="查看样例" onClick={me.handleDoubleClick.bind(me, me.state.sample.companymanagerurl)}/>
                                </div>
                            </div>

                            <div className="m-uploadmaterial-item">
                                <div className="m-uploadmaterial-label">
                                    <span className="red">*</span><label>网站负责人证件图片:</label>
                                    <span>1、需要上传身份证正反面合二为一复印件,需为彩色照片或扫描件,黑</span>
                                    <span>  白照片无效,支持图片格式:JPEG\PNG\GIF</span>
                                    <span>2、不能包含公司、组织等企业性质的词语</span>
                                </div>
                                <div className="m-uploadmaterial-ctrl">
                                    {this.getDeleteCtrl(FT.SITEMANAGERURL)}
                                    <div className="m-uploadmaterial-ctrl-picture-table">
                                        <div className="m-uploadmaterial-ctrl-picture">
                                            <img src={sitemanagerurl} alt="" onDoubleClick={me.handleDoubleClick.bind(me, sitemanagerurl)}/>
                                        </div>
                                    </div>
                                    <div className="m-uploadmaterial-ctrl-button">
                                        <input type="button" value="上传图片"/>
                                        <input type="file" className="" placeholder="" name="" id="1" accept="image/jpeg,image/png,image/gif" required onChange={this.onChange}/>
                                    </div>
                                </div>
                                <div className="m-uploadmaterial-desc">
                                    <input type="button" value="查看样例" onClick={me.handleDoubleClick.bind(me, me.state.sample.sitemanagerurl)}/>
                                </div>
                            </div>

                            <div className="m-uploadmaterial-item">
                                <div className="m-uploadmaterial-label">
                                    <span className="red">*</span><label>主办单位证件类型:</label>
                                    <span>1、请您上传清晰、无污物、完整的证件原件（或加盖鲜章的复印件）照片或彩色扫描件</span>
                                    <span>  黑白照片无效,支持图片格式:JPEG\PNG\GIF</span>
                                    <span>2、所上传证件必须与主体信息处勾选的证件类型一致</span>
                                </div>
                                <div className="m-uploadmaterial-ctrl">
                                    {this.getDeleteCtrl(FT.COMPANYCERTURL)}
                                    <div className="m-uploadmaterial-ctrl-picture-table">
                                        <div className="m-uploadmaterial-ctrl-picture">
                                            <img src={companycerturl} alt="" onDoubleClick={me.handleDoubleClick.bind(me, companycerturl)}/>
                                        </div>
                                    </div>
                                    <div className="m-uploadmaterial-ctrl-button">
                                        <input type="button" value="上传图片"/>
                                        <input type="file" className="" placeholder="" name="" id="7" accept="image/jpeg,image/png,image/gif" required onChange={this.onChange}/>
                                    </div>
                                </div>
                                <div className="m-uploadmaterial-desc">
                                    <input type="button" value="查看样例" onClick={me.handleDoubleClick.bind(me, me.getCompanyCertUrl())}/>
                                </div>
                            </div>

                            <div className="m-uploadmaterial-item">
                                <div className="m-uploadmaterial-label">
                                    <span className="red">*</span><label>核验单图片:</label>
                                    <span>1、请点击下载 <a href={me.getChecklistUrl()} download="核验单">《网站备案信息真实性核验单》</a>打印并按样例提示填写，不得涂改</span>
                                    <span>2、核验单上不要填写日期</span>
                                    <span>3、上传的核验单图片需清晰完整（不缺少边际线），建议使用扫描件上传。支持图片格式：JPEG\PNG\GIF</span>
                                    <span>4、请您保存3份签字并盖公章的核验单原件，以备后续环节使用</span>
                                </div>
                                <div className="m-uploadmaterial-ctrl">
                                    {this.getDeleteCtrl(FT.CHECKLISTURL)}
                                    <div className="m-uploadmaterial-ctrl-picture-table">
                                        <div className="m-uploadmaterial-ctrl-picture">
                                            <img src={checklisturl} alt="" onDoubleClick={me.handleDoubleClick.bind(me, checklisturl)}/>
                                        </div>
                                    </div>
                                    <div className="m-uploadmaterial-ctrl-button">
                                        <input type="button" value="上传图片"/>
                                        <input type="file" className="" placeholder="" name="" id="2" accept="image/jpeg,image/png,image/gif" required onChange={this.onChange}/>
                                    </div>
                                </div>
                                <div className="m-uploadmaterial-desc">
                                    <input type="button" value="查看样例" onClick={me.handleDoubleClick.bind(me, samplechecklisturl)}/>
                                </div>
                            </div>
                            <div className="m-uploadmaterial-item">
                                <div className="m-uploadmaterial-label">
                                    <span className="red">*</span><label>云平台服务协议图片:</label>
                                    <span>1、请点击下载 <a href="../../views/网易蜂巢云平台服务协议.doc">《云平台服务协议》</a> 打印并按样例提示填写，不涂改</span>
                                    <span>2、上传的核验单图片需清晰完整（不缺少边际线），建议使用扫描件上传。支持图片格式：JPEG\PNG\GIF</span>
                                    <span>3、请您保存2份签字并盖公章的协议原件，以备后续环节使用</span>
                                </div>
                                <div className="m-uploadmaterial-ctrl">
                                    {this.getDeleteCtrl(FT.PROTOCOLURL1)}
                                    <div className="m-uploadmaterial-ctrl-picture-table">
                                        <div className="m-uploadmaterial-ctrl-picture">
                                            <img src={protocolurl1} alt="" onDoubleClick={me.handleDoubleClick.bind(me, protocolurl1)}/>
                                        </div>
                                    </div>
                                    <div className="m-uploadmaterial-ctrl-button">
                                        <input type="button" value="上传图片"/>
                                        <input type="file" className="" placeholder="" name="" id="3" accept="image/jpeg,image/png,image/gif" required onChange={this.onChange}/>
                                    </div>
                                </div>
                                <div className="m-uploadmaterial-ctrl">
                                    {this.getDeleteCtrl(FT.PROTOCOLURL2)}
                                    <div className="m-uploadmaterial-ctrl-picture-table">
                                        <div className="m-uploadmaterial-ctrl-picture">
                                            <img src={protocolurl2} alt="" onDoubleClick={me.handleDoubleClick.bind(me, protocolurl2)}/>
                                        </div>
                                    </div>
                                    <div className="m-uploadmaterial-ctrl-button">
                                        <input type="button" value="上传图片"/>
                                        <input type="file" className="" placeholder="" name="" id="4" accept="image/jpeg,image/png,image/gif" required onChange={this.onChange}/>
                                    </div>
                                </div>
                                <div className="m-uploadmaterial-desc">
                                    <input type="button" value="查看样例" onClick={me.handleDoubleClick.bind(me, me.state.sample.protocolurl1)}/>
                                </div>
                            </div>
                            <div className="m-uploadmaterial-item">
                                <div className="m-uploadmaterial-label">
                                    <span className="red">*</span><label>信息安全管理责任书图片:</label>
                                    <span>1、请点击下载 <a href="../../views/信息安全管理责任书.doc">《信息安全管理责任书》</a>打印并按样例提示填写，不涂改</span>
                                    <span>2、上传的责任书图片需清晰完整（不缺少边际线），建议使用扫描件上传。支持图片格式：JPEG\PNG\GIF</span>
                                    <span>3、请您保存2份签字并盖公章的责任书原件，以备后续环节使用</span>
                                </div>
                                <div className="m-uploadmaterial-ctrl">
                                    {this.getDeleteCtrl(FT.SECURITYURL1)}
                                    <div className="m-uploadmaterial-ctrl-picture-table">
                                        <div className="m-uploadmaterial-ctrl-picture">
                                            <img src={securityurl1} alt="" onDoubleClick={me.handleDoubleClick.bind(me, securityurl1)}/>
                                        </div>
                                    </div>
                                    <div className="m-uploadmaterial-ctrl-button">
                                        <input type="button" value="上传图片"/>
                                        <input type="file" className="" placeholder="" name="" id="5" accept="image/jpeg,image/png,image/gif" required onChange={this.onChange}/>
                                    </div>
                                </div>
                                <div className="m-uploadmaterial-ctrl">
                                    {this.getDeleteCtrl(FT.SECURITYURL2)}
                                    <div className="m-uploadmaterial-ctrl-picture-table">
                                        <div className="m-uploadmaterial-ctrl-picture">
                                            <img src={securityurl2} alt="" onDoubleClick={me.handleDoubleClick.bind(me, securityurl2)}/>
                                        </div>
                                    </div>
                                    <div className="m-uploadmaterial-ctrl-button">
                                        <input type="button" value="上传图片"/>
                                        <input type="file" className="" placeholder="" name="" id="6" accept="image/jpeg,image/png,image/gif" required onChange={this.onChange}/>
                                    </div>
                                </div>
                                <div className="m-uploadmaterial-desc">
                                    <input type="button" value="查看样例" onClick={me.handleDoubleClick.bind(me, me.state.sample.securityurl1)}/>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </div>

                <ButtonList entry={entry} handleSubmit={this.handleSubmit} onReturn={this.onReturn} onSave={this.onSave}/>
                {viewphoto}
            </div>
        );
    }
});
let ButtonList = React.createClass({
    propTypes: {
        entry: React.PropTypes.string
    },
    render : function () {
        if(this.props.entry == 'isChangeOwner'){
            return (
                <div className="w-btn">
                    <Button onClick={this.props.onReturn}> 返回修改 </Button>
                    <Button onClick={this.props.handleSubmit} type="primary">上传资料</Button>
                </div>
            )
        }else{
            return (
                <div className="w-btn">
                    <Button onClick={this.props.onReturn}> 返回修改 </Button>
                    <Button onClick={this.props.handleSubmit} type="primary">上传资料</Button>
                    <Button onClick={this.props.onSave}>保存草稿</Button>
                </div>
            )
        }
    }
})

module.exports = UploadMaterial;

