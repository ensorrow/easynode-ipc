/**
 * Created by hujiabao on 1/28/16.
 */
import '../../css/index.css';
import React from 'react';
import { render } from 'react-dom';

let messageContainer = null;
let message = '';
let className = '';

function createContainer () {
    messageContainer = document.createElement('div');
    document.body.appendChild(messageContainer);
}

function renderContent () {
    render(<Toast message={message} className={className}/>, messageContainer);
}


let Toast = React.createClass({

    propTypes:{
        className: React.PropTypes.string.isRequired,
        message: React.PropTypes.string.isRequired
    },
    getInitialState:function () {
        return {className:''};
    },
    componentDidMount: function () {
        this.interval = setTimeout(this.tick, 3 * 1000);
        this.setState({className:this.props.className});
    },
    tick: function () {
        this.setState({});
        if( messageContainer ) {
            document.body.removeChild(messageContainer);
            messageContainer = null;
        }
    },
    componentWillUnmount: function () {
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

Toast.show = function (msg, clsname = 'm-toast') {
    if(!messageContainer) {
        createContainer();
    }

    message = msg;
    className = clsname;

    renderContent();
};


module.exports = Toast;

