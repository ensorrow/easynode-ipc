import '../../css/index.css';
import React from 'react';
import {Alert} from 'antd';

let ReturnWidget = React.createClass({


    render: function () {
        if( _g.user && _g.user.recordnumber > 0 ) {
            return (
                <div>
                    {/*<div className="tip">*/}
                        {/*<p>尊敬的蜂巢用户您好，目前蜂巢备案产品尚未上线，正在灰测阶段，如有紧急需求要求备案，</p>*/}
                        {/*<p>可发送“申请备案灰测+需备案域名”至cloudcomb@188.com进行灰测申请。</p>*/}
                        {/*<p>未通过灰测申请的提交信息不予受理</p>*/}
                    {/*</div>*/}
                    {/*修改警告样式-吕哲扬*/}
                    <Alert message="尊敬的蜂巢用户您好，目前蜂巢备案产品尚未上线，正在灰测阶段，如有紧急需求要求备案，可发送“申请备案灰测+需备案域名”至cloudcomb@188.com进行灰测申请。未通过灰测申请的提交信息不予受理"
                           type="warning"
                           showIcon={false}
                           />
                    <a className="u-goback" href=""><img src={_g.surl + 'return.png'}/>返回列表</a>
                </div>
            );
        }else {
            return (
                <div className="tip">
                    <p>尊敬的蜂巢用户您好，目前蜂巢备案产品尚未上线，正在灰测阶段，如有紧急需求要求备案，</p>
                    <p>可发送“申请备案灰测+需备案域名”至cloudcomb@188.com进行灰测申请。</p>
                    <p>未通过灰测申请的提交信息不予受理</p>
                </div>
            );
        }
    }
});

module.exports = ReturnWidget;

