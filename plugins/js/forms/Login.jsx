import '../../css/index.css';
import React from 'react';


var LOGINTYPE_CLOUND = '0';
var LOGINTYPE_URL = '1';

let Login = React.createClass({

    getInitialState: function () {
        return {loginType:LOGINTYPE_CLOUND, accountName:'', password:''};
    },
    handleAccountnameChange: function (e) {
        this.setState({accountName: e.target.value});
    },
    handlePasswordChange: function (e) {
        this.setState({password: e.target.value});
    },
    handleSubmit: function (e) {
        e.preventDefault();
        var accountName = this.state.accountName.trim();
        var password = this.state.password.trim();

        // 验证输入
        if( !accountName || !password ) {
            return false;
        }
        // TODO: send request to the server
        // this.setState({accountName:'',password:''});
    },
    render: function () {

        var accouttip = '';
        var passwordtip = '';
        if( _g.user && _g.user.hasOwnProperty('resCode') && _g.user.resCode != 1005 ) {
            accouttip = <label> { _g.user.resReason } </label>;
        }
        if( _g.user && _g.user.hasOwnProperty('resCode') && _g.user.resCode == 1005 ) {
            passwordtip = <label> { _g.user.resReason } </label>;
        }
        return (
            <div>
                <div className="m-login-hd">
                    <img src={_g.surl + 'icp.png'} alt=""/>
                </div>
                <div className="m-login">
                    <form method="POST" action="https://auth.c.163.com/rest/login/callback">
                        <input type="hidden" name="service" value="NCE"/>
                        <input type="hidden" name="loginType" value={this.state.loginType}/>
                        <input type="hidden" name="errorCallback" value={_g.loginCallback.error}/>
                        <input type="hidden" name="callback" value={_g.loginCallback.success}/>
                        <input type="hidden" name="autoLogin" value="true"/>
                        <div className="m-login-bd">
                            <ul className="login-type">
                                <li className={this.state.loginType == LOGINTYPE_CLOUND ? 'active' : ''} onClick={this.switchAccount}>网易云账号</li>
                                <li className={this.state.loginType == LOGINTYPE_URL ? 'active' : ''} onClick={this.switchAccount}>网易通行证</li>
                            </ul>

                            <input type="text" name="userName" placeholder={this.state.loginType == LOGINTYPE_CLOUND ? '账号/手机/邮箱' : '邮箱'} value={this.state.accountName} onChange={this.handleAccountnameChange}/>
                            {accouttip}
                            <input type="password" name="password" placeholder="密码" value={this.state.password} onChange={this.handlePasswordChange}/>
                            {passwordtip}
                            <input type="submit" className="u-commit" value="登陆"/>
                        </div>
                    </form>
                </div>
            </div>
        );
    },

    loggin:function () {
    },
    componentDidMount: function () {
        if( _g.loginType ) {
            this.setState( {loginType:  _g.loginType || 0} );
        }
    },
    switchAccount: function () {
        this.setState({
            loginType: this.state.loginType == '0' ? '1' : '0'
        }, function () {
            _g.loginType = this.state.loginType;
        }.bind(this));
    }

});



module.exports = Login;

