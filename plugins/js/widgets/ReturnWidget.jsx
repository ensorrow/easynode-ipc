import '../../css/index.css';
import React from 'react';


let ReturnWidget = React.createClass({


    render: function () {
        if( _g.user && _g.user.recordnumber > 0 ) {
            return (
                <div className="u-goback">
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

