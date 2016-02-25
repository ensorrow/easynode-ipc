import  '../../css/index.css';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute } from 'react-router';
import ProgressBar from './ProgressBar.jsx';
import ReturnWidget from '../widgets/ReturnWidget.jsx';
import upload from '../utils/upload';
import FormValidator from '../utils/FormValidator';
import reqwest from 'reqwest';
import Toast from '../widgets/Toast.jsx';
import ViewPhoto from './ViewPhoto.js';
import Global from '../utils/globals';

const FT = {
    "SITEMANAGERURL": 0,
    "CHECKLISTURL": 1,
    "PROTOCOLURL1": 2,
    "PROTOCOLURL2": 3,
    "SECURITYURL1": 4,
    "SECURITYURL2": 5
};

let UploadMaterial = React.createClass({

    getInitialState: function(){
      return {
          showViewPhoto:false,
          processing:  false,
          url:'',
          formError:{
              sitemanagerurl: {isBlank: false},
              checklisturl: {isBlank: false},
              protocolurl1: {isBlank: false},
              protocolurl2: {isBlank: false},
              securityurl1: {isBlank: false},
              securityurl2: {isBlank: false}
          },
          materials:{
              sitemanagerurl: '',
              checklisturl: '',
              protocolurl1: '',
              protocolurl2: '',
              securityurl1: '',
              securityurl2: ''
          },
          sample:{
              sitemanagerurl: 'http://apollodev.nos.netease.com/1456282622803',
              checklisturl: 'http://apollodev.nos.netease.com/1456282666775',
              protocolurl1: 'http://apollodev.nos.netease.com/1456282709452',
              protocolurl2: 'http://apollodev.nos.netease.com/1456282714862',
              securityurl1: 'http://apollodev.nos.netease.com/1456282720423',
              securityurl2: 'http://apollodev.nos.netease.com/1456282725557'
          }
      }
    },
    onReturn: function(){
        location.href = "#/fillsiteinfo";
    },
    handleSubmit: function(e){
        e.preventDefault();

        if( this.state.processing ){
            return;
        }

        var materials = this.state.materials;
        var formError;
        for( var field in materials ){
            if( materials.hasOwnProperty(field) ){
                formError = this.validator(field,materials[field]);
            }
        }
        this.setState({
            formError: formError
        });

        var hasError = FormValidator.check(formError);

        if( hasError ){
            this.setState({
                processing: false
            });
            return;
        }

        this.setState({
            processing: true
        });

        this.save();

        //commit
        reqwest({
            url: '/records',
            method: 'post',
            data: JSON.stringify(__globals__),
            type:'json',
            contentType: 'application/json',
            success: function(resp){
                //{ code: code, id: id }
                __globals__.record = resp.ret;

                Toast.show("保存草稿成功");

                location.href = "#/submittrialsuccess";

                Global.set('global',__globals__);
            },
            error: function(err){
                //TODO
                Toast.show("保存草稿失败");
            }
        });

        this.setState({
            processing: false
        });
    },
    save: function(){
        if( __globals__.material == undefined )
            __globals__.material = {};
        __globals__.material = this.state.materials;
    },
    onSave: function(succ,err){

        this.save();

        __globals__.drafttype = 4;
        //savedraft
        reqwest({
            url: '/savedraft',
            method: 'post',
            data: JSON.stringify(__globals__),
            type:'json',
            contentType: 'application/json',
            success: function(resp){
                console.log(resp)
                console.log(resp.ret.id);
                if( resp.ret.drafttype == 4 ){
                    __globals__.baseinfo.id = resp.ret.id;
                }
                if( typeof(succ) == 'function' ) succ();
            },
            error: function(err){
                //TODO
                console.log(err);
            }
        });
    },
    assignUrl: function(id,url){
        var materials = this.state.materials;
        switch(id){
            case "1":
                materials.sitemanagerurl = url;
                break;
            case "2":
                materials.checklisturl = url;
                break;
            case "3":
                materials.protocolurl1 = url;
                break;
            case "4":
                materials.protocolurl2 = url;
                break;
            case "5":
                materials.securityurl1 = url;
                break;
            case "6":
                materials.securityurl2 = url;
                break;
        }
        this.setState({
            materials: materials
        });
    },
    onChange: function(ee){
        var file = ee.target.files[0];
        upload({
            url: '/upl',
            name: file.name,
            cors: true,
            withCredentials: false,
            file: file,
            onProgress: (e)=>{
                console.log(e.loaded/e.total*100 + '%');
            },
            onLoad: (e) =>{
                var resp = JSON.parse(e.currentTarget.responseText);
                this.assignUrl(ee.target.id,resp.url);
            },
            onError: (e)=>{
                console.log("file upload error");
            }
        });
        //console.log(e);
        //e.target.files[0];
        //e.target.files[0].name;
        //e.target.files.length;
        //e.target.files.value ;//c:\\塔式\h.png
        ////e.target.formAction: http://icp.hzspeed.cn/#/uploadmaterial?_k=l5safv
    },
    validator: function(fieldName,value){
        var formError = this.state.formError;
        formError[fieldName].isBlank = FormValidator.isEmpty(value);
        return formError;
    },
    componentDidMount: function(){
        if( __globals__.material != undefined ) {
            __globals__.material.sitemanagerurl =  __globals__.material.sitemanagerurl || '';
            __globals__.material.checklisturl =  __globals__.material.checklisturl || '';
            __globals__.material.protocolurl1 =  __globals__.material.protocolurl1 || '';
            __globals__.material.protocolurl2 =  __globals__.material.protocolurl2 || '';
            __globals__.material.securityurl1 =  __globals__.material.securityurl1 || '';
            __globals__.material.securityurl2 =  __globals__.material.securityurl2 || '';
            this.setState( {materials: __globals__.material } );
        }
    },
    componentWillUnmount: function(){
    },
    handleDoubleClick: function(url){
        console.log("onDoubleClick",url);
        this.setState({url: url});
        this.setState({showViewPhoto:true});
    },
    onHidden: function(){
        this.setState({showViewPhoto:false});
        console.log("onHidden");
    },
    getDeleteCtrl: function(id){
        var url =   id == FT.SITEMANAGERURL ? this.state.materials.sitemanagerurl :
                    id == FT.CHECKLISTURL ? this.state.materials.checklisturl :
                    id == FT.PROTOCOLURL1 ? this.state.materials.protocolurl1 :
                    id == FT.PROTOCOLURL2 ? this.state.materials.protocolurl2 :
                    id == FT.SECURITYURL1 ? this.state.materials.securityurl1 :
                    id == FT.SECURITYURL2 ? this.state.materials.securityurl2 : '';
        return url.length > 0 ? <img className="m-uploadmaterial-delete" src="../assets/close.png" onClick={this.handleDelete.bind(this,id)}></img>
            : ''
    },
    handleDelete: function(id){
        var materials = this.state.materials;
        id == FT.SITEMANAGERURL ? materials.sitemanagerurl = '' :
        id == FT.CHECKLISTURL ? materials.checklisturl = '' :
        id == FT.PROTOCOLURL1 ? materials.protocolurl1  = '':
        id == FT.PROTOCOLURL2 ? materials.protocolurl2 = '' :
        id == FT.SECURITYURL1 ? materials.securityurl1 = '' : materials.securityurl2 = '';
        this.setState({
            materials: materials
        });
    },
    render: function () {
        var me = this;

        var viewphoto = '';
        if( this.state.showViewPhoto ){
            viewphoto = <ViewPhoto onHidden={this.onHidden} url={this.state.url}/>
        }

        var sitemanagerurl =  this.state.materials.sitemanagerurl.length > 0 ? this.state.materials.sitemanagerurl : this.state.sample.sitemanagerurl;
        var checklisturl =  this.state.materials.checklisturl.length > 0 ? this.state.materials.checklisturl : this.state.sample.checklisturl;
        var protocolurl1 = this.state.materials.protocolurl1.length > 0 ? this.state.materials.protocolurl1 : this.state.sample.protocolurl1;
        var protocolurl2 = this.state.materials.protocolurl2.length > 0 ? this.state.materials.protocolurl2 : this.state.sample.protocolurl2;
        var securityurl1 =  this.state.materials.securityurl1.length > 0 ? this.state.materials.securityurl1 : this.state.sample.securityurl1;
        var securityurl2 = this.state.materials.securityurl2.length > 0 ? this.state.materials.securityurl2 : this.state.sample.securityurl2;
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
                                </div>
                                {this.getDeleteCtrl(FT.SITEMANAGERURL)}
                                <div className="m-uploadmaterial-ctrl">
                                    <div className="m-uploadmaterial-ctrl-picture-table">
                                        <div className="m-uploadmaterial-ctrl-picture">
                                            <img src={sitemanagerurl} alt="" onDoubleClick={me.handleDoubleClick.bind(me,sitemanagerurl)}/>
                                        </div>
                                    </div>
                                    <div className="m-uploadmaterial-ctrl-button">
                                        <input type="button" value="上传图片"/>
                                        <input type="file" className="" placeholder="" name="" id="1" accept="image/jpeg,image/png,image/gif" required onChange={this.onChange}/>
                                    </div>
                                </div>
                                <div className="m-uploadmaterial-desc">
                                    <span>1、需要上传身份证正反面合二为一复印件,需为彩色照片或扫描件,黑白照片无效,支持图片格式:JPEG\PNG\GIF</span>
                                    <span>2、不能包含公司、组织等企业性质的词语</span>
                                </div>
                            </div>
                            <div className="m-uploadmaterial-item">
                                <div className="m-uploadmaterial-label">
                                    <span className="red">*</span><label>核验单图片:</label>
                                </div>
                                {this.getDeleteCtrl(FT.CHECKLISTURL)}
                                <div className="m-uploadmaterial-ctrl">
                                    <div className="m-uploadmaterial-ctrl-picture-table">
                                        <div className="m-uploadmaterial-ctrl-picture">
                                            <img src={checklisturl} alt="" onDoubleClick={me.handleDoubleClick.bind(me,checklisturl)}/>
                                        </div>
                                    </div>
                                    <div className="m-uploadmaterial-ctrl-button">
                                        <input type="button" value="上传图片"/>
                                        <input type="file" className="" placeholder="" name="" id="2" accept="image/jpeg,image/png,image/gif" required onChange={this.onChange}/>
                                    </div>
                                </div>
                                <div className="m-uploadmaterial-desc">
                                    <span>1、请点击下载 <a href="../../views/核验单.doc">《网站备案信息真实性核验单》</a>打印并按样例提示填写，不得涂改</span>
                                    <span>2、核验单上不要填写日期</span>
                                    <span>3、上传的核验单图片需清晰完整（不缺少边际线），建议使用扫描件上传。支持图片格式：JPEG\PNG\GIF</span>
                                    <span>4、请您保存3份签字并盖公章的核验单原件，以备后续环节使用</span>
                                </div>
                            </div>
                            <div className="m-uploadmaterial-item">
                                <div className="m-uploadmaterial-label">
                                    <span className="red">*</span><label>云平台服务协议第一页图片:</label>
                                </div>
                                {this.getDeleteCtrl(FT.PROTOCOLURL1)}
                                <div className="m-uploadmaterial-ctrl">
                                    <div className="m-uploadmaterial-ctrl-picture-table">
                                        <div className="m-uploadmaterial-ctrl-picture">
                                            <img src={protocolurl1} alt="" onDoubleClick={me.handleDoubleClick.bind(me,protocolurl1)}/>
                                        </div>
                                    </div>
                                    <div className="m-uploadmaterial-ctrl-button">
                                        <input type="button" value="上传图片"/>
                                        <input type="file" className="" placeholder="" name="" id="3" accept="image/jpeg,image/png,image/gif" required onChange={this.onChange}/>
                                    </div>
                                </div>
                                <div className="m-uploadmaterial-desc">
                                    <span>1、请点击下载 <a href="../../views/网易蜂巢云平台服务协议.doc">《云平台服务协议》</a> 打印并按样例提示填写，不涂改</span>
                                    <span>2、上传的核验单图片需清晰完整（不缺少边际线），建议使用扫描件上传。支持图片格式：JPEG\PNG\GIF</span>
                                    <span>3、请您保存2份签字并盖公章的协议原件，以备后续环节使用</span>
                                </div>
                            </div>
                            <div className="m-uploadmaterial-item">
                                <div className="m-uploadmaterial-label">
                                    <span className="red">*</span><label>云平台服务协议第二页图片:</label>
                                </div>
                                {this.getDeleteCtrl(FT.PROTOCOLURL2)}
                                <div className="m-uploadmaterial-ctrl">
                                    <div className="m-uploadmaterial-ctrl-picture-table">
                                        <div className="m-uploadmaterial-ctrl-picture">
                                            <img src={protocolurl2} alt="" onDoubleClick={me.handleDoubleClick.bind(me,protocolurl2)}/>
                                        </div>
                                    </div>
                                    <div className="m-uploadmaterial-ctrl-button">
                                        <input type="button" value="上传图片"/>
                                        <input type="file" className="" placeholder="" name="" id="4" accept="image/jpeg,image/png,image/gif" required onChange={this.onChange}/>
                                    </div>
                                </div>
                                <div className="m-uploadmaterial-desc">
                                    <span>1、支持图片格式:JPEG\PNG\GIF</span>
                                </div>
                            </div>
                            <div className="m-uploadmaterial-item">
                                <div className="m-uploadmaterial-label">
                                    <span className="red">*</span><label>信息安全管理责任书第一页图片:</label>
                                </div>
                                {this.getDeleteCtrl(FT.SECURITYURL1)}
                                <div className="m-uploadmaterial-ctrl">
                                    <div className="m-uploadmaterial-ctrl-picture-table">
                                        <div className="m-uploadmaterial-ctrl-picture">
                                            <img src={securityurl1} alt="" onDoubleClick={me.handleDoubleClick.bind(me,securityurl1)}/>
                                        </div>
                                    </div>
                                    <div className="m-uploadmaterial-ctrl-button">
                                        <input type="button" value="上传图片"/>
                                        <input type="file" className="" placeholder="" name="" id="5" accept="image/jpeg,image/png,image/gif" required onChange={this.onChange}/>
                                    </div>
                                </div>
                                <div className="m-uploadmaterial-desc">
                                    <span>1、请点击下载 <a href="../../views/信息安全管理责任书.doc">《信息安全管理责任书》</a>打印并按样例提示填写，不涂改</span>
                                    <span>2、上传的责任书图片需清晰完整（不缺少边际线），建议使用扫描件上传。支持图片格式：JPEG\PNG\GIF</span>
                                    <span>3、请您保存2份签字并盖公章的责任书原件，以备后续环节使用</span>
                                </div>
                            </div>
                            <div className="m-uploadmaterial-item">
                                <div className="m-uploadmaterial-label">
                                    <span className="red">*</span><label>信息安全管理责任书第二页图片:</label>
                                </div>
                                {this.getDeleteCtrl(FT.SECURITYURL2)}
                                <div className="m-uploadmaterial-ctrl">
                                    <div className="m-uploadmaterial-ctrl-picture-table">
                                        <div className="m-uploadmaterial-ctrl-picture">
                                            <img src={securityurl2} alt="" onDoubleClick={me.handleDoubleClick.bind(me,securityurl2)}/>
                                        </div>
                                    </div>
                                    <div className="m-uploadmaterial-ctrl-button">
                                        <input type="button" value="上传图片"/>
                                        <input type="file" className="" placeholder="" name="" id="6" accept="image/jpeg,image/png,image/gif" required onChange={this.onChange}/>
                                    </div>
                                </div>
                                <div className="m-uploadmaterial-desc">
                                    <span>1、支持图片格式:JPEG\PNG\GIF</span>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </div>

                <div className="w-btn">
                    <button className="u-return" type="button"  onClick={this.onReturn}> 返回修改 </button>
                    <button className="u-main" type="button" onClick={this.handleSubmit}> 提交初审 </button>
                    <button className="u-draft" type="button" onClick={this.onSave}>保存草稿</button>
                </div>
                {viewphoto}
            </div>
        );
    }
});


module.exports = UploadMaterial;