import '../../css/index.css';
import React from 'react';
import RecordType from './RecordType.jsx';
import ReturnWidget from '../widgets/ReturnWidget.jsx';
import ProgressBar from './ProgressBar.jsx';
import reqwest from 'reqwest';
import Toast from '../widgets/Toast.jsx';
import Global from '../utils/globals';
import DataService from '../services/DataService.js';


let BaseInfo = React.createClass({

    getInitialState: function () {
        return {type:0, serverregion:'1'};
    },
    onSave: function ( succ, err ) {
        if( _g.baseinfo == undefined ) {
            _g.baseinfo = {};
        }
        _g.baseinfo.type = this.state.type;
        _g.baseinfo.serverregion = this.state.serverregion;


        var formData = {};
        formData.drafttype = 1;
        formData.baseinfo = {};

        if( _g.hasOwnProperty('baseinfo') && _g.baseinfo.hasOwnProperty('id') ) {
            formData.baseinfo.id = _g.baseinfo.id;
        }
        formData.baseinfo.type = _g.baseinfo.type;

        _g.drafttype = 1;

        // savedraft
        reqwest({
            url: '/savedraft',
            method: 'post',
            data: JSON.stringify(formData),
            type:'json',
            contentType: 'application/json',
            headers: {
                'If-Modified-Since': 'Thu, 01 Jun 1970 00:00:00 GMT'
            },
            success: function (resp) {
                // {drafttype: formData.drafttype, id: r.insertId};
                if( resp.ret.drafttype == 1 ) {
                    _g.baseinfo.id = resp.ret.id;
                    Toast.show('保存草稿成功');

                    Global.set('global', _g);
                    if( typeof (succ) == 'function' ) {
                        succ();
                    }
                }
            },
            error: function (err2) {
                // TODO
                Toast.show('保存草稿失败');
            }
        });
    },
    componentDidMount: function () {
        if( _g.baseinfo != undefined ) {
            this.setState( _g.baseinfo );
        }
    },

    componentWillUnmount: function () {
    },

    onChange: function (type, region) {
        this.setState({type:type, serverregion: region});
    },
    handleSubmit: function () {
        this.onSave(function () {
            location.href = '#/fillcompanyinfo';
        }, function () {
        });

    },
    render: function () {
        return (
            <div className="g-bd">
                <ReturnWidget/>
                <div className="g-bdc">
                    <ProgressBar step={1} key={1}/>
                    <RecordType selected={this.state} onChange={this.onChange}/>
                    <div className="w-btn">
                        <button className="u-main" type="button" onClick={this.handleSubmit}>开始填写主体信息</button>
                        <button className="u-draft" type="button" onClick={this.onSave}>保存草稿</button>
                    </div>
                </div>
            </div>
        );
    }
});


module.exports = BaseInfo;

