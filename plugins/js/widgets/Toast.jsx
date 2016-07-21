/**
 * Created by hujiabao on 1/28/16.
 * changed by 吕哲扬
 * 引入ant design里的message,把原有的逻辑全改了,直接是toast.show触发message.info。。。
 */
import '../../css/index.css';
import React from 'react';
import { render } from 'react-dom';
import { message } from 'antd';


const info = function(msg,last){
    message.info(msg, last);
};

let Toast = React.createClass({

    render: function () {
        return (
            <div>

            </div>
        );
    }
});

Toast.show = function (msg) {

    info(msg, 3)
};


module.exports = Toast;

