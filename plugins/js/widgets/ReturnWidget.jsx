import '../../css/index.css';
import React from 'react';


let ReturnWidget = React.createClass({


    render: function () {
        if( _g.user && _g.user.recordnumber > 0 ) {
            return (
                <div className="u-goback">
                    <div className="tip">
                        <p>尊敬的蜂巢用户您好，目前蜂巢备案产品尚未上线，正在灰测阶段，如有紧急需求要求备案，</p>
                        <p>可发送“申请备案灰测+需备案域名”至cloudcomb@188.com进行灰测申请。</p>
                        <p>未通过灰测申请的提交信息不予受理</p>
                    </div>
                    <a className="u-goback" href=""><img src={_g.surl + 'return.png'}/>返回列表</a>
                </div>
            );
        }else {
            return (
                <div>
                </div>
            );
        }
    }
});

module.exports = ReturnWidget;

