import '../../css/index.css';
import React from 'react';
import upload from '../utils/upload';
import ProgressBar from './ProgressBar.jsx';
import ReturnWidget from '../widgets/ReturnWidget.jsx';
import ApplyCurtain from './ApplyCurtain.js';
import reqwest from 'reqwest';
import Toast from '../widgets/Toast.jsx';
import DataService from '../services/DataService.js';


let UploadPhoto = React.createClass({
    handleApplyCurtain: function () {
        this.setState({showApplyCurt:true});
    },
    getInitialState: function () {
        return {showApplyCurt:false, curtainurl:'', processing:  false};
    },
    componentDidMount: function () {

    },
    componentWillUnmount: function () {
    },
    onChange: function (ee) {
        var file = ee.target.files[0];
        var me = this;
        var id = ee.target.id;
        upload({
            url: '/upl',
            name: file.name || 'temp123',
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
    },
    assignUrl: function (id, url) {
        switch(id) {
        case '1':
            this.setState({
                curtainurl:url
            });
            break;
        default:
            break;
        }
    },
    handleSubmit: function (e) {
        e.preventDefault();

        if( this.state.processing ) {
            return;
        }

        this.setState({
            processing: true
        });

        // commit
        var reqData = JSON.stringify({id:_g.record.id, status:4, curtainurl: this.state.curtainurl});
        DataService.httpRequest('/record', 'put', reqData, 'json', 'application/json', {},
            function (resp) {
                // { true|false }
                location.href = '#/submitchecksuccess';
            },
            function (err) {
                if( err ) {
                    err = err + '';
                }
            }
        );

        this.setState({
            processing: false
        });
    },
    onHidden: function () {
        this.setState({showApplyCurt:false});
    },
    handleModify: function () {
        this.setState({showApplyCurt:true});
    },
    render: function () {
        var curtain = '';
        var applyAddr = '';
        var address = _g.user.mailingaddress || '';
        if( this.state.showApplyCurt ) {
            curtain = <ApplyCurtain onHidden={this.onHidden} recordid={_g.record.id}/>;
        }

        applyAddr = address.trim().length <= 0 ?
            <div className="m-uploadphoto-ctrl-button">
                <input type="button" value="申请幕布" onClick={this.handleApplyCurtain}/>
            </div>
            :
            <div className="m-uploadphoto-ctrl-button">
                <div className="m-recipientinfo-label">
                    <label>收件信息:</label>
                </div>
                <div className="m-recipientinfo-item">
                    <span> {_g.user.mailingaddress} {_g.user.companyname} {_g.user.recipient} {_g.user.recipientmobile}</span> <input type="button" value="修改" onClick={this.handleModify}></input>
                </div>
            </div>
        ;

        return (
            <div>
                <ReturnWidget/>
                <div className="m-uploadphoto">
                    <form className="">
                        <fieldset>
                            <div className="m-uploadphoto-tip">
                                <img src={_g.surl + 'yellowexclamationmark.png'}></img><span>拍照需幕布作为背景，若您还没有申请幕布，我们将免费邮寄给您，约2-3个工作日。幕布无需寄回，您可留下反复使用。若已有幕布，请直接上传照片。</span>
                            </div>
                            <div className="m-uploadphoto-legend"><span>我没有幕布</span></div>
                            <div className="m-uploadphoto-item-1">
                                <div className="m-uploadphoto-ctrl">
                                    {applyAddr}
                                </div>
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className="m-uploadphoto-legend"><span>我已有幕布</span></div>
                            <div className="m-uploadphoto-item">
                                <div className="m-uploadphoto-label">
                                    <label>图片:</label>
                                </div>
                                <div className="m-uploadphoto-ctrl">
                                    <div className="m-uploadphoto-ctrl-picture-table">
                                        <div className="m-uploadphoto-ctrl-picture">
                                            <img src={this.state.curtainurl.length > 0 ? this.state.curtainurl : _g.surl + 'view.png'} alt=""/>
                                        </div>
                                    </div>
                                    <div className="m-uploadphoto-ctrl-button">
                                        <input type="button" value="上传图片"/>
                                        <input type="file" className="" placeholder="" name="" id="1" accept="image/jpeg,image/png,image/gif" required onChange={this.onChange}/>
                                    </div>
                                </div>
                                <div className="m-uploadphoto-desc">
                                    <span>1、请认真阅读拍照说明，以节省审核时间。点击查看<a href="http://www.w3school.com.cn">拍照说明</a></span>
                                    <span>2、支持照片格式：JPG\PNG\GIF\JPEG，大小建议4M以下</span>
                                    <span>3、请务必上传带有相关幕布背景的照片</span>
                                </div>
                            </div>

                        </fieldset>
                    </form>
                </div>

                <div className="w-btn">
                    <button className="u-main" type="button" onClick={this.handleSubmit}> 提交审核 </button>
                </div>
                {curtain}
            </div>
        );
    }
});



module.exports = UploadPhoto;

