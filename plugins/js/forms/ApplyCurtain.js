import '../../css/index.css';
import React from 'react';
import Global from '../utils/globals';
import DataService from '../services/DataService.js';
import FormValidator from '../utils/FormValidator';
import assigner from 'object.assign';
var assign = assigner.getPolyfill();


let ApplyCurtain = React.createClass({

    handleRegion: function (p, c, a) {
        this.setState({province: p, city: c, area: a});
    },
    getInitialState: function () {
        return {
            processing : false,
            province:'', city:'', area:'',
            contactinfo: {
                mailingaddress: '',
                recipient: '',
                recipientmobile: '',
                companyname: ''
            },
            agree: true,
            formError: {
                mailingaddress: {isBlank: false, regularFail: false, match: function () {
                    return true;
                }},
                recipient: {isBlank: false, regularFail: false, match: function () {
                    return true;
                }},
                recipientmobile: {isBlank: false, regularFail: false, match: function () {
                    return true;
                }},
                companyname: {isBlank: false, checked:true}
            }
        };
    },
    componentDidMount: function () {
        if( _g.user != undefined ) {
            var contactinfo = {};
            contactinfo.mailingaddress = _g.user.mailingaddress;
            contactinfo.recipient = _g.user.recipient;
            contactinfo.recipientmobile = _g.user.recipientmobile;
            contactinfo.companyname = _g.user.companyname;
            this.setState( { contactinfo: contactinfo } );
        }
    },
    validator: function (fieldName, value) {
        var formError = this.state.formError;
        formError[fieldName].isBlank = FormValidator.isEmpty(value);
        if( fieldName == 'id' ) {
            formError[fieldName].isBlank = false;
        }
        return formError;
    },
    handleSubmit: function (e) {
        e.preventDefault();
        if( this.state.processing ) {
            return;
        }
        var contactinfo = this.state.contactinfo;
        var formError;
        for( var field in contactinfo ) {
            if( contactinfo.hasOwnProperty(field) ) {
                formError = this.validator(field, contactinfo[field]);
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

        // /
        var data = {
            mailingaddress: this.state.contactinfo.mailingaddress,
            recipient: this.state.contactinfo.recipient,
            recipientmobile: this.state.contactinfo.recipientmobile,
            companyname: this.state.contactinfo.companyname,
            recordid:this.props.recordid
        };

        var me = this;
        var reqData = JSON.stringify( data );
        DataService.httpRequest('/user', 'put', reqData, 'json', 'application/json', {},
            function () {

                assign(_g.user, data);
                Global.set('global', _g);

                var onHidden = me.props.onHidden;
                onHidden && onHidden();

                location.href = '#/uploadphoto';
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
    handleCancel: function () {
        var onHidden = this.props.onHidden;
        onHidden && onHidden();
        // location.href = "#/uploadphoto";
    },
    handleMailingAddress: function (e) {
        e.preventDefault();
        var contactinfo = this.state.contactinfo;
        contactinfo.mailingaddress = e.target.value;
        this.setState({contactinfo: contactinfo});
    },
    handleRecipient: function (e) {
        e.preventDefault();
        var contactinfo = this.state.contactinfo;
        contactinfo.recipient = e.target.value;
        this.setState({contactinfo: contactinfo});
    },
    handleRecipientMobile: function (e) {
        e.preventDefault();
        var contactinfo = this.state.contactinfo;
        contactinfo.recipientmobile = e.target.value;
        this.setState({contactinfo: contactinfo});
    },
    handleCompanyName: function (e) {
        e.preventDefault();
        var contactinfo = this.state.contactinfo;
        contactinfo.companyname = e.target.value;
        this.setState({contactinfo: contactinfo});
    },
    handleAgreement: function (e) {
        e.preventDefault();
        this.setState( {agree: !this.state.agree}, function () {

        }/* .bind(this)*/);
    },
    render: function () {
        return (
            <div className="m-applycurtain">
                <div className="m-applycurtain-header"><label>申请幕布</label><img src={_g.surl + 'close.png'} onClick={this.handleCancel}></img></div>
                <div className="m-applycurtain-bd">
                    <div className="m-applycurtain-bd-tip">
                        <img src="../assets/yellowexclamationmark.png"></img>
                        <label>提交申请后，我们将尽快寄出幕布，您收到后也请及时拍照并上传。</label>
                    </div>
                    <div className="m-applycurtain-item">
                        <div className="m-applycurtain-item-label">
                            <span>*</span> <label>幕布邮寄地址:</label>
                        </div>
                        <div className="m-applycurtain-item-ctrl">
                            <input type="text" name="identity" placeholder="详细地址" onChange={this.handleMailingAddress} value={this.state.contactinfo.mailingaddress}/>
                        </div>
                    </div>
                    <div className="m-applycurtain-item">
                        <div className="m-applycurtain-item-label">
                            <span>*</span> <label>收件人姓名:</label>
                        </div>
                        <div className="m-applycurtain-item-ctrl">
                            <input type="text" name="identity" onChange={this.handleRecipient} value={this.state.contactinfo.recipient}/>
                        </div>
                    </div>
                    <div className="m-applycurtain-item">
                        <div className="m-applycurtain-item-label">
                            <span>*</span> <label>收件人手机号:</label>
                        </div>
                        <div className="m-applycurtain-item-ctrl">
                            <input type="text" name="identity" onChange={this.handleRecipientMobile} value={this.state.contactinfo.recipientmobile} maxLength="11"/>
                        </div>
                    </div>
                    <div className="m-applycurtain-item">
                        <div className="m-applycurtain-item-label">
                            <label>公司名称:</label>
                        </div>
                        <div className="m-applycurtain-item-ctrl">
                            <input type="text" name="identity" onChange={this.handleCompanyName} value={this.state.contactinfo.companyname}/>
                        </div>
                    </div>
                    <div className="m-applycurtain-item">
                        <div className="m-applycurtain-item-label">

                        </div>
                        <div className="m-applycurtain-item-ctrl">
                            <label><input type="checkbox" name="1" checked={this.state.agree} className="" onChange={this.handleAgreement}/> <span className="small-font">同意ICP备案系统快递供应商可以获取如上联系信息邮寄幕布</span></label>
                        </div>
                    </div>
                    <div className="m-applycurtain-item">
                        <div className="m-applycurtain-item-label">

                        </div>
                        <div className="m-applycurtain-item-ctrl">
                            <button className="u-commit" type="button" disabled={!this.state.agree} onClick={this.handleSubmit}>提交申请</button>
                            <button className="u-cancel" type="button" onClick={this.handleCancel}>取消</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});


module.exports = ApplyCurtain;

