/**
 * Created by hujiabao on 1/28/16.
 */
import  '../../css/index.css';
import React from 'react';
import { render } from 'react-dom';

let messageContainer = null;
let message = '';
let className = '';

let Toast = React.createClass({

    propTypes:{
        className: React.PropTypes.string.isRequired,
        message: React.PropTypes.string.isRequired
    },
    getInitialState:function(){
        return {className:''};
    },
    componentDidMount: function(){
        this.interval = setTimeout(this.tick, 3*1000);
        this.setState({className:this.props.className});
    },
    tick: function(){
        this.setState({});
        if( messageContainer ){
            document.body.removeChild(messageContainer);
            messageContainer = null;
        }
    },
    componentWillUnmount: function(){
        clearInterval(this.interval);
    },

    render: function () {

        return (
            <div className={this.state.className}>
                {this.props.message}
            </div>
        );
    }
});

Toast.show = function(msg,clsname='m-toast'){
    if(!messageContainer)
        createContainer();
    message = msg;
    className = clsname;

    renderContent();
}

function  createContainer(){
    messageContainer = document.createElement('div');
    document.body.appendChild(messageContainer);
}

/*
rct-message-container .rct-overlay {\\n  left: 0;\\n  opacity: 0.01;\\n  filter: alpha(opacity=1);\\n}\\n.rct-message-container .rct-message {\\n  position: relative;\\n  z-index: 1051;\\n  padding: 20px 40px 20px 20px;\\n  color: #fff;\\n  background: #0078E7;\\n  border-radius: 2px;\\n  -webkit-box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);\\n  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);\\n  margin-bottom: 15px;\\n  overflow: hidden;\\n  -webkit-animation: fadein 0.45s ease;\\n  animation: fadein 0.45s ease;\\n  -webkit-transition: 0.45s;\\n  -o-transition: 0.45s;\\n  transition: 0.45s;\\n}\\n@keyframes fadein {\\n  from {\\n    opacity: 0;\\n    filter: alpha(opacity=0);\\n    max-height: 0;\\n  }
* */

function renderContent(){
    render(<Toast message={message} className={className}/>, messageContainer);
}

module.exports = Toast;